import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, BookOpen, Calculator, Sigma } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";
import { ChatWorkspace } from "@/components/ChatWorkspace";

export const Route = createFileRoute("/student/assistant")({
  head: () => ({ meta: [{ title: "Study Assistant · Student Portal" }] }),
  component: () => (
    <div>
      <PortalTopbar title="Study Assistant" subtitle="Ask questions, solve problems, explore concepts." />
      <div className="p-6">
        <ChatWorkspace
          title="Study Workspace"
          subtitle="Your AI tutor for concepts, problems, and revision."
          initialMessage="Hi Alex! I'm here to help you learn. Ask me to explain a topic, solve a problem, or summarize a chapter — anything from your syllabus."
          actions={[
            { icon: Lightbulb, title: "Explain Topic", desc: "Break down any concept simply.", prompt: "Explain wave-particle duality." },
            { icon: BookOpen, title: "Summarize Chapter", desc: "Quick chapter summary with key points.", prompt: "Summarize the chapter on Thermodynamics." },
            { icon: Calculator, title: "Solve Problem", desc: "Step-by-step numerical solutions.", prompt: "Solve: integral of x² sin(x) dx." },
            { icon: Sigma, title: "Important Questions", desc: "Likely exam questions on a topic.", prompt: "Give me important questions on Quantum Mechanics." },
          ]}
          chips={["Explain topic", "Give example", "Solve problem", "Summarize chapter", "Important questions"]}
          responder={(q) => `Great question — "${q}"\n\nHere's a clear breakdown:\n\n• Core idea: A concise statement of the concept\n• Why it matters: Real-world relevance and where it shows up\n• Example: A worked example demonstrating the principle\n• Formula: f(x) = ax² + bx + c (if applicable)\n• Common pitfall: A mistake students often make\n\nWant me to give you a practice problem on this?`}
        />
      </div>
    </div>
  ),
});
