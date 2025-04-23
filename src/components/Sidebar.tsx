
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  UserCheck, 
  BarChart2, 
  Settings,
  Menu, 
  X 
} from "lucide-react";

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const links = [
    { label: "Dashboard", icon: Home, path: "/" },
    { label: "Billing", icon: ShoppingCart, path: "/billing" },
    { label: "Inventory", icon: Package, path: "/inventory" },
    { label: "Customers", icon: Users, path: "/customers" },
    { label: "Staff", icon: UserCheck, path: "/staff" },
    { label: "Reports", icon: BarChart2, path: "/reports" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="fixed bottom-4 right-4 md:hidden z-50 bg-primary p-3 rounded-full shadow-lg text-white"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-sidebar-background text-sidebar-foreground w-full md:w-64 flex-shrink-0 transition-all duration-300 ease-in-out ${
          expanded ? "fixed inset-0 z-40 md:relative" : "hidden md:block md:w-20"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {expanded ? (
            <span className="text-xl font-bold">ShopSpark</span>
          ) : (
            <span className="text-xl font-bold mx-auto">SS</span>
          )}
          <button 
            className="hidden md:block"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-8 px-2">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {expanded && <span className="ml-3">{link.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
