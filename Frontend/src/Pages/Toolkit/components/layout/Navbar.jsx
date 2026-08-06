import { Link, useNavigate } from "react-router-dom";
import { Command, Terminal, FileText, BookOpen, Bookmark } from "lucide-react";

export default function Navbar({
  activeTab = "docs",
  onTabChange,
  onOpenSearch,
  showSavedOnly = false,
  onToggleSaved,
  savedCount = 0
}) {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      if (tab === "docs" || tab === "cheatsheets") navigate("/app/toolkit");
      if (tab === "blogs") navigate("/app/toolkit/blogs");
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 gap-3">
        {/* Left: Logo / Terminal Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/app/toolkit" onClick={() => handleTabClick("docs")} className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1a1a1e] border border-white/10 text-white transition-all duration-300 group-hover:border-white/25 group-hover:scale-105 shadow-sm">
              <Terminal size={18} strokeWidth={2.25} className="text-white" />
            </span>
          </Link>
          <span className="hidden sm:inline-block font-black tracking-tight text-white text-base font-sans">
            Toolkit
          </span>
        </div>

        {/* Center: Docs / Blogs Tab Switcher */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1 rounded-2xl bg-[#0d0d12] border border-white/10 p-1 shadow-inner backdrop-blur-xl">
            <button
              type="button"
              onClick={() => handleTabClick("docs")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "docs" || activeTab === "cheatsheets"
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.25)] scale-[1.02]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileText size={14} className={activeTab === "docs" || activeTab === "cheatsheets" ? "text-black" : "text-zinc-400"} />
              <span>Docs</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabClick("blogs")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.25)] scale-[1.02]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen size={14} className={activeTab === "blogs" ? "text-black" : "text-zinc-400"} />
              <span>Blogs</span>
            </button>
          </div>
        </div>

        {/* Right: Saved Filter & Search Button */}
        <div className="flex items-center justify-end shrink-0 gap-2.5">
          {onToggleSaved && (
            <button
              onClick={() => onToggleSaved(!showSavedOnly)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm border cursor-pointer ${
                showSavedOnly
                  ? "bg-amber-400 text-black border-amber-400 font-bold scale-[1.02]"
                  : "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <Bookmark size={15} className={showSavedOnly ? "fill-black text-black" : "text-amber-400"} />
              <span className="hidden sm:inline">Saved</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${showSavedOnly ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-white/70"}`}>
                {savedCount}
              </span>
            </button>
          )}

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs sm:text-sm text-white/60 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white shadow-sm cursor-pointer"
          >
            <span className="hidden md:inline">Search docs & blogs…</span>
            <span className="md:hidden">Search</span>
            <span className="flex items-center gap-0.5 rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white/60">
              <Command size={10} /> K
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
