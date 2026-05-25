import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const navItems = [
  {
    id: "builder",
    label: "Builder",
    isSmall: true,
    dropdown: {
      sections: [
        {
          title: "All builders we provide",
          items: [
            { title: "AI Resume Builder", desc: "Millions have trusted our resume maker.", icon: "📄" },
            { title: "AI Cover Letter Builder", desc: "Create a cover letter to land your dream job.", icon: "✉️" },
            { title: "CV Maker", desc: "Easily build a CV that paves the way to your dream job.", icon: "🗂️" },
          ],
        },
      ],
    },
  },
  {
    id: "resume",
    label: "Resume",
    dropdown: {
      sections: [
        {
          title: "Tools",
          items: [
            { title: "AI Skills Generator", desc: "Quick solution to a job-winning skills section.", icon: "⚡" },
            { title: "Resume Examples", desc: "Inspiration for various job titles and industries.", icon: "💡" },
            { title: "Resume Templates", desc: "Browse customizable templates to create a resume.", icon: "🎨" },
            { title: "Resume Formats", desc: "Choose the best format based on your background.", icon: "📐" },
          ],
        },
        {
          title: "Review",
          items: [
            { title: "ATS Resume Checker", desc: "Ensure your resume passes Applicant Tracking Systems.", icon: "✅" },
            { title: "AI Resume Review", desc: "Get instant AI feedback to improve your resume.", icon: "🔍" },
            { title: "How to Make a Resume", desc: "Step-by-step tips for writing a resume that gets noticed.", icon: "📚" },
            { title: "AI Summary Generator", desc: "Professional resume summary for your career goals.", icon: "🤖" },
          ],
        },
        {
          title: "Create",
          items: [
            { title: "Save time with our builder", desc: "In just a few clicks you can make a professional resume.", icon: "🚀" },
          ],
        },
      ],
    },
  },
  {
    id: "cv",
    label: "CV",
    dropdown: {
      sections: [
        {
          title: "Build",
          items: [
            { title: "CV Maker", desc: "Build a professional CV quickly with our easy-to-use maker.", icon: "🗂️" },
            { title: "CV Templates", desc: "Choose a customizable template to create an effective CV.", icon: "🎨" },
            { title: "CV Examples", desc: "Guide yourself with examples for job titles and industries.", icon: "💡" },
          ],
        },
        {
          title: "Learn",
          items: [
            { title: "How to Make a CV", desc: "Follow our guide to write a CV that showcases your best.", icon: "📚" },
          ],
        },
        {
          title: "Create",
          items: [
            { title: "Save time with our builder", desc: "In just a few clicks make a professional resume.", icon: "🚀" },
          ],
        },
      ],
    },
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    dropdown: {
      sections: [
        {
          title: "Resources",
          items: [
            { title: "AI Cover Letter Generator", desc: "Create a cover letter in minutes with our builder.", icon: "🤖" },
            { title: "Cover Letter Templates", desc: "Templates that help you make a great first impression.", icon: "🎨" },
            { title: "Cover Letter Examples", desc: "Base your cover letter around examples for all job types.", icon: "💡" },
          ],
        },
        {
          title: "Guidance",
          items: [
            { title: "Cover Letter Formats", desc: "Explore formats that suit any application.", icon: "📐" },
            { title: "How to Write a Cover Letter", desc: "Learn how to write a compelling cover letter.", icon: "📚" },
          ],
        },
        {
          title: "Create",
          items: [
            { title: "Save time with our builder", desc: "In just a few clicks you can make a professional cover letter.", icon: "🚀" },
          ],
        },
      ],
    },
  },
  {
    id: "analyser",
    label: "Analyser",
    isSmall: true,
    dropdown: {
      sections: [
        {
          title: "Analyse",
          items: [
            { title: "Resume", desc: "Expert resume tips to help you land the job you want.", icon: "📄" },
            { title: "Cover Letter", desc: "Tips and resources to help you write effectively.", icon: "✉️" },
            { title: "Job Search", desc: "Guidance on writing effective applications.", icon: "🔎" },
            { title: "Career Advice", desc: "Get career guidance to grow and succeed.", icon: "🌟" },
          ],
        },
      ],
    },
  },
];

/* ─────────────────────────────────────────────
   STYLES (injected once)
───────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0a0a0a; }

  .pnav-root {
    --nav-bg: rgba(10,10,10,0.75);
    --nav-border: rgba(255,255,255,0.08);
    --nav-text: rgba(255,255,255,0.82);
    --nav-muted: rgba(255,255,255,0.38);
    --nav-hover-bg: rgba(255,255,255,0.06);
    --nav-active-bg: rgba(255,255,255,0.10);
    --nav-pill-bg: rgba(255,255,255,0.05);
    --drop-bg: rgba(14,14,14,0.96);
    --drop-border: rgba(255,255,255,0.10);
    --drop-item-hover: rgba(255,255,255,0.05);
    --drop-divider: rgba(255,255,255,0.06);
    --accent: #ffffff;
    font-family: 'DM Sans', system-ui, sans-serif;
    position: relative;
    width: 100%;
    z-index: 100;
  }

  .pnav-bar {
    position: relative;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 1200px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px 0 20px;
    background: var(--nav-bg);
    border: 1px solid var(--nav-border);
    border-radius: 16px;


    transition: box-shadow 0.3s ease, border-color 0.3s ease;
    z-index: 200;
  }
  .pnav-bar:hover {
    border-color: rgba(255,255,255,0.14);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.6);
  }

  /* LOGO */
  .pnav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    flex-shrink: 0;
    text-decoration: none;
  }
  .pnav-logo-mark {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pnav-logo-mark svg { display: block; }
  .pnav-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: -0.02em;
    color: #fff;
  }

  /* DESKTOP MENU */
  .pnav-menu {
    display: flex;
    align-items: center;
    gap: 2px;
    list-style: none;
  }
  @media (max-width: 860px) { .pnav-menu { display: none; } }

  .pnav-item {
    position: relative;
  }

  .pnav-trigger {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 14px;
    border-radius: 10px;
    cursor: pointer;
    background: transparent;
    border: none;
    color: var(--nav-text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.01em;
    transition: background 0.18s ease, color 0.18s ease;
    white-space: nowrap;
    user-select: none;
  }
  .pnav-trigger:hover,
  .pnav-item.open .pnav-trigger {
    background: var(--nav-hover-bg);
    color: #fff;
  }
  .pnav-trigger.active-page {
    background: var(--nav-active-bg);
    color: #fff;
  }

  .pnav-chevron {
    width: 14px;
    height: 14px;
    opacity: 0.5;
    transition: transform 0.25s ease, opacity 0.2s ease;
    flex-shrink: 0;
  }
  .pnav-item.open .pnav-chevron {
    transform: rotate(180deg);
    opacity: 0.9;
  }

  /* DROPDOWN */
  .pnav-drop {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%) translateY(10px) scale(0.98);
transform-origin: top center;
    background: var(--drop-bg);
    border: 1px solid var(--drop-border);
    border-radius: 18px;

    box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06);
    padding: 18px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.22s ease, transform 0.22s ease;
    z-index: 300;
    min-width: 220px;
  }
  .pnav-drop.wide { min-width: 740px; }
  .pnav-drop.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }
  .pnav-drop-inner {
    display: flex;
    gap: 4px;
  }
  .pnav-drop-section {
    flex: 1;
    min-width: 180px;
  }
  .pnav-drop-section + .pnav-drop-section {
    border-left: 1px solid var(--drop-divider);
    padding-left: 12px;
    margin-left: 8px;
  }
  .pnav-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--nav-muted);
    padding: 0 10px 8px;
    display: block;
  }
  .pnav-drop-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .pnav-drop-item:hover {
    background: var(--drop-item-hover);
  }
  .pnav-drop-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .pnav-drop-info { flex: 1; min-width: 0; }
  .pnav-drop-title {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.88);
    line-height: 1.3;
    margin-bottom: 2px;
  }
  .pnav-drop-desc {
    font-size: 11.5px;
    color: var(--nav-muted);
    line-height: 1.45;
  }

  /* DROPDOWN ARROW NOTCH */
  .pnav-drop::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 6px;
    background: var(--drop-bg);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  /* CTA BUTTONS */
  .pnav-cta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  @media (max-width: 860px) {
    .pnav-cta-login { display: none !important; }
  }

  .pnav-btn {
    display: inline-flex;
    align-items: center;
    height: 36px;
    padding: 0 18px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.18s ease;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .pnav-btn-ghost {
    background: transparent;
    color: var(--nav-text);
    border: 1px solid var(--nav-border);
  }
  .pnav-btn-ghost:hover {
    background: var(--nav-hover-bg);
    border-color: rgba(255,255,255,0.16);
    color: #fff;
  }
  .pnav-btn-solid {
    background: #fff;
    color: #0a0a0a;
  }
  .pnav-btn-solid:hover {
    background: #e8e8e8;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(255,255,255,0.15);
  }
  .pnav-btn-solid:active {
    transform: translateY(0);
  }

  /* HAMBURGER */
  .pnav-ham-btn {
    display: none;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--nav-hover-bg);
    border: 1px solid var(--nav-border);
    cursor: pointer;
    color: #fff;
    transition: background 0.18s ease;
  }
  .pnav-ham-btn:hover { background: var(--nav-active-bg); }
  @media (max-width: 860px) { .pnav-ham-btn { display: flex; } }

  /* MOBILE OVERLAY */
  .pnav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);

    z-index: 190;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .pnav-overlay.show {
    opacity: 1;
    pointer-events: auto;
  }

  /* MOBILE DRAWER */
  .pnav-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    max-width: 92vw;
    background: rgba(12,12,12,0.98);
    border-left: 1px solid rgba(255,255,255,0.08);
will-change: transform;
    z-index: 300;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .pnav-drawer.open { transform: translateX(0); }

  .pnav-drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .pnav-logo-mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
  .pnav-close-btn {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(255,255,255,0.7);
    transition: background 0.15s ease;
  }
  .pnav-close-btn:hover { background: rgba(255,255,255,0.10); color: #fff; }

  .pnav-drawer-nav { padding: 12px 12px; flex: 1; }

  .pnav-mob-item {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 2px;
  }
  .pnav-mob-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 14px;
    cursor: pointer;
    border-radius: 12px;
    transition: background 0.15s ease;
    color: rgba(255,255,255,0.82);
  }
  .pnav-mob-trigger:hover { background: rgba(255,255,255,0.05); }
  .pnav-mob-trigger.mob-open { background: rgba(255,255,255,0.05); color: #fff; }

  .pnav-mob-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
  }

  .pnav-mob-chevron {
    width: 16px;
    height: 16px;
    opacity: 0.4;
    transition: transform 0.22s ease, opacity 0.2s ease;
    flex-shrink: 0;
  }
  .pnav-mob-trigger.mob-open .pnav-mob-chevron {
    transform: rotate(180deg);
    opacity: 0.8;
  }

  .pnav-mob-drop {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0.4,0,0.2,1);
    padding: 0 4px;
  }
  .pnav-mob-drop.open { max-height: 800px; }

  .pnav-mob-sec-title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    padding: 10px 10px 4px;
    font-family: 'Syne', sans-serif;
  }

  .pnav-mob-drop-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 9px;
    cursor: pointer;
    transition: background 0.15s ease;
    margin-bottom: 1px;
  }
  .pnav-mob-drop-item:hover { background: rgba(255,255,255,0.04); }
  .pnav-mob-drop-icon {
    font-size: 13px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.05);
    border-radius: 7px;
    flex-shrink: 0;
  }
  .pnav-mob-drop-title {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255,255,255,0.75);
  }

  .pnav-drawer-foot {
    padding: 16px 16px 28px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .pnav-drawer-foot .pnav-btn { width: 100%; justify-content: center; height: 42px; font-size: 14px; }

  /* SCROLL SHRINK */
  .pnav-bar.scrolled {
  position:fixed;
    top: 10px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.7);
  }

  /* INDICATOR DOT  */
  .pnav-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    transition: transform 0.2s ease;
  }
  .pnav-item.open .pnav-dot { transform: translateX(-50%) scale(1); }
`;

/* ─────────────────────────────────────────────
   CHEVRON SVG
───────────────────────────────────────────── */
const Chevron = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PremiumNavbar() {

  const user = useSelector(store => store.user.user.DATA);
  const [openId, setOpenId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMobId, setOpenMobId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const leaveTimer = useRef(null);
  const barRef = useRef(null);

  const Navigate = useNavigate();

  // inject styles once
  useEffect(() => {
    if (document.getElementById("pnav-styles")) return;
    const s = document.createElement("style");
    s.id = "pnav-styles";
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  // scroll listener
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openDrop = (id) => { clearTimeout(leaveTimer.current); setOpenId(id); };
  const closeDrop = () => { leaveTimer.current = setTimeout(() => setOpenId(null), 130); };

  const toggleMob = (id) => setOpenMobId(prev => prev === id ? null : id);



  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [drawerOpen]);
  return (
    <div className="pnav-root">
      {/* ─ NAVBAR ─ */}
      <nav
        ref={barRef}
        className={`pnav-bar${scrolled ? " scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a className="pnav-logo" href="#" aria-label="Home">
          <div className="pnav-logo-mark">
            <img
              src={user?.photoUrl?.url || "/default-avatar.png"}
              alt={user?.firstName || "User"}
            />
          </div>
          <span className="pnav-logo-text">
            {user?.firstName} {user?.lastName}
          </span>
        </a>

        {/* Desktop menu */}
        <ul className="pnav-menu" role="menubar">
          {navItems.map((item) => {
            const isOpen = openId === item.id;
            const isWide = !item.isSmall && item.dropdown.sections.length > 1;
            return (
              <li
                key={item.id}
                className={`pnav-item${isOpen ? " open" : ""}`}
                role="none"
                onMouseEnter={() => openDrop(item.id)}
                onMouseLeave={closeDrop}
              >
                <button
                  className="pnav-trigger"
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  {item.label}
                  <Chevron className="pnav-chevron" />
                </button>
                <span className="pnav-dot" aria-hidden="true" />

                {/* Dropdown */}
                <div
                  className={`pnav-drop${isWide ? " wide" : ""}${isOpen ? " visible" : ""}`}
                  role="menu"
                  onMouseEnter={() => openDrop(item.id)}
                  onMouseLeave={closeDrop}
                >
                  <div className="pnav-drop-inner">
                    {item.dropdown.sections.map((sec, si) => (
                      <div className="pnav-drop-section" key={si}>
                        {sec.title && (
                          <span className="pnav-section-title">{sec.title}</span>
                        )}
                        {sec.items.map((di, dii) => (
                          <div className="pnav-drop-item" key={dii} role="menuitem" tabIndex={0}>
                            <div className="pnav-drop-icon">{di.icon}</div>
                            <div className="pnav-drop-info">
                              <div className="pnav-drop-title">{di.title}</div>
                              <div className="pnav-drop-desc">{di.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="pnav-cta">
          <button className="pnav-btn pnav-btn-ghost pnav-cta-login" onClick={() => { Navigate("/app/build-resume") }}>Import Resume</button>
          <button className="pnav-btn pnav-btn-solid" onClick={() => { Navigate("/app/build-resume") }}>Create my Resume</button>
          {/* Hamburger */}
          <button
            className="pnav-ham-btn"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5h14M2 9h14M2 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ─ MOBILE OVERLAY ─ */}
      <div
        className={`pnav-overlay${drawerOpen ? " show" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ─ MOBILE DRAWER ─ */}
      <div
        className={`pnav-drawer${drawerOpen ? " open" : ""}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        <div className="pnav-drawer-head">
          <a className="pnav-logo" href="#" aria-label="Home">
            <div className="pnav-logo-mark">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L8 3l5 10" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.5 9.5h5" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="pnav-logo-text">Resumé</span>
          </a>
          <button
            className="pnav-close-btn"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="pnav-drawer-nav" role="menu">
          {navItems.map((item) => {
            const isOpen = openMobId === item.id;
            return (
              <div className="pnav-mob-item" key={item.id}>
                <div
                  className={`pnav-mob-trigger${isOpen ? " mob-open" : ""}`}
                  role="menuitem"
                  aria-expanded={isOpen}
                  onClick={() => toggleMob(item.id)}
                >
                  <span className="pnav-mob-label">{item.label}</span>
                  <Chevron className="pnav-mob-chevron" />
                </div>
                <div className={`pnav-mob-drop${isOpen ? " open" : ""}`}>
                  {item.dropdown.sections.map((sec, si) => (
                    <div key={si}>
                      {sec.title && (
                        <div className="pnav-mob-sec-title">{sec.title}</div>
                      )}
                      {sec.items.map((di, dii) => (
                        <div className="pnav-mob-drop-item" key={dii} role="menuitem" tabIndex={0}>
                          <div className="pnav-mob-drop-icon">{di.icon}</div>
                          <span className="pnav-mob-drop-title">{di.title}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pnav-drawer-foot">
          <button className="pnav-btn pnav-btn-ghost" onClick={() => { Navigate("/app/build-resume") }}>Import Resume</button>
          <button className="pnav-btn pnav-btn-solid" onClick={() => { Navigate("/app/build-resume") }}>Create my Resume</button>
        </div>
      </div>
    </div>
  );
}