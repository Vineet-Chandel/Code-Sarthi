import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";

import { wrap } from "@motionone/utils";

const ParallaxText = ({
    children,
    baseVelocity = 5,
}) => {
    const baseX = useMotionValue(0);

    const { scrollY } = useScroll();

    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });

    const velocityFactor = useTransform(
        smoothVelocity,
        [0, 1000],
        [0, 5],
        {
            clamp: false,
        }
    );

    const x = useTransform(
        baseX,
        (v) => `${wrap(-45, -20, v)}%`
    );

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy =
            directionFactor.current *
            baseVelocity *
            (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy +=
            directionFactor.current *
            moveBy *
            velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap   flex">
            <motion.div
                style={{ x }}
                className="
                    flex 




                    leading-none
                    will-change-transform
                    transform-gpu
                    
                "
            >

                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>



            </motion.div>


        </div>
    );
};


const DivPart = ({ props, i = 0 }) => {

    const data = [

        {

            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3 11l2.5-2.5c1.017-1.017 1.526-1.526 2.137-1.638a2 2 0 0 1 .726 0c.611.112 1.12.62 2.137 1.638s1.526 1.526 2.137 1.638c.24.045.486.045.726 0c.611-.112 1.12-.621 2.137-1.638L21 3M3 15v6m6-8v8m6-5v5m6-12v12"></path>
                </svg>
            )
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 512 512">
                    <path fill="#fff" d="M2.1 184.2C0 194.9 0 208.1 0 230.2v53.1c0 27.4 0 41.1 4 53.4c3.5 10.9 9.3 20.8 16.9 29.3c8.6 9.6 20.5 16.4 44.2 30.1l46 26.6c21 12.1 32.7 18.9 43.9 22.1V280.9c0-8.2-4.5-15.7-11.7-19.7zm384.7 24.1v85.5c0 11.8 5.1 23.1 14.1 30.8l61.5 53.2c3.6 3 7.3 5.5 11.2 7.5c4 1.8 7.9 2.7 11.6 2.7c8 0 14.5-2.6 19.3-7.9q7.5-8.1 7.5-21v-216c0-8.6-2.5-15.5-7.5-20.8c-4.8-5.4-11.3-8.1-19.3-8.1c-3.7 0-7.6.9-11.6 2.7c-3.9 1.8-7.6 4.3-11.2 7.5l-61.5 53c-9 7.8-14.1 19-14.1 30.9M22.6 153.7c-1.7-.9-3.5-1.6-5.3-1.9c1.1-1.5 2.3-2.9 3.6-4.3c8.6-9.6 20.5-16.4 44.2-30.1l46-26.6c23.7-13.7 35.6-20.6 48.2-23.2c11.2-2.4 22.7-2.4 33.9 0c12.6 2.7 24.5 9.5 48.2 23.2l45.5 26.3c.2.1.4.2.5.3c23.7 13.7 35.6 20.6 44.2 30.1c7.6 8.5 13.4 18.5 16.9 29.3c4 12.3 4 26 4 53.4v53.1c0 27.4 0 41.1-4 53.4c-3.5 10.9-9.3 20.8-16.9 29.3c-8.6 9.6-20.5 16.4-44.2 30.1c-.2.1-.4.2-.6.4l-45.4 26.2c-23.7 13.7-35.6 20.6-48.2 23.2c-.5.1-1 .2-1.6.3V280.9c0-21.6-11.8-41.5-30.8-51.8z"></path>
                </svg>
            )
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                </svg>
            )
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 5a3 3 0 1 0 0 6a3 3 0 1 0 0-6m1 7h-2c-2.76 0-5 2.24-5 5v.5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V17c0-2.76-2.24-5-5-5m-6.5-1c.47 0 .9-.12 1.27-.33a5.03 5.03 0 0 1-.42-4.52C7.09 6.06 6.8 6 6.5 6C5.06 6 4 7.06 4 8.5S5.06 11 6.5 11m-.39 1H5.5C3.57 12 2 13.57 2 15.5v1c0 .28.22.5.5.5H4c0-1.96.81-3.73 2.11-5m11.39-1c1.44 0 2.5-1.06 2.5-2.5S18.94 6 17.5 6c-.31 0-.59.06-.85.15a5.03 5.03 0 0 1-.42 4.52c.37.21.79.33 1.27.33m1 1h-.61A6.97 6.97 0 0 1 20 17h1.5c.28 0 .5-.22.5-.5v-1c0-1.93-1.57-3.5-3.5-3.5"></path>
                </svg>
            )
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m4.5 38.613l9.63-13.36l13.083 6.802L43.5 9.387l-6.562 4.389M43.5 9.387l-1.909 7.712"></path>
                </svg>
            )
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 4h-4.18a2.988 2.988 0 0 0-5.64 0H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2V6a2.006 2.006 0 0 0-2-2m-7 0a1 1 0 1 1-1 1a1.003 1.003 0 0 1 1-1m-2 5l2.79 2.794l2.52-2.52L14 8h4v4l-1.276-1.311l-3.932 3.935L10 11.83l-2.586 2.584L6 13Zm9 10H5v-2h14Z"></path>
                </svg>
            )
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48">
                    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={4}>
                        <path strokeLinecap="round" d="M8 25v13a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V25"></path>
                        <path fill="currentColor" d="M5 15a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"></path>
                        <path strokeLinecap="round" d="M31 13V9a2 2 0 0 0-2-2H19a2 2 0 0 0-2 2v4m-2 10v6m18-6v6"></path>
                    </g>
                </svg>
            )
        }, {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M4 24h10v2H4zm0-6h10v2H4zm22-4H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M6 6v6h20V6Zm20 22h-6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2m-6-8v6h6v-6Z"></path>
                </svg>
            )
        }
    ];

    const item = data[i] || data[0];

    return (<span className="gap-2 text-md sm:text-xl   font-extralight mx-[10px] flex items-center  px:3 sm:px-7 shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2 sm:py-4 rounded-xl text-white/70 ">
        {item?.icon}
        {props}
    </span>)
}

export default function Lines() {
    return (
        <div className="z-10 w-[98%] relative mx-auto flex justify-center">

            {/* Left */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] sm:w-[300px] bg-gradient-to-r from-black to-transparent z-30" />

            {/* Right */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] sm:w-[300px] bg-gradient-to-l from-black to-transparent z-30" />
            <section className="bg-transparent text-white flex flex-col  overflow-hidden  font-poppins">


                <ParallaxText baseVelocity={-0.3} >

                    <div className="flex items-center  py-3">



                        <DivPart props={"Resume Builder & Analyser"} i={0} />
                        <DivPart props={"AI Based Mock Interviews"} i={1} />
                        <DivPart props={"Shastra AI"} i={2} />
                        <DivPart props={"Interaction Segment"} i={3} />
                        <DivPart props={"Personal Tracking"} i={4} />
                        <DivPart props={"Project Management"} i={5} />
                        <DivPart props={"Developers Toolkit"} i={6} />
                        <DivPart props={"Tech Blogs"} i={7} />

                    </div>
                </ParallaxText>



            </section>
        </div>
    );
}