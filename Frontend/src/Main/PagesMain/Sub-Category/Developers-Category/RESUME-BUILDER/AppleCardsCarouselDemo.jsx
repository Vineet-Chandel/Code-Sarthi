"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";

export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full">

            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                        <p
                            className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of Apple club is that you boast about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <img
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain" />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Artificial Intelligence",
        title: "You can do more with AI.",
        src: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777484000/UConn_Brand_Resume_A4_1_xaft3e.png",
        content: <DummyContent />,
    },
    {
        category: "Productivity",
        title: "Enhance your productivity.",
        src: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777483999/UConn_Brand_Resume_A4_lswehm.png",
        content: <DummyContent />,
    },
    {
        category: "Product",
        title: "Launching the new Apple Vision Pro.",
        src: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777483998/UConn_Brand_Resume_A4_2_cyqug5.png",
        content: <DummyContent />,
    },

    {
        category: "Product",
        title: "Maps for your iPhone 15 Pro Max.",
        src: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1777484416/UConn_Brand_Resume_A4_3_kty9d2.png",
        content: <DummyContent />,
    },
    {
        category: "iOS",
        title: "Photography just got better.",
        src: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1779556730/Screenshot_2026-05-23_at_10.46.01_PM_inita9.png",
        content: <DummyContent />,
    },
    {
        category: "Hiring",
        title: "Hiring for a Staff Software Engineer",
        src: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1779556850/Optimize_Your_Resume_for_a_High_ATS_Score_Over_95_by_Sarthak_Goyal_bhjpfp.jpg",
        content: <DummyContent />,
    },
];
