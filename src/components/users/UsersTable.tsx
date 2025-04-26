import { useState, useEffect } from "react";
import { Search, MoreHorizontal, Shield, BarChart3, AlertTriangle, UserCog } from "lucide-react";
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
import { eq } from "drizzle-orm";
import { db } from "@/lib/db"; // Import your Drizzle DB instance
import { users } from "@/lib/schema"; // Import your schema

// Interface based on your database schema
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  plan: "Free" | "Pro" | "Enterprise";
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export function UsersTable() {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("All");
  const { toast } = useToast();

  const plans = ["All", "Free", "Pro", "Enterprise"];
  
  // Fetch users from Neon DB with Drizzle ORM
  useEffect(() => {
    const fetchUsersFromDb = async () => {
      try {
        setLoading(true);
        // Using Drizzle ORM to query the users table
        const dbUsers = await db.select().from(users);
        
        // Map database results to our component's interface
        const mappedUsers: User[] = dbUsers.map(user => ({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar || "/placeholder.svg?height=40&width=40",
          plan: user.plan,
          isActive: user.isActive,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString()
        }));
        
        setUsersData(mappedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to load users from database",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsersFromDb();
  }, [toast]);

  const filteredUsers = usersData.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "All" || user.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  const getPlanBadgeStyle = (plan: string) => {
    switch(plan) {
      case "Enterprise":
        return "bg-purple-600 text-white";
      case "Pro":
        return "bg-blue-600 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(date);
  };

  // Update user plan using Drizzle ORM
  const handlePlanChange = async (userId: number, newPlan: string) => {
    try {
      // Using Drizzle ORM to update the user's plan
      await db.update(users)
        .set({ 
          plan: newPlan as "Free" | "Pro" | "Enterprise",
          updatedAt: new Date() 
        })
        .where(eq(users.id, userId));
      
      // Update local state to reflect change
      const updatedUsers = usersData.map(user => {
        if (user.id === userId) {
          return { 
            ...user, 
            plan: newPlan as "Free" | "Pro" | "Enterprise",
            updatedAt: new Date().toISOString()
          };
        }
        return user;
      });
      
      setUsersData(updatedUsers);
      
      toast({
        title: "Plan Updated",
        description: `User plan has been updated to ${newPlan}.`,
      });
    } catch (error) {
      console.error("Error updating user plan:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update user plan in database.",
        variant: "destructive",
      });
    }
  };

  // Toggle user active status using Drizzle ORM
  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      
      // Using Drizzle ORM to update the user's active status
      await db.update(users)
        .set({ 
          isActive: newStatus,
          updatedAt: new Date() 
        })
        .where(eq(users.id, userId));
      
      // Update local state to reflect change
      const updatedUsers = usersData.map(user => {
        if (user.id === userId) {
          return { 
            ...user, 
            isActive: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return user;
      });
      
      setUsersData(updatedUsers);
      
      toast({
        title: "Status Updated",
        description: `User is now ${newStatus ? 'active' : 'inactive'}.`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update user status in database.",
        variant: "destructive",
      });
    }
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
        <Button variant="outline" className="flex items-center gap-2">
          <UserCog className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-4 py-3 text-left font-medium text-slate-600">User</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Plan</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Created</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Updated</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b animate-fade-in">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img 
                          src={user.avatar} 
                          alt={`${user.firstName} ${user.lastName}`} 
                          className="h-8 w-8 rounded-full mr-2" 
                        />
                        <div className="font-medium text-slate-700">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <Select 
                        defaultValue={user.plan} 
                        onValueChange={(value) => handlePlanChange(user.id, value)}
                      >
                        <SelectTrigger className={cn("px-2 h-7 rounded-md w-24", getPlanBadgeStyle(user.plan))}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Free">Free</SelectItem>
                          <SelectItem value="Pro">Pro</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-slate-700">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {formatDate(user.updatedAt)}
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
                            <span>View Scan History</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center"
                            onClick={() => toggleUserStatus(user.id, user.isActive)}
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            <span>{user.isActive ? 'Deactivate' : 'Activate'} User</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-500">
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