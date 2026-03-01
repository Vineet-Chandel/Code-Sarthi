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
        } catch (err) {
            setIsSearching(false)

            setNewError(err.response?.data?.message || "User not found");
        }

    }
    useEffect(() => {
        if (!username.trim()) {
            setData(null);
            return;
        }

        const timer = setTimeout(() => {
            searchHandeler();
        }, 400);

        return () => clearTimeout(timer);
    }, [username]);
    return (
        <div className='w-[90%] flex flex-col gap-y-10'>
            <div className="relative">

                {/* LEFT ICON */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    width="30"
                    height="30"
                    viewBox="0 0 80 80"
                >
                    <g fill="none">
                        <path fill="#f2994a" d="M65.368 67.848a2 2 0 0 0 2.828-2.829zm-9.634-15.29a2 2 0 0 0-2.828 2.828zm12.462 12.461L55.734 52.557l-2.828 2.829l12.462 12.462z" />
                        <path fill="#56ccf2" stroke="#2f80ed" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13.578 30.724a24.249 24.249 0 1 1 46.844 12.552a24.249 24.249 0 0 1-46.844-12.552" />
                    </g>
                </svg>

                {/* INPUT */}
                <input
                    type="text"
                    placeholder="Search Developers"
                    style={{ height: `${height}px` }}
                    className="w-full text-gray-200 rounded-xl pl-14 pr-14 bg-black/90 border border-white/10 outline-none focus:border-green-400 transition-all"
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                >
                    <g fill="#0096ff" fillOpacity="0" stroke="#0096ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"> <path strokeDasharray="22" d="M12 5c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z"> <animate fill="freeze" attributeName="strokeDashoffset" dur="0.25s" values="22;0" /> <animate fill="freeze" attributeName="fillOpacity" begin="0.55s" dur="0.075s" to="0.3" /> </path> <path strokeDasharray="38" strokeDashoffset="38" d="M12 14c4 0 7 2 7 3v2h-14v-2c0 -1 3 -3 7 -3Z"> <animate fill="freeze" attributeName="strokeDashoffset" begin="0.25s" dur="0.25s" to="0" /> <animate fill="freeze" attributeName="fillOpacity" begin="0.55s" dur="0.075s" to="0.3" /> </path> </g>
                </svg>

            </div>
            {showcard && (
                <div
                    className={`${displayType === "nav"
                        ? "absolute right-0 top-full mt-3 w-[700px] z-50"
                        : "relative"
                        } group bg-[#030712]/70 backdrop-blur-3xl rounded-3xl border border-white/[0.08]
    shadow-[0_0_40px_rgba(59,130,246,0.06)] hover:shadow-[0_0_60px_rgba(168,85,247,0.15)]
    transition-all duration-500 hover:-translate-y-1 overflow-hidden
    before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br
    before:from-blue-500/[0.05] before:to-purple-500/[0.05]
    before:opacity-0 group-hover:before:opacity-100 before:transition-opacity`}
                >
                    <div className="relative p-6 flex flex-col md:flex-row gap-6">

                        {/* LEFT PROFILE */}
                        <div className="flex flex-col items-center md:items-start space-y-4">
                            <div className="relative w-28 h-28 rounded-2xl border border-blue-500/20 overflow-hidden">
                                <img
                                    src={data?.photoUrl?.url}
                                    className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* STATS */}
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <div className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                    <div className="text-xs text-gray-400">Age</div>
                                    <div className="text-lg font-bold text-blue-400">{data?.age}</div>
                                </div>
                                <div className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                    <div className="text-xs text-gray-400">Gender</div>
                                    <div className="text-lg font-bold text-purple-400">{data?.gender}</div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1 space-y-4">

                            {/* HEADER */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                                            {data?.firstName} {data?.middleName} {data?.lastName}
                                        </h1>
                                        {data?.isVerified && (
                                            <span className="text-green-400 text-sm">✔</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-1">
                                        <code className="text-gray-400 text-sm font-mono">
                                            @{data?.username}
                                        </code>
                                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                        <span className="text-lg text-gray-500">{data?.profession}</span>
                                    </div>
                                </div>

                                {/* RIGHT SIDE (Close + College) */}
                                <div className="flex flex-col items-end gap-3">
                                    <button
                                        type="button"
                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full transition-colors duration-200 hover:bg-white/10"
                                        onClick={() => setShowCard(false)}
                                        aria-label="Close profile menu"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 16 16">
                                            <path
                                                fill="#fff"
                                                d="m8.707 8l3.646-3.646a.5.5 0 0 0-.707-.707L8 7.293L4.354 3.647a.5.5 0 0 0-.707.707L7.293 8l-3.646 3.646a.5.5 0 0 0 .708.707l3.646-3.646l3.646 3.646a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.707L8.709 8z"
                                            />
                                        </svg>
                                    </button>

                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/30">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-md text-gray-300">{data?.college}</span>
                                    </div>
                                </div>
                            </div>

                            {/* ABOUT */}
                            <div className="rounded-xl p-4 bg-[#020617]/60 border border-white/[0.08] shadow-inner backdrop-blur-xl">
                                <h3 className="text-sm font-semibold text-gray-300 mb-2">
                                    SYSTEM PROFILE
                                </h3>
                                <p className="text-gray-400 text-sm">
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
                                <button className="flex-1 min-w-[140px] bg-purple-600 text-white px-4 py-2.5 rounded-xl">
                                    Send Request
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
                    <div className="flex items-center rounded-2xl px-4 py-3 border border-red-600 bg-red-500/70 w-[50%] transition-all duration-300">
                        <span className="mr-3">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="#ffffff"
                                    d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z"
                                />
                            </svg>
                        </span>

                        <div className="text-white ml-2">{newError}</div>
                    </div>
                </div>
            )}





        </div>
    )
}

export default Search