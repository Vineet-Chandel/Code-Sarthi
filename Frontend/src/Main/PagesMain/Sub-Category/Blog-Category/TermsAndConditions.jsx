import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../Nav';
import Footer from '../../../Footer';
import { ShieldCheck, Mail, MapPin, AlertTriangle, ArrowRight, ExternalLink, FileText, CheckCircle, HelpCircle } from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
    {
        id: 'acceptance',
        num: '01',
        title: 'Acceptance of Terms',
        content: [
            { heading: '1.1 Binding Contract', text: 'Your use of the Platform creates a binding contract between you and CodeSarthi Technologies Private Limited ("CodeSarthi", "we", "us"), a company registered in Kanpur, Uttar Pradesh, India.' },
            { heading: '1.2 Modifications', text: 'We may update these Terms. Continued use after notice (via email, Platform notification, or website posting) constitutes acceptance of the updated Terms.' },
            { heading: '1.3 Additional Terms', text: 'Certain features (e.g., Premium Subscriptions, API access) are subject to Additional Terms provided at signup or feature activation.' },
        ],
    },
    {
        id: 'eligibility',
        num: '02',
        title: 'Eligibility',
        content: [
            { heading: '2.1 Age Requirement', text: 'You must be at least 18 years old and legally capable of forming binding contracts under Indian law.' },
            { heading: '2.2 Account Restrictions', text: 'Not available to suspended or terminated users, persons barred by applicable law, or residents of embargoed countries.' },
            { heading: '2.3 Business Use', text: 'Organizations may use the Platform but remain responsible for ensuring their employees\' compliance with these Terms.' },
        ],
    },
    {
        id: 'accounts',
        num: '03',
        title: 'User Accounts & Security',
        content: [
            { heading: '3.1 Account Creation', text: 'Provide accurate, complete information. You control account settings and must update them promptly when information changes.' },
            { heading: '3.2 Credentials', text: 'Keep login credentials strictly confidential. Notify us immediately of any unauthorized use at codesarthi.help@gmail.com .' },
            { heading: '3.3 Account Responsibility', text: 'You are solely liable for all activities under your account, including activities carried out by authorized users you permit.' },
            { heading: '3.4 Suspension/Termination', text: 'We may suspend or terminate accounts for violations of these Terms, without prior notice, at our sole discretion.' },
        ],
    },
    {
        id: 'acceptable-use',
        num: '04',
        title: 'Acceptable Use Policy',
        intro: 'You agree NOT to engage in any of the following activities on the Platform:',
        bullets: [
            'Use the Platform for illegal, harmful, fraudulent, or abusive purposes (e.g., phishing, malware distribution).',
            'Upload or share content violating laws, third-party rights (IP, privacy), or our Community Guidelines.',
            'Attempt unauthorized access, interfere with Platform operation, or reverse-engineer our technology.',
            'Use excessive resources, spam users, or impersonate any person or entity.',
            'Engage in commercial solicitation without permission or automated data scraping.',
        ],
        footer: 'We reserve the right to remove content and users violating this policy at any time.',
    },
    {
        id: 'user-content',
        num: '05',
        title: 'User Content & Collaboration',
        content: [
            { heading: '5.1 Ownership', text: 'You retain full ownership of User Content (e.g., resumes, messages, projects, code, media) that you upload or share on the Platform.' },
            { heading: '5.2 License Grant', text: 'By uploading or sharing, you grant CodeSarthi a worldwide, non-exclusive, royalty-free, sublicensable license to store, process, display, distribute, and create derivative works (e.g., AI-enhanced resumes) from your User Content for Platform functionality, and to promote the Platform with your prior consent.' },
            { heading: '5.3 Representations', text: 'You warrant that your User Content does not infringe any applicable laws or third-party rights, and that you hold all necessary permissions. You agree to indemnify us for any claims arising from your content.' },
            { heading: '5.4 Collaboration Features', text: 'Content shared in workspaces or projects is visible to invited collaborators. Project leaders control member access; all members must respect confidentiality obligations.' },
        ],
    },
    {
        id: 'ai-features',
        num: '06',
        title: 'AI-Powered Features',
        content: [
            { heading: '6.1 AI Resume Engine', text: 'During onboarding, we collect skills, education, experience, projects, internships, and achievements to generate ATS-friendly resumes tailored to specific roles and templates.' },
            { heading: '6.2 No Guarantees', text: 'AI outputs are provided "AS IS". We do not guarantee accuracy, completeness, job placement success, or suitability for any particular purpose. You must review and verify all AI-generated outputs before use.' },
            { heading: '6.3 Smart Scheduler & Analytics', text: 'Productivity dashboards track contributions and identify bottlenecks but do not constitute employment or legal advice of any kind.' },
            { heading: '6.4 Training Data', text: 'Aggregated, anonymized user data may be used to improve our AI models. You may opt out of this at any time through your account Settings.' },
        ],
    },
    {
        id: 'payments',
        num: '07',
        title: 'Payments & Subscriptions',
        content: [
            { heading: '7.1 Fees', text: 'Premium features require payment per the pricing displayed on the Platform. All fees are non-refundable except as expressly required by applicable law.' },
            { heading: '7.2 Billing', text: 'You must provide a valid payment method. Stated fees exclude taxes; you are responsible for all applicable GST and other statutory levies.' },
            { heading: '7.3 Auto-Renewal', text: 'Subscriptions automatically renew at the end of each billing period unless you cancel prior to the renewal date.' },
            { heading: '7.4 Disputes', text: 'Contact our support team before initiating any payment dispute or chargeback.' },
        ],
    },
    {
        id: 'privacy',
        num: '08',
        title: 'Privacy & Data Protection',
        content: [
            { heading: '8.1 Privacy Policy', text: 'Our Privacy Policy governs how we collect, process, and protect your personal data. Please read it carefully alongside these Terms.' },
            { heading: '8.2 Compliance', text: 'We comply with the Digital Personal Data Protection Act 2023 (DPDP Act), the IT Act 2000, and applicable international standards. We do NOT sell personal data to third parties.' },
            { heading: '8.3 Data Disclosure', text: 'We may disclose data as required for legal compliance, fraud prevention, or to service providers operating under strict confidentiality agreements.' },
            { heading: '8.4 Your Responsibilities', text: 'Do not share sensitive personal data (e.g., Aadhaar, financial credentials) unnecessarily within or through the Platform.' },
        ],
    },
    {
        id: 'communications',
        num: '09',
        title: 'Communications & Notifications',
        content: [
            { heading: '9.1 Transactional Emails', text: 'You consent to receiving service communications (e.g., account alerts, collaboration invites, security notifications) that are essential to Platform operation.' },
            { heading: '9.2 Marketing', text: 'You may opt out of promotional emails at any time through your account Settings or via the unsubscribe link in any marketing communication.' },
            { heading: '9.3 Real-Time Communication', text: 'Messages and calls made within the Platform are stored in accordance with our data retention policy and applicable law.' },
        ],
    },
    {
        id: 'security',
        num: '10',
        title: 'Platform Security',
        content: [
            { heading: '10.1 Our Measures', text: 'We implement industry-standard security controls including encryption at rest and in transit, access controls, and regular security audits.' },
            { heading: '10.2 Limitations', text: 'No system is 100% secure. We are not liable for breaches that occur despite reasonable security measures or that result from factors beyond our reasonable control.' },
            { heading: '10.3 Your Role', text: 'Use strong, unique passwords; enable two-factor authentication; and always log out from shared or public devices.' },
        ],
    },
    {
        id: 'availability',
        num: '11',
        title: 'Service Availability & Maintenance',
        content: [
            { heading: '11.1 Uptime', text: 'We strive for 99.9% Platform availability but make no guarantees. Scheduled and emergency maintenance may cause downtime.' },
            { heading: '11.2 Changes', text: 'Features may be modified, suspended, or permanently discontinued at any time, with or without advance notice.' },
            { heading: '11.3 Backups', text: 'We maintain data backups but are not liable for data loss. We strongly recommend you export and independently backup your data regularly.' },
        ],
    },
    {
        id: 'termination',
        num: '12',
        title: 'Termination',
        content: [
            { heading: '12.1 By You', text: 'You may close your account at any time. Data deletion is subject to our legal retention obligations.' },
            { heading: '12.2 By Us', text: 'We may terminate or suspend your access for violations of these Terms, non-payment, or legitimate business reasons.' },
            { heading: '12.3 Survival', text: 'Provisions that by their nature should survive termination will remain in effect, including IP licenses, payment obligations, indemnity, and dispute resolution clauses.' },
        ],
    },
    {
        id: 'disclaimers',
        num: '13',
        title: 'Disclaimers & Limitation of Liability',
        content: [
            { heading: '13.1 Disclaimer', text: 'THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND — EXPRESS OR IMPLIED — INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. AI outputs and career tools provide no guarantee of job placement or career outcomes.' },
            { heading: '13.2 Limitation', text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, CODESARTHI\'S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE FEES YOU PAID IN THE PRIOR 12 MONTHS. WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES INCLUDING LOST PROFITS, DATA LOSS, OR LOST CAREER OPPORTUNITIES.' },
            { heading: '13.3 Third Parties', text: 'We are not responsible for user-generated content, third-party links or integrated services, or outcomes resulting from team collaboration on the Platform.' },
        ],
    },
    {
        id: 'ip',
        num: '14',
        title: 'Intellectual Property',
        content: [
            { heading: '14.1 Our Rights', text: 'The Platform, including its AI models, design, codebase, trademarks, and all associated intellectual property, is owned exclusively by CodeSarthi Technologies Private Limited and protected by applicable IP laws.' },
            { heading: '14.2 Restrictions', text: 'You may not reverse-engineer, scrape, copy, or commercially exploit any part of the Platform without an express written license from us.' },
            { heading: '14.3 Feedback', text: 'Any suggestions, ideas, or feedback you voluntarily submit to us may be used by CodeSarthi without restriction, and may be compensated at our sole discretion.' },
        ],
    },
    {
        id: 'third-party',
        num: '15',
        title: 'Third-Party Services & Integrations',
        content: [
            { heading: '15.1 Linked Services', text: 'The Platform may integrate with third-party tools (e.g., GitHub, Zoom, Google). These are governed by their own terms and privacy policies, which you should review independently.' },
            { heading: '15.2 No Endorsement', text: 'The inclusion of third-party links or integrations does not constitute our endorsement. Your use of third-party services is at your own risk.' },
        ],
    },
    {
        id: 'governing-law',
        num: '16',
        title: 'Governing Law & Dispute Resolution',
        content: [
            { heading: '16.1 Governing Law', text: 'These Terms are governed exclusively by the laws of India, without regard to conflict of law principles.' },
            { heading: '16.2 Jurisdiction', text: 'The courts of Kanpur, Uttar Pradesh, India shall have exclusive jurisdiction over any disputes arising out of or in connection with these Terms.' },
            { heading: '16.3 Dispute Notice', text: 'Prior to initiating any legal proceedings, you must provide CodeSarthi with 30 days\' written notice of the dispute to allow for good-faith resolution.' },
        ],
    },
    {
        id: 'misc',
        num: '17',
        title: 'Miscellaneous',
        content: [
            { heading: '17.1 Entire Agreement', text: 'These Terms, together with our Privacy Policy and any applicable Additional Terms, constitute the entire agreement between you and CodeSarthi regarding the Platform.' },
            { heading: '17.2 Severability', text: 'If any provision of these Terms is held invalid or unenforceable, the remaining provisions will continue in full force and effect.' },
            { heading: '17.3 No Waiver', text: 'Our failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.' },
            { heading: '17.4 Assignment', text: 'We may assign or transfer our rights and obligations under these Terms. You may not assign your rights without our prior written consent.' },
        ],
    },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function TableOfContents({ active, onJump }) {
    return (
        <nav className="hidden lg:flex flex-col sticky top-28 w-72 shrink-0 bg-[#0a0a0a] p-6 rounded-3xl h-fit max-h-[calc(100vh-8rem)] overflow-y-auto [scrollbar-width:none]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4 px-2">
                <FileText className="w-4 h-4 text-white" />
                <span>Legal Index</span>
            </div>
            <div className="flex flex-col gap-1">
                {SECTIONS.map(sec => {
                    const isActive = active === sec.id;
                    return (
                        <button
                            key={sec.id}
                            onClick={() => onJump(sec.id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                                isActive 
                                    ? 'bg-black text-white font-bold shadow-inner border border-[#222222]' 
                                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'
                            }`}
                        >
                            <span className={`text-xs font-mono w-5 ${isActive ? 'text-white font-bold' : 'text-neutral-600'}`}>
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

            {sec.bullets && (
                <ul className="space-y-3 mb-6 pl-2">
                    {sec.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                            <span className="w-2 h-2 rounded-full bg-white mt-2.5 shrink-0" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
            )}

            {sec.footer && (
                <p className="text-sm text-neutral-500 italic mt-4 border-l-2 border-neutral-700 pl-4 py-1">
                    {sec.footer}
                </p>
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
        </section>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const TermsAndConditions = () => {
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
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-36 pb-16 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0a0a0a] border border-[#1d1d1d] text-neutral-300 text-xs font-mono uppercase tracking-widest mb-6">
                            <ShieldCheck className="w-4 h-4 text-white" />
                            <span>Binding Legal Agreement &bull; v2026.4</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
                            Terms &amp; <br />
                            <span className="text-neutral-400 font-light">Conditions</span>
                        </h1>
                        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed font-light">
                            These architectural rules and contractual obligations govern your access to and use of the CodeSarthi developer ecosystem—including our AI engines, code collaboration workspaces, and API integrations.
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
                                Jurisdiction &amp; Governance
                            </span>
                            <span className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-white shrink-0" />
                                Kanpur, Uttar Pradesh, India
                            </span>
                        </div>
                    </div>
                </div>

                {/* Legal Advisory Notice Banner */}
                <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col sm:flex-row items-start gap-4 shadow-lg">
                    <div className="p-2.5 rounded-xl bg-black text-amber-400 shrink-0 border border-[#262626]">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white mb-1 tracking-wide uppercase font-mono">
                            Important Advisory
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                            <strong className="text-white font-semibold">These Terms constitute an enlivened digital contract under Indian law.</strong> By continuing to use, interact with, or register inside CodeSarthi workspaces, you formally verify that you possess the statutory legal capacity (18+ years) and assent to be bound unconditionally by every covenant documented below.
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
                                #18
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Contact &amp; Legal Support
                            </h2>
                        </div>
                        
                        <div className="bg-black/60 rounded-2xl p-6 sm:p-8 border border-[#171717] flex flex-col gap-6">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                                    CodeSarthi Technologies Private Limited
                                </h3>
                                <p className="text-sm text-neutral-400 font-light">
                                    Engineered with passion in INDIA 🇮🇳 &mdash; Dedicated to radical software craftsmanship.
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
                                        <span className="text-xs text-neutral-500 font-mono block">Legal Inquiry Desk</span>
                                        <span className="text-sm font-medium text-white group-hover:underline">codesarthi.help@gmail.com</span>
                                    </div>
                                </a>

                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0a0a]">
                                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-neutral-400 border border-[#222]">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 font-mono block">Registered Office</span>
                                        <span className="text-sm font-medium text-white">Kanpur, Uttar Pradesh, India</span>
                                    </div>
                                </div>
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
                        Commitment to Ethical Software &amp; Data Care
                    </h3>
                    
                    <p className="text-neutral-400 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                        These operational Terms operate strictly alongside our comprehensive Privacy Policy and DPDP Act 2023 guarantees. We stand completely committed to honest, secure, and developer-first data treatment.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto justify-center">
                        {/* MOST IMPORTANT BUTTON -> PURE WHITE */}
                        <button
                            onClick={() => navigate('/privacy-&-policy-hub')}
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-neutral-200 text-black font-extrabold text-base transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>Open Privacy Hub</span>
                            <ExternalLink className="w-4 h-4 text-black" />
                        </button>

                        {/* SECONDARY BUTTON -> #000000 / #0a0a0a styling */}
                        <a 
                            href="mailto:codesarthi.help@gmail.com"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#000000] hover:bg-[#141414] text-neutral-300 hover:text-white font-bold text-base transition-all duration-300 border border-[#252525] flex items-center justify-center gap-2"
                        >
                            <span>Contact Support Desk</span>
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;