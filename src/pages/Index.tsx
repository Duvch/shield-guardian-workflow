
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, FileText, Search, Shield, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-shield-blue">AI Shield Guardian</h1>
            <Button onClick={() => navigate("/admin/dashboard")}>Admin Dashboard</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">AI Shield Admin Dashboard</h1>
            <p className="text-xl text-gray-600 mb-8">Manage scan requests, takedowns, and DMCA processes across platforms</p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/admin/dashboard")}>Go to Dashboard</Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/admin/scan-requests")}>View Scan Requests</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5 text-shield-blue" />
                  Scan Request Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Approve or reject scan requests from users based on their plan limits and content requirements.</p>
                <Button variant="outline" onClick={() => navigate("/admin/scan-requests")}>
                  Manage Scan Requests
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-shield-red" />
                  Takedown Request Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Monitor takedown requests, file DMCA notices, and track the status of each request across platforms.</p>
                <Button variant="outline" onClick={() => navigate("/admin/takedown-requests")}>
                  Process Takedowns
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-shield-purple" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Manage user plans, monitor usage, and set limits for scans and takedowns based on subscription level.</p>
                <Button variant="outline" onClick={() => navigate("/admin/users")}>
                  Manage Users
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-shield-teal" />
                  DMCA Template Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Create and manage platform-specific DMCA templates with custom variables for efficient takedown notices.</p>
                <Button variant="outline" onClick={() => navigate("/admin/dmca-templates")}>
                  Manage Templates
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-shield-blue" />
              <h2 className="text-xl font-semibold">Platform Shield Status</h2>
            </div>
            
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
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-slate-500">
            © 2025 AI Shield Guardian. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
