"use client";

import { Button } from "@/components/ui/button";
import { Eye, Trash2, MoreVertical } from "lucide-react";
// import type { IOrder } from "@/utils/dummyOrder";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";

interface OrderActionsProps {
  Id: string;
  onDelete?: (Id: string) => void;
  onViewDetails?: (Id: string) => void;
}

export default function MoreActionsOptions({
  Id,
  onDelete,
  onViewDetails,
}: OrderActionsProps) {
  const handleViewDetails = () => {
    onViewDetails?.(Id);
  };

  const handleDelete = () => {
    onDelete?.(Id);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col space-y-2 p-4 w-48 mr-8 lg:mr-0">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleViewDetails}
        >
          <Eye className="mr-2 h-4 w-4" />
          Details
        </Button>
        <Separator />
        <Button variant="destructive" className="flex-1" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
