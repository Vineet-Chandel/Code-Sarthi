import React from 'react'



const faqs1 = [
    {
        question: "What is CodeSarthi?",
        answer:
            "CodeSarthi is an AI-powered career and collaboration platform that helps you build resumes, prepare for interviews, collaborate with teams, and boost productivity from a single workspace."
    },

    {
        question: "What can I do with CodeSarthi?",
        answer:
            "Create ATS-friendly resumes, analyze resumes, build your career profile, practice interviews, collaborate with teammates, communicate in real time, and automate everyday workflows using AI."
    },

    {
        question: "What is Shastra AI?",
        answer:
            "Shastra is your built-in AI assistant that provides career guidance, resume improvements, interview coaching, content generation, and intelligent recommendations tailored to your goals."
    },

    {
        question: "How does the AI Resume Builder work?",
        answer:
            "Enter your education, experience, skills, and projects, and CodeSarthi instantly generates a professional, ATS-optimized resume customized for your target role."
    }
];

const faqs2 = [
    {
        question: "What does the ATS Resume Analyzer do?",
        answer:
            "It evaluates your resume for ATS compatibility, highlights missing keywords, identifies formatting issues, and suggests improvements to maximize interview opportunities."
    },

    {
        question: "Can CodeSarthi help me prepare for interviews?",
        answer:
            "Yes. Practice technical and HR interviews with AI, receive instant feedback, improve your responses, and prepare confidently for real-world hiring processes."
    },

    {
        question: "What is Career Profile Creation?",
        answer:
            "Create a professional digital profile that showcases your education, projects, certifications, skills, achievements, and work experience in one shareable portfolio."
    },

    {
        question: "Does CodeSarthi support team collaboration?",
        answer:
            "Yes. Collaborate through real-time chat, voice and video meetings, shared workspaces, file sharing, and AI-powered productivity tools designed for modern teams."
    }
];

const faqs3 = [
    {
        question: "How does CodeSarthi improve team productivity?",
        answer:
            "AI automates repetitive tasks like planning, documentation, meeting summaries, and task management, allowing teams to spend more time building and less time coordinating."
    },

    {
        question: "Who is CodeSarthi designed for?",
        answer:
            "CodeSarthi is built for students, job seekers, professionals, freelancers, startups, recruiters, educators, and organizations looking to work smarter with AI."
    },

    {
        question: "Is my data safe on CodeSarthi?",
        answer:
            "Absolutely. Your resumes, files, conversations, and personal information are protected using modern security standards with privacy as a core priority."
    },

    {
        question: "Can I use CodeSarthi on any device?",
        answer:
            "Yes. Access CodeSarthi from any modern browser and continue working, collaborating, or preparing for your career anytime, anywhere."
    }
];


const cards = [
    {
        unit: "UNIT-01",
        title: "ASTRA",
        role: "Verification Guardian",
        quote: "Trust is verified in silence",
        img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989004/CS_Verification_Manager_uohza5.webp",
        color: "#00e5ff",        // ice-cyan
        glow: "rgba(0,229,255,0.22)",
        dimGlow: "rgba(0,229,255,0.07)",
        status: "ACTIVE",
        tag: "VERIFICATION",
    },
    {
        unit: "UNIT-02",
        title: "NOVA",
        role: "Identity Guardian",
        quote: "Your digital identity, reconstructed",
        img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989004/CS_Identity_Manager_amyjyi.webp",
        color: "#ffb830",        // amber-gold
        glow: "rgba(255,184,48,0.22)",
        dimGlow: "rgba(255,184,48,0.07)",
        status: "ACTIVE",
        tag: "IDENTITY",
    },
    {
        unit: "UNIT-03",
        title: "ORION",
        role: "Community & AI Guardian",
        quote: "Every developer is a signal",
        img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989003/CS_Community_AI_Manager_z664dg.webp",
        color: "#bf7fff",        // violet
        glow: "rgba(191,127,255,0.22)",
        dimGlow: "rgba(191,127,255,0.07)",
        status: "ACTIVE",
        tag: "COMMUNITY",
    },
    {
        unit: "UNIT-04",
        title: "ZENITH",
        role: "Help & Support Guardian",
        quote: "No noise. Only solutions",
        img: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1778989005/CS_Help_Support_onbjoi.webp",
        color: "#00ff87",        // brand-green
        glow: "rgba(0,255,135,0.22)",
        dimGlow: "rgba(0,255,135,0.07)",
        status: "ACTIVE",
        tag: "SUPPORT",
    },
];
const ContentSecond2 = () => {
    return (
        <div className='w-full flex flex-col items-center  bg-black' >
            <div className=' w-[90%] xl:w-[70%] ml-5 mb-10'>
                <h2
                    className="
                    font-poppins
                    font-semibold
                    text-2xl
                    sm:text-3xl
                    lg:text-5xl
                    leading-tight
                    text-white
mt-10

                  
                "
                >
                    Frequently asked questions
                </h2>

                <p className='text-md mt-3 text-gray-300 text-start w-full sm:w-1/2'  >We are here to help you with any questions you may have. If you don't find what you need, please contact us at</p>
                <p className='underline underline-offset-8 text-blue-500 mt-1'>codesarthi.help@gmail.com</p>

            </div>


            <div className='w-[90%] xl:w-[1150px] sm:flex-row flex-col flex gap-3 pb-10'>
                <div className=' w-full sm:w-2/3 sm:flex-row  flex-col flex gap-3'>

                    <div className='flex flex-col gap-3  w-full sm:w-1/2'>
                        {faqs1.map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-white/20  bg-white/10 p-6 hover:shadow-lg transition-all duration-300 h-auto"
                            >
                                <h3 className="text-xl text-white font-bold mb-3">
                                    {faq.question}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col gap-3 w-full sm:w-1/2'>
                        {faqs2.map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-white/20  bg-white/10 p-6 hover:shadow-lg transition-all duration-300 h-asuto"
                            >
                                <h3 className="text-xl text-white font-bold mb-3">
                                    {faq.question}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


                <div className='flex flex-col gap-3 w-full sm:w-1/3'>
                    {faqs3.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-white/20  bg-white/10 p-6 hover:shadow-lg transition-all duration-300 h-auto"
                        >
                            <h3 className="text-xl text-white font-bold mb-3">
                                {faq.question}
                            </h3>

                            <p className="text-gray-400 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>


            </div>

            <div className=' w-[90%] xl:w-[70%] ml-5 mb-10'>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {cards.map((items, index) => (<>

                        <div className='h-[400px] w-full bg-white/10 border border-white/20 rounded-3xl'>
                        </div>
                    </>))}

                </div>

            </div>




        </div >
    )
}

export default ContentSecond2