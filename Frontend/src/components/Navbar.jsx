
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { matchPath, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Pages,
    NextPages,
    ProfilePlace,
    SettingPlace,
    ByePlace
} from "./Navigations";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import BASE_URL from "../Pages/auth/baseURL";
import Search from "./navSearch";
import { useLocation } from "react-router-dom";

const NavBar = ({ setSelectedChatUser, selectedChatUser }) => {
    const location = useLocation();




    const [showSidebar, setShowSidebar] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [open, setOpen] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");
    const sidebarRef = useRef(null);
    const sidebarOverlayRef = useRef(null);
    const profileRef = useRef(null);
    const profileOverlayRef = useRef(null);
    const user = useSelector((store) => store?.user?.user?.DATA);
    const navigate = useNavigate();

    // Sidebar functions
    const openSidebar = () => {
        setShowSidebar(true);
        // Animate in after render
        setTimeout(() => {
            if (sidebarRef.current && sidebarOverlayRef.current) {
                gsap.fromTo(sidebarRef.current,
                    { x: -320 },
                    { x: 0, duration: 0.3, ease: "power2.out" }
                );
                gsap.fromTo(sidebarOverlayRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.2, ease: "power2.out" }
                );
            }
        }, 0);
    };

    const closeSidebar = () => {
        if (!sidebarRef.current || !sidebarOverlayRef.current) {
            setShowSidebar(false);
            return;
        }
        const tl = gsap.timeline();
        tl.to(sidebarRef.current, {
            x: -320,
            duration: 0.3,
            ease: "power2.in"
        })
            .to(sidebarOverlayRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => setShowSidebar(false)
            }, 0);
    };

    // Profile functions
    const openProfile = () => {
        setShowProfile(true);
        // Animate in after render
        setTimeout(() => {
            if (profileRef.current && profileOverlayRef.current) {
                gsap.fromTo(profileRef.current,
                    { x: 320 },
                    { x: 0, duration: 0.3, ease: "power2.out" }
                );
                gsap.fromTo(profileOverlayRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.2, ease: "power2.out" }
                );
            }
        }, 0);
    };

    const closeProfile = () => {
        if (!profileRef.current || !profileOverlayRef.current) {
            setShowProfile(false);
            return;
        }
        const tl = gsap.timeline();
        tl.to(profileRef.current, {
            x: 320,
            duration: 0.3,
            ease: "power2.in"
        })
            .to(profileOverlayRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => setShowProfile(false)
            }, 0);
    };

    // Handle overlay clicks
    const handleSidebarOverlayClick = (e) => {
        if (e.target === sidebarOverlayRef.current) {
            closeSidebar();
        }
    };

    const handleProfileOverlayClick = (e) => {
        if (e.target === profileOverlayRef.current) {
            closeProfile();
        }
    };

    // Close modals on Escape key
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape") {
                if (showSidebar) closeSidebar();
                if (showProfile) closeProfile();
            }
        };

        document.addEventListener("keydown", handleEscKey);
        return () => document.removeEventListener("keydown", handleEscKey);
    }, [showSidebar, showProfile]);

    const dispatch = useDispatch();
    const userNav = useSelector(store => store.user);
    const handelLogout = async () => {

        try {
            if (!userNav) {
                console.warn("No user is currently logged in.");
                return;
            }

            else {
                const resLogout = await axios.post(`${BASE_URL}/auth/signout`, {}, { withCredentials: true });
                dispatch(removeUser());
            }
        }
        catch (err) { console.error("Logout failed:", err); }
    }
    const allPages = [
        ...Pages,
        ...NextPages,
        ...ProfilePlace,
        ...SettingPlace,
    ];

    const getActivePage = () => {
        const path = location.pathname;

        const matched = [...allPages]
            .sort((a, b) => b.path.length - a.path.length)
            .find((item) => {
                const fullPath = `/app${item.path}`;

                return (
                    path === fullPath ||
                    path.startsWith(`${fullPath}/`)
                );
            });

        return matched?.name || "Dashboard";
    };

    useEffect(() => {
        setActivePage(getActivePage());
    }, [location]);




    return (
        <div>
            <div data-theme="caramellatte" className=" relative z-40   bg-base-100 border border-secondary flex items-center justify-between rounded-b-xl px-1 sm:px-2 lg:px-4 py-1.5 h-full ">

                {/* Left side - Menu button */}
                <div className="NavStart flex justify-center items-center gap-2.5">

                    {/* Main sidebar modal */}
                    {
                        showSidebar && (
                            <div className="fixed inset-0 z-40">
                                {/* Overlay */}
                                <div
                                    ref={sidebarOverlayRef}
                                    className="absolute inset-0"
                                    onClick={handleSidebarOverlayClick}
                                />

                                {/* Sidebar */}
                                <div
                                    ref={sidebarRef}
                                    className="absolute left-0 top-0 h-full w-[85%] sm:w-72 lg:w-80 bg-base-100    z-50 rounded-r-3xl border border-secondary"
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label="Navigation menu"
                                >
                                    {/* Sidebar header */}
                                    <div className="flex justify-between items-center p-3 border-b mb-5 pb-5 relative top-3 border-secondary" >
                                        <div className="top flex gap-3">
                                            <div className="flex items-center gap-2">


                                                <img src="https://res.cloudinary.com/dggoaxqxl/image/upload/v1776693732/image_wxefat.png" onClick={() => navigate("/app/dashboard")} alt="" className="w-[50px] border rounded-full border-transparent cursor-pointer " />


                                            </div>
                                            <div className='flex flex-col items-start gap-2'>
                                                <span className="text-md sm:text-lg lg:text-xl font-bold text-info">CodeSarthi</span>
                                                <p className=" text-xs sm:text-sm text-gray-500 mt-[-10px]">Empowering Dev Workflows</p>
                                            </div>
                                        </div>

                                        <button
                                            className=" flex items-center justify-center transition-colors duration-200"
                                            onClick={closeSidebar}
                                            aria-label="Close navigation menu"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 hover:rotate-90" width="3em" height="3em" viewBox="0 0 24 24">
                                                <defs>
                                                    <mask id="SVGi3NDrbmQ">
                                                        <g fill="none" strokeWidth={1.2}>

                                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="m16 8l-8 8m0-8l8 8"></path>
                                                        </g>
                                                    </mask>
                                                </defs>
                                                <path fill="#ffffff" d="M0 0h24v24H0z" mask="url(#SVGi3NDrbmQ)"></path>
                                            </svg>

                                        </button>
                                    </div>

                                    {/* Navigation links */}
                                    <nav className="p-1 space-y-1 border-b mb-5  pb-5 border-secondary">
                                        {Pages.map((item, index) => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    setActivePage(item.name); closeSidebar(); navigate(`/app/${item.path}`)
                                                }}
                                                className={`group relative flex items-center gap-3 py-2.5 px-4 w-full text-left   ${activePage === item.name
                                                    ? "bg-gradient-to-r from-gray-600/20 to-gray-500/10 rounded-l-xl text-white "
                                                    : "text-white hover:text-white hover:bg-white/5 rounded-l-xl"
                                                    }
`}

                                            >

                                                <span className={`w-1 h-6 rounded-md transition-all duration-200 ${activePage === item.name ? "bg-blue-700" : "bg-transparent "} `}></span>

                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                    {item.icon}
                                                </span>
                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                    {item.name}
                                                </span>
                                            </button>
                                        ))}

                                    </nav>
                                    <nav className="p-1 space-y-1 border-b mb-5 pb-5 border-secondary">
                                        {NextPages.map((item, index) => (
                                            <button
                                                key={item.id}
                                                onClick={() => { setActivePage(item.name); closeSidebar(); navigate(`/app/${item.path}`) }}
                                                className={`group relative flex items-center gap-3 py-2.5 px-4 w-full text-left   ${activePage === item.name ? "bg-gradient-to-r from-gray-600/20 to-gray-500/10 rounded-l-xl text-white " : "text-white hover:text-white hover:bg-white/5 rounded-l-xl"}`}
                                            >

                                                <span className={`w-1 h-6 rounded-md transition-all duration-200 ${activePage === item.name ? "bg-pink-400" : "bg-transparent "} `}></span>

                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                    {item.icon}
                                                </span>
                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                    {item.name}
                                                </span>
                                            </button>
                                        ))}

                                    </nav>



                                </div>
                            </div>
                        )
                    }


                    <div className="logo flex  sm:h-auto h-[42px] justify-center items-center  border px-3 py-1 rounded-xl border-base-300  bg-white group" >

                        <button
                            className="Nav_svg border border-secondary p-[5px] h-6 w-6 rounded cursor-pointer  bg-black transition-colors duration-200 flex justify-center items-center"
                            onClick={openSidebar}
                            aria-label="Open navigation menu"

                        >
                            <div className="group cursor-pointer w-fit ">



                                <svg className="h-4 sm:h-5 w-4 sm:w-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M2 6.21c0-1.984 0-2.977.659-3.593S4.379 2 6.5 2s3.182 0 3.841.617C11 3.233 11 4.226 11 6.21v11.58c0 1.984 0 2.977-.659 3.593S8.621 22 6.5 22s-3.182 0-3.841-.617C2 20.767 2 19.774 2 17.79z" opacity={0.5}></path>
                                    <path fill="currentColor" d="M13 15.4c0-2.074 0-3.111.659-3.756S15.379 11 17.5 11s3.182 0 3.841.644C22 12.29 22 13.326 22 15.4v2.2c0 2.074 0 3.111-.659 3.756S19.621 22 17.5 22s-3.182 0-3.841-.644C13 20.71 13 19.674 13 17.6zm0-9.9c0-1.087 0-1.63.171-2.06a2.3 2.3 0 0 1 1.218-1.262C14.802 2 15.327 2 16.375 2h2.25c1.048 0 1.573 0 1.986.178c.551.236.99.69 1.218 1.262c.171.43.171.973.171 2.06s0 1.63-.171 2.06a2.3 2.3 0 0 1-1.218 1.262C20.198 9 19.673 9 18.625 9h-2.25c-1.048 0-1.573 0-1.986-.178a2.3 2.3 0 0 1-1.218-1.262C13 7.13 13 6.587 13 5.5"></path>
                                </svg>

                            </div>
                        </button>
                        <svg className="h-6 sm:h-10 w-6  sm:w-10 mr-1 sm:mr-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 24"><defs><path id="SVG1pzpbdYY" fill="#000" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"></path></defs><use fillRule="evenodd" href="#SVG1pzpbdYY" transform="rotate(-180 5.02 9.505)"></use></svg>
                        <div className="name font-semibold text-md sm:text-xl ml-[-8px] text-black relative w-fit after:absolute after:left-0 after:bottom-0 
after:h-[2px] after:w-0 after:bg-black after:transition-all decoration-[3px]
group-hover:after:w-full font-bold font-poppins">
                            {activePage}
                        </div>
                    </div>



                </div >



                {/* Right side - Profile button */}
                < div className="NavEnd relative flex gap-1 min-[430px]:gap-2 sm:gap-3 justify-center items-center w-auto " >
                    <div className="md:flex hidden">
                        <Search height={35} displayType={"nav"} />
                    </div>

                    {activePage === "Discussions" && selectedChatUser?.info && < div onClick={() => setSelectedChatUser({ info: null })} className="relative md:hidden flex  items-center bg-[#212121] p-2 rounded-full justify-center text-white/50 hover:text-[#fff] transition-all duration-300">
                        <svg className="rotate-[270deg]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80">
                            <g fill="none">
                                <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path>
                            </g>
                        </svg>
                    </div>}
                    {(activePage !== "Discussions" || !selectedChatUser?.info) && (
                        <button
                            onClick={openProfile}
                            className="h-10 rounded-full overflow-hidden bg-black cursor-pointer transition-all duration-300  relative group"
                            aria-label="Open profile menu"
                        >
                            <div className="h-full w-full rounded-full overflow-hidden  ">
                                <img
                                    src={user?.photoUrl?.url}
                                    alt="Profile"
                                    className="h-full w-full object-cover transition-all duration-500   "
                                />
                            </div>

                        </button>

                    )}


                    {activePage === "Discussions" && selectedChatUser.info !== null && (

                        <div className="bg-white/10 h-full flex gap-1 rounded-full p-1">
                            <button
                                onClick={() => setSelectedChatUser({ ...selectedChatUser, isOpenTab: true })}
                                className={`h-10 rounded-full overflow-hidden bg-black cursor-pointer transition-all duration-300 border-2  ${selectedChatUser?.info?.type === 'saved_messages' ? "border-zinc-500" : selectedChatUser?.info?.isOnline ? "border-green-500" : "border-red-500"} relative group`}
                                aria-label="Open profile menu"
                            >
                                <div className="h-full w-full rounded-full overflow-hidden  ">
                                    <img
                                        src={selectedChatUser?.info?.photoUrl?.url || user?.photoUrl?.url}
                                        alt="Profile"
                                        className="h-full w-full object-cover transition-all duration-500   "
                                    />
                                </div>

                            </button>

                            <span className="h-10 flex items-center animate-pulse ">
                                <svg className="rotate-[270deg] w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1a2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1"></path>
                                </svg>
                                <svg className="rotate-[270deg] w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1a2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1"></path>
                                </svg>
                                <svg className="rotate-[270deg] w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1a2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1"></path>
                                </svg>
                            </span>

                            <button
                                onClick={openProfile}
                                className="h-10 rounded-full overflow-hidden bg-black cursor-pointer transition-all duration-300  relative group border-2 border-green-500"
                                aria-label="Open profile menu"
                            >
                                <div className="h-full w-full rounded-full overflow-hidden  ">
                                    <img
                                        src={user?.photoUrl?.url}
                                        alt="Profile"
                                        className="h-full w-full object-cover transition-all duration-500   "
                                    />
                                </div>

                            </button>
                        </div>
                    )}

                    {/* Profile modal */}
                    {
                        showProfile && (
                            <div className="fixed inset-0 z-50">
                                {/* Overlay */}
                                <div
                                    ref={profileOverlayRef}
                                    className="absolute inset-0  "
                                    onClick={handleProfileOverlayClick}
                                />

                                {/* Profile sidebar */}
                                <div
                                    ref={profileRef}
                                    className="absolute right-0 top-0   bg-base-100   rounded-l-3xl border border-secondary z-50"
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label="Profile menu"
                                >
                                    {/* Profile header */}
                                    <div className="flex items-center justify-between p-6 border-b border-secondary">
                                        <div className="flex items-center gap-3">
                                            <div className="h-[55px] w-[55px] rounded-full overflow-hidden border-secondary border-[2px]">
                                                <img
                                                    src={user?.photoUrl?.url}
                                                    alt="Profile"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{user.firstName} {user.lastName}</h3>
                                                <p className="text-xs sm:text-sm text-info">{user.gmail}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="w-[45px] h-[45px] ml-5 flex items-center justify-centerhover:bg-gray-100 transition-colors duration-200"
                                            onClick={closeProfile}
                                            aria-label="Close profile menu"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[100%] w-[100%] transition-transform duration-300 hover:rotate-90" viewBox="0 0 24 24">
                                                <defs>
                                                    <mask id="SVGi3NDrbmQ">
                                                        <g fill="#fff" strokeWidth={1.2}>

                                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="m16 8l-8 8m0-8l8 8"></path>
                                                        </g>
                                                    </mask>
                                                </defs>
                                                <path fill="#fff" d="M0 0h24v24H0z" mask="url(#SVGi3NDrbmQ)"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Profile menu */}
                                    <nav className="p-1 space-y-1 border-b mb-5  pb-5 border-secondary">
                                        {ProfilePlace.map((item, index) => (
                                            <button
                                                key={item.id}
                                                onClick={() => { setActivePage(item.name); closeProfile(); navigate(`/app/${item.path}`) }}
                                                className={`flex items-center gap-3 py-2 px-3 sm:px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-white/20 text-white" : "text-white hover:bg-white/20 hover:text-white"}`}
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >


                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold  text-white" : "font-normal"}`}>
                                                    {item.icon}
                                                </span>
                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold  text-white" : "font-normal"}`}>
                                                    {item.name}
                                                </span>
                                            </button>
                                        ))}

                                    </nav>
                                    <nav className="p-1 space-y-1 border-b mb-5 pb-5 border-secondary">
                                        {SettingPlace.map((item, index) => (
                                            <button
                                                key={item.id}
                                                onClick={() => { setActivePage(item.name); closeProfile(); navigate(`/app/${item.path}`) }}
                                                className={`flex items-center gap-3 py-2 px-3 sm:px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "font-semibold bg-white/20 text-white" : "text-white hover:bg-white/20 hover:text-white"}`}
                                                style={{ animationDelay: `${index * 0.05}s` }}
                                            >



                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold  text-white" : "font-normal"}`}>
                                                    {item.icon}
                                                </span>
                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold  text-white" : "font-normal"}`}>
                                                    {item.name}
                                                </span>
                                            </button>
                                        ))}

                                    </nav>
                                    <nav className="p-1 space-y-1  pb-5">
                                        {ByePlace.map((item, index) => (
                                            <button
                                                key={item.id}
                                                onClick={() => { setActivePage(item.name); closeProfile(); handelLogout(); navigate(`/login`) }}
                                                className={`flex items-center gap-3 py-2 px-3 sm:px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-white/20 text-white" : "text-white hover:bg-red-800/20 hover:text-white"}`}
                                                style={{ animationDelay: `${index * 0.05}s` }}

                                            >

                                                <span className={`w-1 h-8 rounded-md transition-all duration-200 ${activePage === item.name ? "bg-red-700" : "bg-transparent "} `}></span>

                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                    {item.icon}
                                                </span>
                                                <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                    {item.name}
                                                </span>
                                            </button>
                                        ))}

                                    </nav>

                                </div>
                            </div>
                        )
                    }
                </div >






            </div >




        </div >

    );
};

export default NavBar;

