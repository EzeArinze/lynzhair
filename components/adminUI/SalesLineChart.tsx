"use client";

import { Card } from "../ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type SalesData = {
  date: string;
  sales: number;
};

interface SalesLineChartProps {
  data: SalesData[];
  isLoading?: boolean;
}

export default function SalesLineChart({
  data,
  isLoading,
}: SalesLineChartProps) {
  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
      <h2 className="text-lg font-semibold mb-2">Sales Over Time</h2>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
