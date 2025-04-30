import Image from "next/image";

import { TransactionTable } from "./transactionTable";
import { LoadingTable } from "./loadingTable";
import { ModeToggle } from "@/components/theme-button";
import { FetchNewButton } from "./fetchNewButton";

import { Suspense } from "react";

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col p-24 gap-2">
            <div className="flex flex-row gap-2 w-full justify-end">
                <FetchNewButton />
                <ModeToggle />
            </div>
            <h1 className=" text-3xl font-bold">Transcations</h1>
            <Suspense fallback={<LoadingTable />}>
                <TransactionTable />
            </Suspense>
        </main>
    );
}
