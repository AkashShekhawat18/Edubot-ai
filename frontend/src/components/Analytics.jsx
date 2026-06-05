import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  GraduationCap,
  Target,
  BarChart3
} from "lucide-react";

export default function Analytics() {
  return (
    <section
      id="analytics"
      className="py-32 px-6 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 font-semibold">
            ANALYTICS ENGINE
          </span>

          <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6">
            Data Driven Education
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            Advanced analytics help institutions understand
            student performance, identify weaknesses and
            improve academic outcomes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">

          {/* Main Chart */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="flex justify-between items-center mb-10">

              <h3 className="text-2xl font-bold">
                Performance Growth
              </h3>

              <TrendingUp
                className="text-green-400"
                size={30}
              />
            </div>

            <div className="h-72 flex items-end gap-4">

              <div className="flex-1 bg-cyan-500 rounded-t-xl h-[40%]"></div>

              <div className="flex-1 bg-cyan-500 rounded-t-xl h-[55%]"></div>

              <div className="flex-1 bg-cyan-500 rounded-t-xl h-[70%]"></div>

              <div className="flex-1 bg-cyan-500 rounded-t-xl h-[85%]"></div>

              <div className="flex-1 bg-violet-500 rounded-t-xl h-[95%]"></div>

            </div>

            <div className="flex justify-between mt-4 text-slate-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
            </div>

          </motion.div>

          {/* Quick Stats */}

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Users
              className="text-cyan-400 mb-5"
              size={35}
            />

            <h4 className="text-slate-400">
              Students
            </h4>

            <h1 className="text-5xl font-black mt-4">
              50K+
            </h1>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <GraduationCap
              className="text-violet-400 mb-5"
              size={35}
            />

            <h4 className="text-slate-400">
              Teachers
            </h4>

            <h1 className="text-5xl font-black mt-4">
              5K+
            </h1>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <Target
              className="text-green-400 mb-5"
              size={35}
            />

            <h4 className="text-slate-400">
              Success Rate
            </h4>

            <h1 className="text-5xl font-black mt-4">
              96%
            </h1>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
          >
            <BarChart3
              className="text-orange-400 mb-5"
              size={35}
            />

            <h4 className="text-slate-400">
              Assessments
            </h4>

            <h1 className="text-5xl font-black mt-4">
              12K
            </h1>
          </motion.div>

          {/* Insights */}

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <h3 className="text-3xl font-bold mb-8">
              AI Insights
            </h3>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-slate-800 rounded-2xl p-6">
                <h4 className="font-bold mb-3">
                  Performance Alert
                </h4>

                <p className="text-slate-400">
                  Mathematics scores increased by
                  18% this semester.
                </p>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6">
                <h4 className="font-bold mb-3">
                  Student Engagement
                </h4>

                <p className="text-slate-400">
                  AI predicts improved retention
                  through adaptive testing.
                </p>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6">
                <h4 className="font-bold mb-3">
                  Resource Usage
                </h4>

                <p className="text-slate-400">
                  Smart Notes are the most used
                  feature among students.
                </p>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}