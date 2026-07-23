import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const AmanGuptaAcademicTemplate = ({ data }) => {
    // Destructuring for dynamic prop drilling
    const {
        fname, lname, phone, email, summaryTitle, summaryBody,
        experience, education, skills, projects, languages, certifications, achievements,
    } = data;

    return (
        <div className="max-w-[850px] mx-auto my-10 bg-white shadow-lg font-sans text-[#333] border border-gray-100">

            {/* Light Blue Header */}
            <header className="bg-[#e3effb] p-10 py-12">
                <h1 className="text-4xl font-bold tracking-widest text-slate-800 uppercase">
                    {fname} {lname}
                </h1>
            </header>

            {/* Dark Contact Information Bar */}
            <div className="bg-[#444] text-white px-10 py-3 flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-300" /> {email}
                </div>
                <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-300" /> {phone}
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-300" /> {education[0]?.location || "India"}
                </div>
            </div>

            <div className="p-10 space-y-10">

                {/* Summary Section */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">Summary</h2>
                    <p className="text-[14px] leading-relaxed text-slate-700">
                        <span className="font-bold">{summaryTitle}</span>: {summaryBody}
                    </p>
                </section>

                {/* Skills Section - Grid Layout */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">Skills</h2>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-1 text-[14px] text-slate-700">
                        {skills.map((item, idx) => {
                            return (<div className="space-y-2">
                                <p> ● <strong>{item.skillCategory} :</strong> {item.skills}</p>
                            </div>)
                        })}
                    </div>
                </section>

                {/* Experience & Projects - Timeline Layout */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-1">Experience</h2>
                    <div className="space-y-8">
                        {/* Mapping Projects */}
                        {projects.map((project, idx) => (
                            <div key={idx} className="flex gap-6">
                                <span className="w-32 text-[13px] text-slate-500 font-medium shrink-0 pt-1">2024 - Present</span>
                                <div className="flex-1">
                                    <p className="text-[14px] font-bold">
                                        <span className="italic">{project.name}</span>, {project.stack}
                                    </p>
                                    <ul className="mt-2 list-disc ml-5 space-y-1 text-[13px] text-slate-600">
                                        {project.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                        {/* Mapping Internships */}
                        {experience.map((exp, idx) => (
                            <div key={idx} className="flex gap-6">
                                <span className="w-32 text-[13px] text-slate-500 font-medium shrink-0 pt-1">{exp.duration}</span>
                                <div className="flex-1">
                                    <p className="text-[14px] font-bold italic">{exp.role}, {exp.company}, {exp.location}</p>
                                    <ul className="mt-2 list-disc ml-5 space-y-1 text-[13px] text-slate-600">
                                        {exp.bullets.map((point, pIdx) => (
                                            <li key={pIdx}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education and Training */}
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-gray-200 pb-1">Education and Training</h2>
                    {education.map((edu, idx) => (
                        <div key={idx} className="flex gap-6 mb-4">
                            <span className="w-32 text-[13px] text-slate-500 font-medium shrink-0">{edu.endDate}</span>
                            <div className="flex-1">
                                <p className="text-[14px] font-bold leading-tight uppercase">{edu.degree} in {edu.field}</p>
                                <p className="text-[14px] italic text-slate-700">
                                    <span className="font-bold uppercase">{edu.institution}</span>, {edu.location}
                                </p>
                                {edu.cgpa && <p className="text-[13px] font-bold mt-1">CGPA: {edu.cgpa}</p>}
                                <ul className="mt-2 list-disc ml-5 space-y-1 text-[13px] text-slate-600">
                                    {(edu.bullets || []).map((b, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#475569', alignItems: 'flex-start' }}>
                                            <CheckCircle size={13} color="#06b6d4" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span dangerouslySetInnerHTML={{ __html: b }} />
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </section>
                <section>

                    <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-1">Achievements & Certifications</h2>
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
                {/* Languages - Progress Bar Style */}
                <section className="pb-8">
                    <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-1">Languages</h2>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                        {languages.map((lang, index) => (
                            <div key={index} className='flex'>
                                <p className="text-[13px] font-bold">{lang.langCategory}</p>
                                <p className="text-[12px] text-gray-600">, {lang.status}</p>

                            </div>
                        ))}
                    </div>
                </section>


            </div>
        </div>
    );
};

export default AmanGuptaAcademicTemplate;