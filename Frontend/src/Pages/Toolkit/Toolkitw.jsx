import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const data = [
  // Web Development
  { cat: "web", name: "HTML", path: "/app/toolkit/html", icon: "🌐", color: "#e65100" },
  { cat: "web", name: "CSS", path: "/app/toolkit/css", icon: "🎨", color: "#1572b6" },
  { cat: "web", name: "Tailwind CSS", path: "/app/toolkit/tailwind", icon: "💨", color: "#06b6d4" },
  { cat: "web", name: "React", path: "/app/toolkit/react", icon: "⚛️", color: "#61dafb" },
  { cat: "web", name: "Express", path: "/app/toolkit/express", icon: "🚀", color: "#888888" },
  { cat: "web", name: "Django", path: "/app/toolkit/django", icon: "🐍", color: "#0c4b33" },
  { cat: "web", name: "Flask", path: "/app/toolkit/flask", icon: "🧪", color: "#555555" },
  { cat: "web", name: "FastAPI", path: "/app/toolkit/fastapi", icon: "⚡", color: "#009688" },
  { cat: "web", name: "Socket.io", path: "/app/toolkit/socketio", icon: "🔌", color: "#010101" },
  { cat: "web", name: "GraphQL", path: "/app/toolkit/graphql", icon: "◈", color: "#e535ab" },
  { cat: "web", name: "Docker", path: "/app/toolkit/docker", icon: "🐳", color: "#0288d1" },
  { cat: "web", name: "Kubernetes", path: "/app/toolkit/kubernetes", icon: "☸", color: "#326ce5" },
  { cat: "web", name: "NPM", path: "/app/toolkit/npm", icon: "📦", color: "#cc3534" },
  { cat: "web", name: "jQuery", path: "/app/toolkit/jquery", icon: "✦", color: "#0868ac" },
  { cat: "web", name: "HTMX", path: "/app/toolkit/htmx", icon: "⟨/⟩", color: "#3465a4" },
  { cat: "web", name: "Selenium", path: "/app/toolkit/selenium", icon: "🤖", color: "#43b02a" },
  { cat: "web", name: "Markdown", path: "/app/toolkit/markdown", icon: "✍", color: "#555555" },
  { cat: "web", name: "YAML", path: "/app/toolkit/yaml", icon: "📄", color: "#cb171e" },
  { cat: "web", name: "Bash", path: "/app/toolkit/bash", icon: "$", color: "#4eaa25" },
  { cat: "web", name: "Sass", path: "/app/toolkit/sass", icon: "💅", color: "#cc6699" },
  { cat: "web", name: "LaTeX", path: "/app/toolkit/latex", icon: "∑", color: "#1e8449" },

  // Programming Languages
  { cat: "lang", name: "Python", path: "/app/toolkit/python", icon: "🐍", color: "#3776ab" },
  { cat: "lang", name: "JavaScript", path: "/app/toolkit/javascript", icon: "JS", color: "#f7df1e" },
  { cat: "lang", name: "TypeScript", path: "/app/toolkit/typescript", icon: "TS", color: "#007acc" },
  { cat: "lang", name: "Java", path: "/app/toolkit/java", icon: "☕", color: "#0074bd" },
  { cat: "lang", name: "C++", path: "/app/toolkit/cpp", icon: "C++", color: "#00599c" },
  { cat: "lang", name: "C", path: "/app/toolkit/c", icon: "C", color: "#a8b9cc" },
  { cat: "lang", name: "C#", path: "/app/toolkit/csharp", icon: "C#", color: "#9b4f96" },
  { cat: "lang", name: "Rust", path: "/app/toolkit/rust", icon: "⚙", color: "#ce412b" },
  { cat: "lang", name: "Ruby", path: "/app/toolkit/ruby", icon: "💎", color: "#cc342d" },
  { cat: "lang", name: "Kotlin", path: "/app/toolkit/kotlin", icon: "K", color: "#7f52ff" },
  { cat: "lang", name: "Swift", path: "/app/toolkit/swift", icon: "◈", color: "#f05138" },
  { cat: "lang", name: "Dart", path: "/app/toolkit/dart", icon: "◆", color: "#0175c2" },
  { cat: "lang", name: "MATLAB", path: "/app/toolkit/matlab", icon: "∿", color: "#0076a8" },
  { cat: "lang", name: "JSON", path: "/app/toolkit/json", icon: "{}", color: "#555555" },
  { cat: "lang", name: "NumPy", path: "/app/toolkit/numpy", icon: "∑", color: "#4dabcf" },
  { cat: "lang", name: "Pandas", path: "/app/toolkit/pandas", icon: "🐼", color: "#130754" },
  { cat: "lang", name: "ES6", path: "/app/toolkit/es6", icon: "ES", color: "#e26e3a" },

  // Important Tools
  { cat: "tools", name: "ChatGPT", path: "/app/toolkit/chatgpt", icon: "🧠", color: "#74aa9c" },
  { cat: "tools", name: "GitHub CLI", path: "/app/toolkit/githubcli", icon: "⌘", color: "#333333" },
  { cat: "tools", name: "GitHub Actions", path: "/app/toolkit/githubactions", icon: "▶", color: "#2088ff" },
  { cat: "tools", name: "VSCode", path: "/app/toolkit/vscode", icon: "◻", color: "#007acc" },
  { cat: "tools", name: "Vim", path: "/app/toolkit/vim", icon: "V", color: "#019733" },
  { cat: "tools", name: "Homebrew", path: "/app/toolkit/homebrew", icon: "🍺", color: "#fbb040" },
  { cat: "tools", name: "Colour Picker", path: "/app/toolkit/colourpicker", icon: "🎨", color: "#e84393" },
  { cat: "tools", name: "Emmet", path: "/app/toolkit/emmet", icon: "⟨⟩", color: "#e9427d" },

  // Databases
  { cat: "db", name: "MySQL", path: "/app/toolkit/mysql", icon: "🐬", color: "#4479a1" },
  { cat: "db", name: "PostgreSQL", path: "/app/toolkit/postgresql", icon: "🐘", color: "#336791" },
  { cat: "db", name: "MongoDB", path: "/app/toolkit/mongodb", icon: "🍃", color: "#4db33d" },
  { cat: "db", name: "Redis", path: "/app/toolkit/redis", icon: "⬡", color: "#d82c20" },
  { cat: "db", name: "Neo4j", path: "/app/toolkit/neo4j", icon: "◉", color: "#008cc1" },
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
    const cats = activeFilter === "all"
      ? ["web", "lang", "tools", "db"]
      : [activeFilter];
    return cats
      .map((cat) => ({ cat, items: filtered.filter((d) => d.cat === cat) }))
      .filter((s) => s.items.length > 0);
  }, [filtered, activeFilter]);

  return (
    <div style={styles.root}>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Developer's toolkit</h1>
        <p style={styles.heroSub}>
          Browse cheat sheets and references for your favourite languages,
          frameworks, and tools.
        </p>

        {/* Search + filters */}
        <div style={styles.controls}>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              type="text"
              placeholder="Search technologies…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={styles.searchInput}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={styles.clearBtn}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div style={styles.filters}>
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveFilter(c.key)}
                style={{
                  ...styles.filterBtn,
                  ...(activeFilter === c.key ? styles.filterBtnActive : {}),
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={styles.sectionsWrap}>
        {sections.length === 0 ? (
          <div style={styles.empty}>
            No results for <strong>"{query}"</strong>
          </div>
        ) : (
          sections.map(({ cat, items }) => (
            <div key={cat} style={styles.section}>
              <div style={styles.sectionHead}>
                <span style={styles.sectionLabel}>{SECTION_LABELS[cat]}</span>
                <div style={styles.sectionLine} />
                <span style={styles.sectionCount}>{items.length}</span>
              </div>

              <div style={styles.grid}>
                {items.map((item) => (
                  <Chip
                    key={item.name}
                    item={item}
                    onClick={() => item.path && navigate(item.path)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Chip({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={item.name}
      style={{
        ...styles.chip,
        backgroundColor: hovered
          ? `${item.color}18`
          : `${item.color}0d`,
        borderColor: hovered ? `${item.color}55` : `${item.color}22`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <span style={{ ...styles.chipIcon, color: item.color }}>
        {item.icon}
      </span>
      <span style={styles.chipLabel}>{item.name}</span>
    </button>
  );
}

const styles = {
  root: {
    fontFamily: "'Inter', system-ui, sans-serif",
    backgroundColor: "#f9f9f8",
    minHeight: "100vh",
    color: "#111",
  },
  hero: {
    padding: "2.5rem 2rem 1.5rem",
    borderBottom: "1px solid #e5e5e3",
    backgroundColor: "#fff",
  },
  heroTitle: {
    fontSize: "24px",
    fontWeight: 500,
    marginBottom: "6px",
    letterSpacing: "-0.3px",
    color: "#111",
  },
  heroSub: {
    fontSize: "14px",
    color: "#666",
    lineHeight: 1.6,
    marginBottom: "1.25rem",
    maxWidth: "520px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  searchWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    maxWidth: "280px",
    flex: "1 1 200px",
  },
  searchIcon: {
    position: "absolute",
    left: "10px",
    fontSize: "18px",
    color: "#999",
    pointerEvents: "none",
    lineHeight: 1,
  },
  searchInput: {
    width: "100%",
    padding: "8px 32px 8px 32px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#f5f5f4",
    color: "#111",
    outline: "none",
  },
  clearBtn: {
    position: "absolute",
    right: "8px",
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#999",
    cursor: "pointer",
    lineHeight: 1,
    padding: 0,
  },
  filters: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  filterBtn: {
    fontSize: "12px",
    padding: "5px 14px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.12s",
    fontFamily: "inherit",
  },
  filterBtnActive: {
    backgroundColor: "#111",
    color: "#fff",
    borderColor: "#111",
  },
  sectionsWrap: {
    padding: "1.5rem 2rem 3rem",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "0.75rem",
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#999",
    whiteSpace: "nowrap",
  },
  sectionLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e5e5e3",
  },
  sectionCount: {
    fontSize: "11px",
    color: "#bbb",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "8px",
  },
  chip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "14px 8px 12px",
    borderRadius: "12px",
    border: "1px solid transparent",
    cursor: "pointer",
    transition: "all 0.15s ease",
    minHeight: "80px",
    fontFamily: "inherit",
    background: "transparent",
  },
  chipIcon: {
    fontSize: "22px",
    lineHeight: 1,
  },
  chipLabel: {
    fontSize: "12px",
    fontWeight: 500,
    color: "#111",
    textAlign: "center",
    lineHeight: 1.3,
  },
  empty: {
    padding: "2rem 0",
    color: "#888",
    fontSize: "14px",
  },
};