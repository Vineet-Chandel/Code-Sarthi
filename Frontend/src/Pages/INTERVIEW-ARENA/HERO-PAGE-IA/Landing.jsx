import React, { useEffect, useState } from 'react'
import ShortPreview from './ShortPreview'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const defenseQuestions = [
    "You mentioned increasing application performance by 30%. What metrics did you use, and how did you measure the improvement?",
    "Walk me through your DevConnect project from start to finish. What was your biggest technical challenge?",
    "Why did you choose PostgreSQL instead of MongoDB for this project? What trade-offs did you consider?",
    "You listed React, Node.js, and Express as your core skills. Which part of the stack are you most confident in, and why?",
    "Explain the overall architecture of your application. How does data flow from the frontend to the database?",
    "If your application suddenly had one million users, what would you change to make it scalable?",
    "What was the most difficult bug you encountered, and how did you debug and resolve it?",
    "Describe a feature you built entirely on your own. What was your exact contribution?",
    "You mentioned using JWT authentication. Explain how it works and why you chose it.",
    "How did you secure your APIs against common attacks like SQL Injection or XSS?",
    "Why did you choose this tech stack over other alternatives?",
    "If I open your GitHub repository right now, which file would best demonstrate your coding skills?",
    "What's something in this project you're not completely satisfied with? How would you improve it?",
    "Tell me about a time your first solution failed. What did you learn from that experience?",
    "If I remove one major technology from your project, how would you redesign the solution?"
];
const CTAcreateResume = () => {
    const Navigate = useNavigate()

    return (
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10 w-full relative z-10'>

            {/* Create Resume Button */}

            <button
                className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                        w-full
                        sm:w-62
                        lg:w-70
                        font-extrabold
                        transition duration-200
                        bg-white
                        rounded-3xl
                        text-black
                        px-5
                        flex justify-center items-center
                        whitespace-nowrap group gap-1
                    '
                onClick={() => Navigate('/app/interview-arena')}
            >
                <svg className='rotate-45 group-hover:rotate-90 transition-all duration-500' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#222222" />
                </svg>



                Create Resume

            </button>


            {/* Import Resume Button */}

            <button
                className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                         w-full
                        sm:w-62
                        lg:w-70
                        font-extrabold
                        transition duration-200
                        bg-white/20
                        rounded-3xl
                        text-white
                        px-5
                        flex justify-center items-center
                        whitespace-nowrap
                    '
                onClick={() => Navigate('/app/interview-arena')}
            >

                Edit Your Carrer Profile
            </button>


        </div>
    )
}
const CTAcreateResume2 = () => {
    const Navigate = useNavigate()

    return (
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10 w-full relative z-10'>

            {/* Create Resume Button */}

            <button
                className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                        w-full
                        sm:w-62
                        lg:w-70
                        font-extrabold
                        transition duration-200
                        bg-white
                        rounded-3xl
                        text-black
                        px-5
                        flex justify-center items-center
                        whitespace-nowrap group gap-1
                    '
                onClick={() => Navigate('/app/interview-arena')}
            >
                <svg className='rotate-45 group-hover:rotate-90 transition-all duration-500' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#222222" />
                </svg>



                Create Resume

            </button>


            {/* Import Resume Button */}

            <button
                className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                         w-full
                        sm:w-62
                        lg:w-70
                        font-extrabold
                        transition duration-200
                        bg-white/20
                        rounded-3xl
                        text-white
                        px-5
                        flex justify-center items-center
                        whitespace-nowrap
                    '
                onClick={() => Navigate('/app/interview-arena')}
            >

                Edit Your Carrer Profile
            </button>


        </div>
    )
}





const Landing = () => {
    const [activeQ, setActiveQ] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setActiveQ(q => (q + 1) % defenseQuestions.length), 3000);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="bg-black w-full py-10 flex flex-col  justify-center items-center gap-5">
            <div className="w-[80%] flex flex-col justify-center items-center">
                <div className="w-full">
                    <h1 className="text-4xl mb-2 font-bold">Your Career Profile</h1>
                    <ShortPreview />
                </div>
                <div className='w-[70%]'>
                    <CTAcreateResume />
                </div>

            </div>
            <div className="w-[80%] flex flex-col justify-center items-center mt-20">
                <div className="w-full">
                    <h1 className="text-4xl mb-2 font-bold">AI MOCK INTERVIEW</h1>
                    <div className=' w-full bg-transparent rounded-3xl'>
                        {/* Background */}



                        {/* Illustration */}
                        <div className="relative z-10  w-full sm:w-1/2 lg:w-full flex justify-between rounded-3xl bg-white/10 flex items-center justify-center p-6 ">
                            <div className="absolute  inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,.15),transparent_35%)]" />

                            <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="#fff" fillRule="evenodd" d="M280.4 68.995c26.79-29.767 76.077-15.992 83.552 23.35l14.88 78.321h-245.67l14.881-78.32c7.475-39.343 56.762-53.118 83.552-23.351c13.041 14.49 35.764 14.49 48.805 0M129.109 191.999l-8.106 42.667h-35.67v42.666h341.334v-42.666h-35.675l-8.106-42.667zm41.558 234.667L128 405.332l-42.667-21.333v85.333h341.334v-85.333L384 405.332l-42.667 21.334L256 469.332zm213.333-128H128v21.333h.062c1.392 29.69 25.904 53.333 55.938 53.333h8c22.679 0 34.959-14.259 39.955-32.235c3.155-11.352 12.263-21.098 24.045-21.098s20.89 9.746 24.045 21.098c4.996 17.976 17.276 32.235 39.955 32.235h8c30.034 0 54.546-23.643 55.938-53.333H384z" clipRule="evenodd"></path> </svg>


                            <div className="w-[85%] gap-8 items-start">
                                {/* Live question demo */}
                                <div>
                                    <p className="text-md text-white/90 uppercase tracking-widest mb-4 font-extrabold">Live AI Challenge Preview</p>
                                    <div
                                        className="rounded-2xl p-5 border border-white/[0.06] overflow-hidden"
                                        style={{ background: "rgba(0,0,0,0.3)", minHeight: 120 }}
                                    >
                                        <div className="flex items-start gap-3">

                                            <div>
                                                <p className="text-md text-white/30 mb-2 font-mono">AI Interviewer</p>
                                                <motion.p
                                                    key={activeQ}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -8 }}
                                                    transition={{ duration: 0.4 }}
                                                    className="text-white/85 leading-relaxed"
                                                    style={{ fontSize: "0.88rem" }}
                                                >
                                                    "{defenseQuestions[activeQ]}"
                                                </motion.p>
                                            </div>
                                        </div>
                                        {/* Progress dots */}
                                        <div className="flex gap-1.5 mt-5 ml-10">
                                            {defenseQuestions.map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="rounded-full transition-all duration-500"
                                                    style={{
                                                        width: i === activeQ ? 20 : 6,
                                                        height: 4,
                                                        background: i === activeQ ? "#34d399" : "rgba(255,255,255,0.15)",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div></div>
                </div>
                <div className='w-[70%]'>
                    <CTAcreateResume2 />
                </div>

            </div>


        </div>
    )
}

export default Landing