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





                        <span className="gap-2 text-md sm:text-xl   font-extralight mx-[10px] flex items-center  px:3 sm:px-7 shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2 sm:py-4 rounded-xl text-white/70 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32">
                                <path fill="#0288d1" d="M28 14v-4h-2v4h-6v-4h-2v4h-4v2h4v4h2v-4h6v4h2v-4h4v-2z"></path>
                                <path fill="#0288d1" d="M13.563 22A5.57 5.57 0 0 1 8 16.437v-2.873A5.57 5.57 0 0 1 13.563 8H18V2h-4.437A11.563 11.563 0 0 0 2 13.563v2.873A11.564 11.564 0 0 0 13.563 28H18v-6Z"></path>
                            </svg>
                            Axonic
                        </span>
                    </div>
                </ParallaxText>



            </section>
        </div>
    );
}