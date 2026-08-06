import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Sparkles } from "lucide-react";
import { technologies, categories } from "../data/technologies";
import { getContentForTech } from "../data/content";
import TechBlock from "../components/home/TechBlock";
import Navbar from "../components/layout/Navbar";
import SearchPalette from "../components/docs/SearchPalette";
import BlogsSection from "../blogs/BlogsSection";

export default function Home({ initialTab = "docs" }) {
  const navigate = useNavigate();
  const { categoryId, postId } = useParams();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    if (initialTab === "blogs" || categoryId || postId || searchParams.get("tab") === "blogs") {
      return "blogs";
    }
    return "docs";
  });

  useEffect(() => {
    if (initialTab === "blogs" || categoryId || postId || searchParams.get("tab") === "blogs") {
      setActiveTab("blogs");
    }
  }, [initialTab, categoryId, postId, searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if ((tab === "docs" || tab === "cheatsheets") && window.location.pathname.includes("/blogs")) {
      navigate("/app/toolkit");
    } else if (tab === "blogs" && !window.location.pathname.includes("/blogs")) {
      navigate("/app/toolkit/blogs");
    }
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // --- Docs Bookmarks ---
  const [savedDocs, setSavedDocs] = useState(() => {
    try {
      const saved = localStorage.getItem("codesarthi_toolkit_docs_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const handleToggleDocSave = (id) => {
    setSavedDocs(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem("codesarthi_toolkit_docs_bookmarks", JSON.stringify(next));
      return next;
    });
  };

  // --- Blogs Bookmarks ---
  const [savedBlogs, setSavedBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem("codesarthi_toolkit_blog_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const handleToggleBlogSave = (id) => {
    setSavedBlogs(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem("codesarthi_toolkit_blog_bookmarks", JSON.stringify(next));
      return next;
    });
  };

  const totalCount = technologies.length;
  const savedCount = activeTab === "docs" ? savedDocs.length : savedBlogs.length;

  return (
    <div className="pt-5 bg-black min-h-screen">
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenSearch={() => setSearchOpen(true)}
        showSavedOnly={showSavedOnly}
        onToggleSaved={setShowSavedOnly}
        savedCount={savedCount}
      />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main className="mx-auto px-6 pb-24 pt-4 bg-black">

        {activeTab === "blogs" ? (
          <BlogsSection
            initialCategoryId={categoryId || searchParams.get("cat")}
            initialPostId={postId || searchParams.get("post")}
            showSavedOnly={showSavedOnly}
            savedBlogs={savedBlogs}
            onToggleBlogSave={handleToggleBlogSave}
          />
        ) : (
          <>
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
                Instant, production-ready developer docs and guides for web dev, languages, mobile apps, databases, and core dev tools.
              </motion.p>
            </section>

            {/* ── Content Grid ────────────────────────────────────────── */}
            {showSavedOnly ? (
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Saved Documentation
                  </h2>
                </div>
                {savedDocs.length === 0 ? (
                  <div className="py-16 text-center text-sm text-white/40 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                    You haven't saved any docs yet. Click the bookmark icon on any stack to save it!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {technologies
                      .filter((t) => savedDocs.includes(t.id))
                      .map((tech, i) => (
                        <TechBlock
                          key={tech.id}
                          tech={tech}
                          index={i}
                          available={Boolean(getContentForTech(tech.id))}
                          isSaved={true}
                          onToggleSave={handleToggleDocSave}
                        />
                      ))}
                  </div>
                )}
              </div>
            ) : (
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
                            isSaved={savedDocs.includes(tech.id)}
                            onToggleSave={handleToggleDocSave}
                          />
                        ))}
                      </div>
                    </motion.section>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
