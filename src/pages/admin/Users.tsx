
import { AdminLayout } from "@/components/layout/AdminLayout";
import { UsersTable } from "@/components/users/UsersTable";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { CreateUserDialog } from "@/components/users/CreateUserDialog";

export default function Users() {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <Button onClick={() => setIsCreateUserOpen(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Create User</span>
        </Button>
      </div>
      
      <UsersTable />
      <CreateUserDialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen} />
    </AdminLayout>
  );
}
