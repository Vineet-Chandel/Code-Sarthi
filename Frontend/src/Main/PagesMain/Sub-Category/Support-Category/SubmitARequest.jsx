import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../nav';
import Footer from '../../../Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const REQUEST_TYPES = [
    { id: 'feature', icon: '✨', label: 'Feature request', desc: 'New functionality' },
    { id: 'access', icon: '🔑', label: 'Access request', desc: 'Permissions & roles' },
    { id: 'integration', icon: '🔌', label: 'Integration', desc: 'Connect a service' },
    { id: 'data', icon: '📊', label: 'Data / export', desc: 'Download or migrate' },
    { id: 'support', icon: '🛟', label: 'Technical support', desc: 'Need expert help' },
    { id: 'other', icon: '📝', label: 'Other', desc: 'Something else' },
];

const PRIORITIES = [
    {
        id: 'low',
        label: 'Low',
        desc: 'Nice to have, no urgency',
        color: '#10b981',
        bg: 'rgba(16,185,129,0.06)',
        border: 'rgba(16,185,129,0.12)',
        activeBorder: 'rgba(16,185,129,0.4)',
        activeBg: 'rgba(16,185,129,0.14)',
    },
    {
        id: 'medium',
        label: 'Medium',
        desc: 'Affects productivity',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.06)',
        border: 'rgba(245,158,11,0.12)',
        activeBorder: 'rgba(245,158,11,0.4)',
        activeBg: 'rgba(245,158,11,0.14)',
    },
    {
        id: 'high',
        label: 'High',
        desc: 'Blocking critical work',
        color: '#ef4444',
        bg: 'rgba(239,68,68,0.06)',
        border: 'rgba(239,68,68,0.12)',
        activeBorder: 'rgba(239,68,68,0.4)',
        activeBg: 'rgba(239,68,68,0.14)',
    },
];

const AREA_TAGS = [
    'API', 'Dashboard', 'Bots & automations', 'SDK', 'Billing',
    'Mobile', 'Webhooks', 'Analytics', 'Auth / SSO', 'Notifications',
];

const SCALE_OPTIONS = [
    'Just me', 'Small team (2–10)', 'Team (11–50)',
    'Department (51–200)', 'Whole organisation',
];

const TIMELINE = [
    { num: 1, color: 'rgba(139,92,246,0.2)', textColor: '#b89fff', title: 'Request received', desc: 'We log it and you get a confirmation email with a tracking ID.' },
    { num: 2, color: 'rgba(26,108,246,0.2)', textColor: '#6ba3ff', title: 'Team review (1–3 days)', desc: 'The right team assesses feasibility, priority, and effort.' },
    { num: 3, color: 'rgba(16,185,129,0.2)', textColor: '#6ee7b7', title: 'We follow up', desc: 'We will reach out with a decision, timeline, or clarifying questions.' },
    { num: 4, color: 'rgba(245,158,11,0.2)', textColor: '#fcd34d', title: 'Resolution', desc: 'Accepted requests move to our backlog. You will be notified on updates.' },
];

const STEP_PROGRESS = [0, 25, 50, 75, 100];
const STEP_LABELS = [
    '',
    'Step 1 of 4 — Request type',
    'Step 2 of 4 — Priority & areas',
    'Step 3 of 4 — Details',
    'Step 4 of 4 — Your info & review',
];

// ─── SHARED STYLES ────────────────────────────────────────────────────────────

const S = {
    sectionLabel: {
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
        fontFamily: "'DM Sans', sans-serif", marginBottom: '14px',
    },
    fieldLabel: {
        display: 'block', fontSize: '13px', fontWeight: 500,
        color: 'rgba(255,255,255,0.6)', marginBottom: '8px',
        fontFamily: "'DM Sans', sans-serif",
    },
    input: {
        width: '100%', background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)', borderRadius: '12px',
        padding: '12px 16px', fontSize: '14px', color: '#fff',
        fontFamily: "'DM Sans', sans-serif", outline: 'none',
        transition: 'border-color 0.2s', resize: 'none',
    },
    primaryBtn: {
        flex: 1, background: '#8b5cf6', border: 'none', borderRadius: '14px',
        padding: '16px', fontSize: '15px', fontWeight: 600, color: '#fff',
        cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
        transition: 'background 0.18s',
    },
    backBtn: {
        flexShrink: 0, width: '100px', background: 'rgba(255,255,255,0.06)',
        border: 'none', borderRadius: '14px', padding: '16px', fontSize: '15px',
        fontWeight: 600, color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
    },
    divider: { border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 0 28px' },
};

function focusStyle(e) { e.target.style.borderColor = 'rgba(139,92,246,0.5)'; }
function blurStyle(e) { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

function Step1({ requestType, onSelect, onNext }) {
    return (
        <div>
            <p style={S.sectionLabel}>What kind of request is this?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px', marginBottom: '32px' }}>
                {REQUEST_TYPES.map(rt => (
                    <button
                        key={rt.id}
                        onClick={() => onSelect(rt.id)}
                        style={{
                            background: requestType === rt.id ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                            border: requestType === rt.id ? '1px solid rgba(139,92,246,0.45)' : '1px solid rgba(255,255,255,0.07)',
                            borderRadius: '14px', padding: '14px', cursor: 'pointer',
                            textAlign: 'left', transition: 'all 0.2s',
                        }}
                    >
                        <span style={{ fontSize: '20px', marginBottom: '8px', display: 'block' }}>{rt.icon}</span>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#fff', fontFamily: "'DM Sans', sans-serif", marginBottom: '3px' }}>{rt.label}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{rt.desc}</div>
                    </button>
                ))}
            </div>
            <button
                onClick={onNext}
                disabled={!requestType}
                style={{ ...S.primaryBtn, width: '100%', opacity: requestType ? 1 : 0.4, cursor: requestType ? 'pointer' : 'not-allowed' }}
            >
                Continue →
            </button>
        </div>
    );
}

function Step2({ priority, onPriority, areas, onToggleArea, onBack, onNext }) {
    return (
        <div>
            <p style={S.sectionLabel}>Set a priority level</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '32px' }}>
                {PRIORITIES.map(p => {
                    const isActive = priority === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => onPriority(p.id)}
                            style={{
                                background: isActive ? p.activeBg : p.bg,
                                border: `1px solid ${isActive ? p.activeBorder : p.border}`,
                                borderRadius: '14px', padding: '16px 14px',
                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                            }}
                        >
                            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', color: p.color, marginBottom: '4px', fontFamily: "'DM Sans', sans-serif" }}>
                                {p.label}
                            </div>
                            <div style={{ fontSize: '11px', color: p.color, opacity: 0.65, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
                                {p.desc}
                            </div>
                        </button>
                    );
                })}
            </div>

            <hr style={S.divider} />

            <p style={{ ...S.sectionLabel, marginBottom: '14px' }}>
                Affected areas{' '}
                <span style={{ textTransform: 'none', fontWeight: 400, fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
                    (pick all that apply)
                </span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {AREA_TAGS.map(tag => (
                    <button
                        key={tag}
                        onClick={() => onToggleArea(tag)}
                        style={{
                            background: areas.includes(tag) ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.05)',
                            border: areas.includes(tag) ? '1px solid rgba(139,92,246,0.35)' : '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '100px', padding: '5px 14px', fontSize: '12px',
                            color: areas.includes(tag) ? '#b89fff' : 'rgba(255,255,255,0.45)',
                            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.18s',
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={onBack} style={S.backBtn}>← Back</button>
                <button onClick={onNext} style={S.primaryBtn}>Continue →</button>
            </div>
        </div>
    );
}

function Step3({ title, onTitle, description, onDesc, outcome, onOutcome, deadline, onDeadline, scale, onScale, onBack, onNext }) {
    const canContinue = title.trim() && description.trim();
    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <label style={S.fieldLabel}>Request title <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(required)</span></label>
                <input
                    type="text" value={title} onChange={e => onTitle(e.target.value)}
                    placeholder="One-line summary of your request…" maxLength={120}
                    style={S.input} onFocus={focusStyle} onBlur={blurStyle}
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={S.fieldLabel}>Describe your request <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(required)</span></label>
                <textarea
                    value={description} onChange={e => onDesc(e.target.value)} rows={5}
                    placeholder="Explain what you need and why. The more context, the faster we can act on it…"
                    maxLength={1500} style={S.input} onFocus={focusStyle} onBlur={blurStyle}
                />
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'right', marginTop: '4px', fontFamily: "'DM Sans', sans-serif" }}>
                    {description.length} / 1500
                </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={S.fieldLabel}>Expected outcome <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(optional)</span></label>
                <textarea
                    value={outcome} onChange={e => onOutcome(e.target.value)} rows={3}
                    placeholder="What does success look like? What will this unblock?…"
                    maxLength={600} style={S.input} onFocus={focusStyle} onBlur={blurStyle}
                />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                    <label style={S.fieldLabel}>Deadline <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(optional)</span></label>
                    <input
                        type="date" value={deadline} onChange={e => onDeadline(e.target.value)}
                        style={{ ...S.input, colorScheme: 'dark' }} onFocus={focusStyle} onBlur={blurStyle}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={S.fieldLabel}>Users affected <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(optional)</span></label>
                    <select value={scale} onChange={e => onScale(e.target.value)} style={S.input} onFocus={focusStyle} onBlur={blurStyle}>
                        <option value="">Select…</option>
                        {SCALE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={onBack} style={S.backBtn}>← Back</button>
                <button
                    onClick={onNext} disabled={!canContinue}
                    style={{ ...S.primaryBtn, opacity: canContinue ? 1 : 0.4, cursor: canContinue ? 'pointer' : 'not-allowed' }}
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}

function Step4({ name, onName, email, onEmail, org, onOrg, links, onLinks, onBack, onSubmit }) {
    const canSubmit = name.trim() && email.trim();
    return (
        <div>
            <p style={S.sectionLabel}>Who's submitting this?</p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                    <label style={S.fieldLabel}>Full name <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(required)</span></label>
                    <input type="text" value={name} onChange={e => onName(e.target.value)} placeholder="Your name" style={S.input} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={S.fieldLabel}>Email <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(required)</span></label>
                    <input type="email" value={email} onChange={e => onEmail(e.target.value)} placeholder="you@example.com" style={S.input} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={S.fieldLabel}>Organisation / team <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(optional)</span></label>
                <input type="text" value={org} onChange={e => onOrg(e.target.value)} placeholder="Your company or team name" style={S.input} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            <div style={{ marginBottom: '32px' }}>
                <label style={S.fieldLabel}>Supporting links <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(optional)</span></label>
                <input type="text" value={links} onChange={e => onLinks(e.target.value)} placeholder="Figma file, GitHub issue, doc link…" style={S.input} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            <hr style={S.divider} />

            <p style={S.sectionLabel}>What happens next</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '32px' }}>
                {TIMELINE.map((item, i) => (
                    <div key={item.num} style={{ display: 'flex', gap: '16px', paddingBottom: i < TIMELINE.length - 1 ? '20px' : 0, position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: item.textColor, fontFamily: "'DM Sans', sans-serif" }}>
                                {item.num}
                            </div>
                            {i < TIMELINE.length - 1 && (
                                <div style={{ width: '2px', flex: 1, background: 'rgba(255,255,255,0.06)', marginTop: '4px', marginBottom: '-4px' }} />
                            )}
                        </div>
                        <div style={{ paddingBottom: i < TIMELINE.length - 1 ? '4px' : 0 }}>
                            <div style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginBottom: '3px', fontFamily: "'DM Sans', sans-serif" }}>{item.title}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={onBack} style={S.backBtn}>← Back</button>
                <button
                    onClick={onSubmit} disabled={!canSubmit}
                    style={{ ...S.primaryBtn, opacity: canSubmit ? 1 : 0.4, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
                >
                    Submit request →
                </button>
            </div>
        </div>
    );
}

function SuccessScreen({ reqId, onReset }) {
    return (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '52px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', fontFamily: "'Syne', sans-serif", marginBottom: '12px' }}>
                Request submitted!
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", maxWidth: '380px', margin: '0 auto 12px' }}>
                Your request is in the queue. The team will review it and follow up within 1–3 business days.
            </p>
            <div style={{ display: 'inline-block', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', padding: '6px 20px', fontSize: '14px', color: '#b89fff', fontWeight: 600, letterSpacing: '0.05em', margin: '4px 0 8px', fontFamily: "'DM Sans', sans-serif" }}>
                {reqId}
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: "'DM Sans', sans-serif", marginBottom: '32px' }}>
                Save this ID to track your request status.
            </p>
            <button onClick={onReset} style={{ ...S.primaryBtn, maxWidth: '220px', margin: '0 auto', display: 'block' }}>
                Submit another →
            </button>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const RequestPortal = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [reqId, setReqId] = useState('');
    const [visible, setVisible] = useState(false);

    // Step 1
    const [requestType, setRequestType] = useState(null);
    // Step 2
    const [priority, setPriority] = useState(null);
    const [areas, setAreas] = useState([]);
    // Step 3
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');
    const [outcome, setOutcome] = useState('');
    const [deadline, setDeadline] = useState('');
    const [scale, setScale] = useState('');
    // Step 4
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [org, setOrg] = useState('');
    const [links, setLinks] = useState('');

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const toggleArea = (tag) =>
        setAreas(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

    const handleSubmit = () => {
        // POST payload to your API here:
        // await fetch('/api/requests', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ requestType, priority, areas, title, description, outcome, deadline, scale, name, email, org, links }),
        // });
        const id = 'REQ-' + Math.floor(100000 + Math.random() * 900000);
        setReqId(id);
        setSubmitted(true);
    };

    const resetForm = () => {
        setStep(1); setSubmitted(false); setReqId('');
        setRequestType(null); setPriority(null); setAreas([]);
        setTitle(''); setDesc(''); setOutcome('');
        setDeadline(''); setScale('');
        setName(''); setEmail(''); setOrg(''); setLinks('');
    };

    return (
        <div style={{ minHeight: '100vh', width: '100%', background: '#050508', overflowX: 'hidden', position: 'relative' }}>

            {/* Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

            {/* Ambient blobs */}
            <div style={{ position: 'fixed', top: '-200px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: 0, right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(ellipse at 50% 50%, rgba(26,108,246,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            <Nav />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', padding: '0 24px 120px' }}>

                {/* ── HERO ── */}
                <div
                    style={{
                        textAlign: 'center',
                        paddingTop: '140px',
                        paddingBottom: '64px',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(32px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}
                >
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(139,92,246,0.12)',
                        border: '1px solid rgba(139,92,246,0.25)',
                        borderRadius: '100px',
                        padding: '6px 18px',
                        fontSize: '11px', fontWeight: 600,
                        color: '#b89fff', letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontFamily: "'DM Sans', sans-serif",
                        marginBottom: '24px',
                    }}>
                        Request portal
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(40px, 7vw, 68px)',
                        fontWeight: 800,
                        fontFamily: "'Syne', sans-serif",
                        color: '#fff',
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        marginBottom: '16px',
                    }}>
                        What do you<br />
                        <span style={{ color: '#8b5cf6' }}>need from us?</span>
                    </h1>
                    <p style={{
                        fontSize: '17px',
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        lineHeight: 1.7,
                        maxWidth: '420px',
                        margin: '0 auto',
                    }}>
                        Submit a request — feature, access, support, or integration. We track every one.
                    </p>
                </div>

                {/* ── FORM CARD ── */}
                <div
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '24px',
                        padding: 'clamp(24px, 5vw, 48px)',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
                    }}
                >
                    {!submitted ? (
                        <>
                            {/* Progress bar */}
                            <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', background: '#8b5cf6', borderRadius: '2px', width: `${STEP_PROGRESS[step]}%`, transition: 'width 0.4s ease' }} />
                            </div>
                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif", marginBottom: '28px' }}>
                                {STEP_LABELS[step]}
                            </p>

                            {step === 1 && (
                                <Step1 requestType={requestType} onSelect={setRequestType} onNext={() => setStep(2)} />
                            )}
                            {step === 2 && (
                                <Step2 priority={priority} onPriority={setPriority} areas={areas} onToggleArea={toggleArea} onBack={() => setStep(1)} onNext={() => setStep(3)} />
                            )}
                            {step === 3 && (
                                <Step3
                                    title={title} onTitle={setTitle}
                                    description={description} onDesc={setDesc}
                                    outcome={outcome} onOutcome={setOutcome}
                                    deadline={deadline} onDeadline={setDeadline}
                                    scale={scale} onScale={setScale}
                                    onBack={() => setStep(2)} onNext={() => setStep(4)}
                                />
                            )}
                            {step === 4 && (
                                <Step4
                                    name={name} onName={setName}
                                    email={email} onEmail={setEmail}
                                    org={org} onOrg={setOrg}
                                    links={links} onLinks={setLinks}
                                    onBack={() => setStep(3)} onSubmit={handleSubmit}
                                />
                            )}
                        </>
                    ) : (
                        <SuccessScreen reqId={reqId} onReset={resetForm} />
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default RequestPortal;