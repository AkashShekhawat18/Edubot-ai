import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen, Sparkles, ClipboardCheck, Brain, BarChart3,
  GraduationCap, Users, Upload, Compass, Repeat, FileCheck2,
  Star, ArrowRight, Quote, Zap,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { StatCard } from "@/components/StatCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusMind — Learn Smarter. Teach Better." },
      { name: "description", content: "One intelligent platform for learning, assessment, revision, and academic resource management." },
      { property: "og:title", content: "CampusMind — Smart Learning & Assessment Platform" },
      { property: "og:description", content: "Empowering Teachers, Enabling Students with a modern educational ecosystem." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: BookOpen, title: "Resource Management", desc: "Upload, organize, and share academic materials with elegant tooling.", color: "from-purple to-purple-light" },
  { icon: Brain, title: "Smart Learning", desc: "AI-powered explanations tailored to your curriculum and pace.", color: "from-info to-purple" },
  { icon: ClipboardCheck, title: "Assessment Builder", desc: "Generate exam-ready question papers in under a minute.", color: "from-success to-info" },
  { icon: Repeat, title: "Revision Hub", desc: "Summaries, formulas, and key concepts in one focused place.", color: "from-warning to-purple" },
  { icon: BarChart3, title: "Progress Tracking", desc: "Visualize learning streaks, mastery, and engagement.", color: "from-purple to-warning" },
  { icon: Sparkles, title: "Teaching Assistant", desc: "Lesson plans, summaries, and important questions on demand.", color: "from-purple-light to-info" },
];

const steps = [
  { n: "01", icon: Upload, title: "Upload Academic Resources", desc: "Drag-and-drop books, notes, and slides into your library." },
  { n: "02", icon: Compass, title: "Explore Knowledge", desc: "Ask questions, explore concepts, and get instant explanations." },
  { n: "03", icon: Repeat, title: "Practice & Revise", desc: "Strengthen retention with practice sets and revision tools." },
  { n: "04", icon: FileCheck2, title: "Generate Assessments", desc: "Build polished question papers in a guided wizard." },
];

const testimonials = [
  { name: "Dr. Priya Sharma", role: "Professor, IIT Delhi", text: "CampusMind transformed how I prepare assessments. What used to take hours now takes minutes — and the quality is better." },
  { name: "Rohan Verma", role: "B.Tech Student", text: "It feels like having a personal tutor available 24/7. The revision hub saved me during finals week." },
  { name: "Anita Iyer", role: "High School Teacher", text: "The resource library and lesson planner are intuitive. My students are noticeably more engaged." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-smooth">Features</a>
            <a href="#how" className="hover:text-foreground transition-smooth">How it Works</a>
            <a href="#testimonials" className="hover:text-foreground transition-smooth">Testimonials</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login/student" className="hidden sm:inline-flex items-center text-sm font-medium px-4 py-2 rounded-lg hover:bg-muted transition-smooth">
              Sign in
            </Link>
            <Link to="/login/teacher" className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-gradient-primary text-white shadow-glow hover:opacity-90 transition-smooth">
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple/30 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-info/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5 text-purple-glow" />
              Empowering Teachers, Enabling Students
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Learn Smarter.
              <br />
              <span className="bg-gradient-to-r from-purple-glow via-purple-light to-white bg-clip-text text-transparent">
                Teach Better.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
              One intelligent platform for learning, assessment, revision, and academic resource management — built for the modern campus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login/teacher"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:scale-[1.02] transition-bounce"
              >
                <GraduationCap className="h-5 w-5" />
                Teacher Portal
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Link>
              <Link
                to="/login/student"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-dark text-white font-semibold hover:bg-white/10 transition-smooth"
              >
                <Users className="h-5 w-5" />
                Student Portal
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-white/60">
              <div className="flex -space-x-2">
                {["AM", "PR", "SK", "RV"].map((i, idx) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-gradient-primary border-2 border-navy flex items-center justify-center text-xs font-bold" style={{ zIndex: 10 - idx }}>{i}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-warning">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                Loved by 10,000+ educators
              </div>
            </div>
          </div>

          {/* Animated illustration */}
          <div className="relative animate-scale-in">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-40 animate-pulse-glow" />
              <div className="relative h-full w-full rounded-3xl glass-dark p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center"><Brain className="h-5 w-5" /></div>
                  <div className="flex-1">
                    <div className="h-2 w-24 bg-white/30 rounded" />
                    <div className="mt-1.5 h-2 w-16 bg-white/15 rounded" />
                  </div>
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2 animate-fade-in">
                  <div className="h-2 w-3/4 bg-white/30 rounded" />
                  <div className="h-2 w-full bg-white/20 rounded" />
                  <div className="h-2 w-2/3 bg-white/20 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[BookOpen, ClipboardCheck, Zap].map((Icon, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple/20 transition-smooth animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <Icon className="h-6 w-6 text-purple-glow" />
                    </div>
                  ))}
                </div>
                <div className="mt-auto rounded-xl bg-gradient-primary/30 border border-purple/30 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">Progress</span>
                    <span className="text-xs">87%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-gradient-to-r from-purple to-purple-glow rounded-full" />
                  </div>
                </div>
              </div>
              {/* Floating chips */}
              <div className="absolute -top-4 -left-4 glass-dark rounded-xl px-3 py-2 text-xs font-medium animate-float">
                <Sparkles className="inline h-3 w-3 mr-1 text-purple-glow" />
                AI Generated
              </div>
              <div className="absolute -bottom-4 -right-4 glass-dark rounded-xl px-3 py-2 text-xs font-medium animate-float" style={{ animationDelay: "1s" }}>
                <FileCheck2 className="inline h-3 w-3 mr-1 text-success" />
                Quiz ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple">Features</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Everything your campus needs</h2>
            <p className="mt-4 text-muted-foreground text-lg">A complete educational ecosystem combining learning, assessment, and resource management.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={f.title} className="group relative rounded-2xl bg-card border border-border p-6 hover-lift shadow-soft animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-glow mb-4`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple">How it works</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">From upload to mastery in 4 steps</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={s.n} className="relative rounded-2xl bg-card border border-border p-6 hover-lift shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold text-gradient">{s.n}</span>
                  <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-purple">
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-purple/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            <StatCard label="Resources Uploaded" value={48230} icon={BookOpen} trend="+12% this month" accent="purple" />
            <StatCard label="Assessments Generated" value={12847} icon={ClipboardCheck} trend="+24% this month" accent="green" />
            <StatCard label="Topics Learned" value={186540} icon={Brain} trend="+38% this month" accent="blue" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple">Testimonials</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Loved by educators &amp; learners</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.name} className="rounded-2xl bg-card border border-border p-6 hover-lift shadow-soft animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <Quote className="h-8 w-8 text-purple/30" />
                <p className="mt-3 text-sm leading-relaxed">{t.text}</p>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-hero p-12 md:p-16 text-center text-white">
          <div className="absolute inset-0 bg-gradient-glow" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to transform your classroom?</h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">Join thousands of teachers and students already using CampusMind.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/login/teacher" className="px-6 py-3.5 rounded-xl bg-white text-navy font-semibold hover:scale-105 transition-bounce">I'm a Teacher</Link>
              <Link to="/login/student" className="px-6 py-3.5 rounded-xl glass-dark font-semibold hover:bg-white/10 transition-smooth">I'm a Student</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-navy text-white/70">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-sm">Empowering Teachers, Enabling Students.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>Features</li><li>Pricing</li><li>Integrations</li><li>Changelog</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About</li><li>Blog</li><li>Careers</li><li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>Docs</li><li>Help Center</li><li>Privacy</li><li>Terms</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
          © 2026 CampusMind. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
