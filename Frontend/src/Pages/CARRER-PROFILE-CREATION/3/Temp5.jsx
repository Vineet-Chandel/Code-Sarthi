import React from 'react';
import { Phone, MapPin, Mail, Globe } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
const DynamicResume = ({ data }) => {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl font-sans text-slate-800">
            {/* Header Section */}
            <header className="bg-[#1a1a1a] text-white p-12 flex items-center gap-10">
                <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden bg-slate-300 shrink-0">
                    {/* Placeholder for Profile Image */}
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-4xl font-bold">
                        {data.fname[0]}{data.lname[0]}
                    </div>
                </div>
                <div>
                    <h1 className="text-5xl font-bold tracking-tighter uppercase mb-2">
                        {data.fname} {data.lname}
                    </h1>
                    <p className="text-xl tracking-[0.2em] font-light uppercase text-slate-300">
                        {data.summaryTitle}
                    </p>
                </div>
            </header>

            <div className="flex">
                {/* Left Column (Contact, Education, Skills, Certification) */}
                <aside className="w-[35%] p-10 bg-white space-y-10 border-r border-slate-100">
                    {/* Contact */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">
                            Contact
                        </h2>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-slate-900" /> {data.phone}
                            </li>
                            <li className="flex items-center gap-3 italic">
                                <MapPin size={16} className="text-slate-900" /> {data.location}, India
                            </li>
                            <li className="flex items-center gap-3 break-all">
                                <Mail size={16} className="text-slate-900" /> {data.email}
                            </li>
                            <li className="flex items-center gap-3">
                                <Globe size={16} className="text-slate-900" /> {data.portfolio.replace('https://', '')}
                            </li>
                        </ul>
                    </section>

                    {/* Education (Lateral) */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">
                            Education
                        </h2>


                        <div className="space-y-6">
                            {data.education.map((edu, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <p className="font-bold text-slate-700 uppercase text-sm tracking-wide">{edu.institution}</p>
                                            <p className="italic text-slate-500 text-sm">{edu.degree}</p>
                                        </div>
                                        <p className="text-slate-500 text-sm font-medium">{edu.startDate} - {edu.endDate}</p>
                                    </div>

                                    {edu.bullets && (
                                        <ul className="space-y-1.5 ml-1">
                                            {(edu.bullets || []).map((b, idx) => (
                                                <li key={idx} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#475569', alignItems: 'flex-start' }}>
                                                    ●
                                                    <span dangerouslySetInnerHTML={{ __html: b }} />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>

                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">
                            Skills
                        </h2>
                        <ul className="space-y-2 text-sm font-medium">
                            {data.skills.map((item, idx) => {
                                return (<div className="space-y-2">
                                    <p> ● <strong>{item.skillCategory} :</strong> {item.skills}</p>
                                </div>)
                            })}
                        </ul>
                    </section>

                    {/* Certification */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">
                            Certification
                        </h2>
                        <div className="space-y-4">


                            <ul className="list-disc ml-6 text-[12px] space-y-1 italic">
                                {data.certifications.map((item, idx) => (
                                    <li key={idx} onClick={() => (navigate(`${item.link}`))}>{item.about}</li>
                                ))}
                            </ul>

                        </div>
                    </section>
                </aside>

                {/* Right Column (About Me, Work Experience, Education Main) */}
                <main className="flex-1 p-10 bg-white space-y-12">
                    {/* About Me */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">
                            About Me
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-600 text-justify">
                            {data.summaryBody}
                        </p>
                    </section>

                    {/* Work Experience / Projects */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">
                            Work Experience
                        </h2>
                        <div className="space-y-10">
                            {/* Project 1 as primary experience */}
                            {data.projects.map((project, index) => (
                                <div key={index} className="space-y-2">
                                    <h3 className="font-bold uppercase text-sm tracking-wide">
                                        {project.name.toUpperCase()}
                                    </h3>
                                    <p className="font-bold text-sm italic">{project.stack}</p>
                                    <p className="text-xs font-bold text-slate-500">2024 - Present</p>
                                    <ul className="list-disc ml-4 space-y-2 text-sm text-slate-600">
                                        {project.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Detailed Education */}
                    <section>
                        <h2 className="text-xl font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-1 mb-6">
                            Achievements
                        </h2>
                        <div className="space-y-6">
                            {data.achievements.map((ach, index) => (
                                <div key={index} className="flex gap-4 items-baseline">
                                    <div className="w-2 h-2 bg-slate-900 rounded-full shrink-0"></div>
                                    <p className="text-sm font-medium leading-relaxed">
                                        {ach}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DynamicResume;