
import { UserLayout } from "@/components/layout/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertTriangle, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  
  // Mock user data - in a real app, this would come from an API or auth context
  const userData = {
    name: "John Doe",
    plan: "Premium",
    scansUsed: 27,
    scansLimit: 50,
    takedownsUsed: 4,
    takedownsLimit: 10,
    lastScanDate: "2023-04-05T14:30:00Z",
    lastTakedownDate: "2023-04-03T10:45:00Z"
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

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {userData.name}</h1>
          <div className="bg-shield-purple text-white px-3 py-1 rounded-full text-sm font-semibold">
            {userData.plan} Plan
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Scans Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userData.scansUsed} / {userData.scansLimit}
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-shield-blue"
                  style={{ width: `${(userData.scansUsed / userData.scansLimit) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Takedowns Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userData.takedownsUsed} / {userData.takedownsLimit}
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-shield-blue"
                  style={{ width: `${(userData.takedownsUsed / userData.takedownsLimit) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Last Scan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDate(userData.lastScanDate)}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                YouTube, TikTok
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Last Takedown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatDate(userData.lastTakedownDate)}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Instagram
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5 text-shield-blue" />
                Quick Scan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-slate-600">
                Search for your content across social media platforms to detect unauthorized use.
              </p>
              <Button onClick={() => navigate("/user/scans/new")}>
                Start New Scan
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-shield-red" />
                File Takedown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-slate-600">
                Request the removal of your unauthorized content using DMCA notices.
              </p>
              <Button onClick={() => navigate("/user/takedowns/new")}>
                Request Takedown
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-shield-blue" />
              Platform Protection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 rounded-md bg-green-50">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>YouTube</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-md bg-yellow-50">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span>Instagram</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-md bg-red-50">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span>TikTok</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-md bg-blue-50">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span>Facebook</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-shield-teal" />
              Recent Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                <div>YouTube DMCA Template</div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                <div>Instagram Copyright Notice</div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                <div>TikTok Content Removal</div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}
