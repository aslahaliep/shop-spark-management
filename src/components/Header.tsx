
import * as React from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header({ children }: { children?: React.ReactNode }) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `You searched for "${searchQuery}"`,
      });
    }
  };

  return (
    <header className="bg-background border-b border-border py-3 px-4 flex items-center justify-between">
      <form onSubmit={handleSearch} className="relative hidden md:block md:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search everything..."
          className="w-full pl-9 bg-muted/40 border-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      
      <div className="flex items-center space-x-4">
        {children}
        
        <button 
          className="p-2 rounded-md hover:bg-accent"
          onClick={() => toast({ title: "Notifications", description: "You have no new notifications" })}
        >
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <span className="ml-2 font-medium hidden md:block">Admin User</span>
        </div>
      </div>
    </header>
  );
}
