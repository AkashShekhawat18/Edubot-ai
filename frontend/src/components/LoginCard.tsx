import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Mail, Lock, ArrowRight, type LucideIcon } from "lucide-react";
import { Logo } from "./Logo";

interface Props {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  redirectTo: string;
  accent: string;
}

export function LoginCard({ title, subtitle, icon: Icon, redirectTo, accent }: Props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: redirectTo }), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-purple/30 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-info/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative w-full max-w-md animate-scale-in">
        <div className="mb-8 text-center">
          <Logo variant="light" />
        </div>

        <div className="rounded-3xl glass p-8 shadow-elegant">
          <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-white shadow-glow mb-5`}>
            <Icon className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground/80">Email</label>
              <div className="mt-1.5 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  defaultValue="alex@campusmind.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-smooth text-sm"
                  placeholder="you@campus.edu"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground/80">Password</label>
                <button type="button" className="text-xs text-purple font-medium hover:underline">Forgot?</button>
              </div>
              <div className="mt-1.5 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={show ? "text" : "password"}
                  required
                  defaultValue="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-background border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-smooth text-sm"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:scale-[1.02] active:scale-100 transition-bounce disabled:opacity-70"
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-smooth">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
