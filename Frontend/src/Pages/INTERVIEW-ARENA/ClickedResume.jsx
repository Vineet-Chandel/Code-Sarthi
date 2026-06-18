import React, { useState } from 'react'
import Landing from './Landing'


const ClickedResume = ({ clicked, setClicked }) => {

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
    const [broadRoleOpen, setBroadRoleopen] = useState(true);
    const [specificRoleOpen, setSpecificRoleOpen] = useState(false);
    return (
        <>
            <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center">
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
                                        Resume Category : <span className='text-[#7268f1] font-bold text-lg sm:text-xl md:text-2xl'>{item.label}</span>
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
                                                        ? "bg-[#A7A0F8] text-white border-[#A7A0F8]"
                                                        : "bg-black text-white border-black hover:bg-[#A7A0F8]"
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
          focus:border-[#A7A0F8]
          focus:ring-2
          focus:ring-[#A7A0F8]/20
          text-black
        "
                                        />
                                    </div>

                                    {/* Job Description */}

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Job Description
                                        </label>

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
          focus:border-[#A7A0F8]
          focus:ring-2
          text-black
          focus:ring-[#A7A0F8]/20
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
                                            className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#A7A0F8]"
                                        />
                                    </div>

                                    {/* Selected Details */}

                                    <div className="rounded-xl bg-[#A7A0F8]/10 p-4 border border-[#A7A0F8]/20">
                                        <div className="flex flex-col gap-2">

                                            <div>
                                                <span className="font-semibold text-black">
                                                    Resume Category:
                                                </span>{" "}
                                                <span className='text-[#7268f1]'>
                                                    {jd.ResumeType}
                                                </span>

                                            </div>

                                            <div>
                                                <span className="font-semibold text-black">
                                                    Selected Role:
                                                </span>{" "}
                                                <span className='text-[#7268f1]'>
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
          bg-[#A7A0F8]
          text-white
          font-semibold
          disabled:opacity-50
        "
                                        >
                                            Generate Resume
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>}

                    </div>
                </div>
            </div>
        </>
    )
}



export default ClickedResume