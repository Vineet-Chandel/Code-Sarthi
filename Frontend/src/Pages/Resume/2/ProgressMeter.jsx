import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProgressMeter = ({ index, resumeData }) => {

    const Navigate = useNavigate();

    const routes = [
        "/app/build-resume/header-content",
        "/app/build-resume/experience-content",
        "/app/build-resume/education-content",
        "/app/build-resume/skill-content",
        "/app/build-resume/summary-content",
        "/app/build-resume/project-content",
        "/app/build-resume/additional-details",
        "/app/build-resume/preview-content",
    ];

    return (
        <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-end sm:justify-center px-1">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <button
                        key={i}
                        onClick={() =>
                            Navigate(routes[i], { state: { resumeData } })
                        }
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
                            className="
                                w-5 h-5
                                sm:w-6 sm:h-6
                                md:w-7 md:h-7
                            "
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
                ))}
            </div>
        </div>
    )
}

export default ProgressMeter