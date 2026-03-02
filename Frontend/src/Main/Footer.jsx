import React from 'react'
import { useNavigate } from 'react-router-dom'


const Footer = () => {

    const navigate = useNavigate();
    return (


        <div
            className="w-screen mt-[150px]  bg-black text-white 
             flex justify-center items-center 
             overflow-hidden group cursor-pointer"
            onClick={() => navigate("/login")}
        >
            <div
                className="flex flex-col w-full  mb-5"


            >
                <span
                    className="font-extrabold font-head 
                 text-5xl sm:text-6xl md:text-7xl 
                 lg:text-8xl xl:text-[10rem] 2xl:text-[12rem]
                 flex items-center justify-center    bg-gradient-to-b 
        from-white 
        to-gray-900     bg-clip-text 
        text-transparent"
                >
                    CodeSarthi
                </span>


            </div>
        </div>

    )
}

export default Footer