import React from 'react'
import { useNavigate } from 'react-router-dom'

import { motion } from "framer-motion";
const CTAcreateResume = () => {
    const Navigate = useNavigate()
    return (
        <div className='flex gap-5 mt-10'>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.4 }}
                className='border-[3px]  border-transparent   border-dashed p-1 hover:border-secondary rounded-3xl   transition duration-200 flex justify-center items-center '>
                <button className='text-center h-15 text-lg w-45 font-extrabold transition duration-200 bg-base-300 rounded-3xl hover:bg-secondary hover:text-secondary-content p-5  flex justify-center items-center ' onClick={() => Navigate('/app/build-resume')}>
                    Import your resume
                </button>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.4 }}
                className='border-[3px]  border-transparent   border-dashed p-1 hover:border-secondary rounded-3xl   transition duration-200 flex justify-center items-center '>
                <button className='text-center h-15 text-lg w-45 font-extrabold transition duration-200 bg-base-300 rounded-3xl hover:bg-secondary hover:text-secondary-content p-5  flex justify-center items-center ' onClick={() => Navigate('/app/build-resume')}>
                    Create my resume
                </button>
            </motion.div>
        </div >
    )
}

export default CTAcreateResume