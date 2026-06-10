import React, { useState, useEffect, useRef } from 'react'
import BASE_URL from "../Pages/auth/baseURL";
import axios from "axios";
import { motion } from 'framer-motion';
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionUser } from "../utils/connectionSlice";
import Toast from '../Pages/CARRER-PROFILE-CREATION/2/Toast';
import { AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Search = ({ height, displayType }) => {
    const [username, setUserName] = useState("");
    const [data, setData] = useState(null)
    const [showcard, setShowCard] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [newError, setNewError] = useState("");
    const [actionId, setActionId] = useState(null);
    const connectionsARR = useSelector(state => state.connections?.users || []);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const connectionUser = async () => {

        try {

            const response = await axios.get(
                `${BASE_URL}/user/connections`,
                { withCredentials: true }
            );
            dispatch(addConnectionUser(response.data.data));


        } catch (err) {
            console.error(err?.message || err);
        }
    };
    useEffect(() => {
        connectionUser();
    }, [dispatch]);

    const sendRequest = async (username, ID) => {

        try {

            setActionId(ID);

            const response = await axios.post(
                `${BASE_URL}/request/send/${username}`, {},
                { withCredentials: true }
            );
            setShowRequestModal(true);

        } catch (err) {
            console.log(err?.message || "not send");
            if (err.response.data.message === "Connection already requested state") {
                setShowRequestModal(true);
            }
        } finally {
            setActionId(null);

        }

    }


    const searchHandeler = async (e) => {
        try {
            setIsSearching(true);
            const res = await axios.post(
                `${BASE_URL}/profile/others`,
                { username },
                { withCredentials: true }
            );

            setData(res.data.data)
            setShowCard(true)
            setIsSearching(false)
            setNewError("");
        } catch (err) {
            setIsSearching(false)
            setShowCard(false);
            addToast({
                type: "error",
                title: "User not found",
                message: "User not found."
            });
        }

    }
    useEffect(() => {

        if (!username.trim()) {
            setShowCard(false);
            setData(null);
            return;
        }

        const timer = setTimeout(() => {
            searchHandeler();
        }, 400);

        return () => clearTimeout(timer);
    }, [username]);




    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef(null);
    const buttonVariants = {
        collapse: {
            width: 200,
            marginLeft: 0,
            marginRight: 0
        },
        expand: {
            width: 300,
            marginLeft: 20,
            marginRight: 10

        }
    };

    useEffect(() => {
        if (isExpanded) {
            inputRef.current.focus();
        } else {
            setUserName("");
        }
    }, [isExpanded]);

    const iconBubbleVariant = {
        collapse: {
            scale: 0,
            opacity: 0,
        },
        expand: {
            scale: 1,
            opacity: 1,
        }
    };

    const TRANSITION = {
        duration: 0.4,
        type: "spring",
        bounce: 0.25
    }

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
    const [toasts, setToasts] = useState([]);

    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (

        <div className='relative w-[90%] z-30 flex flex-col gap-3 items-center justify-center mr-3' >
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className='relative h-[45px] flex items-center justify-center '>



                <motion.div
                    variants={iconBubbleVariant}
                    initial="collapse"
                    animate={isExpanded ? "expand" : "collapse"}
                    transition={TRANSITION}

                    className='h-10 w-10 flex items-center justify-center ml-2 ' >

                    <span className='h-full flex items-center justify-center ml-2 bg-base-100 p-2 rounded-full border-[2px] border-secondary-content'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"></path>
                        </svg>
                    </span>
                </motion.div>
                <motion.div
                    variants={buttonVariants}
                    initial="collapse"
                    animate={isExpanded ? "expand" : "collapse"}
                    transition={TRANSITION}
                    className='h-[45px] flex items-center justify-center outline-none border-none focus:ring-0 focus:border-0 '>
                    <button onClick={() => { setIsExpanded(true); inputRef.current.focus() }} className='h-[45px] w-full cursor-pointer items-center justify-center flex gap-2 rounded-full bg-base-100 text-white font-medium border-[2px] border-secondary-content'>
                        {!isExpanded && (
                            <span className='h-full w-[30px] flex items-center justify-center ml-2 '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"></path>
                                </svg>

                            </span>
                        )}
                        <motion.input
                            layout="input"
                            ref={inputRef}
                            value={username}
                            type="text"
                            placeholder='Search Devs...'
                            onChange={(e) => {
                                let val = e.target.value;

                                if (val.startsWith("@")) {
                                    val = val.slice(1);
                                }

                                setUserName(val.trimStart());
                            }}
                            onBlur={() => { if (!username) { setIsExpanded(false) } }}
                            className='h-full w-full bg-transparent text-sm placeholder-info outline-none text-white '
                            style={isExpanded ? { marginLeft: "20px" } : {}}
                        />

                        {!isExpanded && ((isSearching) ? (

                            <span className='h-full flex items-center justify-center ml-2  p-2'>
                                <div className="h-full w-[30px] flex items-center justify-center ml-2 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M11.5 14c4.14 0 7.5 1.57 7.5 3.5V20H4v-2.5c0-1.93 3.36-3.5 7.5-3.5m6.5 3.5c0-1.38-2.91-2.5-6.5-2.5S5 16.12 5 17.5V19h13zM11.5 5A3.5 3.5 0 0 1 15 8.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8 8.5A3.5 3.5 0 0 1 11.5 5m0 1A2.5 2.5 0 0 0 9 8.5a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 14 8.5A2.5 2.5 0 0 0 11.5 6"></path>
                                    </svg>
                                </div>
                            </span>
                        ) : (

                            <span className='h-10 w-10 flex items-center justify-center rounded-full justify-self-end mr-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M11.5 14c4.14 0 7.5 1.57 7.5 3.5V20H4v-2.5c0-1.93 3.36-3.5 7.5-3.5m6.5 3.5c0-1.38-2.91-2.5-6.5-2.5S5 16.12 5 17.5V19h13zM11.5 5A3.5 3.5 0 0 1 15 8.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8 8.5A3.5 3.5 0 0 1 11.5 5m0 1A2.5 2.5 0 0 0 9 8.5a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 14 8.5A2.5 2.5 0 0 0 11.5 6"></path>
                                </svg>
                            </span>
                        ))}

                    </button>
                </motion.div>

                <motion.div
                    variants={iconBubbleVariant}
                    initial="collapse"
                    animate={isExpanded ? "expand" : "collapse"}
                    transition={TRANSITION}

                    className='h-[45px] w-[30px] flex items-center justify-center ml-2 ' >

                    <span className='absolute    h-full flex items-center justify-center ml-2 bg-base-100 p-2 rounded-full border-[2px] border-secondary-content' onClick={() => Navigate("/app/explore")}>
                        {isSearching ? (
                            <div className="h-full w-[30px] flex items-center justify-center] text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.3" />
                                    <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                        <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" />
                                    </path>
                                </svg>
                            </div>
                        ) : (
                            <span className='h-10 w-10 flex items-center justify-center rounded-full cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M11.5 14c4.14 0 7.5 1.57 7.5 3.5V20H4v-2.5c0-1.93 3.36-3.5 7.5-3.5m6.5 3.5c0-1.38-2.91-2.5-6.5-2.5S5 16.12 5 17.5V19h13zM11.5 5A3.5 3.5 0 0 1 15 8.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8 8.5A3.5 3.5 0 0 1 11.5 5m0 1A2.5 2.5 0 0 0 9 8.5a2.5 2.5 0 0 0 2.5 2.5A2.5 2.5 0 0 0 14 8.5A2.5 2.5 0 0 0 11.5 6"></path>
                                </svg>
                            </span>
                        )}
                    </span>
                </motion.div>
            </div>
            {showcard && (
                <div
                    className={`${displayType === "nav"
                        ? "absolute right-0 top-full mt-3 w-[700px] z-50"
                        : "relative"
                        } group bg-base-300  rounded-3xl border border-secondary-content border-[2px]`}
                >
                    <div className="relative p-6 flex flex-col md:flex-row gap-6">

                        {/* LEFT PROFILE */}
                        <div className="flex flex-col items-center md:items-start space-y-4 ">
                            <div className="relative w-28 h-28 rounded-2xl overflow-hidden  border border-secondary-content border-[2px]">
                                <img
                                    src={data?.photoUrl?.url}
                                    className="  w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="text-center p-2 bg-base-100 rounded-lg border border-secondary-content border-[2px]">
                                    <div className="text-xs text-secondary">Age</div>
                                    <div className="text-lg font-bold text-accent">{data?.age}</div>
                                </div>
                                <div className="text-center p-2 bg-base-100 rounded-lg border border-secondary-content border-[2px]">
                                    <div className="text-xs text-secondary">Gender</div>
                                    <div className="text-lg font-bold text-accent">{data?.gender}</div>
                                </div>

                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-base-100 rounded-full border border-secondary-content border-[2px]">
                                <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
                                <span className="text-md text-secondary">{data?.college}</span>
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1 space-y-4">

                            {/* HEADER */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl text-start font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                                            {data?.firstName} {data?.middleName} {data?.lastName}
                                        </h1>
                                        {data?.isVerified && (
                                            <span className="text-green-400 text-sm">✔</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-1">
                                        <code className="text-secondary-content text-sm font-mono  border border-secondary-content px-3 py-1 rounded-xl bg-secondary " >
                                            @{data?.username}
                                        </code>
                                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                        <span className="text-lg text-gray-900">{data?.profession}</span>
                                    </div>
                                </div>

                                {/* RIGHT SIDE (Close + College) */}
                                <div className="flex flex-col items-end gap-3">
                                    <button
                                        type="button"
                                        className="w-10 h-[45px] flex items-center justify-center border border-secondary-content rounded-full transition-colors duration-200 hover:bg-white/10"
                                        onClick={() => { setShowCard(false); setShowRequestModal(false) }}
                                        aria-label="Close profile menu"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 16 16">
                                            <path
                                                fill="#5a2c01ff"
                                                d="m8.707 8l3.646-3.646a.5.5 0 0 0-.707-.707L8 7.293L4.354 3.647a.5.5 0 0 0-.707.707L7.293 8l-3.646 3.646a.5.5 0 0 0 .708.707l3.646-3.646l3.646 3.646a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.707L8.709 8z"
                                            />
                                        </svg>
                                    </button>


                                </div>
                            </div>

                            {/* ABOUT */}
                            <div className="rounded-xl p-4 bg-base-100 border border-secondary-content border-[2px] shadow-inner backdrop-blur-xl">
                                <h3 className="text-sm text-start font-semibold text-secondary mb-2">
                                    ABOUT :
                                </h3>
                                <p className="text-accent text-sm">
                                    {data?.about || "No description available"}
                                </p>
                            </div>

                            <div className="flex items-center gap-1 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 384 512">
                                    <path fill="#5a2c01ff" d="M290.7 311L95 269.7L86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8l153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24l119.3 160.3l32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                                </svg>
                                <h3 className="text-sm font-semibold text-secondary">TECH STACK</h3>
                            </div>
                            {/* SKILLS */}
                            <div className="flex flex-wrap gap-2 text-accent">
                                {data?.skills?.length ? (
                                    data.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-accent border border-white/10 text-gray-300  border border-secondary-content border-[2px] transition-all duration-300 group relative overflow-hidden "
                                        >
                                            <div className="absolute inset-0 bg-accent/10 "></div>
                                            <span className="relative text-accent-content">{skill}</span>
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-3 py-1.5 text-xs text-gray-500 bg-gray-900/50 rounded-lg border border-gray-700/30">
                                        No skills configured
                                    </span>
                                )}
                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-col gap-3 pt-2 w-full">


                                {data?._id && !connectionsARR.some(item => item.userId === data._id) && (
                                    <button disabled={actionId === data?._id}
                                        className={`${actionId === data?._id ? "opacity-70 cursor-not-allowed" : ""} relative hover:bg-base-200 group flex-1 min-w-[140px] bg-base-300 border border-[2px] border-secondary-content text-white px-4 py-2.5  rounded-xl font-medium  transition-all duration-300 active:scale-95 overflow-hidden`} onClick={() => sendRequest(data?.username, data?._id)}>
                                        <span className="relative z-10 flex items-center justify-center gap-2 text-xl">

                                            {actionId === data?._id && (<svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24">
                                                <path fill="#914a08ff" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.3}></path>
                                                <path fill="#914a08ff" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                                    <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                                </path>
                                            </svg>)}


                                            <div className="flex justify-center items-center gap-4">

                                                {!showRequestModal && (
                                                    <span className="flex justify-center items-center gap-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 32 32">
                                                            <path fill="#914a08ff" d="M25 22.142V9c0-2.206-1.794-4-4-4h-4.172l2.586-2.586L18 1l-5 5l5 5l1.414-1.414L16.828 7H21c1.103 0 2 .898 2 2v13.142c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.858-1.28-3.41-3-3.858M24 28c-1.103 0-2-.897-2-2s.897-2 2-2s2 .898 2 2s-.897 2-2 2M4 6c0 1.858 1.28 3.41 3 3.858v12.284c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.28-3.41-3-3.858V9.858c1.72-.447 3-2 3-3.858c0-2.206-1.794-4-4-4S4 3.794 4 6m6 20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .898 2 2m0-20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .897 2 2"></path>
                                                        </svg>
                                                        <h1 className="text-accent">Request</h1>
                                                    </span>)}

                                                {showRequestModal && (
                                                    <span className="flex justify-center items-center gap-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 40 40">
                                                            <g fill="none" strokeMiterlimit={10}>
                                                                <path fill="#914a08ff" stroke="#231f20" d="M37 4.24c-1.89-1.44-4.45-2.38-7 0c-1.52 1-5.67 5-10.22 11c-1.19 1.58-2.32 3.08-3.35 4.49c-3.74-2.84-6.69-4.85-7.91-5c-2.07-.8-4.31 1.45-5.75 3.34S-.32 22.63 1 24.4c.47 1.14 3.13 3.53 6.87 6.38c4.49 3.41 7.73 6 9.63 6.24c2.91 1.13 5-2.31 13.37-13.36c4.55-6 7.45-11 8-12.69c1.56-3.08-.03-5.29-1.87-6.73Z" strokeWidth={1}></path>
                                                                <path stroke="#fff" strokeLinecap="round" d="M28.56 8.89c1.64-1.84 3.16-3.58 4.55-3.73" strokeWidth={1}></path>
                                                            </g>
                                                        </svg>
                                                        <h1 className="text-accent">Sent</h1>
                                                    </span>)}
                                            </div>


                                        </span>
                                    </button>

                                )}
                            </div>
                        </div>
                    </div>

                    <div className="h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                </div>
            )}

        </div >
    )
}

export default Search