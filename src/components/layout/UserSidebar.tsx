
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, FileText, Search, AlertTriangle, User, Home } from "lucide-react";

export function UserSidebar() {
  const links = [
    {
      title: "Dashboard",
      href: "/user/dashboard",
      icon: Home,
    },
    {
      title: "My Scans",
      href: "/user/scans",
      icon: Search,
    },
    {
      title: "My Takedowns",
      href: "/user/takedowns",
      icon: AlertTriangle,
    },
    {
      title: "My Templates",
      href: "/user/templates",
      icon: FileText,
    },
    {
      title: "Usage Report",
      href: "/user/usage",
      icon: BarChart3,
    },
    {
      title: "Account",
      href: "/user/account",
      icon: User,
    },
  ];

  return (
    <div className="w-64 border-r border-slate-200 bg-white h-[calc(100vh-64px)] flex-shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-800">User Portal</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your content</p>
      </div>
      <nav className="px-3 py-2">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-shield-blue text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )
                }
              >
                <link.icon className="h-4 w-4" />
                <span>{link.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
