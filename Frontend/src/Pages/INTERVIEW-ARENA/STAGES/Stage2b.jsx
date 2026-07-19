import React from 'react'

const Stage2b = ({ rewrittingData }) => {
    return (
        <div className="w-full bg-white p-6 rounded-3xl text-black mt-4">
            <h2 className="text-3xl font-extrabold mb-6">
                New Refined Experiences
            </h2>

            <div className="space-y-6 bg-black/5 rounded-3xl p-6">

                {/* Experience */}
                <div className="space-y-5">
                    {rewrittingData?.data2?.data?.map((experience, index) => (
                        <div
                            key={index}
                            className="border rounded-2xl bg-white p-5 shadow-sm"
                        >
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {experience.role}
                                    </h3>

                                    <p className="text-gray-700 font-medium">
                                        {experience.company}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {experience.location}
                                    </p>
                                </div>

                                <div className="text-sm text-gray-600 md:text-right">
                                    <p>
                                        {experience.startDate} -{" "}
                                        {experience.currentlyWorking
                                            ? "Present"
                                            : experience.endDate}
                                    </p>

                                    <p>{experience.employmentType}</p>
                                </div>
                            </div>

                            {/* Bullets */}
                            <ul className="list-disc ml-6 mt-4 space-y-2">
                                {experience.bullets?.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>



            </div>
        </div>
    )
}

export default Stage2b