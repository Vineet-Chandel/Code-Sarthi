import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Toast from '../CARRER-PROFILE-CREATION/2/Toast';
import CrediRight from "./CrediRight";
import BASE_URL from "./baseURL";

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

const CompleteProfile = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [toasts, setToasts] = useState([]);
    const navigate = useNavigate();

    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const ToastContainer = ({ toasts, removeToast }) => {
        return (
            <div className="fixed top-4 left-4 right-4 md:top-auto md:left-auto md:bottom-5 md:right-5 flex flex-col gap-3 w-auto md:w-[440px] max-w-full z-[9999] pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            {...toast}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        );
    };

    const validatePasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;
        if (weakPatterns.some((item) =>
            pass.toLowerCase().trim().includes(item.toLowerCase()))) strength--;
        setPasswordStrength(Math.max(0, strength));
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return 'bg-gray-600';
        if (passwordStrength <= 2) return 'bg-red-500';
        if (passwordStrength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        validatePasswordStrength(val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordStrength < 3) {
            addToast({
                type: "error",
                title: "Weak Password",
                message: "Please enter a stronger password."
            });
            return;
        }

        try {

            setIsLoading(true);
            const checkResponse = await axios.post(
                `${BASE_URL}/auth/check-username`,
                { username },
                { withCredentials: true }
            );

            if (checkResponse.data.message != "Username is available") {
                addToast({
                    type: "error",
                    title: "Username Taken",
                    message: "This username is already taken."
                });

                return;
            }
            const response = await axios.post(
                `${BASE_URL}/auth/complete-profile`,
                {
                    username,
                    password
                },
                {
                    withCredentials: true
                }
            );

            if (response.data.success) {
                window.location.href = "/app";
            }


        } catch (error) {
            addToast({
                type: "error",
                title: "Error",
                message: error.response?.data?.message || "Something went wrong"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div data-theme="caramellatte" className="min-h-screen w-full flex items-center justify-center bg-gray-300 p-1">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="relative w-full min-h-[98vh] bg-black rounded-2xl flex flex-col md:flex-row gap-6 overflow-hidden border border-accent">
                <div className="
absolute inset-0
bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%),linear-gradient(to_right,#1a1a1a_0.8px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_0.8px,transparent_1px)]
bg-[size:100%_100%,130px_130px,130px_130px]
" />
                {/* LEFT - Form */}
                <div className="relative z-30 flex flex-col gap-6 p-5 md:p-12 w-full md:w-[50%] text-white justify-center">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-content to-accent leading-tight ml-1">
                            Complete Profile
                        </h1>
                        <p className="ml-1 mt-2 text-accent-content/80 text-lg">Pick a unique username and a secure password.</p>
                    </div>

                    <form className="space-y-6 flex flex-col mt-4" onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-md ml-3 block text-accent-content">Username <span className="text-accent-content">*</span></label>
                            <div className="flex items-center rounded-2xl px-4 py-3 border border-accent bg-base-300 transition-all duration-300">
                                <span className="mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="codesarthi_user"
                                    className="w-full outline-none text-primary bg-transparent placeholder-accent-content placeholder:opacity-70 text-lg"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <p className="ml-3 text-xs text-accent-content/60">3-20 characters. Only lowercase letters, numbers, and underscores allowed.</p>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-md ml-3 block text-accent-content">
                                    Password <span className="text-accent-content">*</span>
                                </label>
                                <div className="flex items-center rounded-2xl px-4 py-3 border border-accent bg-base-300 transition-all duration-300">
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
                                        className="w-full outline-none text-primary bg-transparent placeholder-accent-content placeholder:opacity-70 text-lg"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-secondary transition-colors"
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
                                    <li className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : ''}`}>
                                        <span>{password.length >= 8 ? '✓' : '○'}</span>
                                        At least 8 characters
                                    </li>
                                    <li className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
                                        <span>{/[A-Z]/.test(password) ? '✓' : '○'}</span>
                                        One uppercase letter
                                    </li>
                                    <li className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-600' : ''}`}>
                                        <span>{/[0-9]/.test(password) ? '✓' : '○'}</span>
                                        One number
                                    </li>
                                    <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}`}>
                                        <span>{/[^A-Za-z0-9]/.test(password) ? '✓' : '○'}</span>
                                        One special character
                                    </li>
                                    <li className={`flex items-center gap-2 ${(weakPatterns.some((item) =>
                                        password.toLowerCase().trim().includes(item.toLowerCase()))) ? 'text-red-500' : ''}`}>
                                        <span>{(weakPatterns.some((item) =>
                                            password.toLowerCase().trim().includes(item.toLowerCase()))) ? '✗' : '○'}</span>
                                        Weak Pattern
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isLoading}
                                className={`w-full bg-white border border-secondary text-black py-3 sm:py-4 rounded-2xl sm:rounded-3xl transition-all duration-300 text-base sm:text-xl md:text-2xl font-semibold ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-200"}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying...
                                    </span>
                                ) : (
                                    "Verify & Continue"
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div>

                {/* RIGHT - CrediRight */}
                <div className="w-full md:w-[50%] p-2 sm:p-6">
                    <CrediRight />
                </div>
            </div>
        </div>
    );
};

export default CompleteProfile;