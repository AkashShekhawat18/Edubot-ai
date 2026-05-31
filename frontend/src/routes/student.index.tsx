import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Target, TrendingUp, Flame, Play, ArrowRight, Brain, Atom, Calculator, Code } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";
import { StatCard } from "@/components/StatCard";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "Dashboard · Student Portal" }] }),
  component: StudentDashboard,
});

const recommended = [
  { icon: Atom, title: "Quantum Tunneling", subject: "Physics", color: "from-info to-purple" },
  { icon: Calculator, title: "Eigenvalues & Eigenvectors", subject: "Math", color: "from-purple to-purple-light" },
  { icon: Code, title: "Binary Search Trees", subject: "CS", color: "from-success to-info" },
];

const continueLearning = [
  { title: "Newton's Laws of Motion", progress: 72, chapter: "Physics · Ch. 3" },
  { title: "Organic Reactions", progress: 45, chapter: "Chemistry · Ch. 6" },
  { title: "Integration Techniques", progress: 88, chapter: "Math · Ch. 8" },
];

const activity = [
  { text: "Completed practice set: Calculus II", time: "1h ago" },
  { text: "Asked 4 questions about Thermodynamics", time: "3h ago" },
  { text: "Reviewed formula sheet: Trigonometry", time: "Yesterday" },
];

function StudentDashboard() {
  return (
    <div>
      <PortalTopbar title="Welcome back, Alex" subtitle="Keep your 12-day streak going strong." />

      <div className="p-6 space-y-6">
        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white">
          <div className="absolute inset-0 bg-gradient-glow opacity-60" />
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-purple/30 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark text-xs font-medium mb-4">
                <Flame className="h-3.5 w-3.5 text-warning" /> 12-day streak
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready for today's quest?</h2>
              <p className="mt-2 text-white/70 max-w-md">You're 28% away from mastering Calculus II.</p>
            </div>
            <Link to="/student/assistant" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-navy font-semibold hover:scale-105 transition-bounce w-fit">
              <Play className="h-4 w-4" /> Resume Learning
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Topics Studied" value={84} icon={BookOpen} accent="purple" />
          <StatCard label="Practice Sessions" value={42} icon={Target} accent="green" />
          <StatCard label="Learning Progress" value={68} suffix="%" icon={TrendingUp} trend="+12% this week" accent="blue" />
          <StatCard label="Study Streak" value={12} suffix=" days" icon={Flame} accent="amber" />
        </div>

        {/* Recommended */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold tracking-tight text-lg">Recommended for you</h3>
            <button className="text-sm text-purple font-medium hover:underline">View all</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map((r) => (
              <button key={r.title} className="text-left rounded-2xl bg-card border border-border p-5 hover-lift shadow-soft group">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white shadow-glow mb-4`}>
                  <r.icon className="h-6 w-6" />
                </div>
                <p className="font-semibold">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.subject}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-purple font-medium">
                  Start <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Continue learning + activity */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 shadow-soft">
            <h3 className="font-semibold tracking-tight mb-5">Continue learning</h3>
            <div className="space-y-4">
              {continueLearning.map((c) => (
                <div key={c.title} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.chapter}</p>
                    </div>
                    <span className="text-xs font-semibold text-purple">{c.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-primary rounded-full transition-bounce" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <h3 className="font-semibold tracking-tight mb-5 flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-purple mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p>{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
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
