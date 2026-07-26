import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Search, Sparkles } from "lucide-react";
import { technologies, categories } from "../data/technologies";
import { getContentForTech } from "../data/content";
import TechBlock from "../components/home/TechBlock";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const totalCount = technologies.length;

  // Compute matched technologies and their sub-topics when searching
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const matchedTechs = [];

    technologies.forEach((tech) => {
      const content = getContentForTech(tech.id);
      const nameMatch = tech.name.toLowerCase().includes(q) || tech.id.toLowerCase().includes(q);

      let matchedTopics = [];
      if (content) {
        matchedTopics = content.topics.filter(
          (topic) =>
            topic.title.toLowerCase().includes(q) ||
            topic.sections?.some((s) => s.heading.toLowerCase().includes(q))
        );
      }

      if (nameMatch || matchedTopics.length > 0) {
        matchedTechs.push({
          ...tech,
          content,
          matchedTopics,
        });
      }
    });

    return matchedTechs;
  }, [searchQuery]);

  return (
    <main className="mx-auto  px-6 pb-24 bg-black">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className=" flex flex-col items-start pt-16 pb-12 md:pt-24 md:pb-16">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-600/0 px-3.5 py-1.5 text-xs font-medium text-white"
        >
          <Sparkles size={13} />
          {totalCount} technologies · 5 broad categories
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl"
        >
          The syntax you already know,{" "}
          <span className="text-white/40">the moment you need it.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-xl text-base text-white/50 md:text-lg"
        >
          Instant, production-ready cheat sheets for web dev, languages, mobile apps, databases, and core dev tools.
        </motion.p>

        {/* Hero Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 w-full max-w-2xl"
        >
          <div className="relative flex items-center rounded-2xl border border-white/15 bg-white/[0.04] p-2 backdrop-blur-xl shadow-2xl transition-all focus-within:border-accent/50 focus-within:bg-white/[0.06]">
            <Search size={20} className="ml-3 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cheat sheets or sub-topics… (e.g. HTML, Flexbox, Docker, MongoDB)"
              className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="rounded-lg px-2.5 py-1 text-xs text-white/40 hover:bg-white/10 hover:text-white"
              >
                Clear
              </button>
            ) : (
              <span className="mr-2 hidden rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/30 sm:inline-block">
                Press <kbd className="font-mono">⌘K</kbd>
              </span>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Search Mode Active ──────────────────────────────────────────────── */}
      {searchResults !== null ? (
        <section className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-semibold text-white">
              Search Results for "{searchQuery}"
            </h2>
            <span className="text-xs text-white/40">
              Found {searchResults.length} matching technologies
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-16 text-center text-sm text-white/40">
              No technology or sub-topic matches "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((tech) => {
                const IconComp = Icons[tech.icon] ?? Icons.Code2;
                return (
                  <div
                    key={tech.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-white/20"
                  >
                    <div>
                      {/* Tech Header */}
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                          style={{ color: tech.color }}
                        >
                          <IconComp size={20} />
                        </span>
                        <div>
                          <h3 className="font-bold text-white text-base">
                            {tech.name}
                          </h3>
                          <p className="text-xs text-white/40">{tech.tagline}</p>
                        </div>
                      </div>

                      {/* Sub Table of Contents / Topics Preview */}
                      {tech.matchedTopics && tech.matchedTopics.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/[0.06]">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-white/35 mb-2">
                            Sub Table of Contents ({tech.matchedTopics.length} matched)
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {tech.matchedTopics.slice(0, 4).map((topic) => (
                              <button
                                key={topic.id}
                                onClick={() => navigate(`/docs/${tech.id}#${topic.id}`)}
                                className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-left text-xs text-white/70 hover:border-accent/40 hover:text-accent transition-colors"
                              >
                                {topic.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Open Full Cheat Sheet button */}
                    <button
                      onClick={() => navigate(`/docs/${tech.id}`)}
                      className="mt-5 w-full rounded-xl border border-accent/30 bg-accent/10 py-2.5 text-center text-xs font-semibold text-accent transition-all hover:bg-accent/20"
                    >
                      Open Full {tech.name} Cheat Sheet →
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        /* ── Standard Categorized View ────────────────────────────────────────── */
        <div className="flex flex-col gap-16">
          {categories.map((cat, catIdx) => {
            const catTechs = technologies.filter((t) => t.category === cat.id);
            const CatIcon = Icons[cat.icon] ?? Icons.Code;

            return (
              <motion.section
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 + catIdx * 0.07 }}
              >
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <CatIcon size={13} className="text-white/50" />
                  </span>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                    {cat.label}
                  </h2>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <span className="text-[11px] text-white/20">
                    {catTechs.length}
                  </span>
                </div>

                {/* Tech grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {catTechs.map((tech, i) => (
                    <TechBlock
                      key={tech.id}
                      tech={tech}
                      index={i}
                      available={Boolean(getContentForTech(tech.id))}
                    />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      )}
    </main>
  );
}
