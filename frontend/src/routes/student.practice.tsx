import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Target, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";

export const Route = createFileRoute("/student/practice")({
  head: () => ({ meta: [{ title: "Practice Zone · Student Portal" }] }),
  component: Practice,
});

const sampleQs = [
  { q: "What is the derivative of sin(x)?", opts: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], correct: 0 },
  { q: "Which is a vector quantity?", opts: ["Mass", "Time", "Velocity", "Temperature"], correct: 2 },
  { q: "The unit of electric current is?", opts: ["Volt", "Ampere", "Ohm", "Watt"], correct: 1 },
  { q: "H₂O is the formula for?", opts: ["Hydrogen", "Oxygen", "Water", "Salt"], correct: 2 },
  { q: "log(1) equals?", opts: ["1", "0", "∞", "undefined"], correct: 1 },
];

function Practice() {
  const [setup, setSetup] = useState(true);
  const [topic, setTopic] = useState("Mathematics");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(5);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = sampleQs[idx % sampleQs.length];

  const start = () => { setSetup(false); setIdx(0); setScore(0); setSelected(null); setDone(false); };
  const answer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (idx + 1 >= count) setDone(true);
    else { setIdx(idx + 1); setSelected(null); }
  };
  const restart = () => { setSetup(true); setDone(false); };

  return (
    <div>
      <PortalTopbar title="Practice Zone" subtitle="Sharpen your skills with quick interactive quizzes." />

      <div className="p-6 max-w-3xl mx-auto">
        {setup && (
          <div className="rounded-2xl bg-card border border-border p-8 shadow-soft animate-scale-in">
            <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-glow mb-4">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Configure your practice</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose a topic and difficulty.</p>

            <div className="mt-6 space-y-5">
              <Field label="Topic">
                <div className="flex flex-wrap gap-2">
                  {["Mathematics", "Physics", "Chemistry", "Biology", "CS"].map((t) => (
                    <Pill key={t} active={topic === t} onClick={() => setTopic(t)}>{t}</Pill>
                  ))}
                </div>
              </Field>

              <Field label="Difficulty">
                <div className="flex gap-2">
                  {["Easy", "Medium", "Hard"].map((d) => (
                    <Pill key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>{d}</Pill>
                  ))}
                </div>
              </Field>

              <Field label={`Number of questions: ${count}`}>
                <input type="range" min={3} max={10} value={count} onChange={(e) => setCount(+e.target.value)} className="w-full accent-purple" />
              </Field>

              <button onClick={start} className="w-full mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:scale-[1.02] transition-bounce">
                Start practice <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {!setup && !done && (
          <div className="rounded-2xl bg-card border border-border p-8 shadow-soft animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground font-medium">Question {idx + 1} of {count}</span>
              <span className="text-sm font-semibold">Score: <span className="text-purple">{score}</span></span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-8">
              <div className="h-full bg-gradient-primary transition-bounce" style={{ width: `${((idx + 1) / count) * 100}%` }} />
            </div>

            <h2 className="text-xl font-semibold tracking-tight">{q.q}</h2>
            <div className="mt-6 grid gap-3">
              {q.opts.map((o, i) => {
                const isSel = selected === i;
                const isCorrect = i === q.correct;
                const showResult = selected !== null;
                const cls = showResult
                  ? isCorrect
                    ? "border-success bg-success/10"
                    : isSel
                      ? "border-destructive bg-destructive/10"
                      : "border-border opacity-60"
                  : "border-border hover:border-purple/50 hover:bg-accent/40";
                return (
                  <button key={o} onClick={() => answer(i)} disabled={showResult} className={`p-4 rounded-xl border-2 text-left flex items-center justify-between transition-bounce ${cls}`}>
                    <span className="text-sm font-medium">{o}</span>
                    {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                    {showResult && isSel && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <button onClick={next} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:scale-[1.02] transition-bounce">
                {idx + 1 >= count ? "See results" : "Next question"} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {done && (
          <div className="rounded-2xl bg-card border border-border p-10 shadow-soft text-center animate-scale-in">
            <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-glow mb-5 animate-pulse-glow">
              <Trophy className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Great work!</h2>
            <p className="text-muted-foreground mt-2">You scored</p>
            <p className="mt-2 text-6xl font-bold text-gradient">{score} / {count}</p>
            <p className="mt-4 text-sm text-muted-foreground">{topic} · {difficulty}</p>

            <div className="mt-8 flex justify-center gap-3">
              <button onClick={start} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-bounce">
                <RotateCcw className="h-4 w-4" /> Try again
              </button>
              <button onClick={restart} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border font-medium hover:bg-muted transition-smooth">
                New topic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold mb-2">{label}</p>
      {children}
    </div>
  );
}
function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
      active ? "bg-gradient-primary text-white shadow-glow" : "bg-muted hover:bg-accent"
    }`}>{children}</button>
  );
}
