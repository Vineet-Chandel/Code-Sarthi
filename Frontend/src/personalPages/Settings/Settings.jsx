import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { UserSettings, AppSettings, ActivitySettings, LogoutPart, Support } from "./SettingsNavigation";
import PasswordSecuritySettings from "./UserSettings/PassAndSecurity";
import BlockSettings from "./UserSettings/BlockSettings";
import FamilyCenter from "./UserSettings/FamilyCenter";
import Notifications from "./UserSettings/Notifications";
import DataAndPrivacy from "./UserSettings/DataAndPrivacy";
import AccountAndPrivacy from "./UserSettings/AccountAndPrivacy";
import Accessibility from "./AppSettings/Accessibility";
import Appearance from "./AppSettings/Appearance";
import VoiceAndVideo from "./AppSettings/VoiceAndVideo";
import Chats from "./AppSettings/Chats";
import ActivityPrivacy from "./ActivitySettings/ActivityPrivacy";
import HelpCenter from "./Support/HelpCenter";
import PrivacyAndPolicy from "./Support/PrivacyAndPolicy";
import AboutUs from "./Support/AboutUs";

import ContentAndSocial from "./UserSettings/ContentAndSocial";




// Content mapping

const SettingContent = ({ activeSetting }) => {
    const contentMap = {
        //user settings
        "Password & Security": <PasswordSecuritySettings />,
        "Account Privacy": <AccountAndPrivacy />,
        "Blocked Connections": <BlockSettings />,
        "Family Center": <FamilyCenter />,
        "Notifications": <Notifications />,
        "Data & Privacy": <DataAndPrivacy />,
        "Content & Social": <ContentAndSocial />,

        //app settings
        "Appearance": <Appearance />,
        "Accessibility": <Accessibility />,
        "Voice & Video": <VoiceAndVideo />,
        "Chats": <Chats />,

        //activity settings
        "Activity Privacy": <ActivityPrivacy />,

        //support
        "Help Center": <HelpCenter />,
        "Privacy & Policy": <PrivacyAndPolicy />,
        "About Us": <AboutUs />

    };

    return contentMap[activeSetting] || (
        <p className="text-gray-400 font-mono">
            <span className="text-cyan-400">{`> ${activeSetting}`}</span> panel is loading...
        </p>
    );
};

// Main Component
const Settings = () => {
    const [active, setActive] = useState(UserSettings[0].name);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredUserSettings = useMemo(() => {
        return UserSettings.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, UserSettings]);
    const filteredAppSettings = useMemo(() => {
        return AppSettings.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, AppSettings]);
    const filteredActivitySettings = useMemo(() => {
        return ActivitySettings.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, ActivitySettings]);
    const filteredLogoutPart = useMemo(() => {
        return LogoutPart.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, LogoutPart]);
    const filteredSupport = useMemo(() => {
        return Support.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, Support]);

    return (
        <div className="bg-[#0a0a0f] min-h-screen flex text-white relative overflow-hidden">
            <AnimatePresence>
                {/* LEFT SIDEBAR */}
                {isOpen && (
                    <motion.div
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -400 }}
                        transition={{ duration: 0.35 }}

                        className="h-full w-[85%] sm:w-[320px] lg:w-[340px] p-4
bg-[#05070c]/90 backdrop-blur-2xl border-r border-cyan-500/10
shadow-[10px_0_40px_rgba(0,0,0,0.6)]
flex flex-col gap-2 absolute z-20
left-0 top-0"


                    >
                        <div className="flex gap-6 justify-center mt-3 mb-3 items-center w-full">
                            <h2
                                className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-cyan-400 to-blue-500 font-mono flex items-center gap-2 group"

                            >
                                <span className="text-xl sm:text-2xl lg:text-3xl group-hover:animate-[spin_2s_linear_infinite]"><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" viewBox="0 0 24 24">
                                    <path fill="#0096ff" fillRule="evenodd" d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083" clipRule="evenodd" opacity="0.3" />
                                    <path fill="#0096ff" d="M15.523 12c0 1.657-1.354 3-3.023 3s-3.023-1.343-3.023-3S10.83 9 12.5 9s3.023 1.343 3.023 3" />
                                </svg></span>
                                Settings
                            </h2>

                            {isOpen && (<div className="bg-white/30 p-2 rounded-xl " onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                                    <path fill="#f7f7f7" d="m3.219 2.154l6.778 6.773l6.706-6.705c.457-.407.93-.164 1.119.04a.777.777 0 0 1-.044 1.035l-6.707 6.704l6.707 6.702c.298.25.298.74.059 1.014c-.24.273-.68.431-1.095.107l-6.745-6.749l-6.753 6.752c-.296.265-.784.211-1.025-.052c-.242-.264-.334-.72-.025-1.042l6.729-6.732l-6.701-6.704c-.245-.27-.33-.764 0-1.075s.822-.268.997-.068"></path>
                                </svg>
                            </div>)}
                        </div>

                        <div className="relative mb-4">

                            {/* ICON */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <g fill="none">
                                    <path fill="#00eaff33" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14" />
                                    <path stroke="#00eaff" strokeLinecap="round" d="M20.5 20.5L17 17" />
                                    <circle cx="11" cy="11" r="8.5" stroke="#00eaff" />
                                </g>
                            </svg>

                            {/* INPUT */}
                            <input
                                type="text"
                                placeholder=">  Search settings..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 bg-black/60 border border-cyan-500/30 rounded-xl
      focus:outline-none focus:border-cyan-400
      focus:shadow-[0_0_20px_rgba(0,255,255,0.2)]
      transition-all text-sm font-mono placeholder:text-gray-600"
                            />

                        </div>

                        {/* Settings list */}
                        <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-track-cyan-500/10 scrollbar-thumb-cyan-500/30">
                            <span className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mt-4 mb-2 font-mono">User Settings</span>
                            {filteredUserSettings.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >

                                    <div>
                                        {/* <span className={`w-1 h-6 rounded-md transition-all duration-200 ${active === item.name ? "bg-blue-700" : "bg-transparent "} `}></span> */}
                                        <button
                                            role="tab"
                                            aria-selected={active === item.name}
                                            aria-controls={`setting-panel-${item.name}`}
                                            id={`tab-${item.name}`}
                                            onClick={() => setActive(item.name)}

                                            className={`w-full relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl cursor-pointer
                  transition-all duration-300 group overflow-hidden
                  ${active === item.name
                                                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                                    : "hover:bg-white/5 border border-transparent"
                                                }`}
                                        >


                                            <span className="relative z-10 font-mono text-sm tracking-wide flex items-center gap-3">
                                                <span className="text-cyan-400 text-lg">{item.globalSVG}</span>
                                                {item.name}
                                                {active === item.name && (
                                                    <motion.span
                                                        className="ml-auto text-cyan-400"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                    >
                                                        ▶
                                                    </motion.span>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </motion.div>


                            ))}
                            <span className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mt-4 mb-2 font-mono">App Settings</span>
                            {filteredAppSettings.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <button
                                        role="tab"
                                        aria-selected={active === item.name}
                                        aria-controls={`setting-panel-${item.name}`}
                                        id={`tab-${item.name}`}
                                        onClick={() => setActive(item.name)}
                                        className={`w-full relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl cursor-pointer
                  transition-all duration-300 group overflow-hidden
                  ${active === item.name
                                                ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                                : "hover:bg-white/5 border border-transparent"
                                            }`}
                                    >


                                        <span className="relative z-10 font-mono text-sm tracking-wide flex items-center gap-3">
                                            <span className="text-cyan-400 text-lg">{item.globalSVG}</span>
                                            {item.name}
                                            {active === item.name && (
                                                <motion.span
                                                    className="ml-auto text-cyan-400"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    ▶
                                                </motion.span>
                                            )}
                                        </span>
                                    </button>
                                </motion.div>
                            ))}
                            <span className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mt-4 mb-2 font-mono">Activity Settings</span>
                            {filteredActivitySettings.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <button
                                        role="tab"
                                        aria-selected={active === item.name}
                                        aria-controls={`setting-panel-${item.name}`}
                                        id={`tab-${item.name}`}
                                        onClick={() => setActive(item.name)}
                                        className={`w-full relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl cursor-pointer
                  transition-all duration-300 group overflow-hidden
                  ${active === item.name
                                                ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                                : "hover:bg-white/5 border border-transparent"
                                            }`}
                                    >


                                        <span className="relative z-10 font-mono text-sm tracking-wide flex items-center gap-3">
                                            <span className="text-cyan-400 text-lg">{item.globalSVG}</span>
                                            {item.name}
                                            {active === item.name && (
                                                <motion.span
                                                    className="ml-auto text-cyan-400"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    ▶
                                                </motion.span>
                                            )}
                                        </span>
                                    </button>
                                </motion.div>
                            ))}
                            <span className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mt-4 mb-2 font-mono">Necessity</span>
                            {filteredSupport.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <button
                                        role="tab"
                                        aria-selected={active === item.name}
                                        aria-controls={`setting-panel-${item.name}`}
                                        id={`tab-${item.name}`}
                                        onClick={() => setActive(item.name)}
                                        className={`w-full relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl cursor-pointer
                  transition-all duration-300 group overflow-hidden
                  ${active === item.name
                                                ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                                : "hover:bg-white/5 border border-transparent"
                                            }`}
                                    >


                                        <span className="relative z-10 font-mono text-sm tracking-wide flex items-center gap-3">
                                            <span className="text-cyan-400 text-lg">{item.globalSVG}</span>
                                            {item.name}
                                            {active === item.name && (
                                                <motion.span
                                                    className="ml-auto text-cyan-400"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    ▶
                                                </motion.span>
                                            )}
                                        </span>
                                    </button>
                                </motion.div>
                            ))}
                            {filteredLogoutPart.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <button
                                        role="tab"
                                        aria-selected={active === item.name}
                                        aria-controls={`setting-panel-${item.name}`}
                                        id={`tab-${item.name}`}
                                        onClick={() => setActive(item.name)}
                                        className={`w-full relative px-3 sm:px-4 py-2.5 sm:py-3 mt-5  rounded-xl cursor-pointer
                  transition-all duration-300 group overflow-hidden
                  ${active === item.name
                                                ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                                                : "hover:bg-white/5 border border-transparent"
                                            }`}
                                    >


                                        <span className="relative z-10 font-mono text-xl tracking-wide flex items-center gap-3 text-red-500">
                                            <span className="text-cyan-400 text-lg">{item.globalSVG}</span>
                                            {item.name}
                                            {active === item.name && (
                                                <motion.span
                                                    className="ml-auto text-cyan-400"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    ▶
                                                </motion.span>
                                            )}
                                        </span>
                                    </button>
                                </motion.div>
                            ))}
                        </div>



                    </motion.div>
                )}
            </AnimatePresence>
            {/* RIGHT PANEL */}
            <motion.div
                className="flex-1 p-4 sm:p-6 lg:p-10"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >

                <div className="  p-4 backdrop-blur-xl mb-3 bg-black/40 border-r border-cyan-500/20
          flex flex-col gap-2 ">

                    <div className="w-12">
                        {!isOpen && (<div className="bg-white/30 p-2 rounded-xl" onClick={() => setIsOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 16 16">
                                <path fill="#f7f7f7" fillRule="evenodd" d="M0 3.75A.75.75 0 0 1 .75 3h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 3.75M0 8a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8m.75 3.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5z" clipRule="evenodd"></path>
                            </svg>
                        </div>)}
                    </div>




                </div>
                <div
                    className="bg-black/40 border border-cyan-500/30 rounded-3xl p-4 sm:p-6 lg:p-8
             relative overflow-hidden"

                >




                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r 
                from-cyan-400 to-blue-500 bg-clip-text text-transparent font-mono
                flex items-center gap-2">
                                {/* <span className="text-cyan-400">{settingIcons[active]?.localSVG}</span> */}
                                {active}
                            </h1>

                            <SettingContent activeSetting={active} />
                        </motion.div>
                    </AnimatePresence>

                </div>
            </motion.div>

            {/* Add global styles for animations */}
            <style jsx global>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(0, 255, 255, 0.1);
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.5);
        }
      `}</style>
        </div >
    );
};

export default Settings;