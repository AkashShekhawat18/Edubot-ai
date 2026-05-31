import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronRight, ChevronLeft, Download, Save, Copy, Sparkles, RotateCcw } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";

export const Route = createFileRoute("/teacher/assessments")({
  head: () => ({ meta: [{ title: "Assessment Builder · Teacher Portal" }] }),
  component: Builder,
});

const subjects = ["Physics", "Chemistry", "Mathematics", "Computer Science", "Biology"];
const chapters: Record<string, string[]> = {
  Physics: ["Mechanics", "Thermodynamics", "Optics", "Quantum"],
  Chemistry: ["Organic", "Inorganic", "Physical"],
  Mathematics: ["Calculus", "Linear Algebra", "Statistics"],
  "Computer Science": ["Data Structures", "Algorithms", "Databases"],
  Biology: ["Cell Biology", "Genetics", "Ecology"],
};
const types = ["MCQ", "Short Answer", "Long Answer"] as const;
const difficulties = ["Easy", "Medium", "Hard"] as const;

const stepLabels = ["Subject", "Chapter", "Question Types", "Difficulty", "Generate"];

function Builder() {
  const [step, setStep] = useState(0);
  const [subject, setSubject] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [qtypes, setQtypes] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const generate = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setGenerated(true); }, 1400);
  };

  const reset = () => { setStep(0); setSubject(""); setChapter(""); setQtypes([]); setDifficulty(""); setGenerated(false); };

  const canNext = [subject, chapter, qtypes.length > 0, difficulty, true][step];

  return (
    <div>
      <PortalTopbar title="Assessment Builder" subtitle="Generate exam-ready question papers in minutes." />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Stepper */}
        <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <div className="flex items-center justify-between">
            {stepLabels.map((l, i) => (
              <div key={l} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth ${
                    i < step ? "bg-success text-white" :
                    i === step ? "bg-gradient-primary text-white shadow-glow" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className={`mt-2 text-xs font-medium hidden sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{l}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-success" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {!generated ? (
          <div className="rounded-2xl bg-card border border-border p-8 shadow-soft min-h-[400px] animate-fade-in">
            {step === 0 && (
              <Selector title="Select Subject" options={subjects} value={subject} onSelect={setSubject} />
            )}
            {step === 1 && subject && (
              <Selector title={`Select Chapter — ${subject}`} options={chapters[subject] ?? []} value={chapter} onSelect={setChapter} />
            )}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold tracking-tight mb-1">Select Question Types</h2>
                <p className="text-sm text-muted-foreground mb-6">Pick one or more.</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {types.map((t) => {
                    const active = qtypes.includes(t);
                    return (
                      <button
                        key={t}
                        onClick={() => setQtypes(active ? qtypes.filter(x => x !== t) : [...qtypes, t])}
                        className={`p-5 rounded-xl border-2 text-left transition-bounce ${
                          active ? "border-purple bg-accent shadow-glow" : "border-border hover:border-purple/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{t}</span>
                          {active && <Check className="h-4 w-4 text-purple" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 3 && (
              <Selector title="Select Difficulty" options={[...difficulties]} value={difficulty} onSelect={setDifficulty} />
            )}
            {step === 4 && (
              <div className="text-center py-10">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-glow mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Ready to generate</h2>
                <div className="mt-4 inline-flex flex-wrap justify-center gap-2 text-xs">
                  <Chip>{subject}</Chip><Chip>{chapter}</Chip>
                  {qtypes.map(t => <Chip key={t}>{t}</Chip>)}
                  <Chip>{difficulty}</Chip>
                </div>
                <button
                  onClick={generate}
                  disabled={loading}
                  className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-bounce disabled:opacity-70"
                >
                  {loading ? (
                    <><span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles className="h-4 w-4" /> Generate Assessment</>
                  )}
                </button>
              </div>
            )}

            <div className="flex justify-between mt-10 pt-6 border-t border-border">
              <button onClick={prev} disabled={step === 0} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-muted transition-smooth">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              {step < 4 && (
                <button onClick={next} disabled={!canNext} className="inline-flex items-center gap-1 px-5 py-2 rounded-lg bg-gradient-primary text-white text-sm font-semibold shadow-glow disabled:opacity-40 hover:scale-105 transition-bounce">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-card border border-border p-8 shadow-soft animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight">{subject} · {chapter}</h2>
                <p className="text-sm text-muted-foreground">{difficulty} · {qtypes.join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <Action icon={Download}>Download PDF</Action>
                <Action icon={Save}>Save</Action>
                <Action icon={Copy}>Copy</Action>
                <button onClick={reset} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-smooth">
                  <RotateCcw className="h-4 w-4" /> New
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-secondary/50 p-8 font-serif">
              <div className="text-center border-b-2 border-foreground pb-4 mb-6">
                <h3 className="text-2xl font-bold">CampusMind Assessment</h3>
                <p className="text-sm text-muted-foreground mt-1">{subject} — {chapter}</p>
                <p className="text-xs mt-2">Duration: 60 minutes · Total Marks: 50</p>
              </div>
              <div className="space-y-6">
                {[
                  "Define the principle of superposition and explain its significance.",
                  "Which of the following best describes a closed system? (a) Exchanges only matter (b) Exchanges only energy (c) Exchanges neither (d) Exchanges both",
                  "Derive the expression for the kinetic energy of a rotating rigid body.",
                  "State and prove the work-energy theorem with a relevant example.",
                  "A particle moves with velocity v(t) = 3t² + 2. Find acceleration at t = 4s.",
                ].map((q, i) => (
                  <div key={i}>
                    <p className="text-sm"><span className="font-bold">Q{i + 1}.</span> {q}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Selector({ title, options, value, onSelect }: { title: string; options: string[]; value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground mb-6">Choose one to continue.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              onClick={() => onSelect(o)}
              className={`p-5 rounded-xl border-2 text-left transition-bounce ${
                active ? "border-purple bg-accent shadow-glow" : "border-border hover:border-purple/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{o}</span>
                {active && <Check className="h-4 w-4 text-purple" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">{children}</span>;
}

function Action({ icon: Icon, children }: { icon: typeof Download; children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-primary text-white text-sm font-medium shadow-glow hover:scale-105 transition-bounce">
      <Icon className="h-4 w-4" /> {children}
    </button>
  );
}
