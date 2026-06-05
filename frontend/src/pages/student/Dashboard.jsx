export default function Dashboard() {
  const chats = [
    "DBMS Notes",
    "SQL Help",
    "Python",
    "Trees",
    "Operating System",
  ];

  const actions = [
    "Explain Binary Trees",
    "Generate Practice Test",
    "Summarize PDF",
    "Study Plan",
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
        {/* LEFT SIDEBAR */}
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
              background: "linear-gradient(90deg,#00c2ff,#7c3aed)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + New Chat
          </button>

          <h3 style={{ marginTop: "25px" }}>Recent Chats</h3>

          {chats.map((chat) => (
            <div
              key={chat}
              style={{
                padding: "12px",
                marginTop: "10px",
                borderRadius: "12px",
                background: "#111827",
                cursor: "pointer",
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
              marginBottom: "20px",
            }}
          >
            🤖 CAMPUSMIND AI
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              marginBottom: "30px",
            }}
          >
            What would you like to learn today?
          </p>

          <div
            style={{
              background: "#111827",
              borderRadius: "20px",
              padding: "25px",
              minHeight: "350px",
            }}
          >
            Ask questions, upload PDFs, images,
            handwritten notes or voice recordings.
          </div>

          <h3 style={{ marginTop: "30px" }}>
            Suggested Actions
          </h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "15px",
            }}
          >
            {actions.map((action) => (
              <button
                key={action}
                style={{
                  padding: "10px 15px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#111827",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {action}
              </button>
            ))}
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
              placeholder="Ask CampusMind AI..."
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
              <button>📎 PDF</button>
              <button>🖼 Image</button>
              <button>🎤 Voice</button>
              <button>➤ Send</button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
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
            📅 DBMS Exam
            <br />
            15 June
          </div>

          <div
            style={{
              marginTop: "15px",
              background: "#111827",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            📚 New Notes Uploaded
          </div>

          <div
            style={{
              marginTop: "15px",
              background: "#111827",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            🧪 Test in 3 Days
          </div>
        </div>
      </div>
    </div>
  );
}