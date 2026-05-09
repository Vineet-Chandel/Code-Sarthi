import React, { useEffect, useRef, useState } from 'react';
import { Layout, Sparkles, Download, CheckCircle2, ArrowRight, ArrowLeft, Clock, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TEMPLATES = [
    { id: 0, name: 'Classic' }, { id: 1, name: 'Sidebar' }, { id: 2, name: 'Bold' },
    { id: 3, name: 'Grid' }, { id: 4, name: 'Minimal' }, { id: 5, name: 'Creative' },
];

const BULLETS = {
    'Software engineer': {
        'Impact-driven': ['Architected microservices migration reducing deploy times by 60%', 'Owned backend infra serving 2M+ daily active users', 'Shipped 14 features in 2 quarters with zero P0 incidents'],
        'Concise': ['Built and deployed 3 production APIs', 'Led backend migration to Node.js', 'Reduced bug backlog by 45%'],
        'Technical': ['Designed event-driven architecture using Kafka & Redis', 'Implemented CI/CD pipelines via GitHub Actions & Docker', 'Optimized SQL queries cutting p95 latency from 800ms to 90ms'],
    },
    'Product manager': {
        'Impact-driven': ['Grew DAU 38% by launching a redesigned onboarding flow', 'Drove $2.4M ARR through a new upsell strategy', 'Aligned 4 engineering teams on a single 6-month roadmap'],
        'Concise': ['Launched 3 core product features on time', 'Increased retention by 22%', 'Managed a $1.2M product budget'],
        'Technical': ['Defined API contracts between frontend and data teams', 'Wrote detailed PRDs with acceptance criteria for 12 epics', 'Partnered with ML team to ship a recommendation engine'],
    },
};

const ROLES = ['Software engineer', 'Product manager', 'Designer', 'Data analyst'];
const TONES = ['Impact-driven', 'Concise', 'Technical'];

function TemplateThumb({ id, selected, onSelect }) {
    return (
        <div
            onClick={() => onSelect(id)}
            className={`cursor-pointer rounded-xl border-2 p-2 flex flex-col items-center gap-1.5 transition-all hover:-translate-y-0.5 ${selected ? 'border-neutral bg-base-300' : 'border-base-300 bg-base-100 hover:border-warning'}`}
        >
            <div className="w-full h-12 rounded-md border border-base-300 bg-base-100 flex flex-col justify-center gap-1 px-2">
                <div className="h-1 bg-warning rounded-full w-4/5" />
                <div className="h-1 bg-base-300 rounded-full w-3/5" />
                <div className="h-1 bg-base-300 rounded-full w-4/5" />
            </div>
            <span className="text-[10px] font-semibold text-neutral tracking-wide">{TEMPLATES[id].name}</span>
        </div>
    );
}

function TypeWriter({ text, delay = 0 }) {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        setDisplayed('');
        let i = 0;
        const t = setTimeout(() => {
            const iv = setInterval(() => {
                setDisplayed(text.slice(0, ++i));
                if (i >= text.length) clearInterval(iv);
            }, 18);
            return () => clearInterval(iv);
        }, delay);
        return () => clearTimeout(t);
    }, [text, delay]);
    return <span>{displayed}{displayed.length < text.length && <span className="animate-pulse">|</span>}</span>;
}

function DownloadBar({ label, icon: Icon }) {
    const [pct, setPct] = useState(0);
    const [done, setDone] = useState(false);
    const [running, setRunning] = useState(false);
    const start = () => {
        if (running) return;
        setRunning(true);
        let p = 0;
        const iv = setInterval(() => {
            p += Math.floor(Math.random() * 14) + 4;
            if (p >= 100) { p = 100; setDone(true); clearInterval(iv); }
            setPct(p);
        }, 120);
    };
    return (
        <div className="flex items-center gap-2 text-xs font-medium text-base-content cursor-pointer" onClick={start}>
            <Icon className="w-3.5 h-3.5 text-warning flex-shrink-0" />
            <span className="w-24">{label}</span>
            <div className="flex-1 h-1.5 bg-base-300 rounded-full overflow-hidden">
                <div className="h-full bg-neutral rounded-full transition-all duration-150" style={{ width: pct + '%' }} />
            </div>
            <span className={`w-10 text-right font-bold ${done ? 'text-accent' : 'text-neutral'}`}>{done ? 'Done' : pct ? pct + '%' : '—'}</span>
        </div>
    );
}

const STEPS = [
    {
        number: '01', title: 'Pick a template', subtitle: 'Your first impression starts here',
        icon: Layout, iconCls: 'bg-warning text-warning-content', time: '~1 minute', TimeIcon: Clock,
        desc: 'Browse recruiter-approved layouts battle-tested against modern ATS systems.',
        checks: ['ATS-friendly & recruiter-approved', 'Flexible, modern layouts', 'Job and industry matched'],
    },
    {
        number: '02', title: 'Add context with AI', subtitle: 'Let intelligence fill the gaps',
        icon: Sparkles, iconCls: 'bg-base-300 text-base-content', time: '~3 minutes', TimeIcon: Zap,
        desc: 'Transform rough notes into polished, impactful bullet points hiring managers actually read.',
        checks: ['Beats writer\'s block instantly', 'AI bullet point enhancer', 'Tailored to your industry'],
    },
    {
        number: '03', title: 'Download & send', subtitle: 'Ready before your coffee cools',
        icon: Download, iconCls: 'bg-secondary text-secondary-content', time: '~1 minute', TimeIcon: Star,
        desc: 'Export in PDF or Word in seconds. Multiple versions for different roles.',
        checks: ['PDF and Word formats', 'Unlimited versions & exports', 'Ready in under 5 minutes'],
    },
];

export default function BuildResume() {
    const navigate = useNavigate();
    const [cur, setCur] = useState(0);
    const [dir, setDir] = useState(1);
    const [visible, setVisible] = useState(false);
    const [selTempl, setSelTempl] = useState(0);
    const [role, setRole] = useState('Software engineer');
    const [tone, setTone] = useState('Impact-driven');
    const [bullets, setBullets] = useState([]);
    const [generating, setGenerating] = useState(false);

    useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

    const goTo = (n) => {
        if (n < 0 || n > 2) return;
        setDir(n > cur ? 1 : -1);
        setCur(n);
    };

    const generate = () => {
        setGenerating(true);
        setBullets([]);
        const src = BULLETS[role]?.[tone] || BULLETS['Software engineer']['Impact-driven'];
        src.forEach((b, i) => setTimeout(() => {
            setBullets(prev => [...prev, b]);
            if (i === src.length - 1) setGenerating(false);
        }, i * 320));
    };

    const step = STEPS[cur];
    const Icon = step.icon;

    return (
        <div className="w-screen min-h-screen bg-base-200 flex justify-center items-start py-8 px-4 font-sans">
            <div className="w-[90%] bg-base-100 p-8 md:p-10 rounded-box border-[2px] border-base-300">

                {/* Header */}
                <div className="text-center mb-10" style={{
                    opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(-16px)',
                    transition: 'opacity .7s ease, transform .7s ease'
                }}>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-neutral bg-base-300 rounded-selector px-4 py-1.5 mb-4 border-[2px] border-base-300">
                        resume builder
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-base-content mb-3 leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        Here's how we <em className="text-accent not-italic">get you hired.</em>
                    </h1>
                    <p className="text-base-content/50 text-sm max-w-md mx-auto">Walk through each step live — everything is interactive.</p>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-center max-w-sm mx-auto mb-1 gap-0">
                    {STEPS.map((s, i) => (
                        <React.Fragment key={i}>
                            <button
                                onClick={() => goTo(i)}
                                className={`w-9 h-9 rounded-full border-[2px] flex items-center justify-center text-xs font-bold transition-all z-10 flex-shrink-0
                  ${i === cur ? 'bg-warning border-base-300 text-warning-content scale-110' : i < cur ? 'bg-neutral border-neutral text-neutral-content' : 'bg-base-100 border-base-300 text-base-content/50'}`}
                            >{i + 1}</button>
                            {i < 2 && (
                                <div className="flex-1 h-0.5 bg-base-300 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-neutral transition-all duration-500" style={{ width: i < cur ? '100%' : '0%' }} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="max-w-sm mx-auto h-1 bg-base-300 rounded-full overflow-hidden mb-8 mt-3">
                    <div className="h-full bg-neutral rounded-full transition-all duration-500"
                        style={{ width: cur === 0 ? '16%' : cur === 1 ? '50%' : '90%' }} />
                </div>

                {/* Stepper nav */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <button onClick={() => goTo(cur - 1)} disabled={cur === 0}
                        className="w-9 h-9 rounded-full bg-base-200 border-[2px] border-base-300 flex items-center justify-center text-base-content/50 hover:bg-base-300 disabled:opacity-30 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-base-content text-sm min-w-[140px] text-center"
                        style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</span>
                    <button onClick={() => goTo(cur + 1)} disabled={cur === 2}
                        className="w-9 h-9 rounded-full bg-base-200 border-[2px] border-base-300 flex items-center justify-center text-base-content/50 hover:bg-base-300 disabled:opacity-30 transition-all">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Panel */}
                <div className="bg-base-100 border-[2px] border-base-300 rounded-box overflow-hidden"
                    style={{ animation: `${dir > 0 ? 'slideIn' : 'slideInLeft'} .35s ease` }}>
                    <style>{`
            @keyframes slideIn { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:none } }
            @keyframes slideInLeft { from { opacity:0; transform:translateX(-20px) } to { opacity:1; transform:none } }
          `}</style>

                    {/* Step 1: Template picker */}
                    {cur === 0 && (
                        <div>
                            <div className="bg-base-200 border-b-[2px] border-base-300 p-5">
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                    {TEMPLATES.map(t => <TemplateThumb key={t.id} id={t.id} selected={selTempl === t.id} onSelect={setSelTempl} />)}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${step.iconCls} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral mb-0.5">Step {step.number}</p>
                                        <h3 className="text-lg font-bold text-base-content" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                                        <p className="text-xs text-accent">{step.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-base-content/60">{step.desc}</p>
                                <ul className="space-y-2">
                                    {step.checks.map(c => (
                                        <li key={c} className="flex items-center gap-2 text-sm font-medium text-base-content">
                                            <CheckCircle2 className="w-4 h-4 text-warning flex-shrink-0" />{c}
                                        </li>
                                    ))}
                                </ul>
                                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-warning-content bg-warning border-[2px] border-base-300 rounded-selector px-3 py-1 self-start">
                                    <Clock className="w-3 h-3" /> Selected: {TEMPLATES[selTempl].name}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: AI bullets */}
                    {cur === 1 && (
                        <div>
                            <div className="bg-base-200 border-b-[2px] border-base-300 p-5 flex flex-col gap-3">
                                <div>
                                    <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral mb-2">Your role</p>
                                    <div className="flex flex-wrap gap-2">
                                        {ROLES.map(r => (
                                            <button key={r} onClick={() => setRole(r)}
                                                className={`text-xs font-semibold px-3 py-1.5 rounded-selector border-[2px] transition-all ${role === r ? 'bg-warning border-base-300 text-warning-content' : 'bg-base-100 border-base-300 text-base-content hover:border-warning'}`}>
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral mb-2">Tone</p>
                                    <div className="flex flex-wrap gap-2">
                                        {TONES.map(t => (
                                            <button key={t} onClick={() => setTone(t)}
                                                className={`text-xs font-semibold px-3 py-1.5 rounded-selector border-[2px] transition-all ${tone === t ? 'bg-warning border-base-300 text-warning-content' : 'bg-base-100 border-base-300 text-base-content hover:border-warning'}`}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={generate}
                                    className="self-start flex items-center gap-2 bg-warning hover:bg-neutral hover:text-neutral-content text-warning-content border-[2px] border-base-300 rounded-selector px-4 py-2 text-xs font-bold transition-all">
                                    <Sparkles className="w-3.5 h-3.5" /> Generate bullet points
                                </button>
                                {bullets.length > 0 && (
                                    <div className="bg-base-100 border-[2px] border-base-300 rounded-xl p-3 flex flex-col gap-2">
                                        {bullets.map((b, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs font-medium text-base-content">
                                                <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                                                <TypeWriter text={b} delay={0} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${step.iconCls} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral mb-0.5">Step {step.number}</p>
                                        <h3 className="text-lg font-bold text-base-content" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                                        <p className="text-xs text-accent">{step.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-base-content/60">{step.desc}</p>
                                <ul className="space-y-2">
                                    {step.checks.map(c => <li key={c} className="flex items-center gap-2 text-sm font-medium text-base-content"><CheckCircle2 className="w-4 h-4 text-warning flex-shrink-0" />{c}</li>)}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Download */}
                    {cur === 2 && (
                        <div>
                            <div className="bg-base-200 border-b-[2px] border-base-300 p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-20 bg-base-100 border-[2px] border-base-300 rounded-xl flex flex-col items-center justify-center gap-1.5 relative flex-shrink-0">
                                        {[32, 24, 32, 20].map((w, i) => <div key={i} className="h-1.5 bg-base-300 rounded-full" style={{ width: w }} />)}
                                        <Download className="w-4 h-4 text-neutral mt-1" />
                                        <span className="absolute -top-2 -right-2 text-[9px] font-bold bg-warning text-warning-content px-1.5 py-0.5 rounded-full">PDF</span>
                                        <span className="absolute -bottom-2 -left-2 text-[9px] font-bold bg-secondary text-secondary-content px-1.5 py-0.5 rounded-full">DOCX</span>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <DownloadBar label="resume.pdf" icon={Download} />
                                        <DownloadBar label="resume.docx" icon={Download} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${step.iconCls} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral mb-0.5">Step {step.number}</p>
                                        <h3 className="text-lg font-bold text-base-content" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                                        <p className="text-xs text-accent">{step.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-base-content/60">{step.desc}</p>
                                <ul className="space-y-2">
                                    {step.checks.map(c => <li key={c} className="flex items-center gap-2 text-sm font-medium text-base-content"><CheckCircle2 className="w-4 h-4 text-warning flex-shrink-0" />{c}</li>)}
                                </ul>
                                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-warning-content bg-warning border-[2px] border-base-300 rounded-selector px-3 py-1 self-start">
                                    <Zap className="w-3 h-3" /> Total time: under 5 minutes
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats + CTA */}
                <div className="flex flex-wrap justify-center gap-3 mt-8 mb-6">
                    {[['ti-users', '50,000+', 'job seekers'], ['ti-shield-check', 'ATS', 'guaranteed'], ['ti-clock', 'Under 5 mins', 'to complete']].map(([ic, b, s]) => (
                        <div key={b} className="inline-flex items-center gap-2 text-xs font-medium text-base-content bg-base-100 border-[2px] border-base-300 rounded-full px-4 py-2">
                            <span className="text-warning text-base"><i className={`ti ${ic}`} /></span>
                            <strong className="text-accent">{b}</strong>{s}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => navigate('/app/build-resume/resume-templates')}
                        className="group flex items-center gap-3 bg-secondary hover:bg-neutral text-secondary-content border-[2px] border-secondary rounded-selector px-10 py-4 text-sm font-semibold transition-all duration-200 hover:-translate-y-1 active:scale-95">
                        Start building my resume
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xs text-base-content/40">No credit card required · free to start</p>
                </div>

            </div>
        </div>
    );
}