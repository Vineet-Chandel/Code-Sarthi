import React from "react";
import { Target, Flame, ChevronRight, CheckCircle2, Layers } from "lucide-react";

const GoalTrackerBento = () => {
  return (
    <section className="w-full bg-black text-white py-24 px-4 md:px-8 font-poppins relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[800px] h-[600px] bg-gradient-to-tl from-emerald-500/10 via-teal-500/5 to-transparent blur-[120px]" />

      <div className="max-w-[1500px] mx-auto relative flex flex-col">

        {/* Section Header */}
        <div className="mb-16 text-center md:text-start flex flex-col md:items-start items-center relative z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0a0a0a] border border-white/10 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 rounded-full shadow-lg">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>Goal Tracking System</span>
          </div>
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-4">
            Turn ambitions into <span className="text-white/70 italic">achievements.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            A high-performance tracker built for absolute focus. Set precise targets, monitor progress, and crush your milestones with real-time analytics.
          </p>
        </div>

        {/* The Main Scene (No background, no borders on the container) */}
        <div className="w-full relative min-h-[500px] md:min-h-[600px] flex flex-col justify-center">

          {/* Left Side: Typography and Floating Dummy Data */}
          <div className="w-full lg:w-[40%] relative z-20 flex flex-col gap-10">

            {/* Typography */}
            <div className="max-w-xl">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 flex items-center gap-3">
                Visualize your trajectory
              </h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Every milestone recorded. Every deadline met. Our tracker gives you an eagle-eye view of your long-term objectives with beautiful, intuitive visualizations and interactive boards.
              </p>


            </div>

            {/* Floating Dummy Data Blocks */}
            <div className="flex flex-col sm:flex-row gap-6 mt-4 max-w-2xl">

              {/* Block 1: Streak */}
              <div className="bg-[#0a0a0a]  rounded-3xl p-6 relative overflow-hidden group  transition-all cursor-pointer w-full sm:w-48 flex flex-col justify-center">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl  " />
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4  transition-transform">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-4xl font-black text-white leading-none mb-2">14</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Day Streak</p>
              </div>

              {/* Block 2: Progress (Compact) */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer shadow-2xl flex-1 flex flex-col justify-between">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />

                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h4 className="text-sm font-bold text-white">Weekly Targets</h4>
                  <div className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono font-bold text-emerald-400 border border-white/10">82%</div>
                </div>

                <div className="space-y-5 relative z-10">
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold mb-2 text-gray-400">
                      <span className="flex items-center gap-1.5 text-white/80"><CheckCircle2 size={12} className="text-emerald-400" /> Ship MVP</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full w-[90%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-semibold mb-2 text-gray-400">
                      <span className="flex items-center gap-1.5 text-white/80"><Layers size={12} className="text-blue-400" /> System Design</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full w-[65%]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Extreme Right Image (hidden via translate-x on desktop, full screen on mobile) */}
          <div className="relative mt-12 w-full lg:absolute lg:mt-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-0 lg:translate-x-[40%] lg:w-[1100px] xl:w-[1300px] z-10 pointer-events-none opacity-100 transition-transform duration-1000 group">

            {/* Fade Overlays to blend gracefully with the black background */}
            {/* Left Edge Fade */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            {/* Top Edge Fade */}
            <div className="absolute inset-x-0 top-0 h-8 sm:h-16 md:h-64 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
            {/* Bottom Edge Fade */}
            <div className="absolute inset-x-0 bottom-0 h-8 sm:h-16 md:h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

            <img
              src="https://res.cloudinary.com/dj0ivep44/image/upload/v1785956361/Screenshot_2026-08-06_at_12.28.59_AM_hvodk5.png"
              alt="CodeSarthi Goal Tracker Interface"
              className="w-full h-auto object-cover rounded-2xl sm:rounded-tl-[3rem] shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/5 lg:border-r-0 lg:border-b-0"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default GoalTrackerBento;
