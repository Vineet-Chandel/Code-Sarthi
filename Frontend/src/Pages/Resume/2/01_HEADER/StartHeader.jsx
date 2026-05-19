import React, { useState, useRef, useEffect, useCallback } from "react";
import Temp1 from "../../3/Temp1";
import { useLocation, useNavigate } from "react-router-dom";
import IntroEXP from "../02_EXP/IntroEXP";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import validator from "validator";
import ProgressMeter from "../ProgressMeter";
import Header from "../Header";
import Step from "../Step";
import { isValidPhoneNumber } from "react-phone-number-input";
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
const InputField = ({ label, id, value, type = "text", placeholder, onChange, onBlur, onFocus, emailSucess, phoneSucess }) => (
    <div className="flex flex-col gap-1 w-full group">
        <label
            htmlFor={id}
            className="text-[10px] font-semibold uppercase tracking-widest text-slate-700 group-focus-within:text-secondary transition-colors ml-0.5"
        >
            {label}
        </label>
        <div

            className="
    flex items-center gap-2 w-full
    bg-base-200 border border-slate-900
    rounded-xl px-3.5 py-2.5
    text-sm text-slate-800 outline-none
    focus-within:border-secondary
    focus-within:ring-4
    focus-within:ring-accent
    focus-within:bg-white
    transition-all duration-200
    font-medium
    
">

            {id === 'phone' && (

                <div className='w-full flex items-center'>
                    <PhoneInput
                        international
                        defaultCountry="IN"
                        value={value}
                        onChange={(value) => onChange(id, value)}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        className=" w-full bg-transparent
        border-none outline-none
h-full 
        focus:ring-0 placeholder:text-slate-600"
                    />
                    {phoneSucess && (
                        <div className="flex items-center justify-center ml-2">
                            <p className="text-success text-xs  flex items-center justify-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g fill="none">
                                        <circle cx="10" cy="14" r="7" fill="currentColor" fill-opacity=".25" />
                                        <path stroke="currentColor" stroke-width="1.2" d="m6 13l4 3l7-9" />
                                    </g>
                                </svg>

                            </p>
                        </div>)}
                </div>
            )}

            {id !== 'phone' && <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={(e) => onChange(id, e.target.value)}
                className="
        w-full bg-transparent
        border-none outline-none
h-full 
        focus:ring-0 placeholder:text-slate-600
    "
            />}

            {id === 'email' && emailSucess && (
                <div className=" w-full h-full flex items-center justify-end">
                    <p className="text-success text-xs  flex items-center justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <g fill="none">
                                <circle cx="10" cy="14" r="7" fill="currentColor" fill-opacity=".25" />
                                <path stroke="currentColor" stroke-width="1.2" d="m6 13l4 3l7-9" />
                            </g>
                        </svg>

                    </p>
                </div>)}



        </div>
    </div>
);

// ─── social link row ──────────────────────────────────────────────────────────
const SocialField = ({ icon, id, value, placeholder, onChange }) => (
    <div className="  flex items-center gap-2 w-full
    bg-base-200 border border-slate-900
    rounded-xl px-3.5 py-2.5
    text-sm text-slate-800 outline-none
    focus-within:border-secondary
    focus-within:ring-4
    focus-within:ring-accent
    focus-within:bg-white
    transition-all duration-200
    font-medium">
        <div className="p-2 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-secondary bg-base-100 ">
            {icon}
        </div>
        <input
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(id, e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-slate-700
                 placeholder:text-slate-500"
        />
    </div>
);

// ─── check item ───────────────────────────────────────────────────────────────
const CheckItem = ({ done, label }) => (
    <div className={`flex items-center gap-2 text-[11px] transition-colors duration-300 ${done ? "text-emerald-600" : "text-slate-400"}`}>
        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300
                     ${done ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
            {done && (
                <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            )}
        </div>
        {label}
    </div>
);

// ─── tip item ─────────────────────────────────────────────────────────────────
const TipItem = ({ emoji, title, body }) => (
    <div className="flex gap-3 py-3 bg-base-100 p-5 rounded-xl mb-2 border border-slate-700">
        <div className="w-8 h-8 border border-slate-700 rounded-lg bg-base-100 flex items-center justify-center flex-shrink-0 text-sm">
            {emoji}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
            <span className="text-slate-800 font-semibold">{title}: </span>
            {body}
        </p>
    </div>
);

// ─── main component ───────────────────────────────────────────────────────────
const StartHeader = ({ data }) => {
    const location = useLocation();
    data = location.state?.resumeData || {};
    const [form, setForm] = useState({
        fname: data?.fname || "",
        lname: data?.lname || "",
        summaryTitle: data?.summaryTitle || "",
        email: data?.email || "",
        phone: data?.phone || "",
        location: data?.location || "",
        pincode: data?.pincode || "",
        linkedin: data?.linkedin || "",
        github: data?.github || "",
        portfolio: data?.portfolio || "",

    });

    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [hoveringImg, setHoveringImg] = useState(false);
    const [hoveringCard, setHoveringCard] = useState(false);
    const [cardRef, isCardVisible] = useIntersectionObserver();

    const handleChange = useCallback((id, val) => {
        setForm((prev) => ({ ...prev, [id]: val }));
    }, []);

    // completeness score
    const checks = [
        { key: "name", done: !!(form.fname && form.lname), label: "Full name added" },
        { key: "email", done: !!form.email, label: "Email address added" },
        { key: "phone", done: !!form.phone, label: "Phone number added" },
        { key: "location", done: !!form.location, label: "Location added" },
        { key: "linkedin", done: !!form.linkedin, label: "LinkedIn linked" },
        { key: "github", done: !!form.github, label: "GitHub linked" },
    ];
    const score = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);

    const resumeData = {
        //header
        fname: form.fname,
        lname: form.lname,
        phone: form.phone,
        github: form.github,
        linkedin: form.linkedin,
        portfolio: form.portfolio,
        email: form.email,
        summaryTitle: form.summaryTitle,
        location: form.location,
        pincode: form.pincode,


    };
    const Navigate = useNavigate();
    const [isVisible] = useIntersectionObserver();
    const [hovered, setHovered] = useState(false);

    const [emailSucess, setEmailSucess] = useState(false);
    const [phoneSucess, setPhoneSucess] = useState(false);





    const navigate = useNavigate();
    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-start justify-center p-4 md:p-6 bg-base-100">
            <div className="w-full bg-base-100 rounded-3xl border border-slate-700 overflow-hidden " >

                {/* ── top bar ── */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-base-200 border-b border-slate-700">

                    <Step index={0} />


                    <ProgressMeter index={0} />

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
                    <div className="p-6 md:p-10 border border-slate-700">
                        <Header index={0} />

                        {/* avatar + name row */}
                        <div className="flex items-start gap-5 mb-6">
                            {/* avatar */}
                            <div
                                className="relative flex-shrink-0 cursor-pointer"
                                onMouseEnter={() => setHoveringImg(true)}
                                onMouseLeave={() => setHoveringImg(false)}
                            >
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-dashed border-slate-600
                                 overflow-hidden relative transition-colors duration-200">
                                    <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <circle cx="12" cy="6" r="4" fill="currentColor" />
                                        <path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" />
                                    </svg>




                                    <div
                                        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center
                                text-white transition-opacity duration-200 rounded-2xl ${hoveringImg ? "opacity-100" : "opacity-0"}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor" fill-rule="evenodd" d="M12 15.75a.75.75 0 0 0 .75-.75V4.027l1.68 1.961a.75.75 0 1 0 1.14-.976l-3-3.5a.75.75 0 0 0-1.14 0l-3 3.5a.75.75 0 1 0 1.14.976l1.68-1.96V15c0 .414.336.75.75.75" clip-rule="evenodd" />
                                            <path fill="currentColor" d="M16 9c-.702 0-1.053 0-1.306.169a1 1 0 0 0-.275.275c-.169.253-.169.604-.169 1.306V15a2.25 2.25 0 1 1-4.5 0v-4.25c0-.702 0-1.053-.169-1.306a1 1 0 0 0-.275-.275C9.053 9 8.702 9 8 9c-2.828 0-4.243 0-5.121.879C2 10.757 2 12.17 2 14.999v1c0 2.83 0 4.243.879 5.122C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.879S22 18.828 22 16v-1c0-2.829 0-4.243-.879-5.121C20.243 9 18.828 9 16 9" />
                                        </svg>

                                        <span className="text-[9px] font-bold uppercase mt-1 tracking-wider">Upload</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-violet-600 rounded-lg border-2 border-white
                                flex items-center justify-center shadow-sm">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </div>
                            </div>

                            {/* name fields inline */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <InputField className="text-black" label="First Name" id="fname" value={form.fname} placeholder="Aman" onChange={handleChange} />
                                <InputField className="text-black" label="Last Name" id="lname" value={form.lname} placeholder="Gupta" onChange={handleChange} />
                            </div>
                        </div>

                        {/* contact fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <InputField className="text-black" label="Email Address" id="email" type="email" value={form.email} placeholder="you@example.com" onChange={(id, value) => {
                                handleChange(id, value);

                            }}
                                onBlur={() => {
                                    if (form.email && !validator.isEmail(form.email)) {
                                        setEmailSucess(false);
                                    } else if (form.email === "" || form.email === null || form.email === undefined) {
                                        setEmailSucess(false);
                                    } else {
                                        setEmailSucess(true);
                                    }
                                }} emailSucess={emailSucess} />

                            <InputField className="text-black" label="Phone Number" id="phone" value={form.phone} placeholder="+91 93892 XXXXX" onChange={handleChange}
                                onBlur={() => {
                                    const isValid = isValidPhoneNumber(form.phone || "");

                                    setPhoneSucess(isValid);
                                }} phoneSucess={phoneSucess}
                            />
                        </div>

                        <div className="mb-4">
                            <InputField className="text-black" label="Summary Title" id="summaryTitle" value={form.summaryTitle} placeholder="Software Engineer" onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                            <InputField className="text-black" label="City & Country" id="location" value={form.location} placeholder="Kanpur, India" onChange={handleChange} />
                            <InputField className="text-black" label="Pincode" id="pincode" value={form.pincode} placeholder="208001" onChange={handleChange} />
                        </div>

                        {/* social links */}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">
                            Online presence
                        </p>
                        <div className="flex flex-col gap-2.5">
                            <SocialField
                                id="linkedin"
                                value={form.linkedin}
                                placeholder="linkedin.com/in/yourname"
                                onChange={handleChange}
                                icon={
                                    <div className=" rounded-md bg-base-100 flex items-center justify-center">

                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="#6f4604ff" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                                        </svg>
                                    </div>
                                }
                            />
                            <SocialField
                                id="github"
                                value={form.github}
                                placeholder="github.com/yourname"
                                onChange={handleChange}
                                icon={
                                    <div className="w-6 h-6 rounded-md bg-base-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="currentcolor" fillRule="evenodd" d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.5 10.5 0 0 1 12 6.32a10.5 10.5 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"></path>
                                        </svg>
                                    </div>
                                }
                            />
                            <SocialField
                                id="portfolio"
                                value={form.portfolio}
                                placeholder="yourportfolio.dev"
                                onChange={handleChange}
                                icon={
                                    <div className="w-6 h-6 rounded-md bg-base-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="currentcolor" d="M14.721 22.66c4.447-1.13 7.812-4.971 8.234-9.66h-4.981c-.186 3.547-1.356 6.847-3.253 9.66M22.955 11c-.422-4.69-3.79-8.532-8.238-9.662c1.898 2.814 3.07 6.114 3.257 9.662zM9.284 1.338C4.834 2.468 1.468 6.31 1.044 11h4.982c.187-3.548 1.359-6.848 3.258-9.662M1.045 13a11.01 11.01 0 0 0 8.234 9.66C7.382 19.847 6.212 16.547 6.026 13zM12 22.962C9.693 20.177 8.248 16.741 8.03 13h7.941c-.22 3.74-1.664 7.177-3.97 9.962M12 1.043c2.307 2.784 3.75 6.219 3.97 9.957H8.03C8.25 7.262 9.694 3.827 12 1.043"></path>
                                        </svg>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    {/* ── RIGHT: sidebar ── */}
                    {sidebarOpen && (
                        <div className="flex flex-col bg-base-200 border-t-0 border-slate-700">
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
                                                transform: hovered ? "scale(1.06)" : "scale(1)",   // subtle zoom on hover
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
                                            opacity: hovered ? 1 : 0,
                                            transition: "opacity 0.3s ease",
                                        }}>
                                            <button
                                                style={{
                                                    padding: "10px 28px",
                                                    borderRadius: "var(--radius-field, 0.5rem)",
                                                    fontWeight: 800, fontSize: 13, color: "#fff",
                                                    // background: item.color,
                                                    border: "none", cursor: "pointer",
                                                    transform: hovered ? "translateY(0)" : "translateY(14px)",
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
                                <div className="p-4 overflow-y-auto ">
                                    <TipItem emoji={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="#6f4604ff" d="M12 13L2 6.76V6c0-1.11.89-2 2-2h16a2 2 0 0 1 2 2v.75zm10 5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.11l2 1.25V18h16v-7.64l2-1.25z"></path>
                                    </svg>} title="Professional email" body="Use name.work@gmail.com — avoid nicknames or random numbers." />
                                    <TipItem emoji={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                                        <g fill="none">
                                            <rect width={38} height={38} x={5} y={5} stroke="#6f4604ff" strokeWidth={4} rx={3}></rect>
                                            <path fill="#6f4604ff" stroke="#6f4604ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M11 12h8v24h-8zm14 0h12v6H25z"></path>
                                            <circle cx={25} cy={24} r={2} fill="#6f4604ff"></circle>
                                            <circle cx={25} cy={30} r={2} fill="#6f4604ff"></circle>
                                            <circle cx={25} cy={36} r={2} fill="#6f4604ff"></circle>
                                            <circle cx={31} cy={24} r={2} fill="#6f4604ff"></circle>
                                            <circle cx={31} cy={30} r={2} fill="#6f4604ff"></circle>
                                            <circle cx={31} cy={36} r={2} fill="#6f4604ff"></circle>
                                            <circle cx={37} cy={24} r={2} fill="#6f4604ff"></circle>
                                            <circle cx={37} cy={30} r={2} fill="#6f4604ff"></circle>
                                            <circle cx={37} cy={36} r={2} fill="#6f4604ff"></circle>
                                        </g>
                                    </svg>} title="Country code" body="Always include +91 (or your code) for international recruiters." />
                                    <TipItem emoji={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="#6f4604ff" d="M12 2c-4.41 0-8 3.59-8 8c-.03 6.44 7.12 11.6 7.42 11.82c.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82c0-4.41-3.59-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4"></path>
                                    </svg>} title="City only" body="List city and country — a full street address wastes prime resume space." />
                                    <TipItem emoji={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="#6f4604ff" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                                    </svg>} title="LinkedIn URL" body="Customise your URL (linkedin.com/in/yourname) for a cleaner link." />
                                    <TipItem emoji={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="#6f4604ff" d="M8.813 11.612c.457-.38.918-.38 1.386.011l.108.098l4.986 4.986l.094.083a1 1 0 0 0 1.403-1.403l-.083-.094L15.415 14l.292-.293l.106-.095c.457-.38.918-.38 1.386.011l.108.098l4.674 4.675a4 4 0 0 1-3.775 3.599L18 22H6a4 4 0 0 1-3.98-3.603l6.687-6.69zM18 2a4 4 0 0 1 3.995 3.8L22 6v9.585l-3.293-3.292l-.15-.137c-1.256-1.095-2.85-1.097-4.096-.017l-.154.14l-.307.306l-2.293-2.292l-.15-.137c-1.256-1.095-2.85-1.097-4.096-.017l-.154.14L2 15.585V6a4 4 0 0 1 3.8-3.995L6 2zm-2.99 5l-.127.007a1 1 0 0 0 0 1.986L15 9l.127-.007a1 1 0 0 0 0-1.986z"></path>
                                    </svg>} title="Photo" body="In India, a professional headshot is generally expected by recruiters." />
                                    <TipItem emoji={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32">
                                        <path fill="#6f4604ff" d="M28 10h-6V6a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2M12 6h8v4h-8ZM4 26V12h24v14Z"></path>
                                    </svg>} title="Portfolio" body="Link your portfolio or GitHub — it adds credibility for tech roles." />
                                </div>
                            )}

                            {/* ── SCORE tab ── */}
                            {activeTab === "score" && (
                                <div className="p-4 overflow-y-auto">
                                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs font-semibold text-slate-500">Header completeness</p>
                                            <p
                                                className="text-sm font-black"
                                                style={{ color: score >= 80 ? "#10B981" : score >= 50 ? "#F59E0B" : "#EF4444" }}
                                            >
                                                {score}%
                                            </p>
                                        </div>
                                        {/* bar */}
                                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-4">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${score}%`,
                                                    background: score >= 80
                                                        ? "linear-gradient(90deg,#7C3AED,#10B981)"
                                                        : score >= 50
                                                            ? "linear-gradient(90deg,#7C3AED,#F59E0B)"
                                                            : "#EF4444",
                                                }}
                                            />
                                        </div>
                                        {/* checklist */}
                                        <div className="flex flex-col gap-2.5">
                                            {checks.map((c) => (
                                                <CheckItem key={c.key} done={c.done} label={c.label} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ── footer ── */}
                <div className="flex items-center justify-end px-6 md:px-10 py-4 bg-base-200 border-t border-slate-700">

                    <button
                        onClick={() => {
                            Navigate("/app/build-resume/intro-exp-page", {
                                state: { resumeData }
                            });
                        }}
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-base-300 text-secondary border-2 border-secondary
                       hover:bg-secondary hover:text-secondary-content  hover:border-base-100 active:scale-95 transition-all duration-200 "
                    >
                        Next: Experience
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5m11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"></path>
                        </svg>
                    </button>
                </div>
            </div >
        </div >
    );
};

export default StartHeader;