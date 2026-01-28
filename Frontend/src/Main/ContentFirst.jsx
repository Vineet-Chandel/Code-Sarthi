import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from 'react'


const ContentFirst = () => {
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
        gsap.from(".HEAD2 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD2",
                start: "top 90%",

            },
        });
        gsap.from(".pointer1", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer1",
                start: "top 90%",

            },
        });
        gsap.from(".HEAD3 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD3",
                start: "top 90%",

            },
        });
        gsap.from(".pointer2", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer2",
                start: "top 90%",

            },
        });
        gsap.from(".HEAD4 ", {
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
        gsap.from(".pointer3", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer3",
                start: "top 90%",

            },
        });
        gsap.from(".negMove", {
            x: -30,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".negMove",
                start: "top 90%",

            },

        })
        gsap.from(".posMove", {
            x: 30,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".posMove",
                start: "top 90%",

            },

        })
        gsap.from(".topMove", {
            y: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".topMove",
                start: "top 90%",

            },

        })

        gsap.from(".HEAD5 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD5",
                start: "top 90%",

            },
        });
        gsap.from(".pointer4", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer4",
                start: "top 90%",

            },
        });
    });


    return (
        <div className="BOSSCONT bg-black text-white w-screen flex flex-col justify-center items-center my-[150px]">

            <div className=" flex flex-col justify-center items-center w-full gap-6">

                <div className=" HEAD1 text-5xl font-extrabold font-head text-center
                 max-xl:text-4xl 
                max-lg:text-3xl 
                max-md:text-2xl 
                max-sm:text-xl  ">
                    A PLATFORM FOR ENDLESS POSSIBILITIES
                </div>

                <div className="SUBHEAD1 text-2xl font-extralight w-[60%] text-center
                
                max-lg:text-1xl 
                max-md:text-lg
                max-sm:text-md ">
                    <b className='font-extrabold'>CodeSarthi</b>  connects you with a global developer community to build and scale.
                    Designed to boost <b className='font-extrabold'>productivity</b>  while keeping workflows <b className='font-extrabold'>fast</b> and <b className='font-extrabold'>efficient</b>.
                </div>

            </div>


            <div className='relative top-10'>
                <div className="w-[98%] m-10 border rounded-[150px] justify-self-center flex  items-center justify-between p-6
            max-xl:px-4 
            max-lg:px-2 
            max-sm:px-0 
            max-[850px]:flex-col
           ">
                    <div className="w-1/2 flex flex-col justify-center items-center text-left gap-4 p-11 
                max-xl:px-7 
                max-lg:px-3 
                max-sm:px-0 
                max-[850px]:w-full
                max-[850px]:p-11
                 max-[630px]:p-11
                  ">
                        <div className="
  text-[24px]
  sm:text-3xl
  md:text-4xl
  lg:text-5xl
  xl:text-6xl
  font-extrabold font-head HEAD2
">
                            KEEP DEVELOPERS ENGAGED
                        </div>

                        <div className="w-full flex flex-col gap-4 pl-5 pointer1 ">
                            <div className=" text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ A unified interaction layer that seamlessly connects developers, teams, and communities.
                            </div>
                            <div className=" text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Bridges messaging, meetings, and collaboration in one place.
                            </div>
                            <div className=" text-xl text-start transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Enables rich media communication (text, video, files, code).
                            </div>
                            <div className=" text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Improves productivity by keeping all interactions centralized.
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-start'>
                            <div className='h-[40px]  font-bold text-sm relative top-5 border-transparent p-1 px-5 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                                <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_0_3844)">
                                        <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_3844">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                LEARN MORE</div>
                        </div>
                    </div>

                    <div className="w-1/2  flex justify-end 
               
                max-[850px]:w-full
              
                max-[850px]:justify-center">
                        <video
                            src={"/videos/feature-1.mp4"}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="  rounded-[150px] object-cover h-[600px] w-auto"
                        />
                    </div>
                </div>
                <div className="w-[98%] m-10 border rounded-[150px] justify-self-center flex  items-center justify-between p-6
            max-xl:px-4 
            max-lg:px-2 
            max-sm:px-0 
            max-[850px]:flex-col
           ">
                    <div className="w-1/2 flex flex-col justify-center items-center text-left gap-4 p-11 
                max-xl:px-7 
                max-lg:px-3 
                max-sm:px-0 
                max-[850px]:w-full
                max-[850px]:p-11
                 max-[630px]:p-11
                  ">
                        <div className="
  text-[24px]
  sm:text-3xl
  md:text-4xl
  lg:text-5xl
  xl:text-6xl
  font-extrabold font-head HEAD3
">
                            Eliminates dependency on Project Manager
                        </div>

                        <div className="w-full flex flex-col gap-4 pl-5 pointer2">
                            <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Combines scheduling, tracking, and accountability in one system
                            </p>
                            <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Invite team members with role-based access
                            </p>
                            <p className="text-xl text-start transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Supports flexible team sizes and structures
                            </p>
                            <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Centralized interface for project leaders where leader track team productivity in real time
                            </p>
                        </div>
                        <div className='w-full flex items-center justify-start'>
                            <div className='h-[40px]  font-bold text-sm relative top-5 border-transparent p-1 px-5 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                                <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_0_3844)">
                                        <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_3844">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                LEARN MORE</div>
                        </div>
                    </div>

                    <div className="w-1/2  flex justify-end 
               
                max-[850px]:w-full
              
                max-[850px]:justify-center">
                        <video
                            src={"/videos/feature-2.mp4"}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="  rounded-[150px] object-cover h-[600px] w-full"
                        />
                    </div>
                </div>
                <div className="w-[98%] m-10 border rounded-[150px] justify-self-center flex  items-center justify-between p-6
            max-xl:px-4 
            max-lg:px-2 
            max-sm:px-0 
            max-[850px]:flex-col
           ">
                    <div className="w-1/2 flex flex-col justify-center items-center text-left gap-4 p-11 
                max-xl:px-7 
                max-lg:px-3 
                max-sm:px-0 
                max-[850px]:w-full
                max-[850px]:p-11
                 max-[630px]:p-11
                  ">
                        <div className="
  text-[24px]
  sm:text-3xl
  md:text-4xl
  lg:text-5xl
  xl:text-6xl
  font-extrabold font-head HEAD4
">
                            TIME IS PRECIOUS
                        </div>

                        <div className="w-full flex flex-col gap-4 pl-5 pointer3">
                            <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Task-wise time tracking for each member and Logs time spent on specific tasks
                            </p>
                            <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ a personal dashboard for each developer where they can Track daily goals and Monitor individual productivity
                            </p>
                            <p className="text-xl text-start transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Increases team transparency and accountability which reduces management overhead
                            </p>
                            <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                                ✦ Faster issue identification and gives a centralized workspace for projects and teams
                            </p>
                        </div>
                        <div className='w-full flex items-center justify-start'>
                            <div className='h-[40px]  font-bold text-sm relative top-5 border-transparent p-1 px-5 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1'  >
                                <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_0_3844)">
                                        <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#010101" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_0_3844">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                LEARN MORE</div>
                        </div>
                    </div>

                    <div className="w-1/2  flex justify-end 
               
                max-[850px]:w-full
              
                max-[850px]:justify-center">
                        <video
                            src={"/videos/feature-3.mp4"}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="  rounded-[150px] object-cover h-[600px] w-full"
                        />
                    </div>
                </div>
            </div>


            <div
                className="
    w-full px-10
    flex justify-center items-center
    mt-[100px]
    max-lg:px-6
    max-sm:px-4
  "
            >
                <div
                    className="
      w-full max-w-7xl
      flex gap-10
      max-xl:gap-6
      max-lg:flex-col
    "
                >
                    {/* LEFT TWO CARDS */}
                    <div
                        className="
        flex w-2/3 gap-10
        max-xl:gap-6
        max-lg:w-full
        max-md:flex-col
      "
                    >
                        {/* CARD 1 */}
                        <div
                            className="
          w-1/2 min-h-[300px]
          rounded-[100px]
          bg-stone-900
          flex flex-col justify-center items-center
          p-10
          max-md:w-full
          max-sm:rounded-[40px]
          max-sm:p-6
        "
                        >
                            <div
                                className="
            text-white font-head font-extrabold text-center
            text-2xl
            max-lg:text-xl
            max-md:text-4xl negMove
          "
                            >
                                CodeSarthi Developer Toolkit
                            </div>

                            <button className="group relative h-[60px] px-6 p-4 mt-4 rounded-3xl font-bold text-sm bg-neutral top-5 transition-all duration-300 overflow-hidden flex justify-center items-center inline-flex gap-3"> <div className="absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 top-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 top-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_0_3844)"> <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" /> </g> <defs> <clipPath id="clip0_0_3844"> <rect width="14" height="14" fill="white" /> </clipPath> </defs> </svg> VIEW HELP CENTER <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 bottom-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> </button>
                        </div>

                        {/* CARD 2 */}
                        <div
                            className="
          w-1/2 min-h-[300px]
          rounded-[100px]
          bg-stone-900
          flex flex-col justify-center items-center
          p-10
          max-md:w-full
          max-sm:rounded-[40px]
          max-sm:p-6 
        "
                        >
                            <div
                                className="
            text-white font-head font-extrabold text-center
            text-2xl
            max-lg:text-xl
                 max-md:text-4xl topMove
          "
                            >
                                Global Developers Community
                            </div>

                            <button className="group relative h-[60px] px-6 p-4 mt-4 rounded-3xl font-bold text-sm bg-neutral top-5 transition-all duration-300 overflow-hidden flex justify-center items-center inline-flex gap-3"> <div className="absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 top-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 top-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_0_3844)"> <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" /> </g> <defs> <clipPath id="clip0_0_3844"> <rect width="14" height="14" fill="white" /> </clipPath> </defs> </svg> VIEW HELP CENTER <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 bottom-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> </button>
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div
                        className="
        w-1/3 min-h-[300px]
        rounded-[100px]
        bg-stone-900
        flex flex-col justify-center items-center
        p-10
        max-lg:w-full
     
        max-sm:rounded-[40px]
        max-sm:p-6
      "
                    >
                        <div
                            className="
          text-white font-head font-extrabold text-center
          text-2xl
          max-lg:text-4xl
     posMove
        "
                        >
                            Developer Help and Support
                        </div>

                        <button className="group relative h-[60px] px-6 p-4 mt-4 rounded-3xl font-bold text-sm bg-neutral top-5 transition-all duration-300 overflow-hidden flex justify-center items-center inline-flex gap-3"> <div className="absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 top-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 top-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_0_3844)"> <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" /> </g> <defs> <clipPath id="clip0_0_3844"> <rect width="14" height="14" fill="white" /> </clipPath> </defs> </svg> VIEW HELP CENTER <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 bottom-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> </button>
                    </div>
                </div>
            </div>


            <div
                className="
    w-full
    px-10
    flex justify-center
    mt-[100px]
    max-lg:px-6
    max-sm:px-4
  "
            >
                <div
                    className="
      w-full
      max-w-7xl
      min-h-[500px]
      bg-neutral
      rounded-[100px]
      flex flex-col items-center justify-center
      gap-6
      p-10
      max-md:min-h-[420px]
      max-sm:min-h-[380px]
      max-sm:rounded-[40px]
      max-sm:p-6
    "
                >
                    {/* HEADING */}
                    <div
                        className="
        text-white font-head font-extrabold text-center
        text-[3rem]
        sm:text-[4rem]
        md:text-[5rem]
        lg:text-[6rem]
        xl:text-[7rem]
        HEAD5
      "
                    >
                        STAY TUNED
                    </div>

                    {/* DESCRIPTION */}
                    <p
                        className="
        text-gray-300 text-center
        text-base
        sm:text-lg
        md:text-xl
        max-w-2xl
        pointer4
      "
                    >
                        Want to keep up to date with all the latest news and updates we bring for developers?
                    </p>

                    {/* CTA BUTTON */}
                    <div
                        className="
        h-[56px]
        mt-4
        px-6
        bg-white text-black
        rounded-3xl
        flex items-center gap-3
        font-bold text-sm
        cursor-pointer
        transition-all duration-300
        hover:scale-105
      "
                    >
                        <svg
                            className="rotate-45"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="#000"
                        >
                            <path d="M12.6286 1.04921L0.4829 5.52396L6.95147 7.30682L7.8624 13.6833L13.2084 1.63029Z" />
                        </svg>
                        SIGN UP FOR NEWSLETTER
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContentFirst
