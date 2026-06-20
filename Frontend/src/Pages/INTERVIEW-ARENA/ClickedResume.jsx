import React, { useEffect, useState } from 'react'
import Landing from './Landing'
import Toast from '../CARRER-PROFILE-CREATION/2/Toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ResumeAiWorking from './ResumeAiWorking';
import axios from 'axios';
import BASE_URL from '../auth/baseURL';







const ClickedResume = ({ clicked, setClicked }) => {
    const [toasts, setToasts] = useState([]);
    const ToastContainer = ({ toasts, removeToast }) => {
        return (
            <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <Toast
                            key={t.id}
                            {...t}
                            onClose={() => removeToast(t.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        );
    };
    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };
    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };
    const [jd, setJD] = useState({
        ResumeType: "",
        BroadRole: "",
        Company: "",
        SpecificRole: "",
        JobDescription: ""
    });
    const BroadRole = [
        {
            category: "software_engineering_resume",
            label: "Software Engineering Resume",
            roles: [
                "Software Engineer",
                "Full Stack Developer",
                "Frontend Developer",
                "Backend Developer",
                "Mobile App Developer",
                "Data Scientist",
                "Data Engineer",
                "Machine Learning Engineer",
                "DevOps Engineer",
                "SDET",
                "QA Automation Engineer"
            ]
        },

        {
            category: "technical_specialist_resume",
            label: "Technical Specialist Resume",
            roles: [
                "Cybersecurity Analyst",
                "Data Analyst",
                "Cloud Consultant",
                "Network Engineer",
                "Database Administrator",
                "Solutions Architect"
            ]
        },

        {
            category: "management_resume",
            label: "Management & Strategy Resume",
            roles: [
                "Product Manager",
                "Project Manager",
                "Program Manager",
                "Marketing Manager",
                "Operations Manager"
            ]
        },

        {
            category: "customer_success_resume",
            label: "Customer Success & HR Resume",
            roles: [
                "Customer Service Representative",
                "Account Manager",
                "Relationship Manager",
                "Customer Success Manager",
                "HR Executive",
                "Recruiter"
            ]
        },

        {
            category: "business_analytics_resume",
            label: "Business & Analytics Resume",
            roles: [
                "Business Analyst",
                "Financial Analyst",
                "Investment Analyst",
                "Sales Analyst",
                "Operations Analyst"
            ]
        },

        {
            category: "sales_resume",
            label: "Sales & Business Development Resume",
            roles: [
                "Sales Executive",
                "Business Development Manager",
                "Account Executive",
                "Sales Development Representative",
                "Inside Sales Representative"
            ]
        },

        {
            category: "creative_resume",
            label: "Creative & Design Resume",
            roles: [
                "Web Designer",
                "UI UX Designer",
                "Graphic Designer",
                "Content Writer",
                "Digital Marketing Specialist"
            ]
        }
    ];
    const navigate = useNavigate();

    // first page of the modal to select broad role
    const [broadRoleOpen, setBroadRoleopen] = useState(true);

    //second page of the modal to enter the form of JD Job role company 
    const [specificRoleOpen, setSpecificRoleOpen] = useState(false);


    const [resumeWorkingOn, setResumeWorkingOn] = useState(false)

    const formatJDToTextarea = (jd) => {
        const requiredSkills = jd.requiredSkills
            .map(s => `  • ${s.skill} (${s.importance})${s.context ? ` — ${s.context}` : ""}`)
            .join("\n");

        const niceToHave = jd.niceToHaveSkills
            .map(s => `  • ${s}`)
            .join("\n");

        const responsibilities = jd.responsibilities
            .map(r => `  • ${r}`)
            .join("\n");

        const interviewFocus = jd.interviewFocus
            .map(i => `  • ${i.area}: ${i.whatTheyTest}`)
            .join("\n");

        const redFlags = jd.redFlagsForThisRole
            .map(r => `  • ${r}`)
            .join("\n");

        return `
${jd.jobTitle} — ${jd.experienceLevel?.seniorityLabel ?? ""} (${jd.experienceLevel?.yearsOfExperience ?? ""})

ABOUT THE COMPANY
${jd.companySummary}

ROLE SUMMARY
${jd.roleSummary}

RESPONSIBILITIES
${responsibilities}

REQUIRED SKILLS
${requiredSkills}

NICE TO HAVE
${niceToHave}

EDUCATION
${jd.experienceLevel?.educationExpectation ?? ""}

INTERVIEW FOCUS
${interviewFocus}

RED FLAGS FOR THIS ROLE
${redFlags}

COMPENSATION
${jd.compensationSignals?.typicalRange ?? ""}
${jd.compensationSignals?.note ?? ""}
`.trim();
    };


    const [jdLoading, setJdLoading] = useState(false);

    const jobDescriptionCreate = async () => {
        try {
            setJdLoading(true);


            const res = await axios.post(`${BASE_URL}/resume/generate-jd`, {
                specificRole: jd.SpecificRole,
                resumeCategory: jd.ResumeType,
                broadRole: jd.BroadRole,
                company: jd.Company
            }, { withCredentials: true })
            const text = formatJDToTextarea(res?.data?.data)

            jd.JobDescription = text;



        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: err
            }))
        }
        finally {
            setJdLoading(false);
        }
    }

    return (
        <>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="fixed inset-0 bg-black/60 z-[40] flex items-center justify-center">
                <div
                    className="
    relative
    bg-white
    rounded-2xl
    w-[95vw]
    sm:w-[92vw]
    md:w-[88vw]
    lg:w-[80vw]
    xl:w-[70vw]

    h-[95vh]
    sm:h-[92vh]

    shadow-2xl
    overflow-hidden
  "
                >

                    <div className="h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">

                        {broadRoleOpen && < div >
                            <span className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 ">

                                <div
                                    className=" text-black font-bold text-xl sm:text-2xl md:text-3xl">
                                    <h1 className=" text-black font-bold  text-base  sm:text-lg  md:text-xl  lg:text-2xl  break-words  leading-snug  ">Broad Role Division </h1>
                                    <p className='text-[#222222]  font-bold text-sm sm:text-md md:text-lg'>Select one of the role from the below which is the best fit for you according to your profile</p>
                                </div>

                                <button
                                    onClick={() => { setClicked(false); setBroadRoleopen(true); setSpecificRoleOpen(false) }}
                                    className="

p-2
rounded-lg
hover:bg-gray-300
transition

"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black" />
                                    </svg>
                                </button>

                            </span>

                            {BroadRole.map((item, index1) => (
                                <div
                                    key={index1}
                                    className="flex flex-col gap-4 p-6 hover:bg-gray-300 rounded-xl"
                                >
                                    <h1
                                        className="
    text-black
    font-bold
    text-lg
    sm:text-xl
    md:text-2xl
  "
                                    >
                                        Resume Category : <span className='text-[#000] font-bold text-lg sm:text-xl md:text-2xl'>{item.label}</span>
                                    </h1>

                                    <div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-3
">
                                        {item.roles.map((subRole, index2) => (
                                            <button
                                                key={index2}
                                                onClick={() => {
                                                    setJD(prev => ({
                                                        ...prev,
                                                        ResumeType: item.label,
                                                        BroadRole: subRole
                                                    })); setBroadRoleopen(false); setSpecificRoleOpen(true)
                                                }}
                                                className={`
px-3 py-2
sm:px-4 sm:py-2.5
md:px-5 md:py-3

text-xs
sm:text-sm
md:text-base

rounded-xl
transition-all
border

${jd.BroadRole === subRole
                                                        ? "bg-[#fff] text-white border-[#fff]"
                                                        : "bg-black text-white border-black hover:bg-[#fff] hover:text-black"
                                                    }
`}
                                            >
                                                {subRole}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>}
                        {specificRoleOpen && < div >
                            <span className=" flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 ">

                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-black">
                                        Job Details
                                    </h2>

                                    <p className="text-gray-600 mt-2">
                                        Complete your Career Profile first, then provide the job-specific details below to generate a highly personalized, ATS-optimized resume tailored to your target role.
                                    </p>
                                </div>


                                <button
                                    onClick={() => { setClicked(false); setBroadRoleopen(true); setSpecificRoleOpen(false) }}
                                    className="

p-2
rounded-lg
hover:bg-gray-300
transition

"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black" />
                                    </svg>
                                </button>

                            </span>
                            <div className="max-w-4xl mx-auto">


                                <div className="space-y-6">

                                    {/* Job Role */}

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Job Role
                                        </label>

                                        <input
                                            type="text"
                                            value={jd.SpecificRole}
                                            onChange={(e) =>
                                                setJD((prev) => ({
                                                    ...prev,
                                                    SpecificRole: e.target.value,
                                                }))
                                            }
                                            placeholder="Software Engineer"
                                            className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          focus:border-black/20
          focus:ring-2
          focus:ring-[#fff]/20
          text-black
        "
                                        />
                                    </div>


                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Company Name
                                        </label>

                                        <input
                                            type="text"
                                            value={jd.Company}
                                            onChange={(e) =>
                                                setJD(prev => ({
                                                    ...prev,
                                                    Company: e.target.value
                                                }))
                                            }
                                            placeholder="Google"
                                            className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black/20"
                                        />
                                    </div>

                                    {/* Job Description */}

                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Job Description
                                            </label>
                                            <div
                                                onClick={() => {
                                                    if (jd.Company.length === 0 || jd.SpecificRole.length === 0) {
                                                        addToast({
                                                            type: "error",
                                                            title: "Error",
                                                            message: "Please Add the Company and Specific Role Details"
                                                        });

                                                        return;
                                                    }

                                                    jobDescriptionCreate();
                                                }}
                                                className=' p-2  rounded-full hover:bg-gray-300  transition-all cursor-pointer'>

                                                {jdLoading ? <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                                    <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                        <path strokeDasharray={18} d="M12 3c4.97 0 9 4.03 9 9">
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="18;0"></animate>
                                                            <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
                                                        </path>
                                                        <path strokeDasharray={60} d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z" opacity={0.3}>
                                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="60;0"></animate>
                                                        </path>
                                                    </g>
                                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                                    <path fill="#000" d="M20.455 17.543L23.68 19l-3.225 1.456L19 23.68l-1.456-3.223L14.32 19l3.224-1.456L19 14.32zM22.415 6.5L8.294 20.62a3 3 0 0 1-2.122.88H1.5l.001-4.672a3 3 0 0 1 .878-2.121L16.5.585zM6.077 2.92L8.244 4L6.077 5.078L5 7.244L3.922 5.078L1.756 4l2.166-1.08L5 .756zM3.5 19.5h2.672a1 1 0 0 0 .707-.294L8.586 17.5L5.5 14.414L3.794 16.12a1 1 0 0 0-.293.707z"></path>
                                                </svg>}
                                            </div>
                                        </div>
                                        <textarea
                                            rows={12}
                                            value={jd.JobDescription}
                                            onChange={(e) =>
                                                setJD((prev) => ({
                                                    ...prev,
                                                    JobDescription: e.target.value,
                                                }))
                                            }
                                            placeholder="Paste the complete job description here..."
                                            className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          resize-none
          outline-none
          focus:border-black/20
          focus:ring-2
          text-black
          focus:ring-[#fff]/20
        "
                                        />
                                    </div>



                                    {/* Selected Details */}

                                    <div className="rounded-xl bg-black/10 p-4 border border-[#fff]/20">
                                        <div className="flex flex-col gap-2">

                                            <div>
                                                <span className="font-semibold text-black">
                                                    Resume Category:
                                                </span>{" "}
                                                <span className='text-[#000]'>
                                                    {jd.ResumeType}
                                                </span>

                                            </div>

                                            <div>
                                                <span className="font-semibold text-black">
                                                    Selected Role:
                                                </span>{" "}
                                                <span className='text-[#000]'>
                                                    {jd.BroadRole}
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => {
                                                setSpecificRoleOpen(false);
                                                setBroadRoleopen(true);
                                            }}
                                            className="
          px-6
          py-3
          rounded-xl
          border
          border-gray-300
          font-semibold
          text-black
        "
                                        >
                                            Back
                                        </button>

                                        <button

                                            className="
          flex-1
          px-6
          py-3
          rounded-xl
          bg-[#000]
          text-white
          font-semibold
          disabled:opacity-50
        "
                                            onClick={() => {
                                                if (jd.SpecificRole.length == 0 || jd.JobDescription.length === 0 || jd.Company.length === 0) {
                                                    addToast({
                                                        type: "error",
                                                        title: "Error",
                                                        message: "Please Fill All The Details"
                                                    });
                                                    return;
                                                }

                                                setBroadRoleopen(false);

                                                setSpecificRoleOpen(false);
                                                setResumeWorkingOn(true)
                                                // navigate("/app/scheduler",
                                                //     {
                                                //         state: {
                                                //             resume: jd.ResumeType,
                                                //             broadRole: jd.BroadRole,
                                                //             company: jd.Company,
                                                //             specificRole: jd.SpecificRole,
                                                //             jobDescription: jd.JobDescription
                                                //         }
                                                //     }
                                                // );



                                            }}
                                        >
                                            Generate Resume
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>}


                        {resumeWorkingOn && (<ResumeAiWorking />)}

                    </div>
                </div>
            </div>
        </>
    )




}



export default ClickedResume