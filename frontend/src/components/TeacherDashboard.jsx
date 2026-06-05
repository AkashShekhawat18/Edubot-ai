import { motion } from "framer-motion";

import {
  FileText,
  Users,
  Upload,
  BarChart3,
  Brain,
  ClipboardCheck,
  TrendingUp
} from "lucide-react";

import DoubtHeatmap from "./DoubtHeatmap";

export default function TeacherDashboard() {
  return (
    <section
      id="teachers"
      className="py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-violet-400 font-semibold">
            TEACHER DASHBOARD
          </span>

          <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6">
            Teach With Intelligence
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl">
            Create question papers, manage resources,
            analyze student performance and automate
            repetitive academic tasks using AI.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">

          {/* Question Paper Generator */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">

              <FileText
                size={35}
                className="text-cyan-400"
              />

              <h3 className="text-2xl font-bold">
                AI Question Generator
              </h3>
            </div>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-slate-800 rounded-xl p-4 outline-none"
              />

              <input
                type="text"
                placeholder="Unit / Topic"
                className="w-full bg-slate-800 rounded-xl p-4 outline-none"
              />

              <select
                className="w-full bg-slate-800 rounded-xl p-4 outline-none"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <button
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 font-semibold"
              >
                Generate Paper
              </button>

            </div>
          </motion.div>

          {/* Total Students */}

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Users
              size={35}
              className="text-cyan-400 mb-5"
            />

            <h3 className="font-bold text-xl">
              Students
            </h3>

            <h1 className="text-5xl font-black mt-4">
              1248
            </h1>

            <p className="text-slate-400 mt-3">
              Active Learners
            </p>
          </motion.div>

          {/* AI Accuracy */}

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Brain
              size={35}
              className="text-violet-400 mb-5"
            />

            <h3 className="font-bold text-xl">
              AI Accuracy
            </h3>

            <h1 className="text-5xl font-black mt-4">
              98%
            </h1>

            <p className="text-slate-400 mt-3">
              Smart Analysis
            </p>
          </motion.div>

          {/* Analytics */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">

              <BarChart3
                size={35}
                className="text-green-400"
              />

              <h3 className="text-2xl font-bold">
                Student Analytics
              </h3>
            </div>

            <div className="space-y-6">

              <div>
                <div className="flex justify-between mb-2">
                  <span>Attendance</span>
                  <span>92%</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="h-3 w-[92%] bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Assignments</span>
                  <span>84%</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="h-3 w-[84%] bg-cyan-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Exam Performance</span>
                  <span>89%</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="h-3 w-[89%] bg-violet-500 rounded-full"></div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Resource Upload */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Upload
              size={35}
              className="text-cyan-400 mb-4"
            />

            <h3 className="text-xl font-bold">
              Upload Resources
            </h3>

            <p className="text-slate-400 mt-3">
              PDFs, Notes & Lectures
            </p>
          </motion.div>

          {/* Assessment */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <ClipboardCheck
              size={35}
              className="text-green-400 mb-4"
            />

            <h3 className="text-xl font-bold">
              Assessments
            </h3>

            <p className="text-slate-400 mt-3">
              Auto Evaluation
            </p>
          </motion.div>
          {/* Doubt Heatmap */}
          <motion.div
           whileHover={{ scale: 1.02 }}
            className="lg:col-span-2"
            >
               <DoubtHeatmap />
               </motion.div>

          {/* Growth */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">

              <TrendingUp
                size={32}
                className="text-cyan-400"
              />

              <h3 className="text-2xl font-bold">
                Academic Growth Overview
              </h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">

              <div className="bg-slate-800 rounded-xl p-6">
                <h4 className="text-slate-400">
                  Assignments
                </h4>

                <h2 className="text-4xl font-black mt-3">
                  326
                </h2>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <h4 className="text-slate-400">
                  Exams
                </h4>

                <h2 className="text-4xl font-black mt-3">
                  48
                </h2>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <h4 className="text-slate-400">
                  Resources
                </h4>

                <h2 className="text-4xl font-black mt-3">
                  592
                </h2>
              </div>

              <div className="bg-slate-800 rounded-xl p-6">
                <h4 className="text-slate-400">
                  Success Rate
                </h4>

                <h2 className="text-4xl font-black mt-3">
                  96%
                </h2>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}   