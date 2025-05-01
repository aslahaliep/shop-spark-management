
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Users,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  ShoppingBag
} from "lucide-react";

// Mock data for a single customer
const getCustomer = (id: string) => {
  // This would be replaced with an API call in a real application
  const customers = [
    { 
      id: "C001", 
      name: "John Doe", 
      phone: "9876543210", 
      email: "johndoe@example.com",
      address: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      zipcode: "400001",
      totalPurchases: 12,
      totalSpent: 15250,
      joinDate: "Jan 15, 2025",
      lastPurchase: "Apr 20, 2025",
      notes: "Prefers email communication. Interested in premium products."
    },
    { 
      id: "C002", 
      name: "Jane Smith", 
      phone: "9876543211", 
      email: "janesmith@example.com",
      address: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      zipcode: "110001",
      totalPurchases: 8,
      totalSpent: 9800,
      joinDate: "Feb 3, 2025",
      lastPurchase: "Apr 22, 2025",
      notes: "Loyal customer. Has referred multiple friends."
    },
    { 
      id: "C003", 
      name: "Robert Johnson", 
      phone: "9876543212", 
      email: "robert@example.com",
      address: "789 Business Park",
      city: "Bangalore",
      state: "Karnataka",
      zipcode: "560001",
      totalPurchases: 5,
      totalSpent: 6200,
      joinDate: "Feb 18, 2025",
      lastPurchase: "Apr 10, 2025",
      notes: "Corporate account. Requires invoices."
    },
    { 
      id: "C004", 
      name: "Emily Davis", 
      phone: "9876543213", 
      email: "emily@example.com",
      address: "101 Lake View",
      city: "Chennai",
      state: "Tamil Nadu",
      zipcode: "600001",
      totalPurchases: 15,
      totalSpent: 18450,
      joinDate: "Jan 5, 2025",
      lastPurchase: "Apr 23, 2025",
      notes: "VIP customer. Always buys latest products."
    },
    { 
      id: "C005", 
      name: "Michael Wilson", 
      phone: "9876543214", 
      email: "michael@example.com",
      address: "202 Hill Road",
      city: "Hyderabad",
      state: "Telangana",
      zipcode: "500001",
      totalPurchases: 3,
      totalSpent: 3800,
      joinDate: "Mar 12, 2025",
      lastPurchase: "Apr 15, 2025",
      notes: "New customer. Found us through online search."
    },
    { 
      id: "C006", 
      name: "Sarah Brown", 
      phone: "9876543215", 
      email: "sarah@example.com",
      address: "303 Beach Front",
      city: "Kolkata",
      state: "West Bengal",
      zipcode: "700001",
      totalPurchases: 7,
      totalSpent: 7950,
      joinDate: "Feb 8, 2025",
      lastPurchase: "Apr 21, 2025",
      notes: "Prefers phone calls. Interested in seasonal discounts."
    },
  ];
  
  return customers.find(customer => customer.id === id);
};

// Mock recent orders data
const recentOrders = [
  { id: "ORD-2023-001", date: "Apr 20, 2025", amount: 1850, status: "Delivered" },
  { id: "ORD-2023-002", date: "Apr 15, 2025", amount: 3200, status: "Processing" },
  { id: "ORD-2023-003", date: "Apr 05, 2025", amount: 950, status: "Delivered" },
  { id: "ORD-2023-004", date: "Mar 25, 2025", amount: 1750, status: "Delivered" },
];

export default function CustomerView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would typically be an API call
    if (id) {
      const fetchedCustomer = getCustomer(id);
      setCustomer(fetchedCustomer);
      setLoading(false);
    }
  }, [id]);

  const handleEdit = () => {
    if (customer) {
      navigate(`/customers/edit/${customer.id}`);
    }
  };

  const handleDelete = () => {
    toast({
      title: "Customer Deleted",
      description: `${customer?.name} has been removed from the system`,
    });
    navigate("/customers");
  };

  const handleBack = () => {
    navigate("/customers");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading customer data...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customers
        </Button>
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Customer Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The requested customer could not be found.
              </p>
              <Button onClick={handleBack} className="mt-4">
                Return to Customer List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> Customer Details
          </h1>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleEdit}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
                handleDelete();
              }
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Basic Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                <Users size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{customer.name}</h2>
                <p className="text-muted-foreground">Customer ID: {customer.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{customer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">
                      {customer.address}
                      <br />
                      {customer.city}, {customer.state} {customer.zipcode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Total Purchases</p>
              <p className="text-3xl font-bold">{customer.totalPurchases}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Total Spent</p>
              <p className="text-3xl font-bold text-primary">₹{customer.totalSpent.toFixed(2)}</p>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Customer Since</p>
              <p className="text-xl font-medium">{customer.joinDate}</p>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Last Purchase</p>
              <p className="text-xl font-medium">{customer.lastPurchase}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" /> Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-medium">Order ID</th>
                    <th className="py-3 text-left font-medium">Date</th>
                    <th className="py-3 text-left font-medium">Amount</th>
                    <th className="py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{order.date}</td>
                      <td className="py-3">₹{order.amount.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{customer.notes}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
