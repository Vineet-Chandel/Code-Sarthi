import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "./auth/baseURL";
import { addFeedUser } from "../utils/feedSlice";
import { removeFeedUser } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/navSearch";
import { RiUserUnfollowFill } from "react-icons/ri";

const Explore = () => {
    const user = useSelector(store => store.user.user.DATA);
    const feed = useSelector(store => store.feed.users || []);

    const dispatch = useDispatch();
    const [page, setPage] = useState(1); // ✅ page defined
    const [actionId, setActionId] = useState(null);
    const [actionColorId, setActionColorId] = useState(null);

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
    const feedUser = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/user/feed?page=${page}&limit=12`,
                { withCredentials: true }
            );

            dispatch(addFeedUser(response.data.data));

        } catch (err) {
            console.error(err?.message || err);
        }
    };


    useEffect(() => {
        feedUser();
    }, [page]);


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
                    Collab with New Developers
                </h1>

                {/* Subtitle */}
                <p className="
        text-base 
        sm:text-lg 
        md:text-xl 
        lg:text-2xl 
        text-accent
        mt-6 
        max-w-xl 
        lg:max-w-3xl
    ">
                    You can collab with new developers from all over the world
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
                    <Search height={60} />
                </div>
            </div>


            {/* Suggested Section */}
            <div className="w-full flex justify-start items-center mb-8 px-4">
                <div className="
        text-2xl 
        sm:text-3xl 
        md:text-4xl 
        lg:text-[3rem] 
        text-accent
        font-extrabold
        flex gap-1
    ">
                    <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" className="transition-transform duration-500 ease-in-out hover:rotate-180">
                        <path fill="#8c3f27" d="M10.565 2.075a3.33 3.33 0 0 1 2.87 0c.394.189.755.497 1.26.928l.079.066c.48.41.939.604 1.58.655l.102.008c.662.053 1.135.09 1.547.236a3.33 3.33 0 0 1 2.03 2.029c.145.412.182.885.235 1.547l.008.102c.051.641.246 1.1.655 1.58l.066.078c.431.506.74.867.928 1.261a3.33 3.33 0 0 1 0 2.87c-.189.394-.497.755-.928 1.26l-.066.079c-.418.49-.605.951-.655 1.58l-.008.102c-.053.662-.09 1.135-.236 1.547a3.33 3.33 0 0 1-2.029 2.03c-.412.145-.885.182-1.547.235l-.102.008c-.641.051-1.1.246-1.58.655l-.079.066c-.505.431-.866.74-1.26.928a3.33 3.33 0 0 1-2.87 0c-.394-.189-.755-.497-1.26-.928l-.079-.066a2.56 2.56 0 0 0-1.58-.655l-.102-.008c-.662-.053-1.135-.09-1.547-.236a3.33 3.33 0 0 1-2.03-2.029c-.145-.412-.182-.885-.235-1.547l-.008-.102a2.56 2.56 0 0 0-.655-1.58l-.066-.079c-.431-.505-.74-.866-.928-1.26a3.33 3.33 0 0 1 0-2.87c.189-.394.497-.755.928-1.26l.066-.079a2.56 2.56 0 0 0 .655-1.58l.008-.102c.053-.662.09-1.135.236-1.547a3.33 3.33 0 0 1 2.029-2.03c.412-.145.885-.182 1.547-.235l.102-.008a2.56 2.56 0 0 0 1.58-.655l.078-.066c.506-.431.867-.74 1.261-.928m3.232 6.12a.75.75 0 1 0-1.45-.39l-2.143 8a.75.75 0 0 0 1.449.39zm1.641.974a.75.75 0 1 0-1.06 1.06l.131.132c.527.526.867.869 1.085 1.155c.205.268.23.396.23.484s-.025.216-.23.484c-.218.286-.558.629-1.085 1.155l-.131.131a.75.75 0 1 0 1.06 1.06l.167-.166c.482-.48.895-.894 1.181-1.27c.307-.402.537-.846.537-1.394s-.23-.992-.537-1.394c-.286-.376-.7-.79-1.18-1.27zm-5.816 0a.75.75 0 0 0-1.06 0l-.167.167c-.481.48-.895.894-1.181 1.27c-.307.402-.537.846-.537 1.394s.23.992.537 1.394c.286.376.7.79 1.18 1.27l.168.167a.75.75 0 0 0 1.06-1.06l-.131-.132c-.527-.526-.867-.869-1.085-1.155c-.205-.268-.23-.396-.23-.484s.025-.216.23-.484c.218-.286.558-.629 1.085-1.155l.131-.131a.75.75 0 0 0 0-1.061"></path>
                    </svg>    Suggested developers for you,
                </div>
            </div>
            <div className="max-w-9xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
                    {feed.map((item, index) => (
                        <div
                            key={item._id}
                            className=" relative group bg-base-100  rounded-3xl border border-base-300 border-[3px]   transition-all duration-500 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">



                            <div className="relative p-6 flex flex-col md:flex-row gap-6">
                                {/* Left Profile Section */}
                                <div className="flex flex-col items-center md:items-start space-y-4">
                                    {/* Avatar with tech ring */}
                                    <div className="relative">

                                        <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#111827] to-black border border-blue-500/20 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">

                                            <div className="absolute inset-0 flex items-center justify-center">

                                                <img
                                                    src={item.photoUrl.url}
                                                    className=" w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700
"
                                                />

                                            </div>

                                        </div>



                                    </div>

                                    {/* Tech stats */}
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <div className="text-center p-2 bg-base-300 rounded-lg border border-secondary border-[2px]">
                                            <div className="text-xs text-secondary">Age</div>
                                            <div className="text-lg font-bold text-accent">{item.age}</div>
                                        </div>
                                        <div className="text-center p-2 bg-base-300 rounded-lg border border-secondary border-[2px]">
                                            <div className="text-xs text-secondary">Gender</div>
                                            <div className="text-lg font-bold text-accent">{item.gender}</div>
                                        </div>

                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-base-300 rounded-full border border-secondary border-[2px]">
                                        <div className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></div>
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
                                    <div className=" rounded-xl p-4  bg-base-300 border border-secondary border-[2px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-secondary rounded-full"></div>
                                            <h3 className="text-sm font-semibold text-secondary">About</h3>
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
                                                    className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-base-300 border border-secondary text-gray-300  relative overflow-hidden border border-[2px] border-secondary"
                                                >
                                                    <div className="absolute inset-0 "></div>
                                                    <span className="relative text-accent">{skill}</span>
                                                </span>
                                            )) || (
                                                    <span className="px-3 py-1.5 text-xs text-accent bg-gray-900/50 rounded-lg border border-gray-700/30">
                                                        No skills configured
                                                    </span>
                                                )}
                                        </div>
                                    </div>

                                    {/* Action buttons with tech style */}
                                    <div className="flex flex-wrap gap-3 pt-2">



                                        <button disabled={actionId === item._id}
                                            className={`${actionId === item._id ? "opacity-70 cursor-not-allowed" : ""}relative group flex-1 min-w-[140px] bg-base-300 border border-[2px] border-secondary text-white px-4 py-2.5 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 active:scale-95  border border-purple-500/30 overflow-hidden`} onClick={() => sendRequest(item.username, item._id)}>
                                            <span className="relative z-10 flex items-center justify-center gap-3 text-2xl">

                                                {actionId === item._id && (<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                                                    <path fill="#914a08ff" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.3}></path>
                                                    <path fill="#914a08ff" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                                        <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                                    </path>
                                                </svg>)}


                                                <div className="flex justify-center items-center gap-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 32 32">
                                                        <path fill="#914a08ff" d="M25 22.142V9c0-2.206-1.794-4-4-4h-4.172l2.586-2.586L18 1l-5 5l5 5l1.414-1.414L16.828 7H21c1.103 0 2 .898 2 2v13.142c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.858-1.28-3.41-3-3.858M24 28c-1.103 0-2-.897-2-2s.897-2 2-2s2 .898 2 2s-.897 2-2 2M4 6c0 1.858 1.28 3.41 3 3.858v12.284c-1.72.447-3 2-3 3.858c0 2.206 1.794 4 4 4s4-1.794 4-4c0-1.859-1.28-3.41-3-3.858V9.858c1.72-.447 3-2 3-3.858c0-2.206-1.794-4-4-4S4 3.794 4 6m6 20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .898 2 2m0-20c0 1.103-.897 2-2 2s-2-.897-2-2s.897-2 2-2s2 .897 2 2"></path>
                                                    </svg>
                                                    <h1 className="text-accent">  Send Request</h1>
                                                </div>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom tech border */}
                            < div className="h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" ></div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className="relative group bg-base-300 text-accent px-8 py-3.5 rounded-xl font-medium hover:text-secondary transition-all duration-300 border border-secondary border-[2px] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
                                <g fill="none">
                                    <path fill="#a45204ff" fillOpacity={0.25} d="M6 14h.675c.581 0 .872 0 1.104.134a1 1 0 0 1 .164.118c.2.178.292.453.476 1.005l.125.376c.22.66.33.99.592 1.178c.262.189.61.189 1.306.189h3.117c.695 0 1.043 0 1.305-.189s.372-.518.592-1.178l.125-.376c.184-.552.276-.827.476-1.005a1 1 0 0 1 .164-.118c.232-.134.523-.134 1.104-.134H18c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C21 12.398 21 11.932 21 11v6c0 1.886 0 2.828-.586 3.414S18.886 21 17 21H7c-1.886 0-2.828 0-3.414-.586S3 18.886 3 17v-6c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C4.602 14 5.068 14 6 14"></path>
                                    <path stroke="#4d2704ff" strokeWidth={1.2} d="M3 11c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C4.602 14 5.068 14 6 14h.675c.581 0 .872 0 1.104.134a1 1 0 0 1 .164.118c.2.178.292.453.476 1.005l.125.376c.22.66.33.99.592 1.178c.262.189.61.189 1.306.189h3.117c.695 0 1.043 0 1.305-.189s.372-.518.592-1.178l.125-.376c.184-.552.276-.827.476-1.005a1 1 0 0 1 .164-.118c.232-.134.523-.134 1.104-.134H18c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C21 12.398 21 11.932 21 11M8 9l4 3m0 0l4-3m-4 3V2"></path>
                                    <path stroke="#4d2704ff" strokeWidth={1.2} d="M16 5h1c1.886 0 2.828 0 3.414.586S21 7.114 21 9v8c0 1.886 0 2.828-.586 3.414S18.886 21 17 21H7c-1.886 0-2.828 0-3.414-.586S3 18.886 3 17V9c0-1.886 0-2.828.586-3.414S5.114 5 7 5h1"></path>
                                </g>
                            </svg>
                            LOAD MORE PROFILES
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-base-300 via-secondary to-base-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </button>
                </div>
            </div >

            {showRequestModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center">

                    {/* BACKDROP */}
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowRequestModal(false)}></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl border border-secondary border-[3px]
    bg-base-200
    animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">

                            {/* ICON */}
                            <div className="w-[130px] h-[130px] flex items-center justify-center rounded-full bg-base-100 border border-secondary border-[3px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 40 40">
                                    <g fill="none" strokeMiterlimit={10}>
                                        <path fill="#ffb667" stroke="#231f20" d="M37 4.24c-1.89-1.44-4.45-2.38-7 0c-1.52 1-5.67 5-10.22 11c-1.19 1.58-2.32 3.08-3.35 4.49c-3.74-2.84-6.69-4.85-7.91-5c-2.07-.8-4.31 1.45-5.75 3.34S-.32 22.63 1 24.4c.47 1.14 3.13 3.53 6.87 6.38c4.49 3.41 7.73 6 9.63 6.24c2.91 1.13 5-2.31 13.37-13.36c4.55-6 7.45-11 8-12.69c1.56-3.08-.03-5.29-1.87-6.73Z" strokeWidth={1}></path>
                                        <path stroke="#fff" strokeLinecap="round" d="M28.56 8.89c1.64-1.84 3.16-3.58 4.55-3.73" strokeWidth={1}></path>
                                    </g>
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-4xl font-semibold text-secondary">
                                    Request Sent!
                                </div>
                                <div className="text-xl text-accent">
                                    Your collaboration request has been delivered.
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div >

    );
};

export default Explore;
// onClick = {() => setPage(prev => prev + 1)}




