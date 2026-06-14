import React from 'react'

const ContentFirst2 = () => {
    return (
        <div className='w-screen  bg-gray-200 px-10 flex flex-col gap-2 py-10'>

            <div className='w-full text-center  flex flex-col items-center justify-center mb-5'>
                <div className='text-[#000] font-poppins font-extrabold text-7xl  justify-start'>
                    A Platform for Endless Possibilities
                </div>

                <p className='text-[#000] font-poppins font-light text-lg mt-2   text-center w-1/2'>CodeSarthi connects you with a global developer community to build and scale. Designed to boost productivity while keeping workflows fast and efficient.</p>
            </div>

            <div className='w-full flex flex-row gap-2'>
                <div className='h-[700px] w-1/2 bg-white rounded-3xl flex flex-col p-3'>
                    <div className='h-[70%] bg-black/20 rounded-3xl'></div>
                    <div className='h-[30%] bg-transparent'></div>

                </div>
                <div className='h-[700px] w-1/2 bg-black rounded-3xl   p-3'>
                    <div className='h-[70%] bg-white/20 rounded-3xl'></div>
                    <div className='h-[30%] bg-transparent'></div>
                </div>
            </div>
            <div className='w-full h-[345px] bg-white rounded-3xl'></div>
        </div>
    )
}

export default ContentFirst2