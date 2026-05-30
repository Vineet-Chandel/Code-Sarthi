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
        <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
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
            <div className="w-full bg-base-100 rounded-3xl  overflow-hidden border border-slate-700" >

                {/* ── top bar ── */}
                <div className="flex flex-col min-[480px]:flex-row items-center justify-around min-[480px]:justify-center gap-5 min-[480px]:gap-3 bg-base-200 px-2 py-3.5 border-b border-slate-700 sm:px-5">
                    {/* Step Counter */}
                    <span className="w-full flex justify-center min-[480px]:justify-start min-[480px]:w-1/5">
                        <Step index={3} />
                    </span>

                    {/* Progress Meter Container */}
                    <span className="flex min-[480px]:w-[70%] justify-center  w-full min-[480px]:justify-end sm:w-3/5 ">
                        <ProgressMeter index={3} resumeData={resumeData} />
                    </span>

                    {/* Sidebar Toggle Button Container */}
                    <span className="hidden w-1/5 justify-end sm:flex">
                        <button
                            onClick={() => setSidebarOpen((p) => !p)}
                            className={`
        flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 justify-self-end sm:text-base
        ${sidebarOpen
                                    ? "bg-secondary-content text-base-100 border-secondary"
                                    : "bg-base-100 text-secondary-content border-secondary"
                                }
      `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2c4.714 0 7.071 0 8.535 1.464c1.08 1.08 1.364 2.647 1.439 5.286L22 9.5H2.026v-.75c.075-2.64.358-4.205 1.438-5.286C4.93 2 7.286 2 12 2" opacity={0.5}></path>
                                <path fill="currentColor" d="M13 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                                <path fill="currentColor" d="M2 12c0 4.714 0 7.071 1.464 8.535c1.01 1.01 2.446 1.324 4.786 1.421L9 22V9.5H2.026l-.023.75Q2 11.066 2 12" opacity={0.7}></path>
                                <path fill="currentColor" d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22c-.819 0-2.316 0-3-.008V9.5h13l-.003.75Q22 11.066 22 12"></path>
                            </svg>
                            {sidebarOpen ? "Hide" : "Preview"}
                        </button>
                    </span>
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
                                                                <h1 className="text-5xl font-bold text-[#ffffff] mb-2 leading-tight text-center ">Shastra</h1>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" className='mb-3'>
                                                                    <path fill="#ffffff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                                                </svg>
                                                            </div>
                                                            <h1 className="text-xl font-medium text-[#ffffff] mb-2 leading-tight text-center ">AI Is Generating Your  Bullet Points, Please Wait...</h1>
                                                            <div className="animate-pulse flex flex-col items-center gap-3">
                                                                <div className="h-4 w-40 bg-[#ffffff]/30 rounded"></div>
                                                                <div className="h-4 w-56 bg-[#ffffff]/20 rounded"></div>
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
                                                                                    title: "Oh Snap!",
                                                                                    message: "You already added this skill"
                                                                                });
                                                                            } if (skill.skill.length > 0 && !points.includes(skill.skill)) { setpoints(prev => [...prev, skill.skill]); }
                                                                        }}
                                                                        className='bg-base-300 border border-slate-700 rounded-2xl px-3.5 py-2.5 text-sm text-white hover:text-base-100 outline-none hover:border-secondary hover:ring-4 hover:ring-accent hover:bg-white transition-all duration-200 font-medium flex items-center gap-2 cursor-pointer'
                                                                    >
                                                                        <span className='p-2 bg-base-100 border border-slate-500 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 48 48" >
                                                                            <path fill="#ffffff" d="M24 5a1.5 1.5 0 0 1 1.5 1.5v16h16a1.5 1.5 0 0 1 0 3h-16v16a1.5 1.5 0 0 1-3 0v-16h-16a1.5 1.5 0 0 1 0-3h16v-16A1.5 1.5 0 0 1 24 5"></path>
                                                                        </svg></span> <span > {skill.skill}</span>
                                                                    </button>
                                                                ))}
                                                            </div>)}
                                                    </div>
                                                </div>
                                                <div className="w-1/4 bg-base-200 p-5 rounded-3xl border border-slate-700">
                                                    <h1 className='text-lg font-bold'>Selected Skills</h1>
                                                    {points.map((point, index) => (
                                                        <div
                                                            key={skill.id}
                                                            className="bg-base-300 border border-slate-700 rounded-2xl px-3 py-2 text-sm mt-2"
                                                        >
                                                            {point}
                                                        </div>
                                                    ))}

                                                    {points.length === 0 && < div className='flex flex-col justify-center items-center h-full w-full  gap-2'>
                                                        <div className='flex justify-center items-center gap-2'>
                                                            <h1 className="text-5xl font-bold text-[#ffffff] mb-2 leading-tight text-center ">Shastra</h1>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" className='mb-3'>
                                                                <path fill="#ffffff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                                            </svg>
                                                        </div>
                                                        <h1 className="text-xl font-medium text-[#ffffff] mb-2 leading-tight text-center ">AI Is Generating Your  Bullet Points, Please Wait...</h1>
                                                        <div className="animate-pulse flex flex-col items-center gap-3">
                                                            <div className="h-4 w-40 bg-[#ffffff]/30 rounded"></div>
                                                            <div className="h-4 w-56 bg-[#ffffff]/20 rounded"></div>
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>

                                    </div>}
                                    {/* Category Input */}
                                    <div className="flex justify-between items-start gap-2 flex-col ">
                                        <label
                                            htmlFor="skills-category"
                                            className="text-[13px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
                                        >
                                            Skills Category
                                        </label>
                                        <input
                                            id='skills-category'
                                            type="text"
                                            placeholder="Skill Category (Frontend, Backend...)"
                                            value={skill.skillCategory}
                                            onChange={(e) =>

                                                handleChange2(index, "skillCategory", e.target.value)
                                            }
                                            className="w-full  bg-base-100 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none
                 focus:border-info  focus:ring-info focus:bg-secondary
                 transition-all duration-200 font-medium placeholder:text-slate-500"

                                        />
                                        <button className=' border border-secondary bg-base-100 text-info  px-3 py-2 rounded-xl mt-3 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out group' onClick={() => {

                                            if (skill.skillCategory.trim() === "") {

                                                addToast({
                                                    type: "error",
                                                    title: "Oh Snap!",
                                                    message: "Please fill the Skill Category"
                                                });
                                                return;
                                            }
                                            setSkillIndex(index);
                                            setSkillCategory(skill.skillCategory)
                                            setModalOpen(true)
                                            bulletspoints(skill.skillCategory)
                                        }}>

                                            <div className='flex justify-center items-center gap-2  p-2 rounded-xl bg-secondary group-hover:text-base-100 transition-all duration-300 ease-in-out'>
                                                <h1 className="text-xl font-bold text-secondary-content leading-tight text-center  transition-all duration-300 ease-in-out">Shastra</h1>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='text-secondary group-hover:text-base-100'>
                                                    <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                                </svg>
                                            </div>
                                            Generate skills</button>
                                    </div>

                                    {/* Skills Chips */}
                                    <div className="flex flex-col gap-2 mt-4 mb-3">
                                        <label
                                            htmlFor="skills-category"
                                            className="text-[13px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
                                        >
                                            Add Skills
                                        </label>
                                        <div
                                            className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    xl:grid-cols-6
    gap-3
  "
                                        >
                                            {skill.skills.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="
        group
        w-full
        min-w-0
        px-4 py-2
        rounded-2xl
        bg-accent
        text-secondary-content
        border border-white/10


        flex items-center justify-between gap-2

        transition-all duration-300 ease-out
        hover:scale-[1.03]
        hover:shadow-lg
        hover:shadow-black/20
      "
                                                >
                                                    <span className="truncate text-sm sm:text-base font-medium">
                                                        {item}
                                                    </span>

                                                    <button
                                                        onClick={() => removeSkill(index, idx)}
                                                        className="
          group/delete
          shrink-0
          flex items-center justify-center
          rounded-full
          p-1
          text-white/70
          transition-all duration-300 ease-out
          hover:bg-red-500/15
          hover:text-red-400
          active:scale-90
        "
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="1.4em"
                                                            height="1.4em"
                                                            viewBox="0 0 24 24"
                                                            className="
            transition-transform duration-500 ease-out
            group-hover/delete:rotate-180
            group-hover/delete:scale-110
          "
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                fillRule="evenodd"
                                                                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m4.066-14.066a.75.75 0 0 1 0 1.06L13.06 12l3.005 3.005a.75.75 0 0 1-1.06 1.06L12 13.062l-3.005 3.005a.75.75 0 1 1-1.06-1.06L10.938 12L7.934 8.995a.75.75 0 1 1 1.06-1.06L12 10.938l3.005-3.005a.75.75 0 0 1 1.06 0"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    {/* Add Skill */}
                                    <div className="flex items-center w-full justify-between gap-10 ">
                                        < input
                                            key={skill.id}
                                            type="text"
                                            placeholder="Press Enter to add skill"
                                            className="w-full bg-base-100 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none
                 focus:border-info focus:ring-info focus:bg-secondary
                 transition-all duration-200 font-medium placeholder:text-slate-500"


                                            value={skill.inputValue}
                                            onChange={(e) =>
                                                handleChange2(index, "inputValue", e.target.value)
                                            } onKeyDown={(e) => {
                                                if (e.key !== "Enter") return;

                                                e.preventDefault();

                                                if (skills[index].skills.length >= 10) {
                                                    addToast({
                                                        type: "error",
                                                        title: "Limit Exceeded!",
                                                        message: "Could not add more skills."
                                                    });
                                                    return;

                                                }
                                                addSkillToCategory(index, skill.inputValue);

                                                handleChange2(index, "inputValue", "");
                                            }}
                                        />
                                        <button className=" px-4 py-3 rounded-xl flex gap-2 items-center justify-center border border-slate-600 bg-secondary text-secondary-content font-semibold" onClick={() => {

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
                                        }}>Enter
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                <path fill="#ffffff" d="M19 6a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H7.41l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l3 3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L7.41 14H17a3 3 0 0 0 3-3V7a1 1 0 0 0-1-1"></path>
                                            </svg>
                                        </button>
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
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-base-100 text-info border-2 border-secondary
                        hover:text-secondary-content   active:scale-95 transition-all duration-200 "    >
                        Next : Profile Summary
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