import React from "react";

interface PredefinedRangesProps {
  setLocalMinPrice: (value: number) => void;
  setLocalMaxPrice: (value: number) => void;
  localMinPrice: number;
  localMaxPrice: number;
}

function PredefinedRanges({
  setLocalMinPrice,
  setLocalMaxPrice,
  localMinPrice,
  localMaxPrice,
}: PredefinedRangesProps) {
  const priceRanges = [
    { label: "Under N100", min: 0, max: 100 },
    { label: "N100 - N200", min: 100, max: 200 },
    { label: "N200 - N300", min: 200, max: 300 },
    { label: "Over N300", min: 300, max: 1000 },
  ];

  return (
    <div className="pt-2 border-t">
      <p className="text-sm font-medium mb-2">Quick Ranges</p>
      <div className="space-y-2">
        {priceRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => {
              setLocalMinPrice(range.min);
              setLocalMaxPrice(range.max);
            }}
            className={`text-sm w-full text-left py-1.5 px-2 rounded-md transition-colors ${
              localMinPrice === range.min && localMaxPrice === range.max // check the range for the styling
                ? "bg-pink-50 text-pink-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PredefinedRanges;
