
import { UserLayout } from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { Search, Plus, Clock, AlertCircle, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock takedown data
const mockTakedowns = [
  {
    id: "takedown-001",
    createdAt: "2023-04-05T14:30:00Z",
    platform: "YouTube",
    status: "Approved",
    contentName: "Spring Collection Promo",
    url: "https://youtube.com/watch?v=abc123"
  },
  {
    id: "takedown-002",
    createdAt: "2023-04-04T10:45:00Z",
    platform: "Instagram",
    status: "Pending",
    contentName: "Product Launch Video",
    url: "https://instagram.com/p/def456"
  },
  {
    id: "takedown-003",
    createdAt: "2023-04-03T08:30:00Z",
    platform: "TikTok",
    status: "Rejected",
    contentName: "Brand Commercial",
    url: "https://tiktok.com/@user/video/ghi789"
  },
  {
    id: "takedown-004",
    createdAt: "2023-04-02T16:20:00Z",
    platform: "Facebook",
    status: "Approved",
    contentName: "Tutorial Series",
    url: "https://facebook.com/watch/?v=jkl012"
  }
];

export default function UserTakedowns() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case "Approved":
        return "text-green-600";
      case "Pending":
        return "text-amber-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">My Takedown Requests</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New Takedown</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search takedowns..."
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTakedowns.map(takedown => (
                <TableRow key={takedown.id}>
                  <TableCell className="font-medium">{takedown.contentName}</TableCell>
                  <TableCell>{formatDate(takedown.createdAt)}</TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700">
                      {takedown.platform}
                    </span>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={takedown.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-shield-blue hover:underline truncate max-w-xs inline-block"
                    >
                      {takedown.url}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(takedown.status)}
                      <span className={getStatusClass(takedown.status)}>
                        {takedown.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </UserLayout>
  );
}
