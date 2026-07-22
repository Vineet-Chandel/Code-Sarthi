import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, LayoutGrid } from "lucide-react";

const data = [
  // Web Development
  { cat: "web", name: "HTML", path: "/app/toolkit/html", icon: "🌐", color: "#e65100" },
  { cat: "web", name: "CSS", path: "/app/toolkit/css", icon: "🎨", color: "#1572b6" },
  { cat: "web", name: "Tailwind CSS", path: "/app/toolkit/tailwind", icon: "💨", color: "#06b6d4" },
  { cat: "web", name: "React", path: "/app/toolkit/react", icon: "⚛️", color: "#61dafb" },
  { cat: "web", name: "Express", path: "/app/toolkit/express", icon: "🚀", color: "#9ca3af" },
  { cat: "web", name: "Django", path: "/app/toolkit/django", icon: "🐍", color: "#2fa06a" },
  { cat: "web", name: "Flask", path: "/app/toolkit/flask", icon: "🧪", color: "#9ca3af" },
  { cat: "web", name: "FastAPI", path: "/app/toolkit/fastapi", icon: "⚡", color: "#00d4b8" },
  { cat: "web", name: "Socket.io", path: "/app/toolkit/socketio", icon: "🔌", color: "#f4f4f5" },
  { cat: "web", name: "GraphQL", path: "/app/toolkit/graphql", icon: "◈", color: "#e535ab" },
  { cat: "web", name: "Docker", path: "/app/toolkit/docker", icon: "🐳", color: "#38bdf8" },
  { cat: "web", name: "Kubernetes", path: "/app/toolkit/kubernetes", icon: "☸", color: "#4d8dff" },
  { cat: "web", name: "NPM", path: "/app/toolkit/npm", icon: "📦", color: "#fb7185" },
  { cat: "web", name: "jQuery", path: "/app/toolkit/jquery", icon: "✦", color: "#38bdf8" },
  { cat: "web", name: "HTMX", path: "/app/toolkit/htmx", icon: "⟨/⟩", color: "#60a5fa" },
  { cat: "web", name: "Selenium", path: "/app/toolkit/selenium", icon: "🤖", color: "#4ade80" },
  { cat: "web", name: "Markdown", path: "/app/toolkit/markdown", icon: "✍", color: "#d4d4d8" },
  { cat: "web", name: "YAML", path: "/app/toolkit/yaml", icon: "📄", color: "#f87171" },
  { cat: "web", name: "Bash", path: "/app/toolkit/bash", icon: "$", color: "#4ade80" },
  { cat: "web", name: "Sass", path: "/app/toolkit/sass", icon: "💅", color: "#f472b6" },
  { cat: "web", name: "LaTeX", path: "/app/toolkit/latex", icon: "∑", color: "#34d399" },

  // Programming Languages
  { cat: "lang", name: "Python", path: "/app/toolkit/python", icon: "🐍", color: "#5aa8e0" },
  { cat: "lang", name: "JavaScript", path: "/app/toolkit/javascript", icon: "JS", color: "#f7df1e" },
  { cat: "lang", name: "TypeScript", path: "/app/toolkit/typescript", icon: "TS", color: "#3b82f6" },
  { cat: "lang", name: "Java", path: "/app/toolkit/java", icon: "☕", color: "#f97316" },
  { cat: "lang", name: "C++", path: "/app/toolkit/cpp", icon: "C++", color: "#60a5fa" },
  { cat: "lang", name: "C", path: "/app/toolkit/c", icon: "C", color: "#a5b4c3" },
  { cat: "lang", name: "C#", path: "/app/toolkit/csharp", icon: "C#", color: "#c084fc" },
  { cat: "lang", name: "Rust", path: "/app/toolkit/rust", icon: "⚙", color: "#f0a875" },
  { cat: "lang", name: "Ruby", path: "/app/toolkit/ruby", icon: "💎", color: "#fb7185" },
  { cat: "lang", name: "Kotlin", path: "/app/toolkit/kotlin", icon: "K", color: "#A7A0F8" },
  { cat: "lang", name: "Swift", path: "/app/toolkit/swift", icon: "◈", color: "#fb923c" },
  { cat: "lang", name: "Dart", path: "/app/toolkit/dart", icon: "◆", color: "#38bdf8" },
  { cat: "lang", name: "MATLAB", path: "/app/toolkit/matlab", icon: "∿", color: "#fb923c" },
  { cat: "lang", name: "JSON", path: "/app/toolkit/json", icon: "{}", color: "#d4d4d8" },
  { cat: "lang", name: "NumPy", path: "/app/toolkit/numpy", icon: "∑", color: "#5aa8e0" },
  { cat: "lang", name: "Pandas", path: "/app/toolkit/pandas", icon: "🐼", color: "#c4b5fd" },
  { cat: "lang", name: "ES6", path: "/app/toolkit/es6", icon: "ES", color: "#facc15" },

  // Important Tools
  { cat: "tools", name: "ChatGPT", path: "/app/toolkit/chatgpt", icon: "🧠", color: "#34d399" },
  { cat: "tools", name: "GitHub CLI", path: "/app/toolkit/githubcli", icon: "⌘", color: "#e4e4e7" },
  { cat: "tools", name: "GitHub Actions", path: "/app/toolkit/githubactions", icon: "▶", color: "#60a5fa" },
  { cat: "tools", name: "VSCode", path: "/app/toolkit/vscode", icon: "◻", color: "#3b82f6" },
  { cat: "tools", name: "Vim", path: "/app/toolkit/vim", icon: "V", color: "#4ade80" },
  { cat: "tools", name: "Homebrew", path: "/app/toolkit/homebrew", icon: "🍺", color: "#fbbf24" },
  { cat: "tools", name: "Colour Picker", path: "/app/toolkit/colourpicker", icon: "🎨", color: "#f472b6" },
  { cat: "tools", name: "Emmet", path: "/app/toolkit/emmet", icon: "⟨⟩", color: "#f472b6" },

  // Databases
  { cat: "db", name: "MySQL", path: "/app/toolkit/mysql", icon: "🐬", color: "#5aa8e0" },
  { cat: "db", name: "PostgreSQL", path: "/app/toolkit/postgresql", icon: "🐘", color: "#60a5fa" },
  { cat: "db", name: "MongoDB", path: "/app/toolkit/mongodb", icon: "🍃", color: "#4ade80" },
  { cat: "db", name: "Redis", path: "/app/toolkit/redis", icon: "⬡", color: "#f87171" },
  { cat: "db", name: "Neo4j", path: "/app/toolkit/neo4j", icon: "◉", color: "#38bdf8" },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "web", label: "Web dev" },
  { key: "lang", label: "Languages" },
  { key: "tools", label: "Tools" },
  { key: "db", label: "Databases" },
];

const SECTION_LABELS = {
  web: "Web development",
  lang: "Programming languages",
  tools: "Important tools",
  db: "Databases",
};

const BRAND = { violet: "#534AB7", lilac: "#A7A0F8" };

export default function ToolkitPanel() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return data.filter(
      (d) =>
        (activeFilter === "all" || d.cat === activeFilter) &&
        (!q || d.name.toLowerCase().includes(q))
    );
  }, [activeFilter, query]);

  const sections = useMemo(() => {
    const cats = activeFilter === "all" ? ["web", "lang", "tools", "db"] : [activeFilter];
    return cats
      .map((cat) => ({ cat, items: filtered.filter((d) => d.cat === cat) }))
      .filter((s) => s.items.length > 0);
  }, [filtered, activeFilter]);

  return (
    <div className="min-h-screen bg-[#09090B] text-white relative overflow-hidden">
      <AmbientBackground />

      {/* Hero */}
      <div className="relative border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl text-[11px] tracking-wide text-white/50"
          >
            <LayoutGrid size={12} className="text-[#A7A0F8]" />
            {data.length} technologies indexed
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-[34px] md:text-[44px] font-semibold tracking-tight leading-[1.05]"
          >
            Developer's{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${BRAND.lilac}, ${BRAND.violet})`,
              }}
            >
              toolkit
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-3 text-[15px] text-white/50 leading-relaxed max-w-lg"
          >
            Cheat sheets and quick references for the languages, frameworks,
            and tools you reach for every day.
          </motion.p>
        </div>

        {/* Sticky search + filters */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#09090B]/80 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px] max-w-[320px]">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="text"
                placeholder="Search technologies…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-[13.5px] rounded-lg bg-white/[0.05] border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#A7A0F8]/50 focus:bg-white/[0.07] transition-colors"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    <X size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-1.5 flex-wrap relative">
              {CATEGORIES.map((c) => {
                const isActive = activeFilter === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActiveFilter(c.key)}
                    className={`relative text-[12.5px] px-3.5 py-1.5 rounded-full font-medium transition-colors ${isActive ? "text-white" : "text-white/45 hover:text-white/75"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND.violet}, ${BRAND.lilac})`,
                        }}
                      />
                    )}
                    <span className="relative z-10">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-10">
        <AnimatePresence mode="wait">
          {sections.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4">
                <Search size={16} className="text-white/30" />
              </div>
              <p className="text-white/40 text-[13.5px]">
                No results for <span className="text-white/70">"{query}"</span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${activeFilter}-${query}`}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="space-y-10"
            >
              {sections.map(({ cat, items }) => (
                <motion.div
                  key={cat}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/40 whitespace-nowrap">
                      {SECTION_LABELS[cat]}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="text-[11px] text-white/25 tabular-nums">
                      {items.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-[repeat(auto-fill,minmax(126px,1fr))] gap-2.5">
                    {items.map((item, i) => (
                      <Chip
                        key={item.name}
                        item={item}
                        index={i}
                        onClick={() => item.path && navigate(item.path)}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Chip({ item, index, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      title={item.name}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-4 min-h-[84px] overflow-hidden backdrop-blur-sm transition-colors duration-200 hover:border-white/20"
    >
      {/* cursor-tracking glow */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(120px circle at ${pos.x}% ${pos.y}%, ${item.color}22, transparent 70%)`,
        }}
      />
      <span
        className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-semibold shrink-0"
        style={{
          color: item.color,
          backgroundColor: hovered ? `${item.color}22` : `${item.color}12`,
          transition: "background-color 0.2s",
        }}
      >
        {item.icon}
      </span>
      <span className="relative text-[11.5px] font-medium text-white/75 group-hover:text-white text-center leading-tight transition-colors">
        {item.name}
      </span>
    </motion.button>
  );
}

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full opacity-[0.15] blur-[110px]"
        style={{ background: BRAND.violet }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[460px] h-[460px] rounded-full opacity-[0.12] blur-[110px]"
        style={{ background: BRAND.lilac }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}