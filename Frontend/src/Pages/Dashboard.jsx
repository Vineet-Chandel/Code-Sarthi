import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addConnectionUser } from "../utils/connectionSlice";
import BASE_URL from "../Pages/auth/baseURL";
import { FaUniversity } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoBarChart } from "react-icons/io5";

const Dashboard = () => {


    let icon;
    const user = useSelector(store => store.user.user.DATA);
    const connections = useSelector(state => state.connections || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    }, []);



    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);

        } catch (err) {
            console.error("Failed to copy", err);
        }
    };
    const [copied1, setCopied1] = useState(false);
    const [copied2, setCopied2] = useState(false);


    if (user.isVerified) {
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
        <div data-theme="caramellatte" className="min-h-screen bg-base-100  px-3 lg:py-6 py-10">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT PROFILE CARD */}
                <div className="lg:col-span-1 bg-base-100 border border-base-300 rounded-3xl px-2 md:px-6 lg:px-8 py-10">

                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <div className="h-56 w-56 rounded-full overflow-hidden border border-secondary hover:scale-105 transition duration-300">
                            <img
                                src={user.photoUrl?.url || "/default-avatar.png"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="text-center mt-6 space-y-2">
                        <h1 className="text-3xl font-bold tracking-wide text-secondary-content">
                            {user.firstName} {user.middleName} {user.lastName}
                        </h1>

                        <div className="flex justify-center items-center gap-2 text-info text-lg">
                            <span>@{user.username}</span>
                            <span onClick={() => {
                                handleCopy(user.username); setCopied1(true); setCopied2(false); setTimeout(() => {

                                    setCopied1(false)
                                }, 5000);
                            }} className="cursor-copy">
                                {!copied1 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
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
                            <span onClick={() => navigate("/app/settings")} className="cursor-pointer">{icon}</span>
                        </div>
                    </div>
                    <div className="text-gray-400 w-full text-sm  flex justify-between px-3 pl-3 items-center gap-1  mt-2 bg-base-300  border border-secondary  py-2 rounded-2xl">
                        <div className="flex justify-center items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16">
                                <path fill="#ffffff" d="M4 3a2 2 0 0 0-2 2v.201l6 3.231l6-3.23V5a2 2 0 0 0-2-2zm10 3.337L8.237 9.44a.5.5 0 0 1-.474 0L2 6.337V11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z"></path>
                            </svg>   {user.gmail}
                        </div>
                        <div>
                            <div onClick={() => {
                                handleCopy(user.gmail); setCopied2(true); setCopied1(false); setTimeout(() => {

                                    setCopied2(false)
                                }, 5000);
                            }} className="cursor-copy">

                                {!copied2 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
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
                    <div className="mt-2 bg-base-200 border border-base-300 p-5 rounded-2xl">
                        <h3 className="text-xl font-semibold mb-3 text-secondary-content">
                            About
                        </h3>
                        <p className="text-info leading-relaxed">
                            {user.about}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">

                        <div className="bg-base-200 border border-secondary rounded-2xl p-3 flex-col justify-center  items-center hover:scale-105 transition">
                            <h3 className="text-3xl font-bold">{connections.total}</h3>
                            <p className="text-info text-sm mt-2">Connections</p>
                        </div>
                        <div className="bg-base-200 border border-secondary rounded-2xl p-3 flex-col justify-center  items-center hover:scale-105 transition">
                            <h3 className="text-3xl font-bold">12</h3>
                            <p className="text-info text-sm mt-2">Completed Projects</p>
                        </div>
                        <div className="bg-base-200 border border-secondary rounded-2xl p-3 flex-col justify-center  items-center hover:scale-105 transition">
                            <h3 className="text-3xl font-bold">3</h3>
                            <p className="text-info text-sm mt-2">Ongoing Projects</p>
                        </div>

                    </div>


                    {/* Info List */}
                    <div className="mt-2 gap-3 flex justify-around items-center">
                        <div className="w-[50%] gap-3 bg-white/5 p-3 rounded-xl flex justify-between items-center">
                            <span className="text-md font-light flex justify-center items-center gap-3"><FaUniversity color="#ffffff" />{user.college}</span>
                        </div>

                        <div className="w-[50%] gap-3 bg-white/5 p-3 rounded-xl flex justify-between items-center">
                            <span className="text-md font-light flex justify-center items-center gap-3"><BsPersonWorkspace color="#ffffff" />{user.profession}</span>
                        </div>
                    </div>
                </div>


                {/* RIGHT SIDE DASHBOARD */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Stats Cards */}



                    {/* Projects Section */}
                    <div className="h-full bg-base-100 backdrop-blur-xl  border-base-300 border rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-secondary-content">RESUME</h2>
                    </div>



                </div>
            </div>
        </div>
    );
}
export default Dashboard;
