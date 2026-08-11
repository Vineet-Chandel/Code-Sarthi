import { motion } from "framer-motion";
import React from "react";

const ACCENTS = {
  blue: { icon: "text-[#4F46E5]", soft: "bg-[#4F46E5]/10", glow: "bg-[#4F46E5]" },
  purple: { icon: "text-[#8B5CF6]", soft: "bg-[#8B5CF6]/10", glow: "bg-[#8B5CF6]" },
  orange: { icon: "text-[#F59E0B]", soft: "bg-[#F59E0B]/10", glow: "bg-[#F59E0B]" },
};


const MainCTAbutton2 = ({ ClassName = "" }) => {
  return (


    <div onClick={() => navigate("/login")} className={`mt-3 flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>

      <span className="text-white relative -right-[1px]" >
        <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
          <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
            fill="#000"
          ></path>
        </svg>
      </span>
      <button className="bg-black text-white  px-4 py-[7.5px] ">Open CodeSarthi !</button>
      <span className="text-white relative -left-[1px]">
        <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
            fill="#000"
          />
        </svg>
      </span>
    </div>
  )
}
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



const SectionTitle = () => (
  <div className="flex flex-col items-start text-left">

    <img className='mb-10 sm:mr-5 w-15 h-15' src="https://neon.com/_next/static/media/autoscaling.0_g.t5157bv5u.svg?dpl=dpl_2krqjZKb71veXn3xx7f5ScK8b3Aj" alt="" />
    <h2 className="w-[95%] text-[34px] font-black leading-[1.15] tracking-tight text-gray-900 md:text-[48px] lg:text-[62px]">
      Effectivity your workflow
      <br />
      better with good collaboration
    </h2>
    <p className="mt-6 w-[75%] text-lg leading-relaxed text-gray-500 mb-6">
      Boost your team's productivity with powerful collaboration tools. Our platform allows your team to work
      together in real time, share insights effortlessly, and streamline communication.
    </p>

    <MainCTAbutton2 />
  </div>
);

const DashboardMockup = () => (
  <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-[#F6F5FF] via-[#FAFAFC] to-white p-4 shadow-[0_1px_2px_rgba(15,15,35,0.04),0_24px_48px_-16px_rgba(67,56,202,0.18)] ring-1 ring-black/[0.04]">
    {/* ambient glow */}
    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-300/30 to-violet-300/10 blur-3xl" />
    <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-amber-200/20 blur-3xl" />

    {/* top bar */}
    <div className="relative flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-[0_1px_2px_rgba(15,15,35,0.04),0_8px_20px_-8px_rgba(15,15,35,0.08)] ring-1 ring-black/[0.04] backdrop-blur">
      <div className="h-5 w-5 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_2px_6px_rgba(99,102,241,0.4)]" />
      <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-50" />
      <div className="h-4 w-4 shrink-0 rounded-md bg-gray-100" />
    </div>

    {/* tabs */}
    <div className="relative mt-3.5 flex gap-1.5">
      {["Projects", "Meeting", "Settings"].map((label, i) => (
        <span
          key={label}
          className={`rounded-full px-3 py-1 text-[9px] font-medium tracking-wide transition-all ${i === 0
            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_12px_-2px_rgba(99,102,241,0.5)]"
            : "bg-white/80 text-gray-400 ring-1 ring-black/[0.04]"
            }`}
        >
          {label}
        </span>
      ))}
    </div>

    {/* list card */}
    <div className="relative mt-3.5 space-y-2.5 rounded-2xl bg-white p-3.5 shadow-[0_1px_2px_rgba(15,15,35,0.04),0_12px_28px_-10px_rgba(15,15,35,0.1)] ring-1 ring-black/[0.04]">
      {[
        { tint: "from-indigo-100 to-indigo-50", w: "w-[85%]" },
        { tint: "from-violet-100 to-violet-50", w: "w-[65%]" },
        { tint: "from-amber-100 to-amber-50", w: "w-[75%]" },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className={`h-7 w-7 shrink-0 rounded-xl bg-gradient-to-br ${row.tint} ring-1 ring-black/[0.03]`} />
          <div className="flex-1 space-y-1">
            <div className={`h-2 ${row.w} rounded-full bg-gray-100`} />
          </div>
          <div className="flex -space-x-1.5">
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 ring-2 ring-white" />
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-violet-400 to-violet-500 ring-2 ring-white" />
          </div>
        </div>
      ))}
    </div>

    {/* floating avatar cluster */}
    <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1.5 shadow-[0_8px_20px_-6px_rgba(15,15,35,0.18)] ring-1 ring-black/[0.04] backdrop-blur">
      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 ring-2 ring-white" />
      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 ring-2 ring-white" />
      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 ring-2 ring-white" />
    </div>
  </div>
);

const ChatMockup = () => (
  <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_1px_2px_rgba(15,15,35,0.04),0_24px_48px_-16px_rgba(15,15,35,0.14)] ring-1 ring-black/[0.05]">
    <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet-200/25 blur-3xl" />

    {/* window chrome */}
    <div className="relative flex items-center justify-between border-b border-black/[0.05] pb-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
      </div>
      <div className="h-5 w-24 rounded-full bg-gray-50 ring-1 ring-black/[0.04]" />
      <div className="flex -space-x-1.5">
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-400 to-violet-500 ring-2 ring-white" />
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 ring-2 ring-white" />
      </div>
    </div>

    {/* thread */}
    <div className="relative mt-3.5 space-y-3 overflow-hidden">
      <div className="flex items-start gap-2">
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-violet-300 to-violet-400 shadow-sm" />
        <div className="max-w-[72%] rounded-2xl rounded-tl-sm bg-gray-50 px-3.5 py-2.5 ring-1 ring-black/[0.03]">
          <div className="h-2 w-20 rounded-full bg-gray-200" />
          <div className="mt-1.5 h-2 w-14 rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="flex items-start justify-end gap-2">
        <div className="max-w-[72%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-500 to-indigo-600 px-3.5 py-2.5 shadow-[0_6px_16px_-6px_rgba(124,58,237,0.5)]">
          <div className="h-2 w-16 rounded-full bg-white/75" />
        </div>
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-indigo-300 to-indigo-400 shadow-sm" />
      </div>

      <div className="flex items-start gap-2">
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-violet-300 to-violet-400 shadow-sm" />
        <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-[0_1px_2px_rgba(15,15,35,0.04),0_8px_16px_-8px_rgba(15,15,35,0.12)] ring-1 ring-black/[0.04]">
          <div className="h-6 w-6 shrink-0 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-50" />
          <div className="h-2 w-12 rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="ml-8 flex gap-1.5">
        <span className="flex h-5 items-center gap-1 rounded-full bg-white px-2 text-[10px] shadow-sm ring-1 ring-black/[0.05]">
          <span className="text-gray-500">👍</span>
          <span className="text-gray-400">2</span>
        </span>
        <span className="flex h-5 items-center rounded-full bg-white px-2 text-[10px] shadow-sm ring-1 ring-black/[0.05]">
          🎉
        </span>
      </div>
    </div>

    {/* composer */}
    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(15,15,35,0.04),0_10px_24px_-10px_rgba(15,15,35,0.14)] ring-1 ring-black/[0.06]">
      <div className="h-2 flex-1 rounded-full bg-gray-100" />
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_4px_10px_-2px_rgba(99,102,241,0.5)]">
        <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white">
          <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
        </svg>
      </div>
    </div>
  </div>
);

const PHONE_ROWS = [
  { grad: "from-indigo-400 to-indigo-500", unread: true, time: "9:41" },
  { grad: "from-violet-400 to-violet-500", unread: false, time: "9:24" },
  { grad: "from-amber-400 to-amber-500", unread: true, time: "Mon" },
  { grad: "from-emerald-400 to-emerald-500", unread: false, time: "Sun" },
];

const PhoneMockup = () => (
  <div className="relative flex h-full w-full items-center justify-center">
    <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-gradient-to-br from-indigo-200/40 to-violet-200/20 blur-3xl" />

    <div className="relative w-[196px]">
      <div className="rounded-[42px] bg-gradient-to-b from-gray-800 to-gray-900 p-[6px] shadow-[0_30px_60px_-20px_rgba(15,15,35,0.45)]">
        <div className="relative h-[404px] w-full overflow-hidden rounded-[36px] bg-white">
          <div className="absolute left-1/2 top-2.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-gray-900" />

          <div className="flex items-center justify-between px-4 pt-8">
            <span className="text-[10px] font-semibold tracking-wide text-gray-900">Messages</span>
            <div className="relative h-5 w-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-400 shadow-[0_2px_6px_rgba(251,191,36,0.5)]">
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </div>
          </div>

          <div className="mx-4 mt-3 flex h-6 items-center gap-1.5 rounded-full bg-gray-50 px-2.5 ring-1 ring-black/[0.03]">
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-none stroke-gray-300 stroke-2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <div className="h-1.5 w-14 rounded-full bg-gray-200" />
          </div>

          <div className="mt-3.5 space-y-3.5 px-4">
            {PHONE_ROWS.map((row, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${row.grad} shadow-sm ring-2 ring-white`} />
                <div className="min-w-0 flex-1">
                  <div className="h-2 w-14 rounded-full bg-gray-300" />
                  <div className="mt-1.5 h-2 w-20 rounded-full bg-gray-100" />
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-[7px] text-gray-300">{row.time}</span>
                  {row.unread && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-around border-t border-black/[0.04] bg-white/95 py-3.5 backdrop-blur">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-5 rounded-full ${i === 0 ? "bg-gradient-to-r from-indigo-600 to-violet-600" : "bg-gray-200"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);


const FeatureCard = ({ accent, icon, title, subtitle, children, index }) => (
  <motion.div

    initial={{
      opacity: 0,
      y: 80,
      scale: 0.94,
    }}

    whileInView={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}

    transition={{
      duration: .7,
      ease: [0.22, 1, 0.36, 1],
      delay: index * .55
    }}
    className="group relative flex h-auto flex-col overflow-hidden   p-8 ">

    <div className="absolute inset-0 ">

      <svg fill="#fff" stroke="rgba(123, 123, 123, 1)" strokeOpacity={"0.25"} height="100%" preserveAspectRatio="none" viewBox="0 0 443 494" width="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 490V4a4 4 0 0 1 4-4h288.23c.932 0 1.856.163 2.731.48l60.814 22.09c.875.318 1.8.48 2.731.48H439a4 4 0 0 1 4 4V490a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4" fill="var(--color-white)"></path>
        <path d="M4 .5h288.23c.874 0 1.74.152 2.561.45l60.813 22.09c.931.338 1.912.51 2.902.51H439a3.5 3.5 0 0 1 3.5 3.5V490a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 490V4A3.5 3.5 0 0 1 4 .5Z" stroke="var(--color-black-20)"></path>
      </svg>
    </div>

    <div className="relative z-10 flex h-full flex-col">
      <h3 className="mt-6 text-[30px] font-bold leading-tight tracking-tight text-gray-900">{title}</h3>
      <div className="my-3 w-full border-t border-dotted border-gray-400"></div>
      <p className="mt-3 text-base leading-relaxed text-gray-500">{subtitle}</p>
      <div className="relative mt-6 min-h-0 flex-1">{children}</div>

    </div>
  </motion.div>
);

const CollaborationSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[52%] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-[10%] top-[38%] h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 py-16 md:px-8 md:py-24">
        <SectionTitle />

        <div className="mt-20 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            accent="blue"
            icon={<DashboardGlyph />}
            title="Optimize Team Work!"
            subtitle="Good teamwork become smooth with good management team from services"
            index={0}
          >
            <DashboardMockup />
          </FeatureCard>

          <FeatureCard
            accent="purple"
            icon={<ChatGlyph />}
            title="Grow Up Team Collaboratte"
            subtitle="Communication more important and good proportionality work"
            index={1}
          >
            <ChatMockup />
          </FeatureCard>

          <FeatureCard
            accent="orange"
            icon={<PhoneGlyph />}
            title="Mobile User Friendly"
            subtitle="Wherever you are, it's still easy to organize projects from your phone"
            index={2}
          >
            <PhoneMockup />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;