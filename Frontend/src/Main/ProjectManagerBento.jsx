import React from "react";
import { Briefcase, AlertCircle, Plus, LayoutGrid, Users, Activity, CheckCircle2, ArrowUpRight, Flame } from "lucide-react";

const ProjectManagerBento = () => {
  return (
    <section className="w-full bg-black text-white py-24 px-4 md:px-8 font-poppins relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[500px] bg-gradient-to-tl from-blue-500/10 via-transparent to-transparent blur-[100px]" />

      <div className="max-w-[1500px] mx-auto relative z-10 flex flex-col">

        {/* Section Header */}
        <div className="mb-16 text-center md:text-start flex flex-col md:items-start items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0a0a0a] border border-white/10 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 rounded-full shadow-lg">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>Project Management Engine</span>
          </div>
          <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-4">
            Orchestrate your workflow with <span className="text-white/70 italic">precision.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            A comprehensive hub to initialize projects, manage issues, track feature requests, and analyze team contributions in real-time.
          </p>
        </div>

        {/* Vertical Bento Flow (Full Width Cards) */}
        <div className="flex flex-col gap-6">

          {/* ================= CARD 1: MAIN DASHBOARD ================= */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden group shadow-2xl flex flex-col justify-between">
            {/* Ambient Glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none transition-all group-hover:bg-indigo-500/20" />

            <div className="relative z-20 flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  Personal Project Hub
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Oversee all your active repositories. Initialize new projects, monitor status, and maintain a bird's-eye view of your entire development ecosystem.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <Plus size={16} /> New Project
                </button>
              </div>
            </div>

            {/* Dashboard Image */}
            <div className="relative z-10 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:-translate-y-2 transition-transform duration-700">
              {/* Top fade overlay */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent pointer-events-none" />
              <img
                src="https://res.cloudinary.com/dj0ivep44/image/upload/v1785956396/Screenshot_2026-08-06_at_12.29.49_AM_iawhhm.png"
                alt="Personal Project Management Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* ================= CARD 2: STATS & ANALYTICS ================= */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden group shadow-2xl flex flex-col justify-between">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none transition-all group-hover:bg-blue-500/20" />

            <div className="relative z-20 mb-8 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                Velocity & Progress Analytics
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Deep dive into your project's health. Monitor whole progress data, completion rates, and sprint velocity through beautiful, interactive charts.
              </p>
            </div>

            {/* Stats Image */}
            <div className="relative z-10 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.01] transition-transform duration-700">
              <img
                src="https://res.cloudinary.com/dj0ivep44/image/upload/v1786027775/Screenshot_2026-08-06_at_8.19.25_PM_wjt4pq.png"
                alt="Project Statistics and Progress Data"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectManagerBento;
