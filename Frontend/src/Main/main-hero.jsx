import React, { useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Mainhero = () => {
    const [videoMainNum, setVideoMainNum] = useState(1);
    const [videoShortNum, setVideoShortNum] = useState(2);
    const [isclicked, setClicking] = useState(false);


    const navigate = useNavigate();
    const videoHandler = () => {
        setVideoMainNum(prev => (prev === 4 ? 1 : prev + 1));
        setVideoShortNum(prev => (prev === 4 ? 1 : prev + 1));

    };


    const videosMp4 = [
        { index: videoMainNum, link: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780494231/hero-1_yeg9ex.mp4" },
        { index: videoMainNum, link: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780494239/hero-2_ostvzs.mp4" },
        { index: videoMainNum, link: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780494236/hero-3_jtiuaz.mp4" },
        { index: videoMainNum, link: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780494242/hero-4_poipem.mp4" },
    ]

    const videosWebM = [
        { index: videoMainNum, link: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780497081/hero-1_uqq45b.webm" },
        { index: videoMainNum, link: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780497103/hero-2_y4mse1.webm" },
        { index: videoMainNum, link: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780497097/hero-3_emjauk.webm" },
        { index: videoMainNum, link: "https://res.cloudinary.com/dj0ivep44/video/upload/v1780497089/hero-4_bfbki4.webm" },
    ]

    useGSAP(() => {

        if (!isclicked) {

            return;
        }
        gsap.fromTo(".newVideo", {
            scale: 0.9,

            opacity: 0,

        }, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        })
        setClicking(false)
    }, { dependencies: [isclicked] }
    );
    return (
        <div className="relative h-screen w-screen overflow-hidden ">

            {/* Background video */}
            <video
                key={videoMainNum}

                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="newVideo absolute inset-0 w-full h-full object-cover "
            >
                <source src={videosWebM[videoMainNum - 1].link} type="video/webm; codecs=av01.0.05M.08" />

                <source src={videosWebM[videoMainNum - 1].link} type="video/webm; codecs=vp9" />

                <source src={videosMp4[videoMainNum - 1].link} type="video/mp4" />
            </video>

            {/* Center container */}
            <div className="relative  flex flex-col items-center justify-between h-full w-full pt-[6rem] pb-[2rem]">
                <div className='w-screen relative left-5 max-xl:left-4 max-lg:left-3 max-md:left-2 '>

                    <div className=" text-white font-extrabold font-zentry  text-[11rem] max-xl:text-[9rem] max-lg:text-[7rem] max-md:text-[5rem] max-sm:text-[3.5rem] leading-none">DEVELOPERS</div>

                    <div className="text-lg text-gray-300 font-bold font-robert-medium w-1/2">
                        We build what you need — planning, communication, project management,
                        toolkits, blogs, and much more.
                    </div>

                    <div className='h-[40px]  font-bold text-sm relative top-5 border-transparent p-1 px-5 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1 cursor-pointer' onClick={() => navigate("/login")} >
                        <svg className="rotate-45" width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill='black' />
                        </svg>
                        Get Started !</div>
                </div>



                {/* Preview video */}
                <div
                    onClick={() => {
                        videoHandler();
                        setClicking(true);
                    }}
                    className="
                        h-[350px] w-[350px]
                        overflow-hidden rounded-xl cursor-pointer
                        opacity-0 scale-95
                        hover:opacity-100
                       hover:scale-100
                        transition-all duration-500 ease-in-out
                    "
                >
                    <video
                        key={videoShortNum}
                        // src={`/videos/hero-${videoShortNum}.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className=" absolute inset-0 w-full h-full object-cover"
                    >


                        <source src={videosWebM[videoShortNum - 1].link} type="video/webm; codecs=av01.0.05M.08" />

                        <source src={videosWebM[videoShortNum - 1].link} type="video/webm; codecs=vp9" />

                        <source src={videosMp4[videoShortNum - 1].link} type="video/mp4" />
                    </video>
                </div>

                <div className="w-screen h-auto flex  flex-col justify-end items-end relative right-5 max-xl:right-4 max-lg:right-3 max-md:right-2  py-10 ">

                    <div className="
                text-white 
                font-extrabold 
                font-zentry
                flex justify-end
                text-[11rem] 
                max-xl:text-[9rem] 
                max-lg:text-[7rem] 
                max-md:text-[5rem] 
                max-sm:text-[3.5rem] 
                leading-none  ">
                        PROJECTS
                    </div>

                    <div className="text-lg  text-gray-300 font-bold font-robert-medium
    w-1/2 text-right flex justify-end ">
                        Solutions to build, grow and engage Developers community with CodeSarthi.
                    </div>

                </div>



            </div>

        </div >
    )
}

export default Mainhero