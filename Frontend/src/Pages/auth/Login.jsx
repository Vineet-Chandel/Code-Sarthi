import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "./baseURL";
import Welcome from './Welcome';

const stats = [
    {
        label: "Registered Users", value: "1,000+", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
        )
    },
    {
        label: "Active Developers", value: "200+", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        label: "Projects Shipped", value: "100+", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        )
    },
    {
        label: "Resumes Generated", value: "2,000+", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        )
    },
];
const features = [
    {
        id: "collab",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1" />
                <path d="M15 3H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h4a2 2 0 002-2V5a2 2 0 00-2-2z" />
            </svg>
        ),
        title: "Real-time Collaboration Layer",
        sub: "Messaging, meetings, and code — all in one space",
        badges: ["Live chat", "Voice & video", "Rich media"],
        points: [
            { strong: "Unified messaging", text: " — team channels, DMs, and threaded discussions without switching apps." },
            { strong: "Voice & video calls", text: " — built-in meeting rooms, no third-party conferencing needed." },
            { strong: "Rich media sharing", text: " — share code snippets, screenshots, and files with context-aware previews." },
        ],
    },
    {
        id: "resume",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        title: "AI-Powered Resume Engine",
        sub: "ATS-friendly resumes tailored to every role",
        badges: ["AI analysis", "ATS-optimised", "Multi-template"],
        points: [
            { strong: "Smart onboarding", text: " — captures skills, education, projects, and achievements during signup." },
            { strong: "Role-adaptive tailoring", text: " — AI rewrites and highlights experiences based on the job description." },
            { strong: "ATS compatibility", text: " — structured output passes automated screening filters at top companies." },
            { strong: "Portfolio generation", text: " — builds a shareable developer portfolio alongside the resume." },
        ],
    },
    {
        id: "projects",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        title: "Smart Project Scheduler",
        sub: "AI insights that replace the need for a dedicated PM",
        badges: ["Dashboards", "Workspaces", "Bottleneck alerts"],
        points: [
            { strong: "Team workspaces", text: " — create projects, form teams, and collaborate in shared environments." },
            { strong: "Personal task boards", text: " — every developer gets a private space to manage their goals and backlog." },
            { strong: "Leader dashboard", text: " — track contributions, visualise productivity, and spot blockers instantly." },
            { strong: "AI bottleneck detection", text: " — proactively surfaces blocked tasks before they delay your sprint." },
        ],
    },


];

const developers = [
    {
        id: "dev1",
        name: "Vineet Singh Chandel",
        role: "Full Stack Developer",
        avatar: "VC",
        gradient: "from-purple-500 to-indigo-600",
        bio: "I didn’t just contribute to CodeSarthi — I engineered it from the ground up, shaping both the experience and the architecture to reflect how modern developers actually work.",
        skills: ["React", "Node.js", "WebSockets", "MongoDB"],
        github: "https://github.com/Vineet-Chandel",
        linkedin: "https://www.linkedin.com/in/vineet-singh-chandel-aa542736a/",
        contributions: [
            "Architected and built CodeSarthi from scratch, defining both system design and user experience.",
            "Designed and implemented a real-time collaboration layer (chat, voice, and interactions).",
            "Engineered a scalable backend architecture with secure authentication and API design.",
        ],
        stats: { commits: "700", projects: "7+" },
    },

];

const Login = () => {
    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(openId === id ? null : id);
    const [activeId, setActiveId] = useState(null);

    const active = developers.find((d) => d.id === activeId);
    //intake of the gmail + password
    /*
     here, 
     default gmail = vineetsinghbitu@gmail.com
     default password = Vineet@1234
     */
    const [gmail, setGmailId] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [newError, setNewError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errorisOpen, errorsetIsOpen] = useState(false);
    const [isLoginStart, setIsLoginStart] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    //redux management
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const togglePassword = () => {
        setShowPassword(prev => !prev);
    }

    const ToggleDiv = () => {
        setIsOpen(prev => !prev);
    }

    const erroToggleDiv = () => {
        errorsetIsOpen(prev => !prev);
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setIsLoginStart(true);

            const res = await axios.post(
                `${BASE_URL}/auth/signin`,
                { gmail, password },
                { withCredentials: true }
            );

            const user = res.data;
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(addUser(user));

            setIsLoginStart(false);
            setShowWelcome(true)
            setTimeout(() => {
                setIsLoginStart(false)
                setShowWelcome(false)
                navigate("/app");
            }, 4500);

        } catch (error) {
            setIsLoginStart(false);
            const message = error.response?.data?.message || "Something went wrong";
            setNewError(message);
            errorsetIsOpen(true);
        }
    };

    const demoAccouts = [
        {
            adminID: 1, Gmail: "vineetsinghk06@gmail.com", password: "Vineet@1234"
        },
        {
            adminID: 2, Gmail: "rohit.admin@codesarthi.com", password: "Rohit@Admin1"
        },
        {
            adminID: 3, Gmail: "neha.admin@codesarthi.com", password: "Neha@Admin9"
        }
    ]

    if (showWelcome) {
        return <Welcome />;
    }

    return (
        <div data-theme="caramellatte" className="min-h-screen w-full flex items-center justify-center bg-base-300 px-[50px]">
            <div className="w-full bg-base-100  rounded-2xl  flex flex-col md:flex-row gap-6 overflow-hidden border border-secondary border-[3px]">

                {/* LEFT - Login Form */}
                <div className="flex flex-col gap-6 p-5 md:p-12 w-full md:w-[50%] text-white">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary leading-tight ">
                            Welcome Back !
                        </h1>
                        <p className="text-gray-700 text-lg md:text-xl pl-2">Continue your journey with CodeSarthi — where developers grow smarter every day.</p>
                    </div>

                    <div className="flex text-xl font-bold items-center gap-2 cursor-pointer text-secondary" onClick={ToggleDiv}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#7a3d05ff" d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46" /></svg>Try Demo Account</div>
                    <div className={`${isOpen ? "block" : "hidden "} h-[250px] w-[70%] bg-transparent`}>
                        <div className="text-lg h-[100%] flex text-gray-300 flex-col gap-1">
                            {demoAccouts.map((item) => (
                                <ul key={item.adminID} className="group border rounded-xl border-white  h-[33.33%] p-4 flex justify-center items-start  bg-black hover:border-blue-400">
                                    <div className="flex flex-col justify-center items-start w-full">
                                        <li className="flex gap-2 justify-center items-center"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path fill="skyblue" d="M3 5v-.5a.5.5 0 0 0-.5.5zm18 0h.5a.5.5 0 0 0-.5-.5zM3 5.5h18v-1H3zM20.5 5v12h1V5zM19 18.5H5v1h14zM3.5 17V5h-1v12zM5 18.5A1.5 1.5 0 0 1 3.5 17h-1A2.5 2.5 0 0 0 5 19.5zM20.5 17a1.5 1.5 0 0 1-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5z" /><path stroke="skyblue" strokeLinecap="round" strokeLinejoin="round" d="m3 5l9 9l9-9" strokeWidth="1" /></g></svg> <span className="text-cyan-300">Email address :</span> {item.Gmail}</li>
                                        <li className="flex gap-2 justify-center items-center"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="skyblue" d="M13.35 16H2.65C1.74 16 1 15.26 1 14.35v-7.7C1 5.74 1.74 5 2.65 5h10.7c.91 0 1.65.74 1.65 1.65v7.69c0 .91-.74 1.65-1.65 1.65ZM2.65 6c-.36 0-.65.29-.65.65v7.69c0 .36.29.65.65.65h10.7c.36 0 .65-.29.65-.65V6.65c0-.36-.29-.65-.65-.65z" /><path fill="skyblue" d="M12.54 6H3.46V4.54C3.46 2.04 5.5 0 8 0s4.54 2.04 4.54 4.54zM4.46 5h7.08v-.46C11.54 2.59 9.95 1 8 1S4.46 2.59 4.46 4.54z" /><circle cx="12" cy="10.5" r="1" fill="skyblue" /><circle cx="8" cy="10.5" r="1" fill="skyblue" /><circle cx="4" cy="10.5" r="1" fill="skyblue" /></svg> <span className="text-cyan-300">Password : </span>{item.password}</li>
                                    </div>
                                    <div className=" arrow h-10 w-10 border border-gray-500 rounded-full bg-gray-900 flex justify-center items-center group-hover:bg-gray-800 group-hover:rotate-45 transition-hover duration-[300ms]"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M34 24.008H6M22 12l12 12l-12 12m20-24v24" /></svg></div>
                                </ul>


                            ))}

                        </div>
                    </div>

                    <form className="space-y-3 flex flex-col" onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-md ml-3 block text-accent">Email ID<span className="text-orange-500">*</span></label>
                            <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                                <span className="mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="vivek007@gmail.com"
                                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
                                    required
                                    value={gmail}
                                    onChange={(e) => setGmailId(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-md ml-3 block text-accent">Password <span className="text-orange-500">*</span></label>
                            <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                                <span className="mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="mr-3 cursor-pointer" onClick={togglePassword}>

                                    {showPassword ?
                                        (< svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#7a3d05ff" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#7a3d05ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"><path d="M3.587 13.779c1.78 1.769 4.883 4.22 8.413 4.22s6.634-2.451 8.413-4.22c.47-.467.705-.7.854-1.159c.107-.327.107-.913 0-1.24c-.15-.458-.385-.692-.854-1.159C18.633 8.452 15.531 6 12 6c-3.53 0-6.634 2.452-8.413 4.221c-.47.467-.705.7-.854 1.159c-.107.327-.107.913 0 1.24c.15.458.384.692.854 1.159" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" /></g></svg>)}

                                </span>

                            </div>
                        </div>




                        <div className="space-y-2">
                            <div className={`${errorisOpen ? "block" : "hidden "} flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-red/50  transition-all duration-30 `} >
                                <span className="mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FF6F6F" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
                                </span>
                                <div className="text-red-500 ml-2">
                                    {newError}
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-3 px-2">
                            <div className="text-gray-700">
                                New to CodeSarthi?{" "}
                                <Link
                                    to="/signup"
                                    className="text-[#193ab7] hover:text-accent transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                            <div>
                                <a href="#" className="text-[#193ab7] hover:text-accent transition-colors font-medium">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoginStart}
                                className={`w-full  bg-base-300 border-2 border-secondary  text-white  py-3 sm:py-4  rounded-2xl sm:rounded-3xl transition-all duration-300  text-base sm:text-xl md:text-2xl  font-semibold  ${isLoginStart ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-800"}`}
                            >
                                {isLoginStart ? (
                                    <div className="flex justify-center items-center gap-2 sm:gap-3 px-2 md:px-3">

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-spin"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="#7a3d05ff"
                                                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z"
                                                opacity={0.25}
                                            />
                                            <path
                                                fill="#7a3d05ff"
                                                d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"
                                            />
                                        </svg>

                                        <span className="text-center text-sm md:text-base lg:text-xl xl:text-2xl text-accent ">
                                            Welcome to CodeSarthi — Let’s Build!
                                        </span>

                                    </div>
                                ) : (
                                    <span className="flex   items-center  justify-center gap-3 text-accent">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 16 16">
                                            <g fill="#7a3d05ff">
                                                <path d="M4 16s-1 0-1-1s1-4 5-4s5 3 5 4s-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"></path>
                                                <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"></path>
                                            </g>
                                        </svg>Enter Workspace</span>
                                )}
                            </button>
                        </div>
                    </form>
                    {/* Stats */}


                    <div className="w-full py-8 px-6 md:px-12 bg-base-200 relative overflow-hidden  mt-5  rounded-3xl">

                        {/* Background blobs */}
                        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 max-w-6xl mx-auto space-y-12">

                            {/* Section heading */}
                            <div className="text-center space-y-3 ">
                                <h2 className="text-4xl md:text-5xl font-bold text-accent leading-tight font-generalbold flex flex-col gap-1">

                                    <span >Built by Developer,{" "}</span>
                                    <span className="text-secondary font-extrabold bg-yellow-300 py-1 font-generalbold">
                                        For Developers
                                    </span>
                                </h2>
                            </div>

                            {/* Developer Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
                                {developers.map((dev) => {
                                    const isActive = activeId === dev.id;
                                    return (
                                        <div
                                            key={dev.id}
                                            onClick={() => setActiveId(isActive ? null : dev.id)}
                                            className={`bg-base-300 rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:scale-[1.02] group/card ${isActive
                                                ? "border-secondary/60 shadow-lg shadow-secondary/10"
                                                : "border-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            {/* Avatar + name */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dev.gradient} flex items-center justify-center font-bold text-white text-lg flex-shrink-0 shadow-md`}>
                                                    {dev.avatar}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-secondary text-2xl font-generalbold">{dev.name}</h3>
                                                    <p className="text-secondary text-md font-medium">{dev.role}</p>
                                                </div>
                                            </div>

                                            {/* Bio */}
                                            <p className="text-accent text-sm leading-relaxed mb-4">{dev.bio}</p>

                                            {/* Skill badges */}
                                            <div className="flex flex-wrap gap-2 mb-4 ">

                                                <a
                                                    href='https://drive.google.com/file/d/1J8DmgZ6Mgl02RnkzLd7IMn955_Jrpk-m/view?usp=sharing'
                                                    className="text-xs px-2.5 py-2 rounded-full border border-secondary bg-base-100 text-accent hover:bg-secondary hover:text-base-100 flex items-center justify-center gap-1"
                                                >
                                                    RESUME <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="m8 12l4 4m0 0l4-4m-4 4V4m7 13v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17"></path></svg>
                                                </a>

                                            </div>

                                            {/* Stats row */}
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                {[
                                                    { label: "Commits", val: dev.stats.commits },
                                                    { label: "Projects", val: dev.stats.projects },
                                                ].map((s) => (
                                                    <div key={s.label} className="bg-base-100 rounded-xl p-2 text-center border border-white/5">
                                                        <p className="text-secondary font-bold text-sm">{s.val}</p>
                                                        <p className="text-accent text-xs">{s.label}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Expandable contributions */}
                                            <div className={`overflow-hidden transition-all duration-300 ${isActive ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                                                <div className="border-t border-white/10 pt-3 space-y-2 mb-4">
                                                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Key Contributions</p>
                                                    {dev.contributions.map((c, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-sm">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" className="flex-shrink-0 mt-0.5">
                                                                <polyline fill="none" stroke="#6c3c00" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} points="2.75 8.75 6.25 12.25 13.25 4.75" />
                                                            </svg>
                                                            <span className="text-accent leading-snug">{c}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Social links + expand hint */}
                                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                                <div className="flex gap-3">
                                                    <a
                                                        href={dev.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-accent/50 hover:text-secondary transition-colors duration-200"
                                                    >
                                                        <div className='border-2 border-secondary p-1.5 rounded-full '>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><defs><mask id="SVGcZ81hcNk"><path fill="#fff" d="M9.5 8c0.83 0 1.5 0.45 1.5 1c0 0.55 -0.67 1 -1.5 1c-0.83 0 -1.5 -0.45 -1.5 -1c0 -0.55 0.67 -1 1.5 -1ZM14.5 8c0.83 0 1.5 0.45 1.5 1c0 0.55 -0.67 1 -1.5 1c-0.83 0 -1.5 -0.45 -1.5 -1c0 -0.55 0.67 -1 1.5 -1Z"></path><rect width={8} height={4} x={8} y={7}><animate attributeName="y" dur="9s" keyTimes="0;0.45;0.46;0.54;0.55;1" repeatCount="indefinite" values="7;7;11;11;7;7"></animate></rect></mask></defs><path fill="#6c3c00" fillOpacity={0} d="M15 4.5c-0.39 -0.1 -1.33 -0.5 -3 -0.5c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5v4h6v-4c0 -0.63 0.15 -1.96 -0.5 -2.5c1.39 -0.13 2.48 -0.58 3.5 -1.5c1.02 -0.92 1.5 -2.31 1.5 -4.5c0 -1.5 -0.25 -2.5 -1 -3.5c0.29 -0.78 0.34 -2 0 -3c-1.56 0 -2.97 1.07 -3.5 1.5Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.9s" dur="0.15s" to={0.3}></animate></path><g fill="none" stroke="#6c3c00" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={32} d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="32;0"></animate></path><path strokeDasharray={10} strokeDashoffset={10} d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.62 -1.09 -1.66 -2.31 -2.31"><animate attributeName="d" dur="3s" keyTimes="0;0.5;1" repeatCount="indefinite" values="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.62 -1.09 -1.66 -2.31 -2.31;M9 19c-1.41 0 -3 -0.5 -4 -0.5c-0.53 0 -1 0 -2 -0.5;M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.62 -1.09 -1.66 -2.31 -2.31"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" to={0}></animate></path></g><path fill="#6c3c00" d="M0 0h24v24H0z" mask="url(#SVGcZ81hcNk)"></path></svg>
                                                        </div>
                                                    </a>
                                                    <a
                                                        href={dev.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-accent/50 hover:text-secondary transition-colors duration-200"
                                                    >
                                                        <div className='border-2 border-secondary p-2 rounded-xl '>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20"><path fill="#6c3c00" d="M17.04 17.043h-2.962v-4.64c0-1.107-.023-2.531-1.544-2.531c-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.844v1.3h.039c.397-.75 1.364-1.54 2.808-1.54c3.001 0 3.556 1.974 3.556 4.545zM4.447 6.194c-.954 0-1.72-.771-1.72-1.72s.767-1.72 1.72-1.72a1.72 1.72 0 0 1 0 3.44m1.484 10.85h-2.97V7.5h2.97zM18.522 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.644 1.482-1.44V1.44C20 .646 19.333 0 18.518 0z"></path></svg>
                                                        </div>
                                                    </a>
                                                </div>
                                                <span className="text-xs text-accent">
                                                    {isActive ? "collapse ↑" : "contributions ↓"}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                            {/* Bottom tagline */}
                            <div className="text-center">
                                <p className="text-accent text-sm">
                                    Made in <span className="text-secondary font-generalbold bg-yellow-300 px-2">INDIA 🇮🇳</span> — open to contributors &amp; collaborators
                                </p>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="w-full md:w-[50%] p-6">
                    <div className="w-full h-full bg-base-300 text-accent rounded-2xl p-8 md:p-12 relative overflow-hidden group">

                        {/* Animated Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-1000" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full translate-y-20 -translate-x-20 group-hover:scale-125 transition-transform duration-1000 delay-300" />
                        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000 delay-150" />

                        <div className="relative z-10 space-y-8">

                            {/* Heading */}
                            <div className="space-y-2">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-generalbold">
                                    What Developers Say
                                </h1>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
                                    About <span className="text-secondary font-extrabold font-generalbold bg-yellow-300 px-2">CodeSarthi</span> ,
                                </h1>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-base-100 rounded-2xl p-4 border border-white/5 hover:border-white/20 hover:scale-[1.03] transition-all duration-300 flex flex-col gap-2"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
                                            {stat.icon}
                                        </div>
                                        <p className="text-xl font-extrabold text-secondary leading-none font-generalbold">{stat.value}</p>
                                        <p className="text-xs text-accent/70 leading-tight font-generalbold">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-base md:text-lg text-secondary bg-base-100 p-3 rounded-2xl border-[3px] border-secondary italic leading-relaxed text-center font-generalbold">
                                "CodeSarthi transformed how I build and grow — from real-time collaboration and AI-driven insights to smart resume analysis, intelligent planning, and seamless project management."
                            </p>

                            {/* Feature Cards */}
                            <div className="space-y-3">
                                {features.map((feature) => {
                                    const isOpen = openId === feature.id;
                                    return (
                                        <div
                                            key={feature.id}
                                            className="bg-base-100 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
                                        >
                                            <div
                                                className="flex items-center gap-3 p-4 cursor-pointer"
                                                onClick={() => toggle(feature.id)}
                                            >
                                                <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-base-100 flex-shrink-0">
                                                    {feature.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-secondary text-sm md:text-base">{feature.title}</h3>
                                                    <p className="text-accent text-xs md:text-sm truncate">{feature.sub}</p>
                                                </div>
                                                <svg
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round" width={16} height={16}
                                                    className={`flex-shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                                                >
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </div>

                                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                                <div className="px-4 pb-4 border-t border-white/10 pt-3 space-y-3">
                                                    <ul className="space-y-2">
                                                        {feature.points.map((point, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" className="flex-shrink-0 mt-0.5">
                                                                    <polyline fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} points="2.75 8.75 6.25 12.25 13.25 4.75" />
                                                                </svg>
                                                                <span className="text-accent leading-relaxed">
                                                                    <span className="font-semibold text-secondary">{point.strong}</span>
                                                                    {point.text}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="flex flex-wrap gap-2 pt-1">
                                                        {feature.badges.map((badge) => (
                                                            <span key={badge} className="text-xs px-3 py-1 rounded-full bg-base-300 text-secondary border border-secondary">
                                                                {badge}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                    </div>

                </div >

                {/* Add CSS for animations */}
                <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
            </div >
        </div >
    );
}

export default Login;

