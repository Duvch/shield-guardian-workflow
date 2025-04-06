
import { useState } from "react";
import { Search, MoreHorizontal, Shield, BarChart3, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  plan: "Demo" | "Premium" | "Pro";
  scansUsed: number;
  scansLimit: number;
  takedownsUsed: number;
  takedownsLimit: number | "Unlimited";
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: "usr-001",
    email: "john.doe@example.com",
    name: "John Doe",
    plan: "Premium",
    scansUsed: 12,
    scansLimit: 50,
    takedownsUsed: 2,
    takedownsLimit: 10,
    lastActive: "2023-04-05T14:30:00Z"
  },
  {
    id: "usr-002",
    email: "alice.smith@example.com",
    name: "Alice Smith",
    plan: "Demo",
    scansUsed: 4,
    scansLimit: 5,
    takedownsUsed: 1,
    takedownsLimit: 1,
    lastActive: "2023-04-05T12:15:00Z"
  },
  {
    id: "usr-003",
    email: "mark.wilson@example.com",
    name: "Mark Wilson",
    plan: "Pro",
    scansUsed: 35,
    scansLimit: 100,
    takedownsUsed: 5,
    takedownsLimit: "Unlimited",
    lastActive: "2023-04-05T10:45:00Z"
  },
  {
    id: "usr-004",
    email: "emily.jones@example.com",
    name: "Emily Jones",
    plan: "Premium",
    scansUsed: 27,
    scansLimit: 50,
    takedownsUsed: 4,
    takedownsLimit: 10,
    lastActive: "2023-04-05T09:20:00Z"
  },
  {
    id: "usr-005",
    email: "sarah.lee@example.com",
    name: "Sarah Lee",
    plan: "Demo",
    scansUsed: 5,
    scansLimit: 5,
    takedownsUsed: 0,
    takedownsLimit: 1,
    lastActive: "2023-04-05T08:10:00Z"
  }
];

export function UsersTable() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("All");
  const { toast } = useToast();

  const plans = ["All", "Demo", "Premium", "Pro"];
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "All" || user.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  const getPlanBadgeStyle = (plan: string) => {
    switch(plan) {
      case "Pro":
        return "bg-shield-blue text-white";
      case "Premium":
        return "bg-shield-purple text-white";
      default:
        return "bg-shield-gray text-white";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }).format(date);
  };

  const handlePlanChange = (userId: string, newPlan: string) => {
    // In a real application, this would be an API call to update the user's plan
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const updatedUser = { ...user, plan: newPlan as "Demo" | "Premium" | "Pro" };
        
        // Update scan and takedown limits based on new plan
        if (newPlan === "Demo") {
          updatedUser.scansLimit = 5;
          updatedUser.takedownsLimit = 1;
        } else if (newPlan === "Premium") {
          updatedUser.scansLimit = 50;
          updatedUser.takedownsLimit = 10;
        } else if (newPlan === "Pro") {
          updatedUser.scansLimit = 100;
          updatedUser.takedownsLimit = "Unlimited";
        }
        
        return updatedUser;
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    toast({
      title: "Plan Updated",
      description: `User plan has been updated to ${newPlan}.`,
    });
  };

  const calculateUsagePercentage = (used: number, limit: number | "Unlimited") => {
    if (limit === "Unlimited") return 0;
    return (used / limit) * 100;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Plans" />
            </SelectTrigger>
            <SelectContent>
              {plans.map(plan => (
                <SelectItem key={plan} value={plan}>
                  {plan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-4 py-3 text-left font-medium text-slate-600">User</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Plan</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Scans Used</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Takedowns Used</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Last Active</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const scansPercentage = calculateUsagePercentage(user.scansUsed, user.scansLimit);
                const takedownsPercentage = typeof user.takedownsLimit === "number" 
                  ? calculateUsagePercentage(user.takedownsUsed, user.takedownsLimit) 
                  : 0;
                
                return (
                  <tr key={user.id} className="border-b animate-fade-in">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-slate-700">{user.name}</div>
                        <div className="text-slate-500 text-xs">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Select defaultValue={user.plan} onValueChange={(value) => handlePlanChange(user.id, value)}>
                        <SelectTrigger className={cn("px-2 h-7 rounded-md w-24", getPlanBadgeStyle(user.plan))}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Demo">Demo</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Pro">Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-32">
                        <div className="flex justify-between text-xs">
                          <span>{user.scansUsed}</span>
                          <span className="text-slate-500">
                            {user.scansLimit === "Unlimited" ? "∞" : user.scansLimit}
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              scansPercentage > 80 ? "bg-shield-red" : "bg-shield-blue"
                            )}
                            style={{ width: `${Math.min(scansPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-32">
                        <div className="flex justify-between text-xs">
                          <span>{user.takedownsUsed}</span>
                          <span className="text-slate-500">
                            {user.takedownsLimit === "Unlimited" ? "∞" : user.takedownsLimit}
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              takedownsPercentage > 80 ? "bg-shield-red" : "bg-shield-blue"
                            )}
                            style={{ width: `${Math.min(takedownsPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {formatDate(user.lastActive)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center">
                            <Shield className="mr-2 h-4 w-4" />
                            <span>View User Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            <span>Usage Report</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center text-amber-600">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            <span>Override Limits</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
