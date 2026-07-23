import React from 'react'
import Temp6 from '../Pages/CARRER-PROFILE-CREATION/3/Temp6'

const Collab = () => {

    const data = {
        fname: "Aman",
        lname: "Gupta",
        phone: "+91 98765 43210",
        github: "https://github.com/amangupta-dev",
        linkedin: "https://linkedin.com/in/aman-gupta",
        portfolio: "https://aman-portfolio.dev",
        email: "aman.dev@gmail.com",
        summaryTitle: "Full Stack Developer & UI Specialist",
        summaryBody:
            "passionate about crafting high-performance web applications using the MERN stack. Expert in translating complex business requirements into elegant, scalable code with a focus on user-centric design and efficient backend architecture.",
        location: "Kanpur,India",
        pincode: "208024",
        skills: [
            {
                skillCategory: "Frontend",
                skills: "React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion"
            },
            {
                skillCategory: "Backend",
                skills: "Node.js, Express.js, GraphQL, Socket.io"
            },
            {
                skillCategory: "Authentication",
                skills: "NextAuth.js, Firebase Auth, OAuth 2.0"
            },
            {
                skillCategory: "Database",
                skills: "PostgreSQL, MongoDB, Redis, Prisma ORM"
            },
            {
                skillCategory: "Tools",
                skills: "Docker, Git, Vercel, Postman, Figma"
            },
            {
                skillCategory: "Deployment",
                skills: "AWS S3, Netlify, Render, Vercel"
            }
        ],
        projects: [
            {
                name: "RollZone!",
                stack: "React | Tailwind CSS",
                github: "https://github.com/amangupta-dev/rollzone",
                live: "https://rollzone-game.vercel.app",
                description: "is an interactive, high-stakes Pig Dice game designed for a professional portfolio.",
                bullets: [
                    "Engineered a <b>dynamic game engine</b> using React hooks.",
                    "Implemented a <b>mobile-first responsive design</b> using Tailwind CSS.",
                    "Integrated <b>local storage persistence</b> to save player scores.",
                    "Optimized performance resulting in a smooth 60fps animation experience.",
                ],
            },
            {
                name: "DevConnect",
                stack: "Next.js | PostgreSQL",
                github: "https://github.com/amangupta-dev/devconnect",
                live: "https://devconnect-platform.app",
                description: "is a specialized networking portal for software engineers.",
                bullets: [
                    "Architected a <b>relational database schema</b> using Prisma ORM.",
                    "Developed a <b>server-side rendered (SSR)</b> feed for SEO.",
                    "Built an <b>automated markdown parser</b> with syntax highlighting.",
                    "Deployed using <b>Docker containers</b> on AWS.",
                ],
            },
        ],
        experience: [
            {
                role: "Frontend Developer",
                company: "XYZ Tech",
                location: "Remote",
                startDate: "2025",
                endDate: "2027",
                currentlyWorking: false,
                employmentType: "Internship",
                bullets: ["Built responsive UI using React", "Improved performance by 30%"],
            },
        ],
        education: [
            {
                degree: "Bachelor of Technology",
                field: "Computer Science and Engineering",
                institution: "Pranveer Singh Institute of Technology",
                location: "Kanpur, India",
                startDate: "2023",
                endDate: "2027",
                cgpa: "8.7/10",
                bullets: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks"],
            },
            {
                degree: "Class XII (Senior Secondary)",
                field: "PCM",
                institution: "ABC Senior Secondary School",
                location: "Lucknow, India",
                startDate: "2021",
                endDate: "2023",
                percentage: "92%",
            },
        ],


        certifications: [{ about: "AWS Certified Cloud Practitioner", link: "" }, { about: "Meta Frontend Developer Certification", link: "" }],
        achievements: ["Ranked Top 5% in LeetCode contests", "Winner of Hackathon XYZ", "Solved 500+ DSA problems"],
        languages: [{ langCategory: "English ", status: "Fluent" }, { langCategory: "Hindi ", status: "Native" },],
        Social_Links: ["www.insta.com", "www.protfolio.com"]
    };
    return (
        <div><Temp6 data={data} /></div>

    )
}

export default Collab