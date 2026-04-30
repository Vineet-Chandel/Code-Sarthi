import React from 'react';
import Temp1 from '../3/Temp1';
import Temp2 from '../3/Temp2';
import Temp3 from '../3/Temp3';
import Temp4 from '../3/Temp4';
import Temp5 from '../3/Temp5';
import Temp6 from '../3/Temp6';
import Temp7 from '../3/Temp7';
import Temp8 from '../3/Temp8';
import Temp9 from '../3/Temp9';
import Temp10 from '../3/Temp10';
import Temp11 from '../3/Temp11';
// ... up to Temp50

const Templates = () => {
    // 1. Centralized Data (Same as your provided data)
    const resumeData1 = {

        name: "Aman Gupta",

        phone: "+91 98765 43210",

        github: "https://github.com/amangupta-dev",

        linkedin: "https://linkedin.com/in/aman-gupta",

        portfolio: "https://aman-portfolio.dev",

        email: "aman.dev@gmail.com",

        summaryTitle: "Full Stack Developer & UI Specialist",

        summaryBody: "passionate about crafting high-performance web applications using the MERN stack. Expert in translating complex business requirements into elegant, scalable code with a focus on user-centric design and efficient backend architecture.",

        degree: "Bachelor of Technology",

        major: "Computer Science and Engineering",

        institution: "Pranveer Singh Institute of Technology",

        location: "Kanpur",

        gradDate: "2027",

        skills: {

            frontend: "React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion",

            backend: "Node.js, Express.js, GraphQL, Socket.io",

            authentication: "NextAuth.js, Firebase Auth, OAuth 2.0",

            database: "PostgreSQL, MongoDB, Redis, Prisma ORM",

            tools: "Docker, Git, Vercel, Postman, Figma",

            deployment: "AWS S3, Netlify, Render, Vercel"

        },

        projects: [

            {

                name: "RollZone!",

                stack: "React | Tailwind CSS",

                github: "https://github.com/amangupta-dev/rollzone",

                live: "https://rollzone-game.vercel.app",

                description: "is an interactive, high-stakes Pig Dice game designed for a professional portfolio, focusing on seamless state management and a polished user interface.",

                bullets: [

                    "Engineered a <b>dynamic game engine</b> using React hooks for real-time score tracking and turn-based logic.",

                    "Implemented a <b>mobile-first responsive design</b> using Tailwind CSS to ensure compatibility across all devices.",

                    "Integrated <b>local storage persistence</b> to save player high scores and session data.",

                    "Optimized performance by reducing <b>re-renders</b>, resulting in a smooth 60fps animation experience for dice rolls."

                ]

            },

            {

                name: "DevConnect",

                stack: "Next.js | PostgreSQL",

                github: "https://github.com/amangupta-dev/devconnect",

                live: "https://devconnect-platform.app",

                description: "is a specialized networking portal for software engineers to share technical blogs and collaborate on open-source repositories.",

                bullets: [

                    "Architected a <b>relational database schema</b> using Prisma to manage complex user relationships and post metadata.",

                    "Developed a <b>server-side rendered (SSR)</b> feed to improve SEO and initial page load speed.",

                    "Built an <b>automated markdown parser</b> allowing developers to write technical posts with syntax-highlighted code blocks.",

                    "Deployed using <b>Docker containers</b> on AWS to ensure environment consistency and easy scaling."

                ]

            }

        ]
        ,
        experience: [
            {
                role: "Frontend Developer Intern",
                company: "XYZ Tech",
                location: "Remote",
                duration: "May 2025 - July 2025",
                points: [
                    "Built responsive UI using React",
                    "Improved performance by 30%"
                ]
            }
        ],
        education: [
            {
                degree: "Bachelor of Technology",
                field: "Computer Science and Engineering",
                institution: "Pranveer Singh Institute of Technology",
                location: "Kanpur, India",
                startDate: "2023",
                endDate: "2027",

                cgpa: "8.7/10", // optional
                percentage: "", // optional (for school)

                coursework: [
                    "Data Structures & Algorithms",
                    "Operating Systems",
                    "Database Management Systems",
                    "Computer Networks"
                ],

                achievements: [
                    "Top 10% of the batch",
                    "Active member of coding club"
                ]
            },

            {
                degree: "Class XII (Senior Secondary)",
                field: "PCM",
                institution: "ABC Senior Secondary School",
                location: "Lucknow, India",
                startDate: "2021",
                endDate: "2023",

                percentage: "92%",

                achievements: [
                    "School topper in Mathematics"
                ]
            }
        ],
        certifications: [
            "AWS Certified Cloud Practitioner",
            "Meta Frontend Developer Certification"
        ],
        achievements: [
            "Ranked Top 5% in LeetCode contests",
            "Winner of Hackathon XYZ",
            "Solved 500+ DSA problems"
        ],
        languages: ["English (Fluent)", "Hindi (Native)"]
    };

    // 2. Template Registry
    // Add your components to this array as you build them
    const templateList = [
        { id: 1, Component: Temp1, name: "Modern Professional" },
        { id: 2, Component: Temp2, name: "Creative Minimal" }, // Replace Temp1 with Temp2 etc.
        { id: 3, Component: Temp3, name: "Technical Executive" },
        { id: 4, Component: Temp4, name: "Focused Layout" },
        { id: 5, Component: Temp5, name: "Clean Slate" },
        { id: 6, Component: Temp6, name: "Clean Modern" },
        { id: 7, Component: Temp7, name: "Creative Contrast" },
        { id: 8, Component: Temp8, name: "Cool Overlay" },
        { id: 9, Component: Temp9, name: "Modern Functional" },
        { id: 10, Component: Temp10, name: "Classic Module" },
        { id: 11, Component: Temp11, name: "Simple Linear" },

        // To reach 50+, you can fill this array dynamically or manually
    ];



    return (
        <div className="w-full min-h-screen bg-slate-50 py-12">
            <div className='w-[98%] mx-auto bg-white  rounded-3xl p-6 md:p-12'>

                {/* Header Section */}
                <div className="w-full px-5 mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
                        Curated <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> 50+ Premium Designs.</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Professional, ATS-friendly templates designed to get you hired. Powered by dynamic prop-drilling.
                    </p>
                </div>

                {/* 4-Column Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {templateList.map((item) => (
                        <div key={item.id} className='group relative flex flex-col bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 transition-all duration-500 '>

                            {/* 
                                THE PREVIEW WRAPPER 
                                1. We set a fixed aspect ratio (Resume is roughly 1:1.41)
                                2. We use 'overflow-hidden' to clip the scaled content
                            */}
                            <div className="relative w-full aspect-[1/1.41] overflow-hidden bg-white ">

                                {/* 
                                    THE SCALED CONTENT
                                    We render the template at full width (e.g., 900px) 
                                    but scale it down to fit the grid column.
                                */}
                                <div className="absolute top-0 left-0 w-[900px]  origin-top-left transition-transform duration-500 group-hover:scale-[0.45] scale-[0.4]">
                                    <div className="pointer-events-none select-none">
                                        <item.Component data={resumeData1} />
                                    </div>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 ">
                                    <div className='absolute top-4 left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl  border-2 border-white'>
                                        #{item.id}
                                    </div>

                                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold  transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-700">
                                        Use This Template
                                    </button>
                                </div>
                            </div>

                            {/* Footer Label */}
                            <div className="p-4 bg-white flex justify-between items-center">
                                <h3 className="font-bold text-slate-700 truncate">{item.name}</h3>
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase font-black">ATS-Ready</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Templates;