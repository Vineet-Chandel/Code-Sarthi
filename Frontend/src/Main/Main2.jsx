import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom';

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
                        fill="#fff"
                    ></path>
                </svg>
            </span>

            <button className="bg-white  px-2  sm:px-4 py-[4px]  sm:py-[7.5px] ">About CodeSarthi</button>
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

const Card = ({ idx }) => {
    const data = [
        {
            Heading: "  Interaction Segment",
            subHeading: "Interact with the developers in all possible way."
        },
        {
            Heading: "Resume Builder & Analyser",
            subHeading: "Build & Analyse Resume that gets you in the job not back to preperation."
        },
        {
            Heading: "AI Based Mock Interviews",
            subHeading: "Shastra will question you for every mentions you did in the carrer profile."
        },
        {
            Heading: "Removing Project Manager Depedency",
            subHeading: "Shastra will question you for every mentions you did in the carrer profile."
        },
    ]
    const navigate = useNavigate()
    return (

        <div className='flex  items-center flex-col justify-center w-full '>
            <div className={`relative top-2 flex items-center justify-between cursor-pointer text-black w-full font-bold `}>
                <span className="text-white relative -right-[1px]">
                    <svg className='h-[40px] rotate-180' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                            fill="#2a2a2a"
                        />
                    </svg>
                </span>

                <div className="bg-[#2a2a2a] h-[40px] w-full "></div>
                <span className="text-white relative -left-[1px]  rotate-[180deg]" >
                    <svg className='h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                        <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                            fill="#2a2a2a"
                        ></path>
                    </svg>
                </span>
            </div>
            <div className='w-[99%] bg-[#2a2a2a] h-[300px] px-5'>
                <div className='text-2xl text-white/80 font-light'>
                    {data[idx].Heading}
                </div>
                <p className='text-md text-white/50 font-extralight w-[90%] mt-1'>      {data[idx].subHeading}</p>
            </div>
            <div className={`relative bottom-2 flex items-center w-full justify-between cursor-pointer text-black  font-bold `}>

                <span className="text-white relative -right-[1px]" >
                    <svg className='h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                        <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                            fill="#2a2a2a"
                        ></path>
                    </svg>
                </span>
                <div className="bg-[#2a2a2a] h-[40px] w-full "></div>
                <span className="text-white relative -left-[1px]">
                    <svg className='h-[40px]' viewBox="0 0 15 40" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                            fill="#2a2a2a"
                        />
                    </svg>
                </span>
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

            <div className='w-full h-[100%]   bg-black  

 rounded-3xl flex flex-col  items-start justify-start py-5 px-2'  >


                <div
                    className="
absolute
inset-0
bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]
"
                />

                <div
                    className="
absolute
inset-0
bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)]
bg-[size:40px_40px]
"
                />

                <div>

                    <Nav />
                </div>

                <div className='w-full sm:p-6   flex flex-col items-start justify-start  mt-[200px]'>
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

                <div className="  relative
            -bottom-[30px] flex justify-center mt-0 sm:mt-1 md:mt-1 lg:mt-1 xl:mt-2 [perspective:1200px] lg:[perspective:1800px]">



                    {/* Dashboard */}
                    {/* <div className="absolute inset-0 -bottom-[30px] z-20 bg-gradient-to-t from-white/50 dark:from-black via-transparent to-transparent"></div>
                    <div
                        className={`
          
            w-[95%]
            sm:w-[92%]
            md:w-[88%]
            lg:w-[82%]
            xl:w-[78%]

            rounded-2xl
            sm:rounded-3xl
            lg:rounded-[36px]

            bg-white/80
            border border-white/20

            p-2
            sm:p-3


            shadow-[0_30px_80px_rgba(0,0,0,.35)]
            lg:shadow-[0_80px_120px_rgba(0,0,0,.45)]

            origin-bottom

    transition-transform
    duration-[5000ms]
    ease-[cubic-bezier(.22,1,.36,1)]


            ${transform ? `[transform:rotateX(10deg)]
            md:[transform:rotateX(18deg)]
            lg:[transform:rotateX(24deg)]
        ` : `
        [transform:rotateX(0deg)]
        `}
        
        `}
                    >

                        <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[28px]">

                            
                            <img
                                src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781375977/Screenshot_2026-06-13_at_11.29.26_PM_iintuq.webp"
                                className="w-full block"
                                alt=""
                            />
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Main2