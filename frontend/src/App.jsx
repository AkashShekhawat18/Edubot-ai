import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import SupportBot from "./components/SupportBot";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import StudentDashboard from "./pages/student/Dashboard";
import Community from "./pages/student/Community";
import Teachers from "./pages/student/Teachers";
import Progress from "./pages/student/Progress";
import Calendar from "./pages/student/Calendar";

import TeacherDashboard from "./pages/teacher/Dashboard";
import Analytics from "./pages/teacher/Analytics";
import PaperGenerator from "./pages/teacher/PaperGenerator";
import Heatmap from "./pages/teacher/Heatmap";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <SupportBot />

        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/community" element={<Community />} />
          <Route path="/student/teachers" element={<Teachers />} />
          <Route path="/student/progress" element={<Progress />} />
          <Route path="/student/calendar" element={<Calendar />} />

          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/analytics" element={<Analytics />} />
          <Route
            path="/teacher/paper-generator"
            element={<PaperGenerator />}
          />
          <Route path="/teacher/heatmap" element={<Heatmap />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}