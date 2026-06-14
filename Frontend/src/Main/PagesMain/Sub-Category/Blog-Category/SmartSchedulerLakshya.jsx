import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from "react-redux";
import FeaturesCarousel from "./components/FeaturesCarousel";
import StartHero from "./components/StartHero";
import Nav from '../../../Nav';

const SmartSchedulerLakshya = () => {
    const user = useSelector((store) => store.user);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const scrollToFeatures = useCallback(() => {
        const featuresSection = document.getElementById('features-section');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    // Memoize static content to prevent unnecessary re-renders
    const heroContent = useMemo(() => ({
        title: `Make ${currentYear} your most`,
        subtitle: 'successful',
        description: 'Discover ',
        highlight: 'Lakshya',
        fullDescription: ' – the app that helps you build positive life-changing habits. Effortlessly track your habits, reach your personal goals, and stay motivated every day.'
    }), [currentYear]);

    const handleImageLoad = useCallback(() => {
        setIsImageLoaded(true);
    }, []);

    return (
        <div
            className="min-h-screen w-full text-white bg-cover bg-center bg-fixed flex flex-col items-center"
            style={{
                backgroundImage: "url('/img/todo.png')",
                backgroundColor: '#0a0a0a' // Fallback color
            }}
            role="main"
            aria-label="Lakshya Scheduler landing page"

        >
            <Nav />
            {/* Skip to content link for accessibility */}
            < a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-400 text-black px-4 py-2 rounded-lg z-50"
            >
                Skip to main content
            </a >

            {/* NAVBAR */}


            {/* MAIN CONTENT */}
            <main id="main-content" className="w-full flex flex-col items-center">
                {/* HERO SECTION */}
                <section
                    className="w-[85%] flex flex-col lg:flex-row justify-between items-center mt-20 gap-8 lg:gap-12"
                    aria-labelledby="hero-heading"
                >
                    {/* LEFT TEXT */}
                    <div className="lg:w-[50%] text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
                        <h1
                            id="hero-heading"
                            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
                        >
                            {heroContent.title}
                            <br />
                            <span className="text-yellow-400 relative inline-block mt-2">
                                {heroContent.subtitle}
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400/30 rounded-full"></span>
                            </span>
                            <span className="block text-2xl sm:text-3xl lg:text-4xl text-gray-300 mt-4">
                                year ever
                            </span>
                        </h1>

                        <p className="text-gray-300 text-lg sm:text-xl max-w-xl text-center lg:text-left mb-8 leading-relaxed">
                            {heroContent.description}
                            <span className="text-green-400 font-semibold relative group">
                                {heroContent.highlight}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                            {heroContent.fullDescription}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="bg-yellow-400 text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-105 hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent"
                                onClick={scrollToFeatures}
                                aria-label="Get started with Lakshya"
                            >
                                Get started
                            </button>

                            {!user?.name && (
                                <button
                                    className="border-2 border-gray-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-400"
                                    aria-label="Learn more about Lakshya"
                                >
                                    Learn more
                                </button>
                            )}
                        </div>

                        {/* Social proof */}
                        <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-gray-800"
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <span>Join <span className="text-yellow-400 font-semibold">10,000+</span> happy users</span>
                        </div>
                    </div>

                    {/* PHONE IMAGE */}
                    <div className="lg:w-[45%] rounded-[60px] sm:rounded-[80px] lg:rounded-[100px] p-6 sm:p-8 lg:p-10 flex justify-center bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 relative overflow-hidden group">
                        {/* Loading skeleton */}
                        {!isImageLoaded && (
                            <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
                        )}

                        <img
                            src="/img/scheduler.png"
                            alt="Lakshya app interface preview showing scheduler feature with habit tracking and goal management"
                            className={`w-[85%] sm:w-[80%] drop-shadow-2xl transition-all duration-700 ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                } hover:scale-105 hover:rotate-1`}
                            loading="eager"
                            onLoad={handleImageLoad}
                            onError={(e) => {
                                e.target.src = '/img/fallback-image.png'; // Add fallback image
                            }}
                        />

                        {/* Decorative elements */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl"></div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section
                    id="features-section"
                    className="w-full flex flex-col items-center mt-32 scroll-mt-24 relative"
                    aria-labelledby="features-heading"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent pointer-events-none"></div>

                    <div className="flex items-center gap-3 relative">
                        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center overflow-hidden ring-2 ring-yellow-400/20">
                            <img
                                src="/img/logotodo.png"
                                className="w-full h-full object-cover"
                                alt=""
                                aria-hidden="true"
                                loading="lazy"
                            />
                        </div>
                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Lakshya
                        </span>
                    </div>

                    <h2
                        id="features-heading"
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-6 text-center max-w-5xl leading-tight px-4"
                    >
                        Things you can do with
                        <span className="text-green-400 relative inline-block ml-2">
                            Lakshya
                            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                                <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-green-400/30" />
                            </svg>
                        </span>
                    </h2>

                    {/* Feature highlight badges */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {['Habit Tracking', 'Goal Setting', 'Progress Analytics', 'Smart Reminders'].map((feature) => (
                            <span
                                key={feature}
                                className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-gray-700"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </section>

                <FeaturesCarousel />
                <StartHero />
            </main>

            {/* Footer */}
            <footer className="w-full mt-20 py-8 border-t border-gray-800/50">
                <div className="w-[85%] mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {currentYear} Lakshya. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default SmartSchedulerLakshya;