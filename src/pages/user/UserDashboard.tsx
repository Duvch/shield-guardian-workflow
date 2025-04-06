
import { UserLayout } from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, BarChart3, Search, Clock, ScanLine } from "lucide-react";
import { useState } from "react";
import { StartScanDialog } from "@/components/scan-requests/StartScanDialog";

export default function UserDashboard() {
  const [showStartScanDialog, setShowStartScanDialog] = useState(false);

  return (
    <UserLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button 
          onClick={() => setShowStartScanDialog(true)}
          className="bg-shield-blue hover:bg-shield-blue/90"
        >
          <ScanLine className="mr-2 h-4 w-4" /> Start New Scan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Content Scans</CardTitle>
            <CardDescription>Current scan status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground mt-1">
              2 completed, 1 in progress
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = "/user/scans"}>
              View Scans <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Takedown Requests</CardTitle>
            <CardDescription>Active DMCA notices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs text-muted-foreground mt-1">
              3 successful, 2 pending
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = "/user/takedowns"}>
              View Takedowns <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Usage Report</CardTitle>
            <CardDescription>Current billing period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60%</div>
            <div className="text-xs text-muted-foreground mt-1">
              12/20 scans used
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.href = "/user/usage"}>
              View Usage <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Search className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">YouTube Scan Completed</h3>
                <span className="text-xs text-slate-500">2 hours ago</span>
              </div>
              <p className="text-sm text-slate-700 mt-1">
                Scan detected 3 potential matches across YouTube channels.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Takedown Notice Sent</h3>
                <span className="text-xs text-slate-500">1 day ago</span>
              </div>
              <p className="text-sm text-slate-700 mt-1">
                DMCA takedown request for YouTube content ID: YT-54321 submitted.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Scan Request Submitted</h3>
                <span className="text-xs text-slate-500">3 days ago</span>
              </div>
              <p className="text-sm text-slate-700 mt-1">
                New TikTok content scan requested. Awaiting processing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <StartScanDialog
        open={showStartScanDialog}
        onOpenChange={setShowStartScanDialog}
      />
    </UserLayout>
  );
}
