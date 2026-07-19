import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BASE_URL from "../auth/baseURL";
import Stage0 from "./STAGES/Stage0";
import Stage1 from "./STAGES/Stage1";
import Stage2a from "./STAGES/Stage2a";
import Stage2b from "./STAGES/Stage2b";
import Stage2c from "./STAGES/Stage2c";
import Stage2d from "./STAGES/Stage2d";
import Stage3 from "./STAGES/Stage3";
import Stage4 from "./STAGES/Stage4";
import Stage5 from "./STAGES/Stage5";
import { RESUME_PIPELINE_STAGES } from "./STAGES/RESUME_PIPELINE_STAGES";
import { mockAuditData, mockStrategyData, mockRewritingData } from "./STAGES/MockData";
import AfterCompletion from "./STAGES/AfterCompletion";


const ResumeAiWorking = ({ addToast, SpecificRole, Company, JobDescription, BroadRole, ResumeType }) => {

    const [resumePipelineStages, setResumePipelineStages] = useState(RESUME_PIPELINE_STAGES);
    const [auditData, setAuditData] = useState({
        data: null
    });
    const [strategyData, setStrategyData] = useState({
        data: null
    });
    const [rewrittingData, setRewrittingData] = useState({
        data1: null,
        data2: null,
        data3: null,
        data4: null
    });
    const [profileAssebly, setProfileAssembly] = useState({
        data: null
    })
    const [skillGapData, setSkillGapData] = useState({
        data: null
    })
    const [growthData, setGrowthData] = useState({
        data: null
    })


    const DEV_MODE = false;






    const audit = async () => {


        try {

            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    index === 0
                        ? { ...stage, status: "LOADING" }
                        : stage
                )
            );

            if (DEV_MODE) {
                setAuditData(mockAuditData);
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index === 0
                            ? { ...stage, status: "SUCCESS" }
                            : stage
                    )
                );


                return 1;
            }
            const res = await axios.post(`${BASE_URL}/resume/audit`, {
                SpecificRole: SpecificRole,
                Company: Company,
                JobDescription: JobDescription,
                BroadRole: BroadRole,
                ResumeType: ResumeType
            }, { withCredentials: true })

            setAuditData({
                data: res.data
            })


            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    index === 0
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            return res.data;
        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: "error in auditing"
            }));



            return 0;
        }
    }
    const strategy = async () => {
        try {


            if (DEV_MODE) {
                setStrategyData(mockStrategyData);
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index === 1
                            ? { ...stage, status: "SUCCESS" }
                            : stage
                    )
                );

                return 1;
            }
            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    index === 1
                        ? { ...stage, status: "LOADING" }
                        : stage
                )
            );


            const res = await axios.post(`${BASE_URL}/resume/strategy`, {
                SpecificRole: SpecificRole,
                Company: Company,
                JobDescription: JobDescription,
                BroadRole: BroadRole,
                ResumeType: ResumeType,
                auditResult: auditData?.data?.data
            }, { withCredentials: true })

            setStrategyData({
                data: res.data
            })

            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    index === 1
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            return res.data;
        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: "error in auditing"
            }))

            return 0;
        }
    }
    const rewritting = async (strategyResult) => {
        try {
            if (DEV_MODE) {
                setRewrittingData(

                    mockRewritingData
                );
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 2 && index <= 5
                            ? { ...stage, status: "SUCCESS" }
                            : stage
                    )
                );

                return 1;
            }

            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index >= 2 && index <= 5)
                        ? { ...stage, status: "LOADING" }
                        : stage
                )
            );


            const res1 = await axios.post(`${BASE_URL}/resume/rewrite/summary`, {
                strategy: strategyResult?.data
            }, { withCredentials: true })


            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index === 2)
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            const res2 = await axios.post(`${BASE_URL}/resume/rewrite/experience`, {
                strategy: strategyResult?.data
            }, { withCredentials: true })


            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index === 3)
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            const res3 = await axios.post(`${BASE_URL}/resume/rewrite/projects`, {
                strategy: strategyResult?.data
            }, { withCredentials: true })

            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index === 4)
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            const res4 = await axios.post(`${BASE_URL}/resume/rewrite/skills`, {
                strategy: strategyResult?.data
            }, { withCredentials: true })



            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index >= 2 && index <= 5)
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            const assembled = {
                _tailoringMeta: { targetRole: SpecificRole, company: Company, Positioning: JobDescription },
                summaryTitle: res1.data?.data?.summaryTitle || "",
                summaryBody: res1.data?.data?.summaryBody || "",
                Experience: res2.data?.data || [],
                Project: res3.data?.data || [],
                Skills: res4.data?.data?.skills || []
            };

            setRewrittingData({ data1: res1.data, data2: res2.data, data3: res3.data, data4: res4.data });
            return assembled;
        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: err
            }))

            return 0;
        }
    }
    const coherence = async (tailoredProfile, strategyResult) => {
        try {

            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index === 6)
                        ? { ...stage, status: "LOADING" }
                        : stage
                )
            );


            const res3 = await axios.post(`${BASE_URL}/resume/coherence`, {
                tailoredProfile: tailoredProfile, strategyResult: strategyResult
            }, { withCredentials: true })

            setProfileAssembly({
                data: res3
            })

            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    index === 6
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            return res3;
        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: err
            }))
        }
    }
    const skillGap = async (

        tailoredProfile,
        auditResult,



        SpecificRole,
        ResumeType,
        Company,
        JobDescription
    ) => {
        try {

            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index === 7)
                        ? { ...stage, status: "LOADING" }
                        : stage
                )
            );


            const res5 = await axios.post(`${BASE_URL}/resume/skillgap`, {
                tailoredProfile: tailoredProfile,
                auditResult: auditResult,
                SpecificRole: SpecificRole,
                ResumeType: ResumeType,
                Company: Company,
                JobDescription: JobDescription
            }, { withCredentials: true })


            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index === 7)
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            setSkillGapData({
                data: res5
            })
            return res5;
        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: err
            }))

        }
    }
    const growthRecommendations = async (

        tailoredProfile,
        skillGapResult,
        coherenceResult,
        auditResult,



        SpecificRole,
        ResumeType,
        Company,
        JobDescription
    ) => {
        try {

            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index === 8)
                        ? { ...stage, status: "LOADING" }
                        : stage
                )
            );


            const res5 = await axios.post(`${BASE_URL}/resume/growth`, {
                tailoredProfile: tailoredProfile,
                skillGapResult: skillGapResult,
                coherenceResult: coherenceResult,
                auditResult: auditResult,



                SpecificRole: SpecificRole,
                ResumeType: ResumeType,
                Company: Company,
                JobDescription: JobDescription
            }, { withCredentials: true })


            setResumePipelineStages(prev =>
                prev.map((stage, index) =>
                    (index === 8)
                        ? { ...stage, status: "SUCCESS" }
                        : stage
                )
            );
            setGrowthData({
                data: res5
            })
            return res5;
        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: err
            }))

        }
    }



    const RESUME_PIPELINE_STAGES_API_SEGMENT = async () => {
        try {
            const run1 = await audit();

            if (!run1) {
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 0
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
                return
            }

            const run2 = await strategy();
            if (!run2) {

                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 1
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
                return
            }

            const run3 = await rewritting(run2);
            if (!run3) {

                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 5
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
                return
            }


            const run4 = await coherence(run3, run2)
            if (!run4) {

                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 6
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
                return
            }



            const run5 = await skillGap(run3, run1, SpecificRole, ResumeType, Company, JobDescription)
            if (!run5) {

                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 7
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
                return
            }


            const run6 = await growthRecommendations(run3, run5, run4, run1, SpecificRole, ResumeType, Company, JobDescription)
            if (!run6) {
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 8
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
                return
            }

            setAnalysingFinish(true)

        }
        catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: err
            }))
        }

    }

    useEffect(() => {
        RESUME_PIPELINE_STAGES_API_SEGMENT()
    }, [])

    const [stageOpen, setStageOpen] = useState(null);


    const [analysingFinish, setAnalysingFinish] = useState(false);

    return (
        <div className=" w-full flex flex-col justify-start  gap-5  items-center ">


            <h1 className="text-7xl text-black font-extrabold tracking-tight">Creating Carrer Profile </h1>
            {/* make a responsive grid of 4 in md and 2 in sm */}

            {resumePipelineStages.map((items, idx) => {

                return (

                    <motion.div key={idx}


                        layout
                        transition={{ layout: { duration: 0.45 } }}
                        onClick={() => {
                            if (stageOpen === idx) {
                                setStageOpen("")
                            } else {
                                setStageOpen(idx)
                            }
                        }}

                        className="w-[95%]  bg-black/20 border border-black/25 rounded-2xl flex flex-col items-center justify-center overflow-hidden"  >



                        <div className="flex  w-full justify-between px-5 items-center">
                            <div className="flex justify-center items-center gap-2 h-[60px]">
                                <span className=" border-black">
                                    {items?.status === "HOLD" && (

                                        <svg

                                            xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                            <g fill="none" stroke="#000" strokeWidth={1.5}>
                                                <motion.path
                                                    animate={{ rotate: [10, 0, -10, 0, 10] }}
                                                    transition={{
                                                        duration: 1,
                                                        ease: "easeInOut",
                                                        repeat: Infinity,
                                                        repeatType: "loop"
                                                    }} strokeLinejoin="round" d="m8.047 3.449l5.363 2.098c3.093 1.21 4.64 1.816 4.589 2.776s-1.666 1.4-4.894 2.28c-.961.263-1.442.394-1.775.727s-.464.814-.726 1.775c-.88 3.228-1.321 4.843-2.281 4.894s-1.565-1.496-2.776-4.589L3.45 8.047C2.18 4.808 1.548 3.189 2.369 2.368c.82-.82 2.44-.187 5.678 1.08Z"></motion.path>
                                                <path strokeLinecap="round" d="m17.05 17.95l1.8-1.8M22 17.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Z"></path>
                                            </g>
                                        </svg>
                                    )}
                                    {items?.status === "SUCCESS" && (

                                        <svg width="1.8em" height="1.8em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="9" fill="#5ff667ff" fillOpacity="0.7" stroke="#222222" strokeWidth="1.2" />
                                            <motion.path
                                                strokeLinecap="round"
                                                animate={{ opacity: [0, 1] }}
                                                transition={{
                                                    duration: 1.5,
                                                    ease: "easeInOut",

                                                }}
                                                d="M8 12L11 15L16 9" stroke="#000" strokeWidth="2" ></motion.path>
                                        </svg>
                                    )}

                                    {items?.status === "REJECTED" && (


                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 21 21">
                                            <g fill="none" fillRule="evenodd" stroke="#ff5d5d" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)">
                                                <circle cx={8.5} cy={8.5} r={8}></circle>
                                                <path d="m5.5 5.5l6 6m0-6l-6 6"></path>
                                            </g>
                                        </svg>

                                    )}
                                    {items?.status === "LOADING" && (


                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                            <path fill="#000" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.5}></path>
                                            <path fill="#000" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                                <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                            </path>
                                        </svg>

                                    )}
                                </span>

                                <span className="ml-6 text-black"> - </span>
                                <span className="ml-3 border text-black py-1 px-3 rounded-full bg-black/20 border-black/30 h-[40px]  flex items-center justify-center">STAGE : {items?.stageNumber}</span>
                                <span className="ml-3 text-black"> ➤ </span>
                                {/* Name and the title about the stage */}
                                <span className="ml-6 text-black">{items?.icon}</span>
                                <span className="ml-3 text-black font-semibold ">{items?.name}</span>
                            </div>

                            <span>
                                {stageOpen === idx ? <svg className="rotate-[270deg] transition-all duration-3000" xmlns="http://www.w3.org/2000/svg" width="0.8em" viewBox="0 0 12 24">
                                    <path fill="#000" fillRule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"></path>
                                </svg> : <svg className="rotate-[90deg] transition-all duration-3000" xmlns="http://www.w3.org/2000/svg" width="0.8em" viewBox="0 0 12 24">
                                    <path fill="#000" fillRule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"></path>
                                </svg>}

                            </span>
                        </div>

                        <AnimatePresence initial={false}>
                            {stageOpen === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="overflow-hidden w-full"
                                >
                                    <div className="bg-black text-gray-200 px-4 py-3  rounded-lg">

                                        <div className="bg-white/20 border border-white/30 px-3 py-3 rounded-3xl">
                                            {items?.description}
                                            <div className="grid items-center grid-cols-2 gap-2 mt-4">
                                                {items?.pointers?.map((pointer, index) => (



                                                    < p key={index} className="text-gray-400" >● {pointer}</p>


                                                ))}
                                            </div>

                                        </div>


                                        {idx === 0 && items?.status == "SUCCESS" &&

                                            <Stage0 auditData={auditData} />

                                        }

                                        {idx === 1 && items?.status == "SUCCESS" &&

                                            <Stage1 strategyData={strategyData} />

                                        }

                                        {
                                            idx === 2 && items?.status == "SUCCESS" &&
                                            <Stage2a rewrittingData={rewrittingData} />
                                        }


                                        {
                                            idx === 3 && items?.status == "SUCCESS" &&

                                            <Stage2b rewrittingData={rewrittingData} />

                                        }
                                        {
                                            idx === 4 && items?.status == "SUCCESS" &&

                                            <Stage2c rewrittingData={rewrittingData} />

                                        }
                                        {
                                            idx === 5 && items?.status == "SUCCESS" &&

                                            <Stage2d rewrittingData={rewrittingData} />

                                        }

                                        {
                                            idx === 6 && items?.status == "SUCCESS" &&

                                            <Stage3 profileAssebly={profileAssebly} />

                                        }

                                        {
                                            idx === 7 && items?.status == "SUCCESS" &&

                                            <Stage4 skillGapData={skillGapData} />
                                        }
                                        {
                                            idx === 8 && items?.status == "SUCCESS" &&

                                            <Stage5 growthData={growthData} />
                                        }
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </motion.div >)
            })}


            {
                analysingFinish && (
                    <AfterCompletion />
                )
            }




        </div >
    );
};

export default ResumeAiWorking;