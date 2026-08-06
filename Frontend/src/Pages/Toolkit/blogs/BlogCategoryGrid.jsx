import { useMemo } from "react";
import * as Icons from "lucide-react";
import { Search, Trophy, Bookmark, Sparkles, Clock, Award, User, Tag, ChevronRight, BookOpen, Layers } from "lucide-react";

export default function BlogCategoryGrid({ 
  categories = [], 
  onSelectCategory, 
  onSelectPost, 
  bookmarkedIds = [], 
  onToggleBookmark,
  showSavedOnly
}) {
  // Collect all posts across all categories for searching & saved view
  const allPosts = useMemo(() => {
    const list = [];
    categories.forEach((cat) => {
      (cat.posts || []).forEach((post) => {
        list.push({ ...post, category: cat });
      });
    });
    return list;
  }, [categories]);

  // Filter posts based on saved view
  const filteredPosts = useMemo(() => {
    if (!showSavedOnly) return [];
    return allPosts.filter((p) => bookmarkedIds.includes(p.id));
  }, [allPosts, showSavedOnly, bookmarkedIds]);

  const getReadTime = (post) => {
    if (!post?.content) return 3;
    let wordCount = 0;
    post.content.forEach((block) => {
      const text = block.text || (Array.isArray(block.items) ? block.items.map(i => typeof i === "string" ? i : i.body || "").join(" ") : "");
      wordCount += text.split(/\s+/).filter(Boolean).length;
    });
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  return (
    <div className="w-full bg-[#000000] text-white py-8 px-4 sm:px-6 mx-auto space-y-12 selection:bg-white/20 font-sans">

      {/* ── Hero Banner ────────────────────────────────────────── */}
      <div className="rounded-3xl bg-[#08080B] p-6 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center group">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none transition-all duration-700" />

        <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-white/90 mb-5 shadow-inner relative z-10">
          <Sparkles size={13} className="text-amber-300" />
          <span>Toolkit Content Hub & Strategy Studio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl relative z-10">
          Deep-Dive Guides & <span className="text-white/70">Hackathon Strategy</span>
        </h1>
      </div>

      {/* ── Saved Filter View ──────────────────────────────────────── */}
      {showSavedOnly ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h2 className="text-sm font-mono font-extrabold uppercase tracking-widest text-white/80 pl-2 border-l-2 border-white/40 flex items-center gap-2">
              <span>Saved Strategy Blogs</span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-[#08080B] space-y-3">
              <BookOpen size={40} className="text-white/30 mx-auto stroke-[1.5]" />
              <div className="text-base font-bold text-white/80">No saved blogs yet</div>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                You haven't saved any blog posts to your bookmarks yet. Click the bookmark icon on any article to save it here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => {
                const isSaved = true; // since this view only shows saved posts
                const mins = getReadTime(post);

                return (
                  <div
                    key={post.id}
                    onClick={() => onSelectPost(post.id, post.category)}
                    className="group relative rounded-3xl bg-[#08080B] hover:bg-[#0B0B10] p-6 sm:p-7 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-white/[0.03] via-transparent to-transparent pointer-events-none transition-all duration-500" />

                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/80 bg-white/[0.06] px-2.5 py-1 rounded-md uppercase">
                          {post.category?.name || "Article"}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-white/60 bg-white/[0.04] px-2.5 py-1 rounded-full">
                            <Clock size={12} className="text-white/80" />
                            <span>{mins} min</span>
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(post.id);
                            }}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${isSaved
                              ? "bg-white/20 text-white shadow-md"
                              : "bg-white/[0.04] text-white/50 hover:bg-white/10 hover:text-white"
                              }`}
                          >
                            <Bookmark size={14} className={isSaved ? "fill-white text-white" : ""} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        <h3 className="text-xl font-black text-white group-hover:text-white/90 transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-white/[0.04] flex items-center justify-between relative z-10">
                      <span className="text-xs font-bold text-white/60 flex items-center gap-1.5">
                        <User size={13} className="text-white/80" />
                        <span>{post.author?.name || "Team"}</span>
                      </span>

                      <span className="text-xs font-extrabold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read article →</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        /* ── Standard Category Cards View ───────────────────────────────────── */
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-white/[0.06] text-white shadow-sm">
                <Layers size={18} />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  Content Pillars & Categories
                </h2>
                <p className="text-xs text-white/60">Select a category to explore specialized guides, templates, and frameworks</p>
              </div>
            </div>
            <span className="text-xs font-mono uppercase font-bold text-white/50 hidden sm:inline">
              {categories.length} {categories.length === 1 ? "Category Active" : "Categories Available"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const IconComp = Icons[cat.icon] || Icons.Folder;
              const postCount = (cat.posts || []).length;

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  className="group relative rounded-3xl bg-[#08080B] hover:bg-[#0B0B10] border border-white/[0.06] hover:border-white/[0.15] p-6 sm:p-7 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden min-h-[260px]"
                >
                  <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/[0.02] rounded-full blur-2xl pointer-events-none transition-all duration-500" />

                  <div className="space-y-4 relative z-10">
                    {cat.image && (
                      <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-500 mb-2 border border-white/[0.08]">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08080B] via-transparent to-transparent opacity-70 pointer-events-none" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <IconComp size={24} />
                      </div>
                      <span className="text-xs font-mono font-black uppercase px-3 py-1 rounded-full bg-white/[0.04] text-white/70">
                        {postCount} {postCount === 1 ? "Guide" : "Guides"}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono font-black uppercase tracking-widest text-white/50">
                        {cat.fullName || cat.name}
                      </div>
                      <h3 className="text-2xl font-black text-white group-hover:text-white/90 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal pt-1">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-xs font-extrabold text-white relative z-10 group-hover:underline">
                    <span>Explore {cat.name} Guides</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
