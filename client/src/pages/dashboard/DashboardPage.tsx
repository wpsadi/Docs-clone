import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/store/authStore";
import { useDocStore } from "@/store/docStore";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration

function DocumentStats({
  list,
}: {
  list: { id: string; title: string; key: string; createdAt: string }[];
}) {
  const totalDocs = list.length;
  // const publishedDocs = documents.filter(doc => doc.status === 'Published').length
  // const publishedDocs = 3
  // const draftDocs = totalDocs - publishedDocs
  // const draftDocs = 2

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDocs}</div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{publishedDocs}</div>
        </CardContent>
      </Card> */}
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Draft Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{draftDocs}</div>
        </CardContent>
      </Card> */}
    </div>
  );
}

function DocumentList({
  list,
}: {
  list: { id: string; title: string; key: string; createdAt: string }[];
}) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>CreatedAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((doc) => (
          <TableRow
            key={doc.id}
            onClick={() => {
              navigate(`/doc/${doc.id}?key=${doc.key}`);
            }}
            className="hover:bg-gray-300 cursor-pointer"
          >
            <TableCell>{doc.title}</TableCell>
            <TableCell>{"create"}</TableCell>
            <TableCell>{doc.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function DashboardPage() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const authStore = useAuthStore();
  const docStore = useDocStore();

  const docData = docStore.docs;

  useEffect(() => {
    docStore.listDocs();
  }, []);

  const handleLogout = () => {
    // Perform logout action here
    // console.log('Logging out...')
    setShowLogoutDialog(false);
    authStore.logout();
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onLogout={() => setShowLogoutDialog(true)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Dashboard
            </h1>
            <DocumentStats list={docData} />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">
              Documents
            </h2>
            <DocumentList list={docData} />
          </div>
        </main>
      </div>
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogDescription>
              This action will end your current session.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
