import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../Pages/auth/baseURL"
import { addReceviedConnectionUser } from "../utils/receivedConnection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Users } from "lucide-react";
import { motion } from 'framer-motion';

const ReceivedRequests = () => {
    const Navigate = useNavigate();

    const user = useSelector(store => store.user.user.DATA);
    const receivedConnections = useSelector(store => store.receivedConnection.users || []);
    const receivedConnectionsTotal = useSelector(store => store.receivedConnection.total || []);

    const dispatch = useDispatch();
    const [showRequestModal1, setShowRequestModal1] = useState(false);
    const [showRequestModal2, setShowRequestModal2] = useState(false);
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
            if (status === "ACCEPTED") {
                setShowRequestModal1(true);
                setTimeout(() => setShowRequestModal1(false), 2000);
            }
            if (status === "REJECTED") {
                setShowRequestModal2(true);
                setTimeout(() => setShowRequestModal2(false), 2000);
            }

        } catch (err) {
            console.error(err?.message || err);
        } finally {
            setActionId(null);
        }
    };
    return (
        <div className="
w-full min-h-screen
bg-base-100
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
text-white
    ">
                    Received  Requests
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

                    <span className="text-white">All Developers who requested you for collabration  </span>
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
                        onClick={() => Navigate("/app/explore")}
                        className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Explore
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                    </div>
                </div>
            </div>






            <div className="max-w-9xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
                    {receivedConnections.map((item, index) => (
                        <div
                            key={item.connectionId}
                            className=" relative group  rounded-3xl  bg-[#212121]">



                            <div className="relative p-6 flex flex-col md:flex-row gap-6">
                                {/* Left Profile Section */}
                                <div className="flex flex-col items-center md:items-start space-y-4">
                                    {/* Avatar with tech ring */}
                                    <div className="relative">

                                        <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#111827] to-black border border-blue-500/20 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">

                                            <div className="absolute inset-0 flex items-center justify-center">

                                                <img
                                                    src={item?.photoUrl?.url}
                                                    className=" w-full h-full object-cover rounded-2xl 
"
                                                />

                                            </div>

                                        </div>



                                    </div>

                                    {/* Tech stats */}
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <div className="text-center p-2 bg-white/10 rounded-lg border border-[2px] border-secondary">
                                            <div className="text-xs text-white">Age</div>
                                            <div className="text-lg font-bold text-white">{item.age}</div>
                                        </div>
                                        <div className="text-center p-2 bg-white/10 rounded-lg border border-[2px] border-secondary">
                                            <div className="text-xs text-white">Gender</div>
                                            <div className="text-lg font-bold text-white">{item.gender}</div>
                                        </div>
                                    </div>
                                    {/* Connection status */}
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-[2px] border-secondary">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
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
                                    {actionId ? (

                                        <div className="w-full mx-auto flex justify-center text-red-500">
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

                                        </div>
                                    ) : (<div className="flex flex-wrap gap-3 pt-2">

                                        <button className="relative group flex-1 min-w-[140px] bg-white/10 text-white/50 px-4 py-2.5 rounded-full  ">
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-xl text-white hover:text-red-500 transition-all duration-300" onClick={() => handelRequest("REJECTED", item.connectionId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 40 40">
                                                    <g fill="none" strokeMiterlimit={10}>
                                                        <path fill="currentColor" stroke="#231f20" d="M.5 20a19.5 19.5 0 1 0 39 0a19.5 19.5 0 0 0-39 0Z" strokeWidth={1}></path>
                                                        <path fill="#000" stroke="#231f20" d="M30.08 25.41c-.16-.77-2.31-3.15-4.48-5.41c2.17-2.26 4.32-4.64 4.48-5.41c.46-.89-.63-2.11-1.59-3.08s-2.19-2-3.08-1.59c-.77.16-3.15 2.31-5.41 4.48c-2.26-2.17-4.64-4.32-5.41-4.48c-.89-.46-2.11.63-3.07 1.59s-2.06 2.19-1.6 3.08c.16.77 2.31 3.15 4.48 5.41c-2.17 2.26-4.32 4.64-4.48 5.41c-.46.89.63 2.11 1.59 3.08s2.19 2.05 3.08 1.59c.77-.16 3.15-2.31 5.41-4.48c2.26 2.17 4.64 4.32 5.41 4.48c.89.46 2.11-.63 3.08-1.59s2.05-2.19 1.59-3.08Z" strokeWidth={1}></path>
                                                        <path stroke="#fff" strokeLinecap="round" d="M27.56 5a15.4 15.4 0 0 1 5.26 3.73" strokeWidth={1}></path>
                                                    </g>
                                                </svg>
                                                REJECT
                                            </span>
                                        </button>

                                        <button className="relative group flex-1 min-w-[140px] bg-white/10 text-white/50 px-4 py-2.5 rounded-full   " >

                                            <span className="relative z-10 flex items-center justify-center gap-2 text-xl text-white hover:text-blue-500 transition-all duration-300" onClick={() => handelRequest("ACCEPTED", item.connectionId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 40 40">
                                                    <g fill="none" strokeMiterlimit={10}>
                                                        <path fill="currentColor" stroke="#231f20" d="M37 4.24c-1.89-1.44-4.45-2.38-7 0c-1.52 1-5.67 5-10.22 11c-1.19 1.58-2.32 3.08-3.35 4.49c-3.74-2.84-6.69-4.85-7.91-5c-2.07-.8-4.31 1.45-5.75 3.34S-.32 22.63 1 24.4c.47 1.14 3.13 3.53 6.87 6.38c4.49 3.41 7.73 6 9.63 6.24c2.91 1.13 5-2.31 13.37-13.36c4.55-6 7.45-11 8-12.69c1.56-3.08-.03-5.29-1.87-6.73Z" strokeWidth={1}></path>
                                                        <path stroke="#fff" strokeLinecap="round" d="M28.56 8.89c1.64-1.84 3.16-3.58 4.55-3.73" strokeWidth={1}></path>
                                                    </g>
                                                </svg>
                                                ACCEPT
                                            </span>

                                        </button>
                                    </div>)}
                                </div>
                            </div>


                        </div>
                    ))}
                </div>

                {/* showRequestModal */}
            </div>
            {showRequestModal1 && (

                <div className="fixed inset-0 z-[999] flex items-center justify-center">

                    {/* BACKDROP */}
                    <div className="absolute inset-0 bg-black/50 " onClick={() => setShowRequestModal1(false)}></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl border border-secondary bg-base-100 border-[3px]
    animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">

                            {/* ICON */}
                            <div className="w-[150px] h-[150px] flex items-center justify-center rounded-full bg-white/10 border border-secondary border-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 40 40">
                                    <g fill="none">
                                        <path fill="#ffe236" stroke="#231f20" strokeMiterlimit={10} d="M.5 20.06a12.23 12.23 0 1 0 24.46 0a12.23 12.23 0 0 0-24.46 0Z" strokeWidth={1}></path>
                                        <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M11 30.42c-1.82-1.77-2.7-5.49-2.7-10.36s.88-8.58 2.7-10.35m3.51 0c1.77 1.77 2.66 5.49 2.66 10.35s-.89 8.59-2.66 10.36" strokeWidth={1}></path>
                                        <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M3.12 16.29a66 66 0 0 1 9.61-.59c3.213-.038 6.425.16 9.61.59m0 7.55c-3.185.43-6.397.628-9.61.59a66 66 0 0 1-9.61-.59" strokeWidth={1}></path>
                                        <path stroke="#fff" strokeLinecap="round" strokeMiterlimit={10} d="M21.47 13.59a8.46 8.46 0 0 0-3.27-3.14" strokeWidth={1}></path>
                                        <path fill="#48eaff" stroke="#231f20" strokeMiterlimit={10} d="M37 30.93c2.56-4.73 3.58-13.36 1-14c-7.09-1.81-14.26.75-16.82 5.49c-2.06 3.82-1.86 7.53 1.05 10.31a16 16 0 0 0-.84 1.44a5.94 5.94 0 0 0-.88 2.62c0 .56 1.07 1.23 1.92 1.56s2.07.52 2.47.12a5.86 5.86 0 0 0 1.1-2.55l.17-.72c4.67 1.87 8.49.06 10.83-4.27Z" strokeWidth={1}></path>
                                        <path fill="#48eaff" d="M30.36 23a12.25 12.25 0 0 0-5.09 6.72Z"></path>
                                        <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M30.36 23a12.25 12.25 0 0 0-5.09 6.72" strokeWidth={1}></path>
                                        <path stroke="#fff" strokeLinecap="round" strokeMiterlimit={10} d="M31.55 18.35a10.8 10.8 0 0 1 4.5 0" strokeWidth={1}></path>
                                        <path fill="#ff52a1" stroke="#231f20" strokeMiterlimit={10} d="M21.823 6.464c.167.038.349.01.533-.083c.184-.092.368-.248.541-.458s.332-.47.467-.765s.244-.62.32-.955c.078-.336.12-.675.128-1a3.5 3.5 0 0 0-.087-.892c-.064-.264-.162-.484-.287-.648s-.277-.268-.445-.307a.8.8 0 0 0-.533.083a1.7 1.7 0 0 0-.541.458c-.173.21-.331.47-.467.765s-.244.62-.32.955c-.078.336-.12.675-.128 1c-.006.324.023.628.087.892s.162.485.288.648s.276.268.444.307Zm3.567 2.5c.263.228.695.238 1.203.028c.507-.21 1.048-.623 1.504-1.148s.788-1.118.924-1.65c.137-.533.066-.96-.197-1.187c-.262-.228-.695-.238-1.202-.028c-.508.21-1.049.623-1.504 1.148s-.788 1.119-.924 1.65c-.137.533-.066.96.196 1.187Zm1.746 3.619a.8.8 0 0 0 .307.444c.164.125.384.222.649.286s.567.093.892.086a5 5 0 0 0 1-.129c.334-.077.659-.187.954-.323c.295-.135.554-.294.764-.467s.365-.358.458-.542a.8.8 0 0 0 .081-.534a.78.78 0 0 0-.307-.443c-.164-.126-.384-.223-.649-.287s-.567-.092-.892-.085a5 5 0 0 0-1 .128a5 5 0 0 0-.954.323a3.5 3.5 0 0 0-.764.468c-.21.173-.365.357-.458.542a.8.8 0 0 0-.081.533Z" strokeWidth={1}></path>
                                    </g>
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-4xl font-semibold text-white">
                                    Connection Request Accepted!
                                </div>
                                <div className="text-xl text-gray-800">
                                    You can acess the details from the connections option in the right hand sidebar
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
            }


            {showRequestModal2 && (

                <div className="fixed inset-0 z-[999] flex items-center justify-center">

                    {/* BACKDROP */}
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowRequestModal2(false)}></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl  bg-[#212121]
    animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">

                            {/* ICON */}
                            <div className="w-[150px] h-[150px] flex items-center justify-center rounded-full bg-black border border-secondary border-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 40 40">
                                    <g fill="none">
                                        <path fill="#ffe236" stroke="#231f20" strokeMiterlimit={10} d="M.5 20.06a12.23 12.23 0 1 0 24.46 0a12.23 12.23 0 0 0-24.46 0Z" strokeWidth={1}></path>
                                        <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M11 30.42c-1.82-1.77-2.7-5.49-2.7-10.36s.88-8.58 2.7-10.35m3.51 0c1.77 1.77 2.66 5.49 2.66 10.35s-.89 8.59-2.66 10.36" strokeWidth={1}></path>
                                        <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M3.12 16.29a66 66 0 0 1 9.61-.59c3.213-.038 6.425.16 9.61.59m0 7.55c-3.185.43-6.397.628-9.61.59a66 66 0 0 1-9.61-.59" strokeWidth={1}></path>
                                        <path stroke="#fff" strokeLinecap="round" strokeMiterlimit={10} d="M21.47 13.59a8.46 8.46 0 0 0-3.27-3.14" strokeWidth={1}></path>
                                        <path fill="#48eaff" stroke="#231f20" strokeMiterlimit={10} d="M37 30.93c2.56-4.73 3.58-13.36 1-14c-7.09-1.81-14.26.75-16.82 5.49c-2.06 3.82-1.86 7.53 1.05 10.31a16 16 0 0 0-.84 1.44a5.94 5.94 0 0 0-.88 2.62c0 .56 1.07 1.23 1.92 1.56s2.07.52 2.47.12a5.86 5.86 0 0 0 1.1-2.55l.17-.72c4.67 1.87 8.49.06 10.83-4.27Z" strokeWidth={1}></path>
                                        <path fill="#48eaff" d="M30.36 23a12.25 12.25 0 0 0-5.09 6.72Z"></path>
                                        <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M30.36 23a12.25 12.25 0 0 0-5.09 6.72" strokeWidth={1}></path>
                                        <path stroke="#fff" strokeLinecap="round" strokeMiterlimit={10} d="M31.55 18.35a10.8 10.8 0 0 1 4.5 0" strokeWidth={1}></path>
                                        <path fill="#ff52a1" stroke="#231f20" strokeMiterlimit={10} d="M21.823 6.464c.167.038.349.01.533-.083c.184-.092.368-.248.541-.458s.332-.47.467-.765s.244-.62.32-.955c.078-.336.12-.675.128-1a3.5 3.5 0 0 0-.087-.892c-.064-.264-.162-.484-.287-.648s-.277-.268-.445-.307a.8.8 0 0 0-.533.083a1.7 1.7 0 0 0-.541.458c-.173.21-.331.47-.467.765s-.244.62-.32.955c-.078.336-.12.675-.128 1c-.006.324.023.628.087.892s.162.485.288.648s.276.268.444.307Zm3.567 2.5c.263.228.695.238 1.203.028c.507-.21 1.048-.623 1.504-1.148s.788-1.118.924-1.65c.137-.533.066-.96-.197-1.187c-.262-.228-.695-.238-1.202-.028c-.508.21-1.049.623-1.504 1.148s-.788 1.119-.924 1.65c-.137.533-.066.96.196 1.187Zm1.746 3.619a.8.8 0 0 0 .307.444c.164.125.384.222.649.286s.567.093.892.086a5 5 0 0 0 1-.129c.334-.077.659-.187.954-.323c.295-.135.554-.294.764-.467s.365-.358.458-.542a.8.8 0 0 0 .081-.534a.78.78 0 0 0-.307-.443c-.164-.126-.384-.223-.649-.287s-.567-.092-.892-.085a5 5 0 0 0-1 .128a5 5 0 0 0-.954.323a3.5 3.5 0 0 0-.764.468c-.21.173-.365.357-.458.542a.8.8 0 0 0-.081.533Z" strokeWidth={1}></path>
                                    </g>
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-4xl font-semibold text-white">
                                    Connection Request Rejected!
                                </div>
                                <div className="text-xl text-white/50">
                                    Connection request has been deleted successfully !
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
            }

            {(receivedConnectionsTotal === 0 || receivedConnections.length === 0) && (
                <div className="  inset-0 flex items-center justify-center px-4 ">

                    <div className="relative w-full max-w-3xl p-10 rounded-3xl 
bg-[#212121]
            
                animate-[modalPop_0.3s_ease]">

                        <div className="flex flex-col md:flex-row items-center gap-8">

                            {/* ICON */}
                            <div className="w-36 h-36 flex items-center justify-center 
                        rounded-full  bg-black
                        border border-secondary border-[2px]
                    ">
                                <Users className="text-blue-500" size={60} />
                            </div>

                            {/* TEXT SECTION */}
                            <div className="text-center w-fit md:text-left">
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    No Requests Found
                                </h2>

                                <p className="text-lg text-white/50 mb-6 max-w-md">
                                    Discover and connect with developers from around the world.
                                    Start exploring new profiles today.
                                </p>

                                {/* BUTTON */}

                                <button
                                    onClick={() => Navigate("/app/explore")}
                                    className=" px-6 py-3 rounded-full bg-white/5 border border-secondary border-[2px]
                                 text-white hover:text-blue-500 transition-all duration-300 font-semibold flex gap-2 items-center justify-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512">
                                        <path fill="currentColor" fillRule="evenodd" d="m380.656 106.622l-35.01 23.344l37.117 92.733l42.309-12.418zm-71.28 47.49L97.67 295.272l4.928 9.857l239.035-70.334zm90.3-111.445l83.57 194.995l-157.166 46.221l63.256 168.168l-39.95 14.982l-64.351-171.075l-28.928 8.49l-59.662 162.6l-39.217-16.808l47.999-130.816l-124.824 36.721l-37.736-75.472z"></path>
                                    </svg>   Explore Developers  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45">
                                        <g fill="none">
                                            <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path>
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div >

    );
}

export default ReceivedRequests