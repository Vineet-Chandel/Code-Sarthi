import React, { useCallback, useEffect, useRef, useState } from 'react'
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
const InputField = ({ label, id, value, type = "text", placeholder, onChange }) => (
    <div className="flex flex-col gap-1 w-full group">
        <label
            htmlFor={id}
            className="text-[10px] font-semibold uppercase tracking-widest text-slate-700 group-focus-within:text-violet-600 transition-colors ml-0.5"
        >
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(id, e.target.value)}
            className="w-full bg-base-200 border border-slate-900 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none
                 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:bg-white
                 transition-all duration-200 font-medium placeholder:text-slate-400"
        />
    </div>
);




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

const Experience = ({ data }) => {
    const location = useLocation();
    let resumeData = location.state?.resumeData || {};

    const [experiences, setExperiences] = useState([
        {
            role: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            bullets: [],
            employmentType: ""
        }
    ]);


    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);




    const prevExperience = resumeData?.experience || [];


    resumeData = {
        ...resumeData,
        experience:
            experiences,

        summaryBody: "",
        degree: "",
        major: "",
        institution: "",

        gradDate: "",
        skills: {},
        projects: [],

        education: [],
        certifications: [],
        achievements: [],
        languages: ["English (Fluent)", "Hindi (Native)"],
    };


    const Navigate = useNavigate();
    const [isVisible] = useIntersectionObserver();
    const [hovered, setHovered] = useState(false);


    const handleChange2 = (index, id, value) => {
        setExperiences(prev =>
            prev.map((exp, i) =>
                i === index ? { ...exp, [id]: value } : exp
            )
        );
    };
    const addExperience = () => {
        setExperiences(prev => [
            ...prev,
            {
                role: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
                bullets: [],
                employmentType: "",
            }
        ]);
    };

    const [toasts, setToasts] = useState([]);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [bullets, setBullets] = useState([]);
    const [isAiworking, setIsAiworking] = useState(false);
    const [selectedRole, setSelectedRole] = useState();
    const [selectedCompany, setSelectedCompany] = useState();
    const [selectedEmploymentType, setSelectedEmploymentType] = useState();
    const [selectedExpIndex, setSelectedExpIndex] = useState(null);
    const [points, setpoints] = useState([]);
    const [inputFeildOpen, setInputFeildOpen] = useState(false);
    const [bulletInput, setBulletInput] = useState("");
    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };


    useEffect(() => {
        if (bullets?.length == 0 && selectedRole && selectedCompany && selectedEmploymentType) {
            bulletspoints(selectedRole, selectedCompany, selectedEmploymentType);
        }


    }, [points]);

    useEffect(() => {
        if (selectedRole && selectedCompany && selectedEmploymentType) {
            bulletspoints(selectedRole, selectedCompany, selectedEmploymentType);
        }
    }, [selectedRole, selectedCompany, selectedEmploymentType]);

    const bulletspoints = async (jobRole, company, employmentType) => {
        try {
            setIsAiworking(true);
            const response = await axios.post(
                `${BASE_URL}/generate-exp-pointer`,
                { jobRole: jobRole, company: company, employmentType: employmentType }
            );

            setBullets(response.data.data);


        } catch (err) {
            console.error(err?.message || err);
        } finally {
            setIsAiworking(false);
        }
    };


    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-start justify-center p-4 md:p-6 bg-base-100">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="w-full bg-base-100 rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden border border-slate-600" >

                {/* ── top bar ── */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-base-200 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-violet-100 text-violet-700">
                        Step 2 of 6
                    </span>

                    {/* progress dots */}
                    <div className="flex items-center gap-1.5">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-300 ${i === 0 || i === 1
                                    ? "w-2 h-2 bg-emerald-500"
                                    : i === 2
                                        ? "w-5 h-2 bg-violet-600"
                                        : "w-2 h-2 bg-slate-200"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setSidebarOpen((p) => !p)}
                        className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200
                        ${sidebarOpen
                                ? "bg-violet-600 text-white border-violet-600"
                                : "bg-white text-slate-500 border-slate-200 hover:border-violet-400 hover:text-violet-600"
                            }`}
                    >
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M10 1v14" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        {sidebarOpen ? "Hide" : "Preview"}
                    </button>
                </div>

                {/* ── body ── */}
                <div className={`grid transition-all duration-500 ${sidebarOpen ? "lg:grid-cols-[1fr_500px]" : "grid-cols-1"}`}>

                    {aiModalOpen && <div className='fixed w-screen h-screen bg-black/20 inset-0 z-30' onClick={() => { setAiModalOpen(false); setBullets([]), setpoints([]), setSelectedRole(""), setSelectedCompany(""), setSelectedEmploymentType(""), setSelectedExpIndex(null) }}>


                        <div className='w-full flex justify-center gap-5 p-5' >
                            <div className="w-[50%] bg-base-100 h-[80vh] mt-10  rounded-xl p-5">
                                <div className='mb-5'>
                                    <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight text-start  " >
                                        Bullet points about what you did as a <br /> <span className="text-violet-600">{selectedRole}</span>,
                                    </h1>
                                </div>

                                <div >
                                    {isAiworking ? (<div className='flex flex-col justify-center items-center h-[500px] w-full  gap-2'>
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
                                        <div className="h-[600px] overflow-y-auto  ">
                                            {bullets.map((bullet, index) => (
                                                <div className='bg-base-300 p-3 rounded-2xl flex mb-3 cursor-pointer hover:border hover:border-secondary transition-all '
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setpoints((prev) => {
                                                            if (prev.length == 10) {
                                                                alert("You can only add 10 bullet points");
                                                                return prev;
                                                            }
                                                            if (prev.includes(bullet.bullet)) {
                                                                return prev;
                                                            }

                                                            return [...prev, bullet.bullet];
                                                        });
                                                        setBullets((prev) => prev.filter((_, i) => i !== index));
                                                    }}
                                                >
                                                    <div className="flex gap-5 w-full items-center">
                                                        <div className='rounded-full border-2 border-secondary p-2 h-fit flex justify-center items-center bg-base-100'  >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                <g fill="none">
                                                                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                                                    <path fill="#884f06" d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z"></path>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div className='bg-base-100 p-4 rounded-2xl w-full' >{bullet.bullet}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>)}


                                </div>
                            </div>
                            <div className='bg-white w-[50%] h-[80vh] mt-10 mx-auto rounded-xl border-2 p-5' onClick={(e) => { e.stopPropagation() }}>
                                <div className="h-[650px] overflow-y-auto">
                                    <div className='mb-5'>
                                        <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight text-start  " >
                                            Points Added : {points?.length}/10 <br />
                                            Total Sugesstion : {bullets?.length}
                                        </h1>
                                    </div>
                                    {points?.length === 0 ? (<div className='flex flex-col justify-center items-center h-[700px] w-[80%] mx-auto gap-2'>

                                        <h1 className="text-xl font-medium text-slate-900 mb-2 leading-tight text-center ">No bullet points added yet. Select suggestions from the panel on the right.</h1>

                                    </div>) : points?.map((point, index) => (
                                        <div key={index + point} className='bg-base-300 p-3 rounded-2xl flex mb-3 cursor-pointer hover:border hover:border-secondary transition-all ' >
                                            <div className="flex gap-5 w-full items-center">
                                                <div className='rounded-full border-2 border-secondary p-2 h-fit flex justify-center items-center bg-base-100'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setpoints((prev) => prev.filter((_, i) => i !== index));

                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                        <path fill="#884f06" d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"></path>
                                                    </svg>
                                                </div>
                                                <div className='bg-base-100 p-4 rounded-2xl w-full'>{point}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className='bg-secondary w-full text-center mt-5 rounded-xl text-base-100 py-3 px-5 font-bold ' onClick={() => {
                                    setExperiences(prev =>
                                        prev.map((exp, i) =>
                                            i === selectedExpIndex
                                                ? { ...exp, bullets: [...new Set([...exp.bullets, ...points])] }
                                                : exp
                                        )
                                    );
                                    setAiModalOpen(false);
                                    setpoints([]);
                                    setSelectedRole("");
                                    setSelectedCompany("");
                                    setSelectedEmploymentType("");
                                    setSelectedExpIndex(null);

                                }}>Finalise Your Points</button>
                            </div>

                        </div>

                    </div>}
                    {/* ── LEFT: form ── */}
                    <div className="p-6 md:p-10 border-r border-slate-100 ">
                        <div className="mb-7 ">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2 leading-tight">
                                Let’s work on your {" "}
                                <span className="text-violet-600">experience</span>.
                            </h1>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                                Start with your most recent job first.
                            </p>
                        </div>
                        {experiences.map((form, index) => (
                            <div key={index} className="bg-base-300 rounded-3xl shadow-inner p-7 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-700">Experience #{index + 1}</h3>
                                    <button
                                        onClick={() => {
                                            const newExperiences = [...experiences];
                                            newExperiences.splice(index, 1);
                                            setExperiences(newExperiences);
                                        }}
                                        className="text-slate-400 hover:text-rose-500 transition-colors"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18" />
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                            <path d="M8 6V4c0-.5.2-.9.5-.13L11 1c1-1.3 2.5-1.3 3.5 0l2.5 3.12c.3.37.5.63.5.13v2" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-start gap-5 mb-6">
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        <InputField label="Role" id="role" value={form.role} required={true}
                                            placeholder="Frontend Developer "
                                            onChange={(id, value) => handleChange2(index, id, value)}
                                        />

                                        <InputField label="Company" id="company" value={form.company} required={true}
                                            placeholder="Google"
                                            onChange={(id, value) => handleChange2(index, id, value)}
                                        />
                                    </div>
                                </div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">
                                    Type of Employment
                                </label>
                                <select
                                    className="input input-bordered border border-slate-900 text-black rounded-xl bg-base-200 w-full px-2 py-1"
                                    value={form.employmentType}
                                    required={true}
                                    onChange={(e) =>
                                        handleChange2(index, "employmentType", e.target.value)
                                    }
                                >
                                    <option value="">Select Type</option>
                                    <option>Internship</option>
                                    <option>Full-time</option>
                                    <option>Freelance</option>
                                </select>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <InputField label="Location" id="location" value={form.location}
                                        placeholder="New York"
                                        onChange={(id, value) => handleChange2(index, id, value)}
                                    />

                                    <InputField type="month" label="Start Date" id="startDate" value={form.startDate}

                                        onChange={(id, value) => handleChange2(index, id, value)} />
                                    <InputField type="month" label="End Date" id="endDate" value={form.endDate}

                                        onChange={(id, value) => handleChange2(index, id, value)} />

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={form.currentlyWorking}
                                            onChange={(e) => {
                                                const updated = [...experiences];
                                                updated[index].currentlyWorking = e.target.checked;

                                                if (e.target.checked) {
                                                    updated[index].endDate = "";
                                                }

                                                setExperiences(updated);
                                            }}
                                        />
                                        Currently working here
                                    </label>
                                </div>



                                <button className='bg-secondary border border-secondary hover:bg-base-100 text-base-100 hover:text-secondary px-3 py-2 rounded-xl mt-3 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out group' onClick={() => {


                                    if (experiences[index].role === '' || experiences[index].company === '' || experiences[index].employmentType === '') {

                                        addToast({
                                            type: "error",
                                            title: "Error",
                                            message: "Please fill Role, Company and the Employment Type"
                                        });
                                        return;
                                    }
                                    setAiModalOpen(true); setSelectedRole(experiences[index].role); setSelectedCompany(experiences[index].company); setSelectedEmploymentType(experiences[index].employmentType); setSelectedExpIndex(index);
                                }}>

                                    <div className='flex justify-center items-center gap-2 bg-base-100 p-2 rounded-xl group-hover:bg-secondary group-hover:text-base-100 transition-all duration-300 ease-in-out'>
                                        <h1 className="text-xl font-bold text-secondary leading-tight text-center group-hover:text-base-100 transition-all duration-300 ease-in-out">Shastra</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='text-secondary group-hover:text-base-100'>
                                            <path fill="currentColor" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                        </svg>
                                    </div>
                                    Generate Bullets for Experience</button>


                                <div className='bg-white w-[100%] mt-10 mx-auto rounded-xl border-2 p-5' onClick={(e) => { e.stopPropagation() }}>
                                    <div className="overflow-y-auto h-fit">
                                        <div className='mb-5 flex items-center justify-between'>
                                            <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight text-start  " >
                                                Points Added : {experiences[index].bullets?.length}/10 <br />
                                            </h1>

                                            <div className='bg-primary p-3 rounded-full text-base-100 flex justify-center items-center cursor-pointer' onClick={() => {
                                                setInputFeildOpen(!inputFeildOpen);
                                                if (experiences[index].bullets?.length === 10) {
                                                    addToast({
                                                        type: "error",
                                                        title: "Error",
                                                        message: "You can only add 10 bullet points."
                                                    });
                                                    return;
                                                }
                                            }} ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                                                    <path fill="currentColor" d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z"></path>
                                                </svg></div>
                                        </div>

                                        {inputFeildOpen && (
                                            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300 ml-5 mb-10 flex">
                                                <div className='flex flex-col w-[100%]'>
                                                    <label className="block text-[15px] font-bold uppercase tracking-wider text-gray-700 mb-1 ml-1">
                                                        Add Bullet Point
                                                    </label>

                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        value={bulletInput}
                                                        placeholder="e.g. Led a team of 5 developers..."
                                                        onChange={(e) => setBulletInput(e.target.value)}
                                                        className="w-[90%] rounded-xl border border-slate-900 bg-white px-4 py-2.5 text-sm 
            text-gray-700 shadow-sm transition-all placeholder:text-gray-700
            focus:border-secondary focus:ring-2 focus:ring-secondary focus:outline-none"
                                                    />
                                                </div>

                                                <button
                                                    className="bg-secondary border border-secondary hover:bg-base-100 text-base-100 hover:text-secondary px-3 py-2 rounded-xl mt-3 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out group"
                                                    onClick={() => {
                                                        if (!bulletInput.trim()) return;

                                                        setExperiences(prev => {
                                                            if (!prev[index]) return prev;
                                                            if (prev[index].bullets.includes(bulletInput)) return prev;

                                                            return prev.map((exp, i) =>
                                                                i === index
                                                                    ? { ...exp, bullets: [...exp.bullets, bulletInput] }
                                                                    : exp
                                                            );
                                                        });

                                                        setBulletInput(""); // clear input after add
                                                    }}
                                                >
                                                    ADD
                                                </button>
                                            </div>
                                        )}
                                        {(!inputFeildOpen && experiences[index].bullets?.length === 0) ? (<div className='flex flex-col justify-center items-center  w-[80%] mx-auto gap-2'>

                                            <h1 className="text-xl font-medium text-slate-900 mb-2 leading-tight text-center ">No bullet points yet. Don’t waste time thinking — let AI craft powerful, recruiter-ready points for you in seconds.</h1>

                                        </div>) : experiences[index].bullets?.map((point, bulletIndex) => (
                                            <div key={bulletIndex + point} className='bg-base-300 p-3 rounded-2xl flex mb-3 cursor-pointer hover:border hover:border-secondary transition-all ' >
                                                <div className="flex gap-5 w-full items-center">
                                                    <div className='flex gap-2'>
                                                        <div className='rounded-full border-2 border-secondary p-2 h-fit flex justify-center items-center bg-base-100'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExperiences(prev =>
                                                                    prev.map((exp, i) =>
                                                                        i === index
                                                                            ? {
                                                                                ...exp,
                                                                                bullets: exp.bullets.filter((_, j) => j !== bulletIndex)
                                                                            }
                                                                            : exp
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                <path fill="#884f06" d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className='rounded-full border-2 border-secondary p-2 h-fit flex justify-center items-center bg-base-100'
                                                            onClick={(e) => {
                                                                e.stopPropagation(); setInputFeildOpen(true); setBulletInput(point);
                                                                setExperiences(prev =>
                                                                    prev.map((exp, i) =>
                                                                        i === index
                                                                            ? {
                                                                                ...exp,
                                                                                bullets: exp.bullets.filter((_, j) => j !== bulletIndex)
                                                                            }
                                                                            : exp
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                                                                <path fill="currentColor" d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className='bg-base-100 p-4 rounded-2xl w-full'>{point}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>



                        ))}
                        <div className="flex justify-end mt-10">
                            <button
                                onClick={addExperience}
                                className="px-6 py-2 rounded-full bg-primary text-white flex items-center gap-2"
                            ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                        <path fill="#ffffff" d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"></path>
                                    </g>
                                </svg> Add Experience</button>
                        </div>
                    </div>

                    {/* ── RIGHT: sidebar ── */}
                    {sidebarOpen && (
                        <div className="flex flex-col bg-base-200 border-t lg:border-t-0 border-slate-900">
                            {/* tabs */}
                            <div className="flex border-b border-slate-900">
                                {["preview", "tips", "score"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3.5 text-xs font-semibold capitalize transition-all duration-200 border-b-2
                                ${activeTab === tab
                                                ? "text-violet-600 border-violet-600 bg-white"
                                                : "text-slate-400 border-transparent hover:text-slate-600"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* ── PREVIEW tab ── */}
                            {activeTab === "preview" && (

                                <div>
                                    <div

                                        className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                                        style={{
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
                                            background: "#fff",
                                        }}

                                    >
                                        {/* Badge */}
                                        <div
                                            className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white"
                                            style={{ background: "#000000", letterSpacing: "0.12em" }}
                                        >
                                            {/* {item.tag} */} tag of the temp
                                        </div>



                                        {/* Preview Area */}
                                        <div className="relative w-full overflow-hidden bg-slate-50" style={{ aspectRatio: "1/1.41" }}>
                                            <div
                                                className="absolute top-0 left-0 w-[900px] origin-top-left pointer-events-none select-none scale-[1.05] lg:scale-[0.56]"
                                                style={{

                                                    transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
                                                }}
                                            >
                                                <Temp1 data={resumeData} />
                                            </div>

                                            {/* Hover CTA overlay */}
                                            <div
                                                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                                                style={{
                                                    background: `linear-gradient(160deg, ${"#000000"}22 0%, ${"#000000"}55 100%)`,

                                                    opacity: hovered ? 1 : 0,
                                                    transition: "opacity 0.3s ease",
                                                }}
                                            >


                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="px-4 py-3 bg-white flex justify-between items-center gap-2">
                                            <div>
                                                {/* <h3 className="font-bold text-slate-800 text-sm truncate">{item.name}</h3>
                                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Template #{item.id}</p> */}
                                            </div>
                                            <span className="shrink-0 text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded-lg uppercase font-black tracking-wider">
                                                ATS
                                            </span>
                                        </div>

                                        {/* Bottom accent bar */}
                                        <div
                                            className="h-0.5 w-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${"#000000"}, transparent)`,
                                                opacity: hovered ? 1 : 0,
                                                transition: "opacity 0.3s",
                                            }}
                                        />
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
                <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-base-200 border-t border-slate-100">
                    <button className="text-sm font-medium text-slate-400 hover:text-slate-700 px-4 py-2.5 rounded-xl
                             border border-slate-200 hover:border-slate-300 bg-white transition-all duration-200">
                        Save draft
                    </button>
                    <button
                        onClick={() => {
                            Navigate("/app/build-resume/education", {
                                state: { resumeData: resumeData }
                            });
                        }}
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-violet-600 text-white
                       hover:bg-violet-700 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-200"
                    >
                        Next: Summary
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Experience;