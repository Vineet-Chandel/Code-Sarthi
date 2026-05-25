
import { useGSAP } from "@gsap/react";
import gsap from "gsap";






import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';



function CountUp({
    to,
    from = 0,
    direction = 'up',
    delay = 0,
    duration = 2,
    className = '',
    startWhen = true,
    separator = '',
    onStart,
    onEnd
}) {
    const ref = useRef(null);
    const motionValue = useMotionValue(direction === 'down' ? to : from);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness
    });

    const isInView = useInView(ref, { once: true, margin: '0px' });

    const getDecimalPlaces = num => {
        const str = num.toString();

        if (str.includes('.')) {
            const decimals = str.split('.')[1];

            if (parseInt(decimals) !== 0) {
                return decimals.length;
            }
        }

        return 0;
    };

    const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

    const formatValue = useCallback(
        latest => {
            const hasDecimals = maxDecimals > 0;

            const options = {
                useGrouping: !!separator,
                minimumFractionDigits: hasDecimals ? maxDecimals : 0,
                maximumFractionDigits: hasDecimals ? maxDecimals : 0
            };

            const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

            return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
        },
        [maxDecimals, separator]
    );

    useEffect(() => {
        if (ref.current) {
            ref.current.textContent = formatValue(direction === 'down' ? to : from);
        }
    }, [from, to, direction, formatValue]);

    useEffect(() => {
        if (isInView && startWhen) {
            if (typeof onStart === 'function') onStart();

            const timeoutId = setTimeout(() => {
                motionValue.set(direction === 'down' ? from : to);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(
                () => {
                    if (typeof onEnd === 'function') onEnd();
                },
                delay * 1000 + duration * 1000
            );

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', latest => {
            if (ref.current) {
                ref.current.textContent = formatValue(latest);
            }
        });

        return () => unsubscribe();
    }, [springValue, formatValue]);

    return <span className={className} ref={ref} />;
}


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


    const [visible, setVisible] = useState(true);

    setTimeout(() => {
        setVisible(false);
    }, 3700);

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
                    <div
                        className="
                        text-1 font-generalbold leading-none
                        text-[12rem]
    
                        max-2xl:text-[10rem]
                        max-xl:text-[8rem]
                        max-lg:text-[6rem]
                        max-md:text-[4.5rem]
                        max-sm:text-[3rem]
                    "
                    >
                        <b>Code</b>
                    </div>

                    <div
                        className="
                        text-2 font-generalbold leading-none
                        text-[12rem]
    
                        max-2xl:text-[10rem]
                        max-xl:text-[8rem]
                        max-lg:text-[6rem]
                        max-md:text-[4.5rem]
                        max-sm:text-[3rem]
                    "
                    >
                        <b>Sarthi</b>
                    </div>
                </div>
            </div>

            {/* Counter */}
            {visible && (
                <CountUp
                    from={0}
                    to={100}
                    duration={1.2}
                    className="
                    absolute z-[60]
                    bottom-6 right-6
    
                    text-white font-extrabold
                    leading-none
    
                    text-8xl
                    max-lg:text-6xl
                    max-md:text-5xl
                    max-sm:text-4xl
                "
                />
            )}

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
