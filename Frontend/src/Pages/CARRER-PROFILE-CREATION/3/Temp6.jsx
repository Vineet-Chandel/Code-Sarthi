import React from "react";
import {
    FaPhone,
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaGlobe,
    FaMapMarkerAlt,
    FaAward,
    FaRocket,
    FaStar,
    FaCheckCircle,
    FaTrophy,
    FaBolt,
} from "react-icons/fa";

const SectionTitle = ({ children }) => (
    <h2 className="uppercase text-gray-600 font-medium text-2xl border-b border-gray-400 pb-1 mb-5">
        {children}
    </h2>
);

const ACHIEVEMENT_ICONS = [FaAward, FaRocket, FaStar, FaCheckCircle, FaTrophy, FaBolt];

const LANGUAGE_LEVELS = {
    native: 5,
    fluent: 4,
    advanced: 4,
    professional: 3,
    intermediate: 3,
    conversational: 2,
    basic: 1,
};

const LanguageDots = ({ status }) => {
    const filled = LANGUAGE_LEVELS[String(status || "").toLowerCase()] || 0;
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((dot) => (
                <span
                    key={dot}
                    className={`w-2.5 h-2.5 rounded-full ${dot <= filled ? "bg-gray-700" : "bg-gray-200"
                        }`}
                />
            ))}
        </div>
    );
};

const ResumeTemplate04 = ({ data, ref }) => {
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
    const fullLocation = [location, pincode].filter(Boolean).join(", ");

    const contactItems = [
        { value: phone, icon: FaPhone, href: null },
        { value: email, icon: FaEnvelope, href: `mailto:${email}` },
        { value: github, icon: FaGithub, href: github },
        { value: linkedin, icon: FaLinkedin, href: linkedin },
        { value: portfolio, icon: FaGlobe, href: portfolio },
        { value: fullLocation, icon: FaMapMarkerAlt, href: null },
    ].filter((item) => item.value && String(item.value).trim().length > 0);

    return (
        <div ref={ref}
            className="bg-white text-gray-900 font-sans mx-auto"
            style={{ width: "210mm", minHeight: "297mm" }}
        >
            <div className="px-10 py-8">
                <header className="mb-8">
                    <h1 className="text-6xl font-extrabold uppercase tracking-tight leading-none text-gray-900">
                        {fname} {lname}
                    </h1>
                    {summaryTitle && (
                        <p className="mt-2 text-cyan-500 text-2xl font-medium">
                            {summaryTitle}
                        </p>
                    )}
                    {contactItems.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-5">
                            {contactItems.map(({ value, icon: Icon, href }, idx) =>
                                href ? (
                                    <a
                                        key={idx}
                                        href={href}
                                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                                        rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                                        className="flex items-center gap-1.5 text-sm text-gray-600"
                                    >
                                        <Icon className="text-gray-500" size={14} />
                                        {value}
                                    </a>
                                ) : (
                                    <span
                                        key={idx}
                                        className="flex items-center gap-1.5 text-sm text-gray-600"
                                    >
                                        <Icon className="text-gray-500" size={14} />
                                        {value}
                                    </span>
                                )
                            )}
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-7">
                        {summaryBody && (
                            <section className="mb-8">
                                <SectionTitle>Summary</SectionTitle>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {summaryBody}
                                </p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section className="mb-8">
                                <SectionTitle>Experience</SectionTitle>
                                <div>
                                    {experience.map((exp, idx) => (
                                        <div
                                            key={idx}
                                            className={idx === 0 ? "" : "mt-8"}
                                        >
                                            <p className="text-lg font-bold text-gray-900">
                                                {exp?.role}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                                                {exp?.company && (
                                                    <span className="text-cyan-500 font-medium text-sm">
                                                        {exp.company}
                                                    </span>
                                                )}
                                                {(exp?.startDate ||
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
                                                    )}
                                                {exp?.location && (
                                                    <span className="text-xs text-gray-500">
                                                        {exp.location}
                                                    </span>
                                                )}
                                                {exp?.employmentType && (
                                                    <span className="text-xs text-gray-500">
                                                        {exp.employmentType}
                                                    </span>
                                                )}
                                            </div>
                                            {Array.isArray(exp?.bullets) &&
                                                exp.bullets.length > 0 && (
                                                    <ul className="mt-2 list-disc list-outside pl-5 space-y-1">
                                                        {exp.bullets.map((bullet, bIdx) => (
                                                            <li
                                                                key={bIdx}
                                                                className="text-sm text-gray-700 leading-relaxed"
                                                            >
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

                        {education.length > 0 && (
                            <section className="mb-8">
                                <SectionTitle>Education</SectionTitle>
                                <div className="space-y-5">
                                    {education.map((edu, idx) => (
                                        <div key={idx}>
                                            <p className="text-base font-bold text-gray-900">
                                                {[edu?.degree, edu?.field].filter(Boolean).join(", ")}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                                                {edu?.institution && (
                                                    <span className="text-blue-600 text-sm">
                                                        {edu.institution}
                                                    </span>
                                                )}
                                                {(edu?.startDate || edu?.endDate) && (
                                                    <span className="text-xs text-gray-500">
                                                        {edu?.startDate}
                                                        {edu?.startDate && edu?.endDate ? " - " : ""}
                                                        {edu?.endDate}
                                                    </span>
                                                )}
                                                {edu?.location && (
                                                    <span className="text-xs text-gray-500">
                                                        {edu.location}
                                                    </span>
                                                )}
                                            </div>
                                            {edu?.cgpa && (
                                                <p className="text-sm text-gray-700 mt-1">
                                                    CGPA : {edu.cgpa}
                                                </p>
                                            )}
                                            {edu?.percentage && (
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Percentage : {edu.percentage}
                                                </p>
                                            )}
                                            {Array.isArray(edu?.bullets) &&
                                                edu.bullets.length > 0 && (
                                                    <ul className="mt-2 list-disc list-outside pl-5 space-y-1">
                                                        {edu.bullets.map((bullet, bIdx) => (
                                                            <li key={bIdx} className="text-sm text-gray-700">
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
                            <section className="mb-8">
                                <SectionTitle>Projects & Portfolio</SectionTitle>
                                <div className="space-y-5">
                                    {projects.map((project, idx) => (
                                        <div key={idx}>
                                            <p className="text-base font-bold text-gray-900">
                                                {project?.name}
                                            </p>
                                            {project?.stack && (
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {project.stack}
                                                </p>
                                            )}
                                            {project?.description && (
                                                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                                                    {project.description}
                                                </p>
                                            )}
                                            {(project?.github || project?.liveLink) && (
                                                <p className="mt-1 text-xs space-x-3">
                                                    {project?.github && (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-cyan-500 underline"
                                                        >
                                                            Github
                                                        </a>
                                                    )}
                                                    {project?.liveLink && (
                                                        <a
                                                            href={project.liveLink}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-cyan-500 underline"
                                                        >
                                                            Live
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
                                                                className="text-sm text-gray-700"
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

                    </div>

                    <div className="col-span-5">
                        {Array.isArray(skills) && skills.length > 0 && (
                            <section className="mb-8">
                                <SectionTitle>Technical Stack</SectionTitle>
                                <div className="space-y-4">
                                    {skills.map((skillGroup, idx) => (
                                        <div key={idx}>
                                            <p className="text-cyan-500 font-bold text-sm">
                                                {skillGroup?.skillCategory}
                                            </p>
                                            <p className="text-sm text-gray-700 leading-relaxed mt-0.5">
                                                {Array.isArray(skillGroup?.skills)
                                                    ? skillGroup.skills.join(", ")
                                                    : skillGroup?.skills}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}



                        {achievements.length > 0 && (
                            <section className="mb-8">
                                <SectionTitle>Key Achievements</SectionTitle>
                                <div className="space-y-4">
                                    {achievements.map((achievement, idx) => {
                                        const isObject =
                                            typeof achievement === "object" && achievement !== null;
                                        const Icon =
                                            ACHIEVEMENT_ICONS[idx % ACHIEVEMENT_ICONS.length];
                                        return (
                                            <div key={idx} className="flex gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                    <Icon className="text-cyan-500" size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {isObject ? achievement?.title : achievement}
                                                    </p>
                                                    {isObject && achievement?.description && (
                                                        <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                                                            {achievement.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                        {certifications.length > 0 && (
                            <section className="mb-8">
                                <SectionTitle>Certification</SectionTitle>
                                <div className="grid grid-cols-2 gap-6">
                                    {certifications.map((cert, idx) => (
                                        <div key={idx}>
                                            {cert?.link ? (
                                                <a
                                                    href={cert.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 font-semibold text-sm"
                                                >
                                                    {cert?.about}
                                                </a>
                                            ) : (
                                                <p className="text-blue-600 font-semibold text-sm">
                                                    {cert?.about}
                                                </p>
                                            )}
                                            {cert?.description && (
                                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                                    {cert.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {languages.length > 0 && (
                            <section className="mb-8">
                                <SectionTitle>Languages</SectionTitle>
                                <div className="space-y-3">
                                    {languages.map((lang, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-sm text-gray-900">
                                                {lang?.langCategory}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-gray-600">
                                                    {lang?.status}
                                                </span>
                                                <LanguageDots status={lang?.status} />
                                            </div>
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

export default ResumeTemplate04;