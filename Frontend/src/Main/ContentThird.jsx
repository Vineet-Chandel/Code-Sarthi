import React, { useState } from 'react';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

/* ── CTA cards ── */
.ct-card {
  position: relative;
  border-radius: 28px;
  background: rgba(10,15,12,0.9);
  border: 1px solid rgba(255,255,255,0.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 36px 36px 32px;
  gap: 24px;
  transition: transform 0.4s cubic-bezier(0.23,1,0.32,1),
              border-color 0.35s,
  cursor: default;
}
.ct-card:hover {
  transform: translateY(-7px);
  border-color: rgba(0,255,135,0.22);

}

/* Top shimmer line */
.ct-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,255,135,0.5), transparent);
  opacity: 0;
  transition: opacity 0.35s;
}
.ct-card:hover::before { opacity: 1; }

/* Radial hover glow */
.ct-card::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 50% 0%, rgba(0,255,135,0.06) 0%, transparent 65%);
  opacity: 0;
  transition: opacity 0.4s;
}
.ct-card:hover::after { opacity: 1; }

.ct-card-tag {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  color: rgba(0,255,135,0.6);
  text-transform: uppercase;
}

.ct-card-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  letter-spacing: -0.03em;
  color: #fff;
  line-height: 1.1;
}

.ct-card-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.38);
  line-height: 1.6;
  font-weight: 300;
  flex: 1;
}

/* Card CTA button */
.ct-card-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(0,255,135,0.2);
  background: rgba(0,255,135,0.06);
  color: rgba(0,255,135,0.8);
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s;
  position: relative; z-index: 1;
}
.ct-card-btn:hover {
  background: #00ff87;
  color: #060a07;
  border-color: #00ff87;

}
.ct-card-btn svg { transition: transform 0.25s; }
.ct-card-btn:hover svg { transform: rotate(45deg) scale(1.1); }

/* Corner number */
.ct-card-num {
  position: absolute;
  top: 20px; right: 24px;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.1);
  letter-spacing: 0.08em;
}

/* ── Newsletter banner ── */
.ct-banner {
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(8,13,10,0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 80px 48px;
  text-align: center;
}

/* Diagonal stripe texture */
.ct-banner-stripes {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image: repeating-linear-gradient(
    -55deg,
    transparent 0px,
    transparent 40px,
    rgba(0,255,135,0.018) 40px,
    rgba(0,255,135,0.018) 41px
  );
}

/* Large blurred orb inside banner */
.ct-banner-orb {
  position: absolute;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 65%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; z-index: 0;
  animation: ct-breathe 6s ease-in-out infinite;
}
@keyframes ct-breathe {
  0%,100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.7; }
  50%      { transform: translate(-50%,-50%) scale(1.12); opacity: 1;   }
}

.ct-banner-label {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(0,255,135,0.2);
  border-radius: 999px; padding: 6px 18px;
  font-family: 'Space Mono', monospace;
  font-size: 11px; letter-spacing: 0.14em;
  color: rgba(0,255,135,0.7);
  background: rgba(0,255,135,0.05);
  text-transform: uppercase;
}
.ct-banner-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #00ff87;

  animation: ct-pulse 2s ease-in-out infinite;
}
@keyframes ct-pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.35; transform:scale(0.7); }
}

.ct-banner-title {
  position: relative; z-index: 1;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(3.5rem, 9vw, 8rem);
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: #fff;
}
.ct-banner-title span {
  -webkit-text-stroke: 1px rgba(255,255,255,0.25);
  color: transparent;
}

.ct-banner-desc {
  position: relative; z-index: 1;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
  color: rgba(255,255,255,0.4);
  font-weight: 300;
  max-width: 520px;
  line-height: 1.7;
}
.ct-banner-desc b { color: rgba(255,255,255,0.75); font-weight: 600; }

/* Email input row */
.ct-input-row {
  position: relative; z-index: 1;
  display: flex; align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  padding: 6px 6px 6px 22px;
  width: 100%;
  max-width: 480px;
  transition: border-color 0.25s,
}
.ct-input-row:focus-within {
  border-color: rgba(0,255,135,0.4);

}
.ct-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  min-width: 0;
}
.ct-input::placeholder { color: rgba(255,255,255,0.25); }
.ct-submit-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 10px 20px;
  border-radius: 999px;
  background: #00ff87;
  color: #060a07;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none; cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s;
  flex-shrink: 0;
}
.ct-submit-btn:hover {
  background: #fff;

}
.ct-submit-btn svg { transition: transform 0.25s; }
.ct-submit-btn:hover svg { transform: rotate(45deg) scale(1.1); }

.ct-privacy {
  position: relative; z-index: 1;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.18);
  text-transform: uppercase;
}

/* ── Appear animation ── */
.ct-anim {
  opacity: 0;
  transform: translateY(36px);
  animation: ct-appear 0.7s cubic-bezier(0.23,1,0.32,1) forwards;
}
@keyframes ct-appear {
  to { opacity: 1; transform: translateY(0); }
}
`;

/* Arrow icon reused */
const ArrowIcon = ({ color = "currentColor" }) => (
  <svg className="rotate-45" width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill={color} />
  </svg>
);

const ctaCards = [
  {
    num: "01",
    tag: "// Toolkit",
    title: "Developer Toolkit",
    desc: "Functional components, AI prompts, smart colour palettes, and schema scripts — all the essentials in one place to help you build faster.",
    cta: "Visit Toolkit",
    icon: "⌥",
  },
  {
    num: "02",
    tag: "// Community",
    title: "Global Dev Community",
    desc: "Connect and collaborate with developers worldwide. Share skills, learn from peers, and co-build projects across time zones.",
    cta: "Join Community",
    icon: "◈",
  },
  {
    num: "03",
    tag: "// Support",
    title: "Help & Support",
    desc: "Stuck? Our support team and ZENITH guardian are on standby. No tickets lost in the void — we actually respond.",
    cta: "Reach Support",
    icon: "◉",
  },
];

const ContentThird = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true);
  };

  return (
    <>
      <style>{STYLES}</style>

      <div
        style={{ background: "#060a07", fontFamily: "'Outfit', sans-serif" }}
        className="w-full flex flex-col items-center px-4 md:px-10 gap-6 pb-6"
      >

        {/* ── Divider matching other sections ── */}
        <div className="w-full max-w-[1400px] flex items-center gap-4 mb-4">
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
            Quick Access
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
        </div>

        {/* ── CTA cards row ── */}
        <div
          className="w-full max-w-[1400px]"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {ctaCards.map((card, i) => (
            <div
              key={i}
              className="ct-card ct-anim"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="ct-card-num">{card.num}</span>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p className="ct-card-tag">{card.tag}</p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    fontSize: "1.6rem",
                    color: "rgba(0,255,135,0.35)",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}>
                    {card.icon}
                  </span>
                  <h3 className="ct-card-title">{card.title}</h3>
                </div>

                <p className="ct-card-desc">{card.desc}</p>
              </div>

              <button className="ct-card-btn">
                <ArrowIcon />
                {card.cta}
              </button>
            </div>
          ))}
        </div>

        {/* ── Newsletter banner ── */}
        <div className="ct-banner w-full max-w-[1400px] ct-anim" style={{ animationDelay: "0.35s" }}>
          <div className="ct-banner-stripes" />
          <div className="ct-banner-orb" />

          {/* Dot-grid same as other sections */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }} />

          <div className="ct-banner-label">
            <div className="ct-banner-dot" />
            Newsletter
          </div>

          <div className="ct-banner-title">
            Stay<br /><span>Tuned</span>
          </div>

          <p className="ct-banner-desc">
            Want to keep up with every update, feature drop, and thing
            we build for <b>developers</b>? One email. <b>No spam.</b> Ever.
          </p>

          {/* Email input */}
          {!submitted ? (
            <div className="ct-input-row">
              <input
                className="ct-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
              <button className="ct-submit-btn" onClick={handleSubmit}>
                <ArrowIcon color="#060a07" />
                Subscribe
              </button>
            </div>
          ) : (
            <div style={{
              position: "relative", zIndex: 1,
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 28px", borderRadius: 999,
              border: "1px solid rgba(0,255,135,0.3)",
              background: "rgba(0,255,135,0.07)",
              fontFamily: "'Space Mono', monospace",
              fontSize: 12, letterSpacing: "0.1em",
              color: "#00ff87", textTransform: "uppercase",
            }}>
              <span style={{ fontSize: 16 }}>✓</span>
              You're on the list
            </div>
          )}

          <p className="ct-privacy">No spam · Unsubscribe anytime · We respect your inbox</p>
        </div>

      </div>
    </>
  );
};

export default ContentThird;