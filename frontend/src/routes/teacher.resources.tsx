import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Search, Filter, FileText, Trash2, Eye, FileType2, CheckCircle2 } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";

export const Route = createFileRoute("/teacher/resources")({
  head: () => ({ meta: [{ title: "Resource Library · Teacher Portal" }] }),
  component: Resources,
});

const initialResources = [
  { name: "Quantum Mechanics — Chapter 4.pdf", subject: "Physics", date: "May 28, 2026", status: "Ready" },
  { name: "Organic Chemistry Lab Notes.pdf", subject: "Chemistry", date: "May 26, 2026", status: "Ready" },
  { name: "Linear Algebra Cheatsheet.pdf", subject: "Mathematics", date: "May 25, 2026", status: "Ready" },
  { name: "Data Structures — Trees.pdf", subject: "CS", date: "May 22, 2026", status: "Ready" },
  { name: "World History — Renaissance.pdf", subject: "History", date: "May 19, 2026", status: "Ready" },
  { name: "Calculus II Practice Set.pdf", subject: "Mathematics", date: "May 15, 2026", status: "Ready" },
];

const subjectColors: Record<string, string> = {
  Physics: "from-info to-purple",
  Chemistry: "from-success to-info",
  Mathematics: "from-purple to-purple-light",
  CS: "from-warning to-destructive",
  History: "from-purple-light to-warning",
};

function Resources() {
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const handleUpload = () => {
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p === null) return null;
        if (p >= 100) { clearInterval(iv); setTimeout(() => setProgress(null), 1200); return 100; }
        return p + 8;
      });
    }, 120);
  };

  const subjects = ["All", ...Array.from(new Set(initialResources.map(r => r.subject)))];
  const filtered = initialResources.filter(r =>
    (filter === "All" || r.subject === filter) &&
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <PortalTopbar title="Resource Library" subtitle="Manage your books, notes, and study materials." />

      <div className="p-6 space-y-6">
        {/* Upload */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handleUpload(); }}
          className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-smooth ${
            drag ? "border-purple bg-accent/40" : "border-border bg-card"
          }`}
        >
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-glow mb-4">
            <Upload className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-semibold">Drop files to upload</h3>
          <p className="text-sm text-muted-foreground mt-1">PDF, DOCX, PPTX up to 50MB</p>
          <button
            onClick={handleUpload}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-semibold shadow-glow hover:scale-105 transition-bounce"
          >
            Browse files
          </button>
          {progress !== null && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{progress < 100 ? "Uploading..." : "Upload complete"}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary transition-all duration-150" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-purple outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth ${
                  filter === s ? "bg-gradient-primary text-white shadow-glow" : "bg-muted hover:bg-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <div key={r.name} className="group rounded-2xl bg-card border border-border p-5 hover-lift shadow-soft animate-fade-in-up" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${subjectColors[r.subject] ?? "from-purple to-purple-light"} flex items-center justify-center text-white shrink-0`}>
                  <FileType2 className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-snug truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.subject} · {r.date}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="inline-flex items-center gap-1 text-xs text-success font-medium">
                  <CheckCircle2 className="h-3 w-3" /> {r.status}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                  <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-purple"><Eye className="h-4 w-4" /></button>
                  <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
              No resources match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
