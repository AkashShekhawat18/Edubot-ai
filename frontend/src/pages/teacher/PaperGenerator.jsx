export default function PaperGenerator() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "100px 40px",
      }}
    >
      <h1>📝 AI Question Paper Generator</h1>

      <div
        style={{
          background: "#111827",
          padding: "30px",
          borderRadius: "20px",
          marginTop: "30px",
          maxWidth: "700px",
        }}
      >
        <input
          placeholder="Subject"
          style={input}
        />

        <input
          placeholder="Topic"
          style={input}
        />

        <select style={input}>
          <option>Level A - 2 to 4 hours study</option>
          <option>Level B - Half Day Study</option>
          <option>Level C - 5+ Days Study</option>
          <option>Level D - One Month Study</option>
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
          }}
        >
          Generate Paper
        </button>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "12px",
};