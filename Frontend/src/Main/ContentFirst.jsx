import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lines from './Lines';

/* ─────────────────────────────────────────────────────────
   Inline styles injected once at module level
───────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;600;700&display=swap');

  :root {
    --green:   #00ff87;
    --teal:    #00d4aa;
    --dim:     #0aff9d33;
    --border:  rgba(0,255,135,0.18);
    --card-bg: rgba(10,18,12,0.85);
    --glass:   rgba(255,255,255,0.03);
  }

  .cs-section {
    background: #060a07;
    font-family: 'Outfit', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* ── Ambient orbs ── */
  .cs-orb {
    position: absolute;
    border-radius: 50%;

    pointer-events: none;
    z-index: 0;
  }
  .cs-orb-1 { width: 600px; height: 600px; background: rgba(0,255,135,0.06); top: -120px; left: -180px; }
  .cs-orb-2 { width: 500px; height: 500px; background: rgba(0,180,255,0.05); top: 40%; right: -150px; }
  .cs-orb-3 { width: 700px; height: 700px; background: rgba(0,255,135,0.04); bottom: 10%; left: 30%; }

  /* ── Dot-grid overlay ── */
  .cs-grid {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(rgba(0,255,135,0.07) 1px, transparent 1px);
    background-size: 36px 36px;
  }

  /* ── Section label badge ── */
  .cs-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 6px 18px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    color: var(--green);
    background: rgba(0,255,135,0.05);
    text-transform: uppercase;
  }
  .cs-badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--green);

    animation: cs-pulse 2s ease-in-out infinite;
  }
  @keyframes cs-pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.4; transform:scale(0.75); }
  }

  /* ── Hero headline ── */
  .cs-hero-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2.6rem, 6vw, 5.2rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #fff;
    text-align: center;
  }
  .cs-hero-title span { color: var(--green); }

  .cs-hero-sub {
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    color: rgba(255,255,255,0.5);
    font-weight: 300;
    max-width: 640px;
    text-align: center;
    line-height: 1.7;
  }
  .cs-hero-sub b { color: rgba(255,255,255,0.9); font-weight: 600; }

  /* ── Feature row cards (featuredData1) ── */
  .cs-feat-row {
    border: 1px solid var(--border);
    border-radius: 32px;
    background: var(--card-bg);

    overflow: hidden;
    transition: border-color 0.4s;
    position: relative;
  }
  .cs-feat-row::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--green), transparent);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .cs-feat-row:hover { border-color: rgba(0,255,135,0.35);  }
  .cs-feat-row:hover::before { opacity: 1; }

  .cs-feat-num {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--green);
    opacity: 0.6;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .cs-feat-heading {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(1.5rem, 2.5vw, 2.6rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #fff;
  }

  .cs-tag-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    transition: all 0.25s;
    cursor: default;
    font-size: clamp(0.88rem, 1.2vw, 1rem);
    color: rgba(255,255,255,0.55);
    line-height: 1.5;
  }
  .cs-tag-item:hover {
    background: rgba(0,255,135,0.06);
    border-color: var(--border);
    color: rgba(255,255,255,0.9);
  }
  .cs-tag-icon { color: var(--green); margin-top: 2px; flex-shrink: 0; font-size: 12px; }

  /* Video wrapper */
  .cs-video-wrap {
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--border);

    position: relative;
  }
  .cs-video-wrap::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 70%, rgba(6,10,7,0.6) 100%);
    pointer-events: none;
  }

  /* ── Section divider ── */
  .cs-divider {
    width: 100%; display: flex; align-items: center; gap: 20px;
    padding: 0 48px;
  }
  .cs-divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--border)); }
  .cs-divider-line.right { background: linear-gradient(90deg, var(--border), transparent); }
  .cs-divider-icon { color: var(--green); font-size: 20px; opacity: 0.6; }

  /* ── Explore section ── */
  .cs-explore-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 4.4rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #fff;
    text-align: center;
  }
  .cs-explore-title span { 
    -webkit-text-stroke: 1px rgba(0,255,135,0.5);
    color: transparent;
  }

  /* ── Grid cards (featuredData2) ── */
  .cs-card {
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 28px;
    background: var(--card-bg);
    overflow: hidden;
    transition: all 0.45s cubic-bezier(0.23,1,0.32,1);
    position: relative;
    display: flex; flex-direction: column;
  }
  .cs-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at top, rgba(0,255,135,0.07) 0%, transparent 65%);
    opacity: 0;
    transition: opacity 0.45s;
  }
  .cs-card:hover { 
    border-color: rgba(0,255,135,0.28);
    transform: translateY(-6px);

  }
  .cs-card:hover::before { opacity: 1; }

  .cs-card-img-wrap {
    overflow: hidden;
    position: relative;
  }
  .cs-card-img-wrap::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 80px;
    background: linear-gradient(transparent, var(--card-bg));
  }
  .cs-card img {
    width: 100%; display: block;
    transition: transform 0.6s cubic-bezier(0.23,1,0.32,1);
  }
  .cs-card:hover img { transform: scale(1.04); }

  .cs-card-body { padding: 28px 28px 32px; flex: 1; display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 1; }

  .cs-card-heading {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(1.3rem, 2vw, 1.9rem);
    letter-spacing: -0.02em;
    color: #fff;
  }

  .cs-card-tags { display: flex; flex-direction: column; gap: 8px; }

  .cs-card-tag {
    font-size: 0.92rem;
    color: rgba(255,255,255,0.48);
    line-height: 1.55;
    padding: 8px 12px;
    border-left: 2px solid transparent;
    transition: all 0.25s;
  }
  .cs-card:hover .cs-card-tag { border-color: var(--green); color: rgba(255,255,255,0.75); }

  .cs-card-btn {
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 22px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(0,255,135,0.07);
    color: var(--green);
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
  }
  .cs-card-btn:hover {
    background: var(--green);
    color: #060a07;
    border-color: var(--green);

  }
  .cs-card-btn svg { transition: transform 0.25s; }
  .cs-card-btn:hover svg { transform: rotate(45deg) scale(1.1); }

  /* Arrow icon on cards */
  .cs-card-arrow {
    position: absolute; top: 20px; right: 20px;
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--green); opacity: 0;
    transition: all 0.3s;
    font-size: 16px;
  }
  .cs-card:hover .cs-card-arrow { opacity: 1; transform: translateY(-3px); }
`;

const ContentFirst = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const fadeUp = (selector, trigger = selector, delay = 0) =>
      gsap.from(selector, {
        duration: 1.4,
        y: 70,
        rotationX: 55,
        scale: 0.96,
        opacity: 0,
        ease: "power4.out",
        transformOrigin: "50% 100%",
        perspective: 900,
        delay,
        scrollTrigger: { trigger, start: "top 88%" },
      });

    const slideIn = (selector, x = 0, y = 0) =>
      gsap.from(selector, {
        x, y, opacity: 0, duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: selector, start: "top 88%" },
      });

    // Hero
    fadeUp(".cs-HEAD1", ".cs-BOSSCONT", 0);
    fadeUp(".cs-SUBHEAD1", ".cs-BOSSCONT", 0.15);

    // Feature rows
    document.querySelectorAll(".cs-feat-row").forEach((el, i) => {
      gsap.from(el, {
        y: 60, opacity: 0, duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // Explore section
    fadeUp(".cs-HEAD6", ".cs-HEAD6");
    fadeUp(".cs-SUBHEAD6", ".cs-SUBHEAD6", 0.15);

    // Grid cards
    document.querySelectorAll(".cs-card").forEach((el, i) => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: 1,
        delay: (i % 2) * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });
  });

  const featuredData1 = [
    {
      id: 1,
      num: "01",
      heading: "Keep Developers Engaged",
      tagLines: [
        "Eliminating friction by providing one seamless layer where messaging, meetings, and collaboration live together.",
        "Enable personal chats, groups, communities, and AI-assisted interaction to keep everyone connected anytime.",
        "Move beyond slow, disconnected feedback loops with a workspace that allows real-time collaboration from anywhere.",
      ],
      video: "/videos/feature-1.mp4",
      label: "Collaboration",
    },
    {
      id: 2,
      num: "02",
      heading: "Eliminate PM Dependency",
      tagLines: [
        "Enable self-managed, transparent project collaboration — teams organise and lead themselves without bottlenecks.",
        "Real-time tracking of tasks, time spent, and overall project progress for complete team transparency.",
        "Combine individual task tracking and shared project dashboards into one structured workspace.",
        "Identify blockers early and notify members instantly to keep every project on track.",
      ],
      video: "/videos/feature-2.mp4",
      label: "Project Management",
    },
    {
      id: 3,
      num: "03",
      heading: "Time is Precious",
      tagLines: [
        "Bring chat, collaboration, project tracking, and productivity monitoring into one unified platform.",
        "Real-time task-wise tracking, time logs, and transparent project dashboards — crystal clarity always.",
        "Individual accountability with personal dashboards and measurable contributions for every team member.",
        "A centralised workspace that highlights problems early and keeps teams aligned and on schedule.",
      ],
      video: "/videos/feature-3.mp4",
      label: "Productivity",
    },
  ];

  const featuredData2 = [
    {
      img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989275/image_kkzust.webp",
      heading: "Developer's Toolkit",
      tags: [
        "Functional components that reduce repetition and help you build faster with a clean, consistent structure.",
        "All essentials in one place — AI prompts, smart colour palettes, and powerful customisation tools.",
        "Add your own schema scripts anytime — try it now!",
      ],
    },
    {
      img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989421/image_2_mpco7p.webp",
      heading: "Smart Scheduler",
      tags: [
        "Tracks your daily goals and shows you progress reports in real time.",
        "Automatically organises tasks with intelligent time-blocking and priority management.",
        "Plan projects, study sessions, meetings, or personal goals — all in one streamlined timeline.",
      ],
    },
    {
      img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989518/image_4_oflojd.webp",
      heading: "Resume Generator",
      tags: [
        "Templates designed in collaboration with recruiters — already approved before you apply.",
        "Create a full-fledged, standout resume in under 15 minutes.",
        "20+ templates · AI-enhanced · Resume review · Real-time employer tracking.",
      ],
    },
    {
      img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989459/image_3_euxgba.webp",
      heading: "Global Dev Community",
      tags: [
        "Contact and collaborate with developers worldwide on any project.",
        "Share your skills and experience across communities while learning from others.",
        "Cross-timezone collaboration with built-in async and real-time tools.",
      ],
    },
  ];

  return (
    <>
      {/* Inject global styles */}
      <style>{STYLES}</style>

      <div className="cs-BOSSCONT cs-section w-screen flex flex-col justify-center items-center pb-24  pt-[0px]">
        <Lines />
        {/* Ambient background */}
        <div className="cs-grid" />
        <div className="cs-orb cs-orb-1" />
        <div className="cs-orb cs-orb-2" />
        <div className="cs-orb cs-orb-3" />

        {/* ───── Hero ───── */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full gap-7 pt-20 pb-6 px-6">
          <div className="cs-HEAD1 cs-badge">
            <div className="cs-badge-dot" />
            Platform Overview
          </div>

          <h1 className="cs-HEAD1 cs-hero-title">
            A Platform for<br />
            <span>Endless Possibilities</span>
          </h1>

          <p className="cs-SUBHEAD1 cs-hero-sub">
            <b>CodeSarthi</b> connects you with a global developer community to build and scale.
            Designed to boost <b>productivity</b> while keeping workflows <b>fast</b> and <b>efficient</b>.
          </p>
        </div>

        {/* ───── Feature rows ───── */}
        <div className="relative z-10 w-full max-w-[1400px] px-4 md:px-10 flex flex-col gap-6 mt-6">
          {featuredData1.map((item, idx) => (
            <div key={item.id} className={`cs-feat-row flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch gap-0`}>

              {/* Text panel */}
              <div className="flex flex-col gap-6 p-8 lg:p-12 w-full lg:w-[45%] justify-center">
                <p className="cs-feat-num">// {item.num} — {item.label}</p>
                <h2 className="cs-feat-heading">{item.heading}</h2>

                <div className="flex flex-col gap-1">
                  {item.tagLines.map((line, i) => (
                    <div key={i} className="cs-tag-item ">
                      <span className="cs-tag-icon"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                        <g fill="none" stroke="#04be0aff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                          <circle cx={18.5} cy={4.5} r={2}></circle>
                          <circle cx={4.5} cy={18.5} r={2}></circle>
                          <path d="M4.5 16.5c0-6.627 5.373-12 12-12m-3.459 14.805l-1.792-5.15c-.674-1.936-1.011-2.905-.505-3.411c.507-.506 1.476-.17 3.414.504l5.143 1.788c1.075.373 1.613.56 1.729.922a.8.8 0 0 1 .032.31c-.039.377-.526.671-1.5 1.26c-.27.163-.483.29-.643.407c-.125.09-.187.135-.206.365s.07.32.248.497l2.127 2.127a1.406 1.406 0 0 1 0 1.988l-.166.166a1.44 1.44 0 0 1-2.039 0l-2.1-2.1c-.179-.18-.268-.27-.5-.25c-.23.02-.276.084-.368.212c-.112.157-.236.362-.393.623c-.58.963-.87 1.445-1.244 1.487a.8.8 0 0 1-.326-.034c-.356-.118-.54-.649-.91-1.711"></path>
                        </g>
                      </svg></span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video panel */}
              <div className="w-full lg:w-[55%] p-4 lg:p-6 flex items-center">
                <div className="cs-video-wrap w-full">
                  <video
                    src={item.video}
                    autoPlay loop muted playsInline
                    className="w-full object-cover block"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ───── Divider ───── */}
        <div className="relative z-10 w-full mt-24 mb-4">
          <div className="cs-divider">
            <div className="cs-divider-line" />
            <div className="cs-divider-icon">✦</div>
            <div className="cs-divider-line right" />
          </div>
        </div>

        {/* ───── Explore section header ───── */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full gap-6 mt-16 mb-4 px-6">
          <div className="cs-HEAD6 cs-badge">
            <div className="cs-badge-dot" />
            More to Discover
          </div>

          <h2 className="cs-HEAD6 cs-explore-title">
            Lots of Things Are<br />
            Still Left to <span>Explore</span>
          </h2>

          <p className="cs-SUBHEAD6 cs-hero-sub">
            <b>CodeSarthi</b> is packed with powerful tools to boost <b>productivity</b>,
            with many more features still to explore — all while keeping workflows
            <b> fast</b> and <b>efficient</b>.
          </p>
        </div>

        {/* ───── Feature grid ───── */}
        <div className="relative z-10 w-full max-w-[1400px] px-4 md:px-10 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredData2.map((card, i) => (
              <div key={i} className="cs-card">
                {/* Image */}
                <div className="cs-card-img-wrap">
                  <img src={card.img} alt={card.heading} />
                </div>

                {/* Body */}
                <div className="cs-card-body">
                  <div className="cs-card-arrow">↗</div>
                  <h3 className="cs-card-heading">{card.heading}</h3>

                  <div className="cs-card-tags">
                    {card.tags.map((tag, j) => (
                      <p key={j} className="cs-card-tag">◆ {tag}</p>
                    ))}
                  </div>

                  <button className="cs-card-btn">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="currentColor" />
                    </svg>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default ContentFirst;