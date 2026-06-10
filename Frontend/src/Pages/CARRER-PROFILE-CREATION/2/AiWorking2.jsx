
// for SKILL - RESUME PAGE
const AiWorking2 = ({
    skills,
    setSkills,
    skill,
    index,
    isAiworking,
    setIsAiworking,
    points,
    setpoints,
    addSkillToCategory,
    SkillCategory,
    setSkillCategory,
    setModalOpen,
    modalOpen,
    setCommonSkills,
    commonSkills,
    setSkillIndex,
    skillIndex,

    addToast
}) => {
    return (
        <div className='h-screen w-screen bg-black/70 fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4' onClick={() => {
            points.forEach((point) => {
                if (skills[index].skills.length >= 20) {
                    addToast({
                        type: "error",
                        title: "Exceeded Limit",
                        message: "Could not add more skills."
                    });
                    return;
                }
                addSkillToCategory(skillIndex, point);

            }); setpoints([]); setSkillCategory(""); setModalOpen(false);
        }}>
            <div className='w-full max-w-7xl h-[95dvh] sm:h-[90vh] bg-base-100 rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-10 flex flex-col gap-4 sm:gap-5 border-2 sm:border-4 border-base-300 overflow-hidden' onClick={(e) => e.stopPropagation()}>
                <div className='text-lg sm:text-xl lg:text-2xl font-bold'>Category <mark className='bg-secondary text-secondary-content p-1.5 sm:p-2 rounded-lg sm:rounded-xl px-3 sm:px-5'>{SkillCategory}</mark> ,</div>
                <div className="flex flex-col lg:flex-row h-full gap-3 overflow-hidden">
                    <div className="w-full lg:w-3/4 flex flex-col gap-3 sm:gap-5 min-h-0">
                        here is the list of common skills in this category :
                        <div className='bg-base-200 w-full rounded-2xl sm:rounded-3xl flex-1 border-accent p-3 sm:p-5 overflow-hidden'>

                            {isAiworking ? (<div className='flex flex-col justify-center items-center h-full w-full  gap-2'>
                                <div className='flex justify-center items-center gap-2'>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff] mb-2 leading-tight text-center ">Shastra</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3" viewBox="0 0 24 24" >
                                        <path fill="#ffffff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                    </svg>
                                </div>
                                <h1 className="text-xl font-medium text-[#ffffff] mb-2 leading-tight text-center ">AI Is Generating Your  Bullet Points, Please Wait...</h1>
                                <div className="animate-pulse flex flex-col items-center gap-3">
                                    <div className="h-4 w-40 bg-[#ffffff]/30 rounded"></div>
                                    <div className="h-4 w-56 bg-[#ffffff]/20 rounded"></div>
                                </div>
                            </div>) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 overflow-y-auto h-full px-2 sm:px-5 py-3">
                                    {commonSkills.map((skill, index) => (
                                        <button
                                            key={skill.id}
                                            onClick={() => {
                                                if (points.includes(skill.skill)) {
                                                    addToast({
                                                        type: "error",
                                                        title: "Oh Snap!",
                                                        message: "You already added this skill"
                                                    });
                                                } if (skill.skill.length > 0 && !points.includes(skill.skill)) { setpoints(prev => [...prev, skill.skill]); }
                                            }}
                                            className={` ${points.includes(skill.skill) ? 'bg-white text-black border-secondary' : 'bg-base-300 text-white'} border border-accent rounded-xl sm:rounded-2xl
px-2 sm:px-3.5
py-2 sm:py-2.5
text-xs sm:text-sm group hover:text-base-100 outline-none  hover:bg-white transition-all duration-200 font-medium flex items-center gap-2 cursor-pointer`}
                                        >
                                            <span className='p-1 bg-base-100 border border-accent rounded-full'>
                                                {points.includes(skill.skill) ? (<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 15 15">
                                                    <path fill="#20ff05" fillRule="evenodd" d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0m7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768z" clipRule="evenodd"></path>
                                                </svg>) : (<svg className='transition duration-700 ease-in-out group-hover:rotate-180' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                                    <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
                                                        <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"></path>
                                                        <path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z"></path>
                                                    </g>
                                                </svg>)}
                                            </span> <span > {skill.skill}</span>
                                        </button>
                                    ))}
                                </div>)}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4 bg-base-100 p-3 sm:p-5 rounded-2xl sm:rounded-3xl border border-accent overflow-y-auto max-h-[250px] lg:max-h-none">
                        <h1 className='text-lg font-bold'>Selected Skills</h1>

                        {points.map((point, index) => (
                            <div
                                key={skill.id}
                                className="bg-base-300 border border-accent rounded-xl sm:rounded-2xl px-3 py-2 text-xs sm:text-sm mt-2 break-words"
                            >
                                {point}
                            </div>
                        ))}
                        <div className="h-full  flex items-center justify-center">
                            <div className="bg-base-200 px-5 py-2 mt-10 mb-10 rounded-3xl flex items-center justify-center">
                                {points.length === 0 && < div className='flex flex-col justify-center items-center h-full w-full  gap-2'>

                                    <h1 className="text-base sm:text-lg lg:text-xl font-medium text-[#ffffff] mb-2 leading-tight text-center ">No Skills Added yet</h1>

                                </div>}
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default AiWorking2