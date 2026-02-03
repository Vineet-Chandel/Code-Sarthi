import React from 'react'
import Nav from '../../nav.jsx'

const Privacy = () => {
    return (
        <div className="h-auto  w-full bg-black overflohidden bg-black absolute">
            <Nav />

            <div className="flex flex-col justify-center items-center h-1/2 mt-[200px] ">

                <div className="text-[8rem] font-head text-white leading-none font-extrabold">
                    CodeSarthi
                </div>
                <div className="text-[6rem] font-head text-white leading-none font-extrabold">
                    PRIVACY CENTER
                </div>
                <div className="text-3xl font-circular-web text-gray-200  relative top-6">
                    Because protecting your privacy is essential to feeling safe.
                </div>
            </div>
            <div className="flex flex-col justify-center items-center h-1/2 mt-[300px] ">

                <div className="text-[4rem] font-head text-white leading-none font-extrabold">
                    OUR COMMITMENT TO PRIVACY
                </div>

                <div className="text-3xl font-circular-web text-gray-200  relative top-6 w-[60%] text-center">
                    Team Axonic created CodeSarthi to be a platform that brings developers together while respecting your privacy.Across CodeSarthi, we build privacy into our products, and we keep you informed about what’s happening with your data. Here are our guiding principles:
                </div>
            </div>
            <div
                className=" w-full px-10 flex justify-center items-center mt-[100px] max-lg:px-6 max-sm:px-4">
                <div className=" w-full flex gap-10 max-xl:gap-6 max-lg:flex-col">
                    {/* CARD 1 */}
                    <div className=" w-1/2 h-[400px] rounded-[100px] bg-gray-900 flex flex-col justify-center items-center p-10 max-md:w-full max-sm:rounded-[40px] max-sm:p-6">
                        <div className=" text-white font-head font-extrabold text-center text-2xl max-lg:text-xl max-md:text-4xl negMove">
                            CodeSarthi Developer Toolkit
                        </div>
                    </div>
                    {/* RIGHT CARD */}
                    <div className=" w-1/2 h-[400px] rounded-[100px] bg-gray-900 flex flex-col justify-center items-center p-10 max-lg:w-full max-sm:rounded-[40px] max-sm:p-6">
                        <div className=" text-white font-head font-extrabold text-center text-2xl max-lg:text-4xl ">
                            Developer Help and Support
                        </div>
                    </div>
                </div>
            </div>
            <div
                className=" w-full px-10 flex justify-center items-center mt-[50px] max-lg:px-6 max-sm:px-4">
                <div
                    className=" w-full flex gap-10 max-xl:gap-6 max-lg:flex-col">

                    {/* CARD 1 */}
                    <div
                        className=" w-1/2 h-[400px] rounded-[100px] bg-stone-900 flex flex-col justify-center items-center p-10 max-md:w-full max-sm:rounded-[40px] max-sm:p-6">
                        <div
                            className=" text-white font-head font-extrabold text-center text-2xl max-lg:text-xl max-md:text-4xl negMove">
                            CodeSarthi Developer Toolkit
                        </div>


                    </div>




                    {/* RIGHT CARD */}
                    <div
                        className=" w-1/2 h-400px rounded-[100px] bg-gray-900 flex flex-col justify-center items-center p-10 max-lg:w-full max-sm:rounded-[40px] max-sm:p-6">
                        <div className=" text-white font-head font-extrabold text-center text-2xl max-lg:text-4xl">
                            Developer Help and Support
                        </div>


                    </div>
                </div>
            </div>
        </div >
    )
}

export default Privacy
