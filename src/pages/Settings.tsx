
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Settings as SettingsIcon, Save, Image, Printer, CreditCard, Mail, Bell, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [storeSettings, setStoreSettings] = useState({
    name: "ShopSpark Electronics",
    address: "123 Main Street, Tech Plaza, Bangalore - 560001",
    phone: "9876543210",
    email: "info@shopsparkelectronics.com",
    website: "www.shopsparkelectronics.com",
    gst: "27AADCB2230M1Z3",
  });
  
  const [taxSettings, setTaxSettings] = useState({
    enableTax: true,
    gstPercentage: "18",
  });
  
  const [invoiceSettings, setInvoiceSettings] = useState({
    showLogo: true,
    showGST: true,
    footerText: "Thank you for shopping with us!",
    termsText: "All electronic items have 1 year warranty unless specified otherwise.",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlerts: true,
    salesReports: true,
    customerBirthdays: false,
    orderUpdates: true,
  });
  
  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTaxSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTaxToggle = () => {
    setTaxSettings(prev => ({ ...prev, enableTax: !prev.enableTax }));
  };
  
  const handleInvoiceSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInvoiceToggle = (setting: 'showLogo' | 'showGST') => {
    setInvoiceSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };
  
  const handleSaveSettings = (type: string) => {
    toast({
      title: "Settings Saved",
      description: `${type} settings have been updated successfully.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <SettingsIcon className="mr-2 h-6 w-6" /> System Settings
        </h1>
        <p className="text-gray-500">Configure your shop settings</p>
      </div>
      
      <Tabs defaultValue="store">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Store Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={storeSettings.name} 
                    onChange={handleStoreSettingsChange} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    name="address"
                    value={storeSettings.address} 
                    onChange={handleStoreSettingsChange} 
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={storeSettings.phone} 
                      onChange={handleStoreSettingsChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={storeSettings.email} 
                      onChange={handleStoreSettingsChange} 
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website"
                      value={storeSettings.website} 
                      onChange={handleStoreSettingsChange} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="gst">GST Number</Label>
                    <Input 
                      id="gst" 
                      name="gst"
                      value={storeSettings.gst} 
                      onChange={handleStoreSettingsChange} 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="logo" className="block mb-2">Store Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                    <Button type="button" variant="outline">
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("Store")} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" /> Save Store Settings
              </Button>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoice">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Printer className="h-4 w-4" />
                    <Label htmlFor="showLogo">Display Store Logo on Invoices</Label>
                  </div>
                  <Switch 
                    id="showLogo" 
                    checked={invoiceSettings.showLogo} 
                    onCheckedChange={() => handleInvoiceToggle('showLogo')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <Label htmlFor="showGST">Display GST Information</Label>
                  </div>
                  <Switch 
                    id="showGST" 
                    checked={invoiceSettings.showGST} 
                    onCheckedChange={() => handleInvoiceToggle('showGST')} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="footerText">Invoice Footer Text</Label>
                  <Textarea 
                    id="footerText" 
                    name="footerText"
                    value={invoiceSettings.footerText} 
                    onChange={handleInvoiceSettingChange} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="termsText">Terms & Conditions</Label>
                  <Textarea 
                    id="termsText" 
                    name="termsText"
                    value={invoiceSettings.termsText} 
                    onChange={handleInvoiceSettingChange} 
                    rows={4}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("Invoice")} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" /> Save Invoice Settings
              </Button>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <Label htmlFor="enableTax">Enable Tax Calculation</Label>
                  </div>
                  <Switch 
                    id="enableTax" 
                    checked={taxSettings.enableTax} 
                    onCheckedChange={handleTaxToggle} 
                  />
                </div>
                
                {taxSettings.enableTax && (
                  <div>
                    <Label htmlFor="gstPercentage">GST Percentage (%)</Label>
                    <Input 
                      id="gstPercentage" 
                      name="gstPercentage"
                      type="number" 
                      value={taxSettings.gstPercentage} 
                      onChange={handleTaxSettingChange} 
                    />
                  </div>
                )}
              </div>
              
              <Button onClick={() => handleSaveSettings("Tax")} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" /> Save Tax Settings
              </Button>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                  </div>
                  <Switch 
                    id="lowStockAlerts" 
                    checked={notificationSettings.lowStockAlerts} 
                    onCheckedChange={() => handleNotificationToggle('lowStockAlerts')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="salesReports">Daily Sales Reports</Label>
                  </div>
                  <Switch 
                    id="salesReports" 
                    checked={notificationSettings.salesReports} 
                    onCheckedChange={() => handleNotificationToggle('salesReports')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <Label htmlFor="customerBirthdays">Customer Birthday Reminders</Label>
                  </div>
                  <Switch 
                    id="customerBirthdays" 
                    checked={notificationSettings.customerBirthdays} 
                    onCheckedChange={() => handleNotificationToggle('customerBirthdays')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="orderUpdates">Order Updates</Label>
                  </div>
                  <Switch 
                    id="orderUpdates" 
                    checked={notificationSettings.orderUpdates} 
                    onCheckedChange={() => handleNotificationToggle('orderUpdates')} 
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("Notification")} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" /> Save Notification Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
