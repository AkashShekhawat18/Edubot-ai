export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-16 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
              CampusMind
            </h2>

            <p className="text-slate-400 mt-4">
              AI Powered Education Platform for Students & Teachers.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Platform
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li>AI Tutor</li>
              <li>Analytics</li>
              <li>Question Generator</li>
              <li>Resources</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Features
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li>Smart Notes</li>
              <li>Mock Tests</li>
              <li>Student Dashboard</li>
              <li>Teacher Dashboard</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Contact
            </h3>

            <div className="text-slate-400">
              contact@campusmind.com
            </div>

            <div className="text-slate-400 mt-2">
              +91 9876543210
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          © 2026 CampusMind. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}