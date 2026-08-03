import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "./auth/baseURL";
import { addFeedUser } from "../utils/feedSlice";
import { removeFeedUser } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/navSearch";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Explore = () => {
    const user = useSelector(store => store.user.user.DATA);
    const feed = useSelector(store => store.feed.users || []);

    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [actionId, setActionId] = useState(null);
    const [actionColorId, setActionColorId] = useState(null);
    const Navigate = useNavigate()
    const [showRequestModal, setShowRequestModal] = useState(false);


    const sendRequest = async (username, ID) => {

        try {

            setActionId(ID);

            const response = await axios.post(
                `${BASE_URL}/request/send/${username}`, {},
                { withCredentials: true }
            );

            setShowRequestModal(true);
            dispatch(removeFeedUser(ID));
            setTimeout(() => {
                {
                    setShowRequestModal(false);
                }
            }, 2200);


        } catch (err) {
            console.log(err?.message || "not send");
        } finally {
            setActionId(null);
        }

    }

    const [loading, setLoading] = useState(false);
    const [noMoreDev, setNoMoreDev] = useState(false);
    const feedUser = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                `${BASE_URL}/user/feed?page=${page}&limit=12`,
                { withCredentials: true }
            );
            if (response.data.data.length === 0) {
                setNoMoreDev(true)
            }
            dispatch(addFeedUser(response.data.data));

        } catch (err) {
            console.error(err?.message || err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        feedUser();
    }, [page]);


    return (
        <div className="
w-full min-h-screen
bg-base-100
p-4 md:p-10 scrollbar-none 

relative overflow-y-auto
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
text-white
    ">
                    Collab with New Developers
                </h1>

                {/* Subtitle */}
                <p className="
        text-base 
        sm:text-lg 
        md:text-xl 
        lg:text-2xl 
text-blue-500
        mt-6 
        max-w-xl 
        lg:max-w-3xl

        flex items-center gap-2
    ">
                    <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" className="transition-transform duration-500 ease-in-out hover:rotate-180">
                        <path fill="currentColor" d="M10.565 2.075a3.33 3.33 0 0 1 2.87 0c.394.189.755.497 1.26.928l.079.066c.48.41.939.604 1.58.655l.102.008c.662.053 1.135.09 1.547.236a3.33 3.33 0 0 1 2.03 2.029c.145.412.182.885.235 1.547l.008.102c.051.641.246 1.1.655 1.58l.066.078c.431.506.74.867.928 1.261a3.33 3.33 0 0 1 0 2.87c-.189.394-.497.755-.928 1.26l-.066.079c-.418.49-.605.951-.655 1.58l-.008.102c-.053.662-.09 1.135-.236 1.547a3.33 3.33 0 0 1-2.029 2.03c-.412.145-.885.182-1.547.235l-.102.008c-.641.051-1.1.246-1.58.655l-.079.066c-.505.431-.866.74-1.26.928a3.33 3.33 0 0 1-2.87 0c-.394-.189-.755-.497-1.26-.928l-.079-.066a2.56 2.56 0 0 0-1.58-.655l-.102-.008c-.662-.053-1.135-.09-1.547-.236a3.33 3.33 0 0 1-2.03-2.029c-.145-.412-.182-.885-.235-1.547l-.008-.102a2.56 2.56 0 0 0-.655-1.58l-.066-.079c-.431-.505-.74-.866-.928-1.26a3.33 3.33 0 0 1 0-2.87c.189-.394.497-.755.928-1.26l.066-.079a2.56 2.56 0 0 0 .655-1.58l.008-.102c.053-.662.09-1.135.236-1.547a3.33 3.33 0 0 1 2.029-2.03c.412-.145.885-.182 1.547-.235l.102-.008a2.56 2.56 0 0 0 1.58-.655l.078-.066c.506-.431.867-.74 1.261-.928m3.232 6.12a.75.75 0 1 0-1.45-.39l-2.143 8a.75.75 0 0 0 1.449.39zm1.641.974a.75.75 0 1 0-1.06 1.06l.131.132c.527.526.867.869 1.085 1.155c.205.268.23.396.23.484s-.025.216-.23.484c-.218.286-.558.629-1.085 1.155l-.131.131a.75.75 0 1 0 1.06 1.06l.167-.166c.482-.48.895-.894 1.181-1.27c.307-.402.537-.846.537-1.394s-.23-.992-.537-1.394c-.286-.376-.7-.79-1.18-1.27zm-5.816 0a.75.75 0 0 0-1.06 0l-.167.167c-.481.48-.895.894-1.181 1.27c-.307.402-.537.846-.537 1.394s.23.992.537 1.394c.286.376.7.79 1.18 1.27l.168.167a.75.75 0 0 0 1.06-1.06l-.131-.132c-.527-.526-.867-.869-1.085-1.155c-.205-.268-.23-.396-.23-.484s.025-.216.23-.484c.218-.286.558-.629 1.085-1.155l.131-.131a.75.75 0 0 0 0-1.061"></path>
                    </svg>

                    <span className="text-white">You can collab with new developers from all over the world</span>
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-5 w-full">
                    <div
                        onClick={() => Navigate("/app/connections")}
                        className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Connections
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                    </div>

                    <div
                        onClick={() => Navigate("/app/requestedUser")}
                        className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Requested Developers
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                    </div>

                    <div
                        onClick={() => Navigate("/app/requestreceived")}
                        className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Received Requests
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                    </div>
                </div>
            </div>



            {loading ?

                (
                    <div className="w-full mx-auto flex justify-center text-blue-500">
                        <motion.div
                            animate={{
                                rotate: 360,
                                borderRadius: ["0%", "10%", "100%", "10%", "0%"]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="w-12 sm:w-24 h-12 sm:h-24 border  border-[5px] sm:border-[10px] border-blue-500  rounded-xl"  >

                        </motion.div>

                    </div>
                ) : (
                    <div className="w-full mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
                            {feed.map((item, index) => (
                                <div
                                    key={item._id}
                                    className=" relative group bg-[#212121]  rounded-3xl overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">



                                    <div className="relative p-6 flex flex-col md:flex-row gap-6">
                                        {/* Left Profile Section */}
                                        <div className="flex flex-col items-center md:items-start space-y-4">
                                            {/* Avatar with tech ring */}
                                            <div className="relative">

                                                <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#111827] to-black border border-blue-500/20 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">

                                                    <div className="absolute inset-0 flex items-center justify-center">

                                                        <img
                                                            src={item.photoUrl.url}
                                                            className=" w-full h-full object-cover rounded-2xl 
"
                                                        />

                                                    </div>

                                                </div>



                                            </div>

                                            {/* Tech stats */}
                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className="text-center p-2 bg-white/10 rounded-lg border border-secondary border-[2px]">
                                                    <div className="text-xs text-white">Age</div>
                                                    <div className="text-lg font-bold text-white">{item.age}</div>
                                                </div>
                                                <div className="text-center p-2 bg-white/10 rounded-lg border border-secondary border-[2px]">
                                                    <div className="text-xs text-white">Gender</div>
                                                    <div className="text-lg font-bold text-white">{item.gender}</div>
                                                </div>

                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-secondary border-[2px]">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                                <span className="text-md text-white">{item.college}</span>
                                            </div>
                                        </div>

                                        {/* Right Content Section */}
                                        <div className="flex-1 space-y-4">
                                            {/* Header with tech indicators */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h1 className="text-2xl font-bold text-white">
                                                            {item.firstName} {item.middleName} {item.lastName}
                                                        </h1>
                                                        {item.isVerified && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#44f53d" fill-rule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clip-rule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <code className="text-white/50 text-sm font-mono">@{item.username}</code>
                                                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                        <span className="text-lg text-white/70">{item.profession}</span>
                                                    </div>
                                                </div>


                                            </div>

                                            {/* About section */}
                                            <div className=" rounded-xl  p-4 flex bg-white/10 border border-secondary border-[2px]">
                                                <div className="w-1.5 mr-2 bg-blue-600 rounded-full"></div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">

                                                        <h3 className="text-sm font-semibold text-white">About</h3>
                                                    </div>
                                                    <p className="text-white text-sm leading-relaxed">{item.about || "No description available"}</p>

                                                </div>
                                            </div>

                                            {/* Skills section with tech tags */}
                                            <div>
                                                <div className="flex items-center gap-1 mb-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 384 512">
                                                        <path fill="#fff" d="M290.7 311L95 269.7L86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8l153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24l119.3 160.3l32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                                                    </svg>
                                                    <h3 className="text-sm font-semibold text-white">TECH STACK</h3>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-white/50">
                                                    {item.skills?.map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-white/10 border border-secondary text-gray-300  relative overflow-hidden border border-[2px] border-secondary"
                                                        >
                                                            <div className="absolute inset-0 "></div>
                                                            <span className="relative text-white/50">{skill?.name || skill}</span>
                                                        </span>
                                                    )) || (
                                                            <span className="px-3 py-1.5 text-xs text-white/50 bg-gray-900/50 rounded-lg border border-gray-700/30">
                                                                No skills configured
                                                            </span>
                                                        )}
                                                </div>
                                            </div>

                                            {/* Action buttons with tech style */}
                                            <div className="flex justify-end w-full flex-wrap gap-3 pt-2 ">



                                                <button disabled={actionId === item._id}
                                                    className={`${actionId === item._id ? "opacity-70  cursor-not-allowed" : ""}  sm:w-fit px-4 relative group   bg-white/10   px-4 py-2.5 rounded-full font-medium  text-white hover:text-blue-500  transition-all duration-300  `}

                                                    onClick={() => sendRequest(item.username, item._id)}>
                                                    <span className="relative z-10 flex items-center justify-center gap-3 text-xl">

                                                        {actionId === item._id ? (<div className="w-full mx-auto flex justify-center text-blue-500">
                                                            <motion.div
                                                                animate={{
                                                                    rotate: 360,
                                                                    borderRadius: ["0%", "10%", "100%", "10%", "0%"]
                                                                }}
                                                                transition={{
                                                                    duration: 1,
                                                                    repeat: Infinity,
                                                                    ease: "linear"
                                                                }}
                                                                className="w-8 h-8 border  border-[3px]  border-blue-500  rounded-xl"  >

                                                            </motion.div>

                                                        </div>)

                                                            :
                                                            (<div className="flex  transistion-all duration-200 justify-center items-center gap-4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 32 32">
                                                                    <path fill="currentColor" d="M25 22.142V9c0-2.206-1.794-4-4-4h-4.172l2.586-2.586L18 1l-5 5l5 5l1.414-1.414L16.828 7H21c1.103 0 2 .898 2 2v13.142c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.858-1.28-3.41-3-3.858M24 28c-1.103 0-2-.897-2-2s.897-2 2-2s2 .898 2 2s-.897 2-2 2M4 6c0 1.858 1.28 3.41 3 3.858v12.284c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.28-3.41-3-3.858V9.858c1.72-.447 3-2 3-3.858c0-2.206-1.794-4-4-4S4 3.794 4 6m6 20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .898 2 2m0-20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .897 2 2"></path>
                                                                </svg>
                                                                <h1 >  Send Request</h1>
                                                            </div>)}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom tech border */}

                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {
                            !noMoreDev && < div className="flex justify-center mt-10">
                                <button
                                    onClick={() => setPage(prev => prev + 1)}
                                    className="relative group bg-white/10 text-white/50 px-8 py-3.5 rounded-xl font-medium hover:text-white transition-all duration-300 border border-secondary border-[2px] overflow-hidden"
                                >

                                    <span className="relative z-10 flex items-center text-white gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
                                            <g fill="none">
                                                <path fill="#fff" fillOpacity={0.25} d="M6 14h.675c.581 0 .872 0 1.104.134a1 1 0 0 1 .164.118c.2.178.292.453.476 1.005l.125.376c.22.66.33.99.592 1.178c.262.189.61.189 1.306.189h3.117c.695 0 1.043 0 1.305-.189s.372-.518.592-1.178l.125-.376c.184-.552.276-.827.476-1.005a1 1 0 0 1 .164-.118c.232-.134.523-.134 1.104-.134H18c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C21 12.398 21 11.932 21 11v6c0 1.886 0 2.828-.586 3.414S18.886 21 17 21H7c-1.886 0-2.828 0-3.414-.586S3 18.886 3 17v-6c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C4.602 14 5.068 14 6 14"></path>
                                                <path stroke="#fff" strokeWidth={1.2} d="M3 11c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C4.602 14 5.068 14 6 14h.675c.581 0 .872 0 1.104.134a1 1 0 0 1 .164.118c.2.178.292.453.476 1.005l.125.376c.22.66.33.99.592 1.178c.262.189.61.189 1.306.189h3.117c.695 0 1.043 0 1.305-.189s.372-.518.592-1.178l.125-.376c.184-.552.276-.827.476-1.005a1 1 0 0 1 .164-.118c.232-.134.523-.134 1.104-.134H18c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C21 12.398 21 11.932 21 11M8 9l4 3m0 0l4-3m-4 3V2"></path>
                                                <path stroke="#fff" strokeWidth={1.2} d="M16 5h1c1.886 0 2.828 0 3.414.586S21 7.114 21 9v8c0 1.886 0 2.828-.586 3.414S18.886 21 17 21H7c-1.886 0-2.828 0-3.414-.586S3 18.886 3 17V9c0-1.886 0-2.828.586-3.414S5.114 5 7 5h1"></path>
                                            </g>
                                        </svg>
                                        LOAD MORE PROFILES
                                    </span>
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-base-300 via-secondary to-base-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </button>
                            </div>
                        }
                    </div >)

            }

            {
                showRequestModal && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center">

                        {/* BACKDROP */}
                        <div className="absolute inset-0 bg-black/50" onClick={() => setShowRequestModal(false)}></div>

                        {/* MODAL */}
                        <div className="relative px-8 py-6 rounded-3xl 
    bg-base-200
    animate-[modalPop_0.25s_ease]">

                            <div className="flex items-center gap-4">

                                {/* ICON */}
                                <div className="w-[130px] h-[130px] flex items-center justify-center rounded-full bg-base-100 text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 40 40">
                                        <g fill="none" strokeMiterlimit={10}>
                                            <path fill="currentColor" stroke="#231f20" d="M37 4.24c-1.89-1.44-4.45-2.38-7 0c-1.52 1-5.67 5-10.22 11c-1.19 1.58-2.32 3.08-3.35 4.49c-3.74-2.84-6.69-4.85-7.91-5c-2.07-.8-4.31 1.45-5.75 3.34S-.32 22.63 1 24.4c.47 1.14 3.13 3.53 6.87 6.38c4.49 3.41 7.73 6 9.63 6.24c2.91 1.13 5-2.31 13.37-13.36c4.55-6 7.45-11 8-12.69c1.56-3.08-.03-5.29-1.87-6.73Z" strokeWidth={1}></path>
                                            <path stroke="#fff" strokeLinecap="round" d="M28.56 8.89c1.64-1.84 3.16-3.58 4.55-3.73" strokeWidth={1}></path>
                                        </g>
                                    </svg>
                                </div>

                                {/* TEXT */}
                                <div>
                                    <div className="text-4xl font-semibold text-white">
                                        Request Sent!
                                    </div>
                                    <div className="text-xl text-white/50">
                                        Your collaboration request has been delivered.
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
        </div >

    );
};

export default Explore;





