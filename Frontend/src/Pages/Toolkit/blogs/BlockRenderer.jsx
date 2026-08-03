import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Sparkles, AlertTriangle, Info, CheckCircle2, ExternalLink, Github, Globe, BookOpen, Presentation, Layers, Award, Tag, Trophy, FileText } from "lucide-react";
import PromptBlock from "./PromptBlock";

export const slugify = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/* ─── Score → color mapping (green = best, red = worst) ─────────────────── */
function scoreColor(total) {
  const n = parseInt(total, 10);
  // 27-30 → emerald green (elite)
  if (n >= 27) return { bar: "#4ADE80", barRgb: "74,222,128", label: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300", ring: "#4ADE80" };
  // 25-26 → teal
  if (n >= 25) return { bar: "#2DD4BF", barRgb: "45,212,191", label: "text-teal-400", badge: "bg-teal-500/20 text-teal-300", ring: "#2DD4BF" };
  // 23-24 → yellow-green
  if (n >= 23) return { bar: "#A3E635", barRgb: "163,230,53", label: "text-lime-400", badge: "bg-lime-500/20 text-lime-300", ring: "#A3E635" };
  // 21-22 → amber
  if (n >= 21) return { bar: "#FBBF24", barRgb: "251,191,36", label: "text-amber-400", badge: "bg-amber-500/20 text-amber-300", ring: "#FBBF24" };
  // 19-20 → orange
  if (n >= 19) return { bar: "#F97316", barRgb: "249,115,22", label: "text-orange-400", badge: "bg-orange-500/20 text-orange-300", ring: "#F97316" };
  // ≤18   → red
  return { bar: "#F87171", barRgb: "248,113,113", label: "text-red-400", badge: "bg-red-500/20 text-red-300", ring: "#F87171" };
}

/* ─── Metric bar component ───────────────────────────────────────────────── */
function MetricBar({ label, value, color, delay }) {
  const pct = (parseInt(value, 10) / 5) * 100;
  return (
    <div className="sih-metric" style={{ animationDelay: delay }}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-[11px] font-black uppercase tracking-widest text-white/50">{label}</span>
        <span className="font-mono text-[12px] font-extrabold" style={{ color }}>{value}/5</span>
      </div>
      <div className="h-[5px] rounded-full bg-white/[0.07] overflow-hidden">
        <div
          className="sih-bar h-full rounded-full"
          style={{ width: `${pct}%`, background: color, animationDelay: delay }}
        />
      </div>
    </div>
  );
}

/* ─── Tooltip card (portal-rendered so overflow:hidden can't clip it) ───── */
function TooltipCard({ row, tooltips, pos }) {
  const rank = row[0];
  const title = row[1];
  const cat = row[2];
  // metrics: innov[3] feas[4] impact[5] depth[6] sust[7] scale[8] total[9]
  const innov = row[3];
  const feas = row[4];
  const impact = row[5];
  const depth = row[6];
  const sust = row[7];
  const scale = row[8];
  const total = row[row.length - 1];
  const desc = tooltips[rank] || "";
  const colors = scoreColor(total);
  const pct = Math.round((parseInt(total, 10) / 30) * 100);

  const metrics = [
    { label: "Innovation", value: innov, color: "#A78BFA" },
    { label: "Feasibility", value: feas, color: "#38BDF8" },
    { label: "Impact", value: impact, color: "#34D399" },
    { label: "Tech Depth", value: depth, color: "#F472B6" },
    { label: "Sustainability", value: sust, color: "#FBBF24" },
    { label: "Scalability", value: scale, color: "#FB923C" },
  ];

  return createPortal(
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: Math.min(820, window.innerWidth - 30),
        zIndex: 2147483647,
        pointerEvents: "none",
      }}
      className="sih-tip"
    >
      <div
        className="rounded-3xl overflow-hidden shadow-[0_12px_60px_rgba(0,0,0,0.9)]"
        style={{
          background: "rgba(9,9,11,0.98)",
          backdropFilter: "blur(32px) saturate(200%)",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 12px 60px rgba(0,0,0,0.9)`,
          border: `3px solid ${colors.ring}`
        }}
      >


        <div className="p-6 space-y-4">
          {/* Header row */}
          <div className="sih-row flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="font-mono text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md"
                  style={{ color: colors.bar, background: `rgba(${colors.barRgb},0.15)` }}
                >
                  Rank #{rank}
                </span>
                <span className="font-mono text-[11px] font-black uppercase tracking-widest text-white/60">
                  {cat}
                </span>
              </div>
              <p className="text-white font-extrabold text-base sm:text-[17px] leading-snug">
                {title}
              </p>
            </div>

            {/* Score ring */}
            <div className="shrink-0 flex flex-col items-center gap-1">
              <svg width="64" height="64" viewBox="0 0 64 64" className="sih-ring">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle
                  cx="32" cy="32" r="26"
                  fill="none"
                  stroke={colors.ring}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                  transform="rotate(-90 32 32)"
                  style={{ filter: `drop-shadow(0 0 6px ${colors.ring})` }}
                />
                <text x="32" y="32" textAnchor="middle" dominantBaseline="central"
                  fill={colors.ring} fontSize="13" fontWeight="900" fontFamily="monospace"
                >
                  {total}
                </text>
              </svg>
              <span className="font-mono text-[10px] text-white/50 tracking-widest">/ 30</span>
            </div>
          </div>

          {/* 6 metric bars */}
          <div className="sih-metrics grid grid-cols-2 gap-x-5 gap-y-3 pt-3 border-t border-white/[0.06]">
            {metrics.map((m, i) => (
              <MetricBar key={m.label} label={m.label} value={m.value} color={m.color} delay={`${i * 40}ms`} />
            ))}
          </div>

          {/* Description - Full Problem Statement Body */}
          {desc && (
            <div className="sih-desc pt-4 mt-1 border-t border-white/[0.06]">
              <p className="text-white/90 text-[14.5px] font-normal leading-relaxed">
                {desc}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Card entrance */
        .sih-tip {
          animation: sihIn 0.18s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes sihIn {
          from { opacity:0; transform: translateY(6px) scale(0.94); filter: blur(2px); }
          to   { opacity:1; transform: translateY(0)   scale(1);    filter: blur(0);   }
        }

        /* Accent bar sweep */
        .sih-accentbar {
          animation: sihBarSweep 0.4s cubic-bezier(0.22,1,0.36,1) both;
          transform-origin: left;
        }
        @keyframes sihBarSweep {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* Header row */
        .sih-row {
          animation: sihFadeUp 0.2s 0.05s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Metric rows */
        .sih-metric {
          animation: sihFadeUp 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Metric bar fill */
        .sih-bar {
          animation: sihFill 0.5s cubic-bezier(0.22,1,0.36,1) both;
          transform-origin: left;
        }
        @keyframes sihFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* Score ring */
        .sih-ring {
          animation: sihRingIn 0.3s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes sihRingIn {
          from { opacity:0; transform: scale(0.6) rotate(-45deg); }
          to   { opacity:1; transform: scale(1)   rotate(0deg);   }
        }

        /* Description */
        .sih-desc {
          animation: sihFadeUp 0.25s 0.15s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Metrics grid */
        .sih-metrics {
          animation: sihFadeUp 0.2s 0.08s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes sihFadeUp {
          from { opacity:0; transform: translateY(5px); }
          to   { opacity:1; transform: translateY(0);   }
        }
      `}</style>
    </div>,
    document.body
  );
}

/* ─── HoverTable ─────────────────────────────────────────────────────────── */
function HoverTable({ block, descriptions = {} }) {
  const headers = block.headers || [];
  const rows = block.rows || [];
  const tooltips = block.tooltips || {};

  // Merge: descriptions (full body from numberedList) take priority over short tooltips
  const allDescs = { ...tooltips, ...descriptions };
  const hasDescs = Object.keys(allDescs).length > 0;
  const CARD_W = Math.min(820, window.innerWidth - 30);
  const CARD_H = 440;
  const OFFSET = 20;

  const [hovered, setHovered] = useState(null); // { row }
  const [pos, setPos] = useState({ x: 0, y: 0 });

  /* Track mouse globally while a row is hovered */
  useEffect(() => {
    if (!hovered) return;
    const onMove = (e) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let x = e.clientX + OFFSET;
      let y = e.clientY + OFFSET;
      if (x + CARD_W > vw - 10) x = e.clientX - CARD_W - OFFSET;
      if (y + CARD_H > vh - 10) y = e.clientY - CARD_H - OFFSET;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [hovered]);

  return (
    <>
      {/* Tooltip portal */}
      {hasDescs && hovered && <TooltipCard row={hovered.row} tooltips={allDescs} pos={pos} />}

      {/* Table */}
      <div className="my-8 overflow-hidden rounded-3xl bg-[#08080A] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/[0.02] text-xs font-bold uppercase tracking-widest text-white/70 font-mono">
              <tr>
                {headers.map((h, hIdx) => (
                  <th
                    key={hIdx}
                    className={`px-4 py-3.5 first:pl-6 last:pr-6 ${headers.length > 2 && hIdx > 2 ? "text-center" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rows.map((row, rIdx) => {
                const rank = row[0];
                const total = row[row.length - 1];
                const colors = scoreColor(total);
                const hasTip = hasDescs && !!allDescs[rank];
                const isHov = hovered?.row === row;

                return (
                  <tr
                    key={rIdx}
                    onMouseEnter={hasTip ? () => setHovered({ row }) : undefined}
                    onMouseLeave={hasTip ? () => setHovered(null) : undefined}
                    className={[
                      "transition-colors duration-100",
                      isHov ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
                      hasTip ? "cursor-pointer" : "",
                      "group",
                    ].join(" ")}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-4 py-3.5 leading-relaxed first:pl-6 last:pr-6 align-middle ${headers.length === 2
                          ? cIdx === 0
                            ? "font-extrabold text-white sm:w-3/4"
                            : "font-mono text-white/70 font-black sm:w-1/4 text-right sm:text-left text-lg"
                          : cIdx === 0
                            ? "font-mono font-bold text-white/40 w-10 text-center tabular-nums text-sm"
                            : cIdx === 1
                              ? `text-[15px] font-semibold min-w-[220px] max-w-[300px] transition-colors duration-100 ${isHov ? "text-white" : "text-white/80 group-hover:text-white"}`
                              : cIdx === 2
                                ? "font-mono text-[11px] font-extrabold uppercase tracking-wide text-white/60 whitespace-nowrap"
                                : cIdx === headers.length - 1
                                  ? `font-mono font-black text-base text-center tabular-nums ${colors.label}`
                                  : "font-mono text-center tabular-nums text-white/60 w-12 font-semibold text-[13px]"
                          }`}
                      >
                        {typeof cell === "object" && cell !== null && cell.title ? (
                          <div className="space-y-2 py-0.5">
                            <div className="font-extrabold text-white text-base sm:text-[16px] tracking-tight">{cell.title}</div>
                            <ul className="list-none space-y-1.5 pl-0">
                              {(cell.subBullets || []).map((b, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/60">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-1.5 shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function BlockRenderer({ blocks = [] }) {
  if (!Array.isArray(blocks)) return null;

  return (
    <div className="flex flex-col gap-6 sm:gap-7">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const id = slugify(block.text);
            const TagName = `h${block.level || 2}`;
            const styles = block.level === 3
              ? "text-xl sm:text-2xl font-bold text-indigo-300 mt-2 tracking-tight"
              : "text-2xl sm:text-3xl font-black text-white mt-6 pt-6 border-t border-white/[0.08] tracking-tight scroll-mt-28 first:mt-0 first:pt-0 first:border-none";
            return (
              <TagName key={index} id={id} className={styles}>
                {block.text}
              </TagName>
            );
          }

          case "paragraph": {
            return (
              <p key={index} className="text-white/80 text-base sm:text-[17px] leading-relaxed font-normal">
                {block.text}
              </p>
            );
          }

          case "image": {
            return (
              <div key={index} className="rounded-3xl overflow-hidden bg-[#0A0A0F] border border-white/[0.08] shadow-2xl relative group">
                <img
                  src={block.src || block.url}
                  alt={block.alt || "Article illustration"}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
                {block.caption && (
                  <div className="px-6 py-3 bg-[#0B0B10] border-t border-white/[0.06] text-center text-xs sm:text-sm font-mono text-white/60">
                    {block.caption}
                  </div>
                )}
              </div>
            );
          }

          case "resourceList": {
            return (
              <div key={index} className="grid grid-cols-1 gap-4">
                {(block.items || []).map((item, idx) => {
                  let IconComponent = Globe;
                  let badgeColor = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
                  let glowGradient = "from-emerald-500/10 via-teal-500/5 to-transparent";
                  let linkStyle = "from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 hover:text-emerald-200 border-emerald-500/40 hover:border-emerald-400";

                  if (item.type === "github" || (item.displayUrl && item.displayUrl.includes("github"))) {
                    IconComponent = Github;
                    badgeColor = "bg-purple-500/15 text-purple-300 border-purple-500/30";
                    glowGradient = "from-purple-500/10 via-indigo-500/5 to-transparent";
                    linkStyle = "from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 text-purple-300 hover:text-purple-200 border-purple-500/40 hover:border-purple-400";
                  } else if (item.type === "guide" || (item.displayUrl && (item.displayUrl.includes("linkedin") || item.displayUrl.includes("lets-code")))) {
                    IconComponent = BookOpen;
                    badgeColor = "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
                    glowGradient = "from-indigo-500/10 via-blue-500/5 to-transparent";
                    linkStyle = "from-indigo-500/20 to-blue-500/20 hover:from-indigo-500/30 hover:to-blue-500/30 text-indigo-300 hover:text-indigo-200 border-indigo-500/40 hover:border-indigo-400";
                  } else if (item.type === "slides" || (item.displayUrl && (item.displayUrl.includes("scribd") || item.displayUrl.includes("slideshare")))) {
                    IconComponent = Presentation;
                    badgeColor = "bg-amber-500/15 text-amber-300 border-amber-500/30";
                    glowGradient = "from-amber-500/10 via-orange-500/5 to-transparent";
                    linkStyle = "from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 hover:text-amber-200 border-amber-500/40 hover:border-amber-400";
                  } else if (item.type === "official" || (item.displayUrl && item.displayUrl.includes("sih.gov.in"))) {
                    IconComponent = Award;
                    badgeColor = "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
                    glowGradient = "from-cyan-500/10 via-blue-500/5 to-transparent";
                    linkStyle = "from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 hover:text-cyan-200 border-cyan-500/40 hover:border-cyan-400";
                  }

                  const targetUrl = item.url || (item.displayUrl ? (item.displayUrl.startsWith("http") ? item.displayUrl : `https://${item.displayUrl}`) : "#");

                  return (
                    <div
                      key={idx}
                      className="group relative rounded-2xl bg-[#0B0B10] hover:bg-[#101017] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between gap-4"
                    >
                      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${glowGradient} rounded-full blur-3xl group-hover:scale-125 transition-all duration-500 pointer-events-none`} />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                          <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 shrink-0 mt-0.5 sm:mt-0">
                            <IconComponent size={20} className="text-white/90" />
                          </div>
                          <div className="space-y-1 min-w-0 flex-1">
                            <h4 className="font-extrabold text-white text-base sm:text-lg tracking-tight truncate sm:whitespace-normal">
                              {item.title}
                            </h4>
                            {item.badge && (
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-black uppercase tracking-wider border ${badgeColor}`}>
                                <Award size={11} className="shrink-0" />
                                <span>{item.badge}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {item.displayUrl && (
                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r border font-mono text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-300 shrink-0 transform group-hover:-translate-y-0.5 ${linkStyle}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={14} className="animate-pulse shrink-0" />
                            <span className="truncate max-w-[280px] sm:max-w-none">{item.displayUrl}</span>
                          </a>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed font-normal pt-2 border-t border-white/[0.06] relative z-10">
                          {item.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }

          case "bulletList": {
            return (
              <ul key={index} className="space-y-3 pl-4">
                {(block.items || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-sm sm:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5 shrink-0" />
                    <span>{typeof item === "string" ? item : item.text || item.title}</span>
                  </li>
                ))}
              </ul>
            );
          }

          case "numberedList": {
            return (
              <div key={index} className="space-y-3.5">
                {(block.items || []).map((item, idx) => {
                  const title = item.title;
                  const body = item.body || (typeof item === "string" ? item : "");
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#0B0B0E] hover:bg-[#111116] transition-all duration-200 shadow-sm"
                    >
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/[0.06] text-white font-mono font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {item.rank !== undefined ? item.rank : idx + 1}
                      </span>
                      <div className="space-y-1 flex-1 min-w-0">
                        {title && (
                          <h4 className="font-extrabold text-white text-base sm:text-[17px] tracking-tight">
                            {title}
                          </h4>
                        )}
                        <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed">
                          {body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }

          case "calloutBox": {
            const variant = block.variant || "info";
            let IconComp = Info;
            let bgStyle = "bg-[#0A0A0F] text-white/90";
            let iconStyle = "text-white bg-white/10";
            let label = "Information";

            if (variant === "warning") {
              IconComp = AlertTriangle;
              bgStyle = "bg-[#110B0B] text-white/90";
              iconStyle = "text-amber-400 bg-amber-500/15";
              label = "Critical Caution";
            } else if (variant === "tip") {
              IconComp = Sparkles;
              bgStyle = "bg-[#0C0A12] text-white/90";
              iconStyle = "text-indigo-300 bg-indigo-500/15";
              label = "Pro Tip";
            }

            return (
              <div
                key={index}
                className={`p-5 sm:p-6 rounded-2xl ${bgStyle} shadow-lg flex items-start gap-4`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${iconStyle}`}>
                  <IconComp size={20} />
                </div>
                <div className="space-y-1 flex-1">
                  <span className="text-[11px] font-mono font-black uppercase tracking-widest text-white/60 block">
                    {label}
                  </span>
                  <p className="text-sm sm:text-base leading-relaxed font-medium text-white/85">
                    {block.text}
                  </p>
                </div>
              </div>
            );
          }

          case "table": {
            // Build rank → body lookup from all numberedList blocks in this content
            const descriptions = {};
            blocks.forEach((b) => {
              if (b.type === "numberedList" && Array.isArray(b.items)) {
                b.items.forEach((item) => {
                  if (item.rank !== undefined && item.body) {
                    descriptions[String(item.rank)] = item.body;
                  }
                });
              }
            });
            return <HoverTable key={index} block={block} descriptions={descriptions} />;
          }

          case "quote": {
            return (
              <blockquote
                key={index}
                className="pl-6 py-4 text-base sm:text-lg italic text-white/80 bg-[#0B0B0E] rounded-2xl shadow-sm border-l-2 border-white/20"
              >
                "{block.text}"
              </blockquote>
            );
          }

          case "promptBlock": {
            return (
              <PromptBlock
                key={index}
                label={block.label}
                text={block.text}
                copyable={block.copyable}
              />
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
