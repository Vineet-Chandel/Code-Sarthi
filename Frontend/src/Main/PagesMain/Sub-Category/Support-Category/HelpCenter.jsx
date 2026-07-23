import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../Nav';
import Footer from '../../../Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
    { id: 'announcements', label: 'Announcements', icon: '📢', color: '#1a6cf6', bg: 'rgba(26,108,246,0.1)', desc: 'Latest updates, releases & news' },
    { id: 'basics', label: 'CodeSarthi basics', icon: '🚀', color: '#10b981', bg: 'rgba(16,185,129,0.1)', desc: 'Getting started & beginner guide' },
    { id: 'bugs', label: 'Bugs & troubleshooting', icon: '🐛', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', desc: 'Known issues & self-serve fixes' },
    { id: 'account', label: 'Account settings', icon: '👤', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', desc: 'Profile, notifications & security' },
    { id: 'server', label: 'Server settings', icon: '⚙️', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', desc: 'Server config & management' },
    { id: 'safety', label: 'Safety & privacy', icon: '🔒', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', desc: 'Policies, safety & data handling' },
    { id: 'developers', label: 'Developer support', icon: '💻', color: '#1a6cf6', bg: 'rgba(26,108,246,0.1)', desc: 'API, SDK, bots & app dev' },
    { id: 'feedback', label: 'Feedback', icon: '💬', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', desc: 'Suggestions & feature requests' },
];

const FAQS = [
    { id: 1, cat: 'basics', q: 'How do I get started with CodeSarthi?', a: 'Sign up for a free account, then follow the onboarding checklist on your dashboard. The Beginner\'s Guide walks you through your first project step by step — you\'ll be up and running in under 10 minutes.', },
    { id: 2, cat: 'account', q: 'How do I reset my password?', a: 'Go to the login page and click "Forgot password". Enter your email and we\'ll send a reset link within a minute. Check your spam folder if it doesn\'t arrive. The link expires after 30 minutes.' },
    { id: 3, cat: 'developers', q: 'Where do I find my API key?', a: 'Navigate to Settings → Developer → API Keys. Click "Generate new key", give it a name, and copy it immediately — it won\'t be shown again. Keep it secret and never expose it in client-side code.' },
    { id: 4, cat: 'developers', q: 'What are the rate limits for the API?', a: 'Free tier: 60 req/min. Pro: 600 req/min. Enterprise: custom. If you hit a limit you\'ll receive a 429 response — implement exponential backoff in your client. Check the Developer docs for full quota tables.' },
    { id: 5, cat: 'bugs', q: 'My bot isn\'t responding — what should I check?', a: 'First check our status page for active incidents. Then verify: (1) the bot has correct permissions, (2) the API key is valid, (3) the bot is online in your dashboard, and (4) your server hasn\'t hit the message rate cap.' },
    { id: 6, cat: 'account', q: 'How do I change my username or email?', a: 'Go to Settings → Profile. Display name can be changed anytime. Email changes require verification — a link is sent to both old and new addresses. Changes take effect within a few minutes.' },
    { id: 7, cat: 'safety', q: 'How does CodeSarthi handle my data?', a: 'We follow GDPR and CCPA guidelines. Your data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell your data. Export or delete everything from Settings → Privacy at any time.' },
    { id: 8, cat: 'server', q: 'How do I configure server settings?', a: 'Open your server dashboard and click the gear icon. From there you can set roles, permissions, channel settings, integrations, and webhooks. Changes apply immediately.' },
    { id: 9, cat: 'announcements', q: 'Where can I find the latest release notes?', a: 'Release notes are published on the Announcements channel and in the changelog section of the docs. Subscribe to email updates in Settings → Notifications to be notified on every release.' },
    { id: 10, cat: 'developers', q: 'How do I install the CodeSarthi SDK?', a: 'Run `npm install codesarthi-sdk` in your project. Then import and initialise with your API key. Full installation docs, quickstart examples, and SDK reference are available in the Developer portal.' },
    { id: 11, cat: 'basics', q: 'Is there a free plan available?', a: 'Yes! The free tier includes all core features with generous usage limits. You can upgrade to Pro or Enterprise at any time from Settings → Billing for higher limits and priority support.' },
    { id: 12, cat: 'bugs', q: 'The dashboard is loading slowly — how to fix it?', a: 'Try a hard reload (Ctrl+Shift+R / Cmd+Shift+R). If the issue persists, clear your browser cache, disable extensions, or try an incognito window. Check our status page to rule out an ongoing incident.' },
];

const POPULAR_TAGS = ['API setup', 'Reset password', 'Billing', 'Rate limits', 'SDK install', 'Bot not responding'];

const CONTACT_CARDS = [
    {
        badge: 'Discussion', badgeColor: '#1a6cf6', badgeBg: 'rgba(26,108,246,0.15)', title: 'Share your issues or experience on Discussion', sub: '', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path fill="#fff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
            </svg>
        ),
        link: ""
    },
    {
        badge: 'Feedback', badgeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.15)', title: 'Submit feedback', sub: 'Shape the future of CodeSarthi', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path fill="#fff" d="M14.77 12.4c.15.07.32.1.48.1c.33 0 .64-.13.88-.36L18.31 10h.94C20.77 10 22 8.77 22 7.25v-2.5C22 3.23 20.77 2 19.25 2h-4.5C13.23 2 12 3.23 12 4.75v2.5c0 1.26.85 2.32 2 2.65v1.35c0 .5.31.95.77 1.15M13.5 4.75c0-.69.56-1.25 1.25-1.25h4.5c.69 0 1.25.56 1.25 1.25v2.5c0 .69-.56 1.25-1.25 1.25h-1.56l-2.19 2.15V8.5h-.75c-.69 0-1.25-.56-1.25-1.25zM8 13.5c-1.93 0-3.5-1.57-3.5-3.5S6.07 6.5 8 6.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5M8 8c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 14c-2.06 0-3.64-.56-4.7-1.67c-1.336-1.404-1.303-3.174-1.3-3.357v-.013C2 15.89 2.9 15 4 15h8c1.1 0 2 .9 2 2l.001.006c.003.127.045 1.91-1.3 3.324C11.64 21.44 10.06 22 8 22m-4-5.5c-.28 0-.5.22-.5.5v.005c0 .095-.017 1.348.9 2.305c.76.79 1.97 1.19 3.6 1.19s2.85-.41 3.61-1.21c.913-.952.892-2.192.89-2.258v-.002c0-.31-.23-.54-.5-.54H4z"></path>
            </svg>
        ), path: "/feedback"
    },
    {
        badge: 'Social', badgeColor: '#10b981', badgeBg: 'rgba(16,185,129,0.15)', title: 'Reach us on X', sub: 'Quick questions answered fast', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
                <g fill="none">
                    <g clipPath="url(#SVGScRvgbTy)">
                        <path fill="#fff" d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"></path>
                    </g>
                    <defs>
                        <clipPath id="SVGScRvgbTy">
                            <path fill="#fff" d="M0 0h14v14H0z"></path>
                        </clipPath>
                    </defs>
                </g>
            </svg>
        )
    },
    {
        badge: 'Social', badgeColor: '#10b981', badgeBg: 'rgba(16,185,129,0.15)', title: 'Reach us on Linkedin', sub: 'Quick questions answered fast', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path fill="#fff" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
            </svg>
        )
    },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function FaqItem({ faq, isOpen, onToggle }) {
    const ansRef = useRef(null);
    return (
        <div
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: isOpen ? '1px solid rgba(26,108,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'border-color 0.25s',
            }}
        >
            <button
                onClick={() => onToggle(faq.id)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 22px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                }}
            >
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#fff', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>
                    {faq.q}
                </span>
                <span
                    style={{
                        fontSize: '18px',
                        color: isOpen ? '#1a6cf6' : 'rgba(255,255,255,0.3)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s, color 0.25s',
                        flexShrink: 0,
                        lineHeight: 1,
                    }}
                >
                    +
                </span>
            </button>
            <div
                ref={ansRef}
                style={{
                    maxHeight: isOpen ? '240px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                }}
            >
                <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.75,
                    padding: '0 22px 20px',
                    fontFamily: "'DM Sans', sans-serif",
                    margin: 0,
                }}>
                    {faq.a}
                </p>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const HelpCenter = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [openFaqId, setOpenFaqId] = useState(null);
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const handleCategoryClick = (id) => {
        setActiveCategory(prev => (prev === id ? null : id));
        setQuery('');
        setOpenFaqId(null);
    };

    const handleTagClick = (tag) => {
        setQuery(tag);
        setActiveCategory(null);
        setOpenFaqId(null);
        inputRef.current?.focus();
    };

    const handleToggleFaq = (id) => {
        setOpenFaqId(prev => (prev === id ? null : id));
    };

    const filteredFaqs = FAQS.filter(f => {
        const matchesCat = activeCategory ? f.cat === activeCategory : true;
        const matchesQuery = query.trim()
            ? f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
            : true;
        return matchesCat && matchesQuery;
    });

    return (
        <div style={{ minHeight: '100vh', width: '100%', background: '#050508', overflowX: 'hidden', position: 'relative' }}>

            {/* Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />


            <div className='mt-3'>
                <Nav />
            </div>


            <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '0 24px 100px' }}>

                {/* ── HERO ── */}
                <div
                    style={{
                        textAlign: 'center',
                        paddingTop: '140px',
                        paddingBottom: '80px',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(32px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}
                >
                    <div style={{
                        // display: 'inline-block',
                        background: 'rgba(26,108,246,0.12)',
                        border: '1px solid rgba(26,108,246,0.25)',
                        borderRadius: '100px',
                        padding: '6px 18px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#6ba3ff',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontFamily: "'DM Sans', sans-serif",
                        marginBottom: '28px',
                    }}
                        className='flex mx-auto w-fit gap-2'
                    >


                        <span className='rotate-[30deg]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path fill="#6ba3ff" d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-1.26-1.25-2.71-.68-3.42 0L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59v4l-.71.7c-1.25 1.26-.68 2.71 0 3.42l3 3c.54.54 1.12.74 1.67.74c.71 0 1.36-.35 1.75-.74l2.7-2.71H15c1.7 0 2.56-1.06 2.87-2.1c1.13-.3 1.75-1.16 2-2C21.42 14.5 22 13.03 22 12V9h-.59zM20 12c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-4.41l-3.28 3.28c-.31.29-.49.12-.6.01l-2.99-2.98c-.29-.31-.12-.49-.01-.6L5 15.41v-4l2-2V11c0 1.21.8 3 3 3s3-1.79 3-3h7zm.29-4.71L18.59 9H11v2c0 .45-.19 1-1 1s-1-.55-1-1V8c0-.46.17-2 2-2h3.41l2.28-2.28c.31-.29.49-.12.6-.01l2.99 2.98c.29.31.12.49.01.6"></path>
                            </svg>
                        </span>
                        <span>Help Center</span>
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(48px, 8vw, 88px)',
                        fontWeight: 800,
                        fontFamily: "'Syne', sans-serif",
                        color: '#fff',
                        lineHeight: 1.0,
                        letterSpacing: '-0.03em',
                        marginBottom: '20px',
                    }}>
                        How can we<br />
                        <span style={{ color: '#1a6cf6' }}>help you?</span>
                    </h1>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.45)',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        maxWidth: '480px',
                        margin: '0 auto 40px',
                        lineHeight: 1.7,
                    }}>
                        Search our docs, browse topics, or reach out to the team.
                    </p>

                    {/* Search */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        padding: '6px 6px 6px 20px',
                        maxWidth: '560px',
                        margin: '0 auto',
                        transition: 'border-color 0.2s',
                    }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(26,108,246,0.5)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                        <span style={{ fontSize: '16px', marginRight: '12px', opacity: 0.4 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path fill="#fff" d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.398 0-4.064-1.666Q3.808 11.898 3.808 9.5t1.666-4.064t4.064-1.667t4.065 1.667T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"></path>
                            </svg>
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for answers…"
                            value={query}
                            onChange={e => { setQuery(e.target.value); setActiveCategory(null); }}
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                fontSize: '15px',
                                color: '#fff',
                                fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 400,
                            }}
                        />
                        <button
                            onClick={() => inputRef.current?.focus()}
                            style={{
                                background: '#1a6cf6',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '10px 20px',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 500,
                                fontFamily: "'DM Sans', sans-serif",
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'background 0.18s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#2a7cff'}
                            onMouseLeave={e => e.currentTarget.style.background = '#1a6cf6'}
                        >
                            Search
                        </button>
                    </div>

                    {/* Popular tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', alignSelf: 'center', fontFamily: "'DM Sans', sans-serif" }}>Popular:</span>
                        {POPULAR_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '100px',
                                    padding: '5px 14px',
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.5)',
                                    fontFamily: "'DM Sans', sans-serif",
                                    cursor: 'pointer',
                                    transition: 'all 0.18s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,108,246,0.15)'; e.currentTarget.style.color = '#6ba3ff'; e.currentTarget.style.borderColor = 'rgba(26,108,246,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── CATEGORIES ── */}
                <section style={{ marginBottom: '80px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: "'DM Sans', sans-serif", marginBottom: '20px' }}>
                        Browse by topic
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                        {CATEGORIES.map((cat, i) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    style={{
                                        background: isActive ? `rgba(26,108,246,0.12)` : 'rgba(255,255,255,0.03)',
                                        border: isActive ? '1px solid rgba(26,108,246,0.45)' : '1px solid rgba(255,255,255,0.07)',
                                        borderRadius: '16px',
                                        padding: '18px 20px',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.22s',
                                        opacity: visible ? 1 : 0,
                                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                        transitionDelay: `${i * 40}ms`,
                                    }}
                                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; } }}
                                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; } }}
                                >
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '12px' }}>
                                        {cat.icon}
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: 500, color: isActive ? '#6ba3ff' : '#fff', fontFamily: "'DM Sans', sans-serif", marginBottom: '4px', lineHeight: 1.3 }}>
                                        {cat.label}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                                        {cat.desc}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* ── FAQS ── */}
                <section style={{ marginBottom: '80px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                            {activeCategory
                                ? `${CATEGORIES.find(c => c.id === activeCategory)?.label} — FAQs`
                                : query ? `Results for "${query}"` : 'Frequently asked questions'}
                        </p>
                        {(activeCategory || query) && (
                            <button
                                onClick={() => { setActiveCategory(null); setQuery(''); setOpenFaqId(null); }}
                                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                            >
                                Clear filter ×
                            </button>
                        )}
                    </div>

                    {filteredFaqs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px' }}>
                            No articles matched — try a different keyword or browse by topic above.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {filteredFaqs.map(faq => (
                                <FaqItem
                                    key={faq.id}
                                    faq={faq}
                                    isOpen={openFaqId === faq.id}
                                    onToggle={handleToggleFaq}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* ── CONTACT ── */}
                <section>
                    <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: "'DM Sans', sans-serif", marginBottom: '20px' }}>
                        Still need help?
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                        {CONTACT_CARDS.map((card) => (
                            <div
                                key={card.title}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: '16px',
                                    padding: '22px',
                                    cursor: 'pointer',
                                    transition: 'all 0.22s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                            >
                                <span style={{ display: 'inline-block', background: card.badgeBg, color: card.badgeColor, borderRadius: '100px', padding: '3px 12px', fontSize: '11px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.04em', marginBottom: '14px' }}>
                                    {card.badge}
                                </span>
                                <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff', fontFamily: "'DM Sans', sans-serif", marginBottom: '6px' }} className='flex gap-2 '>
                                    {card.icon} {card.title}
                                </div>
                                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                                    {card.sub}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
};

export default HelpCenter;