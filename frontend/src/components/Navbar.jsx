import { Link } from "react-router-dom";
import { Menu, Bell, Moon, Sun, User } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] =
    useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 9999,
          background: "var(--bg)",
          padding: "18px 40px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <h2
            style={{
              background:
                "linear-gradient(90deg,#00c2ff,#7c3aed)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            CampusMind
          </h2>
        </Link>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {darkMode ? (
            <Sun
              size={20}
              onClick={toggleTheme}
              style={{
                cursor: "pointer",
                color: "var(--text)",
              }}
            />
          ) : (
            <Moon
              size={20}
              onClick={toggleTheme}
              style={{
                cursor: "pointer",
                color: "var(--text)",
              }}
            />
          )}

          <div
            style={{
              position: "relative",
            }}
          >
            <Bell
              size={20}
              style={{
                cursor: "pointer",
                color: "var(--text)",
              }}
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            />

            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                fontSize: "10px",
                width: "18px",
                height: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              3
            </span>
          </div>

          <User
            size={20}
            style={{
              cursor: "pointer",
              color: "var(--text)",
            }}
            onClick={() =>
              setShowProfile(!showProfile)
            }
          />

          <Menu
            size={22}
            style={{
              cursor: "pointer",
              color: "var(--text)",
            }}
            onClick={() =>
              setShowMenu(!showMenu)
            }
          />
        </div>
      </nav>

      {showNotifications && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "80px",
            background: "var(--card)",
            padding: "20px",
            borderRadius: "16px",
            width: "280px",
            zIndex: 9999,
            color: "var(--text)",
          }}
        >
          <h3>Notifications</h3>

          <p>📚 DBMS Notes Uploaded</p>
          <p>📝 Internal Test Scheduled</p>
          <p>📢 Teacher Announcement</p>
        </div>
      )}

      {showProfile && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "40px",
            background: "var(--card)",
            padding: "20px",
            borderRadius: "16px",
            width: "260px",
            zIndex: 9999,
            color: "var(--text)",
          }}
        >
          <h3>Krishna Sharma</h3>

          <p>@student_2026</p>

          <hr />

          <p>📅 Calendar</p>
          <p>📥 Downloaded Notes</p>
          <p>🔥 Community</p>
          <p>⚙ Settings</p>
        </div>
      )}

      {showMenu && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            background: "var(--card)",
            padding: "20px",
            borderRadius: "16px",
            width: "260px",
            zIndex: 9999,
            color: "var(--text)",
          }}
        >
          <Link
            to="/student"
            style={{
              color: "var(--text)",
              display: "block",
              marginBottom: "10px",
            }}
          >
            🎓 Student Dashboard
          </Link>

          <Link
            to="/teacher"
            style={{
              color: "var(--text)",
              display: "block",
              marginBottom: "10px",
            }}
          >
            👨‍🏫 Teacher Dashboard
          </Link>

          <Link
            to="/student/calendar"
            style={{
              color: "var(--text)",
              display: "block",
              marginBottom: "10px",
            }}
          >
            📅 Calendar
          </Link>

          <Link
            to="/student/community"
            style={{
              color: "var(--text)",
              display: "block",
              marginBottom: "10px",
            }}
          >
            🔥 Community
          </Link>

          <Link
            to="/student/progress"
            style={{
              color: "var(--text)",
              display: "block",
            }}
          >
            📈 Progress
          </Link>
        </div>
      )}
    </>
  );
}