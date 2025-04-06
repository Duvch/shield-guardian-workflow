
import { AdminLayout } from "@/components/layout/AdminLayout";
import { TakedownRequestsTable } from "@/components/takedown-requests/TakedownRequestsTable";

export default function TakedownRequests() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Takedown Requests</h1>
      </div>
      
      <TakedownRequestsTable />
    </AdminLayout>
  );
}
