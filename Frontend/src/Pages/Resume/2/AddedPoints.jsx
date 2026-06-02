import React from 'react'

const AddedPoints = ({ feild, index, activeInputIndex, setActiveInputIndex, editingBulletIndex, setEditingBulletIndex, bulletInput, setBulletInput, enhancer, setExperiences, addToast, enhancerWorking, setEnhancerWorking }) => {
    return (
        <div className='bg-white w-[100%] mt-10 mx-auto rounded-xl border-2 p-1 min-[650px]:p-5' onClick={(e) => { e.stopPropagation() }}>
            <div className="overflow-y-auto h-fit">
                <div className='mb-5 flex items-center justify-between'>
                    <h1 className="text-2xl font-extrabold mx-auto text-slate-900  leading-tight text-start  " >
                        Points Added : {feild[index].bullets?.length}/10 <br />
                    </h1>

                    <div className='bg-primary p-3 rounded-full text-base-100 flex justify-center items-center cursor-pointer' onClick={() => {

                        if (feild[index].bullets?.length >= 10) {
                            addToast({
                                type: "error",
                                title: "Error",
                                message: "You can only add 10 bullet points."
                            });
                            return;
                        }

                        setActiveInputIndex(prev => prev === index ? null : index);
                    }} ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                            <path fill="currentColor" d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z"></path>
                        </svg></div>
                </div>

                {activeInputIndex === index && (
                    <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300 ml-5 mb-10 flex items-end gap-3 w-[95%]">
                        <div className='flex flex-col flex-1'>
                            <label className="block text-[15px] font-bold uppercase tracking-wider text-gray-700 mb-1 ml-1">
                                {editingBulletIndex !== null ? "Edit Bullet Point" : "Add Bullet Point"}
                            </label>

                            <input
                                type="text"
                                autoFocus
                                value={bulletInput}
                                placeholder="e.g. Led a team of 5 developers..."
                                onChange={(e) => setBulletInput(e.target.value)}
                                // Handle Enter key
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();

                                    }
                                }}
                                className="w-full rounded-xl border border-slate-900 bg-white px-4 py-2.5 text-sm 
                       text-gray-700 shadow-sm transition-all placeholder:text-gray-400
                       focus:border-secondary focus:ring-2 focus:ring-secondary focus:outline-none"
                            />
                        </div>

                        <button
                            type="button"
                            className="bg-secondary border border-secondary hover:text-white text-info hover:text-secondary 
                   px-5 py-2.5 rounded-xl flex justify-center items-center gap-2 
                   hover:scale-105 transition-all duration-300 ease-in-out group"
                            onClick={() => {
                                if (!bulletInput.trim()) return;

                                setExperiences(prev =>
                                    prev.map((exp, i) => {
                                        if (i !== index) return exp;

                                        const updatedBullets = [...exp.bullets];

                                        if (editingBulletIndex !== null) {
                                            updatedBullets[editingBulletIndex] = bulletInput;
                                        } else {
                                            updatedBullets.push(bulletInput);
                                        }

                                        return {
                                            ...exp,
                                            bullets: updatedBullets
                                        };
                                    })
                                );

                                setBulletInput("");
                                setEditingBulletIndex(null);
                                setActiveInputIndex(null);
                            }}
                        >
                            {editingBulletIndex !== null ? "UPDATE" : "ADD"}
                        </button>
                    </div>
                )}
                {(activeInputIndex !== index && feild[index].bullets?.length === 0) ? (<div className='flex flex-col justify-center items-center  w-[80%] mx-auto gap-2'>

                    <h1 className="text-xl font-medium text-slate-900 mb-2 leading-tight text-center ">No bullet points yet. Don’t waste time thinking — let AI craft powerful, recruiter-ready points for you in seconds.</h1>

                </div>) : feild[index].bullets?.map((point, bulletIndex) => (
                    <div key={bulletIndex + point} className='bg-base-300 p-3 rounded-2xl flex mb-3 cursor-pointer hover:border hover:border-secondary transition-all ' >
                        <div className="flex gap-3 sm:gap-5 w-full items-center">
                            <div className='flex-col min-[650px]:flex-row  gap-2'>

                                <div className='rounded-full border-2 border-secondary p-1.5 sm:p-2 shrink-0 h-fit flex justify-center items-center bg-base-100'
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setEditingBulletIndex(null);
                                        setBulletInput("");
                                        setActiveInputIndex(null);

                                        setExperiences(prev =>
                                            prev.map((exp, i) =>
                                                i === index
                                                    ? {
                                                        ...exp,
                                                        bullets: exp.bullets.filter((_, j) => j !== bulletIndex)
                                                    }
                                                    : exp
                                            )
                                        );
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="#ffffff" d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"></path>
                                    </svg>
                                </div>
                                <div className='rounded-full border-2 border-secondary p-1.5 sm:p-2 shrink-0 h-fit flex justify-center items-center bg-base-100'
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setActiveInputIndex(index);
                                        setEditingBulletIndex(bulletIndex);
                                        setBulletInput(point);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                                        <path fill="currentColor" d="M32.206 6.025a6.907 6.907 0 1 1 9.768 9.767L39.77 18L30 8.23zM28.233 10L8.038 30.197a6 6 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.52l9.487-2.424a6 6 0 0 0 2.76-1.572l20.195-20.198z"></path>
                                    </svg>
                                </div>
                                <div className='rounded-full border-2 border-secondary p-1.5 sm:p-2 shrink-0 h-fit flex justify-center items-center bg-base-100'
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        const improvedBullet = await enhancer(
                                            point,
                                            index,
                                            bulletIndex
                                        );

                                        if (!improvedBullet) {
                                            addToast({
                                                type: "error",
                                                title: "Enhancement Failed",
                                                message: "Could not improve bullet point."
                                            });
                                            return;
                                        }

                                        setExperiences(prev =>
                                            prev.map((exp, i) =>
                                                i === index
                                                    ? {
                                                        ...exp,
                                                        bullets: exp.bullets.map((b, j) =>
                                                            j === bulletIndex ? improvedBullet : b
                                                        )
                                                    }
                                                    : exp
                                            )
                                        );

                                        addToast({
                                            type: "success",
                                            title: "Bullet Enhanced",
                                            message: "AI improved your resume bullet."
                                        });
                                    }}
                                >
                                    {enhancerWorking === `${index}-${bulletIndex}` && < span className="loading loading-spinner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="#ee5252" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                                                <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
                                            </path>
                                        </svg></span>}
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="#ffffff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                    </svg>
                                </div>

                            </div>
                            <div className='bg-base-100 p-4 rounded-2xl w-full'>{point}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AddedPoints