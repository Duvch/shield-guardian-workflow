
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ScanRequestsTable } from "@/components/scan-requests/ScanRequestsTable";

export default function ScanRequests() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Scan Requests</h1>
      </div>
      
      <ScanRequestsTable />
    </AdminLayout>
  );
}
