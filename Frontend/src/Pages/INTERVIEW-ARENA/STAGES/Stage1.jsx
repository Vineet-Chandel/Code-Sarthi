import React from 'react'

const Stage1 = ({ strategyData }) => {
    return (
        <div className="mt-7 px-2 grid grid-cols-1  gap-2">



            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                <span className=" text-black  text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 512 512">
                            <path fill="#000" fillRule="evenodd" d="m384 85.334l85.333 85.333v256H42.666l-.001-232.67c10.098 15.352 24.215 33.107 42.667 48.165L85.333 384h341.333V181.334L373.333 128l-39.736.002c-5.44-10.653-14.584-26.49-27.734-42.668zM384 320v21.334H128V320zm0-64v21.334H256v-20.371q.811-.477 1.615-.963zM181.333 42.667C278.4 42.667 320 149.334 320 149.334S278.4 256 181.333 256S42.666 149.334 42.666 149.334s41.6-106.667 138.667-106.667m0 26.667c-61.29 0-97.067 57.066-108.299 80c11.232 22.933 47.008 80 108.3 80c61.29 0 97.066-57.067 108.298-80c-11.232-22.934-47.008-80-108.299-80m0 33.333c26.804 0 48.533 20.893 48.533 46.667c0 25.773-21.729 46.666-48.533 46.666S132.8 175.107 132.8 149.334c0-25.774 21.729-46.667 48.533-46.667m0 26.667c-11.487 0-20.8 8.954-20.8 20s9.313 20 20.8 20s20.8-8.955 20.8-20s-9.312-20-20.8-20"></path>
                        </svg>

                        Positioning Statement :</p>

                    {strategyData?.data?.data?.positioningStatement}

                </span>



            </div>

            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                <span className=" text-black  text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 14 14">
                            <path fill="currentColor" fillRule="evenodd" d="M5.763 2.263A1.75 1.75 0 0 1 8.75 3.5h-3.5c0-.464.184-.91.513-1.237M3.75 3.5a3.25 3.25 0 0 1 6.5 0h1.25A2.5 2.5 0 0 1 14 6v5.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 0 11.5V6a2.5 2.5 0 0 1 2.5-2.5zm2.915 3.067A.875.875 0 1 1 7 8.25a.625.625 0 0 0-.625.625v1a.625.625 0 1 0 1.25 0v-.469a2.125 2.125 0 1 0-2.75-2.031a.625.625 0 1 0 1.25 0a.875.875 0 0 1 .54-.808m.337 6.308a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clipRule="evenodd"></path>
                        </svg>

                        Core Narrative :</p>

                    {strategyData?.data?.data?.coreNarrative}



                </span>
            </div>
            <div className="w-full rounded-3xl bg-green-100 text-black p-4">
                <div className="flex items-center gap-2 text-xl font-extrabold mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48">
                        <defs>
                            <mask id="SVGdMjhMbPE">
                                <g fill="none">
                                    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M38.142 38.142c7.81-7.81 7.81-20.474 0-28.284s-20.474-7.81-28.284 0s-7.81 20.474 0 28.284m22.627-5.657c4.687-4.686 4.687-12.284 0-16.97c-4.686-4.687-12.284-4.687-16.97 0c-4.687 4.686-4.687 12.284 0 16.97"></path>
                                    <path fill="#555" d="M28 24a4 4 0 1 1-8 0a4 4 0 0 1 8 0"></path>
                                    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M24 28a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0 0v16m0 0h4m-4 0h-4"></path>
                                </g>
                            </mask>
                        </defs>
                        <path fill="#000" d="M0 0h48v48H0z" mask="url(#SVGdMjhMbPE)"></path>
                    </svg>

                    <span>Strengths To Amplify</span>
                </div>

                <div className="space-y-2">
                    {strategyData?.data?.data?.strengthsToAmplify.map((item, idx) => (
                        <p key={idx} className="text-sm md:text-base break-words">
                            ● {item}
                        </p>
                    ))}
                </div>
            </div>

            <div className="w-full grid grid-cols-2  gap-2 rounded-3xl">

                <div className=" text-black bg-green-100 p-3 rounded-3xl text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                            <path fill="#000" d="M4.472 4.75c-.597 0-1.293.166-1.862.519c-.58.358-1.11.974-1.11 1.856v9.75c0 .882.53 1.497 1.11 1.856c.57.353 1.265.519 1.862.519H14.77a2.75 2.75 0 0 0 1.92-.781l5.35-5.216a1.75 1.75 0 0 0 0-2.506l-5.35-5.216a2.75 2.75 0 0 0-1.92-.781z"></path>
                        </svg>

                        Must Include Keywords :</p>
                    <div className="flex flex-wrap gap-2">
                        {strategyData?.data?.data?.mustIncludeKeywords.map((item, idx) => (
                            <span
                                key={idx}
                                className="rounded-full bg-black/20 px-3 py-2 text-sm break-words"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                <div className=" text-black bg-green-100 p-3 rounded-3xl text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                            <path fill="#000" d="M4.472 4.75c-.597 0-1.293.166-1.862.519c-.58.358-1.11.974-1.11 1.856v9.75c0 .882.53 1.497 1.11 1.856c.57.353 1.265.519 1.862.519H14.77a2.75 2.75 0 0 0 1.92-.781l5.35-5.216a1.75 1.75 0 0 0 0-2.506l-5.35-5.216a2.75 2.75 0 0 0-1.92-.781z"></path>
                        </svg>

                        Nice To Include Keywords :</p>
                    <div className="flex flex-wrap gap-2">
                        {strategyData?.data?.data?.niceToIncludeKeywords.map((item, idx) => (
                            <span
                                key={idx}
                                className="rounded-full bg-black/20 px-3 py-2 text-sm break-words"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-2  gap-2 rounded-3xl">

                <div className=" text-black bg-red-100 p-3 rounded-3xl text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                            <path fill="#000" d="M4.472 4.75c-.597 0-1.293.166-1.862.519c-.58.358-1.11.974-1.11 1.856v9.75c0 .882.53 1.497 1.11 1.856c.57.353 1.265.519 1.862.519H14.77a2.75 2.75 0 0 0 1.92-.781l5.35-5.216a1.75 1.75 0 0 0 0-2.506l-5.35-5.216a2.75 2.75 0 0 0-1.92-.781z"></path>
                        </svg>
                        Keywords To Avoid :</p>
                    <div className="flex flex-wrap gap-2">
                        {strategyData?.data?.data?.keywordsToAvoid.map((item, idx) => (
                            <span
                                key={idx}
                                className="rounded-full bg-black/20 px-3 py-2 text-sm break-words"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                <div className=" text-black bg-red-100 p-3 rounded-3xl text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                            <path fill="#000" d="M5 19V8h2v9h9v2zm5-5V3h2v9h9v2z"></path>
                        </svg>
                        Weaknesses To Downplay :</p>

                    <div className="space-y-2">
                        {strategyData?.data?.data?.weaknessesToDownplay.map((item, idx) => (
                            <p key={idx} className="text-sm md:text-base break-words">
                                ● {item}
                            </p>
                        ))}
                    </div>

                </div>
            </div>
            <div className="w-full grid grid-cols-2  gap-2 rounded-3xl">

                <div className=" text-black bg-white p-3 rounded-3xl text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                            <g fill="none">
                                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                <path fill="#000" d="M19.07 12.01a1 1 0 0 1 .85 1.132A8.004 8.004 0 0 1 13 19.938V21a1 1 0 1 1-2 0v-1.062a8.005 8.005 0 0 1-6.919-6.796a1 1 0 0 1 1.98-.284a6.001 6.001 0 0 0 11.878 0a1 1 0 0 1 1.132-.848ZM12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5"></path>
                            </g>
                        </svg>

                        Tone Guidance :</p>
                    <div className="flex flex-col gap-3">
                        <p><b>Overall</b>: {strategyData?.data?.data?.toneGuidance?.overall}</p>
                        <p><b>Verb Style</b>: {strategyData?.data?.data?.toneGuidance?.verbStyle}</p>
                        <p><b>Formality</b>: {strategyData?.data?.data?.toneGuidance?.formality}</p>

                    </div>
                </div>
                <div className=" text-black bg-white p-3 rounded-3xl text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 32 32">
                            <path fill="#000" d="M16 3.667C9.19 3.667 3.667 9.187 3.667 16S9.19 28.333 16 28.333c6.812 0 12.333-5.52 12.333-12.333S22.813 3.667 16 3.667m0 3c1.85 0 3.572.548 5.024 1.48L8.147 21.024A9.26 9.26 0 0 1 6.667 16c0-5.146 4.187-9.333 9.333-9.333m0 18.666a9.27 9.27 0 0 1-5.024-1.48l12.876-12.877A9.26 9.26 0 0 1 25.332 16c0 5.146-4.186 9.333-9.332 9.333"></path>
                        </svg>
                        Red Flags To Address :</p>

                    <div className="space-y-2">
                        {strategyData?.data?.data?.redFlagsToAddress.map((item, idx) => (
                            <p key={idx} className="text-sm md:text-base break-words">
                                ● {item}
                            </p>
                        ))}
                    </div>

                </div>
            </div>
            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                <span className=" text-black  text-md">
                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"></path>
                        </svg>

                        Section Wise Strategy : {strategyData?.data?.data?.versionLabel}</p>

                    <div className="underline underline-offset-4 flex items-center gap-2 mt-5 ml-5 text-lg font-bold">

                        #1  PROFILE SUMMARY</div>
                    <div className="grid grid-cols-2 gap-2">


                        <div className="rounded-2xl  p-5">
                            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                                    <path fill="#000" d="M8.407 14.93a.5.5 0 0 1-.814 0L5.5 12H4a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1.5z"></path>
                                </svg> Open With
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed">
                                {strategyData?.data?.data?.summaryStrategy?.openWith}
                            </p>
                        </div>


                        <div className="rounded-2xl bg-green-100 p-5">
                            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                    <path fill="#000" d="M4.472 4.75c-.597 0-1.293.166-1.862.519c-.58.358-1.11.974-1.11 1.856v9.75c0 .882.53 1.497 1.11 1.856c.57.353 1.265.519 1.862.519H14.77a2.75 2.75 0 0 0 1.92-.781l5.35-5.216a1.75 1.75 0 0 0 0-2.506l-5.35-5.216a2.75 2.75 0 0 0-1.92-.781z"></path>
                                </svg> Keywords To Frontload
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {strategyData?.data?.data?.summaryStrategy?.keywordsToFrontload.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-full bg-black/20 px-3 py-2 text-sm font-medium text-black"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>


                        <div className="rounded-2xl  p-5">
                            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                        <path fill="#000" d="M19.07 12.01a1 1 0 0 1 .85 1.132A8.004 8.004 0 0 1 13 19.938V21a1 1 0 1 1-2 0v-1.062a8.005 8.005 0 0 1-6.919-6.796a1 1 0 0 1 1.98-.284a6.001 6.001 0 0 0 11.878 0a1 1 0 0 1 1.132-.848ZM12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5"></path>
                                    </g>
                                </svg> Tone Instruction
                            </h3>

                            <p className="text-sm md:text-base leading-relaxed">
                                {strategyData?.data?.data?.summaryStrategy?.toneInstruction}
                            </p>
                        </div>


                        <div className="rounded-2xl bg-red-100 p-5">
                            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 512 512">
                                    <path fill="#000" d="M323.9 45.2C269.6 171.8 229.2 213.1 114 258.1l-4.4-11.8l-8.4-22.5l-76.26 82.1l111.56 11.8l-12.1-32.1c119.5-46.5 171-99 226.6-228.84zm51.7 149l12 32.1c-119.5 46.6-171 99.1-226.6 228.8l27.1 11.7c54.3-126.7 94.7-167.9 209.9-212.9l4.4 11.8l8.4 22.4l76.3-82.1z"></path>
                                </svg> Avoid
                            </h3>

                            <div className="space-y-2">
                                {strategyData?.data?.data?.summaryStrategy?.avoid.map((item, idx) => (
                                    <p
                                        key={idx}
                                        className="flex items-start gap-2 text-sm md:text-base"
                                    >
                                        <span className="font-bold text-red-600">•</span>
                                        <span>{item}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="bg-gray-500 w-full h-[1px] mt-4"></div>
                    <div className="underline underline-offset-4 flex items-center gap-2 mt-5 ml-5 text-lg font-bold">

                        #2 EXPERIENCE

                    </div>

                    <div className="w-full">


                        <div className="w-full rounded-2xl  p-5">
                            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                                        <path d="M24 9h18M24 19h18M6 29h36M6 39h36"></path>
                                        <circle cx={12} cy={14} r={5} fill="currentColor"></circle>
                                    </g>
                                </svg> General Instruction
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed">
                                {strategyData?.data?.data?.experienceStrategy?.general}
                            </p>
                        </div>

                        <h3 className=" mb-3 ml-3 flex items-center gap-2 text-lg font-bold">
                            Per Role Strategy
                        </h3>






                        <div className="w-full grid grid-cols-2 gap-4">
                            {strategyData?.data?.data?.experienceStrategy?.perRole.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="w-full rounded-2xl bg-green-100 p-5 shadow-sm"
                                >
                                    <h3 className="mb-4 text-lg font-bold text-green-900">
                                        {item?.company}
                                    </h3>

                                    <div className="space-y-3 text-sm md:text-base">

                                        <div >
                                            <span className="font-semibold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 512 512">
                                                <path fill="#000" fillRule="evenodd" d="m213.33 28.445l72.568 96.757l106.085-26.521l-25.985 103.942c-20.742-2.159-42.612 4.795-58.788 22.769c-4.567 5.075-12.525 5.075-17.092 0c-38.594-42.882-109.598-23.038-120.366 33.64l-11.584 60.969H90.007l-55.33-221.32l106.085 26.521zm193.288 234.569c-7.475-39.342-56.761-53.117-83.551-23.351c-13.042 14.491-35.764 14.491-48.806 0c-26.789-29.766-76.076-15.991-83.551 23.351l-18.934 99.654h253.777zm22.988 120.987H167.723l-4.054 21.333H128v42.667h341.333v-42.667h-35.674z" clipRule="evenodd"></path>
                                            </svg> Role:</span>
                                            <p className="mt-1 text-gray-700">{item?.role}</p>
                                        </div>

                                        <div>
                                            <span className="font-semibold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 32 32">
                                                <path fill="#000" d="M22 26.59L19.41 24L18 25.41l4 4l8-8L28.59 20z"></path>
                                                <circle cx={16} cy={16} r={2} fill="#000"></circle>
                                                <path fill="#000" d="M16 22a6 6 0 1 1 6-6a6.007 6.007 0 0 1-6 6m0-10a4 4 0 1 0 4 4a4.005 4.005 0 0 0-4-4"></path>
                                                <path fill="#000" d="M28 16a12 12 0 1 0-12 12v-2a10 10 0 1 1 10-10Z"></path>
                                            </svg> Relevance:</span>
                                            <p className="mt-1 text-gray-700">
                                                {item?.relevanceToTarget}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="font-semibold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48">
                                                <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                                                    <path d="M24 9h18M24 19h18M6 29h36M6 39h36"></path>
                                                    <circle cx={12} cy={14} r={5} fill="#000"></circle>
                                                </g>
                                            </svg> Instruction:</span>
                                            <p className="mt-1 text-gray-700 leading-relaxed">
                                                {item?.instruction}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>






                    </div>

                    <div className="bg-gray-500 w-full h-[1px] mt-4"></div>
                    <div className="underline underline-offset-4 flex items-center gap-2 mt-5 ml-5 text-lg font-bold">

                        #3 PROJECT

                    </div>


                    <div className="w-full">


                        <div className="w-full rounded-2xl  p-5">
                            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                                        <path d="M24 9h18M24 19h18M6 29h36M6 39h36"></path>
                                        <circle cx={12} cy={14} r={5} fill="currentColor"></circle>
                                    </g>
                                </svg> General Instruction
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed">
                                {strategyData?.data?.data?.experienceStrategy?.general}
                            </p>
                        </div>

                        <h3 className=" mb-3 ml-3 flex items-center gap-2 text-lg font-bold">
                            Per Project Strategy
                        </h3>






                        <div className="w-full grid grid-cols-2 gap-4">
                            {strategyData?.data?.data?.projectStrategy?.perProject.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="w-full rounded-2xl bg-green-100 p-5 shadow-sm"
                                >
                                    <h3 className="mb-4 text-lg font-bold text-green-900">
                                        {item?.name}
                                    </h3>

                                    <div className="space-y-3 text-sm md:text-base">



                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 32 32">
                                                <path fill="#000" d="M22 26.59L19.41 24L18 25.41l4 4l8-8L28.59 20z"></path>
                                                <circle cx={16} cy={16} r={2} fill="#000"></circle>
                                                <path fill="#000" d="M16 22a6 6 0 1 1 6-6a6.007 6.007 0 0 1-6 6m0-10a4 4 0 1 0 4 4a4.005 4.005 0 0 0-4-4"></path>
                                                <path fill="#000" d="M28 16a12 12 0 1 0-12 12v-2a10 10 0 1 1 10-10Z"></path>
                                            </svg> Relevance:</span>
                                            <p className="mt-1 text-gray-700 flex items-center">
                                                {item?.relevanceToTarget} {item?.relevanceToTarget === "high" ? (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80">
                                                    <path d="M0 0h80v80H0z" fill="none" />
                                                    <g fill="none">
                                                        <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z" />
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177" />
                                                    </g>
                                                </svg>
                                                ) : (

                                                    <svg className="rotate-[180deg]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 80 80">
                                                        <path d="M0 0h80v80H0z" fill="none" />
                                                        <g fill="none">
                                                            <path fill="currentColor" d="M36.964 17.7a3 3 0 1 1 6 .004zm3 .078l3 .002zm0 .889l-3-.003zm0 .888l3 .002zm-.001.89l3 .001zm-.001.888l-3-.002zm0 .889h-3v-.002zm3 20.074a3 3 0 0 1-6 0zm-6 .037a3 3 0 0 1 6 0zm6 21.667a3 3 0 0 1-6 0zm.002-46.296v.075l-6-.003V17.7zm0 .075v.89l-6-.005v-.888zm0 .89v.888l-6-.004v-.889zm0 .888l-.001.89l-6-.005v-.889zm-.001.89l-.001.888l-6-.004v-.889zm-.001.888v.889l-6-.004v-.889zm0 .887v20.074h-6V22.222zm0 20.111V64h-6V42.333z" />
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" d="m15.11 39.11l21.177-21.176a5.25 5.25 0 0 1 7.425 0l21.176 21.177" />
                                                        </g>
                                                    </svg>
                                                )}
                                            </p>

                                        </div>

                                        <div>
                                            <span className="font-semibold flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48">
                                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                                                    <path d="M24 9h18M24 19h18M6 29h36M6 39h36"></path>
                                                    <circle cx={12} cy={14} r={5} fill="currentColor"></circle>
                                                </g>
                                            </svg> Instruction:</span>
                                            <p className="mt-1 text-gray-700 leading-relaxed">
                                                {item?.instruction}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>






                    </div>
                    <div className="bg-gray-500 w-full h-[1px] mt-4"></div>
                    <div className="underline underline-offset-4 flex items-center gap-2 mt-5 ml-5 text-lg font-bold">

                        #4 SKILLS

                    </div>
                    <div className="w-full grid grid-cols-2 mt-2 gap-2 rounded-3xl">

                        <div className=" text-black bg-green-100 p-3 rounded-3xl text-md">
                            <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 32 32">
                                    <path fill="#000" d="M14 25h14v2H14zm-6.83 1l-2.58 2.58L6 30l4-4l-4-4l-1.42 1.41zM14 15h14v2H14zm-6.83 1l-2.58 2.58L6 20l4-4l-4-4l-1.42 1.41zM14 5h14v2H14zM7.17 6L4.59 8.58L6 10l4-4l-4-4l-1.42 1.41z"></path>
                                </svg>

                                Categories To Use :</p>
                            <div className="flex flex-wrap gap-2">
                                {strategyData?.data?.data?.skillsStrategy?.categoriesToUse.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-full bg-black/20 px-3 py-2 text-sm break-words"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className=" text-black bg-green-100 p-3 rounded-3xl text-md">
                            <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 32 32">
                                    <path d="m16 2l12.12 7v14L16 30L3.88 23V9z"></path>
                                    <path stroke="#fff" strokeWidth={2.71} d="m16 6.97l7.82 4.51v9.04L16 25.03l-7.82-4.51v-9.04z"></path>
                                </svg>

                                Skills To Keep :</p>
                            <div className="flex flex-wrap gap-2">
                                {strategyData?.data?.data?.skillsStrategy?.skillsToKeep.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-full bg-black/20 px-3 py-2 text-sm break-words"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 mt-2 gap-2 rounded-3xl">

                        <div className=" text-black bg-red-100 p-3 rounded-3xl text-md">
                            <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 32 32">
                                    <path d="m16 2l12.12 7v14L16 30L3.88 23V9z"></path>
                                    <path stroke="#fff" strokeWidth={2.71} d="m16 6.97l7.82 4.51v9.04L16 25.03l-7.82-4.51v-9.04z"></path>
                                </svg>

                                Skills To Remove :</p>
                            <div className="flex flex-wrap gap-2">
                                {strategyData?.data?.data?.skillsStrategy?.skillsToRemove.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-full bg-black/20 px-3 py-2 text-sm break-words"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className=" text-black bg-purple-100 p-3 rounded-3xl text-md">
                            <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 32 32">
                                    <path d="m16 2l12.12 7v14L16 30L3.88 23V9z"></path>
                                    <path stroke="#fff" strokeWidth={2.71} d="m16 6.97l7.82 4.51v9.04L16 25.03l-7.82-4.51v-9.04z"></path>
                                </svg>

                                Skills To Surface :</p>

                            <div className="space-y-2">
                                {strategyData?.data?.data?.skillsStrategy?.skillsToSurface.map((item, idx) => (
                                    <p key={idx} className="text-sm md:text-base break-words">
                                        ● {item}
                                    </p>
                                ))}
                            </div>

                        </div>
                    </div>
                </span>



            </div>

        </div>
    )
}

export default Stage1