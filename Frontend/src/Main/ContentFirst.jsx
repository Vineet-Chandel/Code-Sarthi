import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";


const ContentFirst = () => {
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(".HEAD1", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".BOSSCONT",
                start: "top 90%",

            },
        });
        gsap.from(".SUBHEAD1", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".BOSSCONT",
                start: "top 90%",
            }
        })
        gsap.from(".HEAD2 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD2",
                start: "top 90%",

            },
        });
        gsap.from(".pointer1", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer1",
                start: "top 90%",

            },
        });
        gsap.from(".HEAD3 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD3",
                start: "top 90%",

            },
        });
        gsap.from(".pointer2", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer2",
                start: "top 90%",

            },
        });
        gsap.from(".HEAD4 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD4",
                start: "top 90%",

            },
        });
        gsap.from(".pointer3", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer3",
                start: "top 90%",

            },
        });
        gsap.from(".negMove", {
            x: -30,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".negMove",
                start: "top 90%",

            },

        })
        gsap.from(".posMove", {
            x: 30,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".posMove",
                start: "top 90%",

            },

        })
        gsap.from(".topMove", {
            y: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".topMove",
                start: "top 90%",

            },

        })

        gsap.from(".HEAD5 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD5",
                start: "top 90%",

            },
        });
        gsap.from(".pointer4", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer4",
                start: "top 90%",

            },
        });

        gsap.from(".HEAD6 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD6",
                start: "top 90%",

            },
        });

        gsap.from(".SUBHEAD6", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".SUBHEAD6",
                start: "top 90%",
            }
        })


        gsap.from(".HEAD7 ", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".HEAD7",
                start: "top 90%",

            },
        });


        gsap.from(".pointer5", {
            duration: 1.6,
            y: 80,
            rotationX: 60,
            scale: 0.95,
            opacity: 0,
            ease: "power4.out",
            transformOrigin: "50% 50%",
            perspective: 1000, // 🔥 IMPORTANT

            scrollTrigger: {
                trigger: ".pointer5",
                start: "top 90%",

            },
        });


    });

    const featuredData1 = [{
        id: 1,
        heading: "KEEP DEVELOPERS ENGAGED",
        tagLine1: "✦ Eliminating the friction of switching between fragmented apps by providing one seamless layer where messaging, meetings, and collaboration live together.",
        tagLine2: "✦ Developers struggle to connect and build together in real-time — we enable personal chats, groups, communities, and AI-assisted interaction to keep everyone connected anytime, anywhere.",
        tagLine3: "✦ Move beyond slow, disconnected feedback loops with a workspace that allows developers to connect, collaborate, and build together in real time from anywhere.",
        video: "/videos/feature-1.mp4"
    }, {
        id: 2,
        heading: "Eliminates dependency on Project Manager",
        tagLine1: "✦ Many teams rely heavily on one person to manage tasks and coordination, creating bottlenecks — we enable self-managed, transparent project collaboration where teams can organize and lead themselves.",
        tagLine2: "✦ In most teams, it’s hard to know who is doing what and how much progress is made — our system provides real-time tracking of tasks, time spent, and overall project progress for complete transparency.",
        tagLine3: "✦ Developers often manage personal goals separately from team tasks — we combine individual task tracking and shared project dashboards into one structured workspace.",
        tagLine4: "✦ Delays and blockers usually go unnoticed until it’s too late — our centralized interface lets project leaders monitor productivity, identify blockers early, and notify members instantly to keep projects on track.",
        video: "/videos/feature-2.mp4"
    }, {
        id: 3,
        heading: "TIME IS PRECIOUS",
        tagLine1: "✦ Teams use separate apps for communication, task management, and time tracking — we bring chat, collaboration, project tracking, and productivity monitoring into one unified platform.",
        tagLine2: "✦ In many teams, it’s unclear who is working on what and how much progress is made — we provide real-time task-wise tracking, time logs, and transparent project dashboards.",
        tagLine3: "✦ Without proper tracking, delays and inefficiencies go unnoticed — our system ensures individual accountability with personal dashboards and measurable contributions.",
        tagLine4: "✦ Issues and blockers are often discovered when it’s already critical — we offer a centralized workspace that highlights problems early and keeps teams aligned and on schedule.",
        video: "/videos/feature-3.mp4"
    }]

    const featuredData2 = [{
        img: "/img/dev.webp",
        heading: "DEVELOPERS TOOLKIT",
        tagLine1: "✦ Functional components that reduce repetition and help you build faster with a clean, consistent structure.",
        tagLine2: "✦ All essentials in one place — AI prompts, smart color palettes, and powerful customization tools.",
        tagLine3: "✦ Add your own schema scripts anytime — try it now!",
    }, {
        img: "/img/SCHEDULER.webp",
        heading: "SMART SCHEDULER",
        tagLine1: "✦ A smart scheduler which tracks your daily goals shows you the progress report daily",
        tagLine2: "✦ Automatically organizes your tasks with intelligent time-blocking and priority management",
        tagLine3: "✦ Plan projects, study sessions, meetings, or personal goals — all in one streamlined timeline",

    }, {
        img: "/img/RESUME-GEN.webp",
        heading: "RESUME GENERATOR",
        tagLine1: "✦ We work with recruiters to design resume templates that are approved by them.",
        tagLine2: "✦ One can create a full fleged resume within in 15 Minutes",
        tagLine3: "✦ 20+ templates || Enhanced with AI || Resume Review",
        tagLine4: "✦ AI-enhanced to generate industry-specific phrases tailored to match your resume and desired writing style",
        tagLine5: "✦ Know when employers are interested in you and track your resume for every job.",

    }, {
        img: "/img/team.webp",
        heading: "GLOBAL DEVELOPER COMMUNITY",
        tagLine1: "✦ Contact as well as collab with the developers all over the world",
        tagLine2: "✦ Share your skills ,experience on the various community at the same time learn from others",
        tagLine3: "✦ Collab with developers from across the world over at any project where  ",
    }];

    return (
        <div className="BOSSCONT bg-black text-white w-screen flex flex-col justify-center items-center my-[150px]">

            <div className=" flex flex-col justify-center items-center w-full gap-6">

                <div className=" HEAD1 text-5xl font-extrabold font-head text-center
                 max-xl:text-4xl 
                max-lg:text-3xl 
                max-md:text-2xl 
                max-sm:text-xl  ">
                    A PLATFORM FOR ENDLESS POSSIBILITIES
                </div>

                <div className="SUBHEAD1 text-2xl font-extralight w-[80%] 2xl:w-[60%] text-center
                
                max-lg:text-1xl 
                max-md:text-lg
                max-sm:text-md text-gray-400">
                    <b className='font-extrabold'>CodeSarthi</b>  connects you with a global developer community to build and scale.
                    Designed to boost <b className='font-extrabold'>productivity</b>  while keeping workflows <b className='font-extrabold'>fast</b> and <b className='font-extrabold'>efficient</b>.
                </div>

            </div>


            <div className='relative top-10'>
                {featuredData1.map((items) => (
                    <div key={items.id} className="w-[95%] mx-auto mt-5 border rounded-[60px] lg:rounded-[120px] 
      flex flex-col lg:flex-row items-center justify-between 
       p-10 ">

                        {/* LEFT CONTENT */}
                        <div className="w-full lg:w-[40%]  flex flex-col gap-6 text-center lg:text-left ml-3">

                            <h2 className="
        text-2xl 
        sm:text-3xl 
        md:text-4xl 
        lg:text-4xl 
        xl:text-5xl 
        font-extrabold font-head HEAD2">
                                {items.heading}
                            </h2>

                            <div className="space-y-4 text-gray-300 pointer1">
                                <p className="text-base sm:text-lg lg:text-xl hover:text-green-400 transition">
                                    {items.tagLine1}
                                </p>
                                <p className="text-base sm:text-lg lg:text-xl hover:text-green-400 transition">
                                    {items.tagLine2}
                                </p>
                                <p className="text-base sm:text-lg lg:text-xl hover:text-green-400 transition">
                                    {items.tagLine3}
                                </p>
                                <p className="text-base sm:text-lg lg:text-xl hover:text-green-400 transition">
                                    {items.tagLine4}
                                </p>
                            </div>


                        </div>

                        {/* RIGHT VIDEO */}
                        <div className="w-full lg:w-[60%] flex justify-center mt-10 lg:mt-0  ml-8">
                            <video
                                src={items.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="
          w-full  
          object-cover 
          rounded-[40px] lg:rounded-[120px]"
                            />
                        </div>

                    </div>
                ))}


            </div>

            <div className=" flex flex-col justify-center items-center w-full gap-6 mt-[100px] mb-[20px]">

                <div className=" HEAD6 text-5xl font-extrabold font-head text-center
                 max-xl:text-4xl 
                max-lg:text-3xl 
                max-md:text-2xl 
                max-sm:text-xl  ">
                    LOTS OF THINGS ARE STILL LEFT TO EXPLORE
                </div>

                <div className="SUBHEAD6 text-2xl font-extralight w-[60%] text-center
  max-lg:text-xl 
  max-md:text-lg
  max-sm:text-base font text-gray-400">
                    <b className='font-extrabold'>CodeSarthi</b> comes to you packed with powerful tools to boost
                    <b className='font-extrabold'> productivity</b>, with many more features still to explore —
                    all while keeping workflows <b className='font-extrabold'> fast</b> and
                    <b className='font-extrabold'> efficient</b>.
                </div>


            </div>
            <div className='w-full  flex flex-col justify-center items-center p-5 gap-5'>


                {featuredData2
                    .reduce((rows, item, index) => {
                        if (index % 2 === 0) {
                            rows.push([item, featuredData2[index + 1]]);
                        }
                        return rows;
                    }, [])
                    .map((row, index) => (
                        <div
                            key={index}
                            className="w-full px-6 lg:px-20 py-10 flex flex-col lg:flex-row gap-10"
                        >
                            {row.map(
                                (card, i) =>
                                    card && (
                                        <div
                                            key={i}
                                            className="w-full lg:w-1/2 border border-gray-700/60 
              rounded-3xl overflow-hidden 
              bg-[#111] hover:shadow-2xl hover:shadow-green-500/10
              transition-all duration-500 group"
                                        >
                                            <img
                                                src={card.img}
                                                alt=""
                                                className="w-full object-cover"
                                            />

                                            <div className="p-8 flex flex-col items-center gap-6 text-center">

                                                {/* Heading */}
                                                <h2
                                                    className="
                  text-3xl md:text-4xl xl:text-5xl 
                  font-extrabold font-head 
                  tracking-tight"
                                                >
                                                    {card.heading}
                                                </h2>

                                                {/* Taglines */}
                                                <div className="flex flex-col gap-3 text-gray-300">
                                                    {[card.tagLine1, card.tagLine2, card.tagLine3, card.tagLine4]
                                                        .filter(Boolean)
                                                        .map((tag, idx) => (
                                                            <p
                                                                key={idx}
                                                                className="
                        text-base md:text-lg 
                        transition-all duration-300
                        group-hover:text-green-400
                        group-hover:scale-105"
                                                            >
                                                                {tag}
                                                            </p>
                                                        ))}
                                                </div>

                                                {/* Button */}
                                                <button
                                                    className="
                  mt-4 px-6 py-2 
                  bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300
                  text-black font-semibold text-sm
                  rounded-full
                  flex items-center gap-2
                  hover:scale-105
                  transition-all duration-300"
                                                >
                                                    <svg
                                                        className="rotate-45"
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z"
                                                            fill="black"
                                                        />
                                                    </svg>
                                                    LEARN MORE
                                                </button>
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    ))}
            </div>



        </div>
    )
}

export default ContentFirst
