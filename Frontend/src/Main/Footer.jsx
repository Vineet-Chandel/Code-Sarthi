import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is installed, or replace with standard navigation


const MainCTAbutton = ({ ClassName = "" }) => {
    return (


        <div onClick={() => navigate("/login")} className={`mt-3 flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>
            <span className="text-white relative -right-[1px] rotate-180">
                <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                        fill="#000"
                    />
                </svg>
            </span>

            <button className="bg-black text-white  px-4 py-[7.5px] ">Open CodeSarthi</button>
            <span className="text-white relative rotate-180 -left-[1px]" >
                <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                    <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                        fill="#000"
                    ></path>
                </svg>
            </span>
        </div>
    )
}
const MainCTAbutton2 = ({ ClassName = "" }) => {
    return (


        <div onClick={() => navigate("/login")} className={` flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>

            <span className="text-white relative -right-[1px]" >
                <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                    <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                        fill="#000"
                    ></path>
                </svg>
            </span>
            <button className="bg-black text-white  px-4 py-[7.5px] ">Founder's Space</button>
            <span className="text-white relative -left-[1px]">
                <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                        fill="#000"
                    />
                </svg>
            </span>
        </div>
    )
}

const Footer = () => {
    const navigate = useNavigate();

    const bulletVariants = {
        rest: { width: 0, opacity: 0 },
        hover: { width: 15, opacity: 1 },
    };

    const sitemapLinks = [
        { name: "Home", path: "home" },
        { name: "Scaling Teams", path: "scaling" },
        { name: "Resume Generation", path: "resume" },
        { name: "Testimonials", path: "testimonials" },
        { name: "FAQ's", path: "faqs" },
        { name: "Founder's Desk", path: "founder" }
    ];

    const helpLinks = [
        { name: "Help Center", path: "/help-center" },
        { name: "Feedback", path: "/feedback" },
        { name: "Submit a Request", path: "/submit-a-request" },
        { name: "Review", path: "/review" },
        { name: "Update Notes", path: "/new-updates" },
        { name: "How to use CodeSarthi", path: "/how-to-use-codesarthi" },


    ]
    const legalLinks = [
        { name: "Privacy Policy  ", path: "/privacy-&-policy-hub" },
        { name: "Terms and Conditions", path: "/terms-and-conditions" },
        { name: "Family Center", path: "/family-center" },
        { name: "Teen Charter", path: "/teen-charter" },

    ]
    const features = [
        { name: "Resume Builder  ", path: "/resume-builder" },
        { name: "AI Mock Interview", path: "/mock-interview" },
        { name: "Developer Toolkit", path: "/developer-toolkit" },
        { name: "Global Developers Community", path: "/global-developers-community" },
        { name: "Developer Help Center", path: "/developers-help-center" },

    ]

    const socialLinks = [
        {
            title: "GitHub",
            icon: (
                <svg className='w-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="#000" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
                </svg>
            ),
            link: "https://github.com/Vineet-Chandel/Code-Sarthi"
        },
        {
            title: "Instagram",
            icon: (
                <svg className='w-5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="#000" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
                </svg>
            ),
            link: "https://www.instagram.com/codesarthi/"
        },
        {
            title: "X",
            icon: (
                <svg className='w-5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path fill="#000" d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"></path>
                </svg>
            ),
            link: "https://x.com/codesarthi"
        },
        {
            title: "Youtube",
            icon: (
                <svg className='w-5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="#000" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"></path>
                </svg>
            ),
            link: "https://www.youtube.com/@CodeSarthi-Social"
        },
    ];

    const divider = () => {
        return (
            <div className='mt-5 h-1 w-full lg:w-auto lg:h-full  flex flex-row lg:flex-col justify-center gap-1 items-center px-5 lg:px-0'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M14.18 4.276a.75.75 0 0 1 .531.918l-3.973 14.83a.75.75 0 0 1-1.45-.389l3.974-14.83a.75.75 0 0 1 .919-.53m2.262 3.053a.75.75 0 0 1 1.059-.056l1.737 1.564c.737.662 1.347 1.212 1.767 1.71c.44.525.754 1.088.754 1.784c0 .695-.313 1.258-.754 1.782c-.42.499-1.03 1.049-1.767 1.711l-1.737 1.564a.75.75 0 0 1-1.004-1.115l1.697-1.527c.788-.709 1.319-1.19 1.663-1.598c.33-.393.402-.622.402-.818s-.072-.424-.402-.817c-.344-.409-.875-.89-1.663-1.598l-1.697-1.527a.75.75 0 0 1-.056-1.06m-8.94 1.06a.75.75 0 1 0-1.004-1.115L4.761 8.836c-.737.662-1.347 1.212-1.767 1.71c-.44.525-.754 1.088-.754 1.784c0 .695.313 1.258.754 1.782c.42.499 1.03 1.049 1.767 1.711l1.737 1.564a.75.75 0 0 0 1.004-1.115l-1.697-1.527c-.788-.709-1.319-1.19-1.663-1.598c-.33-.393-.402-.622-.402-.818s.072-.424.402-.817c.344-.409.875-.89 1.663-1.598z"></path>
                </svg>
                <span className='h-[1px] lg:h-[200px] bg-black/30 w-full lg:w-[1px]'></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M14.18 4.276a.75.75 0 0 1 .531.918l-3.973 14.83a.75.75 0 0 1-1.45-.389l3.974-14.83a.75.75 0 0 1 .919-.53m2.262 3.053a.75.75 0 0 1 1.059-.056l1.737 1.564c.737.662 1.347 1.212 1.767 1.71c.44.525.754 1.088.754 1.784c0 .695-.313 1.258-.754 1.782c-.42.499-1.03 1.049-1.767 1.711l-1.737 1.564a.75.75 0 0 1-1.004-1.115l1.697-1.527c.788-.709 1.319-1.19 1.663-1.598c.33-.393.402-.622.402-.818s-.072-.424-.402-.817c-.344-.409-.875-.89-1.663-1.598l-1.697-1.527a.75.75 0 0 1-.056-1.06m-8.94 1.06a.75.75 0 1 0-1.004-1.115L4.761 8.836c-.737.662-1.347 1.212-1.767 1.71c-.44.525-.754 1.088-.754 1.784c0 .695.313 1.258.754 1.782c.42.499 1.03 1.049 1.767 1.711l1.737 1.564a.75.75 0 0 0 1.004-1.115l-1.697-1.527c-.788-.709-1.319-1.19-1.663-1.598c-.33-.393-.402-.622-.402-.818s.072-.424.402-.817c.344-.409.875-.89 1.663-1.598z"></path>
                </svg>
            </div>
        )
    }

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    return (
        <div className=' bg-black w-full py-10 pt-20 flex flex-col items-center justify-center'>
            {/* Top Wave/Border Section */}


            <div className='relative flex items-center justify-between w-[95%] '>
                <div className='flex w-[50%]'>
                    <div className='w-[40%] bg-white'></div>
                    <div>
                        <svg fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 74.222 20" width="74" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0 C4.197 0 8.369 0.66 12.361 1.958 L61.861 18.042 A40 40 0 0 0 74.222 20 L0 20 Z" fill="#fff"></path>
                        </svg>
                    </div>
                </div>
                <div className='flex justify-end w-[50%]'>
                    <div>
                        <svg fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 74.222 20" width="74" xmlns="http://www.w3.org/2000/svg" version="1.1" transform="matrix(-1,0,0,1,0,0)">
                            <path d="M0 0 C4.197 0 8.369 0.66 12.361 1.958 L61.861 18.042 A40 40 0 0 0 74.222 20 L0 20 Z" fill="#fff"></path>
                        </svg>
                    </div>
                    <div className='w-[40%] bg-white'></div>
                </div>
            </div>

            {/* Main Footer Body */}
            <div className='relative bg-white w-[95%]  rounded-b-lg flex flex-col'>
                <div className='w-full flex flex-col sm:flex-row h-full items-center justify-center py-10'>



                    {/* Sitemap Column */}


                    <div className='w-full lg:w-1/2 flex h-full lg:flex-row flex-col '>
                        <div className='w-full  h-full flex flex-col items-center sm:items-start'>
                            <div
                                onClick={() => navigate("/")}
                                className='flex items-center justify-center w-[65px] h-[65px] ml-2 sm:ml-10  rounded-xl bg-black cursor-pointer'
                            >
                                <img className="w-[40px] h-[40px]" src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1779801993/Untitled_design_3_-Photoroom_hkidic.webp" alt="Logo" />
                            </div>

                            <div className='flex flex-col ml-2 sm:ml-10  mt-5 gap-1 items-center sm:items-start'>
                                <span className='font-bold mb-1'>Sitemap</span>
                                {sitemapLinks.map((link, i) => (
                                    <motion.span
                                        key={i}
                                        initial="rest"
                                        whileHover="hover"
                                        onClick={() => scrollToSection(link.path)}
                                        className='cursor-pointer flex justify-start items-center gap-1 group'
                                    >
                                        <motion.span
                                            variants={bulletVariants}
                                            transition={{ duration: 0.25 }}
                                            className='bg-black h-2 rounded-full'

                                        />
                                        {link.name}
                                    </motion.span>
                                ))}
                            </div>
                        </div>


                        {divider()}

                        <div className='w-full  h-full flex flex-col items-center sm:items-start justify-center '>


                            <div className='flex flex-col ml-2 sm:ml-10 mt-5 gap-1 items-center sm:items-start'>
                                <span className='font-bold mb-1'>Help</span>
                                {helpLinks.map((link, i) => (
                                    <motion.span
                                        key={i}
                                        initial="rest"
                                        whileHover="hover"
                                        onClick={() => navigate(link.path)}
                                        className='cursor-pointer flex justify-start items-center gap-1 group'
                                    >
                                        <motion.span
                                            variants={bulletVariants}
                                            transition={{ duration: 0.25 }}
                                            className='bg-black h-2 rounded-full'

                                        />
                                        {link.name}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                    </div>


                    <div className='sm:hidden lg:flex w-full lg:w-auto'>
                        {divider()}
                    </div>




                    <div className='w-full lg:w-1/2 flex h-full lg:flex-row flex-col '>
                        <div className='w-full  h-full flex flex-col items-center sm:items-start justify-center '>


                            <div className='flex flex-col ml-2 sm:ml-10 mt-5 gap-1 items-center sm:items-start'>
                                <span className='font-bold mb-1'>Featured</span>
                                {features.map((link, i) => (
                                    <motion.span
                                        key={i}
                                        initial="rest"
                                        whileHover="hover"
                                        onClick={() => navigate(link.path)}
                                        className='cursor-pointer flex justify-start items-center gap-1 group'
                                    >
                                        <motion.span
                                            variants={bulletVariants}
                                            transition={{ duration: 0.25 }}
                                            className='bg-black h-2 rounded-full'

                                        />
                                        {link.name}
                                    </motion.span>
                                ))}
                            </div>
                        </div>


                        {divider()}


                        <div className='w-full  h-full flex flex-col items-center sm:items-start justify-center '>


                            <div className='flex flex-col ml-2 sm:ml-10 mt-5 gap-1 items-center sm:items-start'>
                                <span className='font-bold mb-1'>Legal</span>
                                {legalLinks.map((link, i) => (
                                    <motion.span
                                        key={i}
                                        initial="rest"
                                        whileHover="hover"
                                        onClick={() => navigate(link.path)}
                                        className='cursor-pointer flex justify-start items-center gap-1 group'
                                    >
                                        <motion.span
                                            variants={bulletVariants}
                                            transition={{ duration: 0.25 }}
                                            className='bg-black h-2 rounded-full'

                                        />
                                        {link.name}
                                    </motion.span>
                                ))}

                                <MainCTAbutton />
                                <MainCTAbutton2 />
                            </div>
                        </div>
                    </div>




                </div>

                {/* Bottom Bar */}
                <div className='w-full h-[10%] flex sm:flex-row flex-col gap-2 justify-between px-2 lg:px-5 items-center'>
                    <div className='flex items-center justify-center font-roboto text-sm font-semibold'>
                        © 2026 – CodeSarthi
                    </div>
                    <div className='flex items-center justify-center'>
                        {socialLinks.map((item, index) => (
                            <div key={index} className='flex items-center'>
                                <div className='w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform'>
                                    <a target='_blank' rel='noopener noreferrer' href={item.link} className='text-black text-xl'>
                                        {item.icon}
                                    </a>
                                </div>
                                {index < socialLinks.length - 1 && (
                                    <span className='w-[1px] h-4 bg-black/50 mx:2 lg:mx-4'></span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;