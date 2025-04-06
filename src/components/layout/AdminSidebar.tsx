
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  BarChart3, 
  CheckCircle, 
  FileText, 
  Home, 
  Search as SearchIcon, 
  Shield, 
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
}

function NavItem({ href, icon: Icon, label, active, badge }: NavItemProps) {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 mb-1",
          active ? "bg-slate-100 text-shield-blue font-medium" : "text-slate-600"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
        {badge ? (
          <span className="ml-auto bg-shield-red rounded-full text-white text-xs min-w-5 h-5 flex items-center justify-center px-1">
            {badge}
          </span>
        ) : null}
      </Button>
    </Link>
  );
}

export function AdminSidebar() {
  const [activePath, setActivePath] = useState("/admin/scan-requests");
  
  return (
    <aside className="w-64 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <NavItem 
          href="/admin/dashboard" 
          icon={Home} 
          label="Dashboard" 
          active={activePath === "/admin/dashboard"} 
        />
        <NavItem 
          href="/admin/scan-requests" 
          icon={SearchIcon} 
          label="Scan Requests" 
          active={activePath === "/admin/scan-requests"} 
          badge={5}
        />
        <NavItem 
          href="/admin/takedown-requests" 
          icon={AlertTriangle} 
          label="Takedown Requests" 
          active={activePath === "/admin/takedown-requests"} 
          badge={3}
        />
        <NavItem 
          href="/admin/users" 
          icon={Users} 
          label="Users" 
          active={activePath === "/admin/users"} 
        />
        <NavItem 
          href="/admin/dmca-templates" 
          icon={FileText} 
          label="DMCA Templates" 
          active={activePath === "/admin/dmca-templates"} 
        />
        <NavItem 
          href="/admin/reports" 
          icon={BarChart3} 
          label="Reports" 
          active={activePath === "/admin/reports"} 
        />
      </div>
      
      <div className="p-4 mt-6 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-400 mb-3 px-3">DMCA Status</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="text-shield-green h-4 w-4" />
              <span>YouTube</span>
            </div>
            <span className="text-shield-green text-xs font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between px-3 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="text-shield-yellow h-4 w-4" />
              <span>Instagram</span>
            </div>
            <span className="text-shield-yellow text-xs font-medium">Pending</span>
          </div>
          <div className="flex items-center justify-between px-3 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="text-shield-red h-4 w-4" />
              <span>TikTok</span>
            </div>
            <span className="text-shield-red text-xs font-medium">Failed</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
