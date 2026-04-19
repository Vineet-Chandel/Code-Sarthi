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



    if (user.isVerified) {
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#9f2d00" fillRule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clipRule="evenodd" /><path fill="#9f2d00" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#9f2d00" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
    } else {
        icon = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#9f2d00" d="M14.5 2.5c0 1.5-1.5 6-1.5 6h-2S9.5 4 9.5 2.5a2.5 2.5 0 0 1 5 0M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m4.08-4.89c.18-.75.33-1.47.39-2.06A10 10 0 0 1 22 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-3.92 2.25-7.31 5.53-8.95c.07.59.21 1.32.39 2.06A8.03 8.03 0 0 0 4 12c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.93-1.58-5.49-3.92-6.89M18 12c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2 .98-3.77 2.48-4.86c.23.81.65 2.07.65 2.07C8.43 9.93 8 10.92 8 12c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.08-.43-2.07-1.13-2.79c0 0 .41-1.22.65-2.07A6 6 0 0 1 18 12" /></svg>
    }
    return (
        <div data-theme="caramellatte" className="min-h-screen bg-base-200  p-10 px-6 py-10">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT PROFILE CARD */}
                <div className="lg:col-span-1 bg-base-100  border border-[3px] border-base-300 rounded-3xl p-8">

                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <div className="h-56 w-56 rounded-full overflow-hidden border-4 border-secondary hover:scale-105 transition duration-300">
                            <img
                                src={user.photoUrl?.url || "/default-avatar.png"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="text-center mt-6 space-y-2">
                        <h1 className="text-3xl font-bold tracking-wide text-secondary">
                            {user.firstName} {user.middleName} {user.lastName}
                        </h1>

                        <div className="flex justify-center items-center gap-2 text-accent text-lg">
                            <span>@{user.username}</span>
                            <span onClick={() => handleCopy(user.username)} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" opacity={0.16}></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3H4v13"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path></g></svg></span>
                            <span onClick={() => navigate("/app/settings")} className="cursor-pointer">{icon}</span>
                        </div>
                    </div>
                    <div className="text-gray-800 w-full text-sm pl-1 flex justify-between px-3 pl-3 items-center gap-1  mt-2 bg-base-300  border border-secondary border-[2px] py-2 rounded-2xl">
                        <div className="flex justify-center items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16">
                                <path fill="#bf630b" d="M4 3a2 2 0 0 0-2 2v.201l6 3.231l6-3.23V5a2 2 0 0 0-2-2zm10 3.337L8.237 9.44a.5.5 0 0 1-.474 0L2 6.337V11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z"></path>
                            </svg>   {user.gmail}
                        </div>
                        <div>
                            <div onClick={() => handleCopy(user.gmail)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path fill="#bf630b" d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" opacity={0.16}></path>
                                        <path stroke="#bf630b" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3H4v13"></path>
                                        <path stroke="#bf630b" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>

                    </div>
                    {/* About */}
                    <div className="mt-2 bg-base-200 border border-base-300 p-5 rounded-2xl">
                        <h3 className="text-xl font-semibold mb-3 text-secondary">
                            About
                        </h3>
                        <p className="text-accent leading-relaxed">
                            {user.about}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-3">

                        <div className="bg-base-200 border border-secondary rounded-2xl p-3 flex-col justify-center  items-center hover:scale-105 transition">
                            <h3 className="text-3xl font-bold">{connections.total}</h3>
                            <p className="text-secondary text-sm mt-2">Connections</p>
                        </div>
                        <div className="bg-base-200 border border-secondary rounded-2xl p-3 flex-col justify-center  items-center hover:scale-105 transition">
                            <h3 className="text-3xl font-bold">12</h3>
                            <p className="text-secondary text-sm mt-2">Completed Projects</p>
                        </div>
                        <div className="bg-base-200 border border-secondary rounded-2xl p-3 flex-col justify-center  items-center hover:scale-105 transition">
                            <h3 className="text-3xl font-bold">3</h3>
                            <p className="text-secondary text-sm mt-2">Ongoing Projects</p>
                        </div>

                    </div>


                    {/* Info List */}
                    <div className="mt-2  flex justify-between items-center">
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl flex justify-between items-center">
                            <span className="text-lg font-medium flex justify-center items-center gap-3"><FaUniversity color="#370a00" />{user.college}</span>
                        </div>

                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl flex justify-between items-center">
                            <span className="text-lg font-medium flex justify-center items-center gap-3"><BsPersonWorkspace color="#370a00" />{user.profession}</span>
                        </div>
                    </div>
                </div>


                {/* RIGHT SIDE DASHBOARD */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Stats Cards */}



                    {/* Projects Section */}
                    <div className="h-full bg-base-100 backdrop-blur-xl border border-base-300 border-[3px] rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-secondary">RESUME</h2>

                    </div>



                </div>
            </div>
        </div>
    );
}
export default Dashboard;
