
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({ title, value, change, icon, trend = "neutral" }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="p-2 rounded-lg bg-gray-50">{icon}</div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {change && (
          <div className="mt-1 flex items-center">
            <span 
              className={`text-xs font-medium ${
                trend === "up" 
                  ? "text-green-600" 
                  : trend === "down" 
                  ? "text-red-600" 
                  : "text-gray-500"
              }`}
            >
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
