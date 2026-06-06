import React from 'react';
import { CheckCircle } from 'lucide-react';
const AmanGuptaCleanTemplate = ({ data }) => {
    const {
        fname, lname, phone, github, linkedin, portfolio, email,
        summaryTitle, summaryBody, experience, education,
        skills, projects, certifications, achievements, languages
    } = data;

    return (
        <div className="max-w-[900px] mx-auto my-10 bg-white shadow-sm border border-gray-100 font-sans text-gray-800">

            {/* Dark Top Bar */}
            <div className="h-8 bg-gray-600 w-full"></div>

            {/* Header Section */}
            <header className="py-10 text-center border-b border-gray-200">
                <h1 className="text-4xl font-bold tracking-[0.2em] uppercase text-gray-700 mb-4">
                    {fname} {lname}
                </h1>
                <div className="flex justify-center items-center gap-6 text-[12px] text-gray-500 font-medium">
                    <span>{education[0]?.location || 'India'}</span>
                    <span className="text-gray-300">•</span>
                    <span>{phone}</span>
                    <span className="text-gray-300">•</span>
                    <span>{email}</span>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-0 relative">

                {/* Vertical Divider Line with Nodes */}
                <div className="absolute left-[66.6%] top-0 bottom-0 w-px bg-gray-300 hidden lg:block">
                    <div className="absolute top-[80px] -left-1 w-2.5 h-2.5 bg-gray-400 rounded-full border-2 border-white"></div>
                    <div className="absolute top-[320px] -left-1 w-2.5 h-2.5 bg-gray-400 rounded-full border-2 border-white"></div>
                </div>

                {/* Left Column (Summary, Experience, Languages) */}
                <div className="col-span-12 lg:col-span-8 p-10 pr-14 space-y-12">

                    {/* Summary Section */}
                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest text-gray-700 mb-4">Summary</h2>
                        <p className="text-[13px] leading-relaxed text-gray-600 text-justify">
                            <span className="font-bold text-gray-800">{summaryTitle}:</span> {summaryBody}
                        </p>
                    </section>

                    {/* Experience & Projects Section */}
                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest text-gray-700 mb-6">Experience & Projects</h2>

                        <div className="space-y-10">
                            {projects.map((project, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[14px] font-black text-gray-800">{project.name}</h3>
                                        <span className="text-[12px] font-bold text-gray-500">2024 - Present</span>
                                    </div>
                                    <p className="text-[12px] font-bold text-gray-500 italic mb-3">{project.stack}</p>
                                    <ul className="list-disc ml-4 space-y-2 text-[13px] text-gray-600">
                                        {project.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Internship Data Entry */}
                            {experience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-[14px] font-black text-gray-800">{exp.role}</h3>
                                        <span className="text-[12px] font-bold text-gray-500">{exp.duration}</span>
                                    </div>
                                    <p className="text-[12px] font-bold text-gray-500 italic mb-3">{exp.company} - {exp.location}</p>
                                    <ul className="list-disc ml-4 space-y-2 text-[13px] text-gray-600">
                                        {exp.bullets.map((point, pIdx) => (
                                            <li key={pIdx}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Languages Section */}
                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest text-gray-700 mb-6">Languages</h2>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                            {/* {languages.map((lang, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-[13px] font-bold mb-1">
                                        <span>{lang.split(' ')[0]}</span>
                                        <span className="text-gray-400 font-normal">{lang.split(' ')[1] || 'C2'}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-gray-600 h-full w-[90%]"></div>
                                    </div>
                                    <p className="text-[11px] text-gray-400 mt-1 italic">Proficient / Native</p>
                                </div>
                            ))} */}
                        </div>
                    </section>
                </div>

                {/* Right Column (Skills, Education) */}
                <div className="col-span-12 lg:col-span-4 p-10 pl-8 space-y-12">

                    {/* Skills Section */}
                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest text-gray-700 mb-6">Skills</h2>
                        <ul className="space-y-2 text-[13px] text-gray-600">
                            {Object.values(skills).map((skillSet, idx) => (
                                <React.Fragment key={idx}>
                                    {skillSet.split(',').map((skill, sIdx) => (
                                        <li key={sIdx} className="flex gap-2">
                                            <span>•</span> {skill.trim()}
                                        </li>
                                    ))}
                                </React.Fragment>
                            ))}
                        </ul>
                    </section>

                    {/* Education and Training Section */}
                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest text-gray-700 mb-6 leading-tight">
                            Education and Training
                        </h2>
                        <div className="space-y-8">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <h3 className="text-[14px] font-black text-gray-800 leading-tight">
                                        {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                                    </h3>
                                    <p className="text-[12px] font-bold text-gray-500 mt-1 uppercase">
                                        {edu.endDate}
                                    </p>
                                    <p className="text-[13px] font-bold text-gray-700 mt-1 uppercase">
                                        {edu.institution}
                                    </p>
                                    <p className="text-[12px] text-gray-500 italic">
                                        {edu.location}
                                    </p>
                                    {edu.cgpa && (
                                        <p className="text-[12px] font-black text-gray-800 mt-1">
                                            CGPA: {edu.cgpa}
                                        </p>
                                    )}


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
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default AmanGuptaCleanTemplate;