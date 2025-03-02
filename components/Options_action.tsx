"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Trash2 } from "lucide-react";
import type { IOrder } from "@/utils/dummyOrder";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OrderActionsProps {
  order: IOrder;
  onDelete: (orderId: string) => void;
  onViewDetails?: (order: IOrder) => void;
}

export default function OrderActions({
  order,
  onDelete,
  onViewDetails,
}: OrderActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(order);
    } else {
      // Default behavior if no handler is provided
      console.log("View details for order:", order);
    }
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(order.orderNumber);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order #{order.orderNumber}</DialogTitle>
          <DialogDescription>
            Choose what you would like to do with this order
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row justify-between sm:justify-between gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleViewDetails}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
