import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../nav';
import Footer from '../../../Footer';

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
        <nav style={{
            position: 'sticky', top: '120px', alignSelf: 'flex-start',
            width: '220px', flexShrink: 0,
        }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,108,246,0.5)', marginBottom: '16px' }}>
                Contents
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {SECTIONS.map(sec => (
                    <button
                        key={sec.id}
                        onClick={() => onJump(sec.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            background: active === sec.id ? 'rgba(26,108,246,0.1)' : 'transparent',
                            border: 'none', borderRadius: '8px', padding: '7px 10px',
                            cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', width: '100%',
                        }}
                    >
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, color: active === sec.id ? '#6ba3ff' : 'rgba(255,255,255,0.2)', minWidth: '20px', fontVariantNumeric: 'tabular-nums' }}>{sec.num}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: active === sec.id ? '#6ba3ff' : 'rgba(255,255,255,0.35)', lineHeight: 1.4, transition: 'color 0.18s' }}>{sec.title}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}

function SectionBlock({ sec }) {
    return (
        <section id={sec.id} style={{ marginBottom: '64px', scrollMarginTop: '140px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', justifyContent: 'center' }}>
                <div style={{
                    fontFamily: "'Syne', sans-serif", fontSize: '50px', fontWeight: 800,
                    color: 'rgba(26,108,246,0.4)', letterSpacing: '0.08em',
                    flexShrink: 0, minWidth: '28px',
                }}>{sec.num}</div>
                <div style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 'clamp(25px, 3vw, 30px)',
                    fontWeight: 800, color: '#010000ff', letterSpacing: '-0.02em', lineHeight: 1.1,
                    borderBottom: '1px solid rgba(26,108,246,0.15)', paddingBottom: '16px',
                    width: '100%', backgroundColor: '#1a6cf6', borderRadius: '8px', padding: '7px 10px', height: '100%',
                }}>{sec.title}
                </div>

            </div>

            {sec.intro && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '16px', marginLeft: '48px' }}>
                    {sec.intro}
                </p>
            )}

            {sec.bullets && (
                <ul style={{ listStyle: 'none', padding: 0, marginLeft: '48px', marginBottom: sec.footer ? '16px' : 0 }}>
                    {sec.bullets.map((b, i) => (
                        <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                            <span style={{ color: 'rgba(26,108,246,0.6)', fontSize: '14px', flexShrink: 0, lineHeight: 1.75 }}>—</span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{b}</span>
                        </li>
                    ))}
                </ul>
            )}

            {sec.footer && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', lineHeight: 1.7, marginLeft: '48px', marginTop: '8px' }}>
                    {sec.footer}
                </p>
            )}

            {sec.content && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginLeft: '48px' }}>
                    {sec.content.map((item, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderLeft: '2px solid rgba(26,108,246,0.25)',
                            borderRadius: '0 10px 10px 0',
                            padding: '16px 20px',
                        }}>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: 'rgba(26,108,246,0.7)', letterSpacing: '0.04em', marginBottom: '6px', textTransform: 'uppercase', fontSize: '11px' }}>
                                {item.heading}
                            </p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>
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
    const [accepted, setAccepted] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const observerRef = useRef(null);

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
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        setActiveId(sec.id);
                    }
                },
                { rootMargin: '-30% 0px -60% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, [visible]);

    // Show acceptance banner after 3s
    useEffect(() => {
        const t = setTimeout(() => setShowBanner(true), 3000);
        return () => clearTimeout(t);
    }, []);

    const jumpTo = (id) => {
        setActiveId(id); // 🔥 ADD THIS
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div style={{ minHeight: '100vh', width: '100%', background: '#06060b', overflowX: 'hidden', position: 'relative' }}>
            <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

            {/* Ambient glow */}
            <div style={{ position: 'fixed', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(26,108,246,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            <Nav />

            {/* ── HERO ── */}
            <div style={{
                position: 'relative', zIndex: 1, maxWidth: '90%', margin: '0 auto',
                padding: '0 32px', paddingTop: '130px', paddingBottom: '72px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}>
                {/* Brand bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '7px', background: 'rgba(26,108,246,0.15)', border: '1px solid rgba(26,108,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, color: '#6ba3ff', letterSpacing: '-0.5px' }}>
                        <img src="https://res.cloudinary.com/dggoaxqxl/image/upload/v1776693732/image_wxefat.png" alt="" className='rounded-xl' />
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>CodeSarthi</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>·</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(26,108,246,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Legal</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
                    <div>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,108,246,0.65)', marginBottom: '14px' }}>
                            Binding Legal Agreement
                        </p>
                        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(36px,6vw,64px)', fontWeight: 800, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                            Terms &amp;<br /><span style={{ color: '#1a6cf6' }}>Conditions</span>
                        </h1>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.75, maxWidth: '520px' }}>
                            These Terms govern your access to and use of the CodeSarthi platform — including all features, AI tools, collaboration workspaces, and integrations. By using the platform, you agree to be legally bound by the provisions below.
                        </p>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(26,108,246,0.15)',
                        borderRadius: '14px', padding: '20px 24px', flexShrink: 0, minWidth: '220px',
                    }}>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Last updated</div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>April 20, 2026</div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '4px' }}>Effective immediately</div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>Governed under Indian law</div>
                        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

                            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>Kanpur, Uttar Pradesh</div>
                        </div>
                    </div>
                </div>

                {/* Alert banner */}
                <div style={{ marginTop: '32px', display: 'flex', alignItems: 'flex-start', gap: '14px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '16px 20px' }}>
                    <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>⚠️</span>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                        <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>These Terms form a binding legal agreement.</strong>{' '}
                        Consult a qualified lawyer before agreeing if you are unsure about any provision. By accessing, registering for, or using the Platform, you confirm you are at least 18 years old and agree to be legally bound by these Terms.
                    </p>
                </div>
            </div>

            {/* ── BODY: TOC + CONTENT ── */}
            <div style={{
                position: 'relative', zIndex: 1, maxWidth: '90%', margin: '0 auto',
                padding: '0 32px 120px', display: 'flex', gap: '48px', alignItems: 'flex-start',
                opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.2s',
            }}>
                {/* Left TOC — hidden on small screens via inline media won't work, but the layout flexes */}
                <TableOfContents active={activeId} onJump={jumpTo} />

                {/* Right content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {SECTIONS.map(sec => <SectionBlock key={sec.id} sec={sec} />)}

                    {/* Contact block */}
                    <section style={{ marginBottom: '64px', scrollMarginTop: '140px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', marginBottom: '28px', justifyContent: 'center' }}>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '50px', fontWeight: 800, color: 'rgba(26,108,246,0.4)', letterSpacing: '0.08em', paddingTop: '6px', flexShrink: 0, minWidth: '28px' }}>18</div>
                            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(25px,3vw,30px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, borderBottom: '1px solid rgba(26,108,246,0.15)', paddingBottom: '16px', width: '100%' }}>Contact Us</h2>
                        </div>
                        <div style={{ marginLeft: '48px', background: 'rgba(26,108,246,0.04)', border: '1px solid rgba(26,108,246,0.15)', borderRadius: '14px', padding: '28px 32px' }}>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>CodeSarthi </div>
                            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' }}>Made in INDIA 🇮🇳 — open to contributors & collaborators</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '14px' }}>📧</span>
                                    <a href="mailto:codesarthi.help@gmail.com" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: '#6ba3ff', textDecoration: 'none', letterSpacing: '0.01em' }}>codesarthi.help@gmail.com</a>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '14px' }}>📍</span>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>Kanpur, Uttar Pradesh, India</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


            </div>
            <div style={{ background: 'rgba(16, 67, 185, 0.22)', border: '1px solid rgba(16, 95, 185, 0.15)', borderRadius: '16px', padding: '28px 32px', textAlign: 'center', width: '50%', justifySelf: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px', widt: 'full', display: 'flex', justifyContent: 'center' }}><svg xmlns="http://www.w3.org/2000/svg" width={55} height={55} viewBox="0 0 80 80"><g fill="none" fillRule="evenodd" clipRule="evenodd"><path fill="#f2c94c" d="M19.833 38.25c-1.012 0-1.833.82-1.833 1.833v26.334c0 1.012.82 1.833 1.833 1.833h40.334c1.012 0 1.833-.82 1.833-1.833V40.083c0-1.012-.82-1.833-1.833-1.833zM43 56.25a4.243 4.243 0 1 1-6-6a4.243 4.243 0 0 1 6 6"></path><path fill="#828282" d="M40 14.25c-8.56 0-15.5 6.94-15.5 15.5v8.5h4v-8.5c0-6.351 5.149-11.5 11.5-11.5s11.5 5.149 11.5 11.5v8.5h4v-8.5c0-8.56-6.94-15.5-15.5-15.5"></path></g></svg></div>
                <p style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                    We prioritise your privacy
                </p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 20px' }}>
                    This Policy complies with the Digital Personal Data Protection Act 2023. We are committed to transparent, secure, and responsible data handling — always.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => navigate('/privacy-&-policy-hub')}
                        style={{ background: 'rgba(16, 123, 185, 0.1)', border: '1px solid rgba(87, 105, 186, 0.25)', borderRadius: '10px', padding: '10px 22px', fontSize: '13px', fontWeight: 600, color: '#ffffffff', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}
                    >
                        Privacy Policy Hub →
                    </button>
                    <a href="mailto:codesarthi.help@gmail.com" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 22px', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif" }}>
                        Contact Support
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;