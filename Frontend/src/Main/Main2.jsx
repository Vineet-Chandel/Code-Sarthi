import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom';
import Brands from './Brands';

const MainCTAbutton = ({ ClassName = "" }) => {
    const navigate = useNavigate()
    return (


        <div onClick={() => navigate("/signup")} className={` flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>

            <span className="text-white relative -right-[1px]" >
                <svg className='h-[33px] sm:h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                    <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                        fill="#fff"
                    ></path>
                </svg>
            </span>
            <button className="bg-white  px-2  sm:px-4 py-[4px]  sm:py-[7.5px] ">Get Started</button>
            <span className="text-white relative -left-[1px]">
                <svg className='h-[33px] sm:h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                        fill="#fff"
                    />
                </svg>
            </span>
        </div>
    )
}
const MainCTAbutton2 = ({ ClassName = "" }) => {
    const navigate = useNavigate()
    return (


        <div onClick={() => navigate("/signup")} className={` flex items-center justify-between cursor-pointer text-black  font-bold ${ClassName}`}>

            <span className="text-white relative -right-[1px]" >
                <svg className='h-[33px] sm:h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                    <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                        strokeWidth='2'
                        stroke='#ffffff'
                    ></path>
                </svg>
            </span>

            <button className="border-white text-white border-b-[1.5px]  border-t-[1.5px] px-2  sm:px-4 py-[4px]  sm:py-[6.9px] ">About CodeSarthi</button>
            <span className="text-white relative -left-[1px]">
                <svg className='h-[33px] sm:h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"

                        strokeWidth='1'
                        stroke='#ffffff'
                    />
                </svg>
            </span>
        </div>
    )
}

const Card = ({ idx }) => {


    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        videoRef.current?.play();
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Optional: reset
        }
    };
    const data = [
        {
            img: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785257346/Saved_Frame_from_Developer_collaboration_202607282217_1_qafjc5.webp",
            video: "https://res.cloudinary.com/dj0ivep44/video/upload/v1785254940/Developer_collaboration_platform__1080p_202607282126_slxarl.webm",
            Heading: "  Interaction Segment",
            subHeading: "Interact with the developers in all possible way."
        },
        {
            img: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785340148/Saved_Frame_from_AI_resume_202607292118_str1c3.webp",
            video: "https://res.cloudinary.com/dj0ivep44/video/upload/v1785254940/Developer_collaboration_platform__1080p_202607282126_slxarl.webm",
            Heading: "Resume Builder & Analyser",
            subHeading: "Build & Analyse Resume that gets you in the job not back to preperation."
        },
        {
            img: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785257346/Saved_Frame_from_Developer_collaboration_202607282217_1_qafjc5.webp",
            video: "https://res.cloudinary.com/dj0ivep44/video/upload/v1785254940/Developer_collaboration_platform__1080p_202607282126_slxarl.webm",
            Heading: "AI Based Mock Interviews",
            subHeading: "Shastra will question you for every mentions you did in the carrer profile."
        },
        {
            img: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785257346/Saved_Frame_from_Developer_collaboration_202607282217_1_qafjc5.webp",
            video: "https://res.cloudinary.com/dj0ivep44/video/upload/v1785254940/Developer_collaboration_platform__1080p_202607282126_slxarl.webm",
            Heading: "Removing Project Manager Depedency",
            subHeading: "Shastra will question you for every mentions you did in the carrer profile."
        },
    ]
    const navigate = useNavigate()
    return (

        <div
            className="group flex flex-col items-center justify-center w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <div className='w-[99%] bg-transparet px-5'>
                <div className='text-2xl text-white/80 font-light p-2'>
                    {data[idx].Heading}
                </div>
                <p className='text-md text-white/50 font-extralight w-[90%] mt-1 p-2'>      {data[idx].subHeading}</p>

                <div className="relative w-full h-[350px] rounded-lg overflow-hidden mt-8">

                    {/* Thumbnail */}
                    <img
                        src={data[idx].img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />

                    {/* Video */}
                    <video
                        ref={videoRef}
                        src={data[idx].video}
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                </div>
            </div>





        </div>

    )
}


const Main2 = ({ ctaData }) => {

    const navigate = useNavigate();

    const [transform, setTransform] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTransform(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div id="home"
            className=' w-full bg-gray-200 p-1.5 min-h-screen 
'>

            <div className='w-full h-auto  bg-black  

 rounded-3xl flex flex-col  items-start justify-start py-5 px-2'  >




                <div>

                    <Nav />
                </div>

                <div className='w-full sm:p-6   flex flex-col items-start justify-start  mt-[50px]'>
                    <div className='   text-[#f9f9f9] font-poppins font-medium text-2xl min-[450px]:text-3xl sm:text-4xl lg:text-5xl xl:text-7xl flex flex-col gap-2 justify-start'>
                        <span> CodeSarthi is an Ecosystem </span> <span>designed for the Developers.</span>
                    </div>

                    <div className='relative z-30 mt-4 sm:mt-7 flex gap-2 sm:gap-4'>
                        <MainCTAbutton />
                        <MainCTAbutton2 />
                    </div>

                </div>

                <div className='w-full sm:p-6  relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 '>
                    <Card idx={0} />
                    <Card idx={1} />
                    <Card idx={2} />
                    <Card idx={3} />

                </div>

                <div className='h-[1px] w-[95%] mx-auto bg-white/20 mt-4'>
                </div>
                <Brands />

            </div>
        </div>
    )
}

export default Main2