import Image from "next/image";

import { TransactionTable } from "./transactionTable";
import { LoadingTable } from "./loadingTable";
import { ModeToggle } from "@/components/theme-button";

import { Suspense } from "react";

export default async function Home() {
    return (
        <main className="flex min-h-screen w-screen flex-col items-center p-24">
            <ModeToggle />
            <Suspense fallback={<LoadingTable />}>
                <TransactionTable />
            </Suspense>
        </main>
    );
}
