import { createFileRoute } from "@tanstack/react-router";
import { PortalTopbar } from "@/components/PortalSidebar";
import { Flame, BookOpen, Target, Award } from "lucide-react";

export const Route = createFileRoute("/student/profile")({
  head: () => ({ meta: [{ title: "Profile · Student Portal" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div>
      <PortalTopbar title="Profile" subtitle="Your learning identity." />
      <div className="p-6 max-w-4xl space-y-6">
        <div className="rounded-2xl bg-gradient-hero p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="relative flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-white text-navy flex items-center justify-center text-2xl font-bold shadow-elegant">AM</div>
            <div>
              <h2 className="text-2xl font-bold">Alex Morgan</h2>
              <p className="text-white/70">B.Tech · Computer Science · Year 2</p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark text-xs font-medium">
                <Flame className="h-3.5 w-3.5 text-warning" /> 12-day learning streak
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: BookOpen, label: "Topics Mastered", value: 42 },
            { icon: Target, label: "Avg. Score", value: "86%" },
            { icon: Award, label: "Badges Earned", value: 9 },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-card border border-border p-5 shadow-soft text-center">
              <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-glow mb-3">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
          <h3 className="font-semibold mb-4">Subject Mastery</h3>
          <div className="space-y-4">
            {[
              { s: "Mathematics", v: 88 },
              { s: "Physics", v: 76 },
              { s: "Computer Science", v: 92 },
              { s: "Chemistry", v: 64 },
            ].map((x) => (
              <div key={x.s}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{x.s}</span>
                  <span className="text-muted-foreground">{x.v}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full transition-bounce" style={{ width: `${x.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
