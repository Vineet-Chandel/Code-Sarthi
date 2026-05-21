import React from 'react'
import Temp1 from '../3/Temp1';
const Preview = ({ resumeData, activeTab, setActiveTab }) => {
    // ─── tip item ─────────────────────────────────────────────────────────────────
    const TipItem = ({ emoji, title, body }) => (
        <div className="flex gap-3 py-3 border-b border-slate-100 last:border-none">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0 text-sm">
                {emoji}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
                <span className="text-slate-800 font-semibold">{title}: </span>
                {body}
            </p>
        </div>
    );

    return (
        <div className="flex flex-col bg-base-200 border border-slate-700">
            {/* tabs */}
            <div className="flex border-b border-slate-900">
                {["preview", "tips", "score"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3.5 text-lg font-semibold capitalize transition-all duration-200 border-b-2
            ${activeTab === tab
                                ? "text-secondary border-secondary bg-base-100"
                                : "text-slate-700 border-transparent hover:text-slate-600"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ── PREVIEW tab ── */}
            {activeTab === "preview" && (
                <div
                    className="
        relative
        flex
        items-start
        justify-center
        rounded-xl
        overflow-hidden
        bg-white
        shadow-2xl
        border
        border-slate-200
        transition-all
        duration-500
py-1
        "
                >
                    {/* Resume Scaling Wrapper */}



                    <div style={{
                        position: "relative",
                        width: "100%",
                        overflow: "hidden",
                        clipPath: "inset(0 0 0 0)",          // bulletproof clip
                        background: "oklch(95% 0.038 75.164)",
                        aspectRatio: "1/1.41",
                    }}>
                        {/* ✅ No hardcoded width, no transform scale — A4Wrapper handles everything */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0, left: 0, right: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                                transformOrigin: "top center",

                                transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
                            }}
                        >
                            <Temp1 data={resumeData} />
                        </div>

                        {/* Hover overlay CTA — unchanged */}
                        <div style={{
                            position: "absolute", inset: 0,
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
                            // background: `linear-gradient(160deg, ${item.color}18 0%, ${item.color}50 100%)`,

                            transition: "opacity 0.3s ease",
                        }}>

                        </div>
                    </div>

                </div>
            )}

            {/* ── TIPS tab ── */}
            {activeTab === "tips" && (
                <div className="p-4 overflow-y-auto">
                    <TipItem emoji="✉️" title="Professional email" body="Use name.work@gmail.com — avoid nicknames or random numbers." />
                    <TipItem emoji="☎️" title="Country code" body="Always include +91 (or your code) for international recruiters." />
                    <TipItem emoji="🏙️" title="City only" body="List city and country — a full street address wastes prime resume space." />
                    <TipItem emoji="🔗" title="LinkedIn URL" body="Customise your URL (linkedin.com/in/yourname) for a cleaner link." />
                    <TipItem emoji="📸" title="Photo" body="In India, a professional headshot is generally expected by recruiters." />
                    <TipItem emoji="💼" title="Portfolio" body="Link your portfolio or GitHub — it adds credibility for tech roles." />
                </div>
            )}



        </div>
    )
}

export default Preview