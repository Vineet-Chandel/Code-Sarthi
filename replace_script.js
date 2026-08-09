const fs = require('fs');
const filePath = '/Users/vineetchandel/Developer/CodeSarthi/Frontend/src/Main/PagesMain/Sub-Category/Safety-Category/Hub/PrivacyPolicyHub.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace imports
content = content.replace(
    /import React, \{ useState, useEffect \} from 'react';[\s\S]*?\/\/ ─── DATA ─────────────────────────────────────────────────────────────────────/,
    `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../../Nav';
import Footer from '../../../../Footer';
import { ShieldCheck, Mail, MapPin, AlertTriangle, ArrowRight, ExternalLink, FileText, CheckCircle, HelpCircle } from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────────────────`
);

// Replace from TABLE OF CONTENTS to the end
const tableOfContentsIndex = content.indexOf('// ─── TABLE OF CONTENTS ────────────────────────────────────────────────────────');
if (tableOfContentsIndex !== -1) {
    const replacement = `// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function TableOfContents({ active, onJump }) {
    return (
        <nav className="hidden lg:flex flex-col sticky top-28 w-72 shrink-0 bg-[#0a0a0a] p-6 rounded-3xl h-fit max-h-[calc(100vh-8rem)] overflow-y-auto [scrollbar-width:none]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4 px-2">
                <FileText className="w-4 h-4 text-white" />
                <span>Contents</span>
            </div>
            <div className="flex flex-col gap-1">
                {SECTIONS.map(sec => {
                    const isActive = active === sec.id;
                    return (
                        <button
                            key={sec.id}
                            onClick={() => onJump(sec.id)}
                            className={\`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 \${
                                isActive 
                                    ? 'bg-black text-white font-bold shadow-inner border border-[#222222]' 
                                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'
                            }\`}
                        >
                            <span className={\`text-xs font-mono w-5 \${isActive ? 'text-white font-bold' : 'text-neutral-600'}\`}>
                                {sec.num}
                            </span>
                            <span className="text-xs truncate tracking-tight">
                                {sec.title}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

function SectionBlock({ sec }) {
    return (
        <section id={sec.id} className="scroll-mt-36 p-6 sm:p-10 rounded-3xl bg-[#0a0a0a] transition-all duration-300 hover:bg-[#0d0d0d] shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 border-b border-[#1f1f1f] pb-6">
                <span className="text-3xl sm:text-4xl font-mono font-extrabold text-neutral-600 tracking-tighter">
                    #{sec.num}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {sec.title}
                </h2>
            </div>

            {sec.intro && (
                <p className="text-base text-neutral-300 font-normal mb-6 leading-relaxed bg-black/60 p-5 rounded-2xl border border-[#1b1b1b]">
                    {sec.intro}
                </p>
            )}

            {sec.subsections && sec.subsections.map((sub, si) => (
                <div key={si} className="mb-6">
                    <h4 className="text-xs sm:text-sm font-mono font-bold uppercase text-neutral-500 tracking-wider mb-4">
                        {sub.heading}
                    </h4>
                    <div className="flex flex-col gap-4">
                        {sub.items.map((item, ii) => (
                            <div key={ii} className="bg-black/60 rounded-2xl p-5 sm:p-6 transition-colors hover:bg-black border border-[#171717]">
                                <h5 className="text-sm font-bold text-neutral-200 tracking-wide mb-2">
                                    {item.label}
                                </h5>
                                <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {sec.bullets && (
                <ul className="space-y-4 mb-6 pl-2">
                    {sec.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                            <span className="mt-1 shrink-0 grayscale opacity-70 w-6 h-6 flex items-center justify-center">{b.icon || <div className="w-2 h-2 rounded-full bg-white" />}</span>
                            <div>
                                <strong className="text-white font-medium mr-2">{b.label}</strong>
                                <span>{b.text}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {sec.content && (
                <div className="flex flex-col gap-4">
                    {sec.content.map((item, i) => (
                        <div key={i} className="bg-black/60 rounded-2xl p-5 sm:p-6 transition-colors hover:bg-black border border-[#171717]">
                            <h4 className="text-xs sm:text-sm font-mono font-bold uppercase text-neutral-200 tracking-wider mb-2">
                                {item.heading}
                            </h4>
                            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            
            {sec.rights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {sec.rights.map((r, i) => (
                        <div key={i} className="bg-black/60 rounded-2xl p-5 sm:p-6 transition-colors hover:bg-black border border-[#171717]">
                            <div className="mb-3 grayscale opacity-70 w-8 h-8 flex items-center justify-center">{r.icon}</div>
                            <h5 className="text-sm font-bold text-neutral-200 tracking-wide mb-2">
                                {r.right}
                            </h5>
                            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                                {r.desc}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {sec.table && (
                <div className="overflow-x-auto mb-6 bg-black/60 rounded-2xl border border-[#171717]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                {['Purpose', 'Data Used', 'Legal Basis'].map((h, i) => (
                                    <th key={i} className="p-4 text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider border-b border-[#1f1f1f] bg-black/40">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sec.table.map((row, i) => (
                                <tr key={i} className="border-b border-[#1f1f1f] hover:bg-black/40 transition-colors">
                                    <td className="p-4 text-sm font-medium text-neutral-300">{row.purpose}</td>
                                    <td className="p-4 text-sm text-neutral-400 font-light">{row.data}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 text-xs font-mono rounded-full bg-neutral-900 text-neutral-300 border border-[#222]">
                                            {row.basis}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {sec.footer && (
                <p className="text-sm text-neutral-500 italic mt-6 border-l-2 border-neutral-700 pl-4 py-1">
                    {sec.footer}
                </p>
            )}
        </section>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const PrivacyPolicyHub = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [activeId, setActiveId] = useState(SECTIONS[0].id);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const observers = [];
        SECTIONS.forEach(sec => {
            const el = document.getElementById(sec.id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                        setActiveId(sec.id);
                    }
                },
                { rootMargin: '-20% 0px -60% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, [visible]);

    const jumpTo = (id) => {
        setActiveId(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden relative">
            
            {/* Ambient background depth */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-neutral-900/40 via-black to-black pointer-events-none -z-10" />

            <Nav />

            {/* ── HERO SECTION ── */}
            <div className={\`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-36 pb-16 transition-all duration-700 \${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }\`}>
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0a0a0a] border border-[#1d1d1d] text-neutral-300 text-xs font-mono uppercase tracking-widest mb-6">
                            <ShieldCheck className="w-4 h-4 text-white" />
                            <span>DPDP Act 2023 Compliant</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
                            Privacy <br />
                            <span className="text-neutral-400 font-light">Policy</span>
                        </h1>
                        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed font-light">
                            CodeSarthi is committed to transparent, secure, and responsible data handling. This policy explains exactly what we collect, why we collect it, and how you control it — in plain language.
                        </p>
                    </div>

                    {/* Metadata summary card */}
                    <div className="bg-[#0a0a0a] p-6 sm:p-8 rounded-3xl border border-[#1b1b1b] shrink-0 w-full lg:w-80 shadow-2xl flex flex-col gap-4">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider block mb-1">
                                Last Updated
                            </span>
                            <span className="text-xl font-bold text-white tracking-tight block">
                                April 20, 2026
                            </span>
                            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 mt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                                Effective Immediately
                            </span>
                        </div>
                        
                        <div className="h-[1px] w-full bg-[#1c1c1c]" />
                        
                        <div>
                            <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider block mb-1">
                                Compliance
                            </span>
                            <div className="flex flex-col gap-2 mt-2">
                                {[
                                    { dot: '#fff', label: 'DPDP Act 2023 compliant' },
                                    { dot: '#6ba3ff', label: 'GDPR ready (EU users)' },
                                    { dot: '#f59e0b', label: 'IT Act 2000 & SPI Rules' },
                                    { dot: '#a78bfa', label: 'No data sold ever' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center gap-2">
                                        <div style={{ backgroundColor: item.dot }} className="w-1.5 h-1.5 rounded-full shrink-0" />
                                        <span className="text-sm font-medium text-neutral-300">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal Advisory Notice Banner */}
                <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col sm:flex-row items-start gap-4 shadow-lg">
                    <div className="p-2.5 rounded-xl bg-black text-white shrink-0 border border-[#262626]">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white mb-1 tracking-wide uppercase font-mono">
                            Questions about your data?
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                            <strong className="text-white font-semibold">Contact us at <a href="mailto:codesarthi.help@gmail.com" className="hover:underline">codesarthi.help@gmail.com</a>.</strong> We respond within 7 days.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── MAIN BODY: TOC + CONTENT ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-24 flex gap-10 items-start">
                
                {/* Desktop Sticky Table of Contents */}
                <TableOfContents active={activeId} onJump={jumpTo} />

                {/* Right Side Content Sections */}
                <div className="flex-1 min-w-0 flex flex-col gap-10">
                    {SECTIONS.map(sec => <SectionBlock key={sec.id} sec={sec} />)}

                    {/* Contact block */}
                    <section className="p-8 sm:p-12 rounded-3xl bg-[#0a0a0a] transition-all shadow-2xl mt-4">
                        <div className="flex items-center gap-4 mb-6 border-b border-[#1f1f1f] pb-6">
                            <span className="text-3xl sm:text-4xl font-mono font-extrabold text-neutral-600 tracking-tighter">
                                #13
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Contact Information
                            </h2>
                        </div>
                        
                        <div className="bg-black/60 rounded-2xl p-6 sm:p-8 border border-[#171717] flex flex-col gap-6">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                                    CodeSarthi Technologies Private Limited
                                </h3>
                                <p className="text-sm text-neutral-400 font-light">
                                    Registered under the Indian Companies Act &middot; CIN pending
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#1a1a1a]">
                                <a 
                                    href="mailto:codesarthi.help@gmail.com" 
                                    className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0a0a] hover:bg-black transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors border border-[#222]">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 font-mono block">General support</span>
                                        <span className="text-sm font-medium text-white group-hover:underline">codesarthi.help@gmail.com</span>
                                    </div>
                                </a>

                                <a 
                                    href="mailto:dpo@codesarthi.in" 
                                    className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0a0a] hover:bg-black transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors border border-[#222]">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 font-mono block">Data Protection Officer</span>
                                        <span className="text-sm font-medium text-white group-hover:underline">dpo@codesarthi.in</span>
                                    </div>
                                </a>

                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0a0a]">
                                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-neutral-400 border border-[#222]">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 font-mono block">Registered address</span>
                                        <span className="text-sm font-medium text-white">Kanpur, Uttar Pradesh, India</span>
                                    </div>
                                </div>
                                
                                <a 
                                    href="https://codesarthi.in" 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0a0a] hover:bg-black transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors border border-[#222]">
                                        <ExternalLink className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 font-mono block">Website</span>
                                        <span className="text-sm font-medium text-white group-hover:underline">codesarthi.in</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* ── BOTTOM ACCEPTANCE BANNER ── */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-28">
                <div className="p-8 sm:p-12 rounded-3xl bg-[#0a0a0a] text-center flex flex-col items-center justify-center gap-6 shadow-2xl relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl font-extrabold text-2xl mb-2 animate-pulse">
                        <CheckCircle className="w-8 h-8 text-black stroke-[2.5]" />
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-xl">
                        We prioritise your privacy
                    </h3>
                    
                    <p className="text-neutral-400 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                        This Policy complies with the Digital Personal Data Protection Act 2023. We are committed to transparent, secure, and responsible data handling — always.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto justify-center">
                        {/* MOST IMPORTANT BUTTON -> PURE WHITE */}
                        <button
                            onClick={() => navigate('/terms-and-conditions')}
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-neutral-200 text-black font-extrabold text-base transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>View Terms &amp; Conditions</span>
                            <ExternalLink className="w-4 h-4 text-black" />
                        </button>

                        {/* SECONDARY BUTTON -> #000000 / #0a0a0a styling */}
                        <a 
                            href="mailto:codesarthi.help@gmail.com"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#000000] hover:bg-[#141414] text-neutral-300 hover:text-white font-bold text-base transition-all duration-300 border border-[#252525] flex items-center justify-center gap-2"
                        >
                            <span>Contact Support</span>
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicyHub;
`;
    content = content.substring(0, tableOfContentsIndex) + replacement;
    fs.writeFileSync(filePath, content);
    console.log("Successfully replaced content.");
} else {
    console.error("Could not find table of contents index");
}
