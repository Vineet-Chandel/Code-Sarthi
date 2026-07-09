import React from "react";
import { Flame } from "lucide-react";

function ProgressRing({ value = 72, size = 38, stroke = 3 }) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg width={size} height={size} className="shrink-0 -rotate-90">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={stroke}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#3B82F6"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.6))" }}
            />
        </svg>
    );
}

export default function ProfileCard({ collapsed, user }) {
    if (collapsed) {
        return (
            <div className="relative mx-auto h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/[0.06]">
            <div className="relative shrink-0">
                <ProgressRing value={user.contributionScore} />
                <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="absolute inset-0 m-auto h-7 w-7 rounded-full object-cover ring-2 ring-[#09090B]"
                />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-zinc-100">{user.name}</p>
                <p className="truncate text-[11px] text-zinc-500">{user.role}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-500/10 px-2 py-1 text-[11px] font-medium text-orange-400 ring-1 ring-inset ring-orange-500/20">
                <Flame className="h-3 w-3" strokeWidth={2.5} />
                {user.streak}
            </div>
        </div>
    );
}