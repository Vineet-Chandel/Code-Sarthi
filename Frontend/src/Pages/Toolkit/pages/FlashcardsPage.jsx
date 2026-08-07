import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Zap } from "lucide-react";
import { getFlashcardsForTech } from "../data/flashcards";
import { getTechById, technologies } from "../data/technologies";

export default function FlashcardsPage() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const flashcards = getFlashcardsForTech(techId);
  const tech = getTechById(techId);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") navigate(`/app/toolkit/docs/${techId}`);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, techId]);

  if (!tech) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p>Technology not found.</p>
        <button onClick={() => navigate(`/app/toolkit`)} className="ml-4 text-blue-500 underline">Go Back</button>
      </div>
    );
  }

  const renderNavLinks = () => (
    technologies
      .filter(t => getFlashcardsForTech(t.id).length > 0)
      .map(t => (
      <button
        key={t.id}
        onClick={() => {
          navigate(`/app/toolkit/docs/${t.id}/flashcard`);
          setSidebarOpen(false);
        }}
        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
          techId === t.id 
            ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" 
            : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
        }`}
      >
        <span className="text-sm font-medium">{t.name}</span>
      </button>
    ))
  );

  const renderTechIcon = () => {
    if (tech.id === "html") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
          <g fill="none">
            <rect width={256} height={256} fill="#e14e1d" rx={60}></rect>
            <path fill="#fff" d="m48 38l8.61 96.593h110.71l-3.715 41.43l-35.646 9.638l-35.579-9.624l-2.379-26.602H57.94l4.585 51.281l65.427 18.172l65.51-18.172l8.783-98.061H85.824l-2.923-32.71h122.238L208 38z"></path>
            <path fill="#ebebeb" d="M128 38H48l8.61 96.593H128v-31.938H85.824l-2.923-32.71H128zm0 147.647l-.041.014l-35.579-9.624l-2.379-26.602H57.94l4.585 51.281l65.427 18.172l.049-.014z"></path>
          </g>
        </svg>
      );
    }
    if (tech.id === "css") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
          <g fill="none">
            <rect width={256} height={256} fill="#0277bd" rx={60}></rect>
            <path fill="#ebebeb" d="m53.753 102.651l2.862 31.942h71.481v-31.942zM128.095 38H48l2.904 31.942h77.191zm0 180.841v-33.233l-.14.037l-35.574-9.605l-2.274-25.476H58.042l4.475 50.154l65.431 18.164z"></path>
            <path fill="#fff" d="m167.318 134.593l-3.708 41.426l-35.625 9.616v33.231l65.483-18.148l.48-5.397l7.506-84.092l.779-8.578L208 38h-80.015v31.942h45.009l-2.906 32.709h-42.103v31.942z"></path>
          </g>
        </svg>
      );
    }
    return (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/50">
        {tech.name.charAt(0)}
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden scrollbar-none bg-black">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0a0a] shrink-0 overflow-y-auto scrollbar-none">
        <div className="p-5 flex items-center gap-2">
          <Zap size={14} className="text-amber-400 fill-amber-400" />
          <h2 className="text-xs font-bold text-white/70 uppercase tracking-widest">Available Flash</h2>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {renderNavLinks()}
        </nav>
      </aside>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Panel */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-[120] w-[280px] bg-[#0a0a0a] flex flex-col md:hidden shadow-2xl"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-amber-400 fill-amber-400" />
                <h2 className="text-xs font-bold text-white/70 uppercase tracking-widest">Available Flash</h2>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white p-2 bg-white/5 rounded-full">
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto scrollbar-none">
              {renderNavLinks()}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-none relative flex flex-col scroll-smooth bg-black">
        {/* Mobile Top Bar */}
        <header className="flex md:hidden items-center justify-between p-4 shrink-0 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-white/80 hover:text-white p-1">
              <Menu size={24} />
            </button>
            <span className="font-semibold text-white">{tech.name} Flashcards</span>
          </div>
          <button onClick={() => navigate(`/app/toolkit/docs/${techId}`)} className="text-white/80 hover:text-white p-1">
            <X size={24} />
          </button>
        </header>

        {/* Header Title Section */}
        <div className="w-full max-w-2xl mx-auto px-4 pt-12 pb-10 text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">{tech.name} Flashcards</h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg">
            Swipe through these visual tips and code snippets to level up your {tech.name} skills. Discover best practices and cheat sheets in a fast, feed-like format.
          </p>
        </div>

        {/* Feed Container */}
        {(!flashcards || flashcards.length === 0) ? (
          <div className="flex-1 flex items-center justify-center text-white/40 pb-32">
            No flashcards have been added for {tech.name} yet.
          </div>
        ) : (
          <div className="w-full flex flex-col gap-12 pb-20">
            {flashcards.map((card, index) => (
              <div key={card.id || index} className="w-full bg-[#0a0a0a] overflow-hidden scrollbar-none flex flex-col rounded-3xl mx-auto max-w-4xl shadow-2xl">

                {/* Images Carousel */}
                {card.images && card.images.length > 0 && (
                  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none bg-black">
                    {card.images.map((img, i) => (
                      <div key={i} className="min-w-full flex-shrink-0 snap-center flex items-center justify-center">
                        <img src={img} alt={`${card.title} - ${i + 1}`} className="w-full h-auto object-contain max-h-[70vh]" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Post Content */}
                <div className="p-4 sm:p-5 flex flex-col gap-2">
                  {/* Pagination Dots (if multiple images) */}
                  {card.images && card.images.length > 1 && (
                    <div className="flex justify-center gap-1.5 mb-2">
                      {card.images.map((_, i) => (
                        <div key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      ))}
                    </div>
                  )}
                  {card.title && <h2 className="text-base font-bold text-white">{card.title}</h2>}
                  {card.description && (
                    <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">{card.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
