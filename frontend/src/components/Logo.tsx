import { Brain } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const textColor = variant === "light" ? "text-white" : "text-navy";
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-smooth" />
        <div className="relative h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
          <Brain className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <span className={`font-bold text-lg tracking-tight ${textColor}`}>
        Campus<span className="text-purple">Mind</span>
      </span>
    </Link>
  );
}
