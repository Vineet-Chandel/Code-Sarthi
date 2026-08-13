import { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";
import { ChevronRight, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ topics = [], categories = null, activeTopic, onSelect }) {
  const asideRef = useRef(null);
  const activeRef = useRef(null);

  // Build structured category list
  const structuredCategories = useMemo(() => {
    if (categories && Array.isArray(categories)) {
      return categories
        .map((cat) => {
          const catTopics = (cat.topicIds || cat.topics || [])
            .map((tId) => (typeof tId === "string" ? topics.find((t) => t.id === tId) : tId))
            .filter(Boolean);
          return {
            title: cat.title || cat.name,
            topics: catTopics,
          };
        })
        .filter((cat) => cat.topics.length > 0);
    }

    // Fallback: group by topic.category if present
    const hasTopicCategories = topics.some((t) => t.category);
    if (hasTopicCategories) {
      const groups = {};
      topics.forEach((t) => {
        const cat = t.category || "General";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(t);
      });
      return Object.entries(groups).map(([title, catTopics]) => ({
        title,
        topics: catTopics,
      }));
    }

    return null;
  }, [topics, categories]);

  // Track the SINGLE currently open category dropdown title
  const [openCategory, setOpenCategory] = useState(() => {
    if (!structuredCategories || structuredCategories.length === 0) return null;
    if (activeTopic) {
      const parentCat = structuredCategories.find((cat) =>
        cat.topics.some((t) => t.id === activeTopic)
      );
      if (parentCat) return parentCat.title;
    }
    return structuredCategories[0].title;
  });

  // Auto-expand single category containing active topic when activeTopic changes
  useEffect(() => {
    if (!structuredCategories || !activeTopic) return;
    const parentCat = structuredCategories.find((cat) =>
      cat.topics.some((t) => t.id === activeTopic)
    );
    if (parentCat) {
      setOpenCategory(parentCat.title);
    }
  }, [activeTopic, structuredCategories]);

  // Auto scroll active element inside sidebar
  useEffect(() => {
    const aside = asideRef.current;
    const btn = activeRef.current;
    if (!aside || !btn) return;

    const asideTop = aside.scrollTop;
    const asideBottom = asideTop + aside.clientHeight;
    const btnTop = btn.offsetTop;
    const btnBottom = btnTop + btn.offsetHeight;

    if (btnTop < asideTop) {
      aside.scrollTo({ top: btnTop - 8, behavior: "smooth" });
    } else if (btnBottom > asideBottom) {
      aside.scrollTo({ top: btnBottom - aside.clientHeight + 8, behavior: "smooth" });
    }
  }, [activeTopic, openCategory]);

  const toggleCategory = (title) => {
    setOpenCategory((prevTitle) => (prevTitle === title ? null : title));
  };

  return (
    <aside
      ref={asideRef}
      className="sticky top-20 hidden h-[85vh] w-64 shrink-0 overflow-y-auto pr-3 lg:block scrollbar-none"
    >
      <div className="mb-4 px-2 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/65 flex items-center gap-1.5">
          <Layers size={13} className="text-blue-400" />
          Table of Contents
        </p>
        <span className="text-[11px] font-mono text-orange-400 border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 rounded-full">
          {topics.length} topics
        </span>
      </div>

      <nav className="flex flex-col gap-1.5">
        {structuredCategories ? (
          structuredCategories.map((category) => {
            const isExpanded = openCategory === category.title;
            const hasActiveTopic = category.topics.some((t) => t.id === activeTopic);

            return (
              <div key={category.title} className="flex flex-col">
                {/* Main Category Dropdown Heading */}
                <button
                  onClick={() => toggleCategory(category.title)}
                  className={clsx(
                    "group flex items-center justify-between w-full rounded-lg px-2.5 py-2 text-left text-[13px] font-semibold transition-all duration-200 border",
                    hasActiveTopic
                      ? "bg-blue-500/10 text-white border-blue-500/40 shadow-sm"
                      : "bg-white/[0.02] text-white/80 hover:bg-white/[0.05] hover:text-white border-white/5"
                  )}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <motion.span
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="text-white/40 group-hover:text-white/70 flex shrink-0"
                    >
                      <ChevronRight size={14} />
                    </motion.span>
                    <span className="truncate">{category.title}</span>
                  </div>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white/60 shrink-0">
                    {category.topics.length}
                  </span>
                </button>

                {/* Subtopics Animated Dropdown Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="dropdown-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 pl-2.5 border-l border-white/10 flex flex-col gap-0.5 my-1.5">
                        {category.topics.map((topic) => {
                          const isActive = activeTopic === topic.id;
                          const displayTitle = topic.shortTitle || topic.title;

                          return (
                            <button
                              key={topic.id}
                              ref={isActive ? activeRef : null}
                              onClick={() => onSelect(topic.id)}
                              className={clsx(
                                "group relative flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[12px] transition-all duration-150",
                                isActive
                                  ? "bg-blue-500/15 font-semibold text-blue-400 border-l-2 border-blue-500 pl-2"
                                  : "text-white/60 hover:bg-white/[0.04] hover:text-white/90"
                              )}
                            >
                              <span className="truncate pr-2">{displayTitle}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          /* Single Flat Topic List Fallback */
          topics.map((topic) => {
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
                <span className="truncate pr-2">{topic.shortTitle || topic.title}</span>
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
          })
        )}
      </nav>
    </aside>
  );
}
