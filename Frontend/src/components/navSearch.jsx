import React, { useState, useEffect } from 'react'
import { BASE_URL } from "../Pages/auth/baseURL";
import axios from "axios";





const Search = ({ height }) => {
    const [username, setUserName] = useState("");
    const [data, setData] = useState(null)
    const [showcard, setShowCard] = useState(false);
    const searchHandeler = async (e) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/profile/others`,
                { username },
                { withCredentials: true }
            );
            setData(res.data.data)
            setShowCard(true)
        } catch (err) {
            console.log(err.response?.data?.message || "User not found");
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
        <div className='w-[90%]'>
            <div className="relative">

                {/* LEFT ICON */}

                <svg xmlns="http://www.w3.org/2000/svg" className='absolute left-3 top-1/2 -translate-y-1/2' width="30" height="30" viewBox="0 0 80 80">
                    <g fill="none">
                        <path fill="#f2994a" d="M65.368 67.848a2 2 0 0 0 2.828-2.829zm-9.634-15.29a2 2 0 0 0-2.828 2.828zm12.462 12.461L55.734 52.557l-2.828 2.829l12.462 12.462z" />
                        <path fill="#56ccf2" stroke="#2f80ed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M13.578 30.724a24.249 24.249 0 1 1 46.844 12.552a24.249 24.249 0 0 1-46.844-12.552" />
                    </g>
                </svg>

                {/* INPUT */}
                <input
                    type="text"
                    placeholder="Search Developers "
                    style={{ height: `${height}px` }}
                    className="w-full  text-gray-200 rounded-xl pl-14 pr-14 bg-black/90 border border-white/10 outline-none focus:border-green-400 transition-all"
                    value={username}
                    onChange={(e) => setUserName(e.target.value).trimStart()}
                />

                {/* RIGHT ICON */}
                <svg xmlns="http://www.w3.org/2000/svg" className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' width="45" height="45" viewBox="0 0 24 24">
                    <g fill="#0096ff" fill-opacity="0" stroke="#0096ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
                        <path stroke-dasharray="22" d="M12 5c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.25s" values="22;0" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="0.55s" dur="0.075s" to="0.3" />
                        </path>
                        <path stroke-dasharray="38" stroke-dashoffset="38" d="M12 14c4 0 7 2 7 3v2h-14v-2c0 -1 3 -3 7 -3Z">
                            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.25s" dur="0.25s" to="0" />
                            <animate fill="freeze" attributeName="fill-opacity" begin="0.55s" dur="0.075s" to="0.3" />
                        </path>
                    </g>
                </svg>

            </div>

            {showcard && (<div className=" relative group bg-[#030712]/70 backdrop-blur-3xl rounded-3xl border border-white/[0.08] shadow-[0_0_40px_rgba(59,130,246,0.06)] hover:shadow-[0_0_60px_rgba(168,85,247,0.15)] transition-all duration-500 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">
                <div className="relative p-6 flex flex-col md:flex-row gap-6">
                    {/* Left Profile Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        {/* Avatar with tech ring */}
                        <div className="relative">

                            <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#111827] to-black border border-blue-500/20 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">

                                <div className="absolute inset-0 flex items-center justify-center">

                                    <img
                                        src={data?.photoUrl?.url}
                                        className=" w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700
"
                                    />

                                </div>

                            </div>



                        </div>

                        {/* Tech stats */}
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

                    {/* Right Content Section */}
                    <div className="flex-1 space-y-4">
                        {/* Header with tech indicators */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                                        {data?.firstName} {data?.middleName} {data?.lastName}
                                    </h1>
                                    {data?.isVerified && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#44f53d" fill-rule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clip-rule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <code className="text-gray-400 text-sm font-mono">@{data?.username}</code>
                                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                    <span className="text-lg text-gray-500">{data?.profession}</span>
                                </div>
                            </div>

                            {/* Connection status */}
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/30">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-md text-gray-300">{data?.college}</span>
                            </div>
                        </div>

                        {/* About section */}
                        <div className=" rounded-xl p-4  bg-[#020617]/60 border border-white/[0.08] shadow-inner shadow-blue-500/[0.04] backdrop-blur-xl ">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                <h3 className="text-sm font-semibold text-gray-300">SYSTEM PROFILE</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">{data?.about || "No description available"}</p>
                        </div>

                        {/* Skills section with tech tags */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <h3 className="text-sm font-semibold text-gray-300">TECH STACK</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data?.skills?.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:border-blue-400/40 hover:text-blue-300 backdrop-blur-md  transition-all duration-300 group relative overflow-hidden "
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="relative">{skill}</span>
                                    </span>
                                )) || (
                                        <span className="px-3 py-1.5 text-xs text-gray-500 bg-gray-900/50 rounded-lg border border-gray-700/30">
                                            No skills configured
                                        </span>
                                    )}
                            </div>
                        </div>

                        {/* Action buttons with tech style */}
                        <div className="flex flex-wrap gap-3 pt-2">

                            <button className="relative group flex-1 min-w-[140px] bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 active:scale-95 border border-gray-700/50 hover:border-gray-600/50 overflow-hidden">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Message
                                </span>
                            </button>

                            <button className="relative group flex-1 min-w-[140px] bg-gradient-to-r from-purple-600/90 to-purple-700/90 text-white px-4 py-2.5 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 active:scale-95  border border-purple-500/30 overflow-hidden">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Send Request
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom tech border */}
                <div className="h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            </div>)}






        </div>
    )
}

export default Search