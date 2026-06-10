import { useEffect, useRef, useState } from "react";

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
   CHEVRON SVG
───────────────────────────────────────────── */
const Chevron = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" width="14" height="14">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PremiumNavbar() {
  // Replace with your actual Redux selector:
  // const user = useSelector(store => store.user.user.DATA);
  const user = { firstName: "John", lastName: "Doe", photoUrl: { url: null } };

  const [openId, setOpenId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMobId, setOpenMobId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const leaveTimer = useRef(null);

  // Inject Google Fonts once
  useEffect(() => {
    if (document.getElementById("pnav-gfonts")) return;
    const link = document.createElement("link");
    link.id = "pnav-gfonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap";
    document.head.appendChild(link);
  }, []);

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Body overflow lock when drawer opens
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const openDrop = (id) => {
    clearTimeout(leaveTimer.current);
    setOpenId(id);
  };
  const closeDrop = () => {
    leaveTimer.current = setTimeout(() => setOpenId(null), 130);
  };
  const toggleMob = (id) => setOpenMobId((prev) => (prev === id ? null : id));

  const navigate = (path) => {
    // Replace with your router: Navigate(path)
    window.location.href = path;
  };

  return (
    <div className="relative w-full z-[100]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── NAVBAR BAR ── */}
      <nav
        className={[
          // layout
          "flex items-center justify-between",
          // sizing
          "min-h-[60px] px-[10px] pl-[14px]",
          // shape
          "rounded-[20px]",
          // positioning — floating pill
          "absolute left-1/2 -translate-x-1/2",
          // width
          "w-[calc(100%-24px)] max-w-[1280px]",

          // transition
          "transition-all duration-300 ease-in-out",
          // scrolled vs idle
          "relative top-3 bg-[rgba(10,10,10,0.82)] border border-[rgba(255,255,255,0.10)]",

          "z-[200]",
          // mobile tweaks
          "sm:rounded-[20px]",
        ].join(" ")}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── LOGO ── */}
        <a
          href="#"
          aria-label="Home"
          className="flex items-center gap-2 flex-shrink-0 no-underline cursor-pointer"
        >
          <div className="w-[30px] h-[30px] rounded-[8px] bg-black flex items-center justify-center flex-shrink-0 overflow-hidden">
            {user?.photoUrl?.url ? (
              <img
                src={user.photoUrl.url}
                alt={user?.firstName || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L8 3l5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.5 9.5h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <span
            className="font-bold text-[15px] tracking-[-0.02em] text-white max-w-[140px] truncate"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {user?.firstName} {user?.lastName}
          </span>
        </a>

        {/* ── DESKTOP MENU ── */}
        <ul
          className="hidden lg:flex items-center gap-[2px] list-none mx-3 flex-1 justify-center"
          role="menubar"
        >
          {navItems.map((item) => {
            const isOpen = openId === item.id;
            const isWide = !item.isSmall && item.dropdown.sections.length > 1;

            return (
              <li
                key={item.id}
                className="relative"
                role="none"
                onMouseEnter={() => openDrop(item.id)}
                onMouseLeave={closeDrop}
              >
                {/* Trigger */}
                <button
                  className={[
                    "flex items-center gap-[5px] px-[14px] py-[7px] rounded-[10px]",
                    "cursor-pointer border-none text-[rgba(255,255,255,0.82)]",
                    "text-[14px] font-normal tracking-[0.01em] whitespace-nowrap select-none",
                    "transition-all duration-[180ms] ease-in-out",
                    isOpen
                      ? "bg-[rgba(255,255,255,0.10)] text-white"
                      : "bg-transparent hover:bg-[rgba(255,255,255,0.06)] hover:text-white",
                  ].join(" ")}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    width="14"
                    height="14"
                    className={[
                      "flex-shrink-0 transition-all duration-[250ms] ease-in-out",
                      isOpen ? "rotate-180 opacity-90" : "opacity-50",
                    ].join(" ")}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Indicator dot */}
                <span
                  className={[
                    "absolute bottom-[-8px] left-1/2 -translate-x-1/2",
                    "w-[4px] h-[4px] rounded-full bg-[rgba(255,255,255,0.6)]",
                    "transition-transform duration-200",
                    isOpen ? "scale-100" : "scale-0",
                  ].join(" ")}
                  aria-hidden="true"
                />

                {/* Dropdown panel */}
                <div
                  className={[
                    // position
                    "absolute top-[calc(100%+12px)] left-1/2",
                    // shape & glass
                    "rounded-[20px] p-4",
                    "bg-[rgba(15,15,15,0.96)] border border-[rgba(255,255,255,0.08)]",


                    // min-width
                    isWide ? "min-w-[740px] xl:min-w-[620px]" : "min-w-[220px]",
                    // animation
                    "transition-all duration-[180ms] ease-in-out origin-top",
                    isOpen
                      ? "opacity-100 pointer-events-auto -translate-x-1/2 translate-y-0 scale-100"
                      : "opacity-0 pointer-events-none -translate-x-1/2 translate-y-2 scale-[0.98]",
                    "z-[300]",
                  ].join(" ")}
                  role="menu"
                  onMouseEnter={() => openDrop(item.id)}
                  onMouseLeave={closeDrop}
                >
                  {/* Arrow notch */}
                  <span
                    className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[10px] h-[6px] bg-[rgba(15,15,15,0.96)]"
                    style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    aria-hidden="true"
                  />

                  <div className="flex gap-1">
                    {item.dropdown.sections.map((sec, si) => (
                      <div
                        key={si}
                        className={[
                          "flex-1 min-w-[180px]",
                          si > 0
                            ? "border-l border-[rgba(255,255,255,0.06)] pl-3 ml-2"
                            : "",
                        ].join(" ")}
                      >
                        {sec.title && (
                          <span
                            className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[rgba(255,255,255,0.38)] px-[10px] pb-2"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {sec.title}
                          </span>
                        )}
                        {sec.items.map((di, dii) => (
                          <div
                            key={dii}
                            role="menuitem"
                            tabIndex={0}
                            className="flex items-start gap-[10px] px-[10px] py-[10px] rounded-[10px] cursor-pointer transition-colors duration-[150ms] hover:bg-[rgba(255,255,255,0.05)] group"
                          >
                            <div className="w-8 h-8 rounded-[8px] bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[14px] flex-shrink-0 mt-[1px]">
                              {di.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-medium text-[rgba(255,255,255,0.88)] leading-[1.3] mb-[2px]">
                                {di.title}
                              </div>
                              <div className="text-[11.5px] text-[rgba(255,255,255,0.38)] leading-[1.45]">
                                {di.desc}
                              </div>
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

        {/* ── CTA BUTTONS ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Login / Import — hidden on mobile */}
          <button
            onClick={() => navigate("/app/build-resume")}
            className={[
              "hidden md:inline-flex items-center justify-center",
              "h-[38px] px-4 rounded-[12px]",
              "text-[13px] font-semibold whitespace-nowrap",
              "bg-transparent text-[rgba(255,255,255,0.82)] border border-[rgba(255,255,255,0.08)]",
              "cursor-pointer transition-all duration-[160ms]",
              "hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.16)] hover:text-white",
            ].join(" ")}
          >
            Import Resume
          </button>

          {/* Primary CTA — hidden on xs */}
          <button
            onClick={() => navigate("/app/build-resume")}
            className={[
              "hidden sm:inline-flex items-center justify-center",
              "h-[38px] px-4 rounded-[12px]",
              "text-[13px] font-semibold whitespace-nowrap",
              "bg-white text-[#0a0a0a] border-0",
              "cursor-pointer transition-all duration-[160ms]",
              "hover:bg-[#e8e8e8] hover:-translate-y-[1px] ",
              "active:translate-y-0",
            ].join(" ")}
          >
            Create my Resume
          </button>

          {/* Hamburger */}
          <button
            className={[
              "lg:hidden flex items-center justify-center",
              "w-[38px] h-[38px] rounded-[10px]",
              "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)]",
              "cursor-pointer text-white transition-colors duration-[180ms]",
              "hover:bg-[rgba(255,255,255,0.10)]",
            ].join(" ")}
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5h14M2 9h14M2 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      <div
        className={[
          "fixed inset-0 bg-black/60 z-[190]",
          "transition-opacity duration-300",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ── MOBILE DRAWER ── */}
      <div
        className={[
          "fixed top-0 right-0 bottom-0 z-[300]",
          "flex flex-col overflow-y-auto",
          "w-[min(340px,92vw)]",
          "bg-[rgba(12,12,12,0.98)] border-l border-[rgba(255,255,255,0.08)]",
          "transition-transform duration-[280ms] ease-in-out",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[rgba(255,255,255,0.06)]">
          <a href="#" aria-label="Home" className="flex items-center gap-2 no-underline cursor-pointer">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-black flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L8 3l5 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.5 9.5h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <span
              className="font-bold text-[15px] tracking-[-0.02em] text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Resumé
            </span>
          </a>
          <button
            className={[
              "w-[34px] h-[34px] rounded-[9px] flex items-center justify-center",
              "bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)]",
              "cursor-pointer text-[rgba(255,255,255,0.7)] transition-colors duration-[150ms]",
              "hover:bg-[rgba(255,255,255,0.10)] hover:text-white",
            ].join(" ")}
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer nav items */}
        <div className="px-3 py-3 flex-1" role="menu">
          {navItems.map((item) => {
            const isOpen = openMobId === item.id;
            return (
              <div key={item.id} className="rounded-[12px] overflow-hidden mb-[2px]">
                <div
                  className={[
                    "flex items-center justify-between px-[14px] py-[13px]",
                    "cursor-pointer rounded-[12px] transition-colors duration-[150ms]",
                    isOpen
                      ? "bg-[rgba(255,255,255,0.05)] text-white"
                      : "text-[rgba(255,255,255,0.82)] hover:bg-[rgba(255,255,255,0.05)]",
                  ].join(" ")}
                  role="menuitem"
                  aria-expanded={isOpen}
                  onClick={() => toggleMob(item.id)}
                >
                  <span
                    className="text-[15px] font-normal"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    width="16"
                    height="16"
                    className={[
                      "flex-shrink-0 transition-all duration-[220ms] ease-in-out",
                      isOpen ? "rotate-180 opacity-80" : "opacity-40",
                    ].join(" ")}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Mobile sub-items */}
                <div
                  className={[
                    "overflow-hidden transition-all duration-300 ease-in-out px-1",
                    isOpen ? "max-h-[800px]" : "max-h-0",
                  ].join(" ")}
                >
                  {item.dropdown.sections.map((sec, si) => (
                    <div key={si}>
                      {sec.title && (
                        <div
                          className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[rgba(255,255,255,0.3)] px-[10px] pt-[10px] pb-1"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {sec.title}
                        </div>
                      )}
                      {sec.items.map((di, dii) => (
                        <div
                          key={dii}
                          role="menuitem"
                          tabIndex={0}
                          className="flex items-center gap-[10px] px-[10px] py-[9px] rounded-[9px] cursor-pointer mb-[1px] transition-colors duration-[150ms] hover:bg-[rgba(255,255,255,0.04)]"
                        >
                          <div className="text-[13px] w-[28px] h-[28px] flex items-center justify-center bg-[rgba(255,255,255,0.05)] rounded-[7px] flex-shrink-0">
                            {di.icon}
                          </div>
                          <span className="text-[13px] font-normal text-[rgba(255,255,255,0.75)]">
                            {di.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer footer */}
        <div className="px-4 pb-7 pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-col gap-2">
          <button
            onClick={() => navigate("/app/build-resume")}
            className={[
              "w-full flex items-center justify-center h-[42px] rounded-[12px]",
              "text-[14px] font-semibold cursor-pointer transition-all duration-[160ms]",
              "bg-transparent text-[rgba(255,255,255,0.82)] border border-[rgba(255,255,255,0.08)]",
              "hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.16)] hover:text-white",
            ].join(" ")}
          >
            Import Resume
          </button>
          <button
            onClick={() => navigate("/app/build-resume")}
            className={[
              "w-full flex items-center justify-center h-[42px] rounded-[12px]",
              "text-[14px] font-semibold cursor-pointer transition-all duration-[160ms]",
              "bg-white text-[#0a0a0a] border-0",
              "hover:bg-[#e8e8e8] hover:-translate-y-[1px] ",
              "active:translate-y-0",
            ].join(" ")}
          >
            Create my Resume
          </button>
        </div>
      </div>
    </div>
  );
}