import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom';




const Main2 = ({ ctaData }) => {

    const navigate = useNavigate();

    const [transform, setTransform] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTransform(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div id="home"
            className='relative w-full bg-gray-200 p-1.5 
'>

            <div className='w-full  relative bg-black  
 overflow-hidden
 rounded-[40px] flex flex-col items-start justify-center py-5'  >


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


                <Nav />

                <div className='w-full text-center p-6   flex flex-col items-center justify-center'>
                    <div className='text-[#f9f9f9] font-poppins font-extrabold min-[450px]:text-2xl  sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl  justify-start'>
                        An Ecosystem that do your works <br />Approvals that keep you safe
                    </div>


                    <div className='flex mt-5 gap-2'>
                        <div onClick={() => navigate("/login")} className={`relative z-10 flex items-center justify-between cursor-pointer text-black  font-bold flex gap-0`}>

                            <span className="text-white relative -right-[1px]">
                                <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                                    <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                                        fill="#fff"
                                    ></path>
                                </svg>
                            </span>
                            <button className="bg-white  px-4 py-[7.539px] ">{ctaData}</button>
                            <span className="text-white relative -left-[1px]">
                                <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                                        fill="#fff"
                                    />
                                </svg>
                            </span>
                        </div>



                    </div>



                </div>

                <div className="relative flex justify-center mt-1 sm:mt-1 md:mt-1 lg:mt-1 xl:mt-2 [perspective:1200px] lg:[perspective:1800px]">

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