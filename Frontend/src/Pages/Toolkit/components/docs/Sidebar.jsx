import { useEffect, useRef } from "react";
import clsx from "clsx";

export default function Sidebar({ topics, activeTopic, onSelect }) {
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeTopic]);

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto pr-3 lg:block scrollbar-none">
      <div className="mb-3 px-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/65">
          Table of Contents
        </p>
        <span className="text-[12px] font-mono text-orange-500 border-2 border-orange-500 px-2 py-1 rounded-lg">
          {topics.length} topics
        </span>
      </div>
      <nav className="flex flex-col gap-1">
        {topics.map((topic) => {
          const isActive = activeTopic === topic.id;
          const sectionCount = topic.sections?.length || 0;

          return (
            <button
              key={topic.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(topic.id)}
              className={clsx(
                "group relative flex items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition-all duration-150",
                isActive
                  ? "bg-blue-500/10 font-medium text-blue-500 border-l-2 border-blue-500 pl-2.5"
                  : "text-white/50 hover:bg-white/[0.04] hover:text-white/85"
              )}
            >
              <span className="truncate pr-2">{topic.title}</span>
              {sectionCount > 0 && (
                <span
                  className={clsx(
                    "rounded px-1.5 py-0.5 text-[10px] font-mono transition-colors",
                    isActive
                      ? "bg-accent/20 text-accent font-semibold"
                      : "bg-white/[0.04] text-white/30 group-hover:text-white/50"
                  )}
                >
                  {sectionCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
