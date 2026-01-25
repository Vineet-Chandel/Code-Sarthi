import React from 'react'

const ContentFirst = () => {
    return (
        <div className="bg-black h-screen text-white w-full flex flex-col justify-center items-center">

            <div className="relative top-[30px] flex flex-col justify-center items-center w-full gap-6">

                <div className="text-6xl font-extrabold font-Logo-font text-center">
                    A PLATFORM FOR ENDLESS POSSIBILITIES
                </div>

                <div className="text-xl font-light w-[50%] text-center">
                    Whether you're launching a community or putting the final touches on your project, CodeSarthi provides the tools to reach, build, and grow with millions of developers.
                </div>

            </div>

            <div className="w-[90%] justify-self-center flex mt-20">
                <div className="w-1/2 flex flex-col justify-center items-center text-start gap-4 p-11">
                    <div className="text-6xl font-extrabold font-Logo-font">
                        KEEP DEVELOPERS ENGAGED
                    </div>
                    <div className="text-lg ">
                        Strengthen developer connections and elevate the development experience by integrating CodeSarthi’s social features directly into your projects.
                    </div>
                </div>

                <div className="w-1/2">
                    {/* visuals / image / animation here */}
                </div>
            </div>

        </div>
    )
}

export default ContentFirst
