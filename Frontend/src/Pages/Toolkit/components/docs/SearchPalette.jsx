import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { Search, CornerDownLeft, BookOpen, Layers, Code2, FileText } from "lucide-react";
import * as Icons from "lucide-react";
import { technologies } from "../../data/technologies";
import { getContentForTech } from "../../data/content";
import { blogData } from "../../blogs/blogData";

// Build a rich multi-level search index: Docs, Blogs, Topics, and Sections
function buildIndex() {
  const entries = [];

  // 1. Technologies / Docs Index
  technologies.forEach((tech) => {
    const content = getContentForTech(tech.id);
    if (!content) return;

    // Tech Entry (Full Documentation)
    entries.push({
      type: "tech",
      id: `tech-${tech.id}`,
      techId: tech.id,
      techName: tech.name,
      icon: tech.icon,
      color: tech.color,
      title: `${tech.name} — Full Documentation`,
      subtitle: `${content.topics.length} topics · ${tech.tagline}`,
    });

    // Topic Entries (Sub Table of Contents)
    content.topics.forEach((topic) => {
      entries.push({
        type: "topic",
        id: `topic-${tech.id}-${topic.id}`,
        techId: tech.id,
        techName: tech.name,
        topicId: topic.id,
        icon: tech.icon,
        color: tech.color,
        title: topic.title,
        subtitle: `Table of Contents in ${tech.name}`,
        sectionCount: topic.sections?.length || 0,
      });

      // Section / Code Snippet Entries
      topic.sections?.forEach((sec, idx) => {
        entries.push({
          type: "section",
          id: `sec-${tech.id}-${topic.id}-${idx}`,
          techId: tech.id,
          techName: tech.name,
          topicId: topic.id,
          icon: tech.icon,
          color: tech.color,
          title: sec.heading,
          description: sec.description || "",
          codeSnippet: sec.code ? sec.code.slice(0, 90).replace(/\n/g, " ") : "",
          subtitle: `${tech.name} → ${topic.title}`,
        });
      });
    });
  });

  // 2. Blog Posts Index
  if (blogData && blogData.categories) {
    blogData.categories.forEach((cat) => {
      (cat.posts || []).forEach((post) => {
        // Aggregate content text for deep search matching
        const contentText = (post.content || [])
          .map((block) => {
            if (block.text) return block.text;
            if (block.heading) return block.heading;
            if (Array.isArray(block.items)) {
              return block.items
                .map((i) => (typeof i === "string" ? i : `${i.title || ""} ${i.description || ""} ${i.body || ""}`))
                .join(" ");
            }
            return "";
          })
          .join(" ");

        entries.push({
          type: "blog",
          id: `blog-${cat.id}-${post.id}`,
          categoryId: cat.id,
          postId: post.id,
          icon: cat.icon || "BookOpen",
          color: "#f59e0b", // Amber for blogs & guides
          title: post.title,
          description: post.excerpt || "",
          tags: (post.tags || []).join(" "),
          contentWords: contentText.slice(0, 5000),
          subtitle: `Blog · ${cat.name} Pillar · By ${post.author?.name || "CodeSarthi"}`,
        });
      });
    });
  }

  return entries;
}

export default function SearchPalette({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const index = useMemo(buildIndex, []);

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: "techName", weight: 0.4 },
          { name: "title", weight: 0.35 },
          { name: "tags", weight: 0.3 },
          { name: "description", weight: 0.2 },
          { name: "contentWords", weight: 0.15 },
          { name: "codeSnippet", weight: 0.1 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [index]
  );

  const rawResults = useMemo(() => {
    if (!query.trim()) {
      return index;
    }
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, index]);

  // Group results by category: Tech (Docs), Blogs, Topics (TOC), Sections
  const groupedResults = useMemo(() => {
    if (!query.trim()) {
      const techs = index.filter((e) => e.type === "tech").slice(0, 6);
      const blogs = index.filter((e) => e.type === "blog").slice(0, 3);
      return { techs, blogs, topics: [], sections: [] };
    }
    const techs = rawResults.filter((r) => r.type === "tech").slice(0, 3);
    const blogs = rawResults.filter((r) => r.type === "blog").slice(0, 4);
    const topics = rawResults.filter((r) => r.type === "topic").slice(0, 5);
    const sections = rawResults.filter((r) => r.type === "section").slice(0, 4);
    return { techs, blogs, topics, sections };
  }, [query, rawResults, index]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const goTo = (item) => {
    if (item.type === "tech") {
      navigate(`/app/toolkit/docs/${item.techId}`);
    } else if (item.type === "blog") {
      navigate(`/app/toolkit/blogs/${item.categoryId}/${item.postId}`);
    } else {
      navigate(`/app/toolkit/docs/${item.techId}#${item.topicId}`);
    }
    onClose();
  };

  const hasResults =
    groupedResults.techs.length > 0 ||
    groupedResults.blogs.length > 0 ||
    groupedResults.topics.length > 0 ||
    groupedResults.sections.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-md pt-[12vh] px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/12 bg-[#0E0E11] shadow-2xl"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5 bg-white/[0.02]">
              <Search size={18} className="text-white/40 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs, blogs, sub-topics, or syntax snippets… (e.g. HTML, SIH, useState)"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded px-1.5 py-0.5 text-xs text-white/40 hover:text-white/80 shrink-0 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Container */}
            <div className="max-h-[60vh] overflow-y-auto scrollbar-none py-3 px-2 flex flex-col gap-4">
              {!hasResults ? (
                <div className="py-12 text-center text-sm text-white/35">
                  No docs, blogs, or topics matching "{query}"
                </div>
              ) : (
                <>
                  {/* 1. Full Developer Docs Section */}
                  {groupedResults.techs.length > 0 && (
                    <div>
                      <div className="px-3 mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
                        <FileText size={12} />
                        <span>Developer Documentation</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {groupedResults.techs.map((item) => {
                          const IconComp = Icons[item.icon] ?? Icons.Code2;
                          return (
                            <button
                              key={item.id}
                              onClick={() => goTo(item)}
                              className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all hover:bg-accent/10 border border-transparent hover:border-accent/20 cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <span
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] shrink-0"
                                  style={{ color: item.color }}
                                >
                                  <IconComp size={16} />
                                </span>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-white/45 truncate">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>
                              <span className="flex items-center gap-1 text-xs text-accent/80 font-medium shrink-0">
                                Open Docs <CornerDownLeft size={12} />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2. Strategy Blogs & Guides Section */}
                  {groupedResults.blogs.length > 0 && (
                    <div>
                      <div className="px-3 mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                        <BookOpen size={12} />
                        <span>Strategy Blogs & Guides</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {groupedResults.blogs.map((item) => {
                          const IconComp = Icons[item.icon] ?? Icons.BookOpen;
                          return (
                            <button
                              key={item.id}
                              onClick={() => goTo(item)}
                              className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all hover:bg-amber-400/10 border border-transparent hover:border-amber-400/20 cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <span
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] shrink-0"
                                  style={{ color: item.color }}
                                >
                                  <IconComp size={16} />
                                </span>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-white/45 truncate">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>
                              <span className="flex items-center gap-1 text-xs text-amber-400/80 font-medium shrink-0">
                                Read Guide <CornerDownLeft size={12} />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. Sub Table of Contents (Topics) Section */}
                  {groupedResults.topics.length > 0 && (
                    <div>
                      <div className="px-3 mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        <Layers size={12} />
                        <span>Sub Table of Contents / Topics</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {groupedResults.topics.map((item) => {
                          return (
                            <button
                              key={item.id}
                              onClick={() => goTo(item)}
                              className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all hover:bg-white/[0.05] cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0" />
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-white/90 group-hover:text-white truncate">
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-white/40 truncate">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>
                              <span className="flex items-center gap-1 text-xs text-white/30 group-hover:text-white/60 shrink-0">
                                Jump to topic <CornerDownLeft size={12} />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 4. Sections & Code Snippets */}
                  {groupedResults.sections.length > 0 && (
                    <div>
                      <div className="px-3 mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                        <Code2 size={12} />
                        <span>Matching Sections & Code</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {groupedResults.sections.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => goTo(item)}
                            className="group flex flex-col gap-1 rounded-xl px-3.5 py-2.5 text-left transition-all hover:bg-white/[0.05] border border-white/[0.04] cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs font-semibold text-white/90 truncate pr-2">
                                {item.title}
                              </span>
                              <span className="text-[11px] text-white/40 font-mono shrink-0">
                                {item.subtitle}
                              </span>
                            </div>
                            {item.codeSnippet && (
                              <div className="mt-1 font-mono text-[11px] text-white/50 bg-black/40 rounded px-2.5 py-1 truncate w-full">
                                {item.codeSnippet}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.02] px-4 py-2 text-[11px] text-white/30">
              <span>Press <kbd className="rounded border border-white/10 bg-white/5 px-1 font-mono">ESC</kbd> to exit</span>
              <span>Search across docs, syntax, and strategy blogs</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
