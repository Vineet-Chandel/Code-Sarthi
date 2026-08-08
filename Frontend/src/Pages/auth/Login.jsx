
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import BASE_URL from "./baseURL";
import Welcome from './Welcome';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Toast from '../CARRER-PROFILE-CREATION/2/Toast';
import { useState } from 'react';

import CrediRight from "./CrediRight";











const Login = () => {





    //intake of the gmail + password
    /*
     here, 
     default gmail = vineetsinghbitu@gmail.com
     default password = Vineet@1234
     */
    const [gmail, setGmailId] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);



    const [isLoginStart, setIsLoginStart] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    //redux management
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const togglePassword = () => {
        setShowPassword(prev => !prev);
    }


    const handleGoogleAuth = () => {
        window.location.href = `${BASE_URL}/login/google`;
    };

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
            <div className="relative w-full min-h-[98vh] bg-black  rounded-2xl  flex flex-col md:flex-row gap-6 overflow-hidden border border-accent  ">
                <div className="
absolute inset-0
bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%),linear-gradient(to_right,#1a1a1a_0.8px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_0.8px,transparent_1px)]
bg-[size:100%_100%,130px_130px,130px_130px]
"/>
                {/* LEFT - Login Form */}
                <div className="relative z-30 flex flex-col gap-6 p-5 md:p-12 w-full md:w-[50%] text-white">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-content to-accent leading-tight ml-1">

                            Welcome Back!
                        </h1>

                    </div>

                    {/* Google Login Button */}
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
                        <div className="flex-1 h-px bg-accent/30"></div>
                        <span className="text-accent-content text-sm">OR</span>
                        <div className="flex-1 h-px bg-accent/30"></div>
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
                                className={`w-full  bg-white border border-secondary  text-black  py-3 sm:py-4  rounded-2xl sm:rounded-3xl transition-all duration-300  text-base sm:text-xl md:text-2xl  font-semibold  ${isLoginStart ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-800"}`}
                            >
                                {isLoginStart ? (
                                    <div className="flex justify-center items-center gap-2 sm:gap-3 px-2 md:px-3">

                                        <div className="relative">
                                            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="relative w-4 h-4 sm:w-6 sm:h-6 text-white"
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

                                        <span className="text-center text-sm md:text-base lg:text-xl xl:text-2xl text-black ">
                                            <div className="flex items-end gap-1">
                                                <span className="w-2 h-2 rounded-full bg-black/70 animate-bounce [animation-delay:0ms]" />
                                                <span className="w-2 h-2 rounded-full bg-black/70 animate-bounce [animation-delay:200ms]" />
                                                <span className="w-2 h-2 rounded-full bg-black/70 animate-bounce [animation-delay:400ms]" />
                                            </div>
                                        </span>

                                    </div>
                                ) : (
                                    <span className="flex text-xl  items-center  justify-center gap-3 text-black">
                                        Enter Workspace</span>
                                )}
                            </motion.button>
                        </div>
                    </form>
                    {/* Stats */}





                </div>
                <div className="w-full md:w-[50%] p-2 sm:p-6">
                    <CrediRight />
                </div>

            </div >
        </div >
    );
}

export default Login;

