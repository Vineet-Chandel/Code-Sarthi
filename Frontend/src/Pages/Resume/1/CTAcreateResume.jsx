import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const CTAcreateResume = () => {
    const Navigate = useNavigate()

    return (
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10 w-full'>

            {/* Create Resume Button */}
            <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className='
                    border-[3px]
                    border-transparent
                    border-dashed
                    p-1
                    hover:border-secondary-content
                    rounded-3xl
                    transition duration-200
                    flex justify-center items-center
                    w-full sm:w-auto
                '
            >
                <button
                    className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                        w-full
                        sm:w-52
                        lg:w-56
                        font-extrabold
                        transition duration-200
                        bg-white
                        rounded-3xl
                        text-base-100
                        px-5
                        flex justify-center items-center
                        whitespace-nowrap
                    '
                    onClick={() => Navigate('/app/build-resume')}
                >
                    Create my resume

                    <svg
                        className='ml-3 shrink-0'
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 15 15"
                    >
                        <path d="M0 0h15v15H0z" fill="none" />
                        <path
                            fill="currentColor"
                            d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"
                        />
                    </svg>
                </button>
            </motion.div>

            {/* Import Resume Button */}
            <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className='
                    border-[3px]
                    border-transparent
                    border-dashed
                    p-1
                    hover:border-secondary
                    rounded-3xl
                    transition duration-200
                    flex justify-center items-center
                    w-full sm:w-auto
                '
            >
                <button
                    className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                        w-full
                        sm:w-52
                        lg:w-56
                        font-extrabold
                        transition duration-200
                        bg-base-300
                        rounded-3xl
                        hover:bg-secondary
                        hover:text-secondary-content
                        px-5
                        flex justify-center items-center
                        whitespace-nowrap
                    '
                    onClick={() => Navigate('/app/build-resume')}
                >
                    Import your resume

                    <svg
                        className='ml-3 shrink-0'
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.3em"
                        height="1.3em"
                        viewBox="0 0 24 24"
                    >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                            fill="#fff"
                            d="M11.625 15.513q-.175-.063-.325-.213l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062t-.375-.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"
                        />
                    </svg>
                </button>
            </motion.div>

        </div>
    )
}

export default CTAcreateResume