import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyChats = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-[calc(100vh-200px)]  flex flex-col items-center justify-center gap-2">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24">
                    <path fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z" />
                    <path fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12v.01M16 12v.01M12 16a4 4 0 0 1-4-4h-3a3 3 0 0 0 3 3v5h4v-5a3 3 0 0 0 3-3h-3a4 4 0 0 1-4 4Z" />
                </svg>
            </div>
            <h1 className="text-lg font-semibold text-white">No Connections Yet</h1>
            <p className="text-md text-gray-400 group flex items-center justify-center gap-1 hover:underline underline-offset-2 cursor-pointer" onClick={() => navigate("/app/explore")}>Start Exploring Developers


                <span className='group-hover:opacity-100 opacity-0 transition-all duration-300' >
                    <svg xmlns="http://www.w3.org/2000/svg" className='rotate-45' width="1em" height="1em" viewBox="0 0 80 80">
                        <g fill="none">
                            <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z"></path>
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={6} d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177"></path>
                        </g>
                    </svg>
                </span>
            </p>
        </div>
    )
}

export default EmptyChats