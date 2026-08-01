import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import {
  ArrowLeft,
  Search,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  ZoomIn,
} from "lucide-react";
import { technologies, getTechById } from "../data/technologies";
import { getContentForTech } from "../data/content";
import Sidebar from "../components/docs/Sidebar";
import CodeBlock from "../components/docs/CodeBlock";
import EmptyState from "../components/docs/EmptyState";

export default function DocPage() {
  const { techId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const tech = getTechById(techId);
  const content = getContentForTech(techId);

  const [activeTopic, setActiveTopic] = useState(content?.topics[0]?.id);
  const [filterQuery, setFilterQuery] = useState("");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const observerRef = useRef(null);
  const mainRef = useRef(null);
  // Flag to suppress IntersectionObserver updates during programmatic scrolls
  const isProgrammaticScrollRef = useRef(false);

  // Close lightbox modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Helper: find the app-level scroll container (marked with data-scroll-root in Body.jsx)
  const getScrollContainer = () => {
    return document.querySelector('[data-scroll-root="true"]') || document.documentElement;
  };

  // Scroll the correct container to a target element with navbar offset
  const scrollToElement = (targetEl) => {
    if (!targetEl) return;
    // The scroll container (data-scroll-root) starts directly below the navbar,
    // so we only need a small breathing room offset, not the full navbar height.
    const SCROLL_OFFSET = 16; // px of breathing room above the heading
    const container = getScrollContainer();
    const containerRect = container.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const offset = targetRect.top - containerRect.top + container.scrollTop - SCROLL_OFFSET;
    container.scrollTo({ top: offset, behavior: "smooth" });
  };

  // Determine previous & next technologies in the same category
  const { prevTech, nextTech } = useMemo(() => {
    if (!tech) return { prevTech: null, nextTech: null };
    const sameCat = technologies.filter((t) => t.category === tech.category);
    const index = sameCat.findIndex((t) => t.id === tech.id);
    return {
      prevTech: index > 0 ? sameCat[index - 1] : null,
      nextTech: index < sameCat.length - 1 ? sameCat[index + 1] : null,
    };
  }, [tech]);

  // Filter topics based on in-page search input
  const filteredTopics = useMemo(() => {
    if (!content) return [];
    if (!filterQuery.trim()) return content.topics;

    const q = filterQuery.toLowerCase();
    return content.topics
      .map((topic) => {
        const titleMatch = topic.title.toLowerCase().includes(q);
        const matchingSections = topic.sections?.filter(
          (sec) =>
            sec.heading.toLowerCase().includes(q) ||
            sec.description?.toLowerCase().includes(q) ||
            sec.code?.toLowerCase().includes(q)
        );

        if (titleMatch || (matchingSections && matchingSections.length > 0)) {
          return {
            ...topic,
            sections: titleMatch ? topic.sections : matchingSections,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [content, filterQuery]);

  // Total snippet count
  const totalSnippets = useMemo(() => {
    if (!content) return 0;
    return content.topics.reduce((acc, t) => acc + (t.sections?.length || 0), 0);
  }, [content]);

  // Setup Intersection Observer to highlight sidebar as user scrolls
  useEffect(() => {
    if (!content || filterQuery) return;

    const scrollContainer = getScrollContainer();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Ignore observer updates while we're doing a programmatic scroll
        if (isProgrammaticScrollRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTopic(entry.target.id);
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: "-10% 0px -75% 0px",
      }
    );

    content.topics.forEach((topic) => {
      const el = document.getElementById(topic.id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [content, techId, filterQuery]);

  // Handle hash scroll navigation (e.g. #topicId)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        scrollToElement(el);
      }, 150);
    } else {
      // Scroll to top of the container
      const container = getScrollContainer();
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash, techId]);

  const handleSelectTopic = (id) => {
    setActiveTopic(id);
    setMobileTocOpen(false);

    // Suppress IntersectionObserver updates for the duration of the scroll animation
    isProgrammaticScrollRef.current = true;
    clearTimeout(isProgrammaticScrollRef._timer);
    isProgrammaticScrollRef._timer = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 1000); // Allow 1s for the smooth scroll to finish

    const el = document.getElementById(id);
    if (el) {
      scrollToElement(el);
      // Update URL hash WITHOUT triggering React Router's location change
      // (use replaceState directly; it won't fire the hash useEffect)
    }
  };

  if (!tech) return <Navigate to="/" replace />;
  const Icon = Icons[tech.icon] ?? Icons.Code2;

  return (
    <main ref={mainRef} className="mx-auto  px-4 md:px-20 pb-24 bg-black">
      {/* Header */}
      <div className="flex flex-col gap-6 pt-10 pb-8 border-b border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/app/toolkit"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/40 transition-colors hover:text-white/80"
            >
              <ArrowLeft size={15} />
            </Link>
            <span
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]"
              style={{ color: tech.color }}
            >
              <Icon size={22} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {tech.name}
                </h1>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50 font-medium">
                  {totalSnippets} snippets
                </span>
              </div>
              <p className="text-sm text-white/45 mt-0.5">{tech.tagline}</p>
            </div>
          </div>
        </div>

        {/* Quick In-Page Search Filter Bar */}
        {content && (
          <div className="relative flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 transition-all focus-within:border-accent/40 focus-within:bg-white/[0.05]">
            <Search size={16} className="text-white/35 mr-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={`Quick filter inside ${tech.name} cheat sheet…`}
              className="w-full bg-transparent text-xs text-white placeholder:text-white/35 focus:outline-none"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery("")}
                className="text-xs text-white/40 hover:text-white/80"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {!content ? (
        <EmptyState techName={tech.name} />
      ) : (
        <div className="flex gap-10 pt-8">
          {/* Desktop Table of Contents Sidebar */}
          <Sidebar
            topics={content.topics}
            activeTopic={activeTopic}
            onSelect={handleSelectTopic}
          />

          {/* Main Continuous Cheat Sheet View */}
          <div className="min-w-0 flex-1 flex flex-col gap-16">
            {filteredTopics.length === 0 ? (
              <div className="py-16 text-center text-sm text-white/35">
                No topics in {tech.name} match "{filterQuery}"
              </div>
            ) : (
              filteredTopics.map((topic, index) => (
                <motion.section
                  id={topic.id}
                  key={topic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="scroll-mt-24 border-b border-white/[0.05] pb-12 last:border-b-0"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                      <span className="text-accent/60 font-mono text-lg">#</span>
                      {topic.title}
                    </h2>
                    <span className="text-xs text-white/50 font-mono">
                      {topic.sections?.length || 0} snippets
                    </span>
                  </div>

                  <div className="flex flex-col gap-10">
                    {topic.sections?.map((section, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <h3 className="text-[25px] font-semibold text-white/90">
                          {section.heading}
                        </h3>
                        {section.description && (
                          <p className="text-[20px] text-white/50 leading-relaxed whitespace-pre-wrap">
                            {section.description}
                          </p>
                        )}
                        {section.code && (
                          <div className="mt-1 ">
                            <CodeBlock

                              code={section.code}
                              language={section.language}
                            />
                          </div>
                        )}
                        {section.image && (
                          <div 
                            onClick={() => setSelectedImage(section.image)}
                            className="group relative mt-3 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-accent/5"
                          >
                            <div className="relative overflow-hidden">
                              <img
                                src={section.image.url}
                                alt={section.image.alt || "Output"}
                                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
                                <div className="flex items-center gap-2 rounded-full bg-black/80 border border-white/20 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                                  <ZoomIn size={15} className="text-accent" />
                                  <span>Click to view larger</span>
                                </div>
                              </div>
                            </div>
                            {section.image.caption && (
                              <div className="p-3 border-t border-white/5 text-xs text-white/40 bg-black/20 text-center">
                                {section.image.caption}
                              </div>
                            )}
                          </div>
                        )}
                        {section.table && (
                          <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
                            <table className="w-full text-left text-sm text-white/70">
                              <thead className="border-b border-white/10 bg-white/5 text-white/90">
                                <tr>
                                  {section.table.headers.map((h, idx) => (
                                    <th key={idx} className="px-4 py-3 font-semibold">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {section.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="px-4 py-3 align-top leading-relaxed">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>
              ))
            )}

            {/* Next / Previous Technology Footer Cards */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevTech ? (
                <button
                  onClick={() => navigate(`/app/toolkit/docs/${prevTech.id}`)}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <ChevronLeft className="text-white/40 group-hover:text-accent transition-colors shrink-0" size={20} />
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-white/35">
                      Previous Technology
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                      {prevTech.name}
                    </div>
                  </div>
                </button>
              ) : <div />}

              {nextTech ? (
                <button
                  onClick={() => navigate(`/app/toolkit/docs/${nextTech.id}`)}
                  className="group flex items-center justify-end gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-right transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-white/35">
                      Next Technology
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                      {nextTech.name}
                    </div>
                  </div>
                  <ChevronRight className="text-white/40 group-hover:text-accent transition-colors shrink-0" size={20} />
                </button>
              ) : <div />}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Table of Contents Floating Action Button */}
      {content && (
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <button
            onClick={() => setMobileTocOpen(true)}
            className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent px-4 py-3 text-xs font-bold text-base-950 shadow-2xl transition-transform active:scale-95"
          >
            <List size={16} />
            <span>Table of Contents</span>
          </button>
        </div>
      )}

      {/* Mobile Table of Contents Drawer */}
      <AnimatePresence>
        {mobileTocOpen && content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-md lg:hidden"
            onClick={() => setMobileTocOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[75vh] w-full overflow-y-auto rounded-t-3xl border-t border-white/15 bg-[#0F0F12] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 font-bold text-white text-base">
                  <BookOpen size={18} className="text-accent" />
                  <span>{tech.name} — Table of Contents</span>
                </div>
                <button
                  onClick={() => setMobileTocOpen(false)}
                  className="rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1.5">
                {content.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic.id)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-white/80 hover:bg-white/5 active:bg-accent/10 active:text-accent"
                  >
                    <span>{topic.title}</span>
                    <span className="text-xs text-white/30 font-mono">
                      {topic.sections?.length || 0}
                    </span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-10 cursor-zoom-out"
          >
            {/* Close Cross Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="fixed top-6 right-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition-all hover:scale-105 hover:bg-white/20 hover:text-white hover:border-white/40 active:scale-95 shadow-xl"
              title="Close modal (Esc)"
            >
              <X size={24} />
            </button>

            {/* Enlarged Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/20 bg-[#121216] shadow-2xl flex flex-col cursor-default"
            >
              <div className="overflow-auto max-h-[80vh] flex items-center justify-center bg-black/60 p-2">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt || "Enlarged view"}
                  className="max-h-full max-w-full object-contain rounded-lg mx-auto"
                />
              </div>
              {selectedImage.caption && (
                <div className="border-t border-white/10 bg-white/[0.04] p-4 text-center text-sm text-white/80 font-medium">
                  {selectedImage.caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
