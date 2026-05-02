import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const DynamicResumeTemplate = ({ data }) => {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg font-sans text-slate-800">
            {/* Header Section */}
            <header className="relative bg-[#E5E5E5] pt-16 pb-12 px-12">
                {/* Grey Accent Box */}
                <div className="absolute top-0 left-0 w-16 h-40 bg-[#CCCCCC]"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#CCCCCC]"></div>

                <div className="flex justify-between items-start">
                    <div className="z-10">
                        <h1 className="text-6xl font-black leading-none tracking-tighter uppercase mb-4">
                            {data.fname}<br />{data.lname}
                        </h1>
                        <p className="text-2xl font-bold tracking-[0.2em] uppercase text-slate-700">
                            {data.summaryTitle}
                        </p>
                    </div>
                    <div className="w-64 h-64 bg-slate-400 overflow-hidden shadow-xl">
                        {/* Profile image placeholder - uses initials if no image */}
                        <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-100 text-6xl font-bold">
                            {data.fname[0]}{data.lname[0]}
                        </div>
                    </div>
                </div>
            </header>

            {/* Contact Bar */}
            <div className="flex justify-around py-6 border-b border-t border-slate-200 text-sm font-bold bg-white">
                <div className="flex items-center gap-2">
                    <div className="bg-black text-white rounded-full p-1"><Phone size={12} /></div>
                    {data.phone}
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-black text-white rounded-full p-1"><Mail size={12} /></div>
                    {data.email}
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-black text-white rounded-full p-1"><MapPin size={12} /></div>
                    {data.location}, India
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-12 gap-10 p-12 bg-white">

                {/* Left Column */}
                <div className="col-span-5 space-y-10">

                    {/* Profile Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Profile</h2>
                        </div>
                        <p className="text-sm leading-relaxed text-justify px-2">
                            <span className="font-bold">Aman is a</span> {data.summaryBody}
                        </p>
                    </section>

                    {/* Education Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Education</h2>
                        </div>
                        <div className="space-y-4 px-2">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="flex justify-between items-start text-sm font-bold">
                                    <div className="max-w-[180px]">{edu.institution}</div>
                                    <div className="whitespace-nowrap">{edu.startDate}-{edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Skills</h2>
                        </div>
                        <ul className="space-y-2 px-4 list-disc text-sm font-bold">
                            {/* Flattening the skills object into a list for this specific layout */}
                            {Object.values(data.skills).map((skillGroup) =>
                                skillGroup.split(', ').map((skill, sIdx) => (
                                    <li key={sIdx}>{skill}</li>
                                ))
                            ).flat().slice(0, 8)}
                        </ul>
                    </section>
                </div>

                {/* Right Column */}
                <div className="col-span-7 space-y-10">

                    {/* Work Experience / Projects Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Projects</h2>
                        </div>
                        <div className="space-y-8 px-2">
                            {data.projects.map((project, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-lg font-black uppercase">{project.name}</h3>
                                        <span className="font-black text-sm">2024 - Present</span>
                                    </div>
                                    <p className="font-bold text-slate-500 mb-3 italic">{project.stack}</p>
                                    <ul className="text-xs space-y-2 text-justify leading-relaxed">
                                        {project.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet }}></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certifications Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Certifications</h2>
                        </div>
                        <div className="px-2">
                            <ul className="space-y-3">
                                {data.certifications.map((cert, idx) => (
                                    <li key={idx} className="text-sm font-bold leading-tight flex items-start gap-2 italic">
                                        • {cert}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs mt-4 text-slate-500 italic">
                                Actively maintaining technical proficiency through industry-standard credentials and hands-on laboratory experience.
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer Accent */}
            <footer className="bg-[#E5E5E5] h-12 w-full mt-4"></footer>
        </div>
    );
};

export default DynamicResumeTemplate;