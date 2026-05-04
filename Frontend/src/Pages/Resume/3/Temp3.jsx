import React from 'react';
import { Phone, MapPin, Globe, Mail } from 'lucide-react';

const AmanGuptaDynamicTimeline = ({ data }) => {
    // Mapping the incoming data object for easy access
    const {
        fname, lname, phone, github, linkedin, portfolio, email,
        summaryTitle, summaryBody, experience, education,
        skills, projects, certifications, achievements, languages
    } = data;

    return (
        <div className="max-w-[850px] mx-auto my-10 bg-white shadow-lg font-sans text-[#333]">

            {/* Header Section */}
            <div className="flex justify-between items-center p-10 pb-6">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-slate-900 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                        <span className="text-white text-3xl font-black">
                            {name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-1 uppercase">{fname} {lname}</h1>
                        <p className="text-lg text-slate-600 font-medium italic">{summaryTitle}</p>
                    </div>
                </div>

                <div className="text-[12px] space-y-1 text-right font-medium">
                    <p className="flex items-center justify-end gap-2">{phone} <Phone size={14} className="text-slate-900" /></p>
                    <p className="flex items-center justify-end gap-2">{education[0]?.location || 'India'} <MapPin size={14} className="text-slate-900" /></p>
                    <p className="flex items-center justify-end gap-2">{portfolio.replace('https://', '')} <Globe size={14} className="text-slate-900" /></p>
                    <p className="flex items-center justify-end gap-2">{email} <Mail size={14} className="text-slate-900" /></p>
                </div>
            </div>

            {/* About Me & Education Block */}
            <div className="bg-[#f8f9fa] px-10 py-8 border-y border-slate-100">
                <div className="mb-8">
                    <h2 className="text-sm font-black mb-3 tracking-widest border-b-2 border-slate-900 pb-1 inline-block uppercase">About Me</h2>
                    <p className="text-sm leading-relaxed text-slate-700 text-justify">
                        {summaryBody}
                    </p>
                </div>

                <div>
                    <h2 className="text-sm font-black mb-5 tracking-widest border-b-2 border-slate-900 pb-1 inline-block uppercase">Education</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {education.map((edu, idx) => (
                            <div key={idx} className={`${idx !== education.length - 1 ? 'md:border-r' : ''} border-slate-200 pr-4`}>
                                <h3 className="text-[12px] font-bold uppercase leading-tight">{edu.institution}</h3>
                                <p className="text-xs text-slate-600 mt-1">{edu.degree} {edu.field ? `- ${edu.field}` : ''}</p>
                                <p className="text-[11px] font-black mt-1 text-slate-900 italic">
                                    {edu.startDate} - {edu.endDate} {edu.cgpa ? `| CGPA: ${edu.cgpa}` : `| ${edu.percentage}`}
                                </p>
                            </div>
                        ))}
                        <div>
                            <h3 className="text-[12px] font-bold uppercase">Highlights</h3>
                            <ul className="text-[11px] text-slate-600 mt-1 space-y-0.5">
                                {achievements.slice(0, 3).map((ach, i) => (
                                    <li key={i}>• {ach}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Combined Experience & Projects Timeline */}
            <div className="p-10">
                <h2 className="text-sm font-black mb-8 tracking-widest border-b-2 border-slate-900 pb-1 inline-block uppercase">Technical Projects & Experience</h2>

                <div className="flex gap-8 relative">
                    {/* Floating Date Indicators (Optional spacing) */}
                    <div className="hidden md:block w-20 text-[11px] font-bold text-slate-400 text-right pt-1 uppercase">
                        <p className="mb-40">Current</p>
                        <p>Previous</p>
                    </div>

                    <div className="flex-1 border-l-2 border-slate-200 pl-8 space-y-12">
                        {/* Dynamic Project Mapping */}
                        {projects.map((project, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center shadow-sm">
                                    <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-wider">{project.name} <span className="font-normal text-slate-400 mx-2">|</span> {project.stack}</h3>
                                <p className="text-[11px] font-bold text-cyan-600 mb-2 italic">Key Technical Contribution</p>
                                <ul className="text-[13px] list-disc ml-4 space-y-1.5 text-slate-700 leading-relaxed">
                                    {project.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Experience Entry Mapping */}
                        {experience.map((exp, idx) => (
                            <div key={idx} className="relative opacity-80">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-100 border-2 border-slate-300 rounded-full"></div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-slate-600">{exp.role} <span className="font-normal mx-2">@</span> {exp.company}</h3>
                                <p className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-tighter">{exp.duration} | {exp.location}</p>
                                <ul className="text-[13px] list-disc ml-4 space-y-1 text-slate-500 leading-relaxed">
                                    {exp.bullets.map((point, pIdx) => (
                                        <li key={pIdx}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Skills & Progress Footer */}
            <div className="px-10 pb-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-50 pt-8">
                <div>
                    <h2 className="text-sm font-black mb-4 tracking-widest border-b-2 border-slate-900 pb-1 inline-block uppercase">Technical Skills</h2>
                    <div className="grid grid-cols-2 text-[12px] gap-y-3 font-medium text-slate-700">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Frontend</p>
                            <p className="leading-tight">{skills.frontend.split(',').slice(0, 3).join(',')}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Backend</p>
                            <p className="leading-tight">{skills.backend.split(',').slice(0, 3).join(',')}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Database</p>
                            <p className="leading-tight">{skills.database.split(',').slice(0, 2).join(',')}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Infrastructure</p>
                            <p className="leading-tight">{skills.deployment.split(',').slice(0, 2).join(',')}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-sm font-black mb-4 tracking-widest border-b-2 border-slate-900 pb-1 inline-block uppercase">Languages</h2>
                    <div className="space-y-4">
                        {languages.map((lang, idx) => (
                            <div key={idx} className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-[12px] font-bold">{lang.split(' ')[0]}</p>
                                    <p className="text-[10px] uppercase font-black text-slate-400">{lang.split(' ')[1]}</p>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="bg-slate-900 h-full"
                                        style={{ width: idx === 0 ? '90%' : '100%' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AmanGuptaDynamicTimeline;