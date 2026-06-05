export default function Calendar() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "white",
        padding: "100px 40px",
      }}
    >
      <h1>📅 Academic Calendar</h1>

      <div
        style={{
          marginTop: "30px",
          background: "#111827",
          padding: "25px",
          borderRadius: "20px",
        }}
      >
        <p>📌 Mid Semester Exam - 15 Oct</p>
        <p>📌 Assignment Submission - 20 Oct</p>
        <p>📌 Lab Test - 25 Oct</p>
        <p>📌 End Semester Exam - 10 Nov</p>
      </div>
    </div>
  );
}