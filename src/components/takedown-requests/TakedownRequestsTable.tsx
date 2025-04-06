
import { useState } from "react";
import { AlertTriangle, Check, ExternalLink, MoreHorizontal, PenLine, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TakedownRequest {
  id: string;
  userEmail: string;
  platform: string;
  contentType: string;
  violationType: string;
  evidenceUrl: string;
  evidencePreview: string;
  scanApprovedBy: string;
  status: "Pending" | "In Process" | "Success" | "Failed";
  dmcaFiled: boolean;
}

const mockTakedownRequests: TakedownRequest[] = [
  {
    id: "td-001",
    userEmail: "john.doe@example.com",
    platform: "YouTube",
    contentType: "Video",
    violationType: "Copyright Infringement",
    evidenceUrl: "https://youtube.com/watch?v=abc123",
    evidencePreview: "https://picsum.photos/id/237/60/40",
    scanApprovedBy: "Admin User",
    status: "Pending",
    dmcaFiled: false
  },
  {
    id: "td-002",
    userEmail: "alice.smith@example.com",
    platform: "Instagram",
    contentType: "Image",
    violationType: "Trademark Violation",
    evidenceUrl: "https://instagram.com/p/def456",
    evidencePreview: "https://picsum.photos/id/238/60/40",
    scanApprovedBy: "Admin User",
    status: "In Process",
    dmcaFiled: true
  },
  {
    id: "td-003",
    userEmail: "mark.wilson@example.com",
    platform: "TikTok",
    contentType: "Video",
    violationType: "Copyright Infringement",
    evidenceUrl: "https://tiktok.com/@user/video/ghi789",
    evidencePreview: "https://picsum.photos/id/239/60/40",
    scanApprovedBy: "System",
    status: "Success",
    dmcaFiled: true
  },
  {
    id: "td-004",
    userEmail: "emily.jones@example.com",
    platform: "Facebook",
    contentType: "Video",
    violationType: "Copyright Infringement",
    evidenceUrl: "https://facebook.com/watch/?v=jkl012",
    evidencePreview: "https://picsum.photos/id/240/60/40",
    scanApprovedBy: "Admin User",
    status: "Failed",
    dmcaFiled: true
  }
];

export function TakedownRequestsTable() {
  const [takedownRequests] = useState<TakedownRequest[]>(mockTakedownRequests);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [selectedRequest, setSelectedRequest] = useState<TakedownRequest | null>(null);
  const [dmcaText, setDmcaText] = useState("");
  const [showDmcaDialog, setShowDmcaDialog] = useState(false);
  const { toast } = useToast();

  const platforms = ["All", "YouTube", "Instagram", "TikTok", "Facebook", "Reddit"];
  
  const filteredRequests = selectedPlatform === "All"
    ? takedownRequests
    : takedownRequests.filter(request => request.platform === selectedPlatform);

  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "In Process":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Success":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Failed":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200";
    }
  };

  const handleFileDmca = (request: TakedownRequest) => {
    setSelectedRequest(request);
    setDmcaText(
      `DMCA Takedown Notice\n\nTo Whom It May Concern at ${request.platform},\n\nI am writing to notify you that my copyrighted content has been posted to your platform without my authorization.\n\nContent URL: ${request.evidenceUrl}\n\nI have a good faith belief that the use of the material in the manner complained of is not authorized by me, the copyright owner.\n\nPlease remove this content immediately.\n\nSincerely,\n[COPYRIGHT OWNER NAME]`
    );
    setShowDmcaDialog(true);
  };

  const handleSubmitDmca = () => {
    toast({
      title: "DMCA Takedown Filed",
      description: `The DMCA takedown notice has been submitted to ${selectedRequest?.platform}.`,
    });
    setShowDmcaDialog(false);
  };

  const handleStatusChange = (requestId: string, newStatus: string) => {
    // In a real application, this would be an API call to update the status
    toast({
      title: "Status Updated",
      description: `The request status has been updated to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map(platform => (
                <SelectItem key={platform} value={platform}>
                  {platform}
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
                <th className="px-4 py-3 text-left font-medium text-slate-600">Platform</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Violation</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Evidence</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Approved By</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">DMCA</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b animate-fade-in">
                  <td className="px-4 py-3 text-slate-700">{request.userEmail}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={cn(
                        "rounded-md font-normal",
                        request.platform === "YouTube" && "bg-red-100 text-red-800",
                        request.platform === "Instagram" && "bg-purple-100 text-purple-800",
                        request.platform === "TikTok" && "bg-black text-white",
                        request.platform === "Facebook" && "bg-blue-100 text-blue-800",
                        request.platform === "Reddit" && "bg-orange-100 text-orange-800"
                      )}
                    >
                      {request.platform}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{request.violationType}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <a href={request.evidenceUrl} target="_blank" rel="noopener noreferrer">
                        <img
                          src={request.evidencePreview}
                          alt="Evidence thumbnail"
                          className="w-15 h-10 object-cover rounded mr-2"
                        />
                      </a>
                      <a
                        href={request.evidenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{request.scanApprovedBy}</td>
                  <td className="px-4 py-3">
                    <Select defaultValue={request.status} onValueChange={(value) => handleStatusChange(request.id, value)}>
                      <SelectTrigger className={cn("px-2 h-7 rounded-sm w-28", getStatusBadgeStyle(request.status))}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Process">In Process</SelectItem>
                        <SelectItem value="Success">Success</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    {request.dmcaFiled ? (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span className="text-xs">Filed</span>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleFileDmca(request)}>
                        File DMCA
                      </Button>
                    )}
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
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <PenLine className="mr-2 h-4 w-4" />
                          <span>Edit DMCA</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-red-600">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          <span>Report Issue</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-slate-500">
                    No takedown requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={showDmcaDialog} onOpenChange={setShowDmcaDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>File DMCA Takedown Notice</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Platform</p>
                  <p className="mt-1">{selectedRequest.platform}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Content URL</p>
                  <p className="mt-1 text-blue-600 truncate">
                    <a href={selectedRequest.evidenceUrl} target="_blank" rel="noopener noreferrer">
                      {selectedRequest.evidenceUrl}
                    </a>
                  </p>
                </div>
              </div>
              
              <div>
                <label htmlFor="dmca-text" className="text-sm font-medium text-slate-500">
                  DMCA Takedown Notice
                </label>
                <Textarea
                  id="dmca-text"
                  className="mt-1 font-mono text-sm h-64"
                  value={dmcaText}
                  onChange={(e) => setDmcaText(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDmcaDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitDmca}>
              Submit DMCA Notice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
