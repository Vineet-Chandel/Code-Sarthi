import { useNavigate } from "react-router-dom";

const STEPS = [
    {
        num: "01",
        title: "Pick a Winning Template",
        points: [
            "ATS-optimized and recruiter-approved designs",
            "Modern, premium, and industry-specific layouts",
            "Built to maximize interview callbacks"
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
            </svg>
        ),
    },

    {
        num: "02",
        title: "Supercharge with AI",
        points: [
            "Generate powerful resume content instantly",
            "Turn weak bullet points into impact statements",
            "Eliminate writer’s block with smart AI suggestions"
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z" />
            </svg>
        ),
    },

    {
        num: "03",
        title: "Craft a Professional Resume",
        points: [
            "Build resumes trusted by top companies",
            "Highlight achievements with precision",
            "Stand out from thousands of applicants"
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path fill="#fff" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m8 18v-1c0-1.33-2.67-2-4-2s-4 .67-4 2v1zm-4-8a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"></path>
            </svg>
        ),
    },

    {
        num: "04",
        title: "Get AI Resume Analysis",
        points: [
            "Receive detailed resume scoring instantly",
            "Identify weaknesses before recruiters do",
            "Get personalized improvement recommendations"
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 16V8c0-.943 0-1.414-.293-1.707S12.943 6 12 6s-1.414 0-1.707.293S10 7.057 10 8v8c0 .943 0 1.414.293 1.707S11.057 18 12 18s1.414 0 1.707-.293S14 16.943 14 16m7-7V7c0-.943 0-1.414-.293-1.707S19.943 5 19 5s-1.414 0-1.707.293S17 6.057 17 7v2c0 .943 0 1.414.293 1.707S18.057 11 19 11s1.414 0 1.707-.293S21 9.943 21 9M7 14v-2c0-.943 0-1.414-.293-1.707S5.943 10 5 10s-1.414 0-1.707.293S3 11.057 3 12v2c0 .943 0 1.414.293 1.707S4.057 16 5 16s1.414 0 1.707-.293S7 14.943 7 14m5 7v-3m7-5v-2m-7-5V3m7 2V3M5 18v-2m0-6V8"></path>
            </svg>
        ),
    },

    {
        num: "05",
        title: "Generate Cover Letters",
        points: [
            "Create tailored cover letters in seconds",
            "Match company roles with AI precision",
            "Write confidently without starting from scratch"
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path fill="#fff" d="M18.7 3H5.3C4 3 3 4 3 5.3v13.4C3 20 4 21 5.3 21h13.4c1.3 0 2.3-1 2.3-2.3V5.3C21 4 20 3 18.7 3m.8 15.7c0 .4-.4.8-.8.8H5.3c-.4 0-.8-.4-.8-.8V5.3c0-.4.4-.8.8-.8h6.2v8.9l2.5-3.1l2.5 3.1V4.5h2.2c.4 0 .8.4.8.8z"></path>
            </svg>
        ),
    },

    {
        num: "06",
        title: "Learn from Top Developers",
        points: [
            "Get resume reviews from experienced developers",
            "Receive mentorship-driven career guidance",
            "Learn industry expectations from professionals"
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" />
            </svg>
        ),
    },

    {
        num: "07",
        title: "Export & Apply Anywhere",
        points: [
            "Download in PDF and Word formats",
            "Create unlimited resume variations",
            "Apply to jobs in under 5 minutes"
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
        ),
    },

    {
        num: "08",
        title: "Accelerate Your Career Growth",
        points: [
            "Build a resume that opens real opportunities",
            "Boost confidence for placements and internships",
            "Move one step closer to your dream company"
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13 2L3 14h7v8l10-12h-7z" />
            </svg>
        ),
    },
];


export default function HowItWorks() {
    const Navigate = useNavigate();
    return (
        <div className="bg-base-100 px-6">

            <div className="flex items-center justify-center gap-3 mb-8">
                <span
                    className="
    text-[42px]
    leading-tight
    sm:text-[52px]
    md:text-[64px]
    lg:text-[78px]
    xl:text-[92px]
    2xl:text-[100px]
    font-extrabold
    text-info
    tracking-tight
  "
                >
                    Here's how we get{" "}
                    <span className="text-white">
                        You Hired
                    </span>
                </span>

            </div>

            {/* eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex-1 max-w-[60px] h-px bg-base-300" />
                <span className="text-[10px] font-semibold tracking-[.18em] uppercase text-base-content/40">
                    how it works
                </span>
                <div className="flex-1 max-w-[60px] h-px bg-base-300" />
            </div>

            {/* grid — 1px gap on a base-300 background creates divider lines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-base-300 border border-base-300 rounded-box overflow-hidden">
                {STEPS.map((s) => (
                    <div
                        key={s.num}
                        className="group bg-base-200 hover:bg-[#1c1c1c] p-8 flex flex-col gap-5 transition-colors duration-200"
                    >
                        {/* icon + step number */}
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-full border border-base-300 flex items-center justify-center text-base-content group-hover:border-warning transition-colors duration-200">
                                {s.icon}
                            </div>
                            <span className="font-mono text-[11px] text-base-content/40 group-hover:text-warning pt-1 transition-colors duration-200">
                                {s.num}
                            </span>
                        </div>

                        <p className="text-[15px] font-semibold leading-snug">{s.title}</p>

                        <div className="w-6 h-px bg-base-300" />

                        <ul className="flex flex-col gap-2.5">
                            {s.points.map((p) => (
                                <li key={p} className="flex items-start gap-2 text-xs font-light text-base-content/40 group-hover:text-base-content/65 leading-relaxed transition-colors duration-200">
                                    <span className="w-1 h-1 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="w-full mt-10 pb-10 flex justify-center items-center gap-3">
                <div className="justify-self-center text-xl rounded-3xl text-white bg-secondary px-[40px] py-[10px] font-extrabold cursor-pointer" onClick={() => Navigate("/app/resume")}>Back</div>
                <div className="justify-self-center text-xl rounded-3xl text-black bg-white px-[40px] py-[10px] font-extrabold flex items-center gap-2 group cursor-pointer" onClick={() => Navigate("/app/build-resume/header-content")}>Continue <svg className="origin-left  group-hover:translate-x-2 transition-transform duration-500" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="#000" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"></path>
                </svg></div>
            </div>
        </div>
    );
}