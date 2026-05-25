import React from 'react';
import { ArrowLeft, Sparkles, Search, GraduationCap, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const IntroEXP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const resumeData = location.state?.resumeData;

    return (
        <div
            data-theme="caramellatte"
            className="min-h-screen font-sans relative overflow-hidden flex flex-col md:flex-row items-center justify-center px-8 md:px-20 gap-16"
            style={{ backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)' }}
        >
            {/* Noise texture overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    opacity: 0.04,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '180px',
                }}
            />

            {/* Warm ambient blobs */}
            <div
                className="pointer-events-none absolute top-[-80px] right-[10%] w-[420px] h-[420px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, var(--color-base-300) 0%, transparent 70%)',
                    opacity: 0.7,
                    filter: 'blur(55px)',
                    animation: 'driftA 9s ease-in-out infinite',
                }}
            />

            {/* Decorative dashed rings */}
            <svg
                className="pointer-events-none absolute top-6 left-6"
                width="110" height="110" viewBox="0 0 110 110" fill="none"
                style={{ opacity: 0.12 }}
                aria-hidden="true"
            >
                <circle cx="55" cy="55" r="50" stroke="var(--color-info)" strokeWidth="1.5" strokeDasharray="5 4" />
                <circle cx="55" cy="55" r="30" stroke="var(--color-info)" strokeWidth="1" strokeDasharray="3 5" />
            </svg>

            {/* ── LEFT PANEL ── */}
            <div className="relative z-10 flex-1 max-w-xl flex flex-col gap-6">

                {/* Step badge */}
                <div
                    className="flex items-center gap-2 w-fit px-4 py-1.5 text-xs font-semibold uppercase"
                    style={{
                        background: 'var(--color-base-200)',
                        color: 'var(--color-base-content)',
                        border: '2px solid var(--color-base-300)',
                        borderRadius: 'var(--radius-selector)',
                        letterSpacing: '0.09em',
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--color-secondary-content)', animation: 'pulseDot 2s ease-in-out infinite' }}
                    />
                    Step 2 of 8 · EDUCATION
                </div>

                {/* Heading */}
                <div style={{ animation: 'fadeUp 0.55s ease both' }}>
                    <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-info)', letterSpacing: '0.02em' }}>
                        Great progress! Next up →
                    </p>
                    <h1
                        className="font-black leading-[1.08] tracking-tight"
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-info)' }}
                    >
                        Now, let’s add your
                        <br />
                        <span className="relative inline-block" style={{ color: 'var(--color-secondary-content)' }}>
                            education
                            <svg
                                viewBox="0 0 290 12"
                                preserveAspectRatio="none"
                                className="absolute left-0 w-full"
                                style={{ bottom: '-5px', height: '9px' }}
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 8 C 50 2, 100 12, 150 6 S 230 2, 288 8"
                                    fill="none"
                                    stroke="var(--color-info)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </h1>
                </div>

                {/* AI tip card */}
                <div
                    className="flex items-start gap-4 p-4"
                    style={{
                        background: 'var(--color-base-200)',
                        border: '2px solid var(--color-base-300)',
                        borderRadius: 'var(--radius-box)',
                        animation: 'fadeUp 0.55s ease 0.12s both',
                    }}
                >
                    <div
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                        style={{
                            background: 'var(--color-secondary-content)',
                            color: 'var(--color-base-100)',
                            borderRadius: 'var(--radius-field)',
                        }}
                    >
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-secondary-content)' }}>
                            AI writing assistant is active
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-info)' }}>
                            Fix mistakes, rephrase bullet points, or let AI draft from your notes — all in one click.
                        </p>
                    </div>
                </div>

                {/* Progress */}
                <div style={{ animation: 'fadeUp 0.55s ease 0.22s both' }}>
                    <div className="flex justify-between text-xs mb-2">
                        <span style={{ color: 'var(--color-info)' }}>Resume completeness</span>
                        <span className="font-bold" style={{ color: 'var(--color-info)' }}>12.5%</span>
                    </div>
                    <div className="h-2 overflow-hidden" style={{ background: 'var(--color-base-300)', borderRadius: 'var(--radius-selector)' }}>
                        <div
                            className="h-full"
                            style={{
                                width: '12.5%',
                                background: 'linear-gradient(90deg, var(--color-info), var(--color-info))',
                                borderRadius: 'var(--radius-selector)',
                                transition: 'width 1s ease',
                            }}
                        />
                    </div>
                    {/* step dots */}
                    <div className="flex gap-3 mt-3 items-center">
                        {['Info', 'Experience', 'Education', 'Skills', 'Profile Summary'].map((label, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <div
                                    className="rounded-full transition-all"
                                    style={{
                                        width: i === 2 ? '10px' : '7px',
                                        height: i === 2 ? '10px' : '7px',
                                        background: i <= 2 ? 'var(--color-info)' : 'gray',
                                        outline: i === 2 ? '2px solid var(--color-info)' : 'none',
                                        outlineOffset: '2px',
                                    }}
                                />
                                <span className="text-[11px] font-medium" style={{ color: i <= 3 ? 'var(--color-base-content)' : 'gray' }}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nav buttons */}
                <div
                    className="flex items-center justify-between mt-2"
                    style={{ animation: 'fadeUp 0.55s ease 0.32s both' }}
                >
                    <button
                        className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-60"
                        style={{ color: 'var(--color-secondary-content)', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={() => navigate('/app/build-resume/header-content', { state: { resumeData } })}
                    >
                        <ArrowLeft size={16} /> Back
                    </button>

                    <button
                        className="flex items-center gap-2 px-8 py-3.5 text-sm font-bold transition-all duration-150 active:scale-95"
                        style={{
                            background: 'var(--color-secondary-content)',
                            color: 'var(--color-base-100)',
                            border: '2px solid var(--color-info)',
                            borderRadius: 'var(--radius-selector)',
                            boxShadow: '4px 4px 0px var(--color-info)',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translate(-2px,-2px)';
                            e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-info)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translate(0,0)';
                            e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-info)';
                        }}
                        onClick={() => navigate('/app/build-resume/education-content', { state: { resumeData } })}
                    >
                        Continue <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* ── RIGHT PANEL — Resume card ── */}
            <div
                className="relative z-10 flex-1 flex flex-col items-center justify-center"
                style={{ animation: 'fadeUp 0.65s ease 0.18s both' }}
            >
                {/* depth shadow card */}
                <div
                    className=" w-[450px] flex flex-col items-center justify-between pb-5 "
                    style={{
                        height: '372px',
                        background: 'var(--color-secondary-content)',

                        borderRadius: 'var(--radius-box)',

                        zIndex: 0,
                    }}
                >

                    {/* main resume card */}
                    <div
                        className="relative w-[450px] p-5"
                        style={{
                            background: 'var(--color-base-100)',
                            border: '2px solid var(--color-base-300)',
                            borderRadius: 'var(--radius-box)',
                            zIndex: 1,
                            animation: 'floatCard 5s ease-in-out infinite',
                        }}
                    >
                        {/* accent stripe */}
                        <div
                            className="h-1.5 w-full mb-4"
                            style={{
                                background: 'linear-gradient(90deg, var(--color-info) 0%, var(--color-info) 50%, var(--color-secondary-content) 100%)',
                                borderRadius: 'var(--radius-selector)',
                            }}
                        />

                        {/* avatar + name */}
                        <div className="flex items-center gap-3 mb-5">
                            <div
                                className="w-10 h-10 flex items-center justify-center text-xs font-bold"
                                style={{
                                    background: 'var(--color-base-200)',
                                    color: 'var(--color-info)',
                                    border: '2px solid var(--color-base-300)',
                                    borderRadius: '50%',
                                }}
                            >
                                JD
                            </div>
                            <div>
                                <div className="h-2.5 w-24 mb-1.5" style={{ background: 'var(--color-info)', borderRadius: 'var(--radius-selector)', opacity: 0.85 }} />
                                <div className="h-2 w-16" style={{ background: 'var(--color-base-300)', borderRadius: 'var(--radius-selector)' }} />
                            </div>
                        </div>

                        {/* experience (dimmed) */}
                        <div className="mb-4" style={{ opacity: 0.28 }}>
                            <div className="h-2 w-16 mb-2" style={{ background: 'var(--color-info)', borderRadius: 'var(--radius-selector)' }} />
                            <div className="space-y-1.5">
                                <div className="h-1.5 w-full" style={{ background: 'var(--color-base-300)', borderRadius: 'var(--radius-selector)' }} />
                                <div className="h-1.5 w-4/5" style={{ background: 'var(--color-base-300)', borderRadius: 'var(--radius-selector)' }} />
                            </div>
                        </div>

                        {/* EDUCATION — highlighted */}
                        <div
                            className="relative p-3 mb-4"
                            style={{
                                background: 'var(--color-base-300)',
                                border: '2px dashed var(--color-info)',
                                borderRadius: 'var(--radius-box)',
                            }}
                        >
                            <div
                                className="absolute -top-3 left-3 flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase"
                                style={{
                                    background: 'var(--color-base-100)',
                                    color: 'var(--color-secondary-content)',
                                    borderRadius: 'var(--radius-selector)',
                                }}
                            >
                                <GraduationCap size={8} />
                                Education
                            </div>
                            {[100, 82, 65].map((w, i) => (
                                <div
                                    key={i}
                                    className="h-1.5 mb-1.5 last:mb-0"
                                    style={{
                                        width: `${w}%`,
                                        borderRadius: 'var(--radius-selector)',
                                        backgroundImage: 'linear-gradient(90deg, var(--color-accent) 25%, var(--color-info) 50%, var(--color-base-300) 75%)',
                                        backgroundSize: '200% 100%',
                                        animation: `shimmer 2s ease-in-out infinite ${i * 0.22}s`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* skills (dimmed) */}
                        <div className="flex gap-2 flex-wrap" style={{ opacity: 0.28 }}>
                            {[52, 38, 60, 44].map((w, i) => (
                                <div key={i} className="h-5" style={{ width: w, background: 'var(--color-base-300)', borderRadius: 'var(--radius-selector)' }} />
                            ))}
                        </div>

                        {/* zoom btn */}
                        <button
                            className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center transition-transform hover:scale-110"
                            style={{
                                background: 'var(--color-base-100)',
                                color: 'var(--color-info)',
                                border: '2px solid var(--color-base-300)',
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}
                            aria-label="Preview resume"
                        >
                            <Search className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <button
                        className="mt-5 text-xs font-semibold underline underline-offset-4 transition-opacity hover:opacity-60"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-base-100)' }}
                    >
                        Change template
                    </button>
                </div>

            </div>

            <style>{`
                @keyframes floatCard {
                    0%, 100% { transform: translateY(0px) rotate(0.4deg); }
                    50% { transform: translateY(-10px) rotate(-0.4deg); }
                }
                @keyframes driftA {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-20px, 15px); }
                }
                @keyframes driftB {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(14px, -10px); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulseDot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.45; transform: scale(1.5); }
                }
            `}</style>
        </div>
    );
};

export default IntroEXP;