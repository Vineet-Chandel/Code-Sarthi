import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Top = () => {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);

    const hoverTimeout = useRef(null);
    const dropdownRefs = useRef({});
    const [openHam, setOpenHam] = useState(false)
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const handleClickHamburger = () => {
        if (openHam) {
            setOpenHam(false);
        } else {
            setOpenHam(true)
        }
    }


    const navItems = [


        {
            id: "builder",
            label: "Builder",
            path: "/builder",
            hasDropdown: true,
            isSmall: true,
            dropdown: (
                <Dropdown
                    title="All builders we provides"
                    items={[
                        { title: "AI Resume Builder", description: "Millions have trusted our resume maker." },
                        { title: "AI Cover Letter Builder", description: "Create a cover letter to land your dream job." },
                        { title: "CV Maker", description: "Easily build a CV that paves the way to your dream job." }
                    ]}
                />
            ),
        },
        {
            id: "resume",
            label: "Resume",
            path: "/app/how-resume",
            hasDropdown: true,
            dropdown: (
                <div className="flex gap-0">
                    <Dropdown
                        title=""
                        items={[
                            { title: "Al Resume Skills Generator", description: "Use our resume skills generator for a quick solution to a job-winning skills section." },
                            { title: "Resume Examples", description: "Use examples for various job titles and industries as a source of inspiration." },
                            { title: "Resume Templates", description: "Browse customizable templates to create a resume quickly and easily." },
                            { title: "Resume Formats", description: "Learn different formats and choose the best one for you based on your background." },


                        ]}
                    />

                    <Dropdown
                        title=""
                        items={[
                            { title: "ATS Resume Checker", description: "Ensure your resume can be easily read by Applicant Tracking Systems (ATS)." },
                            { title: "Al Resume Review", description: "Get instant AI feedback to improve your resume." },
                            { title: "How to Make a Resume", description: "Learn step-by-step tips for writing a resume that gets noticed." },
                            { title: "Al Summary Generator", description: "Create a professional resume summary that highlights your essential qualifications and career goals." }

                        ]} />

                    <Dropdown
                        title="Create your resume"
                        items={[
                            { title: "Save time with our builder", description: "In just a few clicks you can make a professional resume with our Al Resume Builder." }
                        ]}
                    />
                </div>
            ),
        },
        {
            id: "cv",
            label: "CV",
            path: "/app/how-cv",
            hasDropdown: true,
            dropdown: (
                <div className="flex gap-4">
                    <Dropdown
                        title=""
                        items={[
                            { title: "CV Maker", description: "Build a professional CV quickly with our easy-to-use CV maker." },
                            { title: "CV Templates", description: "Choose a customizable template to create an effective CV." },
                            { title: "CV Examples", description: "Use examples for job titles and industries to guide you in writing your CV." },

                        ]}
                    />
                    <Dropdown
                        title=""
                        items={[
                            { title: "How to Make a CV", description: "Follow our guide to write a CV that showcases your best qualifications." },
                        ]}
                    />
                    <Dropdown
                        title="Create your CV"
                        items={[
                            { title: "Save time with our builder", description: "In just a few clicks you can make a professional resume with our Al Resume Builder." }
                        ]}
                    />
                </div>
            ),
        },
        {
            id: "cover-letter",
            label: "Cover letter",
            path: "/app/how-cover-letter",
            hasDropdown: true,
            dropdown: (
                <div className="flex gap-4">
                    <Dropdown
                        title=""
                        items={[
                            { title: "AI Cover Letter Generator", description: "Create a cover letter in minutes with our builder." },
                            { title: "Cover Letter Templates", description: "Find cover letter templates that help you make a great first impression." },
                            { title: "Cover Letter Examples", description: "Base your cover letter around examples for all types of jobs." },
                        ]}
                    />
                    <Dropdown
                        title=""
                        items={[
                            { title: "Cover Letter Formats", description: "Explore cover letter formats that suit any application." },
                            { title: "How to Make a Cover Letter", description: "Learn how to write a compelling cover letter with our expert advice." },
                        ]}
                    />
                    <Dropdown
                        title="Create your Cover Letter"
                        items={[
                            { title: "Save time with our builder", description: "In just a few clicks you can make a professional resume with our Al Resume Builder." }
                        ]}
                    />
                </div>
            ),
        },
        {
            id: "analyser",
            label: "Analyser",
            path: "/app/credentials-analyser",
            hasDropdown: true,
            isSmall: true,
            dropdown: (
                <div className="flex gap-4">
                    <Dropdown
                        title=""
                        items={[
                            { title: "Resume", description: "Expert resume tips to help you land the job you want." },
                            { title: "Cover Letter ", description: "Tips and resources to help you find your next job." },
                            { title: "Job Search", description: "Guidance on writing effective cover letters." },
                            { title: "Carrer Advice", description: "Get career guidance to grow and succeed." },
                        ]}
                    />

                </div>
            ),
        },
    ];

    /* ================= HOVER INTENT ================= */
    const onEnter = (id) => {
        clearTimeout(hoverTimeout.current);
        setHoveredItem(id);
    };

    const onLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setHoveredItem(null);
        }, 120);
    };

    /* ================= GSAP ================= */
    useGSAP(() => {
        Object.values(dropdownRefs.current).forEach((el) => {
            gsap.set(el, {
                opacity: 0,
                y: 12,
                scale: 0.95,
                pointerEvents: "none",
            });
        });
    }, []);

    useEffect(() => {
        Object.entries(dropdownRefs.current).forEach(([id, el]) => {
            if (hoveredItem === id) {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    pointerEvents: "auto",
                    duration: 0.35,
                    ease: "power3.out",
                });
            } else {
                gsap.to(el, {
                    opacity: 0,
                    y: 12,
                    scale: 0.95,
                    pointerEvents: "none",
                    duration: 0.25,
                    ease: "power2.in",
                });
            }
        });
    }, [hoveredItem]);

    const hamRef = useRef(null);


    useEffect(() => {
        if (!hamRef.current) return;
        if (openHam) {

            gsap.fromTo(
                hamRef.current,
                { x: 400 },
                { x: 0, duration: 0.4, ease: "power3.out" }
            );
        } else {
            gsap.to(hamRef.current, {
                x: 400,
                duration: 0.3,
                ease: "power3.in",
            });
        }
    }, [openHam]);
    return (
        <div className="relative w-full">
            {/* NAVBAR */}
            <div className=" z-10 w-full 2xl:px-7 xl:px-6 lg:px-4 px-2  w-screen text-secondary mt-5 mb-5">
                <div className="flex items-center  justify-center">

                    {/* MENU */}
                    <div className="lg:flex hidden gap-4 lg:gap-6 2xl:gap-8  text-lg font-semibold">
                        {navItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative"
                                onMouseEnter={() => onEnter(item.id)}
                                onMouseLeave={onLeave}
                                onFocus={() => onEnter(item.id)}
                                onBlur={onLeave}
                                tabIndex={0}
                            >
                                <div
                                    onClick={() => navigate(item.path)}
                                    className="flex items-center gap-1 px-3 py-1 rounded-lg cursor-pointer
                                               transition-all duration-300
                                               hover:bg-white hover:text-black group"
                                >
                                    {item.label}
                                    {item.hasDropdown && (
                                        <Arrow active={hoveredItem === item.id} />
                                    )}
                                </div>

                                {item.hasDropdown && (
                                    <div
                                        ref={(el) =>
                                            (dropdownRefs.current[item.id] = el)
                                        }
                                        className={`absolute left-1/2 top-[3.8rem] 
                                        -translate-x-1/2 rounded-3xl bg-base-300 text-black
                                        ${item.isSmall ? "w-[420px]" : "w-[1200px]"}
                                        p-5`}
                                    >
                                        {item.dropdown}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center items-center gap-3">


                        <div className="lg:hidden bg-white/30 p-1 border border-transparent rounded-lg" onClick={handleClickHamburger}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M2 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2z"></path></svg>
                        </div>

                        {openHam && (
                            <div ref={hamRef} className=" fixed inset-0 z-30 w-[350px] px-7 text-white bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 h-screen justify-self-end rounded-l-[80px]">

                                <div className="lg:hidden bg-gray-600/30 p-1 border border-gray-600 rounded-lg w-[40px] flex  justify-center items-center justify-self-end mt-10" onClick={handleClickHamburger}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#000000" d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z"></path></svg>
                                </div>

                                <div className="mt-10">
                                    {navItems.map((items) => {
                                        return (<ul key={items.id}>
                                            <div>
                                                <div className="flex justify-between flex-col    items-center  " onClick={() => setOpenDropdownId(openDropdownId === items.id ? null : items.id)}>
                                                    <li className="text-black text-2xl mb-1 mt-5 " >{items.label}</li>


                                                    {
                                                        items.hasDropdown && (
                                                            <div

                                                            >
                                                                <div
                                                                    className={`transition-transform duration-300 ${openDropdownId === items.id ? "rotate-180" : ""
                                                                        }`}
                                                                >
                                                                    <svg className="animate-bounce" width={24} height={24} viewBox="0 0 24 24">
                                                                        <path fill="#000" d="m7 10l5 5l5-5z" />
                                                                    </svg>
                                                                </div>

                                                                {openDropdownId === items.id && (<div className="text-black ">{items.dropdown}</div>)}
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <hr className="border border-gray-400" />

                                            </div>

                                        </ul>)
                                    })}



                                </div>

                            </div>
                        )}
                    </div>

                </div>
            </div>



        </div>
    );
};
/* ================= SUB COMPONENTS ================= */
const Arrow = ({ active }) => (
    <svg
        className={`w-4 h-4 transition-transform duration-300 ease-out
        ${active ? "rotate-180 scale-110" : ""}`}
        viewBox="0 0 1024 1024"
        fill="currentColor"
    >
        <path d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z" />
    </svg>
);
const Dropdown = ({ title, items }) => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 bg-sky-200 p-5 ">
            <h1 className="text-gray-600 font-semibold ">{title}</h1>
            <ul className="w-[300px] ">
                {items.map((item) => (
                    <li
                        key={item}
                        onClick={() =>
                            navigate(`/${item.toLowerCase().replace(/\s+/g, "-")}`)
                        }
                        className="cursor-pointer hover:text-blue-500 transition text-base mb-4 bg-white/80 rounded-xl p-3"
                    >
                        {item.title}
                        <p className="text-xs text-gray-600">{item.description}</p>
                    </li>
                ))}
            </ul>









        </div>
    );
};


export default Top;
