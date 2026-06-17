import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const CTAcreateResume = () => {
    const Navigate = useNavigate()

    return (
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10 w-full relative z-10'>

            {/* Create Resume Button */}

            <button
                className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                        w-full
                        sm:w-62
                        lg:w-70
                        font-extrabold
                        transition duration-200
                        bg-white
                        rounded-3xl
                        text-black
                        px-5
                        flex justify-center items-center
                        whitespace-nowrap group gap-1
                    '
                onClick={() => Navigate('/app/build-resume/buildResume')}
            >
                <svg className='rotate-45 group-hover:rotate-90 transition-all duration-500' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#222222" />
                </svg>

                Build Your Career Profile



            </button>


            {/* Import Resume Button */}

            <button
                className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                         w-full
                        sm:w-62
                        lg:w-70
                        font-extrabold
                        transition duration-200
                        bg-white/20
                        rounded-3xl
                        text-white
                        px-5
                        flex justify-center items-center
                        whitespace-nowrap
                    '
                onClick={() => Navigate('/app/build-resume')}
            >
                Generate Resume from Profile
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


        </div>
    )
}

export default CTAcreateResume