import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShortPreview from './ShortPreview';
import { motion } from 'framer-motion';



const Landing = () => {
    const Navigate = useNavigate()

    const user = useSelector(store => store.user.user.DATA);


    const [clicked, setClicked] = useState(false);

    const [jd, setJD] = useState({
        Rounds: "",
        BroadRole: "",
        Company: "",
        SpecificRole: "",
        JobDescription: ""
    })



    const BroadRole = [
        {
            category: "coding_technical_behavioral",
            label: "Coding + Technical + Behavioral",
            roles: [
                "Software Engineer",
                "Full Stack Developer",
                "Frontend Developer",
                "Backend Developer",
                "Mobile App Developer",
                "Data Scientist",
                "Data Engineer",
                "Machine Learning Engineer",
                "DevOps Engineer",
                "SDET",
                "QA Automation Engineer"
            ],
            rounds: ["coding", "technical", "project", "behavioral"]
        },

        {
            category: "technical_behavioral",
            label: "Technical + Behavioral",
            roles: [
                "Cybersecurity Analyst",
                "Data Analyst",
                "Cloud Consultant",
                "Network Engineer",
                "Database Administrator",
                "Solutions Architect"
            ],
            rounds: ["technical", "scenario", "behavioral"]
        },

        {
            category: "case_study_behavioral",
            label: "Case Study + Technical + Behavioral",
            roles: [
                "Product Manager",
                "Project Manager",
                "Program Manager",
                "Marketing Manager",
                "Operations Manager"
            ],
            rounds: [
                "caseStudy",
                "situational",
                "stakeholderManagement",
                "behavioral"
            ]
        },

        {
            category: "communication_behavioral",
            label: "Communication + Behavioral",
            roles: [
                "Customer Service Representative",
                "Account Manager",
                "Relationship Manager",
                "Customer Success Manager",
                "HR Executive",
                "Recruiter"
            ],
            rounds: [
                "communication",
                "roleplay",
                "behavioral"
            ]
        },

        {
            category: "aptitude_domain_behavioral",
            label: "Aptitude + Domain + Behavioral",
            roles: [
                "Business Analyst",
                "Financial Analyst",
                "Investment Analyst",
                "Sales Analyst",
                "Operations Analyst"
            ],
            rounds: [
                "aptitude",
                "domainKnowledge",
                "behavioral"
            ]
        },

        {
            category: "sales_behavioral",
            label: "Sales + Behavioral",
            roles: [
                "Sales Executive",
                "Business Development Manager",
                "Account Executive",
                "Sales Development Representative",
                "Inside Sales Representative"
            ],
            rounds: [
                "salesPitch",
                "objectionHandling",
                "behavioral"
            ]
        },

        {
            category: "creative_behavioral",
            label: "Creative + Behavioral",
            roles: [
                "Web Designer",
                "UI UX Designer",
                "Graphic Designer",
                "Content Writer",
                "Digital Marketing Specialist"
            ],
            rounds: [
                "portfolioReview",
                "practicalTask",
                "behavioral"
            ]
        }
    ];

    const [broadRoleOpen, setBroadRoleopen] = useState(true);
    const [specificRoleOpen, setSpecificRoleOpen] = useState(false);

    const data = [
        {
            icon: (

                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24">
                    <g fill="none">
                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                        <path fill="#A7A0F8" d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"></path>
                    </g>
                </svg>
            ),
            title: "Analyse Carrer Profile",

        },

        {
            icon: (


                <svg width="2.2em" height="2.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.14939 7.83131C8.57654 5.92179 10.0064 4 12 4C13.9936 4 15.4235 5.92179 14.8506 7.8313L13.2873 13.0422C13.2171 13.2762 13.182 13.3932 13.128 13.4895C12.989 13.7371 12.7513 13.9139 12.4743 13.9759C12.3664 14 12.2443 14 12 14C11.7557 14 11.6336 14 11.5257 13.9759C11.2487 13.9139 11.011 13.7371 10.872 13.4895C10.818 13.3932 10.7829 13.2762 10.7127 13.0422L9.14939 7.83131Z" fill="#A7A0F8" stroke="#A7A0F8" strokeWidth="2" />
                    <circle cx="12" cy="19" r="2" fill="#A7A0F8" stroke="#A7A0F8" stroke-width="2" />
                </svg>

            ),
            title: "Instant Suggestions & Feedbacks",
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"> <path fill="#A7A0F8" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path> </svg>),
            title: "AI Powered Mock Interview",
        },

        {
            icon: (

                <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                    <path fill="#A7A0F8" d="M10 18h8v2h-8zm0-5h12v2H10zm0 10h5v2h-5z"></path>
                    <path fill="#A7A0F8" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"></path>
                </svg>

            ),
            title: "After Mock Interview",
        }
    ];

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
                    onClick={() => { setClicked(prev => !prev) }}
                >
                    <svg className='rotate-45 group-hover:rotate-90 transition-all duration-500' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#222222" />
                    </svg>



                    {type === "carrer" ? "Create Resume" : "Apply for Interviews"}

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
                    onClick={() => Navigate(`${type === 'carrer' ? '/app/build-resume' : '/app/interview-arena'}`)}
                >

                    {type === 'carrer' ? "Edit Your Carrer Profile" : "Past Analysis"}
                </button>


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
        <div className=' bg-black px-2 sm:px-5 lg:px-10'>
            <div className="
w-full
mx-auto
pb-8
lg:mb-10

flex
flex-col

gap-6
items-stretch
">

                <div className='flex lg:flex-row flex-col items-center justify-between '>
                    <div className='lg:w-1/2 w-full flex flex-col sm:flex-row lg:flex-col justify-between items-start'>
                        <div className='text-white text-2xl min-[450px]:text-4xl sm:text-5xl font-extrabold font-poppins mt-5 tracking-wider'>Hello, <br /><span className='text-[#A7A0F8]'>{user.firstName} {user.lastName}</span>
                        </div>
                        <div className='mt-5 flex flex-col gap-2 justify-center items-center'>

                            <span className='text-sm text-white ml-0 min-[450px]:ml-2 border mx-auto py-2 px-4 rounded-3xl bg-white/10 border border-white/20'>
                                <b> Profession : </b> {user.profession}
                            </span>
                            <span className='text-sm text-white ml-0 min-[450px]:ml-2 border mx-auto py-2 px-4 rounded-3xl bg-white/10 border border-white/20'>
                                <b> College : </b> {user.college}
                            </span>

                        </div>

                    </div>

                    <div className="lg:w-[60%] w-full flex flex-col justify-center items-center mt-10">
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
                        <CTAcreateResume type={"carrer"} />
                    </div>
                </div>

            </div>










            {
                clicked && (
                    <>
                        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center">
                            <div
                                className="
    relative
    bg-white
    rounded-2xl
    w-[95vw]
    sm:w-[92vw]
    md:w-[88vw]
    lg:w-[80vw]
    xl:w-[70vw]

    h-[95vh]
    sm:h-[92vh]

    shadow-2xl
    overflow-hidden
  "
                            >

                                <div className="h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">

                                    {broadRoleOpen && < div >
                                        <span className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 ">

                                            <div
                                                className=" text-black font-bold text-xl sm:text-2xl md:text-3xl">
                                                <h1 className=" text-black font-bold  text-base  sm:text-lg  md:text-xl  lg:text-2xl  break-words  leading-snug  ">Broad Role Division </h1>
                                                <p className='text-[#222222]  font-bold text-sm sm:text-md md:text-lg'>Select one of the role from the below which is the best fit for you according to your profile</p>
                                            </div>

                                            <button
                                                onClick={() => { setClicked(false); setBroadRoleopen(true); setSpecificRoleOpen(false) }}
                                                className="

p-2
rounded-lg
hover:bg-gray-300
transition

"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black" />
                                                </svg>
                                            </button>

                                        </span>

                                        {BroadRole.map((item, index1) => (
                                            <div
                                                key={index1}
                                                className="flex flex-col gap-4 p-6 hover:bg-gray-300 rounded-xl"
                                            >
                                                <h1
                                                    className="
    text-black
    font-bold
    text-lg
    sm:text-xl
    md:text-2xl
  "
                                                >
                                                    Rounds : <span className='text-[#7268f1] font-bold text-lg sm:text-xl md:text-2xl'>{item.label}</span>
                                                </h1>

                                                <div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-3
">
                                                    {item.roles.map((subRole, index2) => (
                                                        <button
                                                            key={index2}
                                                            onClick={() => { setJD({ Rounds: item.label, BroadRole: subRole }); setBroadRoleopen(false); setSpecificRoleOpen(true) }}
                                                            className={`
px-3 py-2
sm:px-4 sm:py-2.5
md:px-5 md:py-3

text-xs
sm:text-sm
md:text-base

rounded-xl
transition-all
border

${jd.BroadRole === subRole
                                                                    ? "bg-[#A7A0F8] text-white border-[#A7A0F8]"
                                                                    : "bg-black text-white border-black hover:bg-[#A7A0F8]"
                                                                }
`}
                                                        >
                                                            {subRole}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>}
                                    {specificRoleOpen && < div >
                                        <span className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 ">

                                            <div>
                                                <h2 className="text-2xl md:text-3xl font-bold text-black">
                                                    Job Details
                                                </h2>

                                                <p className="text-gray-600 mt-2">
                                                    Please Complete the Full Carrer Profile below the previous pannel before generating the interview
                                                </p>
                                            </div>


                                            <button
                                                onClick={() => { setClicked(false); setBroadRoleopen(true); setSpecificRoleOpen(false) }}
                                                className="

p-2
rounded-lg
hover:bg-gray-300
transition

"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black" />
                                                </svg>
                                            </button>

                                        </span>
                                        <div className="max-w-4xl mx-auto">


                                            <div className="space-y-6">

                                                {/* Job Role */}

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Job Role
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={jd.SpecificRole}
                                                        onChange={(e) =>
                                                            setJD((prev) => ({
                                                                ...prev,
                                                                SpecificRole: e.target.value,
                                                            }))
                                                        }
                                                        placeholder="Software Engineer"
                                                        className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          focus:border-[#A7A0F8]
          focus:ring-2
          focus:ring-[#A7A0F8]/20
        "
                                                    />
                                                </div>

                                                {/* Job Description */}

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Job Description
                                                    </label>

                                                    <textarea
                                                        rows={12}
                                                        value={jd.JobDescription}
                                                        onChange={(e) =>
                                                            setJD((prev) => ({
                                                                ...prev,
                                                                JobDescription: e.target.value,
                                                            }))
                                                        }
                                                        placeholder="Paste the complete job description here..."
                                                        className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          resize-none
          outline-none
          focus:border-[#A7A0F8]
          focus:ring-2
          focus:ring-[#A7A0F8]/20
        "
                                                    />
                                                </div>

                                                {/* Selected Details */}

                                                <div className="rounded-xl bg-[#A7A0F8]/10 p-4 border border-[#A7A0F8]/20">
                                                    <div className="flex flex-col gap-2">

                                                        <div>
                                                            <span className="font-semibold text-black">
                                                                Interview Type:
                                                            </span>{" "}
                                                            <span className='text-[#7268f1]'>
                                                                {jd.Rounds}
                                                            </span>

                                                        </div>

                                                        <div>
                                                            <span className="font-semibold text-black">
                                                                Selected Role:
                                                            </span>{" "}
                                                            <span className='text-[#7268f1]'>
                                                                {jd.BroadRole}
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}

                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <button
                                                        onClick={() => {
                                                            setSpecificRoleOpen(false);
                                                            setBroadRoleopen(true);
                                                        }}
                                                        className="
          px-6
          py-3
          rounded-xl
          border
          border-gray-300
          font-semibold
          text-black
        "
                                                    >
                                                        Back
                                                    </button>

                                                    <button

                                                        className="
          flex-1
          px-6
          py-3
          rounded-xl
          bg-[#A7A0F8]
          text-white
          font-semibold
          disabled:opacity-50
        "
                                                    >
                                                        Generate Interview
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>}

                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </div >
    )
}

export default Landing