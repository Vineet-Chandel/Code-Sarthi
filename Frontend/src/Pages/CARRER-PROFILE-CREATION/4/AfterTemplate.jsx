import React, { useEffect, useRef, useState } from 'react'
import ResumeTemplate1 from '../3/Temp2';
import ResumeTemplate2 from '../3/Temp5';
import ResumeTemplate3 from '../3/Temp6';
import ResumeTemplate4 from '../3/Temp7';
import ResumeTemplate5 from '../3/Temp8';
import ResumeTemplate6 from '../3/Temp9';
import ResumeTemplate7 from '../3/Temp10';
import ResumeTemplate8 from '../3/Temp11';
import ResumeTemplate9 from '../3/Temp12';
import { useLocation, useNavigate } from 'react-router-dom';
import Preview from '../../INTERVIEW-ARENA/MediumPreview'
import { useSelector } from 'react-redux';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Template = ({ idx, ref }) => {



    const data = useSelector(state => state.res)
    if (!data?.header) {
        return (
            <div ref={ref} className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white p-8 animate-pulse shadow-lg">

                {/* Header */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="h-8 w-64 bg-gray-300 rounded"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="h-4 w-72 bg-gray-200 rounded"></div>
                </div>

                {/* Summary */}
                <div className="mt-8">
                    <div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-200 rounded"></div>
                        <div className="h-3 w-11/12 bg-gray-200 rounded"></div>
                        <div className="h-3 w-10/12 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Experience */}
                <div className="mt-8">
                    <div className="h-5 w-48 bg-gray-300 rounded mb-4"></div>

                    {[1, 2, 3].map((item) => (
                        <div key={item} className="mb-6">
                            <div className="h-4 w-60 bg-gray-300 rounded mb-2"></div>
                            <div className="h-3 w-40 bg-gray-200 rounded mb-3"></div>

                            <div className="space-y-2">
                                <div className="h-3 w-full bg-gray-200 rounded"></div>
                                <div className="h-3 w-11/12 bg-gray-200 rounded"></div>
                                <div className="h-3 w-10/12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div className="mt-8">
                    <div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>

                    <div className="flex flex-wrap gap-3">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-8 w-24 bg-gray-200 rounded-full"
                            />
                        ))}
                    </div>
                </div>

            </div>
        );
    }

    switch (idx) {
        case 1:
            return <ResumeTemplate1 data={data} ref={ref} />
        case 2:
            return <ResumeTemplate2 data={data} ref={ref} />
        case 3:
            return <ResumeTemplate3 data={data} ref={ref} />
        case 4:
            return <ResumeTemplate4 data={data} ref={ref} />
        case 5:
            return <ResumeTemplate5 data={data} ref={ref} />
        case 6:
            return <ResumeTemplate6 data={data} ref={ref} />
        case 7:
            return <ResumeTemplate7 data={data} ref={ref} />
        case 8:
            return <ResumeTemplate8 data={data} ref={ref} />
        case 9:
            return <ResumeTemplate9 data={data} ref={ref} />

        default:
            return <ResumeTemplate1 data={data} ref={ref} />
    }







}


const AfterTemplate = () => {
    const printRef = useRef()
    const [loading, setLoading] = useState(false);
    const handlePrint = async () => {
        try {
            setLoading(true);
            const element = printRef.current;

            if (!element) {
                setLoading(false);
                return;
            }

            const canvas = await html2canvas(element, {
                scale: window.devicePixelRatio > 1 ? 1.5 : 1,
                useCORS: true,
                backgroundColor: "#ffffff",
                onclone: (doc) => {
                    doc.documentElement.style.color = "#000";
                    doc.documentElement.style.background = "#fff";

                    doc.body.style.color = "#000";
                    doc.body.style.background = "#fff";
                }
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.8);

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

            pdf.save("resume.pdf");
        } catch {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    const location = useLocation();
    let idx = location.state?.idx || {};
    const Navigate = useNavigate()
    return (
        <div>
            <div className="text-center mb-3 sm:mb-5 lg:mb-5 w-full flex flex-col items-center p-4  bg-black">

                {/* Heading */}
                <h1 className="
        text-4xl 
        sm:text-6xl 
        md:text-7xl 
        lg:text-8xl 
        xl:text-9xl
        font-extrabold 
text-white
    ">
                    Final Resume
                </h1>

                {/* Subtitle */}
                <p className="
        text-base 
        sm:text-lg 
        md:text-xl 
        lg:text-2xl 
text-blue-500
        mt-6 
        max-w-xl 
        lg:max-w-3xl

        flex items-center gap-2
    ">
                    <svg xmlns="http://www.w3.org/2000/svg" width={45} height={45} viewBox="0 0 24 24" className="transition-transform duration-500 ease-in-out hover:rotate-180">
                        <path fill="currentColor" d="M10.565 2.075a3.33 3.33 0 0 1 2.87 0c.394.189.755.497 1.26.928l.079.066c.48.41.939.604 1.58.655l.102.008c.662.053 1.135.09 1.547.236a3.33 3.33 0 0 1 2.03 2.029c.145.412.182.885.235 1.547l.008.102c.051.641.246 1.1.655 1.58l.066.078c.431.506.74.867.928 1.261a3.33 3.33 0 0 1 0 2.87c-.189.394-.497.755-.928 1.26l-.066.079c-.418.49-.605.951-.655 1.58l-.008.102c-.053.662-.09 1.135-.236 1.547a3.33 3.33 0 0 1-2.029 2.03c-.412.145-.885.182-1.547.235l-.102.008c-.641.051-1.1.246-1.58.655l-.079.066c-.505.431-.866.74-1.26.928a3.33 3.33 0 0 1-2.87 0c-.394-.189-.755-.497-1.26-.928l-.079-.066a2.56 2.56 0 0 0-1.58-.655l-.102-.008c-.662-.053-1.135-.09-1.547-.236a3.33 3.33 0 0 1-2.03-2.029c-.145-.412-.182-.885-.235-1.547l-.008-.102a2.56 2.56 0 0 0-.655-1.58l-.066-.079c-.431-.505-.74-.866-.928-1.26a3.33 3.33 0 0 1 0-2.87c.189-.394.497-.755.928-1.26l.066-.079a2.56 2.56 0 0 0 .655-1.58l.008-.102c.053-.662.09-1.135.236-1.547a3.33 3.33 0 0 1 2.029-2.03c.412-.145.885-.182 1.547-.235l.102-.008a2.56 2.56 0 0 0 1.58-.655l.078-.066c.506-.431.867-.74 1.261-.928m3.232 6.12a.75.75 0 1 0-1.45-.39l-2.143 8a.75.75 0 0 0 1.449.39zm1.641.974a.75.75 0 1 0-1.06 1.06l.131.132c.527.526.867.869 1.085 1.155c.205.268.23.396.23.484s-.025.216-.23.484c-.218.286-.558.629-1.085 1.155l-.131.131a.75.75 0 1 0 1.06 1.06l.167-.166c.482-.48.895-.894 1.181-1.27c.307-.402.537-.846.537-1.394s-.23-.992-.537-1.394c-.286-.376-.7-.79-1.18-1.27zm-5.816 0a.75.75 0 0 0-1.06 0l-.167.167c-.481.48-.895.894-1.181 1.27c-.307.402-.537.846-.537 1.394s.23.992.537 1.394c.286.376.7.79 1.18 1.27l.168.167a.75.75 0 0 0 1.06-1.06l-.131-.132c-.527-.526-.867-.869-1.085-1.155c-.205-.268-.23-.396-.23-.484s.025-.216.23-.484c.218-.286.558-.629 1.085-1.155l.131-.131a.75.75 0 0 0 0-1.061"></path>
                    </svg>

                    <span className="text-white">This is all from CodeSarthi, hope so this resume helps you in gaining the advantage in your Job Role</span>
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-5 w-full">
                    <div
                        onClick={() => Navigate("/app/interview-arena")}
                        className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Interview Arena
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                    </div>

                    <div
                        onClick={() => Navigate("/app/resume-examples")}
                        className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Examples
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                    </div>

                    <div
                        onClick={() => Navigate("/app/build-resume/preview-content")}
                        className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-white hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Your Career Profile
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                    </div>
                </div>
            </div>
            <div className='w-full flex '>

                <div className='w-[50%] '>
                    < Template ref={printRef} idx={idx} />
                </div>
                <div className='w-[50%] flex flex-col items-center py-8 gap-2'>

                    <div className='w-full justify-start mt-5 mb-2 '>
                        <span className='text-3xl font-bold'>Your Carrer Profile</span>
                    </div>
                    <Preview />

                    <div className='px-3'>
                        <div className='w-full justify-start mt-10 mb-2 '>
                            <span className='text-3xl font-bold'>Want to make any changes?</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3  w-full">

                            <div
                                onClick={() => Navigate("/app/build-resume/summary-content")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Summary
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>

                            <div
                                onClick={() => Navigate("/app/build-resume/header-content")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Headers
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>

                            <div
                                onClick={() => Navigate("/app/build-resume/experience-content")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Experience
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>
                            <div
                                onClick={() => Navigate("/app/build-resume/education-content")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Education
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>
                            <div
                                onClick={() => Navigate("/app/build-resume/project-content")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Projects
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>
                            <div
                                onClick={() => Navigate("/app/build-resume/skill-content")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Skills
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>
                            <div
                                onClick={() => Navigate("/app/build-resume/additional-details")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Certifications
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>
                            <div
                                onClick={() => Navigate("/app/build-resume/additional-details")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Achievements
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>
                            <div
                                onClick={() => Navigate("/app/build-resume/additional-details")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Languages
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>

                        </div>

                        <div className='w-full justify-start mt-10 mb-3 '>
                            <span className='text-3xl font-bold'>Download</span>
                        </div>

                        <div className='w-full justify-start mt-10 mb-3 '>
                            <span className='text-3xl font-bold'>Analyse</span>
                        </div>
                        <div className="flex flex-wrap justify-start gap-3  w-full">

                            <div
                                onClick={() => Navigate("/app/build-resume/summary-content")}
                                className="w-full sm:w-auto flex-1 sm:flex-none min-w-[220px] rounded-full border border-white/15 hover:border-white/30 cursor-pointer px-4 py-3 text-black hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-2 bg-white"
                            >
                                Analyse with Shastra
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80" className="rotate-45"> <g fill="none"> <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path> </g> </svg>
                            </div>




                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}


export default AfterTemplate