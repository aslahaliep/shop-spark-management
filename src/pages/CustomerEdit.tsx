import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  ArrowLeft,
  Users,
  Save
} from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipcode: z.string().min(5, "Zipcode must be at least 5 characters"),
  notes: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof formSchema>;

// Mock data for a single customer - same as in CustomerView.tsx
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

export default function CustomerEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      notes: "",
    },
  });

  useEffect(() => {
    // This would typically be an API call
    if (id) {
      const customer = getCustomer(id);
      if (customer) {
        form.reset({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          state: customer.state,
          zipcode: customer.zipcode,
          notes: customer.notes,
        });
      }
      setLoading(false);
    }
  }, [id, form]);

  const onSubmit = (data: CustomerFormValues) => {
    toast({
      title: "Customer Updated",
      description: `${data.name}'s information has been updated successfully`,
    });
    navigate(`/customers/view/${id}`);
  };

  const handleCancel = () => {
    navigate(`/customers/view/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading customer data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={handleCancel} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customer
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6" /> Edit Customer
          </h1>
          <p className="text-muted-foreground">Update customer information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Update the customer's personal and contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Maharashtra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zipcode</FormLabel>
                      <FormControl>
                        <Input placeholder="400001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add any additional notes about this customer"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
