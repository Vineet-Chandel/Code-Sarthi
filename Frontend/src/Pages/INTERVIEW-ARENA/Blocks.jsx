import React from 'react';
import { Layout, Download } from 'lucide-react'; // Optional: icon library
import { useNavigate } from 'react-router-dom';


const Blocks = () => {
    const Navigate = useNavigate();

    const data = [
        {
            icon: (<svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1056 3.44721L5.78885 6.10557C5.00831 6.49585 4.61803 6.69098 4.61803 7C4.61803 7.30902 5.00831 7.50415 5.78885 7.89443L11.1056 10.5528C11.5445 10.7722 11.7639 10.882 12 10.882C12.2361 10.882 12.4555 10.7722 12.8944 10.5528L18.2111 7.89443C18.9917 7.50415 19.382 7.30902 19.382 7C19.382 6.69098 18.9917 6.49585 18.2111 6.10557L12.8944 3.44721C12.4555 3.22776 12.2361 3.11803 12 3.11803C11.7639 3.11803 11.5445 3.22776 11.1056 3.44721Z" fill="#A7A0F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02217 10.4893C7.62603 10.8135 8.33716 11.169 9.15554 11.5782L10.2113 12.1061C11.0891 12.545 11.528 12.7644 12.0001 12.7644C12.4723 12.7644 12.9112 12.545 13.789 12.1061L14.8447 11.5782C15.6631 11.169 16.3742 10.8135 16.9781 10.4893L18.2113 11.1059C18.9918 11.4961 19.3821 11.6913 19.3821 12.0003C19.3821 12.3093 18.9918 12.5044 18.2113 12.8947L12.8946 15.5531C12.4557 15.7725 12.2362 15.8822 12.0001 15.8822C11.7641 15.8822 11.5446 15.7725 11.1057 15.5531L11.1057 15.5531L5.78898 12.8947C5.00844 12.5044 4.61816 12.3093 4.61816 12.0003C4.61816 11.6913 5.00844 11.4961 5.78898 11.1059L7.02217 10.4893Z" fill="#A7A0F8" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02169 15.4893C7.62567 15.8135 8.33696 16.1692 9.15557 16.5785L10.2113 17.1063C11.0891 17.5452 11.528 17.7647 12.0001 17.7647C12.4723 17.7647 12.9112 17.5452 13.789 17.1063L14.8447 16.5785C15.6633 16.1692 16.3746 15.8135 16.9786 15.4893L18.2113 16.1056C18.9918 16.4959 19.3821 16.691 19.3821 17C19.3821 17.3091 18.9918 17.5042 18.2113 17.8945L12.8946 20.5528C12.4557 20.7723 12.2362 20.882 12.0001 20.882C11.7641 20.882 11.5446 20.7723 11.1057 20.5528L11.1057 20.5528L5.78898 17.8945C5.00844 17.5042 4.61816 17.3091 4.61816 17C4.61816 16.691 5.00844 16.4959 5.78898 16.1056L7.02169 15.4893Z" fill="#A7A0F8" />
            </svg>
            ),
            title: "Analyse Carrer Profile",
            step1: "Upload Job Role & Description",
            step2: "Get AI Analysis & Suggestions for the profile",
            step3: "Get Resume & CoverLetter for the dedicated Job Roles",

        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"> <path fill="#A7A0F8" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path> </svg>
            ),
            title: "AI Resume Builder",
            step1: "Paste any Job Description",
            step2: "Generate ATS-optimized resumes instantly",
            step3: "Highlight the most relevant experience automatically"
        },

        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 24 24"> <path fill="#A7A0F8" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path> </svg>),
            title: "Resume Defense AI™",
            step1: "Practice questions based on YOUR resume",
            step2: "Defend every project, metric & achievement",
            step3: "Prepare for real interviews before applying"
        },

        {
            icon: (

                <svg width="2.2em" height="2.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L4.6797 10.8496C4.34718 10.434 4.18092 10.2262 4.13625 9.9757C4.09159 9.72524 4.17575 9.47276 4.34407 8.96778L5.0883 6.73509C5.52832 5.41505 5.74832 4.75503 6.2721 4.37752C6.79587 4 7.49159 4 8.88304 4H15.117C16.5084 4 17.2041 4 17.7279 4.37752C18.2517 4.75503 18.4717 5.41505 18.9117 6.73509L19.6559 8.96778C19.8243 9.47276 19.9084 9.72524 19.8637 9.9757C19.8191 10.2262 19.6528 10.434 19.3203 10.8496L12 20Z" fill="#A7A0F8" fill-opacity="0.25" />
                    <path d="M12 20L4.6797 10.8496C4.34718 10.434 4.18092 10.2262 4.13625 9.9757C4.09159 9.72524 4.17575 9.47276 4.34407 8.96778L5.0883 6.73509C5.52832 5.41505 5.74832 4.75503 6.2721 4.37752C6.79587 4 7.49159 4 8.88304 4H15.117C16.5084 4 17.2041 4 17.7279 4.37752C18.2517 4.75503 18.4717 5.41505 18.9117 6.73509L19.6559 8.96778C19.8243 9.47276 19.9084 9.72524 19.8637 9.9757C19.8191 10.2262 19.6528 10.434 19.3203 10.8496L12 20ZM12 20L15.5 9M12 20L8.5 9M19.5 10L15.5 9M15.5 9L14 5M15.5 9H8.5M10 5L8.5 9M8.5 9L4.5 10" stroke="#A7A0F8" stroke-width="1.4" stroke-linecap="round" />
                </svg>

            ),
            title: "Interview Ready",
            step1: "Generate tailored cover letters instantly",
            step2: "Receive personalized interview preparation",
            step3: "Apply with confidence, not guesswork"
        }
    ];
    return (
        <div className='w-full mt-20  flex-col  bg-base-100  font-sans flex justify-center items-center'>

            <div className="text-center mb-20">
                <h2 className="
        mt-6
        text-4xl
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        font-black
        leading-tight
    ">
                    Everything You Need To
                    <span className="block bg-gradient-to-r from-[#A7A0F8] via-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Conquer Interviews
                    </span>
                </h2>

                <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-lg">
                    From resume creation to mock interviews, Chakravyūha AI
                    prepares you for every stage of the hiring battlefield.
                </p>
            </div>
            <div className='w-[100%] h-full bg-base-100 rounded-xl '>


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

bg-gradient-to-b
from-white/[0.05]
to-white/[0.02]

border
border-white/10

backdrop-blur-xl

p-8

hover:border-[#A7A0F8]/40
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
bg-gradient-to-br
from-[#A7A0F8]/20
to-[#A7A0F8]/5

border border-[#A7A0F8]/20

flex items-center justify-center

group-hover:scale-110
group-hover:rotate-3

transition-all duration-500
"
                            >
                                {e.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">
                                {e.title}
                            </h3>

                            <div className="space-y-5 mt-6">
                                {[e.step1, e.step2, e.step3].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <div className="

                flex items-center justify-center
            ">
                                            <svg className='rotate-90' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.00977 12.093C8.73643 11.8978 8.59976 11.8002 8.46411 11.7881C8.34513 11.7776 8.22631 11.81 8.12915 11.8795C8.01837 11.9587 7.95016 12.1121 7.81373 12.4191L4.77518 19.2559L4.77517 19.2559C4.53163 19.8038 4.40986 20.0778 4.46172 20.2541C4.50672 20.4071 4.62199 20.5294 4.77202 20.5834C4.9449 20.6457 5.22564 20.5404 5.7871 20.3298L5.78712 20.3298L11.7191 18.1053C11.823 18.0664 11.875 18.0469 11.9285 18.0391C11.9759 18.0323 12.0241 18.0323 12.0715 18.0391C12.125 18.0469 12.177 18.0664 12.2809 18.1053L18.2129 20.3298L18.2129 20.3298C18.7744 20.5404 19.0551 20.6457 19.228 20.5834C19.378 20.5294 19.4933 20.4071 19.5383 20.2541C19.5901 20.0778 19.4684 19.8038 19.2248 19.2559L16.1863 12.4191C16.0498 12.1121 15.9816 11.9587 15.8708 11.8795C15.7737 11.81 15.6549 11.7776 15.5359 11.7881C15.4002 11.8002 15.2636 11.8978 14.9902 12.093L12.5812 13.8137C12.2335 14.0621 11.7665 14.0621 11.4188 13.8137L9.00977 12.093ZM9.06112 9.61248C9.04945 9.63873 9.05786 9.66957 9.08124 9.68627L11.535 11.439C11.7023 11.5585 11.786 11.6182 11.8772 11.6413C11.9578 11.6617 12.0422 11.6617 12.1228 11.6413C12.214 11.6182 12.2977 11.5585 12.465 11.439L14.9188 9.68627C14.9421 9.66957 14.9505 9.63873 14.9389 9.61248L12.731 4.64486C12.4995 4.12391 12.3837 3.86344 12.2224 3.78331C12.0823 3.71371 11.9177 3.71371 11.7776 3.78331C11.6162 3.86344 11.5005 4.12391 11.2689 4.64486L9.06112 9.61248Z" fill="#A7A0F8" />
                                            </svg>

                                        </div>

                                        <p className="text-gray-300">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button className='w-full py-3 px-4 bg-secondary rounded-xl text-white font-semibold mt-6 hover:bg-primary-focus transition-colors'>Explore Now</button>
                        </div>
                    ))}
                </div>



            </div>
        </div>
    );
};

export default Blocks;