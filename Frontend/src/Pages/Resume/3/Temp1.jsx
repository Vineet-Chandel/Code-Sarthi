import React from 'react';
import { CheckCircle } from 'lucide-react';
import {
    Mail, Phone, Globe, Linkedin, Github, ExternalLink,
    Code, Terminal, Award, BookOpen, MapPin, Briefcase
} from 'lucide-react';

const AmanGuptaDynamicResume = ({ data, scale = 1 }) => {
    if (!data) return null;

    const {
        fname, lname, phone, github, linkedin, portfolio, email, location, pincode,
        summaryTitle, summaryBody, experience = [], education = [],
        skills, projects = [], certifications = [], achievements = [], languages = []
    } = data;

    return (
        <div className="max-w-5xl  bg-white shadow-2xl flex font-sans text-slate-800 border border-slate-100 overflow-hidden">
            <div className="bg-white shadow-2xl overflow-hidden border border-slate-100 flex flex-col ">

                {/* Header */}
                <header className="bg-slate-900 text-white p-12">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                        <div>
                            <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-1px', marginBottom: 6, textTransform: 'uppercase', lineHeight: 1.1 }}>
                                {fname ? fname : "Vinayak"} {lname ? lname : "Dubey"}
                            </h1>
                            <p style={{ fontSize: 14, fontWeight: 300, color: '#22d3ee', letterSpacing: '0.2em', textTransform: 'uppercase', fontStyle: 'italic' }}>
                                {summaryTitle ? summaryTitle : "Software Engineer"}
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 32px', fontSize: 12, color: '#cbd5e1', flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Phone size={13} color="#06b6d4" /> {phone || 91 + 123456789}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Mail size={13} color="#06b6d4" /> {email || "vinayakdubey@gmail.com"}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Globe size={13} color="#06b6d4" /> {(portfolio || '').replace('https://', '') || "www.vinaykd.com"}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Linkedin size={13} color="#06b6d4" /> {(linkedin || '').split('/').pop() || "vinayak-dev"}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Github size={13} color="#06b6d4" /> {(github || '').split('/').pop() || "Vinayak-Dubey"}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <MapPin size={13} color="#06b6d4" /> {location + (pincode ? ` | ${pincode} ` : "") || "Kanpur, India"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Body */}
                <div style={{ padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, color: '#1e293b' }}>

                    {/* Main Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

                        {/* Profile */}
                        <section>
                            <h2 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 900, color: '#94a3b8', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>
                                Profile
                            </h2>
                            <p style={{ fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', color: '#475569' }}>{summaryBody || "No Summary Added"}</p>
                        </section>

                        {/* Experience */}

                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <Briefcase size={18} />
                                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Professional Experience</h2>
                            </div>
                            {experience.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                                    {experience && experience.map((exp, i) => (
                                        <div key={i} style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px solid #f1f5f9', marginLeft: 8 }}>
                                            <div style={{ position: 'absolute', left: -9, top: 4, width: 14, height: 14, background: 'white', border: '2px solid #0f172a', borderRadius: '50%' }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <h3 style={{ fontWeight: 700, fontSize: 15 }}>{exp.role} <span style={{ color: '#0891b2', fontWeight: 600, fontSize: 13 }}> {exp.employmentType}</span></h3>
                                                    <p style={{ color: '#0891b2', fontWeight: 600, fontSize: 13 }}>
                                                        {exp.company} <span style={{ color: '#94a3b8', fontWeight: 400 }}>|{exp.location}</span>
                                                    </p>
                                                </div>
                                                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>{exp.startDate + " - " + (exp.currentlyWorking ? "Present" : exp.endDate)}</span>
                                            </div>
                                            <ul style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#475569' }}>
                                                {(exp.bullets || ["No bullets added"]).map((pt, idx) => (
                                                    <li key={idx} style={{ display: 'flex', gap: 8 }}><span>•</span> {pt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}


                                </div>
                            )}
                            {(!experience || experience.length === 0) && (
                                <p style={{ color: '#475569', fontStyle: 'italic' }}>No experience added yet.</p>
                            )}
                        </section>


                        {/* Projects */}

                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                                <Terminal size={18} />
                                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Featured Projects</h2>
                            </div>
                            {projects && projects.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                                    {projects.map((project, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{project.name}</h3>
                                                <div style={{ display: 'flex', gap: 12 }}>
                                                    <a href={project.github} target="_blank" rel="noreferrer"><Github size={15} color="#94a3b8" /></a>
                                                    <a href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={15} color="#94a3b8" /></a>
                                                </div>
                                            </div>
                                            <p style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{project.stack}</p>
                                            <p style={{ fontSize: 13, color: '#475569', marginBottom: 12, lineHeight: 1.6, fontStyle: 'italic' }}>{project.description}</p>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
                                                {(project.bullets || []).map((b, idx) => (
                                                    <div key={idx} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#475569', alignItems: 'flex-start' }}>
                                                        <CheckCircle size={13} color="#06b6d4" style={{ flexShrink: 0, marginTop: 2 }} />
                                                        <span dangerouslySetInnerHTML={{ __html: b }} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {(!projects || projects.length === 0) && (
                                <p style={{ color: '#475569', fontStyle: 'italic' }}>No projects added yet.</p>
                            )}
                        </section>

                    </div>

                    {/* Sidebar */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                        {/* Skills */}
                        {skills && (
                            <section style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                    <Code size={17} />
                                    <h2 style={{ fontSize: 15, fontWeight: 700 }}>Technical Stack</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {Object.entries(skills).map(([cat, list]) => (
                                        <div key={cat}>
                                            <h4 style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 6, letterSpacing: '0.1em' }}>{cat}</h4>
                                            <p style={{ fontSize: 11, color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>{list}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {(!skills || Object.keys(skills).length === 0) && (
                            <p style={{ color: '#475569', fontStyle: 'italic' }}>No skills added yet.</p>
                        )}

                        {/* Education */}

                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <BookOpen size={17} />
                                <h2 style={{ fontSize: 15, fontWeight: 700 }}>Education</h2>
                            </div>
                            {education.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    {education && education.map((edu, i) => (
                                        <div key={i}>
                                            <h3 style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.4 }}>{edu.degree}</h3>
                                            <p style={{ fontSize: 11, color: '#0891b2', fontWeight: 700, marginTop: 4 }}>{edu.institution}</p>
                                            <p style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>
                                                {edu.startDate} — {edu.endDate} |
                                                <span style={{ color: '#0f172a', fontWeight: 700, fontStyle: 'italic', marginLeft: 4 }}>
                                                    {edu.cgpa ? `CGPA: ${edu.cgpa}` : `${edu.percentage}%`}
                                                </span>
                                            </p>
                                            {edu.bullets && (
                                                <p style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>

                                                    {(edu.bullets || []).map((b, idx) => (
                                                        <div key={idx} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#475569', alignItems: 'flex-start' }}>
                                                            <CheckCircle size={13} color="#06b6d4" style={{ flexShrink: 0, marginTop: 2 }} />
                                                            <span dangerouslySetInnerHTML={{ __html: b }} />
                                                        </div>
                                                    ))}


                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {(!education || education.length === 0) && (
                                <p style={{ color: '#475569', fontStyle: 'italic' }}>No education added yet.</p>
                            )}
                        </section>


                        {/* Recognition */}

                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                <Award size={17} />
                                <h2 style={{ fontSize: 15, fontWeight: 700 }}>Recognition</h2>
                            </div>
                            {(achievements.length > 0 || certifications.length > 0) && (
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12, color: '#475569' }}>
                                    {achievements.map((a, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 8 }}><span>•</span> {a}</li>
                                    ))}
                                    {certifications.map((c, i) => (
                                        <li key={i} style={{ display: 'flex', gap: 8, fontWeight: 500, color: '#0f172a', fontStyle: 'italic', textDecoration: 'underline', textDecorationColor: '#bae6fd' }}>
                                            <span>•</span> {c}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!achievements.length > 0 && !certifications.length > 0 && (
                                <p style={{ color: '#475569', fontStyle: 'italic' }}>No recognition added yet.</p>
                            )}
                        </section>

                    </aside>
                </div>
            </div>
        </div>
    );
};

export default AmanGuptaDynamicResume;