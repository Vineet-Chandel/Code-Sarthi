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
        <div className="overflow-hidden whitespace-nowrap flex">
            <motion.div
                style={{ x }}
                className="
                    flex shrink-0 gap-12
                    text-[7rem]
                    max-md:text-[4rem]
                    font-black
                    uppercase
                    leading-none
                    will-change-transform
                    transform-gpu
                "
            >
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
        <div className="z-10">
            <section className="bg-gray-200 text-black py-20 space-y-6 overflow-hidden rounded-b-[100px] font-generalBold">
                <ParallaxText baseVelocity={-1} >
                    • DEVELOPERS • RESUME BUILDER • SHASTRA AI • COLLABRATE • SCHEDULE • PROJECTS • TOOLKIT • MEETINGS
                </ParallaxText>
            </section>
        </div>
    );
}