import { Flame } from "lucide-react";

export default function DoubtHeatmap() {
  const topics = [
    { topic: "Binary Trees", doubts: 127, level: "Critical" },
    { topic: "Recursion", doubts: 93, level: "High" },
    { topic: "SQL Joins", doubts: 88, level: "High" },
    { topic: "Normalization", doubts: 61, level: "Medium" },
    { topic: "OS Scheduling", doubts: 47, level: "Low" },
  ];

  const getColor = (level) => {
    switch (level) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="text-red-400" />
        <h2 className="text-xl font-bold">
          Doubt Heatmap
        </h2>
      </div>

      <div className="space-y-4">
        {topics.map((item) => (
          <div
            key={item.topic}
            className="bg-slate-800 rounded-xl p-4"
          >
            <div className="flex justify-between mb-2">
              <span>{item.topic}</span>
              <span>{item.doubts} doubts</span>
            </div>

            <div className="w-full h-3 bg-slate-700 rounded-full">
              <div
                className={`h-3 rounded-full ${getColor(item.level)}`}
                style={{
                  width: `${Math.min(item.doubts / 1.5, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-slate-400">
        🟥 Critical &nbsp;
        🟧 High &nbsp;
        🟨 Medium &nbsp;
        🟩 Low
      </div>
    </div>
  );
}