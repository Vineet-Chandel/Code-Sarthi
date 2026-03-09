import React from 'react'
import Nav from '../../../nav';
import Footer from '../../../Footer'
import { useNavigate } from "react-router-dom";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HelpCenter = () => {

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
            <div className="flex flex-col justify-center items-center text-center mt-[200px] mb-[150px] px-6">
                <div className="HEAD1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-head text-white font-extrabold tracking-tight">
                    HELP CENTER
                </div>
            </div>
            <div className=" HEAD1 flex flex-col justify-center items-center h-1/2 px-6 md:px-10 lg:px-20 py-24 mb-[100px]">

                <div className="text-3xl md:text-4xl lg:text-5xl font-head text-white leading-none font-extrabold">
                    NEED HELP?
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-head text-white leading-none font-extrabold">
                    Solutions start here.
                </div>

                <div className="text-3xl font-circular-web text-gray-200  relative top-6 w-[80%] text-center">
                    From settings to essential features, find everything you need in the Help Center.
                    If you're new to CodeSarthi and looking for tips, check out our Beginner's Guide.
                </div>
            </div>

            <div>
                <div
                    className=" w-full px-10 flex justify-center items-center  max-lg:px-6 max-sm:px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                    src="/img/announcements.png
                                    "
                                    className="w-[350px] object-contain"
                                />
                            </div>
                            <div className=" HEAD2 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl relative bottom-3 w-full px-10">
                                Announcements :
                            </div>
                            <div className="SUBHEAD2 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 relative bottom-3">
                                We've got our ear to the ground. Here's what you need to know.
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
                                <img src="/img/basics.png" alt="" className='' />
                            </div>
                            <div className="HEAD2 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl  w-full px-10">
                                CodeSarthi Basics :
                            </div>
                            <div className="SUBHEAD2 text-xl font-circular-web text-gray-400  w-full mt-4 px-6 md:px-8">
                                Start off on the right foot! Not the left one
                            </div>
                        </div>
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
                                <img src="/img/alert.png" alt="" className='w-[350px]' />
                            </div>
                            <div className="HEAD2 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl  w-full px-10">

                                Known Issues, Bugs & Troubleshooting :
                            </div>
                            <div className="SUBHEAD2 text-xl font-circular-web text-gray-400  w-full mt-4 px-6 md:px-8">
                                All you can eat self-serve problem solving.
                            </div>

                        </div>
                    </div>
                </div>
                <div
                    className=" w-full px-10 flex justify-center items-center mt-[50px] max-lg:px-6 max-sm:px-4 mb-10">
                    <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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
                                <img src="/img/profileSettings.png" alt="" className='w-[350px]     rounded-[40px]' />
                            </div>
                            <div className="HEAD3 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl mt-5 w-full px-10">
                                Account Settings :
                            </div>
                            <div className="SUBHEAD3 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 ">
                                Personalize your profile, security, notifications, and more.
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
                            <div className='w-full  p-0 relative top-0 '>
                                <img src="/img/safetyPP.png" alt="" className='w-[350px] ' />
                            </div>
                            <div className=" HEAD3 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl mt-5 w-full px-10">
                                Server Settings :
                            </div>
                            <div className="SUBHEAD3 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 ">
                                Almost as exciting as interior decorating.
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
                                <img src="/img/securityPP.png" alt="" className='w-[350px]     rounded-[40px]' />
                            </div>
                            <div className=" HEAD3 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl mt-5 w-full px-10">
                                Safety Privacy & Policy :
                            </div>
                            <div className="SUBHEAD3 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 ">
                                Keep things safe & sound for you and your buddies.
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <div className="flex flex-col justify-center items-center h-1/2 px-6 md:px-12 py-24  ">
                <div className="HEAD4 text-3xl md:text-4xl lg:text-5xl font-head text-white leading-none font-extrabold">
                    Other ways to find help
                </div>
            </div>

            <div
                className=" w-full px-10 flex justify-center items-center mt-[50px] max-lg:px-6 max-sm:px-4 mb-10">
                <div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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
                        <div className='w-full  p-0 relative top-0 flex justify-center'>
                            <img src="/img/developerSupport.png" alt="" className='w-[350px]     rounded-[40px]' />
                        </div>
                        <div className="HEAD3 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl mt-5 w-full px-10">
                            Developers Support :
                        </div>
                        <div className="SUBHEAD3 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 ">
                            Your home for support with developing bots, apps, & games using our API and SDK!
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
                        <div className='w-full  p-0 relative top-0 '>
                            <img src="/img/X.png" alt="" className='w-[350px] ' />
                        </div>
                        <div className=" HEAD3 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl mt-5 w-full px-10">
                            X :
                        </div>
                        <div className="SUBHEAD3 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 ">
                            Have a quick question? Hit us up on X!
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
                            <img src="/img/feedback.png" alt="" className='w-[350px]     rounded-[40px]' />
                        </div>
                        <div className=" HEAD3 text-white font-circular-web font-extrabold text-start text-3xl max-lg:text-4xl mt-5 w-full px-10">
                            Feedback :
                        </div>
                        <div className="SUBHEAD3 text-xl font-circular-web text-gray-400  w-full mt-4 pl-20 pr-10 ">
                            Help Us to make the CodeSarthi more better!
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div >
    )

}

export default HelpCenter

