import React from 'react'
import Nav from '../../../nav';
import Footer from '../../../Footer'
import { useNavigate } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PrivacyCenter = () => {

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(".HEAD1", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".BOSSCONT",
                start: "top 90%",

            },
        });
        gsap.from(".SUBHEAD1", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".BOSSCONT",
                start: "top 90%",
            }
        })
        gsap.from(".HEAD2", {
            duration: 1.6,
            x: 80,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD2",
                start: "top 110%",

            },
        });
        gsap.from(".HEAD3", {
            duration: 1.6,
            x: 80,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD3",
                start: "top 110%",

            },
        });
        gsap.from(".SUBHEAD2", {
            duration: 1.6,
            x: 80,

            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".HEAD2",
                start: "top 90%",
            }
        });
        gsap.from(".SUBHEAD3", {
            duration: 1.6,
            x: 80,

            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".HEAD3",
                start: "top 90%",
            }
        })

        gsap.from(".HEAD4", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD4",
                start: "top 90%",

            },
        });
    });
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full bg-black overflow-hidden relative">
            <Nav />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[160px] pointer-events-none" />
            <div className="flex flex-col justify-center items-center text-center mt-32 md:mt-40 px-6">

                <div className="HEAD1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-head text-white font-extrabold tracking-tight">
                    CodeSarthi
                </div>
                <div className="HEAD1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-head text-white font-extrabold tracking-tight">
                    PRIVACY CENTER
                </div>
                <div className="HEAD1 text-lg sm:text-xl md:text-2xl text-gray-300 mt-6 max-w-2xl">
                    Because protecting your privacy is essential to feeling safe.
                </div>
            </div>
            <div className=" HEAD1 flex flex-col justify-center items-center h-1/2 px-6 md:px-10 lg:px-20 py-24 ">

                <div className="text-3xl md:text-4xl lg:text-5xl font-head text-white leading-none font-extrabold">
                    OUR COMMITMENT TO PRIVACY
                </div>

                <div className="text-3xl font-circular-web text-gray-200  relative top-6 w-[80%] text-center">
                    Team Axonic created CodeSarthi to be a platform that brings developers together while respecting your privacy.Across CodeSarthi, we build privacy into our products, and we keep you informed about what’s happening with your data. Here are our guiding principles:
                </div>
            </div>

            <div>
                <div
                    className=" w-full px-10 flex justify-center items-center  max-lg:px-6 max-sm:px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* CARD 1 */}
                        <div className="w-full min-h-[420px] p-10 rounded-3xl
bg-gradient-to-b from-zinc-900 to-black
border border-white/10
backdrop-blur-xl
shadow-[0_10px_40px_rgba(0,0,0,0.6)]
flex flex-col gap-6
transition-all duration-500
hover:scale-[1.02]
hover:border-blue-500/40
hover:shadow-blue-500/20">
                            <div className='w-full  p-0 relative top-0 px-5'>
                                <img
                                    src="/img/privacy-3.webp"
                                    className="w-24 md:w-32 lg:w-36 object-contain"
                                />
                            </div>
                            <div className=" HEAD2 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl relative bottom-3 w-full px-10">
                                We manage your data responsibly :
                            </div>
                            <div className="SUBHEAD2 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 relative bottom-3">
                                Collecting, storing, and using data is a big responsibility, and we take it seriously. Privacy only exists when data is secure, so we invest heavily in protecting our systems. We design our architecture with privacy in mind and build features that help everyone stay safe and in control.
                            </div>
                        </div>
                        {/* RIGHT CARD */}
                        <div className="w-full min-h-[420px] p-10 rounded-3xl
bg-gradient-to-b from-zinc-900 to-black
border border-white/10
backdrop-blur-xl
shadow-[0_10px_40px_rgba(0,0,0,0.6)]
flex flex-col gap-6
transition-all duration-500
hover:scale-[1.02]
hover:border-blue-500/40
hover:shadow-blue-500/20">


                            <div className='w-full  p-0 relative top-0 px-5'>
                                <img src="/img/privacy-2.webp" alt="" className='w-[250px]' />
                            </div>
                            <div className="HEAD2 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl  w-full px-10">
                                You will never be seen as the product :
                            </div>
                            <div className="SUBHEAD2 text-xl font-circular-web text-gray-400  w-full mt-4 px-6 md:px-8">
                                We don’t sell your personal information. Our only business is providing our service, never selling your data to third parties. At CodeSarthi, what’s yours is truly yours.
                            </div>

                        </div>
                    </div>
                </div>
                <div
                    className=" w-full px-10 flex justify-center items-center mt-[50px] max-lg:px-6 max-sm:px-4 mb-10">
                    <div
                        className=" w-full flex gap-10 max-xl:gap-6 max-lg:flex-col">

                        {/* CARD 1 */}
                        <div className="w-full min-h-[420px] p-10 rounded-3xl
bg-gradient-to-b from-zinc-900 to-black
border border-white/10
backdrop-blur-xl
shadow-[0_10px_40px_rgba(0,0,0,0.6)]
flex flex-col gap-6
transition-all duration-500
hover:scale-[1.02]
hover:border-blue-500/40
hover:shadow-blue-500/20">
                            <div className='w-full  p-0 relative top-0 px-5 rounded-full'>
                                <img src="/img/privacy-4.webp" alt="" className='w-[150px]     rounded-[40px]' />
                            </div>
                            <div className="HEAD3 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl mt-5 w-full px-10">
                                Privacy starts with you :
                            </div>
                            <div className="SUBHEAD3 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 ">
                                Real privacy begins when you have control over your experience. On CodeSarthi, you decide what information you share, who you interact with, and how you use the platform. From data preferences to communication settings, the choice is always yours.
                            </div>


                        </div>
                        {/* RIGHT CARD */}
                        <div className="w-full min-h-[420px] p-10 rounded-3xl
bg-gradient-to-b from-zinc-900 to-black
border border-white/10
backdrop-blur-xl
shadow-[0_10px_40px_rgba(0,0,0,0.6)]
flex flex-col gap-6
transition-all duration-500
hover:scale-[1.02]
hover:border-blue-500/40
hover:shadow-blue-500/20">
                            <div className='w-full  p-0 relative top-0 px-5 rounded-full'>
                                <img src="/img/privacy-5.webp" alt="" className='w-[130px]     rounded-[40px]' />
                            </div>
                            <div className=" HEAD3 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl mt-5 w-full px-10">
                                Less data collected , More clarity delivered :
                            </div>
                            <div className="SUBHEAD3 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 ">
                                We want you to always understand how your personal information is handled on Discord—whether through our <p className='inline-flex cursor-pointer underline underline-offset-4 ' onClick={() => navigate("/policy-hub")}>Privacy Policy</p>, within the app, or here on our site. We intentionally limit the data we collect. When your information is no longer needed, we anonymize, aggregate, or delete it.
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <div className="flex flex-col justify-center items-center h-1/2 px-6 md:px-12 py-24  ">

                <div className="HEAD4 text-3xl md:text-4xl lg:text-5xl font-head text-white leading-none font-extrabold">
                    PRIVACY POLICIES
                </div>

                <div className="HEAD4 text-3xl font-circular-web text-gray-200  relative top-6 w-[80%] text-center">
                    Our Privacy Policies goes into all the details about how we collect, use, store, protect and share your personal information.
                </div>
            </div>
            <div className='px-6 md:px-12 py-24 flex flex-col gap-5'>
                <div
                    className=" w-full px-[100px] flex justify-center items-center max-lg:px-6 max-sm:px-4 " >
                    <div
                        className=" w-full flex gap-6 max-xl:gap-4 max-lg:flex-col " >
                        {/* LEFT TWO CARDS */}
                        <div
                            className=" flex w-2/3 gap-6 max-xl:gap-4 max-lg:w-full max-md:flex-col">
                            {/* CARD 1 */}
                            <div
                                className=" relative w-1/2 min-h-[100px] bg-white/[0.03]
border border-white/10
backdrop-blur-lg
rounded-2xl
hover:border-blue-500/40
hover:bg-white/[0.06]
transition-all duration-300 flex flex-col justify-center items-center max-md:w-full rounded-[40px] max-lg:text-xl text-2xl max-md:text-4xl text-white font-head font-extrabold text-center overflow-hidden group">

                                <div className=" absolute inset-0 bg-gradient-to-b from-gray-900/10 to-blue-900 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 rounded-[40px]"></div>
                                <div className="relative z-10 p-10 max-sm:p-6">
                                    Archive and Candidate Privacy Policy
                                </div>
                            </div>

                            {/* CARD 2 */}
                            <div
                                className=" relative w-1/2 min-h-[100px] bg-white/[0.03]
border border-white/10
backdrop-blur-lg
rounded-2xl
hover:border-blue-500/40
hover:bg-white/[0.06]
transition-all duration-300 flex flex-col justify-center  items-center max-md:w-full rounded-[40px] max-lg:text-xl text-2xl max-md:text-4xl text-white font-head font-extrabold text-center overflow-hidden group">

                                <div className=" absolute inset-0 bg-gradient-to-b from-gray-900/10 to-blue-900 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 rounded-[40px]"></div>
                                <div className="relative z-10 p-10 max-sm:p-6">
                                    Privacy Policy
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CARD */}
                        <div
                            className=" relative w-1/3 min-h-[10px] bg-white/[0.03]
border border-white/10
backdrop-blur-lg
rounded-2xl
hover:border-blue-500/40
hover:bg-white/[0.06]
transition-all duration-300 flex flex-col justify-center items-center max-md:w-full rounded-[40px] max-lg:text-xl text-2xl max-md:text-4xl text-white font-head font-extrabold text-center overflow-hidden group">

                            <div className=" absolute inset-0 bg-gradient-to-b from-gray-900/10 to-blue-900 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 rounded-[40px]"></div>
                            <div className="relative z-10 p-10 max-sm:p-6">
                                Cookie Policy
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className=" w-full px-[100px] flex justify-center items-center max-lg:px-6 max-sm:px-4 " >
                    <div
                        className=" w-full flex gap-6 max-xl:gap-4 max-lg:flex-col " >
                        {/* LEFT TWO CARDS */}
                        <div
                            className=" flex w-2/3 gap-6 max-xl:gap-4 max-lg:w-full max-md:flex-col">
                            {/* CARD 1 */}
                            <div
                                className=" relative w-1/2 min-h-[100px] bg-white/[0.03]
border border-white/10
backdrop-blur-lg
rounded-2xl
hover:border-blue-500/40
hover:bg-white/[0.06]
transition-all duration-300 flex flex-col justify-center items-center max-md:w-full rounded-[40px] max-lg:text-xl text-2xl max-md:text-4xl text-white font-head font-extrabold text-center overflow-hidden group">

                                <div className=" absolute inset-0 bg-gradient-to-b from-gray-900/10 to-blue-900 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 rounded-[40px]"></div>
                                <div className="relative z-10 p-10 max-sm:p-6">
                                    Regional Privacy Policies
                                </div>
                            </div>

                            {/* CARD 2 */}
                            <div
                                className=" relative w-1/2 min-h-[100px] bg-white/[0.03]
border border-white/10
backdrop-blur-lg
rounded-2xl
hover:border-blue-500/40
hover:bg-white/[0.06]
transition-all duration-300 flex flex-col justify-center  items-center max-md:w-full rounded-[40px] max-lg:text-xl text-2xl max-md:text-4xl text-white font-head font-extrabold text-center overflow-hidden group">

                                <div className=" absolute inset-0 bg-gradient-to-b from-gray-900/10 to-blue-900 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 rounded-[40px]"></div>
                                <div className="relative z-10 p-10 max-sm:p-6">
                                    Terms of Service
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CARD */}
                        <div
                            className=" relative w-1/3 min-h-[10px] bg-white/[0.03]
border border-white/10
backdrop-blur-lg
rounded-2xl
hover:border-blue-500/40
hover:bg-white/[0.06]
transition-all duration-300 flex flex-col justify-center items-center max-md:w-full rounded-[40px] max-lg:text-xl text-2xl max-md:text-4xl text-white font-head font-extrabold text-center overflow-hidden group">

                            <div className=" absolute inset-0 bg-gradient-to-b from-gray-900/10 to-blue-900 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 rounded-[40px]"></div>
                            <div className="relative z-10 p-10 max-sm:p-6">
                                Retention Policy
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className=" w-full px-[100px] flex justify-center items-center max-lg:px-6 max-sm:px-4 " >
                    <div
                        className=" w-full flex gap-6 max-xl:gap-4 max-lg:flex-col " >
                        {/* LEFT TWO CARDS */}
                        <div
                            className=" flex w-2/3 gap-6 max-xl:gap-4 max-lg:w-full max-md:flex-col">
                            {/* CARD 1 */}
                            <div
                                className=" relative w-1/2 min-h-[100px] bg-white/[0.03]
border border-white/10
backdrop-blur-lg
rounded-2xl
hover:border-blue-500/40
hover:bg-white/[0.06]
transition-all duration-300 flex flex-col justify-center items-center max-md:w-full rounded-[40px] max-lg:text-xl text-2xl max-md:text-4xl text-white font-head font-extrabold text-center overflow-hidden group">

                                <div className=" absolute inset-0 bg-gradient-to-b from-gray-900/10 to-blue-900 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 rounded-[40px]"></div>
                                <div className="relative z-10 p-10 max-sm:p-6">
                                    Data Privacy Controls
                                </div>
                            </div>

                            {/* CARD 2 */}
                            <div
                                className=" relative w-1/2 min-h-[100px] bg-white/[0.03]
border border-white/10
backdrop-blur-lg
rounded-2xl
hover:border-blue-500/40
hover:bg-white/[0.06]
transition-all duration-300 flex flex-col justify-center  items-center max-md:w-full rounded-[40px] max-lg:text-xl text-2xl max-md:text-4xl text-white font-head font-extrabold text-center overflow-hidden group">

                                <div className=" absolute inset-0 bg-gradient-to-b from-gray-900/10 to-blue-900 opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 rounded-[40px]"></div>
                                <div className="relative z-10 p-10 max-sm:p-6">
                                    CodeSarthi Data Package
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


            <Footer />
        </div >
    )

}

export default PrivacyCenter