"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SimpleTableProps } from "@/utils/types";

export function DataTable({
  data,
  columns,
  title,
  idField = "_id",
  statusField,
  statusOptions = [],
  onStatusChange,
  onDelete,
  ActionsComponent,
  pageSize = 5,
  initialPage = 1,
}: SimpleTableProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate pagination
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;

    // Search across all fields
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Change items per page
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="overflow-x-auto w-[90%] mx-auto hide-scrollbar">
      {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pl-2 pr-2">
        <form className="md:w-2/5 w-4/5 mb-4 md:mb-0 flex items-center">
          <span className="mr-2 text-sm text-gray-500 md:hidden">Search:</span>
          <Input
            className="lg:w-64 md:w-full m-0"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </form>

        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-500">Items per page:</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-16">
              <SelectValue>{itemsPerPage}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {/* Render column headers */}
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={column.hideOnMobile ? "hidden md:table-cell" : ""}
              >
                {column.header}
              </TableHead>
            ))}

            {/* Add status header if needed */}
            {statusField && <TableHead>Status</TableHead>}

            {/* Add actions header if needed */}
            {ActionsComponent && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Render rows */}
          {currentItems.length > 0 ? (
            currentItems.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Render cells for each column */}
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={
                      column.hideOnMobile ? "hidden md:table-cell" : ""
                    }
                  >
                    {item[column.key] as React.ReactNode}
                  </TableCell>
                ))}

                {/* Render status cell if needed */}
                {statusField && (
                  <TableCell>
                    <Select
                      value={item[statusField] as string | undefined}
                      onValueChange={(value) =>
                        onStatusChange &&
                        onStatusChange(item[idField] as string, value)
                      }
                    >
                      <SelectTrigger className="w-[120px] md:w-[180px]">
                        <SelectValue>
                          <Badge
                            className={
                              statusOptions.find(
                                (opt) => opt.value === item[statusField]
                              )?.color
                            }
                          >
                            {item[statusField] as React.ReactNode}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                )}

                {/* Render actions cell if needed */}
                {ActionsComponent && (
                  <TableCell>
                    <ActionsComponent
                      Id={item[idField] as string}
                      onDelete={onDelete}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length +
                  (statusField ? 1 : 0) +
                  (ActionsComponent ? 1 : 0)
                }
                className="text-center py-6"
              >
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>

          <div className="flex items-center space-x-1 ">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-2 w-2" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show 5 page buttons at most
              let pageNumber;
              if (totalPages <= 5) {
                // Less than 5 pages, show all
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                // Near the start
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                // Near the end
                pageNumber = totalPages - 4 + i;
              } else {
                // In the middle
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(pageNumber)}
                  asChild
                >
                  <span className="text-sm p-0">{pageNumber}</span>
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-2 w-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
