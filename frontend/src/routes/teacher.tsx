import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, ClipboardCheck, Sparkles, BarChart3, Settings } from "lucide-react";
import { PortalSidebar, type NavItem } from "@/components/PortalSidebar";

const items: NavItem[] = [
  { to: "/teacher", label: "Dashboard", icon: LayoutDashboard },
  { to: "/teacher/resources", label: "Resource Library", icon: BookOpen },
  { to: "/teacher/assessments", label: "Assessment Builder", icon: ClipboardCheck },
  { to: "/teacher/assistant", label: "Teaching Assistant", icon: Sparkles },
  { to: "/teacher/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/teacher/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/teacher")({
  component: () => (
    <div className="flex bg-background min-h-screen">
      <PortalSidebar items={items} portalLabel="Teacher Portal" />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  ),
});
