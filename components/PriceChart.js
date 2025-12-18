"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";

export default function PriceChart({ productId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);

      const chartData = history.map((item) => ({
        date: new Date(item.checked_at).toLocaleDateString(),
        price: parseFloat(item.price),
      }));

      setData(chartData);
      setLoading(false);
    }

    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-blue-500 w-full">
        <Loader2 className="w-5 h-5 animate-spin mr-2 text-blue-500" />
        Loading chart...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-blue-400 w-full">
        No price history yet. Check back after the first daily update!
      </div>
    );
  }

  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold mb-4 text-blue-700">
        Price History
      </h4>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#bfdbfe" />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#2563eb" }}
            stroke="#3b82f6"
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#2563eb" }}
            stroke="#3b82f6"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#eff6ff",
              border: "1px solid #93c5fd",
              borderRadius: "6px",
              color: "#1e40af",
            }}
            labelStyle={{ color: "#1e40af" }}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"         
            strokeWidth={2}
            dot={{ fill: "#2563eb", r: 4 }}
            activeDot={{ r: 6, fill: "#1d4ed8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
