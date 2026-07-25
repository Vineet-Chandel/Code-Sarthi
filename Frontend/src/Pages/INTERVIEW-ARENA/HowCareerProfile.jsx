import React from 'react'

const HowCareerProfile = () => {
    const resumeCompletionChecklist = [
        {
            id: 1,
            title: "Where can recruiters reach you?",
            description: "Add your contact details first.",
            section: "contact",
            action: "Add Contact Details",
            completed: false,
            icon: "contact"
        },
        {
            id: 2,
            title: "What's your career elevator pitch?",
            description: "Include it in your professional summary or resume objective.",
            section: "professional-summary",
            action: "Write Professional Summary",
            completed: false,
            icon: "summary"
        },
        {
            id: 3,
            title: "What have you done that makes you a perfect fit for the new role?",
            description: "Showcase the most impressive accomplishments from your work experience.",
            section: "experience",
            action: "Add Work Experience",
            completed: false,
            icon: "experience"
        },
        {
            id: 4,
            title: "What are your relevant skills?",
            description: "Display your top skills in a dedicated section.",
            section: "skills",
            action: "Add Skills",
            completed: false,
            icon: "skills"
        },
        {
            id: 5,
            title: "How did you develop your expertise?",
            description: "Present your education with degrees, certifications, and special training.",
            section: "education",
            action: "Add Education",
            completed: false,
            icon: "education"
        }
    ];
    return (
        <div className='   flex items-center gap-10 justify-center mx-auto'>
            <div className='w-[45%] '>
                <img className='w-full' src="https://res.cloudinary.com/dj0ivep44/image/upload/v1784994346/resume-examples-anatomy-image_n9yxhz.avif" alt="" />
            </div>
            <div className='w-[55%] '>
                <div className="w-full  mb-14 text-center md:text-start mt-10">
                    <h2 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white mb-4">
                        How to Customize the Career Profile
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg w-[80%] leading-relaxed">
                        Your career page is your professional highlight reel. Here’s how to customize it to impress recruiters and stand out from the crowd.
                    </p>
                </div>

                <div className="space-y-5 ml-[50px]">


                    {resumeCompletionChecklist.map((item) => (
                        <div
                            key={item.id}
                            className="relative rounded-2xl  p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
                        >
                            <div className="absolute -top-2 -left-2">
                                <div className="relative w-[35px] h-[35px]">
                                    <img
                                        className="w-full h-full"
                                        src="https://res.cloudinary.com/dj0ivep44/image/upload/v1784996512/orange-circle_sgm0gg.png"
                                        alt=""
                                    />

                                    <span className="absolute inset-0 flex items-center justify-center text-black text-md font-bold">
                                        {item.id}
                                    </span>
                                </div>
                            </div>
                            <div className=" flex items-start justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-base leading-7 text-white/90">
                                        {item.description}
                                    </p>


                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HowCareerProfile