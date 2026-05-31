import { createFileRoute } from "@tanstack/react-router";
import { FileText, HelpCircle, CalendarRange, BookOpenCheck } from "lucide-react";
import { PortalTopbar } from "@/components/PortalSidebar";
import { ChatWorkspace } from "@/components/ChatWorkspace";

export const Route = createFileRoute("/teacher/assistant")({
  head: () => ({ meta: [{ title: "Teaching Assistant · Teacher Portal" }] }),
  component: () => (
    <div>
      <PortalTopbar title="Teaching Assistant" subtitle="Lesson plans, summaries, and important questions on demand." />
      <div className="p-6">
        <ChatWorkspace
          title="Teaching Workspace"
          subtitle="Pick an action or describe what you need. I'll draft it instantly."
          initialMessage="Hi Alex! I'm your teaching assistant. I can summarize chapters, generate important questions, draft lesson plans, and break down complex topics. What shall we work on today?"
          actions={[
            { icon: HelpCircle, title: "Generate Important Questions", desc: "Exam-style questions per chapter.", prompt: "Generate 10 important questions for Quantum Mechanics Chapter 4." },
            { icon: FileText, title: "Summarize Chapter", desc: "Concise summary with key takeaways.", prompt: "Summarize the chapter on Thermodynamics." },
            { icon: CalendarRange, title: "Create Lesson Plan", desc: "Week-long structured plan.", prompt: "Create a 5-day lesson plan for Linear Algebra basics." },
            { icon: BookOpenCheck, title: "Explain Difficult Concepts", desc: "Student-friendly breakdowns.", prompt: "Explain wave-particle duality in simple terms." },
          ]}
          chips={["Summarize", "Important questions", "Lesson plan", "Topic breakdown", "Worksheet ideas"]}
          responder={(q) => `Here's a structured draft for: "${q}"\n\n• Key concept 1 with concise explanation\n• Key concept 2 with example\n• Suggested practice activity\n• Common misconception students have\n• Recommended follow-up resources from your library\n\nWould you like me to expand any of these into a full lesson?`}
        />
      </div>
    </div>
  ),
});
