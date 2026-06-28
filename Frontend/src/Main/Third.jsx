import React from "react";

const Third = () => {
    return (
        <section
            className="relative overflow-hidden bg-[#f5f2e9] bg-cover bg-center py-12 lg:py-24"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dj0ivep44/image/upload/v1782618245/background-bottom_jhhw4o.png')",
            }}
        >
            <div className="max-w-[1700px] mx-auto px-2 sm:px-6 lg:px-16">

                {/* Heading Block */}
                <div className="flex flex-col items-start overflow-hidden">

                    {/* Line 1 — filled black box */}
                    <h1 className="
                        inline-block bg-black px-3 sm:px-5 py-1 sm:py-2
                        uppercase leading-none text-white font-zentry tracking-[0.2rem] sm:tracking-[0.3rem]
                        text-[clamp(2.5rem,10vw,10.625rem)]
                    ">
                        MORE COLLAB
                    </h1>

                    {/* Line 2 — offset right, overlapping upward */}
                    <h1 className="
                        uppercase leading-none text-black font-zentry tracking-[0.2rem] sm:tracking-[0.3rem] font-black
                        text-[clamp(2.5rem,10vw,10.625rem)]
                        self-end

                    ">
                        LESS WRECK
                    </h1>

                </div>

                {/* Bottom CTA row */}
                <div className="mt-10 lg:mt-16 flex flex-col md:flex-row justify-between items-start lg:items-end gap-8 lg:gap-10">

                    <div className="space-y-1">
                        <p className="text-black font-semibold leading-tight text-[clamp(1.4rem,4.5vw,2rem)]">
                            Access the full platform for free.
                        </p>
                        <p className="text-black font-semibold leading-tight text-[clamp(1.4rem,4.5vw,2rem)]">
                            No credit card required.
                        </p>
                    </div>

                    <button className="
                        shrink-0 bg-black text-white rounded-full
                        px-8 sm:px-12 py-4 sm:py-6
                        text-base sm:text-xl font-medium
                        hover:scale-105 duration-300
                    ">
                        Get Started Free
                    </button>

                </div>
            </div>
        </section>
    );
};

export default Third;