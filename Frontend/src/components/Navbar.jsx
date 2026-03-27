
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

import {
    Pages,
    NextPages,
    MarketPlace,
    ProfilePlace,
    SettingPlace,
    ByePlace
} from "./Navigations";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../Pages/auth/baseURL";
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


        <div data-theme="caramellatte" className="navbar h-[70px] bg-success  flex items-center justify-between rounded-b-2xl sm:rounded-b-3xl px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2">
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
                                className="absolute left-0 top-0 h-full w-[85%] sm:w-72 lg:w-80 bg-white/80 backdrop-blur-lg  z-50 rounded-r-xl"
                                role="dialog"
                                aria-modal="true"
                                aria-label="Navigation menu"
                            >
                                {/* Sidebar header */}
                                <div className="flex justify-between items-center p-3 border-b mb-5 pb-5 relative top-3 border-gray-200">
                                    <div className="top">
                                        <div className="flex items-center gap-2">


                                            <img src="../public/img/mainLogo.png" alt="" className="w-[40px] border rounded-full border-transparent" />

                                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">CodeSarthi</span>
                                        </div>

                                        <p className="pl-14 text-xs sm:text-xs sm:text-sm text-gray-800 mt-[-10px]">Empowering Dev Workflows</p>
                                    </div>

                                    <button
                                        className=" flex items-center justify-center  transition-colors duration-200"
                                        onClick={closeSidebar}
                                        aria-label="Close navigation menu"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 40 40">
                                            <g fill="none">
                                                <g stroke="#000" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#SVGw9scfcdR)" strokeWidth="1">
                                                    <path fill="#000" d="M19.02.5C8.8.5.515 8.784.515 19.003c0 10.547 9.918 20.465 20.465 20.465c10.219 0 18.503-8.285 18.503-18.504C39.484 10.418 29.566.5 19.019.5z" />
                                                    <path fill="#00fbff" d="M19.003 37.506c10.219 0 18.503-8.284 18.503-18.503S29.222.5 19.003.5S.5 8.784.5 19.003s8.284 18.503 18.503 18.503" />
                                                    <path fill="#fff" d="M28.568 24.136c-.152-.73-2.192-2.988-4.251-5.133c2.059-2.144 4.099-4.403 4.25-5.133c.437-.845-.597-2.002-1.508-2.923c-.91-.92-2.078-1.898-2.923-1.509c-.73.152-2.988 2.192-5.133 4.251C16.859 11.63 14.6 9.59 13.87 9.44c-.845-.437-2.002.597-2.913 1.508s-1.955 2.078-1.519 2.923c.152.73 2.192 2.989 4.251 5.133c-2.059 2.145-4.099 4.403-4.25 5.133c-.437.845.597 2.003 1.508 2.923s2.078 1.945 2.923 1.509c.73-.152 2.989-2.192 5.133-4.251c2.145 2.059 4.403 4.099 5.133 4.25c.845.437 2.003-.597 2.923-1.508c.92-.91 1.945-2.079 1.509-2.924" />
                                                </g>
                                                <defs>
                                                    <clipPath id="SVGw9scfcdR">
                                                        <path fill="#fff" d="M0 0h40v40H0z" />
                                                    </clipPath>
                                                </defs>
                                            </g>
                                        </svg>
                                    </button>
                                </div>

                                {/* Navigation links */}
                                <nav className="p-1 space-y-1 border-b mb-5  pb-5 border-gray-200">
                                    {Pages.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setActivePage(item.name); closeSidebar(); navigate(`/app/${item.path}`)
                                            }}
                                            className={`group relative flex items-center gap-3 py-2.5 px-4 w-full text-left   ${activePage === item.name
                                                ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/10 rounded-l-xl text-black "
                                                : "text-black hover:text-black hover:bg-white/5 rounded-l-xl"
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
                                <nav className="p-1 space-y-1 border-b mb-5 pb-5 border-gray-200">
                                    {NextPages.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActivePage(item.name); closeSidebar(); navigate(`/app/${item.path}`) }}
                                            className={`group relative flex items-center gap-3 py-2.5 px-4 w-full text-left   ${activePage === item.name ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/10 rounded-l-xl text-black " : "text-black hover:text-black hover:bg-white/5 rounded-l-xl"}`}
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
                                <nav className="p-1 space-y-1 border-b mb-5 pb-5 border-gray-200">
                                    {MarketPlace.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActivePage(item.name); closeSidebar(); navigate(`/app/${item.name}`) }}
                                            className={`group relative flex items-center gap-3 py-2.5 px-4 w-full text-left   ${activePage === item.name ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/10 rounded-l-xl text-black " : "text-black hover:text-black hover:bg-white/5 rounded-l-xl"}`}

                                        >

                                            <span className={`w-1 h-6 rounded-md transition-all duration-200 ${activePage === item.name ? "bg-green-500" : "bg-transparent "} `}></span>

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
                                    <span className="text-rotate text-3xl text-black ">
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


                <div className="logo flex justify-center items-center  border px-3 py-1 rounded-xl border-base-300 border-[3px] bg-base-100 " >

                    <button
                        className="Nav_svg border border-secondary p-[5px] h-8 w-8 sm:h-9 sm:w-9 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200 flex justify-center items-center"
                        onClick={openSidebar}
                        aria-label="Open navigation menu"

                    >
                        <div className="group cursor-pointer w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                    <path strokeDasharray={12} d="M3 9l3 3l-3 3">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="12;0"></animate>
                                    </path>
                                    <path strokeDasharray={16} strokeDashoffset={16} d="M5 5h14">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.3s" to={0}></animate>
                                    </path>
                                    <path strokeDasharray={12} strokeDashoffset={12} d="M10 12h9">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" to={0}></animate>
                                    </path>
                                    <path strokeDasharray={16} strokeDashoffset={16} d="M5 19h14">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.3s" to={0}></animate>
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} className="text-secondary " viewBox="0 0 12 24"><defs><path id="SVG1pzpbdYY" fill="currentColor" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"></path></defs><use fillRule="evenodd" href="#SVG1pzpbdYY" transform="rotate(-180 5.02 9.505)"></use></svg>
                    <div className="name font-semibold text-3xl ml-[-8px] text-secondary">
                        {activePage}
                    </div>
                </div>



            </div >
            {/* Right side - Profile button */}
            < div className="NavEnd relative flex justify-end w-[30%] items-center " >
                <div className="md:flex hidden"><Search height={45} displayType={"nav"} /></div>

                <button
                    onClick={openProfile}
                    className="h-14 rounded-full overflow-hidden bg-gradient-to-br from-gray-400 to-gray-100 cursor-pointer transition-all duration-300  hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 relative group"
                    aria-label="Open profile menu"
                >
                    <div className="h-full w-full rounded-full overflow-hidden border border-secondary border-[3px]">
                        <img
                            src={user.photoUrl.url}
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
                                className="absolute right-0 top-0  w-[85%] sm:w-72 lg:w-80 bg-white  rounded-xl z-50"
                                role="dialog"
                                aria-modal="true"
                                aria-label="Profile menu"
                            >
                                {/* Profile header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full overflow-hidden">
                                            <img
                                                src={user.photoUrl.url}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
                                            <p className="text-xs sm:text-sm text-gray-500">{user.gmail}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                        onClick={closeProfile}
                                        aria-label="Close profile menu"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                            <path fill="#000000" d="m8.707 8l3.646-3.646a.5.5 0 0 0-.707-.707L8 7.293L4.354 3.647a.5.5 0 0 0-.707.707L7.293 8l-3.646 3.646a.5.5 0 0 0 .708.707l3.646-3.646l3.646 3.646a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.707L8.709 8z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Profile menu */}
                                <nav className="p-1 space-y-1 border-b mb-5  pb-5 border-gray-200">
                                    {ProfilePlace.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActivePage(item.name); closeProfile(); navigate(`/app/${item.path}`) }}
                                            className={`flex items-center gap-3 py-2 px-3 sm:px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >


                                            <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                {item.icon}
                                            </span>
                                            <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                {item.name}
                                            </span>
                                        </button>
                                    ))}

                                </nav>
                                <nav className="p-1 space-y-1 border-b mb-5 pb-5 border-gray-200">
                                    {SettingPlace.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActivePage(item.name); closeProfile(); navigate(`/app/${item.path}`) }}
                                            className={`flex items-center gap-3 py-2 px-3 sm:px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >



                                            <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
                                                {item.icon}
                                            </span>
                                            <span className={`font-medium transition-all duration-200 ${activePage === item.name ? "font-semibold" : "font-normal"}`}>
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
                                            className={`flex items-center gap-3 py-2 px-3 sm:px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
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





    );
};

export default NavBar;

