import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

import { useSelector } from 'react-redux';
const DynamicResumeTemplate = ({ data, ref }) => {
    const user = useSelector(state => state?.user?.user?.DATA);
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
        <div ref={ref} className="max-w-4xl mx-auto bg-white shadow-lg font-sans text-slate-800">
            {/* Header Section */}
            <header className="relative bg-[#E5E5E5] pt-16 pb-12 px-12">
                {/* Grey Accent Box */}
                <div className="absolute top-0 left-0 w-16 h-40 bg-[#CCCCCC]"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#CCCCCC]"></div>

                <div className="flex justify-between items-start">
                    <div className="z-10">
                        <h1 className="text-6xl font-black leading-none tracking-tighter uppercase mb-4">
                            {fname}<br />{lname}
                        </h1>
                        <p className="text-2xl font-bold tracking-[0.2em] uppercase text-slate-700">
                            {summaryTitle}
                        </p>
                    </div>
                    <div className="w-64 h-64 bg-slate-400 overflow-hidden shadow-xl">
                        {/* Profile image placeholder - uses initials if no image */}
                        {user.photoUrl.url ? <img src={user.photoUrl.url} alt="" /> :
                            <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-100 text-6xl font-bold">
                                {fname[0]}{lname[0]}
                            </div>}
                    </div>
                </div>
            </header>

            {/* Contact Bar */}
            <div className="flex justify-around py-6 border-b border-t border-slate-200 text-sm font-bold bg-white">
                <div className="flex items-center gap-2">
                    <div className="bg-black text-white rounded-full p-1"><Phone size={12} /></div>
                    {phone}
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-black text-white rounded-full p-1"><Mail size={12} /></div>
                    {email}
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-black text-white rounded-full p-1"><MapPin size={12} /></div>
                    {location}, India
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
                            <span className="font-bold">Aman is a</span> {summaryBody}
                        </p>
                    </section>

                    {/* Education Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Education</h2>
                        </div>
                        <div className="space-y-4 px-2">
                            {education.map((edu, idx) => (
                                <div key={idx} className="flex flex-col justify-between items-start text-sm font-bold gap-2">
                                    <div className='flex justify-between  w-full'>
                                        <div className="max-w-[180px]">{edu.institution}</div>
                                        <div className="whitespace-nowrap">{edu.startDate}-{edu.endDate}</div>


                                    </div>

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

                    {/* Skills Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Skills</h2>
                        </div>
                        <ul className="space-y-2 px-4 list-disc text-sm font-bold">
                            {skills.map((item, idx) => {
                                return (<div className="space-y-2">
                                    <p> ● <strong>{item.skillCategory} :</strong> {item.skills}</p>
                                </div>)
                            })}
                        </ul>
                    </section>
                    <section>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Achievements & Certifications</h2>
                        </div>
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

                {/* Right Column */}
                <div className="col-span-7 space-y-10">

                    {/* Work Experience / Projects Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Projects</h2>
                        </div>
                        <div className="space-y-8  px-2">
                            {experience.map((exp, idx) => (
                                <div key={idx} className="flex gap-6">
                                    <div className="flex-1">
                                        <span className="w-32 text-[13px] text-slate-500 font-medium shrink-0 pt-1 "> {(exp?.startDate ||
                                            exp?.endDate ||
                                            exp?.currentlyWorking) && (
                                                <span className="text-xs text-gray-500">
                                                    {exp?.startDate}
                                                    {exp?.startDate &&
                                                        (exp?.currentlyWorking || exp?.endDate)
                                                        ? " - "
                                                        : ""}
                                                    {exp?.currentlyWorking ? "Present" : exp?.endDate}
                                                </span>
                                            )}</span>
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
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Projects</h2>
                        </div>
                        <div className="space-y-8 px-2">
                            {projects.map((project, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="text-lg font-black uppercase">{project.name}</h3>
                                        <span className="font-black text-sm">2024 - Present</span>
                                    </div>
                                    <p className="font-bold text-slate-500 mb-3 italic">{project.stack}</p>
                                    <ul className="text-xs space-y-2 text-justify leading-relaxed">
                                        {project.bullets.map((bullet, bIdx) => (
                                            <li key={bIdx} dangerouslySetInnerHTML={{ __html: "● " + bullet }}></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>


                    <section>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-[#A6A6A6]"></div>
                            <h2 className="text-2xl font-black uppercase tracking-widest bg-[#E5E5E5] flex-1 px-4 py-1">Languages</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-2">

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

            {/* Footer Accent */}
            <footer className="bg-[#E5E5E5] h-12 w-full mt-4"></footer>
        </div>
    );
};

export default DynamicResumeTemplate;