import React from "react";


import {
    Phone,
    Mail,
    Github,
    Linkedin,
    Globe,
    MapPin,
} from "lucide-react";

const SectionHeading = ({ children }) => (
    <h2 className="uppercase font-bold text-3xl tracking-tight mb-2 border-b-[4px] border-black pb-1 text-black">
        {children}
    </h2>
);

const PROFICIENCY_BARS = {
    native: 5,
    fluent: 4,
    advanced: 4,
    intermediate: 3,
    conversational: 2,
    beginner: 1,
};

const ProficiencyBars = ({ status }) => {
    const filled = PROFICIENCY_BARS[String(status || "").toLowerCase()] || 0;
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((bar) => (
                <span
                    key={bar}
                    className={`w-1.5 h-4 rounded-full ${bar <= filled ? "bg-blue-600" : "bg-gray-200"
                        }`}
                />
            ))}
        </div>
    );
};

const Temp7 = ({ data, ref }) => {
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

    const contactItems = [
        { value: phone, icon: Phone },
        { value: email, icon: Mail },
        { value: github, icon: Github },
        { value: linkedin, icon: Linkedin },
        { value: portfolio, icon: Globe },
        {
            value: [location, pincode].filter(Boolean).join(", "),
            icon: MapPin,
        },
    ].filter((item) => item.value && String(item.value).trim().length > 0);

    return (
        <div ref={ref}
            className="bg-white text-black font-sans mx-auto"
            style={{ width: "210mm", minHeight: "297mm" }}
        >
            <div className="px-10 py-8">
                <header className="mb-6">
                    <h1 className="text-5xl font-black uppercase tracking-tight text-black">
                        {fname} {lname}
                    </h1>
                    {summaryTitle && (
                        <p className="mt-1 text-blue-600 font-semibold text-xl">
                            {summaryTitle}
                        </p>
                    )}
                    {contactItems.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-4">
                            {contactItems.map(({ value, icon: Icon }, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center gap-1.5 text-sm text-black"
                                >
                                    <Icon className="text-blue-600" size={12} />
                                    {value}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-12 gap-x-8">
                    <div className="col-span-7">
                        {summaryBody && (
                            <section className="mb-6">
                                <SectionHeading>Summary</SectionHeading>
                                <p className="text-sm leading-relaxed text-black">
                                    {summaryBody}
                                </p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section className="mb-6">
                                <SectionHeading>Experience</SectionHeading>
                                <div>
                                    {experience.map((exp, idx) => (
                                        <div
                                            key={idx}
                                            className={`py-3 ${idx !== experience.length - 1
                                                ? "border-b border-gray-200"
                                                : ""
                                                }`}
                                        >
                                            <p className="text-lg font-bold text-black">
                                                {exp?.role}
                                            </p>
                                            <p className="text-sm font-semibold text-blue-600">
                                                {exp?.company}
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-0.5">
                                                {(exp?.startDate || exp?.endDate || exp?.currentlyWorking) && (
                                                    <span>
                                                        {exp?.startDate}
                                                        {exp?.startDate &&
                                                            (exp?.currentlyWorking || exp?.endDate)
                                                            ? " - "
                                                            : ""}
                                                        {exp?.currentlyWorking ? "Present" : exp?.endDate}
                                                    </span>
                                                )}
                                                {exp?.location && <span>{exp.location}</span>}
                                            </div>
                                            {Array.isArray(exp?.bullets) &&
                                                exp.bullets.length > 0 && (
                                                    <ul className="mt-2 list-disc list-outside pl-5 space-y-1">
                                                        {exp.bullets.map((bullet, bIdx) => (
                                                            <li key={bIdx} className="text-sm text-black">
                                                                {bullet}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {projects.length > 0 && (
                            <section className="mb-6">
                                <SectionHeading>Projects</SectionHeading>
                                <div>
                                    {projects.map((project, idx) => (
                                        <div
                                            key={idx}
                                            className={`py-3 ${idx !== projects.length - 1
                                                ? "border-b border-gray-200"
                                                : ""
                                                }`}
                                        >
                                            <p className="text-lg font-bold text-black">
                                                {project?.name}
                                            </p>
                                            {project?.stack && (
                                                <p className="text-sm font-semibold text-blue-600">
                                                    {project.stack}
                                                </p>
                                            )}
                                            {project?.description && (
                                                <p className="mt-1 text-sm text-black">
                                                    {project.description}
                                                </p>
                                            )}
                                            {(project?.github || project?.liveLink) && (
                                                <p className="mt-1 text-xs text-gray-600">
                                                    {project?.github && (
                                                        <a
                                                            href={project.github}
                                                            className="underline text-blue-600"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {project.github}
                                                        </a>
                                                    )}
                                                    {project?.github && project?.liveLink ? " | " : ""}
                                                    {project?.liveLink && (
                                                        <a
                                                            href={project.liveLink}
                                                            className="underline text-blue-600"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {project.liveLink}
                                                        </a>
                                                    )}
                                                </p>
                                            )}
                                            {Array.isArray(project?.bullets) &&
                                                project.bullets.length > 0 && (
                                                    <ul className="mt-2 list-disc list-outside pl-5 space-y-1">
                                                        {project.bullets.map((bullet, bIdx) => (
                                                            <li
                                                                key={bIdx}
                                                                className="text-sm text-black"
                                                                dangerouslySetInnerHTML={{ __html: bullet }}
                                                            />
                                                        ))}
                                                    </ul>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {languages.length > 0 && (
                            <section className="mb-6">
                                <SectionHeading>Languages</SectionHeading>
                                <div className="space-y-2">
                                    {languages.map((lang, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-sm text-black">
                                                {lang?.langCategory}
                                            </span>
                                            <ProficiencyBars status={lang?.status} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="col-span-5">
                        {achievements.length > 0 && (
                            <section className="mb-6">
                                <SectionHeading>Achievements</SectionHeading>
                                <div>
                                    {achievements.map((achievement, idx) => {
                                        const isObject = typeof achievement === "object" && achievement !== null;
                                        return (
                                            <div
                                                key={idx}
                                                className={`py-2 ${idx !== achievements.length - 1
                                                    ? "border-b border-dashed border-gray-300"
                                                    : ""
                                                    }`}
                                            >
                                                {isObject ? (
                                                    <>
                                                        <p className="text-sm font-bold text-black">
                                                            {achievement?.title}
                                                        </p>
                                                        {achievement?.description && (
                                                            <p className="text-xs text-gray-700 mt-0.5">
                                                                {achievement.description}
                                                            </p>
                                                        )}
                                                    </>
                                                ) : (
                                                    <p className="text-sm text-black">
                                                        &bull; {achievement}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {Array.isArray(skills) && skills.length > 0 && (
                            <section className="mb-6">
                                <SectionHeading>Skills</SectionHeading>
                                <div className="space-y-1.5">
                                    {skills.map((skillGroup, idx) => (
                                        <p key={idx} className="text-sm text-black">
                                            <span className="font-bold">
                                                {skillGroup?.skillCategory}
                                                {skillGroup?.skillCategory ? ": " : ""}
                                            </span>
                                            {Array.isArray(skillGroup?.skills)
                                                ? skillGroup.skills.join(", ")
                                                : skillGroup?.skills}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        )}

                        {education.length > 0 && (
                            <section className="mb-6">
                                <SectionHeading>Education</SectionHeading>
                                <div className="space-y-3">
                                    {education.map((edu, idx) => (
                                        <div key={idx}>
                                            <p className="text-sm font-bold text-black">
                                                {[edu?.degree, edu?.field].filter(Boolean).join(", ")}
                                            </p>
                                            <p className="text-sm font-semibold text-blue-600">
                                                {edu?.institution}
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-0.5">
                                                {(edu?.startDate || edu?.endDate) && (
                                                    <span>
                                                        {edu?.startDate}
                                                        {edu?.startDate && edu?.endDate ? " - " : ""}
                                                        {edu?.endDate}
                                                    </span>
                                                )}
                                                {edu?.location && <span>{edu.location}</span>}
                                            </div>
                                            {edu?.cgpa && (
                                                <p className="text-xs text-black mt-0.5">
                                                    CGPA : {edu.cgpa}
                                                </p>
                                            )}
                                            {edu?.percentage && (
                                                <p className="text-xs text-black mt-0.5">
                                                    Percentage : {edu.percentage}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {certifications.length > 0 && (
                            <section className="mb-6">
                                <SectionHeading>Training</SectionHeading>
                                <div className="space-y-2">
                                    {certifications.map((cert, idx) => (
                                        <div key={idx}>
                                            <p className="text-sm font-bold text-black">
                                                {cert?.about}
                                            </p>
                                            {cert?.link && (
                                                <a
                                                    href={cert.link}
                                                    className="text-xs underline text-blue-600"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {cert.link}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Temp7;