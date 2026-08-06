import React from "react";
import {
  Sparkles,
  Command as CommandIcon,
  Fingerprint,
  Search,
  ArrowUpRight
} from "lucide-react";

const DashboardBento = () => {
  return (
    <section className="w-full bg-black text-white py-24 px-4 md:px-8 font-poppins relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-[120px]" />

      <div className="max-w-[1500px] mx-auto relative">

        {/* Section Header */}
        <div className="mb-14 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5  bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Core Workspace Ecosystem</span>
          </div>
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-4">
            Built for velocity. Designed for precision.
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Experience an integrated developer platform where project management, intelligent analytics, keyboard acceleration, and rock-solid security meet in one interactive dashboard.
          </p>
        </div>

        {/* Bento Grid Container with 1px border gridlines */}

        <div className="border border-white/15 p-5 relative">

          <div className="absolute border border-white/15 h-[20px]  w-[20px] top-0 right-0"></div>
          <div className="absolute border border-white/15 h-[20px]  w-[20px] top-0 left-0"></div>
          <div className="absolute border border-white/15 h-[20px]  w-[20px] bottom-0 right-0"></div>
          <div className="absolute border border-white/15 h-[20px]  w-[20px] bottom-0 left-0"></div>
          <div className="relative border border-white/15 bg-white/10   grid grid-cols-1 lg:grid-cols-3 gap-[1px]">




            {/* ================= CARD 1: DASHBOARD (Col Span 2) ================= */}
            <div className="lg:col-span-2 bg-[#090a0d] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden">
              {/* Top decorative gradient glow */}
              <div className="absolute -top-24 left-1/4 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl  transition-all duration-700 pointer-events-none" />

              {/* Dashboard Image Frame */}
              <div className="w-full bg-[#0d0f12]  rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] relative overflow-hidden mb-8 transition-all duration-500  ">
                <img
                  src="https://res.cloudinary.com/dj0ivep44/image/upload/v1785955500/Screenshot_2026-08-06_at_12.14.04_AM_p31mh3.png"
                  alt="CodeSarthi Interactive Dashboard"
                  className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-700 "
                />


              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-30% to-black to-80% z-10" />
              {/* Bottom Content Typography */}
              <div className="relative z-30 pt-5 border-t border-white/20">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2.5  transition-colors duration-300">
                  Dashboard
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Our interactive dashboard provides an all-encompassing view of your projects, tasks, and collaborations, staying updated on team activities in real time.
                </p>
              </div>
            </div>

            {/* ================= CARD 2: SIMPLE ANALYTICS (Col Span 1) ================= */}
            <div className="lg:col-span-1 bg-[#090a0d] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden">
              {/* Ambient right glow */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl  transition-all duration-700 pointer-events-none" />

              <div className="w-full flex-1 flex flex-col justify-center relative my-6 min-h-[220px]">
                {/* Floating Pill Button */}
                <div className="absolute top-0 left-4 z-20">
                  <div className="inline-flex items-center gap-1.5 bg-[#17181c]/90 backdrop-blur-md   px-3.5 py-1.5 rounded-xl text-xs font-mono text-white shadow-[0_4px_20px_rgba(0,0,0,0.8)]  transition-all duration-500">
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-300  group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                    <div className="h-4 overflow-hidden inline-flex flex-col">
                      <div className="transition-transform duration-500 ease-out transform group-hover:-translate-y-4 flex flex-col">
                        <span className="h-4 flex items-center leading-none">2%</span>
                        <span className="h-4 flex items-center leading-none font-bold ">14%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sweeping Waveform SVG */}
                <div className="w-full h-52 relative mt-4 overflow-hidden">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 400 200"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
                      </linearGradient>
                      <linearGradient id="waveGradHover" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(168,85,247,0.45)" />
                        <stop offset="60%" stopColor="rgba(139,92,246,0.1)" />
                        <stop offset="100%" stopColor="rgba(168,85,247,0.0)" />
                      </linearGradient>
                    </defs>

                    <g className="transition-transform duration-700 ease-in-out transform group-hover:-translate-x-[320px]">
                      {/* Waveform area - Default */}
                      <path
                        d="M 0 170 C 80 170, 130 90, 200 90 C 250 90, 270 130, 310 130 C 350 130, 370 70, 430 70 C 470 70, 490 110, 530 110 C 580 110, 610 25, 680 20 C 710 18, 730 40, 760 30 L 760 200 L 0 200 Z"
                        fill="url(#waveGrad)"
                        className="transition-opacity duration-700 opacity-100 group-hover:opacity-0"
                      />
                      {/* Waveform area - Hover Purple Glow */}
                      <path
                        d="M 0 170 C 80 170, 130 90, 200 90 C 250 90, 270 130, 310 130 C 350 130, 370 70, 430 70 C 470 70, 490 110, 530 110 C 580 110, 610 25, 680 20 C 710 18, 730 40, 760 30 L 760 200 L 0 200 Z"
                        fill="url(#waveGradHover)"
                        className="transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                      />
                      {/* Waveform stroke */}
                      <path
                        d="M 0 170 C 80 170, 130 90, 200 90 C 250 90, 270 130, 310 130 C 350 130, 370 70, 430 70 C 470 70, 490 110, 530 110 C 580 110, 610 25, 680 20 C 710 18, 730 40, 760 30"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        className="drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover:stroke-purple-300 group-hover:drop-shadow-[0_0_16px_rgba(168,85,247,0.9)] transition-all duration-700"
                      />
                    </g>
                  </svg>
                </div>

                {/* Bottom fade out */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/80 to-transparent pointer-events-none" />
              </div>

              {/* Bottom Typography */}
              <div className="relative z-30 pt-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2.5  transition-colors duration-300">
                  Simple analytics
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Make informed decisions backed by data through our cutting-edge analytics tools with instant visual feedback.
                </p>
              </div>
            </div>

            {/* ================= CARD 3: KEYBOARD SHORTCUTS ================= */}
            <div className="lg:col-span-1 bg-[#090a0d] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden">
              {/* Architectural grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="w-full flex flex-col items-center justify-center relative my-10 min-h-[180px] z-10">
                <div className="flex items-center gap-4">
                  {/* Command Key */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#22242b] to-[#111215] border border-white/20 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)]  group-hover:border-white/40 transition-all duration-300 cursor-pointer">
                    <CommandIcon className="w-7 h-7 sm:w-8 sm:h-8 text-gray-200 group-hover:text-white transition-colors" />
                  </div>
                  {/* K Key */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#22242b] to-[#111215] border border-white/20 text-white font-semibold text-2xl sm:text-3xl flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)]  group-hover:border-white/40 transition-all duration-300 cursor-pointer">
                    K
                  </div>
                </div>
                <span className="mt-5 px-3 py-1 rounded-full bg-[#111215]/90 border border-white/10 text-xs font-mono text-gray-400 tracking-wider">
                  Command Menu
                </span>
              </div>

              {/* Bottom Typography */}
              <div className="relative z-30 pt-2 border-t border-white/5 mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2.5  transition-colors duration-300">
                  Keyboard shortcuts
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Take control of your workflow and tasks instantaneously with our intuitive, productivity-driven keyboard shortcuts.
                </p>
              </div>
            </div>

            {/* ================= CARD 4: FULLY SECURE ================= */}
            <div className="lg:col-span-1 bg-[#090a0d] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden">
              {/* Center glow */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl  transition-all duration-700 pointer-events-none" />

              <div className="w-full flex items-center justify-center relative my-10 min-h-[180px]">
                {/* Concentric rings */}
                <div className="absolute w-36 h-36 rounded-full border border-white/10 group-hover:border-white/20 transition-colors duration-500" />
                <div className="absolute w-52 h-52 rounded-full border border-white/[0.06] group-hover:border-white/15 transition-colors duration-500" />
                <div className="absolute w-64 h-64 rounded-full border border-white/[0.03] group-hover:border-white/10 transition-colors duration-500" />

                {/* Center fingerprint container */}
                <div className="relative z-10 p-5 rounded-full bg-[#121419]/90 border border-white/10 group-hover:border-emerald-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-500">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                    {/* Base Layer: Un-scanned Fingerprint (Dims to low opacity on hover) */}
                    <Fingerprint className="w-14 h-14 sm:w-16 sm:h-16 text-gray-300 group-hover:text-gray-500 group-hover:opacity-25 transition-all duration-500" />

                    {/* Top Layer: Scanned Glowing Emerald Fingerprint (Revealing from top to bottom on hover) */}
                    <div className="absolute top-0 left-0 w-full h-0 group-hover:h-full overflow-hidden transition-[height] duration-1000 ease-in-out">
                      <div className="w-14 h-14 sm:w-16 sm:h-16">
                        <Fingerprint className="w-full h-full text-emerald-400 " />
                      </div>
                    </div>

                    {/* Laser Scanner Line that slides across the fingerprint */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 group-hover:top-full w-52 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.9)] group-hover:via-emerald-400  transition-all duration-1000 ease-in-out z-30 pointer-events-none">
                      {/* Laser light beam trail */}
                      <div className="absolute bottom-full left-0 right-0 h-4 bg-gradient-to-t from-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Typography */}
              <div className="relative z-30 pt-2 border-t border-white/5 mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2.5  transition-colors duration-300">
                  Fully Secure
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Your data and proprietary code are safeguarded with robust, enterprise-grade secure authentication methods and end-to-end encryption.
                </p>
              </div>
            </div>

            {/* ================= CARD 5: GLOBAL SEARCH ================= */}
            <div className="lg:col-span-1 bg-[#090a0d] p-6 sm:p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700 pointer-events-none" />

              {/* Search Modal Mock */}
              <div className="w-[95%] sm:w-[90%] ml-auto mt-6 bg-[#111317] border border-white/15 rounded-2xl p-4 sm:p-5 shadow-[0_15px_50px_rgba(0,0,0,0.95)] relative z-10 transition-transform duration-500  ">

                {/* Search Bar */}
                <div className="flex items-center justify-between bg-white/[0.04] border border-white/10 px-3.5 py-2.5 rounded-xl mb-4 text-xs text-gray-400">
                  <div className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition-colors" />
                    <div className="w-24 h-2 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500">ESC</span>
                </div>

                {/* Search Results Skeletons */}
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/5 transition cursor-pointer">
                    <span className="w-3.5 h-3.5 rounded-full border border-gray-600 shrink-0" />
                    <div className="h-2 rounded-full bg-white/15 w-32" />
                  </div>
                  <div className="flex items-center gap-3 px-2.5 py-2 rounded-lg bg-white/[0.06] border border-white/5 text-white">
                    <span className="w-3.5 h-3.5 rounded-full border border-amber-400 shrink-0 bg-amber-400/20" />
                    <div className="h-2 rounded-full bg-amber-400/60 w-44" />
                  </div>
                  <div className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/5 transition cursor-pointer">
                    <span className="w-3.5 h-3.5 rounded-full border border-gray-600 shrink-0" />
                    <div className="h-2 rounded-full bg-white/15 w-28" />
                  </div>
                  <div className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/5 transition cursor-pointer">
                    <span className="w-3.5 h-3.5 rounded-full border border-gray-600 shrink-0" />
                    <div className="h-2 rounded-full bg-white/15 w-36" />
                  </div>
                </div>
              </div>

              {/* Bottom Typography */}
              <div className="relative z-30 pt-2 border-t border-white/5 mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2.5  transition-colors duration-300">
                  Global Search
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Instantly find what you need across your entire workspace, codebases, and docs with powerful fuzzy search capabilities.
                </p>
              </div>
            </div>

          </div>
        </div>



        {/* Decorative corner accents to mimic linear-style grid margins */}
        <div className="hidden xl:block absolute -left-4 top-1/2 w-4 h-[1px] bg-white/10" />
        <div className="hidden xl:block absolute -right-4 top-1/2 w-4 h-[1px] bg-white/10" />

      </div>
    </section>
  );
};

export default DashboardBento;
