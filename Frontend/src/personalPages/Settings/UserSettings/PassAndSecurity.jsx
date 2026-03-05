import React from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdMarkEmailUnread } from "react-icons/md";
import { MdOutgoingMail } from "react-icons/md";
import { FaUserTag } from "react-icons/fa";
import { BASE_URL } from "../../../Pages/auth/baseURL";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";

const allChanges = [
    {
        "Tag": "Verify Email",
        "svg": <RiVerifiedBadgeFill size={40} color="skyblue" />,
        "index": 1,
    },

    {
        "Tag": "Forgot Password",
        "svg": <MdMarkEmailUnread size={35} color="skyblue" />,
        "index": 2
    },
    {
        "Tag": "Renew Password",
        "svg": <TbPasswordFingerprint size={45} color="skyblue" />,
        "index": 3,
    },
    {
        "Tag": "Change Gmail",
        "svg": <MdOutgoingMail size={40} color="skyblue" />,

        "index": 4,
    },
    {
        "Tag": "Change Username",
        "svg": <FaUserTag size={35} color="skyblue" />,
        "index": 5,
    },


]


// Main settings components with techy UI
const PasswordSecuritySettings = () => {



    const [editPrivate, setEditPrivateisOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState()
    const activeChange = allChanges.find(c => c.index === activeIndex);
    const [isSending, setIsSending] = useState(false);
    const [isSending1, setIsSending1] = useState(false);
    const [errrorInVerification, setError] = useState("");
    const [otpSentEmail, setOtpSentEmail] = useState(false);
    const [otpSentEmail1, setOtpSentEmail1] = useState(false);
    const [otpSentForgot, setOtpSentForgot] = useState(false);
    const [newOTP, setOTP] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isVerified2, setIsVerified2] = useState(false);
    const [isVerified3, setIsVerified3] = useState(false);
    const [isVerified4, setIsVerified4] = useState(false);
    const [isVerified5, setIsVerified5] = useState(false);
    const [isVerified6, setIsVerified6] = useState(false);
    const user = useSelector(store => store?.user?.user?.DATA || {});
    const [newPaass1, setNewPaass1] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newPaass2, setNewPaass2] = useState("");
    const [token1, setToken1] = useState("");
    const [token2, setToken2] = useState("");
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [newGmail, setNewGmailId] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);



    const closEveryTHING = () => {

        setIsSending(false);
        setIsSending1(false)
        setIsVerified(false)
        setIsVerified2(false)
        setIsVerified3(false)
        setIsVerified4(false)
        setIsVerified5(false)
        setIsVerified6(false)
        setOTP("")
        setToken1("")
        setToken2("")
        setError("")
        setOtpSentEmail(false)
        setOtpSentEmail1(false)
        setOtpSentForgot(false)
        setNewPaass1("")
        setNewPaass2("")
        setOldPass("")
        setShow1(false)
        setShow2(false)
        setNewGmailId("")
        setNewUsername("")
    }
    // Verify Email
    const sendVerificationEmail = async () => {
        try {
            setError("")
            setIsSending(true);

            await axios.get(
                `${BASE_URL}/auth/verify-email`,
                { withCredentials: true }
            );
            setOtpSentEmail(true);
        } catch (err) {
            setError(err?.response?.data?.message || "Sending OTP failed");
        } finally {
            setIsSending(false);

        }
    }
    const verifyOTP = async () => {
        try {
            if (!newOTP.trim()) {
                setError("Enter OTP first");
                return;
            }
            setError("")
            setIsVerified(false);
            await axios.post(`${BASE_URL}/auth/verify-email`, {
                toVerifyotp: newOTP
            },
                { withCredentials: true });
            setOTP("")
            setIsVerified(true);
        } catch (err) {
            setError(err?.response?.data?.message || "OTP verification failed");
        }
    }
    const sendForgotPassEmail = async () => {
        try {
            setError("")
            setIsSending(true);
            if (!user?.gmail) {
                setError("Unathourized Acess");
                return;
            }
            const res = await axios.post(
                `${BASE_URL}/auth/forgot-password`,
                {
                    "gmail": `${user.gmail}`
                },
                { withCredentials: true }
            );
            const token = res.data.token;
            if (!token) {
                setError("Unathourized acess!!");
                return;
            }
            setToken1(token);
            setOTP("");
            setOtpSentForgot(true);
        } catch (err) {
            setError(err?.response?.data?.message || "Sending OTP failed");
        } finally {
            setIsSending(false);

        }
    }
    const verifyForgotPassOTP = async () => {
        try {
            if (!newOTP.trim()) {
                setError("Enter OTP first");
                return;
            }
            if (!token1) {
                setError("Session expired. Request OTP again.");
                return;
            }
            setError("")
            setIsVerified2(false);
            const res = await axios.post(`${BASE_URL}/auth/forgot-password/${token1}`, {
                enteredOtpByUser: newOTP
            },

                { withCredentials: true });
            const token = res.data.resetToken;
            if (!token) {
                setError("Unathourized acess!!");
                return;
            }
            setToken2(token);
            setOTP("")
            setIsVerified2(true);
        } catch (err) {
            setError(err?.response?.data?.message || "OTP verification failed");
        }
    }
    const newForgotPassChange = async () => {
        try {
            if (isSending) return;
            setError("")

            if (!newPaass1.trim()) {
                setError("Enter new password first");
                return;
            }
            if (!token2) {
                setError("Verification expired. Try again.");
                return;
            }
            setIsVerified3(false);
            await axios.patch(`${BASE_URL}/auth/forgot-password/${token2}`, {
                newPassword: newPaass1
            },
                { withCredentials: true });
            setIsVerified3(true);

        } catch (err) {
            setError(err?.response?.data?.message || "OTP verification failed");
        }
    }
    const newRenewPassChange = async () => {
        try {
            if (isSending) return;
            setError("")

            if (!newPaass2.trim()) {
                setError("Enter new password first");
                return;
            }
            setIsVerified4(false);
            await axios.patch(`${BASE_URL}/auth/reset-password`, {
                newPassword: newPaass2,
                oldPassword: oldPass,

            },
                { withCredentials: true });
            setIsVerified4(true);
            setOldPass("");
            setNewPaass2("");
            setShow(false);
        } catch (err) {
            setError(err?.response?.data?.message || "OTP verification failed");
        }
    }
    const sendVerificationEmailForGmailChange = async () => {
        try {
            setError("")
            setIsSending1(true);

            await axios.get(
                `${BASE_URL}/profile/update-identity`,
                { withCredentials: true }
            );
            setOtpSentEmail1(true);
        } catch (err) {
            setError(err?.response?.data?.message || "Sending OTP failed");
        } finally {
            setIsSending1(false);

        }
    }
    const patchiandOtpForGmailChange = async () => {
        try {
            if (!newOTP.trim()) {
                setError("Enter OTP first");
                return;
            }
            setIsUpdating(true);
            setError("")
            setShow1(false);
            setIsVerified5(false);
            const res = await axios.patch(`${BASE_URL}/profile/update-identity`, {
                enteredChangeIdentityOtp: newOTP,
                newGmail: newGmail,
            },

                { withCredentials: true });
            setOTP("")
            setShow1(true);
            setIsVerified5(true);
            setIsUpdating(false);
        } catch (err) {
            setError(err?.response?.data?.message || "OTP verification failed");
        }
    }
    const patchiandOtpForUsernameChange = async () => {
        try {
            if (!newOTP.trim()) {
                setError("Enter OTP first");
                return;
            }

            setError("");
            setShow2(false);
            setIsVerified6(false);
            const res = await axios.patch(`${BASE_URL}/profile/update-identity`, {
                enteredChangeIdentityOtp: newOTP,
                newUsername: newUsername,
            },

                { withCredentials: true });
            setOTP("")
            setShow2(true);
            setIsVerified6(true);
        } catch (err) {
            setError(err?.response?.data?.message || "OTP verification failed");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)] pointer-events-none" />
            <div className=" relative bg-gradient-to-br from-[#0a0f1f]/80 to-[#06090f]/80 p-6 rounded-3xl border border-cyan-400/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)] overflow-hidden ">

                <div className="mb-10">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-cyan-400 font-mono text-2xl font-extrabold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                            <path fill="#00afff" d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12" opacity="0.3" />
                            <path fill="#00afff" d="M12.75 10a.75.75 0 0 0-1.5 0v.701l-.607-.35a.75.75 0 1 0-.75 1.298l.607.35l-.607.351a.75.75 0 1 0 .75 1.3l.607-.351V14a.75.75 0 1 0 1.5 0v-.7l.607.35a.75.75 0 0 0 .75-1.3L13.5 12l.607-.35a.75.75 0 0 0-.75-1.3l-.607.35zm-6.017-.75a.75.75 0 0 1 .75.75v.7l.606-.35a.75.75 0 0 1 .75 1.3l-.607.35l.607.35a.75.75 0 1 1-.75 1.3l-.606-.35v.7a.75.75 0 0 1-1.5 0v-.701l-.608.35a.75.75 0 0 1-.75-1.298L5.232 12l-.607-.35a.75.75 0 1 1 .75-1.3l.608.351V10a.75.75 0 0 1 .75-.75m11.285.75a.75.75 0 0 0-1.5 0v.701l-.607-.35a.75.75 0 1 0-.75 1.298l.607.35l-.607.351a.75.75 0 0 0 .75 1.3l.607-.351V14a.75.75 0 0 0 1.5 0v-.7l.607.35a.75.75 0 0 0 .75-1.3l-.607-.35l.607-.35a.75.75 0 1 0-.75-1.3l-.607.35z" />
                        </svg> Change Credentials</span>
                    </div>

                    {allChanges.map((items) => (
                        <div key={items.index} className="flex flex-col justify-center  ml-11 ">
                            <span onClick={() => { setEditPrivateisOpen(true); setActiveIndex(items.index); closEveryTHING() }} className="text-cyan-400 ">
                                <div className="flex items-center mb-7 bg-cyan-500/10 rounded-xl px-4 py-3 cursor-pointer ">

                                    <div className=" group  font-mono text-2xl flex items-center gap-3 font-extrabold px-4 py-3 hover:border-cyan-400/30 transition-all duration-300
">
                                        {items.svg} {items.Tag}<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                            <path fill="#5ff4fc" d="M8 19V5l11 7z" />
                                        </svg>
                                    </div>
                                    {(items.index === 5) && (<div className="text-gray-400 ">{user.username}</div>)}
                                    {(items.index === 1) && (<div className="text-gray-400 ">{user.gmail}</div>)}
                                    {(items.index === 4) && (<div className="text-gray-400 ">{user.gmail}</div>)}


                                </div>

                            </span>
                        </div>
                    ))}

                </div>


                {editPrivate && (<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center " onClick={() => { setEditPrivateisOpen(false); setError("") }}>

                    {/* CARD */}
                    <div className=" w-[440px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0b0f1a] to-[#070a11] border border-cyan-400/20 shadow-[0_0_60px_rgba(0,255,255,0.12)] backdrop-blur-2xl " onClick={(e) => e.stopPropagation()} >

                        {/* HEADER */}
                        <div className=" flex items-center justify-center gap-3 px-6 py-5 border-b border-cyan-400/10 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 ">
                            <h2 className="text-xl font-semibold text-white">
                                {allChanges.find(c => c.index === activeIndex)?.Tag}
                            </h2>

                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14">
                                <g fill="none" fillRule="evenodd" clipRule="evenodd">
                                    <path fill="#fff" d="M1.573 1.573A.25.25 0 0 1 1.75 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5A1.75 1.75 0 0 0 0 1.75v1.5a.75.75 0 0 0 1.5 0v-1.5a.25.25 0 0 1 .073-.177M14 10.75a.75.75 0 0 0-1.5 0v1.5a.25.25 0 0 1-.25.25h-1.5a.75.75 0 0 0 0 1.5h1.5A1.75 1.75 0 0 0 14 12.25zM.75 10a.75.75 0 0 1 .75.75v1.5a.25.25 0 0 0 .25.25h1.5a.75.75 0 0 1 0 1.5h-1.5A1.75 1.75 0 0 1 0 12.25v-1.5A.75.75 0 0 1 .75 10m10-10a.75.75 0 0 0 0 1.5h1.5a.25.25 0 0 1 .25.25v1.5a.75.75 0 0 0 1.5 0v-1.5A1.75 1.75 0 0 0 12.25 0z" />
                                    <path fill="#2859c5" d="M9.208 4.46a2.21 2.21 0 1 1-4.421 0a2.21 2.21 0 0 1 4.421 0m-6.353 6.195a4.423 4.423 0 0 1 8.288 0c.112.299-.126.595-.446.595H3.301c-.32 0-.558-.296-.446-.595" />
                                </g>
                            </svg>
                        </div>


                        {/* BODY */}
                        <div className="flex flex-col gap-3 p-5">

                            {/* ================= VERIFY EMAIL ================= */}
                            {activeChange?.index === 1 && ((!user.isVerified && (
                                <div>
                                    {!otpSentEmail && (
                                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 shadow-[0_0_18px_rgba(0,255,255,0.2)] transition-all duration-300 flex justify-center items-center gap-4" onClick={sendVerificationEmail}>
                                            Send Verification OTP {isSending && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="#efeded" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" />
                                                <path fill="#efeded" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
                                                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                                </path>
                                            </svg>)}
                                        </button>
                                    )}
                                    {!isVerified && (otpSentEmail && (
                                        <div className=" flex flex-col gap-5">
                                            <input
                                                placeholder="Enter the OTP sent by ASTRA"
                                                className=" w-full text-center py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 outline-none backdrop-blur-md transition-all duration-300"
                                                type="number"
                                                value={newOTP}
                                                onChange={(e) => setOTP(e.target.value.trim())} />
                                            <button
                                                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 shadow-[0_0_18px_rgba(0,255,255,0.2)] transition-all duration-300"
                                                onClick={verifyOTP}
                                            >
                                                Verify OTP
                                            </button>
                                        </div>
                                    ))}
                                    {isVerified && (
                                        <div className="w-full flex flex-col justify-center items-center ">
                                            < div >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#44f53d" fillRule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clipRule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                            </div>
                                            <h2 className="text-4xl font-semibold text-white">
                                                Email Verified
                                            </h2>
                                        </div>
                                    )}
                                    {errrorInVerification && (<div className="space-y-2 mt-5">
                                        <div className={`${errrorInVerification ? "block" : "hidden "} flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,0,0,0.2)]  transition-all duration-30 `} >
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FF6F6F" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
                                            </span>
                                            <div className="text-red-500 ml-2">
                                                {errrorInVerification}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            )) || (user.isVerified && (
                                <div className="w-full flex flex-col justify-center items-center ">
                                    < div >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#44f53d" fillRule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clipRule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white">
                                        Email Already Verified !
                                    </h2>
                                </div>
                            ))
                            )}
                            {/* ================= FORGOT PASSWORD ================= */}
                            {activeChange?.index === 2 && (
                                <>

                                    {!otpSentForgot && (
                                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 shadow-[0_0_ 18px_rgba(0,255,255,0.2)]transition-all duration-300 flex justify-center items-center gap-4" onClick={sendForgotPassEmail}>
                                            Send Verification OTP {isSending && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="#efeded" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" />
                                                <path fill="#efeded" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
                                                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                                </path>
                                            </svg>)}
                                        </button>
                                    )}
                                    {!isVerified2 && (otpSentForgot && (
                                        <div className=" flex flex-col gap-5">
                                            <input
                                                placeholder="Enter the OTP sent by ASTRA"
                                                className=" w-full text-center py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 outline-none backdrop-blur-md transition-all duration-300 " type="number"
                                                value={newOTP}
                                                onChange={(e) => setOTP(e.target.value.trim())} />
                                            <button
                                                className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30"
                                                onClick={verifyForgotPassOTP}
                                            >
                                                Verify OTP
                                            </button>
                                        </div>
                                    ))}
                                    {isVerified2 && (!isVerified3) && (<div className=" flex flex-col gap-5">
                                        <input
                                            placeholder="Enter the new password"
                                            className=" w-full text-center py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 outline-none backdrop-blur-md transition-all duration-300 "
                                            value={newPaass1}
                                            onChange={(e) => setNewPaass1(e.target.value.trim())} />
                                        <button
                                            className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30"
                                            onClick={newForgotPassChange}
                                        >
                                            Confirm New Password
                                        </button>
                                    </div>)}
                                    {errrorInVerification && (<div className="space-y-2 mt-5">
                                        <div className={`${errrorInVerification ? "block" : "hidden "} flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,0,0,0.2)] transition-all duration-30 `} >
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FF6F6F" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
                                            </span>
                                            <div className="text-red-500 ml-2">
                                                {errrorInVerification}
                                            </div>
                                        </div>
                                    </div>)}
                                    {isVerified3 && (
                                        <div className="w-full flex flex-col justify-center items-center ">
                                            < div >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#44f53d" fillRule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clipRule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                            </div>
                                            <h2 className="text-2xl font-semibold text-white">
                                                Password has been changed
                                            </h2>
                                        </div>
                                    )}


                                </>
                            )}
                            {/* ================= RENEW PASSWORD ================= */}
                            {activeChange?.index === 3 && (
                                <>

                                    {show && (<>
                                        <input
                                            placeholder="Old Password"
                                            className=" w-full text-center py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 outline-none backdrop-blur-md transition-all duration-300"
                                            type="number"
                                            value={oldPass}
                                            onChange={(e) => setOldPass(e.target.value.trim())}
                                        />

                                        <input
                                            placeholder="New Password"
                                            className=" w-full text-center py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 outline-none backdrop-blur-md transition-all duration-300
"
                                            value={newPaass2}
                                            onChange={(e) => setNewPaass2(e.target.value.trim())}
                                        />
                                        <button
                                            className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30"
                                            onClick={newRenewPassChange}

                                        >
                                            Confirm New Password
                                        </button></>)}


                                    {errrorInVerification && (<div className="space-y-2 mt-5">
                                        <div className={`${errrorInVerification ? "block" : "hidden "} flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,0,0,0.2)]  transition-all duration-30 `} >
                                            <span className="mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FF6F6F" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
                                            </span>
                                            <div className="text-red-500 ml-2">
                                                {errrorInVerification}
                                            </div>
                                        </div>
                                    </div>)}
                                    {isVerified4 && (
                                        <div className="w-full flex flex-col justify-center items-center ">
                                            < div >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#44f53d" fillRule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clipRule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                            </div>
                                            <h2 className="text-2xl font-semibold text-white">
                                                Password has been changed
                                            </h2>
                                        </div>
                                    )}
                                </>
                            )}
                            {/* ================= CHANGE EMAIL ================= */}
                            {activeChange?.index === 4 && (
                                <div>
                                    {!otpSentEmail1 && (

                                        <button className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex justify-center items-center gap-4" onClick={sendVerificationEmailForGmailChange}>
                                            Send Verification OTP {isSending1 && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="#efeded" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" />
                                                <path fill="#efeded" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
                                                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                                </path>
                                            </svg>)}
                                        </button>
                                    )}
                                    {!isVerified5 && (otpSentEmail1 && (
                                        <div className=" flex flex-col gap-5">
                                            <input
                                                placeholder="Enter the OTP sent by ASTRA"
                                                className=" w-full text-center py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 outline-none backdrop-blur-md transition-all duration-300 "
                                                type="number"
                                                value={newOTP}
                                                onChange={(e) => setOTP(e.target.value.trim())} />
                                            <input
                                                placeholder="Hey NOVA here ! Enter new GmailID"
                                                className=" w-full text-center py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 outline-none backdrop-blur-md transition-all duration-300
"
                                                value={newGmail}
                                                onChange={(e) => setNewGmailId(e.target.value.trim())} />

                                            <button
                                                className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex justify-center items-center gap-3"
                                                onClick={patchiandOtpForGmailChange}
                                            >
                                                SAVE {isUpdating && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                    <path fill="#efeded" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" />
                                                    <path fill="#efeded" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
                                                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                                    </path>
                                                </svg>)}
                                            </button>
                                            {errrorInVerification && (<div className="space-y-2 mt-5">
                                                <div className={`${errrorInVerification ? "block" : "hidden "} flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,0,0,0.2)] transition-all duration-30 `} >
                                                    <span className="mr-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FF6F6F" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
                                                    </span>
                                                    <div className="text-red-500 ml-2">
                                                        {errrorInVerification}
                                                    </div>
                                                </div>
                                            </div>)}
                                        </div>


                                    ))}
                                    {show1 && (
                                        <div className="w-full flex flex-col justify-center items-center ">
                                            < div >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#44f53d" fillRule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clipRule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                            </div>
                                            <h2 className="text-4xl font-semibold text-white">
                                                GmailID Updated
                                            </h2>
                                        </div>
                                    )}
                                </div>

                            )}
                            {activeChange?.index === 5 && (

                                <div>
                                    {!otpSentEmail1 && (

                                        <button className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex justify-center items-center gap-4" onClick={sendVerificationEmailForGmailChange}>
                                            Send Verification OTP {isSending1 && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="#efeded" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" />
                                                <path fill="#efeded" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
                                                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                                </path>
                                            </svg>)}
                                        </button>
                                    )}
                                    {!isVerified6 && (otpSentEmail1 && (
                                        <div className=" flex flex-col gap-5">
                                            <input
                                                placeholder="Enter the OTP sent by ASTRA"
                                                className=" w-full text-center py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 outline-none backdrop-blur-md transition-all duration-300 "
                                                value={newOTP}
                                                type="number"
                                                onChange={(e) => setOTP(e.target.value.trim())} />
                                            <input
                                                placeholder="Hey NOVA here ! Enter new Username"
                                                className="
w-full text-center py-3 px-4 rounded-xl
bg-white/[0.03]
border border-white/10
focus:border-cyan-400/60
focus:ring-2 focus:ring-cyan-500/20
outline-none
backdrop-blur-md
transition-all duration-300
"
                                                value={newUsername}
                                                onChange={(e) => setNewUsername(e.target.value.trim())} />
                                            <button
                                                className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex justify-center items-center gap-3"
                                                onClick={patchiandOtpForUsernameChange}
                                            >
                                                SAVE {isUpdating && (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                    <path fill="#efeded" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" />
                                                    <path fill="#efeded" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
                                                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                                    </path>
                                                </svg>)}
                                            </button>
                                            {errrorInVerification && (<div className="space-y-2 mt-5">
                                                <div className={`${errrorInVerification ? "block" : "hidden "} flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,0,0,0.2)]  transition-all duration-30 `} >
                                                    <span className="mr-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FF6F6F" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" /></svg>
                                                    </span>
                                                    <div className="text-red-500 ml-2">
                                                        {errrorInVerification}
                                                    </div>
                                                </div>
                                            </div>)}
                                        </div>
                                    ))}
                                    {show2 && (
                                        <div className="w-full flex flex-col justify-center items-center ">
                                            < div >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#44f53d" fillRule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clipRule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                            </div>
                                            <h2 className="text-4xl font-semibold text-white">
                                                Username Updated
                                            </h2>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>


                        {/* FOOTER */}
                        <div className="border-t border-white/10">
                            <button className="w-full py-3 text-gray-400 hover:text-white transition" onClick={() => { setEditPrivateisOpen(false); setError(""); closEveryTHING() }}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>)
                }



            </div >
        </motion.div >
    );
};

export default PasswordSecuritySettings