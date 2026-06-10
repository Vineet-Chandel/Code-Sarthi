import React, { useEffect, useRef } from "react";
import CTAcreateResume from "./CTAcreateResume";
import HighlighterResume from "./HighlighterResume"
/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const FEATURES = [
  {
    num: "01",
    tag: "Foundation",
    color: "purple",
    title: "Build Your Career Profile",
    description:
      "Create a single source of truth for your career by adding projects, skills, experience, certifications, and achievements once.",
    pill: "Create Profile",
    badge: "Career Memory",
    image:
      "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1780898776/Create_your_RESUME_3_wfdm4s.webp",
  },
  {
    color: "blue",
    num: "02",
    tag: "Intelligence",
    title: "AI-powered content",
    description:
      "Get AI-generated content suggestions, refined by our career experts, for maximum impact on your resume.",
    pill: "Try AI writer",
    badge: "Powered by AI",
    image:
      "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1780910852/AI_Resume_Content_n72qco.webp",
  },

  {
    color: "green",
    num: "03",
    tag: "Showcase",
    title: "Digital Carrer Profile",
    description:
      "Create a dynamic digital career profile that adapts across devices, ensuring you make a lasting impression whether offline or online.",
    pill: "View your digital profile",
    badge: "Digital Profile",
    image:
      "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1781101211/Unlimited_Resumes_xk6vkx.webp",
  },
  {
    num: "04",
    tag: "Compatibility",
    color: "yellow",
    title: "ATS-friendly formats",
    description:
      "Employers use applicant tracking systems (ATS) to filter out candidates. With our templates, you'll have an ATS-friendly resume that will help you stand out.",
    pill: "Check compatibility",
    badge: "ATS Optimised",
    image:
      "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1781101530/ats-friendly-resume_cjelzm.webp",
  },


  {
    color: "red",
    num: "05",
    tag: "Guidance",
    title: "Step-by-step support",
    description:
      "Our Resume Creator provides detailed tips and advice throughout the process, with customer support ready to assist you anytime.",
    pill: "24/7 support",
    badge: "Expert tips",
    image:
      "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777482312/Resume_Builder_Support_kzt7s7.avif",
  },
  {
    color: "yellow",
    num: "06",
    tag: "Cohesion",
    title: "Matching cover letter",
    description:
      "Easily create a memorable cover letter with customizable suggested text. Choose a design that aligns with your resume for a cohesive professional look.",
    pill: "Create cover letter",
    badge: "Perfectly matched",
    image:
      "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777482232/Matching_Cover_Letter_with_Resume_dxuish.avif",
  },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .ww-root {
    background: #0a0a0a;
    overflow: hidden;
    width: 100%;
  }

  .ww-container {
    width:95%;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* ── HEADER ── */
  .ww-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .ww-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    padding: 6px 16px;
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.36);
  }

  .ww-eyebrow-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255,255,255,0.45);
    flex-shrink: 0;
  }

  .ww-title {
    color: #ffffff;
    margin-bottom: 16px;
  }

  .ww-title em {
    font-style: normal;
    color: rgba(255,255,255,0.22);
  }

  .ww-subtitle {
    font-size: 18px;

    max-width: 440px;
    margin: 0 auto;
    line-height: 1.65;
    font-weight: 300;
  }

  .ww-divider {
    width: 100%;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }

  /* ── FEATURE ROW ── */
  .ww-feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 72px;
    padding: 50px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.75s ease, transform 0.75s ease;
  }

  .ww-feature.rev {
    direction: rtl;
  }
  .ww-feature.rev > * {
    direction: ltr;
  }

  .ww-feature.ww-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .ww-feature:last-of-type {
    border-bottom: none;
  }

  /* ── TEXT ── */
  .ww-num {
    display: block;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;

    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .ww-ftitle {
    font-family: 'Syne', sans-serif;
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: -0.025em;
    color: #ffffff;
    margin-bottom: 16px;
  }

  .ww-fdesc {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.73);
    max-width: 500px;
    margin-bottom: 28px;
  }

  .ww-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 16px;
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 100px;
    background: rgba(255,255,255,0.04);
    font-size: 12.5px;
    font-weight: 400;
    color: rgba(255,255,255,0.36);
    cursor: default;
    transition: all 0.22s ease;
    user-select: none;
  }
  .ww-pill:hover {
    border-color: rgba(255,255,255,0.22);
    color: rgba(255,255,255,0.68);
    background: rgba(255,255,255,0.08);
  }

  /* ── IMAGE FRAME ── */
  .ww-img-wrap {
    position: relative;
  }

  .ww-img-frame {
    position: relative;
    // border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.025);
    aspect-ratio: 4 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.3s ease;
  }

  .ww-img-frame:hover {
    border-color: rgba(255,255,255,0.16);
  }

  .ww-img-sheen {
    position: absolute;
    inset: 0;

    pointer-events: none;
    z-index: 1;
    // border-radius: inherit;
  }

  .ww-img-frame img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 20px;
    transition: transform 0.5s ease;
    position: relative;
    z-index: 0;
  }

  .ww-img-frame:hover img {
    transform: scale(1.04);
  }

  /* corner brackets */
  .ww-corner {
    position: absolute;
    width: 18px;
    height: 18px;
    border-color: rgba(255,255,255,0.14);
    border-style: solid;
    z-index: 2;
  }
  .ww-tl { top: 0; left: 0; border-width: 1px 0 0 1px; border-radius: 6px 0 0 0; }
  .ww-tr { top: 0; right: 0; border-width: 1px 1px 0 0; border-radius: 0 6px 0 0; }
  .ww-bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; border-radius: 0 0 0 6px; }
  .ww-br { bottom: 0; right: 0; border-width: 0 1px 1px 0; border-radius: 0 0 6px 0; }

  .ww-img-badge {
    position: absolute;
    bottom: 14px;
    left: 14px;
    z-index: 3;
    padding: 5px 12px;
    border-radius: 100px;
    background: rgba(10,10,10,0.88);
    border: 1px solid rgba(255,255,255,0.10);
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.42);
    backdrop-filter: blur(8px);
  }

  /* ── CTA ── */
  .ww-cta {
    text-align: center;
    padding-top: 80px;
  }

  .ww-cta-title {
    font-family: 'Syne', sans-serif;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #ffffff;

  }

  .ww-cta-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.34);
    margin-bottom: 28px;
    font-weight: 300;
  }

  .ww-cta-btns {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .ww-btn-p {
    height: 44px;
    padding: 0 28px;
    border-radius: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    background: #ffffff;
    color: #0a0a0a;
    border: none;
    transition: all 0.18s ease;
    letter-spacing: 0.01em;
  }
  .ww-btn-p:hover {
    background: #e6e6e6;
    transform: translateY(-1px);
  }

  .ww-btn-s {
    height: 44px;
    padding: 0 28px;
    border-radius: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    background: transparent;
    color: rgba(255,255,255,0.52);
    border: 1px solid rgba(255,255,255,0.12);
    transition: all 0.18s ease;
  }
  .ww-btn-s:hover {
    background: rgba(255,255,255,0.05);
    color: #ffffff;
    border-color: rgba(255,255,255,0.22);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .ww-feature,
    .ww-feature.rev {
      grid-template-columns: 1fr;
      gap: 36px;
      direction: ltr;
    }
    .ww-container {
      padding: 0 20px;
    }
    .ww-header {
      margin-bottom: 60px;
    }
    .ww-feature {
      padding: 56px 0;
    }
  }
`;

/* ─────────────────────────────────────────────
   PILL ICONS
───────────────────────────────────────────── */
const PillIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const WhyWe = () => {
  const featureRefs = useRef([]);

  /* Inject CSS once */
  useEffect(() => {
    if (document.getElementById("ww-styles")) return;
    const s = document.createElement("style");
    s.id = "ww-styles";
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  /* Scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ww-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    featureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-screen">
      <section className="ww-root" aria-label="Why choose our resume builder">
        <div className="ww-container">
          {/* ── FEATURES ── */}
          {FEATURES.map((f, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div>
                <div
                  key={i}
                  className={`ww-feature ${isReversed ? " rev" : ""}`}
                  ref={(el) => (featureRefs.current[i] = el)}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  {/* Text */}
                  <div className="ww-text">

                    <h3 className="ww-ftitle">
                      <HighlighterResume text2={f.title} color={f.color} /></h3>
                    <p className="ww-fdesc">{f.description}</p>
                    <span className="ww-pill">
                      <PillIcon />
                      {f.pill}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="ww-img-wrap">
                    <div className="">

                      <div className="ww-img-sheen " />
                      <span className="block  overflow-hidden rounded-[30px]">
                        <img
                          src={f.image}
                          alt={f.title}
                          loading="lazy"
                          className="
      w-full h-full object-cover

      transition-transform duration-500 ease-out

      will-change-transform
    "
                        />
                      </span>

                    </div>


                  </div>


                </div>
                <div className="w-full  flex gap-2 items-center">
                  <span className="w-1/2 h-0.5 bg-[#5a5a5a]"></span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fff" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"></path></svg>
                  </span>
                  <span className="w-1/2 h-0.5 bg-[#5a5a5a]"></span>
                </div>
              </div>


            );
          })}

          {/* ── CTA ── */}
          <div className=" flex flex-col items-center justify-center w-full mt-10">
            <div className="ww-cta-title">Ready to get started?</div>
            <span>
              <CTAcreateResume />
            </span>

          </div>

        </div>
      </section></div>

  );
};

export default WhyWe;