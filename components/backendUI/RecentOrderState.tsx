import React from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Loader2 } from "lucide-react";

interface RecentOrderStateProps {
  isError: boolean;
  isFetching: boolean;
  length: number;
}

function RecentOrderState({
  isError,
  isFetching,
  length,
}: RecentOrderStateProps) {
  if (isFetching) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            <span className="flex justify-center items-center">
              <Loader2 className="h-6 w-6 animate-spin text-pink-500" />
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (isError) {
    // Show error message
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            <span className="flex justify-center items-center">
              Error fetching orders. Please try again.
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (length === 0) {
    // Show "no orders" message
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            <span className="flex justify-center items-center">
              No recent orders found.
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return null;
}

export default RecentOrderState;
