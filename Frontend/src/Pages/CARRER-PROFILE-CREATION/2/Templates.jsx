import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================
// UTILITY HOOKS
// ============================================================
function useIntersectionObserver(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.08, ...options });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, isVisible];
}

// ============================================================
// GRAIN TEXTURE & GLOW OVERLAY
// ============================================================
const GrainOverlay = () => (
    <>
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Subtle radial gradients in obsidian/dark neutral for depth */}
            <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[120px]" />
            <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[150px]" />
            <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-neutral-900/10 rounded-full blur-[120px]" />
        </div>
        <svg
            style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.035 }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
    </>
);

// ============================================================
// FILTER TAGS & METADATA WITH DETAILED DUMMY INFO
// ============================================================
const FILTER_TAGS = ["All", "Minimal", "Creative", "Modern", "Classic", "Bold"];

const templateMeta = [
    {
        id: 2,
        idxToSend: 1,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784819449/WSO_Investment_Banking_Resume_Free_Google_Docs_Template_ja5uw2.jpg",
        name: "Creative Minimal",
        tag: "Minimal",
        color: "#C4874B",
        atsScore: "99.8% ATS Pass Rate",
        subtitle: "Engineered for high-finance, banking, and strategic corporate recruitment.",
        description: "The Creative Minimal template bridges traditional rigor with modern aesthetic precision. Rooted in gold-standard corporate formatting, it leverages structural typography and measured whitespace to ensure your career milestones are instantly digestible for executive recruiters and automated screening algorithms alike.",
        bestFor: ["Investment Banking", "Management Consulting", "Private Equity", "Corporate Leadership"],
        highlights: [
            { title: "Strict Chronological Hierarchy", desc: "Structured around proven cognitive scanning patterns so decision-makers identify your core impact within seconds." },
            { title: "Zero-Loss ATS Parsing", desc: "Tested across top applicant tracking platforms including Greenhouse, Lever, and Workday with perfect data extraction." },
            { title: "Optimized Keyword Matrices", desc: "Dedicated competency and domain sections enable seamless integration of vital industry terminology." },
            { title: "Executive Whitespace Balance", desc: "Carefully proportioned margins and line heights prevent visual density fatigue during prolonged review sessions." }
        ],
        sections: [
            "Executive Summary",
            "Professional Experience",
            "Education & Academic Honors",
            "Financial Modeling & Certifications",
            "Core Competencies",
            "Key Deal Contributions",
            "Languages & Professional Affiliations",
            "Leadership & Activities"
        ],
        recruiterTip: "When applying to tier-one institutions, quantify every accomplishment bullet with dollar amounts, growth percentages, or efficiency metrics. This clean, distraction-free layout makes hard numbers jump off the page.",
        typography: "Inter & DM Sans · 11pt Content Body · 1.35 Line Height",
        layoutStyle: "Single-Column Executive · High Density · PDF/Word Native",
        userReview: {
            quote: "Switched to this exact layout for my recruitment cycle and received interview callbacks from four bulge-bracket banks within seven business days.",
            author: "Marcus Vance",
            role: "Senior Financial Analyst"
        }
    },
    {
        id: 5,
        idxToSend: 2,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784822995/Screenshot_2026-07-23_at_9.39.10_PM_wohjmk.png",
        name: "Clean Slate",
        tag: "Classic",
        color: "#A05C2C",
        atsScore: "100% Parser Compatible",
        subtitle: "Timeless clarity crafted for enterprise leadership and established institutions.",
        description: "Clean Slate brings refined traditionalism into the modern era. Designed specifically for seasoned professionals and enterprise specialists, it focuses on uncompromised legibility and clear categorization of extensive employment histories without relying on intrusive ornamental styling.",
        bestFor: ["Corporate Law", "Enterprise Architecture", "Senior Operations", "Healthcare Administration"],
        highlights: [
            { title: "Timeless Institutional Layout", desc: "Respects the formal conventions of traditional industries while introducing modern typographic hierarchy." },
            { title: "High-Volume Experience Management", desc: "Engineered to condense multi-decade career tracks into a cohesive, perfectly aligned presentation." },
            { title: "Prominent Qualification Framing", desc: "Places critical professional licenses, bar admissions, or medical board certifications front and center." },
            { title: "Flawless Print & Screen Compatibility", desc: "Rendered with high contrast ratios that look immaculate whether viewed on OLED tablets or printed in executive boardroom dossiers." }
        ],
        sections: [
            "Professional Synopsis",
            "Chronological Work History",
            "Board Memberships & Licenses",
            "Academic Credentials",
            "Regulatory Compliance",
            "Strategic Leadership",
            "Published Treatises & Speaking",
            "Professional References"
        ],
        recruiterTip: "For seasoned executives, prioritize your achievements in the top third of the document. Use the Professional Synopsis section to explicitly state your value proposition before diving into chronological roles.",
        typography: "Merriweather & Outfit · 10.5pt Content Body · 1.4 Line Height",
        layoutStyle: "Traditional Classical · Modular Alignment · Universal ATS",
        userReview: {
            quote: "As a director navigating corporate leadership roles, I needed a template that conveyed gravitas without feeling archaic. Clean Slate delivered perfectly.",
            author: "Elena Rostova",
            role: "VP of Global Operations"
        }
    },
    {
        id: 6,
        idxToSend: 3,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784831970/Screenshot_2026-07-24_at_12.08.55_AM_z7wj79.png",
        name: "Clean Modern",
        tag: "Modern",
        color: "#7A8C4E",
        atsScore: "99.6% ATS Match Rate",
        subtitle: "Built for technologists, software engineers, and agile startup pioneers.",
        description: "Clean Modern is tailored for fast-paced tech ecosystems. Utilizing intelligent modular division and bold section headers, it allows hiring hiring managers and engineering leads to rapidly scan tech stacks, repository contributions, and quantifiable product impact.",
        bestFor: ["Software Engineering", "Product Management", "Data Science & AI", "DevOps & Cloud Systems"],
        highlights: [
            { title: "Tech Stack Front-Loading", desc: "Prominently categorizes languages, frameworks, cloud infrastructures, and developer tooling for technical recruiters." },
            { title: "Agile Impact Bullet Formatting", desc: "Optimized for Problem-Action-Result (PAR) storytelling with bolded lead keywords." },
            { title: "Smart Sectional Zoning", desc: "Creates distinct logical compartments that guide the human eye effortlessly down the page." },
            { title: "GitHub & Portfolio Integration", desc: "Cleanly accommodates inline digital hyperlinks for code repositories, deployed architectures, and interactive portfolios." }
        ],
        sections: [
            "Technical Skills Matrix",
            "Engineering Experience",
            "Featured Software Projects",
            "Education & Computer Science",
            "Open Source Contributions",
            "Patents & Hackathons",
            "Algorithmic Problem Solving",
            "DevOps & Security Clearances"
        ],
        recruiterTip: "Group your technical competencies by category (e.g., Languages, Frameworks, Infrastructure) rather than listing a raw paragraph of keywords. Recruiters filter engineering candidates by core proficiency sets.",
        typography: "JetBrains Mono & DM Sans · 11pt Body · 1.3 Line Height",
        layoutStyle: "Modern Tech Grid · High Contrast Headers · Parser Safe",
        userReview: {
            quote: "This layout made presenting my microservice projects and AWS architecture certifications effortless. Recruiter response rate doubled within weeks.",
            author: "David Thorne",
            role: "Principal Staff Engineer"
        }
    },
    {
        id: 7,
        idxToSend: 4,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784830138/Screenshot_2026-07-23_at_11.38.50_PM_ofo5zt.png",
        name: "Creative Contrast",
        tag: "Creative",
        color: "#8B5E3C",
        atsScore: "98.9% ATS Compatibility",
        subtitle: "Bold aesthetic separation for brand managers, designers, and growth marketers.",
        description: "Creative Contrast breaks free from monotonous layouts by employing strong typographic separation and dynamic spacing. It gives design leaders, content strategists, and marketing executives a compelling platform that proves visual ingenuity can coexist seamlessly with rigorous ATS readability.",
        bestFor: ["Creative Direction", "Brand Marketing", "UX/UI Design", "Content & Media Strategy"],
        highlights: [
            { title: "Dynamic Visual Contrast", desc: "Leverages decisive font pairings and confident weight variances to establish unmistakable visual anchors." },
            { title: "Campaign Impact Callouts", desc: "Designed to spotlight key performance indicators, engagement metrics, and growth trajectories." },
            { title: "Aesthetic Independence", desc: "Provides a bespoke design-agency feel while maintaining standard text tables that parsers read effortlessly." },
            { title: "Portfolio Showcase Ready", desc: "Dedicated structure for exhibition highlights, media features, brand redesigns, and creative awards." }
        ],
        sections: [
            "Creative Vision Statement",
            "Campaign Experience & Leadership",
            "Design Systems & Tooling",
            "Brand Strategy & Growth KPI",
            "Selected Works & Exhibitions",
            "Industry Recognition & Awards",
            "Formal Education & Workshops",
            "Client Consultations"
        ],
        recruiterTip: "For creative roles, balance your artistic presentation with hard commercial results. Mention how your design initiatives increased retention, conversion rates, or organic brand impressions.",
        typography: "Syne & Plus Jakarta Sans · 11pt Body · 1.4 Line Height",
        layoutStyle: "Bespoke Contrast · Editorial Alignment · ATS Optimized",
        userReview: {
            quote: "Finding a creative CV that doesn't get rejected by automated HR filters is nearly impossible. Creative Contrast is the holy grail for design leaders.",
            author: "Chloé Saint-Laurent",
            role: "Global Brand Director"
        }
    },
    {
        id: 8,
        idxToSend: 5,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784826697/Screenshot_2026-07-23_at_10.41.23_PM_kk0gd5.png",
        name: "Cool Overlay",
        tag: "Bold",
        color: "#4A6741",
        atsScore: "99.1% ATS Pass Rate",
        subtitle: "Confident presence for strategic visionaries, entrepreneurs, and transformation leads.",
        description: "Cool Overlay commands immediate attention with an authoritative header hierarchy and resolute content framing. Created for ambitious change-makers and venture builders, this layout conveys confidence, operational clarity, and forward momentum without sacrificing professional refinement.",
        bestFor: ["Venture Capital & Founders", "Product Ownership", "Agile Scrum Masters", "Business Transformation"],
        highlights: [
            { title: "Commanding Executive Header", desc: "Establishes immediate personal brand presence with bold name framing and instant contact accessibility." },
            { title: "Strategic Roadmap Layout", desc: "Structures past career phases as milestones in a proven trajectory of corporate transformation." },
            { title: "High-Impact Metric Highlights", desc: "Visual spacing intentionally isolates financial figures, growth multiples, and turnaround statistics." },
            { title: "Zero-Clutter Information Flow", desc: "Eliminates superfluous fluff to present a crisp, high-signal narrative for time-strapped executives." }
        ],
        sections: [
            "Strategic Leadership Manifesto",
            "Executive Career Milestones",
            "Venture & Portfolio Oversight",
            "Key Board Advisory Roles",
            "Operational Tooling & Metrologies",
            "Academic Foundation",
            "Global Keynote Appearances",
            "Investor References"
        ],
        recruiterTip: "When stepping into leadership positions, focus on team scale, budgetary responsibility, and systemic organizational shifts rather than daily task execution.",
        typography: "Outfit & Inter font suite · 11.5pt Body · 1.35 Line Height",
        layoutStyle: "Bold Executive Framer · Direct Hierarchy · PDF Ready",
        userReview: {
            quote: "Used this template to present my venture growth portfolio to a board of directors. The bold formatting conveyed executive authority immediately.",
            author: "Vikram Mehta",
            role: "Managing Partner & VP of Growth"
        }
    },
    {
        id: 9,
        idxToSend: 6,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784827771/Screenshot_2026-07-23_at_10.59.10_PM_pdvcrs.png",
        name: "Modern Functional",
        tag: "Modern",
        color: "#3D6B72",
        atsScore: "99.5% ATS Match Rate",
        subtitle: "Precision engineering for technical directors, operations architects, and systems thinkers.",
        description: "Modern Functional organizes multifaceted career data into a streamlined, highly efficient document architecture. Designed for engineering directors and complex project managers, it excels at categorizing parallel technical initiatives, cross-functional mentorship, and deep specialized knowledge.",
        bestFor: ["Solutions Architecture", "Technical Program Management", "System Operations", "Supply Chain Engineering"],
        highlights: [
            { title: "Functional Skill Clustering", desc: "Enables natural grouping of distinct domains such as DevOps, People Management, and Financial Oversight." },
            { title: "Modular Milestone Dividers", desc: "Sharp horizontal demarcation allows scanning eyes to instantly separate disparate employment eras." },
            { title: "High-Density Data Endurance", desc: "Engineered to display comprehensive technical certifications and tooling suites without looking crowded." },
            { title: "Universal Parser Formatting", desc: "Strict semantic ordering guarantees smooth parsing into corporate HR management platforms." }
        ],
        sections: [
            "Technical Summary & Vision",
            "Systems Architectural Track Record",
            "Core Competencies & Toolchains",
            "Cloud Certifications (AWS/GCP)",
            "Cross-Functional Leadership",
            "Academic Degrees in Engineering",
            "Standardization & Open RFCs",
            "Patents & Innovations"
        ],
        recruiterTip: "If you have transitioned between different technical specializations, use functional competency groupings at the top to tie your diverse expertise into a coherent executive story.",
        typography: "Roboto & JetBrains font suite · 10.5pt Body · 1.3 Line Height",
        layoutStyle: "Functional Engineered Grid · Precision Spacing · ATS Approved",
        userReview: {
            quote: "Managing distributed cloud architectures across three companies required a very clean formatting strategy. Modern Functional handled my complex experience effortlessly.",
            author: "Sarah Jenkins",
            role: "Head of Cloud Architecture"
        }
    },
    {
        id: 10,
        idxToSend: 7,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784828253/Screenshot_2026-07-23_at_11.07.25_PM_plujfe.png",
        name: "Classic Module",
        tag: "Classic",
        color: "#7B5C8A",
        atsScore: "99.9% ATS Match Rate",
        subtitle: "Distinguished organization for academia, clinical scientific research, and legal counsel.",
        description: "Classic Module brings rigorous order to extensive credentials. Purpose-built for PhD researchers, medical clinicians, university professors, and senior corporate counsel, this structure accommodates lengthy publication rosters, grant funding awards, and legal bar admissions with immaculate grace.",
        bestFor: ["Academic Research & Professorships", "Clinical Medicine & Surgery", "Litigation & General Counsel", "Public Policy & Economics"],
        highlights: [
            { title: "Academic & Clinical Precision", desc: "Tailored spacing explicitly designed to showcase peer-reviewed journal articles and scientific clinical trials." },
            { title: "Credential-Forward Framing", desc: "Prioritizes postgraduate degrees, board fellowships, and legal jurisdictions at the strategic apex." },
            { title: "Unbroken Narrative Flow", desc: "Structured to transition smoothly across multiple pages when extensive publication dossiers are required." },
            { title: "Zero Formatting Artifacts", desc: "Free from fragile text-boxes or floating tables, ensuring 100% fidelity across all university and government submission portals." }
        ],
        sections: [
            "Academic & Professional Overview",
            "University Teaching & Professorships",
            "Peer-Reviewed Publications & Grants",
            "Clinical Trials & Laboratory Expertise",
            "Doctoral & Postdoctoral Education",
            "Professional Board Licenses & Ethics",
            "Invited Symposium Lectureships",
            "Academic Committee Leadership"
        ],
        recruiterTip: "When formatting academic or clinical curricula vitae for corporate R&D transition, ensure your direct commercial or patent impact is summarized in the opening profile paragraph.",
        typography: "Times New Roman Modern & DM Sans · 11pt Body · 1.4 Line Height",
        layoutStyle: "Modular Academic CV · Multi-Page Resilient · Ultra ATS Safe",
        userReview: {
            quote: "As a principal investigator moving from academia to biopharmaceutical leadership, I needed a format that honored my research papers while highlighting executive impact. Perfect match.",
            author: "Dr. Aris Thorne, MD PhD",
            role: "VP of Clinical Research"
        }
    },
    {
        id: 11,
        idxToSend: 8,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784828456/Screenshot_2026-07-23_at_11.10.49_PM_nyihrk.png",
        name: "Simple Linear",
        tag: "Minimal",
        color: "#C49A3C",
        atsScore: "100% ATS Pass Rate",
        subtitle: "Uncomplicated elegance for high-impact individual contributors and agile specialists.",
        description: "Simple Linear represents the perfection of minimalism. By pruning away every distracting design flourish, it leaves an uncorrupted chronological runway that highlights what matters most: your career trajectory, core technical skills, and verified professional triumphs.",
        bestFor: ["Full-Stack Developers", "Data Analysts", "Financial Controllers", "Agile Project Coordinators"],
        highlights: [
            { title: "Pure Chronological Runway", desc: "Presents your employment journey with crystal-clear continuity and effortless readability." },
            { title: "Maximum Keyword Visibility", desc: "Unencumbered text formatting ensures recruitment scanners register every relevant competency with high weighting." },
            { title: "Instant Recruiter Digestibility", desc: "Removes visual friction so time-constrained talent scouts can approve your candidacy in record time." },
            { title: "Universal Print & Export Fidelity", desc: "Guaranteed to look identical across PDF viewers, mobile phones, and text-based HR preview consoles." }
        ],
        sections: [
            "Professional Summary",
            "Employment Trajectory",
            "Technical Skills Inventory",
            "Higher Education",
            "Key Industry Certifications",
            "Professional Recognition & Honors",
            "Volunteer Leadership",
            "Languages & Interests"
        ],
        recruiterTip: "In linear minimalist templates, consistency in your date formatting and bullet structure is paramount. Keep verb tense active and lead every bullet with an action verb.",
        typography: "DM Sans & DM Mono · 11pt Content Body · 1.35 Line Height",
        layoutStyle: "Ultra-Minimal Linear · Zero Ornamentation · Universal ATS",
        userReview: {
            quote: "Sometimes simplest really is unbeatable. I stripped away my colorful two-column resume for Simple Linear and immediately landed offers from two FAANG companies.",
            author: "Lucas Vance",
            role: "Senior Full-Stack Developer"
        }
    },
    {
        id: 12,
        idxToSend: 9,
        Component: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784823538/Screenshot_2026-07-23_at_9.48.38_PM_gghcae.png",
        name: "Executive Linear",
        tag: "Minimal",
        color: "#C49A3C",
        atsScore: "99.9% ATS Pass Rate",
        subtitle: "Strategic executive elevation for vice presidents, directors, and corporate board members.",
        description: "Executive Linear is calibrated specifically for senior institutional authority. Offering wider section breathing room and prominent achievement callouts, it transforms standard work history into a compelling presentation of business scalability, revenue milestones, and global team mentorship.",
        bestFor: ["Executive Vice Presidents", "Managing Directors", "Chief Operating Officers", "Board Advisors"],
        highlights: [
            { title: "Executive Authority Framing", desc: "Optimized spacing conveys seniority, executive poise, and uncompromised confidence at a glance." },
            { title: "Revenue & P&L Spotlight Architecture", desc: "Designed to prominently anchor large-scale fiscal responsibilities and turnaround figures." },
            { title: "Global Team Oversight Structure", desc: "Cleanly presents multi-regional operational leadership and organizational restructuring triumphs." },
            { title: "Flawless Executive Search Suitability", desc: "Preferred formatting style among top boutique executive search firms and headhunters worldwide." }
        ],
        sections: [
            "Executive Value Proposition",
            "Senior Leadership Record",
            "Board Advisory & Corporate Governance",
            "Fiscal Oversight & M&A Activity",
            "Global Education & Executive MBA",
            "Keynote Speeches & Thought Leadership",
            "Professional Affiliations",
            "Executive References"
        ],
        recruiterTip: "At the executive level, recruiters evaluate strategic foresight and organizational governance over functional tasks. Emphasize legacy building, enterprise scale, and long-term valuation growth.",
        typography: "Inter Executive Suite · 11.5pt Body · 1.4 Line Height",
        layoutStyle: "Executive Chronological · Premium Spacing · Universal ATS",
        userReview: {
            quote: "When working with executive recruiters for C-suite roles, formatting cleanliness is scrutinized heavily. Executive Linear gave my career dossier the polished weight it needed.",
            author: "Kathleen O'Shea",
            role: "Chief Marketing Officer"
        }
    }
];

// ============================================================
// ANIMATED TEMPLATE CARD (DARK THEME WITH #0A0A0A)
// ============================================================
function TemplateCard({ item, index, onSelect, isFavorite, onToggleFavorite }) {
    const [cardRef, isVisible] = useIntersectionObserver();
    const [hovered, setHovered] = useState(false);
    const Navigate = useNavigate();

    return (
        <div
            ref={cardRef}
            onClick={() => onSelect(item)}
            className="group relative flex flex-col cursor-pointer transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                backgroundColor: "#0a0a0a",
                border: hovered ? "1px solid #555555" : "1px solid #1f1f1f",
                boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.05)" : "0 10px 30px rgba(0,0,0,0.6)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Tag badge in top left */}
            <div className="absolute top-3 left-3 z-20 px-3.5 py-1 rounded-full text-[11px] font-bold font-mono tracking-widest uppercase bg-[#0a0a0a]/90 text-neutral-200 border border-[#2a2a2a] backdrop-blur-md shadow-lg">
                {item.tag}
            </div>

            {/* Favorite button in top right */}
            <button
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#0a0a0a]/90 border border-[#2a2a2a] hover:border-white text-white flex items-center justify-center transition-all transform hover:scale-110 active:scale-90 shadow-lg backdrop-blur-md"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                }}
                title={isFavorite ? "Remove from saved" : "Save template"}
            >
                <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 transition-transform duration-300"
                    fill={isFavorite ? "#ffffff" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </button>

            {/* Resume Image Preview with hover overlay */}
            <div className="relative overflow-hidden aspect-[1/1.3] bg-[#050505] flex items-top justify-center">
                <img
                    src={item.Component}
                    alt={item.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Smooth Dark Backdrop & CTA on Hover */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-4 transition-all duration-500 ease-in-out"
                    style={{
                        background: hovered ? "radial-gradient(circle, rgba(10,10,10,0.75) 0%, rgba(5,5,5,0.88) 100%)" : "transparent",
                        opacity: hovered ? 1 : 0,
                        backdropFilter: hovered ? "blur(4px)" : "blur(0px)"
                    }}
                >
                    <p className="text-xs font-mono text-neutral-300 uppercase tracking-widest text-center opacity-90 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {item.atsScore}
                    </p>

                    {/* THE MOST IMPORTANT BUTTON -> WHITE WITH BLACK TEXT */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            Navigate(`/app/final-resume`, { state: { idx: item.idxToSend } });
                        }}
                        className="w-4/5 py-3.5 px-6 rounded-xl font-extrabold text-sm text-black bg-white shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:bg-neutral-200 hover:scale-105 active:scale-95 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                        <span>Use This Template</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(item);
                        }}
                        className="w-4/5 py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-[#0a0a0a] border border-[#333333] hover:border-neutral-500 hover:bg-[#141414] transition-all duration-300 transform translate-y-6 group-hover:translate-y-0 text-center"
                    >
                        Inspect Deep Details →
                    </button>
                </div>
            </div>

            {/* Card Footer with #0a0a0a styling */}
            <div
                className="p-5 flex items-center justify-between gap-4 border-t border-[#1f1f1f] bg-[#0a0a0a] group-hover:bg-[#0e0e0e] transition-colors duration-300"
            >
                <div className="flex flex-col truncate">
                    <span className="font-extrabold text-base text-white truncate group-hover:text-blue-400 transition-colors">
                        {item.name}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono mt-1 flex items-center gap-2 truncate">
                        <span>Template #{item.id}</span>
                        <span>•</span>
                        <span className="truncate">{item.layoutStyle.split('·')[0]}</span>
                    </span>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141414] border border-[#262626] text-[11px] font-mono font-bold text-emerald-400 shadow-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ATS</span>
                </div>
            </div>
        </div>
    );
}

// ============================================================
// STICKY SPLIT-VIEW DETAIL MODAL
// Left side stays sticky holding the template while right side scrolls through rich info
// ============================================================
function PreviewModal({ item, onClose, onNext, onPrev }) {
    const Navigate = useNavigate();

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "auto";
        };
    }, [onClose, onNext, onPrev]);

    if (!item) return null;

    return (
        <div
            className="fixed inset-0 z-50  bg-black/95 backdrop-blur-xl p-3 sm:p-6 md:p-8 lg:p-12 flex justify-center selection:bg-white selection:text-black animate-fadeIn h-[100vh] overflow-y-auto scrollbar-none"
            onClick={onClose}
        >
            {/* Modal Box */}
            <div
                className="relative w-full max-w-7xl bg-[#0a0a0a] border border-[#222222] rounded-3xl p-6 sm:p-8 md:p-12 text-white  my-auto transition-all duration-500 overflow-y-auto scrollbar-none"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── HEADER BAR ── */}
                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f1f1f]">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                                {item.name}
                            </h2>
                            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-[#141414] border border-[#2a2a2a] text-neutral-300">
                                {item.tag}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                {item.atsScore}
                            </span>
                        </div>
                        <p className="text-sm text-neutral-400 font-mono mt-2">
                            Template #{item.id} • {item.subtitle || "Premium corporate formatting with verified ATS parsing alignment."}
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                            onClick={onPrev}
                            title="Previous Template (←)"
                            className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#2b2b2b] text-neutral-300 hover:text-white hover:border-white flex items-center justify-center font-mono text-lg transition-all transform active:scale-90 shadow-md"
                        >
                            ←
                        </button>
                        <button
                            onClick={onNext}
                            title="Next Template (→)"
                            className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#2b2b2b] text-neutral-300 hover:text-white hover:border-white flex items-center justify-center font-mono text-lg transition-all transform active:scale-90 shadow-md"
                        >
                            →
                        </button>
                        <button
                            onClick={onClose}
                            title="Close Modal (Esc)"
                            className="w-10 h-10 ml-2 rounded-xl bg-[#141414] border border-[#333333] hover:border-red-500 text-neutral-300 hover:text-red-400 flex items-center justify-center font-mono text-xl leading-none transition-all transform active:scale-90 shadow-md"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* ── STICKY SPLIT LAYOUT ── 
                    Left side holding the template (sticky on desktop) while right side scrolls through all details 
                */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">

                    {/* LEFT COLUMN: STICKY TEMPLATE PREVIEW */}
                    <div className="lg:col-span-5 lg:sticky lg:top-8 flex flex-col gap-6">
                        <div className="relative rounded-2xl overflow-hidden border border-[#242424] bg-[#000000] shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
                            <img
                                src={item.Component}
                                alt={item.name}
                                className="w-full h-auto max-h-[72vh] object-contain object-top transition-transform duration-700 hover:scale-[1.03]"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-between items-end opacity-90">
                                <span className="text-[11px] font-mono text-neutral-400">HIGH RESOLUTION ATS PREVIEW</span>
                                <span className="text-[11px] font-mono text-emerald-400 font-bold">PDF / DOCX READY</span>
                            </div>
                        </div>

                        {/* Sticky left-side CTA card with #0a0a0a theme & WHITE primary button */}
                        <div className="p-6 bg-[#0e0e0e] border border-[#222222] rounded-2xl flex flex-col gap-4 shadow-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">Ready to build?</span>
                                <span className="text-xs font-bold text-neutral-400 font-mono">Template #{item.id} Selected</span>
                            </div>

                            {/* MOST IMPORTANT BUTTON -> PURE WHITE */}
                            <button
                                onClick={() => Navigate(`/app/final-resume`, { state: { idx: item.idxToSend } })}
                                className="w-full py-4 px-6 rounded-xl bg-white text-black font-extrabold text-base text-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                <span>Use This Template Now</span>
                                <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>

                            <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-[#1a1a1a]">
                                <span className="text-[11px] text-neutral-400 font-mono flex items-center justify-center gap-1">
                                    <span className="text-emerald-400">✔</span> Instant Export
                                </span>
                                <span className="text-[11px] text-neutral-400 font-mono flex items-center justify-center gap-1">
                                    <span className="text-emerald-400">✔</span> Recruiter Approved
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SCROLLING RICH DUMMY DATA */}
                    <div className="lg:col-span-7 flex flex-col gap-8 text-neutral-200 pb-10">

                        {/* Overview Section */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                Architectural Overview
                            </h3>
                            <p className="text-neutral-300 leading-relaxed text-base">
                                {item.description || "Designed with cognitive scanning efficiency in mind, this layout optimizes structured whitespace to present your achievements with high executive signal."}
                            </p>
                        </div>

                        {/* Best For Tags */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-400 font-bold">
                                Recommended Career Paths & Industries
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                                {(item.bestFor || ["Executive Leadership", "Consulting & Strategy", "Technology & Engineering", "Product Management"]).map((role, i) => (
                                    <div key={i} className="px-4 py-2 rounded-xl bg-[#141414] border border-[#262626] text-neutral-200 text-sm font-medium flex items-center gap-2 shadow-inner">
                                        <span className="text-blue-400 font-bold text-xs">#</span>
                                        <span>{role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Engineered Highlights Grid */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                Engineered Features & Advantages
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {(item.highlights || [
                                    { title: "ATS Optimized", desc: "Built with standard semantic table hierarchy for flawless machine parsing." },
                                    { title: "Recruiter Tested", desc: "Measures up against standard executive recruitment guidelines." },
                                    { title: "High Data Density", desc: "Presents extensive career milestones without visual clutter." },
                                    { title: "Universal Exports", desc: "Maintains exact layout ratios across PDF, Word, and Print." }
                                ]).map((hl, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] hover:border-[#383838] transition-all flex flex-col gap-2 shadow-lg group">
                                        <div className="flex items-center gap-2 text-white font-bold text-sm">
                                            <span className="w-6 h-6 rounded-lg bg-[#181818] border border-[#333] flex items-center justify-center text-xs text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {i + 1}
                                            </span>
                                            <span>{hl.title}</span>
                                        </div>
                                        <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                                            {hl.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sections Included breakdown */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white tracking-tight">
                                    Included Template Sections
                                </h3>
                                <span className="text-xs font-mono text-neutral-400">
                                    {(item.sections && item.sections.length) || 8} DETAILED SECTIONS
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {(item.sections || [
                                    "Professional Summary", "Work Experience", "Core Skills Matrix",
                                    "Education & Honors", "Technical Tooling", "Projects & Initiatives",
                                    "Certifications", "Languages & Interests"
                                ]).map((sec, idx) => (
                                    <div key={idx} className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#1f1f1f] flex items-center justify-between font-mono text-xs text-neutral-300 hover:text-white transition-colors">
                                        <span className="flex items-center gap-2.5 truncate">
                                            <span className="text-emerald-400 font-bold">✔</span>
                                            <span className="truncate">{sec}</span>
                                        </span>
                                        <span className="text-neutral-600 font-bold text-[10px]">0{idx + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recruiter Tip Box */}
                        <div className="p-6 rounded-2xl bg-[#111111] border-l-4 border-l-white border-t border-r border-b border-[#262626] shadow-2xl relative my-2">
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="text-xl">💡</span>
                                <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
                                    Recruiter Advisory Insight
                                </h4>
                            </div>
                            <p className="text-sm text-neutral-300 leading-relaxed pl-1 italic font-sans">
                                "{item.recruiterTip || "Always keep your formatting strictly single-column for automated screening systems. Ensure action verbs lead every bullet point, and quantify your achievements with clear commercial metrics."}"
                            </p>
                        </div>

                        {/* Typography & Layout Specs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] flex flex-col gap-2">
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">TYPOGRAPHY & METRICS</span>
                                <span className="text-sm font-bold text-white">{item.typography || "Inter & DM Sans · 11pt Body"}</span>
                                <span className="text-[11px] text-neutral-500">Optically balanced line-heights for rapid executive review.</span>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#202020] flex flex-col gap-2">
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">ARCHITECTURE & FORMAT</span>
                                <span className="text-sm font-bold text-white">{item.layoutStyle || "Modular Chronological · ATS Safe"}</span>
                                <span className="text-[11px] text-neutral-500">Fully compatible with digital application parsers and PDF converters.</span>
                            </div>
                        </div>

                        {/* User Review / Testimonial */}
                        {item.userReview && (
                            <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#242424] flex flex-col gap-4 shadow-xl">
                                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                    {"★★★★★"}
                                    <span className="ml-2 text-xs text-neutral-400 font-mono">VERIFIED USER TESTIMONIAL</span>
                                </div>
                                <p className="text-sm text-neutral-200 italic leading-relaxed">
                                    "{item.userReview.quote}"
                                </p>
                                <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a] text-xs font-mono">
                                    <span className="font-bold text-white">{item.userReview.author}</span>
                                    <span className="text-neutral-400">{item.userReview.role}</span>
                                </div>
                            </div>
                        )}

                        {/* ── BOTTOM ACTION AREA ── */}
                        <div className="p-8 rounded-3xl bg-[#0f0f0f] border border-[#2a2a2a] text-center flex flex-col items-center gap-5 mt-6 shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-black text-white">
                                    Ready to make an extraordinary first impression?
                                </h3>
                                <p className="text-sm text-neutral-400 max-w-xl mx-auto">
                                    Select this template to open our real-time interactive resume builder and populate your career milestones instantly.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 w-full pt-2">
                                {/* THE MOST IMPORTANT BUTTON -> WHITE WITH BLACK TEXT */}
                                <button
                                    onClick={() => Navigate(`/app/final-resume`, { state: { idx: item.idxToSend } })}
                                    className="px-10 py-4 rounded-xl bg-white text-black font-extrabold text-base shadow-[0_0_40px_rgba(255,255,255,0.35)] hover:bg-neutral-200 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <span>Use {item.name} Template →</span>
                                </button>

                                <button
                                    onClick={onNext}
                                    className="px-6 py-4 rounded-xl bg-[#171717] border border-[#333333] text-neutral-300 hover:text-white hover:border-white font-bold text-sm transition-all flex items-center gap-2"
                                >
                                    <span>Explore Next Template</span>
                                    <span className="font-mono">→</span>
                                </button>
                            </div>
                            <span className="text-xs font-mono text-neutral-500">
                                Press ← → keys to cycle templates • Esc to return to gallery
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================
// STATS BAR
// ============================================================
function StatsBar({ total, filtered, favorites }) {
    return (
        <div className="flex flex-wrap items-center gap-6 text-sm font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e0e0e] border border-[#222]">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-neutral-200 font-bold">{filtered} of {total}</span>
                <span className="text-neutral-500">templates matching</span>
            </div>
            {favorites > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e0e0e] border border-[#222]">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-neutral-200 font-bold">{favorites}</span>
                    <span className="text-neutral-500">saved to bookmarks</span>
                </div>
            )}
        </div>
    );
}

// ============================================================
// MAIN COMPONENT (SMOOTH DARK THEME WITH #0A0A0A & BLACK BACKGROUND)
// ============================================================
const Templates = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [previewItem, setPreviewItem] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const Navigate = useNavigate();

    const filtered = templateMeta.filter((t) => {
        const matchFilter = activeFilter === "All" || t.tag === activeFilter;
        const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (t.bestFor && t.bestFor.some(role => role.toLowerCase().includes(searchQuery.toLowerCase())));
        const matchFav = !showFavoritesOnly || favorites.has(t.id);
        return matchFilter && matchSearch && matchFav;
    });

    const toggleFavorite = (id) => {
        setFavorites((prev) => {
            const n = new Set(prev);
            n.has(id) ? n.delete(id) : n.add(id);
            return n;
        });
    };

    const previewIndex = previewItem ? filtered.findIndex((t) => t.id === previewItem.id) : -1;
    const goNext = () => filtered[(previewIndex + 1) % filtered.length] && setPreviewItem(filtered[(previewIndex + 1) % filtered.length]);
    const goPrev = () => filtered[(previewIndex - 1 + filtered.length) % filtered.length] && setPreviewItem(filtered[(previewIndex - 1 + filtered.length) % filtered.length]);

    return (
        <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-white selection:text-black relative pb-24">
            <GrainOverlay />

            {/* ── HERO HEADER ── */}
            <div className="relative overflow-hidden text-center pt-8 pb-4 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col items-center w-full">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a] border border-[#222222] text-neutral-300 text-xs font-mono mb-6 shadow-xl backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>ATS-VERIFIED EXECUTIVE TEMPLATE SUITE</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase">
                        Choose Your <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-600 bg-clip-text text-transparent">Template</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg md:text-xl text-neutral-400 mt-5 max-w-2xl lg:max-w-3xl flex items-center justify-center gap-2.5 font-normal leading-relaxed">
                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" className="text-blue-500 shrink-0 transition-transform duration-500 hover:rotate-180">
                            <path fill="currentColor" d="M10.565 2.075a3.33 3.33 0 0 1 2.87 0c.394.189.755.497 1.26.928l.079.066c.48.41.939.604 1.58.655l.102.008c.662.053 1.135.09 1.547.236a3.33 3.33 0 0 1 2.03 2.029c.145.412.182.885.235 1.547l.008.102c.051.641.246 1.1.655 1.58l.066.078c.431.506.74.867.928 1.261a3.33 3.33 0 0 1 0 2.87c-.189.394-.497.755-.928 1.26l-.066.079c-.418.49-.605.951-.655 1.58l-.008.102c-.053.662-.09 1.135-.236 1.547a3.33 3.33 0 0 1-2.029 2.03c-.412.145-.885.182-1.547.235l-.102.008c-.641.051-1.1.246-1.58.655l-.079.066c-.505.431-.866.74-1.26.928a3.33 3.33 0 0 1-2.87 0c-.394-.189-.755-.497-1.26-.928l-.079-.066a2.56 2.56 0 0 0-1.58-.655l-.102-.008c-.662-.053-1.135-.09-1.547-.236a3.33 3.33 0 0 1-2.03-2.029c-.145-.412-.182-.885-.235-1.547l-.008-.102a2.56 2.56 0 0 0-.655-1.58l-.066-.079c-.431-.505-.74-.866-.928-1.26a3.33 3.33 0 0 1 0-2.87c.189-.394.497-.755.928-1.26l.066-.079a2.56 2.56 0 0 0 .655-1.58l.008-.102c.053-.662.09-1.135.236-1.547a3.33 3.33 0 0 1 2.029-2.03c.412-.145.885-.182 1.547-.235l.102-.008a2.56 2.56 0 0 0 1.58-.655l.078-.066c.506-.431.867-.74 1.261-.928m3.232 6.12a.75.75 0 1 0-1.45-.39l-2.143 8a.75.75 0 0 0 1.449.39zm1.641.974a.75.75 0 1 0-1.06 1.06l.131.132c.527.526.867.869 1.085 1.155c.205.268.23.396.23.484s-.025.216-.23.484c-.218.286-.558.629-1.085 1.155l-.131.131a.75.75 0 1 0 1.06 1.06l.167-.166c.482-.48.895-.894 1.181-1.27c.307-.402.537-.846.537-1.394s-.23-.992-.537-1.394c-.286-.376-.7-.79-1.18-1.27zm-5.816 0a.75.75 0 0 0-1.06 0l-.167.167c-.481.48-.895.894-1.181 1.27c-.307.402-.537.846-.537 1.394s.23.992.537 1.394c.286.376.7.79 1.18 1.27l.168.167a.75.75 0 0 0 1.06-1.06l-.131-.132c-.527-.526-.867-.869-1.085-1.155c-.205-.268-.23-.396-.23-.484s.025-.216.23-.484c.218-.286.558-.629 1.085-1.155l.131-.131a.75.75 0 0 0 0-1.061"></path>
                        </svg>
                        <span>Select any template below to explore comprehensive structural details and instant customization.</span>
                    </p>

                    {/* Navigation Pills styled in #0a0a0a */}
                    <div className="flex flex-wrap justify-center gap-3.5 mt-8 w-full">
                        <button
                            onClick={() => Navigate("/app/interview-arena")}
                            className="w-full sm:w-auto min-w-[200px] rounded-full bg-[#0a0a0a] border border-[#222222] hover:border-white/50 px-6 py-3.5 text-neutral-300 hover:text-white text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg transform hover:scale-[1.02]"
                        >
                            <span>Interview Arena</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                        </button>

                        <button
                            onClick={() => Navigate("/app/resume-examples")}
                            className="w-full sm:w-auto min-w-[200px] rounded-full bg-[#0a0a0a] border border-[#222222] hover:border-white/50 px-6 py-3.5 text-neutral-300 hover:text-white text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg transform hover:scale-[1.02]"
                        >
                            <span>Live Examples</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                        </button>

                        <button
                            onClick={() => Navigate("/app/build-resume/preview-content")}
                            className="w-full sm:w-auto min-w-[200px] rounded-full bg-[#0a0a0a] border border-[#222222] hover:border-white/50 px-6 py-3.5 text-neutral-300 hover:text-white text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg transform hover:scale-[1.02]"
                        >
                            <span>Your Career Profile</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── STICKY CONTROLS BAR (REDESIGNED IN #0A0A0A WITH DARK THEME) ── */}
            <div className="sticky top-4 z-40 max-w-7xl mx-auto w-[93%] sm:w-[95%] px-4 py-3.5 mt-6 mb-8 bg-[#0a0a0a]/95 backdrop-blur-xl rounded-2xl border border-[#222222] shadow-[0_12px_45px_rgba(0,0,0,0.9)] transition-all flex flex-wrap items-center justify-between gap-4">

                {/* Search Input */}
                <div className="relative flex-1 min-w-[220px] sm:max-w-xs">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search roles, styles, tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#282828] focus:border-white bg-[#000000] text-sm text-white placeholder-neutral-500 font-mono outline-none transition-all"
                    />
                </div>

                {/* Filter Tags in Dark Mode */}
                <div className="flex flex-wrap items-center gap-2">
                    {FILTER_TAGS.map((tag) => {
                        const isSel = activeFilter === tag;
                        return (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-extrabold transition-all duration-200 ${isSel
                                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105"
                                    : "bg-[#000000] border border-[#222] text-neutral-400 hover:text-white hover:border-[#444]"
                                    }`}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>

                {/* Right utility buttons */}
                <div className="flex items-center gap-3 ml-auto sm:ml-0">
                    {/* Favorites toggle */}
                    <button
                        onClick={() => setShowFavoritesOnly((v) => !v)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 ${showFavoritesOnly
                            ? "bg-red-950/70 text-white border border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                            : "bg-[#000000] border border-[#222] text-neutral-300 hover:text-white hover:border-[#444]"
                            }`}
                    >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill={showFavoritesOnly ? "#ff4040" : "none"} stroke="currentColor" strokeWidth="2.2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>Saved {favorites.size > 0 && `(${favorites.size})`}</span>
                    </button>

                    {/* View Mode switcher */}
                    <div className="hidden sm:flex items-center gap-1 p-1 bg-[#000000] border border-[#222222] rounded-xl">
                        {[
                            {
                                mode: "grid", icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                        <g fill="currentColor">
                                            <rect width="6.5" height="6.5" x="3.75" y="13.75" rx="1.5" />
                                            <rect width="6.5" height="6.5" x="13.75" y="13.75" rx="1.5" />
                                            <rect width="6.5" height="6.5" x="3.75" y="3.75" rx="1.5" />
                                            <rect width="6.5" height="6.5" x="13.75" y="3.75" rx="1.5" />
                                        </g>
                                    </svg>
                                )
                            },
                            {
                                mode: "wide", icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19 5H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z" />
                                    </svg>
                                )
                            }
                        ].map(({ mode, icon }) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${viewMode === mode ? "bg-[#1f1f1f] text-white shadow" : "text-neutral-500 hover:text-neutral-300"
                                    }`}
                                title={mode === "grid" ? "Standard Grid" : "Wide Showcase"}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN TEMPLATE GALLERY GRID ── */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">

                {/* Results Stats & Clear Search */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#181818] flex-wrap">
                    <StatsBar total={templateMeta.length} filtered={filtered.length} favorites={favorites.size} />
                    {(searchQuery || showFavoritesOnly || activeFilter !== "All") && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setShowFavoritesOnly(false);
                                setActiveFilter("All");
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-[#141414] border border-[#333] hover:border-neutral-400 text-neutral-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5"
                        >
                            <span>✕ Reset all filters</span>
                        </button>
                    )}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="text-center py-28 px-4 border border-[#1b1b1b] rounded-3xl bg-[#080808] my-8 shadow-2xl">
                        <div className="w-16 h-16 mx-auto rounded-full bg-[#141414] border border-[#2b2b2b] flex items-center justify-center text-2xl mb-4 text-neutral-500">
                            🔍
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No templates matched your criteria</h3>
                        <p className="text-sm text-neutral-500 font-mono max-w-md mx-auto mb-6">
                            We couldn't find any templates matching "{searchQuery || activeFilter}". Try expanding your filter parameters or exploring all categories.
                        </p>
                        <button
                            onClick={() => {
                                setActiveFilter("All");
                                setSearchQuery("");
                                setShowFavoritesOnly(false);
                            }}
                            className="px-6 py-3 rounded-xl bg-white text-black font-extrabold text-sm shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-neutral-200 transition-all transform hover:scale-105"
                        >
                            Show All Templates
                        </button>
                    </div>
                )}

                {/* Cards Grid */}
                <div className="grid gap-6 sm:gap-8 transition-all duration-500"
                    style={{
                        gridTemplateColumns: viewMode === "grid"
                            ? "repeat(auto-fill, minmax(360px, 1fr))"
                            : "repeat(auto-fill, minmax(480px, 1fr))",
                    }}
                >
                    {filtered.map((item, index) => (
                        <TemplateCard
                            key={item.id}
                            item={item}
                            index={index}
                            onSelect={setPreviewItem}
                            isFavorite={favorites.has(item.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            </div>

            {/* ── STICKY DETAILS PREVIEW MODAL ── */}
            {previewItem && (
                <PreviewModal
                    item={previewItem}
                    onClose={() => setPreviewItem(null)}
                    onNext={goNext}
                    onPrev={goPrev}
                />
            )}
        </div>
    );
};

export default Templates;