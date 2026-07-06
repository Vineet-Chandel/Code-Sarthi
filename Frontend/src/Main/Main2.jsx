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
            className='relative w-full bg-gray-200 p-1.5 max-h-screen
'>

            <div className='w-full h-full relative bg-black  
 overflow-hidden
 rounded-3xl flex flex-col  items-start justify-start py-5 '  >


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

                <div>

                    <Nav />
                </div>

                <div className='w-full text-center sm:p-6   flex flex-col items-center justify-center'>
                    <div className='   text-[#f9f9f9] font-poppins font-extrabold min-[450px]:text-2xl  sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl  justify-start'>
                        An Ecosystem that do your works <br />Approvals that keep you safe
                    </div>
                </div>

                <div className="  relative
            -bottom-[30px] flex justify-center mt-0 sm:mt-1 md:mt-1 lg:mt-1 xl:mt-2 [perspective:1200px] lg:[perspective:1800px]">



                    {/* Dashboard */}
                    <div className="absolute inset-0 -bottom-[30px] z-20 bg-gradient-to-t from-white/50 dark:from-black via-transparent to-transparent"></div>
                    <div
                        className={`
          
            w-[95%]
            sm:w-[92%]
            md:w-[88%]
            lg:w-[82%]
            xl:w-[78%]

            rounded-2xl
            sm:rounded-3xl
            lg:rounded-[36px]

            bg-white/80
            border border-white/20

            p-2
            sm:p-3


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