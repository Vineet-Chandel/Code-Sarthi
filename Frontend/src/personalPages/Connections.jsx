import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../Pages/auth/baseURL";
import { addConnectionUser, removeConnectionUser } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

import { FaPeopleCarry } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Connections = () => {

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
        <div className="w-full min-h-screen bg-base-200 p-4 md:p-8">
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
         bg-gradient-to-b 
        from-[#ff8904] 
        to-accent 
        bg-clip-text 
        text-transparent
        leading-tight
    ">
                        Connections
                    </h1>


                </div>








                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                    {connectionsARR.map((item, index) => (
                        <div
                            key={item.connectionId}
                            className=" relative group bg-base-100   rounded-3xl border border-base-300 border-[3px] transition-all duration-500 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">



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
                                        <div className="text-center p-2 bg-base-300 rounded-lg border border-secondary border-[3px]">
                                            <div className="text-xs text-secondary">Age</div>
                                            <div className="text-lg font-bold text-accent">{item.age}</div>
                                        </div>
                                        <div className="text-center p-2 bg-base-300 rounded-lg border border-secondary border-[3px]">
                                            <div className="text-xs text-secondary">Gender</div>
                                            <div className="text-lg font-bold text-accent">{item.gender}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-base-300 rounded-full border border-secondary border-[3px]">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-md text-accent">{item.college}</span>
                                    </div>
                                </div>

                                {/* Right Content Section */}
                                <div className="flex-1 space-y-4">
                                    {/* Header with tech indicators */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                                                    {item.FirstName} {item.MiddleName} {item.LastName}
                                                </h1>
                                                {item.isVerified && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#44f53d" fill-rule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clip-rule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="text-accent text-sm font-mono">@{item.username}</code>
                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                <span className="text-lg text-gray-500">{item.profession}</span>
                                            </div>
                                        </div>

                                        {/* Connection status */}

                                    </div>

                                    {/* About section */}
                                    <div className=" rounded-xl p-4  bg-base-300 border border-secondary border-[3px] ">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-secondary rounded-full"></div>
                                            <h3 className="text-sm font-semibold text-secondary">ABOUT</h3>
                                        </div>
                                        <p className="text-accent text-sm leading-relaxed">{item.about || "No description available"}</p>
                                    </div>

                                    {/* Skills section with tech tags */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 384 512">
                                                <path fill="#5a2c01ff" d="M290.7 311L95 269.7L86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8l153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24l119.3 160.3l32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                                            </svg>
                                            <h3 className="text-sm font-semibold text-secondary">TECH STACK</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-accent">
                                            {item.skills?.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-base-300 border border-white/10 text-gray-300  border border-secondary border-[2px] transition-all duration-300 group relative overflow-hidden "
                                                >
                                                    <div className="absolute inset-0 bg-accent/10 "></div>
                                                    <span className="relative text-accent">{skill}</span>
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

                                        <button className="relative group  flex justify-center w-full bg-base-300  text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-base-200 transition-all duration-300 active:scale-95 border border-secondary border-[2px] overflow-hidden">
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-xl text-accent">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24">
                                                    <g fill="none">
                                                        <rect width={16} height={12} x={4} y={6} stroke="#bf630b" rx={2} strokeWidth={1}></rect>
                                                        <path fill="#bf630b" d="M11.106 12.553L4 9v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7.106 3.553a2 2 0 0 1-1.788 0"></path>
                                                    </g>
                                                </svg>
                                                Message
                                            </span>
                                        </button>

                                        <button className="relative group flex justify-center bg-base-300  text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-base-200 transition-all duration-300 active:scale-95 border border-secondary border-[2px] overflow-hidden" onClick={() => { setOntapDelete(true); setIdSelectedToDelte(item.connectionId) }}>
                                            <span className="relative z-10 flex items-center text-xl justify-center gap-2 text-accent">
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
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-base-300 border border-secondary border-[2px]">
                                <svg width="26" height="26" viewBox="0 0 24 24">
                                    <path
                                        fill="#bf630b"
                                        d="M9 16.2l-3.5-3.5L4 14.2l5 5l11-11l-1.5-1.5z"
                                    />
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-lg font-semibold text-accent">
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
                                <div className="text-2xl font-semibold text-accent">
                                    Do you want to delete this connection?
                                </div>
                                <div className="text-xl text-gray-700">
                                    It will lead to lose all the messages and contacts between you and the user.
                                </div>
                                <button disabled={deleting} className="relative group flex w-full mt-5 justify-center bg-base-300  text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-base-200 transition-all duration-300 active:scale-95 border border-secondary border-[2px] overflow-hidden" onClick={() => { deleteConnections(idSelectedToDelte); setOntapDelete(false); setIdSelectedToDelte(null); }}>
                                    <span className="relative z-10 flex items-center text-xl justify-center gap-2 text-accent">
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
                        rounded-full bg-base-300
                        border border-secondary border-[2px]
                    ">
                                <FaPeopleCarry className="text-accent" size={60} />
                            </div>

                            {/* TEXT SECTION */}
                            <div className="text-center md:text-left">
                                <h2 className="text-4xl font-bold text-accent mb-4">
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
                                bg-base-300 border border-secondary border-[2px]
                                hover:scale-105 
                                transition-all duration-300
                                text-accent font-semibold flex gap-3 items-center justify-center"
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