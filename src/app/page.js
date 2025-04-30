import Image from "next/image";

import { TransactionTable } from "./transactionTable";
import { LoadingTable } from "./loadingTable";
import { ModeToggle } from "@/components/theme-button";
import { FetchNewButton } from "./fetchNewButton";

import { Suspense } from "react";

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-end p-24 gap-2">
            <div className="flex gap-2">
                <FetchNewButton />
                <ModeToggle />
            </div>
            <Suspense fallback={<LoadingTable />}>
                <TransactionTable />
            </Suspense>
        </main>
    );
}
