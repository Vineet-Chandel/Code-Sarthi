import React from 'react'

const HowToCreate = () => {
    return (
        <div className='w-full bg-base-100 font-sans flex justify-center items-center py-10 sm:py-14 lg:py-20'>

            <div className='w-[95%] bg-base-100 rounded-xl'>

                <div className='bg-secondary rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden'>

                    <div className='flex flex-col lg:flex-row w-full h-full'>

                        {/* Image Section */}
                        <div className='w-full lg:w-[55%] p-4 sm:p-6 md:p-8 lg:p-10'>
                            <img
                                src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777993682/How_to_Create_YouTube_Banner_qepdvq.png"
                                alt="Resume Creation"
                                className='rounded-[24px] sm:rounded-[32px] lg:rounded-[50px] w-full h-full object-cover'
                            />
                        </div>

                        {/* Content Section */}
                        <div className='w-full lg:w-[45%] flex flex-col items-start justify-center px-6 sm:px-10 lg:px-0 py-8 lg:py-0'>

                            <p
                                className='
                                    text-3xl 
                                    sm:text-4xl 
                                    md:text-5xl 
                                    lg:text-5xl 
                                    xl:text-6xl 
                                    font-extrabold 
                                    leading-tight 
                                    text-secondary-content
                                    w-full
                                '
                            >
                                How to Create Your Resume
                            </p>

                            <p
                                className='
                                    text-sm
                                    sm:text-base
                                    lg:text-lg
                                    leading-relaxed
                                    mt-4
                                    text-neutral-content
                                    w-full
                                    sm:w-[90%]
                                    lg:w-[70%]
                                '
                            >
                                Creating a mistake-free resume with CodeSarthi&apos;s AI Resume Builder is not only fast, but easy to do!
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default HowToCreate