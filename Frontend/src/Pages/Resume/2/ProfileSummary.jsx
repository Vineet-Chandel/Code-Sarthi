import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Temp1 from "../3/Temp1";
import axios from "axios";
import BASE_URL from '../../auth/baseURL';
import { Slice } from 'lucide-react';
import Toast from './Toast';
import { AnimatePresence } from "framer-motion";
// ─── tiny hook ────────────────────────────────────────────────────────────────
function useIntersectionObserver(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08, ...options }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, isVisible];
}

// ─── reusable field ───────────────────────────────────────────────────────────





const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
            <AnimatePresence>
                {toasts.map((t) => (
                    <Toast
                        key={t.id}
                        {...t}
                        onClose={() => removeToast(t.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};



// ─── tip item ─────────────────────────────────────────────────────────────────
const TipItem = ({ emoji, title, body }) => (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-none">
        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0 text-sm">
            {emoji}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
            <span className="text-slate-800 font-semibold">{title}: </span>
            {body}
        </p>
    </div>
);

const Summary = ({ data }) => {
    const location = useLocation();
    let resumeData = location.state?.resumeData || {};
    const [skills, setSkills] = useState([
        {
            id: crypto.randomUUID(),
            skillCategory: "",
            skills: [],
            inputValue: "",
        }
    ]);


    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);


    const [SkillCategory, setSkillCategory] = useState("");
    const [modalOpen, setModalOpen] = useState(false);




    const finalResumeData = useMemo(() => ({
        ...resumeData,

        summaryBody: "",
        degree: "",
        major: "",
        institution: "",
        gradDate: "",

        skills: skills.map(s => ({
            skillCategory: s.skillCategory,
            skills: s.skills.join(", ")
        })),

        projects: [],
        certifications: [],
        achievements: [],
        languages: ["English (Fluent)", "Hindi (Native)"],
    }), [resumeData, skills]);

    const Navigate = useNavigate();




    const handleChange2 = (index, id, value) => {
        setSkills(prev =>
            prev.map((exp, i) =>
                i === index ? { ...exp, [id]: value } : exp
            )
        );
    };
    const addSkills = () => {
        setSkills(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                skillCategory: "",
                skills: [],
                inputValue: "",
            }
        ]);
    };

    const [toasts, setToasts] = useState([]);


    const [isAiworking, setIsAiworking] = useState(false);





    const bulletspoints = async (selectedCategory) => {
        try {
            setIsAiworking(true);
            const response = await axios.post(
                `${BASE_URL}/generate-skills`,
                { category: selectedCategory, }
            );

            setCommonSkills(response.data.data);


        } catch (err) {
            console.error(err?.message || err);
        } finally {
            setIsAiworking(false);
        }
    };







    const addSkillToCategory = (index, value) => {
        if (!value.trim()) return;

        setSkills(prev =>
            prev.map((s, i) => {
                if (i !== index) return s;

                const alreadyExists = s.skills.some(
                    skill =>
                        skill.toLowerCase() === value.toLowerCase()
                );

                if (alreadyExists) return s;

                return {
                    ...s,
                    skills: [...s.skills, value]
                };
            })
        );
    };


    const removeSkill = (categoryIndex, skillIndex) => {
        setSkills(prev =>
            prev.map((s, i) =>
                i === categoryIndex
                    ? {
                        ...s,
                        skills: s.skills.filter((_, j) => j !== skillIndex)
                    }
                    : s
            )
        );
    };
    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };


    const [commonSkills, setCommonSkills] = useState([]);
    const [points, setpoints] = useState([]);
    const [skillIndex, setSkillIndex] = useState("");
    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-start justify-center p-4 md:p-6 bg-base-100">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="w-full bg-base-100 rounded-3xl border border-slate-100 overflow-hidden border border-slate-700" >

                {/* ── top bar ── */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-base-200 border-b border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-base-100 text-secondary">
                        Step 3 of 6
                    </span>

                    {/* progress dots */}
                    <div className="flex items-center gap-1.5">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-300 ${i === 0 || i === 1 || i === 2
                                    ? "w-2 h-2 bg-primary"
                                    : i === 3
                                        ? "w-5 h-2 bg-secondary"
                                        : "w-2 h-2 bg-neutral"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setSidebarOpen((p) => !p)}
                        className={`flex items-center gap-2 text-lg font-medium px-3 py-1.5 rounded-lg border transition-all duration-200
                        ${sidebarOpen
                                ? "bg-secondary text-secondary-content border-secondary-content"
                                : "bg-base-100 text-secondary border-secondary "
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16">
                            <path fill="currentColor" d="M3.5 2A2.5 2.5 0 0 0 1 4.5v7A2.5 2.5 0 0 0 3.5 14h9a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 12.5 2zM2 4.5A1.5 1.5 0 0 1 3.5 3h9A1.5 1.5 0 0 1 14 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5zM3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm9 0H4v1h8zM8 9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm4 0H9v2h3zM3.5 8a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM3 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"></path>
                        </svg>
                        {sidebarOpen ? "Hide" : "Preview"}
                    </button>
                </div>

                {/* ── body ── */}
                <div className={`grid transition-all duration-500 ${sidebarOpen ? "lg:grid-cols-[1fr_500px]" : "grid-cols-1"}`}>


                    {/* ── LEFT: form ── */}
                    <div className="p-6 md:p-10 border border-slate-700 ">
                        <div className="mb-7 ">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2 leading-tight">
                                We recommend including  {" "}
                                <span className="text-accent">6-8 skills</span>.
                            </h1>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                                Choose skills that align with the job requirements. Show employers you're confident of the work you do!

                            </p>
                        </div>

                        <div className="space-y-5 mt-8">
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.id}
                                    className="bg-base-200 border border-slate-700 rounded-3xl p-5"
                                >

                                    {modalOpen && <div className='h-screen w-screen bg-black/70 fixed flex items-center justify-center z-30 inset-0 ' onClick={() => {
                                        points.forEach((point) => {
                                            if (skills[index].skills.length >= 20) {
                                                addToast({
                                                    type: "error",
                                                    title: "Exceeded Limit",
                                                    message: "Could not add more skills."
                                                });
                                                return;
                                            }
                                            addSkillToCategory(skillIndex, point);

                                        }); setpoints([]); setSkillCategory(""); setModalOpen(false);
                                    }}>
                                        <div className='w-[70%] h-[70%] bg-base-100 rounded-3xl p-10 flex flex-col gap-5 border-4 border-base-300' onClick={(e) => e.stopPropagation()}>
                                            <div className='text-2xl font-bold'>Category <mark className='bg-secondary text-secondary-content p-2 rounded-xl px-5'>{SkillCategory}</mark> ,</div>
                                            <div className="flex h-full gap-3">
                                                <div className="w-3/4 flex flex-col gap-5">
                                                    here is the list of common skills in this category :
                                                    <div className='bg-base-200 w-full rounded-3xl h-full border-2 border-slate-700 p-5'>

                                                        {isAiworking ? (<div className='flex flex-col justify-center items-center h-full w-full  gap-2'>
                                                            <div className='flex justify-center items-center gap-2'>
                                                                <h1 className="text-5xl font-bold text-[#884f06] mb-2 leading-tight text-center ">Shastra</h1>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" className='mb-3'>
                                                                    <path fill="#884f06" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                                                </svg>
                                                            </div>
                                                            <h1 className="text-xl font-medium text-[#884f06] mb-2 leading-tight text-center ">AI Is Generating Your  Bullet Points, Please Wait...</h1>
                                                            <div className="animate-pulse flex flex-col items-center gap-3">
                                                                <div className="h-4 w-40 bg-[#884f06]/30 rounded"></div>
                                                                <div className="h-4 w-56 bg-[#884f06]/20 rounded"></div>
                                                            </div>
                                                        </div>) : (
                                                            <div className='grid grid-cols-3 gap-2 overflow-y-auto h-[100%] px-5 py-3'>
                                                                {commonSkills.map((skill, index) => (
                                                                    <button
                                                                        key={skill.id}
                                                                        onClick={() => {
                                                                            if (points.includes(skill.skill)) {
                                                                                addToast({
                                                                                    type: "error",
                                                                                    title: "Error",
                                                                                    message: "You already added this skill"
                                                                                });
                                                                            } if (skill.skill.length > 0 && !points.includes(skill.skill)) { setpoints(prev => [...prev, skill.skill]); }
                                                                        }}
                                                                        className='bg-base-300 border border-slate-700 rounded-2xl px-3.5 py-2.5 text-sm text-slate-800 outline-none hover:border-secondary hover:ring-4 hover:ring-accent hover:bg-white transition-all duration-200 font-medium flex items-center gap-2 cursor-pointer'
                                                                    >
                                                                        <span className='p-2 bg-base-100 border border-slate-500 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 48 48" >
                                                                            <path fill="#0d1422ff" d="M24 5a1.5 1.5 0 0 1 1.5 1.5v16h16a1.5 1.5 0 0 1 0 3h-16v16a1.5 1.5 0 0 1-3 0v-16h-16a1.5 1.5 0 0 1 0-3h16v-16A1.5 1.5 0 0 1 24 5"></path>
                                                                        </svg></span> <span> {skill.skill}</span>
                                                                    </button>
                                                                ))}
                                                            </div>)}
                                                    </div>
                                                </div>
                                                <div className="w-1/4 bg-base-200 p-5 rounded-3xl border border-slate-700">
                                                    <h1 className='text-lg font-bold'>Skills Summary</h1>
                                                    {points.map((point, index) => (
                                                        <div
                                                            key={skill.id}
                                                            className="bg-base-300 border border-slate-700 rounded-2xl px-3 py-2 text-sm mt-2"
                                                        >
                                                            {point}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>}
                                    {/* Category Input */}
                                    <div className="flex justify-between items-start gap-5 flex-col ">
                                        <input

                                            type="text"
                                            placeholder="Skill Category (Frontend, Backend...)"
                                            value={skill.skillCategory}
                                            onChange={(e) =>

                                                handleChange2(index, "skillCategory", e.target.value)
                                            }
                                            className="w-full  bg-base-200 border border-slate-900 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none
                 focus:border-secondary focus:ring-4 focus:ring-accent focus:bg-white
                 transition-all duration-200 font-medium placeholder:text-slate-500"

                                        />
                                        <button className='bg-secondary border border-secondary hover:bg-base-100 text-base-100 hover:text-secondary px-3 py-2 rounded-xl mt-3 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out group' onClick={() => {

                                            if (skill.skillCategory.trim() === "") {

                                                addToast({
                                                    type: "error",
                                                    title: "Error",
                                                    message: "Please fill Skill Category  "
                                                });
                                                return;
                                            }
                                            setSkillIndex(index);
                                            setSkillCategory(skill.skillCategory)
                                            setModalOpen(true)
                                            bulletspoints(skill.skillCategory)
                                        }}>

                                            <div className='flex justify-center items-center gap-2 bg-base-100 p-2 rounded-xl group-hover:bg-secondary group-hover:text-base-100 transition-all duration-300 ease-in-out'>
                                                <h1 className="text-xl font-bold text-secondary leading-tight text-center group-hover:text-base-100 transition-all duration-300 ease-in-out">Shastra</h1>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='text-secondary group-hover:text-base-100'>
                                                    <path fill="currentColor" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                                </svg>
                                            </div>
                                            Generate skills</button>
                                    </div>

                                    {/* Skills Chips */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {skill.skills.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="px-3 py-1.5 rounded-full bg-secondary text-secondary-content text-sm flex items-center gap-2"
                                            >
                                                {item}

                                                <button
                                                    onClick={() => removeSkill(index, idx)}
                                                    className="hover:text-red-300"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add Skill */}
                                    <div className="flex items-center w-full justify-between gap-10 ">
                                        < input
                                            key={skill.id}
                                            type="text"
                                            placeholder="Press Enter to add skill"
                                            className="w-full bg-base-200 border border-slate-900 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none
                 focus:border-secondary focus:ring-4 focus:ring-accent focus:bg-white
                 transition-all duration-200 font-medium placeholder:text-slate-500"


                                            value={skill.inputValue}
                                            onChange={(e) =>
                                                handleChange2(index, "inputValue", e.target.value)
                                            } onKeyDown={(e) => {
                                                if (e.key !== "Enter") return;

                                                e.preventDefault();

                                                if (skills[index].skills.length >= 20) {
                                                    addToast({
                                                        type: "error",
                                                        title: "Exceeded Limit",
                                                        message: "Could not add more skills."
                                                    });
                                                    return;

                                                }
                                                addSkillToCategory(index, skill.inputValue);

                                                handleChange2(index, "inputValue", "");
                                            }}
                                        />
                                        <button className="mt-4 px-4 py-3 rounded-xl flex gap-2 items-center justify-center border border-slate-600 bg-secondary text-secondary-content font-semibold" onClick={() => {

                                            if (skills[index].skills.length > 20) {
                                                addToast({
                                                    type: "error",
                                                    title: "Exceeded Limit",
                                                    message: "Could not add more skills."
                                                });
                                                return;

                                            }
                                            addSkillToCategory(index, skill.inputValue);

                                            handleChange2(index, "inputValue", "");
                                        }}>Enter <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                <path fill="#f8cb82ff" d="M19 6a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H7.41l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l3 3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L7.41 14H17a3 3 0 0 0 3-3V7a1 1 0 0 0-1-1"></path>
                                            </svg></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addSkills}
                            className="mt-5 px-5 py-3 rounded-2xl bg-secondary text-secondary-content font-semibold hover:scale-[1.02] transition-all"
                        >
                            + Add Skill Category
                        </button>

                    </div>

                    {/* ── RIGHT: sidebar ── */}
                    {sidebarOpen && (
                        <div className="flex flex-col bg-base-200 border border-slate-700">
                            {/* tabs */}
                            <div className="flex border-b border-slate-900">
                                {["preview", "tips", "score"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3.5 text-lg font-semibold capitalize transition-all duration-200 border-b-2
                                ${activeTab === tab
                                                ? "text-secondary border-secondary bg-base-100"
                                                : "text-slate-700 border-transparent hover:text-slate-600"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* ── PREVIEW tab ── */}
                            {activeTab === "preview" && (

                                <div
                                    className="
                            relative
                            flex
                            items-start
                            justify-center
                            rounded-xl
                            overflow-hidden
                            bg-white
                            shadow-2xl
                            border
                            border-slate-200
                            transition-all
                            duration-500
py-1
                            "
                                >
                                    {/* Resume Scaling Wrapper */}
                                    <div
                                        className="
                origin-top
                scale-[0.61]
                sm:scale-[0.64]
                md:scale-[0.69]
                lg:scale-[0.74]
                xl:scale-[0.80]
                transition-transform
                duration-500
            "
                                    >
                                        <Temp1 data={finalResumeData} />
                                    </div>
                                </div>
                            )}

                            {/* ── TIPS tab ── */}
                            {activeTab === "tips" && (
                                <div className="p-4 overflow-y-auto">
                                    <TipItem emoji="✉️" title="Professional email" body="Use name.work@gmail.com — avoid nicknames or random numbers." />
                                    <TipItem emoji="☎️" title="Country code" body="Always include +91 (or your code) for international recruiters." />
                                    <TipItem emoji="🏙️" title="City only" body="List city and country — a full street address wastes prime resume space." />
                                    <TipItem emoji="🔗" title="LinkedIn URL" body="Customise your URL (linkedin.com/in/yourname) for a cleaner link." />
                                    <TipItem emoji="📸" title="Photo" body="In India, a professional headshot is generally expected by recruiters." />
                                    <TipItem emoji="💼" title="Portfolio" body="Link your portfolio or GitHub — it adds credibility for tech roles." />
                                </div>
                            )}



                        </div>
                    )}
                </div>


                {/* ── footer ── */}
                <div className="flex items-center justify-end px-6 md:px-10 py-4 bg-base-200 border-t border-slate-700">

                    <button
                        onClick={() => {
                            Navigate("/app/build-resume/intro-summary-page", {
                                state: { resumeData: finalResumeData }
                            });
                        }}
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-base-300 text-secondary border-2 border-secondary
                       hover:bg-secondary hover:text-secondary-content  hover:border-base-100 active:scale-95 transition-all duration-200 "
                    >
                        Next: Profile Summary
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5m11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"></path>
                        </svg>
                    </button>
                </div>
            </div >
        </div >
    )
}

export default Summary;