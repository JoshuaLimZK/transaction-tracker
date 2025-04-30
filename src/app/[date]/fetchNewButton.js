"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useRouter } from "next/navigation";

export function FetchNewButton() {
    const router = useRouter();
    const reload = () => {
        router.refresh();
        console.log("Reloading data...");

        const refreshIcon = document.getElementById("refresh-icon");
        if (refreshIcon) {
            refreshIcon.classList.add("animate-spin");
            setTimeout(() => {
                refreshIcon.classList.remove("animate-spin");
            }, 500);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => reload()}
                    >
                        <RefreshCw id="refresh-icon" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Reload Transcations</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
