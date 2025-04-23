
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart2, Download, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for sales over time
const salesData = [
  { name: "Jan", sales: 25000 },
  { name: "Feb", sales: 32000 },
  { name: "Mar", sales: 28500 },
  { name: "Apr", sales: 34500 },
  { name: "May", sales: 38000 },
  { name: "Jun", sales: 32500 },
];

// Mock data for top selling products
const productData = [
  { name: "Wireless Earbuds", value: 210 },
  { name: "USB-C Cable", value: 180 },
  { name: "Power Bank", value: 150 },
  { name: "Smartphone Case", value: 120 },
  { name: "Bluetooth Speaker", value: 90 },
];

// Mock data for daily sales trends
const dailySalesData = [
  { day: "Mon", sales: 4500 },
  { day: "Tue", sales: 5200 },
  { day: "Wed", sales: 4800 },
  { day: "Thu", sales: 6200 },
  { day: "Fri", sales: 7500 },
  { day: "Sat", sales: 8800 },
  { day: "Sun", sales: 6100 },
];

// Colors for pie chart
const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];

export default function Reports() {
  const [period, setPeriod] = useState("monthly");
  const { toast } = useToast();
  
  const handleExport = (reportType: string) => {
    toast({
      title: "Export Report",
      description: `Exporting ${reportType} report...`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <BarChart2 className="mr-2 h-6 w-6" /> Sales Reports
          </h1>
          <p className="text-gray-500">View your business performance metrics</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Button onClick={() => handleExport("sales")}>
            <Download className="h-4 w-4 mr-2" /> Export Reports
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={period} onValueChange={setPeriod}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Sales Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailySalesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Sales Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData.slice(0, 4)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Sales Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-lg font-semibold">Total Sales</h3>
              <p className="text-3xl font-bold mt-4">₹158,000</p>
              <p className="text-sm text-green-500 mt-1">+12.5% from last month</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">Average Order Value</h3>
              <p className="text-3xl font-bold mt-4">₹1,250</p>
              <p className="text-sm text-green-500 mt-1">+5.2% from last month</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-3xl font-bold mt-4">126</p>
              <p className="text-sm text-green-500 mt-1">+8.7% from last month</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
