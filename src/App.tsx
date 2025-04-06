
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/scan-requests" element={<ScanRequests />} />
          <Route path="/admin/takedown-requests" element={<TakedownRequests />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/dmca-templates" element={<DMCATemplates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
