
import { AdminLayout } from "@/components/layout/AdminLayout";
import { UsersTable } from "@/components/users/UsersTable";

export default function Users() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
      </div>
      
      <UsersTable />
    </AdminLayout>
  );
}
