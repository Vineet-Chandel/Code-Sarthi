import { useState } from "react";

const Hero = () => {
    const [videoMainNum, setVideoMainNum] = useState(1);
    const [videoShortNum, setVideoShortNum] = useState(2);

    const videoHandler = () => {
        setVideoMainNum(prev => (prev === 4 ? 1 : prev + 1));
        setVideoShortNum(prev => (prev === 4 ? 1 : prev + 1));
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden group">

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
                        overflow-hidden rounded-lg cursor-pointer
                        opacity-0 scale-95
                        group-hover:opacity-100
                        group-hover:scale-100
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

            {/* Heading (center vertically or top — your choice) */}

            <h1 className="
                absolute top-3 left-3 z-20 text-4xl font-extrabold text-white font-robert-medium
            ">
                CodeSarthi
            </h1>


        </div>
    );
};

export default Hero;
