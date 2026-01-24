import React from 'react'

const Footer = () => {
    return (
        <div className="
            h-screen 
            w-full 
            flex flex-col
            bg-black
            overflow-hidden
        ">
            <div className="
                h-1/2 
                border-b border-gray-800
                flex items-end justify-center pb-12
            ">
                <div className="text-white text-center">
                    <p className="text-sm tracking-[0.3em] mb-2">SCROLL TO EXPLORE</p>
                    <div className="w-6 h-10 border-2 border-white rounded-full mx-auto flex items-start justify-center pt-2">
                        <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>

            <div className="
                h-1/2
                text-white
                flex justify-center items-center
                font-Logo-font
                font-extrabold
                text-[18rem] md:text-[22rem] lg:text-[25rem] xl:text-[28rem]
                tracking-[-0.02em]
                leading-[0.8]
                uppercase
                relative
                group
            ">
                {/* Glow effect */}
                <div className="
                    absolute 
                    inset-0 
                    bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                    blur-3xl 
                    group-hover:blur-4xl 
                    transition-all 
                    duration-500
                "></div>

                {/* Main text */}
                <div className="relative z-10">
                    CodeSarthi
                </div>

                {/* Subtle hint */}
                <div className="
                    absolute 
                    bottom-4 
                    right-4 
                    text-gray-500 
                    text-xs 
                    tracking-[0.5em]
                    rotate-90
                    origin-bottom-right
                ">
                    SCROLL
                </div>
            </div>
        </div>
    )
}

export default Footer