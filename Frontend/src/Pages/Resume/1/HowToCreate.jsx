import React from 'react'

const HowToCreate = () => {
    return (
        <div className='w-full  bg-base-100  font-sans flex flex-col justify-center items-center  '>

            <div className='w-[95%] h-[500px] bg-base-100 rounded-xl px-40  pb-20'>
                <div className='bg-secondary w-full h-full flex justify-center items-center rounded-[40px] '>
                    <div className='flex w-full h-full'>
                        <div className='flex w-[55%] h-full  p-10 '>
                            <img src="https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777993682/How_to_Create_YouTube_Banner_qepdvq.png" alt="" className='rounded-[50px] w-full' />

                        </div>
                        <div className='flex w-[45%] h-full flex-col items-start justify-center    '>
                            <p className='text-5xl font-extrabold  leading-none text-secondary-content w-full'>How to Create Your Resume</p>
                            <p className='text-lg  leading-none mt-3 text-neutral-content w-[65%]'>Creating a mistake-free resume with CodeSarthi's AI Resume Builder is not only fast, but easy to do!</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default HowToCreate