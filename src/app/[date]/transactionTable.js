import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export async function TransactionTable({ date }) {
    const data = await fetch(
        `http://localhost:3000/api/fetchMongo?date=${date}`
    ).then((res) => res.json());

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
                        <TableCell>{item.data.Date}</TableCell>
                        <TableCell>{item.data.Time}</TableCell>
                        <TableCell>{item.data.Type}</TableCell>
                        <TableCell>{item.data.Bank}</TableCell>
                        <TableCell>{item.data.Value}</TableCell>
                        <TableCell>{item.data.Category}</TableCell>
                        <TableCell>{item.data.Company}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
