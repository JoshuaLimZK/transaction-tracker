import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export async function LoadingTable() {
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
                <TableRow className="pointer-events-none">
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                </TableRow>
                <TableRow className="pointer-events-none">
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                </TableRow>
                <TableRow className="pointer-events-none">
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-fill" />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
