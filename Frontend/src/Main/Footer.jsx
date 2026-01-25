import React from 'react'

const Footer = () => {
    return (
        <div className="
            h-screen 
            w-full 
            flex flex-col
            bg-black
            overflow-hidden
             bg-gradient-to-r from-blue-500/20 to-purple-500/20 
        ">
            <div className="
                h-1/2 
                border-b border-gray-800
                flex items-end justify-center pb-12
            ">

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
                
                relative
                group
            ">
                {/* Glow effect */}
                <div className="
                    absolute 
                    inset-0 
                    blur-3xl 
                    group-hover:blur-4xl 
                    transition-all 
                    duration-500
                "></div>

                {/* Main text */}
                <div className="relative z-10 text-[18rem] tracking-[0.1rem] font-Logo-font">
                    <div className='flex'>
                        <div className='flex'>
                            <div className='hover:opacity-50 transistion-all duration-300 '>C</div>
                            <div className='hover:opacity-50 transistion-all duration-300 '>o</div>
                            <div className='hover:opacity-50 transistion-all duration-300 '>d</div>
                            <div className='hover:opacity-50 transistion-all duration-300 '>e</div>
                        </div>

                        <div className='flex'>
                            <div className='hover:opacity-50 transistion-all duration-300 '>S</div>
                            <div className='hover:opacity-50 transistion-all duration-300 '>a</div>
                            <div className='hover:opacity-50 transistion-all duration-300 '>r</div>
                            <div className='hover:opacity-50 transistion-all duration-300 '>t</div>
                            <div className='hover:opacity-50 transistion-all duration-300 '>h</div>
                            <div className='hover:opacity-50 transistion-all duration-300 '>i</div>
                        </div>

                    </div>
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