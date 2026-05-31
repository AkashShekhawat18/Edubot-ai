import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Brain, Target, Repeat, History, User } from "lucide-react";
import { PortalSidebar, type NavItem } from "@/components/PortalSidebar";

const items: NavItem[] = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/assistant", label: "Study Assistant", icon: Brain },
  { to: "/student/practice", label: "Practice Zone", icon: Target },
  { to: "/student/revision", label: "Revision Hub", icon: Repeat },
  { to: "/student/history", label: "Learning History", icon: History },
  { to: "/student/profile", label: "Profile", icon: User },
];

export const Route = createFileRoute("/student")({
  component: () => (
    <div className="flex bg-background min-h-screen">
      <PortalSidebar items={items} portalLabel="Student Portal" />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  ),
});
