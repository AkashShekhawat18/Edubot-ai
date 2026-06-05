export default function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, rgba(0,194,255,.15), transparent 40%), radial-gradient(circle at bottom right, rgba(124,58,237,.15), transparent 40%), #050816",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#111827",
          padding: "40px",
          borderRadius: "24px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "12px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "none",
          }}
        />

        <select
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "12px",
          }}
        >
          <option>Student</option>
          <option>Teacher</option>
        </select>

        <button
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background:
              "linear-gradient(90deg,#00c2ff,#7c3aed)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}