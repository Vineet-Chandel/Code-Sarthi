import React from 'react';
import { ArrowLeft, Sparkles, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const WorkExperienceStep = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const resumeData = location.state?.resumeData;


    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 relative overflow-hidden flex flex-col md:flex-row items-center justify-center p-8 md:p-24">

            {/* Background Gradient Blur */}
            <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[120px] opacity-60 -z-10" />

            {/* Left Content Area */}
            <div className="flex-1 max-w-2xl">
                <p className="text-lg font-medium text-slate-700 mb-4">
                    Great progress! Next up → <span className="text-slate-500">Experience</span>
                </p>

                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8">
                    Add details about your <br />
                    <span className="relative inline-block">
                        Experience
                        <span className="absolute bottom-2 left-0 w-full h-1 bg-green-200 -z-10"></span>
                    </span>
                </h1>

                <div className="flex items-start gap-4 mb-12">
                    <div className="bg-orange-50 p-2 rounded-lg">
                        <Sparkles className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Our AI now makes writing easier!</h3>
                        <p className="text-slate-600">With writing help you can fix mistakes or rephrase sentences to suit your needs.</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-16">
                    <button className="flex items-center gap-2 text-blue-600 font-bold hover:underline" onClick={() => {
                        navigate("/app/build-resume/header-content", {
                            state: { resumeData }
                        });
                    }}>
                        <ArrowLeft size={20} />
                        Back
                    </button>

                    <div className="relative">
                        {/* Simple SVG for the curved arrow */}
                        <svg className="absolute -top-12 -left-12 w-16 h-12 text-slate-400" viewBox="0 0 100 100" fill="none">
                            <path d="M10 10 C 50 10, 50 80, 90 80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                            <path d="M85 75 L 95 80 L 85 85" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <button className="bg-blue-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200" onClick={() => {
                            navigate("/app/build-resume/experience-content", {
                                state: { resumeData }
                            });
                        }}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Resume Preview Area */}
            <div className="flex-1 flex flex-col items-center justify-center mt-12 md:mt-0 relative">
                <div className="relative bg-white shadow-2xl border border-slate-200 p-4 w-[350px] md:w-[450px] transform rotate-1">
                    {/* Resume Content Mockup */}
                    <div className="border-t-8 border-slate-800 pt-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-slate-100" />
                            </div>
                            <div className="h-4 w-32 bg-slate-200 rounded" />
                        </div>

                        {/* Highlighted Section */}
                        <div className="border-2 border-orange-300 bg-orange-50/30 p-3 rounded-sm mb-4">
                            <div className="h-3 w-20 bg-slate-400 mb-2" />
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-slate-200" />
                                <div className="h-2 w-5/6 bg-slate-200" />
                                <div className="h-2 w-4/6 bg-slate-200" />
                            </div>
                        </div>

                        <div className="space-y-4 opacity-40">
                            <div className="h-2 w-full bg-slate-200" />
                            <div className="h-2 w-3/4 bg-slate-200" />
                        </div>
                    </div>

                    {/* Zoom Button */}
                    <button className="absolute bottom-4 right-4 bg-orange-200 p-3 rounded-full hover:bg-orange-300 transition-colors">
                        <Search className="w-6 h-6 text-slate-800" />
                    </button>
                </div>

                <button className="mt-8 text-blue-600 font-bold hover:underline">
                    Change template
                </button>
            </div>
        </div>
    );
};

export default WorkExperienceStep;