"use client";

import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { cn } from "@/lib/utils";
import { MonthPicker } from "@/components/ui/monthpicker";

import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export function MonthPickerButton() {
    const monthYear = usePathname().split("/")[1];
    console.log(monthYear);

    const [month, year] = monthYear.split("-");
    const date = new Date(year, month - 1);
    console.log(date);

    const handleMonthSelect = (month) => {
        redirect(`/${format(month, "MM-yyyy")}`);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, "MMM yyyy")
                    ) : (
                        <span>Select month</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <MonthPicker
                    onMonthSelect={handleMonthSelect}
                    selectedMonth={date}
                />
            </PopoverContent>
        </Popover>
    );
}
