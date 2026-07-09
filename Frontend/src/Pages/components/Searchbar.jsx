import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ collapsed }) {
    if (collapsed) return null;

    return (
        <div className="group relative flex items-center rounded-2xl bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/[0.06] transition-colors duration-300 focus-within:bg-white/[0.05] focus-within:ring-blue-500/40">
            <Search className="h-3.5 w-3.5 shrink-0 text-zinc-500" strokeWidth={2} />
            <input
                type="text"
                placeholder="Search your conversations..."
                className="ml-2.5 w-full bg-transparent text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
            />
        </div>
    );
}