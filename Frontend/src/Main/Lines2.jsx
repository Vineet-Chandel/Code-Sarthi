import { useRef, useState } from "react";
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

const ReviewCard = ({ item, onHover }) => {
    return (
        <div
            className="w-[360px] rounded-3xl bg-white/5 border border-white/10 p-6 mr-6 shrink-0 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20  flex flex-col justify-between h-[250px]"
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            <div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={item.image}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                            alt={item.name}
                        />
                        <div>
                            <h3 className="font-semibold text-white text-base leading-snug">{item.name}</h3>

                        </div>
                    </div>

                    {/* Proof Button */}
                    <a
                        href={item.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-medium transition-colors duration-200"
                    >
                        Verify
                    </a>
                </div>

                {/* FIXED: Added whitespace-normal so text wraps properly inside the scrolling track */}
                <div className="mt-4 text-gray-300 leading-relaxed text-[14px] whitespace-normal line-clamp-4">
                    "{item.review}"
                </div>
            </div>


        </div>
    );
};

const ParallaxText = ({ children, baseVelocity = 5, isHovered }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    // Wrapped range configured for standard infinite loops
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        if (isHovered) return; // Pauses on hover smoothly

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap flex w-full">
            <motion.div style={{ x }} className="flex shrink-0 will-change-transform transform-gpu">
                <div className="flex shrink-0">{children}</div>
                <div className="flex shrink-0">{children}</div>
                <div className="flex shrink-0">{children}</div>
            </motion.div>
        </div>
    );
};

export default function Lines() {
    const [isHovered, setIsHovered] = useState(false);

    const testimonials = [
        {
            name: "Alex Johnson",

            image: "https://i.pravatar.cc/100?img=1",
            proofUrl: "https://linkedin.com",
            review: "CodeSarthi completely changed the way I prepare for interviews. The AI suggestions are incredibly accurate.",
        },
        {
            name: "Sophia Lee",

            image: "https://i.pravatar.cc/100?img=5",
            proofUrl: "https://twitter.com",
            review: "Resume Builder and ATS analysis saved me hours. I finally started getting interview calls.",
        },
        {
            name: "Rahul Sharma",

            image: "https://i.pravatar.cc/100?img=12",
            proofUrl: "https://github.com",
            review: "The roadmap generation feature is amazing. It feels like having a personal mentor available 24/7.",
        },
        {
            name: "Emma Wilson",

            image: "https://i.pravatar.cc/100?img=22",
            proofUrl: "https://linkedin.com",
            review: "Beautiful UI, smooth experience, and genuinely useful AI recommendations. Highly recommended!",
        },
        {
            name: "Daniel Kim",

            image: "https://i.pravatar.cc/100?img=18",
            proofUrl: "https://twitter.com",
            review: "Project collaboration and resume optimization together make CodeSarthi stand out from other platforms.",
        },
    ];

    return (
        <div id="testimonials" className="w-full bg-black flex flex-col justify-center overflow-hidden ">

            <div className=' w-full  flex flex-col items-center justify-center  '>
                <h2
                    className="
                    font-poppins
                    font-semibold
                    text-2xl
                    sm:text-3xl
                    lg:text-5xl
                    leading-tight
                    text-white
mt-10

                  
                "
                >
                    Loved by thousands of people
                </h2>

                <p className='text-md mt-3 text-gray-300 text-center w-full '  >Here's what some of our users have to say about CodeSarthi</p>

            </div>
            <div className="relative">
                {/* Left */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-[300px] bg-gradient-to-r from-black to-transparent z-30" />

                {/* Right */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-[300px] bg-gradient-to-l from-black to-transparent z-30" />
                <section className="py-20 w-full overflow-hidden font-poppins flex flex-col gap-5">


                    <ParallaxText baseVelocity={-1} isHovered={isHovered}>


                        {testimonials.map((item, index) => (
                            <ReviewCard
                                key={index}
                                item={item}
                                onHover={setIsHovered}
                            />
                        ))}
                    </ParallaxText>
                    <ParallaxText baseVelocity={1} isHovered={isHovered}>
                        {testimonials.map((item, index) => (
                            <ReviewCard
                                key={index}
                                item={item}
                                onHover={setIsHovered}
                            />
                        ))}
                    </ParallaxText>
                    <ParallaxText baseVelocity={-1} isHovered={isHovered}>
                        {testimonials.map((item, index) => (
                            <ReviewCard
                                key={index}
                                item={item}
                                onHover={setIsHovered}
                            />
                        ))}
                    </ParallaxText>
                </section>

            </div>

        </div>
    );
}