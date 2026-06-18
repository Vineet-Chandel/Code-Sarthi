import React from 'react';

import { useNavigate } from 'react-router-dom';


const ThirdBlock = () => {
    const Navigate = useNavigate();

    const data = [
        {
            icon: (

                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24">
                    <g fill="none">
                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                        <path fill="#000" d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"></path>
                    </g>
                </svg>
            ),
            title: "Analyse Carrer Profile",
            step1: "Takes the Job Role & Job Description",
            step2: "Get AI Analysis & Suggestions for the profile",
            step3: "Analyse your created profile & add the more structured content and keywords in the resume",
            step4: "Get Resume & CoverLetter for the dedicated Job Roles",

        },

        {
            icon: (


                <svg width="2.2em" height="2.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.14939 7.83131C8.57654 5.92179 10.0064 4 12 4C13.9936 4 15.4235 5.92179 14.8506 7.8313L13.2873 13.0422C13.2171 13.2762 13.182 13.3932 13.128 13.4895C12.989 13.7371 12.7513 13.9139 12.4743 13.9759C12.3664 14 12.2443 14 12 14C11.7557 14 11.6336 14 11.5257 13.9759C11.2487 13.9139 11.011 13.7371 10.872 13.4895C10.818 13.3932 10.7829 13.2762 10.7127 13.0422L9.14939 7.83131Z" fill="#000" stroke="#000" stroke-width="2" />
                    <circle cx="12" cy="19" r="2" fill="#000" stroke="#000" stroke-width="2" />
                </svg>

            ),
            title: "Instant Suggestions & Feedbacks",
            step1: "Based on your skills, experience, and target role",
            step2: "Receive intelligent feedback, identify improvement areas, and strengths",
            step3: "Highlight the most relevant experience & skills automatically"
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"> <path fill="#000" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path> </svg>),
            title: "AI Powered Mock Interview",
            step1: "Personalized AI-powered mock interviews based on your skills, experience, and target role",
            step2: "Defend every project, metric & achievement",
            step3: "Prepare for real interviews before applying"
        },

        {
            icon: (

                <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 32 32">
                    <path fill="#000" d="M10 18h8v2h-8zm0-5h12v2H10zm0 10h5v2h-5z"></path>
                    <path fill="#000" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"></path>
                </svg>

            ),
            title: "After Mock Interview",
            step1: "Generate deep analysis report based on the answers",
            step2: "Receive personalized interview guidance",
            step3: "Suggestion for the improvement areas and give the Chakra Points!"
        }
    ];
    return (
        <div className='w-[full] mt-20  flex-col  bg-gray-200  font-sans flex justify-center items-center '>

            <div className="text-center  mb-10 w-[90%]  ">
                <h2 className="
        mt-6
        text-2xl
        sm:text-3xl
        md:text-4xl
        lg:text-5xl
        font-black
        leading-tight
        flex gap-2
        font-bold
    ">
                    Everything You Need To

                    Conquer Interviews

                </h2>


            </div>
            <div className='w-[90%] mx-auto h-full bg-gray-200 rounded-xl '>


                {/* Steps Grid */}
                <div className='w-full mx-auto grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
lg:gap-8'>

                    {data.map((e, index) => (
                        <div
                            key={index}
                            className="
group
relative
overflow-hidden
rounded-3xl

bg-white

border
border-white/10

backdrop-blur-xl

p-8

hover:border-[#000]/40
hover:-translate-y-2

transition-all
duration-500
"
                        >
                            <div
                                className="
w-16 h-16
rounded-2xl
mb-5
bg-black/10

border border-[#000]/15

flex items-center justify-center

group-hover:scale-110
group-hover:rotate-3

transition-all duration-500
"
                            >
                                {e.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-balck mb-4">
                                {e.title}
                            </h3>

                            <div className="space-y-5 mt-6">
                                {[e.step1, e.step2, e.step3].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="flex items-center justify-center">
                                            <svg className='rotate-90' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#000" />
                                            </svg>

                                        </div>

                                        <p className="text-black/70">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>


                        </div>
                    ))}


                </div>
                <div className='w-full mb-10 flex justify-center'>
                    <button className="
group
relative
overflow-hidden
rounded-3xl

bg-black/10

border
border-white/10

backdrop-blur-xl

px-[50px] py-4
mt-5
font-semibold text-lg

hover:border-[#000]/40

flex gap-2 items-center
transition-all
duration-500
" onClick={() => Navigate("/app/interview-arena")}>  <svg className='rotate-45 group-hover:rotate-90 transition duration-500 ' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#000" />
                        </svg>
                        Explore Now
                    </button>
                </div>


            </div>
        </div>
    );
};

export default ThirdBlock;