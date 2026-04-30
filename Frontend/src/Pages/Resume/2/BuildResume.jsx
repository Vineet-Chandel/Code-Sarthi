import React from 'react'
import { Layout, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom'


const BuildResume = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-screen overflow-y-auto  bg-base-200  font-sans flex justify-center items-center'>

            <div className='w-[95%] h-[95%] overflow-y-auto  bg-base-100 rounded-xl '>
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-16 mt-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
                        Here’s how we  <span className="text-blue-600 underline">Gets You Hired.</span>
                    </h1>

                </div>

                {/* Steps Grid */}
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>

                    {/* Step 1 */}
                    <div className='group bg-base-300 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <hr className="w-full h-2 bg-green-300 rounded-full mb-10" />
                        <div className='w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                            <Layout className="text-amber-600 w-8 h-8" />
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-4'>Pick a template</h3>
                        <ul className='space-y-3 text-slate-600 flex-grow'>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> ATS-friendly & recruiter-approved</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Flexible, modern layouts</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Job and industry match</li>
                        </ul>
                        <hr className="w-full h-2 bg-green-300 rounded-full mt-10" />
                    </div>

                    {/* Step 2 */}
                    <div className='group bg-base-300 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <hr className="w-full h-2 bg-green-300 rounded-full mb-10" />
                        <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                            <Sparkles className="text-blue-600 w-8 h-8" />
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-4'>Add context with AI</h3>
                        <ul className='space-y-3 text-slate-600 flex-grow'>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Writer’s block solution</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> AI bullet point enhancer</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Quick history updates</li>
                        </ul>
                        <hr className="w-full h-2 bg-green-300 rounded-full mt-10" />
                    </div>

                    {/* Step 3 */}
                    <div className='group bg-base-300 p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <hr className="w-full h-2 bg-green-300 rounded-full mb-10" />
                        <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                            <Download className="text-green-600 w-8 h-8" />
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-4'>Download & send</h3>
                        <ul className='space-y-3 text-slate-600 flex-grow'>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> PDF and Word formats</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Unlimited versions</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Ready in under 5 minutes</li>
                        </ul>
                        <hr className="w-full h-2 bg-green-300 rounded-full mt-10" />
                    </div>
                </div>

                {/* CTA Section */}
                <div className='mt-20 flex flex-col items-center gap-6 mb-20'>
                    <button className='px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-full transition-all hover:-translate-y-1 active:scale-95' onClick={() => navigate("/app/resume-templates")}>
                        Continue
                    </button>

                </div>
            </div>
        </div>
    );
}

export default BuildResume