import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, Clock, Award } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";
import { StatCard } from "@/components/StatCard";

export const Route = createFileRoute("/teacher/analytics")({
  head: () => ({ meta: [{ title: "Analytics · Teacher Portal" }] }),
  component: Analytics,
});

function Analytics() {
  const engagement = [30, 45, 38, 52, 60, 75, 68, 82, 78, 90, 85, 95];
  return (
    <div>
      <PortalTopbar title="Analytics" subtitle="Track student engagement and content performance." />
      <div className="p-6 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Active Students" value={428} icon={Users} trend="+8% WoW" accent="purple" />
          <StatCard label="Avg. Engagement" value={78} suffix="%" icon={TrendingUp} trend="+12% WoW" accent="green" />
          <StatCard label="Hours Learned" value={2840} icon={Clock} accent="blue" />
          <StatCard label="Avg. Score" value={86} suffix="%" icon={Award} trend="+4% WoW" accent="amber" />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <h3 className="font-semibold mb-1">Student Engagement</h3>
            <p className="text-xs text-muted-foreground mb-6">Weekly active minutes</p>
            <svg viewBox="0 0 400 160" className="w-full h-48">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.21 295)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="oklch(0.62 0.21 295)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="oklch(0.62 0.21 295)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={engagement.map((v, i) => `${(i / (engagement.length - 1)) * 400},${160 - (v / 100) * 140}`).join(" ")}
              />
              <polygon
                fill="url(#grad)"
                points={`0,160 ${engagement.map((v, i) => `${(i / (engagement.length - 1)) * 400},${160 - (v / 100) * 140}`).join(" ")} 400,160`}
              />
            </svg>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <h3 className="font-semibold mb-1">Subject Distribution</h3>
            <p className="text-xs text-muted-foreground mb-6">By student activity</p>
            <div className="space-y-4">
              {[
                { s: "Physics", v: 34, c: "from-info to-purple" },
                { s: "Mathematics", v: 28, c: "from-purple to-purple-light" },
                { s: "Chemistry", v: 18, c: "from-success to-info" },
                { s: "Computer Science", v: 12, c: "from-warning to-destructive" },
                { s: "Biology", v: 8, c: "from-purple-light to-warning" },
              ].map((x) => (
                <div key={x.s}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{x.s}</span>
                    <span className="text-muted-foreground">{x.v}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${x.c} rounded-full transition-bounce`} style={{ width: `${x.v * 2.5}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
