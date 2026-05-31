import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, type LucideIcon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
  time: string;
}

interface Action {
  icon: LucideIcon;
  title: string;
  desc: string;
  prompt: string;
}

interface Props {
  title: string;
  subtitle: string;
  initialMessage: string;
  actions: Action[];
  chips: string[];
  responder: (q: string) => string;
}

export function ChatWorkspace({ title, subtitle, initialMessage, actions, chips, responder }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: initialMessage, time: now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text, time: now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "assistant", text: responder(text), time: now() }]);
    }, 1200);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 h-[calc(100vh-9rem)]">
      {/* Actions sidebar */}
      <aside className="lg:w-72 shrink-0 space-y-3">
        <div className="rounded-2xl bg-card border border-border p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="space-y-2">
          {actions.map((a) => (
            <button
              key={a.title}
              onClick={() => send(a.prompt)}
              className="w-full text-left p-4 rounded-2xl bg-card border border-border hover-lift shadow-soft group"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center text-white shrink-0">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{a.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <div className="flex-1 flex flex-col rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""} animate-fade-in`}>
              {m.role === "assistant" && (
                <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white shrink-0 shadow-glow">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div className={`max-w-[80%] ${m.role === "user" ? "items-end" : ""}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  m.role === "user"
                    ? "bg-gradient-primary text-white rounded-tr-sm shadow-glow"
                    : "bg-muted rounded-tl-sm"
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
                </div>
                <p className={`text-xs text-muted-foreground mt-1 ${m.role === "user" ? "text-right" : ""}`}>{m.time}</p>
              </div>
              {m.role === "user" && (
                <div className="h-9 w-9 rounded-xl bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">AM</div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3 animate-fade-in">
              <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white shrink-0 shadow-glow">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-purple animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Chips */}
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => send(c)}
              className="px-3 py-1.5 rounded-full bg-accent text-xs font-medium hover:bg-purple hover:text-white transition-smooth"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-4 border-t border-border flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none text-sm"
          />
          <button type="submit" className="px-4 py-3 rounded-xl bg-gradient-primary text-white shadow-glow hover:scale-105 transition-bounce">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
