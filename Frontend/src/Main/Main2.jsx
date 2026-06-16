import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom';




const Main2 = () => {

    const navigate = useNavigate();

    const [transform, setTransform] = useState(true);

    useEffect(() =>
        setTimeout(() => {


            setTransform(false)
        }, 1000)
        , [])


    return (
        <div
            className='relative  w-full bg-gray-200 p-1.5 
'>
            <div
                className="
absolute
inset-0
bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]
"
            />

            <div
                className="
absolute
inset-0
bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)]
bg-[size:40px_40px]
"
            />
            <div className='w-full h-full  bg-black  
 overflow-hidden

 rounded-xl flex flex-col items-start justify-center py-5'  >
                <Nav />
                <div className='w-full text-center py-6   flex flex-col items-center justify-center'>
                    <div className='text-[#f9f9f9] font-poppins font-extrabold min-[450px]:text-2xl  sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl  justify-start'>
                        An Ecosystem that do your works <br />Approvals that keep you safe
                    </div>

                    <div className='h-[30px] lg:h-[40px] mt-3  group font-bold text-sm  border-transparent mt-2 py-1 px-3 lg:px-5 bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 text-black rounded-3xl flex justify-center items-center inline-flex gap-1  cursor-pointer' onClick={() => navigate("/login")} >

                        <svg className="rotate-45 group-hover:rotate-90 transition-all duration-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#222222" />
                        </svg>
                        Get Started !
                    </div>
                </div>

                <div className="relative flex justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 [perspective:1200px] lg:[perspective:1800px]">

                    {/* Glow */}
                    <div
                        className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            w-3/4
            h-16
            sm:h-24
            md:h-32
            bg-white/20
            blur-[60px]
            md:blur-[100px]
            rounded-full
        "
                    />

                    {/* Dashboard */}
                    <div
                        className={`
            relative
            w-[95%]
            sm:w-[92%]
            md:w-[88%]
            lg:w-[82%]
            xl:w-[78%]

            rounded-2xl
            sm:rounded-3xl
            lg:rounded-[36px]

            bg-[#f5f5f5]
            border border-white/20

            p-2
            sm:p-3
            md:p-4

            shadow-[0_30px_80px_rgba(0,0,0,.35)]
            lg:shadow-[0_80px_120px_rgba(0,0,0,.45)]

            origin-bottom

              transition-transform
    duration-[5000ms]
    ease-[cubic-bezier(.22,1,.36,1)]


            ${transform ? `[transform:rotateX(10deg)]
            md:[transform:rotateX(18deg)]
            lg:[transform:rotateX(24deg)]
        ` : `
        [transform:rotateX(0deg)]
        `}
        
        `}
                    >
                        <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[28px]">
                            <img
                                src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781375977/Screenshot_2026-06-13_at_11.29.26_PM_iintuq.webp"
                                className="w-full block"
                                alt=""
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Main2