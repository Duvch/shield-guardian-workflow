
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DMCATemplates } from "@/components/dmca-templates/DMCATemplates";

export default function DMCATemplatesPage() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">DMCA Templates</h1>
      </div>
      
      <DMCATemplates />
    </AdminLayout>
  );
}
