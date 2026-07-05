import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../Pages/auth/baseURL";
import { addConnectionUser, removeConnectionUser } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

import { FaPeopleCarry } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Connections = () => {
    const Navigate = useNavigate()
    const connectionsARR = useSelector(state => state.connections?.users || []);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [ontapDelete, setOntapDelete] = useState(false);
    const [idSelectedToDelte, setIdSelectedToDelte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const connectionUser = async () => {

        try {
            setLoading(true);
            const response = await axios.get(
                `${BASE_URL}/user/connections`,
                { withCredentials: true }
            );
            dispatch(addConnectionUser(response.data.data));


        } catch (err) {
            console.error(err?.message || err);
        } finally {
            setLoading(false);
        }
    };


    const deleteConnections = async (idtodelte) => {

        try {
            setDeleting(true);
            await axios.delete(
                `${BASE_URL}/user/connections/${idtodelte}`,
                { withCredentials: true }
            );
            dispatch(
                removeConnectionUser(
                    connectionsARR.filter(item => item.userId !== idtodelte)
                )
            );

            setShowRequestModal(true);
            setTimeout(() => setShowRequestModal(false), 2200);
        } catch (err) {
            console.log(err?.message || "not send");
        } finally {

            setDeleting(false);
        }

    }
    useEffect(() => {
        connectionUser();
    }, [dispatch]);
    return (
        <div className="w-full min-h-screen bg-base-100 p-4 md:p-8">
            <div className="w-full/2 mx-auto">

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
                        Connections
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

                        <span className="text-white">No Connections is better than Connections without Collaborations </span>
                    </p>



                    <div className="flex gap-3 mt-5">
                        <div onClick={() => Navigate("/app/discussions")} className="rounded-full border-white/15 hover:border-white/30 cursor-pointer border px-4 text-white hover:text-blue-500 transistion-all duration-300 flex items-center justify-center gap-2  py-3">Collabrate Now  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45">
                            <g fill="none">
                                <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path>
                            </g>
                        </svg></div>
                        <div onClick={() => Navigate("/app/requestedUser")} className="rounded-full border-white/15 hover:border-white/30 cursor-pointer border px-4 text-white hover:text-blue-500 transistion-all duration-300 flex items-center justify-center gap-2  py-3">Requested Developers <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45">
                            <g fill="none">
                                <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path>
                            </g>
                        </svg></div>
                        <div onClick={() => Navigate("/app/requestreceived")} className="rounded-full border-white/15 hover:border-white/30 cursor-pointer border px-4 text-white hover:text-blue-500 transistion-all duration-300 flex items-center justify-center gap-2  py-3">Recieved Requests <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45">
                            <g fill="none">
                                <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path>
                            </g>
                        </svg></div>
                    </div>
                </div>








                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                    {connectionsARR.map((item, index) => (
                        <div
                            key={item.connectionId}
                            className=" relative group bg-[#212121]   rounded-3xl border border-base-300 border-[3px] transition-all duration-500 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">



                            <div className="relative p-6 flex flex-col md:flex-row gap-6">
                                {/* Left Profile Section */}
                                <div className="flex flex-col items-center md:items-start space-y-4">
                                    {/* Avatar with tech ring */}
                                    <div className="relative">

                                        <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#111827] to-black border border-blue-500/20 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">

                                            <div className="absolute inset-0 flex items-center justify-center">

                                                <img
                                                    src={item.photoUrl}
                                                    className=" w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700
"
                                                />

                                            </div>

                                        </div>



                                    </div>

                                    {/* Tech stats */}
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <div className="text-center p-2 bg-white/10 rounded-lg border border-secondary border-[3px]">
                                            <div className="text-xs text-white">Age</div>
                                            <div className="text-lg font-bold text-white/50">{item.age}</div>
                                        </div>
                                        <div className="text-center p-2 bg-white/10 rounded-lg border border-secondary border-[3px]">
                                            <div className="text-xs text-white">Gender</div>
                                            <div className="text-lg font-bold text-white/50">{item.gender}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-secondary border-[3px]">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-md text-white/50">{item.college}</span>
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
                                                <span className="text-lg text-gray-500">{item.profession}</span>
                                            </div>
                                        </div>

                                        {/* Connection status */}

                                    </div>

                                    {/* About section */}
                                    <div className=" rounded-xl p-4  bg-white/10 border border-secondary border-[3px] ">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-secondary rounded-full"></div>
                                            <h3 className="text-sm font-semibold text-white">ABOUT</h3>
                                        </div>
                                        <p className="text-white/50 text-sm leading-relaxed">{item.about || "No description available"}</p>
                                    </div>

                                    {/* Skills section with tech tags */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 384 512">
                                                <path fill="#5a2c01ff" d="M290.7 311L95 269.7L86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8l153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24l119.3 160.3l32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                                            </svg>
                                            <h3 className="text-sm font-semibold text-white">TECH STACK</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-white/50">
                                            {item.skills?.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-white/10 border border-white/10 text-gray-300  border border-secondary border-[2px] transition-all duration-300 group relative overflow-hidden "
                                                >
                                                    <div className="absolute inset-0 bg-accent/10 "></div>
                                                    <span className="relative text-white/50">{skill}</span>
                                                </span>
                                            )) || (
                                                    <span className="px-3 py-1.5 text-xs text-gray-500 bg-gray-900/50 rounded-lg border border-gray-700/30">
                                                        No skills configured
                                                    </span>
                                                )}
                                        </div>
                                    </div>

                                    {/* Action buttons with tech style */}
                                    <div className="flex gap-3 w-full pt-2">

                                        <button className="relative group  flex justify-center w-full bg-white/10  text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-base-200 transition-all duration-300 active:scale-95 border border-secondary border-[2px] overflow-hidden">
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-xl text-white/50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24">
                                                    <g fill="none">
                                                        <rect width={16} height={12} x={4} y={6} stroke="#bf630b" rx={2} strokeWidth={1}></rect>
                                                        <path fill="#bf630b" d="M11.106 12.553L4 9v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7.106 3.553a2 2 0 0 1-1.788 0"></path>
                                                    </g>
                                                </svg>
                                                Message
                                            </span>
                                        </button>

                                        <button className="relative group flex justify-center bg-white/10  text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-base-200 transition-all duration-300 active:scale-95 border border-secondary border-[2px] overflow-hidden" onClick={() => { setOntapDelete(true); setIdSelectedToDelte(item.connectionId) }}>
                                            <span className="relative z-10 flex items-center text-xl justify-center gap-2 text-white/50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24">
                                                    <path fill="#bf630b" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
                                                </svg>

                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom tech border */}
                            <div className="h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                        </div>
                    ))}



                    {loading && (
                        <div className="flex items-center justify-center py-12 w-screen">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                        </div>
                    )}
                </div>



            </div>
            {showRequestModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center">

                    {/* BACKDROP */}
                    <div className="absolute inset-0 bg-black/50 "></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl border bg-base-100 border-secondary border-[2px] animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">

                            {/* ICON */}
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-secondary border-[2px]">
                                <svg width="26" height="26" viewBox="0 0 24 24">
                                    <path
                                        fill="#bf630b"
                                        d="M9 16.2l-3.5-3.5L4 14.2l5 5l11-11l-1.5-1.5z"
                                    />
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-lg font-semibold text-white/50">
                                    Connection Deleted
                                </div>
                                <div className="text-sm text-gray-800">
                                    Connection has been deleted.
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {ontapDelete && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center">

                    {/* BACKDROP */}
                    <div className="absolute inset-0 bg-black/50 "></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl border border-secondary border-[2px] bg-base-100 

    animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">



                            {/* TEXT */}
                            <div>
                                <div className="text-2xl font-semibold text-white/50">
                                    Do you want to delete this connection?
                                </div>
                                <div className="text-xl text-gray-700">
                                    It will lead to lose all the messages and contacts between you and the user.
                                </div>
                                <button disabled={deleting} className="relative group flex w-full mt-5 justify-center bg-white/10  text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-base-200 transition-all duration-300 active:scale-95 border border-secondary border-[2px] overflow-hidden" onClick={() => { deleteConnections(idSelectedToDelte); setOntapDelete(false); setIdSelectedToDelte(null); }}>
                                    <span className="relative z-10 flex items-center text-xl justify-center gap-2 text-white/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24">
                                            <path fill="#bf630b" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
                                        </svg>
                                        {deleting ? "Deleting..." : "Delete Connection"}
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {!loading && connectionsARR.length == 0 && (
                <div className="  inset-0 flex items-center justify-center px-4">

                    <div className="relative w-full max-w-3xl p-10 rounded-3xl 
              bg-base-100 border border-secondary border-[2px]
            
                animate-[modalPop_0.3s_ease]">

                        <div className="flex flex-col md:flex-row items-center gap-8">

                            {/* ICON */}
                            <div className="w-36 h-36 flex items-center justify-center 
                        rounded-full bg-white/10
                        border border-secondary border-[2px]
                    ">
                                <FaPeopleCarry className="text-white/50" size={60} />
                            </div>

                            {/* TEXT SECTION */}
                            <div className="text-center md:text-left">
                                <h2 className="text-4xl font-bold text-white/50 mb-4">
                                    No Connections Found
                                </h2>

                                <p className="text-lg text-gray-800 mb-6 max-w-md">
                                    Discover and connect with developers from around the world.
                                    Start exploring new profiles today.
                                </p>

                                {/* BUTTON */}

                                <button
                                    onClick={() => navigate("/app/explore")}
                                    className="px-6 py-3 rounded-xl 
                                bg-white/10 border border-secondary border-[2px]
                                hover:scale-105 
                                transition-all duration-300
                                text-white/50 font-semibold flex gap-3 items-center justify-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512">
                                        <path fill="#a9580cff" fillRule="evenodd" d="m380.656 106.622l-35.01 23.344l37.117 92.733l42.309-12.418zm-71.28 47.49L97.67 295.272l4.928 9.857l239.035-70.334zm90.3-111.445l83.57 194.995l-157.166 46.221l63.256 168.168l-39.95 14.982l-64.351-171.075l-28.928 8.49l-59.662 162.6l-39.217-16.808l47.999-130.816l-124.824 36.721l-37.736-75.472z"></path>
                                    </svg>   Explore Developers
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Connections