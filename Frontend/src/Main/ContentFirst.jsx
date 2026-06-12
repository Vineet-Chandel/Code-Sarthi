import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lines from './Lines2';

/* ─────────────────────────────────────────────────────────
   Inline styles injected once at module level
───────────────────────────────────────────────────────── */
const STYLES = `


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
    font-family: head;
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
    font-family: head;
    font-weight: 800;
    font-size: clamp(1.5rem, 2.5vw, 2.6rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #fff;
  }

  .cs-tag-item {
    display: flex; align-items: flex-start; gap: 10px;

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
    padding:2px 3px 2px 10px;
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
    font-family: head;
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
    font-family: head;
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
  .cs-card-btn svg { transition: transform 0.25s;  transform: rotate(45deg) }
  .cs-card-btn:hover svg { transform: rotate(90deg) scale(1.1); }

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
      videoMP4: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780500551/feature-1_vvii1a.mp4",
      videoWEBM: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780547461/feature-1_ongnor.webm",
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
      videoMP4: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780500571/feature-2_ql8mvb.mp4",
      videoWEBM: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780547497/feature-2_copy_qt0mzs.webm",
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
      videoMP4: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780502298/feature-3_jsoaxr.mp4",
      videoWEBM: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780547468/feature-3_1_pvdghk.webm",
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
      heading: "Resume Builder & Analyser",
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
              <div className="flex flex-col gap-6 p-6  lg:p-10 w-full lg:w-[45%] justify-center">
                <p className="cs-feat-num flex items-center gap-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3671 4.06132C9.6671 4.56707 5 8.15805 5 13.9996C5 14.9188 5.18106 15.8291 5.53284 16.6784C5.88463 17.5277 6.40024 18.2993 7.05025 18.9493C7.70026 19.5993 8.47194 20.115 9.32122 20.4667C10.146 20.8084 11.0282 20.989 11.9203 20.9991C9.74796 20.9567 8 19.1824 8 16.9999C8 16.8024 8.01432 16.6082 8.04197 16.4184C8.04315 16.4071 8.04459 16.3957 8.04628 16.3843C8.3817 14.1305 10.4553 12.2171 11.4581 11.4101C11.7785 11.1523 12.2216 11.1523 12.5421 11.4101C13.5448 12.2171 15.6183 14.1305 15.9537 16.3843C15.9554 16.3957 15.9569 16.4071 15.958 16.4184C15.9857 16.6082 16 16.8024 16 16.9999C16 19.1824 14.252 20.9567 12.0797 20.9991C12.9718 20.989 13.854 20.8084 14.6788 20.4667C15.5281 20.115 16.2997 19.5993 16.9497 18.9493C17.5998 18.2993 18.1154 17.5277 18.4672 16.6784C18.807 15.8579 18.9875 14.9804 18.9994 14.093C18.9998 14.0815 19 14.07 19 14.0584L18.9999 14.0268L19 13.9997L18.9999 13.9996L18.9998 13.9995C18.9734 9.75884 16.1044 7.4446 15.5813 7.05781C15.5323 7.02155 15.4671 7.02196 15.4181 7.05823C15.2083 7.21337 14.6241 7.67639 13.9967 8.44729C13.9251 8.53521 13.7845 8.5184 13.7361 8.41591C12.5573 5.92135 10.9243 4.40726 10.5386 4.07102C10.4888 4.02764 10.4206 4.02266 10.3671 4.06132Z" fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.04628 16.3844C8.3817 14.1306 10.4553 12.2172 11.4581 11.4102C11.7785 11.1523 12.2216 11.1523 12.5421 11.4102C13.5448 12.2172 15.6183 14.1306 15.9537 16.3844C15.9554 16.3958 15.9569 16.4071 15.958 16.4184C15.9857 16.6083 16 16.8025 16 17C16 19.2091 14.2091 21 12 21C9.79086 21 8 19.2091 8 17C8 16.8024 8.01432 16.6083 8.04197 16.4184C8.04315 16.4071 8.04459 16.3958 8.04628 16.3844Z" fill="#7E869E" fill-opacity="0.25" />
                  </svg> {item.num} — {item.label}
                </p>



                <h2 className="cs-feat-heading">{item.heading}</h2>

                <div className="flex flex-col gap-1 ">
                  {item.tagLines.map((line, i) => (
                    <div key={i} className="cs-tag-item ">
                      <span className="cs-tag-icon">

                        <svg className='rotate-90' width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="currentColor" />
                        </svg>

                      </span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video panel */}
              <div className="w-full lg:w-[55%] p-4 lg:p-6 flex items-center">
                <div className="cs-video-wrap w-full">
                  <video
                    // src={item.video}
                    autoPlay loop muted playsInline
                    className="w-full object-cover block"
                  >


                    <source src={item.videoWEBM} type="video/webm; codecs=av01.0.05M.08" />

                    <source src={item.videoWEBM} type="video/webm; codecs=vp9" />

                    <source src={item.videoMP4} type="video/mp4" />


                  </video>
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
              <div key={i} className="cs-card group">
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
                      <p key={j} className="cs-card-tag " > <span className='group-hover:text-green-500'> ✦ </span>  {tag}</p>
                    ))}
                  </div>

                  <button className="cs-card-btn">

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="currentColor" />
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