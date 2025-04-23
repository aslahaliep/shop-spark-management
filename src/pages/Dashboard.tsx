
import { ShoppingCart, Package, Users, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { LowStockItems } from "@/components/dashboard/LowStockItems";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back to ShopSpark Management</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Sales" 
          value="₹42,580" 
          change="+12.5% from last month" 
          trend="up"
          icon={<ShoppingCart className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Products" 
          value="1,258" 
          change="+3 new today" 
          trend="up"
          icon={<Package className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Customers" 
          value="642" 
          change="+8% from last month" 
          trend="up"
          icon={<Users className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Avg. Order Value" 
          value="₹368" 
          change="-4% from last month" 
          trend="down"
          icon={<TrendingUp className="h-5 w-5 text-primary" />} 
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentSales />
        <LowStockItems />
      </div>
    </div>
  );
}
