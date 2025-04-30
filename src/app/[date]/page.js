import { TransactionTable } from "./transactionTable";
import { LoadingTable } from "./loadingTable";
import { ModeToggle } from "@/components/theme-button";
import { FetchNewButton } from "./fetchNewButton";
import { MonthPickerButton } from "./monthPicker";

import { Suspense } from "react";
import { redirect } from "next/navigation";

export default async function Home({ params }) {
    const { date } = await params;

    // Check if date follows format MM-YYYY
    const dateRegex = /^(0[1-9]|1[0-2])-\d{4}$/;
    if (!dateRegex.test(date)) {
        // If not, redirect to the current month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
        const formattedMonth =
            currentMonth < 10 ? `0${currentMonth}` : currentMonth;
        redirect(`/${formattedMonth}-${currentDate.getFullYear()}`);
    }

    return (
        <main className="flex min-h-screen flex-col p-24 gap-2">
            <div className="flex flex-row gap-2 w-full justify-end">
                <MonthPickerButton />
                <FetchNewButton />
                <ModeToggle />
            </div>
            <h1 className=" text-3xl font-bold">Transcations</h1>
            <Suspense fallback={<LoadingTable />}>
                <TransactionTable date={date} />
            </Suspense>
        </main>
    );
}
