import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const x = useSpring(mouseX, {
        stiffness: 500,
        damping: 35,
    });

    const y = useSpring(mouseY, {
        stiffness: 500,
        damping: 35,
    });

    useEffect(() => {
        const handleMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMove);

        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <motion.svg
            style={{ x, y }}
            className="fixed pointer-events-none z-[9999]"
            width="21"
            height="24"
            viewBox="0 0 21 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_203_135)">
                <path d="M6.90088 16.9893L4.40088 3.98935L15.4009 10.4893L9.90088 11.9893L6.90088 16.9893Z" fill="black" />
                <path d="M4.65479 3.55869L15.6548 10.0587L16.6733 10.6602L15.5327 10.9718L10.2251 12.419L7.32959 17.2462L6.65674 18.3683L6.40967 17.0841L3.90967 4.08408L3.70068 2.99423L4.65479 3.55869Z" stroke="white" strokeLinecap="square" />
            </g>
            <defs>
                <filter id="filter0_d_203_135" x="0" y="0" width="20.946" height="23.7465" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_203_135" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_203_135" result="shape" />
                </filter>
            </defs>
        </motion.svg>
    );
}

export default CustomCursor;