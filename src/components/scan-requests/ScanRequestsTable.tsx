import { useState, useEffect } from "react";
import { Check, Clock, PlusIcon, TrashIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getScanRequests, updateScanRequestStatus, submitScanResults } from "@/api/scan-requests";

interface ScanRequest {
  id: number;
  userId: number;
  url: string;
  contentType: string;
  description: string | null;
  platforms: string;
  purposes: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userEmail: string;
  plan: string;
}

interface ScanResult {
  scanRequestId: number;
  result: string;
  score: string;
  detectionType: string;
  platform: string;
  sourceUrl: string;
  multipleSources: string[]; // Fix typo in property name
  imageUrl: string[];
}

export function ScanRequestsTable() {
  const [scanRequests, setScanRequests] = useState<ScanRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ScanRequest | null>(null);
  const [modalType, setModalType] = useState<"approve" | "reject" | null>(null);
  const [comment, setComment] = useState("");
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  // State for scan results
  const [scanResult, setScanResult] = useState<ScanResult>({
    scanRequestId: 0,
    result: "",
    score: "",
    detectionType: "",
    platform: "",
    sourceUrl: "",
    multipleSources: [],
    imageUrl: []
  });

  useEffect(() => {
    fetchScanRequests();
  }, []);

  useEffect(() => {
    // Update scanRequestId when a request is selected for approval
    if (selectedRequest && modalType === "approve") {
      setScanResult(prev => ({
        ...prev,
        scanRequestId: selectedRequest.id,
        platform: selectedRequest.platforms.split(",")[0].trim(),
        sourceUrl: selectedRequest.url
      }));
    }
  }, [selectedRequest, modalType]);

  const fetchScanRequests = async () => {
    setLoading(true);
    try {
      const data = await getScanRequests();
      setScanRequests(data);
    } catch (error) {
      console.error("Failed to fetch scan requests:", error);
      toast({
        title: "Error",
        description: "Failed to load scan requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  const handleOpenModal = (request: ScanRequest, type: "approve" | "reject") => {
    setSelectedRequest(request);
    setModalType(type);
    setComment("");

    // Reset scan result form when opening modal
    if (type === "approve") {
      setScanResult({
        scanRequestId: request.id,
        result: "",
        score: "",
        detectionType: "",
        platform: request.platforms.split(",")[0].trim(),
        sourceUrl: request.url,
        multipleSources: [],
        imageUrl: []
      });
    }
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setModalType(null);
  };

  const handleScanResultChange = (key: string, value: string | string[]) => {
    setScanResult(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConfirm = async () => {
    if (!selectedRequest || !modalType) return;

    setProcessing(true);
    try {
      if (modalType === "approve") {
        try {
          // First submit the scan results
          await submitScanResults(scanResult);

          // Then update the scan request status
          await updateScanRequestStatus(selectedRequest.id, modalType, comment);

          // Success - update UI and show toast
          setScanRequests(prev => prev.filter(r => r.id !== selectedRequest.id));

          toast({
            title: "Scan request approved",
            description: `The scan request from ${selectedRequest.userEmail} has been approved.`,
            variant: "default",
          });

          handleCloseModal();
        } catch (error) {
          console.error("Failed to approve scan request:", error);
          toast({
            title: "Error",
            description: "Failed to approve scan request. Please check all required fields and try again.",
            variant: "destructive",
          });
        }
      } else {
        try {
          // Just update the scan request status for rejection
          await updateScanRequestStatus(selectedRequest.id, modalType, comment);

          // Success - update UI and show toast
          setScanRequests(prev => prev.filter(r => r.id !== selectedRequest.id));

          toast({
            title: "Scan request rejected",
            description: `The scan request from ${selectedRequest.userEmail} has been rejected.`,
            variant: "destructive",
          });

          handleCloseModal();
        } catch (error) {
          console.error("Failed to reject scan request:", error);
          toast({
            title: "Error",
            description: "Failed to reject scan request. Please try again.",
            variant: "destructive",
          });
        }
      }
    } finally {
      setProcessing(false);
    }
  };

  const getPlanBadgeStyle = (plan: string) => {
    switch (plan) {
      case "Pro":
        return "bg-blue-500 text-white";
      case "Enterprise":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPriorityBadgeStyle = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlatformBadgeStyle = (platform: string) => {
    // For platforms stored as comma-separated values, we'll just style based on the first one
    const mainPlatform = platform.split(",")[0].trim();

    switch (mainPlatform) {
      case "YouTube":
        return "bg-red-100 text-red-800";
      case "Instagram":
        return "bg-purple-100 text-purple-800";
      case "TikTok":
        return "bg-black text-white";
      case "Facebook":
        return "bg-blue-100 text-blue-800";
      case "Reddit":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-medium">Pending Scan Requests</h2>
        <Button size="sm" onClick={fetchScanRequests} variant="outline">
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 text-left font-medium text-slate-600">User Email</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Platform</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Content Type</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Description</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Priority</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Purpose</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Created At</th>
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
                    className={getPlatformBadgeStyle(request.platforms)}
                  >
                    {request.platforms.split(",")[0].trim()}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate-700">{request.contentType}</td>
                <td className="px-4 py-3 text-slate-700">{request.url}</td>
                <td className="px-4 py-3">
                  <Badge className={getPriorityBadgeStyle(request.priority)}>
                    {request.priority}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate-700 max-w-xs truncate" title={request.purposes}>
                  {request.purposes}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3 text-slate-400" />
                    {formatDate(request.createdAt)}
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
                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleOpenModal(request, "approve")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
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
                <td colSpan={8} className="py-6 text-center text-slate-500">
                  No pending scan requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedRequest && !!modalType} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {modalType === "approve" ? "Approve Scan Request" : "Reject Scan Request"}
            </DialogTitle>
          </DialogHeader>

          {selectedRequest && (
  <div className="space-y-6 py-2">
    {modalType === "approve" && (
      <div className="border rounded-md p-4 bg-slate-50">
        <h3 className="text-md font-medium mb-4">Scan Results</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="result">Result</Label>
            <Input
              id="result"
              value={scanResult.result}
              onChange={(e) => handleScanResultChange("result", e.target.value)}
              placeholder="Enter result"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">Score</Label>
            <Input
              id="score"
              value={scanResult.score}
              onChange={(e) => handleScanResultChange("score", e.target.value)}
              placeholder="e.g. 85/100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="detectionType">Detection Type</Label>
            <Input
              id="detectionType"
              value={scanResult.detectionType}
              onChange={(e) => handleScanResultChange("detectionType", e.target.value)}
              placeholder="Enter detection type"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input
              id="platform"
              value={scanResult.platform}
              onChange={(e) => handleScanResultChange("platform", e.target.value)}
            />
          </div>

          {/* Source URL replaced with Multiple Sources section */}
          <div className="col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Source URLs</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  handleScanResultChange("multipleSources", [
                    ...(scanResult.multipleSources || []), 
                    ""
                  ])
                }}
              >
                <PlusIcon className="h-4 w-4 mr-1" /> Add Source
              </Button>
            </div>
            
            {(scanResult.multipleSources || []).map((source, index) => (
              <div key={`source-${index}`} className="flex items-center gap-2 mt-2">
                <Input
                  value={source}
                  onChange={(e) => {
                    const newSources = [...(scanResult.multipleSources || [])];
                    newSources[index] = e.target.value;
                    handleScanResultChange("multipleSources", newSources);
                  }}
                  placeholder="Enter source URL"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    const newSources = [...(scanResult.multipleSources || [])];
                    newSources.splice(index, 1);
                    handleScanResultChange("multipleSources", newSources);
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Image URLs section */}
          <div className="col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label>Image URLs</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  handleScanResultChange("imageUrl", [
                    ...(scanResult.imageUrl || []), 
                    ""
                  ])
                }}
              >
                <PlusIcon className="h-4 w-4 mr-1" /> Add Image
              </Button>
            </div>
            
            {(scanResult.imageUrl || []).map((image, index) => (
              <div key={`image-${index}`} className="flex items-center gap-2 mt-2">
                <Input
                  value={image}
                  onChange={(e) => {
                    const newImages = [...(scanResult.imageUrl || [])];
                    newImages[index] = e.target.value;
                    handleScanResultChange("imageUrl", newImages);
                  }}
                  placeholder="Enter image URL"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    const newImages = [...(scanResult.imageUrl || [])];
                    newImages.splice(index, 1);
                    handleScanResultChange("imageUrl", newImages);
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Relation between source and image */}
          <div className="col-span-2 mt-2">
            <div className="text-sm text-gray-500">
              Note: Ensure that each image URL corresponds to its related source URL at the same position.
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal} disabled={processing}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant={modalType === "approve" ? "default" : "destructive"}
              disabled={processing || (modalType === "approve" && !scanResult.result)}
            >
              {processing ? (
                <>
                  <span className="mr-2">Processing...</span>
                  <div className="animate-spin h-4 w-4 border-2 border-current rounded-full border-t-transparent"></div>
                </>
              ) : (
                `${modalType === "approve" ? "Approve" : "Reject"} Request`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}