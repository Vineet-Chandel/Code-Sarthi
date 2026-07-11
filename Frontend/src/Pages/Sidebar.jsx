import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import BrandHeader from "./components/Brandheader";
import NewConversationButton from "./components/Newconversationbutton";
import SearchBar from "./components/Searchbar";
import NavSection from "./components/Navsection";
import NavItem from "./components/Navitem";
import ProfileCard from "./components/Profilecard";
import { navigationSections, settingsItem } from "./components/Navigationdata";

const DEFAULT_USER = {
    name: "Aarav Sharma",
    role: "Full-stack engineer",
    streak: 12,
    contributionScore: 72,
    avatarUrl: "https://i.pravatar.cc/80?img=12",
};

export default function Sidebar({ user = DEFAULT_USER }) {
    const [collapsed, setCollapsed] = useState(true);
    const [activeId, setActiveId] = useState("home");

    return (
        <motion.aside
            animate={{ width: collapsed ? 80 : 320 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex h-screen shrink-0 flex-col justify-between overflow-y-auto scrollbar-none bg-[#09090B]/95 backdrop-blur-xl"
            style={{
                borderRadius: "24px",
                boxShadow:
                    "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px -20px rgba(0,0,0,0.6)",
            }}
        >
            {/* ambient glow */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

            {/* collapse toggle */}
            <button
                onClick={() => setCollapsed((c) => !c)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors duration-300 hover:bg-white/[0.06] hover:text-zinc-200"
            >
                {collapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <ChevronsLeft className="h-3.5 w-3.5" />}
            </button>

            <div className="relative flex flex-1 flex-col gap-4 overflow-y-auto scrollbar-none px-3 pb-3 pt-5 [scrollbar-width:thin]">
                <div className="px-1">
                    <BrandHeader collapsed={collapsed} />
                </div>

                <div className="flex flex-col gap-2 px-1">
                    <NewConversationButton collapsed={collapsed} onClick={() => setActiveId("home")} />
                    <SearchBar collapsed={collapsed} />
                </div>

                <div className="h-px bg-white/[0.06]" />

                <nav className="flex flex-1 flex-col gap-1  overflow-y-auto scrollbar-none">
                    {navigationSections.map((section) => (
                        <NavSection
                            key={section.label}
                            section={section}
                            collapsed={collapsed}
                            activeId={activeId}
                            onSelect={setActiveId}
                        />
                    ))}
                </nav>
            </div>

            <div className="relative flex flex-col gap-3 border-t border-white/[0.06] px-3 py-3">
                <NavItem
                    item={settingsItem}
                    collapsed={collapsed}
                    active={activeId === settingsItem.id}
                    onSelect={setActiveId}
                />
                <ProfileCard collapsed={collapsed} user={user} />
            </div>
        </motion.aside>
    );
} 