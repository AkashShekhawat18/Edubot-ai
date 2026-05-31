import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Target, Bookmark, Star } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";
import { useState } from "react";

export const Route = createFileRoute("/student/history")({
  head: () => ({ meta: [{ title: "Learning History · Student Portal" }] }),
  component: History,
});

const tabs = [
  { key: "questions", label: "Questions", icon: MessageSquare },
  { key: "practice", label: "Practice", icon: Target },
  { key: "saved", label: "Saved", icon: Bookmark },
  { key: "bookmarks", label: "Bookmarks", icon: Star },
] as const;

const data: Record<string, { title: string; meta: string }[]> = {
  questions: [
    { title: "Explain wave-particle duality", meta: "Physics · 2h ago" },
    { title: "Solve: integral of x² sin(x) dx", meta: "Math · Yesterday" },
    { title: "What is hybridization?", meta: "Chemistry · 2d ago" },
  ],
  practice: [
    { title: "Calculus II · Medium", meta: "Score: 8/10 · 1h ago" },
    { title: "Physics Mechanics · Hard", meta: "Score: 7/10 · Yesterday" },
    { title: "Organic Chemistry · Easy", meta: "Score: 9/10 · 3d ago" },
  ],
  saved: [
    { title: "Newton's Laws — Summary", meta: "Physics · Saved 2d ago" },
    { title: "Trigonometric Identities", meta: "Math · Saved 5d ago" },
  ],
  bookmarks: [
    { title: "Thermodynamics Ch. 4", meta: "Physics" },
    { title: "Linear Algebra Cheatsheet", meta: "Math" },
  ],
};

function History() {
  const [tab, setTab] = useState<string>("questions");
  return (
    <div>
      <PortalTopbar title="Learning History" subtitle="Revisit your past sessions and saved content." />
      <div className="p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-smooth ${
              tab === t.key ? "bg-gradient-primary text-white shadow-glow" : "bg-muted hover:bg-accent"
            }`}>
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-3 animate-fade-in">
          {data[tab].map((d, i) => (
            <div key={i} className="rounded-2xl bg-card border border-border p-5 hover-lift shadow-soft flex items-center justify-between">
              <div>
                <p className="font-semibold">{d.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{d.meta}</p>
              </div>
              <button className="text-sm text-purple font-medium hover:underline">Open</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
