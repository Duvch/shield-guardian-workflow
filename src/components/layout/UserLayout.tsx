
import { ReactNode } from "react";
import { UserSidebar } from "./UserSidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

interface UserLayoutProps {
  children: ReactNode;
  className?: string;
}

export function UserLayout({ children, className }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex">
        <UserSidebar />
        <main className={cn("flex-1 p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
