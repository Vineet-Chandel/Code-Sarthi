import React from 'react';

const FEATURES = [
    {
        title: "New, professional designs",
        description: "Choose from a wide range of styles for every job level and type. From fun and creative to simple and modern, we offer designs for all types of job seekers.",
        image: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777480434/Professional_Resume_Designs_ok7fmt.avif",
    },
    {
        title: "ATS-friendly",
        description: "Employers use applicant tracking systems (ATS) to filter out candidates. With our templates, you’ll have an ATS-friendly resume that will help you stand out.",
        image: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777480743/ats-friendly-resume_cjelzm.avif",
    },
    {
        title: "AI-powered content",
        description: "Get AI-generated content suggestions, refined by our career experts, for maximum impact on your resume.",
        image: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777482374/AI_Resume_Content_n72qco.avif",
    },
    {
        title: "Unlimited resumes",
        description: "Make and edit unlimited resumes, experiment with multiple templates, and download your resumes in various file formats.",
        image: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777482551/Unlimited_Resumes_xk6vkx.avif",
    },
    {
        title: "Step-by-step support",
        description: "Our Resume Creator provides detailed tips and advice throughout the process, with customer support ready to assist you anytime.",
        image: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777482312/Resume_Builder_Support_kzt7s7.avif",
    },
    {
        title: "Matching cover letter",
        description: "Easily create a memorable cover letter with customizable suggested text in our Cover Letter Generator. Then, choose a design that aligns with your resume for a cohesive professional look.",
        image: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777482232/Matching_Cover_Letter_with_Resume_dxuish.avif",
    },
];

const WhyWe = () => {
    return (
        <section className="w-screen bg-base-200 font-sans flex justify-center items-center ">
            {/* External Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet" />

            <div className="w-[95%]  bg-base-100  p-8 md:p-16 shadow-sm">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                        Why Choose <span className="text-blue-600">Our</span> Resume Builder?
                    </h2>
                </div>

                {/* Features List */}
                <div className="space-y-10">
                    {FEATURES.map((feature, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row items-center gap-6 ${isEven ? '' : 'md:flex-row-reverse'}`}
                            >
                                {/* Text Content */}
                                <div className="w-full md:w-1/2 ">
                                    <h3 className="text-4xl font-bold text-primary font-['DM_Sans'] leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-2xl font-medium text-slate-700 font-['DM_Sans'] leading-relaxed max-w-xl">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Image Content */}
                                <div className="w-full md:w-1/2 flex justify-center">
                                    <div className="relative group">
                                        <img
                                            className="w-full max-w-md object-contain transition-transform duration-500 group-hover:scale-105"
                                            src={feature.image}
                                            alt={feature.title}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyWe;