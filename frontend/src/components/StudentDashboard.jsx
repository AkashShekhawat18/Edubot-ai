import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Target,
  Trophy,
  Clock,
  TrendingUp
} from "lucide-react";

export default function StudentDashboard() {
  return (
    <section
      id="students"
      className="py-32 px-6 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-cyan-400 font-semibold">
            STUDENT DASHBOARD
          </span>

          <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6">
            Learn With AI
          </h2>

          <p className="text-slate-400 max-w-2xl text-lg">
            Track performance, prepare smarter, practice daily
            and get personalized AI recommendations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">

          {/* Main Analytics */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="flex justify-between items-center mb-8">

              <h3 className="text-2xl font-bold">
                Learning Progress
              </h3>

              <TrendingUp
                className="text-cyan-400"
                size={28}
              />
            </div>

            <div className="space-y-6">

              <div>
                <div className="flex justify-between mb-2">
                  <span>Mathematics</span>
                  <span>92%</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="w-[92%] h-3 bg-cyan-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Physics</span>
                  <span>84%</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="w-[84%] h-3 bg-violet-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Programming</span>
                  <span>97%</span>
                </div>

                <div className="h-3 bg-slate-800 rounded-full">
                  <div className="w-[97%] h-3 bg-emerald-500 rounded-full"></div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Score Card */}

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Trophy
              className="text-yellow-400 mb-4"
              size={35}
            />

            <h3 className="text-xl font-bold">
              Rank
            </h3>

            <h1 className="text-5xl font-black mt-4">
              #12
            </h1>

            <p className="text-slate-400 mt-3">
              Top Performer
            </p>
          </motion.div>

          {/* AI Score */}

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Brain
              className="text-cyan-400 mb-4"
              size={35}
            />

            <h3 className="text-xl font-bold">
              AI Score
            </h3>

            <h1 className="text-5xl font-black mt-4">
              94%
            </h1>

            <p className="text-slate-400 mt-3">
              Excellent Progress
            </p>
          </motion.div>

          {/* AI Recommendations */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">
              AI Recommendations
            </h3>

            <div className="space-y-4">

              <div className="bg-slate-800 p-4 rounded-xl">
                📘 Complete Calculus Revision Test
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                ⚡ Practice Numerical Physics Problems
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                💻 Improve DSA Problem Solving
              </div>

            </div>
          </motion.div>

          {/* Study Stats */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Clock
              size={35}
              className="text-violet-400 mb-4"
            />

            <h3 className="font-bold text-xl">
              Study Hours
            </h3>

            <h1 className="text-5xl font-black mt-4">
              126
            </h1>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Target
              size={35}
              className="text-green-400 mb-4"
            />

            <h3 className="font-bold text-xl">
              Mock Tests
            </h3>

            <h1 className="text-5xl font-black mt-4">
              57
            </h1>
          </motion.div>

          {/* Resource Library */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">

              <BookOpen
                className="text-cyan-400"
                size={30}
              />

              <h3 className="text-2xl font-bold">
                Smart Resource Library
              </h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">

              <div className="bg-slate-800 rounded-xl p-5">
                Mathematics Notes
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                Physics Lectures
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                DSA Handbook
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                AI Study Material
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}