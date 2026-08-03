import { ArrowLeft, Bookmark, Clock, Award, User, Tag, Trophy, BookOpen, ChevronRight } from "lucide-react";

export default function BlogPostList({ category, onBack, onSelectPost, bookmarkedIds = [], onToggleBookmark }) {
  if (!category) return null;

  const posts = category.posts || [];

  // Helper to compute quick read time
  const getReadTime = (post) => {
    if (!post?.content) return 3;
    let wordCount = 0;
    post.content.forEach((block) => {
      const text = block.text || (Array.isArray(block.items) ? block.items.map(i => typeof i === "string" ? i : (i.body || i.description || i.title || "")).join(" ") : "");
      wordCount += text.split(/\s+/).filter(Boolean).length;
    });
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  return (
    <div className="w-full bg-[#000000] text-white py-8 px-4 sm:px-6 max-w-[1700px] mx-auto space-y-10 selection:bg-[#534AB7]/30 font-sans">

      {/* ── Header & Navigation ──────────────────────────────────────────────── */}
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} className="text-white/80" />
          <span>Back to All Categories</span>
        </button>

        <div className="rounded-3xl bg-[#08080B] p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none transition-all duration-700" />

          <div className="space-y-4 relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-white/90">
              <Trophy size={13} className="text-amber-400" />
              <span>{category.name} Pillar</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              {category.fullName || category.name}
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4 bg-[#0F0F14] px-6 py-4 rounded-2xl relative z-10 shadow-lg">
            <BookOpen size={24} className="text-white/80" />
            <div className="text-left">
              <div className="text-xl font-black text-white">{posts.length}</div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Articles Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Post Cards Grid ─────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-sm font-mono font-extrabold uppercase tracking-widest text-white/80 pl-2 border-l-2 border-white/40">
          Featured Articles & Strategy Guides
        </h2>

        {posts.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-[#08080B] text-white/50 text-sm">
            No articles published in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => {
              const isSaved = bookmarkedIds.includes(post.id);
              const mins = getReadTime(post);

              return (
                <div
                  key={post.id}
                  onClick={() => onSelectPost(post.id)}
                  className="group relative rounded-3xl bg-[#08080B] hover:bg-[#0B0B10] p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/[0.03] via-transparent to-transparent pointer-events-none transition-all duration-500" />

                  <div className="space-y-5 relative z-10">
                    {/* Top row: Read time & Bookmark */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/70 bg-white/[0.05] px-3.5 py-1.5 rounded-full">
                        <Clock size={12} className="text-white/80" />
                        <span>{mins} min read</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(post.id);
                        }}
                        title={isSaved ? "Remove bookmark" : "Save article"}
                        className={`p-2.5 rounded-xl transition-all cursor-pointer ${isSaved
                            ? "bg-white/20 text-white shadow-md"
                            : "bg-white/[0.04] text-white/50 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        <Bookmark size={15} className={isSaved ? "fill-white text-white" : ""} />
                      </button>
                    </div>

                    {/* Title & Excerpt */}
                    <div className="space-y-2.5 pt-1">
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-white/90 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-3 font-normal">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author Line with Credibility Badge */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                      <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 text-white">
                        <User size={14} />
                      </div>
                      <div className="flex items-center flex-wrap gap-2 min-w-0">
                        <span className="text-xs font-bold text-white/80 truncate">
                          {post.author?.name || "CodeSarthi Team"}
                        </span>
                        {post.author?.credential && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.06] text-white/90 text-[10px] font-mono font-extrabold tracking-wide">
                            <Award size={11} className="text-amber-400 shrink-0" />
                            <span>{post.author.credential}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: Tags and Read button */}
                  <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-2 flex-wrap overflow-hidden max-h-7">
                      <Tag size={12} className="text-white/40 shrink-0" />
                      {(post.tags || []).slice(0, 2).map((tag, tIdx) => (
                        <span key={tIdx} className="text-xs text-white/50 font-semibold truncate max-w-[100px]">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="shrink-0 inline-flex items-center gap-1.5 text-xs font-extrabold text-white group-hover:translate-x-1 transition-transform">
                      <span>Read Article</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
