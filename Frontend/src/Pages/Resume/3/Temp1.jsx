import React from 'react';
import {
    Mail, Phone, Globe, Linkedin, Github, ExternalLink,
    Code, Terminal, Award, BookOpen, CheckCircle, MapPin, Briefcase
} from 'lucide-react';

const AmanGuptaDynamicResume = ({ data }) => {
    // Destructuring the primary fields from resumeData1
    const {
        name, phone, github, linkedin, portfolio, email,
        summaryTitle, summaryBody, experience, education,
        skills, projects, certifications, achievements, languages
    } = data;

    return (
        <div className="max-w-[900px] mx-auto my-12 bg-white shadow-2xl rounded-xl overflow-hidden font-sans border border-slate-100 flex flex-col">

            {/* Header Section */}
            <header className="bg-slate-900 text-white p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter mb-2 uppercase">{name}</h1>
                        <p className="text-xl font-light text-cyan-400 tracking-widest uppercase italic">
                            {summaryTitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-300">
                        <div className="flex items-center gap-2"><Phone size={14} className="text-cyan-500" /> {phone}</div>
                        <div className="flex items-center gap-2"><Mail size={14} className="text-cyan-500" /> {email}</div>
                        <div className="flex items-center gap-2"><Globe size={14} className="text-cyan-500" /> {portfolio.replace('https://', '')}</div>
                        <div className="flex items-center gap-2"><Linkedin size={14} className="text-cyan-500" /> {linkedin.split('/').pop()}</div>
                        <div className="flex items-center gap-2"><Github size={14} className="text-cyan-500" /> {github.split('/').pop()}</div>
                    </div>
                </div>
            </header>

            <div className="p-12 grid grid-cols-12 gap-12 text-slate-800">

                {/* Main Column */}
                <div className="col-span-12 lg:col-span-8 space-y-12">

                    <section>
                        <h2 className="text-xs uppercase tracking-[0.3em] font-black text-slate-400 mb-4 border-b pb-2">Profile</h2>
                        <p className="text-[15px] leading-relaxed text-slate-600">
                            {summaryBody}
                        </p>
                    </section>

                    {/* Experience Mapping */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Briefcase className="text-slate-900" size={20} />
                            <h2 className="text-lg font-bold text-slate-900">Professional Experience</h2>
                        </div>
                        <div className="space-y-8">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative pl-8 border-l-2 border-slate-100 ml-2">
                                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white border-2 border-slate-900 rounded-full"></div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg">{exp.role}</h3>
                                            <p className="text-cyan-600 font-semibold">{exp.company} <span className="text-slate-400 font-normal">| {exp.location}</span></p>
                                        </div>
                                        <span className="text-sm font-bold text-slate-500">{exp.duration}</span>
                                    </div>
                                    <ul className="mt-4 space-y-2 text-[14px] text-slate-600">
                                        {exp.points.map((point, idx) => (
                                            <li key={idx} className="flex gap-2"><span>•</span> {point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects Mapping */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Terminal className="text-slate-900" size={20} />
                            <h2 className="text-lg font-bold text-slate-900">Featured Projects</h2>
                        </div>
                        <div className="space-y-10">
                            {projects.map((project, index) => (
                                <div key={index} className="group">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-xl font-bold group-hover:text-cyan-600 transition-colors">{project.name}</h3>
                                        <div className="flex gap-3">
                                            <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900"><Github size={16} /></a>
                                            <a href={project.live} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900"><ExternalLink size={16} /></a>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 tracking-tighter uppercase mb-3">{project.stack}</p>
                                    <p className="text-[14px] text-slate-600 mb-4 leading-relaxed italic">
                                        {project.name} {project.description}
                                    </p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[13px] text-slate-600">
                                        {project.bullets.map((bullet, idx) => (
                                            <li key={idx} className="flex gap-2">
                                                <CheckCircle size={14} className="text-cyan-500 shrink-0 mt-0.5" />
                                                <span dangerouslySetInnerHTML={{ __html: bullet }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Column */}
                <aside className="col-span-12 lg:col-span-4 space-y-10">

                    {/* Skills from resumeData1 */}
                    <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Code className="text-slate-900" size={20} />
                            <h2 className="text-lg font-bold text-slate-900">Technical Stack</h2>
                        </div>
                        <div className="space-y-5">
                            {Object.entries(skills).map(([category, list]) => (
                                <div key={category}>
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">{category}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{list}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Mapping */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="text-slate-900" size={20} />
                            <h2 className="text-lg font-bold text-slate-900">Education</h2>
                        </div>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-sm leading-tight">{edu.degree}</h3>
                                    <p className="text-xs text-cyan-600 font-bold mt-1">{edu.institution}</p>
                                    <p className="text-[11px] text-slate-500 mt-1">
                                        {edu.startDate} — {edu.endDate} |
                                        <span className="text-slate-900 font-bold ml-1 italic">
                                            {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                                        </span>
                                    </p>
                                    {edu.coursework && (
                                        <p className="text-[11px] text-slate-400 mt-1">Focus: {edu.coursework.join(', ')}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements & Certifications */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="text-slate-900" size={20} />
                            <h2 className="text-lg font-bold text-slate-900">Recognition</h2>
                        </div>
                        <ul className="space-y-3 text-[13px] text-slate-600">
                            {achievements.map((ach, index) => (
                                <li key={index} className="flex gap-2"><span>•</span> {ach}</li>
                            ))}
                            {certifications.map((cert, index) => (
                                <li key={index} className="flex gap-2 font-medium text-slate-900 italic underline decoration-cyan-200"><span>•</span> {cert}</li>
                            ))}
                        </ul>
                    </section>


                </aside>
            </div>
        </div>
    );
};

export default AmanGuptaDynamicResume;