import React, { useRef } from "react";

/* ─────────────────────────────────────────────
   Each guardian has its own colour signature
───────────────────────────────────────────── */
const cards = [
  {
    unit: "UNIT-01",
    title: "ASTRA",
    role: "Verification Guardian",
    quote: "Trust is verified in silence",
    img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989004/CS_Verification_Manager_uohza5.webp",
    color: "#00e5ff",        // ice-cyan
    glow: "rgba(0,229,255,0.22)",
    dimGlow: "rgba(0,229,255,0.07)",
    status: "ACTIVE",
    tag: "VERIFICATION",
  },
  {
    unit: "UNIT-02",
    title: "NOVA",
    role: "Identity Guardian",
    quote: "Your digital identity, reconstructed",
    img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989004/CS_Identity_Manager_amyjyi.webp",
    color: "#ffb830",        // amber-gold
    glow: "rgba(255,184,48,0.22)",
    dimGlow: "rgba(255,184,48,0.07)",
    status: "ACTIVE",
    tag: "IDENTITY",
  },
  {
    unit: "UNIT-03",
    title: "ORION",
    role: "Community & AI Guardian",
    quote: "Every developer is a signal",
    img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989003/CS_Community_AI_Manager_z664dg.webp",
    color: "#bf7fff",        // violet
    glow: "rgba(191,127,255,0.22)",
    dimGlow: "rgba(191,127,255,0.07)",
    status: "ACTIVE",
    tag: "COMMUNITY",
  },
  {
    unit: "UNIT-04",
    title: "ZENITH",
    role: "Help & Support Guardian",
    quote: "No noise. Only solutions",
    img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989005/CS_Help_Support_onbjoi.webp",
    color: "#00ff87",        // brand-green
    glow: "rgba(0,255,135,0.22)",
    dimGlow: "rgba(0,255,135,0.07)",
    status: "ACTIVE",
    tag: "SUPPORT",
  },
];

/* ── Inline styles ── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500&display=swap');

.gs-section {
  background: #060a07;
  font-family: 'Outfit', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Circuit-board dot grid */
.gs-grid {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* Ambient orb behind the whole section */
.gs-bg-orb {
  position: absolute; border-radius: 50%;

}

/* ── Section badge ── */
.gs-badge {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px; padding: 6px 18px;
  font-family: 'Space Mono', monospace;
  font-size: 11px; letter-spacing: 0.14em;
  color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.04);
  text-transform: uppercase;
}
.gs-badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #00ff87;

  animation: gs-pulse 2s ease-in-out infinite;
}
@keyframes gs-pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.35; transform:scale(0.7); }
}

/* ── Section title ── */
.gs-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(2.4rem, 5.5vw, 5rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #fff;
  text-align: center;
}
.gs-title span {
  -webkit-text-stroke: 1px rgba(0, 255, 13, 0.35);
  color: transparent;
}

/* ── Card ── */
.gs-card {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  background: rgba(10,15,12,0.9);
  border: 1px solid rgba(255,255,255,0.07);
  display: flex; flex-direction: column;
  transition: transform 0.45s cubic-bezier(0.23,1,0.32,1),

  cursor: default;
}
.gs-card:hover {
  transform: translateY(-10px);
}

/* Top colour bar */
.gs-card-bar {
  height: 2px; width: 100%;
  background: var(--card-color);

  opacity: 0.8;
  transition: opacity 0.35s;
}
.gs-card:hover .gs-card-bar { opacity: 1; }

/* Halo glow behind card on hover */
.gs-card::before {
  content: '';
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse at 50% 0%, var(--card-dim-glow) 0%, transparent 65%);
  opacity: 0;
  transition: opacity 0.45s;
  pointer-events: none;
}
.gs-card:hover::before { opacity: 1; }

/* Image wrapper */
.gs-img-wrap {
  position: relative; overflow: hidden;
  flex-shrink: 0;
}
.gs-img-wrap img {
  width: 100%; height: 280px; object-fit: cover; display: block;
  transition: transform 0.6s cubic-bezier(0.23,1,0.32,1), filter 0.4s;
  filter: saturate(0.8) brightness(0.85);
}
.gs-card:hover .gs-img-wrap img {
  transform: scale(1.06);
  filter: saturate(1) brightness(1);
}

/* Scanline sweep on hover */
.gs-scan {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: repeating-linear-gradient(
    180deg,
    transparent 0px,
    transparent 3px,
    rgba(255,255,255,0.015) 3px,
    rgba(255,255,255,0.015) 4px
  );
  opacity: 0;
  transition: opacity 0.35s;
}
.gs-card:hover .gs-scan { opacity: 1; }

/* Image overlay fade */
.gs-img-fade {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 80px;
  background: linear-gradient(transparent, rgba(10,15,12,0.95));
  z-index: 1;
}

/* Unit badge on image */
.gs-unit-badge {
  position: absolute; top: 14px; left: 14px; z-index: 3;
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 0.12em;
  padding: 4px 10px; border-radius: 999px;
  background: rgba(0,0,0,0.65);
  border: 1px solid var(--card-color);
  color: var(--card-color);
  text-transform: uppercase;

}

/* Status pill on image */
.gs-status {
  position: absolute; top: 14px; right: 14px; z-index: 3;
  display: flex; align-items: center; gap: 5px;
  font-family: 'Space Mono', monospace;
  font-size: 9px; letter-spacing: 0.1em;
  padding: 4px 10px; border-radius: 999px;
  background: rgba(0,0,0,0.65);
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.1);

  text-transform: uppercase;
}
.gs-status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--card-color);

  animation: gs-pulse 2s ease-in-out infinite;
}

/* Card body */
.gs-card-body {
  position: relative; z-index: 2;
  padding: 20px 22px 24px;
  display: flex; flex-direction: column; gap: 8px;
  flex: 1;
}

/* Tag row */
.gs-tag {
  font-family: 'Space Mono', monospace;
  font-size: 10px; letter-spacing: 0.14em;
  color: var(--card-color);
  opacity: 0.7;
  text-transform: uppercase;
}

/* Name */
.gs-name {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.03em;
  color: #fff;
  line-height: 1;
}

/* Role */
.gs-role {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  font-weight: 400;
  letter-spacing: 0.02em;
}

/* Divider */
.gs-divider {
  height: 1px; width: 100%;
  background: linear-gradient(90deg, var(--card-color), transparent);
  opacity: 0.2;
  margin: 4px 0;
  transition: opacity 0.35s;
}
.gs-card:hover .gs-divider { opacity: 0.45; }

/* Quote */
.gs-quote {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.55;
  font-style: italic;
  font-weight: 300;
  transition: color 0.3s;
}
.gs-quote::before { content: '"'; color: var(--card-color); font-style: normal; margin-right: 2px; }
.gs-quote::after  { content: '"'; color: var(--card-color); font-style: normal; margin-left:  2px; }
.gs-card:hover .gs-quote { color: rgba(255,255,255,0.8); }

/* Appear animation */
.gs-card-anim {
  opacity: 0;
  transform: translateY(40px);
  animation: gs-appear 0.7s cubic-bezier(0.23,1,0.32,1) forwards;
}
@keyframes gs-appear {
  to { opacity: 1; transform: translateY(0); }
}
`;

const ContentSecond = () => {
  return (
    <>
      <style>{STYLES}</style>

      <section className="gs-section w-full py-24 px-4 md:px-10 flex flex-col items-center gap-14 mt-[-100px]">
        {/* Background elements */}
        <div className="gs-grid" />
        <div className="gs-bg-orb" style={{ width: 800, height: 800, background: "rgba(0,255,135,0.04)", top: -200, left: "50%", transform: "translateX(-50%)" }} />

        {/* ── Header ── */}
        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="gs-badge">
            <div className="gs-badge-dot" />
            Intelligent Agents
          </div>

          <h2 className="gs-title">
            Meet the <span>Guardians</span>
          </h2>

          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
            color: "rgba(255,255,255,0.4)",
            fontWeight: 300,
            maxWidth: 560,
            textAlign: "center",
            lineHeight: 1.7,
          }}>
            Four autonomous intelligences — each with a singular purpose,
            operating in the background so you never have to think about it.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div
          className="relative z-10 w-full max-w-[1400px]"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="gs-card gs-card-anim"
              style={{
                "--card-color": card.color,
                "--card-glow": card.glow,
                "--card-dim-glow": card.dimGlow,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              {/* Top accent bar */}
              <div className="gs-card-bar" />

              {/* Image */}
              <div className="gs-img-wrap">
                {/* Unit badge */}
                <div className="gs-unit-badge">{card.unit}</div>

                {/* Status */}
                <div className="gs-status">
                  <div className="gs-status-dot" />
                  {card.status}
                </div>

                <img src={card.img} alt={card.title} />
                <div className="gs-scan" />
                <div className="gs-img-fade" />
              </div>

              {/* Body */}
              <div className="gs-card-body">
                <p className="gs-tag">// {card.tag}</p>
                <h3 className="gs-name">{card.title}</h3>
                <p className="gs-role">{card.role}</p>
                <div className="gs-divider" />
                <p className="gs-quote">{card.quote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom flourish ── */}
        <div className="relative z-10 flex items-center gap-4 w-full max-w-[1400px]">
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
            4 of 4 Guardians Active
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
        </div>
      </section>
    </>
  );
};

export default ContentSecond;