import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { LoginCard } from "@/components/LoginCard";

export const Route = createFileRoute("/login/student")({
  head: () => ({ meta: [{ title: "Student Sign-In · CampusMind" }] }),
  component: () => (
    <LoginCard
      title="Student Portal"
      subtitle="Welcome back — let's keep your streak going."
      icon={Users}
      redirectTo="/student"
      accent="from-info to-purple"
    />
  ),
});
