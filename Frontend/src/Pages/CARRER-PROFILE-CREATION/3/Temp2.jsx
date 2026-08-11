import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AmanGuptaDynamicClassic = ({ data, ref }) => {
    // Extracting all fields from the resumeData1 object
    const {

        summaryBody, experience, education,
        skills, projects, certifications, achievements, languages
    } = data;

    const { fname, lname, phone, github, linkedin, email, location, pincode, portfolio, summaryTitle } = data?.header
    const navigate = useNavigate()
    return (
        <div ref={ref} className="max-w-[850px] mx-auto my-10 p-12 bg-white shadow-sm border border-gray-200 font-serif text-[#111]">

            {/* Header: Dynamic Personal Branding */}
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold tracking-tight uppercase mb-2">{fname} {lname}</h1>
                <div className="text-[12px] border-t border-b border-black py-2 mt-4 flex justify-center gap-4 flex-wrap">
                    <span>{location || 'India'}</span>
                    <span>|</span>
                    <span>{phone}</span>
                    <span>|</span>
                    <span className="font-semibold">{email}</span>
                    <span>|</span>
                    <span className="italic">{portfolio?.replace('https://', '')}</span>
                </div>
            </header>

            {/* Summary Section */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-2 py-1 bg-gray-50 tracking-widest">
                    {summaryTitle}
                </h2>
                <p className="text-[13px] leading-relaxed text-justify px-2">
                    {summaryBody}
                </p>
            </section>

            {/* Technical Skills: Elaborated from Category Map */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50 tracking-widest">Technical Skills</h2>
                <div className="grid grid-cols-2 gap-x-12 px-4 text-[12px]">
                    {skills.map((item, idx) => {
                        return (<div key={idx} className="space-y-2">
                            <p> ● <strong>{item.skillCategory} :</strong> {item.skills}</p>
                        </div>)
                    })}

                </div>
            </section>

            {/* Experience & Professional Internships */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-4 py-1 bg-gray-50 tracking-widest">Work Experience</h2>
                {experience.map((exp, index) => (
                    <div key={index} className="mb-4 px-2">
                        <div className="flex justify-between font-bold text-[14px]">
                            <span>{exp.role} — {exp.company}</span>
                            <span>{exp.duration}</span>
                        </div>
                        <p className="italic text-[12px] text-gray-600 mb-1">{exp.location}</p>
                        <ul className="list-disc ml-6 text-[13px] space-y-1">
                            {exp.bullets.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            ))}


                        </ul>
                    </div>
                ))}
            </section>

            {/* Projects: Elaborated with Stack & Descriptions */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-4 py-1 bg-gray-50 tracking-widest">Technical Projects</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mb-5 px-2">
                        <div className="flex justify-between font-bold text-[14px]">
                            <span>{project.name}</span>
                            <div className="flex gap-3 text-[11px] font-normal lowercase">
                                <a href={project.github} className="underline text-blue-800">github</a>
                                <a href={project.live} className="underline text-blue-800">live-demo</a>
                            </div>
                        </div>
                        <div className="italic text-[13px] mb-2 font-medium text-gray-700">
                            {project.stack}
                        </div>
                        <p className="text-[12px] mb-2 text-gray-700 leading-snug">
                            <strong>{project.name}</strong> {project.description}
                        </p>
                        <ul className="list-disc ml-6 text-[12px] space-y-1">
                            {project.bullets.map((bullet, idx) => (
                                <li key={idx} dangerouslySetInnerHTML={{ __html: bullet }} />
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {/* Education: Focused on Academic Excellence */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50 tracking-widest">Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="px-2 mb-4">
                        <div className="flex justify-between font-bold text-[14px]">
                            <span>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</span>
                            <span>{edu.startDate} — {edu.endDate}</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                            <span>{edu.institution}</span>
                            <span>{edu.location}</span>
                        </div>
                        <div className="flex gap-4 mt-1 text-[12px] italic text-gray-600">
                            {edu.cgpa && <span>Current CGPA: {edu.cgpa}</span>}
                            {edu.percentage && <span>Score: {edu.percentage}</span>}
                        </div>
                        {edu.bullets && (
                            <div className="text-[11px] text-gray-500 mt-1">
                                {(edu.bullets || []).map((b, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#475569', alignItems: 'flex-start' }}>
                                        ●
                                        <span dangerouslySetInnerHTML={{ __html: b }} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* Languages: Visual Proficiency */}
            <section className="mb-6">
                <h2 className="text-center font-bold uppercase text-sm border-b border-gray-300 mb-3 py-1 bg-gray-50 tracking-widest">Languages</h2>
                <div className="grid grid-cols-2 gap-8 px-4">
                    {languages.map((lang, index) => (
                        <div key={index} className='flex'>
                            <p className="text-[13px] font-bold">{lang.langCategory}</p>
                            <p className="text-[12px] text-gray-600">, {lang.status}</p>

                        </div>
                    ))}
                </div>
            </section>

            {/* Achievements & Professional Certifications */}
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

        </div>
    );
};

export default AmanGuptaDynamicClassic;