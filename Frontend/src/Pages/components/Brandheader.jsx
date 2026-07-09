import React from "react";
import { Zap } from "lucide-react";

export default function BrandHeader({ collapsed }) {
    return (
        <div className={`flex flex-col ${collapsed ? "items-center" : ""} gap-3 px-1`}>
            <div className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}>
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_8px_20px_-6px_rgba(59,130,246,0.55)]">
                    <span className="text-sm font-semibold text-white">CS</span>
                </div>

                {!collapsed && (
                    <div className="min-w-0">
                        <p className="truncate text-[15px] font-medium text-zinc-100">CodeSarthi</p>
                        <div className="mt-0.5 flex items-center gap-1.5">
                            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-blue-400 ring-1 ring-inset ring-blue-500/20">
                                Shastra AI
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {!collapsed && (
                <>
                    <p className="text-[12px] leading-snug text-zinc-500">
                        Your AI engineering companion
                    </p>

                    <div className="flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1.5 ring-1 ring-white/[0.06]">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        <span className="text-[11px] text-zinc-400">Powered by Groq</span>
                        <Zap className="h-3 w-3 text-amber-400" strokeWidth={2.5} />
                    </div>
                </>
            )}
        </div>
    );
}