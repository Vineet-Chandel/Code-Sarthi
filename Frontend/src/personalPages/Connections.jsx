import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Pages/auth/baseURL";
import { addConnectionUser } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
const Connections = () => {
    const connections = useSelector(state => state.connections.users || []);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const connectionUser = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/user/connections`,
                { withCredentials: true }
            );
            console.log(response.data);
            dispatch(addConnectionUser(response.data.data));


        } catch (err) {
            console.error(err?.message || err);
        }
    };

    useEffect(() => {
        connectionUser();

    }, []);



    return (
        <div className="w-full min-h-screen bg-black p-4 md:p-8">
            <div className="w-full/2 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {connections.map((item, index) => (
                        <div
                            key={item._id}
                            className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/30 hover:shadow-blue-900/20 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                        >
                            {/* Animated background grid effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>

                            {/* Glow effect on hover */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

                            <div className="relative p-6 flex flex-col md:flex-row gap-6">
                                {/* Left Profile Section */}
                                <div className="flex flex-col items-center md:items-start space-y-4">
                                    {/* Avatar with tech ring */}
                                    <div className="relative">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                        <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-xl overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-600/10"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                    {item.FirstName?.[0]}
                                                    {item.LastName?.[0]}
                                                </span>
                                            </div>
                                            {/* Tech corner accents */}
                                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400/50"></div>
                                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-400/50"></div>
                                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400/50"></div>
                                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/50"></div>
                                        </div>



                                    </div>

                                    {/* Tech stats */}
                                    <div className="grid grid-cols-3 gap-2 w-full">
                                        <div className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                            <div className="text-xs text-gray-400">LEVEL</div>
                                            <div className="text-lg font-bold text-blue-400">42</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                            <div className="text-xs text-gray-400">XP</div>
                                            <div className="text-lg font-bold text-purple-400">1.2K</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                            <div className="text-xs text-gray-400">RANK</div>
                                            <div className="text-lg font-bold text-amber-400">#5</div>
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
                                                    {item.FirstName} {item.MiddleName} {item.LastName}
                                                </h1>
                                                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">PRO</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="text-gray-400 text-sm font-mono">@{item.username}</code>
                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                <span className="text-xs text-gray-500">Full Stack Dev</span>
                                            </div>
                                        </div>

                                        {/* Connection status */}
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/30">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs text-gray-300">Available for collab</span>
                                        </div>
                                    </div>

                                    {/* About section */}
                                    <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/30">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                            <h3 className="text-sm font-semibold text-gray-300">SYSTEM PROFILE</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.about || "No description available"}</p>
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
                                            {item.skills?.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700/50 text-gray-300 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300 group relative overflow-hidden"
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

                                        <button className="relative group flex-1 min-w-[140px] bg-gradient-to-r from-purple-600/90 to-purple-700/90 text-white px-4 py-2.5 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 active:scale-95 shadow-lg shadow-purple-900/20 border border-purple-500/30 overflow-hidden">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View Profile
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom tech border */}
                            <div className="h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className="relative group bg-gradient-to-r from-gray-900 to-gray-950 text-gray-300 px-8 py-3.5 rounded-xl font-medium hover:text-white transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex items-center gap-3">
                            <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            LOAD MORE PROFILES
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Connections