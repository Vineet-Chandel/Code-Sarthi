import React from 'react';
import { CheckCircle } from 'lucide-react';
const ResumeTemplate = ({ data }) => {
    return (
        <div className="max-w-[850px] mx-auto my-10 p-12 bg-white shadow-sm border border-gray-200 font-serif text-[#111]">

            {/* Header: Name and Contact Info */}
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tight uppercase mb-2">
                    {data.fname} <span className="font-black">{data.lname}</span>
                </h1>
                <div className="text-[13px] border-t border-b border-black py-2 mt-4 flex justify-center gap-4 flex-wrap">
                    <span>{data.location}</span>
                    <span>|</span>
                    <span>{data.phone}</span>
                    <span>|</span>
                    <span className="font-semibold">{data.email}</span>
                    <span>|</span>
                    <span className="italic">{data.portfolio.replace('https://', '')}</span>
                </div>
            </header>

            {/* Summary Section */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-2 py-1 bg-gray-50">
                    Summary
                </h2>
                <p className="text-[13px] leading-relaxed text-justify px-2">
                    <span className="font-bold">{data.summaryTitle}:</span> {data.summaryBody}
                </p>
            </section>

            {/* Skills Section */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50">
                    Skills
                </h2>
                <div className="grid grid-cols-2 gap-x-12 px-8 text-[13px]">
                    <ul className="list-disc space-y-1">
                        <li>{data.skills.frontend}</li>
                        <li>{data.skills.backend}</li>
                        <li>{data.skills.authentication}</li>
                    </ul>
                    <ul className="list-disc space-y-1">
                        <li>{data.skills.database}</li>
                        <li>{data.skills.tools}</li>
                        <li>{data.skills.deployment}</li>
                    </ul>
                </div>
            </section>

            {/* Experience & Projects Section */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-4 py-1 bg-gray-50">
                    Experience and Projects
                </h2>

                {/* Dynamic Mapping for Experience */}
                {data.experience.map((exp, idx) => (
                    <div key={idx} className="mb-5 px-2">
                        <div className="flex justify-between font-bold text-[14px]">
                            <span className="uppercase">{exp.role}</span>
                            <span>{exp.duration}</span>
                        </div>
                        <div className="flex justify-between italic text-[13px] mb-2">
                            <span className="font-bold">{exp.company}</span>
                            <span>{exp.location}</span>
                        </div>
                        <ul className="list-disc ml-6 text-[13px] space-y-1">
                            {exp.bullets.map((point, pIdx) => (
                                <li key={pIdx}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Dynamic Mapping for Projects */}
                {data.projects.map((project, idx) => (
                    <div key={idx} className="mb-5 px-2">
                        <div className="flex justify-between font-bold text-[14px]">
                            <span className="uppercase">{project.name}</span>
                            <span>Personal Project</span>
                        </div>
                        <div className="flex justify-between italic text-[13px] mb-2">
                            <span className="font-bold underline">{project.stack}</span>
                            <a href={project.live} className="text-blue-700">Live Demo</a>
                        </div>
                        <ul className="list-disc ml-6 text-[13px] space-y-1">
                            {project.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {/* Education Section */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50">
                    Education and Training
                </h2>
                {data.education.map((edu, idx) => (
                    <div key={idx} className="px-2 mb-4">
                        <div className="flex justify-between font-bold text-[14px]">
                            <span>{edu.degree} - {edu.field}</span>
                            <span>{edu.endDate}</span>
                        </div>
                        <div className="flex justify-between text-[13px] italic">
                            <span>{edu.institution}</span>
                            <span>{edu.location}</span>
                        </div>
                        <p className="text-[12px] mt-1 font-medium text-gray-600">
                            {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                        </p>

                        {
                            edu.bullets && (
                                <ul className="space-y-1.5 ml-1">
                                    {(edu.bullets || []).map((b, idx) => (
                                        <li key={idx} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#475569', alignItems: 'flex-start' }}>
                                            <CheckCircle size={13} color="#06b6d4" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span dangerouslySetInnerHTML={{ __html: b }} />
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </div>
                ))}
            </section>

            {/* Languages Section */}
            < section className="mb-6" >
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50">
                    Languages
                </h2>
                <div className="grid grid-cols-2 gap-8 px-4">
                    {data.languages.map((lang, idx) => (
                        <div key={idx}>
                            <p className="text-[13px] font-bold">{lang.split(' ')[0]}:</p>
                            <p className="text-[12px] text-gray-600 italic mb-1">{lang.split(' ')[1] || "Proficient"}</p>
                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="bg-black h-full"
                                    style={{ width: idx === 0 ? '95%' : '85%' }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section >

            {/* Achievements / Interests Section */}
            < section >
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50">
                    Achievements and Certifications
                </h2>
                <div className="grid grid-cols-2 gap-x-12 px-8 text-[13px]">
                    <ul className="list-disc space-y-1">
                        {data.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                        ))}
                    </ul>
                    <ul className="list-disc space-y-1 italic">
                        {data.certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                        ))}
                    </ul>
                </div>
            </section >

        </div >
    );
};

export default ResumeTemplate;