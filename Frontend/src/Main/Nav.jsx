import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const socials = [
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
            <g fill="none" stroke="#b5b3b3ff" strokeWidth={2}>
                <rect width={14} height={14} x={5} y={5} rx={4}></rect>
                <path strokeLinecap="round" d="M15.9 8.1v.01"></path>
                <circle cx={12} cy={12} r={3}></circle>
            </g>
        </svg>), label: "Instagram", href: "https://www.instagram.com/codesarthik06/"
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
            <g fill="none">
                <path fill="#b5b3b3ff" fillOpacity={0.16} fillRule="evenodd" d="M22.54 6.42a2.77 2.77 0 0 0-1.945-1.957C18.88 4 12 4 12 4s-6.88 0-8.595.463A2.77 2.77 0 0 0 1.46 6.42C1 8.148 1 11.75 1 11.75s0 3.602.46 5.33a2.77 2.77 0 0 0 1.945 1.958C5.121 19.5 12 19.5 12 19.5s6.88 0 8.595-.462a2.77 2.77 0 0 0 1.945-1.958c.46-1.726.46-5.33.46-5.33s0-3.602-.46-5.33M9.75 8.479v6.542l5.75-3.271z" clipRule="evenodd"></path>
                <path stroke="#b5b3b3ff" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="M20.595 4.463A2.77 2.77 0 0 1 22.54 6.42c.46 1.728.46 5.33.46 5.33s0 3.604-.46 5.33a2.77 2.77 0 0 1-1.945 1.958C18.88 19.5 12 19.5 12 19.5s-6.879 0-8.595-.462A2.77 2.77 0 0 1 1.46 17.08C1 15.353 1 11.75 1 11.75s0-3.602.46-5.33a2.77 2.77 0 0 1 1.945-1.957C5.12 4 12 4 12 4s6.88 0 8.595.463Z"></path>
                <path stroke="#b5b3b3ff" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="M9.75 15.021V8.48l5.75 3.271z"></path>
            </g>
        </svg>), label: "YouTube", href: "https://www.youtube.com/@CodeSarthi-ZENITH"
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
            <path fill="#b5b3b3ff" d="M7.125 3.75h9.75c.813 0 1.468 0 2 .043c.546.045 1.026.14 1.47.366a3.75 3.75 0 0 1 1.64 1.639c.226.444.32.924.365 1.47q.01.12.016.247a.75.75 0 0 1 .014.336c.013.41.013.879.013 1.417v5.464c0 .813 0 1.469-.043 2c-.045.546-.14 1.026-.366 1.47a3.75 3.75 0 0 1-1.639 1.64c-.444.226-.924.32-1.47.365c-.532.043-1.187.043-2 .043h-9.75c-.813 0-1.468 0-2-.043c-.546-.045-1.026-.14-1.47-.366a3.75 3.75 0 0 1-1.639-1.639c-.226-.444-.32-.924-.365-1.47c-.044-.531-.044-1.187-.044-2V9.268c0-.538 0-1.007.013-1.417a.75.75 0 0 1 .014-.336q.007-.128.017-.246c.044-.547.139-1.027.365-1.471a3.75 3.75 0 0 1 1.639-1.64c.444-.226.924-.32 1.47-.365c.532-.043 1.187-.043 2-.043M20.85 7.341c-.038-.423-.105-.672-.202-.862a2.25 2.25 0 0 0-.983-.984c-.198-.1-.459-.17-.913-.207c-.462-.037-1.057-.038-1.909-.038H7.157c-.852 0-1.446 0-1.91.038c-.453.037-.714.107-.911.207a2.25 2.25 0 0 0-.984.984c-.096.19-.164.439-.202.862l6.604 4.403c1.01.674 1.363.895 1.722.981a2.25 2.25 0 0 0 1.048 0c.36-.086.711-.307 1.723-.981z"></path>
        </svg>), label: "Email", href: "mailto:codesarthi.headmail@gmail.com"
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24">
            <path fill="#b5b3b3ff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
        </svg>), label: "GitHub", href: "https://github.com/Vineet-Chandel/Code-Sarthi"
    },
];

const Nav = () => {
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
    const MainCTAbutton = ({ ClassName = "" }) => {
        return (


            <div onClick={() => navigate("/login")} className={` flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>

                <span className="text-white relative -right-[1px]" >
                    <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                        <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                            fill="#fff"
                        ></path>
                    </svg>
                </span>
                <button className="bg-white  px-4 py-[7.5px] ">Open CodeSarthi</button>
                <span className="text-white relative -left-[1px]">
                    <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                            fill="#fff"
                        />
                    </svg>
                </span>
            </div>
        )
    }

    const navItems = [


        {
            id: "blogs",
            label: "Blogs",
            path: "/terms-and-conditions",
            hasDropdown: true,
            isSmall: true,
            dropdown: (
                <Dropdown
                    title="Blog Documentation"
                    items={[
                        "Terms and Conditions",
                        "New Updates",
                        "Engineering and Developers",
                        "How to use CodeSarthi",
                    ]}
                />
            ),
        },

        {
            id: "features",
            label: "Features",
            path: "/features",
            hasDropdown: true,
            isSmall: true,
            dropdown: (
                <Dropdown
                    title="Featured"
                    items={[
                        "Resume Builder",
                        "Mock Interview",
                        "Developer Toolkit",
                        "Global Developers Community",
                        "Developers Help Center",

                    ]}
                />
            ),
        },

        {
            id: "safety",
            label: "Safety",
            path: "/privacy-&-policy-hub",
            hasDropdown: true,
            dropdown: (
                <div className="flex gap-4">
                    <Dropdown
                        title="Resources"
                        items={[
                            "Family Center",
                            "Safety Library",
                            "Teen Charter",

                        ]}
                    />
                    <Dropdown
                        title="Hub"
                        items={[
                            "Privacy & Policy Hub",
                            "Transparency Hub",
                            "Wellbeing Hub",
                        ]}
                    />
                </div>
            ),
        },

        {
            id: "support",
            label: "Support",
            path: "/help-center",
            hasDropdown: true,
            isSmall: true,
            dropdown: (
                <Dropdown
                    title="Resources"
                    items={["Help Center", "Feedback", "Submit a Request", "Review"]}
                />
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
            <div className=" top-5 z-30  2xl:px-7 xl:px-6 px-4   w-screen text-white">
                <div className="flex items-center  justify-between">

                    {/* LOGO */}
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-2xl font-extrabold cursor-pointer group">


                        <img className="w-[35px] h-[35px] group-hover:animate-bounce text-white" src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1779801993/Untitled_design_3_-Photoroom_hkidic.webp" alt="" />

                    </div>

                    {/* MENU */}
                    <div className="relative z-30 lg:flex hidden gap-4 lg:gap-6 2xl:gap-8  text-lg font-semibold">
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
                                        -translate-x-1/2 rounded-3xl bg-white text-black
                                        ${item.isSmall ? "w-[320px]" : "w-[620px]"}
                                        p-5`}
                                    >
                                        {item.dropdown}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center items-center gap-3 pr-3">


                        <div className="hidden lg:flex">
                            <MainCTAbutton />
                        </div>

                        <div className="lg:hidden bg-white/30 p-1 border border-transparent rounded-lg" onClick={handleClickHamburger}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M2 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m1 3a1 1 0 1 0 0 2h12a1 1 0 1 0 0-2z"></path></svg>
                        </div>

                        {openHam && (
                            <div ref={hamRef} className=" fixed inset-0  z-50 w-full px-4 text-white bg-[#000000] min-h-screen overflow-y-scroll justify-self-end ">
                                <div className="flex items-center  justify-between mt-6">
                                    <div> <img className="h-[35px] w-[35px]" src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1779801993/Untitled_design_3_-Photoroom_hkidic.webp" alt="" /></div>


                                    <div className="flex items-center justify-center gap-2">

                                        <div className="flex justify-center ">
                                            <MainCTAbutton />
                                        </div>

                                        <div className="bg-gray-600/30 p-1 border border-gray-600 rounded-lg w-[40px] flex  justify-center items-center justify-self-end  h-10 w-10 border border-white " onClick={handleClickHamburger}>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z"></path></svg>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-10">
                                    {navItems.map((items) => {
                                        return (<ul key={items.id}>
                                            <div>
                                                <div className="flex justify-between flex-col    items-center  " onClick={() => setOpenDropdownId(openDropdownId === items.id ? null : items.id)}>

                                                    <div className="flex items-center justify-between w-full gap-2">
                                                        <li className="text-[#ffffff] text-2xl mb-1 mt-2 " >{items.label}</li>
                                                        <span >
                                                            <svg className={`${openDropdownId === items.id ? "rotate-180  transition-all duration-200" : "animate-bounce"}`} width={24} height={24} viewBox="0 0 24 24">
                                                                <path fill="#fff" d="m7 10l5 5l5-5z" />
                                                            </svg>
                                                        </span>
                                                    </div>


                                                    {
                                                        items.hasDropdown && (
                                                            <div

                                                            >
                                                                <div
                                                                    className={`transition-transform duration-300 flex flex-col justify-center items-center mb-3`}
                                                                >

                                                                    {openDropdownId === items.id && (<div className="text-black ">{items.dropdown}</div>)}

                                                                </div>


                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <hr className="border w-full justify-self-center border-white/20" />

                                            </div>

                                        </ul>)
                                    })}



                                </div>







                                <span className="flex justify-around items-center w-full gap-2 my-10 ">
                                    {socials.map((s, i) => (
                                        <a
                                            key={i}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="dv-social bg-gray-600/30 p-3  rounded-xl"
                                            title={s.label}
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </span>





                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* OVERLAY */}
            <div
                className={`fixed inset-0 z-10 bg-black/70  transition-all duration-300
                ${hoveredItem ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />


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
        <div className="flex-1 rounded-2xl bg-[#00ff87] p-5">
            <h1 className="text-black font-extrabold mb-3">{title}</h1>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li
                        key={item}
                        onClick={() =>
                            navigate(`/${item.toLowerCase().replace(/\s+/g, "-")}`)
                        }
                        className="cursor-pointer font-medium hover:text-blue-500 transition"
                    >
                        {item}
                    </li>
                ))}
            </ul>









        </div>
    );
};


export default Nav;
