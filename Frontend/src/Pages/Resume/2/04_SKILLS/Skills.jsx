import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Temp1 from "../../3/Temp1";
import axios from "axios";
import BASE_URL from '../../../auth/baseURL';
import { Slice } from 'lucide-react';
import Toast from '../Toast';
import { AnimatePresence } from "framer-motion";
import ProgressMeter from '../ProgressMeter';
import Header from '../Header';
import Step from '../Step';
import Preview from '../Preview';

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





const Education = ({ data }) => {
    const location = useLocation();
    let resumeData = location.state?.resumeData || {};


    const [skills, setSkills] = useState(
        resumeData?.skills?.length > 0
            ? resumeData.skills.map((s) => ({
                id: crypto.randomUUID(),
                skillCategory: s.skillCategory,
                skills: s.skills.split(", "),
                inputValue: "",
            }))
            : [
                {
                    id: crypto.randomUUID(),
                    skillCategory: "",
                    skills: [],
                    inputValue: "",
                }
            ]
    );

    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);


    const [SkillCategory, setSkillCategory] = useState("");
    const [modalOpen, setModalOpen] = useState(false);




    const finalResumeData = useMemo(() => ({
        ...resumeData,



        skills: skills.map(s => ({
            skillCategory: s.skillCategory,
            skills: s.skills.join(", ")
        })),


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
                    <Step index={3} />

                    <ProgressMeter index={3} resumeData={finalResumeData} />

                    <button
                        onClick={() => setSidebarOpen((p) => !p)}
                        className={`flex items-center gap-2 text-lg font-medium px-3 py-1.5 rounded-lg border transition-all duration-200
                        ${sidebarOpen
                                ? "bg-secondary text-secondary-content border-secondary-content"
                                : "bg-base-100 text-secondary border-secondary "
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2c4.714 0 7.071 0 8.535 1.464c1.08 1.08 1.364 2.647 1.439 5.286L22 9.5H2.026v-.75c.075-2.64.358-4.205 1.438-5.286C4.93 2 7.286 2 12 2" opacity={0.5}></path>
                            <path fill="currentColor" d="M13 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                            <path fill="currentColor" d="M2 12c0 4.714 0 7.071 1.464 8.535c1.01 1.01 2.446 1.324 4.786 1.421L9 22V9.5H2.026l-.023.75Q2 11.066 2 12" opacity={0.7}></path>
                            <path fill="currentColor" d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22c-.819 0-2.316 0-3-.008V9.5h13l-.003.75Q22 11.066 22 12"></path>
                        </svg>
                        {sidebarOpen ? "Hide" : "Preview"}
                    </button>
                </div>

                {/* ── body ── */}
                <div className={`grid transition-all duration-500 ${sidebarOpen ? "lg:grid-cols-[1fr_500px]" : "grid-cols-1"}`}>


                    {/* ── LEFT: form ── */}
                    <div className="p-6 md:p-10 border border-slate-700 ">
                        <Header index={3} />

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
                        <Preview resumeData={resumeData} activeTab={activeTab} setActiveTab={setActiveTab} />
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

export default Education;