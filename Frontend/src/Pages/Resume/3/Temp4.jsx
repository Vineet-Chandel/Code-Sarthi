import React from 'react';

const AmanGuptaDynamicMinimalist = ({ data }) => {
    // Destructuring all relevant fields from the provided resumeData1 object
    const {
        fname, lname, phone, github, linkedin, portfolio, email,
        summaryTitle, summaryBody, experience, education,
        skills, projects, certifications, achievements, languages
    } = data;

    return (
        <div className="max-w-[800px] mx-auto p-10 bg-white shadow-lg font-sans text-slate-900 leading-tight">
            {/* Header Section: Dynamic Contact Info */}
            <header className="text-center mb-6">
                <h1 className="text-5xl font-black uppercase tracking-tight mb-2">
                    {fname} {lname}
                </h1>
                <div className="flex justify-center items-center gap-2 text-sm font-medium text-slate-700 flex-wrap">
                    <span>{phone}</span>
                    <span className="text-slate-300">|</span>
                    <a href={github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                    <span className="text-slate-300">|</span>
                    <a href={linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                    <span className="text-slate-300">|</span>
                    <a href={portfolio} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
                    <span className="text-slate-300">|</span>
                    <a href={`mailto:${email}`} className="hover:underline">Email</a>
                </div>
            </header>

            <div className="space-y-6">

                {/* Professional Summary: Merging Title and Body */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">
                        Professional Summary
                    </h2>
                    <p className="text-[15px]">
                        <span className="font-bold">{summaryTitle}:</span> {summaryBody}
                    </p>
                </section>

                {/* Education: Mapping multiple entries like PSIT and Schools */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu, idx) => (
                            <div key={idx} className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-[15px]">{edu.degree} {edu.field ? `— ${edu.field}` : ''}</p>
                                    <p className="text-[15px]">{edu.institution}, {edu.location}</p>
                                    {edu.cgpa && <p className="text-[13px] italic text-slate-600">CGPA: {edu.cgpa}</p>}
                                    {edu.percentage && <p className="text-[13px] italic text-slate-600">Score: {edu.percentage}</p>}
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[15px]">{edu.startDate} — {edu.endDate}</p>
                                    {edu.coursework && <p className="text-[12px] text-slate-500 max-w-[200px] leading-none mt-1">{edu.coursework.join(', ')}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technical Skills: Iterating through Skill Categories */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">
                        Technical Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-[15px]">
                        {Object.entries(skills).map(([category, items]) => (
                            <p key={category}>
                                <span className="font-bold capitalize">{category}:</span> {items}
                            </p>
                        ))}
                    </div>
                </section>

                {/* Projects: Detailed Project Breakdown with Live Links */}
                <section>
                    <h2 className="text-xl font-black uppercase tracking-wide border-b-2 border-slate-900 pb-1 mb-3">
                        Technical Projects
                    </h2>
                    <div className="space-y-6">
                        {projects.map((project, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-black italic">
                                        {project.name} | {project.stack}
                                    </h3>
                                    <div className="font-bold text-[13px] space-x-2">
                                        <a href={project.github} target="_blank" rel="noreferrer" className="hover:underline">Code</a>
                                        <span>|</span>
                                        <a href={project.live} target="_blank" rel="noreferrer" className="hover:underline">Live Demo</a>
                                    </div>
                                </div>
                                <p className="text-[15px] mb-2 leading-snug">
                                    <span className="font-bold">{project.name}</span> {project.description}
                                </p>
                                <ul className="list-disc ml-5 space-y-1 text-[14px] text-slate-700">
                                    {project.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Accomplishments & Languages */}
                <section className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-widest border-b border-slate-200 mb-3">Recognition</h2>
                        <ul className="list-disc ml-5 space-y-1 text-[13px]">
                            {achievements.map((ach, idx) => <li key={idx}>{ach}</li>)}
                            {certifications.map((cert, idx) => <li key={idx} className="italic">{cert}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-widest border-b border-slate-200 mb-3">Languages</h2>
                        <div className="space-y-2 text-[13px]">
                            {languages.map((lang, idx) => (
                                <div key={idx} className="flex justify-between border-b border-slate-50 pb-1">
                                    <span className="font-bold">{lang.split(' ')[0]}</span>
                                    <span className="italic text-slate-500">{lang.split(' ').slice(1).join(' ')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AmanGuptaDynamicMinimalist;