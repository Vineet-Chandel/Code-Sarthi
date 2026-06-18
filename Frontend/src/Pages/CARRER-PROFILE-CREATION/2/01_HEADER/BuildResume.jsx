import BASE_URL from "@/Pages/auth/baseURL";
import { setRes } from "@/utils/resStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResumeGetHired from "../ResumeGetHired";
import Block from "../Block";
import { motion } from "framer-motion";

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
            setGlobalProfileLoading(true)
            const res = await axios.get(`${BASE_URL}/build-resume/get-resume`, { withCredentials: true })

            if (res.data.success === true) {
                dispatch(setRes(res.data.data));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setGlobalProfileLoading(false);
        }
    }

    useEffect(() => {
        getResumeIfExist();
    }, [])

    const [globalProfileLoading, setGlobalProfileLoading] = useState(false);
    return (
        <div className="bg-base-100  px-6">
            {globalProfileLoading && <div className='fixed bg-black/80 h-screen w-screen z-50 inset-0 flex items-center justify-center'>
                <motion.svg
                    animate={{
                        scale: [2, 1, 1, 1, 2, 2, 1, 1, 1, 2],
                        rotate: [0, 0, 0, 0, 180, 180, 0, 0, 0, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1056 3.44721L5.78885 6.10557C5.00831 6.49585 4.61803 6.69098 4.61803 7C4.61803 7.30902 5.00831 7.50415 5.78885 7.89443L11.1056 10.5528C11.5445 10.7722 11.7639 10.882 12 10.882C12.2361 10.882 12.4555 10.7722 12.8944 10.5528L18.2111 7.89443C18.9917 7.50415 19.382 7.30902 19.382 7C19.382 6.69098 18.9917 6.49585 18.2111 6.10557L12.8944 3.44721C12.4555 3.22776 12.2361 3.11803 12 3.11803C11.7639 3.11803 11.5445 3.22776 11.1056 3.44721Z" fill="#fff" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02217 10.4893C7.62603 10.8135 8.33716 11.169 9.15554 11.5782L10.2113 12.1061C11.0891 12.545 11.528 12.7644 12.0001 12.7644C12.4723 12.7644 12.9112 12.545 13.789 12.1061L14.8447 11.5782C15.6631 11.169 16.3742 10.8135 16.9781 10.4893L18.2113 11.1059C18.9918 11.4961 19.3821 11.6913 19.3821 12.0003C19.3821 12.3093 18.9918 12.5044 18.2113 12.8947L12.8946 15.5531C12.4557 15.7725 12.2362 15.8822 12.0001 15.8822C11.7641 15.8822 11.5446 15.7725 11.1057 15.5531L11.1057 15.5531L5.78898 12.8947C5.00844 12.5044 4.61816 12.3093 4.61816 12.0003C4.61816 11.6913 5.00844 11.4961 5.78898 11.1059L7.02217 10.4893Z" fill="#fff" />
                    <path




                        fill-rule="evenodd" clip-rule="evenodd" d="M7.02169 15.4893C7.62567 15.8135 8.33696 16.1692 9.15557 16.5785L10.2113 17.1063C11.0891 17.5452 11.528 17.7647 12.0001 17.7647C12.4723 17.7647 12.9112 17.5452 13.789 17.1063L14.8447 16.5785C15.6633 16.1692 16.3746 15.8135 16.9786 15.4893L18.2113 16.1056C18.9918 16.4959 19.3821 16.691 19.3821 17C19.3821 17.3091 18.9918 17.5042 18.2113 17.8945L12.8946 20.5528C12.4557 20.7723 12.2362 20.882 12.0001 20.882C11.7641 20.882 11.5446 20.7723 11.1057 20.5528L11.1057 20.5528L5.78898 17.8945C5.00844 17.5042 4.61816 17.3091 4.61816 17C4.61816 16.691 5.00844 16.4959 5.78898 16.1056L7.02169 15.4893Z" fill="#fff" />
                </motion.svg>
            </div>}
            <div className="flex items-center justify-center gap-3 pt-10 ">
                <span
                    className="
    text-2xl
    leading-tight
    sm:text-3xl
    md:text-4xl
    lg:text-5xl
    xl:text-6xl
    2xl:text-7xl
    font-extrabold
    text-info
    tracking-tight
  "
                >
                    Your Resume Starts With <br />
                    <span className="text-white">
                        Career Profile Generation
                    </span>
                </span>

            </div>

            {/* eyebrow */}

            <div className="w-full mt-10 pb-10 flex justify-center items-center gap-3">
                <div className="justify-self-center text-xl rounded-3xl text-white bg-secondary px-[40px] py-[10px] font-extrabold cursor-pointer" onClick={() => Navigate(-1)}>Back</div>
                <div className="justify-self-center text-xl rounded-3xl text-black bg-white px-[40px] py-[10px] font-extrabold flex items-center gap-2 group cursor-pointer" onClick={() => Navigate("/app/build-resume/header-content")}>Continue <svg className="origin-left  group-hover:translate-x-2 transition-transform duration-500" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="#000" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"></path>
                </svg></div>
            </div>
            <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex-1 max-w-[60px] h-px bg-base-300" />
                <span className="text-[10px] font-semibold tracking-[.18em] uppercase text-base-content/40">
                    how it works
                </span>
                <div className="flex-1 max-w-[60px] h-px bg-base-300" />
            </div>
            <div className="py-10">
                <ResumeGetHired />
                <Block />
            </div>


        </div>
    );
}