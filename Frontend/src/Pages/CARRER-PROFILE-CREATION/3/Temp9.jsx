import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
const AmanGuptaTimelineResume = ({ data }) => {
    const {
        fname, lname, phone, email, portfolio, summaryTitle, summaryBody,
        skills, projects, education, languages, achievements, certifications
    } = data;

    return (
        <div className="max-w-5xl mx-auto my-10 bg-white shadow-2xl flex font-sans text-slate-800 border border-slate-100 overflow-hidden">

            {/* Left Sidebar (Grey Background) */}
            <aside className="w-[35%] bg-[#e5e5e5] p-10 space-y-10">
                {/* Profile Image Circle */}
                <div className="flex justify-center mb-10">
                    <div className="w-48 h-48 rounded-full border-[6px] border-white overflow-hidden bg-slate-400 flex items-center justify-center text-white text-6xl font-bold">
                        {fname[0]}{lname[0]}
                    </div>
                </div>

                {/* About Me Section */}
                <section>
                    <h2 className="text-xl font-bold uppercase tracking-widest border-b border-slate-400 pb-1 mb-4">About Me</h2>
                    <p className="text-[13px] leading-relaxed text-justify">
                        {summaryBody}
                    </p>
                </section>

                {/* Education Section */}
                <section>
                    <h2 className="text-xl font-bold uppercase tracking-widest border-b border-slate-400 pb-1 mb-4">Education</h2>
                    <div className="space-y-6">
                        {education.map((edu, idx) => (
                            <div key={idx}>
                                <p className="font-bold text-[14px] leading-tight">{edu.degree}</p>
                                <p className="text-[13px] italic">{edu.institution}</p>
                                <p className="text-[12px] font-medium">{edu.startDate} - {edu.endDate}</p>

                                {
                                    edu.bullets && (
                                        <ul className="space-y-1.5 ml-1">
                                            {(edu.bullets || []).map((b, idx) => (
                                                <li key={idx} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#475569', alignItems: 'flex-start' }}>
                                                    ●
                                                    <span dangerouslySetInnerHTML={{ __html: b }} />
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills with Progress Bars */}
                <section>
                    <h2 className="text-xl font-bold uppercase tracking-widest border-b border-slate-400 pb-1 mb-4">Skills</h2>
                    <div className="space-y-3">
                        {skills.map((item, idx) => {
                            return (<div className="space-y-2">
                                <p> ● <strong>{item.skillCategory} :</strong> {item.skills}</p>
                            </div>)
                        })}

                    </div>
                </section>

                {/* Language Section */}
                <section>
                    <h2 className="text-xl font-bold uppercase tracking-widest border-b border-slate-400 pb-1 mb-4">Language</h2>
                    <ul className="text-[14px] space-y-1">
                        {languages.map((lang, index) => (
                            <div key={index} className='flex'>
                                <p className="text-[13px] font-bold">{lang.langCategory}</p>
                                <p className="text-[12px] text-gray-600">, {lang.status}</p>

                            </div>
                        ))}
                    </ul>
                </section>
            </aside>

            {/* Right Column (White Background) */}
            <main className="flex-1 bg-white">
                {/* Black Header Banner */}
                <div className="bg-[#1a1a1a] text-white p-12 pr-16 mt-16 relative">
                    <h1 className="text-5xl font-bold tracking-widest uppercase mb-2">{fname} {lname}</h1>
                    <p className="text-xl tracking-[0.2em] font-light uppercase text-slate-300">{summaryTitle}</p>
                </div>

                {/* Contact Info Bar */}
                <div className="grid grid-cols-2 gap-4 px-12 py-8 border-b border-slate-100">
                    <div className="flex items-center gap-3 text-[13px]">
                        <div className="bg-[#1a1a1a] p-1.5 rounded text-white"><Phone size={14} /></div>
                        {phone}
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                        <div className="bg-[#1a1a1a] p-1.5 rounded text-white"><Globe size={14} /></div>
                        {portfolio.replace('https://', '')}
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                        <div className="bg-[#1a1a1a] p-1.5 rounded text-white"><Mail size={14} /></div>
                        {email}
                    </div>
                    <div className="flex items-center gap-3 text-[13px]">
                        <div className="bg-[#1a1a1a] p-1.5 rounded text-white"><MapPin size={14} /></div>
                        {education[0]?.location || 'India'}
                    </div>
                </div>

                {/* Experience Timeline Section */}
                <section className="p-12">
                    <h2 className="text-2xl font-bold uppercase tracking-[0.2em] mb-10 border-b border-slate-200 pb-2">Experience</h2>

                    <div className="space-y-12 relative border-l-2 border-slate-200 ml-4 pl-10">
                        {projects.map((project, idx) => (
                            <div key={idx} className="relative">
                                {/* Timeline Circle */}
                                <div className="absolute -left-[49px] top-1.5 w-4 h-4 bg-white border-2 border-slate-900 rounded-full"></div>

                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold uppercase">{project.name}</h3>
                                    <span className="text-sm font-bold text-slate-400 italic">2024 - Present</span>
                                </div>
                                <p className="text-[13px] font-bold text-slate-500 mb-4">{project.stack}</p>
                                <ul className="list-disc ml-4 space-y-2 text-[13px] text-slate-600 leading-relaxed">
                                    {project.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>


                <section>
                    <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50 tracking-widest">Achievements & Certifications</h2>
                    <div className="grid grid-cols-2 gap-4 px-2">
                        <ul className="list-disc ml-6 text-[12px] space-y-1">
                            {achievements.map((ach, idx) => (
                                <li key={idx}>{ach}</li>
                            ))}
                        </ul>
                        <ul className="list-disc ml-6 text-[12px] space-y-1 italic">
                            {certifications.map((item, idx) => (
                                <li key={idx} onClick={() => (navigate(`${item.link}`))}>{item.about}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AmanGuptaTimelineResume;