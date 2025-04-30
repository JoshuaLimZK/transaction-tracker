import { MongoClient } from "mongodb";

export default async function fetchMongo(req, res) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

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
            .toArray();

        await client.close();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return res.status(500).json({ error: "Failed to fetch data" });
    }
}
