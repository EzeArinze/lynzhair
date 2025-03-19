import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PButtonProps {
  onClickLeft: () => void;
  onClickRight: () => void;
  currentPage: number;
  totalPages: number;
}

function PaginationButton({
  onClickLeft,
  onClickRight,
  currentPage,
  totalPages,
}: PButtonProps) {
  return (
    <div className="flex items-center justify-end mt-4 space-x-2 mr-4">
      <Button onClick={onClickLeft} disabled={currentPage === 1} size={"sm"}>
        <ChevronLeft className="w-2 h-2" />
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={onClickRight}
        size={"sm"}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-2 h-2" />
      </Button>
    </div>
  );
}

export default PaginationButton;
