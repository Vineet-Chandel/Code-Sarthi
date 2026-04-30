import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const AmanGuptaLayoutTemplate = ({ data }) => {
    const {
        name, phone, email, summaryTitle, summaryBody,
        experience, education, skills, projects, languages
    } = data;

    // Helper to get initials for the logo box
    const initials = name.split(' ').map(n => n[0]).join('');

    return (
        <div className="max-w-[900px] mx-auto my-10 bg-white shadow-lg border border-gray-200 font-sans text-gray-800 flex overflow-hidden">

            {/* LEFT COLUMN: Sidebar with initials and contact */}
            <div className="w-[35%] bg-white border-r border-gray-200 flex flex-col">
                {/* Initials Logo Box */}
                <div className="p-10">
                    <div className="border-2 border-red-900 p-8 flex flex-col items-center justify-center">
                        <div className="w-12 h-px bg-gray-400 mb-4"></div>
                        <span className="text-6xl font-bold tracking-tighter text-gray-900">{initials}</span>
                        <div className="w-12 h-px bg-gray-400 mt-4"></div>
                    </div>
                </div>

                {/* Contact Info List */}
                <div className="px-6 space-y-px">
                    <div className="flex items-stretch border border-gray-200">
                        <div className="bg-red-900 p-2 flex items-center justify-center w-10">
                            <MapPin size={16} className="text-white" />
                        </div>
                        <div className="p-2 text-[11px] flex items-center">{education[0]?.location || "India"}</div>
                    </div>
                    <div className="flex items-stretch border border-gray-200">
                        <div className="bg-red-900 p-2 flex items-center justify-center w-10">
                            <Phone size={16} className="text-white" />
                        </div>
                        <div className="p-2 text-[11px] flex items-center">{phone}</div>
                    </div>
                    <div className="flex items-stretch border border-gray-200">
                        <div className="bg-red-900 p-2 flex items-center justify-center w-10">
                            <Mail size={16} className="text-white" />
                        </div>
                        <div className="p-2 text-[11px] flex items-center break-all">{email}</div>
                    </div>
                </div>

                {/* Sidebar Education Section */}
                <div className="p-8 mt-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-2 mb-4">
                        EDUCATION AND TRAINING
                    </h2>
                    <div className="space-y-6">
                        {education.map((edu, idx) => (
                            <div key={idx} className="text-[12px]">
                                <p className="font-bold text-gray-800">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</p>
                                <p className="text-gray-600 leading-tight mt-1">{edu.institution}, {edu.location}</p>
                                <p className="text-gray-500 font-bold mt-1">{edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Header and Main Content */}
            <div className="flex-1 bg-white">
                {/* Dark Header Banner */}
                <div className="bg-red-900 p-10 pt-12">
                    <h1 className="text-4xl font-bold tracking-wider text-white uppercase">{name}</h1>
                </div>
                {/* Sub-banner Gray Strip */}
                <div className="h-6 bg-neutral-800 w-full"></div>

                <div className="p-10 space-y-10">
                    {/* Summary */}
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-4">SUMMARY</h2>
                        <p className="text-[12px] leading-relaxed text-gray-600">
                            <span className="font-bold text-gray-800">{summaryTitle}:</span> {summaryBody}
                        </p>
                    </section>

                    {/* Skills Grid */}
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-4">SKILLS</h2>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {Object.values(skills).map((skillGroup) =>
                                skillGroup.split(',').map((skill, i) => (
                                    <div key={i} className="text-[12px] text-gray-600 flex items-start gap-2">
                                        <span className="mt-1.5 w-1 h-1 bg-gray-600 rounded-full shrink-0"></span>
                                        {skill.trim()}
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Experience & Projects */}
                    <section>
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-6">EXPERIENCE</h2>

                        <div className="space-y-8">
                            {/* Projects as Primary Experience */}
                            {projects.map((project, idx) => (
                                <div key={idx}>
                                    <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-wide">{project.name}</h3>
                                    <p className="text-[11px] italic text-gray-500 mb-3">{project.stack} | Current</p>
                                    <ul className="list-disc ml-4 space-y-2 text-[12px] text-gray-600">
                                        {project.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }} />
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Internships */}
                            {experience.map((exp, idx) => (
                                <div key={idx}>
                                    <h3 className="text-[13px] font-black text-gray-800 uppercase tracking-wide">{exp.role}</h3>
                                    <p className="text-[11px] italic text-gray-500 mb-3">{exp.company} | {exp.duration}</p>
                                    <ul className="list-disc ml-4 space-y-2 text-[12px] text-gray-600">
                                        {exp.points.map((point, pIdx) => (
                                            <li key={pIdx}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Languages Section */}
                    <section className="pb-10">
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-6">LANGUAGES</h2>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                            {languages.map((lang, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-[12px] font-bold mb-1">
                                        <span>{lang.split(' ')[0]}:</span>
                                        <span className="text-gray-400 font-normal italic uppercase">
                                            {lang.split(' ')[1]?.replace('(', '').replace(')', '') || "Proficient"}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-red-900 h-full"
                                            style={{ width: idx === 0 ? '95%' : '85%' }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AmanGuptaLayoutTemplate;