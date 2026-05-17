import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Temp1 from "../3/Temp1";
import axios from "axios";
import BASE_URL from '../../auth/baseURL';

import Toast from './Toast';
import { AnimatePresence } from "framer-motion";






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
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-base-100 text-secondary">
                        Step 2 of 6
                    </span>

                    {/* progress dots */}
                    <div className="flex items-center gap-1.5">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`rounded-full transition-all duration-300 ${i === 0 || i === 1
                                    ? "w-2 h-2 bg-primary"
                                    : i === 2
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
                                Craft your  {" "}
                                <span className="text-accent">summary</span>.
                            </h1>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                                Start with a prewritten option or write your own. Edit as needed, then use <b>Enhance with AI</b> to polish it.
                            </p>
                        </div>

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



                                    <div style={{
                                        position: "relative",
                                        width: "100%",
                                        overflow: "hidden",
                                        clipPath: "inset(0 0 0 0)",          // bulletproof clip
                                        background: "oklch(95% 0.038 75.164)",
                                        aspectRatio: "1/1.41",
                                    }}>
                                        {/* ✅ No hardcoded width, no transform scale — A4Wrapper handles everything */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 0, left: 0, right: 0,
                                                pointerEvents: "none",
                                                userSelect: "none",
                                                transformOrigin: "top center",

                                                transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
                                            }}
                                        >
                                            <Temp1 data={resumeData} />
                                        </div>

                                        {/* Hover overlay CTA — unchanged */}
                                        <div style={{
                                            position: "absolute", inset: 0,
                                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
                                            // background: `linear-gradient(160deg, ${item.color}18 0%, ${item.color}50 100%)`,

                                            transition: "opacity 0.3s ease",
                                        }}>
                                            <button
                                                style={{
                                                    padding: "10px 28px",
                                                    borderRadius: "var(--radius-field, 0.5rem)",
                                                    fontWeight: 800, fontSize: 13, color: "#fff",
                                                    // background: item.color,
                                                    border: "none", cursor: "pointer",

                                                    transition: "transform 0.35s cubic-bezier(.4,0,.2,1) 0.05s",
                                                    letterSpacing: "0.02em",
                                                    fontFamily: "'DM Sans', sans-serif",
                                                }}
                                            // onClick={() => onSelect(item)}
                                            >
                                                Use This Template
                                            </button>
                                        </div>
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

export default Experience;