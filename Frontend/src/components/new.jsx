import { Helmet } from "react-helmet";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
    Pages,
    NextPages,
    MarketPlace,
    AboutPlace,
    ProfilePlace,
    SettingPlace,
    ByePlace
} from "./Navigations";

const NavBar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");

    const sidebarRef = useRef(null);
    const sidebarOverlayRef = useRef(null);
    const profileRef = useRef(null);
    const profileOverlayRef = useRef(null);

    // Sidebar functions
    const openSidebar = () => {
        setShowSidebar(true);
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

    // Handle navigation item click
    const handleNavClick = (pageName) => {
        setActivePage(pageName);
        // Close the appropriate modal
        if (showSidebar) closeSidebar();
        if (showProfile) closeProfile();
    };

    return (
        <>
            {/* FIXED: Helmet at the top level */}
            <Helmet>
                <title>CodeSarthi | {activePage}</title>
            </Helmet>

            <div className="navbar bg-gray-100 shadow-sm flex items-center justify-between p-4">
                {/* Left side - Menu button */}
                <div className="NavStart flex">
                    <button
                        className="Nav_svg border border-gray-400 p-[5px] rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200"
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
                </div>

                {/* Right side - Profile button */}
                <div className="NavEnd relative">
                    <button
                        onClick={openProfile}
                        className="h-16 w-16 rounded-full overflow-hidden p-[3px] bg-gradient-to-br from-gray-400 to-gray-100 cursor-pointer transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 relative group"
                        aria-label="Open profile menu"
                    >
                        <div className="h-full w-full rounded-full overflow-hidden border border-white/50">
                            <img
                                src="asset/img/image.png"
                                alt="Profile"
                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:brightness-110 group-active:scale-100"
                            />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent from-30% to-white/10 to-70% opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </button>

                    {/* Profile modal */}
                    {showProfile && (
                        <div className="fixed inset-0 z-50">
                            {/* Overlay */}
                            <div
                                ref={profileOverlayRef}
                                className="absolute inset-0 bg-blue-300/15"
                                onClick={handleProfileOverlayClick}
                            />

                            {/* Profile sidebar */}
                            <div
                                ref={profileRef}
                                className="absolute right-0 top-0 w-80 bg-white shadow-xl rounded-xl z-50"
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
                                <nav className="p-1 space-y-1 border-b mb-5 pb-5 border-gray-200">
                                    {ProfilePlace.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavClick(item.name)}
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
                                            onClick={() => handleNavClick(item.name)}
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

                                <nav className="p-1 space-y-1 pb-5">
                                    {ByePlace.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavClick(item.name)}
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

                {/* Main sidebar modal */}
                {showSidebar && (
                    <div className="fixed inset-0 z-40">
                        {/* Overlay */}
                        <div
                            ref={sidebarOverlayRef}
                            className="absolute inset-0 bg-blue-300/15"
                            onClick={handleSidebarOverlayClick}
                        />

                        {/* Sidebar */}
                        <div
                            ref={sidebarRef}
                            className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl z-50 rounded-r-xl"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                        >
                            {/* Sidebar header */}
                            <div className="flex justify-between items-center p-3 border-b mb-5 pb-5 relative top-3 border-gray-200">
                                <div className="top">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                                            <path fill="#0f0f0f" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
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
                            <nav className="p-1 space-y-1 border-b mb-5 pb-5 border-gray-200">
                                {Pages.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.name)}
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
                                        onClick={() => handleNavClick(item.name)}
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
                                        onClick={() => handleNavClick(item.name)}
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

                            <nav className="p-1 space-y-1 border-b pb-5 mb-5 border-gray-200">
                                {AboutPlace.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.name)}
                                        className={`flex items-center gap-3 py-1 px-4 w-full text-left rounded-lg transition-all duration-200 ${activePage === item.name ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}
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
                            <div className="bottom-0 left-0 right-0 p-3">
                                <div className="text-center text-gray-500 text-sm">
                                    <p>© {new Date().getFullYear()} CodeSarthi™ — All rights reserved.</p>
                                    <p className="mt-1">Dhanyavaad 🌸</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default NavBar;