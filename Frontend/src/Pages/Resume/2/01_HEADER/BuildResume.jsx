import BASE_URL from "@/Pages/auth/baseURL";
import { setRes } from "@/utils/resStore";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const STEPS = [
    {
        num: "01",
        title: "Build Your Career Profile",
        points: [
            "Add skills, projects, experience, and achievements once",
            "Create a permanent AI-powered career knowledge base",
            "Generate unlimited resumes from a single profile"
        ],
        icon: (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 7V12L14 16L3 12V7L10 3L21 7ZM3 7L14 11L21 7" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                <path d="M3 12V17L14 21L21 17V12" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>)
    },

    {
        num: "02",
        title: "Paste Any Job Description",
        points: [
            "AI analyzes recruiter requirements instantly",
            "Detects critical skills and keywords automatically",
            "Understands the context behind every role"
        ]
    },

    {
        num: "03",
        title: "Generate a Tailored Resume",
        points: [
            "ATS-optimized for the specific position",
            "Highlights the most relevant experience automatically",
            "Built to maximize interview opportunities"
        ]
    },

    {
        num: "04",
        title: "Create Matching Cover Letters",
        points: [
            "Personalized for every application",
            "Aligned with your resume and target company",
            "Ready in seconds without manual writing"
        ]
    },

    {
        num: "05",
        title: "Resume Defense AI™",
        points: [
            "Practice questions generated from YOUR resume",
            "Defend projects, achievements, and metrics confidently",
            "Train for role-specific interview scenarios"
        ]
    },

    {
        num: "06",
        title: "Interview Readiness Report",
        points: [
            "Identify weak answers before interviews",
            "Receive actionable improvement feedback",
            "Track confidence and preparation levels"
        ]
    },

    {
        num: "07",
        title: "Export & Apply",
        points: [
            "Download ATS-friendly PDFs instantly",
            "Generate multiple resume versions effortlessly",
            "Apply with confidence, not guesswork"
        ]
    },

    {
        num: "08",
        title: "Land Better Opportunities",
        points: [
            "Stand out in competitive applicant pools",
            "Showcase achievements with proof-backed stories",
            "Turn applications into interviews and offers"
        ]
    }
];


export default function HowItWorks() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const getResumeIfExist = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/build-resume/get-resume`, { withCredentials: true })

            if (res.data.success === true) {
                dispatch(setRes(res.data.data));
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getResumeIfExist();
    }, [])
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