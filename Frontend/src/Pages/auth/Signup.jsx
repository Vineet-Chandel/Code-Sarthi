
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
import CrediRight from './CrediRight';


/**
 * weakPasswordPatterns.js
 * Blocklist of common weak/predictable password patterns for client or server-side
 * password-strength validation. Use with String.includes() / regex, not exact-match only,
 * since users often pad these (e.g. "qwerty!23").
 */

const weakPatterns = [
  // Sequential digits
  '123', '1234', '12345', '123456', '1234567', '12345678', '123456789',
  '0123456789', '1234567890', '0987654321',
  '234567', '345678', '456789', '567890',
  '987654', '876543', '765432', '654321',

  // Repeated single characters
  '111111', '222222', '333333', '444444', '555555',
  '666666', '777777', '888888', '999999', '000000',
  'aaaaaa', 'bbbbbb', 'cccccc', 'zzzzzz', 'AAAAAA', 'BBBBBB',

  // Doubled words
  'hellohello', 'passwordpassword', 'adminadmin', 'abcabcabc', 'loveLoveLove',

  // Keyboard row/pattern walks
  'qwerty', 'qwertyui', 'qwerty123', 'qwertyuiop',
  'asdfgh', 'asdfghjkl',
  'zxcvbn', 'zxcvbnm',
  '1q2w3e', '1qaz2wsx', 'qazwsx', 'zaq12wsx',
  'poiuyt', 'lkjhg', 'mnbvc',
  '1qaz', '2wsx', '3edc',

  // Alphabet sequences
  'abc', 'abcd', 'abcde', 'abcdef', 'abcdefg', 'abcdefgh',
  'abcdefghijklmnopqrstuvwxyz',
  'zyx', 'zyxw', 'zyxwvuts',

  // Repeating short blocks
  '12121212', 'abababab', 'abcabcabc', 'xyzxyzxyz',

  // Calendar words
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',

  // "password" variants
  'password', 'Password', 'PASSWORD', 'Password1', 'Password123',
  'P@ssword', 'P@ssword1', 'password1', 'password123', 'passw0rd',

  // Default/system credentials
  'admin', 'administrator', 'guest', 'welcome',
  'letmein', 'login', 'root', 'default', 'changeme',
  'user', 'test', 'demo', 'system',

  // Common pets/animals
  'dog', 'cat', 'tiger', 'lion', 'monkey', 'dragon', 'shadow',

  // Common first names
  'john', 'michael', 'david', 'james', 'daniel', 'robert', 'jennifer',

  // Pop culture / fictional characters
  'avatar', 'batman', 'superman', 'spiderman', 'harrypotter', 'ironman',

  // Sports
  'football', 'cricket', 'soccer', 'basketball', 'baseball',

  // Sentiment / phrase-based
  'iloveyou', 'trustno1', 'sunshine', 'master', 'freedom', 'whatever',
  'starwars', 'princess', 'monkey123', 'flower', 'hunter2',
];



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




const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showWelcome, setShowWelcome] = useState(false);



  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    gmail: '',
    password: '',
    termsAccepted: false,
  });

  const handleGoogleAuth = () => {
    window.location.href = `${BASE_URL}/login/google`;
  };

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
    strength = Math.max(0, strength - 1);
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (weakPatterns.some((item) =>
      password.toLowerCase().trim().includes(item.toLowerCase()))) strength--;
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
      <div className="relative w-full min-h-[98vh] bg-black  rounded-2xl  flex flex-col md:flex-row gap-6 overflow-hidden border border-secondary">
        <div className="
absolute inset-0
bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%),linear-gradient(to_right,#1a1a1a_0.8px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_0.8px,transparent_1px)]
bg-[size:100%_100%,130px_130px,130px_130px]
"/>
        {/* LEFT - Signup Form */}
        <div className="relative z-30 flex flex-col gap-8  p-6  md:p-12 w-full md:w-[50%] text-white">
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

          {/* Google Signup Button */}
          <button type="button" onClick={handleGoogleAuth} className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-2xl hover:bg-gray-100 transition-all font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-secondary/30"></div>
            <span className="text-info text-sm">OR</span>
            <div className="flex-1 h-px bg-secondary/30"></div>
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
                  name="new-username"
                  autoComplete="off"
                  type="text"
                  placeholder="vinay_chandel"
                  className="w-full outline-none text-accent-content bg-transparent placeholder-info placeholder:opacity-70 text-lg"
                  value={formData.username}
                  onChange={handleChange}
                  required={true}
                />
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
                  name="email"
                  type="email"
                  autoComplete="email"
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
                    name="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"

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
                  <li className={`flex items-center gap-2 ${(weakPatterns.some((item) =>
                    formData.password.toLowerCase().trim().includes(item.toLowerCase()))) ? 'text-red-500' : ''}`}>
                    <span>{(weakPatterns.some((item) =>
                      formData.password.toLowerCase().trim().includes(item.toLowerCase()))) ? '✗' : '○'}</span>
                    Weak Pattern
                  </li>
                </ul>
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

        <div className="w-full md:w-[50%] p-2 sm:p-6">
          <CrediRight />

        </div >


      </div >


    </div >

  );
};
export default Signup;