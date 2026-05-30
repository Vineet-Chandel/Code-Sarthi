import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProgressMeter = ({ index, resumeData }) => {

    const Navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const steps = [
        { route: "/app/build-resume/header-content", label: "Personal Info" },
        { route: "/app/build-resume/experience-content", label: "Experience" },
        { route: "/app/build-resume/education-content", label: "Education" },
        { route: "/app/build-resume/skill-content", label: "Skills" },
        { route: "/app/build-resume/summary-content", label: "Summary" },
        { route: "/app/build-resume/project-content", label: "Projects" },
        { route: "/app/build-resume/additional-details", label: "Additional" },
        { route: "/app/build-resume/preview-content", label: "Preview" },
    ];

    return (
        <div className="w-full  ">
            <div className="flex items-center justify-center px-1">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="relative flex flex-col items-center"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Tooltip */}
                        <div
                            className={`
                                absolute top-full mt-5 z-50
                                px-2 py-1
                                text-sm font-medium whitespace-nowrap
                                rounded-md
                                pointer-events-none
                                transition-all duration-200
                                ${hoveredIndex === i
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-1"
                                }
                                ${i <= index
                                    ? "bg-base-100 text-secondary-content"
                                    : "bg-base-200 text-info"
                                }
                                border border-info
                                shadow-sm
                            `}
                        >
                            {step.label}
                            {/* Arrow pointing up */}
                            <span
                                className={`
                                    absolute -top-1 left-1/2 -translate-x-1/2
                                    w-2 h-2 rotate-45
                                    border-l border-t border-info
                                    ${i <= index ? "bg-base-100" : "bg-base-200"}
                                `}
                            />
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => Navigate(step.route, { state: { resumeData } })}
                            className={`
                                flex items-center justify-center
                                rounded-full
                                transition-all duration-300
                                cursor-pointer
                                hover:scale-110
                                active:scale-95

                                w-8 h-8
                                sm:w-10 sm:h-10
                                md:w-11 md:h-11

                                ${i <= index
                                    ? "text-secondary-content bg-accent/20"
                                    : "text-gray-500 bg-base-200"
                                }
                            `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    fill="currentColor"
                                    d="M7.604 4.604C9.34 2.868 10.208 2 11.286 2c1.079 0 1.947.868 3.682 2.604l4.42 4.419c1.735 1.735 2.603 2.603 2.603 3.682s-.868 1.946-2.604 3.682s-2.604 2.604-3.682 2.604c-1.079 0-1.947-.868-3.682-2.604l-4.42-4.419C5.869 10.233 5 9.365 5 8.286s.868-1.946 2.604-3.682"
                                />
                                <path
                                    fill="currentColor"
                                    opacity={0.5}
                                    d="m8.345 12.71l-5.52 5.518c-.342.343-.513.514-.616.692a1.56 1.56 0 0 0 0 1.562c.103.178.274.35.617.692s.513.514.692.617a1.56 1.56 0 0 0 1.562 0c.178-.103.35-.275.692-.617l5.518-5.519zm10.31-4.42l.373-.372c.342-.343.514-.514.617-.692a1.56 1.56 0 0 0 0-1.562c-.103-.179-.275-.35-.617-.692c-.342-.343-.514-.514-.692-.617a1.56 1.56 0 0 0-1.562 0c-.178.103-.35.274-.692.617l-.373.373z"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProgressMeter