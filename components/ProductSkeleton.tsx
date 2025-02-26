import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductSkeleton() {
  return (
    <>
      {/* Skeleton for Add Product Button */}
      <div className="flex justify-end mb-4">
        <div className="h-10 w-40 bg-gray-300 animate-pulse rounded-md"></div>
      </div>

      {/* Skeleton Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {["Image", "Name", "Category", "Price", "Stock", "Actions"].map(
                (header) => (
                  <TableHead key={header}>{header}</TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-10 w-10 bg-gray-300 animate-pulse rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-32 bg-gray-300 animate-pulse rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-24 bg-gray-300 animate-pulse rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-16 bg-gray-300 animate-pulse rounded"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-16 bg-gray-300 animate-pulse rounded"></div>
                </TableCell>
                <TableCell className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-300 animate-pulse rounded"></div>
                  <div className="h-8 w-8 bg-gray-300 animate-pulse rounded"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
