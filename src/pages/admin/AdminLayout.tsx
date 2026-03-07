import { Outlet, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { ArrowLeft } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-background">
      <SidebarProvider>
        <div className="min-h-[calc(100vh-5rem)] flex w-full">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="h-12 flex items-center gap-3 border-b border-border px-4">
              <SidebarTrigger />
              <Link to="/" className="font-body text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back to Site
              </Link>
            </div>
            <main className="flex-1 p-4 md:p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
