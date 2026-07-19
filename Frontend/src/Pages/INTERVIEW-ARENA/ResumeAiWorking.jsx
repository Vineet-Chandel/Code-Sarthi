import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BASE_URL from "../auth/baseURL";



import {
    CheckCircle,



    Type,
    Braces,
    FileWarning,
    Target,
    ShieldCheck, TrendingUp,
    ArrowUpRight, ListChecks, CheckCircle2, AlertTriangle, AlertCircle, Circle, Flame, ChevronDown, BarChart3, ScanLine, XCircle, GitCompareArrows, Sparkles,
} from "lucide-react";
import Stage0 from "./STAGES/Stage0";
import Stage1 from "./STAGES/Stage1";
import Stage2a from "./STAGES/Stage2a";
import Stage2b from "./STAGES/Stage2b";
import Stage2c from "./STAGES/Stage2c";
import Stage2d from "./STAGES/Stage2d";
import Stage3 from "./STAGES/Stage3";
import Stage4 from "./STAGES/Stage4";
import { RESUME_PIPELINE_STAGES } from "./STAGES/RESUME_PIPELINE_STAGES";

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

    useEffect(() => {
        console.log(profileAssebly.data)
    }, [profileAssebly])


    const DEV_MODE = true;


    const mockAuditData = {
        "success": true,
        "data": {
            data: {
                "overallHealthScore": {
                    "score": 72,
                    "outOf": 100,
                    "verdict": "Solid foundation, but several critical fields are missing and content quality needs cleanup before applying."
                },
                "contentIssues": [
                    {
                        "severity": "critical",
                        "section": "projects",
                        "field": "projects[1].description",
                        "issue": "The project description is unclear and seems to be a placeholder.",
                        "flaggedText": "KUCHH TOOO TABHAII HAII BHAII",
                        "fix": "Replace with a clear and concise description of the project."
                    },
                    {
                        "severity": "warning",
                        "section": "experience",
                        "field": "experience[1].startDate",
                        "issue": "The start date is in the future, which is unlikely.",
                        "flaggedText": "2029-06",
                        "fix": "Update the start date to a plausible value."
                    }
                ],
                "missingFields": [
                    {
                        "section": "certifications",
                        "field": "relevant certifications",
                        "importance": "recommended",
                        "whyItMatters": "Certifications can demonstrate expertise and commitment to the field.",
                        "prompt": "Add relevant certifications, such as Azure Developer Associate or AWS Certified Developer."
                    },
                    {
                        "section": "experience",
                        "field": "achievements",
                        "importance": "recommended",
                        "whyItMatters": "Achievements can showcase impact and accomplishments in previous roles.",
                        "prompt": "Add 2-3 achievements for each experience, focusing on specific accomplishments and metrics."
                    }
                ],
                "dataInconsistencies": [
                    {
                        "type": "date_anomaly",
                        "section": "experience",
                        "field": "experience[1].startDate",
                        "description": "The start date is in the future.",
                        "flaggedValue": "2029-06",
                        "suggestedFix": "Update the start date to a plausible value, such as 2022-06."
                    },
                    {
                        "type": "duplicate",
                        "section": "achievements",
                        "field": "achievements[0] and achievements[1]",
                        "description": "The achievements are identical.",
                        "flaggedValue": "Achieved top 5% ranking on LeetCode, demonstrating advanced algorithmic proficiency.",
                        "suggestedFix": "Remove the duplicate achievement."
                    }
                ],
                "skillGapAnalysis": {
                    "roleRequiresSkills": [
                        "TypeScript",
                        "Azure",
                        "Cloud Computing",
                        "Machine Learning"
                    ],
                    "candidateHasSkills": [
                        "Java",
                        "Spring Boot",
                        "Python",
                        "PostgreSQL",
                        "React",
                        "MongoDB"
                    ],
                    "matchedSkills": [
                        "Python",
                        "PostgreSQL"
                    ],
                    "missingCriticalSkills": [
                        {
                            "skill": "TypeScript",
                            "importance": "critical",
                            "reason": "TypeScript is a key skill for Microsoft's Software Development Engineer role."
                        },
                        {
                            "skill": "Azure",
                            "importance": "critical",
                            "reason": "Azure is a key technology for Microsoft, and experience with it is highly valued."
                        }
                    ],
                    "irrelevantSkills": [
                        {
                            "skill": "Vue",
                            "suggestion": "Remove from this resume version or move to lower priority."
                        }
                    ],
                    "skillCoveragePercent": 30
                },
                "growthRecommendations": [
                    {
                        "priority": 1,
                        "category": "skill",
                        "title": "Learn TypeScript to depth",
                        "why": "TypeScript is a key skill for Microsoft's Software Development Engineer role, and having in-depth knowledge will make you a stronger candidate.",
                        "howTo": "Take the TypeScript course on Pluralsight, and practice building projects with it.",
                        "estimatedImpact": "high",
                        "timeToAchieve": "2-3 months"
                    },
                    {
                        "priority": 2,
                        "category": "certification",
                        "title": "Get Azure Developer Associate certification",
                        "why": "Having an Azure certification will demonstrate your expertise and commitment to the technology.",
                        "howTo": "Study for the Azure Developer Associate exam, and take practice tests to prepare.",
                        "estimatedImpact": "high",
                        "timeToAchieve": "1-2 months"
                    }
                ],
                "quickWins": [
                    "Fix the start date on your Backend Developer role at CodeSarthi (currently shows 2029, likely a typo)",
                    "Remove duplicate LeetCode achievement — you have it listed twice word-for-word"
                ],
                "auditSummary": "This profile has a solid foundation, but there are several critical fields missing and content quality needs cleanup before applying. The biggest strength is the candidate's experience with Java and Spring Boot, but the most urgent thing to fix is the lack of relevant skills, such as TypeScript and Azure. With some focused effort on learning these skills and cleaning up the profile, the candidate can become a stronger contender for the Software Development Engineer role at Microsoft."
            }
        }
    }
    const mockStrategyData = {
        "success": true,
        "data": {
            "data": {
                "positioningStatement": "A full-stack engineer with experience building React and Node.js products at CodeSarthi, targeting a mid-level SDE role at Microsoft with strong DSA fundamentals and backend experience.",
                "coreNarrative": "His experience in optimizing RESTful API endpoints, implementing JWT authentication, and designing microservices architecture showcases his technical expertise. Vineet's achievements, such as achieving a top 5% ranking on LeetCode and securing a high CGPA in his academic pursuits, demonstrate his commitment to excellence and problem-solving skills.",
                "mustIncludeKeywords": [
                    "React",
                    "Node.js",
                    "REST API",
                    "RESTful API",
                    "TypeScript",
                    "Azure",
                    "Cloud Computing",
                    "Machine Learning",
                    "JavaScript",
                    "Backend Development",
                    "Full Stack Development"
                ],
                "niceToIncludeKeywords": [
                    "Agile Development",
                    "Scrum",
                    "Kanban",
                    "Test-Driven Development",
                    "Continuous Integration",
                    "Continuous Deployment"
                ],
                "keywordsToAvoid": [
                    "Vue",
                    "Java",
                    "Spring Boot",
                    "Python"
                ],
                "strengthsToAmplify": [
                    "Strong DSA fundamentals",
                    "Experience with React and Node.js",
                    "Backend development expertise",
                    "Achievements in coding challenges and hackathons",
                    "Experience with microservices architecture and RESTful APIs"
                ],
                "weaknessesToDownplay": [
                    "Limited experience with TypeScript and Azure",
                    "Short duration of experience in some roles"
                ],
                "sectionPriority": [
                    "summary",
                    "experience",
                    "projects",
                    "skills",
                    "education",
                    "certifications"
                ],
                "summaryStrategy": {
                    "openWith": "Lead with the React and Node.js full-stack experience at CodeSarthi and the LeetCode top 5% ranking as proof of DSA strength",
                    "keywordsToFrontload": [
                        "React",
                        "Node.js",
                        "Full Stack Development",
                        "DSA"
                    ],
                    "toneInstruction": "Technical and confident, not modest. Avoid buzzwords like results-driven or passionate.",
                    "avoid": [
                        "Do not open with I",
                        "Do not mention Java or Spring Boot — not relevant for this role"
                    ]
                },
                "experienceStrategy": {
                    "general": "Emphasize technical skills, achievements, and impact in each role. Use strong past-tense action verbs like Built, Engineered, and Architected.",
                    "perRole": [
                        {
                            "company": "CodeSarthi",
                            "role": "Frontend Developer",
                            "relevanceToTarget": "high",
                            "instruction": "Emphasize experience with React, Node.js, and RESTful APIs. Highlight achievements in optimizing API endpoints and implementing JWT authentication."
                        },
                        {
                            "company": "CodeSarthi",
                            "role": "Backend Developer",
                            "relevanceToTarget": "high",
                            "instruction": "Emphasize experience with Node.js, RESTful APIs, and microservices architecture. Highlight achievements in optimizing database queries and implementing OAuth2 flow."
                        }
                    ]
                },
                "projectStrategy": {
                    "general": "Emphasize technical decisions, metrics, and impact in each project. Use strong past-tense action verbs like Built, Engineered, and Architected.",
                    "perProject": [
                        {
                            "name": "code sarhti",
                            "relevanceToTarget": "high",
                            "shouldInclude": true,
                            "instruction": "Emphasize experience with React, Node.js, and MongoDB. Highlight achievements in optimizing React rendering pipeline and implementing JWT authentication."
                        },
                        {
                            "name": "DEV CONNECT",
                            "relevanceToTarget": "low",
                            "shouldInclude": false,
                            "instruction": "Do not include this project as it has placeholder content and is not relevant to the target role."
                        }
                    ]
                },
                "skillsStrategy": {
                    "categoriesToUse": [
                        "Programming Languages",
                        "Frameworks",
                        "Databases",
                        "Cloud Platforms"
                    ],
                    "skillsToKeep": [
                        "JavaScript",
                        "React",
                        "Node.js",
                        "MongoDB"
                    ],
                    "skillsToRemove": [
                        "Vue",
                        "Java",
                        "Spring Boot",
                        "Python"
                    ],
                    "skillsToSurface": [
                        "TypeScript",
                        "Azure"
                    ],
                    "orderBy": "Most relevant to Microsoft SDE role first"
                },
                "toneGuidance": {
                    "overall": "Professional and technical, with a confident tone.",
                    "verbStyle": "Strong past-tense action verbs like Built, Engineered, and Architected.",
                    "formality": "Formal but not stiff — this is Microsoft, not a startup."
                },
                "redFlagsToAddress": [
                    "projects[1].description is placeholder text — rewriters must work from bullets only for that project",
                    "experience[1].startDate is 2029 — do not reference dates in bullets"
                ],
                "versionLabel": "Microsoft SDE — Full Stack Focus"
            }
        }
    }



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

                    {
                        data1: {
                            "data": {
                                "summaryTitle": "Software Development Engineer",
                                "summaryBody": "Built scalable React and Node.js applications, achieving top 5% ranking on LeetCode and demonstrating expertise in designing RESTful APIs. Engineered high-performance systems with a strong foundation in computer science, utilizing JavaScript and TypeScript to drive cloud computing solutions on Azure. With a focus on scalability, developed and maintained systems that enhanced user engagement and reduced latency, leveraging cloud computing to drive business growth."
                            }
                        },
                        data2: {
                            "data": [
                                {
                                    "role": "Frontend Developer",
                                    "company": "CodeSarthi",
                                    "location": "Kanpur, India",
                                    "startDate": "2026-01",
                                    "endDate": "2026-01",
                                    "currentlyWorking": true,
                                    "employmentType": "Internship",
                                    "bullets": [
                                        "Built responsive React UI components, reducing load time 35% via lazy loading and Server-Side Rendering (SSR) with Node.js",
                                        "Streamlined RESTful API endpoints, cutting response latency 28% using Azure Cloud Computing and Redis caching",
                                        "Deployed automated CI/CD pipelines with GitHub Actions, accelerating deployment cycles 4x and ensuring scalability with Docker",
                                        "Designed microservices architecture, enhancing scalability 3x through Kubernetes and MongoDB integration",
                                        "Implemented secure user authentication flow, integrating OAuth2 and JWT, reducing breach risk 99% with TypeScript and Cloud Computing"
                                    ]
                                },
                                {
                                    "role": "Backend Developer",
                                    "company": "CodeSarthi",
                                    "location": "Kanpur, India",
                                    "startDate": "2029-06",
                                    "endDate": "2030-12",
                                    "currentlyWorking": true,
                                    "employmentType": "Internship",
                                    "bullets": [
                                        "Built a stateless REST API using Node.js, cutting latency 35% measured by response time",
                                        "Streamlined PostgreSQL queries, boosting throughput 4x measured by transactions per second with JavaScript and TypeScript",
                                        "Deployed automated CI/CD pipelines with GitHub Actions and Docker, accelerating deployments 2x measured by release frequency",
                                        "Designed a microservices architecture, scaling horizontally to 10 instances measured by uptime 99.9% with Kubernetes and Azure Cloud Computing",
                                        "Implemented a secure OAuth2 flow with JWT, cutting breach risk 90% measured by scans, and integrated with React and React.js applications"
                                    ]
                                }
                            ]
                        },
                        data3: {
                            "data": [
                                {
                                    "name": "code sarhti",
                                    "stack": "React, Mongo db",
                                    "github": "https://github.com/Vineet-Chandel/Code-Sarthi",
                                    "live": "https://www.codesarthi.in/",
                                    "description": "CodeSarthi connects you with a global developer community to build and scale. Designed to boost productivity while keeping workflows fast and efficient.",
                                    "bullets": [
                                        "Engineered a scalable React.js component architecture, integrating with a Node.js backend via RESTful API, to achieve a 35% reduction in load time and significantly boost user engagement",
                                        "Architected a MongoDB database with sharding, ensuring seamless support for 50k concurrent developers and showcasing expertise in Cloud Computing with Azure",
                                        "Implemented a secure authentication mechanism using JWT and OAuth2, integrating with the REST API to reduce unauthorized access incidents by 90% and protect sensitive data",
                                        "Optimized the React rendering pipeline, cutting the bundle size by 28% and improving SEO scores, while ensuring scalability and performance in a microservices-based architecture"
                                    ]
                                }
                            ]
                        },
                        data4: {
                            "data": {
                                "skills": [
                                    {
                                        "skillCategory": "Languages",
                                        "skills": [
                                            "JavaScript",
                                            "TypeScript"
                                        ]
                                    },
                                    {
                                        "skillCategory": "Frameworks",
                                        "skills": [
                                            "React"
                                        ]
                                    },
                                    {
                                        "skillCategory": "Databases",
                                        "skills": [
                                            "MongoDB",
                                            "PostgreSQL"
                                        ]
                                    },
                                    {
                                        "skillCategory": "Tools",
                                        "skills": [
                                            "Node.js",
                                            "Docker",
                                            "Kubernetes",
                                            "JWT",
                                            "OAuth2"
                                        ]
                                    },
                                    {
                                        "skillCategory": "Cloud",
                                        "skills": [
                                            "Azure"
                                        ]
                                    }
                                ]
                            }
                        }
                    }

                );
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 2 && index <= 5
                            ? { ...stage, status: "SUCCESS" }
                            : stage
                    )
                );
                console.log(strategyData);
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
                        index > 5
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
                        index > 6
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
                return
            }
            setProfileAssembly({
                data: run4.data.data
            })


            const run5 = await skillGap(run3, run1, SpecificRole, ResumeType, Company, JobDescription)
            if (!run5) {

                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index > 7
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
                return
            }

        }
        catch (err) {

        }

    }

    useEffect(() => {
        RESUME_PIPELINE_STAGES_API_SEGMENT()
    }, [])




    const [stageOpen, setStageOpen] = useState(null);

    return (
        <div className=" w-full flex flex-col justify-start  gap-5  items-center ">


            <h1 className="text-7xl text-black font-extrabold tracking-tight">Creating Carrer Profile </h1>
            {/* make a responsive grid of 4 in md and 2 in sm */}

            {resumePipelineStages.map((items, idx) => {
                return (<motion.div key={idx}


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

                        {/* description */}

                        {/* arrow down button */}
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
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </motion.div >)
            })}







        </div >
    );
};

export default ResumeAiWorking;