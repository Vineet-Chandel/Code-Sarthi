import React from 'react';
import { Layout, Sparkles, Download, } from 'lucide-react'; // Optional: icon library
import { useNavigate } from 'react-router-dom';

const Block = () => {
    const Navigate = useNavigate();

    return (
        <div className='w-full   bg-base-200  font-sans flex justify-center items-center'>

            <div className='w-[95%] h-full bg-base-100 rounded-xl '>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                        Resume Now Brings Expert-Driven Insight to Your Job Search
                    </h1>
                    <p className="text-lg text-slate-600 mt-3">Explore our recently updated guides to help you refine and modernize your resume. Discover valuable tips and strategies for today’s job market.</p>
                </div>

                {/* Steps Grid */}
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4  pb-20'>

                    {/* Step 1 */}
                    <div className='group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div className='w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 16 16">
                                <path fill="#2B3A42" d="M8 2.002a1.998 1.998 0 1 0 0 3.996a1.998 1.998 0 0 0 0-3.996M12.5 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3m-9 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M5 7.993A1 1 0 0 1 6 7h4a1 1 0 0 1 1 1v3a3 3 0 0 1-.146.927A3.001 3.001 0 0 1 5 11zM4 8c0-.365.097-.706.268-1H2a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 0 3.436 2.319A4 4 0 0 1 4 10.999zm8 0v3c0 .655-.157 1.273-.436 1.819A2.5 2.5 0 0 0 15 10.5V8a1 1 0 0 0-1-1h-2.268c.17.294.268.635.268 1"></path>
                            </svg>
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-4'>Built by career experts</h3>
                        <ul className='space-y-3 text-slate-600 flex-grow'>
                            <li className="flex items-center gap-2"> Resume Now is built on the expertise of our team of professional resume writers, career advisors, and experts.</li>

                        </ul>
                    </div>

                    {/* Step 2 */}
                    <div className='group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 28 28">
                                <g fill="none">
                                    <path fill="url(#SVGtN4pBdhY)" d="M25 21.75A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V9l11-1l11 1z"></path>
                                    <path fill="url(#SVGlH4OEXcs)" d="M25 21.75A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V9l11-1l11 1z"></path>
                                    <path fill="url(#SVGu66gVbnH)" fillOpacity={0.3} d="M25 21.75A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V9l11-1l11 1z"></path>
                                    <path fill="url(#SVG5W5KmcQV)" fillOpacity={0.3} d="M25 21.75A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V9l11-1l11 1z"></path>
                                    <path fill="url(#SVGjdEBpeym)" fillOpacity={0.3} d="M25 21.75A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V9l11-1l11 1z"></path>
                                    <path fill="url(#SVGvu0mobrR)" d="M21.75 3A3.25 3.25 0 0 1 25 6.25V9H3V6.25A3.25 3.25 0 0 1 6.25 3z"></path>
                                    <path fill="url(#SVGIRn0JbXM)" d="M23 18.5a1.5 1.5 0 0 1 3 0v7a1.5 1.5 0 0 1-3 0z"></path>
                                    <path fill="url(#SVGkbocdeig)" d="M20.5 14a1.5 1.5 0 0 0-1.5 1.5v10a1.5 1.5 0 0 0 3 0v-10a1.5 1.5 0 0 0-1.5-1.5"></path>
                                    <path fill="url(#SVGYiCx3dax)" d="M16.5 20a1.5 1.5 0 0 0-1.5 1.5v4a1.5 1.5 0 0 0 3 0v-4a1.5 1.5 0 0 0-1.5-1.5"></path>
                                    <defs>
                                        <linearGradient id="SVGtN4pBdhY" x1={17.972} x2={11.828} y1={27.088} y2={8.803} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#b3e0ff"></stop>
                                            <stop offset={1} stopColor="#b3e0ff"></stop>
                                        </linearGradient>
                                        <linearGradient id="SVGlH4OEXcs" x1={16.357} x2={19.402} y1={14.954} y2={28.885} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#dcf8ff" stopOpacity={0}></stop>
                                            <stop offset={1} stopColor="#ff6ce8" stopOpacity={0.7}></stop>
                                        </linearGradient>
                                        <linearGradient id="SVGvu0mobrR" x1={3} x2={21.722} y1={3} y2={-3.157} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#0094f0"></stop>
                                            <stop offset={1} stopColor="#2764e7"></stop>
                                        </linearGradient>
                                        <linearGradient id="SVGIRn0JbXM" x1={25.75} x2={24.291} y1={25.167} y2={16.87} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#d7257d"></stop>
                                            <stop offset={1} stopColor="#e656eb"></stop>
                                        </linearGradient>
                                        <linearGradient id="SVGkbocdeig" x1={22.75} x2={20.466} y1={28.444} y2={14.101} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#5b2ab5"></stop>
                                            <stop offset={1} stopColor="#dd3ce2"></stop>
                                        </linearGradient>
                                        <linearGradient id="SVGYiCx3dax" x1={15.375} x2={21.534} y1={20.292} y2={23.414} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#16bbda"></stop>
                                            <stop offset={1} stopColor="#2052cb"></stop>
                                        </linearGradient>
                                        <radialGradient id="SVGu66gVbnH" cx={0} cy={0} r={1} gradientTransform="matrix(0 5 -2.54202 0 16.5 25)" gradientUnits="userSpaceOnUse">
                                            <stop offset={0.535} stopColor="#4a43cb"></stop>
                                            <stop offset={1} stopColor="#4a43cb" stopOpacity={0}></stop>
                                        </radialGradient>
                                        <radialGradient id="SVG5W5KmcQV" cx={0} cy={0} r={1} gradientTransform="matrix(0 9.5 -2.5 0 20.5 22.5)" gradientUnits="userSpaceOnUse">
                                            <stop offset={0.535} stopColor="#4a43cb"></stop>
                                            <stop offset={1} stopColor="#4a43cb" stopOpacity={0}></stop>
                                        </radialGradient>
                                        <radialGradient id="SVGjdEBpeym" cx={0} cy={0} r={1} gradientTransform="rotate(90 .5 24)scale(6.5 2.5)" gradientUnits="userSpaceOnUse">
                                            <stop offset={0.535} stopColor="#4a43cb"></stop>
                                            <stop offset={1} stopColor="#4a43cb" stopOpacity={0}></stop>
                                        </radialGradient>
                                    </defs>
                                </g>
                            </svg>
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-4'>Supported by data</h3>
                        <ul className='space-y-3 text-slate-600 flex-grow'>
                            <li className="flex items-center gap-2"> Our career studies and surveys give you the data you need to succeed in a constantly evolving job market.</li>

                        </ul>
                    </div>

                    {/* Step 3 */}
                    <div className='group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24">
                                <path fill="#2B3A42" d="M12 21L2 9l3-6h14l3 6zM9.625 8h4.75l-1.5-3h-1.75zM11 16.675V10H5.45zm2 0L18.55 10H13zM16.6 8h2.65l-1.5-3H15.1zM4.75 8H7.4l1.5-3H6.25z"></path>
                            </svg>
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-4'>Committed to quality</h3>
                        <ul className='space-y-3 text-slate-600 flex-grow'>
                            <li className="flex items-center gap-2">All of Resume Now’s content follows a rigorous editorial process to ensure quality, accessibility, and credibility.</li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Block;