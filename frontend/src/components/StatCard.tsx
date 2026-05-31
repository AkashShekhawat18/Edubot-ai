import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: string;
  accent?: "purple" | "blue" | "green" | "amber";
}

const accentMap = {
  purple: "from-purple to-purple-light",
  blue: "from-info to-purple",
  green: "from-success to-info",
  amber: "from-warning to-destructive",
};

export function StatCard({ label, value, suffix = "", icon: Icon, trend, accent = "purple" }: Props) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 hover-lift shadow-soft">
      <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${accentMap[accent]} opacity-10 group-hover:opacity-20 transition-smooth blur-2xl`} />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            {n.toLocaleString()}
            {suffix}
          </p>
          {trend && <p className="mt-1 text-xs text-success font-medium">{trend}</p>}
        </div>
        <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${accentMap[accent]} flex items-center justify-center text-white shadow-glow`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
