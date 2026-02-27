import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Pages/auth/baseURL"
import { addReceviedConnectionUser } from "../utils/receivedConnection";
import { useDispatch, useSelector } from "react-redux";


const ReceivedRequests = () => {
    const user = useSelector(store => store.user.user.DATA);
    const receivedConnections = useSelector(store => store.receivedConnection.users || []);

    const dispatch = useDispatch();
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [actionId, setActionId] = useState(null);
    const fetchReceivedConnections = async () => {
        try {
            const { data } = await axios.get(
                `${BASE_URL}/user/requests/received`,
                { withCredentials: true }
            );

            const formattedData = data.data.map(req => ({
                connectionId: req._id,      // ✅ connection id
                ...req.requesterId          // ✅ spread user data
            }));

            dispatch(addReceviedConnectionUser(formattedData));

        } catch (err) {
            console.error(err?.message || err);
        }
    };
    useEffect(() => {

        fetchReceivedConnections();

    }, []);

    const handelRequest = async (status, connectionId) => {
        try {
            setActionId(connectionId);

            await axios.post(
                `${BASE_URL}/request/review/${status}/${connectionId}`,
                {},
                { withCredentials: true }
            );

            dispatch(
                addReceviedConnectionUser(
                    receivedConnections.filter(
                        item => item.connectionId !== connectionId
                    )
                )
            );

            setShowRequestModal(true);
            setTimeout(() => setShowRequestModal(false), 2000);

        } catch (err) {
            console.error(err?.message || err);
        } finally {
            setActionId(null);
        }
    };
    return (
        <div className="
w-full min-h-screen
bg-[radial-gradient(circle_at_top,#0a0f1f,black_70%)]
p-4 md:p-10
relative overflow-hidden
">



            <div className="text-center mb-24">
                <h1 className="text-9xl font-extrabold bg-gradient-to-b from-white to-blue-10 bg-clip-text text-transparent">
                    Received Requests
                </h1>
                <p className="text-2xl text-gray-400 mt-6 max-w-3xl mx-auto">
                    Collab with the developers by accepting their connection request
                </p>
            </div>

            <div className="max-w-9xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
                    {receivedConnections.map((item, index) => (
                        <div
                            key={item.connectionId}
                            className=" relative group bg-[#030712]/70 backdrop-blur-3xl rounded-3xl border border-white/[0.08] shadow-[0_0_40px_rgba(59,130,246,0.06)] hover:shadow-[0_0_60px_rgba(168,85,247,0.15)] transition-all duration-500 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">



                            <div className="relative p-6 flex flex-col md:flex-row gap-6">
                                {/* Left Profile Section */}
                                <div className="flex flex-col items-center md:items-start space-y-4">
                                    {/* Avatar with tech ring */}
                                    <div className="relative">

                                        <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#111827] to-black border border-blue-500/20 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">

                                            <div className="absolute inset-0 flex items-center justify-center">

                                                <img
                                                    src={item?.photoUrl?.url}
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
                                            <div className="text-lg font-bold text-blue-400">{item.age}</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                            <div className="text-xs text-gray-400">Gender</div>
                                            <div className="text-lg font-bold text-purple-400">{item.gender}</div>
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
                                                    {item.firstName} {item.middleName} {item.lastName}
                                                </h1>
                                                {item.isVerified && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#44f53d" fill-rule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clip-rule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="text-gray-400 text-sm font-mono">@{item.username}</code>
                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                <span className="text-lg text-gray-500">{item.profession}</span>
                                            </div>
                                        </div>

                                        {/* Connection status */}
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/30">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-md text-gray-300">{item.college}</span>
                                        </div>
                                    </div>

                                    {/* About section */}
                                    <div className=" rounded-xl p-4  bg-[#020617]/60 border border-white/[0.08] shadow-inner shadow-blue-500/[0.04] backdrop-blur-xl ">
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
                                                <span key={idx} className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:border-blue-400/40 hover:text-blue-300 backdrop-blur-md  transition-all duration-300 group relative overflow-hidden ">
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
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-2xl" onClick={() => handelRequest("REJECTED", item.connectionId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 20 20">
                                                    <path fill="#efeded" d="M18 5.75a.75.75 0 0 0-.75-.75H2.75a.75.75 0 1 0 0 1.5h14.5a.75.75 0 0 0 .75-.75m0 3a.75.75 0 0 0-.75-.75H2.75a.75.75 0 1 0 0 1.5h9.456A5.5 5.5 0 0 1 14.5 9a5.5 5.5 0 0 1 2.294.5h.456a.75.75 0 0 0 .75-.75M9.09 15.5H2.75a.75.75 0 0 1 0-1.5h6.272a5.6 5.6 0 0 0 .069 1.5m.285-3H2.75a.75.75 0 0 1 0-1.5h7.507a5.5 5.5 0 0 0-.882 1.5m9.625 2a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4.5.707l1.146 1.147a.5.5 0 0 0 .708-.708L15.207 14.5l1.147-1.146a.5.5 0 0 0-.708-.708L14.5 13.793l-1.146-1.147a.5.5 0 0 0-.708.708l1.147 1.146l-1.147 1.146a.5.5 0 0 0 .708.708z"></path>
                                                </svg>
                                                Reject
                                            </span>
                                        </button>

                                        <button className="relative group flex-1 min-w-[140px] bg-gradient-to-r from-purple-600/90 to-purple-700/90 text-white px-4 py-2.5 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 active:scale-95  border border-purple-500/30 overflow-hidden" >

                                            <span className="relative z-10 flex items-center justify-center gap-2 text-2xl" onClick={() => handelRequest("ACCEPTED", item.connectionId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 512 512">
                                                    <path fill="#efeded" d="M405.333 42.666v32h48l2.171.146c7.1.963 12.72 6.583 13.683 13.683l.146 2.171l-.146 2.171c-.963 7.1-6.583 12.72-13.683 13.683l-2.171.146h-48v42.667h48l2.171.146c7.1.963 12.72 6.583 13.683 13.683l.146 2.171l-.146 2.171c-.963 7.099-6.583 12.719-13.683 13.683l-2.171.146h-48v32h-64l-4.259-.105c-37.866-1.861-69.243-28.404-78.381-63.879l-27.687-.016l-2.804.185a21.33 21.33 0 0 0-12.28 6.063c-7.691 7.69-8.282 19.791-1.775 28.16l1.775 2.01l110.326 110.327l2.891 3.087a64 64 0 0 1 15.855 42.168c0 34.084-26.644 61.944-60.24 63.891l-3.76.109l-27.687.016c-9.138 35.475-40.515 62.018-78.381 63.879l-4.259.105h-64v-32h-48c-8.1 0-14.795-6.02-15.854-13.829l-.146-2.171c0-8.1 6.019-14.795 13.829-15.854l2.17-.146h48.001v-42.667h-48c-8.1 0-14.795-6.019-15.854-13.829l-.146-2.171c0-8.1 6.019-14.794 13.829-15.854l2.17-.146h48.001v-32h64c39.763 0 73.175 27.198 82.646 64.005l27.681-.005l2.487-.143c10.61-1.233 18.846-10.25 18.846-21.19a21.34 21.34 0 0 0-4.396-12.972l-1.852-2.113l-110.327-110.327l-2.88-3.072c-22.074-25.139-21.114-63.444 2.88-87.438a64 64 0 0 1 41.028-18.605l4.226-.14l27.681.005c9.12-35.444 40.441-61.977 78.255-63.894l4.391-.111zM170.667 341.333h-21.334v85.333h21.334l3.184-.117c20.973-1.547 37.73-18.256 39.353-39.208l.129-3.342l-.117-3.184c-1.547-20.973-18.255-37.73-39.207-39.353zm192-256h-21.334l-3.342.129c-19.787 1.533-35.79 16.565-38.811 35.898l-.396 3.455l-.117 3.184l.129 3.342c1.533 19.788 16.565 35.791 35.898 38.812l3.455.396l3.184.117h21.334z"></path>
                                                </svg>
                                                Accept
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


            </div>
            {showRequestModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center">

                    {/* BACKDROP */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl border border-white/10
    bg-[#030712]/80 backdrop-blur-2xl
    shadow-[0_0_60px_rgba(168,85,247,0.25)]
    animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">

                            {/* ICON */}
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600/20 border border-purple-500/40">
                                <svg width="26" height="26" viewBox="0 0 24 24">
                                    <path
                                        fill="#a855f7"
                                        d="M9 16.2l-3.5-3.5L4 14.2l5 5l11-11l-1.5-1.5z"
                                    />
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-lg font-semibold text-white">
                                    Connection Request Accepted 🚀
                                </div>
                                <div className="text-sm text-gray-400">
                                    You can acess the details from the connections option in the right hand sidebar
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
            }
        </div >

    );
}

export default ReceivedRequests