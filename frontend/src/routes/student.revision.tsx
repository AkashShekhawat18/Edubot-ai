import { createFileRoute } from "@tanstack/react-router";
import { FileText, Sigma, Key, HelpCircle, Star } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";

export const Route = createFileRoute("/student/revision")({
  head: () => ({ meta: [{ title: "Revision Hub · Student Portal" }] }),
  component: Revision,
});

const sections = [
  { icon: FileText, title: "Chapter Summaries", desc: "Condensed notes for every chapter.", count: 48, color: "from-purple to-purple-light" },
  { icon: Sigma, title: "Formula Sheets", desc: "All key formulas in one place.", count: 24, color: "from-info to-purple" },
  { icon: Key, title: "Key Concepts", desc: "Core ideas explained simply.", count: 156, color: "from-success to-info" },
  { icon: HelpCircle, title: "FAQs", desc: "Common student doubts answered.", count: 92, color: "from-warning to-destructive" },
  { icon: Star, title: "Important Questions", desc: "Likely to appear in exams.", count: 184, color: "from-purple-light to-warning" },
];

function Revision() {
  return (
    <div>
      <PortalTopbar title="Revision Hub" subtitle="Everything you need to revise — fast." />
      <div className="p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <button key={s.title} className="text-left rounded-2xl bg-card border border-border p-6 hover-lift shadow-soft group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-glow mb-4`}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold tracking-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              <p className="mt-4 text-xs font-semibold text-purple">{s.count} items →</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
