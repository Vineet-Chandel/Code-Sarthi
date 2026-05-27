import React from 'react'

const Right = () => {
    return (
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
                            Summary
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
    )
}

export default Right