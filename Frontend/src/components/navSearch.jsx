import React, { useState, useEffect, } from 'react'
import { BASE_URL } from "../Pages/auth/baseURL";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionUser } from "../utils/connectionSlice";



const Search = ({ height, displayType }) => {
    const [username, setUserName] = useState("");
    const [data, setData] = useState(null)
    const [showcard, setShowCard] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [newError, setNewError] = useState("");
    const [actionId, setActionId] = useState(null);
    const connectionsARR = useSelector(state => state.connections?.users || []);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const dispatch = useDispatch();
    const connectionUser = async () => {

        try {

            const response = await axios.get(
                `${BASE_URL}/user/connections`,
                { withCredentials: true }
            );
            dispatch(addConnectionUser(response.data.data));


        } catch (err) {
            console.error(err?.message || err);
        }
    };
    useEffect(() => {
        connectionUser();
    }, [dispatch]);

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
            if (err.response.data.message === "Connection already requested state") {
                setShowRequestModal(true);
            }
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
                        } group bg-base-300  rounded-3xl border border-secondary border-[2px]`}
                >
                    <div className="relative p-6 flex flex-col md:flex-row gap-6">

                        {/* LEFT PROFILE */}
                        <div className="flex flex-col items-center md:items-start space-y-4 ">
                            <div className="relative w-28 h-28 rounded-2xl overflow-hidden  border border-secondary border-[3px]">
                                <img
                                    src={data?.photoUrl?.url}
                                    className="  w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
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
                                        className="w-10 h-10 flex items-center justify-center border border-secondary rounded-full transition-colors duration-200 hover:bg-white/10"
                                        onClick={() => { setShowCard(false); setShowRequestModal(false) }}
                                        aria-label="Close profile menu"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 16 16">
                                            <path
                                                fill="#5a2c01ff"
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

                            <div className="flex items-center gap-1 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 384 512">
                                    <path fill="#5a2c01ff" d="M290.7 311L95 269.7L86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8l153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24l119.3 160.3l32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
                                </svg>
                                <h3 className="text-sm font-semibold text-secondary">TECH STACK</h3>
                            </div>
                            {/* SKILLS */}
                            <div className="flex flex-wrap gap-2 text-accent">
                                {data?.skills?.length ? (
                                    data.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-accent border border-white/10 text-gray-300  border border-secondary border-[2px] transition-all duration-300 group relative overflow-hidden "
                                        >
                                            <div className="absolute inset-0 bg-accent/10 "></div>
                                            <span className="relative text-accent-content">{skill}</span>
                                        </span>
                                    ))
                                ) : (
                                    <span className="px-3 py-1.5 text-xs text-gray-500 bg-gray-900/50 rounded-lg border border-gray-700/30">
                                        No skills configured
                                    </span>
                                )}
                            </div>

                            {/* BUTTONS */}
                            <div className="flex flex-col gap-3 pt-2 w-full">
                                <button className="relative group  flex justify-center bg-base-300  text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-base-200 transition-all duration-300 active:scale-95 border border-secondary border-[2px] overflow-hidden">
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

                                {data?._id && !connectionsARR.some(item => item.userId === data._id) && (
                                    <button disabled={actionId === data?._id}
                                        className={`${actionId === data?._id ? "opacity-70 cursor-not-allowed" : ""} relative hover:bg-base-200 group flex-1 min-w-[140px] bg-base-300 border border-[2px] border-secondary text-white px-4 py-2.5  rounded-xl font-medium  transition-all duration-300 active:scale-95 overflow-hidden`} onClick={() => sendRequest(data?.username, data?._id)}>
                                        <span className="relative z-10 flex items-center justify-center gap-2 text-xl">

                                            {actionId === data?._id && (<svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24">
                                                <path fill="#914a08ff" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.3}></path>
                                                <path fill="#914a08ff" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                                    <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                                </path>
                                            </svg>)}


                                            <div className="flex justify-center items-center gap-4">

                                                {!showRequestModal && (
                                                    <span className="flex justify-center items-center gap-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 32 32">
                                                            <path fill="#914a08ff" d="M25 22.142V9c0-2.206-1.794-4-4-4h-4.172l2.586-2.586L18 1l-5 5l5 5l1.414-1.414L16.828 7H21c1.103 0 2 .898 2 2v13.142c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.858-1.28-3.41-3-3.858M24 28c-1.103 0-2-.897-2-2s.897-2 2-2s2 .898 2 2s-.897 2-2 2M4 6c0 1.858 1.28 3.41 3 3.858v12.284c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.28-3.41-3-3.858V9.858c1.72-.447 3-2 3-3.858c0-2.206-1.794-4-4-4S4 3.794 4 6m6 20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .898 2 2m0-20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .897 2 2"></path>
                                                        </svg>
                                                        <h1 className="text-accent">Request</h1>
                                                    </span>)}

                                                {showRequestModal && (
                                                    <span className="flex justify-center items-center gap-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 40 40">
                                                            <g fill="none" strokeMiterlimit={10}>
                                                                <path fill="#914a08ff" stroke="#231f20" d="M37 4.24c-1.89-1.44-4.45-2.38-7 0c-1.52 1-5.67 5-10.22 11c-1.19 1.58-2.32 3.08-3.35 4.49c-3.74-2.84-6.69-4.85-7.91-5c-2.07-.8-4.31 1.45-5.75 3.34S-.32 22.63 1 24.4c.47 1.14 3.13 3.53 6.87 6.38c4.49 3.41 7.73 6 9.63 6.24c2.91 1.13 5-2.31 13.37-13.36c4.55-6 7.45-11 8-12.69c1.56-3.08-.03-5.29-1.87-6.73Z" strokeWidth={1}></path>
                                                                <path stroke="#fff" strokeLinecap="round" d="M28.56 8.89c1.64-1.84 3.16-3.58 4.55-3.73" strokeWidth={1}></path>
                                                            </g>
                                                        </svg>
                                                        <h1 className="text-accent">Sent</h1>
                                                    </span>)}
                                            </div>


                                        </span>
                                    </button>

                                )}
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