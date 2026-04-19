import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../Pages/auth/baseURL"
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
bg-base-200
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
        from-[#ff8904] 
        to-accent 
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
        text-gray-800 
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
                            className=" relative group bg-base-100  rounded-3xl border border-secondary border-[2px] transition-all duration-500 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">



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
                                        <div className="text-center p-2 bg-base-300 border border-[2px] border-secondary rounded-lg">
                                            <div className="text-xs text-secondary">Age</div>
                                            <div className="text-lg font-bold text-accent">{item.age}</div>
                                        </div>
                                        <div className="text-center p-2 bg-base-300 border border-[2px] border-secondary rounded-lg">
                                            <div className="text-xs text-secondary">Gender</div>
                                            <div className="text-lg font-bold text-accent">{item.gender}</div>
                                        </div>
                                    </div>

                                    {/* Connection status */}
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-base-300 border border-[2px] border-secondary rounded-full">
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
                                                    {item.firstName} {item.middleName} {item.lastName}
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

                                    </div>

                                    {/* About section */}
                                    <div className=" rounded-xl p-4  bg-base-300 border border-secondary border-[2px] ">
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
                                            <h3 className="text-sm font-semibold text-accent">TECH STACK</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.skills?.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className=" px-3 py-1.5 text-xs font-medium rounded-xl  text-accent  border-[2px] border-secondary relative overflow-hidden "
                                                >
                                                    <div className="absolute inset-0 bg-base-300 border  "></div>
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



                                        <button className="relative group flex-1 min-w-[140px] bg-base-300 text-accent px-4 py-2.5 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 active:scale-95  border border-secondary border-[2px] overflow-hidden" onClick={() => deleteRequest(item._id)}>

                                            <span className="relative z-10 flex items-center justify-center gap-2 text-2xl">
                                                {deletingId === item._id && (<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                                                    <path fill="#5a2c01ff" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.3}></path>
                                                    <path fill="#5a2c01ff" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                                        <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                                    </path>
                                                </svg>)}  <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 40 40">
                                                    <g fill="none" strokeMiterlimit={10}>
                                                        <path fill="#5a2c01ff" stroke="#231f20" d="M.5 20a19.5 19.5 0 1 0 39 0a19.5 19.5 0 0 0-39 0Z" strokeWidth={1}></path>
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
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowRequestModal(false)}></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl border border-secondary border-[3px]
    bg-base-100 
    animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">

                            {/* ICON */}
                            <div className="w-[100px] h-[100px] flex items-center justify-center rounded-full bg-base-300 border border-secondary border-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 80 80">
                                    <g fill="none" fillRule="evenodd" clipRule="evenodd">
                                        <path fill="#eb5757" d="M17.103 20.655a14 14 0 0 0 0 19.799l14.142 14.142l7.07 7.07a2 2 0 0 0 2.83 0l7.07-7.07l14.142-14.142a14 14 0 0 0-19.799-19.8l-2.137 2.138a.977.977 0 0 1-1.382 0L36.9 20.655a14 14 0 0 0-19.799 0" strokeWidth={2} stroke="#eb5757"></path>
                                        <path fill="#f2c94c" d="M47.054 17.639a1 1 0 0 1-.111.375l-4.502 8.583a.274.274 0 0 0 .172.392l1.177.316l1.445.387l3.197.857a1 1 0 0 1 .52 1.594L34.834 47.618c-.243.302-.715.004-.549-.345l6.048-12.706a1 1 0 0 0-.644-1.395l-.611-.164l-1.353-.363l-4.711-1.262a1 1 0 0 1-.668-1.342l4.019-9.894q.273.246.535.507l2.137 2.138a.977.977 0 0 0 1.383 0l2.137-2.138c1.3-1.3 2.831-2.319 4.496-3.015" strokeWidth={2} stroke="#f2c94c"></path>
                                    </g>
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-4xl font-semibold text-secondary">
                                    Request Deleted!
                                </div>
                                <div className="text-xl text-accent">
                                    Request has been deleted.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(reqUserTotal == 0 || reqUser.length === 0) && (
                <div className="inset-0 flex items-center justify-center px-4">

                    <div className="relative w-full max-w-3xl p-10 rounded-3xl  bg-base-100 border border-secondary border-[3px] animate-[modalPop_0.3s_ease]">

                        <div className="flex flex-col md:flex-row items-center gap-8">

                            {/* ICON */}
                            <div className="w-36 h-36 flex items-center justify-center 
                                        rounded-full bg-base-300
                                        border border-secondary border-[3px]
                                    ">
                                <FaPeopleCarry className="text-secondary" size={60} />
                            </div>

                            {/* TEXT SECTION */}
                            <div className="text-center md:text-left">
                                <h2 className="text-4xl font-bold text-secondary mb-4">
                                    No request found!
                                </h2>

                                <p className="text-lg text-accent mb-6 max-w-md">
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

export default RequestedUser