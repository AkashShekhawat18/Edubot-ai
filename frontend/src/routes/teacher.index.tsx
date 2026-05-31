import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ClipboardCheck, Layers, Activity, Upload, Plus, BarChart3, FileText, Sparkles, Users, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PortalTopbar } from "@/components/PortalSidebar";

export const Route = createFileRoute("/teacher/")({
  head: () => ({ meta: [{ title: "Dashboard · Teacher Portal" }] }),
  component: TeacherDashboard,
});

const activity = [
  { icon: FileText, text: "Uploaded ‘Quantum Mechanics — Ch.4'", time: "2h ago", color: "text-purple" },
  { icon: ClipboardCheck, text: "Generated MCQ paper for Physics 201", time: "5h ago", color: "text-success" },
  { icon: Users, text: "12 students completed weekly quiz", time: "Yesterday", color: "text-info" },
  { icon: Sparkles, text: "Created lesson plan for Thermodynamics", time: "2d ago", color: "text-warning" },
];

const usage = [42, 65, 58, 78, 89, 72, 95, 84, 91, 76, 88, 94];

export function TeacherDashboard() {
  return (
    <div>
      <PortalTopbar title="Welcome back, Alex" subtitle="Here's what's happening in your classroom today." />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in-up">
          <StatCard label="Total Resources" value={248} icon={BookOpen} trend="+12 this week" accent="purple" />
          <StatCard label="Assessments Created" value={86} icon={ClipboardCheck} trend="+5 this week" accent="green" />
          <StatCard label="Active Subjects" value={7} icon={Layers} accent="blue" />
          <StatCard label="Recent Activity" value={142} icon={Activity} trend="+18% engagement" accent="amber" />
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl bg-gradient-hero p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Quick actions</h3>
              <p className="text-sm text-white/70 mt-1">Jump straight into what matters.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/teacher/resources" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-navy text-sm font-semibold hover:scale-105 transition-bounce">
                <Upload className="h-4 w-4" /> Upload Resource
              </Link>
              <Link to="/teacher/assessments" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-dark text-sm font-semibold hover:bg-white/10 transition-smooth">
                <Plus className="h-4 w-4" /> Create Assessment
              </Link>
              <Link to="/teacher/analytics" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-dark text-sm font-semibold hover:bg-white/10 transition-smooth">
                <BarChart3 className="h-4 w-4" /> View Analytics
              </Link>
            </div>
          </div>
        </div>

        {/* Charts + activity */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold tracking-tight">Resource Usage</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Last 12 weeks</p>
              </div>
              <span className="text-xs font-medium text-success inline-flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> +24%
              </span>
            </div>
            <div className="flex items-end gap-2 h-48">
              {usage.map((v, i) => (
                <div key={i} className="flex-1 group relative">
                  <div
                    className="bg-gradient-to-t from-purple to-purple-light rounded-t-lg transition-bounce group-hover:opacity-80"
                    style={{ height: `${v}%` }}
                  />
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-smooth text-xs font-medium bg-navy text-white px-2 py-0.5 rounded">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <h3 className="font-semibold tracking-tight mb-1">Popular Topics</h3>
            <p className="text-xs text-muted-foreground mb-5">By engagement</p>
            <div className="space-y-4">
              {[
                { label: "Calculus", v: 92 },
                { label: "Organic Chemistry", v: 78 },
                { label: "Newtonian Mechanics", v: 65 },
                { label: "Data Structures", v: 58 },
                { label: "Linear Algebra", v: 44 },
              ].map((t) => (
                <div key={t.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{t.label}</span>
                    <span className="text-muted-foreground text-xs">{t.v}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-primary rounded-full transition-bounce" style={{ width: `${t.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold tracking-tight">Recent Activity</h3>
            <button className="text-xs font-medium text-purple hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-smooth">
                <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center ${a.color}`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <p className="flex-1 text-sm font-medium">{a.text}</p>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
