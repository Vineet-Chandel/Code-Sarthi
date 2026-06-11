import React from 'react'
import { Sparkles } from 'lucide-react'
const InterviewArenaLanding = () => {
    return (
        <div className="flex  flex-col items-center text-center gap-2 relative">

            <div
                className="
            absolute z-30
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

                font-black
                leading-tight
            "
                >
                    Defend Your Career with{" "}
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Chakravyūha AI
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

                text-gray-400
                leading-relaxed
            "
                >
                    Build ATS-optimized resumes, analyze job descriptions,
                    identify skill gaps, prepare for company-specific interviews,
                    and master every question before facing recruiters.
                </p>
            </div>

            <img
                className="
            w-full
            object-cover

            mt-[170px]

            md:mt-[250px]
            lg:mt-[300px]
            xl:mt-[350px]

        "
                src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1781118196/123Z_2101.w020.n001.946B.p15_1_nweqqi.webp"
                alt=""
            />
        </div>
    )
}

export default InterviewArenaLanding
