import Hero from "../components/Hero";

export default function Landing() {
  return (
    <>
      <Hero />

      {/* PLATFORM PREVIEW */}
      <section
        style={{
          padding: "100px 50px",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "60px",
          }}
        >
          Platform Preview
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
            gap: "30px",
          }}
        >
          {/* STUDENT */}
          <div
            style={{
              background: "var(--card)",
              borderRadius: "24px",
              padding: "25px",
            }}
          >
            <div
              style={{
                height: "220px",
                background: "var(--card2)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h3>🎓 Student Dashboard Preview</h3>
              <br />
              <p>📚 Notes & Resources</p>
              <p>🤖 AI Learning Assistant</p>
              <p>📅 Smart Calendar</p>
              <p>📊 Progress Tracking</p>
              <p>👥 Community Discussion</p>
            </div>

            <h3>Student Dashboard</h3>

            <p>
              Students can access notes, previous year papers,
              AI assistance and performance tracking.
            </p>
          </div>

          {/* TEACHER */}
          <div
            style={{
              background: "var(--card)",
              borderRadius: "24px",
              padding: "25px",
            }}
          >
            <div
              style={{
                height: "220px",
                background: "var(--card2)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h3>👨‍🏫 Teacher Dashboard Preview</h3>

              <br />

              <p>📝 AI Question Paper Generator</p>
              <p>📤 Upload Notes & PDFs</p>
              <p>📅 Exam Management</p>
              <p>📈 Student Analytics</p>
              <p>🔥 Doubt Heatmap</p>
            </div>

            <h3>Teacher Dashboard</h3>

            <p>
              Teachers can generate papers, upload resources,
              manage exams and monitor student learning.
            </p>
          </div>

          {/* AI */}
          <div
            style={{
              background: "var(--card)",
              borderRadius: "24px",
              padding: "25px",
            }}
          >
            <div
              style={{
                height: "220px",
                background: "var(--card2)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h3>🤖 AI Assistant Preview</h3>

              <br />

              <p>📄 PDF Analysis</p>
              <p>🖼 Image Questions</p>
              <p>🎤 Voice Input</p>
              <p>💡 Smart Explanations</p>
              <p>📚 Exam Preparation</p>
            </div>

            <h3>AI Learning Assistant</h3>

            <p>
              AI helps students understand concepts and helps
              teachers automate academic tasks.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CAMPUSMIND */}
      <section
        style={{
          padding: "100px 50px",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "60px",
          }}
        >
          Why CampusMind?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "var(--card)",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h3>📚 Teacher Resource Hub</h3>

            <p>
              Teachers upload notes, PDFs, assignments and
              learning resources.
            </p>
          </div>

          <div
            style={{
              background: "var(--card)",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h3>📅 Smart Exam Scheduling</h3>

            <p>
              Students receive exam dates, timings and classroom
              information.
            </p>
          </div>

          <div
            style={{
              background: "var(--card)",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h3>📊 Student Progress Tracking</h3>

            <p>
              Teachers monitor engagement and learning progress.
            </p>
          </div>

          <div
            style={{
              background: "var(--card)",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h3>📝 AI Question Paper Generator</h3>

            <p>
              Generate question papers based on topic and
              difficulty level.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "var(--bg)",
          color: "var(--text)",
          padding: "40px",
          textAlign: "center",
          borderTop: "1px solid var(--border)",
        }}
      >
        <h3>CampusMind</h3>

        <p
          style={{
            marginTop: "10px",
          }}
        >
          AI Powered Educational Platform for Students and
          Teachers
        </p>

        <p
          style={{
            marginTop: "20px",
            opacity: 0.7,
          }}
        >
          College Project Prototype • BKBIET Pilani
        </p>
      </footer>
    </>
  );
}