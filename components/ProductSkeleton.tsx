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
    <div className="p-4">
      {/* Skeleton for Add Product Button */}
      <div className="flex justify-end mb-4">
        <div className="h-10 w-40 bg-gray-300 animate-pulse rounded-md"></div>
      </div>

      {/* Skeleton Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              {["Image", "Name", "Category", "Price", "Stock", "Actions"].map(
                (header) => (
                  <TableHead
                    key={header}
                    className="text-xs sm:text-sm md:text-base"
                  >
                    {header}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-10 w-10 bg-gray-300 animate-pulse rounded sm:h-12 sm:w-12 md:h-14 md:w-14"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-24 bg-gray-300 animate-pulse rounded sm:w-32 md:w-40"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-20 bg-gray-300 animate-pulse rounded sm:w-28 md:w-36"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-16 bg-gray-300 animate-pulse rounded sm:w-20 md:w-24"></div>
                </TableCell>
                <TableCell>
                  <div className="h-5 w-16 bg-gray-300 animate-pulse rounded sm:w-20 md:w-24"></div>
                </TableCell>
                <TableCell className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-300 animate-pulse rounded sm:h-10 sm:w-10"></div>
                  <div className="h-8 w-8 bg-gray-300 animate-pulse rounded sm:h-10 sm:w-10"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
