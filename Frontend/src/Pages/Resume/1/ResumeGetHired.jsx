import React from 'react';
import { Layout, Download } from 'lucide-react'; // Optional: icon library
import { useNavigate } from 'react-router-dom';
import CTAcreateResume from './CTAcreateResume';

const ResumeGetHired = () => {
    const Navigate = useNavigate();

    const data = [
        {
            icon: (<Layout className="text-white w-8 h-8" />),
            title: "Career Profile Builder",
            step1: "Build your profile once, generate resumes forever",
            step2: "Store projects, skills, experience & achievements",
            step3: "AI understands your complete career journey"
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"> <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path> </svg>
            ),
            title: "AI Resume Builder",
            step1: "Paste any Job Description",
            step2: "Generate ATS-optimized resumes instantly",
            step3: "Highlight the most relevant experience automatically"
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"> <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path> </svg>),
            title: "Resume Defense AI™",
            step1: "Practice questions based on YOUR resume",
            step2: "Defend every project, metric & achievement",
            step3: "Prepare for real interviews before applying"
        },

        {
            icon: (

                <svg width="2.2em" height="2.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L4.6797 10.8496C4.34718 10.434 4.18092 10.2262 4.13625 9.9757C4.09159 9.72524 4.17575 9.47276 4.34407 8.96778L5.0883 6.73509C5.52832 5.41505 5.74832 4.75503 6.2721 4.37752C6.79587 4 7.49159 4 8.88304 4H15.117C16.5084 4 17.2041 4 17.7279 4.37752C18.2517 4.75503 18.4717 5.41505 18.9117 6.73509L19.6559 8.96778C19.8243 9.47276 19.9084 9.72524 19.8637 9.9757C19.8191 10.2262 19.6528 10.434 19.3203 10.8496L12 20Z" fill="#fff" fill-opacity="0.25" />
                    <path d="M12 20L4.6797 10.8496C4.34718 10.434 4.18092 10.2262 4.13625 9.9757C4.09159 9.72524 4.17575 9.47276 4.34407 8.96778L5.0883 6.73509C5.52832 5.41505 5.74832 4.75503 6.2721 4.37752C6.79587 4 7.49159 4 8.88304 4H15.117C16.5084 4 17.2041 4 17.7279 4.37752C18.2517 4.75503 18.4717 5.41505 18.9117 6.73509L19.6559 8.96778C19.8243 9.47276 19.9084 9.72524 19.8637 9.9757C19.8191 10.2262 19.6528 10.434 19.3203 10.8496L12 20ZM12 20L15.5 9M12 20L8.5 9M19.5 10L15.5 9M15.5 9L14 5M15.5 9H8.5M10 5L8.5 9M8.5 9L4.5 10" stroke="#fff" stroke-width="1.4" stroke-linecap="round" />
                </svg>

            ),
            title: "Interview Ready",
            step1: "Generate tailored cover letters instantly",
            step2: "Receive personalized interview preparation",
            step3: "Apply with confidence, not guesswork"
        }
    ];
    return (
        <div className='w-full  bg-base-100 mb-10 font-sans flex justify-center items-center'>

            <div className='w-[95%] h-full bg-base-100 rounded-xl '>


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



            </div>
        </div>
    );
};

export default ResumeGetHired;