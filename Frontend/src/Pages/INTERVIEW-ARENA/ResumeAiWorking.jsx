import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BASE_URL from "../auth/baseURL";
import {
    CheckCircle,
    BadgeCheck,
    AlertTriangle,
    XCircle,
    CheckCheck,
} from "lucide-react";

const ResumeAiWorking = ({ addToast, SpecificRole, Company, JobDescription, BroadRole, ResumeType }) => {


    const RESUME_PIPELINE_STAGES = [
        {
            id: "stage_0",
            stageNumber: 0,
            key: "audit",
            name: "Profile Audit",
            shortName: "Audit",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <g fill="none">
                        <path fill="#000" fillOpacity={0.16} d="M11 19a8 8 0 1 0 0-16a8 8 0 0 0 0 16"></path>
                        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="m21 21l-4-4m2-6a8 8 0 1 1-16 0a8 8 0 0 1 16 0"></path>
                    </g>
                </svg>
            ),
            description: "Deep scan of your raw profile before anything gets tailored. Catches placeholder text, duplicate content, date anomalies, implausible metrics, and missing critical fields.",
            pointers: [
                "Detects gibberish or placeholder text in any field",
                "Flags duplicate achievements or near-identical bullets",
                "Catches date inconsistencies and future-dated experience",
                "Identifies missing fields that ATS systems require",
                "Checks for conflicting data across sections",
                "Generates an overall Profile Health Score out of 100",
                "Lists quick wins the user can fix immediately"
            ],

            status: "HOLD",
            outputShape: "Audit report JSON — health score, content issues, data inconsistencies, missing fields, quick wins",
            blocksNextStage: false,
            canRunStandalone: true,
            requiresTargetRole: false,
            estimatedTokens: "800–1200",
            parallelizable: false
        },

        {
            id: "stage_1",
            stageNumber: 1,
            key: "strategy",
            name: "Targeting Strategy",
            shortName: "Strategy",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M.801 20.637a2.613 2.613 0 1 0 5.226 0a2.613 2.613 0 0 0-5.226 0m8.71-2.467h4.977v4.977H9.511zm13.688 4.977h-5.973l2.986-5.475zM15.733 4.585A3.733 3.733 0 1 0 10.507 8v1.811h2.986v-1.81a3.73 3.73 0 0 0 2.24-3.416M3.539 15.432v-2.488h16.922v2.488m-.686-10.203h1.493m-1.802 3.424l1.055 1.056m-1.055-7.903L20.521.75M4.225 5.229H2.732m1.802 3.424L3.478 9.709m1.056-7.903L3.478.75M12 9.811v5.124"></path>
                </svg>
            ),
            description: "Analyzes the full profile against the target role, company, and job description to build a keyword map, narrative through-line, and per-section rewrite instructions before any content is generated.",
            pointers: [
                "Builds must-include and nice-to-include ATS keyword lists",
                "Defines the core career narrative for this specific application",
                "Assigns a section priority order for this role",
                "Generates per-role and per-project rewrite instructions",
                "Identifies strengths to amplify and gaps to downplay",
                "Sets tone guidance based on role type and company culture",
                "Produces a positioning statement grounding who this person is for this role"
            ],

            status: "HOLD",
            outputShape: "Strategy JSON — keywords, narrative, section instructions, tone, red flags",
            blocksNextStage: true,
            canRunStandalone: false,
            requiresTargetRole: true,
            estimatedTokens: "1000–1500",
            parallelizable: false
        },

        {
            id: "stage_2a",
            stageNumber: 2,
            key: "summary_rewrite",
            name: "Summary Rewrite",
            shortName: "Summary",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48">
                    <g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                        <path d="M24 9h18M24 19h18M6 29h36M6 39h36"></path>
                        <circle cx={12} cy={14} r={5} fill="#000"></circle>
                    </g>
                </svg>
            ),
            description: "Rewrites the professional summary and title using the strategy output. Opens with the strongest proof point, front-loads ATS keywords naturally, and eliminates generic opener clichés.",
            pointers: [
                "Replaces generic openers like 'Results-driven...' with specific positioning",
                "Front-loads 3–5 role-relevant keywords in the first two sentences",
                "Connects the candidate's actual background to the target role",
                "Keeps it to 3–4 sentences — no padding",
                "Does not start with 'I'",
                "Aligns summary title with the target role label",
                "Every claim traceable to real data in the profile — no invented achievements"
            ],

            status: "HOLD",
            outputShape: "Plain text — rewritten summary body + updated summary title",
            blocksNextStage: false,
            canRunStandalone: false,
            requiresTargetRole: true,
            estimatedTokens: "400–600",
            parallelizable: true,
            parallelGroup: "section_rewrites"
        },

        {
            id: "stage_2b",
            stageNumber: 2,
            key: "experience_rewrite",
            name: "Experience Bullets Rewrite",
            shortName: "Experience",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7L16 8" stroke="#000" stroke-width="2" stroke-linecap="round" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.58579 7.58579C3 8.17157 3 9.11438 3 11V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11C21 9.11438 21 8.17157 20.4142 7.58579C19.8284 7 18.8856 7 17 7H7C5.11438 7 4.17157 7 3.58579 7.58579ZM10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12V14C8 14.5523 8.44772 15 9 15C9.55228 15 10 14.5523 10 14V12ZM16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12V14C14 14.5523 14.4477 15 15 15C15.5523 15 16 14.5523 16 14V12Z" fill="#000" />
                </svg>
            ),
            description: "Rewrites bullet points for every experience entry individually. Each role gets its own focused call using per-role instructions from the strategy. Preserves real metrics, removes inflated ones, and weaves in role-relevant keywords naturally.",
            pointers: [
                "Each experience entry is rewritten in a separate focused call",
                "Bullet count stays the same as the original",
                "Starts every bullet with a strong, varied action verb",
                "Preserves genuine metrics — softens implausible ones",
                "Embeds 1–2 target keywords per bullet without forcing them",
                "Removes filler words: 'leveraged', 'utilized', 'synergized'",
                "Format enforced: Verb + what you did + measurable result or impact"
            ],

            status: "HOLD",
            outputShape: "JSON array of rewritten bullet strings per experience entry",
            blocksNextStage: false,
            canRunStandalone: false,
            requiresTargetRole: true,
            estimatedTokens: "500–800 per role",
            parallelizable: true,
            parallelGroup: "section_rewrites"
        },

        {
            id: "stage_2c",
            stageNumber: 2,
            key: "projects_rewrite",
            name: "Projects Bullets Rewrite",
            shortName: "Projects",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                    <path fill="#000" d="M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675l-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617l.968.968l-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96l2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46L4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242l.529.026l.287.445l.445.287l.026.529L5 13l-.242.471l-.026.529l-.445.287l-.287.445l-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471l.026-.529l.445-.287l.287-.445l.529-.026z"></path>
                </svg>
            ),
            description: "Rewrites project bullet points to highlight technical decisions, architecture choices, and measurable outcomes relevant to the target role. Placeholder descriptions are ignored — content is rebuilt from the actual bullet data.",
            pointers: [
                "Each project is rewritten in its own focused call",
                "Leads with the most impressive technical decision or outcome",
                "Makes tech stack appear organically — not as a raw list",
                "Ignores placeholder or gibberish descriptions, works from bullets only",
                "Grounds every claim in original data — no hallucinated metrics",
                "Maximum 4 bullets per project",
                "Surfaces architecture, scale, and engineering judgement over task descriptions"
            ],

            status: "HOLD",
            outputShape: "JSON array of rewritten bullet strings per project",
            blocksNextStage: false,
            canRunStandalone: false,
            requiresTargetRole: true,
            estimatedTokens: "400–700 per project",
            parallelizable: true,
            parallelGroup: "section_rewrites"
        },

        {
            id: "stage_2d",
            stageNumber: 2,
            key: "skills_rewrite",
            name: "Skills Curation",
            shortName: "Skills",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32">
                    <path d="m16 2l12.12 7v14L16 30L3.88 23V9z"></path>
                    <path stroke="#fff" strokeWidth={2.71} d="m16 6.97l7.82 4.51v9.04L16 25.03l-7.82-4.51v-9.04z"></path>
                </svg>
            ),
            description: "Curates and reorganizes the skills section for ATS signal strength. Removes irrelevant skills for the target role, surfaces skills implied by experience bullets but missing from the explicit list, and regroups categories to match what hiring systems expect.",
            pointers: [
                "Removes skills that add no ATS signal for this specific role",
                "Surfaces skills that appear in experience bullets but are missing from skills list",
                "Regroups categories to match role-standard labels — e.g. Languages, Frameworks, Databases, Tools, Cloud",
                "Does not add skills that cannot be inferred from the profile",
                "Orders categories by relevance to the target role",
                "Eliminates redundant or overly broad skill entries",
                "Optimizes for both ATS keyword matching and human readability"
            ],

            status: "HOLD",
            outputShape: "JSON array of skill category objects — { skillCategory, skills[] }",
            blocksNextStage: false,
            canRunStandalone: false,
            requiresTargetRole: true,
            estimatedTokens: "300–500",
            parallelizable: true,
            parallelGroup: "section_rewrites"
        },

        {
            id: "stage_3",
            stageNumber: 3,
            key: "merge",
            name: "Profile Assembly",
            shortName: "Assembly",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512">
                    <path fill="#000" fillRule="evenodd" d="M256 42.667A213.333 213.333 0 0 1 469.334 256c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64"></path>
                </svg>
            ),
            description: "Merges all rewritten sections back into the original profile shape. Preserves untouched fields — education, certifications, languages, header — and attaches tailoring metadata for tracking which role and strategy this version was built for.",
            pointers: [
                "Non-rewritten fields are carried over untouched — header, education, languages, certifications",
                "All rewritten sections are slotted back into the original document shape",
                "Tailoring metadata attached — target role, company, resume category, strategy snapshot",
                "Output is a complete, ready-to-render profile document",
                "No AI call required — pure data merge step",
                "Can generate multiple tailored versions from one audit + strategy run",
                "Version is stored separately from the base profile to preserve original data"
            ],

            status: "HOLD",
            outputShape: "Complete tailored profile document — same shape as original MongoDB document + _tailoringMeta field",
            blocksNextStage: false,
            canRunStandalone: false,
            requiresTargetRole: true,
            estimatedTokens: "0 — no AI call",
            parallelizable: false
        },

        {
            id: "stage_4",
            stageNumber: 4,
            key: "skill_gap",
            name: "Skill Gap Analysis",
            shortName: "Skill Gap",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                    <path fill="#000" d="M11.983 21.462q-.978 0-1.664-.69t-.685-1.676q0-.84.534-1.49t1.332-.816v-2.478q-.39-.062-.717-.257t-.566-.491l-2.094 1.252q.064.173.095.363q.032.19.032.379q0 .985-.702 1.675t-1.68.69t-1.664-.689t-.685-1.673t.684-1.676t1.662-.693q.526 0 .983.207t.78.557l2.09-1.246q-.045-.164-.077-.347t-.032-.368q0-.183.032-.36t.095-.358l-2.088-1.213q-.323.369-.786.576q-.464.206-.997.206q-.977 0-1.662-.689T3.52 8.484t.685-1.676t1.664-.692t1.68.69t.702 1.675q0 .188-.022.377q-.022.188-.086.352l2.094 1.207q.239-.276.556-.469t.708-.254V7.196q-.798-.165-1.332-.818q-.533-.653-.533-1.493q0-.986.685-1.676t1.663-.69t1.68.69t.703 1.676q0 .84-.534 1.493t-1.332.818v2.518q.371.08.686.266q.314.186.553.462l2.138-1.219q-.063-.173-.095-.363t-.032-.38q0-.985.685-1.675t1.664-.69t1.68.69t.702 1.672t-.702 1.677t-1.683.692q-.518 0-.957-.206q-.439-.207-.762-.557l-2.144 1.219q.063.164.085.34q.023.175.023.358t-.032.352t-.076.333l2.144 1.27q.323-.35.762-.556q.44-.207.957-.207q.981 0 1.683.69q.702.688.702 1.672q0 .985-.702 1.677t-1.68.692t-1.664-.69t-.685-1.675q0-.198.032-.379t.095-.363l-2.12-1.252q-.238.296-.552.478q-.314.183-.705.264v2.485q.798.165 1.332.815t.533 1.49q0 .986-.702 1.676t-1.68.69m.007-1q.57 0 .972-.393t.403-.972q0-.58-.398-.973t-.986-.393q-.56 0-.953.403q-.393.402-.393.962t.393.963t.963.402m-6.116-3.538q.57 0 .972-.392q.403-.392.403-.972t-.398-.973t-.986-.394q-.56 0-.953.403q-.394.403-.394.963t.393.962q.394.403.963.403m12.23 0q.57 0 .973-.392t.403-.972t-.398-.973t-.987-.394q-.56 0-.953.403t-.393.963t.393.962t.963.403m-6.116-3.558q.57 0 .972-.392q.403-.392.403-.972t-.398-.973t-.986-.394q-.56 0-.953.403q-.394.403-.394.963t.394.962t.962.403M5.875 9.846q.57 0 .972-.392q.403-.392.403-.972t-.398-.973q-.398-.394-.986-.394q-.56 0-.953.403q-.394.403-.394.963t.393.962q.394.403.963.403m12.23 0q.57 0 .973-.392t.403-.972t-.398-.973q-.398-.394-.987-.394q-.56 0-.953.403t-.393.963t.393.962t.963.403M11.99 6.25q.57 0 .973-.392t.403-.972t-.399-.973q-.398-.394-.986-.394q-.56 0-.953.403t-.393.963t.393.962t.963.403"></path>
                </svg>
            ),
            description: "Compares the candidate's confirmed skill set against what the target role typically requires. Produces a coverage percentage, flags missing critical and preferred skills, identifies irrelevant skills diluting the profile, and maps a growth path.",
            pointers: [
                "Extracts skills from both the explicit skills section AND experience bullet context",
                "Compares against role-standard requirements for the specific job title",
                "Computes a skill coverage percentage",
                "Separates missing skills into critical vs. preferred priority",
                "Flags skills in the profile that have no ATS value for this role",
                "Accounts for company-specific stack preferences when company is provided",
                "Output feeds directly into the growth recommendations stage"
            ],

            status: "HOLD",
            outputShape: "Skill gap JSON — matched skills, missing critical, missing preferred, irrelevant, coverage percent",
            blocksNextStage: false,
            canRunStandalone: true,
            requiresTargetRole: true,
            estimatedTokens: "600–900",
            parallelizable: true,
            parallelGroup: "post_merge"
        },

        {
            id: "stage_5",
            stageNumber: 5,
            key: "growth_recommendations",
            name: "Growth Recommendations",
            shortName: "Growth",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20">
                    <path fill="#000" d="M14 2.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-4.47 4.47a.75.75 0 0 1-1.06 0L8.5 6.56l-4.22 4.22a.75.75 0 1 1-1.06-1.06l4.75-4.75a.75.75 0 0 1 1.06 0l2.47 2.47l3.94-3.94h-.69a.75.75 0 0 1-.75-.75M3.75 14a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75m4.75-2.25a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0zM11.75 13a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75m4.75-3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0z"></path>
                </svg>
            ),
            description: "Generates a prioritized, role-specific action plan for the candidate to close skill gaps, strengthen their profile, and increase their chances over the next 30–90 days. Every recommendation is grounded in the actual gap analysis — no generic advice.",
            pointers: [
                "Each recommendation is tied to a specific gap found in Stage 4",
                "Prioritized by impact on the target role — not generic importance",
                "Names specific resources, not just 'take a course'",
                "Includes realistic time estimates per recommendation",
                "Covers skills, certifications, portfolio projects, and profile improvements",
                "Flags quick wins achievable within a week separately",
                "Recommendations are scoped to the target role — not general career advice"
            ],

            status: "HOLD",
            outputShape: "Growth plan JSON — prioritized recommendations with category, why, howTo, estimatedImpact, timeToAchieve",
            blocksNextStage: false,
            canRunStandalone: false,
            requiresTargetRole: true,
            estimatedTokens: "700–1000",
            parallelizable: true,
            parallelGroup: "post_merge"
        }
    ];

    const [resumePipelineStages, setResumePipelineStages] = useState(RESUME_PIPELINE_STAGES);
    const [auditData, setAuditData] = useState({
        data: null
    });
    const [strategyData, setStrategyData] = useState({
        data: null
    });

    const skillGap = auditData?.data?.data?.skillGapAnalysis;
    const DEV_MODE = false;

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
        "SpecificRole": "SDE",
        "Company": "microsoft",
        "JobDescription": "As a Software Development Engineer at Microsoft, you will design, develop, test, and maintain scalable software solutions that power products used by millions of customers worldwide. You'll collaborate with engineers, product managers, designers, and researchers to build reliable, secure, and high-performance systems while following Microsoft's engineering best practices.",
        "BroadRole": "Software Engineer",
        "ResumeType": "Software Engineer Resume",
        "auditResult": {
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
                    "issue": "Project description is unclear and seems to be a placeholder",
                    "flaggedText": "KUCHH TOOO TABHAII HAII BHAII",
                    "fix": "Rewrite the project description to clearly explain the project's purpose and your role in it"
                },
                {
                    "severity": "warning",
                    "section": "experience",
                    "field": "experience[1].startDate",
                    "issue": "Start date is in the future, which is unlikely",
                    "flaggedText": "2029-06",
                    "fix": "Correct the start date to a plausible value"
                }
            ],
            "missingFields": [
                {
                    "section": "certifications",
                    "field": "certification name and issuing organization",
                    "importance": "recommended",
                    "whyItMatters": "Certifications can demonstrate expertise and commitment to the field",
                    "prompt": "Add a certification related to software development, such as AWS Certified Developer or Microsoft Certified: Azure Developer Associate"
                },
                {
                    "section": "experience",
                    "field": "achievements or accomplishments",
                    "importance": "critical",
                    "whyItMatters": "Achievements and accomplishments help demonstrate the impact of your work",
                    "prompt": "Add specific achievements or accomplishments for each experience entry, such as 'Improved code quality by 25% through rigorous testing and refactoring'"
                }
            ],
            "dataInconsistencies": [
                {
                    "type": "date_anomaly",
                    "section": "experience",
                    "field": "experience[1].startDate",
                    "description": "Start date is in the future",
                    "flaggedValue": "2029-06",
                    "suggestedFix": "Correct the start date to a plausible value, such as '2022-06'"
                },
                {
                    "type": "duplicate",
                    "section": "achievements",
                    "field": "achievements[0] and achievements[1]",
                    "description": "Duplicate achievement entries",
                    "flaggedValue": "Achieved top 5% ranking on LeetCode, demonstrating advanced algorithmic proficiency.",
                    "suggestedFix": "Remove the duplicate entry"
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
                        "reason": "TypeScript is a key skill for software development at Microsoft"
                    },
                    {
                        "skill": "Azure",
                        "importance": "critical",
                        "reason": "Azure is a key technology used at Microsoft"
                    }
                ],
                "irrelevantSkills": [
                    {
                        "skill": "Vue",
                        "suggestion": "Remove from this resume version or move to lower priority"
                    }
                ],
                "skillCoveragePercent": 30
            },
            "growthRecommendations": [
                {
                    "priority": 1,
                    "category": "skill",
                    "title": "Learn TypeScript to depth",
                    "why": "TypeScript is a key skill for software development at Microsoft",
                    "howTo": "Take the TypeScript course on Microsoft Learn and practice building projects with TypeScript",
                    "estimatedImpact": "high",
                    "timeToAchieve": "2-3 months"
                },
                {
                    "priority": 2,
                    "category": "certification",
                    "title": "Get Azure Certified",
                    "why": "Azure is a key technology used at Microsoft",
                    "howTo": "Study for the Azure Certified: Azure Developer Associate exam and take the exam",
                    "estimatedImpact": "high",
                    "timeToAchieve": "3-6 months"
                }
            ],
            "quickWins": [
                "Fix the start date on your Backend Developer role at CodeSarthi (currently shows 2029, likely a typo)",
                "Remove duplicate LeetCode achievement — you have it listed twice word-for-word"
            ],
            "auditSummary": "This profile has a solid foundation, but there are several critical fields missing and content quality needs cleanup before applying. The biggest strength is the candidate's experience with Java, Spring Boot, and Python, but the most urgent thing to fix is the lack of relevant skills for the target role, such as TypeScript and Azure. With some focused effort on skill development and content refinement, this profile can become much stronger."
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
            return 1;
        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: "error in auditing"
            }))

            return 0;
        }
    }
    const strategy = async () => {
        try {


            if (DEV_MODE) {
                setStrategyData(mockStrategyData);
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
            return 1;
        } catch (err) {
            addToast(({
                type: "error",
                title: "Error",
                message: "error in auditing"
            }))

            return 0;
        }
    }





    useEffect(() => {
        const run = async () => {

            const result = await audit();
            if (result) {
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index === 0
                            ? { ...stage, status: "SUCCESS" }
                            : stage
                    )
                );
            } else {
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 0
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
            }

        }

        run();
    }, [])
    useEffect(() => {
        const run = async () => {
            const result = await strategy();
            if (result) {
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index === 1
                            ? { ...stage, status: "SUCCESS" }
                            : stage
                    )
                );
            } else {
                setResumePipelineStages(prev =>
                    prev.map((stage, index) =>
                        index >= 1
                            ? { ...stage, status: "REJECTED" }
                            : stage
                    )
                );
            }
        }

        run();
    }, [auditData])



    const [stageOpen, setStageOpen] = useState(null);

    return (
        <div className=" w-full flex flex-col justify-start  gap-5 px-2 items-center ">


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

                                        <div className="mt-7 px-2 grid grid-cols-2  gap-2">



                                            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                <span className=" text-black  text-md">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 512 512">
                                                            <path fill="#000" fillRule="evenodd" d="m384 85.334l85.333 85.333v256H42.666l-.001-232.67c10.098 15.352 24.215 33.107 42.667 48.165L85.333 384h341.333V181.334L373.333 128l-39.736.002c-5.44-10.653-14.584-26.49-27.734-42.668zM384 320v21.334H128V320zm0-64v21.334H256v-20.371q.811-.477 1.615-.963zM181.333 42.667C278.4 42.667 320 149.334 320 149.334S278.4 256 181.333 256S42.666 149.334 42.666 149.334s41.6-106.667 138.667-106.667m0 26.667c-61.29 0-97.067 57.066-108.299 80c11.232 22.933 47.008 80 108.3 80c61.29 0 97.066-57.067 108.298-80c-11.232-22.934-47.008-80-108.299-80m0 33.333c26.804 0 48.533 20.893 48.533 46.667c0 25.773-21.729 46.666-48.533 46.666S132.8 175.107 132.8 149.334c0-25.774 21.729-46.667 48.533-46.667m0 26.667c-11.487 0-20.8 8.954-20.8 20s9.313 20 20.8 20s20.8-8.955 20.8-20s-9.312-20-20.8-20"></path>
                                                        </svg>

                                                        Audit Summary :</p>

                                                    {auditData?.data?.data?.auditSummary}

                                                </span>



                                            </div>

                                            <div className="w-full bg-white/10 rounded-3xl flex">
                                                <div className="w-1/2 text-black bg-white px-3 py-3 rounded-3xl">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                            <path fill="#000" d="M7.375 21.025q-.9-.025-1.713-.462t-1.537-1.288q-1-1.2-1.562-2.862T2 13q0-2.075.788-3.9t2.137-3.175T8.1 3.788T12 3t3.9.8t3.175 2.175T21.213 9.2T22 13.175q0 1.925-.625 3.6T19.6 19.6q-.7.7-1.475 1.063t-1.575.362q-.45 0-.9-.112t-.9-.338l-1.4-.7q-.3-.15-.638-.225T12 19.575t-.712.075t-.638.225l-1.4.7q-.475.25-.937.363t-.938.087m6.038-6.612Q14 13.825 14 13q0-.2-.038-.4t-.112-.4l1.25-1.675q.25.325.438.687t.312.788h2.05q-.375-2.2-2.037-3.6T12 7T8.125 8.413T6.1 12h2.05q.35-1.35 1.425-2.175T12 9q.425 0 .8.075t.725.225l-1.275 1.725q-.05 0-.125-.013T12 11q-.825 0-1.412.588T10 13t.588 1.413T12 15t1.413-.587"></path>
                                                        </svg>

                                                        Audit Score :</p>



                                                    <div className="h-[200px] w-[200px] ml-2 mt-3 border border-l-black border-b-black border-transparent flex justify-around items-end">
                                                        <div className="h-full flex flex-col justify-end">

                                                            <span className="text-center ">{auditData?.data?.data?.overallHealthScore?.score || 0}</span>
                                                            <motion.div
                                                                initial={{ height: 0 }}
                                                                animate={{ height: `${auditData?.data?.data?.overallHealthScore?.score || 0}%` }}
                                                                transition={{ duration: 1, ease: "easeInOut", type: "spring" }}
                                                                // style={{
                                                                //     height: `${auditData?.data?.data?.overallHealthScore?.score || 0}%`
                                                                // }}
                                                                className="bg-black  flex items-center justify-center " ><span className="rotate-[270deg]  text-white font-extrabold">    SCORE</span>
                                                            </motion.div>

                                                        </div>
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `100%` }}
                                                            transition={{ duration: 1, ease: "easeInOut", type: "spring" }}

                                                            className=" flex flex-col justify-end">

                                                            <span className="text-center ">100</span>
                                                            <div className="bg-black  h-full font-extrabold flex items-center justify-center text-white px-3"><span className="rotate-[270deg]">IDEAL</span> </div>

                                                        </motion.div>

                                                    </div>



                                                </div>

                                                <div className="h-full flex px-4  flex-col items-start  justify-start py-5">
                                                    <p className="flex text-xl mb-1  items-center justify-start gap-2 font-extrabold">
                                                        Verdict : <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                                            {auditData?.data?.data?.overallHealthScore?.score >= 60 && <CheckCircle />}
                                                            {auditData?.data?.data?.overallHealthScore?.score < 60 && auditData?.data?.data?.overallHealthScore?.score >= 30 && <AlertTriangle />}
                                                            {auditData?.data?.data?.overallHealthScore?.score < 30 && auditData?.data?.data?.overallHealthScore?.score >= 0 && <XCircle />}
                                                        </span>

                                                    </p>
                                                    <p> {auditData?.data?.data?.overallHealthScore?.verdict}</p>

                                                </div>

                                            </div>
                                            <div className="w-full bg-white p-5 rounded-3xl">
                                                <h2 className="flex items-center gap-2 text-2xl font-bold mb-5 text-black">
                                                    {/* Your SVG */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"> <g fill="none"> <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path> <path fill="currentColor" d="M2.5 5A1.5 1.5 0 0 1 4 3.5h16a1.5 1.5 0 0 1 0 3H4A1.5 1.5 0 0 1 2.5 5M4 10.5a1.5 1.5 0 0 0 0 3h6a1.5 1.5 0 0 0 0-3zM2.5 19A1.5 1.5 0 0 1 4 17.5h1a1.5 1.5 0 0 1 0 3H4A1.5 1.5 0 0 1 2.5 19m10 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1-1.5-1.5M9 17.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 0 0-3zm8.5 1.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1-1.5-1.5m.446-10.323a1 1 0 0 0-1.892 0l-.13.378a3 3 0 0 1-1.869 1.87l-.378.129a1 1 0 0 0 0 1.892l.378.13a3 3 0 0 1 1.87 1.869l.129.378a1 1 0 0 0 1.892 0l.13-.378a3 3 0 0 1 1.869-1.87l.378-.129a1 1 0 0 0 0-1.892l-.378-.13a3 3 0 0 1-1.87-1.869z"></path> </g> </svg>
                                                    Content Issues
                                                </h2>

                                                <div className="space-y-5">
                                                    {auditData?.data?.data?.contentIssues?.map((issue, idx) => {
                                                        const severity = {
                                                            critical: {
                                                                bg: "bg-red-50",
                                                                badge: "bg-red-600 text-white",
                                                                border: "border-red-300",
                                                            },
                                                            warning: {
                                                                bg: "bg-yellow-50",
                                                                badge: "bg-yellow-500 text-black",
                                                                border: "border-yellow-300",
                                                            },
                                                            HIGH: {
                                                                bg: "bg-orange-50",
                                                                badge: "bg-orange-500 text-white",
                                                                border: "border-orange-300",
                                                            },
                                                            low: {
                                                                bg: "bg-green-50",
                                                                badge: "bg-green-500 text-white",
                                                                border: "border-green-300",
                                                            },
                                                        };

                                                        const style = severity[issue.severity] || severity.low;

                                                        return (
                                                            <div
                                                                key={idx}
                                                                className={`${style.bg} ${style.border} text-black border rounded-2xl p-5`}
                                                            >
                                                                {/* Header */}
                                                                <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
                                                                    <div className="flex gap-2 flex-wrap">
                                                                        <span className="px-3 py-1 bg-white rounded-full border text-sm font-semibold flex items-center gap-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                                                                <path fill="#000" d="M496 152a56 56 0 0 0-56-56H220.11a23.9 23.9 0 0 1-13.31-4L179 73.41A55.77 55.77 0 0 0 147.89 64H72a56 56 0 0 0-56 56v48a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8ZM16 392a56 56 0 0 0 56 56h368a56 56 0 0 0 56-56V216a8 8 0 0 0-8-8H24a8 8 0 0 0-8 8Z"></path>
                                                                            </svg> {issue.section}
                                                                        </span>

                                                                        <span className="px-3 py-1 bg-white rounded-full border text-sm flex items-center gap-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                                                <path fill="#000" d="M20 5H8.47c-.59 0-1.15.26-1.54.72l-4.7 5.64c-.31.37-.31.91 0 1.28l4.7 5.64c.38.46.94.72 1.54.72H20c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2"></path>
                                                                            </svg> {issue.field}
                                                                        </span>
                                                                    </div>

                                                                    <span
                                                                        className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${style.badge}`}
                                                                    >
                                                                        {issue.severity}
                                                                    </span>
                                                                </div>

                                                                {/* Issue */}
                                                                <div className="mb-4">
                                                                    <p className="font-semibold text-gray-700 mb-1">
                                                                        Issue
                                                                    </p>

                                                                    <div className="bg-white rounded-lg p-3 border">
                                                                        {issue.issue}
                                                                    </div>
                                                                </div>

                                                                {/* Flagged Text */}
                                                                <div className="mb-4">
                                                                    <p className="font-semibold text-gray-700 mb-1">
                                                                        Flagged Text
                                                                    </p>

                                                                    <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-red-700 font-medium italic">
                                                                        "{issue.flaggedText}"
                                                                    </div>
                                                                </div>

                                                                {/* Fix */}
                                                                <div>
                                                                    <p className="font-semibold text-gray-700 mb-1">
                                                                        Suggested Fix
                                                                    </p>

                                                                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-green-700">
                                                                        {issue.fix}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                <span className=" text-black  text-md">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                                                            <path fill="currentColor" d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"></path>
                                                        </svg>

                                                        Skill Gap Analysis :</p>

                                                    {skillGap && (
                                                        <div className="space-y-6">

                                                            {/* Coverage */}
                                                            <div className="bg-white p-4 rounded-xl ">
                                                                <h2 className="text-xl font-bold mb-2">Skill Coverage</h2>

                                                                <div className="w-full bg-gray-300 rounded-full h-4">
                                                                    <div
                                                                        className="bg-black h-4 rounded-full"
                                                                        style={{
                                                                            width: `${skillGap.skillCoveragePercent}%`,
                                                                        }}
                                                                    />
                                                                </div>

                                                                <p className="mt-2 font-semibold">
                                                                    {skillGap.skillCoveragePercent}%
                                                                </p>
                                                            </div>

                                                            {/* Required Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="text-lg font-bold mb-3">
                                                                    Required Skills
                                                                </h2>

                                                                <div className="flex flex-wrap gap-2">
                                                                    {skillGap.roleRequiresSkills.map((skill, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Candidate Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="text-lg font-bold mb-3">
                                                                    Your Skills
                                                                </h2>

                                                                <div className="flex flex-wrap gap-2">
                                                                    {skillGap.candidateHasSkills.map((skill, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Matched Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                                        <path fill="currentColor" d="m3 19l5.5-7L3 4.98h12.462L21 12l-.183.214q-.663-.326-1.369-.491T18 11.558q-2.708 0-4.613 1.867T11.442 18q0 .256.017.506t.072.494zm15 3.289q-1.748 0-2.96-1.213t-1.213-2.96t1.213-2.961T18 13.942t2.96 1.213t1.213 2.96t-1.213 2.961T18 22.288m-.629-2.461l2.84-2.796l-.626-.627l-2.214 2.182l-.955-.975l-.627.633z"></path>
                                                                    </svg>   Matched Skills
                                                                </h2>

                                                                <div className="flex flex-wrap gap-2">
                                                                    {skillGap.matchedSkills.map((skill, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Missing Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                                                                        <path fill="#000" fillRule="evenodd" d="m7.493.015l-.386.04c-1.873.187-3.76 1.153-5.036 2.579C.66 4.211-.057 6.168.009 8.253c.115 3.601 2.59 6.65 6.101 7.518a8.03 8.03 0 0 0 6.117-.98a8 8 0 0 0 3.544-4.904c.172-.701.212-1.058.212-1.887s-.04-1.186-.212-1.887C14.979 2.878 12.315.498 9 .064C8.716.027 7.683-.006 7.493.015m1.36 1.548a6.3 6.3 0 0 1 1.987.597c.698.34 1.18.686 1.747 1.253A6 6 0 0 1 13.84 5.16c.445.915.646 1.798.646 2.84a6.2 6.2 0 0 1-.66 2.867c-.172.351-.519.914-.681 1.105l-.055.065l-4.563-4.564L3.963 2.91l.065-.055c.191-.162.754-.509 1.105-.681a6.44 6.44 0 0 1 3.72-.611M7.48 8.534l4.56 4.561l-.067.053a7.7 7.7 0 0 1-1.106.68a6.8 6.8 0 0 1-1.987.616c-.424.065-1.336.065-1.76 0c-1.948-.296-3.592-1.359-4.627-2.993a7.5 7.5 0 0 1-.634-1.332a6.6 6.6 0 0 1-.189-3.584a6.8 6.8 0 0 1 1.096-2.388c.07-.095.133-.173.141-.173s2.065 2.052 4.573 4.56"></path>
                                                                    </svg> Missing Critical Skills
                                                                </h2>

                                                                <div className="space-y-3">
                                                                    {skillGap.missingCriticalSkills.map((item, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            className="border border-red-300 rounded-lg p-3"
                                                                        >
                                                                            <p>
                                                                                <strong>Skill:</strong> {item.skill}
                                                                            </p>

                                                                            <p>
                                                                                <strong>Importance:</strong>{" "}
                                                                                <span className="text-red-600 font-semibold">
                                                                                    {item.importance}
                                                                                </span>
                                                                            </p>

                                                                            <p>
                                                                                <strong>Reason:</strong> {item.reason}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Irrelevant Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="text-lg font-bold mb-3">
                                                                    Irrelevant Skills
                                                                </h2>

                                                                <div className="space-y-3">
                                                                    {skillGap.irrelevantSkills.map((item, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            className="border border-yellow-300 rounded-lg p-3"
                                                                        >
                                                                            <p>
                                                                                <strong>Skill:</strong> {item.skill}
                                                                            </p>

                                                                            <p>
                                                                                <strong>Suggestion:</strong> {item.suggestion}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}

                                                </span>



                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                    <span className=" text-black  text-md">
                                                        <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M9 18h5.5q.425 0 .788-.213t.512-.587l2.1-4.9q.05-.125.075-.25T18 11.8V11q0-.425-.288-.713T17 10h-4.6l.6-3.4q.05-.25-.025-.475t-.25-.4L12 5l-4.6 5q-.2.2-.3.45T7 11v5q0 .825.588 1.413T9 18m3 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
                                                            </svg>

                                                            Growth Recommendations :</p>

                                                        {auditData?.data?.data?.growthRecommendations?.map((bullet, idx) => {


                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className="mb-3  rounded-2xl"

                                                                >
                                                                    {/* Header */}
                                                                    <div className="flex flex-wrap gap-4 mb-3 px-3 py-2 bg-black/20 text-black rounded-2xl border border-gray-100">
                                                                        <div className="flex gap-1">
                                                                            <span className="font-semibold">Priorty:</span>
                                                                            <span>{bullet?.priority}</span>
                                                                        </div>
                                                                        <div className="flex gap-1">
                                                                            <span className="font-semibold">SECTION:</span>
                                                                            <span>{bullet?.category}</span>
                                                                        </div>

                                                                        <div className="flex gap-1">
                                                                            <span className="font-semibold">Title:</span>
                                                                            <span>{bullet?.title}</span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Body */}
                                                                    <div className="flex flex-col gap-2 px-3 text-black">
                                                                        <div className="flex gap-1">
                                                                            <span className="font-semibold">Why:</span>
                                                                            <span>{bullet?.why}</span>
                                                                        </div>

                                                                        <div className="flex gap-1">
                                                                            <span className="font-semibold">How:</span>
                                                                            <span>{bullet?.howTo}</span>
                                                                        </div>

                                                                        <div className="flex gap-1">
                                                                            <span className="font-semibold">Time Needed:</span>
                                                                            <span>{bullet?.timeToAchieve}</span>
                                                                        </div>
                                                                        <div className="flex gap-1">
                                                                            <span className="font-semibold">Impact:</span>
                                                                            <span>{bullet?.estimatedImpact}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                    </span>
                                                </div>
                                                <div className="w-full  bg-blue-300 px-3 py-3 rounded-3xl">

                                                    <span className=" text-black  text-md">
                                                        <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                                <path fill="#000" d="m12 8l3 5.2l3-2.7l-.7 3.5H6.7L6 10.5l3 2.7zm0-4l-3.5 6L3 5l2 11h14l2-11l-5.5 5zm7 14H5v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1z"></path>
                                                            </svg>

                                                            Quick Wins :</p>

                                                        {auditData?.data?.data?.quickWins.map((bullets, idx) => {
                                                            return (
                                                                <p key={idx}>

                                                                    {bullets}
                                                                </p>
                                                            )
                                                        })}

                                                    </span>
                                                </div>





                                            </div>

                                            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                <span className=" text-black  text-md">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 14 14">
                                                            <path fill="currentColor" fillRule="evenodd" d="M5.763 2.263A1.75 1.75 0 0 1 8.75 3.5h-3.5c0-.464.184-.91.513-1.237M3.75 3.5a3.25 3.25 0 0 1 6.5 0h1.25A2.5 2.5 0 0 1 14 6v5.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 0 11.5V6a2.5 2.5 0 0 1 2.5-2.5zm2.915 3.067A.875.875 0 1 1 7 8.25a.625.625 0 0 0-.625.625v1a.625.625 0 1 0 1.25 0v-.469a2.125 2.125 0 1 0-2.75-2.031a.625.625 0 1 0 1.25 0a.875.875 0 0 1 .54-.808m.337 6.308a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clipRule="evenodd"></path>
                                                        </svg>

                                                        Missing Fields :</p>

                                                    {auditData?.data?.data?.missingFields?.map((bullet, idx) => {


                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="mb-3  rounded-2xl"

                                                            >
                                                                {/* Header */}
                                                                <div className="flex flex-wrap gap-4 mb-3 px-3 py-2 bg-black/20 text-black rounded-2xl border border-gray-100">
                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Section:</span>
                                                                        <span>{bullet?.section}</span>
                                                                    </div>
                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Field:</span>
                                                                        <span>{bullet?.field}</span>
                                                                    </div>


                                                                </div>

                                                                {/* Body */}
                                                                <div className="flex flex-col gap-2 px-3 text-black">
                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Importance:</span>
                                                                        <span>{bullet?.importance}</span>
                                                                    </div>

                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Why It Matters:</span>
                                                                        <span>{bullet?.whyItMatters}</span>
                                                                    </div>



                                                                </div>
                                                            </div>
                                                        );
                                                    })}

                                                </span>
                                            </div>
                                            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                <span className=" text-black  text-md">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 14 14">
                                                            <path fill="currentColor" fillRule="evenodd" d="M5.763 2.263A1.75 1.75 0 0 1 8.75 3.5h-3.5c0-.464.184-.91.513-1.237M3.75 3.5a3.25 3.25 0 0 1 6.5 0h1.25A2.5 2.5 0 0 1 14 6v5.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 0 11.5V6a2.5 2.5 0 0 1 2.5-2.5zm2.915 3.067A.875.875 0 1 1 7 8.25a.625.625 0 0 0-.625.625v1a.625.625 0 1 0 1.25 0v-.469a2.125 2.125 0 1 0-2.75-2.031a.625.625 0 1 0 1.25 0a.875.875 0 0 1 .54-.808m.337 6.308a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clipRule="evenodd"></path>
                                                        </svg>

                                                        Data Inconsistencies :</p>

                                                    {auditData?.data?.data?.dataInconsistencies?.map((bullet, idx) => {


                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="mb-3  rounded-2xl"

                                                            >
                                                                {/* Header */}
                                                                <div className="flex flex-wrap gap-4 mb-3 px-3 py-2 bg-black/20 text-black rounded-2xl border border-gray-100">
                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Section:</span>
                                                                        <span>{bullet?.section}</span>
                                                                    </div>
                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Field:</span>
                                                                        <span>{bullet?.field}</span>
                                                                    </div>


                                                                </div>

                                                                {/* Body */}
                                                                <div className="flex flex-col gap-2 px-3 text-black">
                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Description:</span>
                                                                        <span>{bullet?.description}</span>
                                                                    </div>

                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Flagged Value:</span>
                                                                        <span>{bullet?.flaggedValue}</span>
                                                                    </div>
                                                                    <div className="flex gap-1">
                                                                        <span className="font-semibold">Suggested Fix:</span>
                                                                        <span>{bullet?.suggestedFix}</span>
                                                                    </div>



                                                                </div>
                                                            </div>
                                                        );
                                                    })}

                                                </span>
                                            </div>
                                        </div>

                                    }

                                    {idx === 1 && items?.status == "REJECTED" &&

                                        <div className="mt-7 px-2 grid grid-cols-2  gap-2">



                                            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                <span className=" text-black  text-md">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 512 512">
                                                            <path fill="#000" fillRule="evenodd" d="m384 85.334l85.333 85.333v256H42.666l-.001-232.67c10.098 15.352 24.215 33.107 42.667 48.165L85.333 384h341.333V181.334L373.333 128l-39.736.002c-5.44-10.653-14.584-26.49-27.734-42.668zM384 320v21.334H128V320zm0-64v21.334H256v-20.371q.811-.477 1.615-.963zM181.333 42.667C278.4 42.667 320 149.334 320 149.334S278.4 256 181.333 256S42.666 149.334 42.666 149.334s41.6-106.667 138.667-106.667m0 26.667c-61.29 0-97.067 57.066-108.299 80c11.232 22.933 47.008 80 108.3 80c61.29 0 97.066-57.067 108.298-80c-11.232-22.934-47.008-80-108.299-80m0 33.333c26.804 0 48.533 20.893 48.533 46.667c0 25.773-21.729 46.666-48.533 46.666S132.8 175.107 132.8 149.334c0-25.774 21.729-46.667 48.533-46.667m0 26.667c-11.487 0-20.8 8.954-20.8 20s9.313 20 20.8 20s20.8-8.955 20.8-20s-9.312-20-20.8-20"></path>
                                                        </svg>

                                                        Positioning Statement :</p>

                                                    {strategyData?.data?.data?.positioningStatement}

                                                </span>



                                            </div>

                                            <div className="w-full bg-white/10 rounded-3xl flex">
                                                <div className="w-1/2 text-black bg-white px-3 py-3 rounded-3xl">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                            <path fill="#000" d="M7.375 21.025q-.9-.025-1.713-.462t-1.537-1.288q-1-1.2-1.562-2.862T2 13q0-2.075.788-3.9t2.137-3.175T8.1 3.788T12 3t3.9.8t3.175 2.175T21.213 9.2T22 13.175q0 1.925-.625 3.6T19.6 19.6q-.7.7-1.475 1.063t-1.575.362q-.45 0-.9-.112t-.9-.338l-1.4-.7q-.3-.15-.638-.225T12 19.575t-.712.075t-.638.225l-1.4.7q-.475.25-.937.363t-.938.087m6.038-6.612Q14 13.825 14 13q0-.2-.038-.4t-.112-.4l1.25-1.675q.25.325.438.687t.312.788h2.05q-.375-2.2-2.037-3.6T12 7T8.125 8.413T6.1 12h2.05q.35-1.35 1.425-2.175T12 9q.425 0 .8.075t.725.225l-1.275 1.725q-.05 0-.125-.013T12 11q-.825 0-1.412.588T10 13t.588 1.413T12 15t1.413-.587"></path>
                                                        </svg>

                                                        Audit Score :</p>



                                                    <div className="h-[200px] w-[200px] ml-2 mt-3 border border-l-black border-b-black border-transparent flex justify-around items-end">
                                                        <div className="h-full flex flex-col justify-end">

                                                            <span className="text-center ">{auditData?.data?.data?.overallHealthScore?.score || 0}</span>
                                                            <motion.div
                                                                initial={{ height: 0 }}
                                                                animate={{ height: `${auditData?.data?.data?.overallHealthScore?.score || 0}%` }}
                                                                transition={{ duration: 1, ease: "easeInOut", type: "spring" }}
                                                                // style={{
                                                                //     height: `${auditData?.data?.data?.overallHealthScore?.score || 0}%`
                                                                // }}
                                                                className="bg-black  flex items-center justify-center " ><span className="rotate-[270deg]  text-white font-extrabold">    SCORE</span>
                                                            </motion.div>

                                                        </div>
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `100%` }}
                                                            transition={{ duration: 1, ease: "easeInOut", type: "spring" }}

                                                            className=" flex flex-col justify-end">

                                                            <span className="text-center ">100</span>
                                                            <div className="bg-black  h-full font-extrabold flex items-center justify-center text-white px-3"><span className="rotate-[270deg]">IDEAL</span> </div>

                                                        </motion.div>

                                                    </div>



                                                </div>

                                                <div className="h-full flex px-4  flex-col items-start  justify-start py-5">
                                                    <p className="flex text-xl mb-1  items-center justify-start gap-2 font-extrabold">
                                                        Verdict : <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                                            {auditData?.data?.data?.overallHealthScore?.score >= 60 && <CheckCircle />}
                                                            {auditData?.data?.data?.overallHealthScore?.score < 60 && auditData?.data?.data?.overallHealthScore?.score >= 30 && <AlertTriangle />}
                                                            {auditData?.data?.data?.overallHealthScore?.score < 30 && auditData?.data?.data?.overallHealthScore?.score >= 0 && <XCircle />}
                                                        </span>

                                                    </p>
                                                    <p> {auditData?.data?.data?.overallHealthScore?.verdict}</p>

                                                </div>

                                            </div>
                                            <div className="w-full bg-white p-5 rounded-3xl">

                                            </div>
                                            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                <span className=" text-black  text-md">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                                                            <path fill="currentColor" d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"></path>
                                                        </svg>

                                                        Skill Gap Analysis :</p>

                                                    {skillGap && (
                                                        <div className="space-y-6">

                                                            {/* Coverage */}
                                                            <div className="bg-white p-4 rounded-xl ">
                                                                <h2 className="text-xl font-bold mb-2">Skill Coverage</h2>

                                                                <div className="w-full bg-gray-300 rounded-full h-4">
                                                                    <div
                                                                        className="bg-black h-4 rounded-full"
                                                                        style={{
                                                                            width: `${skillGap.skillCoveragePercent}%`,
                                                                        }}
                                                                    />
                                                                </div>

                                                                <p className="mt-2 font-semibold">
                                                                    {skillGap.skillCoveragePercent}%
                                                                </p>
                                                            </div>

                                                            {/* Required Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="text-lg font-bold mb-3">
                                                                    Required Skills
                                                                </h2>

                                                                <div className="flex flex-wrap gap-2">
                                                                    {skillGap.roleRequiresSkills.map((skill, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Candidate Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="text-lg font-bold mb-3">
                                                                    Your Skills
                                                                </h2>

                                                                <div className="flex flex-wrap gap-2">
                                                                    {skillGap.candidateHasSkills.map((skill, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Matched Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                                        <path fill="currentColor" d="m3 19l5.5-7L3 4.98h12.462L21 12l-.183.214q-.663-.326-1.369-.491T18 11.558q-2.708 0-4.613 1.867T11.442 18q0 .256.017.506t.072.494zm15 3.289q-1.748 0-2.96-1.213t-1.213-2.96t1.213-2.961T18 13.942t2.96 1.213t1.213 2.96t-1.213 2.961T18 22.288m-.629-2.461l2.84-2.796l-.626-.627l-2.214 2.182l-.955-.975l-.627.633z"></path>
                                                                    </svg>   Matched Skills
                                                                </h2>

                                                                <div className="flex flex-wrap gap-2">
                                                                    {skillGap.matchedSkills.map((skill, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className="px-3 py-1 bg-black/10 border border-black/40  rounded-full"
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Missing Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="flex items-center gap-2 text-lg font-bold mb-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 16 16">
                                                                        <path fill="#000" fillRule="evenodd" d="m7.493.015l-.386.04c-1.873.187-3.76 1.153-5.036 2.579C.66 4.211-.057 6.168.009 8.253c.115 3.601 2.59 6.65 6.101 7.518a8.03 8.03 0 0 0 6.117-.98a8 8 0 0 0 3.544-4.904c.172-.701.212-1.058.212-1.887s-.04-1.186-.212-1.887C14.979 2.878 12.315.498 9 .064C8.716.027 7.683-.006 7.493.015m1.36 1.548a6.3 6.3 0 0 1 1.987.597c.698.34 1.18.686 1.747 1.253A6 6 0 0 1 13.84 5.16c.445.915.646 1.798.646 2.84a6.2 6.2 0 0 1-.66 2.867c-.172.351-.519.914-.681 1.105l-.055.065l-4.563-4.564L3.963 2.91l.065-.055c.191-.162.754-.509 1.105-.681a6.44 6.44 0 0 1 3.72-.611M7.48 8.534l4.56 4.561l-.067.053a7.7 7.7 0 0 1-1.106.68a6.8 6.8 0 0 1-1.987.616c-.424.065-1.336.065-1.76 0c-1.948-.296-3.592-1.359-4.627-2.993a7.5 7.5 0 0 1-.634-1.332a6.6 6.6 0 0 1-.189-3.584a6.8 6.8 0 0 1 1.096-2.388c.07-.095.133-.173.141-.173s2.065 2.052 4.573 4.56"></path>
                                                                    </svg> Missing Critical Skills
                                                                </h2>

                                                                <div className="space-y-3">
                                                                    {skillGap.missingCriticalSkills.map((item, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            className="border border-red-300 rounded-lg p-3"
                                                                        >
                                                                            <p>
                                                                                <strong>Skill:</strong> {item.skill}
                                                                            </p>

                                                                            <p>
                                                                                <strong>Importance:</strong>{" "}
                                                                                <span className="text-red-600 font-semibold">
                                                                                    {item.importance}
                                                                                </span>
                                                                            </p>

                                                                            <p>
                                                                                <strong>Reason:</strong> {item.reason}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Irrelevant Skills */}
                                                            <div className="bg-white p-4 rounded-xl shadow">
                                                                <h2 className="text-lg font-bold mb-3">
                                                                    Irrelevant Skills
                                                                </h2>

                                                                <div className="space-y-3">
                                                                    {skillGap.irrelevantSkills.map((item, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            className="border border-yellow-300 rounded-lg p-3"
                                                                        >
                                                                            <p>
                                                                                <strong>Skill:</strong> {item.skill}
                                                                            </p>

                                                                            <p>
                                                                                <strong>Suggestion:</strong> {item.suggestion}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}

                                                </span>



                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                    <span className=" text-black  text-md">
                                                        <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M9 18h5.5q.425 0 .788-.213t.512-.587l2.1-4.9q.05-.125.075-.25T18 11.8V11q0-.425-.288-.713T17 10h-4.6l.6-3.4q.05-.25-.025-.475t-.25-.4L12 5l-4.6 5q-.2.2-.3.45T7 11v5q0 .825.588 1.413T9 18m3 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
                                                            </svg>

                                                            Strengths To Amplify :</p>

                                                        {strategyData?.data?.data?.strengthsToAmplify?.map((bullet, idx) => {


                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className="mb-3  rounded-2xl"

                                                                >
                                                                    <span className="font-semibold text-gray-500">● </span>
                                                                    <span className="text-gray-500"> {bullet}</span>

                                                                </div>
                                                            );
                                                        })}

                                                    </span>
                                                </div>
                                                <div className="w-full  bg-blue-300 px-3 py-3 rounded-3xl">

                                                    <span className=" text-black  text-md">
                                                        <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                                <path fill="#000" d="m12 8l3 5.2l3-2.7l-.7 3.5H6.7L6 10.5l3 2.7zm0-4l-3.5 6L3 5l2 11h14l2-11l-5.5 5zm7 14H5v1c0 .6.4 1 1 1h12c.6 0 1-.4 1-1z"></path>
                                                            </svg>

                                                            Quick Wins :</p>

                                                        {auditData?.data?.data?.quickWins.map((bullets, idx) => {
                                                            return (
                                                                <p key={idx}>

                                                                    {bullets}
                                                                </p>
                                                            )
                                                        })}

                                                    </span>
                                                </div>





                                            </div>

                                            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                <span className=" text-black  text-md">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 14 14">
                                                            <path fill="currentColor" fillRule="evenodd" d="M5.763 2.263A1.75 1.75 0 0 1 8.75 3.5h-3.5c0-.464.184-.91.513-1.237M3.75 3.5a3.25 3.25 0 0 1 6.5 0h1.25A2.5 2.5 0 0 1 14 6v5.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 0 11.5V6a2.5 2.5 0 0 1 2.5-2.5zm2.915 3.067A.875.875 0 1 1 7 8.25a.625.625 0 0 0-.625.625v1a.625.625 0 1 0 1.25 0v-.469a2.125 2.125 0 1 0-2.75-2.031a.625.625 0 1 0 1.25 0a.875.875 0 0 1 .54-.808m.337 6.308a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5" clipRule="evenodd"></path>
                                                        </svg>

                                                        Core Narrative :</p>

                                                    {strategyData?.data?.data?.coreNarrative}



                                                </span>
                                            </div>
                                            <div className="w-full  bg-white px-3 py-3 rounded-3xl">

                                                <span className=" text-black  text-md">
                                                    <p className="flex text-xl mb-1 items-center justify-start gap-2 font-extrabold">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M9 18h5.5q.425 0 .788-.213t.512-.587l2.1-4.9q.05-.125.075-.25T18 11.8V11q0-.425-.288-.713T17 10h-4.6l.6-3.4q.05-.25-.025-.475t-.25-.4L12 5l-4.6 5q-.2.2-.3.45T7 11v5q0 .825.588 1.413T9 18m3 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path>
                                                        </svg>

                                                        Weaknesses To Downplay :</p>

                                                    {strategyData?.data?.data?.weaknessesToDownplay?.map((bullet, idx) => {


                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="mb-3  rounded-2xl"

                                                            >
                                                                <span className="font-semibold text-gray-500">● </span>
                                                                <span className="text-gray-500"> {bullet}</span>

                                                            </div>
                                                        );
                                                    })}

                                                </span>
                                            </div>
                                        </div>

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