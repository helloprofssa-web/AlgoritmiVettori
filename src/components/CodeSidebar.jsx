import { Code2 } from "lucide-react";

export default function CodeSidebar({ lines, activeLine }) {
  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <Code2 className="h-5 w-5" />
        <span className="font-semibold">Codice C++</span>
      </div>

      <div className="flex-1 overflow-y-auto font-mono text-sm">
        {lines.map((line, index) => {
          const isActive = activeLine === index;

          return (
            <div
              key={index}
              className={`flex gap-3 px-4 py-1 ${isActive ? "bg-amber-400/20" : ""}`}
            >
              <span className={`w-6 text-right text-xs ${isActive ? "text-amber-300" : "text-slate-500"}`}>
                {index + 1}
              </span>
              <span
                className={isActive ? "text-amber-100" : "text-slate-200"}
                style={{ whiteSpace: "pre" }}
              >
                {line}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}