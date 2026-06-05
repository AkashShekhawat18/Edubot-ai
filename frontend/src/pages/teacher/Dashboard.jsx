import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const chats = [
    "Question Paper - DBMS",
    "OS Mid Sem",
    "Python Lab",
    "AI Assignment",
    "Analytics Report",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "100px 20px 30px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 280px",
          gap: "20px",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "20px",
            height: "80vh",
          }}
        >
          <button
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              background:
                "linear-gradient(90deg,#00c2ff,#7c3aed)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + New Paper
          </button>

          <h3 style={{ marginTop: "25px" }}>
            Teacher Tools
          </h3>

          <div
            onClick={() =>
              navigate("/teacher/paper-generator")
            }
            style={{
              padding: "12px",
              marginTop: "10px",
              borderRadius: "12px",
              background: "#111827",
              cursor: "pointer",
            }}
          >
            📄 Paper Generator
          </div>

          <div
            style={{
              padding: "12px",
              marginTop: "10px",
              borderRadius: "12px",
              background: "#111827",
            }}
          >
            📤 Upload Resources
          </div>

          <div
            style={{
              padding: "12px",
              marginTop: "10px",
              borderRadius: "12px",
              background: "#111827",
            }}
          >
            📅 Exam Management
          </div>

          <div
            onClick={() =>
              navigate("/teacher/analytics")
            }
            style={{
              padding: "12px",
              marginTop: "10px",
              borderRadius: "12px",
              background: "#111827",
              cursor: "pointer",
            }}
          >
            📊 Analytics
          </div>

          <div
            onClick={() =>
              navigate("/teacher/heatmap")
            }
            style={{
              padding: "12px",
              marginTop: "10px",
              borderRadius: "12px",
              background: "#111827",
              cursor: "pointer",
            }}
          >
            🔥 Doubt Heatmap
          </div>

          <h3 style={{ marginTop: "25px" }}>
            Recent Work
          </h3>

          {chats.map((chat) => (
            <div
              key={chat}
              style={{
                padding: "10px",
                marginTop: "10px",
                borderRadius: "12px",
                background: "#111827",
              }}
            >
              {chat}
            </div>
          ))}
        </div>

        {/* CENTER */}
        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
            }}
          >
            👨‍🏫 CAMPUSMIND TEACHER AI
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              marginTop: "15px",
            }}
          >
            Generate papers, create assignments,
            manage exams and analyze student
            performance.
          </p>

          <div
            style={{
              background: "#111827",
              borderRadius: "20px",
              padding: "25px",
              minHeight: "350px",
              marginTop: "25px",
            }}
          >
            Ask AI:
            <br />
            <br />
            • Generate DBMS Question Paper
            <br />
            • Create Assignment
            <br />
            • Analyze Student Results
            <br />
            • Generate MCQ Test
            <br />
            • Create Semester Exam
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button>Generate Paper</button>
            <button>Create MCQ Test</button>
            <button>Analyze Results</button>
            <button>Exam Blueprint</button>
          </div>

          <div
            style={{
              marginTop: "25px",
              background: "#111827",
              borderRadius: "16px",
              padding: "15px",
            }}
          >
            <input
              placeholder="Ask Teacher AI..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "white",
                outline: "none",
                fontSize: "16px",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              <button>📎 Upload</button>
              <button>📄 PDF</button>
              <button>🎤 Voice</button>
              <button>➤ Send</button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "20px",
            height: "80vh",
          }}
        >
          <h3>Quick View</h3>

          <div
            style={{
              marginTop: "15px",
              background: "#111827",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            📚 24 Resources Uploaded
          </div>

          <div
            style={{
              marginTop: "15px",
              background: "#111827",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            📝 3 Exams Scheduled
          </div>

          <div
            style={{
              marginTop: "15px",
              background: "#111827",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            📊 Avg Class Score: 78%
          </div>

          <div
            style={{
              marginTop: "15px",
              background: "#111827",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            🔥 Most Asked Topic:
            <br />
            Binary Trees
          </div>
        </div>
      </div>
    </div>
  );
}