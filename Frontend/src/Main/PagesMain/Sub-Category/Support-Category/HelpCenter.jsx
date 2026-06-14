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
    { id: 1, cat: 'basics', q: 'How do I get started with CodeSarthi?', a: 'Sign up for a free account, then follow the onboarding checklist on your dashboard. The Beginner\'s Guide walks you through your first project step by step — you\'ll be up and running in under 10 minutes.' },
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
    { badge: 'Developer support', badgeColor: '#1a6cf6', badgeBg: 'rgba(26,108,246,0.15)', title: 'Dev community', sub: 'API, SDK & bot help from our team', icon: '🛠' },
    { badge: 'Feedback', badgeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.15)', title: 'Submit feedback', sub: 'Shape the future of CodeSarthi', icon: '💡' },
    { badge: 'Social', badgeColor: '#10b981', badgeBg: 'rgba(16,185,129,0.15)', title: 'Reach us on X', sub: 'Quick questions answered fast', icon: '𝕏' },
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

            {/* Ambient blobs */}
            <div style={{ position: 'fixed', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse at 50% 50%, rgba(26,108,246,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '0', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            <Nav />

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
                        display: 'inline-block',
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
                    }}>
                        Help Center
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
                        <span style={{ fontSize: '16px', marginRight: '12px', opacity: 0.4 }}>🔍</span>
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
                                <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff', fontFamily: "'DM Sans', sans-serif", marginBottom: '6px' }}>
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