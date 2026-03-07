import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/UserSidebar";

const UserLayout = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn || !user) {
    navigate("/login");
    return null;
  }

  // Redirect admins to admin panel
  if (user.role === "admin") {
    navigate("/admin");
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <UserSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger />
            <h1 className="font-display text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
