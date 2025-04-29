import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export async function TransactionTable() {
    // Simulate fetching data from an API with wait

    const fetchData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        date: "01/01/2025",
                        time: "12:00 PM",
                        type: "Income",
                        bank: "Trust",
                        value: "$1,200.00",
                        category: "Salary",
                        merchant: "ABC Corp",
                    },
                ]);
            }, 2000);
        });
    };
    const data = await fetchData();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Merchant</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.bank}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.merchant}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
