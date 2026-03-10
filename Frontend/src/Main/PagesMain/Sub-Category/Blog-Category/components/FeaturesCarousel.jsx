import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const features = [
    {
        title: "Stay on track with smart reminders",
        img: "/img/f1.png",
        alt: "Smart reminders feature illustration"
    },
    {
        title: "Design habits that actually stick",
        img: "/img/f2.png",
        alt: "Habit design feature illustration"
    },
    {
        title: "Make your goals a reality with pro tips",
        img: "/img/f3.png",
        alt: "Goal achievement tips illustration"
    },
    {
        title: "Overcome procrastination with Pomodoro Technique",
        img: "/img/f4.png",
        alt: "Pomodoro technique illustration"
    },
    {
        title: "Analyze your progress with detailed stats",
        img: "/img/f5.png",
        alt: "Progress statistics illustration"
    },
];

const FeaturesCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(2);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const carouselRef = useRef(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const next = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % features.length);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning]);

    const prev = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning]);

    const goToSlide = useCallback((index) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning, currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                next();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [next, prev]);

    // Touch events for mobile swipe
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            next();
        } else if (isRightSwipe) {
            prev();
        }
    };


    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section
            className="w-full flex flex-col items-center mt-10 mb-10 relative"
            aria-label="Features carousel"
            role="region"
        >
            {/* CARDS CONTAINER */}
            <div
                ref={carouselRef}
                className="relative flex items-center justify-center w-full max-w-6xl h-[400px] sm:h-[350px] px-4"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {features.map((feature, i) => {
                    const offset = i - currentIndex;
                    const isActive = offset === 0;

                    // Calculate scale and opacity based on position
                    const getPositionStyles = () => {
                        if (isActive) {
                            return {
                                scale: 1.1,
                                opacity: 1,
                                zIndex: 20,
                                blur: 0
                            };
                        } else if (Math.abs(offset) === 1) {
                            return {
                                scale: 0.95,
                                opacity: 0.4,
                                zIndex: 10,
                                blur: 2
                            };
                        } else {
                            return {
                                scale: 0.85,
                                opacity: 0.1,
                                zIndex: 1,
                                blur: 4
                            };
                        }
                    };

                    const styles = getPositionStyles();

                    return (
                        <article
                            key={i}
                            className={`absolute transition-all duration-500 ease-in-out cursor-pointer
                                w-[260px] h-[320px] rounded-3xl p-6 flex flex-col items-center justify-center text-center
                                ${isActive
                                    ? 'bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-2xl shadow-yellow-400/10 border border-yellow-400/20 bg-black'
                                    : 'bg-neutral-800/50  border border-gray-700/30 bg-black/80'
                                }`}
                            style={{
                                transform: `translateX(${offset * 280}px) scale(${styles.scale})`,
                                opacity: styles.opacity,
                                zIndex: styles.zIndex,

                            }}
                            onClick={() => goToSlide(i)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    goToSlide(i);
                                }
                            }}
                            role="button"
                            tabIndex={isActive ? 0 : -1}
                            aria-label={`View feature: ${feature.title}`}
                            aria-current={isActive ? 'true' : undefined}
                        >
                            <img
                                src={feature.img}
                                alt={feature.alt}
                                className="w-48 mb-6 object-contain"
                                loading="lazy"
                            />

                            <h3 className="text-lg sm:text-xl font-semibold text-white">
                                {feature.title}
                            </h3>


                        </article>
                    );
                })}

                {/* LEFT BUTTON */}
                <button
                    onClick={prev}
                    className="absolute left-0 lg:left-4 bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 z-30"
                    aria-label="Previous feature"
                    disabled={isTransitioning}
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* RIGHT BUTTON */}
                <button
                    onClick={next}
                    className="absolute right-0 lg:right-4 bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 z-30"
                    aria-label="Next feature"
                    disabled={isTransitioning}
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Mobile swipe indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 lg:hidden text-xs text-gray-400">
                    Swipe to navigate
                </div>
            </div>

            {/* DOTS NAVIGATION */}
            <div className="flex gap-3 mt-8" role="tablist" aria-label="Feature slides">
                {features.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400
                            ${i === currentIndex
                                ? 'bg-yellow-400 w-6'
                                : 'bg-gray-600 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to feature ${i + 1}`}
                        aria-selected={i === currentIndex}
                        role="tab"
                        disabled={isTransitioning}
                    />
                ))}
            </div>

            {/* Feature counter */}
            <div className="mt-4 text-sm text-gray-400">
                {currentIndex + 1} / {features.length}
            </div>
        </section>
    );
};

export default FeaturesCarousel;