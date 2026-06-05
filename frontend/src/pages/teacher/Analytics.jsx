export default function Analytics() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "100px 40px",
      }}
    >
      <h1>📈 Teacher Analytics</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {[
          "Student Engagement",
          "Test Participation",
          "Pass Rate",
          "Learning Progress",
        ].map((item) => (
          <div
            key={item}
            style={{
              background: "#111827",
              padding: "25px",
              borderRadius: "20px",
            }}
          >
            <h3>{item}</h3>
            <br />
            <div
              style={{
                height: "150px",
                background: "#0f172a",
                borderRadius: "12px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}