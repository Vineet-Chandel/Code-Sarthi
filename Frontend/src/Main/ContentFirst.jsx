import React from 'react'

const ContentFirst = () => {
    return (
        <div className="bg-black text-white w-screen flex flex-col justify-center items-center my-[150px]">

            <div className=" flex flex-col justify-center items-center w-full gap-6">

                <div className="text-5xl font-extrabold font-head text-center">
                    A PLATFORM FOR ENDLESS POSSIBILITIES
                </div>

                <div className="text-2xl font-extralight w-[60%] text-center">
                    <b className='font-extrabold'>CodeSarthi</b>  connects you with a global developer community to build and scale.
                    Designed to boost <b className='font-extrabold'>productivity</b>  while keeping workflows <b className='font-extrabold'>fast</b> and <b className='font-extrabold'>efficient</b>.
                </div>

            </div>

            {/* KEEP DEVELOPERS ENGAGED */}
            <div className="w-[90%] justify-self-center flex items-center justify-between px-6 mt-40  ">
                <div className="w-1/2 flex flex-col justify-center items-center text-start gap-4 p-11 ">
                    <div className="text-5xl font-extrabold font-head">
                        KEEP DEVELOPERS ENGAGED
                    </div>
                    <div className="w-full flex flex-col gap-4 pl-5">
                        <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                            ✦ A unified interaction layer that seamlessly connects developers, teams, and communities.
                        </p>
                        <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                            ✦ Bridges messaging, meetings, and collaboration in one place.
                        </p>
                        <p className="text-xl text-start transition-all duration-200 hover:text-green-400 hover:scale-105">
                            ✦ Enables rich media communication (text, video, files, code).
                        </p>
                        <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                            ✦ Improves productivity by keeping all interactions centralized.
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

                <div className="w-1/2  flex justify-end px-10 ">
                    <video
                        src={"/videos/feature-1.mp4"}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="  rounded-[150px] object-cover h-[600px] w-[600px]"
                    />
                </div>
            </div>


            {/* BUILD YOUR COMMUNITY */}

            <div className="w-[90%] justify-self-center flex items-center justify-between px-6 mt-20  ">


                <div className="w-1/2  flex justify-start px-10 ">
                    <video
                        src={"/videos/feature-2.mp4"}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="  rounded-[150px] object-cover h-[600px] w-[600px]"
                    />
                </div>

                <div className="w-1/2 flex flex-col justify-center items-center text-left gap-4 p-11 ">
                    <div className="text-5xl font-extrabold font-head">
                        Eliminates dependency on Project Manager
                    </div>
                    <div className="w-full flex flex-col gap-4 pl-5">
                        <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                            ✦ Combines scheduling, tracking, and accountability in one system
                        </p>
                        <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
                            ✦ Invite team members with role-based access
                        </p>
                        <p className="text-xl text-start  transition-all duration-200 hover:text-green-400 hover:scale-105">
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

            </div>


            {/* ACQUIRE NEW PLAYERS */}
            <div className="w-[90%] justify-self-center flex items-center justify-between px-6 mt-20  ">
                <div className="w-1/2 flex flex-col justify-center items-center text-left gap-4 p-11 ">
                    <div className="text-6xl font-extrabold font-head">
                        TIME IS PRECIOUS
                    </div>
                    <div className="w-full flex flex-col gap-4 pl-5">
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

                <div className="w-1/2  flex justify-end px-10 ">
                    <video
                        src={"/videos/feature-3.mp4"}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="  rounded-[150px] object-cover h-[600px] w-[600px]"
                    />
                </div>
            </div>

            <div className='w-full h-auto px-10 flex gap-10  mt-[100px] justify-center items-center'>
                <div className='w-1/3 h-[400px] border-transparent rounded-[100px] bg-stone-900 flex justify-center items-center p-10 flex-col'>
                    <div className='text-white font-head font-extrabold text-center text-[2rem]'>CodeSarthi Developer Toolkit</div>
                    <div className='h-[60px] cursor-pointer font-bold text-sm relative top-5 border-transparent p-1 px-5 bg-neutral text-white rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1 hover:border-white'  >
                        <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_0_3844)">
                                <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_3844">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        VIEW DOCUMENTATION</div>
                </div>
                <div className='w-1/3 h-[400px] border-transparent rounded-[100px] bg-stone-900 flex justify-center items-center p-10 flex-col'>
                    <div className='text-white font-head font-extrabold text-center  text-[2rem]'>Global Developers Community</div>
                    <div className='h-[60px] cursor-pointer font-bold text-sm relative top-5 border-transparent p-1 px-5 bg-neutral text-white rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1 hover:border-white'  >
                        <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_0_3844)">
                                <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_3844">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        JOIN COMMUNITY </div>
                </div>
                <div className='w-1/3 h-[400px] border-transparent rounded-[100px] bg-stone-900 flex justify-center items-center p-10 flex-col'>
                    <div className='text-white text-center font-head font-extrabold text-[2rem]'>Developer Help and Support</div>
                    <div className='h-[60px] cursor-pointer font-bold text-sm relative top-5 border-transparent p-1 px-5 bg-neutral text-white rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1 hover:border-white'  >
                        <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_0_3844)">
                                <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_3844">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        VIEW HELP CENTER</div>
                </div>
            </div>



            <div className='w-full h-auto px-10 flex gap-10  mt-[100px] justify-center items-center'>
                <div className='w-full h-[500px] border-transparent rounded-[100px] bg-neutral flex justify-center items-center p-10 flex-col'>
                    <div className='text-white font-head font-extrabold text-center text-[7rem]'>STAY TUNED</div>
                    <p className='text-2xl w-[50%] flex justify-center text-gray-300 text-center '>Want to keep up to date with all the latest news and updates we brings for the developers?</p>
                    <div className='h-[60px] cursor-pointer font-bold text-sm relative top-5 border-transparent p-1 px-5 bg-white text-black rounded-3xl flex justify-center items-center inline-flex gap-3 px-3 py-1 hover:border-white '  >
                        <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_0_3844)">
                                <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#000000" />
                            </g>
                            <defs>
                                <clipPath id="clip0_0_3844">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        SIGN UP FOR NEWSLETTER</div>
                </div>

            </div>



        </div>
    )
}

export default ContentFirst
