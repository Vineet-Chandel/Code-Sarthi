import React from 'react';
import { Layout, Sparkles, Download, } from 'lucide-react'; // Optional: icon library
import { useNavigate } from 'react-router-dom';
import CTAcreateResume from './CTAcreateResume';

const Block = () => {
    const Navigate = useNavigate();



    const data = [
        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 512 512">
                <path fill="#fff" d="M256 29c-17.3 0-34.7 1.98-48.1 5.68c-13.4 3.69-22 9.64-23.8 13.35c-29 57.97-30.9 130.57-31 178.97h205.8c-.1-48.4-2-121-31-178.97c-1.8-3.71-10.4-9.66-23.8-13.35C290.7 30.98 273.3 29 256 29M48 167v18h48v-18zm368 0v18h48v-18zM71 204v68.8l31.2 20.8c1.6-6 4.2-11.6 7.3-16.7L89 263.2V204zm352 0v59.2l-20.5 13.7c3.1 5.1 5.7 10.7 7.3 16.7l31.2-20.8V204zm-190 41v14h46v-14zm-100.9 32c-6.2 6.9-11.9 16.4-13.2 24.5c-1.5 8.7-.2 15.1 11.4 21.5h251.4c11.6-6.4 12.9-12.8 11.4-21.5c-1.3-8.1-7-17.6-13.2-24.5zM247 341v32l-121.2 30.3l4.4 17.4L247 391.5V420c2.9-.6 5.9-1 9-1s6.1.4 9 1v-28.5l116.8 29.2l4.4-17.4L265 373v-32zm-119 96c-12.8 0-23 10.2-23 23s10.2 23 23 23s23-10.2 23-23s-10.2-23-23-23m128 0c-12.8 0-23 10.2-23 23s10.2 23 23 23s23-10.2 23-23s-10.2-23-23-23m128 0c-12.8 0-23 10.2-23 23s10.2 23 23 23s23-10.2 23-23s-10.2-23-23-23"></path>
            </svg>),
            title: "Built by career experts",
            step1: "Resume Now is built on the expertise of our team of professional resume writers, career advisors, and experts."

        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24">
                    <path fill="#fff" d="M17 16.27v-5.772a1.3 1.3 0 0 0 .87 1.228l.011.004l.773.251a.58.58 0 0 1 .362.364v.002l.252.773l.004.011a1.3 1.3 0 0 0 1.728.77v4.345a2.75 2.75 0 0 1-2.75 2.75H5.75A2.75 2.75 0 0 1 3 18.246v-12.5a2.75 2.75 0 0 1 2.75-2.75h6.417l-.124.04l-.012.005a1.544 1.544 0 0 0 0 2.912l.011.004l1.386.45a1.84 1.84 0 0 1 1.16 1.165l.001.001l.45 1.385l.005.012c.09.258.249.486.456.663v6.637c0 .403.336.73.75.73a.74.74 0 0 0 .75-.73M7 9.746v6.507c0 .412.336.746.75.746s.75-.334.75-.746V9.746A.75.75 0 0 0 7.75 9a.75.75 0 0 0-.75.747m4.25 2.984v3.547a.74.74 0 0 0 .75.72c.404-.005.754-.333.75-.734v-3.548a.74.74 0 0 0-.75-.719c-.404.004-.754.332-.75.734m3.838-6.318a2.84 2.84 0 0 0-1.347-.955l-1.378-.448a.544.544 0 0 1 0-1.025l1.378-.448A2.84 2.84 0 0 0 15.5 1.774l.011-.034l.448-1.377a.544.544 0 0 1 1.027 0l.447 1.377a2.84 2.84 0 0 0 1.799 1.796l1.377.448l.028.007a.544.544 0 0 1 0 1.025l-1.378.448a2.84 2.84 0 0 0-1.798 1.796l-.448 1.377l-.013.034a.544.544 0 0 1-1.013-.034l-.448-1.377a2.8 2.8 0 0 0-.45-.848m7.695 3.801l-.766-.248a1.58 1.58 0 0 1-.998-.999l-.25-.764a.302.302 0 0 0-.57 0l-.248.764a1.58 1.58 0 0 1-.984.999l-.765.248a.302.302 0 0 0 0 .57l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.302.302 0 0 0 0-.57z"></path>
                </svg>
            ),
            title: "Supported by data",
            step1: "Our career studies and surveys give you the data you need to succeed in a constantly evolving job market.",

        },

        {
            icon: (<svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 512 512">
                <path fill="#fff" d="M121.72 32a4 4 0 0 0-3.72 5.56l2.3 5.43l40.7 94.9a4 4 0 0 0 6.88.82L243 38.4a4 4 0 0 0-3.2-6.4Zm298.21 26.06l-41.28 96.37a4 4 0 0 0 3.68 5.57h101a4 4 0 0 0 3.4-6.11L427 57.53a4 4 0 0 0-7.07.53M85 57.57l-59.71 96.32a4 4 0 0 0 3.4 6.11h101a4 4 0 0 0 3.67-5.58L92 58.1a4 4 0 0 0-7-.53M393.27 32H267.82a1.94 1.94 0 0 0-1.56 3.11l79.92 106.46a1.94 1.94 0 0 0 3.34-.4L391.6 43l3.4-8.34a1.92 1.92 0 0 0-1.7-2.66ZM239 448l-89.43-253.49A3.78 3.78 0 0 0 146 192H25.7a3.72 3.72 0 0 0-2.95 6l216 279.81a5.06 5.06 0 0 0 6.39 1.37a5 5 0 0 0 2.39-6.08Zm247.3-256H366a3.75 3.75 0 0 0-3.54 2.51l-98.2 278.16a5.21 5.21 0 0 0 2.42 6.31a5.22 5.22 0 0 0 6.61-1.39L489.25 198a3.72 3.72 0 0 0-2.95-6M259.2 78.93l56 74.67a4 4 0 0 1-3.2 6.4H200a4 4 0 0 1-3.2-6.4l56-74.67a4 4 0 0 1 6.4 0m-7 310.31l-67.7-191.91a4 4 0 0 1 3.77-5.33h135.46a4 4 0 0 1 3.77 5.33l-67.73 191.91a4 4 0 0 1-7.54 0Z"></path>
            </svg>),
            title: "Committed to quality",
            step1: "All of Resume Now’s content follows a rigorous editorial process to ensure quality, accessibility, and credibility",
        },


    ];
    return (
        <div className='w-full  mt-20 mb-20 bg-base-100  font-sans flex justify-center items-center'>

            <div className='w-[95%] h-full bg-base-100 rounded-xl '>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-info">
                        Resume Now Brings Expert-Driven Insight to <span className='text-white underline underline-offset-8'>Your Job Search</span>
                    </h1>
                    <p className="text-lg text-info mt-3">Explore our recently updated guides to help you refine and modernize your resume. Discover valuable tips and strategies for today’s job market.</p>
                </div>

                {/* Steps Grid */}
                <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>

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


                                    {e.step1}
                                </li>




                            </ul>
                        </div>
                    ))}



                </div>

            </div>
        </div>
    );
};

export default Block;