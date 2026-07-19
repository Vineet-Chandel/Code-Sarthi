import React, { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Rocket,
  TrendingUp,
  Award,
  GraduationCap,
  FolderGit2,
  BookOpen,
  BadgeCheck,
  Cloud,
  Clock,
  Brain,
  Lightbulb,
  ExternalLink,
  Sparkles,
  Users,
  Link as LinkIcon,
  CheckCircle2,
  ArrowUpRight,
  Medal,
  ChevronDown,
  Zap,
  DollarSign,
  Building2,
  Compass,
  AlertTriangle,
  ListChecks,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens (kept local so the file stays drop-in portable)      */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

const cardHover = {
  whileHover: { scale: 1.02, y: -5 },
  transition: { type: "spring", stiffness: 300, damping: 22 },
};

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

const Badge = memo(function Badge({ children, tone = "neutral", icon: Icon }) {
  if (children === undefined || children === null || children === "") return null;

  const tones = {
    neutral: "bg-white/[0.06] text-white/70 border-white/10",
    high: "bg-rose-500/10 text-rose-300 border-rose-400/20",
    medium: "bg-amber-500/10 text-amber-300 border-amber-400/20",
    low: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-400/20",
    violet: "bg-violet-500/10 text-violet-300 border-violet-400/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-sm ${tones[tone] || tones.neutral
        }`}
    >
      {Icon && <Icon className="h-3 w-3" strokeWidth={2.25} />}
      {children}
    </span>
  );
});

function impactTone(value) {
  const v = (value || "").toString().toLowerCase();
  if (v.includes("high")) return "high";
  if (v.includes("medium")) return "medium";
  if (v.includes("low")) return "low";
  return "neutral";
}

const SectionTitle = memo(function SectionTitle({ icon: Icon, title, subtitle, eyebrow }) {
  return (
    <div className="mb-8 flex items-start gap-4">
      {Icon && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
        </div>
      )}
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-semibold text-white sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-white/50">{subtitle}</p>}
      </div>
    </div>
  );
});

const EmptyState = memo(function EmptyState({ icon: Icon = Compass, message = "Nothing to display yet" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/10 bg-white/[0.015] px-8 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
        <Icon className="h-5 w-5 text-white/30" strokeWidth={1.5} />
      </div>
      <p className="text-sm text-white/35">{message}</p>
    </div>
  );
});

function Section({ children, className = "" }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`mx-auto w-full  px-6 py-14 sm:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero: Score ring + breakdown metrics                               */
/* ------------------------------------------------------------------ */

const ScoreRing = memo(function ScoreRing({ score = 0, size = 208 }) {
  const clamped = Math.max(0, Math.min(100, Number(score) || 0));
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-5xl font-semibold tabular-nums text-transparent">
          {Math.round(clamped)}
        </span>
        <span className="mt-1 text-xs font-medium text-white/40">/ 100</span>
      </div>
    </div>
  );
});

const ProgressMetric = memo(function ProgressMetric({ label, value }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="font-medium tabular-nums text-white/90">{Math.round(clamped)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400"
        />
      </div>
    </div>
  );
});

function ReadinessHero({ overall }) {
  const score = overall?.score;
  const status = overall?.status || overall?.label;
  const summary = overall?.summary || overall?.growthSummary;

  const breakdown = overall?.breakdown;
  const metrics = [
    { label: "Resume Quality", value: breakdown?.resumeQuality },
    { label: "Skill Coverage", value: breakdown?.skillCoverage },
    { label: "ATS Readiness", value: breakdown?.atsReadiness },
    { label: "Profile Completeness", value: breakdown?.profileCompleteness },
  ].filter((m) => m.value !== undefined && m.value !== null);

  if (score === undefined || score === null) {
    return (
      <Section>
        <EmptyState icon={Target} />
      </Section>
    );
  }

  return (
    <Section>
      <motion.div
        {...cardHover}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05] sm:p-12"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <Badge tone="cyan" icon={Sparkles}>
              Overall Readiness
            </Badge>
            <ScoreRing score={score} />
            {status && <p className="text-lg font-medium text-white/80">{status}</p>}
          </div>

          {metrics.length > 0 && (
            <div className="w-full max-w-md space-y-5">
              {metrics.map((m, i) => (
                <ProgressMetric key={i} label={m.label} value={m.value} />
              ))}
            </div>
          )}
        </div>

        {summary && (
          <div className="relative mt-10 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.06] to-indigo-500/[0.06] p-6">
            <Sparkles className="mb-2 h-4 w-4 text-cyan-300" strokeWidth={2} />
            <p className="text-sm italic leading-relaxed text-white/70 sm:text-base">
              &ldquo;{summary}&rdquo;
            </p>
          </div>
        )}
      </motion.div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick Wins                                                         */
/* ------------------------------------------------------------------ */

function QuickWinCard({ win, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...cardHover}
      className="flex min-w-[260px] flex-1 flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" strokeWidth={2} />
        <p className="text-sm font-medium leading-snug text-white/90">{win?.action}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {win?.impact && <Badge tone={impactTone(win.impact)}>{win.impact} Impact</Badge>}
        {win?.time && <Badge icon={Clock}>{win.time}</Badge>}
      </div>
    </motion.div>
  );
}

function QuickWinsSection({ items }) {
  return (
    <Section>
      <SectionTitle icon={Zap} eyebrow="Momentum" title="Quick Wins Today" subtitle="Small changes, fast impact." />
      {items?.length ? (
        <div className="flex flex-wrap gap-4">
          {items.map((win, i) => (
            <QuickWinCard key={i} win={win} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Zap} />
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Roadmap (30 / 60 / 90)                                             */
/* ------------------------------------------------------------------ */

function ResourceCard({ resource }) {
  if (!resource?.name && !resource?.url) return null;
  return (
    <a
      href={resource?.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-3">
        <BookOpen className="h-4 w-4 shrink-0 text-white/40" strokeWidth={1.75} />
        <div>
          <p className="text-sm font-medium text-white/85">{resource?.name}</p>
          {resource?.type && <p className="text-xs text-white/40">{resource.type}</p>}
        </div>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-white/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
    </a>
  );
}

function ExpandableSteps({ steps }) {
  const [open, setOpen] = useState(false);
  if (!steps?.length) return null;

  return (
    <div className="border-t border-white/10 pt-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-white/70">
          <ListChecks className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
          How to achieve
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4 text-white/40" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="steps"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ol className="mt-4 space-y-3">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/65">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-300">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RoadmapCard({ item, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...cardHover}
      className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
    >
      <div className="flex flex-wrap gap-2">
        {item?.priority && <Badge tone={impactTone(item.priority)}>{item.priority} Priority</Badge>}
        {item?.category && <Badge tone="violet">{item.category}</Badge>}
      </div>

      <div>
        <h3 className="text-base font-semibold text-white">{item?.title}</h3>
        {item?.whyItMatters && (
          <p className="mt-2 text-sm leading-relaxed text-white/55">{item.whyItMatters}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/5 bg-white/[0.015] p-4 text-sm sm:grid-cols-3">
        {item?.estimatedImpact && (
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-white/35">
              <TrendingUp className="h-3.5 w-3.5" /> Impact
            </p>
            <p className="text-white/75">{item.estimatedImpact}</p>
          </div>
        )}
        {item?.timeToAchieve && (
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-white/35">
              <Clock className="h-3.5 w-3.5" /> Time
            </p>
            <p className="text-white/75">{item.timeToAchieve}</p>
          </div>
        )}
        {item?.successMetric && (
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-white/35">
              <Target className="h-3.5 w-3.5" /> Success Metric
            </p>
            <p className="text-white/75">{item.successMetric}</p>
          </div>
        )}
      </div>

      <ExpandableSteps steps={item?.howToAchieve} />

      {item?.resource && <ResourceCard resource={item.resource} />}
    </motion.div>
  );
}

function RoadmapColumn({ title, items }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
        <Rocket className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
        <h3 className="text-sm font-semibold tracking-wide text-white/85">{title}</h3>
      </div>
      {items?.length ? (
        <div className="flex flex-col gap-5">
          {items.map((item, i) => (
            <RoadmapCard key={i} item={item} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Rocket} message="Nothing to display yet" />
      )}
    </div>
  );
}

function RoadmapSection({ thirtyDay, sixtyDay, ninetyDay }) {
  return (
    <Section>
      <SectionTitle
        icon={Compass}
        eyebrow="Plan"
        title="30 / 60 / 90 Day Roadmap"
        subtitle="A phased path from where you are to where you're ready."
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <RoadmapColumn title="30 Days" items={thirtyDay} />
        <RoadmapColumn title="60 Days" items={sixtyDay} />
        <RoadmapColumn title="90 Days" items={ninetyDay} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Interview Preparation                                              */
/* ------------------------------------------------------------------ */

function InterviewCard({ area, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...cardHover}
      className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          <Brain className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
          {area?.area}
        </h3>
        {area?.importance && <Badge tone={impactTone(area.importance)}>{area.importance}</Badge>}
      </div>

      {area?.topics?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {area.topics.map((topic, i) => (
            <span
              key={i}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {area?.practiceStrategy && (
        <div className="rounded-2xl border border-white/5 bg-white/[0.015] p-4">
          <p className="mb-1 text-xs uppercase tracking-wide text-white/35">Practice Strategy</p>
          <p className="text-sm leading-relaxed text-white/70">{area.practiceStrategy}</p>
        </div>
      )}

      {area?.resources?.length > 0 && (
        <div className="flex flex-col gap-2">
          {area.resources.map((res, i) => (
            <ResourceCard key={i} resource={res} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function InterviewPrepSection({ items }) {
  return (
    <Section>
      <SectionTitle
        icon={Brain}
        eyebrow="Prepare"
        title="Interview Preparation"
        subtitle="Focus areas ranked by how much they'll matter in the room."
      />
      {items?.length ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((area, i) => (
            <InterviewCard key={i} area={area} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Brain} />
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Portfolio Gaps                                                     */
/* ------------------------------------------------------------------ */

function GapCard({ gap, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...cardHover}
      className="flex flex-col gap-4 rounded-3xl border border-amber-400/15 bg-gradient-to-br from-amber-500/[0.05] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/30"
    >
      <div className="flex items-start gap-3">
        <Lightbulb className="h-7 w-7 shrink-0 text-amber-300" strokeWidth={1.5} />
        <div>
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-amber-300/70">
            <AlertTriangle className="h-3.5 w-3.5" /> Missing Gap
          </p>
          <h3 className="mt-1 text-base font-semibold text-white">{gap?.missingGap}</h3>
        </div>
      </div>
      {gap?.whyItMatters && (
        <p className="text-sm leading-relaxed text-white/60">{gap.whyItMatters}</p>
      )}
      {gap?.suggestedProject && (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <p className="mb-1 text-xs uppercase tracking-wide text-white/35">Suggested Project</p>
          <p className="text-sm leading-relaxed text-white/75">{gap.suggestedProject}</p>
        </div>
      )}
    </motion.div>
  );
}

function PortfolioGapSection({ items }) {
  return (
    <Section>
      <SectionTitle
        icon={FolderGit2}
        eyebrow="Build"
        title="Portfolio Gaps"
        subtitle="What's missing from your project story, and how to fill it."
      />
      {items?.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((gap, i) => (
            <GapCard key={i} gap={gap} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState icon={FolderGit2} />
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Certification Roadmap                                              */
/* ------------------------------------------------------------------ */

function CertCard({ cert, index, isLast }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative flex gap-6 pb-10"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10">
          <Medal className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
        </div>
        {!isLast && <div className="mt-2 w-px flex-1 bg-gradient-to-b from-white/15 to-transparent" />}
      </div>

      <motion.div
        {...cardHover}
        className="mb-2 flex-1 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold text-white">
              <BadgeCheck className="h-4 w-4 text-cyan-300" />
              {cert?.certification}
            </h3>
            {cert?.organization && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/45">
                <Building2 className="h-3.5 w-3.5" /> {cert.organization}
              </p>
            )}
          </div>
          <GraduationCap className="h-5 w-5 shrink-0 text-white/25" strokeWidth={1.5} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cert?.estimatedCost && (
            <Badge icon={DollarSign}>{cert.estimatedCost}</Badge>
          )}
          {cert?.completionTime && <Badge icon={Clock}>{cert.completionTime}</Badge>}
        </div>

        {cert?.studyPath && (
          <p className="mt-4 text-sm leading-relaxed text-white/60">{cert.studyPath}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

function CertificationSection({ items }) {
  return (
    <Section>
      <SectionTitle
        icon={Award}
        eyebrow="Credentials"
        title="Certification Roadmap"
        subtitle="Credentials worth pursuing, in the order they'll pay off."
      />
      {items?.length ? (
        <div className="mx-auto max-w-3xl">
          {items.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} isLast={i === items.length - 1} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Award} />
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Networking Actions                                                 */
/* ------------------------------------------------------------------ */

function NetworkCard({ action, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...cardHover}
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
        <Users className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        {action?.platform && (
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white/40">
            <LinkIcon className="h-3 w-3" /> {action.platform}
          </p>
        )}
        <p className="mt-0.5 truncate text-sm font-medium text-white/85">{action?.action}</p>
      </div>
      {action?.timeRequired && (
        <Badge icon={Clock}>{action.timeRequired}</Badge>
      )}
      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25" />
    </motion.div>
  );
}

function NetworkingSection({ items }) {
  return (
    <Section>
      <SectionTitle
        icon={Users}
        eyebrow="Connect"
        title="Networking Actions"
        subtitle="Small, consistent moves that widen your reach."
      />
      {items?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((action, i) => (
            <NetworkCard key={i} action={action} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Users} />
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                                */
/* ------------------------------------------------------------------ */

export default function GrowthDashboard({ growthData }) {
  const data = growthData?.data.data.data;

  const overall = data?.overallReadinessScore;
  const quickWins = data?.quickWinsToday;
  const thirtyDay = data?.thirtyDayPlan;
  const sixtyDay = data?.sixtyDayPlan;
  const ninetyDay = data?.ninetyDayPlan;
  const interviewPrep = data?.interviewPrepPlan;
  const portfolioGaps = data?.portfolioGaps;
  const certifications = data?.certificationRoadmap;
  const networking = data?.networkingActions;

  return (
    <div className="min-h-screen bg-[#09090B]  font-sans antialiased">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(34,211,238,0.06),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.06),transparent_45%)]" />

      <header className="relative mx-auto w-full px-6 pt-14 sm:px-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/70">
          <Sparkles className="h-3.5 w-3.5" />
          Growth Plan
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Your path to being interview-ready
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/45 sm:text-base">
          A personalized breakdown of where you stand and what moves the needle next.
        </p>
      </header>

      <main className="relative">
        <ReadinessHero overall={overall} />
        <QuickWinsSection items={quickWins} />
        <RoadmapSection thirtyDay={thirtyDay} sixtyDay={sixtyDay} ninetyDay={ninetyDay} />
        <InterviewPrepSection items={interviewPrep} />
        <PortfolioGapSection items={portfolioGaps} />
        <CertificationSection items={certifications} />
        <NetworkingSection items={networking} />
      </main>

      <footer className="relative mx-auto flex w-full  items-center justify-center px-6 py-14 sm:px-8">
        <p className="text-xs text-white/25">Generated from your resume analysis</p>
      </footer>
    </div>
  );
}