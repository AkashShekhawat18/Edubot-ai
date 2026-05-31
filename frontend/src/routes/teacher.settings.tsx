import { createFileRoute } from "@tanstack/react-router";
import { PortalTopbar } from "@/components/PortalSidebar";
import { Bell, Lock, User, Palette } from "lucide-react";

export const Route = createFileRoute("/teacher/settings")({
  head: () => ({ meta: [{ title: "Settings · Teacher Portal" }] }),
  component: Settings,
});

const sections = [
  { icon: User, title: "Profile", desc: "Update your personal info and avatar." },
  { icon: Bell, title: "Notifications", desc: "Configure email and push alerts." },
  { icon: Lock, title: "Security", desc: "Manage password and two-factor auth." },
  { icon: Palette, title: "Appearance", desc: "Choose theme and accent colors." },
];

function Settings() {
  return (
    <div>
      <PortalTopbar title="Settings" subtitle="Manage your workspace preferences." />
      <div className="p-6 max-w-3xl space-y-4">
        {sections.map((s, i) => (
          <div key={s.title} className="rounded-2xl bg-card border border-border p-5 hover-lift shadow-soft flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-glow">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-smooth">Manage</button>
          </div>
        ))}
      </div>
    </div>
  );
}
