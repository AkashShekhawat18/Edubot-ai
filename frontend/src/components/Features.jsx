import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  BookOpen,
  BarChart3,
  FileText,
  GraduationCap,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Bot size={30} />,
      title: "AI Tutor",
      desc: "Ask questions, get instant explanations and personalized guidance."
    },
    {
      icon: <Brain size={30} />,
      title: "Smart Learning",
      desc: "Adaptive learning paths based on performance and strengths."
    },
    {
      icon: <BookOpen size={30} />,
      title: "Study Resources",
      desc: "Access notes, PDFs, lectures and AI generated summaries."
    },
    {
      icon: <FileText size={30} />,
      title: "Question Generator",
      desc: "Generate complete question papers in seconds."
    },
    {
      icon: <BarChart3 size={30} />,
      title: "Analytics",
      desc: "Track student performance with detailed visual reports."
    },
    {
      icon: <GraduationCap size={30} />,
      title: "Exam Preparation",
      desc: "Mock tests, revision plans and smart recommendations."
    }
  ];

  return (
    <section
      id="features"
      className="relative py-32 px-6 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Everything You Need
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Designed for both students and teachers.
            One platform. Unlimited possibilities.
          </p>
        </motion.div>

        {/* Bento Grid */}

        <div className="grid lg:grid-cols-4 gap-6">

          {/* Big Card */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-cyan-500/10 to-violet-600/10 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl"
          >
            <div className="mb-6">
              <Brain size={40} />
            </div>

            <h3 className="text-3xl font-bold mb-4">
              AI Learning Engine
            </h3>

            <p className="text-slate-400 mb-8">
              Personalized recommendations, instant doubt solving,
              adaptive quizzes and smart learning strategies.
            </p>

            <div className="h-40 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              <span className="text-cyan-400 font-bold text-xl">
                AI Processing Learning Data...
              </span>
            </div>
          </motion.div>

          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10
              }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl"
            >
              <div className="mb-5 text-cyan-400">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}