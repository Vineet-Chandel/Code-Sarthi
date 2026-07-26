import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import {
    Mail, Phone, Globe, Linkedin, Github, ExternalLink,
    Code, Terminal, Award, BookOpen, MapPin, Briefcase
} from 'lucide-react';


/* ─── A4 constants (96 dpi) ───────────────────────────────────────────────── */
const A4_W = 794;   // 210 mm → px
const A4_H = 1123;  // 297 mm → px

/* ─── Responsive scale-wrapper ───────────────────────────────────────────── */
const A4Wrapper = ({ children }) => {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const recalc = () => {
            if (!containerRef.current) return;
            const parentW = containerRef.current.parentElement?.clientWidth || window.innerWidth;
            // a tiny margin so it never clips
            const next = Math.min(1, (parentW - 16) / A4_W);
            setScale(next);
        };
        recalc();
        const ro = new ResizeObserver(recalc);
        if (containerRef.current?.parentElement) ro.observe(containerRef.current.parentElement);
        return () => ro.disconnect();
    }, []);

    return (
        /* outer wrapper: shrinks/grows to match the scaled height so the page
           flow around the resume stays correct */
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: A4_H * scale,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
        >
            <div
                style={{
                    width: A4_W,
                    height: A4_H,
                    transformOrigin: 'top center',
                    transform: `scale(${scale})`,
                    flexShrink: 0,
                    /* print helpers */
                    boxSizing: 'border-box',
                }}
            >
                {children}
            </div>
        </div>
    );
};

/* ─── Resume template ─────────────────────────────────────────────────────── */
const AmanGuptaDynamicResume = ({ data, scale = 1 }) => {
    if (!data) return null;

    const {
        fname, lname, phone, github, linkedin, portfolio, email, location, pincode,
        summaryTitle, summaryBody, experience = [], education = [],
        skills, projects = [], certifications = [], achievements = [], languages = []
    } = data;

    return (
        <A4Wrapper>
            {/* ── fixed A4 canvas ── */}
            <div
                style={{
                    width: A4_W,
                    height: A4_H,
                    background: '#ffffff',
                    boxShadow: '0 8px 40px rgba(0,0,0,.18)',
                    border: '1px solid #e2e8f0',
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    color: '#1e293b', overflow: 'hidden',          /* nothing bleeds outside A4 */
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                }}
            >
                {/* ── HEADER ── */}
                <header
                    style={{
                        background: '#0f172a',
                        color: '#ffffff',
                        padding: '28px 40px 24px',
                        flexShrink: 0,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
                        <div style={{ minWidth: 0 }}>
                            <h1 style={{
                                fontSize: 32,
                                fontWeight: 900,
                                letterSpacing: '-0.5px',
                                marginBottom: 4,
                                textTransform: 'uppercase',
                                lineHeight: 1.1,
                                margin: 0,
                            }}>
                                {fname || 'Vinayak'} {lname || 'Dubey'}
                            </h1>
                            <p style={{
                                fontSize: 11,
                                fontWeight: 300,
                                color: '#22d3ee',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontStyle: 'italic',
                                marginTop: 6,
                            }}>
                                {summaryTitle || 'Software Engineer'}
                            </p>
                        </div>

                        {/* contact grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '4px 24px',
                            fontSize: 10.5,
                            color: '#cbd5e1',
                            flexShrink: 0,
                        }}>
                            {[
                                [Phone, phone || '91-123456789'],
                                [Mail, email || 'vinayakdubey@gmail.com'],
                                [Globe, (portfolio || '').replace('https://', '') || 'www.vinaykd.com'],
                                [Linkedin, (linkedin || '').split('/').pop() || 'vinayak-dev'],
                                [Github, (github || '').split('/').pop() || 'Vinayak-Dubey'],
                                [MapPin, location + (pincode ? ` | ${pincode}` : '') || 'Kanpur, India'],
                            ].map(([Icon, text], i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <Icon size={11} color="#06b6d4" style={{ flexShrink: 0 }} />
                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </header>

                {/* ── BODY: two-column grid that fills the remaining A4 height ── */}
                <div
                    style={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: '1fr 230px',
                        gap: 0,
                        overflow: 'hidden',   /* hard clip at A4 boundary */
                        minHeight: 0,
                    }}
                >
                    {/* ── MAIN COLUMN ── */}
                    <div
                        style={{
                            padding: '24px 28px 24px 40px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 22,
                            overflowY: 'hidden',   /* clip, don't scroll — stays on one page */
                            borderRight: '1px solid #f1f5f9',
                            boxSizing: 'border-box',
                        }}
                    >
                        {/* Profile */}
                        <section>
                            <SectionLabel>Profile</SectionLabel>
                            <p style={{ fontSize: 11.5, lineHeight: 1.65, fontStyle: 'italic', color: '#475569', margin: 0 }}>
                                {summaryBody || 'No Summary Added'}
                            </p>
                        </section>

                        {/* Experience */}
                        <section>
                            <IconHeading icon={<Briefcase size={14} />}>Professional Experience</IconHeading>
                            {experience.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {experience.map((exp, i) => (
                                        <div key={i} style={{ position: 'relative', paddingLeft: 18, borderLeft: '2px solid #e2e8f0', marginLeft: 6 }}>
                                            <div style={{ position: 'absolute', left: -7, top: 4, width: 11, height: 11, background: '#fff', border: '2px solid #0f172a', borderRadius: '50%' }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                                                <div>
                                                    <h3 style={{ fontWeight: 700, fontSize: 12, margin: 0 }}>
                                                        {exp.role}
                                                        <span style={{ color: '#0891b2', fontWeight: 500, fontSize: 11, marginLeft: 4 }}>{exp.employmentType}</span>
                                                    </h3>
                                                    <p style={{ color: '#0891b2', fontWeight: 600, fontSize: 11, margin: '2px 0 0' }}>
                                                        {exp.company}
                                                        <span style={{ color: '#94a3b8', fontWeight: 400 }}> | {exp.location}</span>
                                                    </p>
                                                </div>
                                                <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                                    {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                                                </span>
                                            </div>
                                            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3, fontSize: 11, color: '#475569' }}>
                                                {(exp.bullets || ['No bullets added']).map((pt, idx) => (
                                                    <li key={idx} style={{ display: 'flex', gap: 6 }}><span>•</span>{pt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ) : <Empty>No experience added yet.</Empty>}
                        </section>

                        {/* Projects */}
                        <section>
                            <IconHeading icon={<Terminal size={14} />}>Featured Projects</IconHeading>
                            {projects.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {projects.map((project, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                                <h3 style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{project.name}</h3>
                                                <div style={{ display: 'flex', gap: 10 }}>
                                                    <a href={project.github} target="_blank" rel="noreferrer"><Github size={12} color="#94a3b8" /></a>
                                                    <a href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={12} color="#94a3b8" /></a>
                                                </div>
                                            </div>
                                            <p style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>{project.stack}</p>
                                            <p style={{ fontSize: 11, color: '#475569', margin: '0 0 6px', lineHeight: 1.5, fontStyle: 'italic' }}>{project.description}</p>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                                                {(project.bullets || []).map((b, idx) => (
                                                    <div key={idx} style={{ display: 'flex', gap: 5, fontSize: 10.5, color: '#475569', alignItems: 'flex-start' }}>
                                                        <CheckCircle size={11} color="#06b6d4" style={{ flexShrink: 0, marginTop: 1 }} />
                                                        <span dangerouslySetInnerHTML={{ __html: b }} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <Empty>No projects added yet.</Empty>}
                        </section>
                    </div>

                    {/* ── SIDEBAR ── */}
                    <aside
                        style={{
                            padding: '24px 24px 24px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20,
                            background: '#f8fafc',
                            overflowY: 'hidden',
                            boxSizing: 'border-box',
                        }}
                    >
                        {/* Skills */}
                        <section>
                            <SectionLabel>Skills</SectionLabel>
                            {skills && Object.keys(Array.isArray(skills) ? skills : Object.values(skills)).length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {(Array.isArray(skills) ? skills : Object.values(skills)).map((skill, i) => (
                                        <div key={i} style={{ fontSize: 11 }}>
                                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{skill.skillCategory}: </span>
                                            <span style={{ color: '#475569' }}>
                                                {Array.isArray(skill.skills) ? skill.skills.join(', ') : skill.skills}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : <Empty>No skills added yet.</Empty>}
                        </section>

                        {/* Education */}
                        <section>
                            <IconHeading icon={<BookOpen size={13} />} small>Education</IconHeading>
                            {education.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    {education.map((edu, i) => (
                                        <div key={i}>
                                            <h3 style={{ fontWeight: 700, fontSize: 11, lineHeight: 1.4, margin: 0 }}>{edu.degree}</h3>
                                            <p style={{ fontSize: 10.5, color: '#0891b2', fontWeight: 700, margin: '3px 0 0' }}>{edu.institution}</p>
                                            <p style={{ fontSize: 10, color: '#64748b', margin: '2px 0 0' }}>
                                                {edu.startDate} — {edu.endDate}
                                                <span style={{ color: '#0f172a', fontWeight: 700, fontStyle: 'italic', marginLeft: 4 }}>
                                                    {edu.cgpa ? `CGPA: ${edu.cgpa}` : `${edu.percentage}%`}
                                                </span>
                                            </p>
                                            {edu.bullets && (
                                                <div style={{ marginTop: 4 }}>
                                                    {(edu.bullets || []).map((b, idx) => (
                                                        <div key={idx} style={{ display: 'flex', gap: 5, fontSize: 10, color: '#475569', alignItems: 'flex-start', marginBottom: 2 }}>
                                                            <CheckCircle size={10} color="#06b6d4" style={{ flexShrink: 0, marginTop: 1 }} />
                                                            <span dangerouslySetInnerHTML={{ __html: b }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : <Empty>No education added yet.</Empty>}
                        </section>

                        {/* Recognition */}
                        <section>
                            <IconHeading icon={<Award size={13} />} small>Recognition</IconHeading>
                            {(achievements.length > 0 || certifications.length > 0) ? (
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, fontSize: 11, color: '#475569' }}>
                                    {achievements.map((a, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 6 }}><span>•</span>{a}</li>
                                    ))}
                                    {certifications.map((c, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 6, fontWeight: 600, color: '#0f172a', fontStyle: 'italic', textDecoration: 'underline', textDecorationColor: '#bae6fd' }}>
                                            <span>•</span>{c.about} {c.link}
                                        </li>
                                    ))}
                                </ul>
                            ) : <Empty>No recognition added yet.</Empty>}
                        </section>
                        <section>
                            <IconHeading icon={<Award size={13} />} small>Languages</IconHeading>
                            {(languages.length > 0) ? (
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, fontSize: 11, color: '#475569' }}>
                                    {languages.map((a, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span>•</span>
                                            <span>
                                                {a.langCategory} ({a.status})
                                            </span>
                                        </li>
                                    ))}
                                    {/* {language.map((c, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 6, fontWeight: 600, color: '#0f172a', fontStyle: 'italic', textDecoration: 'underline', textDecorationColor: '#bae6fd' }}>
                                            <span>•</span>{c}
                                        </li>
                                    ))} */}
                                </ul>
                            ) : <Empty>No recognition added yet.</Empty>}
                        </section>
                    </aside>
                </div>
            </div>
        </A4Wrapper>
    );
};

/* ── tiny shared sub-components (no prop changes to parent) ─────────────── */
const SectionLabel = ({ children }) => (
    <h2 style={{
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: '0.3em',
        fontWeight: 900,
        color: '#94a3b8',
        margin: '0 0 8px',
        paddingBottom: 6,
        borderBottom: '1px solid #e2e8f0',
    }}>{children}</h2>
);

const IconHeading = ({ icon, children, small }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: small ? 12 : 14 }}>
        {icon}
        <h2 style={{ fontSize: small ? 12 : 13, fontWeight: 700, margin: 0 }}>{children}</h2>
    </div>
);

const Empty = ({ children }) => (
    <p style={{ color: '#475569', fontStyle: 'italic', fontSize: 11, margin: 0 }}>{children}</p>
);

export default AmanGuptaDynamicResume;