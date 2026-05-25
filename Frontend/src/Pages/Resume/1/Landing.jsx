import React from "react";
import CTAcreateResume from "./CTAcreateResume";

const Landing = () => {
    return (
        <div className="w-full min-h-screen px-4 sm:px-6 lg:px-10 overflow-hidden">
            <link
                href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div className="flex flex-col lg:flex-row rounded-t-3xl bg-base-100 overflow-hidden">

                {/* LEFT SECTION */}
                <div className="w-full lg:w-1/2 px-2 sm:px-6 lg:pl-10 py-8 lg:py-12 flex flex-col justify-center">

                    {/* Badge */}
                    <div
                        className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full text-[10px] sm:text-xs border border-[#5a5a5a] font-bold uppercase tracking-widest mb-5"
                        style={{
                            background: "#242424",
                            color: "#ffffff",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                        50+ Premium Templates · ATS-Friendly
                    </div>

                    {/* Heading */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl xl:text-[75px] leading-none mb-5"
                        style={{
                            fontWeight: 800,
                            color: "#ffffff",
                            letterSpacing: "-0.04em",
                        }}
                    >
                        AI Resume
                        <br />
                        <span className="text-white">
                            Builder & Analyser
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                        className="text-sm sm:text-base lg:text-xl text-info max-w-2xl leading-relaxed"
                    >
                        Create a standout resume in minutes with our
                        AI-powered builder. Use professional templates,
                        add optimized content in one click, and apply
                        with confidence from any device.
                        Millions trust it — because it works.
                    </p>

                    {/* CTA */}
                    <div className="mt-8">
                        <CTAcreateResume />
                    </div>

                    {/* AI Feature Card */}
                    <div className="mt-10 mb-8 lg:mb-16">
                        <div className="w-full max-w-3xl rounded-3xl bg-base-300 p-4 sm:p-6 text-primary-content">

                            {/* Top */}
                            <div className="flex items-center gap-3 text-xl sm:text-2xl lg:text-4xl font-extrabold">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={40}
                                    height={40}
                                    viewBox="0 0 24 24"
                                    className="shrink-0 w-8 h-8 sm:w-10 sm:h-10"
                                >
                                    <g fill="none">
                                        <path d="m5.5 13l4.5 4.5l11-11L16.5 2z"></path>
                                        <path
                                            stroke="#fff"
                                            strokeWidth={0.8}
                                            d="M10 17.5L5.5 13m4.5 4.5l-2.414 2.414a2 2 0 0 1-1.414.586H2.5v-3.672a2 2 0 0 1 .586-1.414L5.5 12.999m4.5 4.5l11-11L16.5 2l-11 11M5 3l.332.668L6 4l-.668.332L5 5l-.332-.668L4 4l.668-.332zm7.75 17l.25.5l.5.25l-.5.25l-.25.5l-.25-.5l-.5-.25l.5-.25zm6.75-6l.622 1.378L21.5 16l-1.378.622L19.5 18l-.622-1.378L17.5 16l1.378-.622z"
                                        ></path>
                                    </g>
                                </svg>

                                <span>
                                    Let AI do your work
                                </span>
                            </div>

                            {/* Bottom Card */}
                            <div className="flex justify-center lg:justify-start w-full mt-6">
                                <div className="text-sm sm:text-base max-w-md rounded-3xl bg-accent p-5 text-primary-content leading-relaxed shadow-lg">
                                    Describe your role in a few words,
                                    and we'll generate tailored content
                                    for your work experience section.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="w-full lg:w-[45%] flex items-center justify-center p-4 sm:p-6 lg:p-8">

                    <div className="relative w-full max-w-2xl">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-90"></div>

                        {/* Image */}
                        <img
                            className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition duration-500"
                            src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777091782/Resume_Home_imatpu.webp"
                            alt="Resume Builder Preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;