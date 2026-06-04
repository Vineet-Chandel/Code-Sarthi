import { useEffect } from "react";

// for EXPERINCE EDUCATION PROJECT - RESUME PAGE
const AiWorking = ({
    setIsAiworking,
    isAiworking,
    aiModalOpen,
    setAiModalOpen,
    bullets,
    setBullets,
    setpoints,
    points,
    setFeildIndex,
    feildIndex,
    setRole,
    role,
    setSelectedEntity,
    selectedEntity,
    setSelectedFeildType,
    selectedFeildType,
    addToast,
    setMainFeild,
    mainFeild
}) => {




    return (
        <div className=' fixed inset-0 z-40 bg-black/50 overflow-y-auto flex flex-col items-center px-2 sm:px-4 ' onClick={() => { setAiModalOpen(false); setBullets([]), setpoints([]), setRole(""), setSelectedEntity(""), setSelectedFeildType(""), setFeildIndex(null) }}>
            <div className='
self-end
w-12 h-12
sm:w-[60px] sm:h-[60px]
mt-3 mr-3
sm:mt-5 sm:mr-5

' onClick={() => { setAiModalOpen(false); setBullets([]), setpoints([]), setRole(""), setSelectedEntity(""), setSelectedFeildType(""), setFeildIndex(null) }} >
                <svg xmlns="http://www.w3.org/2000/svg" className="hover:rotate-180 
transition" width="2em" height="2em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M20 20L4 4m16 0L4 20"></path>
                </svg>
            </div>

            <div className=' w-full max-w-[1800px] flex flex-col xl:flex-row gap-3 sm:gap-5 p-2 sm:p-5 '>
                <div className=' w-full xl:w-1/2  bg-base-100 rounded-xl p-3 sm:p-5 ' onClick={(e) => e.stopPropagation()}>
                    <div className='mb-5'>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-info mb-2 leading-tight text-start  " >
                            Bullet points for<br /> <mark className='bg-secondary text-secondary-content p-1.5 sm:p-2 rounded-lg sm:rounded-xl px-3 sm:px-5'>{role}</mark>,
                        </h1>
                    </div>

                    <div >
                        {isAiworking ? (<div className='flex flex-col justify-center items-center h-[500px] w-full  gap-2'>
                            <div className='flex justify-center items-center gap-2'>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff] mb-2 leading-tight text-center ">Shastra</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" className='mb-3'>
                                    <path fill="#ffffff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                </svg>
                            </div>
                            <h1 className="text-xl font-medium text-info mb-2 leading-tight text-center ">AI Is Generating Your  Bullet Points, Please Wait...</h1>
                            <div className="animate-pulse flex flex-col items-center gap-3">
                                <div className="h-4 w-40 bg-secondary rounded"></div>
                                <div className="h-4 w-56 bg-secondary rounded"></div>
                            </div>
                        </div>) : (
                            <div className="h-[calc(100%-100px)] overflow-y-auto">
                                {bullets.map((bullet, index) => (
                                    <div className='bg-base-300 p-3 rounded-2xl flex mb-3 cursor-pointer hover:border hover:border-secondary transition-all '
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setpoints((prev) => {
                                                if (prev.length == 10) {
                                                    addToast({
                                                        type: "error",
                                                        title: "Error",
                                                        message: "You can only add 10 bullet points",
                                                    });
                                                    return prev;
                                                }
                                                if (prev.includes(bullet.bullet)) {
                                                    addToast({
                                                        type: "error",
                                                        title: "Error",
                                                        message: "You can only add 10 bullet points",
                                                    });
                                                    return prev;
                                                }

                                                return [...prev, bullet.bullet];
                                            });
                                            setBullets((prev) => prev.filter((_, i) => i !== index));
                                        }}
                                    >
                                        <div className="flex gap-5 w-full items-center">
                                            <div className='rounded-full border-2 border-secondary p-1.5 sm:p-2 shrink-0 h-fit flex justify-center items-center bg-base-100'  >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                    <g fill="none">
                                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                                        <path fill="#ffffff" d="M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className='bg-base-100 p-4 rounded-2xl w-full' >{bullet.bullet}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>)}


                    </div>
                </div>
                <div className=' w-full xl:w-1/2 bg-white rounded-xl border-2 p-3 sm:p-5 ' onClick={(e) => { e.stopPropagation() }}>
                    <div className="overflow-y-auto">
                        <div className='mb-5'>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight text-start  " >
                                Points Added : {points?.length}/10 <br />
                                Total Sugesstion : {bullets?.length}
                            </h1>
                        </div>


                        {(!points || points?.length === 0) ? (<div className=' flex items-center justify-center items-center my-10 bg-black/20 px-10 py-5 rounded-3xl w-full sm:w-[80%] mx-auto gap-2 px-4 '>

                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="group" width="3em" height="3em" viewBox="0 0 24 24">
                                    <path fill="#000" fillRule="evenodd" d="M11.5 21h1c3.771 0 5.657 0 6.828-1.172S20.5 16.771 20.5 13V6.998C20.355 7 20.15 7 20 7H4c-.15 0-.355 0-.5-.002V13c0 3.771 0 5.657 1.172 6.828S7.729 21 11.5 21m-2.424-9.883C9 11.301 9 11.534 9 12s0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077h3c.466 0 .699 0 .883-.076a1 1 0 0 0 .54-.541C15 12.699 15 12.466 15 12s0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077h-3c-.466 0-.699 0-.883.076a1 1 0 0 0-.54.541" clipRule="evenodd"></path>
                                    <path className=" absolute z-30  group-hover:translate-y-[-2px]   transition" fill="#000" d="M2 5c0-.943 0-1.414.293-1.707S3.057 3 4 3h16c.943 0 1.414 0 1.707.293S22 4.057 22 5s0 1.414-.293 1.707S20.943 7 20 7H4c-.943 0-1.414 0-1.707-.293S2 5.943 2 5" opacity={0.5}></path>
                                </svg>
                            </span>
                            <h1 className=" text-lg sm:text-xl lg:text-3xl font-bold leading-tight text-black ">No bullet points added yet. Select suggestions from the panel on the right.</h1>

                        </div>

                        ) : (points?.map((point, index) => (
                            <div key={index + point} className='bg-base-300 p-3 rounded-2xl flex mb-3 cursor-pointer hover:border hover:border-secondary transition-all ' >
                                <div className="flex gap-5 w-full items-center">
                                    <div className='rounded-full border-2 border-secondary p-1.5 sm:p-2 shrink-0 h-fit flex justify-center items-center bg-base-100'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setpoints((prev) => prev.filter((_, i) => i !== index));

                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="#ffffff" d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"></path>
                                        </svg>
                                    </div>
                                    <div className='bg-base-100 p-3 sm:p-4 rounded-2xl w-full break-words text-sm sm:text-base'>{point}</div>
                                </div>
                            </div>
                        )))

                        }

                        {(points.length !== 0) && (<button className=' bg-secondary w-full mt-5 rounded-xl text-white py-3 sm:py-4 px-5 font-bold text-sm sm:text-base ' onClick={() => {
                            setMainFeild(prev =>
                                prev.map((exp, i) =>
                                    i === feildIndex
                                        ? {
                                            ...exp,
                                            bullets: [
                                                ...new Set([
                                                    ...(exp.bullets || []),
                                                    ...points
                                                ])
                                            ]
                                        }
                                        : exp
                                )
                            );
                            setAiModalOpen(false);
                            setpoints([]);
                            setRole("");
                            setSelectedEntity("");
                            setSelectedFeildType("");
                            setFeildIndex(null);

                        }}>Finalise Your Points</button>)

                        }

                    </div>

                </div>

            </div>

        </div>
    )
}
export default AiWorking