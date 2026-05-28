
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
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

const NavBar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [open, setOpen] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");
    const sidebarRef = useRef(null);
    const sidebarOverlayRef = useRef(null);
    const profileRef = useRef(null);
    const profileOverlayRef = useRef(null);
    const user = useSelector((store) => store.user.user.DATA);
    const navigate = useNavigate();

    // Sidebar functions
    const openSidebar = () => {
        setShowSidebar(true);
        // Animate in
        gsap.fromTo(sidebarRef.current,
            { x: -320 },
            { x: 0, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(sidebarOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "power2.out" }
        );
    };

    const closeSidebar = () => {
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
        // Animate in
        gsap.fromTo(profileRef.current,
            { x: 320 },
            { x: 0, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(profileOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "power2.out" }
        );
    };

    const closeProfile = () => {
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




    return (
        <div>
            <div data-theme="caramellatte" className=" relative z-40 navbar h-[70px] bg-base-100 border border-secondary flex items-center justify-between rounded-b-2xl sm:rounded-b-3xl px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2  ">

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
                                                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-info">CodeSarthi</span>
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



                                    {/* Footer section */}
                                    <div className=" bottom-0 left-0 right-0 p-3">
                                        <span className="text-rotate text-3xl text-white ">
                                            <span className="justify-items-center">
                                                <span>COLLAB</span>
                                                <span>CODE</span>
                                                <span>DEVELOP</span>
                                                <span>DEPLOY</span>
                                                <span>SCALE</span>
                                                <span>CodeSarthi</span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                    <div className="logo flex justify-center items-center  border px-3 py-1 rounded-xl border-base-300  bg-white group" >

                        <button
                            className="Nav_svg border border-secondary p-[5px] h-8 w-8 sm:h-9 sm:w-9 rounded cursor-pointer  bg-black transition-colors duration-200 flex justify-center items-center"
                            onClick={openSidebar}
                            aria-label="Open navigation menu"

                        >
                            <div className="group cursor-pointer w-fit ">



                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M2 6.21c0-1.984 0-2.977.659-3.593S4.379 2 6.5 2s3.182 0 3.841.617C11 3.233 11 4.226 11 6.21v11.58c0 1.984 0 2.977-.659 3.593S8.621 22 6.5 22s-3.182 0-3.841-.617C2 20.767 2 19.774 2 17.79z" opacity={0.5}></path>
                                    <path fill="currentColor" d="M13 15.4c0-2.074 0-3.111.659-3.756S15.379 11 17.5 11s3.182 0 3.841.644C22 12.29 22 13.326 22 15.4v2.2c0 2.074 0 3.111-.659 3.756S19.621 22 17.5 22s-3.182 0-3.841-.644C13 20.71 13 19.674 13 17.6zm0-9.9c0-1.087 0-1.63.171-2.06a2.3 2.3 0 0 1 1.218-1.262C14.802 2 15.327 2 16.375 2h2.25c1.048 0 1.573 0 1.986.178c.551.236.99.69 1.218 1.262c.171.43.171.973.171 2.06s0 1.63-.171 2.06a2.3 2.3 0 0 1-1.218 1.262C20.198 9 19.673 9 18.625 9h-2.25c-1.048 0-1.573 0-1.986-.178a2.3 2.3 0 0 1-1.218-1.262C13 7.13 13 6.587 13 5.5"></path>
                                </svg>

                            </div>
                        </button>
                        <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} className="text-info " viewBox="0 0 12 24"><defs><path id="SVG1pzpbdYY" fill="#000" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"></path></defs><use fillRule="evenodd" href="#SVG1pzpbdYY" transform="rotate(-180 5.02 9.505)"></use></svg>
                        <div className="name font-semibold text-3xl ml-[-8px] text-black relative w-fit after:absolute after:left-0 after:bottom-0 
after:h-[2px] after:w-0 after:bg-black after:transition-all decoration-[3px]
group-hover:after:w-full">
                            {activePage}
                        </div>
                    </div>



                </div >
                {/* Right side - Profile button */}
                < div className="NavEnd relative flex justify-end  items-center " >
                    <div className="md:flex hidden"><Search height={45} displayType={"nav"} /></div>

                    <button
                        onClick={openProfile}
                        className="h-14 rounded-full overflow-hidden bg-gradient-to-br from-gray-400 to-gray-100 cursor-pointer transition-all duration-300  relative group"
                        aria-label="Open profile menu"
                    >
                        <div className="h-full w-full rounded-full overflow-hidden  border-info border-[3px]">
                            <img
                                src={user?.photoUrl?.url}
                                alt="Profile"
                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:brightness-110 group-active:scale-100"
                            />
                        </div>

                    </button>

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


                <div className="h-[1.5px] absolute w-[97%]       left-1/2  -translate-x-1/2 bg-white/50 bottom-0 rounded-full "></div>



            </div >


            <div
                className=" absolute top-10 left-1/2 -translate-x-1/2 w-full h-[50px] bg-white/20 blur-3xl rounded-full pointer-events-none "
            />

        </div>

    );
};

export default NavBar;

