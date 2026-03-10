import { useCallback } from 'react';

const StartHero = () => {
    const handleGetStarted = useCallback(() => {
        // Add your get started logic here
        // For example: scroll to top, open modal, navigate to signup, etc.
        const schedulerSection = document.getElementById('scheduler-top');
        if (schedulerSection) {
            schedulerSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    return (
        <section
            className="w-full min-h-[80vh] flex items-center justify-end px-4 sm:px-[8%] bg-cover bg-center relative mt-20"
            style={{ backgroundImage: "url('/img/start-bg.png')" }}
            aria-label="Call to action section"
            role="region"
        >
            {/* Dark overlay with gradient for better text readability */}
            <div
                className="absolute inset-0"
                aria-hidden="true"
            ></div>

            {/* Card */}
            <div
                className="relative bg-[#1e2127]/95 backdrop-blur-md p-8 sm:p-10 rounded-2xl w-full sm:w-[380px] shadow-2xl text-center border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-500 animate-fadeIn"
                role="article"
            >
                {/* Decorative accent line */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    The best time to start
                    <br />
                    <span className="text-yellow-400 relative inline-block mt-1">
                        is now!
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400/30 rounded-full"></span>
                    </span>
                </h2>

                <p className="text-gray-300 text-sm sm:text-base mt-6 leading-relaxed">
                    You're about to take the first step in changing your life!
                    Let us guide you through it.
                </p>

                {/* Feature highlights */}
                <div className="flex justify-center gap-4 mt-6 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        Free trial
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        No credit card
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                        Cancel anytime
                    </span>
                </div>

                <button
                    className="mt-8 w-full py-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold text-base sm:text-lg hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1e2127]"
                    onClick={handleGetStarted}
                    aria-label="Get started with Lakshya"
                >
                    Get started
                </button>

                {/* Trust indicator */}
                <p className="mt-4 text-xs text-gray-500">
                    Join thousands of happy users 🌟
                </p>
            </div>

            {/* Optional: Add CSS animation */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default StartHero;