import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NavItem({ item, collapsed, active, onSelect }) {
    const [hovered, setHovered] = useState(false);
    const Icon = item.icon;

    return (
        <div className="relative">
            <motion.button
                onClick={() => onSelect(item.id)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                whileTap={{ scale: 0.98 }}
                animate={{ x: hovered && !collapsed ? 4 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={[
                    "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors duration-300",
                    collapsed ? "justify-center" : "",
                    active
                        ? "bg-blue-500/[0.08] text-zinc-100"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100",
                ].join(" ")}
            >
                {active && (
                    <motion.span
                        layoutId="active-rail"
                        className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.6)]"
                    />
                )}

                <motion.span
                    animate={{ rotate: hovered ? -6 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        active
                            ? "bg-blue-500/15 text-blue-400"
                            : "text-zinc-500 group-hover:text-blue-400",
                    ].join(" ")}
                >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                </motion.span>

                {!collapsed && (
                    <span className="flex min-w-0 flex-1 items-center justify-between">
                        <span className="truncate text-[13px] font-medium">{item.label}</span>

                        {item.badge === "dot" && (
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
                            </span>
                        )}
                        {item.badge === "new" && (
                            <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                                new
                            </span>
                        )}
                        {typeof item.count === "number" && (
                            <span className="rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-zinc-400">
                                {item.count}
                            </span>
                        )}
                    </span>
                )}
            </motion.button>

            {collapsed && hovered && (
                <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1.5 text-[11px] text-zinc-200 shadow-lg ring-1 ring-white/10">
                    {item.label}
                </div>
            )}
        </div>
    );
}
