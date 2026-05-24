
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import BASE_URL from "./baseURL";
import Welcome from './Welcome';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Toast from '../Resume/2/Toast';
import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';



const TextType = ({
    text,
    as: Component = 'div',
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = '',
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = '|',
    cursorClassName = '',
    cursorBlinkDuration = 0.5,
    textColors = [],
    variableSpeed,
    onSentenceComplete,
    startOnVisible = false,
    reverseMode = false,
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const cursorRef = useRef(null);
    const containerRef = useRef(null);

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const getRandomSpeed = useCallback(() => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return 'inherit';
        return textColors[currentTextIndex % textColors.length];
    };

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut'
            });
        }
    }, [showCursor, cursorBlinkDuration]);

    useEffect(() => {
        if (!isVisible) return;

        let timeout;
        const currentText = textArray[currentTextIndex];
        const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (displayedText === '') {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) {
                        return;
                    }

                    if (onSentenceComplete) {
                        onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
                    }

                    setCurrentTextIndex(prev => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => { }, pauseDuration);
                } else {
                    timeout = setTimeout(() => {
                        setDisplayedText(prev => prev.slice(0, -1));
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < processedText.length) {
                    timeout = setTimeout(
                        () => {
                            setDisplayedText(prev => prev + processedText[currentCharIndex]);
                            setCurrentCharIndex(prev => prev + 1);
                        },
                        variableSpeed ? getRandomSpeed() : typingSpeed
                    );
                } else if (textArray.length >= 1) {
                    if (!loop && currentTextIndex === textArray.length - 1) return;
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseDuration);
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
        isVisible,
        reverseMode,
        variableSpeed,
        onSentenceComplete
    ]);

    const shouldHideCursor =
        hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    return createElement(
        Component,
        {
            ref: containerRef,
            className: `text-type ${className}`,
            ...props
        },
        <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>
            {displayedText}
        </span>,
        showCursor && (
            <span
                ref={cursorRef}
                className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
            >
                {cursorCharacter}
            </span>
        )
    );
};




const stats = [
    {
        label: "Registered Users", value: "1,000+", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
        )
    },
    {
        label: "Active Developers", value: "200+", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        label: "Projects Shipped", value: "100+", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        )
    },
    {
        label: "Resumes Generated", value: "2,000+", icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
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



const Login = () => {

    const [dwldResume, setDwldResume] = useState(false);
    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(openId === id ? null : id);
    const [activeId, setActiveId] = useState(null);


    //intake of the gmail + password
    /*
     here, 
     default gmail = vineetsinghbitu@gmail.com
     default password = Vineet@1234
     */
    const [gmail, setGmailId] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

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
            addToast({
                type: "error",
                title: "Error",
                message:
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            });
        }
    };


    const [toasts, setToasts] = useState([]);



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
    if (showWelcome) {
        return <Welcome />;
    }

    return (
        <div data-theme="caramellatte" className="min-h-screen w-full flex items-center justify-center bg-base-300  p-[20px]">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="w-full bg-base-100  rounded-2xl  flex flex-col md:flex-row gap-6 overflow-hidden border border-secondary border-[3px]">

                {/* LEFT - Login Form */}
                <div className="flex flex-col gap-6 p-5 md:p-12 w-full md:w-[50%] text-white">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-content to-accent leading-tight ">

                            <TextType
                                text={["Welcome Back Developers !", "Let's Collaborate!",]}
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor={true}
                                cursorCharacter="|"
                            />
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl pl-2">Continue your journey with CodeSarthi — where developers grow smarter every day.</p>
                    </div>



                    <form className="space-y-3 flex flex-col" onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-md ml-3 block text-accent-content">Email ID <span className="text-accent-content">*</span></label>
                            <div className="flex items-center rounded-2xl px-4 py-3 border  border-accent bg-base-300    transition-all duration-300">
                                <span className="mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="vivek007@gmail.com"
                                    className="w-full outline-none text-primary bg-base-300 placeholder-accent-content placeholder:opacity-70 text-lg"
                                    required
                                    value={gmail}
                                    onChange={(e) => setGmailId(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-md ml-3 block text-accent-content">Password <span className="text-accent-content">*</span></label>
                            <div className="flex items-center rounded-2xl px-4 py-3 border  border-accent bg-base-300    transition-all duration-300">
                                <span className="mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full outline-none text-primary bg-transparent placeholder-accent-content placeholder:opacity-70 text-lg"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="mr-3 cursor-pointer" onClick={togglePassword}>

                                    {showPassword ?
                                        (< svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"><path d="M3.587 13.779c1.78 1.769 4.883 4.22 8.413 4.22s6.634-2.451 8.413-4.22c.47-.467.705-.7.854-1.159c.107-.327.107-.913 0-1.24c-.15-.458-.385-.692-.854-1.159C18.633 8.452 15.531 6 12 6c-3.53 0-6.634 2.452-8.413 4.221c-.47.467-.705.7-.854 1.159c-.107.327-.107.913 0 1.24c.15.458.384.692.854 1.159" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" /></g></svg>)}

                                </span>

                            </div>
                        </div>






                        {/* Links */}
                        <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-3 px-2">
                            <div className="text-gray-600">
                                New to CodeSarthi?{" "}
                                <Link
                                    to="/signup"
                                    className="text-[#919191] hover:text-accent-content transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                            <div>
                                <a href="#" className="text-[#919191] hover:text-accent-content transition-colors font-medium">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.4 }}
                                disabled={isLoginStart}
                                className={`w-full  bg-base-200 border border-secondary  text-white  py-3 sm:py-4  rounded-2xl sm:rounded-3xl transition-all duration-300  text-base sm:text-xl md:text-2xl  font-semibold  ${isLoginStart ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-800"}`}
                            >
                                {isLoginStart ? (
                                    <div className="flex justify-center items-center gap-2 sm:gap-3 px-2 md:px-3">

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-spin"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="#ffffff"
                                                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z"
                                                opacity={0.25}
                                            />
                                            <path
                                                fill="#ffffff"
                                                d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"
                                            />
                                        </svg>

                                        <span className="text-center text-sm md:text-base lg:text-xl xl:text-2xl text-accent-content ">
                                            Welcome to CodeSarthi — Let’s Build!
                                        </span>

                                    </div>
                                ) : (
                                    <span className="flex text-xl  items-center  justify-center gap-3 text-accent-content">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 16 16">
                                            <g fill="#ffffff">
                                                <path d="M4 16s-1 0-1-1s1-4 5-4s5 3 5 4s-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"></path>
                                                <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"></path>
                                            </g>
                                        </svg>Enter Workspace</span>
                                )}
                            </motion.button>
                        </div>
                    </form>
                    {/* Stats */}





                </div>


                <div className="w-full md:w-[50%] p-6">
                    <div className="w-full h-full bg-base-200 text-accent rounded-2xl p-8 md:p-12 relative overflow-hidden group">

                        <div className="relative z-10 space-y-8">

                            {/* Heading */}
                            <div className="space-y-2">
                                <h1 className="text-3xl text-accent-content md:text-4xl lg:text-5xl font-bold leading-tight font-generalbold">
                                    What Developers Say
                                </h1>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-content">
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
                                        <p className="text-xl font-extrabold text-secondary-content leading-none font-generalbold">{stat.value}</p>
                                        <p className="text-xs text-accent-content leading-tight font-generalbold">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-base md:text-lg text-info bg-base-100 p-3 rounded-2xl border-[3px] border-secondary italic leading-relaxed text-center font-generalbold">
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
                                                    <h3 className="font-bold text-secondary-content text-sm md:text-base">{feature.title}</h3>
                                                    <p className="text-info text-xs md:text-sm truncate">{feature.sub}</p>
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
                                                            <li key={i} className="flex items-center gap-4 text-sm">
                                                                <svg className="rotate-45" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                                                    <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill='#ffffff' />
                                                                </svg>
                                                                <span className="text-info leading-relaxed">
                                                                    <span className="font-semibold text-white">{point.strong}</span>
                                                                    {point.text}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="flex flex-wrap gap-2 pt-1">
                                                        {feature.badges.map((badge) => (
                                                            <span key={badge} className="text-xs px-3 py-1 rounded-full bg-base-300 text-secondary-content border border-secondary">
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

