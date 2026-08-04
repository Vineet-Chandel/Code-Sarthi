import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    MessageSquare,
    MoreHorizontal,
    Pin,
    Archive,
    Trash2,
    Edit2,
    Check,
    X,
    Folder,
    Sparkles,
    ChevronLeft,
    PanelLeftClose,
    PanelLeftOpen,
    MoreVertical,
} from "lucide-react";

/**
 * Helper: topic badge color coding
 */
const TOPIC_COLORS = {
    Resume: "bg-purple-400 border-white/30 text-purple-300",
    Interview: "bg-emerald-400 border-emerald-500/30 text-emerald-300",
    DevConnect: "bg-blue-400 border-blue-500/30 text-blue-300",
    ProjectManager: "bg-pink-400 border-pink-500/30 text-pink-300",
    DevToolkit: "bg-amber-400 border-amber-500/30 text-amber-300",
    General: "bg-zinc-400 border-zinc-500/30 text-zinc-300",
};

/**
 * Grouping logic: categorizes conversations by recency and pinned status
 */
function groupConversations(conversations) {
    const groups = {
        Pinned: [],
        Today: [],
        Yesterday: [],
        "Previous 7 Days": [],
        "Previous 30 Days": [],
        Older: {}, // Mapped as { "Month YYYY": [] }
    };

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday.getTime() - 86400000);
    const startOf7Days = new Date(startOfToday.getTime() - 7 * 86400000);
    const startOf30Days = new Date(startOfToday.getTime() - 30 * 86400000);

    conversations.forEach((convo) => {
        if (convo.isPinned) {
            groups.Pinned.push(convo);
            return;
        }

        const updatedAt = new Date(convo.updatedAt || convo.createdAt || Date.now());

        if (updatedAt >= startOfToday) {
            groups.Today.push(convo);
        } else if (updatedAt >= startOfYesterday) {
            groups.Yesterday.push(convo);
        } else if (updatedAt >= startOf7Days) {
            groups["Previous 7 Days"].push(convo);
        } else if (updatedAt >= startOf30Days) {
            groups["Previous 30 Days"].push(convo);
        } else {
            const monthYear = updatedAt.toLocaleDateString("en-US", { month: "long", year: "numeric" });
            if (!groups.Older[monthYear]) groups.Older[monthYear] = [];
            groups.Older[monthYear].push(convo);
        }
    });

    return groups;
}

/**
 * Single conversation item row with hover kebab menu, inline rename, and inline delete confirmation
 */
const ConversationItem = ({
    convo,
    isActive,
    onSelect,
    onRename,
    onTogglePin,
    onArchive,
    onDelete,
    showArchived,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameText, setRenameText] = useState(convo.title || "New Chat");
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    const handleRenameSubmit = (e) => {
        e?.stopPropagation();
        if (renameText.trim() && renameText !== convo.title) {
            onRename(convo._id, renameText.trim());
        }
        setIsRenaming(false);
    };

    const dotClass = TOPIC_COLORS[convo.topic] || TOPIC_COLORS.General;

    if (isConfirmingDelete) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 my-1"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="font-semibold px-1">Delete this chat?</span>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onDelete(convo._id)}
                        className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold transition-colors shadow"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setIsConfirmingDelete(false)}
                        className="p-1 hover:bg-white/10 rounded-lg text-zinc-400"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </motion.div>
        );
    }

    if (isRenaming) {
        return (
            <div
                className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white/[0.06] border border-white/40 my-1"
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="text"
                    value={renameText}
                    onChange={(e) => setRenameText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameSubmit();
                        if (e.key === "Escape") setIsRenaming(false);
                    }}
                    className="min-w-0 flex-1 bg-transparent text-xs text-zinc-100 px-2 py-1 focus:outline-none font-medium"
                    autoFocus
                />
                <button
                    onClick={handleRenameSubmit}
                    className="p-1 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                >
                    <Check className="w-3.5 h-3.5" />
                </button>
                <button
                    onClick={() => setIsRenaming(false)}
                    className="p-1 text-zinc-400 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
        );
    }

    return (
        <div
            onClick={() => onSelect(convo._id)}
            className={`group relative flex items-center gap-2.5 px-3 py-2.5 my-0.5 rounded-xl cursor-pointer transition-all duration-200 select-none ${isActive
                ? "bg-[#212121] text-white "
                : "bg-transparent border border-transparent text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100"
                }`}
        >
            <div className={`w-2 h-2 rounded-full flex-shrink-0 shadow-sm ${dotClass.split(" ")[0]}`} />
            <span className="flex-1 min-w-0 text-xs sm:text-[13px] font-medium truncate tracking-wide">
                {convo.title || "New Chat"}
            </span>
            {convo.isPinned && (
                <Pin className="w-3 h-3 text-purple-400 flex-shrink-0 opacity-70 group-hover:opacity-0 transition-opacity duration-200" />
            )}

            {/* Hover Kebab & Direct Unarchive Trigger */}
            <div className="absolute right-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                {showArchived && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onArchive(convo._id, false);
                        }}
                        title="Unarchive chat back to Active"
                        className="p-1 rounded-lg bg-[#1a1a1e] hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors shadow-md border border-blue-500/30"
                    >
                        <Archive className="w-3.5 h-3.5" />
                    </button>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                    className="p-1 rounded-lg bg-[#1a1a1e] hover:bg-white/15 text-zinc-300 transition-colors shadow-md border border-white/10"
                >
                    <MoreVertical className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Dropdown Options Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(false);
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-2 top-9 z-50 w-36 py-1 rounded-xl bg-[#1f1f25]/95 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.7)] text-xs font-medium text-zinc-200 divide-y divide-white/5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="py-0.5">
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsRenaming(true);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 text-left transition-colors"
                                >
                                    <Edit2 className="w-3.5 h-3.5 text-purple-400" />
                                    <span>Rename</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        onTogglePin(convo._id, convo.isPinned);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 text-left transition-colors"
                                >
                                    <Pin className="w-3.5 h-3.5 text-amber-400" />
                                    <span>{convo.isPinned ? "Unpin chat" : "Pin chat"}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        onArchive(convo._id, !showArchived);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 text-left transition-colors"
                                >
                                    <Archive className="w-3.5 h-3.5 text-blue-400" />
                                    <span>{showArchived ? "Unarchive chat" : "Archive chat"}</span>
                                </button>
                            </div>
                            <div className="py-0.5">
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsConfirmingDelete(true);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-rose-500/20 text-rose-300 text-left transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

/**
 * ChatSidebar
 *
 * Responsive left sidebar for Shastra AI with recency-grouped conversation threads, instant search,
 * and seamless kebab action menus.
 */
export default function ChatSidebar({
    conversations,
    activeId,
    searchQuery,
    setSearchQuery,
    onSelect,
    onNewChat,
    onRename,
    onTogglePin,
    onArchive,
    onDelete,
    showArchived,
    setShowArchived,
    isCollapsed,
    setIsCollapsed,
    isMobile,
}) {
    const grouped = useMemo(() => groupConversations(conversations), [conversations]);
    const hasConversations = conversations && conversations.length > 0;

    const groupOrder = ["Pinned", "Today", "Yesterday", "Previous 7 Days", "Previous 30 Days"];

    if (isCollapsed && !isMobile) {
        return (
            <div className="flex flex-col items-center py-4 px-2 bg-[#0d0d0f]/95 border-r border-white/[0.08] z-20 w-16 flex-shrink-0">
                <button
                    onClick={() => setIsCollapsed(false)}
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 text-zinc-300 transition-colors border border-white/10 mb-6 shadow-md cursor-pointer"
                    title="Open sidebar"
                >
                    <PanelLeftOpen className="w-5 h-5 text-white" />
                </button>
                <button
                    onClick={onNewChat}
                    className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-md cursor-pointer"
                    title="New Chat"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div
            className={`${isMobile
                ? `fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] shadow-[0_10px_40px_rgba(0,0,0,0.8)] transform transition-transform duration-300 ease-in-out ${isCollapsed ? "-translate-x-full pointer-events-none" : "translate-x-0"
                }`
                : "relative w-72 flex-shrink-0 transition-all duration-300"
                } flex flex-col h-full bg-[#0d0d0f]/95 backdrop-blur-3xl border-r border-white/[0.08] z-50`}
        >
            {/* Header: Brand Tag & Collapse Toggle */}
            <div className="flex items-center justify-between p-4 pb-2">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-zinc-100 tracking-wide font-poppins">Shastra AI</span>
                </div>
                <button
                    onClick={() => setIsCollapsed(true)}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
                    title="Close sidebar"
                >
                    <PanelLeftClose className="w-4 h-4 text-zinc-400" />
                </button>
            </div>

            {/* New Chat Button */}
            <div className="px-4 py-2">
                <button
                    onClick={() => {
                        onNewChat();
                        if (isMobile) setIsCollapsed(true);
                    }}
                    className="flex items-center justify-start gap-2.5 w-full py-2.5  rounded-2xl   text-white font-semibold text-xs sm:text-sm transition-all duration-300  cursor-pointer"
                >
                    <div className="bg-[#212121] text-white rounded-full p-1.5">
                        <Plus className="w-4 h-4" />
                    </div>
                    <span>New Chat</span>
                </button>
            </div>

            {/* Search Box */}
            <div className="px-4 py-2">
                <div className="relative flex items-center w-full rounded-xl bg-[#16161a] border border-white/10 focus-within:border-white/50 transition-colors px-3 py-1.5 shadow-inner">
                    <Search className="w-3.5 h-3.5 text-zinc-500 mr-2 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search threads or text..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none font-medium"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="p-0.5 text-zinc-500 hover:text-zinc-300">
                            <X className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>

            {/* Active vs Archived Toggle Selector */}
            <div className="px-3.5 py-1 flex items-center gap-1.5">
                <button
                    onClick={() => setShowArchived?.(false)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-[12px] font-semibold transition-all duration-200 cursor-pointer ${!showArchived
                        ? "bg-white text-blue-200"
                        : "bg-[#212121] text-zinc-400 hover:text-zinc-200 border border-white/[0.06] hover:bg-white/[0.06]"
                        }`}
                >
                    <MessageSquare className="w-3.5 h-3.5  flex-shrink-0" />
                    <span>Chats</span>
                </button>
                <button
                    onClick={() => setShowArchived?.(true)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-[12px] font-semibold transition-all duration-200 cursor-pointer ${showArchived
                        ? "bg-white text-blue-200"
                        : "bg-[#212121] text-zinc-400 hover:text-zinc-200 border border-white/[0.06] hover:bg-white/[0.06]"
                        }`}
                >
                    <Archive className="w-3.5 h-3.5  flex-shrink-0" />
                    <span>Archived</span>
                </button>
            </div>

            {/* Scrollable Conversation List Grouped by Recency */}
            <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-2 space-y-4">
                {!hasConversations ? (
                    <div className="flex flex-col items-center justify-center h-48 px-4 text-center text-zinc-500 text-xs">
                        {showArchived ? (
                            <>
                                <Archive className="w-8 h-8 text-blue-400/60 mb-2" />
                                <p className="font-medium text-zinc-300">No archived chats</p>
                                <p className="mt-1 text-[11px] text-zinc-500">Chats you archive will appear here for easy restoration.</p>
                            </>
                        ) : (
                            <>
                                <MessageSquare className="w-8 h-8 text-zinc-700 mb-2 opacity-60" />
                                <p className="font-medium text-zinc-400">No chat history yet</p>
                                <p className="mt-1 text-[11px] text-zinc-600">Start a conversation with Shastra to save your insights here.</p>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        {groupOrder.map((groupName) => {
                            const items = grouped[groupName] || [];
                            if (items.length === 0) return null;
                            return (
                                <div key={groupName} className="space-y-1">
                                    <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                                        {groupName === "Pinned" && <Pin className="w-3 h-3 text-purple-400" />}
                                        <span>{groupName}</span>
                                    </div>
                                    <div className="space-y-0.5">
                                        {items.map((convo) => (
                                            <ConversationItem
                                                key={convo._id}
                                                convo={convo}
                                                isActive={convo._id === activeId}
                                                onSelect={(id) => {
                                                    onSelect(id);
                                                    if (isMobile) setIsCollapsed(true);
                                                }}
                                                onRename={onRename}
                                                onTogglePin={onTogglePin}
                                                onArchive={onArchive}
                                                onDelete={onDelete}
                                                showArchived={showArchived}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Older Months */}
                        {Object.entries(grouped.Older || {}).map(([monthYear, items]) => {
                            if (!items || items.length === 0) return null;
                            return (
                                <div key={monthYear} className="space-y-1">
                                    <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                                        <span>{monthYear}</span>
                                    </div>
                                    <div className="space-y-0.5">
                                        {items.map((convo) => (
                                            <ConversationItem
                                                key={convo._id}
                                                convo={convo}
                                                isActive={convo._id === activeId}
                                                onSelect={(id) => {
                                                    onSelect(id);
                                                    if (isMobile) setIsCollapsed(true);
                                                }}
                                                onRename={onRename}
                                                onTogglePin={onTogglePin}
                                                onArchive={onArchive}
                                                onDelete={onDelete}
                                                showArchived={showArchived}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>


        </div>
    );
}
