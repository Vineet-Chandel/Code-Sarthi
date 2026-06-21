import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Temp1 from "../../3/Temp1";
import axios from "axios";
import BASE_URL from '../../../auth/baseURL';
import { Slice } from 'lucide-react';
import Toast from '../Toast';
import { AnimatePresence, motion } from "framer-motion";
import ProgressMeter from '../ProgressMeter';
import Header from '../Header';
import Step from '../Step';
import Preview from '../Preview';
import AiWorking from '../AiWorking';
import AddedPoints from '../AddedPoints';
import { useDispatch, useSelector } from 'react-redux';
import { setRes } from '@/utils/resStore';
import CTA from '../CTA';


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
            className="
          w-full
          bg-base-100
          border border-accent
          rounded-xl
          px-4 py-3
          text-white
          text-sm sm:text-base
          font-medium
          outline-none
          transition-all duration-300
          hover:border-info
          focus:border-info
          focus:ring-2 focus:ring-info
          focus:bg-base-200
          shadow-md hover:shadow-lg
          cursor-pointer
          pr-10
        "
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

    const resData = useSelector((state) => state.res);
    const user = useSelector(store => store.user?.user?.DATA || {});
    const dispatch = useDispatch();
    const getResumeIfExist = async () => {
        try {
            setGlobalProfileLoading(true)
            const res = await axios.get(`${BASE_URL}/build-resume/get-resume`, {
                withCredentials: true,
            })

            if (res.data.success === true) {
                dispatch(setRes(res.data.data));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setGlobalProfileLoading(false)
        }
    }
    useEffect(() => {
        if (!resData?.projects?.projects) {
            getResumeIfExist();
            return;
        }
    }, [resData?.projects?.projects]);

    useEffect(() => {
        if (resData.projects) {
            setProjects(resData.projects?.length > 0 ? resData.projects :
                data?.length > 0 ? data :
                    [{
                        name: "",
                        stack: "",
                        github: "",
                        live: "",
                        description: "",
                        bullets: [],
                    }]);
        }
    }, [resData.projects, data, user]);






















    const [projects, setProjects] = useState(
        resData?.projects?.length > 0
            ? resData.projects
            : resumeData?.projects?.length > 0
                ? resumeData.projects
                : [{
                    name: "",
                    stack: "",
                    github: "",
                    live: "",
                    description: "",
                    bullets: []
                }]
    );

    const saveProjects = async () => {
        try {
            setGlobalProfileLoading(true)
            if (
                JSON.stringify(resData?.projects || []) ===
                JSON.stringify(projects)
            ) {
                addToast({
                    type: "warning",
                    title: "already Saved",
                    message: "no changes found"
                });
                return;
            }

            const payload = {
                projects: projects
            };
            const res = await axios.post(`${BASE_URL}/build-resume/project-info-save`,
                payload, { withCredentials: true })

            dispatch(setRes({
                ...resData,
                projects: projects
            }));
            addToast({
                type: "success",
                title: "Saved",
                message: "Information Updated Successfully"
            });
        } catch (err) {
            addToast({
                type: "error",
                title: "Error",
                message: err.message
            });
        } finally {
            setGlobalProfileLoading(false)
        }

    }







    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);


    const [globalProfileLoading, setGlobalProfileLoading] = useState(false);

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

                    {aiModalOpen &&
                        <AiWorking
                            setIsAiworking={setIsAiworking}
                            isAiworking={isAiworking}
                            aiModalOpen={aiModalOpen}
                            setAiModalOpen={setAiModalOpen}
                            bullets={bullets}
                            setBullets={setBullets}
                            setpoints={setpoints}
                            points={points}


                            setRole={setSelectedProjectName}
                            role={selectedProjectName}
                            setFeildIndex={setSelectedProjectIndex}
                            feildIndex={selectedProjectIndex}
                            setSelectedEntity={setSelectedProjectStack}
                            selectedEntity={selectedProjectStack}

                            setSelectedFeildType={setSelectedProjectDescription}
                            selectedFeildType={selectedProjectDescription}
                            addToast={addToast}
                            mainFeild={projects}
                            setMainFeild={setProjects} />
                    }
                    {/* ── LEFT: form ── */}
                    <div className="p-3 min-[650px]:p-6 md:p-10 border border-gray-700 ">
                        <Header index={5} />


                        {projects.map((form, index) => (
                            <div key={index} className="bg-base-300 rounded-3xl shadow-inner p-4 md:p-7 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">Project #{index + 1}</h3>
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
          w-full
          bg-base-100
          border border-accent
          rounded-xl
          px-4 py-3
          text-white
          text-sm sm:text-base
          font-medium
          outline-none
          transition-all duration-300
          hover:border-info
          focus:border-info
          focus:ring-2 focus:ring-info
          focus:bg-base-200
          shadow-md hover:shadow-lg
          cursor-pointer
          pr-10
        "
                                    />
                                </div>




                                <button className='bg-base-100 border border-secondary hover:bg-base-100 text-info  px-3 py-2 rounded-xl mt-3 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out group' onClick={() => {


                                    if (projects[index].name === '' || projects[index].stack === '' || projects[index].description === '') {

                                        addToast({
                                            type: "error",
                                            title: "Oh Snap!",
                                            message: "Please fill name, stack and the descriptions"
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
                                    Generate Bullets for your Project
                                </button>


                                <AddedPoints feild={projects} index={index} activeInputIndex={activeInputIndex} setActiveInputIndex={setActiveInputIndex} editingBulletIndex={editingBulletIndex} setEditingBulletIndex={setEditingBulletIndex} bulletInput={bulletInput} setBulletInput={setBulletInput} enhancer={enhancer} setExperiences={setProjects} addToast={addToast} enhancerWorking={enhancerWorking} setEnhancerWorking={setEnhancerWorking} />

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
                <CTA type="project" saveHandler={saveProjects} resumeData={resumeData} />
            </div>
        </div >
    )
}

export default Project;