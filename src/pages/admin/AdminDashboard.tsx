
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Check, 
  Clock, 
  FileText, 
  Search, 
  Shield, 
  User, 
  XCircle 
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Scans</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +2 since last check
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Takedown Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 in progress, 2 failed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              4 new this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">DMCA Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              YouTube, Instagram, TikTok
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 space-y-8">
        <Tabs defaultValue="recent-activity">
          <TabsList>
            <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="platform-status">Platform Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent-activity" className="space-y-4">
            <h2 className="text-xl font-semibold mt-6">Recent Activity</h2>
            
            <div className="rounded-md border bg-white">
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Takedown Request Approved</h3>
                      <span className="text-sm text-slate-500">15 min ago</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      DMCA takedown request for YouTube content was approved and submitted
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Search className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">New Scan Request</h3>
                      <span className="text-sm text-slate-500">1 hour ago</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      New scan request from john.doe@example.com for YouTube videos
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Takedown Failed</h3>
                      <span className="text-sm text-slate-500">3 hours ago</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Takedown request for TikTok content failed. Retry option available.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Plan Upgrade</h3>
                      <span className="text-sm text-slate-500">5 hours ago</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      User mark.wilson@example.com upgraded from Premium to Pro plan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="platform-status">
            <h2 className="text-xl font-semibold mt-6">Platform Status</h2>
            
            <div className="rounded-md border bg-white mt-4">
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-md border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                        <h3 className="font-medium">YouTube</h3>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        Active
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      DMCA process is working correctly. 5 requests processed today.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-amber-600 mr-2" />
                        <h3 className="font-medium">Instagram</h3>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                        Degraded
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      Some delays in processing. Average response time: 48 hours.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-red-600 mr-2" />
                        <h3 className="font-medium">TikTok</h3>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                        Issues
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      API issues detected. Manual processing required.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        <h3 className="font-medium">Facebook</h3>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        Active
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      DMCA process working normally. 2 requests pending.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
