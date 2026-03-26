import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./auth/baseURL";
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

            setTimeout(() => {
                {
                    setShowRequestModal(false);
                    dispatch(removeFeedUser(ID));
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
bg-[radial-gradient(circle_at_top,#0a0f1f,black_70%)]
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
        from-white 
        to-blue-400 
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
        text-gray-400 
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
        text-gray-300 
        font-extrabold
    ">
                    Suggested Developers for you
                </div>
            </div>
            <div className="max-w-9xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10">
                    {feed.map((item, index) => (
                        <div
                            key={item._id}
                            className=" relative group bg-[#030712]/70  rounded-3xl border border-white/[0.08]   transition-all duration-500 hover:-translate-y-1 overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-500/[0.05] before:to-purple-500/[0.05] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity">



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
                                        <div className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                            <div className="text-xs text-gray-400">Age</div>
                                            <div className="text-lg font-bold text-blue-400">{item.age}</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                                            <div className="text-xs text-gray-400">Gender</div>
                                            <div className="text-lg font-bold text-purple-400">{item.gender}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content Section */}
                                <div className="flex-1 space-y-4">
                                    {/* Header with tech indicators */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                                                    {item.firstName} {item.middleName} {item.lastName}
                                                </h1>
                                                {item.isVerified && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#44f53d" fill-rule="evenodd" d="M13.11 13.5a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973a1.71 1.71 0 0 0 0 2.219a1.7 1.7 0 0 1 .403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569c.028-.358.169-.7.402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.097l-1.63 1.523l-.346-.323a.75.75 0 0 0-1.024 1.097l.857.8a.75.75 0 0 0 1.024 0z" clip-rule="evenodd" /><path fill="#44f53d" d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.835.836-2.156.877-4.717.879a1.71 1.71 0 0 0-.35-1.555a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403a1.71 1.71 0 0 0-2.219 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.569c-.028.359-.17.7-.403.973A1.71 1.71 0 0 0 7.595 18c-2.56-.002-3.88-.043-4.716-.879C2 16.243 2 14.828 2 12" opacity="0.3" /><path fill="#44f53d" d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z" /></svg>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="text-gray-400 text-sm font-mono">@{item.username}</code>
                                                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                                <span className="text-lg text-gray-500">{item.profession}</span>
                                            </div>
                                        </div>

                                        {/* Connection status */}
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/30">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-md text-gray-300">{item.college}</span>
                                        </div>
                                    </div>

                                    {/* About section */}
                                    <div className=" rounded-xl p-4  bg-[#020617]/60 border border-white/[0.08]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                            <h3 className="text-sm font-semibold text-gray-300">SYSTEM PROFILE</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.about || "No description available"}</p>
                                    </div>

                                    {/* Skills section with tech tags */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <h3 className="text-sm font-semibold text-gray-300">TECH STACK</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.skills?.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className=" px-3 py-1.5 text-xs font-medium rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 hover:border-blue-400/40 hover:text-blue-300   transition-all duration-300 group relative overflow-hidden "
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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

                                        <button className="relative group flex-1 min-w-[140px] bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 active:scale-95 border border-gray-700/50 hover:border-gray-600/50 overflow-hidden">
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-2xl">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 -0.5 41 41">
                                                    <g fill="none" strokeMiterlimit={10}>
                                                        <path fill="#ffe236" stroke="#231f20" d="M36 33.59c3-1.36 3.53-8.34 3.53-13.59S38.94 7.77 36 6.41c-1.48-1.36-9.4-1.73-16-1.73S5.52 5.05 4 6.41C1.06 7.77.5 14.75.5 20S1.06 32.23 4 33.59c1.49 1.36 9.41 1.73 16 1.73s14.49-.32 16-1.73Z" strokeWidth={1}></path>
                                                        <path stroke="#231f20" strokeLinecap="round" d="M4.67 13c3.65 3.81 8.94 7.93 10.57 8.64a10.81 10.81 0 0 0 9.52 0c1.62-.64 6.91-4.79 10.56-8.64m-20.89 8.39l-6.96 6.97m18.1-6.97l6.97 6.97" strokeWidth={1}></path>
                                                        <path stroke="#fff" strokeLinecap="round" d="M29.05 7.53a15.4 15.4 0 0 1 5.27.92" strokeWidth={1}></path>
                                                    </g>
                                                </svg>
                                                Message
                                            </span>
                                        </button>

                                        <button disabled={actionId === item._id}
                                            className={`${actionId === item._id ? "opacity-70 cursor-not-allowed" : ""}relative group flex-1 min-w-[140px] bg-gradient-to-r from-purple-600/90 to-purple-700/90 text-white px-4 py-2.5 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 active:scale-95  border border-purple-500/30 overflow-hidden`} onClick={() => sendRequest(item.username, item._id)}>
                                            <span className="relative z-10 flex items-center justify-center gap-3 text-2xl">

                                                {actionId === item._id && (<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24">
                                                    <path fill="#efeded" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.3}></path>
                                                    <path fill="#efeded" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                                        <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                                    </path>
                                                </svg>)}


                                                <div className="flex justify-center items-center gap-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={55} height={55} viewBox="0 0 40 40">
                                                        <g fill="none">
                                                            <path fill="#ffe236" stroke="#231f20" strokeMiterlimit={10} d="M1.334 23.595c.109.153.309.238.589.252c.28.013.633-.046 1.04-.174a8 8 0 0 0 1.333-.573c.473-.25.957-.551 1.424-.885a13 13 0 0 0 1.296-1.062c.39-.367.72-.733.973-1.077c.252-.344.422-.66.5-.929c.078-.268.061-.485-.048-.638c-.11-.153-.31-.238-.589-.252c-.28-.013-.633.046-1.04.174c-.408.129-.86.323-1.334.573c-.473.25-.956.551-1.423.885a13 13 0 0 0-1.297 1.062a8 8 0 0 0-.972 1.077c-.253.344-.423.66-.5.929s-.062.486.048.638Zm-.618-7.167c.221.308.679.428 1.272.333c.594-.095 1.276-.397 1.895-.84s1.124-.99 1.406-1.522c.282-.531.316-1.003.095-1.311c-.22-.309-.678-.429-1.272-.333s-1.275.397-1.894.84s-1.125.99-1.406 1.522c-.282.53-.316 1.003-.096 1.311Zm1.82 14.64c.11.152.328.224.644.212s.723-.11 1.197-.287a11.5 11.5 0 0 0 1.568-.74a18 18 0 0 0 1.7-1.084c.562-.402 1.097-.83 1.574-1.26s.888-.853 1.208-1.245s.543-.746.657-1.04c.114-.296.116-.526.007-.679c-.11-.153-.328-.225-.644-.212s-.723.11-1.197.286a11.6 11.6 0 0 0-1.569.741c-.56.313-1.138.681-1.7 1.083s-1.096.83-1.573 1.26c-.478.43-.888.853-1.208 1.246c-.32.392-.543.746-.657 1.04s-.116.526-.007.679Z" strokeWidth={1}></path>
                                                            <path fill="#48eeff" stroke="#231f20" strokeMiterlimit={10} d="M37.65 17.44c-.89-.69-5.63-1.2-9.56-1.2s-8.68.51-9.57 1.2c-1.78.69-1.85 4.24-1.85 6.91s.07 7.12 1.85 7.81c.51.4 2.28.73 4.44 1l-.39 2.69c-.76.19-1.14.43-1.14 1.16s.34 1 1.11 1.12c.26 0 10.72.06 11.09 0c.74-.13 1.11-.44 1.11-1.12s-.38-1-1.14-1.16l-.39-2.69c2.16-.22 3.93-.55 4.44-1c1.78-.69 1.85-5.14 1.85-7.81s-.07-6.22-1.85-6.91Z" strokeWidth={1}></path>
                                                            <path fill="#fff" stroke="#231f20" strokeMiterlimit={10} d="M35.26 29.67c1.33-.49 1.39-3 1.39-4.87s-.06-4.38-1.39-4.86c-.67-.49-4.23-.85-7.17-.85s-6.51.36-7.18.85c-1.33.48-1.39 3-1.39 4.86s.06 4.38 1.39 4.87c.67.48 4.23.84 7.18.84s6.5-.36 7.17-.84Z" strokeWidth={1}></path>
                                                            <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M24.94 35.5a13.4 13.4 0 0 1 3.15-.23c1.052-.048 2.106.03 3.14.23" strokeWidth={1}></path>
                                                            <path stroke="#fff" strokeLinecap="round" strokeMiterlimit={10} d="M35.6 18.3c1.6.52 1.8.79 2.3 2.7" strokeWidth={1}></path>
                                                            <path fill="#ff52a1" stroke="#231f20" strokeMiterlimit={10} d="M27.67 2c-1 .12-5.68 1.06-9.5 2c-1.17.28-7.81 2-10.08 3.73c-1.58 1.21-.92 2.21.25 3.11L13 14.39c-.4 3.59-.37 5.84.87 6.46s2.9-.8 4.43-2.39l1.93 1.48c1.17.89 2.44 1.4 4 .22c.09-.07 2.15-1.18 4.88-7.74a82 82 0 0 0 2.79-7.71c.5-2.49-1.03-3.11-4.23-2.71Z" strokeWidth={1}></path>
                                                            <path fill="#48eeff" d="M16.67 12.6a84 84 0 0 1 9-6Z"></path>
                                                            <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M16.67 12.6a84 84 0 0 1 9-6" strokeWidth={1}></path>
                                                            <path fill="#48eeff" d="M18.25 18.46c-.85-.72-1.11-1-1.11-1Z"></path>
                                                            <path stroke="#231f20" strokeLinecap="round" strokeMiterlimit={10} d="M18.25 18.46c-.85-.72-1.11-1-1.11-1" strokeWidth={1}></path>
                                                            <path stroke="#fff" strokeLinecap="round" strokeMiterlimit={10} d="M11.83 8.4a16.6 16.6 0 0 1 3.9-1.53" strokeWidth={1}></path>
                                                        </g>
                                                    </svg>
                                                    <h1>  Send Request</h1>
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
                        className="relative group bg-gradient-to-r from-gray-900 to-gray-950 text-gray-300 px-8 py-3.5 rounded-xl font-medium hover:text-white transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 flex items-center gap-3">
                            <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            LOAD MORE PROFILES
                        </span>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </button>
                </div>
            </div >
            {showRequestModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center">

                    {/* BACKDROP */}
                    <div className="absolute inset-0 bg-black/50 "></div>

                    {/* MODAL */}
                    <div className="relative px-8 py-6 rounded-3xl border border-white/10
    bg-[#030712]/80 
    animate-[modalPop_0.25s_ease]">

                        <div className="flex items-center gap-4">

                            {/* ICON */}
                            <div className="w-[130px] h-[130px] flex items-center justify-center rounded-full bg-purple-600/20 border border-purple-500/40">
                                <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 40 40">
                                    <g fill="none" strokeMiterlimit={10}>
                                        <path fill="#48eeff" stroke="#231f20" d="M37 4.24c-1.89-1.44-4.45-2.38-7 0c-1.52 1-5.67 5-10.22 11c-1.19 1.58-2.32 3.08-3.35 4.49c-3.74-2.84-6.69-4.85-7.91-5c-2.07-.8-4.31 1.45-5.75 3.34S-.32 22.63 1 24.4c.47 1.14 3.13 3.53 6.87 6.38c4.49 3.41 7.73 6 9.63 6.24c2.91 1.13 5-2.31 13.37-13.36c4.55-6 7.45-11 8-12.69c1.56-3.08-.03-5.29-1.87-6.73Z" strokeWidth={1}></path>
                                        <path stroke="#fff" strokeLinecap="round" d="M28.56 8.89c1.64-1.84 3.16-3.58 4.55-3.73" strokeWidth={1}></path>
                                    </g>
                                </svg>
                            </div>

                            {/* TEXT */}
                            <div>
                                <div className="text-4xl font-semibold text-white">
                                    Request Sent!
                                </div>
                                <div className="text-xl text-gray-400">
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




