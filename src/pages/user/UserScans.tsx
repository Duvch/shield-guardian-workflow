
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

// Mock scan data
const mockScans = [
  {
    id: "scan-001",
    createdAt: "2023-04-05T14:30:00Z",
    platforms: ["YouTube", "TikTok"],
    status: "Completed",
    matches: 12,
    contentName: "Spring Collection Promo"
  },
  {
    id: "scan-002",
    createdAt: "2023-04-04T10:45:00Z",
    platforms: ["Instagram", "Facebook"],
    status: "Completed",
    matches: 5,
    contentName: "Product Launch Video"
  },
  {
    id: "scan-003",
    createdAt: "2023-04-03T08:30:00Z",
    platforms: ["YouTube"],
    status: "In Progress",
    matches: 3,
    contentName: "Brand Commercial"
  },
  {
    id: "scan-004",
    createdAt: "2023-04-02T16:20:00Z",
    platforms: ["TikTok", "Instagram"],
    status: "Failed",
    matches: 0,
    contentName: "Tutorial Series"
  }
];

export default function UserScans() {
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
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">My Scans</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New Scan</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search scans..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
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
                <TableHead>Platforms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockScans.map(scan => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.contentName}</TableCell>
                  <TableCell>{formatDate(scan.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {scan.platforms.map(platform => (
                        <span 
                          key={platform} 
                          className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(scan.status)}
                      <span className={cn(
                        scan.status === "Completed" && "text-green-600",
                        scan.status === "In Progress" && "text-amber-600",
                        scan.status === "Failed" && "text-red-600"
                      )}>
                        {scan.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{scan.matches}</TableCell>
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
