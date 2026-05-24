import React from 'react';
import { Layout, Sparkles, Download, } from 'lucide-react'; // Optional: icon library
import { useNavigate } from 'react-router-dom';
import CTAcreateResume from './CTAcreateResume';

const Block = () => {
    const Navigate = useNavigate();



    const data = [
        {
            icon: (<Layout className="text-white w-8 h-8" />),
            title: "Choose a Template",
            step1: "ATS-friendly and recruiter-approved",
            step2: "Modern and flexible layouts",
            step3: "Tailored for your job and industry"
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24">
                    <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                </svg>
            ),
            title: "Enhance with AI",
            step1: "Overcome writer’s block instantly",
            step2: "Improve resume bullet points with AI",
            step3: "Update your experience effortlessly"
        },

        {
            icon: (<Download className="text-white w-8 h-8" />),
            title: "Download & Apply",
            step1: "Export in PDF and Word formats",
            step2: "Create unlimited resume versions",
            step3: "Ready to use in under 5 minutes"
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                        fill="#fff"
                        d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m8 18v-1c0-1.33-2.67-2-4-2s-4 .67-4 2v1zm-4-8a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                    />
                </svg>
            ),

            title: "Why Choose Only Resume?",
            step1: "Get a professionally written cover letter",
            step2: "Receive detailed resume analysis",
            step3: "Get personalized improvement suggestions"
        }
    ];
    return (
        <div className='w-full  mt-20 bg-base-200  font-sans flex justify-center items-center'>

            <div className='w-[95%] h-full bg-base-100 rounded-xl '>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-info">
                        Resume Now Brings Expert-Driven Insight to <span className='text-white underline underline-offset-8'>Your Job Search</span>
                    </h1>
                    <p className="text-lg text-info mt-3">Explore our recently updated guides to help you refine and modernize your resume. Discover valuable tips and strategies for today’s job market.</p>
                </div>

                {/* Steps Grid */}
                <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4'>

                    {data.map((e, index) => (
                        <div
                            key={index}
                            className='group bg-base-200 py-8 px-5 rounded-3xl shadow-sm border border-accent hover:shadow-xl transition-all duration-300 flex flex-col'
                        >
                            <div className='w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                                {e.icon}
                            </div>

                            <h3 className='text-2xl font-bold text-secondary-content mb-4'>
                                {e.title}
                            </h3>

                            <ul className='space-y-1 text-info flex-grow'>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                                            <circle cx={18.5} cy={4.5} r={2}></circle>
                                            <circle cx={4.5} cy={18.5} r={2}></circle>
                                            <path d="M4.5 16.5c0-6.627 5.373-12 12-12m-3.459 14.805l-1.792-5.15c-.674-1.936-1.011-2.905-.505-3.411c.507-.506 1.476-.17 3.414.504l5.143 1.788c1.075.373 1.613.56 1.729.922a.8.8 0 0 1 .032.31c-.039.377-.526.671-1.5 1.26c-.27.163-.483.29-.643.407c-.125.09-.187.135-.206.365s.07.32.248.497l2.127 2.127a1.406 1.406 0 0 1 0 1.988l-.166.166a1.44 1.44 0 0 1-2.039 0l-2.1-2.1c-.179-.18-.268-.27-.5-.25c-.23.02-.276.084-.368.212c-.112.157-.236.362-.393.623c-.58.963-.87 1.445-1.244 1.487a.8.8 0 0 1-.326-.034c-.356-.118-.54-.649-.91-1.711"></path>
                                        </g>
                                    </svg>

                                    {e.step1}
                                </li>

                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                                            <circle cx={18.5} cy={4.5} r={2}></circle>
                                            <circle cx={4.5} cy={18.5} r={2}></circle>
                                            <path d="M4.5 16.5c0-6.627 5.373-12 12-12m-3.459 14.805l-1.792-5.15c-.674-1.936-1.011-2.905-.505-3.411c.507-.506 1.476-.17 3.414.504l5.143 1.788c1.075.373 1.613.56 1.729.922a.8.8 0 0 1 .032.31c-.039.377-.526.671-1.5 1.26c-.27.163-.483.29-.643.407c-.125.09-.187.135-.206.365s.07.32.248.497l2.127 2.127a1.406 1.406 0 0 1 0 1.988l-.166.166a1.44 1.44 0 0 1-2.039 0l-2.1-2.1c-.179-.18-.268-.27-.5-.25c-.23.02-.276.084-.368.212c-.112.157-.236.362-.393.623c-.58.963-.87 1.445-1.244 1.487a.8.8 0 0 1-.326-.034c-.356-.118-.54-.649-.91-1.711"></path>
                                        </g>
                                    </svg>

                                    {e.step2}
                                </li>

                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                                            <circle cx={18.5} cy={4.5} r={2}></circle>
                                            <circle cx={4.5} cy={18.5} r={2}></circle>
                                            <path d="M4.5 16.5c0-6.627 5.373-12 12-12m-3.459 14.805l-1.792-5.15c-.674-1.936-1.011-2.905-.505-3.411c.507-.506 1.476-.17 3.414.504l5.143 1.788c1.075.373 1.613.56 1.729.922a.8.8 0 0 1 .032.31c-.039.377-.526.671-1.5 1.26c-.27.163-.483.29-.643.407c-.125.09-.187.135-.206.365s.07.32.248.497l2.127 2.127a1.406 1.406 0 0 1 0 1.988l-.166.166a1.44 1.44 0 0 1-2.039 0l-2.1-2.1c-.179-.18-.268-.27-.5-.25c-.23.02-.276.084-.368.212c-.112.157-.236.362-.393.623c-.58.963-.87 1.445-1.244 1.487a.8.8 0 0 1-.326-.034c-.356-.118-.54-.649-.91-1.711"></path>
                                        </g>
                                    </svg>

                                    {e.step3}
                                </li>
                            </ul>
                        </div>
                    ))}



                </div>
                {/* CTA Section */}
                <div className='mt-10 flex flex-col items-center gap-6 mb-10'>
                    <CTAcreateResume />

                </div>
            </div>
        </div>
    );
};

export default Block;