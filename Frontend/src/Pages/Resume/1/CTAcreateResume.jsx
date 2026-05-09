import React from 'react'
import { useNavigate } from 'react-router-dom'


const CTAcreateResume = () => {
    const Navigate = useNavigate()
    return (
        <div className='flex gap-5 mt-10'>
            <div className='border-[3px]  border-transparent  border-dashed p-1 hover:border-secondary rounded-3xl    transition duration-200 flex justify-center items-center '>
                <button className='text-center h-15 text-lg w-45 font-extrabold transition duration-200 bg-base-300 rounded-3xl hover:bg-secondary hover:text-secondary-content p-5  flex justify-center items-center '>
                    Import your resume
                </button>
            </div>
            <div className='border-[3px]  border-transparent   border-dashed p-1 hover:border-secondary rounded-3xl   transition duration-200 flex justify-center items-center '>
                <button className='text-center h-15 text-lg w-45 font-extrabold transition duration-200 bg-base-300 rounded-3xl hover:bg-secondary hover:text-secondary-content p-5  flex justify-center items-center ' onClick={() => Navigate('/app/build-resume')}>
                    Create my resume
                </button>
            </div>
        </div>
    )
}

export default CTAcreateResume