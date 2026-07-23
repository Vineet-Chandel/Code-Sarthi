import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShortPreview from './ShortPreview';
import { motion, percent } from 'framer-motion';
import ClickedInterviews from "./ClickedInterviews"
import ClickedResume from "./ClickedResume"


const Landing = () => {
    const Navigate = useNavigate()

    const user = useSelector(store => store.user.user.DATA);


    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);

    const data = [
        {
            title: "Profile Completeness",
            icon: <>
                <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1056 3.44721L5.78885 6.10557C5.00831 6.49585 4.61803 6.69098 4.61803 7C4.61803 7.30902 5.00831 7.50415 5.78885 7.89443L11.1056 10.5528C11.5445 10.7722 11.7639 10.882 12 10.882C12.2361 10.882 12.4555 10.7722 12.8944 10.5528L18.2111 7.89443C18.9917 7.50415 19.382 7.30902 19.382 7C19.382 6.69098 18.9917 6.49585 18.2111 6.10557L12.8944 3.44721C12.4555 3.22776 12.2361 3.11803 12 3.11803C11.7639 3.11803 11.5445 3.22776 11.1056 3.44721Z" fill="#fff" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02217 10.4893C7.62603 10.8135 8.33716 11.169 9.15554 11.5782L10.2113 12.1061C11.0891 12.545 11.528 12.7644 12.0001 12.7644C12.4723 12.7644 12.9112 12.545 13.789 12.1061L14.8447 11.5782C15.6631 11.169 16.3742 10.8135 16.9781 10.4893L18.2113 11.1059C18.9918 11.4961 19.3821 11.6913 19.3821 12.0003C19.3821 12.3093 18.9918 12.5044 18.2113 12.8947L12.8946 15.5531C12.4557 15.7725 12.2362 15.8822 12.0001 15.8822C11.7641 15.8822 11.5446 15.7725 11.1057 15.5531L11.1057 15.5531L5.78898 12.8947C5.00844 12.5044 4.61816 12.3093 4.61816 12.0003C4.61816 11.6913 5.00844 11.4961 5.78898 11.1059L7.02217 10.4893Z" fill="#fff" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02169 15.4893C7.62567 15.8135 8.33696 16.1692 9.15557 16.5785L10.2113 17.1063C11.0891 17.5452 11.528 17.7647 12.0001 17.7647C12.4723 17.7647 12.9112 17.5452 13.789 17.1063L14.8447 16.5785C15.6633 16.1692 16.3746 15.8135 16.9786 15.4893L18.2113 16.1056C18.9918 16.4959 19.3821 16.691 19.3821 17C19.3821 17.3091 18.9918 17.5042 18.2113 17.8945L12.8946 20.5528C12.4557 20.7723 12.2362 20.882 12.0001 20.882C11.7641 20.882 11.5446 20.7723 11.1057 20.5528L11.1057 20.5528L5.78898 17.8945C5.00844 17.5042 4.61816 17.3091 4.61816 17C4.61816 16.691 5.00844 16.4959 5.78898 16.1056L7.02169 15.4893Z" fill="#fff" />
                </svg>
            </>,
            percentage: "0%"
        },
        {
            title: "Analytics",
            subTitle: "Sucess Rate",
            percentage: "67%",
            icon: <>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M20 8v2h6.586L18 18.586l-4.293-4.293a1 1 0 0 0-1.414 0L2 24.586L3.414 26L13 16.414l4.293 4.293a1 1 0 0 0 1.414 0L28 11.414V18h2V8Z"></path>
                </svg>
            </>
        },
        {
            title: "Interview Faced ",
            subTitle: "Good Responses",
            percentage: "79%",
            icon: <>
                <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="#fff" fillRule="evenodd" d="M280.4 68.995c26.79-29.767 76.077-15.992 83.552 23.35l14.88 78.321h-245.67l14.881-78.32c7.475-39.343 56.762-53.118 83.552-23.351c13.041 14.49 35.764 14.49 48.805 0M129.109 191.999l-8.106 42.667h-35.67v42.666h341.334v-42.666h-35.675l-8.106-42.667zm41.558 234.667L128 405.332l-42.667-21.333v85.333h341.334v-85.333L384 405.332l-42.667 21.334L256 469.332zm213.333-128H128v21.333h.062c1.392 29.69 25.904 53.333 55.938 53.333h8c22.679 0 34.959-14.259 39.955-32.235c3.155-11.352 12.263-21.098 24.045-21.098s20.89 9.746 24.045 21.098c4.996 17.976 17.276 32.235 39.955 32.235h8c30.034 0 54.546-23.643 55.938-53.333H384z" clipRule="evenodd"></path> </svg>
            </>
        }
    ]


    const CTAcreateResume = ({ type }) => {
        const Navigate = useNavigate()

        return (
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10 w-full relative  justify-center items-center z-10'>

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
                        sm:w-auto
                        font-extrabold
                        transition duration-200
                        bg-white
                        rounded-3xl
                        text-black
                        px-[60px]
                        flex justify-center items-center
                        whitespace-nowrap group gap-1
                    '
                    onClick={() => {

                        if (type === "career") {
                            setClicked(prev => !prev)
                        } else {
                            setClicked2(prev => !prev)
                        }
                    }
                    }
                >
                    <svg className='rotate-45 group-hover:rotate-90 transition-all duration-500' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#222222" />
                    </svg>



                    {type === "career" ? "Analyse Resume" : "Apply for Interviews"}

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
                        sm:w-auto
                        font-extrabold
                        transition duration-200
                        bg-white/20
                        rounded-3xl
                        text-white
                        px-[60px]
                        flex justify-center items-center
                        whitespace-nowrap
                    '
                    onClick={() => Navigate(type === 'career' ? '/app/build-resume' : '/app/interview-arena')}
                >

                    {type === 'career' ? "Edit Your Career Profile" : "Past Analysis"}
                </button>
                {type === 'career' && <button
                    className='
                        text-center
                        h-[52px]
                        sm:h-[55px]
                        text-sm
                        sm:text-base
                        lg:text-lg
                        w-full
                        sm:w-auto
                        font-extrabold
                        transition duration-200
                        bg-white
                        rounded-3xl
                        text-black
                        px-[60px]
                        flex justify-center items-center
                        whitespace-nowrap group gap-1
                    '

                    onClick={() => Navigate("/app/resume-templates")}

                >
                    <svg className='rotate-45 group-hover:rotate-90 transition-all duration-500' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#222222" />
                    </svg>



                    Create Resume

                </button>}


            </div>
        )
    }


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





    const [activeQ, setActiveQ] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setActiveQ(q => (q + 1) % defenseQuestions.length), 3000);
        return () => clearInterval(t);
    }, []);
    const ProfileCompleteness = 70
    return (
        <div className=' bg-white px-1 py-3.5'>
            <div className="
w-full
mx-auto
p-4
lg:p-10
bg-black
flex
flex-col
rounded-[20px]
gap-6
items-stretch
">

                <div className='flex  flex-col items-center justify-between '>
                    <div className=' w-full flex flex-col sm:flex-row lg:flex-col justify-between items-start'>
                        <div className='text-white text-2xl min-[450px]:text-4xl sm:text-5xl font-extrabold font-poppins mt-5 tracking-wider'>Hello,<span className='text-[#A7A0F8]'>{user.firstName} {user.lastName}</span>
                        </div>
                        {/* <div className='mt-5 flex flex-col gap-2 justify-center items-center'>

                            <span className='text-sm text-white ml-0 min-[450px]:ml-2 border mx-auto py-2 px-4 rounded-3xl bg-white/10 border border-white/20'>
                                <b> Profession : </b> {user.profession}
                            </span>
                            <span className='text-sm text-white ml-0 min-[450px]:ml-2 border mx-auto py-2 px-4 rounded-3xl bg-white/10 border border-white/20'>
                                <b> College : </b> {user.college}
                            </span>

                        </div> */}



                    </div>

                    <div className=" w-full flex flex-col justify-center items-center mt-10">
                        <div className="w-full h-auto">
                            <h1 className="text-4xl mb-2 font-bold">AI Mock Interview,</h1>
                            <div className=' w-full bg-transparent rounded-3xl'>
                                {/* Background */}



                                {/* Illustration */}
                                <div className="relative z-10  w-full lg:w-full flex justify-between rounded-3xl bg-white/10 flex items-center justify-center p-6 overflow-hidden">
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
                                    <div className='absolute top-0 right-4 bottom-0  opacity-5 '>
                                        <svg className="  h-full relative 
  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                        </svg>
                                    </div>

                                </div>


                            </div>


                        </div>
                        <div className='w-[70%]'>
                            <CTAcreateResume type={"interviews"} />
                        </div>

                    </div>
                </div>


                <div className='flex flex-col mt-10'>


                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="w-full">
                            <h1 className="text-4xl mb-2 font-bold">Your Career Profile,</h1>
                            <ShortPreview />
                        </div>
                    </div>


                    <div className='w-full '>
                        <CTAcreateResume type={"career"} />
                    </div>
                </div>

            </div>










            {
                clicked && (
                    <ClickedResume clicked={clicked} setClicked={setClicked} />
                )
            }
            {
                clicked2 && (
                    <ClickedInterviews clicked2={clicked2} setClicked2={setClicked2} />
                )
            }

        </div >
    )
}

export default Landing