import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Temp1 from "../../3/Temp1";
import axios from "axios";
import BASE_URL from '../../../auth/baseURL';

import Toast from '../Toast';
import { AnimatePresence } from "framer-motion";
import ProgressMeter from '../ProgressMeter';
import Header from '../Header';
import Step from '../Step';
import { useEffect } from 'react';
import Preview from '../Preview';





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





const ProfileSummary = ({ data }) => {
    const location = useLocation();
    let resumeData = location.state?.resumeData || {};

    const [summary, setSummary] = useState("");


    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);







    resumeData = {
        ...resumeData,
        summaryBody: summary
    };



    const Navigate = useNavigate();




    const handleChange2 = (value) => {
        setSummary(value);


    };



    const [toasts, setToasts] = useState([]);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [generatedSummaries, setGeneratedSummaries] = useState([]);
    const [loading, setLoading] = useState(false);



    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const handleRefineSummary = async () => {
        try {
            setLoading(true);

            const payload = {
                skills: resumeData?.skills
                    ? resumeData.skills
                    : "",

                experience: (resumeData?.experience || []).map((exp) => ({
                    company: exp?.company || "",

                    role:
                        exp?.role ||
                        exp?.jobRole ||
                        "",

                    employmentType:
                        exp?.employmentType || "",

                    location:
                        exp?.location || "",

                    startDate:
                        exp?.startDate || "",

                    endDate:
                        exp?.endDate || "",

                    currentlyWorking:
                        exp?.currentlyWorking || false,

                    bulletPoints: (
                        exp?.bulletPoints || []
                    ).map((bullet) =>
                        typeof bullet === "string"
                            ? bullet
                            : bullet?.bullet || ""
                    ),
                })),

                education: (
                    resumeData?.education || []
                ).map((edu) => ({
                    degree: edu?.degree || "",

                    field:
                        edu?.field ||
                        edu?.feild ||
                        "",

                    institution:
                        edu?.institution ||
                        edu?.college ||
                        "",

                    cgpa: edu?.cgpa || "",

                    percentage:
                        edu?.percentage || "",

                    graduationYear:
                        edu?.graduationYear || "",

                    startDate:
                        edu?.startDate || "",

                    endDate:
                        edu?.endDate || "",

                    bulletPoints: (
                        edu?.bulletPoints || []
                    ).map((bullet) =>
                        typeof bullet === "string"
                            ? bullet
                            : bullet?.bullet || ""
                    ),
                })),

                summaryTitle:
                    resumeData?.summaryTitle || "",
            };

            const response = await axios.post(
                `${BASE_URL}/generate-summary`,
                payload, { withCredentials: true }
            );

            setGeneratedSummaries(
                response?.data?.data || []
            );

            setAiModalOpen(true);

        } catch (err) {
            console.error(err);

            addToast({
                type: "error",
                title: "AI Failed",
                message:
                    "Could not generate summaries.",
            });

        } finally {

            setLoading(false);
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




    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-start justify-center p-4 md:p-6 bg-base-100">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="w-full bg-base-100 rounded-3xl border border-slate-100 overflow-hidden border border-slate-700" >

                {/* ── top bar ── */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-base-200 border-b border-slate-700">
                    <Step index={4} />

                    <ProgressMeter index={4} resumeData={resumeData} />

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
                        <Header index={4} />

                        <div className="bg-base-300 rounded-3xl shadow-inner p-7 mb-6 w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-700">Professional Summary </h3>
                            </div>

                            <div className="flex items-start flex-col gap-5 mb-6 ">
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 w-full">

                                    <div className="space-y-3 ">
                                        <textarea
                                            id="summary"
                                            value={summary}
                                            onChange={(e) => handleChange2(e.target.value)}
                                            placeholder="Frontend Developer with 3+ years of experience in building scalable web applications..."
                                            rows={10}
                                            maxLength={500}
                                            className="w-full bg-base-100 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 outline-none
                 focus:border-secondary focus:ring-4 focus:ring-accent focus:bg-white
                 transition-all duration-200 font-medium placeholder:text-slate-500"

                                        />

                                    </div>

                                </div>



                                <button className='bg-secondary border border-secondary hover:bg-base-100 text-base-100 hover:text-secondary px-3 py-2 rounded-xl mt-3 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out group' onClick={() => {



                                    handleRefineSummary();
                                    setAiModalOpen(true);
                                }}>

                                    <div className='flex justify-center items-center gap-2 bg-base-100 p-2 rounded-xl group-hover:bg-secondary group-hover:text-base-100 transition-all duration-300 ease-in-out'>
                                        <h1 className="text-xl font-bold text-secondary leading-tight text-center group-hover:text-base-100 transition-all duration-300 ease-in-out">Shastra</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='text-secondary group-hover:text-base-100'>
                                            <path fill="currentColor" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                        </svg>
                                    </div>
                                    Get Profile Summary With AI</button>


                                <div className='bg-white w-[100%] mt-10 mx-auto rounded-xl border-2 p-5' onClick={(e) => { e.stopPropagation() }}>
                                    <div className="overflow-y-auto h-fit">

                                        <div className='  bg-black/20 z-30 rounded-xl p-5' onClick={() => {
                                            setAiModalOpen(false);
                                            setGeneratedSummaries([]);
                                        }}>


                                            <div className='w-full flex justify-center gap-5 p-5' >
                                                <div className="w-[97%] bg-base-100   rounded-xl p-5" onClick={(e) => e.stopPropagation()}>
                                                    <div className='mb-5'>
                                                        <h1 className="text-2xl text-center font-bold text-slate-900 mb-2 leading-tight  " >
                                                            Generating Professional Summary according to your qualifications and experience
                                                        </h1>
                                                    </div>

                                                    <div >
                                                        {loading ? (<div className='flex flex-col justify-center items-center  w-full  gap-2'>
                                                            <div className='flex justify-center items-center gap-2'>
                                                                <h1 className="text-5xl font-bold text-[#884f06] mb-2 leading-tight text-center ">Shastra</h1>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" className='mb-3'>
                                                                    <path fill="#884f06" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                                                </svg>
                                                            </div>
                                                            <h1 className="text-xl font-medium text-[#884f06] mb-2 leading-tight text-center ">AI is refining your professional summary...</h1>
                                                            <div className="animate-pulse flex flex-col items-center gap-3">
                                                                <div className="h-4 w-40 bg-[#884f06]/30 rounded"></div>
                                                                <div className="h-4 w-56 bg-[#884f06]/20 rounded"></div>
                                                            </div>
                                                        </div>) : (
                                                            <div className=" overflow-y-auto space-y-4 pr-2">
                                                                {generatedSummaries.map((item, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="bg-base-200 border border-slate-300 rounded-2xl p-5 hover:border-secondary transition-all"
                                                                    >
                                                                        <div className="flex items-center justify-between mb-4">
                                                                            <span className="bg-secondary text-base-100 text-xs px-3 py-1 rounded-full">
                                                                                {item.tone}
                                                                            </span>

                                                                            <button
                                                                                onClick={() => {
                                                                                    setSummary(item.summary);
                                                                                    setAiModalOpen(false);

                                                                                    addToast({
                                                                                        type: "success",
                                                                                        title: "Summary Applied",
                                                                                        message: "AI generated summary inserted.",
                                                                                    });
                                                                                }}
                                                                                className="bg-primary text-white px-4 py-2 rounded-xl text-sm hover:scale-105 transition-all"
                                                                            >
                                                                                Use This
                                                                            </button>
                                                                        </div>

                                                                        <p className="text-sm leading-relaxed text-slate-700">
                                                                            {item.summary}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>)}


                                                    </div>
                                                </div>


                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>





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
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-base-300 text-secondary border-2 border-secondary
                       hover:bg-secondary hover:text-secondary-content  hover:border-base-100 active:scale-95 transition-all duration-200 "
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

export default ProfileSummary;