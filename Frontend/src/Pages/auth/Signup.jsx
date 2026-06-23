
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import BASE_URL from "./baseURL";
import { Link } from "react-router-dom";
import Welcome from './Welcome';
import { motion } from "framer-motion";
import Toast from '../CARRER-PROFILE-CREATION/2/Toast';

import { AnimatePresence } from "framer-motion";
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


const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dwldResume, setDwldResume] = useState(false);
  const [newError, setNewError] = useState(false);
  const [errorisOpen, errorsetIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeId, setActiveId] = useState(null);


  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    gender: '',
    age: '',
    gmail: '',
    password: '',
    profession: '',
    college: '',
    termsAccepted: false,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newErrors = {};



    if (!formData.termsAccepted) {
      addToast({
        type: "error",
        title: "Error",
        message: "Please accept terms and conditions",
      });
      return;
    }
    for (const key in formData) {
      if (key !== "middleName" && !formData[key]) {
        addToast({
          type: "error",
          title: "Error",
          message: "Please fill all the required fields",
        });

        return;
      }
    }
    if (Object.keys(newErrors).length > 0) {
      addToast({
        type: "error",
        title: "Error",
        message: "Please fill above fields",
      });
      return;
    }
    try {
      // ✅ 2. START LOADING
      setIsSubmitting(true);
      const payload = {
        ...formData,
        age: Number(formData.age),
        gmail: formData.gmail.toLowerCase()
      };

      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        payload,
        { withCredentials: true }
      );

      // ✅ 3. SAVE USER
      dispatch(addUser(res.data)); // or res.data.user

      setShowWelcome(true)
      // ✅ 4. NAVIGATE
      setTimeout(() => {
        setShowWelcome(false)
        navigate("/app");
      }, 4500);

    } catch (err) {
      addToast({
        type: "error",
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
      });
    } finally {
      // ✅ 5. ALWAYS RESET LOADING 
      setIsSubmitting(false);
    }
  };


  // UI state
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId(openId === id ? null : id);


  const validatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
          : id === "age"
            ? Number(value)
            : id === "gmail"
              ? value.toLowerCase().trim()
              : value
    }));

    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }

    if (id === "password") {
      validatePasswordStrength(value);
    }
  };



  const generateUsername = () => {
    const firstName = formData.firstName.toLowerCase();
    const lastName = formData.lastName.toLowerCase();
    const randomNum = Math.floor(Math.random() * 1000);
    const username = `${firstName}_${lastName}${randomNum}`;

    setFormData(prev => ({ ...prev, username }));
    setErrors(prev => ({ ...prev, username: '' }));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-600';
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };


  const [toasts, setToasts] = useState([]);


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
    <div data-theme="caramellatte" className="min-h-screen w-full flex items-center justify-center bg-gray-300   p-1">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="w-full min-h-[98vh] bg-black  rounded-[40px]  flex flex-col md:flex-row gap-6 overflow-hidden border border-secondary">

        {/* LEFT - Signup Form */}
        <div className="flex flex-col gap-8  p-6  md:p-12 w-full md:w-[50%] text-white">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-content to-accent leading-tight ">
              <TextType
                text={["Create Account !", "Let's Collaborate!",]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </h1>
            <p className="text-info text-lg md:text-xl pl-2 flex items-center gap-2">
              Enter your details to join the smart developers community!


            </p>
          </div>



          <form onSubmit={handleUpdate} className="space-y-8 flex flex-col text-accent-content">

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 ">
                <label htmlFor="firstName" className="text-md ml-3 block text-accent-content-content">
                  First Name <span className="text-white ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Vinay"
                    className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                    value={formData['firstName']}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-md ml-3 block text-accent-content-content">
                  Middle Name
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="middleName"
                    type="text"
                    placeholder="Singh"
                    className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                    value={formData['middleName']}
                    onChange={handleChange}
                    required={false}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-md ml-3 block text-accent-content-content">
                  Last Name <span className="text-white ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Chandel"
                    className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                    value={formData['lastName']}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {/* Username with Generator */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="username" className="text-md ml-3 block text-accent-content-content">
                  Username <span className="text-white ml-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateUsername}
                  className="text-sm text-[#919191] hover:text-secondary-content flex items-center gap-2 transition-colors"
                  disabled={!formData.firstName || !formData.lastName}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                  Generate
                </button>
              </div>
              <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14">
                    <g fill="none">
                      <path stroke="#ffffff" d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
                      <path fill="#ffffff" d="M7 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
                    </g>
                  </svg>
                </span>
                <input
                  id="username"
                  type="text"
                  placeholder="vinay_chandel"
                  className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                  value={formData.username}
                  onChange={handleChange}
                  required={true}
                />
              </div>

            </div>

            {/* Gender & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="gender" className="text-md ml-3 block text-accent-content-content">
                  Gender <span className="text-white ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v10M12 22v-10M2 12h10M22 12H12" />
                    </svg>
                  </span>
                  <select
                    id="gender"
                    className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                    value={formData.gender}
                    onChange={handleChange}
                    required={true}
                  >
                    <option value="" disabled hidden className="text-gray-500">Select Gender</option>
                    <option value="male" className="bg-gray-900 text-white">Male</option>
                    <option value="female" className="bg-gray-900 text-white">Female</option>
                    <option value="other" className="bg-gray-900 text-white">Other</option>

                  </select>

                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="age" className="text-md ml-3 block text-accent-content-content">
                  Age <span className="text-white ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <input
                    id="age"
                    type="number"
                    min="10"
                    max="100"
                    placeholder="25"
                    className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                    value={formData.age}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="gmail" className="text-md ml-3 block text-accent-content-content">
                Email <span className="text-white ml-1">*</span>
              </label>
              <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="gmail"
                  type="email"
                  placeholder="vinay@example.com"
                  className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                  value={formData.gmail}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* Password with Strength Meter */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-md ml-3 block text-accent-content-content">
                  Password <span className="text-white ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="textsecondary transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Strength Meter */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-content">Password strength:</span>
                  <span className={`font-medium ${passwordStrength <= 2 ? 'text-white' : passwordStrength === 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Medium' : 'Strong'}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength * 25}%` }}
                  />
                </div>
                <ul className="text-xs text-info space-y-1 ml-3">
                  <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                    <span>{formData.password.length >= 8 ? '✓' : '○'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span>{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span>{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                    One number
                  </li>
                  <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span>{/[^A-Za-z0-9]/.test(formData.password) ? '✓' : '○'}</span>
                    One special character
                  </li>
                </ul>
              </div>
            </div>


            <div className='flex justify-between items-center w-full'>
              <div className="space-y-2 w-[48.5%]">
                <label htmlFor="college" className="text-md ml-3 block text-accent-content-content">
                  Oganization <span className="text-white ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                        <path stroke="#ffffff" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                        <path stroke="#ffffff" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                        <path stroke="#ffffff" d="M27.083 27.083h-4.166v4.167h4.166z" />
                      </g>
                    </svg>
                  </span>
                  <input
                    id="college"
                    type="text"
                    placeholder="Institute | Organization"
                    className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2  w-[48.5%]">
                <label htmlFor="profession" className="text-md ml-3 block text-accent-content-content">
                  Profession <span className="text-white ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300    focus-within:  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                        <path stroke="#ffffff" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                        <path stroke="#ffffff" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                        <path stroke="#ffffff" d="M27.083 27.083h-4.166v4.167h4.166z" />
                      </g>
                    </svg>
                  </span>
                  <input
                    id="profession"
                    type="text"
                    placeholder="Student | Developer | Designer"
                    className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>



            {/* Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-3 px-2">

              <div className='flex gap-3 items-center'>
                <label className="toggle text-base-content bg-base-300">
                  <input type="checkbox"
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        termsAccepted: e.target.checked
                      }))
                    } checked={formData.termsAccepted} />
                  <svg
                    aria-label="disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="4"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </g>
                  </svg>

                </label>
                <span className='text-gray-600'>
                  I agree to the{" "}
                  <a href="/terms-and-conditions" className="text-[#919191] hover:text-secondary-content transition-colors">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-&-policy-hub" className="text-[#919191] hover:text-secondary-content transition-colors">
                    Privacy Policy
                  </a>.
                </span>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                whileTap={{ scale: 0.4 }}
                whileHover={{ scale: 1.1 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full  bg-white border border-secondary   py-2 sm:py-3  rounded-2xl sm:rounded-3xl transition-all duration-300   sm:text-xl md:text-2xl  font-semibold  ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-800"}`}
              >
                {isSubmitting ? (
                  <div className="flex justify-center items-center gap-1 sm:gap-2 px-2 md:px-3">

                    <div className="relative">
                      <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative w-4 h-4 sm:w-6 sm:h-6 text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx={4} cy={12} r={2.5} className="opacity-70">
                          <animate
                            id="dot1"
                            attributeName="cy"
                            begin="0;dot3.end+0.2s"
                            calcMode="spline"
                            dur="0.6s"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                            values="12;7;12"
                          />
                          <animate
                            attributeName="opacity"
                            begin="0;dot3.end+0.2s"
                            dur="0.6s"
                            values="0.4;1;0.4"
                          />
                        </circle>

                        <circle cx={12} cy={12} r={2.5}>
                          <animate
                            attributeName="cy"
                            begin="dot1.begin+0.1s"
                            calcMode="spline"
                            dur="0.6s"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                            values="12;7;12"
                          />
                          <animate
                            attributeName="opacity"
                            begin="dot1.begin+0.1s"
                            dur="0.6s"
                            values="0.4;1;0.4"
                          />
                        </circle>

                        <circle cx={20} cy={12} r={2.5} className="opacity-70">
                          <animate
                            id="dot3"
                            attributeName="cy"
                            begin="dot1.begin+0.2s"
                            calcMode="spline"
                            dur="0.6s"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                            values="12;7;12"
                          />
                          <animate
                            attributeName="opacity"
                            begin="dot1.begin+0.2s"
                            dur="0.6s"
                            values="0.4;1;0.4"
                          />
                        </circle>
                      </svg>
                    </div>

                    <span className="text-center text-black text-sm md:text-base lg:text-xl xl:text-2xl ">
                      CodeSarthi welcomes you
                    </span>

                  </div>
                ) : (
                  <span className="text-center text-sm md:text-base text-black lg:text-xl xl:text-2xl ">Create Account</span>
                )}
              </motion.button>
            </div>

            <div className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#919191] hover:text-secondary-content transition-colors"
              >
                Sign In
              </Link>
            </div>

          </form>


        </div>

        {/* RIGHT - Content Panel */}

        <div className="w-full md:w-[50%] p-3 md:p-6">
          <div className="w-full h-full bg-base-200 text-accent-content rounded-2xl p-4 sm:p-6  md:p-12 relative overflow-hidden group">

            <div className="relative z-10 space-y-8">

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl text-info md:text-4xl lg:text-5xl font-bold leading-tight font-generalbold">
                  What Developers Say
                </h1>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-info">
                  About <span className="text-white font-extrabold font-generalbold  px-2">CodeSarthi</span>,
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
                    <p className="text-xs text-accent-content-content leading-tight font-generalbold">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-base md:text-lg text-info bg-base-100 p-3 rounded-2xl  border-secondary italic leading-relaxed text-center font-generalbold">
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
                          className={`flex-shrink-0 text-accent-content transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
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


      </div >


    </div >

  );
};
export default Signup;