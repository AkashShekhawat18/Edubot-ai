export default function Heatmap() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "100px 40px",
      }}
    >
      <h1>🔥 Doubt Heatmap</h1>

      <div
        style={{
          marginTop: "30px",
          background: "#111827",
          borderRadius: "20px",
          padding: "30px",
        }}
      >
        <h3>Most Difficult Topics</h3>

        <br />

        <p>Binary Trees — 127 doubts</p>
        <p>Recursion — 93 doubts</p>
        <p>SQL Joins — 88 doubts</p>
        <p>Graphs — 71 doubts</p>
        <p>Operating Systems — 64 doubts</p>
      </div>
    </div>
  );
}