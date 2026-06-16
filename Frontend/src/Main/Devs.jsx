import React, { useRef } from 'react'
import Lines from './Lines'
import { motion } from 'framer-motion'


const Devs = () => {
  const containerRef = useRef(null);
  const iconSize = 44; // md:w-11 = 44px
  const padding = 6;   // p-1.5 = 6px

  const getTranslateX = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    // Move icon to far right: total width - icon size - padding on both sides
    return containerWidth - iconSize - padding * 2;
  };



  const parentVariant = {
    initial: {},
    hover: {},
  }

  const iconVariants = {
    initial: {
      rotateX: 20,
      rotateZ: 0,
      scale: 1,
    },
    hover: {
      rotateX: 180,
      rotateZ: 180,
      scale: 1.3,
    },
  };
  return (
    <div className='bg-black p-1.5'>
      <div
        className="
relative
overflow-hidden
bg-black flex lg:flex-row flex-col items-center gap-8
"
      >
        <div
          className="
absolute
inset-0
bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]
"
        />

        <div
          className="
absolute
inset-0
bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)]
bg-[size:40px_40px]
"
        />

        <div className='w-full lg:w-1/2  flex items-center justify-center  '>
          <div className='w-full  flex flex-col items-center justify-center'>
            <div className='w-full p-4 lg:pl-10 lg:pt-4 text-[#f9f9f9] font-poppins font-extrabold text-4xl
text-3xl
sm:text-5xl
leading-tight
tracking-tight  justify-start'>
              The Founder's  Desk
            </div>

            <motion.div
              whileHover={{
                y: -8,
                rotateX: 4,
              }}
              transition={{ duration: .4 }}
              className="
relative
overflow-hidden
rounded-3xl
border
border-white/5

backdrop-blur-xl
shadow-2xl
sm:p-5
px-1
w-full


"
            >

              <img className="h-full object-cover rounded-3xl border border-white/10" src="https://res.cloudinary.com/dj0ivep44/image/upload/v1781411185/IMG_20260508_081110_lhmrvn.jpg" alt="" />



            </motion.div>
          </div>


        </div>


        <div className='w-full p-4 lg:w-1/2  flex flex-col gap-8
justify-center items-center justify-center'>
          <p className='text-[#f9f9f9] font-poppins font-extralight text-sm
sm:text-md

text-white
  justify-start'>
            Hi, I'm Manu. I've been building web applications for over 8 years. I've worked with startups, small businesses, and large enterprises to build and scale their web applications. People call me a "Full Stack" engineer but I prefer to call myself a problem solver :)
          </p>
          <p className='text-[#f9f9f9] font-poppins font-extralight text-sm
sm:text-md

text-white
  justify-start'>
            I started CodeSarthi to help businesses build their web presence, providing unique web apps that stand out and scale well.
            Also, I post relevant web development snippets and tips on my twitter and occassionally shitpost
          </p>

          <div className='w-full flex justify-start'>
            <div className="flex  justify-center  w-fit 
                 gap-2 bg-white/10 p-2 rounded-full items-center">




              <motion.div

                variants={parentVariant}
                initial="initial"
                whileHover="hover"
                onClick={() => window.open("https://github.com/Vineet-Chandel", "_blank")}
                className="flex items-center justify-center  h-10
w-10
sm:h-11
sm:w-11 rounded-full text-sm
sm:text-base
md:text-lg border bg-gray-400/40 mx-auto cursor-pointer group border-white/10 font-extrabold font-poppins">

                <motion.svg
                  variants={iconVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="group-hover:scale-110 transition-all duration-500 w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="#fff" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                </motion.svg>

              </motion.div>

              <motion.div

                variants={parentVariant}
                initial="initial"
                whileHover="hover"
                onClick={() => window.open("https://www.linkedin.com/in/vineet-singhk06/", "_blank")}
                className="flex items-center justify-center  h-10
w-10
sm:h-11
sm:w-11 rounded-full text-sm
sm:text-base
md:text-lg border bg-gray-400/40 mx-auto cursor-pointer group border-white/10 font-extrabold font-poppins">

                <motion.svg
                  variants={iconVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="group-hover:scale-110 transition-all duration-500 w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="#fff" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                </motion.svg>


              </motion.div>


              <motion.div

                onClick={() => window.open("https://codesarthi.in", "_blank")}
                variants={parentVariant}
                initial="initial"
                whileHover="hover"
                className="flex items-center justify-center  h-10
w-10
sm:h-11
sm:w-11 rounded-full text-sm
sm:text-base
md:text-lg border bg-gray-400/40 mx-auto cursor-pointer group border-white/10 font-extrabold font-poppins">




                <motion.svg
                  variants={iconVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="group-hover:scale-110 transition-all duration-500" width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10C5 8.13077 5 7.19615 5.40192 6.5C5.66523 6.04394 6.04394 5.66523 6.5 5.40192C7.19615 5 8.13077 5 10 5H14C15.8692 5 16.8038 5 17.5 5.40192C17.9561 5.66523 18.3348 6.04394 18.5981 6.5C19 7.19615 19 8.13077 19 10H5Z" fill="#7E869E" fill-opacity="0.25" />
                  <rect x="5" y="5" width="14" height="14" rx="3" stroke="#fff" stroke-width="1.2" />
                  <path d="M5 10H19" stroke="#fff" stroke-width="1.2" stroke-linecap="round" />
                </motion.svg>






              </motion.div>






            </div>


            <Lines />
          </div>
        </div>
      </div>
    </div >








  )
}

export default Devs