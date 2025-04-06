
import { useState } from "react";
import { Check, Clock, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ScanRequest {
  id: string;
  userEmail: string;
  platform: string;
  contentType: string;
  reason: string;
  requestTime: string;
  plan: "Demo" | "Premium" | "Pro";
}

const mockScanRequests: ScanRequest[] = [
  {
    id: "req-001",
    userEmail: "john.doe@example.com",
    platform: "YouTube",
    contentType: "Video",
    reason: "Found my copyrighted video content",
    requestTime: "2023-04-05T14:30:00Z",
    plan: "Premium"
  },
  {
    id: "req-002",
    userEmail: "alice.smith@example.com",
    platform: "Instagram",
    contentType: "Image",
    reason: "My images are being used without permission",
    requestTime: "2023-04-05T12:15:00Z",
    plan: "Demo"
  },
  {
    id: "req-003",
    userEmail: "mark.wilson@example.com",
    platform: "TikTok",
    contentType: "Video",
    reason: "Content stolen from my account",
    requestTime: "2023-04-05T10:45:00Z",
    plan: "Pro"
  },
  {
    id: "req-004",
    userEmail: "emily.jones@example.com",
    platform: "Facebook",
    contentType: "Video",
    reason: "Multiple videos copied to this platform",
    requestTime: "2023-04-05T09:20:00Z",
    plan: "Premium"
  },
  {
    id: "req-005",
    userEmail: "sarah.lee@example.com",
    platform: "Reddit",
    contentType: "Image",
    reason: "My artwork posted without credit",
    requestTime: "2023-04-05T08:10:00Z",
    plan: "Demo"
  }
];

export function ScanRequestsTable() {
  const [scanRequests, setScanRequests] = useState<ScanRequest[]>(mockScanRequests);
  const [selectedRequest, setSelectedRequest] = useState<ScanRequest | null>(null);
  const [modalType, setModalType] = useState<"approve" | "reject" | null>(null);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }).format(date);
  };

  const handleOpenModal = (request: ScanRequest, type: "approve" | "reject") => {
    setSelectedRequest(request);
    setModalType(type);
    setComment("");
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setModalType(null);
  };

  const handleConfirm = () => {
    if (!selectedRequest || !modalType) return;

    // In a real application, this would be an API call
    const updatedRequests = scanRequests.filter(r => r.id !== selectedRequest.id);
    setScanRequests(updatedRequests);

    const action = modalType === "approve" ? "approved" : "rejected";
    
    toast({
      title: `Scan request ${action}`,
      description: `The scan request from ${selectedRequest.userEmail} for ${selectedRequest.platform} has been ${action}.`,
      variant: modalType === "approve" ? "default" : "destructive",
    });

    handleCloseModal();
  };

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

  return (
    <div className="rounded-md border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 text-left font-medium text-slate-600">User Email</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Platform</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Content Type</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Reason</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Request Time</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Plan</th>
              <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scanRequests.map((request) => (
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
                <td className="px-4 py-3 text-slate-700">{request.contentType}</td>
                <td className="px-4 py-3 text-slate-700 max-w-xs truncate" title={request.reason}>
                  {request.reason}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3 text-slate-400" />
                    {formatDate(request.requestTime)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge className={getPlanBadgeStyle(request.plan)}>
                    {request.plan}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-shield-green hover:text-shield-green hover:bg-green-50"
                      onClick={() => handleOpenModal(request, "approve")} 
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-shield-red hover:text-shield-red hover:bg-red-50"
                      onClick={() => handleOpenModal(request, "reject")} 
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {scanRequests.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-slate-500">
                  No pending scan requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedRequest && !!modalType} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "approve" ? "Approve Scan Request" : "Reject Scan Request"}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">User</p>
                  <p className="mt-1">{selectedRequest.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Platform</p>
                  <p className="mt-1">{selectedRequest.platform}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Content Type</p>
                  <p className="mt-1">{selectedRequest.contentType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Plan</p>
                  <p className="mt-1">{selectedRequest.plan}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-slate-500">Reason</p>
                <p className="mt-1 text-sm">{selectedRequest.reason}</p>
              </div>
              
              <div>
                <label htmlFor="comment" className="text-sm font-medium text-slate-500">
                  {modalType === "approve" ? "Approval" : "Rejection"} Comment (Optional)
                </label>
                <Textarea
                  id="comment"
                  placeholder="Add a comment..."
                  className="mt-1"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              variant={modalType === "approve" ? "default" : "destructive"}
            >
              {modalType === "approve" ? "Approve" : "Reject"} Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
