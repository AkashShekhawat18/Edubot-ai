import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 40px",
        background:
          "radial-gradient(circle at top left, rgba(0,194,255,.15), transparent 40%), radial-gradient(circle at bottom right, rgba(124,58,237,.15), transparent 40%), #050816",
      }}
    >
      <div style={{ maxWidth: "900px" }}>
        <p
          style={{
            color: "#00c2ff",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          AI Powered Education Platform
        </p>

        <h1
          style={{
            fontSize: "4.5rem",
            lineHeight: "1.1",
            fontWeight: "900",
            marginBottom: "30px",
          }}
        >
          Learn Smarter.
          <br />
          Teach Better.
          <br />
          <span
            style={{
              background:
                "linear-gradient(90deg,#00c2ff,#7c3aed)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Powered By AI.
          </span>
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "20px",
            maxWidth: "750px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          CampusMind is an AI-powered educational platform
          designed for students and teachers.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/student">
            <button
              style={{
                padding: "15px 32px",
                borderRadius: "999px",
                border: "none",
                background:
                  "linear-gradient(90deg,#00c2ff,#7c3aed)",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              🎓 Student Portal
            </button>
          </Link>

          <Link to="/teacher">
            <button
              style={{
                padding: "15px 32px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,.15)",
                background: "transparent",
                color: "white",
                cursor: "pointer",
              }}
            >
              👨‍🏫 Teacher Portal
            </button>
          </Link>
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ color: "#00c2ff" }}>
              AI Powered
            </h3>
            <p style={{ color: "#94a3b8" }}>
              Learning Assistant
            </p>
          </div>

          <div>
            <h3 style={{ color: "#00c2ff" }}>
              Teacher
            </h3>
            <p style={{ color: "#94a3b8" }}>
              Automation Tools
            </p>
          </div>

          <div>
            <h3 style={{ color: "#00c2ff" }}>
              Student
            </h3>
            <p style={{ color: "#94a3b8" }}>
              Progress Tracking
            </p>
          </div>

          <div>
            <h3 style={{ color: "#00c2ff" }}>
              Smart
            </h3>
            <p style={{ color: "#94a3b8" }}>
              Exam Management
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}