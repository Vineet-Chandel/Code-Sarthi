import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        // Initial fade in
        const fadeIn = setTimeout(() => setVisible(true), 100);

        // Progress bar logic
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 25);

        // Sequence: Fade out slightly before redirect
        const fadeOut = setTimeout(() => setVisible(false), 3800);
        const redirect = setTimeout(() => navigate("/app"), 4800);

        return () => {
            clearTimeout(fadeIn);
            clearInterval(interval);
            clearTimeout(fadeOut);
            clearTimeout(redirect);
        };
    }, [navigate]);
    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-all duration-[1200ms] ease-in-out ${visible ? "opacity-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
        >
            {/* Ambient Background Depth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/5 blur-[140px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Minimal Top Label */}
                <span className="mb-6 text-[10px] uppercase tracking-[0.6em] text-blue-400/60 font-medium">
                    Developer Ecosystem
                </span>

                <div className="flex flex-col items-center text-center space-y-2">
                    <h2 className="text-3xl md:text-4xl font-light italic text-gray-400/80 font-serif tracking-wide">
                        Welcome to
                    </h2>
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white">
                        Code<span className="text-blue-500">Sarthi</span>
                    </h1>
                </div>

                {/* Tagline Reveal */}
                <p className={`mt-6 text-[11px] uppercase tracking-[0.4em] text-gray-500 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}>
                    Architecting the Future
                </p>

                {/* Precision Loader */}
                <div className="relative mt-16 w-64 h-[1px] bg-white/5 overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Dynamic Counter */}
                <span className="mt-4 font-mono text-[10px] text-gray-600 tracking-[0.2em]">
                    {progress}%
                </span>
            </div>

            {/* Subtle Footer */}
            <div className="absolute bottom-12 flex flex-col items-center gap-2">
                <div className="h-8 w-[1px] bg-gradient-to-b from-blue-500/50 to-transparent" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600">
                    Made in India
                </span>
            </div>
        </div>
    );
};

export default Welcome;