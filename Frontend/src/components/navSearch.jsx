import React, { useState, useEffect } from 'react'
import { BASE_URL } from "../Pages/auth/baseURL";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";





const Search = ({ height, displayType }) => {
    const [username, setUserName] = useState("");
    const [data, setData] = useState(null)
    const [showcard, setShowCard] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [newError, setNewError] = useState("");
    const [actionId, setActionId] = useState(null);
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
            setNewError(err.response?.data?.message || "User not found");
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
    return (
        <div className='w-[90%] flex flex-col gap-y-1 '>
            <div className="relative">


                {/* LEFT ICON */}
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 80 80" className="absolute left-3 top-1/2 -translate-y-1/2">
                    <g fill="none">
                        <path fill="#8c3f27" d="M65.368 67.848a2 2 0 0 0 2.828-2.829zm-9.634-15.29a2 2 0 0 0-2.828 2.828zm12.462 12.461L55.734 52.557l-2.828 2.829l12.462 12.462z"></path>
                        <path fill="#ff9d33" stroke="#370a00" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13.578 30.724a24.249 24.249 0 1 1 46.844 12.552a24.249 24.249 0 0 1-46.844-12.552"></path>
                    </g>
                </svg>

                {/* INPUT */}
                <input
                    type="text"
                    placeholder="Search Developers.."
                    style={{ height: `${height}px` }}
                    className="w-full text-secondary placeholder:text-neutral rounded-xl bg-base-100 pl-14 pr-14 border border-base-300 border-[3px] outline-none focus:border-accent transition-all"
                    value={username}
                    onChange={(e) => setUserName(e.target.value.trimStart())}
                />

                {/* LOADING ICON */}
                {isSearching && (
                    <div className="absolute right-14 bottom-0 flex justify-center items-center h-full ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="#efeded" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.3" />
                            <path fill="#efeded" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" />
                            </path>
                        </svg>
                    </div>
                )}


                {/* RIGHT ICON */}
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48" className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    <path fill="#ff9d33" stroke="#8c3f27" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M24 20a7 7 0 1 0 0-14a7 7 0 0 0 0 14M6 40.8V42h36v-1.2c0-4.48 0-6.72-.872-8.432a8 8 0 0 0-3.496-3.496C35.92 28 33.68 28 29.2 28H18.8c-4.48 0-6.72 0-8.432.872a8 8 0 0 0-3.496 3.496C6 34.08 6 36.32 6 40.8"></path>
                </svg>

            </div>
            {showcard && (
                <div
                    className={`${displayType === "nav"
                        ? "absolute right-0 top-full mt-3 w-[700px] z-50"
                        : "relative"
                        } group bg-base-300  rounded-3xl border border-secondary border-[3px]`}
                >
                    <div className="relative p-6 flex flex-col md:flex-row gap-6">

                        {/* LEFT PROFILE */}
                        <div className="flex flex-col items-center md:items-start space-y-4">
                            <div className="relative w-28 h-28 rounded-2xl border border-blue-500/20 overflow-hidden">
                                <img
                                    src={data?.photoUrl?.url}
                                    className="  border border-secondary border-[2px] w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="text-center p-2 bg-base-100 rounded-lg border border-secondary border-[2px]">
                                    <div className="text-xs text-secondary">Age</div>
                                    <div className="text-lg font-bold text-accent">{data?.age}</div>
                                </div>
                                <div className="text-center p-2 bg-base-100 rounded-lg border border-secondary border-[2px]">
                                    <div className="text-xs text-secondary">Gender</div>
                                    <div className="text-lg font-bold text-accent">{data?.gender}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-base-100 rounded-full border border-secondary border-[2px]">
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
                                        <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                                            {data?.firstName} {data?.middleName} {data?.lastName}
                                        </h1>
                                        {data?.isVerified && (
                                            <span className="text-green-400 text-sm">✔</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-1">
                                        <code className="text-accent text-sm font-mono">
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
                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full transition-colors duration-200 hover:bg-white/10"
                                        onClick={() => { setShowCard(false); setShowRequestModal(false) }}
                                        aria-label="Close profile menu"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 16 16">
                                            <path
                                                fill="#fff"
                                                d="m8.707 8l3.646-3.646a.5.5 0 0 0-.707-.707L8 7.293L4.354 3.647a.5.5 0 0 0-.707.707L7.293 8l-3.646 3.646a.5.5 0 0 0 .708.707l3.646-3.646l3.646 3.646a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.707L8.709 8z"
                                            />
                                        </svg>
                                    </button>


                                </div>
                            </div>

                            {/* ABOUT */}
                            <div className="rounded-xl p-4 bg-base-100 border border-secondary border-[2px] shadow-inner backdrop-blur-xl">
                                <h3 className="text-sm font-semibold text-secondary mb-2">
                                    ABOUT
                                </h3>
                                <p className="text-accent text-sm">
                                    {data?.about || "No description available"}
                                </p>
                            </div>

                            {/* SKILLS */}
                            <div className="flex flex-wrap gap-2">
                                {data?.skills?.length ? (
                                    data.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 text-xs rounded-xl bg-white/[0.04] border border-white/10 text-gray-300"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-3 py-1.5 text-xs text-gray-500 bg-gray-900/50 rounded-lg border border-gray-700/30">
                                        No skills configured
                                    </span>
                                )}
                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <button className="flex-1 min-w-[140px] bg-gray-800 text-gray-300 px-4 py-2.5 rounded-xl">
                                    Message
                                </button>
                                <button disabled={actionId === data?._id}
                                    className={`${actionId === data?._id ? "opacity-70 cursor-not-allowed" : ""}relative group flex-1 min-w-[140px] bg-base-300 border border-[2px] border-secondary text-white px-4 py-2.5 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 active:scale-95  border border-purple-500/30 overflow-hidden`} onClick={() => sendRequest(data?.username, data?._id)}>
                                    <span className="relative z-10 flex items-center justify-center gap-3 text-2xl">

                                        {actionId === data?._id && (<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                                            <path fill="#914a08ff" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.3}></path>
                                            <path fill="#914a08ff" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                                <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                            </path>
                                        </svg>)}


                                        <div className="flex justify-center items-center gap-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 32 32">
                                                <path fill="#914a08ff" d="M25 22.142V9c0-2.206-1.794-4-4-4h-4.172l2.586-2.586L18 1l-5 5l5 5l1.414-1.414L16.828 7H21c1.103 0 2 .898 2 2v13.142c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.858-1.28-3.41-3-3.858M24 28c-1.103 0-2-.897-2-2s.897-2 2-2s2 .898 2 2s-.897 2-2 2M4 6c0 1.858 1.28 3.41 3 3.858v12.284c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.28-3.41-3-3.858V9.858c1.72-.447 3-2 3-3.858c0-2.206-1.794-4-4-4S4 3.794 4 6m6 20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .898 2 2m0-20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .897 2 2"></path>
                                            </svg>
                                            <h1 className="text-accent">  Send Request</h1>
                                        </div>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                </div>
            )}

            {newError && (
                <div
                    className={`${displayType === "nav"
                        ? "absolute right-0 top-full mt-3 w-full z-50"
                        : "relative"
                        } flex justify-center`}
                >
                    <div className="flex items-center rounded-2xl px-4 py-3 border border-secondary bg-error w-[50%] transition-all duration-300">
                        <span className="mr-3" onClick={() => setNewError("")}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="#801518"
                                    d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z"
                                />
                            </svg>
                        </span>

                        <div className="text-error-content ml-2">{newError}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Search