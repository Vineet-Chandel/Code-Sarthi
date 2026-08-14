import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../Pages/auth/baseURL";

import ShortPreview from "../Pages/INTERVIEW-ARENA/MediumPreview";

import { addUser } from "../utils/userSlice";
import { addConnectionUser } from "../utils/connectionSlice";
import { addRequestedUser } from "../utils/requestedUserSlice";
import { addReceviedConnectionUser } from "../utils/receivedConnection";

const ProfileOther = () => {
    const { username } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedInUser = useSelector(state => state?.user?.user?.DATA);
    const requestedUsers = useSelector(state => state?.requestedUser?.users || []);
    const connectionsList = useSelector(state => state?.connections?.users || []);
    const receivedRequestsList = useSelector(state => state?.receivedConnection?.users || []);

    const [openCarrerProfile, setOpenCarrerProfile] = useState(false);
    const [copied1, setCopied1] = useState(false);
    const [copied2, setCopied2] = useState(false);
    const [user, setUser] = useState(null);
    const [requestStatus, setRequestStatus] = useState(""); 
    const [requestLoading, setRequestLoading] = useState(false);

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const fetchConnectionStatus = async () => {
        try {
            const [connRes, sentRes, recvRes] = await Promise.all([
                axios.get(`${BASE_URL}/user/connections`, { withCredentials: true }),
                axios.get(`${BASE_URL}/user/requests/send`, { withCredentials: true }),
                axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true })
            ]);

            if (connRes.data?.data) {
                dispatch(addConnectionUser(connRes.data.data));
            }
            if (sentRes.data?.data) {
                dispatch(addRequestedUser(sentRes.data.data));
            }
            if (recvRes.data?.data) {
                const formattedRecv = recvRes.data.data.map(req => ({
                    connectionId: req._id,
                    ...req.requesterId
                }));
                dispatch(addReceviedConnectionUser(formattedRecv));
            }
        } catch (error) {
            console.error("Failed to fetch connection status lists:", error);
        }
    };

    const fetchLoggedInUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/profile/me`, {
                withCredentials: true,
                headers: { "Cache-Control": "no-cache" },
            });
            dispatch(addUser(response.data));
            fetchConnectionStatus();
        } catch (error) {
            console.log("User not logged in");
        }
    };

    const profile = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/profile/others`, { username }, { withCredentials: true });
            setUser(res.data.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchLoggedInUser();
        profile();
        if (loggedInUser) {
            fetchConnectionStatus();
        }
    }, [username]);

    useEffect(() => {
        if (!user || !loggedInUser) return;

        if (loggedInUser.username === user.username) {
             setRequestStatus("SELF");
             return;
        }

        const isConnected = connectionsList.find(c => c.username === user.username);
        if (isConnected) {
            setRequestStatus("CONNECTED");
            return;
        }

        const isRequested = requestedUsers.find(r => r.username === user.username);
        if (isRequested) {
            setRequestStatus("REQUESTED");
            return;
        }
        
        const hasReceived = receivedRequestsList.find(r => r.username === user.username);
        if (hasReceived) {
            setRequestStatus("ACCEPT");
            return;
        }

        setRequestStatus("CONNECT");
    }, [user, loggedInUser, connectionsList, requestedUsers, receivedRequestsList]);

    const handleRequestAction = async () => {
        if (requestStatus === "CONNECT") {
            try {
                setRequestLoading(true);
                const res = await axios.post(`${BASE_URL}/request/send/${username}`, {}, { withCredentials: true });
                if (res.data.success) {
                    setRequestStatus("REQUESTED");
                }
            } catch (err) {
                console.error(err);
                const errMsg = err.response?.data?.message || "";
                if (err.response?.status === 400 && errMsg.includes("requested")) {
                    setRequestStatus("REQUESTED");
                } else if (err.response?.status === 403 && errMsg.includes("connected")) {
                    setRequestStatus("CONNECTED");
                }
            } finally {
                setRequestLoading(false);
            }
        }
    };

    let icon;
    if (user?.isVerified) {
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
            <path fill="#3b98ff" d="M22.02 11.164a1.84 1.84 0 0 0-.57-.67l-1.33-1a.35.35 0 0 1-.14-.2a.36.36 0 0 1 0-.25l.55-1.63a2 2 0 0 0 .06-.9a1.8 1.8 0 0 0-.36-.84a1.86 1.86 0 0 0-.7-.57a1.75 1.75 0 0 0-.85-.17h-1.5a.41.41 0 0 1-.39-.3l-.43-1.5a1.9 1.9 0 0 0-.46-.81a2 2 0 0 0-.78-.49a2 2 0 0 0-.92-.06a1.9 1.9 0 0 0-.83.39l-1.14.9a.35.35 0 0 1-.23.09a.36.36 0 0 1-.22-.05l-1.13-.9a1.85 1.85 0 0 0-.8-.38a1.9 1.9 0 0 0-.88 0a1.9 1.9 0 0 0-.78.43a2.1 2.1 0 0 0-.51.79l-.43 1.51a.38.38 0 0 1-.15.22a.4.4 0 0 1-.27.07H5.41a1.9 1.9 0 0 0-.89.18a1.8 1.8 0 0 0-.71.57a1.9 1.9 0 0 0-.36.83c-.05.293-.03.595.06.88L4 8.993a.41.41 0 0 1-.14.45l-1.33 1c-.242.18-.44.412-.58.68a1.93 1.93 0 0 0 0 1.71a2 2 0 0 0 .58.68l1.33 1a.41.41 0 0 1 .14.45l-.55 1.63a2 2 0 0 0-.07.91c.05.298.174.58.36.82c.183.25.428.45.71.58c.265.126.557.184.85.17h1.49a.38.38 0 0 1 .25.08a.34.34 0 0 1 .14.21l.43 1.51a2 2 0 0 0 .46.8a1.89 1.89 0 0 0 2.54.17l1.15-.91a.39.39 0 0 1 .49 0l1.13.9c.24.202.53.337.84.39q.17.015.34 0a1.9 1.9 0 0 0 .58-.09a1.87 1.87 0 0 0 1.24-1.28l.44-1.52a.34.34 0 0 1 .14-.21a.4.4 0 0 1 .27-.08h1.43a2 2 0 0 0 .89-.17a1.91 1.91 0 0 0 1.06-1.4a1.9 1.9 0 0 0-.07-.92l-.54-1.62a.36.36 0 0 1 0-.25a.35.35 0 0 1 .14-.2l1.33-1a1.9 1.9 0 0 0 .57-.68a1.8 1.8 0 0 0 .21-.86a1.9 1.9 0 0 0-.23-.78m-5.44-.76l-4.42 4.42a2 2 0 0 1-.59.4c-.222.09-.46.138-.7.14a1.7 1.7 0 0 1-.71-.15a1.9 1.9 0 0 1-.6-.4l-2.18-2.19a1 1 0 0 1 1.41-1.41l2.08 2.08l4.3-4.31a1 1 0 0 1 1.41 0a1 1 0 0 1 0 1.46z"></path>
        </svg>
    } else {
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 48 48">
            <defs>
                <mask id="SVGCIZk6d3F">
                    <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                        <circle cx={24} cy={12} r={8} fill="#555"></circle>
                        <path d="M42 44c0-9.941-8.059-18-18-18S6 34.059 6 44m14-8l8 8m0-8l-8 8"></path>
                    </g>
                </mask>
            </defs>
            <path fill="#ff3b3b" d="M0 0h48v48H0z" mask="url(#SVGCIZk6d3F)"></path>
        </svg>
    }

    return (
        <div className="h-auto bg-[#000] p-1 text-white min-h-screen font-sans">
            <div className="w-full h-full mx-auto flex xl:flex-row flex-col gap-4 p-2">

                {/* LEFT PROFILE CARD */}
                <div className="w-full xl:w-1/4 min-w-0 overflow-hidden bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl px-4 gap-2 py-8 flex flex-col md:flex-row xl:flex-col xl:min-h-[90vh] h-auto">
                    {/* Profile Image */}
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="h-56 w-56 rounded-full overflow-hidden border border-[#2a2a2a] hover:scale-105 transition duration-300">
                            <img
                                src={user?.photoUrl?.url || "/default-avatar.png"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="text-center mt-6 space-y-2">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white">
                                {user?.firstName} {user?.middleName} {user?.lastName}
                            </h1>

                            <div className="flex justify-center items-center gap-2 text-gray-400 text-md">
                                <span>@{user?.username}</span>
                                <span onClick={() => {
                                    handleCopy(user?.username); setCopied1(true); setCopied2(false); setTimeout(() => {
                                        setCopied1(false)
                                    }, 5000);
                                }} className="cursor-copy hover:text-white transition-colors">
                                    {!copied1 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                <path d="M16 3H4v13"></path>
                                                <path d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path>
                                            </g>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                            <path fill="#61ff3b" fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z"></path>
                                        </svg>
                                    )}
                                </span>
                                <span>{icon}</span>
                            </div>
                        </div>

                        {/* Connection Button */}
                        {loggedInUser && requestStatus !== "SELF" && (
                            <div className="w-full mt-6 flex justify-center">
                                <button 
                                    onClick={handleRequestAction}
                                    disabled={requestStatus !== "CONNECT" || requestLoading}
                                    className={`w-full py-3 px-6 rounded-full font-bold text-sm transition-all duration-300
                                        ${requestStatus === "CONNECT" 
                                            ? "bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                                            : "bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] cursor-not-allowed"}`}
                                >
                                    {requestLoading ? "Processing..." : 
                                     requestStatus === "CONNECT" ? "Connect" :
                                     requestStatus === "REQUESTED" ? "Requested" :
                                     requestStatus === "CONNECTED" ? "Connected" :
                                     requestStatus === "ACCEPT" ? "Accept Request" : "Connect"}
                                </button>
                            </div>
                        )}

                        <div className="text-gray-400 w-full text-sm flex justify-between px-4 items-center gap-2 mt-4 bg-[#111] border border-[#1a1a1a] py-3 rounded-2xl">
                            <div className="flex justify-center items-center gap-2 truncate">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16">
                                    <path fill="#ffffff" d="M4 3a2 2 0 0 0-2 2v.201l6 3.231l6-3.23V5a2 2 0 0 0-2-2zm10 3.337L8.237 9.44a.5.5 0 0 1-.474 0L2 6.337V11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z"></path>
                                </svg>   
                                <span className="truncate">{user?.gmail}</span>
                            </div>
                            <div>
                                <div onClick={() => {
                                    handleCopy(user?.gmail); setCopied2(true); setCopied1(false); setTimeout(() => {
                                        setCopied2(false)
                                    }, 5000);
                                }} className="cursor-copy hover:text-white transition-colors">
                                    {!copied2 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                <path d="M16 3H4v13"></path>
                                                <path d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path>
                                            </g>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                            <path fill="#61ff3b" fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z"></path>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="w-full mt-4 bg-[#111] border border-[#1a1a1a] p-5 rounded-2xl">
                            <h3 className="text-xl font-semibold mb-3 text-white">
                                About
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {user?.about || "No about details provided."}
                            </p>
                        </div>
                    </div>

                    {/* More Details */}
                    <div className="w-full mt-4 bg-[#111] border border-[#1a1a1a] p-5 rounded-2xl space-y-4">
                        {user?.profession && (
                            <div>
                                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Profession</h4>
                                <p className="text-white text-sm mt-1">{user?.profession}</p>
                            </div>
                        )}

                        {user?.college && (
                            <div>
                                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-semibold">College</h4>
                                <p className="text-white text-sm mt-1">{user?.college}</p>
                            </div>
                        )}

                        {user?.skills && user?.skills.length > 0 && (
                            <div>
                                <h4 className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {user?.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-xs text-gray-300 rounded-full font-medium">
                                            {skill.name || skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(user?.age || user?.gender) && (
                            <div className="flex gap-4">
                                {user?.age && (
                                    <div>
                                        <h4 className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Age</h4>
                                        <p className="text-white text-sm mt-1">{user?.age}</p>
                                    </div>
                                )}
                                {user?.gender && (
                                    <div>
                                        <h4 className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Gender</h4>
                                        <p className="text-white text-sm mt-1 capitalize">{user?.gender}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE DASHBOARD */}
                <div className="flex flex-col gap-4 w-full xl:w-3/4">
                    
                    <div className="lg:col-span-2 space-y-4">
                        {/* Career Profile Preview */}
                        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl p-4 shadow-xl">
                            <h2 className="text-2xl font-bold text-white mb-4 ml-1 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/><rect width="18" height="18" x="3" y="4" rx="2"/><circle cx="12" cy="10" r="2"/><line x1="8" x2="8" y1="2" y2="4"/><line x1="16" x2="16" y1="2" y2="4"/></svg>
                                Career Profile Preview
                            </h2>
                            <ShortPreview username={username} viewedUser={user} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileOther;










