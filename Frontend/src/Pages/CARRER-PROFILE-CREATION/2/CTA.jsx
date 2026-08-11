import React from 'react'
import { useNavigate } from 'react-router-dom';

const CTA = ({ type, saveHandler, resumeData }) => {
    const Navigate = useNavigate();
    let config = {
        Link: "",
        title: ""
    }
    switch (type) {
        case "header":
            config = {
                Link: "/app/build-resume/intro-exp-page",
                title: "EXPERIENCE"
            }
            break;
        case "experience":
            config = {
                Link: "/app/build-resume/intro-edu-page",
                title: "EDUCATION"
            }
            break;
        case "education":
            config = {
                Link: "/app/build-resume/intro-skill-page",
                title: "SKILLS"
            }
            break;
        case "skill":
            config = {
                Link: "/app/build-resume/intro-summary-page",
                title: "PROFILE SUMMARY"
            }
            break;
        case "summary":
            config = {
                Link: "/app/build-resume/intro-project-page",
                title: "PROJECTS"
            }
            break;
        case "project":
            config = {
                Link: "/app/build-resume/intro-additionals-page",
                title: "ADDITIONALS"
            }
            break;
        case "additionals":
            config = {
                Link: "/app/build-resume/preview-content",
                title: "PREVIEW"
            }
            break;
    }
    return (
        <div className="flex  items-center gap-3 justify-end px-6 md:px-10 py-4 bg-base-200 border-t border-slate-700">


            <div onClick={() => {
                saveHandler();
            }} className={` flex items-center justify-between cursor-pointer text-black  font-bold `}>

                <span className="text-white">
                    <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                        <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                            fill="#fff"
                        ></path>
                    </svg>
                </span>
                <button className="bg-white flex px-4 py-[7.5px] "><p className='font-extrabold'>SAVE</p>  </button>
                <span className="text-white">
                    <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                            fill="#fff"
                        />
                    </svg>
                </span>
            </div>


            <div onClick={() => {
                Navigate(config.Link, {
                    state: { resumeData }
                });
            }} className={` flex items-center justify-between cursor-pointer text-black  font-bold `}>

                <span className="text-white">
                    <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)">
                        <path d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0" data-stroke="true"
                            fill="#fff"
                        ></path>
                    </svg>
                </span>
                <button className="bg-white flex px-4 py-[7.5px] "><p className='font-extrabold'>Next:</p>  {config.title} </button>
                <span className="text-white">
                    <svg height="40" viewBox="0 0 15 40" width="15" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 .5h11A3.5 3.5 0 0 1 14.5 4v20.523a5.5 5.5 0 0 1-1.416 3.684l-8.547 9.477A5.5 5.5 0 0 1 .453 39.5H0"
                            fill="#fff"
                        />
                    </svg>
                </span>
            </div>

        </div>
    )
}

export default CTA