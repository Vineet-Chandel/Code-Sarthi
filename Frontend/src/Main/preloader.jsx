
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

            tl.to(".preStair", {
                height: 0,

                duration: 1.5,
                stagger: 0.1,
                ease: "power4.in",
            })


        }
    );




    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden">

            {/* Center Logo */}
            <div
                className="
                absolute inset-0 z-50
                flex items-center justify-center
                 text-white font-extrabold
                px-4
            "
            >
                <div
                    className="
                    flex flex-row items-center
                    gap-10
    
                    max-md:flex-col
                    max-md:gap-2
                "
                >

                </div>
            </div>



            {/* Stair Animation */}
            <div className="preStair flex-1 bg-black"></div>
            <div className="preStair flex-1 bg-black"></div>
            <div className="preStair flex-1 bg-black"></div>
            <div className="preStair flex-1 bg-black"></div>
            <div className="preStair flex-1 bg-black"></div>
        </div>
    );
};

export default Preloader;
