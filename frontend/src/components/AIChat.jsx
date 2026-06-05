import { motion } from "framer-motion";
import { Bot, User, Sparkles } from "lucide-react";
import FileUploader from './FileUploader';

export default function AIChat() {
  return (
    <section
      id="ai-chat"
      className="py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 font-semibold">
            AI ASSISTANT
          </span>

          <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6">
            Your Personal AI Tutor
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ask questions, generate notes, solve doubts and
            prepare for exams instantly.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden"
        >

          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <Bot className="text-cyan-400" />
            <span className="font-semibold">
              CampusMind AI
            </span>
          </div>

          <div className="p-6 space-y-6">

            <div className="flex justify-end">
              <div className="bg-cyan-500 text-black max-w-md rounded-2xl px-5 py-4">
                Explain Ohm's Law in simple words.
              </div>
            </div>

            <div className="flex gap-4">
              <Bot className="text-cyan-400 mt-2" />

              <div className="bg-slate-800 max-w-xl rounded-2xl px-5 py-4">
                Ohm's Law states that the current flowing
                through a conductor is directly proportional
                to the voltage and inversely proportional
                to resistance.
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-violet-500 text-white max-w-md rounded-2xl px-5 py-4">
                Generate 5 important exam questions.
              </div>
            </div>

            <div className="flex gap-4">
              <Sparkles className="text-violet-400 mt-2" />

              <div className="bg-slate-800 rounded-2xl px-5 py-4">
                <ul className="space-y-2">
                  <li>1. Define Ohm's Law.</li>
                  <li>2. State Kirchhoff's Laws.</li>
                  <li>3. Explain AC vs DC.</li>
                  <li>4. Derive power equations.</li>
                  <li>5. Solve circuit numericals.</li>
                </ul>
              </div>
            </div>

          </div>

          <div className="p-5 border-t border-slate-800 flex gap-3">

            <input
              type="text"
              placeholder="Ask anything..."
              className="flex-1 bg-slate-800 rounded-xl px-4 py-3 outline-none"
            />

            <button className="px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600">
              Send
            </button>

          </div>

          <div className="p-5 border-t border-slate-800">
            {/* File uploader (S3 presigned) */}
            <div className="max-w-md">
              <h4 className="font-bold mb-3">Upload resource</h4>
              {/* eslint-disable-next-line react/jsx-no-undef */}
              <FileUploader onComplete={(doc) => console.log('uploaded', doc)} />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}