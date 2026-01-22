import React, { useState } from 'react'


const Mainhero = () => {
    const [videoMainNum, setVideoMainNum] = useState(1);
    const [videoShortNum, setVideoShortNum] = useState(2);

    const videoHandler = () => {
        setVideoMainNum(prev => (prev === 4 ? 1 : prev + 1));
        setVideoShortNum(prev => (prev === 4 ? 1 : prev + 1));
    };
    return (
        <div className="relative h-screen w-screen overflow-hidden ">

            {/* Background video */}
            <video
                src={`/videos/hero-${videoMainNum}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Center container */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full w-full pt-[6rem] pb-[2rem]">
                <div className='w-screen relative left-5 '>

                    <div className="text-[10rem] text-white font-extrabold font-zentry leading-none">
                        DEVELOPERS
                    </div>
                    <div className="text-lg text-gray-300 font-bold font-robert-medium w-1/3">
                        We build what you need — planning, communication, project management,
                        toolkits, blogs, and much more.
                    </div>
                    <div className='font-bold text-sm relative top-5 border-transparent p-1 px-3 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 text-black rounded-3xl flex justify-center items-center inline-flex gap-2 px-3 py-1'  >
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
                        WATCH TRAILER</div>
                </div>



                {/* Preview video */}
                <div
                    onClick={videoHandler}
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
                        src={`/videos/hero-${videoShortNum}.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                <div className="max-w-6xl ml-auto text-right flex flex-col gap-4">

                    <div className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-white font-extrabold font-zentry leading-none tracking-wider">
                        PROJECTS
                    </div>

                    <div className="text-lg sm:text-xl text-gray-300 font-bold font-robert-medium max-w-md ml-auto leading-relaxed
    ">
                        Engage with developer communities, contribute to real projects,
                        and sharpen your skills.
                    </div>

                </div>


            </div>

        </div >
    )
}

export default Mainhero