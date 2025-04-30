"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

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
        <Button variant="outline" size="sm" onClick={() => reload()}>
            <RefreshCw id="refresh-icon" />
        </Button>
    );
}
