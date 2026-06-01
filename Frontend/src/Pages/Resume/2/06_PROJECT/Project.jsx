import React, { useCallback, useEffect, useRef, useState } from 'react'
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
const InputField = ({ label, id, value, type = "text", placeholder, onChange }) => (
    <div className="flex flex-col gap-1 w-full group">
        <label
            htmlFor={id}
            className="text-[10px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
        >
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(id, e.target.value)}
            className="w-full bg-base-100 border border-slate-900 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none
                 focus:border-info  focus:bg-secondary
                 transition-all duration-200 font-medium placeholder:text-slate-500"
        />
    </div>
);




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



const Project = ({ data }) => {
    const live = useLocation();
    let resumeData = live.state?.resumeData || {};

    const [projects, setProjects] = useState(
        resumeData?.projects?.length > 0
            ? resumeData.projects
            : [
                {
                    name: "",
                    stack: "",
                    github: "",
                    live: "",
                    description: "",
                    bullets: []
                }
            ]
    );

    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);




    const prevExperience = resumeData?.projects || [];


    resumeData = {
        ...resumeData,
        projects: projects
    };


    const Navigate = useNavigate();




    const handleChange2 = (index, id, value) => {
        setProjects(prev =>
            prev.map((project, i) =>
                i === index ? { ...project, [id]: value } : project
            )
        );
    };
    const addProject = () => {
        setProjects(prev => [
            ...prev,
            {
                name: "",
                stack: "",
                github: "",
                live: "",
                description: "",
                bullets: [],
            }
        ]);
    };

    const [activeInputIndex, setActiveInputIndex] = useState(null);
    const [editingBulletIndex, setEditingBulletIndex] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [bullets, setBullets] = useState([]);
    const [isAiworking, setIsAiworking] = useState(false);
    const [selectedProjectName, setSelectedProjectName] = useState("");
    const [selectedProjectStack, setSelectedProjectStack] = useState("");
    const [selectedProjectDescription, setSelectedProjectDescription] = useState("");
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    const [points, setpoints] = useState([]);

    const [bulletInput, setBulletInput] = useState("");
    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };


    useEffect(() => {
        if (bullets?.length == 0 && selectedProjectName && selectedProjectStack && selectedProjectDescription) {
            bulletspoints(selectedProjectName, selectedProjectStack, selectedProjectDescription);
        }


    }, [points]);

    useEffect(() => {
        if (selectedProjectName && selectedProjectStack && selectedProjectDescription) {
            bulletspoints(selectedProjectName, selectedProjectStack, selectedProjectDescription);
        }
    }, [selectedProjectName, selectedProjectStack, selectedProjectDescription]);

    const bulletspoints = async (jobRole, stack, github) => {
        try {
            setIsAiworking(true);
            const response = await axios.post(
                `${BASE_URL}/generate-project-pointer`,
                { name: selectedProjectName, stack: selectedProjectStack, description: selectedProjectDescription }
            );

            setBullets(response.data.data);


        } catch (err) {
            console.error(err?.message || err);
        } finally {
            setIsAiworking(false);
        }
    };
    const [enhancerWorking, setEnhancerWorking] = useState("false");
    const [enhancerData, setEnhancerData] = useState({});
    const enhancer = async (bullet, index, bulletIndex) => {
        try {
            setEnhancerWorking(`${index}-${bulletIndex}`);
            const response = await axios.post(
                `${BASE_URL}/improve-pointer`,
                { bullet }
            );
            return response.data.data.bullet;
        } catch (err) {
            console.error(err);
            return null;
        } finally {
            setEnhancerWorking(null);
        }
    };

    useEffect(() => {
        setBulletInput("");

    }, [activeInputIndex]);




    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-start justify-center p-4 md:p-6 bg-base-100">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="w-full bg-base-100 rounded-3xl border border-slate-100 overflow-hidden border border-slate-700" >

                {/* ── top bar ── */}
                <div className="flex flex-col min-[480px]:flex-row items-center justify-around min-[480px]:justify-center gap-5 min-[480px]:gap-3 bg-base-200 px-2 py-3.5 border-b border-slate-700 sm:px-5">
                    {/* Step Counter */}
                    <span className="w-full flex justify-center min-[480px]:justify-start min-[480px]:w-1/5">
                        <Step index={5} />
                    </span>

                    {/* Progress Meter Container */}
                    <span className="flex min-[480px]:w-[70%] justify-center  w-full min-[480px]:justify-end sm:w-3/5 ">
                        <ProgressMeter index={5} resumeData={resumeData} />
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

                    {aiModalOpen && <div className='fixed w-screen h-screen bg-black/20 inset-0 z-30' onClick={() => { setAiModalOpen(false); setBullets([]), setpoints([]), setSelectedProjectName(""), setSelectedProjectStack(""), setSelectedProjectDescription(""), setSelectedProjectIndex(null) }}>


                        <div className='w-full flex justify-center gap-5 p-5' >
                            <div className="w-[50%] bg-base-100 h-[80vh] mt-10  rounded-xl p-5" onClick={(e) => e.stopPropagation()}>
                                <div className='mb-5'>
                                    <h1 className="text-3xl font-bold text-info mb-2 leading-tight text-start  " >
                                        Bullet points about what you did as a <br /> <span className="text-white">{selectedProjectName}</span>,
                                    </h1>
                                </div>

                                <div >
                                    {isAiworking ? (<div className='flex flex-col justify-center items-center h-[500px] w-full  gap-2'>
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
                                        <div className="h-[600px] overflow-y-auto  ">
                                            {bullets.map((bullet, index) => (
                                                <div className='bg-base-300 p-3 rounded-2xl flex mb-3 cursor-pointer hover:border hover:border-secondary transition-all '
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setpoints((prev) => {
                                                            if (prev.length == 10) {
                                                                addToast({
                                                                    type: "error",
                                                                    title: "Error",
                                                                    message: "You can only add 10 bullet points",
                                                                });
                                                                return prev;
                                                            }
                                                            if (prev.includes(bullet.bullet)) {
                                                                addToast({
                                                                    type: "error",
                                                                    title: "Error",
                                                                    message: "You can only add 10 bullet points",
                                                                });
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
                                                                    <path fill="#ffffff" d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z"></path>
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
                                                        <path fill="#ffffff" d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"></path>
                                                    </svg>
                                                </div>
                                                <div className='bg-base-100 p-4 rounded-2xl w-full'>{point}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <button className='bg-secondary w-full text-center mt-5 rounded-xl text-white py-3 px-5 font-bold ' onClick={() => {
                                        setProjects(prev =>
                                            prev.map((exp, i) =>
                                                i === selectedProjectIndex
                                                    ? { ...exp, bullets: [...new Set([...exp.bullets, ...points])] }
                                                    : exp
                                            )
                                        );
                                        setAiModalOpen(false);
                                        setpoints([]);
                                        setSelectedProjectName("");
                                        setSelectedProjectStack("");
                                        setSelectedProjectDescription("");
                                        setSelectedProjectIndex(null);

                                    }}>Finalise Your Points</button>
                                </div>

                            </div>

                        </div>

                    </div>}
                    {/* ── LEFT: form ── */}
                    <div className="p-6 md:p-10 border border-slate-700 ">
                        <Header index={5} />


                        {projects.map((form, index) => (
                            <div key={index} className="bg-base-300 rounded-3xl shadow-inner p-7 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">Experience #{index + 1}</h3>
                                    <button
                                        onClick={() => {
                                            const updated = [...projects];
                                            updated.splice(index, 1);
                                            setProjects(updated);
                                        }}
                                        className="text-accent hover:text-secondary transition-colors cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                            <path fill="#ffffff" d="M3 6.524c0-.395.327-.714.73-.714h4.788c.006-.842.098-1.995.932-2.793A3.68 3.68 0 0 1 12 2a3.68 3.68 0 0 1 2.55 1.017c.834.798.926 1.951.932 2.793h4.788c.403 0 .73.32.73.714a.72.72 0 0 1-.73.714H3.73A.72.72 0 0 1 3 6.524M11.607 22h.787c2.707 0 4.06 0 4.94-.863s.971-2.28 1.151-5.111l.26-4.08c.098-1.537.146-2.306-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.486-.392 1.255-.295 2.791l.26 4.08c.18 2.833.27 4.249 1.15 5.112S8.9 22 11.607 22"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    <InputField
                                        label="Project Name"
                                        id="name"
                                        value={form.name}
                                        placeholder="AI Resume Builder"
                                        onChange={(id, value) =>
                                            handleChange2(index, id, value)
                                        }
                                    />

                                    <InputField
                                        label="Tech Stack"
                                        id="stack"
                                        value={form.stack}
                                        placeholder="React, Node.js, MongoDB"
                                        onChange={(id, value) =>
                                            handleChange2(index, id, value)
                                        }
                                    />

                                    <InputField
                                        label="Github Link"
                                        id="github"
                                        value={form.github}
                                        placeholder="https://github.com/..."
                                        onChange={(id, value) =>
                                            handleChange2(index, id, value)
                                        }
                                    />

                                    <InputField
                                        label="Live Link"
                                        id="live"
                                        value={form.live}
                                        placeholder="https://yourproject.com"
                                        onChange={(id, value) =>
                                            handleChange2(index, id, value)
                                        }
                                    />
                                </div>

                                <div className="mt-4">
                                    <label className="text-sm font-medium text-info` mb-2 block">
                                        Description
                                    </label>

                                    <textarea
                                        value={form.description}
                                        onChange={(e) =>
                                            handleChange2(index, "description", e.target.value)
                                        }
                                        placeholder="Describe your project..."
                                        className="
        w-full min-h-[120px]
        rounded-2xl
        border border-slate-700
        bg-base-100
        p-4
        outline-none
        focus:border-secondary
    "
                                    />
                                </div>




                                <button className='bg-base-100 border border-secondary hover:bg-base-100 text-info  px-3 py-2 rounded-xl mt-3 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out group' onClick={() => {


                                    if (projects[index].name === '' || projects[index].stack === '' || projects[index].description === '') {

                                        addToast({
                                            type: "error",
                                            title: "Error",
                                            message: "Please fill name, stack and the Employment Type"
                                        });
                                        return;
                                    }
                                    setAiModalOpen(true); setSelectedProjectName(projects[index].name); setSelectedProjectStack(projects[index].stack); setSelectedProjectDescription(projects[index].description); setSelectedProjectIndex(index);
                                }}>

                                    <div className='flex justify-center items-center gap-2  p-2 rounded-xl bg-secondary group-hover:text-base-100 transition-all duration-300 ease-in-out'>
                                        <h1 className="text-xl font-bold text-secondary-content leading-tight text-center  transition-all duration-300 ease-in-out">Shastra</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='text-secondary group-hover:text-base-100'>
                                            <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                        </svg>
                                    </div>
                                    Generate Bullets for Experience</button>


                                <div className='bg-white w-[100%] mt-10 mx-auto rounded-xl border-2 p-5' onClick={(e) => { e.stopPropagation() }}>
                                    <div className="overflow-y-auto h-fit">
                                        <div className='mb-5 flex items-center justify-between'>
                                            <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight text-start  " >
                                                Points Added : {projects[index].bullets?.length}/10 <br />
                                            </h1>

                                            <div className='bg-primary p-3 rounded-full text-base-100 flex justify-center items-center cursor-pointer' onClick={() => {

                                                if (projects[index].bullets?.length >= 10) {
                                                    addToast({
                                                        type: "error",
                                                        title: "Error",
                                                        message: "You can only add 10 bullet points."
                                                    });
                                                    return;
                                                }

                                                setActiveInputIndex(prev => prev === index ? null : index);
                                            }} ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                                                    <path fill="currentColor" d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z"></path>
                                                </svg></div>
                                        </div>

                                        {activeInputIndex === index && (
                                            <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300 ml-5 mb-10 flex items-end gap-3 w-[95%]">
                                                <div className='flex flex-col flex-1'>
                                                    <label className="block text-[15px] font-bold uppercase tracking-wider text-gray-700 mb-1 ml-1">
                                                        {editingBulletIndex !== null ? "Edit Bullet Point" : "Add Bullet Point"}
                                                    </label>

                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        value={bulletInput}
                                                        placeholder="e.g. Led a team of 5 developers..."
                                                        onChange={(e) => setBulletInput(e.target.value)}
                                                        // Handle Enter key
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();

                                                            }
                                                        }}
                                                        className="w-full rounded-xl border border-slate-900 bg-white px-4 py-2.5 text-sm 
                       text-gray-700 shadow-sm transition-all placeholder:text-gray-400
                       focus:border-secondary focus:ring-2 focus:ring-secondary focus:outline-none"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    className="bg-secondary border border-secondary hover:bg-base-100 text-info hover:text-white 
                   px-5 py-2.5 rounded-xl flex justify-center items-center gap-2 
                   hover:scale-105 transition-all duration-300 ease-in-out group"
                                                    onClick={() => {
                                                        if (!bulletInput.trim()) return;

                                                        setProjects(prev =>
                                                            prev.map((exp, i) => {
                                                                if (i !== index) return exp;

                                                                const updatedBullets = [...exp.bullets];

                                                                if (editingBulletIndex !== null) {
                                                                    updatedBullets[editingBulletIndex] = bulletInput;
                                                                } else {
                                                                    updatedBullets.push(bulletInput);
                                                                }

                                                                return {
                                                                    ...exp,
                                                                    bullets: updatedBullets
                                                                };
                                                            })
                                                        );

                                                        setBulletInput("");
                                                        setEditingBulletIndex(null);
                                                        setActiveInputIndex(null);
                                                    }}
                                                >
                                                    {editingBulletIndex !== null ? "UPDATE" : "ADD"}
                                                </button>
                                            </div>
                                        )}
                                        {(activeInputIndex !== index && projects[index].bullets?.length === 0) ? (<div className='flex flex-col justify-center items-center  w-[80%] mx-auto gap-2'>

                                            <h1 className="text-xl font-medium text-slate-900 mb-2 leading-tight text-center ">No bullet points yet. Don’t waste time thinking — let AI craft powerful, recruiter-ready points for you in seconds.</h1>

                                        </div>) : projects[index].bullets?.map((point, bulletIndex) => (
                                            <div key={bulletIndex + point} className='bg-base-300 p-3 rounded-2xl flex mb-3 cursor-pointer hover:border hover:border-secondary transition-all ' >
                                                <div className="flex gap-5 w-full items-center">
                                                    <div className='flex gap-2'>

                                                        <div className='rounded-full border-2 border-secondary p-2 h-fit flex justify-center items-center bg-base-100'
                                                            onClick={(e) => {
                                                                e.stopPropagation();

                                                                setEditingBulletIndex(null);
                                                                setBulletInput("");
                                                                setActiveInputIndex(null);

                                                                setProjects(prev =>
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
                                                                <path fill="#ffffff" d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"></path>
                                                            </svg>
                                                        </div>





                                                        <div className='rounded-full border-2 border-secondary p-2 h-fit flex justify-center items-center bg-base-100'
                                                            onClick={(e) => {
                                                                e.stopPropagation();

                                                                setActiveInputIndex(index);
                                                                setEditingBulletIndex(bulletIndex);
                                                                setBulletInput(point);
                                                            }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                                                                <path fill="currentColor" d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z"></path>
                                                            </svg>
                                                        </div>


                                                        <div className='rounded-full border-2 border-secondary p-2 h-fit flex justify-center items-center bg-base-100'
                                                            onClick={async (e) => {
                                                                e.stopPropagation();

                                                                const improvedBullet = await enhancer(
                                                                    point,
                                                                    index,
                                                                    bulletIndex
                                                                );

                                                                if (!improvedBullet) {
                                                                    addToast({
                                                                        type: "error",
                                                                        title: "Enhancement Failed",
                                                                        message: "Could not improve bullet point."
                                                                    });
                                                                    return;
                                                                }

                                                                setProjects(prev =>
                                                                    prev.map((exp, i) =>
                                                                        i === index
                                                                            ? {
                                                                                ...exp,
                                                                                bullets: exp.bullets.map((b, j) =>
                                                                                    j === bulletIndex ? improvedBullet : b
                                                                                )
                                                                            }
                                                                            : exp
                                                                    )
                                                                );

                                                                addToast({
                                                                    type: "success",
                                                                    title: "Bullet Enhanced",
                                                                    message: "AI improved your resume bullet."
                                                                });
                                                            }}
                                                        >
                                                            {enhancerWorking === `${index}-${bulletIndex}` && < span className="loading loading-spinner">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                    <path fill="#ee5252" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                                                                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
                                                                    </path>
                                                                </svg></span>}
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                <path fill="#ffffff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
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
                                onClick={addProject}
                                className="px-6 py-2 rounded-full bg-base-300 text-white flex items-center gap-2"
                            ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                        <path fill="#ffffff" d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"></path>
                                    </g>
                                </svg> Add Projects</button>
                        </div>
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
                            Navigate("/app/build-resume/intro-edu-page", {
                                state: { resumeData }
                            });
                        }}
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-base-100 text-info border-2 border-secondary
                       hover:bg-secondary hover:text-secondary-content  hover:border-info active:scale-95 transition-all duration-200 "
                    >
                        Next: Additional Details
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5m11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Project;