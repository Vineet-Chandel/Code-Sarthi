import React, { useState } from 'react'
import Toast from './Toast';
import { AnimatePresence } from 'framer-motion';
import Temp1 from '../3/Temp1';
import { useLocation } from 'react-router-dom';

const Skills = ({ data }) => {
    const location = useLocation();
    let resumeData = location.state?.resumeData || {};
    const [isVisible, setIsVisible] = useState(false);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [toasts, setToasts] = useState([]);
    const [hovered, setHovered] = useState(false);


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


    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex  items-start justify-center p-4 md:p-6 bg-base-100">
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

                    {aiModalOpen && <div className='fixed w-screen h-screen bg-black/20 inset-0 z-30' onClick={() => {
                        setAiModalOpen(false);
                        setBullets([]);
                        setpoints([]);
                        setSelectedEndData("");
                        setSelectedDegree("");
                        setSelectedInstitution("");
                        setSelectedField("");
                        setSelectedEducationIndex(null);
                    }}>


                        <div className='w-full flex justify-center gap-5 p-5' >
                            <div className="w-[50%] bg-base-100 h-[80vh] mt-10  rounded-xl p-5 " onClick={(e) => e.stopPropagation()}>
                                <div className='mb-5'>
                                    <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight text-start  " >
                                        Bullet points about what you did as a <br /> <span className="text-accent">{selectedDegree}</span>,
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
                                    setEducation(prev =>
                                        prev.map((edu, i) =>
                                            i === selectedEducationIndex
                                                ? {
                                                    ...edu,
                                                    bullets: [...new Set([...(edu.bullets || []), ...points])]
                                                }
                                                : edu
                                        )
                                    );
                                    setAiModalOpen(false);
                                    setpoints([]);
                                    setSelectedEndData("");
                                    setSelectedDegree("");
                                    setSelectedInstitution("");
                                    setSelectedField("");
                                    setSelectedEducationIndex(null);

                                }}>Finalise Your Points</button>
                            </div>

                        </div>

                    </div>}
                    {/* ── LEFT: form ── */}
                    <div className="p-6 md:p-10 border border-slate-700 ">

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
                <div className="flex items-center justify-end px-6 md:px-10 py-4 bg-base-200 border-t border-slate-700">

                    <button
                        onClick={() => {
                            Navigate("/app/build-resume/intro-skill-page", {
                                state: { resumeData }
                            });
                        }}
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-base-300 text-secondary border-2 border-secondary
                       hover:bg-secondary hover:text-secondary-content  hover:border-base-100 active:scale-95 transition-all duration-200 "
                    >
                        Next: Skills
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5m11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Skills