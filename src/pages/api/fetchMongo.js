import { MongoClient } from "mongodb";

import fs from "fs/promises";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { JSDOM } from "jsdom";

import { OpenAI } from "openai";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: "authorized_user",
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function getMessages(auth) {
    const gmail = google.gmail({ version: "v1", auth });
    const res = await gmail.users.messages.list({
        userId: "me",
        q: "from:from_us@trustbank.sg",
        maxResults: 50,
    });
    const messages = res.data.messages;
    if (!messages || messages.length === 0) {
        console.log("No messages found.");
        return;
    }
    for (const message of messages) {
        const messageId = message.id;
        await client.connect();
        const database = client.db("bank_transactions");
        const collection = database.collection("transactions");
        if (await collection.findOne({ id: messageId })) {
            console.log("Message already exists in the database.");
            break;
        }

        gmail.users.messages.get(
            {
                userId: "me",
                id: message.id,
            },
            async (err, res) => {
                if (err) {
                    console.error("Error fetching message:", err);
                    return;
                }
                const messageData = res.data.payload.body.data;
                // Decode the base64url encoded data
                const decodedData = Buffer.from(messageData, "base64").toString(
                    "utf-8"
                );
                const dom = new JSDOM(decodedData);
                const messageBody = dom.window.document
                    .querySelector("body")
                    .textContent.replace(/\s+/g, " ");
                const openaiClient = new OpenAI({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                const response = await openaiClient.responses.create({
                    model: "gpt-4o-mini",
                    input: [
                        {
                            role: "system",
                            content: [
                                {
                                    type: "input_text",
                                    text: "You are to extract information from the input text that is a notification for a bank transaction.\nThe output should be in raw json format without formatting.\nIf the input email does not seem like a transaction, output the text 'non_transaction'\nYou may come up with a new category not in the examples that best describes the transaction based on the company. However if it is a transaction to a person's name, it should be represented as a transfer\nIt should include the following information:\nType: (Expense/Income)\nBank: (Trust/OCBC/etc.)\nValue: (CURRENCY Value)\nDate: (DD/MM/YYYY)\nTime: (HH:MM)\nCategory: (Dining, Food and Beverage, Vending Machine, Transfer, Transaction, Salary)\nCompany: (name of company/sender/recipient)",
                                },
                            ],
                        },
                        {
                            role: "user",
                            content: [
                                {
                                    type: "input_text",
                                    text: messageBody,
                                },
                            ],
                        },
                    ],
                    text: {
                        format: {
                            type: "text",
                        },
                    },
                    reasoning: {},
                    tools: [],
                    temperature: 1,
                    max_output_tokens: 2048,
                    top_p: 1,
                    store: true,
                });
                if (response.output_text === "non_transaction") {
                    console.log("Not a transaction");
                    return;
                } else if (JSON.parse(response.output_text) !== null) {
                    const data = { data: JSON.parse(response.output_text) };
                    data.id = messageId;
                    await collection.insertOne(data);
                    console.log("Data inserted into MongoDB:", data);
                }
            }
        );
    }
}

export default async function fetchMongo(req, res) {
    authorize().then(getMessages).catch(console.error);
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: "Date parameter is required" });
    }

    const [month, year] = date.split("-");
    const regex = new RegExp(`^\\d{2}\\/${month}\\/${year}$`);

    try {
        await client.connect();
        const database = client.db("bank_transactions");
        const collection = database.collection("transactions");

        const data = await collection
            .find({ "data.Date": { $regex: regex } })
            .sort({ "data.Date": -1, "data.Time": -1 })
            .toArray();

        await client.close();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return res.status(500).json({ error: "Failed to fetch data" });
    }
}
