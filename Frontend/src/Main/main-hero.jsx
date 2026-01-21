import React, { useState } from 'react'


const Mainhero = () => {
    const [videoMainNum, setVideoMainNum] = useState(1);
    const [videoShortNum, setVideoShortNum] = useState(2);

    const videoHandler = () => {
        setVideoMainNum(prev => (prev === 4 ? 1 : prev + 1));
        setVideoShortNum(prev => (prev === 4 ? 1 : prev + 1));
    };
    return (
        <div className="relative h-screen w-screen overflow-hidden ">

            {/* Background video */}
            <video
                src={`/videos/hero-${videoMainNum}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Center container */}
            <div className="relative z-10 flex items-center justify-center h-full w-full">

                {/* Preview video */}
                <div
                    onClick={videoHandler}
                    className="
                        h-[350px] w-[350px]
                        overflow-hidden rounded-xl cursor-pointer
                        opacity-0 scale-95
                        hover:opacity-100
                       hover:scale-100
                        transition-all duration-500 ease-in-out
                    "
                >
                    <video
                        src={`/videos/hero-${videoShortNum}.mp4`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>

        </div>
    )
}

export default Mainhero