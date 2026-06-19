import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";


const Scheduler = () => {




    const [stageOpen, setStageOpen] = useState(null);
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
                        <path fill="#fff" fillOpacity={0.16} d="M11 19a8 8 0 1 0 0-16a8 8 0 0 0 0 16"></path>
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="m21 21l-4-4m2-6a8 8 0 1 1-16 0a8 8 0 0 1 16 0"></path>
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
                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M.801 20.637a2.613 2.613 0 1 0 5.226 0a2.613 2.613 0 0 0-5.226 0m8.71-2.467h4.977v4.977H9.511zm13.688 4.977h-5.973l2.986-5.475zM15.733 4.585A3.733 3.733 0 1 0 10.507 8v1.811h2.986v-1.81a3.73 3.73 0 0 0 2.24-3.416M3.539 15.432v-2.488h16.922v2.488m-.686-10.203h1.493m-1.802 3.424l1.055 1.056m-1.055-7.903L20.521.75M4.225 5.229H2.732m1.802 3.424L3.478 9.709m1.056-7.903L3.478.75M12 9.811v5.124"></path>
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

            status: "LOADING",
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
                    <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                        <path d="M24 9h18M24 19h18M6 29h36M6 39h36"></path>
                        <circle cx={12} cy={14} r={5} fill="#fff"></circle>
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
                    <path d="M8 8L8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7L16 8" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.58579 7.58579C3 8.17157 3 9.11438 3 11V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V11C21 9.11438 21 8.17157 20.4142 7.58579C19.8284 7 18.8856 7 17 7H7C5.11438 7 4.17157 7 3.58579 7.58579ZM10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12V14C8 14.5523 8.44772 15 9 15C9.55228 15 10 14.5523 10 14V12ZM16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12V14C14 14.5523 14.4477 15 15 15C15.5523 15 16 14.5523 16 14V12Z" fill="#fff" />
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
                    <path fill="#fff" d="M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675l-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617l.968.968l-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96l2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46L4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242l.529.026l.287.445l.445.287l.026.529L5 13l-.242.471l-.026.529l-.445.287l-.287.445l-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471l.026-.529l.445-.287l.287-.445l.529-.026z"></path>
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

            status: "SUCCESS",
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
                    <path fill="#fff" fillRule="evenodd" d="M256 42.667A213.333 213.333 0 0 1 469.334 256c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667m21.334 234.667h-42.667c-52.815 0-98.158 31.987-117.715 77.648c30.944 43.391 81.692 71.685 139.048 71.685s108.104-28.294 139.049-71.688c-19.557-45.658-64.9-77.645-117.715-77.645M256 106.667c-35.346 0-64 28.654-64 64s28.654 64 64 64s64-28.654 64-64s-28.653-64-64-64"></path>
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

            status: "REJECTED",
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
                    <path fill="#fff" d="M11.983 21.462q-.978 0-1.664-.69t-.685-1.676q0-.84.534-1.49t1.332-.816v-2.478q-.39-.062-.717-.257t-.566-.491l-2.094 1.252q.064.173.095.363q.032.19.032.379q0 .985-.702 1.675t-1.68.69t-1.664-.689t-.685-1.673t.684-1.676t1.662-.693q.526 0 .983.207t.78.557l2.09-1.246q-.045-.164-.077-.347t-.032-.368q0-.183.032-.36t.095-.358l-2.088-1.213q-.323.369-.786.576q-.464.206-.997.206q-.977 0-1.662-.689T3.52 8.484t.685-1.676t1.664-.692t1.68.69t.702 1.675q0 .188-.022.377q-.022.188-.086.352l2.094 1.207q.239-.276.556-.469t.708-.254V7.196q-.798-.165-1.332-.818q-.533-.653-.533-1.493q0-.986.685-1.676t1.663-.69t1.68.69t.703 1.676q0 .84-.534 1.493t-1.332.818v2.518q.371.08.686.266q.314.186.553.462l2.138-1.219q-.063-.173-.095-.363t-.032-.38q0-.985.685-1.675t1.664-.69t1.68.69t.702 1.672t-.702 1.677t-1.683.692q-.518 0-.957-.206q-.439-.207-.762-.557l-2.144 1.219q.063.164.085.34q.023.175.023.358t-.032.352t-.076.333l2.144 1.27q.323-.35.762-.556q.44-.207.957-.207q.981 0 1.683.69q.702.688.702 1.672q0 .985-.702 1.677t-1.68.692t-1.664-.69t-.685-1.675q0-.198.032-.379t.095-.363l-2.12-1.252q-.238.296-.552.478q-.314.183-.705.264v2.485q.798.165 1.332.815t.533 1.49q0 .986-.702 1.676t-1.68.69m.007-1q.57 0 .972-.393t.403-.972q0-.58-.398-.973t-.986-.393q-.56 0-.953.403q-.393.402-.393.962t.393.963t.963.402m-6.116-3.538q.57 0 .972-.392q.403-.392.403-.972t-.398-.973t-.986-.394q-.56 0-.953.403q-.394.403-.394.963t.393.962q.394.403.963.403m12.23 0q.57 0 .973-.392t.403-.972t-.398-.973t-.987-.394q-.56 0-.953.403t-.393.963t.393.962t.963.403m-6.116-3.558q.57 0 .972-.392q.403-.392.403-.972t-.398-.973t-.986-.394q-.56 0-.953.403q-.394.403-.394.963t.394.962t.962.403M5.875 9.846q.57 0 .972-.392q.403-.392.403-.972t-.398-.973q-.398-.394-.986-.394q-.56 0-.953.403q-.394.403-.394.963t.393.962q.394.403.963.403m12.23 0q.57 0 .973-.392t.403-.972t-.398-.973q-.398-.394-.987-.394q-.56 0-.953.403t-.393.963t.393.962t.963.403M11.99 6.25q.57 0 .973-.392t.403-.972t-.399-.973q-.398-.394-.986-.394q-.56 0-.953.403t-.393.963t.393.962t.963.403"></path>
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
                    <path fill="#fff" d="M14 2.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-4.47 4.47a.75.75 0 0 1-1.06 0L8.5 6.56l-4.22 4.22a.75.75 0 1 1-1.06-1.06l4.75-4.75a.75.75 0 0 1 1.06 0l2.47 2.47l3.94-3.94h-.69a.75.75 0 0 1-.75-.75M3.75 14a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75m4.75-2.25a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0zM11.75 13a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75m4.75-3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0z"></path>
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
    return (
        <div className="min-h-screen w-full flex flex-col justify-start pt-24 gap-5 px-2 items-center bg-black">

            {/* make a responsive grid of 4 in md and 2 in sm */}

            {RESUME_PIPELINE_STAGES.map((items, idx) => {
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

                    className="w-[80%]  bg-white/20 border border-white/25 rounded-2xl flex flex-col items-center justify-center overflow-hidden"  >
                    {/* loading status */}


                    <div className="flex w-full relative top-4 justify-between px-5 items-center">
                        <div className="flex gap-2">
                            <span className=" border-white">
                                {items.status === "HOLD" && (

                                    <svg

                                        xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#fff" strokeWidth={1.5}>
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
                                {items.status === "SUCCESS" && (

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

                                {items.status === "REJECTED" && (


                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 21 21">
                                        <g fill="none" fillRule="evenodd" stroke="#ff5d5d" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)">
                                            <circle cx={8.5} cy={8.5} r={8}></circle>
                                            <path d="m5.5 5.5l6 6m0-6l-6 6"></path>
                                        </g>
                                    </svg>

                                )}
                                {items.status === "LOADING" && (


                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                        <path fill="#fff" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity={0.5}></path>
                                        <path fill="#fff" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                                            <animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform>
                                        </path>
                                    </svg>

                                )}
                            </span>

                            <span className="ml-6"> - </span>
                            <span className="ml-3 border py-1 px-3 rounded-full bg-white/20 border-white/30 relative bottom- ">STAGE : {items.stageNumber}</span>
                            <span className="ml-3"> - </span>
                            {/* Name and the title about the stage */}
                            <span className="ml-6">{items.icon}</span>
                            <span className="ml-3">{items.name}</span>
                        </div>

                        {/* description */}

                        {/* arrow down button */}
                        <span>
                            {stageOpen === idx ? <svg className="rotate-[270deg] transition-all duration-3000" xmlns="http://www.w3.org/2000/svg" width="0.8em" viewBox="0 0 12 24">
                                <path fill="#fff" fillRule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"></path>
                            </svg> : <svg className="rotate-[90deg] transition-all duration-3000" xmlns="http://www.w3.org/2000/svg" width="0.8em" viewBox="0 0 12 24">
                                <path fill="#fff" fillRule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"></path>
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
                                <div className="bg-white h-[200px] mt-6">
                                    Content
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>)
            })}







        </div >
    );
};

export default Scheduler;