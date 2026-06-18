import React from "react";
import ShortPreview from "./ShortPreview";
import { useNavigate } from "react-router-dom";


const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-black w-full h-screen flex items-center justify-center">
            <div className="w-[80%] flex justify-center items-center">
                <div className="w-3/4">
                    <h1 className="text-4xl mb-2 font-bold">Your Career Profile</h1>
                    <ShortPreview />
                </div>

                <div className="w-1/4 flex justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer" onClick={() => {
                        navigate("/app/build-resume/buildResume")
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24">
                            <path fill="#000" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"></path>
                        </svg>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Landing;