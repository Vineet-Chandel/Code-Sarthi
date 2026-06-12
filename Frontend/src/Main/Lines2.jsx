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
                    flex shrink-0 gap-12
                    text-[2.5rem]
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
        <div className="z-10 w-[100%] flex justify-center">
            <section className="bg-transparent text-white py-20 space-y-6 overflow-hidden rounded-b-[100px]  font-poppins">
                <ParallaxText baseVelocity={-1} >

                    <div className="flex items-center gap-3">
                        <span className="mx-[30px] flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 20 20">
                                <path fill="#fff" d="M8 2.5a.5.5 0 0 0-1 0V4h-.5A2.5 2.5 0 0 0 4 6.5V7H2.5a.5.5 0 0 0 0 1H4v1.5H2.5a.5.5 0 0 0 0 1H4V12H2.5a.5.5 0 0 0 0 1H4v.5A2.5 2.5 0 0 0 6.5 16H7v1.5a.5.5 0 0 0 1 0V16h1.5v1.5a.5.5 0 0 0 1 0V16H12v1.5a.5.5 0 0 0 1 0V16h.5a2.5 2.5 0 0 0 2.5-2.5V13h1.5a.5.5 0 0 0 0-1H16v-1.5h1.5a.5.5 0 0 0 0-1H16V8h1.5a.5.5 0 0 0 0-1H16v-.5A2.5 2.5 0 0 0 13.5 4H13V2.5a.5.5 0 0 0-1 0V4h-1.5V2.5a.5.5 0 0 0-1 0V4H8zm2.986 5.04L10.57 9h1.529a.4.4 0 0 1 .307.656l-2.658 3.19c-.293.35-.856.05-.726-.388L9.455 11H7.9a.4.4 0 0 1-.307-.657l2.668-3.188c.29-.348.85-.051.726.385"></path>
                            </svg>
                            DEVELOPERS
                        </span>


                        <span className="mx-[30px] flex items-center gap-5">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.1056 3.44721L5.78885 6.10557C5.00831 6.49585 4.61803 6.69098 4.61803 7C4.61803 7.30902 5.00831 7.50415 5.78885 7.89443L11.1056 10.5528C11.5445 10.7722 11.7639 10.882 12 10.882C12.2361 10.882 12.4555 10.7722 12.8944 10.5528L18.2111 7.89443C18.9917 7.50415 19.382 7.30902 19.382 7C19.382 6.69098 18.9917 6.49585 18.2111 6.10557L12.8944 3.44721C12.4555 3.22776 12.2361 3.11803 12 3.11803C11.7639 3.11803 11.5445 3.22776 11.1056 3.44721Z" fill="#fff" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02217 10.4893C7.62603 10.8135 8.33716 11.169 9.15554 11.5782L10.2113 12.1061C11.0891 12.545 11.528 12.7644 12.0001 12.7644C12.4723 12.7644 12.9112 12.545 13.789 12.1061L14.8447 11.5782C15.6631 11.169 16.3742 10.8135 16.9781 10.4893L18.2113 11.1059C18.9918 11.4961 19.3821 11.6913 19.3821 12.0003C19.3821 12.3093 18.9918 12.5044 18.2113 12.8947L12.8946 15.5531C12.4557 15.7725 12.2362 15.8822 12.0001 15.8822C11.7641 15.8822 11.5446 15.7725 11.1057 15.5531L11.1057 15.5531L5.78898 12.8947C5.00844 12.5044 4.61816 12.3093 4.61816 12.0003C4.61816 11.6913 5.00844 11.4961 5.78898 11.1059L7.02217 10.4893Z" fill="#fff" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02169 15.4893C7.62567 15.8135 8.33696 16.1692 9.15557 16.5785L10.2113 17.1063C11.0891 17.5452 11.528 17.7647 12.0001 17.7647C12.4723 17.7647 12.9112 17.5452 13.789 17.1063L14.8447 16.5785C15.6633 16.1692 16.3746 15.8135 16.9786 15.4893L18.2113 16.1056C18.9918 16.4959 19.3821 16.691 19.3821 17C19.3821 17.3091 18.9918 17.5042 18.2113 17.8945L12.8946 20.5528C12.4557 20.7723 12.2362 20.882 12.0001 20.882C11.7641 20.882 11.5446 20.7723 11.1057 20.5528L11.1057 20.5528L5.78898 17.8945C5.00844 17.5042 4.61816 17.3091 4.61816 17C4.61816 16.691 5.00844 16.4959 5.78898 16.1056L7.02169 15.4893Z" fill="#fff" />
                            </svg>
                            RESUME BUILDER
                        </span>


                        <span className="mx-[30px] flex items-center gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                                <path fill="#fff" d="M24 12.024c-6.437.388-11.59 5.539-11.977 11.976h-.047C11.588 17.563 6.436 12.412 0 12.024v-.047C6.437 11.588 11.588 6.437 11.976 0h.047c.388 6.437 5.54 11.588 11.977 11.977z"></path>
                            </svg>
                            SHASTRA AI
                        </span>


                        <span className="mx-[30px] flex items-center gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 14 14">
                                <path fill="#fff" fillRule="evenodd" d="M3.68 4.031c1.013 0 1.582-.57 1.582-1.582S4.692.866 3.68.866s-1.583.57-1.583 1.583s.57 1.581 1.583 1.581Zm7.32.783a.75.75 0 1 0 1.5-.06a50 50 0 0 0-.049-.971A2.65 2.65 0 0 0 9.96 1.29q-.749-.044-1.487-.065a.75.75 0 1 0-.043 1.5q.715.02 1.441.063a1.15 1.15 0 0 1 1.084 1.083q.028.474.046.943Zm-5.605 8.244a.75.75 0 0 0 .046-1.499q-.675-.02-1.361-.061a1.15 1.15 0 0 1-1.084-1.084l-.023-.424a.75.75 0 0 0-1.498.076l.024.437a2.65 2.65 0 0 0 2.492 2.492q.708.043 1.404.063m4.925-2.675c1.303 0 2.197.91 2.382 2.178c.04.273-.189.498-.465.498H8.402c-.276 0-.505-.225-.465-.498c.185-1.269 1.078-2.178 2.382-2.178Zm-4.258-3.5C5.878 5.616 4.984 4.707 3.68 4.707s-2.198.91-2.383 2.178c-.04.273.189.498.465.498h3.836c.276 0 .504-.225.464-.498Zm5.84 1.244c0 1.013-.57 1.583-1.583 1.583s-1.582-.57-1.582-1.583s.57-1.583 1.582-1.583s1.583.57 1.583 1.583" clipRule="evenodd"></path>
                            </svg>
                            COLLABRATE
                        </span>

                        <span className="mx-[30px] flex items-center gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                                <path fill="#fff" d="M19 4h-4.18a2.988 2.988 0 0 0-5.64 0H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2V6a2.006 2.006 0 0 0-2-2m-7 0a1 1 0 1 1-1 1a1.003 1.003 0 0 1 1-1m-2 5l2.79 2.794l2.52-2.52L14 8h4v4l-1.276-1.311l-3.932 3.935L10 11.83l-2.586 2.584L6 13Zm9 10H5v-2h14Z"></path>
                            </svg>
                            PROJECT MANAGER
                        </span>

                        <span className="mx-[30px] flex items-center gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 48 48">
                                <defs>
                                    <mask id="SVGKmZ2HFof">
                                        <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth={4}>
                                            <path strokeLinecap="round" d="M8 25v13a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V25"></path>
                                            <path fill="#555" d="M5 15a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"></path>
                                            <path strokeLinecap="round" d="M31 13V9a2 2 0 0 0-2-2H19a2 2 0 0 0-2 2v4m-2 10v6m18-6v6"></path>
                                        </g>
                                    </mask>
                                </defs>
                                <path fill="#fff" d="M0 0h48v48H0z" mask="url(#SVGKmZ2HFof)"></path>
                            </svg>
                            DEVELOPERS TOOLKIT
                        </span>


                        <span className="mx-[30px] flex items-center gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16">
                                <path fill="#fff" d="m4.768 2.922l.01-.006l.046-.027q.061-.037.185-.103c.165-.087.405-.204.702-.32C6.31 2.228 7.121 2 8 2s1.69.23 2.289.465a7 7 0 0 1 .887.424q.031.017.045.027l.01.006h.001a.5.5 0 0 0 .536-.844h-.001l-.002-.002l-.005-.003l-.018-.011l-.061-.037a8 8 0 0 0-1.025-.49C9.984 1.27 9.045 1 8 1s-1.985.27-2.655.535a8 8 0 0 0-1.026.49l-.061.037l-.018.01l-.005.004l-.002.001a.5.5 0 0 0 .535.845M4 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1.5a.5.5 0 0 0-.8-.4l-2 1.5a.5.5 0 0 0-.2.4v2a.5.5 0 0 0 .2.4l2 1.5a.5.5 0 0 0 .8-.4zm-9.231 7.579l-.001-.001a.5.5 0 0 0-.536.844h.001l.002.002l.005.003l.018.011q.021.014.061.037q.08.046.224.124c.191.1.465.233.802.366c.67.264 1.61.535 2.655.535c1.046 0 1.985-.27 2.655-.535a8 8 0 0 0 1.026-.49l.061-.037l.018-.01l.005-.004l.002-.001h.001a.5.5 0 0 0-.536-.845l-.01.007l-.046.026q-.061.037-.185.103a7 7 0 0 1-.702.32C9.69 13.772 8.879 14 8 14s-1.69-.23-2.289-.465a7 7 0 0 1-.887-.424l-.045-.027z"></path>
                            </svg>
                            MEETINGS
                        </span>
                        <span className="mx-[30px] flex items-center gap-5">
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V18.6667C20 18.9767 20 19.1317 19.9659 19.2588C19.8735 19.6039 19.6039 19.8735 19.2588 19.9659C19.1317 20 18.9767 20 18.6667 20H12C7.58172 20 4 16.4183 4 12Z" fill="#fff" fill-opacity="1" />
                                <path d="M8.5 10.5L15.5 10.5" stroke="#000" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.5 13.5L13.5 13.5" stroke="#000" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Messages
                        </span>


                        {/*• SCHEDULE • •  */}

                    </div>
                </ParallaxText>
            </section>
        </div>
    );
}