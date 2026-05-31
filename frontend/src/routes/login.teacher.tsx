import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { LoginCard } from "@/components/LoginCard";

export const Route = createFileRoute("/login/teacher")({
  head: () => ({ meta: [{ title: "Teacher Sign-In · CampusMind" }] }),
  component: () => (
    <LoginCard
      title="Teacher Portal"
      subtitle="Sign in to your workspace and inspire learning."
      icon={GraduationCap}
      redirectTo="/teacher"
      accent="from-purple to-purple-light"
    />
  ),
});
