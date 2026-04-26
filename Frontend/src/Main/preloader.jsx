
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
        <div

            className="fixed inset-0 z-50 flex h-screen w-screen"
        >
            {/* Center Logo */}
            <div className=" absolute inset-0 z-50 bg-white/200  font-extrabold  text-white flex justify-center items-center gap-11 
                max-xl:gap-9  
                max-lg:gap-7 
                max-md:gap-5 
                max-sm:gap-3
            ">
                <div className="text-1 text-[12rem] font-generalbold
                max-xl:text-[10rem] 
                max-lg:text-[8rem] 
                max-md:text-[6rem] 
                max-sm:text-[4rem] "><b>Code</b></div>
                <div className="text-2 text-[12rem] font-generalbold
                max-xl:text-[10rem] 
                max-lg:text-[8rem] 
                max-md:text-[6rem] 
                max-sm:text-[4rem] "><b>Sarthi</b></div>
            </div>

            {visible && (
                <CountUp
                    from={0}
                    to={100}
                    duration={1.2}
                    className="absolute bottom-10 right-10 text-white text-8xl font-bold z-[60] font-extrabold "

                />
            )}


            {/* Stair Animation */}
            <div className="preStair w-1/5 bg-black"></div>
            <div className="preStair w-1/5 bg-black"></div>
            <div className="preStair w-1/5 bg-black"></div>
            <div className="preStair w-1/5 bg-black"></div>
            <div className="preStair w-1/5 bg-black"></div>

        </div>
    );
};

export default Preloader;
