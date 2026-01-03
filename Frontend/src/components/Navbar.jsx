
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

import {
    Pages,
    NextPages,
    MarketPlace,
    AboutPlace,
    ProfilePlace,
    SettingPlace,
    ByePlace
} from "./Navigations";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../Pages/auth/baseURL";

const NavBar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");
    const sidebarRef = useRef(null);
    const sidebarOverlayRef = useRef(null);
    const profileRef = useRef(null);
    const profileOverlayRef = useRef(null);
    const user = useSelector((store) => store.user);
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
                const resLogout = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
                dispatch(removeUser());
            }
        }
        catch (err) { console.error("Logout failed:", err); }
    }

    return (


        <div className="navbar bg-gray-100 shadow-sm flex items-center justify-between ">



            {/* Left side - Menu button */}
            <div className="NavStart flex justify-center items-center gap-2.5">
                <button
                    className="Nav_svg border border-gray-400 p-[5px] h-[32px] w-[32px] rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                    onClick={openSidebar}
                    aria-label="Open navigation menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                        <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2">
                            <path d="M7.94971 11.9497H39.9497" />
                            <path d="M7.94971 23.9497H39.9497" />
                            <path d="M7.94971 35.9497H39.9497" />
                        </g>
                    </svg>
                </button>
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
                                className="absolute left-0 top-0 h-full w-80 bg-white/20 backdrop-blur-lg shadow-xl z-50 rounded-r-xl"
                                role="dialog"
                                aria-modal="true"
                                aria-label="Navigation menu"
                            >
                                {/* Sidebar header */}
                                <div className="flex justify-between items-center p-3 border-b mb-5 pb-5 relative top-3 border-gray-200">
                                    <div className="top">
                                        <div className="flex items-center gap-2">


                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className="border rounded-full border-transparent"
                                                width="45" height="45" viewBox="0 0 711.000000 711.000000"
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,711.000000) scale(0.100000,-0.100000)"
                                                    fill="#000000" stroke="none">
                                                    <path d="M0 3555 l0 -3555 3555 0 3555 0 0 3555 0 3555 -3555 0 -3555 0 0
-3555z m1996 2104 c45 -21 84 -81 84 -127 0 -39 -27 -89 -64 -118 l-36 -29 0
-361 c0 -328 -2 -368 -21 -450 -26 -117 -37 -383 -19 -520 6 -53 14 -103 17
-111 4 -9 -4 -13 -28 -13 -86 0 -162 46 -205 123 -29 52 -29 52 -29 232 0 150
3 188 18 227 22 56 81 112 136 129 l41 12 0 368 0 367 -34 21 c-93 58 -85 197
14 249 54 27 72 28 126 1z m3084 -9 c81 -57 78 -182 -5 -239 l-35 -24 0 -363
0 -363 55 -26 c115 -55 145 -126 145 -345 0 -161 -11 -219 -54 -274 -34 -45
-117 -86 -174 -86 -41 0 -44 2 -39 23 33 134 32 442 -3 607 -18 85 -20 135
-20 460 l0 365 -36 29 c-37 29 -64 79 -64 118 0 12 10 42 21 66 38 78 138 103
209 52z m-2592 -71 c34 -11 86 -30 115 -43 59 -26 240 -137 273 -167 21 -20
22 -19 145 5 296 60 649 56 941 -10 l68 -16 38 30 c149 118 376 222 493 226
58 1 74 -14 103 -93 45 -126 60 -361 32 -491 l-12 -55 44 -62 c55 -79 107
-198 139 -321 35 -132 43 -392 19 -562 -21 -140 -76 -309 -137 -415 -140 -248
-425 -409 -832 -471 -137 -21 -609 -30 -759 -15 -349 36 -591 115 -773 254
-235 179 -358 485 -358 887 1 274 60 482 186 655 l33 47 -14 66 c-30 144 -2
426 54 534 27 52 76 56 202 17z m2998 -1904 c12 -18 2 -55 -86 -315 -109 -324
-122 -348 -170 -300 -15 15 -19 27 -14 48 9 36 191 569 199 583 11 16 56 6 71
-16z m-348 -87 c25 -25 11 -54 -70 -135 l-83 -83 84 -84 c73 -73 83 -87 77
-110 -4 -17 -16 -28 -32 -32 -23 -6 -39 6 -135 102 -60 60 -109 117 -109 127
0 9 47 65 104 122 104 106 134 123 164 93z m594 -95 c60 -59 108 -114 108
-122 0 -23 -211 -231 -235 -231 -28 0 -45 18 -45 49 0 19 21 46 83 103 l82 77
-82 83 c-82 82 -96 111 -71 136 27 27 54 10 160 -95z m-3923 -148 c62 -22 92
-47 130 -109 l33 -55 -32 -41 c-38 -48 -170 -154 -239 -193 l-50 -27 -40 67
c-22 38 -45 88 -51 113 -28 107 32 218 136 250 43 13 67 12 113 -5z m256 -286
c16 -22 50 -59 77 -82 l48 -42 -34 -79 c-39 -87 -87 -171 -127 -219 -23 -28
-29 -30 -50 -20 -45 20 -184 131 -226 181 l-41 48 88 58 c48 32 118 89 156
127 38 38 71 69 75 69 3 0 19 -18 34 -41z m1125 -40 c150 -13 557 -6 680 11
l75 11 34 -38 c108 -123 151 -234 159 -421 18 -441 -159 -886 -425 -1065 -90
-61 -161 -80 -274 -75 -77 4 -97 9 -166 43 -283 139 -483 580 -483 1066 0 178
52 333 147 439 43 48 49 52 82 46 20 -3 97 -11 171 -17z m1964 -50 c62 -44
118 -49 189 -15 69 32 71 32 96 0 27 -35 28 -104 1 -158 -11 -23 -47 -68 -81
-101 l-61 -60 -65 70 c-74 80 -143 172 -169 228 -17 36 -17 37 2 52 27 21 38
19 88 -16z m-158 -101 c26 -50 90 -135 164 -218 l68 -76 -58 -37 c-56 -36
-195 -98 -252 -112 -25 -6 -29 -2 -56 52 -37 73 -59 148 -70 241 l-9 73 50 25
c27 14 67 39 90 55 22 16 44 29 48 29 5 0 16 -15 25 -32z m-2631 -13 l80 -26
-6 -97 c-7 -93 -32 -239 -44 -250 -13 -14 -282 52 -304 73 -2 2 18 35 43 74
46 69 126 228 126 251 0 6 6 9 13 6 6 -2 48 -17 92 -31z m1911 -34 c38 -16 84
-32 101 -36 18 -3 35 -10 37 -13 2 -4 -2 -43 -10 -87 -7 -44 -13 -122 -13
-173 l-1 -92 -27 6 c-16 4 -48 15 -73 24 l-45 18 -7 108 c-4 60 -16 145 -27
188 -12 44 -21 81 -21 83 0 8 22 1 86 -26z m-1559 -53 c-10 -40 -21 -121 -24
-179 l-6 -107 -45 -6 c-25 -3 -69 -6 -99 -6 l-55 0 7 28 c17 66 34 182 35 234
0 78 5 88 49 89 20 0 54 4 76 8 22 5 49 9 61 10 l20 1 -19 -72z m1991 -95 c6
-45 27 -123 46 -174 19 -51 32 -97 30 -101 -6 -9 -212 -11 -266 -2 l-38 7 0
96 c0 86 12 197 26 243 4 14 20 18 92 20 48 2 90 1 93 -2 3 -3 11 -42 17 -87z"/>
                                                    <path d="M3175 4809 c-133 -12 -316 -45 -391 -70 -203 -66 -364 -242 -425
-464 -28 -104 -23 -285 10 -385 70 -204 238 -370 441 -434 294 -93 929 -100
1265 -15 226 58 407 224 482 441 34 99 43 264 19 370 -32 143 -124 294 -228
374 -123 95 -219 131 -436 165 -158 24 -567 34 -737 18z m-169 -469 c85 -42
154 -149 154 -240 0 -86 -65 -191 -144 -233 -64 -34 -175 -31 -238 5 -124 73
-171 225 -108 348 24 47 98 113 142 127 57 19 147 15 194 -7z m1132 -4 c65
-33 117 -93 136 -157 20 -67 20 -94 0 -157 -21 -64 -62 -114 -122 -150 -63
-36 -174 -39 -238 -5 -124 66 -177 229 -115 350 23 46 89 109 135 129 52 22
149 18 204 -10z"/>
                                                </g>
                                            </svg>

                                            <span className="text-2xl font-bold text-gray-800">CodeSarthi</span>
                                        </div>

                                        <p className="pl-10 text-sm">Empowering Dev Workflows</p>
                                    </div>

                                    <button
                                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                        onClick={closeSidebar}
                                        aria-label="Close navigation menu"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                            <path fill="currentColor" d="m8.707 8l3.646-3.646a.5.5 0 0 0-.707-.707L8 7.293L4.354 3.647a.5.5 0 0 0-.707.707L7.293 8l-3.646 3.646a.5.5 0 0 0 .708.707l3.646-3.646l3.646 3.646a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.707L8.709 8z" />
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
                                            className={`flex items-center gap-3 py-1 px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
                                            style={{ animationDelay: `${index * 0.05}s` }}
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
                                            className={`flex items-center gap-3 py-1 px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
                                            style={{ animationDelay: `${index * 0.05}s` }}
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
                                            className={`flex items-center gap-3 py-1 px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
                                            style={{ animationDelay: `${index * 0.05}s` }}

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
                                <nav className="p-1 space-y-1 border-b pb-5  mb-5 border-gray-200">
                                    {AboutPlace.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActivePage(item.name); closeSidebar(); navigate(`/app/${item.path}`) }}
                                            className={`flex items-center gap-3 py-1 px-4 w-full text-left rounded-lg transition-all duration-200  ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            <span className={`w-1 h-6 rounded-md transition-all duration-200 ${activePage === item.name ? "bg-orange-500" : "bg-transparent "} `}></span>

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
                                    <div className="text-center text-gray-500 text-sm">
                                        <p>© {new Date().getFullYear()} CodeSarthi™ — All rights reserved.</p>
                                        <p className="mt-1">Dhanyavaad 🌸</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }


                <div className="logo flex justify-center items-center gap-4">
                    <button onClick={() => { navigate("/app"), setActivePage("Dashboard") }} className="h-[50px] w-[50px] rounded-full overflow-hidden bg-gradient-to-br from-gray-400 to-gray-100 cursor-pointer transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-center items-center">



                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="50px" height="50px" viewBox="0 0 711.000000 711.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,711.000000) scale(0.100000,-0.100000)"
                                fill="#000000" stroke="none">
                                <path d="M0 3555 l0 -3555 3555 0 3555 0 0 3555 0 3555 -3555 0 -3555 0 0
-3555z m1996 2104 c45 -21 84 -81 84 -127 0 -39 -27 -89 -64 -118 l-36 -29 0
-361 c0 -328 -2 -368 -21 -450 -26 -117 -37 -383 -19 -520 6 -53 14 -103 17
-111 4 -9 -4 -13 -28 -13 -86 0 -162 46 -205 123 -29 52 -29 52 -29 232 0 150
3 188 18 227 22 56 81 112 136 129 l41 12 0 368 0 367 -34 21 c-93 58 -85 197
14 249 54 27 72 28 126 1z m3084 -9 c81 -57 78 -182 -5 -239 l-35 -24 0 -363
0 -363 55 -26 c115 -55 145 -126 145 -345 0 -161 -11 -219 -54 -274 -34 -45
-117 -86 -174 -86 -41 0 -44 2 -39 23 33 134 32 442 -3 607 -18 85 -20 135
-20 460 l0 365 -36 29 c-37 29 -64 79 -64 118 0 12 10 42 21 66 38 78 138 103
209 52z m-2592 -71 c34 -11 86 -30 115 -43 59 -26 240 -137 273 -167 21 -20
22 -19 145 5 296 60 649 56 941 -10 l68 -16 38 30 c149 118 376 222 493 226
58 1 74 -14 103 -93 45 -126 60 -361 32 -491 l-12 -55 44 -62 c55 -79 107
-198 139 -321 35 -132 43 -392 19 -562 -21 -140 -76 -309 -137 -415 -140 -248
-425 -409 -832 -471 -137 -21 -609 -30 -759 -15 -349 36 -591 115 -773 254
-235 179 -358 485 -358 887 1 274 60 482 186 655 l33 47 -14 66 c-30 144 -2
426 54 534 27 52 76 56 202 17z m2998 -1904 c12 -18 2 -55 -86 -315 -109 -324
-122 -348 -170 -300 -15 15 -19 27 -14 48 9 36 191 569 199 583 11 16 56 6 71
-16z m-348 -87 c25 -25 11 -54 -70 -135 l-83 -83 84 -84 c73 -73 83 -87 77
-110 -4 -17 -16 -28 -32 -32 -23 -6 -39 6 -135 102 -60 60 -109 117 -109 127
0 9 47 65 104 122 104 106 134 123 164 93z m594 -95 c60 -59 108 -114 108
-122 0 -23 -211 -231 -235 -231 -28 0 -45 18 -45 49 0 19 21 46 83 103 l82 77
-82 83 c-82 82 -96 111 -71 136 27 27 54 10 160 -95z m-3923 -148 c62 -22 92
-47 130 -109 l33 -55 -32 -41 c-38 -48 -170 -154 -239 -193 l-50 -27 -40 67
c-22 38 -45 88 -51 113 -28 107 32 218 136 250 43 13 67 12 113 -5z m256 -286
c16 -22 50 -59 77 -82 l48 -42 -34 -79 c-39 -87 -87 -171 -127 -219 -23 -28
-29 -30 -50 -20 -45 20 -184 131 -226 181 l-41 48 88 58 c48 32 118 89 156
127 38 38 71 69 75 69 3 0 19 -18 34 -41z m1125 -40 c150 -13 557 -6 680 11
l75 11 34 -38 c108 -123 151 -234 159 -421 18 -441 -159 -886 -425 -1065 -90
-61 -161 -80 -274 -75 -77 4 -97 9 -166 43 -283 139 -483 580 -483 1066 0 178
52 333 147 439 43 48 49 52 82 46 20 -3 97 -11 171 -17z m1964 -50 c62 -44
118 -49 189 -15 69 32 71 32 96 0 27 -35 28 -104 1 -158 -11 -23 -47 -68 -81
-101 l-61 -60 -65 70 c-74 80 -143 172 -169 228 -17 36 -17 37 2 52 27 21 38
19 88 -16z m-158 -101 c26 -50 90 -135 164 -218 l68 -76 -58 -37 c-56 -36
-195 -98 -252 -112 -25 -6 -29 -2 -56 52 -37 73 -59 148 -70 241 l-9 73 50 25
c27 14 67 39 90 55 22 16 44 29 48 29 5 0 16 -15 25 -32z m-2631 -13 l80 -26
-6 -97 c-7 -93 -32 -239 -44 -250 -13 -14 -282 52 -304 73 -2 2 18 35 43 74
46 69 126 228 126 251 0 6 6 9 13 6 6 -2 48 -17 92 -31z m1911 -34 c38 -16 84
-32 101 -36 18 -3 35 -10 37 -13 2 -4 -2 -43 -10 -87 -7 -44 -13 -122 -13
-173 l-1 -92 -27 6 c-16 4 -48 15 -73 24 l-45 18 -7 108 c-4 60 -16 145 -27
188 -12 44 -21 81 -21 83 0 8 22 1 86 -26z m-1559 -53 c-10 -40 -21 -121 -24
-179 l-6 -107 -45 -6 c-25 -3 -69 -6 -99 -6 l-55 0 7 28 c17 66 34 182 35 234
0 78 5 88 49 89 20 0 54 4 76 8 22 5 49 9 61 10 l20 1 -19 -72z m1991 -95 c6
-45 27 -123 46 -174 19 -51 32 -97 30 -101 -6 -9 -212 -11 -266 -2 l-38 7 0
96 c0 86 12 197 26 243 4 14 20 18 92 20 48 2 90 1 93 -2 3 -3 11 -42 17 -87z"/>
                                <path d="M3175 4809 c-133 -12 -316 -45 -391 -70 -203 -66 -364 -242 -425
-464 -28 -104 -23 -285 10 -385 70 -204 238 -370 441 -434 294 -93 929 -100
1265 -15 226 58 407 224 482 441 34 99 43 264 19 370 -32 143 -124 294 -228
374 -123 95 -219 131 -436 165 -158 24 -567 34 -737 18z m-169 -469 c85 -42
154 -149 154 -240 0 -86 -65 -191 -144 -233 -64 -34 -175 -31 -238 5 -124 73
-171 225 -108 348 24 47 98 113 142 127 57 19 147 15 194 -7z m1132 -4 c65
-33 117 -93 136 -157 20 -67 20 -94 0 -157 -21 -64 -62 -114 -122 -150 -63
-36 -174 -39 -238 -5 -124 66 -177 229 -115 350 23 46 89 109 135 129 52 22
149 18 204 -10z"/>
                            </g>
                        </svg>


                    </button>


                    <div className="name font-semibold text-2xl">
                        {activePage}
                    </div>
                </div>
            </div>




            <div className="items"></div>
            {/* Right side - Profile button */}
            <div className="NavEnd relative">
                <button
                    onClick={openProfile}
                    className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-gray-400 to-gray-100 cursor-pointer transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 relative group"
                    aria-label="Open profile menu"
                >
                    <div className="h-full w-full rounded-full overflow-hidden border border-white/50">
                        <img
                            src="asset/img/image.png"
                            alt="Profile"
                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:brightness-110 group-active:scale-100"
                        />
                    </div>

                </button>

                {/* Profile modal */}
                {showProfile && (
                    <div className="fixed inset-0 z-50">
                        {/* Overlay */}
                        <div
                            ref={profileOverlayRef}
                            className="absolute inset-0  bg-blue-300/15"
                            onClick={handleProfileOverlayClick}
                        />

                        {/* Profile sidebar */}
                        <div
                            ref={profileRef}
                            className="absolute right-0 top-0  w-80 bg-white shadow-xl rounded-xl z-50"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Profile menu"
                        >
                            {/* Profile header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full overflow-hidden">
                                        <img
                                            src="asset/img/image.png"
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
                                        <p className="text-sm text-gray-500">john@example.com</p>
                                    </div>
                                </div>
                                <button
                                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                    onClick={closeProfile}
                                    aria-label="Close profile menu"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                        <path fill="currentColor" d="m8.707 8l3.646-3.646a.5.5 0 0 0-.707-.707L8 7.293L4.354 3.647a.5.5 0 0 0-.707.707L7.293 8l-3.646 3.646a.5.5 0 0 0 .708.707l3.646-3.646l3.646 3.646a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.707L8.709 8z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Profile menu */}
                            <nav className="p-1 space-y-1 border-b mb-5  pb-5 border-gray-200">
                                {ProfilePlace.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => { setActivePage(item.name); closeProfile(); navigate(`/app/${item.path}`) }}
                                        className={`flex items-center gap-3 py-1 px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
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
                                        className={`flex items-center gap-3 py-1 px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
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
                                        className={`flex items-center gap-3 py-1 px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
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
                )}
            </div>


        </div >





    );
};

export default NavBar;

