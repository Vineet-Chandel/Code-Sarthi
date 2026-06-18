import Nav from '@/Main/Nav'
import React from 'react'

const Landing = () => {
    return (
        <div className="w-full min-h-screen bg-gray-200 p-2 overflow-hidden">

            <div className="relative flex  flex-col rounded-2xl sm:rounded-3xl bg-black overflow-hidden py-4 sm:py-5 lg:py-6 items-center justify-center">
                <div className='relative z-30'>
                    <Nav />
                </div>

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



                <div
                    className="
relative
            top-3
            sm:top-5
            md:top-10
            lg:top-15
            xl:top-20

            flex flex-col
            items-center
            justify-center
            gap-2

         
            px-4
            sm:px-6
            md:px-8
        "
                >
                    <h1
                        className="
                max-w-xs
                sm:max-w-2xl
                md:max-w-4xl
                lg:max-w-5xl

                text-2xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
text-center
text-white font-extrabold
                leading-tight
            "
                    >
                        Defend Your Career with{" "} <br />
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            CodeSarthi
                        </span>
                    </h1>

                    <p
                        className="
                max-w-sm
                sm:max-w-xl
                md:max-w-2xl
                lg:max-w-3xl

                text-xs
                sm:text-base
                md:text-lg
                lg:text-xl
text-center
                text-gray-400
                leading-relaxed
            "
                    >
                        Resume Analysis, JD analysis, skill-gap detection, and AI interview preparation everything you need to land the job
                    </p>
                </div>

                <img
                    className="
            w-full
            object-cover

            mt-[30px]

            md:mt-[80px]
            lg:mt-[130px]
            xl:mt-[180px]

        "
                    src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1781118196/123Z_2101.w020.n001.946B.p15_1_nweqqi.webp"
                    alt=""
                />

            </div>
        </div>
    )
}

export default Landing