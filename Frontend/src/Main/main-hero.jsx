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

                    <div className='h-[40px] group font-bold text-sm relative top-5 border-transparent  px-5 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 text-black rounded-3xl flex justify-center items-center inline-flex gap-1 px-3 py-1 cursor-pointer' onClick={() => navigate("/login")} >

                        <svg className="rotate-45 group-hover:rotate-90 transition-all duration-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#222222" />
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