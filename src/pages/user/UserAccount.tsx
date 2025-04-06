
import { UserLayout } from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function UserAccount() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const { toast } = useToast();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    });
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Button>Update Password</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="bg-shield-purple text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">
                    Premium Plan
                  </div>
                  <p className="text-sm text-slate-500">
                    Your subscription renews on April 15, 2023
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-medium flex justify-between">
                      <span>Scans</span>
                      <span>27 / 50</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 mt-1">
                      <div
                        className="h-full rounded-full bg-shield-blue"
                        style={{ width: "54%" }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium flex justify-between">
                      <span>Takedowns</span>
                      <span>4 / 10</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 mt-1">
                      <div
                        className="h-full rounded-full bg-shield-blue"
                        style={{ width: "40%" }}
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </Label>
                </div>
                
                <div>
                  <Label className="flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <input type="checkbox" className="toggle" />
                  </Label>
                </div>
                
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
