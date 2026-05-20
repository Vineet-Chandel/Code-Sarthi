import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProgressMeter = ({ index, resumeData }) => {

    const Navigate = useNavigate();
    return (
        <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                    key={i}
                    className={` rounded-full transition-all duration-300 ${i <= index
                        ? "text-secondary"
                        : "text-neutral"
                        } cursor-pointer`}
                    onClick={() => {
                        switch (i) {
                            case 0:
                                Navigate("/app/build-resume/header-content", { state: { resumeData } });
                                break;
                            case 1:
                                Navigate("/app/build-resume/experience-content", { state: { resumeData } });
                                break;
                            case 2:
                                Navigate("/app/build-resume/education-content", { state: { resumeData } });
                                break;
                            case 3:
                                Navigate("/app/build-resume/skill-content", { state: { resumeData } });
                                break;
                            case 4:
                                Navigate("/app/build-resume/summary-content", { state: { resumeData } });
                                break;
                            case 5:
                                Navigate("/app/build-resume/project-content");
                                break;
                            case 6:
                                Navigate("/app/build-resume/additional-details");
                                break;
                            case 7:
                                Navigate("/app/build-resume/preview");
                                break;
                            default:
                                break;
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
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
                </div>
            ))}
        </div>
    )
}

export default ProgressMeter