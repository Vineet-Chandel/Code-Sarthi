import React from 'react'

const Stage2c = ({ rewrittingData }) => {
    return (
        <div className="w-full bg-white rounded-3xl p-6 text-black mt-4 shadow-sm">
            <h2 className="text-3xl font-extrabold mb-6">
                Refined Projects
            </h2>

            <div className="space-y-6">
                {rewrittingData?.data3?.data?.map((project, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
                    >
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                                <h3 className="text-2xl font-bold capitalize">
                                    {project.name}
                                </h3>

                                <p className="text-gray-600 font-medium mt-1">
                                    {project.stack}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                                    >
                                        GitHub
                                    </a>
                                )}

                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mt-5 text-gray-700 leading-7">
                            {project.description}
                        </p>

                        {/* Bullets */}
                        <ul className="list-disc ml-6 mt-5 space-y-2">
                            {project.bullets?.map((bullet, bulletIndex) => (
                                <li key={bulletIndex} className="text-gray-700 leading-7">
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stage2c