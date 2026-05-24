import React from 'react'
import { Layout, Sparkles, Download, CheckCircle2 } from 'lucide-react'; // Optional: icon library
import { useNavigate } from 'react-router-dom';
import Temp1 from '../3/Temp1';
import Temp2 from '../3/Temp2';
import Temp3 from '../3/Temp3';
import Temp4 from '../3/Temp4';
import CTAcreateResume from './CTAcreateResume';


const Choose = () => {
    const resumeData1 = {

        fname: "Aman",

        lname: "Gupta",

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

    const Navigate = useNavigate();
    return (
        <div className='w-full  bg-base-100  font-sans flex flex-col justify-center items-center'>

            <div className='w-[98%] h-full bg-base-100 rounded-xl '>
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight  text-info mb-4">
                        Choose Your <span className="text-accent-content ">Professional {" "}</span>.
                    </h1>
                    <p className="text-lg text-info mb-2 max-w-[100%] mx-auto">Select one of the ATS-friendly <span className='font-extrabold text-info underline underline-offset-8 decoration-primary decoration-2 cursor-pointer' onClick={() => Navigate("/app/resume-templates")}>resume templates</span>  below. Fill it in with AI-generated text inspired by your work experience.</p>
                    <p className="text-lg text-info mb-2 max-w-[100%] mx-auto">These professional templates have been tested in the real world and proven to bypass HR screening software. Rest easy knowing that your resume will land in human hands.</p>
                    <p className="text-lg text-info mb-2 max-w-[100%] mx-auto">You can try <span className='font-extrabold text-info underline underline-offset-8 decoration-primary decoration-2 cursor-pointer' onClick={() => Navigate("/app/how-resume")}>CodeSarthi’s AI Resume Builder</span> for free. Easily create a resume in the builder and download it as a TXT file. Then, when you’re ready to try a premium template, you can upgrade your free resume.</p>
                </div>

                {/* Steps Grid */}
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4'>

                    {/* Step 1 */}
                    <div className='group relative flex flex-col bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 transition-all duration-500 '>


                        <div className="relative w-full aspect-[1/1.41] overflow-hidden bg-white ">

                            <div className="absolute top-0 left-0 w-[900px]  origin-top-left transition-transform duration-500 group-hover:scale-[0.45] scale-[0.4]">
                                <div className="pointer-events-none select-none">
                                    <Temp1 data={resumeData1} />
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 ">


                                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold  transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-700">
                                    Use This Template
                                </button>
                            </div>
                        </div>

                    </div>
                    {/* Step 1 */}
                    <div className='group relative flex flex-col bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 transition-all duration-500 '>


                        <div className="relative w-full aspect-[1/1.41] overflow-hidden bg-white ">

                            <div className="absolute top-0 left-0 w-[900px]  origin-top-left transition-transform duration-500 group-hover:scale-[0.45] scale-[0.4]">
                                <div className="pointer-events-none select-none">
                                    <Temp2 data={resumeData1} />
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 ">


                                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold  transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-700">
                                    Use This Template
                                </button>
                            </div>
                        </div>

                    </div>
                    {/* Step 1 */}
                    <div className='group relative flex flex-col bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 transition-all duration-500 '>


                        <div className="relative w-full aspect-[1/1.41] overflow-hidden bg-white ">

                            <div className="absolute top-0 left-0 w-[900px]  origin-top-left transition-transform duration-500 group-hover:scale-[0.45] scale-[0.4]">
                                <div className="pointer-events-none select-none">
                                    <Temp3 data={resumeData1} />
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 ">


                                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold  transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-700">
                                    Use This Template
                                </button>
                            </div>
                        </div>

                    </div>
                    {/* Step 1 */}
                    <div className='group relative flex flex-col bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 transition-all duration-500 '>


                        <div className="relative w-full aspect-[1/1.41] overflow-hidden bg-white ">

                            <div className="absolute top-0 left-0 w-[900px]  origin-top-left transition-transform duration-500 group-hover:scale-[0.45] scale-[0.4]">
                                <div className="pointer-events-none select-none">
                                    <Temp4 data={resumeData1} />
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 ">


                                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold  transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-700">
                                    Use This Template
                                </button>
                            </div>
                        </div>

                    </div>


                </div>

                {/* CTA Section */}
                <div className='mt-20 flex flex-col items-center gap-6 mb-20'>
                    <CTAcreateResume />

                </div>
            </div>

        </div>
    );
}

export default Choose