import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const PageNotFound = () => {
    const navigate = useNavigate();
    
    // 3D Tilt Logic
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

    function handleMouseMove(event) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate normalized values between -0.5 and 0.5
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    }
    
    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // A subtle, rapid shaking animation
    const typingShake = {
        animate: {
            x: [0, -3, 3, -3, 0],
            y: [0, -2, 2, -2, 0],
            rotate: [0, -1, 1, -1, 0],
            transition: {
                repeat: Infinity,
                duration: 0.15,
                ease: "linear"
            }
        }
    };

    return (
        <div className="min-h-[100dvh] bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-['Outfit',sans-serif]" style={{ perspective: "1000px" }}>
            <motion.div 
                ref={cardRef}
                className="max-w-2xl w-full flex flex-col items-center justify-center p-12 py-20 bg-white rounded-[3rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* 404 Text with shake animation */}
                <motion.h1 
                    className="text-[10rem] md:text-[14rem] font-black leading-[0.85] text-black tracking-tighter mb-6"
                    variants={typingShake}
                    animate="animate"
                    style={{ transform: "translateZ(80px)" }}
                >
                    404
                </motion.h1>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 tracking-wide" style={{ transform: "translateZ(50px)" }}>
                    Sorry! Something happened.
                </h1>

                <div className="flex flex-col sm:flex-row items-center gap-6 mt-2" style={{ transform: "translateZ(60px)" }}>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 px-8 py-3.5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300 active:scale-95 text-[15px]"
                    >
                        <Home size={20} strokeWidth={2.5} />
                        Return Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-3.5 text-gray-500 font-bold hover:text-black transition-colors duration-300 active:scale-95 text-[15px]"
                    >
                        <ArrowLeft size={20} strokeWidth={2.5} />
                        Step Back
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PageNotFound;