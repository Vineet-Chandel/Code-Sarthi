import { useParams } from "react-router-dom";




import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
// import { addConnectionUser } from "../utils/connectionSlice";
import BASE_URL from "../Pages/auth/baseURL";
import { useNavigate } from "react-router-dom";


import ShortPreview from "../Pages/INTERVIEW-ARENA/MediumPreview";

const ProfileOther = () => {
    const { username } = useParams();

    const data = [
        {
            id: 1,
            title: "Project Completed",
            count: 24,
        },
        {
            id: 2,
            title: "Running Project",
            count: 10,
        },
        {
            id: 3,
            title: "Ended Project",
            count: 12,
        },
        {
            id: 4,
            title: "Pending Project",
            count: 2,
        }
    ]

    let icon;

    const connections = useSelector(state => state?.connections || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [openCarrerProfile, setOpenCarrerProfile] = useState(false);

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);

        } catch (err) {
            console.error("Failed to copy", err);
        }
    };
    const [copied1, setCopied1] = useState(false);
    const [copied2, setCopied2] = useState(false);

    const [user, setUser] = useState(null);
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


    const profile = async () => {

        try {
            const res = await axios.post(`${BASE_URL}/profile/others`, { username }, { withCredentials: true });
            setUser(res.data.data);
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        profile();
    }, [username])




    return (
        <div data-theme="caramellatte" className="h-auto bg-white  p-1  ">

            <div className="w-full h-full mx-auto flex xl:flex-row flex-col gap-2 ">

                {/* LEFT PROFILE CARD */}
                <div
                    className="
    w-full xl:w-1/4 
    min-w-0
    overflow-hidden
    bg-base-100
    border
    border-base-300
    rounded-3xl
    px-3
    gap-2
    py-8
    flex
    flex-col
    md:flex-row
    xl:flex-col
    xl:min-h-[90vh]
    h-auto
    mt-2.5
    "
                >

                    {/* Profile Image */}
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="h-56 w-56 rounded-full overflow-hidden border border-secondary hover:scale-105 transition duration-300">
                            <img
                                src={user?.photoUrl?.url || "/default-avatar.png"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>


                        <div className="text-center mt-6 space-y-2">
                            <h1 className="text-2xl
    md:text-3xl font-bold tracking-wide text-secondary-content">
                                {user?.firstName} {user?.middleName} {user?.lastName}
                            </h1>

                            <div className="flex justify-center items-center gap-2 text-info text-md">
                                <span>@{user?.username}</span>
                                <span onClick={() => {
                                    handleCopy(user?.username); setCopied1(true); setCopied2(false); setTimeout(() => {

                                        setCopied1(false)
                                    }, 5000);
                                }} className="cursor-copy">
                                    {!copied1 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 24 24">
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
                                </svg>   {user?.gmail}
                            </div>
                            <div>
                                <div onClick={() => {
                                    handleCopy(user?.gmail); setCopied2(true); setCopied1(false); setTimeout(() => {

                                        setCopied2(false)
                                    }, 5000);
                                }} className="cursor-copy">

                                    {!copied2 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
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
                        <div className="w-full mt-2 bg-base-200 border border-base-300 p-5 rounded-2xl">
                            <h3 className="text-xl font-semibold mb-3 text-secondary-content">
                                About
                            </h3>
                            <p className="text-info leading-relaxed">
                                {user?.about}
                            </p>
                        </div>
                    </div>

                    {/* Name */}

                    <span className="w-full">


                        <div className="w-full h-full  xl:min-h-[250px]   rounded-3xl border border-base-300 bg-white p-4 sm:p-5 lg:p-6 flex flex-col">

                            {/* Heading */}
                            <div className="flex items-center justify-between">
                                <h1 className="w-full text-lg sm:text-xl md:text-4xl lg:text-2xl font-light text-black">
                                    Time Contributing
                                </h1>
                            </div>

                            {/* Timer */}
                            <div className="flex flex-1 items-center justify-center py-4">
                                <h1 className="text-md sm:text-lg md:text-1xl lg:text-3xl font-extrabold tracking-tight text-black text-center">
                                    01:24:08
                                </h1>
                            </div>

                            {/* Project */}
                            <span className="text-center text-xs sm:text-sm lg:text-base font-light text-black/70">
                                Contributing on :
                                <span className="font-medium text-black ml-1">
                                    DeepFake
                                </span>
                            </span>

                            {/* Controls */}
                            <div className="mt-4 flex justify-center items-center gap-1">

                                {/* Play */}
                                <button className="flex h-9 w-9 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-black transition-all duration-300 hover:scale-105 hover:bg-black/5 active:scale-95">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3 sm:h-4 sm:w-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="#000"
                                            d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
                                        />
                                    </svg>

                                </button>

                                {/* Pause */}
                                <button className="flex h-9 w-9 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-black bg-base-100 transition-all duration-300 hover:scale-105 hover:bg-black active:scale-95">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3 sm:h-4 sm:w-4"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="white"
                                            d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2"
                                        />
                                    </svg>

                                </button>

                            </div>
                        </div>
                    </span>


                </div>


                {/* RIGHT SIDE DASHBOARD */}

                <div className="flex flex-col gap-2 w-full xl:w-3/4 mt-2.5">
                    <div className="lg:col-span-2 space-y-8">

                        {/* Stats Cards */}



                        {/* Projects Section */}
                        <div className={` relative overflow-y-auto   group transition-all duration-500 ease-in-out min-h-[400px] bg-base-100 border border-base-300 rounded-3xl p-3 shadow-xl`}>

                            <div className="flex flex-col justify-between items-start mb-2  ">
                                <h2 className="text-2xl flex gap-1 items-center font-bold text-secondary-content ml-1 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                        <rect width={8} height={10} x={13} y={11} fill="#fff" rx={1} ry={1}></rect>
                                        <rect width={8} height={6} x={3} y={15} fill="#fff" rx={1} ry={1}></rect>
                                        <rect width={8} height={6} x={13} y={3} fill="#fff" rx={1} ry={1}></rect>
                                        <rect width={8} height={10} x={3} y={3} fill="#fff" rx={1} ry={1}></rect>
                                    </svg>
                                    Project Dashboard</h2>
                                <div className='grid md:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-3  w-full  h-full mt-5'>

                                    {data.map((item, idx) => (
                                        <div key={idx} className="min-h-[250px]  flex p-3 w-full flex-col bg-white rounded-3xl border border-base-300">
                                            <div className="flex">
                                                <h1 className="text-3xl font-light w-3/4 text-black">
                                                    {item.title}
                                                </h1>

                                                <span className="h-fit p-2 border border-black w-auto ml-2 rounded-full mt-2" ><svg className="rotate-90" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 15 15">
                                                    <path fill="#000" d="M4.5 0h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .854.354L2.5 3.207l11.646 11.647l.708-.708L3.207 2.5L4.854.854A.5.5 0 0 0 4.5 0"></path>
                                                </svg></span>

                                            </div>

                                            <h1 className="text-4xl font-extrabold w-full  h-full flex items-center justi text-black">
                                                {item.count}
                                            </h1>

                                        </div>
                                    ))}




                                </div>

                                <div className="w-full md:flex-row flex-col  flex gap-3">
                                    <div className="max-h-[300px] overflow-y-auto scrollbar-none flex flex-col p-3 md:w-2/4 w-full  bg-white rounded-3xl border border-base-300 mt-3">

                                        <span className="w-full flex justify-between items-center" >
                                            <h1 className="text-3xl font-light w-3/4 text-black">
                                                Team Collabration
                                            </h1>

                                            <span className='flex   gap-2 h-fit border border-black  px-4 py-2  rounded-full justify-center items-center bg-white/20'>

                                                <button className="text-sm font-extrabold w-auto text-black">
                                                    + Team
                                                </button>
                                            </span>
                                        </span>

                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>Team Axonic</span>
                                                    <span className='text-sm font-light'> working on : GitHub Repository</span>
                                                </div>
                                                <span className='flex   gap-2 h-fit border border-black  px-2 py-1  rounded-xl justify-center items-center bg-white/20'>

                                                    <button className="text-xs font-light w-auto text-black">
                                                        Completed
                                                    </button>
                                                </span>

                                            </div>

                                        </div>
                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>Team Axonic</span>
                                                    <span className='text-sm font-light'> working on : GitHub Repository</span>
                                                </div>
                                                <span className='flex   gap-2 h-fit border border-black  px-2 py-1  rounded-xl justify-center items-center bg-white/20'>

                                                    <button className="text-xs font-light w-auto text-black">
                                                        Completed
                                                    </button>
                                                </span>

                                            </div>

                                        </div>
                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>Team Axonic</span>
                                                    <span className='text-sm font-light'> working on : GitHub Repository</span>
                                                </div>
                                                <span className='flex   gap-2 h-fit border border-black  px-2 py-1  rounded-xl justify-center items-center bg-white/20'>

                                                    <button className="text-xs font-light w-auto text-black">
                                                        Completed
                                                    </button>
                                                </span>

                                            </div>

                                        </div>
                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>Team Axonic</span>
                                                    <span className='text-sm font-light'> working on : GitHub Repository</span>
                                                </div>
                                                <span className='flex   gap-2 h-fit border border-black  px-2 py-1  rounded-xl justify-center items-center bg-white/20'>

                                                    <button className="text-xs font-light w-auto text-black">
                                                        Completed
                                                    </button>
                                                </span>

                                            </div>

                                        </div>
                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>Team Axonic</span>
                                                    <span className='text-sm font-light'> working on : GitHub Repository</span>
                                                </div>
                                                <span className='flex   gap-2 h-fit border border-black  px-2 py-1  rounded-xl justify-center items-center bg-white/20'>

                                                    <button className="text-xs font-light w-auto text-black">
                                                        Completed
                                                    </button>
                                                </span>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="max-h-[300px] overflow-y-auto scrollbar-none flex flex-col p-3 md:w-2/4 w-full  bg-white rounded-3xl border border-base-300 mt-3">

                                        <span className="w-full flex justify-between items-center" >
                                            <h1 className="text-3xl font-light w-3/4 text-black">
                                                Projects
                                            </h1>

                                            <span className='flex   gap-2 h-fit border border-black  px-2 py-2  rounded-full justify-center items-center bg-white/20'>

                                                <button className="text-sm  font-extrabold w-auto text-black">
                                                    + New
                                                </button>
                                            </span>
                                        </span>

                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>CodeSarthi</span>
                                                    <span className='text-xs font-light'>Due Date : Nov,26</span>
                                                </div>


                                            </div>

                                        </div>

                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>CodeSarthi</span>
                                                    <span className='text-xs font-light'>Due Date : Nov,26</span>
                                                </div>


                                            </div>

                                        </div>

                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>CodeSarthi</span>
                                                    <span className='text-xs font-light'>Due Date : Nov,26</span>
                                                </div>


                                            </div>

                                        </div>

                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>CodeSarthi</span>
                                                    <span className='text-xs font-light'>Due Date : Nov,26</span>
                                                </div>


                                            </div>

                                        </div>

                                        <div className="w-full mt-2 rounded-xl flex justify-start items-center text-black  bg-black/20">
                                            <img className='w-12 h-12 rounded-full' src="https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3e58387f7cb984dde9eb7_92.png" alt="" />

                                            <div className="flex p-2 justify-between items-center w-full">
                                                <div className="flex flex-col">
                                                    <span className='font-extrabold'>CodeSarthi</span>
                                                    <span className='text-xs font-light'>Due Date : Nov,26</span>
                                                </div>


                                            </div>

                                        </div>

                                    </div>



                                </div>
                            </div>



                        </div>



                    </div>
                    <div className="lg:col-span-2 space-y-8 ">

                        {/* Stats Cards */}



                        {/* Projects Section */}
                        <ShortPreview />



                    </div>
                </div>

            </div>
        </div >
    );



}


export default ProfileOther









