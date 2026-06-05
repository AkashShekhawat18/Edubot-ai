import { useState } from "react";

export default function SupportBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(
    "Hello 👋 Need help navigating CampusMind?"
  );

  const quickReply = (text) => {
    if (text === "Calendar") {
      setMessage(
        "📅 You can find upcoming exams, tests and assignments inside the Calendar section."
      );
    }

    if (text === "Resources") {
      setMessage(
        "📚 Notes, PDFs and study material are available in Resources."
      );
    }

    if (text === "Community") {
      setMessage(
        "🔥 Community allows students and teachers to discuss doubts and share solutions."
      );
    }

    if (text === "Settings") {
      setMessage(
        "⚙ Settings can be accessed from your profile menu."
      );
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            zIndex: 9999,
            background:
              "linear-gradient(135deg,#00c2ff,#7c3aed)",
            color: "white",
            fontSize: "28px",
            boxShadow:
              "0 0 25px rgba(124,58,237,.5)",
          }}
        >
          💬
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            width: "360px",
            background: "#111827",
            borderRadius: "20px",
            overflow: "hidden",
            zIndex: 9999,
            border:
              "1px solid rgba(255,255,255,.08)",
          }}
        >
          <div
            style={{
              padding: "15px",
              background:
                "linear-gradient(90deg,#00c2ff,#7c3aed)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <b>💬 Support Assistant</b>

            <button
              onClick={() => setOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              padding: "20px",
              color: "white",
            }}
          >
            <div
              style={{
                background: "#0f172a",
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            >
              {message}
            </div>

            <button
              style={btn}
              onClick={() =>
                quickReply("Calendar")
              }
            >
              📅 Calendar
            </button>

            <button
              style={btn}
              onClick={() =>
                quickReply("Resources")
              }
            >
              📚 Resources
            </button>

            <button
              style={btn}
              onClick={() =>
                quickReply("Community")
              }
            >
              🔥 Community
            </button>

            <button
              style={btn}
              onClick={() =>
                quickReply("Settings")
              }
            >
              ⚙ Settings
            </button>

            <div
              style={{
                display: "flex",
                marginTop: "15px",
                gap: "10px",
              }}
            >
              <input
                placeholder="Ask anything..."
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                }}
              />

              <button
                style={{
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(90deg,#00c2ff,#7c3aed)",
                  color: "white",
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "12px",
  border: "none",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
};