import { redirect } from "next/navigation";

export default async function Home() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
    const formattedMonth =
        currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    redirect(`/${formattedMonth}-${currentDate.getFullYear()}`);
    return null;
}
