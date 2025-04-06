// src/components/users/UsersTable.tsx

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  usage: number;
  usageLimit: number;
  status: string;
  lastLogin: string;
}

const data: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "premium",
    usage: 35,
    usageLimit: 50,
    status: "active",
    lastLogin: "2024-03-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "pro",
    usage: 75,
    usageLimit: 100,
    status: "active",
    lastLogin: "2024-03-20",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    plan: "demo",
    usage: 10,
    usageLimit: 20,
    status: "inactive",
    lastLogin: "2024-03-01",
  },
  {
    id: "4",
    name: "Bob Williams",
    email: "bob.williams@example.com",
    plan: "premium",
    usage: 60,
    usageLimit: 50,
    status: "active",
    lastLogin: "2024-03-22",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    plan: "pro",
    usage: 90,
    usageLimit: 100,
    status: "active",
    lastLogin: "2024-03-25",
  },
  {
    id: "6",
    name: "Diana Miller",
    email: "diana.miller@example.com",
    plan: "demo",
    usage: 15,
    usageLimit: 20,
    status: "inactive",
    lastLogin: "2024-02-28",
  },
  {
    id: "7",
    name: "Ethan Davis",
    email: "ethan.davis@example.com",
    plan: "premium",
    usage: 40,
    usageLimit: 50,
    status: "active",
    lastLogin: "2024-03-10",
  },
  {
    id: "8",
    name: "Fiona Wilson",
    email: "fiona.wilson@example.com",
    plan: "pro",
    usage: 80,
    usageLimit: 100,
    status: "active",
    lastLogin: "2024-03-18",
  },
  {
    id: "9",
    name: "George Moore",
    email: "george.moore@example.com",
    plan: "demo",
    usage: 5,
    usageLimit: 20,
    status: "inactive",
    lastLogin: "2024-02-20",
  },
  {
    id: "10",
    name: "Hannah Taylor",
    email: "hannah.taylor@example.com",
    plan: "premium",
    usage: 45,
    usageLimit: 50,
    status: "active",
    lastLogin: "2024-03-05",
  },
  {
    id: "11",
    name: "Ian Anderson",
    email: "ian.anderson@example.com",
    plan: "pro",
    usage: 70,
    usageLimit: 100,
    status: "active",
    lastLogin: "2024-03-12",
  },
  {
    id: "12",
    name: "Julia White",
    email: "julia.white@example.com",
    plan: "demo",
    usage: 12,
    usageLimit: 20,
    status: "inactive",
    lastLogin: "2024-03-03",
  },
  {
    id: "13",
    name: "Kevin Harris",
    email: "kevin.harris@example.com",
    plan: "premium",
    usage: 55,
    usageLimit: 50,
    status: "active",
    lastLogin: "2024-03-24",
  },
  {
    id: "14",
    name: "Linda Clark",
    email: "linda.clark@example.com",
    plan: "pro",
    usage: 85,
    usageLimit: 100,
    status: "active",
    lastLogin: "2024-03-26",
  },
  {
    id: "15",
    name: "Mike Turner",
    email: "mike.turner@example.com",
    plan: "demo",
    usage: 8,
    usageLimit: 20,
    status: "inactive",
    lastLogin: "2024-02-15",
  },
];

export function UsersTable() {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [users, setUsers] = useState(data);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPlan, setEditPlan] = useState("");
  const [editUsageLimit, setEditUsageLimit] = useState<number>(0);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    if (editUserId) {
      const user = users.find((user) => user.id === editUserId);
      if (user) {
        setEditName(user.name);
        setEditEmail(user.email);
        setEditPlan(user.plan);
        setEditUsageLimit(user.usageLimit);
        setEditStatus(user.status);
      }
    }
  }, [editUserId, users]);

  const handleUpdateUser = () => {
    if (!editUserId) return;

    const updatedUsers = users.map((user) =>
      user.id === editUserId
        ? {
            ...user,
            name: editName,
            email: editEmail,
            plan: editPlan,
            usageLimit: editUsageLimit,
            status: editStatus,
          }
        : user
    );

    setUsers(updatedUsers);
    setEditUserId(null);
    toast.success("User updated successfully.");
  };

  const handleDeleteUser = (id: string) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const updatedUsers = users.filter((user) => user.id !== userToDelete);
      setUsers(updatedUsers);
      setRowSelection({});
      toast.success("User deleted successfully.");
    }
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const cancelDeleteUser = () => {
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(event) => {
            table.toggleAllPageRowsSelected(event.target.checked);
          }}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(event) => row.toggleSelected(event.target.checked)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "plan",
      header: "Plan",
    },
    {
      accessorKey: "usage",
      header: "Usage",
    },
    {
      accessorKey: "usageLimit",
      header: "Usage Limit",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setEditUserId(user.id);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-500 focus:text-red-500"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    rowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilter,
  });

  const getNextPlanPrice = (currentPlan: string): number => {
    if (currentPlan === "demo") return 0;
    if (currentPlan === "premium") return 19.99;
    if (currentPlan === "pro") return 49.99;
    return 0;
  };

  return (
    <div>
      {users.some(
        (user) => user.plan === "premium" && user.usage > user.usageLimit
      ) && (
        <Alert variant="destructive">
          <AlertTitle>
            Warning! High usage detected for premium plan users.
          </AlertTitle>
          <AlertDescription>
            Some users on the premium plan have exceeded their usage limit.
            Consider upgrading them or contacting them.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center py-4">
        <Input
          type="text"
          placeholder="Filter users..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm mr-2"
        />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            const selectedUserIds = Object.keys(rowSelection);
            if (selectedUserIds.length > 0) {
              setUserToDelete(selectedUserIds[0]);
              setIsDeleteDialogOpen(true);
            } else {
              toast.error("No users selected for deletion.");
            }
          }}
        >
          Delete Selected
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of{" "}
          {table.getCoreRowModel().rows.length} row(s) visible
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete
              selected user?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteUser}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editUserId && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
          <div className="relative m-auto mt-20 flex max-w-md flex-col rounded-xl bg-white p-8">
            <h2 className="text-lg font-semibold">Edit User</h2>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan" className="text-right">
                  Plan
                </Label>
                <Select value={editPlan} onValueChange={setEditPlan}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="usageLimit" className="text-right">
                  Usage Limit
                </Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={editUsageLimit}
                  onChange={(e) =>
                    setEditUsageLimit(Number(e.target.value))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setEditUserId(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser}>Update User</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
