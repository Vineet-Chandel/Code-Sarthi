import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Temp1 from "../../3/Temp1";
import axios from "axios";
import BASE_URL from '../../../auth/baseURL';
import { Slice } from 'lucide-react';
import Toast from '../Toast';
import { AnimatePresence } from "framer-motion";
import ProgressMeter from '../ProgressMeter';
import Header from '../Header';
import Step from '../Step';
import Preview from '../Preview';
import AddedPoints from '../AddedPoints';
import AiWorking from '../AiWorking';

// ─── reusable field ───────────────────────────────────────────────────────────
const InputField = ({ label, id, value, type = "text", placeholder, onChange }) => (
    <div className="flex flex-col gap-1 w-full group">
        <label
            htmlFor={id}
            className="text-[13px] font-semibold uppercase tracking-widest text-info group-focus-within:text-white transition-colors ml-0.5"
        >
            {label}
        </label>
        <div className='relative'>

            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(id, e.target.value)}
                className="
          w-full
          bg-base-100
          border border-accent
          rounded-xl
          px-4 py-3
          text-white
          text-sm sm:text-base
          font-medium
          outline-none
          transition-all duration-300
          hover:border-info
          focus:border-info
          focus:ring-2 focus:ring-info
          focus:bg-base-200
          shadow-md hover:shadow-lg
          cursor-pointer
          pr-10
        "  /></div>
    </div>
);




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





const Education = ({ data }) => {
    const location = useLocation();
    let resumeData = location.state?.resumeData || {};

    const [education, setEducation] = useState(
        resumeData?.education?.length > 0
            ? resumeData.education
            : [
                {

                    institution: "",
                    location: "",
                    degree: "",
                    field: "",
                    startDate: "",
                    endDate: "",
                    cgpa: "",
                    bullets: [],

                }
            ]
    );

    const [activeTab, setActiveTab] = useState("preview"); // preview | tips | score
    const [sidebarOpen, setSidebarOpen] = useState(true);




    const prevExperience = resumeData?.experience || [];


    resumeData = {
        ...resumeData,
        education:
            education,
    };


    const Navigate = useNavigate();




    const handleChange2 = (index, id, value) => {
        setEducation(prev =>
            prev.map((exp, i) =>
                i === index ? { ...exp, [id]: value } : exp
            )
        );
    };
    const addEducation = () => {
        setEducation(prev => [
            ...prev,
            {
                institution: "",
                location: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                cgpa: "",
                bullets: [],

            }
        ]);
    };
    const [activeInputIndex, setActiveInputIndex] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [bullets, setBullets] = useState([]);
    const [isAiworking, setIsAiworking] = useState(false);
    // dwnekbevekfdnvfvekdvbnkn;beveb;dkv
    //;.bk;enebkebve;beb;enb;kevnenbvnebebn;keb
    const [selectedDegree, setSelectedDegree] = useState();
    const [selectedInstitution, setSelectedInstitution] = useState();
    const [selectedField, setSelectedField] = useState();
    const [selectedCgpa, setSelectedCgpa] = useState();
    const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);
    const [selectedEndData, setSelectedEndData] = useState("")

    const [editingBulletIndex, setEditingBulletIndex] = useState(null);


    const [points, setpoints] = useState([]);

    const [bulletInput, setBulletInput] = useState("");



    const addToast = ({ type = "success", title, message }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };


    useEffect(() => {
        if (bullets?.length == 0 && selectedDegree && selectedInstitution && selectedField) {
            bulletspoints(selectedDegree, selectedInstitution, selectedField, selectedEndData);
        }


    }, [points]);

    useEffect(() => {
        if (selectedDegree && selectedInstitution && selectedField) {
            bulletspoints(selectedDegree, selectedInstitution, selectedField);
        }
    }, [selectedDegree, selectedInstitution, selectedField]);

    const bulletspoints = async (selectedDegree, selectedInstitution, selectedField) => {
        try {
            setIsAiworking(true);
            const response = await axios.post(
                `${BASE_URL}/generate-edu-pointer`,
                { degree: selectedDegree, college: selectedInstitution, feild: selectedField, cgpa: selectedCgpa, graduationYear: education }
            );

            setBullets(response.data.data);


        } catch (err) {
            console.error(err?.message || err);
        } finally {
            setIsAiworking(false);
        }
    };

    useEffect(() => {
        setBulletInput("");


    }, [activeInputIndex]);



    const [enhancerWorking, setEnhancerWorking] = useState("false");
    const [enhancerData, setEnhancerData] = useState({});
    const enhancer = async (bullet, index, bulletIndex) => {
        try {
            setEnhancerWorking(`${index}-${bulletIndex}`);
            const response = await axios.post(
                `${BASE_URL}/improve-pointer`,
                { bullet }
            );
            return response.data.data.bullet;
        } catch (err) {
            console.error(err);
            return null;
        } finally {
            setEnhancerWorking(null);
        }
    };




    const options = [
        {
            heading: "School Education",
            option: [
                "High School Diploma",
                "Secondary School Certificate (SSC)",
                "Higher Secondary Certificate (HSC)",
                "Intermediate",
                "General Educational Development (GED)",
                "International Baccalaureate (IB) Diploma",
                "Cambridge O-Level",
                "Cambridge A-Level",
                "Matriculation"
            ]
        },
        {
            heading: "Diploma & Certifications",
            option: [
                "Diploma",
                "Associate Degree",
                "Postgraduate Diploma",
                "Certification",
                "Professional Certification",
                "Vocational Training",
                "Advanced Diploma",
                "Graduate Certificate",
                "National Certificate",
                "Trade Certificate",
                "Foundation Diploma",
                "ITI (Industrial Training Institute)"
            ]
        },
        {
            heading: "Bachelor's Degrees",
            option: [
                "Bachelor of Arts (BA)",
                "Bachelor of Science (BSc)",
                "Bachelor of Commerce (BCom)",
                "Bachelor of Technology (BTech)",
                "Bachelor of Engineering (BE)",
                "Bachelor of Computer Applications (BCA)",
                "Bachelor of Business Administration (BBA)",
                "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
                "Bachelor of Laws (LLB)",
                "Bachelor of Education (BEd)",
                "Bachelor of Architecture (BArch)",
                "Bachelor of Fine Arts (BFA)",
                "Bachelor of Design (BDes)",
                "Bachelor of Pharmacy (BPharm)",
                "Bachelor of Dental Surgery (BDS)",
                "Bachelor of Physiotherapy (BPT)",
                "Bachelor of Nursing (BNSc)",
                "Bachelor of Social Work (BSW)",
                "Bachelor of Hotel Management (BHM)",
                "Bachelor of Mass Communication (BMC)",
                "Bachelor of Journalism (BJ)",
                "Bachelor of Economics (BEcon)",
                "Bachelor of Psychology (BPsych)",
                "Bachelor of Public Health (BPH)",
                "Bachelor of Agricultural Science (BAgSc)"
            ]
        },
        {
            heading: "Master's Degrees",
            option: [
                "Master of Arts (MA)",
                "Master of Science (MSc)",
                "Master of Commerce (MCom)",
                "Master of Technology (MTech)",
                "Master of Engineering (ME)",
                "Master of Computer Applications (MCA)",
                "Master of Business Administration (MBA)",
                "Master of Laws (LLM)",
                "Master of Education (MEd)",
                "Master of Architecture (MArch)",
                "Master of Fine Arts (MFA)",
                "Master of Design (MDes)",
                "Master of Pharmacy (MPharm)",
                "Master of Public Health (MPH)",
                "Master of Social Work (MSW)",
                "Master of Finance (MFin)",
                "Master of Data Science (MDS)",
                "Master of Artificial Intelligence (MAI)",
                "Master of Nursing (MN)",
                "Master of Psychology (MPsych)",
                "Master of Public Administration (MPA)",
                "Master of International Business (MIB)",
                "Executive MBA (EMBA)"
            ]
        },
        {
            heading: "Doctorate",
            option: [
                "Doctor of Philosophy (PhD)",
                "Doctorate",
                "Doctor of Medicine (MD)",
                "Doctor of Engineering (DEng)",
                "Doctor of Business Administration (DBA)",
                "Doctor of Education (EdD)",
                "Doctor of Laws (LLD)",
                "Doctor of Science (DSc)",
                "Doctor of Pharmacy (PharmD)",
                "Doctor of Psychology (PsyD)",
                "Doctor of Public Health (DrPH)",
                "Postdoctoral Research"
            ]
        },
        {
            heading: "Professional Qualifications",
            option: [
                "Chartered Accountant (CA)",
                "Certified Public Accountant (CPA)",
                "Chartered Financial Analyst (CFA)",
                "Certified Management Accountant (CMA)",
                "Company Secretary (CS)",
                "Chartered Engineer (CEng)",
                "Project Management Professional (PMP)",
                "Certified Information Systems Security Professional (CISSP)",
                "AWS Certified Solutions Architect",
                "Google Cloud Professional",
                "Microsoft Certified Professional",
                "Cisco Certified Network Associate (CCNA)",
                "Certified Financial Planner (CFP)",
                "Bar Association Membership",
                "Medical Council Registration"
            ]
        },
        {
            heading: "Online & Distance Learning",
            option: [
                "Online Bachelor's Degree",
                "Online Master's Degree",
                "MOOC Certificate (Coursera, edX, etc.)",
                "Nanodegree (Udacity)",
                "Bootcamp Certificate",
                "Distance Education Degree",
                "Open University Degree",
                "E-Learning Certificate"
            ]
        },
        {
            heading: "Other",
            option: [
                "Homeschooling",
                "Unschooling / Self-Taught",
                "Apprenticeship",
                "Other"
            ]
        }
    ];

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");

    return (
        <div className="min-h-[calc(100vh-4rem)] w-screen flex items-start justify-center p-4 md:p-6 bg-base-100">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="w-full bg-base-100 rounded-3xl border border-slate-100 overflow-hidden border border-slate-700" >

                {/* ── top bar ── */}
                <div className="flex flex-col min-[480px]:flex-row items-center justify-around min-[480px]:justify-center gap-5 min-[480px]:gap-3 bg-base-200 px-2 py-3.5 border-b border-slate-700 sm:px-5">
                    {/* Step Counter */}
                    <span className="w-full flex justify-center min-[480px]:justify-start min-[480px]:w-1/5">
                        <Step index={2} />
                    </span>

                    {/* Progress Meter Container */}
                    <span className="flex min-[480px]:w-[70%] justify-center  w-full min-[480px]:justify-end sm:w-3/5 ">
                        <ProgressMeter index={2} resumeData={resumeData} />
                    </span>

                    {/* Sidebar Toggle Button Container */}
                    <span className="hidden w-1/5 justify-end sm:flex">
                        <button
                            onClick={() => setSidebarOpen((p) => !p)}
                            className={`
        flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 justify-self-end sm:text-base
        ${sidebarOpen
                                    ? "bg-secondary-content text-base-100 border-secondary"
                                    : "bg-base-100 text-secondary-content border-secondary"
                                }
      `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2c4.714 0 7.071 0 8.535 1.464c1.08 1.08 1.364 2.647 1.439 5.286L22 9.5H2.026v-.75c.075-2.64.358-4.205 1.438-5.286C4.93 2 7.286 2 12 2" opacity={0.5}></path>
                                <path fill="currentColor" d="M13 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M7 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                                <path fill="currentColor" d="M2 12c0 4.714 0 7.071 1.464 8.535c1.01 1.01 2.446 1.324 4.786 1.421L9 22V9.5H2.026l-.023.75Q2 11.066 2 12" opacity={0.7}></path>
                                <path fill="currentColor" d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22c-.819 0-2.316 0-3-.008V9.5h13l-.003.75Q22 11.066 22 12"></path>
                            </svg>
                            {sidebarOpen ? "Hide" : "Preview"}
                        </button>
                    </span>
                </div>


                {/* ── body ── */}
                <div className={`grid transition-all duration-500 ${sidebarOpen ? "lg:grid-cols-[1fr_500px]" : "grid-cols-1"}`}>

                    {aiModalOpen && <AiWorking
                        setIsAiworking={setIsAiworking}
                        isAiworking={isAiworking}
                        aiModalOpen={aiModalOpen}
                        setAiModalOpen={setAiModalOpen}
                        bullets={bullets}
                        setBullets={setBullets}
                        setpoints={setpoints}
                        points={points}
                        setRole={setSelectedDegree}
                        role={selectedDegree}
                        setFeildIndex={setSelectedEducationIndex}
                        feildIndex={selectedEducationIndex}
                        setSelectedEntity={setSelectedInstitution}
                        selectedEntity={selectedInstitution}
                        setSelectedFeildType={setSelectedField}
                        selectedFeildType={selectedField}
                        addToast={addToast}
                        mainFeild={education}
                        setMainFeild={setEducation} />
                    }
                    {/* ── LEFT: form ── */}
                    <div className="p-3 min-[650px]:p-6 md:p-10 border border-gray-700 ">


                        <Header index={2} />
                        {education.map((form, index) => (
                            <div key={index} className="bg-base-300 rounded-3xl shadow-inner p-4 md:p-7 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">Educationn Feild #{index + 1}</h3>
                                    <button
                                        onClick={() => {
                                            const newExperiences = [...education];
                                            newExperiences.splice(index, 1);
                                            setEducation(newExperiences);
                                        }}
                                        className="text-accent hover:text-secondary transition-colors cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                            <path fill="#ffffff" d="M3 6.524c0-.395.327-.714.73-.714h4.788c.006-.842.098-1.995.932-2.793A3.68 3.68 0 0 1 12 2a3.68 3.68 0 0 1 2.55 1.017c.834.798.926 1.951.932 2.793h4.788c.403 0 .73.32.73.714a.72.72 0 0 1-.73.714H3.73A.72.72 0 0 1 3 6.524M11.607 22h.787c2.707 0 4.06 0 4.94-.863s.971-2.28 1.151-5.111l.26-4.08c.098-1.537.146-2.306-.295-2.792c-.442-.487-1.187-.487-2.679-.487H8.23c-1.491 0-2.237 0-2.679.487c-.441.486-.392 1.255-.295 2.791l.26 4.08c.18 2.833.27 4.249 1.15 5.112S8.9 22 11.607 22"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-start gap-5 mb-6">
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        <InputField label="Institute Name" id="institution" value={form.institution} required={true}
                                            placeholder="National Institute of Technology Jalandhar "
                                            onChange={(id, value) => handleChange2(index, id, value)}
                                        />

                                        <InputField label="Institute Location" id="location" value={form.location} required={true}
                                            placeholder="Jalandhar,India"
                                            onChange={(id, value) => handleChange2(index, id, value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center gap-3 '>
                                    <div className='mb-2 w-full'>
                                        <label className="text-sm font-medium text-info mb-2 block">
                                            Degree
                                        </label>

                                        <div className="relative w-full">
                                            <button
                                                onClick={() => setOpen(!open)}
                                                className="
      w-full
      bg-base-100
      border border-accent
      rounded-xl
      px-4 py-3
      flex justify-between items-center
      hover:border-info
      transition-all
    "
                                            >
                                                {selected || "Select Employment Type"}

                                                <svg
                                                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M7 10l5 5l5-5"
                                                    />
                                                </svg>
                                            </button>

                                            {open && (
                                                <div
                                                    className="
        absolute z-50
        w-full
        mt-2
        bg-base-200
        border border-accent
        rounded-xl
        max-h-80
overflow-y-auto
        shadow-2xl
      "
                                                >
                                                    {options.map((group) => (
                                                        <div key={group.heading}>
                                                            <div className="px-4 py-2 bg-base-300 text-white text-sm font-bold flex items-center gap-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                                    <path fill="#fff" fillRule="evenodd" d="M17.9 4.2A3 3 0 0 0 15.5 3h-11a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h11a3 3 0 0 0 2.4-1.2l4.5-6a3 3 0 0 0 0-3.6z" clipRule="evenodd"></path>
                                                                </svg>   {group.heading}
                                                            </div>

                                                            {group.option.map((degree) => (
                                                                <button
                                                                    key={degree}
                                                                    onClick={() => {
                                                                        setSelected(degree);
                                                                        handleChange2(index, "degree", degree);
                                                                        setOpen(false);
                                                                    }}
                                                                    className="
                    w-full
                    px-4 py-3
                    text-left
                    text-info
                    flex items-center gap-2
                    hover:bg-secondary
                    hover:text-white
                    transition-all
                "
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                                            <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033zM5 17A12 12 0 0 1 17 5"></path>
                                                                            <circle cx={19} cy={5} r={2}></circle>
                                                                            <circle cx={5} cy={19} r={2}></circle>
                                                                        </g>
                                                                    </svg> {degree}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>












                                    </div>
                                    <InputField label="Field of Study" id="field" value={form.field}
                                        placeholder="Computer Science and Engineering"
                                        onChange={(id, value) => handleChange2(index, id, value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

                                    <InputField label="CGPA/Percentage" id="cgpa" value={form.cgpa}
                                        placeholder="8.7/10 or 92%"
                                        onChange={(id, value) => handleChange2(index, id, value)}
                                    />
                                    <InputField type="month" label="Start Date" id="startDate" value={form.startDate}

                                        onChange={(id, value) => handleChange2(index, id, value)} />
                                    <InputField type="month" label="End Date" id="endDate" value={form.endDate}

                                        onChange={(id, value) => handleChange2(index, id, value)} />



                                </div>



                                <button className='bg-base-100 border border-secondary hover:bg-base-100 text-info  px-3 py-2 rounded-xl mt-3 flex justify-center items-center gap-2 hover:scale-105 transition-all duration-300 ease-in-out group' onClick={() => {


                                    if (education[index].degree === '' || education[index].institution === '' || education[index].field === '' || education[index].cgpa === '') {

                                        addToast({
                                            type: "error",
                                            title: "Error",
                                            message: "Please fill Degree, Institution, Field and the CGPA/Percentage  "
                                        });
                                        return;
                                    }

                                    setSelectedEndData(""); setAiModalOpen(true); setSelectedDegree(education[index].degree); setSelectedInstitution(education[index].institution); setSelectedField(education[index].field); setSelectedCgpa(education[index].cgpa); setSelectedEducationIndex(index); setSelectedEndData(education[index].endDate);
                                }}>

                                    <div className='flex justify-center items-center gap-2  p-2 rounded-xl bg-secondary group-hover:text-base-100 transition-all duration-300 ease-in-out'>
                                        <h1 className="text-xl font-bold text-secondary-content leading-tight text-center  transition-all duration-300 ease-in-out">Shastra</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className='text-secondary group-hover:text-base-100'>
                                            <path fill="#fff" d="M16.4 21h-2.154l-2-5H5.754l-2 5H1.6L8 5h2zm4.6-9v9h-2v-9zM6.554 14h4.892L9 7.885zM19.529 2.32a.507.507 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.717.32a.53.53 0 0 1 0 .962l-.758.338a4.36 4.36 0 0 0-2.22 2.25l-.246.566a.506.506 0 0 1-.934 0l-.247-.565a4.36 4.36 0 0 0-2.219-2.251l-.76-.338a.53.53 0 0 1 0-.963l.718-.32a4.37 4.37 0 0 0 2.251-2.325z"></path>
                                        </svg>
                                    </div>
                                    Generate Bullets for Education</button>

                                <AddedPoints feild={education} index={index} activeInputIndex={activeInputIndex} setActiveInputIndex={setActiveInputIndex} editingBulletIndex={editingBulletIndex} setEditingBulletIndex={setEditingBulletIndex} bulletInput={bulletInput} setBulletInput={setBulletInput} enhancer={enhancer} setExperiences={setEducation} addToast={addToast} enhancerWorking={enhancerWorking} setEnhancerWorking={setEnhancerWorking} />
                            </div>



                        ))}
                        <div className="flex justify-end mt-10">
                            <button
                                onClick={addEducation}
                                className="px-6 py-2 rounded-full bg-base-200 text-white flex items-center gap-2"
                            ><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                        <path fill="#ffffff" d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"></path>
                                    </g>
                                </svg> Add Education</button>
                        </div>
                    </div>

                    {/* ── RIGHT: sidebar ── */}
                    {sidebarOpen && (
                        <Preview resumeData={resumeData} activeTab={activeTab} setActiveTab={setActiveTab} />
                    )}
                </div>


                {/* ── footer ── */}
                <div className="flex items-center justify-end px-6 md:px-10 py-4 bg-base-200 border-t border-gray-700">

                    <button
                        onClick={() => {
                            Navigate("/app/build-resume/intro-skill-page", {
                                state: { resumeData }
                            });
                        }}
                        className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-xl bg-base-100 text-info border-2 border-secondary
                        hover:text-secondary-content   active:scale-95 transition-all duration-200 "    >
                        Next: Skills
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5m11 0v14c0 .86 1.012 1.318 1.659.753l8-7a1 1 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Education;