import React from 'react'

const ContentThird = () => {
    return (
        <div>
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

                            <button className="group relative h-[60px] px-6 p-4 mt-4 rounded-3xl font-bold text-sm bg-neutral top-5 transition-all duration-300 overflow-hidden flex justify-center items-center inline-flex gap-3"> <div className="absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 top-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 top-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_0_3844)"> <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" /> </g> <defs> <clipPath id="clip0_0_3844"> <rect width="14" height="14" fill="white" /> </clipPath> </defs> </svg> VIEW HELP CENTER <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 bottom-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> </button>
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

                            <button className="group relative h-[60px] px-6 p-4 mt-4 rounded-3xl font-bold text-sm bg-neutral top-5 transition-all duration-300 overflow-hidden flex justify-center items-center inline-flex gap-3"> <div className="absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 top-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 top-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_0_3844)"> <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" /> </g> <defs> <clipPath id="clip0_0_3844"> <rect width="14" height="14" fill="white" /> </clipPath> </defs> </svg> VIEW HELP CENTER <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 bottom-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> </button>
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

                        <button className="group relative h-[60px] px-6 p-4 mt-4 rounded-3xl font-bold text-sm bg-neutral top-5 transition-all duration-300 overflow-hidden flex justify-center items-center inline-flex gap-3"> <div className="absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 top-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 top-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> <svg className='rotate-45' width="14" height="14" viewBox="0 0 14 14" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_0_3844)"> <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="#ffffff" /> </g> <defs> <clipPath id="clip0_0_3844"> <rect width="14" height="14" fill="white" /> </clipPath> </defs> </svg> VIEW HELP CENTER <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-stone-500"></div> <div className="absolute inset-x-0 bottom-0 h-[3px] w-[50%] mx-auto bg-gradient-to-r from-transparent via-stone"></div> <div className="absolute inset-x-0 bottom-0 h-[1px] w-[50%] mx-auto cursor-pointer group-hover:h-[4px] group-hover:blur-sm transition-all duration-300 bg-gradient-to-r from-transparent via-stone-400"></div> </button>
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

export default ContentThird