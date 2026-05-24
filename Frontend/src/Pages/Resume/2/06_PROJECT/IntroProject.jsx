import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT RESUME DATA
// ─────────────────────────────────────────────────────────────────────────────
const defaultData = {
  fname: "Aman", lname: "Gupta", phone: "+91 98765 43210",
  github: "https://github.com/amangupta-dev",
  linkedin: "https://linkedin.com/in/aman-gupta",
  portfolio: "https://aman-portfolio.dev",
  email: "aman.dev@gmail.com",
  summaryTitle: "Full Stack Developer & UI Specialist",
  summaryBody: "Passionate about crafting high-performance web applications using the MERN stack. Expert in translating complex business requirements into elegant, scalable code with a focus on user-centric design and efficient backend architecture.",
  location: "Kanpur, India", pincode: "208024",
  skills: {
    Frontend: "React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion",
    Backend: "Node.js, Express.js, GraphQL, Socket.io",
    Auth: "NextAuth.js, Firebase Auth, OAuth 2.0",
    Database: "PostgreSQL, MongoDB, Redis, Prisma ORM",
    Tools: "Docker, Git, Vercel, Postman, Figma",
    Deployment: "AWS S3, Netlify, Render, Vercel",
  },
  projects: [
    {
      name: "RollZone!", stack: "React · Tailwind CSS",
      github: "https://github.com/amangupta-dev/rollzone",
      live: "https://rollzone-game.vercel.app",
      description: "An interactive high-stakes Pig Dice game designed for a professional portfolio.",
      bullets: [
        "Engineered a <b>dynamic game engine</b> using React hooks.",
        "Implemented a <b>mobile-first responsive design</b> using Tailwind CSS.",
        "Integrated <b>local storage persistence</b> to save player scores.",
        "Optimized performance for a smooth 60fps animation experience.",
      ],
    },
    {
      name: "DevConnect", stack: "Next.js · PostgreSQL",
      github: "https://github.com/amangupta-dev/devconnect",
      live: "https://devconnect-platform.app",
      description: "A specialized networking portal for software engineers.",
      bullets: [
        "Architected a <b>relational database schema</b> using Prisma ORM.",
        "Developed a <b>server-side rendered (SSR)</b> feed for SEO.",
        "Built an <b>automated markdown parser</b> with syntax highlighting.",
        "Deployed using <b>Docker containers</b> on AWS.",
      ],
    },
  ],
  experience: [
    {
      role: "Frontend Developer", company: "XYZ Tech", location: "Remote",
      startDate: "Jan 2025", endDate: "Present", currentlyWorking: true,
      employmentType: "Internship",
      bullets: [
        "Built responsive UI components using React and TypeScript",
        "Improved page load performance by 30% via code splitting",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech", field: "Computer Science & Engineering",
      institution: "Pranveer Singh Institute of Technology",
      location: "Kanpur, India", startDate: "2023", endDate: "2027",
      cgpa: "8.7 / 10",
      bullets: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks"],
    },
    {
      degree: "Class XII", field: "PCM",
      institution: "ABC Senior Secondary School",
      location: "Lucknow, India", startDate: "2021", endDate: "2023",
      percentage: "92%",
    },
  ],
  certifications: ["AWS Certified Cloud Practitioner", "Meta Frontend Developer Certification"],
  achievements: ["Ranked top 5% in LeetCode contests", "Winner of Hackathon XYZ 2024", "Solved 500+ DSA problems on LeetCode"],
  languages: ["English — Fluent", "Hindi — Native"],
};

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION ACCENTS
// ─────────────────────────────────────────────────────────────────────────────
const ACCENTS = {
  summary: { stripe: "#1d9e75", dot: "#1d9e75", bg: "rgba(29, 158, 117, 0.1)", text: "#1d9e75" },
  exp: { stripe: "#378add", dot: "#378add", bg: "rgba(55, 138, 221, 0.1)", text: "#378add" },
  edu: { stripe: "#ba7517", dot: "#ba7517", bg: "rgba(186, 117, 23, 0.1)", text: "#ba7517" },
  skills: { stripe: "#7f77dd", bg: "rgba(127, 119, 221, 0.1)", text: "#7f77dd" },
  proj: { stripe: "#d85a30", bg: "rgba(216, 90, 48, 0.1)", text: "#d85a30" },
  extra: { stripe: "#d4537e", bg: "rgba(212, 83, 126, 0.1)", text: "#d4537e" },
};

// ─────────────────────────────────────────────────────────────────────────────
// SVG GLOBAL ICONS
// ─────────────────────────────────────────────────────────────────────────────
const IC = {
  copy: "M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v9.857C20 20.09 19.105 21 18 21h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z",
  check: "M20 6L9 17l-5-5",
  chevUp: "M18 15l-6-6-6 6",
  chevDown: "M6 9l6 6 6-6",
  share: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 13a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.29-1.29a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
  linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
  globe: "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z",
  briefcase: "M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  award: "M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  terminal: "M4 17l6-6-6-6M12 19h8",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  external: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3",
};

const Icon = ({ d, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// TOAST SUBSYSTEM
// ─────────────────────────────────────────────────────────────────────────────
function Toast({ message, visible }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-2 px-4 rounded-lg shadow-lg pointer-events-none z-50 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
      style={{
        transform: `translateX(-50%) translateY(${visible ? "0px" : "12px"})`,
        opacity: visible ? 1 : 0,
      }}
    >
      <Icon d={IC.check} size={14} />
      {message}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIVE TOOLTIP ACTION BUTTON
// ─────────────────────────────────────────────────────────────────────────────
function ActionBtn({ icon, label, onClick, active = false, success = false }) {


  let bgClass = " bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-800";
  if (success) bgClass = "bg-emerald-50 text-emerald-600";
  else if (active) bgClass = "bg-blue-50 text-blue-600";

  return (
    <div className="relative z-50">
      <button
        aria-label={label}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={onClick}
        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors duration-150 ${bgClass}`}
      >
        {icon}
      </button>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILL STACK TAG
// ─────────────────────────────────────────────────────────────────────────────
function Tag({ label }) {
  return (
    <span className="inline-block px-2.5 py-1 text-xs font-mono border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-400 text-slate-600 hover:text-slate-900 rounded-md transition-all duration-150 cursor-default mr-1.5 mb-1.5">
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTAINER CARD WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
function SectionCard({ id, title, icon, stripeColor, copyText, onShare, children }) {
  const [hovered, setHovered] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  function handleCopy() {
    if (!copyText) return;
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  function handleShare() {
    onShare(id, title);
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  }

  return (
    <section
      id={`section-${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-xl border flex flex-col overflow-hidden mb-4 transition-all duration-200 relative ${hovered ? "border-slate-400 shadow-sm" : "border-slate-200"
        }`}
    >
      {/* Dynamic top brand accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-200"
        style={{ background: stripeColor, opacity: hovered ? 1 : 0.4 }}
      />

      {/* Header Module */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h2 className="font-bold text-slate-800 flex items-center gap-2.5 text-sm tracking-wider uppercase">
          <span style={{ color: stripeColor }} className="flex items-center">
            <Icon d={icon} size={18} />
          </span>
          {title}
        </h2>

        {/* Floating Controls Context Group */}
        <div
          className={` flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1 transition-all duration-200 ${hovered ? "opacity-100 translate-y-0" : "lg:opacity-0 lg:-translate-y-1 opacity-100"
            }`}
        >
          <ActionBtn
            icon={<Icon d={shared ? IC.check : IC.share} size={13} />}

            onClick={handleShare}
            success={shared}

          />
          {copyText && (
            <>
              <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />
              <ActionBtn
                icon={<Icon d={copied ? IC.check : IC.copy} size={13} />}

                onClick={handleCopy}
                success={copied}
              />
            </>
          )}
          <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />
          <ActionBtn
            icon={<Icon d={collapsed ? IC.chevDown : IC.chevUp} size={13} />}

            onClick={() => setCollapsed(p => !p)}
            active={collapsed}
          />
        </div>
      </div>

      <div className="h-[1px] bg-slate-100 mx-4" />

      {/* Collapsible Content Canvas */}
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: collapsed ? "0px" : "2000px",
          opacity: collapsed ? 0 : 1,
          paddingTop: collapsed ? "0px" : "12px",
          paddingBottom: collapsed ? "0px" : "16px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {children}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHRONOLOGICAL TIMELINE ENTRY
// ─────────────────────────────────────────────────────────────────────────────
function TimelineEntry({ dotColor, topLeft, topRight, children }) {
  return (
    <div className="flex gap-4 mb-4 last:mb-0 group">
      {/* Structural Track Design */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 border transition-transform duration-150 group-hover:scale-125"
          style={{ background: dotColor, borderColor: dotColor }}
        />
        <div className="flex-1 w-[1px] bg-slate-200 mt-2" />
      </div>

      {/* Dynamic Content Module */}
      <div className="flex-1 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
          <div>{topLeft}</div>
          <div className="sm:text-right text-xs shrink-0">{topRight}</div>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANCHOR LINK CONTACT UNIT
// ─────────────────────────────────────────────────────────────────────────────
function ContactItem({ icon, text, href }) {
  const Component = href ? "a" : "span";
  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={`flex items-center gap-1.5 text-xs text-slate-500 px-2 py-1 rounded-md border border-transparent transition-all duration-150 ${href ? "cursor-pointer hover:border-slate-200 hover:bg-slate-50 hover:text-slate-800 no-underline" : "cursor-default"
        }`}
    >
      <span className="text-blue-500 flex items-center">
        <Icon d={icon} size={14} />
      </span>
      {text}
    </Component>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN WORKSPACE INTERFACE
// ─────────────────────────────────────────────────────────────────────────────
export default function ResumeViewer({ data = defaultData }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [headerCopied, setHeaderCopied] = useState(false);

  function showToast(msg) {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2200);
  }

  function handleShare(sectionId, sectionTitle) {
    const base = window.location.href.split("#")[0];
    const link = `${base}#section-${sectionId}`;
    navigator.clipboard.writeText(link).then(() => {
      showToast(`Link to "${sectionTitle}" copied`);
    });
  }

  function handleHeaderCopy() {
    const text = `${data.fname} ${data.lname}\n${data.summaryTitle}\n${data.email} | ${data.phone}\n${data.linkedin}\n${data.portfolio}`;
    navigator.clipboard.writeText(text).then(() => {
      setHeaderCopied(true);
      setTimeout(() => setHeaderCopied(false), 1600);
    });
  }

  const shouldRenderSection = (key) => activeFilter === "all" || activeFilter === key;
  const filters = ["all", "experience", "education", "projects", "skills"];

  const copyTexts = {
    summary: `${data.fname} is ${data.summaryBody}`,
    skills: Object.entries(data.skills).map(([k, v]) => `${k}: ${v}`).join("\n"),
    exp: data.experience.map(e => `${e.role} @ ${e.company}\n${e.bullets.join("\n")}`).join("\n\n"),
    edu: data.education.map(e => `${e.degree} — ${e.institution} (${e.startDate}–${e.endDate})`).join("\n"),
    proj: data.projects.map(p => `${p.name} [${p.stack}]\n${p.description}\n${p.bullets.map(b => b.replace(/<[^>]+>/g, "")).join("\n")}`).join("\n\n"),
    extra: [...data.certifications, ...data.achievements, ...data.languages].join("\n"),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 antialiased text-slate-800 font-sans">
      <Toast message={toast.message} visible={toast.visible} />

      {/* ══════════════════════════════════════════════════════════
          HERO OVERVIEW BIOGRAPHY CARD
      ══════════════════════════════════════════════════════════ */}
      <header className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Structural Monogram Avatar */}
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold shrink-0 border border-blue-100">
              {data.fname[0]}{data.lname[0]}
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                {data.fname} <span className="text-blue-600">{data.lname}</span>
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1.5">{data.summaryTitle}</p>
              <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-400 font-medium">
                <Icon d={IC.map} size={13} />
                {data.location} <span className="text-slate-300">·</span> {data.pincode}
              </div>
            </div>
          </div>

          <button
            onClick={handleHeaderCopy}
            className={`flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium border transition-colors self-start w-full md:w-auto ${headerCopied
              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
          >
            <Icon d={headerCopied ? IC.check : IC.copy} size={13} />
            {headerCopied ? "Copied Portfolio Text!" : "Copy Contact Info"}
          </button>
        </div>

        <div className="h-[1px] bg-slate-100 my-4" />

        {/* Contact Strip Grid */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <ContactItem icon={IC.mail} text={data.email} href={`mailto:${data.email}`} />
          <ContactItem icon={IC.phone} text={data.phone} />
          <ContactItem icon={IC.github} text="GitHub" href={data.github} />
          <ContactItem icon={IC.linkedin} text="LinkedIn" href={data.linkedin} />
          <ContactItem icon={IC.globe} text="Portfolio" href={data.portfolio} />
        </div>
      </header>

      {/* ── SEGMENT CONTROLLER FILTER BAR ─────────────────────────── */}
      <nav className="flex gap-1 overflow-x-auto p-1 bg-slate-100 border border-slate-200 rounded-xl mb-4 scrollbar-none">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 border ${activeFilter === f
              ? "bg-white border-slate-200 text-slate-900 shadow-sm"
              : "bg-transparent border-transparent text-slate-500 hover:text-slate-800"
              }`}
          >
            {f === "all" ? "All Sections" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </nav>

      {/* ══════════════════════════════════════════════════════════
          BODY LAYOUT GRID GRID CANVAS
      ══════════════════════════════════════════════════════════ */}
      <div className={`grid gap-4 items-start ${activeFilter === "all" ? "grid-cols-1 lg:grid-cols-[300px_1fr]" : "grid-cols-1"}`}>

        {/* ── PERSISTENT LEFT ASIDE SIDEBAR COLUMN ───────────────── */}
        {activeFilter === "all" && (
          <aside className="flex flex-col gap-4">

            {/* PROFILE STATEMENT ARCHETYPE */}
            <SectionCard
              id="summary" title="Profile" icon={IC.user}
              stripeColor={ACCENTS.summary.stripe}
              copyText={copyTexts.summary}
              onShare={handleShare}
            >
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="font-semibold text-slate-900">{data.fname}</strong> is {data.summaryBody}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {["MERN Stack", "UI / UX", "Full-Stack"].map(t => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded font-bold tracking-wide uppercase border border-emerald-100"
                    style={{ backgroundColor: ACCENTS.summary.bg, color: ACCENTS.summary.text }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </SectionCard>

            {/* QUICK VIEW COMPREHENSIVE TECH STACK */}
            <SectionCard
              id="skills" title="Tech Stack" icon={IC.code}
              stripeColor={ACCENTS.skills.stripe}
              copyText={copyTexts.skills}
              onShare={handleShare}
            >
              {Object.entries(data.skills).map(([category, items]) => (
                <div key={category} className="mb-3.5 last:mb-0">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                    {category}
                  </h3>
                  <div className="flex flex-wrap">
                    {items.split(", ").map(item => (
                      <Tag key={item} label={item.trim()} />
                    ))}
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* ADJUNCT METRICS & INFO */}
            <SectionCard
              id="extra" title="Additional Info" icon={IC.star}
              stripeColor={ACCENTS.extra.stripe}
              copyText={copyTexts.extra}
              onShare={handleShare}
            >
              <SubLabel>Certifications</SubLabel>
              {data.certifications.map((cert, idx) => (
                <ListItem key={idx} icon={IC.award} iconColor="#eab308">{cert}</ListItem>
              ))}

              <SubLabel>Achievements</SubLabel>
              {data.achievements.map((ach, idx) => (
                <ListItem key={idx} icon={IC.star} iconColor="#eab308">{ach}</ListItem>
              ))}

              <SubLabel>Languages</SubLabel>
              <div className="flex flex-wrap mt-1">
                {data.languages.map((lang, idx) => (
                  <Tag key={idx} label={lang} />
                ))}
              </div>
            </SectionCard>

          </aside>
        )}

        {/* ── DYNAMIC RESPONSIVE PRIMARY CENTRAL MAIN MATRIX TRACK ── */}
        <main className="flex flex-col gap-4">

          {/* CHRONOLOGICAL EXPERIENCE WORK HISTORY TRACK */}
          {shouldRenderSection("experience") && (
            <SectionCard
              id="exp" title="Experience" icon={IC.briefcase}
              stripeColor={ACCENTS.exp.stripe}
              copyText={copyTexts.exp}
              onShare={handleShare}
            >
              {data.experience.map((exp, idx) => (
                <TimelineEntry
                  key={idx}
                  dotColor={ACCENTS.exp.dot}
                  topLeft={
                    <>
                      <h3 className="text-sm font-semibold text-slate-900">{exp.role}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {exp.company} <span className="text-slate-300">·</span> {exp.location}
                      </p>
                    </>
                  }
                  topRight={
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1.5">
                      <span
                        className="inline-block text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-blue-100"
                        style={{ backgroundColor: ACCENTS.exp.bg, color: ACCENTS.exp.text }}
                      >
                        {exp.employmentType}
                      </span>
                      <p className="text-[11px] font-mono font-medium text-slate-400">
                        {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate}
                      </p>
                    </div>
                  }
                >
                  <ul className="space-y-1.5 mt-2.5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2 text-xs text-slate-600 leading-relaxed items-start">
                        <span className="text-slate-300 select-none text-sm leading-none pt-0.5">›</span>
                        <span dangerouslySetInnerHTML={{ __html: bullet }} />
                      </li>
                    ))}
                  </ul>
                </TimelineEntry>
              ))}
            </SectionCard>
          )}

          {/* ACADEMIC TIMELINE */}
          {shouldRenderSection("education") && (
            <SectionCard
              id="edu" title="Education" icon={IC.book}
              stripeColor={ACCENTS.edu.stripe}
              copyText={copyTexts.edu}
              onShare={handleShare}
            >
              {data.education.map((edu, idx) => (
                <TimelineEntry
                  key={idx}
                  dotColor={ACCENTS.edu.dot}
                  topLeft={
                    <>
                      <h3 className="text-sm font-semibold text-slate-900">{edu.degree}</h3>
                      <p className="text-xs text-blue-600 font-medium mt-0.5">{edu.field}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{edu.institution}</p>
                    </>
                  }
                  topRight={
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1.5">
                      {(edu.cgpa || edu.percentage) && (
                        <span
                          className="inline-block text-[10px] px-2 py-0.5 rounded font-bold tracking-wider uppercase border border-amber-100"
                          style={{ backgroundColor: ACCENTS.edu.bg, color: ACCENTS.edu.text }}
                        >
                          {edu.cgpa ? `CGPA ${edu.cgpa}` : edu.percentage}
                        </span>
                      )}
                      <p className="text-[11px] font-mono font-medium text-slate-400">{edu.startDate} — {edu.endDate}</p>
                      <p className="text-[11px] font-medium text-slate-400 hidden sm:block">{edu.location}</p>
                    </div>
                  }
                >
                  {edu.bullets && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {edu.bullets.map((b, bIdx) => (
                        <Tag key={bIdx} label={b} />
                      ))}
                    </div>
                  )}
                </TimelineEntry>
              ))}
            </SectionCard>
          )}

          {/* CUSTOM CRAFTED APPLICATION PROJECTS PORTFOLIO */}
          {shouldRenderSection("projects") && (
            <SectionCard
              id="proj" title="Projects" icon={IC.terminal}
              stripeColor={ACCENTS.proj.stripe}
              copyText={copyTexts.proj}
              onShare={handleShare}
            >
              <div className="grid grid-cols-1 gap-4">
                {data.projects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} />
                ))}
              </div>
            </SectionCard>
          )}

          {/* SKILLS ISOLATED DETAILED TAB PANEL VIEW */}
          {activeFilter === "skills" && (
            <SectionCard
              id="skills-full" title="Tech Stack Matrix" icon={IC.code}
              stripeColor={ACCENTS.skills.stripe}
              copyText={copyTexts.skills}
              onShare={handleShare}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(data.skills).map(([category, items]) => (
                  <div key={category} className="bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all duration-150 hover:border-slate-300">
                    <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                      {category}
                    </h3>
                    <div className="flex flex-wrap">
                      {items.split(", ").map(item => (
                        <Tag key={item} label={item.trim()} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPACT PROJECT CARD CONTAINER METRIC SUBSYSTEM
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project: p }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{p.name}</h3>
          <p className="text-xs font-mono font-medium text-slate-400 mt-1">{p.stack}</p>
        </div>

        {/* Secondary Navigation Anchors — Flex-reveal layer */}
        <div className="flex gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all no-underline"
          >
            <Icon d={IC.github} size={12} />
            Code
          </a>
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all no-underline"
          >
            <Icon d={IC.external} size={12} />
            Live
          </a>
        </div>
      </div>

      <p className="text-xs font-medium text-slate-500 italic mb-3 leading-relaxed">
        {p.description}
      </p>

      <ul className="space-y-1.5">
        {p.bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-2 text-xs text-slate-600 leading-relaxed items-start">
            <span className="text-slate-300 select-none text-sm leading-none pt-0.5">›</span>
            <span dangerouslySetInnerHTML={{ __html: bullet }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GRANULAR DESIGN SYSTEM ASIDE ATOM HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function SubLabel({ children }) {
  return (
    <h3 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-4 mb-2 first:mt-0 font-mono">
      {children}
    </h3>
  );
}

function ListItem({ icon, iconColor = "rgb(148, 163, 184)", children }) {
  return (
    <div className="flex gap-2.5 text-xs text-slate-600 mb-2 last:mb-0 leading-relaxed items-start">
      <span style={{ color: iconColor }} className="shrink-0 pt-0.5 flex items-center">
        <Icon d={icon} size={13} />
      </span>
      <span>{children}</span>
    </div>
  );
}