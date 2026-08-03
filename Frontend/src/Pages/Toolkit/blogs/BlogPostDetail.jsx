import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, Clock, Share2, Bookmark, Check, Sparkles, Award, User, Tag, ChevronRight, Trophy } from "lucide-react";
import BlockRenderer, { slugify } from "./BlockRenderer";

import ReadingProgressBar from "./ReadingProgressBar";

export default function BlogPostDetail({ post, category, onBack, onSelectPost, isBookmarked, onToggleBookmark }) {
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top when post opens or changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [post?.id]);

  // Compute read time from total words across text blocks (~200 words/minute)
  const readTimeMinutes = useMemo(() => {
    if (!post?.content) return 3;
    let wordCount = 0;

    post.content.forEach((block) => {
      if (block.type === "paragraph" || block.type === "quote") {
        const text = block.text || "";
        wordCount += text.split(/\s+/).filter(Boolean).length;
      } else if (block.type === "bulletList" || block.type === "numberedList") {
        (block.items || []).forEach((item) => {
          const content = typeof item === "string" ? item : `${item.title || ""} ${item.body || item.text || ""}`;
          wordCount += content.split(/\s+/).filter(Boolean).length;
        });
      } else if (block.type === "promptBlock") {
        const text = block.text || "";
        wordCount += text.split(/\s+/).filter(Boolean).length;
      }
    });

    const mins = Math.ceil(wordCount / 200);
    return Math.max(1, mins);
  }, [post]);

  // Extract headings for Table of Contents
  const headings = useMemo(() => {
    if (!post?.content) return [];
    return post.content
      .filter((block) => block.type === "heading")
      .map((block) => ({
        id: slugify(block.text),
        text: block.text,
        level: block.level || 2
      }));
  }, [post]);

  // Key takeaways mapping per specification
  const keyTakeaways = useMemo(() => {
    if (post?.id === "sih-tips-common-mistakes") {
      return [
        "Address every word of the problem statement — drift kills strong solutions.",
        "A working prototype, even basic, outweighs polish.",
        "Judges can tell AI-written content from genuine insight — write in your own voice."
      ];
    } else if (post?.id === "sih-problem-statement-analysis") {
      return [
        "Decode the problem before building anything — most losing teams misread the PS, not the tech.",
        "Use the structured analysis prompt below to pressure-test your PS across 7 dimensions.",
        "Feasibility and evaluator perspective matter as much as the idea itself."
      ];
    } else if (post?.id === "sih-2025-top-25-problem-statements-analysis") {
      return [
        "NAMASTE & ICD-11 EMR integration and AI Public Health Chatbots lead the 2025 rankings with a near-perfect score of 29/30.",
        "High feasibility (5/5) is achieved by utilizing established AI/NLP, OCR, and cloud frameworks rather than unverified emergent tech.",
        "Balance high innovation scores with technical depth and practical MVP execution within the strict hackathon timeframe."
      ];
    }
    return [
      "Analyze the core problem deeply before selecting a solution architecture.",
      "Practical execution and working demos outperform theoretical complexity."
    ];
  }, [post?.id]);

  // Related posts in same category
  const relatedPosts = useMemo(() => {
    if (!category?.posts) return [];
    return category.posts.filter((p) => p.id !== post.id);
  }, [category, post]);

  if (!post) return null;

  const handleShare = () => {
    const origin = window.location.origin;
    const shareUrl = `${origin}/app/toolkit/blogs/${category?.id || "sih"}/${post.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white pb-20 selection:bg-white/20 relative font-sans">
      <ReadingProgressBar />

      {/* ── Top Navigation & Actions Bar ──────────────────────────────────────── */}
      <div className="max-w-[1650px] mx-auto bg-[#08080B]/95 backdrop-blur-2xl sticky top-16 z-20 py-4 px-6 shadow-2xl rounded-3xl mt-2 w-full">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="text-white/80" />
            <span>Back to {category?.name || "All"} Articles</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Share link button */}
            <button
              onClick={handleShare}
              title="Copy shareable link"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${copiedLink
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-white/[0.06] text-white/80 hover:bg-white/15 hover:text-white"
                }`}
            >
              {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
              <span>{copiedLink ? "Link Copied!" : "Share"}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(post.id)}
              title={isBookmarked ? "Remove bookmark" : "Save for later"}
              className={`p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${isBookmarked
                ? "bg-white/20 text-white shadow-lg"
                : "bg-white/[0.06] text-white/80 hover:bg-white/15 hover:text-white"
                }`}
            >
              <Bookmark size={14} className={isBookmarked ? "fill-white text-white" : ""} />
              <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Article Body & Sidebar ────────────────────────────────────────────── */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">

        {/* Main Content Area */}
        <article className="flex-1 min-w-0 w-full">

          {/* Article Header & Metadata */}
          <header className="space-y-4 pb-8 border-b border-white/[0.06] mb-8">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white/50">
              <span className="px-3 py-1 rounded-full bg-white/[0.08] text-white/90 uppercase tracking-wider font-mono">
                {category?.name || "Guide"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-white/70">
                <Clock size={13} className="text-white/80" />
                <span>{readTimeMinutes} min read</span>
              </span>
              <span>•</span>
              <time className="text-white/50">{post.publishedAt || "Feb 2025"}</time>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            )}

            {/* Author Line & Credibility Badge */}
            <div className="flex items-center gap-3.5 pt-4">
              <div className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-sm font-extrabold text-white">
                  {post.author?.name || "CodeSarthi Team"}
                </span>
                {post.author?.credential && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] text-white/90 text-[11px] font-mono font-black tracking-wide w-fit">
                    <Award size={13} className="text-amber-400 shrink-0" />
                    <span>{post.author.credential}</span>
                  </span>
                )}
              </div>
            </div>
          </header>

          {/* ── Main Article Blocks Renderer ──────────────────────────────────── */}
          <div className="prose prose-invert max-w-none space-y-6 text-white/80">
            <BlockRenderer blocks={post.content} />
          </div>

          {/* Tags Footer */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-white/[0.06] flex items-center flex-wrap gap-2">
              <span className="text-xs font-bold text-white/40 flex items-center gap-1.5 mr-2 font-mono uppercase tracking-wider">
                <Tag size={13} /> Tags:
              </span>
              {post.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] text-xs font-semibold text-white/60 hover:text-white transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ── Related Posts Footer ──────────────────────────────────────────── */}
          <div className="mt-16 pt-10 border-t border-white/[0.06]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2.5">
                <Trophy size={20} className="text-white/80" />
                <span>Continue Reading in {category?.fullName || category?.name}</span>
              </h3>
              <button
                onClick={onBack}
                className="text-xs font-semibold text-white/70 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {relatedPosts.length === 0 ? (
              <p className="text-xs text-white/40 italic py-4">You've reached the end of this series! Check back soon for new articles in {category?.name}.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectPost(rel.id)}
                    className="group rounded-3xl bg-[#08080B] hover:bg-[#0B0B10] p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/80 px-2.5 py-1 rounded bg-white/[0.06]">
                          {category?.name || "Article"}
                        </span>
                        <span className="text-xs text-white/50">{rel.publishedAt || "2025"}</span>
                      </div>
                      <h4 className="font-black text-white text-lg group-hover:text-white/90 transition-colors leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                      <span>Read article →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Desktop Sticky Sidebar Table of Contents */}

      </div>
    </div>
  );
}
