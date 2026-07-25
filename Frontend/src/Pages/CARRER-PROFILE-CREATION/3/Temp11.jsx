import React from 'react';
import { CheckCircle } from 'lucide-react';
const ResumeTemplate = ({ data, ref }) => {

    const {

        summaryBody,

        experience = [],
        education = [],

        skills,

        projects = [],

        certifications = [],

        achievements = [],

        languages = [],
    } = data;

    const { fname, lname, phone, github, linkedin, email, location, pincode, portfolio, summaryTitle } = data?.header
    return (
        <div ref={ref} className="max-w-[850px] mx-auto my-10 p-12 bg-white shadow-sm border border-gray-200 font-serif text-[#111]">

            {/* Header: Name and Contact Info */}
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tight uppercase mb-2">
                    {fname} <span className="font-black">{lname}</span>
                </h1>
                <div className="text-[13px] border-t border-b border-black py-2 mt-4 flex justify-center gap-4 flex-wrap">
                    <span>{location}</span>
                    <span>|</span>
                    <span>{phone}</span>
                    <span>|</span>
                    <span className="font-semibold">{email}</span>
                    <span>|</span>
                    <span className="italic">{portfolio.replace('https://', '')}</span>
                </div>
            </header>

            {/* Summary Section */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-2 py-1 bg-gray-50">
                    Summary
                </h2>
                <p className="text-[13px] leading-relaxed text-justify px-2">
                    <span className="font-bold">{summaryTitle}:</span> {summaryBody}
                </p>
            </section>

            {/* Skills Section */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50">
                    Skills
                </h2>
                <div className="grid grid-cols-2 gap-x-12 px-8 text-[13px]">
                    {skills.map((item, idx) => {
                        return (<div className="space-y-2">
                            <p> ● <strong>{item.skillCategory} :</strong> {item.skills}</p>
                        </div>)
                    })}
                </div>
            </section>

            {/* Experience & Projects Section */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-4 py-1 bg-gray-50">
                    Experience and Projects
                </h2>

                {/* Dynamic Mapping for Experience */}
                {experience.map((exp, idx) => (
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
                {projects.map((project, idx) => (
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
                {education.map((edu, idx) => (
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
                                            ●
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

                    {languages.map((lang, index) => (
                        <div key={index} className='flex'>
                            <p className="text-[13px] font-bold">{lang.langCategory}</p>
                            <p className="text-[12px] text-gray-600">, {lang.status}</p>

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
                        {achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                        ))}
                    </ul>
                    <ul className="list-disc space-y-1 italic">
                        {certifications.map((cert, idx) => (
                            <li key={idx} onClick={() => window.open(cert.link, "_blank")}>{cert.about}</li>
                        ))}
                    </ul>
                </div>
            </section >

        </div >
    );
};

export default ResumeTemplate;