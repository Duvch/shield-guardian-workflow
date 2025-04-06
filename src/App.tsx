
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ScanRequests from "./pages/admin/ScanRequests";
import TakedownRequests from "./pages/admin/TakedownRequests";
import Users from "./pages/admin/Users";
import DMCATemplates from "./pages/admin/DMCATemplates";
import UserDashboard from "./pages/user/UserDashboard";
import UserScans from "./pages/user/UserScans";
import UserTakedowns from "./pages/user/UserTakedowns";
import UserAccount from "./pages/user/UserAccount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/scan-requests" element={<ScanRequests />} />
          <Route path="/admin/takedown-requests" element={<TakedownRequests />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/dmca-templates" element={<DMCATemplates />} />
          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/scans" element={<UserScans />} />
          <Route path="/user/takedowns" element={<UserTakedowns />} />
          <Route path="/user/account" element={<UserAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
