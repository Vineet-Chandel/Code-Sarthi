import React from "react";

const SectionHeading = ({ children }) => (
    <div className="bg-gray-200 px-3 py-1.5 mb-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
            {children}
        </h2>
    </div>
);

const Temp12 = ({ data }) => {
    const {
        fname,
        lname,
        phone,
        github,
        linkedin,
        portfolio,
        email,
        location,
        pincode,

        summaryTitle,
        summaryBody,

        experience = [],
        education = [],

        skills,

        projects = [],

        certifications = [],

        achievements = [],

        languages = [],
    } = data;

    const contactItems = [
        email,
        phone,
        [location, pincode].filter(Boolean).join(", "),
        linkedin,
        portfolio,
        github,
    ].filter((item) => item && String(item).trim().length > 0);

    return (
        <div
            className="bg-white text-gray-900 font-sans max-w-[850px] mx-auto"

        >
            <div className="px-5 py-8">
                <header className="mb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        {fname} {lname}
                    </h1>
                    {contactItems.length > 0 && (
                        <p className="mt-2 text-sm text-gray-700">
                            {contactItems.join(" | ")}
                        </p>
                    )}
                </header>

                {summaryBody && (
                    <section className="mb-6">
                        <SectionHeading>{summaryTitle || "Summary"}</SectionHeading>
                        <p className="text-sm leading-relaxed text-gray-800">
                            {summaryBody}
                        </p>
                    </section>
                )}

                {Array.isArray(skills) && skills.length > 0 && (
                    <section className="mb-6">
                        <SectionHeading>Skills</SectionHeading>
                        <div className="space-y-1">
                            {skills.map((skillGroup, idx) => (
                                <p key={idx} className="text-sm text-gray-800">
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

                {experience.length > 0 && (
                    <section className="mb-6">
                        <SectionHeading>Work Experience</SectionHeading>
                        <div className="space-y-4">
                            {experience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-sm font-bold text-gray-900">
                                            {exp?.role}
                                        </p>
                                        <p className="text-sm text-gray-700 whitespace-nowrap ml-4">
                                            {exp?.startDate}
                                            {exp?.startDate && (exp?.currentlyWorking || exp?.endDate)
                                                ? " - "
                                                : ""}
                                            {exp?.currentlyWorking ? "Present" : exp?.endDate}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        {[exp?.company, exp?.location].filter(Boolean).join(" | ")}
                                    </p>
                                    {Array.isArray(exp?.bullets) && exp.bullets.length > 0 && (
                                        <ul className="mt-1.5 list-disc list-outside pl-5 space-y-1">
                                            {exp.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx} className="text-sm text-gray-800">
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
                        <div className="space-y-4">
                            {projects.map((project, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-sm font-bold text-gray-900">
                                            {project?.name}
                                        </p>
                                        {project?.stack && (
                                            <p className="text-sm text-gray-700 whitespace-nowrap ml-4">
                                                {project.stack}
                                            </p>
                                        )}
                                    </div>
                                    {(project?.github || project?.liveLink) && (
                                        <p className="text-sm text-gray-700">
                                            {project?.github && (
                                                <a
                                                    href={project.github}
                                                    className="underline"
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
                                                    className="underline"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {project.liveLink}
                                                </a>
                                            )}
                                        </p>
                                    )}
                                    {project?.description && (
                                        <p className="mt-1 text-sm text-gray-800">
                                            {project.description}
                                        </p>
                                    )}
                                    {Array.isArray(project?.bullets) &&
                                        project.bullets.length > 0 && (
                                            <ul className="mt-1.5 list-disc list-outside pl-5 space-y-1">
                                                {project.bullets.map((bullet, bIdx) => (
                                                    <li
                                                        key={bIdx}
                                                        className="text-sm text-gray-800"
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

                {education.length > 0 && (
                    <section className="mb-6">
                        <SectionHeading>Education</SectionHeading>
                        <div className="space-y-3">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-sm font-bold text-gray-900">
                                            {[edu?.degree, edu?.field].filter(Boolean).join(", ")}
                                        </p>
                                        <p className="text-sm text-gray-700 whitespace-nowrap ml-4">
                                            {edu?.startDate}
                                            {edu?.startDate && edu?.endDate ? " - " : ""}
                                            {edu?.endDate}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        {[edu?.institution, edu?.location]
                                            .filter(Boolean)
                                            .join(" | ")}
                                    </p>
                                    {edu?.cgpa && (
                                        <p className="text-sm text-gray-800">CGPA : {edu.cgpa}</p>
                                    )}
                                    {edu?.percentage && (
                                        <p className="text-sm text-gray-800">
                                            Percentage : {edu.percentage}
                                        </p>
                                    )}
                                    {Array.isArray(edu?.bullets) && edu.bullets.length > 0 && (
                                        <ul className="mt-1.5 list-disc list-outside pl-5 space-y-1">
                                            {edu.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx} className="text-sm text-gray-800">
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

                {certifications.length > 0 && (
                    <section className="mb-6">
                        <SectionHeading>Certifications and Training</SectionHeading>
                        <ul className="list-disc list-outside pl-5 space-y-1">
                            {certifications.map((cert, idx) => (
                                <li key={idx} className="text-sm text-gray-800">
                                    {cert?.about}
                                    {cert?.link && (
                                        <>
                                            {" "}
                                            -{" "}
                                            <a
                                                href={cert.link}
                                                className="underline"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {cert.link}
                                            </a>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {achievements.length > 0 && (
                    <section className="mb-6">
                        <SectionHeading>Achievements</SectionHeading>
                        <ul className="list-disc list-outside pl-5 space-y-1">
                            {achievements.map((achievement, idx) => (
                                <li key={idx} className="text-sm text-gray-800">
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {languages.length > 0 && (
                    <section className="mb-6">
                        <SectionHeading>Languages</SectionHeading>
                        <div className="space-y-1">
                            {languages.map((lang, idx) => (
                                <p key={idx} className="text-sm text-gray-800">
                                    {lang?.langCategory}
                                    {lang?.langCategory && lang?.status ? " — " : ""}
                                    {lang?.status}
                                </p>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Temp12;