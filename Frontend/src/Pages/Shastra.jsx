import React from "react";

const ACCENTS = {
    blue: { icon: "text-[#4F46E5]", soft: "bg-[#4F46E5]/10", glow: "bg-[#4F46E5]" },
    purple: { icon: "text-[#8B5CF6]", soft: "bg-[#8B5CF6]/10", glow: "bg-[#8B5CF6]" },
    orange: { icon: "text-[#F59E0B]", soft: "bg-[#F59E0B]/10", glow: "bg-[#F59E0B]" },
};

const DashboardGlyph = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.8" />
        <rect x="13" y="3.5" width="7.5" height="4.5" rx="1.8" />
        <rect x="13" y="10.5" width="7.5" height="10" rx="1.8" />
        <rect x="3.5" y="13.5" width="7.5" height="7" rx="1.8" />
    </svg>
);

const ChatGlyph = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
        <path d="M7.5 9.5h9M7.5 12.5h5.5" />
    </svg>
);

const PhoneGlyph = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <line x1="10.5" y1="18" x2="13.5" y2="18" />
    </svg>
);

const CircleIcon = ({ accent, children }) => (
    <div
        className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:rotate-6 ${ACCENTS[accent].soft} ${ACCENTS[accent].icon}`}
    >
        {children}
    </div>
);

const SectionTitle = () => (
    <div className="flex flex-col items-center text-center">
        <h2 className="max-w-[700px] text-[34px] font-black leading-[1.15] tracking-tight text-gray-900 md:text-[48px] lg:text-[62px]">
            Effectivity your workflow
            <br />
            better with good collaboration
        </h2>
        <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-gray-500">
            Boost your team's productivity with powerful collaboration tools. Our platform allows your team to work
            together in real time, share insights effortlessly, and streamline communication.
        </p>
        <button
            type="button"
            className="mt-10 flex h-14 w-[170px] items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 ease-out motion-reduce:transition-none hover:scale-[1.04] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 active:scale-[0.98]"
        >
            Try Now
        </button>
    </div>
);

const DashboardMockup = () => (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-indigo-50/60 to-white p-3.5">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-indigo-200/40 blur-2xl" />

        <div className="relative flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
            <div className="h-5 w-5 shrink-0 rounded-full bg-indigo-400" />
            <div className="h-2 flex-1 rounded-full bg-gray-100" />
            <div className="h-4 w-4 shrink-0 rounded-md bg-gray-100" />
        </div>

        <div className="relative mt-3 flex gap-1.5">
            {["Projects", "Meeting", "Settings"].map((label, i) => (
                <span
                    key={label}
                    className={`rounded-full px-2.5 py-1 text-[9px] font-medium shadow-sm ${i === 0 ? "bg-indigo-600 text-white" : "bg-white text-gray-400"
                        }`}
                >
                    {label}
                </span>
            ))}
        </div>

        <div className="relative mt-3 space-y-2 rounded-2xl bg-white p-3 shadow-md">
            {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-2">
                    <div className="h-6 w-6 shrink-0 rounded-lg bg-indigo-100" />
                    <div className="h-2 flex-1 rounded-full bg-gray-100" />
                    <div className="flex -space-x-1.5">
                        <div className="h-4 w-4 rounded-full bg-indigo-300 ring-2 ring-white" />
                        <div className="h-4 w-4 rounded-full bg-violet-300 ring-2 ring-white" />
                    </div>
                </div>
            ))}
        </div>

        <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 rounded-full bg-white px-2 py-1.5 shadow-md">
            <div className="h-5 w-5 rounded-full bg-indigo-500" />
            <div className="h-5 w-5 rounded-full bg-violet-400" />
            <div className="h-5 w-5 rounded-full bg-amber-400" />
        </div>
    </div>
);

const ChatMockup = () => (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[#ECECEC] bg-white p-3.5">
        <div className="flex items-center justify-between border-b border-[#ECECEC] pb-2.5">
            <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-200" />
            </div>
            <div className="h-5 w-20 rounded-full border border-[#ECECEC] bg-gray-50" />
            <div className="flex -space-x-1.5">
                <div className="h-5 w-5 rounded-full bg-violet-400 ring-2 ring-white" />
                <div className="h-5 w-5 rounded-full bg-indigo-400 ring-2 ring-white" />
            </div>
        </div>

        <div className="mt-3 space-y-2.5 overflow-hidden">
            <div className="flex items-start gap-2">
                <div className="h-6 w-6 shrink-0 rounded-full bg-violet-300" />
                <div className="max-w-[72%] rounded-2xl rounded-tl-sm bg-gray-50 px-3 py-2">
                    <div className="h-2 w-20 rounded-full bg-gray-200" />
                    <div className="mt-1.5 h-2 w-14 rounded-full bg-gray-200" />
                </div>
            </div>

            <div className="flex items-start justify-end gap-2">
                <div className="max-w-[72%] rounded-2xl rounded-tr-sm bg-violet-500 px-3 py-2">
                    <div className="h-2 w-16 rounded-full bg-white/70" />
                </div>
                <div className="h-6 w-6 shrink-0 rounded-full bg-indigo-300" />
            </div>

            <div className="flex items-start gap-2">
                <div className="h-6 w-6 shrink-0 rounded-full bg-violet-300" />
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-[#ECECEC] bg-white px-3 py-2 shadow-sm">
                    <div className="h-6 w-6 shrink-0 rounded-md bg-violet-100" />
                    <div className="h-2 w-12 rounded-full bg-gray-200" />
                </div>
            </div>

            <div className="ml-8 flex gap-1.5">
                <span className="flex h-5 items-center gap-1 rounded-full border border-[#ECECEC] bg-white px-2 text-[10px] shadow-sm">
                    👍<span className="text-gray-400">2</span>
                </span>
                <span className="flex h-5 items-center rounded-full border border-[#ECECEC] bg-white px-2 text-[10px] shadow-sm">
                    🎉
                </span>
            </div>
        </div>

        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-2 rounded-full border border-[#ECECEC] bg-white px-3 py-2 shadow-sm">
            <div className="h-2 flex-1 rounded-full bg-gray-100" />
            <div className="h-6 w-6 shrink-0 rounded-full bg-violet-500" />
        </div>
    </div>
);

const PHONE_ROWS = [
    { color: "bg-indigo-300", unread: true, time: "9:41" },
    { color: "bg-violet-300", unread: false, time: "9:24" },
    { color: "bg-amber-300", unread: true, time: "Mon" },
    { color: "bg-emerald-300", unread: false, time: "Sun" },
];

const PhoneMockup = () => (
    <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-0 w-[190px] -translate-x-1/2">
            <div className="rounded-[38px] border-[5px] border-gray-900 bg-gray-900 shadow-2xl">
                <div className="relative h-[400px] w-full overflow-hidden rounded-[32px] bg-white">
                    <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-gray-900" />

                    <div className="flex items-center justify-between px-4 pt-7">
                        <span className="text-[10px] font-semibold text-gray-900">Messages</span>
                        <div className="relative h-5 w-5 rounded-full bg-amber-300">
                            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                        </div>
                    </div>

                    <div className="mx-4 mt-2.5 h-5 rounded-full bg-gray-100" />

                    <div className="mt-3 space-y-3 px-4">
                        {PHONE_ROWS.map((row, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`h-8 w-8 shrink-0 rounded-full ${row.color}`} />
                                <div className="min-w-0 flex-1">
                                    <div className="h-2 w-14 rounded-full bg-gray-300" />
                                    <div className="mt-1.5 h-2 w-20 rounded-full bg-gray-100" />
                                </div>
                                <div className="flex shrink-0 flex-col items-end gap-1.5">
                                    <span className="text-[7px] text-gray-300">{row.time}</span>
                                    {row.unread && <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-around border-t border-gray-100 bg-white py-3">
                        {[0, 1, 2, 3].map((i) => (
                            <span key={i} className={`h-1.5 w-5 rounded-full ${i === 0 ? "bg-indigo-600" : "bg-gray-200"}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const FeatureCard = ({ accent, icon, title, subtitle, children }) => (
    <div className="group relative flex h-[620px] flex-col overflow-hidden rounded-[36px] border border-[#ECECEC] bg-white p-8 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.25)] transition-all duration-[400ms] ease-out motion-reduce:transition-none hover:-translate-y-2 hover:shadow-2xl">
        <div
            className={`pointer-events-none absolute -right-16 -top-16 z-0 h-56 w-56 rounded-full opacity-10 blur-3xl ${ACCENTS[accent].glow}`}
        />

        <div className="relative z-10 flex h-full flex-col">
            <CircleIcon accent={accent}>{icon}</CircleIcon>
            <h3 className="mt-6 text-[30px] font-bold leading-tight tracking-tight text-gray-900">{title}</h3>
            <p className="mt-3 text-base leading-relaxed text-gray-500">{subtitle}</p>
            <div className="relative mt-6 min-h-0 flex-1">{children}</div>
        </div>
    </div>
);

const CollaborationSection = () => {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[8%] top-[52%] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute right-[10%] top-[38%] h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
                <SectionTitle />

                <div className="mt-20 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        accent="blue"
                        icon={<DashboardGlyph />}
                        title="Optimize Team Work!"
                        subtitle="Good teamwork become smooth with good management team from services"
                    >
                        <DashboardMockup />
                    </FeatureCard>

                    <FeatureCard
                        accent="purple"
                        icon={<ChatGlyph />}
                        title="Grow Up Team Collaboratte"
                        subtitle="Communication more important and good proportionality work"
                    >
                        <ChatMockup />
                    </FeatureCard>

                    <FeatureCard
                        accent="orange"
                        icon={<PhoneGlyph />}
                        title="Mobile User Friendly"
                        subtitle="Wherever you are, it's still easy to organize projects from your phone"
                    >
                        <PhoneMockup />
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
};

export default CollaborationSection;