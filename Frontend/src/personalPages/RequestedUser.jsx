import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Pages/auth/baseURL"
import { addRequestedUser } from "../utils/requestedUserSlice";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/navSearch";
import { RiUserUnfollowFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaPeopleCarry } from "react-icons/fa";

const RequestedUser = () => {
    const user = useSelector(store => store.user.user.DATA);
    const reqUser = useSelector(store => store.requestedUser.users || []);
    const reqUserTotal = useSelector(store => store.requestedUser.total);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const requestedUsers = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/user/requests/send`,
                { withCredentials: true }
            );

            dispatch(addRequestedUser(response.data.data));

        } catch (err) {
            console.error(err?.message || err);
        }
    };

    useEffect(() => {

        requestedUsers();

    }, []);

    const deleteRequest = async (requestId) => {
        try {
            setDeletingId(requestId);

            await axios.delete(
                `${BASE_URL}/user/requests/send/${requestId}`,
                { withCredentials: true }
            );

            // remove instantly from UI
            dispatch(
                addRequestedUser(
                    reqUser.filter(item => item._id !== requestId)
                )
            );

            setShowRequestModal(true);

            setTimeout(() => setShowRequestModal(false), 2200);

        } catch (err) {
            console.log(err?.message || "Delete failed");
        } finally {
            setDeletingId(null);
        }

    };


    return (
        <div className="
w-full min-h-screen
bg-[radial-gradient(circle_at_top,#0a0f1f,black_70%)]
p-4 md:p-10
relative overflow-hidden
">



            <div className="text-center mb-16 sm:mb-20 lg:mb-24 w-full flex flex-col items-center px-4">

                {/* Heading */}
                <h1 className="
        text-4xl 
        sm:text-6xl 
        md:text-7xl 
        lg:text-8xl 
        xl:text-9xl
        font-extrabold 
        bg-gradient-to-b 
        from-white 
        to-blue-400 
        bg-clip-text 
        text-transparent
        leading-tight
    ">
                    Requested Developers
                </h1>

                {/* Subtitle */}
                <p className="
        text-base 
        sm:text-lg 
        md:text-xl 
        lg:text-2xl 
        text-gray-400 
        mt-6 
        max-w-xl 
        lg:max-w-3xl
    ">
                    Collaborate with developers worldwide from the explore section.
                </p>

                {/* Search */}
                <div className="
        w-full 
        sm:w-4/5 
        md:w-3/5 
        lg:w-1/2 
        xl:w-2/5 
        mt-10
    ">

                </div>
            </div>
            <div className="max-w-9xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
                    {reqUser.map((item, index) => (
                        <div
                            key={item._id}
                            className=" relative group bg-[#030712]/70  rounded-3xl border border-white/[0.08] transition-all duration-500 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">



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
                                    <div className=" rounded-xl p-4  bg-[#020617]/60 border border-white/[0.08] ">
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
                                                    className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:border-blue-400/40 hover:text-blue-300   transition-all duration-300 group relative overflow-hidden "
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
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-2xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 -0.5 41 41">
                                                    <g fill="none" strokeMiterlimit={10}>
                                                        <path fill="#ffe236" stroke="#231f20" d="M36 33.59c3-1.36 3.53-8.34 3.53-13.59S38.94 7.77 36 6.41c-1.48-1.36-9.4-1.73-16-1.73S5.52 5.05 4 6.41C1.06 7.77.5 14.75.5 20S1.06 32.23 4 33.59c1.49 1.36 9.41 1.73 16 1.73s14.49-.32 16-1.73Z" strokeWidth={1}></path>
                                                        <path stroke="#231f20" strokeLinecap="round" d="M4.67 13c3.65 3.81 8.94 7.93 10.57 8.64a10.81 10.81 0 0 0 9.52 0c1.62-.64 6.91-4.79 10.56-8.64m-20.89 8.39l-6.96 6.97m18.1-6.97l6.97 6.97" strokeWidth={1}></path>
                                                        <path stroke="#fff" strokeLinecap="round" d="M29.05 7.53a15.4 15.4 0 0 1 5.27.92" strokeWidth={1}></path>
                                                    </g>
                                                </svg>
                                                Message
                                            </span>
                                        </button>

                                        <button className="relative group flex-1 min-w-[140px] bg-gradient-to-r from-purple-600/90 to-purple-700/90 text-white px-4 py-2.5 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 active:scale-95  border border-purple-500/30 overflow-hidden" onClick={() => deleteRequest(item._id)}>

                                            <span className="relative z-10 flex items-center justify-center gap-2 text-2xl">
                                                {deletingId === item._id && (<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                                                    <path fill="#efeded" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.3}></path>
                                                    <path fill="#efeded" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                                        <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                                    </path>
                                                </svg>)}  <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 40 40">
                                                    <g fill="none" strokeMiterlimit={10}>
                                                        <path fill="#ff52a1" stroke="#231f20" d="M.5 20a19.5 19.5 0 1 0 39 0a19.5 19.5 0 0 0-39 0Z" strokeWidth={1}></path>
                                                        <path fill="#fff" stroke="#231f20" d="M30.08 25.41c-.16-.77-2.31-3.15-4.48-5.41c2.17-2.26 4.32-4.64 4.48-5.41c.46-.89-.63-2.11-1.59-3.08s-2.19-2-3.08-1.59c-.77.16-3.15 2.31-5.41 4.48c-2.26-2.17-4.64-4.32-5.41-4.48c-.89-.46-2.11.63-3.07 1.59s-2.06 2.19-1.6 3.08c.16.77 2.31 3.15 4.48 5.41c-2.17 2.26-4.32 4.64-4.48 5.41c-.46.89.63 2.11 1.59 3.08s2.19 2.05 3.08 1.59c.77-.16 3.15-2.31 5.41-4.48c2.26 2.17 4.64 4.32 5.41 4.48c.89.46 2.11-.63 3.08-1.59s2.05-2.19 1.59-3.08Z" strokeWidth={1}></path>
                                                        <path stroke="#fff" strokeLinecap="round" d="M27.56 5a15.4 15.4 0 0 1 5.26 3.73" strokeWidth={1}></path>
                                                    </g>
                                                </svg>
                                                Delete Request
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
                    <div className="absolute inset-0 bg-black/50 "></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl border border-white/10
    bg-[#030712]/80 
    animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">

                            {/* ICON */}
                            <div className="w-[100px] h-[100px] flex items-center justify-center rounded-full bg-purple-600/20 border border-purple-500/40">
                                <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 80 80">
                                    <g fill="none" fillRule="evenodd" clipRule="evenodd">
                                        <path fill="#eb5757" d="M17.103 20.655a14 14 0 0 0 0 19.799l14.142 14.142l7.07 7.07a2 2 0 0 0 2.83 0l7.07-7.07l14.142-14.142a14 14 0 0 0-19.799-19.8l-2.137 2.138a.977.977 0 0 1-1.382 0L36.9 20.655a14 14 0 0 0-19.799 0" strokeWidth={2} stroke="#eb5757"></path>
                                        <path fill="#f2c94c" d="M47.054 17.639a1 1 0 0 1-.111.375l-4.502 8.583a.274.274 0 0 0 .172.392l1.177.316l1.445.387l3.197.857a1 1 0 0 1 .52 1.594L34.834 47.618c-.243.302-.715.004-.549-.345l6.048-12.706a1 1 0 0 0-.644-1.395l-.611-.164l-1.353-.363l-4.711-1.262a1 1 0 0 1-.668-1.342l4.019-9.894q.273.246.535.507l2.137 2.138a.977.977 0 0 0 1.383 0l2.137-2.138c1.3-1.3 2.831-2.319 4.496-3.015" strokeWidth={2} stroke="#f2c94c"></path>
                                    </g>
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-4xl font-semibold text-white">
                                    Request Deleted!
                                </div>
                                <div className="text-xl text-gray-400">
                                    Request has been deleted.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(reqUserTotal == 0 || reqUser.length === 0) && (
                <div className="inset-0 flex items-center justify-center px-4">

                    <div className="relative w-full max-w-3xl p-10 rounded-3xl  bg-gradient-to-br from-[#0f172a]/90 to-[#020617]/90  border border-purple-500/20 animate-[modalPop_0.3s_ease]">

                        <div className="flex flex-col md:flex-row items-center gap-8">

                            {/* ICON */}
                            <div className="w-36 h-36 flex items-center justify-center 
                                        rounded-full bg-purple-600/10 
                                        border border-purple-500/40
                                    ">
                                <FaPeopleCarry className="text-purple-400" size={60} />
                            </div>

                            {/* TEXT SECTION */}
                            <div className="text-center md:text-left">
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    No request found
                                </h2>

                                <p className="text-lg text-gray-400 mb-6 max-w-md">
                                    Discover and connect with developers from around the world.
                                    Start exploring new profiles today.
                                </p>

                                {/* BUTTON */}

                                <button
                                    onClick={() => navigate("/app/explore")}
                                    className="px-6 py-3 rounded-xl 
                                                bg-gradient-to-r from-purple-500 to-pink-500
                                                hover:scale-105 
                                                transition-all duration-300
                                                text-white font-semibold"
                                >
                                    Explore Developers
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}

export default RequestedUser