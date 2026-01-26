import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = ({ onFinish }) => {
    useGSAP(
        () => {
            const tl = gsap.timeline({

                onComplete: () => {
                    onFinish?.(); // notify parent safely
                },
            });
            tl.from(".text-1", {
                x: -500,
                duration: 1.5,
                opacity: 0,
                ease: "power4.out",
            })
            tl.from(
                ".text-2",
                {
                    x: 500,
                    duration: 1.5,
                    opacity: 0,
                    ease: "power4.out",
                },
                "<" // same time
            )
            tl.to(".text-1", {

                x: -500,
                duration: 1.5,
                opacity: 0,
                ease: "power4.in",
            })
            tl.to(
                ".text-2",
                {
                    x: +500,
                    duration: 1.5,
                    opacity: 0,
                    ease: "power4.in",
                },
                "<" // same time
            )


            tl.to(".preStair", {
                height: 0,

                duration: 1.5,
                stagger: 0.1,
                ease: "power4.in",
            })


        }
    );

    return (
        <div

            className="fixed inset-0 z-50 flex h-screen w-screen"
        >
            {/* Center Logo */}
            <div className=" absolute inset-0 z-50 bg-white/200  font-extrabold  text-white flex justify-center items-center gap-11 
                max-xl:gap-9  
                max-lg:gap-7 
                max-md:gap-5 
                max-sm:gap-3
            ">
                <div className="text-1 text-[12rem] font-extrabold 
                max-xl:text-[10rem] 
                max-lg:text-[8rem] 
                max-md:text-[6rem] 
                max-sm:text-[4rem] "><b>Code</b></div>
                <div className="text-2 text-[12rem] font-extrabold 
                max-xl:text-[10rem] 
                max-lg:text-[8rem] 
                max-md:text-[6rem] 
                max-sm:text-[4rem] "><b>Sarthi</b></div>
            </div>

            {/* Stair Animation */}
            <div className="preStair w-1/5 bg-black"></div>
            <div className="preStair w-1/5 bg-black"></div>
            <div className="preStair w-1/5 bg-black"></div>
            <div className="preStair w-1/5 bg-black"></div>
            <div className="preStair w-1/5 bg-black"></div>

        </div>
    );
};

export default Preloader;
