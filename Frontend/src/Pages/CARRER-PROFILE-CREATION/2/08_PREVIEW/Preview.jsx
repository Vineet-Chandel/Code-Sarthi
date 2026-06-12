import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { href, useLocation, useNavigate } from "react-router-dom";
import { setRes } from "@/utils/resStore";
import axios from "axios";


import BASE_URL from "@/Pages/auth/baseURL";
import Step from "../Step";
import ProgressMeter from "../ProgressMeter";
const Preview = ({ resumeData }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const resData = useSelector((state) => state.res);

    const Navigate = useNavigate()
    let data = location.state?.resumeData || {};
    data = {
        ...location.state?.resumeData,
        ...resData,
        ...(resData?.header || {})
    }

    const [globalProfileLoading, setGlobalProfileLoading] = useState(false);



    const getResumeIfExist = async () => {
        try {
            setGlobalProfileLoading(true)
            const res = await axios.get(`${BASE_URL}/build-resume/get-resume`, { withCredentials: true })

            if (res.data.success === true) {
                dispatch(setRes(res.data.data));
            }

        } catch (err) {
            console.log(err);
        } finally {
            setGlobalProfileLoading(false);
        }
    }

    useEffect(() => {
        getResumeIfExist();
    }, [])




    const user = useSelector((store) => store.user);
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
        // visible
        <div className="w-full h-screen bg-white p-2  ">




            {globalProfileLoading && <div className='fixed bg-black/80 h-screen w-screen z-50 inset-0 flex items-center justify-center'>
                <motion.svg
                    animate={{
                        scale: [2, 1, 1, 1, 2, 2, 1, 1, 1, 2],
                        rotate: [0, 0, 0, 0, 180, 180, 0, 0, 0, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1056 3.44721L5.78885 6.10557C5.00831 6.49585 4.61803 6.69098 4.61803 7C4.61803 7.30902 5.00831 7.50415 5.78885 7.89443L11.1056 10.5528C11.5445 10.7722 11.7639 10.882 12 10.882C12.2361 10.882 12.4555 10.7722 12.8944 10.5528L18.2111 7.89443C18.9917 7.50415 19.382 7.30902 19.382 7C19.382 6.69098 18.9917 6.49585 18.2111 6.10557L12.8944 3.44721C12.4555 3.22776 12.2361 3.11803 12 3.11803C11.7639 3.11803 11.5445 3.22776 11.1056 3.44721Z" fill="#fff" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.02217 10.4893C7.62603 10.8135 8.33716 11.169 9.15554 11.5782L10.2113 12.1061C11.0891 12.545 11.528 12.7644 12.0001 12.7644C12.4723 12.7644 12.9112 12.545 13.789 12.1061L14.8447 11.5782C15.6631 11.169 16.3742 10.8135 16.9781 10.4893L18.2113 11.1059C18.9918 11.4961 19.3821 11.6913 19.3821 12.0003C19.3821 12.3093 18.9918 12.5044 18.2113 12.8947L12.8946 15.5531C12.4557 15.7725 12.2362 15.8822 12.0001 15.8822C11.7641 15.8822 11.5446 15.7725 11.1057 15.5531L11.1057 15.5531L5.78898 12.8947C5.00844 12.5044 4.61816 12.3093 4.61816 12.0003C4.61816 11.6913 5.00844 11.4961 5.78898 11.1059L7.02217 10.4893Z" fill="#fff" />
                    <path




                        fill-rule="evenodd" clip-rule="evenodd" d="M7.02169 15.4893C7.62567 15.8135 8.33696 16.1692 9.15557 16.5785L10.2113 17.1063C11.0891 17.5452 11.528 17.7647 12.0001 17.7647C12.4723 17.7647 12.9112 17.5452 13.789 17.1063L14.8447 16.5785C15.6633 16.1692 16.3746 15.8135 16.9786 15.4893L18.2113 16.1056C18.9918 16.4959 19.3821 16.691 19.3821 17C19.3821 17.3091 18.9918 17.5042 18.2113 17.8945L12.8946 20.5528C12.4557 20.7723 12.2362 20.882 12.0001 20.882C11.7641 20.882 11.5446 20.7723 11.1057 20.5528L11.1057 20.5528L5.78898 17.8945C5.00844 17.5042 4.61816 17.3091 4.61816 17C4.61816 16.691 5.00844 16.4959 5.78898 16.1056L7.02169 15.4893Z" fill="#fff" />
                </motion.svg>
            </div>}


            <div>
                <div className="border rounded-3xl mb-4 ">
                    <div className=" rounded-3xl flex flex-col min-[480px]:flex-row items-center justify-around min-[480px]:justify-center gap-5 min-[480px]:gap-3 bg-base-200 px-2 py-3.5 border-b border-slate-700 sm:px-5">
                        {/* Step Counter */}
                        <span className="w-full flex justify-center min-[480px]:justify-start min-[480px]:w-1/5">
                            <Step index={7} />
                        </span>

                        {/* Progress Meter Container */}
                        <span className="flex min-[480px]:w-[70%] justify-center  w-full min-[480px]:justify-end sm:w-3/5 ">
                            <ProgressMeter index={7} resumeData={data} />
                        </span>

                        <span className=" min-[480px]:w-[30%] flex gap-1 w-full  items-center justify-center text-white font-poppins text-2xl">

                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10 2h4c3.771 0 5.657 0 6.828 1.172S22 6.229 22 10v1c0 .552 0 1.55-.006 2H2.007C2 12.55 2 11.552 2 11v-1c0-3.771 0-5.657 1.172-6.828S6.229 2 10 2" opacity={0.5}></path>
                                <path fill="currentColor" d="M7.985 17.5c-2.84 0-4.26 0-5.141-.879C2.272 16.052 2.07 15.258 2 14v-1h20v1c-.07 1.258-.272 2.052-.844 2.621c-.882.879-2.301.879-5.14.879h-3.263v4h3.262c.416 0 .753.336.753.75s-.337.75-.753.75h-8.03a.75.75 0 0 1-.753-.75c0-.414.337-.75.753-.75h3.262v-4z"></path>
                            </svg>
                            Preview
                        </span>
                    </div>
                </div>
                <div
                    className="w-full min-h-screen  bg-black rounded-xl flex
flex-col
sm:flex-row
gap-3
sm:justify-between
sm:items-start gap-2 ">


                    <div className="w-full
max-w-[1500px]
mx-auto
px-2
sm:px-4
lg:px-6
xl:px-8  h-full py-10 px-3
sm:px-4
lg:px-5 flex  
flex-col
md:flex-row
xl:flex-row
gap-4 gap-2">
                        <div className="bg-[#080808]
    bg-[linear-gradient(45deg,#181818_25%,transparent_25%),linear-gradient(-45deg,#181818_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#181818_75%),linear-gradient(-45deg,transparent_75%,#181818_75%)]
    bg-[size:60px_60px] min-h-[700px] h-auto md:h-fit lg:min-h-[700px]  w-full 
lg:w-[32%]
xl:w-[30%]
2xl:w-[28%] rounded-xl flex  flex-col  lg:flex-col gap-3 p-3">


                            <div className="flex-col md:flex-col h-fit   w-full flex gap-2">
                                <div className="h-full min-h-[345px] z-20 w-full   lg:h-1/2 bg-gray-200 rounded-xl px-3
sm:px-4
lg:px-5 pt-5" >


                                    <div className="w-full  flex justify-center items-center flex-col">

                                        <div className="relative w-full   flex items-start justify-center">
                                            <img className="w-32
h-32
sm:w-40
sm:h-40
md:w-44
md:h-44
lg:w-48
lg:h-48
xl:w-52
xl:h-52 object-cover rounded-full" src={user?.user?.DATA?.photoUrl?.url} alt="" />
                                            <svg className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g fill="#000">
                                                    <path d="M8 7a1 1 0 0 1-1 1H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1a1 1 0 0 1 2 0v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h1a1 1 0 0 1 1 1"></path>
                                                    <path d="m14.596 5.011l4.392 4.392l-6.28 6.303A1 1 0 0 1 12 16H9a1 1 0 0 1-1-1v-3a1 1 0 0 1 .294-.708zm6.496-2.103a3.097 3.097 0 0 1 .165 4.203l-.164.18l-.693.694l-4.387-4.387l.695-.69a3.1 3.1 0 0 1 4.384 0"></path>
                                                </g>
                                            </svg>

                                        </div>

                                        <h2 className="text-lg
sm:text-xl
md:text-2xl mt-1 font-extrabold text-black ">
                                            {data.fname ? data.fname : user?.user?.DATA?.firstName}  {data.lname ? data.lname : user?.user?.DATA?.lastName}
                                        </h2>
                                        <p className="text-sm
sm:text-base
md:text-lg  font-bold text-accent ">
                                            {data.summaryTitle ? data.summaryTitle : user?.user?.DATA?.profession}
                                        </p>


                                        <p className="text-sm
sm:text-base
md:text-lg  mb-2 font-bold text-accent ">


                                            {data.location ? (<span className="flex items-center gap-1" > <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.398 17.804C13.881 17.0348 19 14.0163 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 14.0163 10.119 17.0348 11.602 17.804C11.8548 17.9351 12.1452 17.9351 12.398 17.804ZM12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" fill="#7E869E" fill-opacity="0.25" />
                                                <path d="M12.398 17.804L12.6743 18.3366V18.3366L12.398 17.804ZM11.602 17.804L11.3257 18.3366L11.3257 18.3366L11.602 17.804ZM18.4 9C18.4 11.2907 17.2328 13.1563 15.829 14.5722C14.4258 15.9876 12.8363 16.9007 12.1218 17.2713L12.6743 18.3366C13.4427 17.938 15.1542 16.9573 16.6812 15.4171C18.2077 13.8774 19.6 11.7256 19.6 9H18.4ZM12 2.6C15.5346 2.6 18.4 5.46538 18.4 9H19.6C19.6 4.80264 16.1974 1.4 12 1.4V2.6ZM5.6 9C5.6 5.46538 8.46538 2.6 12 2.6V1.4C7.80264 1.4 4.4 4.80264 4.4 9H5.6ZM11.8782 17.2713C11.1637 16.9007 9.57422 15.9876 8.17097 14.5722C6.76717 13.1563 5.6 11.2907 5.6 9H4.4C4.4 11.7256 5.79235 13.8774 7.31879 15.4171C8.8458 16.9573 10.5573 17.938 11.3257 18.3366L11.8782 17.2713ZM12.1218 17.2713C12.0421 17.3127 11.9579 17.3127 11.8782 17.2713L11.3257 18.3366C11.7518 18.5576 12.2482 18.5576 12.6743 18.3366L12.1218 17.2713ZM14.4 9C14.4 10.3255 13.3255 11.4 12 11.4V12.6C13.9882 12.6 15.6 10.9882 15.6 9H14.4ZM12 6.6C13.3255 6.6 14.4 7.67452 14.4 9H15.6C15.6 7.01178 13.9882 5.4 12 5.4V6.6ZM9.6 9C9.6 7.67452 10.6745 6.6 12 6.6V5.4C10.0118 5.4 8.4 7.01178 8.4 9H9.6ZM12 11.4C10.6745 11.4 9.6 10.3255 9.6 9H8.4C8.4 10.9882 10.0118 12.6 12 12.6V11.4Z" fill="#222222" />
                                                <path d="M19.7942 17.5C20.5841 17.9561 21 18.4734 21 19C21 19.5266 20.5841 20.0439 19.7942 20.5C19.0043 20.9561 17.8682 21.3348 16.5 21.5981C15.1318 21.8614 13.5798 22 12 22C10.4202 22 8.86817 21.8614 7.5 21.5981C6.13183 21.3348 4.99569 20.9561 4.20577 20.5C3.41586 20.0439 3 19.5266 3 19C3 18.4734 3.41586 17.9561 4.20577 17.5" stroke="#222222" stroke-width="1.2" stroke-linecap="round" />
                                            </svg>
                                                {data.location}{data.pincode ? `, ${data.pincode}` : ""}  </span>
                                            ) : (
                                                <span className="flex items-center gap-1" >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.398 17.804C13.881 17.0348 19 14.0163 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 14.0163 10.119 17.0348 11.602 17.804C11.8548 17.9351 12.1452 17.9351 12.398 17.804ZM12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" fill="#7E869E" fill-opacity="0.25" />
                                                        <path d="M12.398 17.804L12.6743 18.3366V18.3366L12.398 17.804ZM11.602 17.804L11.3257 18.3366L11.3257 18.3366L11.602 17.804ZM18.4 9C18.4 11.2907 17.2328 13.1563 15.829 14.5722C14.4258 15.9876 12.8363 16.9007 12.1218 17.2713L12.6743 18.3366C13.4427 17.938 15.1542 16.9573 16.6812 15.4171C18.2077 13.8774 19.6 11.7256 19.6 9H18.4ZM12 2.6C15.5346 2.6 18.4 5.46538 18.4 9H19.6C19.6 4.80264 16.1974 1.4 12 1.4V2.6ZM5.6 9C5.6 5.46538 8.46538 2.6 12 2.6V1.4C7.80264 1.4 4.4 4.80264 4.4 9H5.6ZM11.8782 17.2713C11.1637 16.9007 9.57422 15.9876 8.17097 14.5722C6.76717 13.1563 5.6 11.2907 5.6 9H4.4C4.4 11.7256 5.79235 13.8774 7.31879 15.4171C8.8458 16.9573 10.5573 17.938 11.3257 18.3366L11.8782 17.2713ZM12.1218 17.2713C12.0421 17.3127 11.9579 17.3127 11.8782 17.2713L11.3257 18.3366C11.7518 18.5576 12.2482 18.5576 12.6743 18.3366L12.1218 17.2713ZM14.4 9C14.4 10.3255 13.3255 11.4 12 11.4V12.6C13.9882 12.6 15.6 10.9882 15.6 9H14.4ZM12 6.6C13.3255 6.6 14.4 7.67452 14.4 9H15.6C15.6 7.01178 13.9882 5.4 12 5.4V6.6ZM9.6 9C9.6 7.67452 10.6745 6.6 12 6.6V5.4C10.0118 5.4 8.4 7.01178 8.4 9H9.6ZM12 11.4C10.6745 11.4 9.6 10.3255 9.6 9H8.4C8.4 10.9882 10.0118 12.6 12 12.6V11.4Z" fill="#222222" />
                                                        <path d="M19.7942 17.5C20.5841 17.9561 21 18.4734 21 19C21 19.5266 20.5841 20.0439 19.7942 20.5C19.0043 20.9561 17.8682 21.3348 16.5 21.5981C15.1318 21.8614 13.5798 22 12 22C10.4202 22 8.86817 21.8614 7.5 21.5981C6.13183 21.3348 4.99569 20.9561 4.20577 20.5C3.41586 20.0439 3 19.5266 3 19C3 18.4734 3.41586 17.9561 4.20577 17.5" stroke="#222222" stroke-width="1.2" stroke-linecap="round" />
                                                    </svg>
                                                    No location set
                                                </span>
                                            )}
                                        </p>


                                    </div>

                                </div>
                                <div className="h-full min-h-[345px] z-20 pl-5 pr-5 w-full  lg:h-1/2  rounded-xl bg-black/20 backdrop-blur-sm  border border-white/10" >
                                    <div className="relative z-10 mt-9 mb-9">
                                        <h2 className="text-xl flex gap-3 items-center font-medium tracking-tight text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.357 7.714l6.98 4.654c.963.641 1.444.962 1.964 1.087c.46.11.939.11 1.398 0c.52-.125 1.001-.446 1.964-1.087l6.98-4.654M7.157 19.5h9.686c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V9.3c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311c-.642-.327-1.482-.327-3.162-.327H7.157c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v5.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311c.642.327 1.482.327 3.162.327"></path>
                                            </svg> {data.email ? data.email : user?.user?.DATA?.gmail}
                                        </h2>
                                        <h2 className="text-xl flex gap-2 items-center font-medium tracking-tight text-info">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="#fff" d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.05 15.05 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2 2 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"></path>
                                            </svg> {data.phone ? (<span>{data.phone}</span>) : (<span> No number set </span>)}
                                        </h2>

                                        <p className="mt-3 mb-2 w-[90%] text-sm
sm:text-base
md:text-lg leading-[1.6] font-normal text-zinc-400">
                                            {data.summaryBody ? (

                                                <span > Results - driven Full Stack Developer with expertise in Java, Spring Boot, and Python, delivering high-quality solutions with a strong foundation in computer science </span>
                                            ) : (
                                                <div className="my-5 pl-5"> About is not set </div>)}
                                        </p>
                                        <div className="flex justify-center  w-fit mt-2
                 gap-2 bg-white/10 p-2 rounded-full items-center">


                                            {data.github && (

                                                <motion.div

                                                    variants={parentVariant}
                                                    initial="initial"
                                                    whileHover="hover"
                                                    onClick={() => window.open(data?.github, "_blank")}
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
                                            )}
                                            {data.linkedin && (

                                                <motion.div

                                                    variants={parentVariant}
                                                    initial="initial"
                                                    whileHover="hover"
                                                    onClick={() => window.open(data?.linkedin, "_blank")}
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
                                            )}
                                            {data.portfolio && (

                                                <motion.div

                                                    onClick={() => window.open(data?.portfolio, "_blank")}
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
                                            )}



                                            {!data.github && !data.linkedin && !data.portfolio && (
                                                <div className="flex w-[165px] 
                 gap-2 bg-white/10 p-2 rounded-full items-center">
                                                    <p className="flex justify-center  w-full items-center  gap-1"> No links  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="#fff" strokeDasharray={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0"></animate>
                                                        </path>
                                                    </svg></p>
                                                </div>
                                            )}
                                        </div>


                                    </div>

                                </div>
                            </div>


                            <div className="flex flex-col gap-2">

                                <div className="h-fit h-auto w-full  bg-cyan-900/5
border-cyan-700/40 rounded-xl group  "

                                >
                                    <div className="relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black p-4 sm:p-6">

                                        <div className="relative h-full  flex flex-col justify-center items-start">
                                            <h2 onClick={() => { Navigate("/app/build-resume/skill-content") }} className="text-xl cursor-pointer sm:text-2xl font-extrabold font-poppins gap-1 text-white mb-2 sm:mb-4 items-center  flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256">
                                                    <path fill="#fff" d="M214 152.09V216a6 6 0 0 1-6 6H48a6 6 0 0 1-6-6v-63.91a6 6 0 0 1 12 0V210h148v-57.91a6 6 0 0 1 12 0m-126 30h80a6 6 0 1 0 0-12H88a6 6 0 1 0 0 12m5.4-52.93l77.27 20.67a6 6 0 1 0 3.11-11.57L96.5 117.54a6 6 0 1 0-3.1 11.58Zm18.93-49.74l69.28 40a6.05 6.05 0 0 0 3 .8a6 6 0 0 0 3-11.18L118.33 69a6 6 0 1 0-6 10.38Zm87.75 13.35a6 6 0 0 0 8.48-8.48L152 27.76a6 6 0 1 0-8.48 8.47Z"></path>
                                                </svg>
                                                <span className="flex items-center gap-2 group-hover:underline underline-white underline-offset-4">
                                                    Tech Stack
                                                    <svg className="group-hover:flex hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="#fff" strokeDasharray={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0"></animate>
                                                        </path>
                                                    </svg>
                                                </span>
                                            </h2>
                                            {data.skills ? (data?.skills?.map((item, idx) => (
                                                <p
                                                    key={idx}
                                                    className="flex items-start text-base sm:text-lg font-extrabold text-white"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="1.3em"
                                                        height="1.3em"
                                                        viewBox="0 0 16 16"
                                                        className="mt-1 mr-2 shrink-0"
                                                    >
                                                        <path fill="#fff" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" />
                                                    </svg>

                                                    <span>
                                                        {item.skillCategory} :{" "}
                                                        <span className="font-extralight">
                                                            {item.skills.join(", ")}
                                                        </span>
                                                    </span>
                                                </p>
                                            ))) :
                                                <div className="text-lg
sm:text-xl
md:text-2xl  text-gray-400 w-full justify-center flex items-center font-extrabold">
                                                    NO SKILLS ADDED YET
                                                </div>
                                            }
                                        </div>





                                    </div>

                                </div>
                                <div className="h-fit h-auto w-full  bg-amber-900/5
border-amber-700/40 rounded-xl group  "

                                >
                                    <div className="relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black p-4 sm:p-6">

                                        <div className="relative h-full  flex flex-col justify-center items-start">
                                            <h2 onClick={() => { Navigate("/app/build-resume/additional-details") }} className="  cursor-pointer  text-xl sm:text-2xl font-extrabold font-poppins gap-1 text-white mb-2 sm:mb-4 items-center  flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                    <path fill="#fff" d="m13 21l2-1l2 1v-7h-4m4-5V7l-2 1l-2-1v2l-2 1l2 1v2l2-1l2 1v-2l2-1m1-7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7v-2H4V5h16v10h-1v2h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9 5H5V6h6m-2 5H5V9h4m2 5H5v-2h6Z"></path>
                                                </svg>
                                                <span className="flex items-center gap-2 group-hover:underline underline-white underline-offset-4">
                                                    Certifications
                                                    <svg className="group-hover:flex hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="#fff" strokeDasharray={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0"></animate>
                                                        </path>
                                                    </svg>
                                                </span>
                                            </h2>
                                            {data.certifications ? (
                                                data?.certifications.map((item, idx) => (
                                                    < p key={idx} className="flex flex-col items-start text-base sm:text-lg font-extrabold text-white">

                                                        <span className="flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                                                                <path fill="#fff" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path>
                                                            </svg>{item.about}
                                                        </span>

                                                        <span className="flex items-center gap-1"></span>


                                                        <span className="font-extralight pl-5 break-all
text-blue-400
hover:underline"> {item.link}</span></p>
                                                ))

                                            ) : (<div className="text-lg
sm:text-xl
md:text-2xl  text-gray-400 w-full justify-center flex items-center font-extrabold">
                                                NO CERTIFICATIONS ADDED YET
                                            </div>)}
                                        </div>

                                    </div>

                                </div>
                                <div className="h-fit h-auto w-full bg-rose-900/5
border-rose-700/40 rounded-xl group "

                                >
                                    <div className="relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black p-4 sm:p-6">

                                        <div className="relative h-full  flex flex-col justify-center items-start">


                                            <h2 onClick={() => { Navigate("/app/build-resume/additional-details") }} className=" cursor-pointer text-xl sm:text-2xl font-extrabold font-poppins gap-1 text-white mb-2 sm:mb-4 items-center  flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                    <path fill="#fff" d="M18 2c-.9 0-2 1-2 2H8c0-1-1.1-2-2-2H2v9c0 1 1 2 2 2h2.2c.4 2 1.7 3.7 4.8 4v2.08C8 19.54 8 22 8 22h8s0-2.46-3-2.92V17c3.1-.3 4.4-2 4.8-4H20c1 0 2-1 2-2V2zM6 11H4V4h2zm14 0h-2V4h2z"></path>
                                                </svg>
                                                <span className="flex items-center gap-2 group-hover:underline underline-white underline-offset-4">
                                                    Achievements
                                                    <svg className="group-hover:flex hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="#fff" strokeDasharray={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0"></animate>
                                                        </path>
                                                    </svg>
                                                </span>
                                            </h2>

                                            {data.achievements ? (
                                                data.achievements.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex flex-col items-start text-sm sm:text-md font-light text-white mb-4"
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1.3em"
                                                                height="1.3em"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    fill="#fff"
                                                                    d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                                                                />
                                                            </svg>

                                                            {item}
                                                        </span>

                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center text-gray-400 font-bold">
                                                    NO ACHIEVEMENTS ADDED YET
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                </div>
                                <div className="h-fit h-auto w-full  bg-emerald-900/5
border-emerald-700/40 rounded-xl group "

                                >
                                    <div className="relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black p-4 sm:p-6">

                                        <div className="relative h-full  flex flex-col justify-center items-start">



                                            <h2 onClick={() => { Navigate("/app/build-resume/additional-details") }} className=" cursor-pointer text-xl sm:text-2xl font-extrabold font-poppins gap-1 text-white mb-2 sm:mb-4 items-center  flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 512 512">
                                                    <path fill="#fff" d="m478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4ZM334.83 362L368 281.65L401.17 362Zm-66.99-19.08a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9Z"></path>
                                                </svg>
                                                <span className="flex items-center gap-2 group-hover:underline underline-white underline-offset-4">
                                                    Languages
                                                    <svg className="group-hover:flex hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="#fff" strokeDasharray={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0"></animate>
                                                        </path>
                                                    </svg>
                                                </span>
                                            </h2>

                                            {data.languages ? (
                                                data.languages.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex flex-col items-start text-base sm:text-lg font-extrabold text-white mb-4"
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1.3em"
                                                                height="1.3em"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    fill="#fff"
                                                                    d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
                                                                />
                                                            </svg>

                                                            {item.langCategory}
                                                        </span>

                                                        <span className="font-extralight pl-5">
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center text-gray-400 font-bold">
                                                    NO LANGUAGES ADDED YET
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>


                        <div className="flex lg:w-2/3 w-full h-full flex-col gap-2">
                            <div className="flex flex-col md:flex-row items-stretch gap-2 w-full  group"

                            >

                                <div className="h-fit h-auto bg-white w-full rounded-xl   overflow-hidden">
                                    <div className="relative z-10  p-3
sm:p-4
md:p-5
lg:p-6">
                                        <h2 onClick={() => { Navigate("/app/build-resume/experience-content") }} className="text-xl cursor-pointer
sm:text-2xl
md:text-3xl flex flex-row items-center justify-start mb-4 font-extrabold tracking-tight text-black gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                <path fill="#000" d="M19 6H5a3 3 0 0 0-3 3v2.72L8.837 14h6.326L22 11.72V9a3 3 0 0 0-3-3" opacity={0.5}></path>
                                                <path fill="#000" d="M10 6V5h4v1h2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1zm-1.163 8L2 11.72V18a3.003 3.003 0 0 0 3 3h14a3.003 3.003 0 0 0 3-3v-6.28L15.163 14z"></path>
                                            </svg>
                                            <span className="flex items-center gap-2 group-hover:underline underline-white underline-offset-4"> Experience
                                                <svg className="group-hover:flex hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="#000" strokeDasharray={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0"></animate>
                                                    </path>
                                                </svg>
                                            </span>
                                        </h2>

                                        {data.experience ? (

                                            data?.experience.map((item, idx) => (
                                                <div>
                                                    {idx != 0 && < span className="flex items-center justif-center gap-2 mt-3 mb-3" >
                                                        <span className="w-full bg-black h-[1px] rounded-full flex items-center"></span>
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                                <path fill="#000" d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"></path>
                                                            </svg>
                                                        </span>
                                                        <span className="w-full bg-black h-[1px] rounded-full flex items-center"></span>
                                                    </span>}


                                                    <div key={idx} className="bg-black/10 p-3 rounded-2xl">
                                                        <div className="flex
flex-col
xl:flex-row
gap-3
sm:justify-between
sm:items-start">
                                                            <div className="w-full xl:w-[70%]">
                                                                <h2 className="text-lg
sm:text-xl
md:text-2xl mt-3 font-extrabold text-black ">
                                                                    {item?.role}
                                                                </h2>
                                                                <p className="text-md break-words flex items-center gap-1 font-medium text-accent ">
                                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.398 17.804C13.881 17.0348 19 14.0163 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 14.0163 10.119 17.0348 11.602 17.804C11.8548 17.9351 12.1452 17.9351 12.398 17.804ZM12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" fill="#7E869E" fill-opacity="0.25" />
                                                                        <path d="M12.398 17.804L12.6743 18.3366V18.3366L12.398 17.804ZM11.602 17.804L11.3257 18.3366L11.3257 18.3366L11.602 17.804ZM18.4 9C18.4 11.2907 17.2328 13.1563 15.829 14.5722C14.4258 15.9876 12.8363 16.9007 12.1218 17.2713L12.6743 18.3366C13.4427 17.938 15.1542 16.9573 16.6812 15.4171C18.2077 13.8774 19.6 11.7256 19.6 9H18.4ZM12 2.6C15.5346 2.6 18.4 5.46538 18.4 9H19.6C19.6 4.80264 16.1974 1.4 12 1.4V2.6ZM5.6 9C5.6 5.46538 8.46538 2.6 12 2.6V1.4C7.80264 1.4 4.4 4.80264 4.4 9H5.6ZM11.8782 17.2713C11.1637 16.9007 9.57422 15.9876 8.17097 14.5722C6.76717 13.1563 5.6 11.2907 5.6 9H4.4C4.4 11.7256 5.79235 13.8774 7.31879 15.4171C8.8458 16.9573 10.5573 17.938 11.3257 18.3366L11.8782 17.2713ZM12.1218 17.2713C12.0421 17.3127 11.9579 17.3127 11.8782 17.2713L11.3257 18.3366C11.7518 18.5576 12.2482 18.5576 12.6743 18.3366L12.1218 17.2713ZM14.4 9C14.4 10.3255 13.3255 11.4 12 11.4V12.6C13.9882 12.6 15.6 10.9882 15.6 9H14.4ZM12 6.6C13.3255 6.6 14.4 7.67452 14.4 9H15.6C15.6 7.01178 13.9882 5.4 12 5.4V6.6ZM9.6 9C9.6 7.67452 10.6745 6.6 12 6.6V5.4C10.0118 5.4 8.4 7.01178 8.4 9H9.6ZM12 11.4C10.6745 11.4 9.6 10.3255 9.6 9H8.4C8.4 10.9882 10.0118 12.6 12 12.6V11.4Z" fill="#222222" />
                                                                        <path d="M19.7942 17.5C20.5841 17.9561 21 18.4734 21 19C21 19.5266 20.5841 20.0439 19.7942 20.5C19.0043 20.9561 17.8682 21.3348 16.5 21.5981C15.1318 21.8614 13.5798 22 12 22C10.4202 22 8.86817 21.8614 7.5 21.5981C6.13183 21.3348 4.99569 20.9561 4.20577 20.5C3.41586 20.0439 3 19.5266 3 19C3 18.4734 3.41586 17.9561 4.20577 17.5" stroke="#222222" stroke-width="1.2" stroke-linecap="round" />
                                                                    </svg>
                                                                    {item?.company}{item?.location ? `, ${item?.location}` : ""}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <div className=" text-black flex items-center justify-center  px-3
sm:px-4
lg:px-5 py-1 rounded-full text-sm
sm:text-base
md:text-lg border bg-gray-400/40 mx-auto   border-white/10 font-extrabold font-poppins">{item?.employmentType}</div>
                                                                <div className="text-black text-center text-xs mt-1">{item?.startDate} - {item?.currentlyWorking ? "Present" : item?.endDate}</div>
                                                            </div>
                                                        </div>
                                                        <div className=" mt-2 pl-4 bg-black/20 rounded-2xl w-full py-2">
                                                            <h2 className="text-xl  font-bold text-black mb-2 ">
                                                                Job Description
                                                            </h2>

                                                            {item?.bullets?.length > 0 ? (
                                                                item?.bullets.map((bullet, index) => (
                                                                    <p className="text-black flex
items-start
gap-2
leading-7 " key={index}>

                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z" fill="#222222" />
                                                                        </svg> {bullet}
                                                                    </p>
                                                                ))) : (
                                                                <div className="text-black text-lg
sm:text-xl
md:text-2xl justify-center mb-5 text-center items-center flex font-extrabold">No bullets point added</div>
                                                            )


                                                            }
                                                        </div>
                                                    </div>
                                                </div>



                                            ))
                                        ) : (
                                            <div className="text-center text-xl text-gray-700 font-bold">
                                                NO EXPERIENCE ADDED YET
                                            </div>
                                        )
                                        }


                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-stretch gap-2 w-full  group"

                            >

                                <div className="h-fit h-auto bg-white w-full rounded-xl   overflow-hidden">
                                    <div className="relative z-10  p-3
sm:p-4
md:p-5
lg:p-6">
                                        <h2 onClick={() => { Navigate("/app/build-resume/project-content") }} className="text-xl cursor-pointer
sm:text-2xl
md:text-3xl flex flex-row items-center justify-start mb-4 font-extrabold tracking-tight text-black gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                <path fill="#000" d="M8.75 7a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5zM7 11.75a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M9.75 15a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5z"></path>
                                                <path fill="#000" d="M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 20.25 22H3.75A1.75 1.75 0 0 1 2 20.25Zm1.75-.25a.25.25 0 0 0-.25.25v16.5c0 .138.112.25.25.25h16.5a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25Z"></path>
                                            </svg> <span className="flex items-center gap-2 group-hover:underline underline-white underline-offset-4"> Projects
                                                <svg className="group-hover:flex hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                    <path fill="none" stroke="#000" strokeDasharray={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0"></animate>
                                                    </path>
                                                </svg>
                                            </span>
                                        </h2>


                                        {data.projects ? (
                                            data.projects.map((item, idx) => (
                                                <div>
                                                    {idx != 0 && < span className="flex items-center justif-center gap-2 mt-3 mb-3" >
                                                        <span className="w-full bg-black h-[1px] rounded-full flex items-center"></span>
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                                <path fill="#000" d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"></path>
                                                            </svg>
                                                        </span>
                                                        <span className="w-full bg-black h-[1px] rounded-full flex items-center"></span>
                                                    </span>}
                                                    <div className="bg-black/10 p-3 rounded-2xl">
                                                        <div className="flex
flex-col
xl:flex-row
gap-3
sm:justify-between
sm:items-start">
                                                            <div className="w-full xl:w-[70%] ">
                                                                <h2 className="text-lg
sm:text-xl
md:text-2xl mt-3 font-extrabold text-black ">
                                                                    {item?.name}
                                                                </h2>
                                                                <p className="text-md  flex items-center gap-1 font-extrabold text-accent ">

                                                                    Tech Stack  :  <span className="font-medium text-accent">
                                                                        {item?.stack}
                                                                    </span>
                                                                </p>
                                                                <p className="text-sm mt-2 pl-3 gap-1 text-black w-full">
                                                                    {item?.description}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <motion.div
                                                                    variants={parentVariant}
                                                                    initial="initial"
                                                                    whileHover="hover"

                                                                    className="cursor-pointer text-black flex
flex-row
gap-3
sm:justify-between
sm:items-start  px-1  gap-2 py-1 rounded-full text-sm
sm:text-base
md:text-lg border bg-gray-400/40  w-fit  border-white/10 font-extrabold font-poppins">

                                                                    <div className="flex 
flex-row
gap-2  items-center gap-2 border-r-2 pr-2 border-black text-sm"
                                                                        onClick={
                                                                            () => {
                                                                                window.open(item?.github, "_blank");
                                                                            }
                                                                        }
                                                                    >
                                                                        <div className="flex items-center justify-center  h-8 w-8 rounded-full text-sm border bg-gray-100 mx-auto cursor-pointer group border-white/10 font-extrabold font-poppins">

                                                                            <motion.svg
                                                                                variants={iconVariants}
                                                                                transition={{
                                                                                    duration: 0.3,
                                                                                    ease: "easeInOut",
                                                                                }}
                                                                                className="group-hover:scale-110 transition-all duration-500 w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                                <path d="M0 0h24v24H0z" fill="none" />
                                                                                <path fill="#000" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                                                                            </motion.svg>

                                                                        </div>Git Hub
                                                                    </div>
                                                                    <div className="flex
flex-row
gap-2  items-center gap-2 text-sm"
                                                                        onClick={
                                                                            () => {
                                                                                window.open(item?.live, "_blank");
                                                                            }
                                                                        }
                                                                    >
                                                                        Live Run
                                                                        <div className="flex items-center justify-center  h-8 w-8 rounded-full text-sm
sm:text-base
md:text-lg border bg-gray-100 cursor-pointer group border-white/10 font-extrabold font-poppins">
                                                                            <motion.svg
                                                                                variants={iconVariants}
                                                                                transition={{
                                                                                    duration: 0.3,
                                                                                    ease: "easeInOut",
                                                                                }}
                                                                                className="group-hover:scale-110 transition-all duration-500 w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                                                <path fill="#000" d="M3.05 3.05a.75.75 0 0 1 1.06 1.06a5.5 5.5 0 0 0 0 7.778a.75.75 0 0 1-1.06 1.06a7 7 0 0 1 0-9.9m8.838 0a.75.75 0 0 1 1.06 0a7 7 0 0 1 0 9.9a.75.75 0 1 1-1.06-1.061a5.5 5.5 0 0 0 0-7.778a.75.75 0 0 1 0-1.061M5.174 5.172a.75.75 0 1 1 1.06 1.06a2.5 2.5 0 0 0 0 3.536a.75.75 0 0 1-1.06 1.06a4 4 0 0 1 0-5.656m4.596 0a.75.75 0 0 1 1.06 0a4 4 0 0 1 0 5.656a.75.75 0 1 1-1.06-1.06a2.5 2.5 0 0 0 0-3.535a.75.75 0 0 1 0-1.061M8 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"></path>
                                                                            </motion.svg>


                                                                        </div>

                                                                    </div>
                                                                </motion.div>



                                                            </div>
                                                        </div>
                                                        <div className=" mt-2 pl-4 bg-black/20 rounded-2xl w-full py-2">
                                                            <h2 className="text-xl  font-bold text-black mb-2 ">
                                                                Project Description
                                                            </h2>
                                                            {item?.bullets?.length > 0 ? (
                                                                item?.bullets.map((bullet, index) => (
                                                                    <p className="text-black flex
items-start
gap-2
leading-7 " key={index}>

                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z" fill="#222222" />
                                                                        </svg> {bullet}
                                                                    </p>
                                                                ))) : (
                                                                <div className="text-black text-lg
sm:text-xl
md:text-2xl justify-center mb-5 text-center items-center flex font-extrabold">No bullets point added</div>
                                                            )


                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            ))


                                        ) : (
                                            <div className="text-center text-xl text-gray-700 font-bold">
                                                NO PROJECT ADDED YET
                                            </div>
                                        )}





                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-stretch gap-2 w-full group"

                            >
                                <div className="h-fit h-auto w-full  bg-blue-500 rounded-xl">
                                    <div className="relative h-full overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-600/50 to-black/50 p-2 sm:p-3">

                                        <div className="relative z-10  p-3">
                                            <h2 onClick={() => { Navigate("/app/build-resume/education-content") }} className="text-xl cursor-pointer
sm:text-2xl
md:text-3xl flex flex-row items-center justify-start mb-4 font-extrabold tracking-tight text-white gap-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                                    <path fill="#fff" d="M23.835 8.5L12 .807L.165 8.5L12 16.192l8-5.2V16h2V9.693z"></path>
                                                    <path fill="#fff" d="M5 17.5v-3.665l7 4.55l7-4.55V17.5c0 1.47-1.014 2.615-2.253 3.338C15.483 21.576 13.802 22 12 22s-3.482-.424-4.747-1.162C6.014 20.115 5 18.97 5 17.5"></path>
                                                </svg> <span className="flex items-center gap-2 group-hover:underline underline-white underline-offset-4"> Education
                                                    <svg className="group-hover:flex hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="#fff" strokeDasharray={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="28;0"></animate>
                                                        </path>
                                                    </svg>
                                                </span>
                                            </h2>

                                            {
                                                data.education ? (

                                                    data.education.map((item, idx) => (
                                                        <div key={idx}>


                                                            {idx != 0 && <span className="flex items-center justif-center gap-2 mt-3 mb-3" >
                                                                <span className="w-full bg-white h-[1px] rounded-full flex items-center"></span>
                                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                                    <path fill="#fff" d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"></path>
                                                                </svg></span>
                                                                <span className="w-full bg-white h-[1px] rounded-full flex items-center"></span>
                                                            </span>}
                                                            <div className="bg-black/10 p-3 rounded-2xl">
                                                                <div className="flex
flex-col
xl:flex-row
gap-3
sm:justify-between
sm:items-start">
                                                                    <div className="w-full xl:w-[70%]">
                                                                        <h2 className="text-lg
sm:text-xl
md:text-2xl mt-3 font-extrabold text-white ">
                                                                            {item?.degree}
                                                                        </h2>
                                                                        <p className="text-md  flex items-center gap-1 font-medium text-info mt-1 mb-1">

                                                                            {item?.field}
                                                                        </p>
                                                                        <p className="text-md  flex items-center gap-1 font-medium text-info ">
                                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.398 17.804C13.881 17.0348 19 14.0163 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 14.0163 10.119 17.0348 11.602 17.804C11.8548 17.9351 12.1452 17.9351 12.398 17.804ZM12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" fill="#fff" fill-opacity="1" />
                                                                                <path d="M12.398 17.804L12.6743 18.3366V18.3366L12.398 17.804ZM11.602 17.804L11.3257 18.3366L11.3257 18.3366L11.602 17.804ZM18.4 9C18.4 11.2907 17.2328 13.1563 15.829 14.5722C14.4258 15.9876 12.8363 16.9007 12.1218 17.2713L12.6743 18.3366C13.4427 17.938 15.1542 16.9573 16.6812 15.4171C18.2077 13.8774 19.6 11.7256 19.6 9H18.4ZM12 2.6C15.5346 2.6 18.4 5.46538 18.4 9H19.6C19.6 4.80264 16.1974 1.4 12 1.4V2.6ZM5.6 9C5.6 5.46538 8.46538 2.6 12 2.6V1.4C7.80264 1.4 4.4 4.80264 4.4 9H5.6ZM11.8782 17.2713C11.1637 16.9007 9.57422 15.9876 8.17097 14.5722C6.76717 13.1563 5.6 11.2907 5.6 9H4.4C4.4 11.7256 5.79235 13.8774 7.31879 15.4171C8.8458 16.9573 10.5573 17.938 11.3257 18.3366L11.8782 17.2713ZM12.1218 17.2713C12.0421 17.3127 11.9579 17.3127 11.8782 17.2713L11.3257 18.3366C11.7518 18.5576 12.2482 18.5576 12.6743 18.3366L12.1218 17.2713ZM14.4 9C14.4 10.3255 13.3255 11.4 12 11.4V12.6C13.9882 12.6 15.6 10.9882 15.6 9H14.4ZM12 6.6C13.3255 6.6 14.4 7.67452 14.4 9H15.6C15.6 7.01178 13.9882 5.4 12 5.4V6.6ZM9.6 9C9.6 7.67452 10.6745 6.6 12 6.6V5.4C10.0118 5.4 8.4 7.01178 8.4 9H9.6ZM12 11.4C10.6745 11.4 9.6 10.3255 9.6 9H8.4C8.4 10.9882 10.0118 12.6 12 12.6V11.4Z" fill="#fff" />
                                                                                <path d="M19.7942 17.5C20.5841 17.9561 21 18.4734 21 19C21 19.5266 20.5841 20.0439 19.7942 20.5C19.0043 20.9561 17.8682 21.3348 16.5 21.5981C15.1318 21.8614 13.5798 22 12 22C10.4202 22 8.86817 21.8614 7.5 21.5981C6.13183 21.3348 4.99569 20.9561 4.20577 20.5C3.41586 20.0439 3 19.5266 3 19C3 18.4734 3.41586 17.9561 4.20577 17.5" stroke="#fff" stroke-width="1.2" stroke-linecap="round" />
                                                                            </svg>
                                                                            {item.institution}{`, ${item.location}`}
                                                                        </p>
                                                                    </div>

                                                                    <div>
                                                                        <div className=" text-white flex items-center justify-center  px-3
sm:px-4
lg:px-5 py-1 rounded-full text-sm
sm:text-base
md:text-lg border bg-gray-400/40 mx-auto   border-white/10 font-extrabold font-poppins">{item.cgpa} </div>
                                                                        <div className="text-white text-center text-xs mt-1">{item.startDate} - {item.endDate}</div>
                                                                    </div>
                                                                </div>
                                                                <div className=" mt-2 pl-4 bg-black/20 rounded-2xl w-full py-2">
                                                                    <h2 className="text-xl  font-bold text-white mb-2 ">
                                                                        Achievements
                                                                    </h2>
                                                                    {item?.bullets?.length > 0 ? (
                                                                        item?.bullets.map((bullet, index) => (
                                                                            <p className="text-info flex
items-start
gap-2
leading-7 " key={index}>

                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M6.99811 10.2467L7.43298 11.0077C7.70983 11.4922 7.84825 11.7344 7.84825 12C7.84825 12.2656 7.70983 12.5078 7.43299 12.9923L7.43298 12.9923L6.99811 13.7533C5.75981 15.9203 5.14066 17.0039 5.62348 17.5412C6.1063 18.0785 7.24961 17.5783 9.53623 16.5779L15.8119 13.8323C17.6074 13.0468 18.5051 12.654 18.5051 12C18.5051 11.346 17.6074 10.9532 15.8119 10.1677L9.53624 7.4221C7.24962 6.42171 6.1063 5.92151 5.62348 6.45883C5.14066 6.99615 5.75981 8.07966 6.99811 10.2467Z" fill="#fff" />
                                                                                </svg> {bullet}
                                                                            </p>
                                                                        ))) : (
                                                                        <div className="text-black text-lg
sm:text-xl
md:text-2xl justify-center mb-5 text-center items-center flex font-extrabold">No bullets point added</div>
                                                                    )


                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>


                                                    ))
                                                ) : (
                                                    <div className="text-white text-lg
sm:text-xl
md:text-2xl justify-center mb-5 text-center items-center flex font-extrabold">No Education added yet</div>


                                                )}







                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div >
            </div>




        </div >

    )
}

export default Preview