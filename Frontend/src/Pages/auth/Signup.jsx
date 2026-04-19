import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import BASE_URL from "./baseURL";
import { Link } from "react-router-dom";
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

  const [newError, setNewError] = useState(false);
  const [errorisOpen, errorsetIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const active = developers.find((d) => d.id === activeId);
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

    for (const key in formData) {
      if (key !== "middleName" && !formData[key]) {
        newErrors[key] = "Required";
      }
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Accept terms";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      setNewError(err?.response?.data?.message || err.message);
      errorsetIsOpen(true);
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
  if (showWelcome) {
    return <Welcome />;
  }
  return (
    <div data-theme="caramellatte" className="min-h-screen w-full flex items-center justify-center bg-base-300 px-[50px] py-3">

      <div className="w-full bg-base-100  rounded-3xl border border-secondary border-[3px] flex flex-col md:flex-row gap-6 overflow-hidden  transition-all duration-500">

        {/* LEFT - Signup Form */}
        <div className="flex flex-col gap-8 p-8 md:p-12 w-full md:w-[50%] text-white">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary leading-tight ">
              Create Account
            </h1>
            <p className="text-gray-700 text-lg md:text-xl pl-2">
              Enter your details to join the smart developers community! 🚀
            </p>
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
          <form onSubmit={handleUpdate} className="space-y-8 flex flex-col text-accent">

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 ">
                <label htmlFor="firstName" className="text-md ml-3 block">
                  First Name <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Vinay"
                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
                    value={formData['firstName']}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-md ml-3 block">
                  Middle Name
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="middleName"
                    type="text"
                    placeholder="Singh"
                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
                    value={formData['middleName']}
                    onChange={handleChange}
                    required={false}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-md ml-3 block">
                  Last Name <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Chandel"
                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
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
                <label htmlFor="username" className="text-md ml-3 block">
                  Username <span className="text-red-400 ml-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateUsername}
                  className="text-sm text-accent hover:text-secondary flex items-center gap-2 transition-colors"
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
              <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 14 14">
                    <g fill="none">
                      <path stroke="#370a00" d="M13.5 10.5v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2" />
                      <path fill="#370a00" d="M7 6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4m3.803 4.5a3.994 3.994 0 0 0-7.606 0z" />
                    </g>
                  </svg>
                </span>
                <input
                  id="username"
                  type="text"
                  placeholder="vinay_chandel"
                  className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
                  value={formData.username}
                  onChange={handleChange}
                  required={true}
                />
              </div>

            </div>

            {/* Gender & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="gender" className="text-md ml-3 block">
                  Gender <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v10M12 22v-10M2 12h10M22 12H12" />
                    </svg>
                  </span>
                  <select
                    id="gender"
                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
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
                <label htmlFor="age" className="text-md ml-3 block">
                  Age <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2">
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
                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
                    value={formData.age}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="gmail" className="text-md ml-3 block">
                Email <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="gmail"
                  type="email"
                  placeholder="vinay@example.com"
                  className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
                  value={formData.gmail}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* Password with Strength Meter */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-md ml-3 block">
                  Password <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#370a00" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  <span className="text-secondary">Password strength:</span>
                  <span className={`font-medium ${passwordStrength <= 2 ? 'text-red-400' : passwordStrength === 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Medium' : 'Strong'}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength * 25}%` }}
                  />
                </div>
                <ul className="text-xs text-accent space-y-1 ml-3">
                  <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green-400' : ''}`}>
                    <span>{formData.password.length >= 8 ? '✓' : '○'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}`}>
                    <span>{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? 'text-green-400' : ''}`}>
                    <span>{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                    One number
                  </li>
                  <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-400' : ''}`}>
                    <span>{/[^A-Za-z0-9]/.test(formData.password) ? '✓' : '○'}</span>
                    One special character
                  </li>
                </ul>
              </div>
            </div>


            <div className='flex justify-between items-center w-full'>
              <div className="space-y-2 w-[48.5%]">
                <label htmlFor="college" className="text-md ml-3 block ">
                  College or Company <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                        <path stroke="#370a00" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                        <path stroke="#370a00" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                        <path stroke="#370a00" d="M27.083 27.083h-4.166v4.167h4.166z" />
                      </g>
                    </svg>
                  </span>
                  <input
                    id="college"
                    type="text"
                    placeholder="IIIT Hyderabad | Microsoft"
                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2  w-[48.5%]">
                <label htmlFor="profession" className="text-md ml-3 block">
                  Your Profession <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex items-center rounded-2xl px-4 py-3 border  bg-base-200 border-base-300 border-[3px]  focus-within:border-secondary focus-within:bg-base-300 focus-within:border-[3px]  transition-all duration-300">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
                        <path stroke="#370a00" d="M33.333 8.333A2.083 2.083 0 0 0 31.25 6.25h-12.5a2.083 2.083 0 0 0-2.083 2.083v6.25h16.666zM43.75 41.667v-25a2.083 2.083 0 0 0-2.083-2.084H8.333a2.083 2.083 0 0 0-2.083 2.084v25a2.083 2.083 0 0 0 2.083 2.083h33.334a2.083 2.083 0 0 0 2.083-2.083" />
                        <path stroke="#370a00" d="M22.917 29.167H18a8.33 8.33 0 0 1-7.583-5.042l-3.792-8.646a2.08 2.08 0 0 1 1.708-.896h33.334a2.08 2.08 0 0 1 1.708.896l-3.792 8.646A8.33 8.33 0 0 1 32 29.167h-4.917" />
                        <path stroke="#370a00" d="M27.083 27.083h-4.166v4.167h4.166z" />
                      </g>
                    </svg>
                  </span>
                  <input
                    id="profession"
                    type="text"
                    placeholder="Student | Developer | Designer"
                    className="w-full outline-none text-accent bg-transparent placeholder-accent placeholder:opacity-70 text-lg"
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
                <label className="toggle text-base-content bg-black">
                  <input type="checkbox" onChange={(e) =>
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
                <span>
                  I agree to the{" "}
                  <a href="/terms" className="text-[#193ab7] hover:text-secondary transition-colors">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-center" className="text-[#193ab7] hover:text-secondary transition-colors">
                    Privacy Policy
                  </a>.
                </span>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full  bg-base-300 border-2 border-secondary  text-white  py-3 sm:py-4  rounded-2xl sm:rounded-3xl transition-all duration-300  text-base sm:text-xl md:text-2xl  font-semibold  ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-800"}`}
              >
                {isSubmitting ? (
                  <div className="flex justify-center items-center gap-2 sm:gap-3 px-2 md:px-3">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#370a00"
                        d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z"
                        opacity={0.25}
                      />
                      <path
                        fill="#370a00"
                        d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"
                      />
                    </svg>

                    <span className="text-center text-accent text-sm md:text-base lg:text-xl xl:text-2xl ">
                      Setting up your workspace...
                    </span>

                  </div>
                ) : (
                  <span className="text-center text-sm md:text-base text-accent lg:text-xl xl:text-2xl ">Create Account</span>
                )}
              </button>
            </div>

            <div className="text-accent">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#193ab7] hover:text-secondary transition-colors"
              >
                Sign In
              </Link>
            </div>

          </form>


        </div>

        {/* RIGHT - Content Panel */}
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

        </div >

      </div >

      {/* Add CSS for animations */}
      < style jsx > {`
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
      `}</style >
    </div >

  );
};
export default Signup;