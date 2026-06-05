export default function Progress() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "100px 40px",
      }}
    >
      <h1>📈 Progress Tracking</h1>

      <div
        style={{
          marginTop: "30px",
          background: "#111827",
          padding: "25px",
          borderRadius: "20px",
        }}
      >
        <p>Mathematics - 78%</p>
        <p>Programming - 85%</p>
        <p>Data Structures - 69%</p>
        <p>DBMS - 72%</p>
      </div>
    </div>
  );
}