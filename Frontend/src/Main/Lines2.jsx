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
            name: "Ayush Tripathi",

            image: "https://avatars.githubusercontent.com/u/250406547?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17594476",
            review: "Really liked using CodeSarthi! The AI assistant is fast, helpful, and makes coding much easier. The UI is clean and beginner-friendly.Looking forward to more features and improvements. Great work to the team! 🚀",
        },
        {
            name: "Yatharth Sharma",

            image: "https://avatars.githubusercontent.com/u/249609646?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17603523",
            review: "CodeSarthi has been genuinely useful for my dev workflow. The Resume Builder stood out most—clean templates and ATS-friendly formatting saved me hours of formatting hassle. Combined with the AI Assistant for quick coding help, it's a solid all-in-one platform. Would definitely recommend to fellow developers and students. Great work!",
        },
        {
            name: "Sharvan",

            image: "https://avatars.githubusercontent.com/u/181192220?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17603812",
            review: "Really like the direction CodeSarthi is heading. The platform feels modern, easy to use, and built with developers in mind. Keep it up Being curious for Project management segment to launch!!",
        },
        {
            name: "Varshal Gupta",

            image: "https://avatars.githubusercontent.com/u/266241498?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17612204",
            review: "I've watched CodeSarthi grow from just an idea to something people can actually use. It's awesome to see your vision becoming reality. Keep pushing, keep improving, and don't stop building. You've got this! 💙",
        },
        {
            name: "Bhumika Gupta",

            image: "https://avatars.githubusercontent.com/u/280631145?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17624277",
            review: "The thing I liked most is that CodeSarthi isn't trying to do too much at once—it feels focused and well thought out. The experience is smooth, and I can see it becoming a really useful platform for developers. Looking forward to the next release.",
        },
        {
            name: "Sourav Yadav",

            image: "https://avatars.githubusercontent.com/u/264805866?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17698225",
            review: "Code Sarthi is a game-changer for developers It brings everything a developer needs—from AI resume building and interview preparation to collaboration and project management—into one powerful platform.Clean, smart, and incredibly useful for students and professionals alike.Highly recommended",
        },
        {
            name: "Vinayak Dubey",

            image: "https://avatars.githubusercontent.com/u/307045224?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17698471",
            review: "A great place for devlopers , a place where devlopers feel like home everything at onee place from interview preps to competing , from a student level user base to a project team user base a great idea coming to reality",
        },
    ];

    const testimonials2 = [
        {
            name: "Ayushman",

            image: "https://avatars.githubusercontent.com/u/306396295?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17678758",
            review: "Just used the CodeSarthi's resume builder it's really amazing it really helping me in the analysis of my resume thanks a lot for such a great product and vineet looking for the future collaboration with u in my team i will contact u as we start",
        },
        {
            name: "Keval",

            image: "https://avatars.githubusercontent.com/u/95030129?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/11#discussioncomment-17614163",
            review: "looks great man. only thing I want to say, try not to add an npm package for everything. half the time native js does the same job and every lib you add is just more stuff the browser has to download. honestly few of them u can drop, keeps things light and fast.",
        },
        {
            name: "Rahul Tripathi",

            image: "https://avatars.githubusercontent.com/u/236558490?v=4",
            proofUrl: "https://github.com/Vineet-Chandel/Code-Sarthi/discussions/10#discussioncomment-17839635",
            review: "To be honest, I genuinely feel that CodeSarthi has become more than just a project, it has already reached the initial stage of a complete ecosystem. A platforming serving as a guide to all the freshmen about where to start and how to proceed in the professional world with clean and soothing interface and interactive environment is what the students needed all along. I appreciate the owner who came up with this idea and implemented it in the form of a wonderful service. I hope that CodeSarthi gets the recognition it deserves and help more and more people in their professional journey. Thank you.",
        },

    ];

    return (

        <div className="w-full h-full bg-black pt-5">
            < div id="testimonials" className="max-w-[1500px] mx-auto bg-black flex flex-col justify-center overflow-hidden " >

                <div className=' w-full  flex flex-col items-start justify-center  pl-5 pt-5'>

                    <img className='mb-3 sm:mr-5 w-15 h-15' src="https://neon.com/_next/static/media/auth.0rhscsge1_ukb.svg?dpl=dpl_2krqjZKb71veXn3xx7f5ScK8b3Aj" alt="" />
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

                    <p className='text-md mt-3 text-gray-300 text-left w-full '  >Here's what some of our users have to say about CodeSarthi</p>

                </div>
                <div className="relative">
                    {/* Left */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] sm:w-[300px] bg-gradient-to-r from-black to-transparent z-30" />

                    {/* Right */}
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] sm:w-[300px] bg-gradient-to-l from-black to-transparent z-30" />
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
                            {testimonials2.map((item, index) => (
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

            </div >

        </div>

    );
}