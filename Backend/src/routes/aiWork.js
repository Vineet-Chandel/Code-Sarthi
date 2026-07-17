const express = require("express");
const aiWorkRouter = express.Router();
const User = require("../models/user");
const resume = require("../models/ResumeProfileSchema");
const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
const { userAuth } = require("../middlewares/userAuth");
const JSON_SYSTEM_PROMPT = `
You are a JSON API.

CRITICAL RULES:
- Return ONLY valid JSON
- Never return markdown
- Never use code fences
- Never explain anything
- Never add introductory text
- Never add trailing text
- Output must be directly parseable using JSON.parse()
`;
const buildJobDescriptionPrompt = ({ specificRole, company, resumeCategory, broadCategory, userContext }) => `
You are an expert technical recruiter who has written thousands of job descriptions for top-tier tech companies.

Your job is to generate a realistic, detailed, ATS-optimized job description for the given role.
The output will be used to tailor a candidate's resume — so the JD must reflect what hiring managers ACTUALLY look for, not generic boilerplate.

## ROLE DETAILS
- Job Title: ${specificRole}
- Company: ${company ?? "Not specified — write for a mid-to-large product company"}
- Resume Category: ${resumeCategory}
- Broad Role Type: ${broadCategory}
${userContext ? `- Additional Context: ${userContext}` : ""}

---

## YOUR TASK

Return ONLY a valid JSON object. No prose. No markdown fences.

{
  "jobTitle": "exact job title as it would appear on the posting",
  
  "companySummary": "2–3 sentences about the company type, culture, and engineering environment. If company is known, be specific. If not, write for a typical product-led tech company hiring for this role.",

  "roleSummary": "3–4 sentences describing what this person does day-to-day. Be concrete — not 'you will work on challenging problems' but 'you will own the backend services powering our payments API, collaborate with product on feature scoping, and drive architecture decisions for our microservices migration.'",

  "responsibilities": [
    "Specific responsibility 1 — written as it appears in real JDs, starting with a verb",
    "Specific responsibility 2",
    "Specific responsibility 3",
    "Specific responsibility 4",
    "Specific responsibility 5",
    "Specific responsibility 6",
    "Specific responsibility 7"
  ],

  "requiredSkills": [
    {
      "skill": "skill name",
      "importance": "critical | preferred",
      "context": "one line on how this skill is used in this role specifically"
    }
  ],

  "niceToHaveSkills": [
    "skill or experience that is a bonus but not required"
  ],

  "experienceLevel": {
    "yearsOfExperience": "e.g. '2–4 years' or '5+ years'",
    "seniorityLabel": "e.g. 'Mid-level', 'Senior', 'Lead'",
    "educationExpectation": "e.g. 'BTech/BE in CS or equivalent practical experience'"
  },

  "keywordsForATS": [
    "exact keyword strings that ATS systems scan for in this role — include both spelled-out and abbreviated forms where relevant"
  ],

  "interviewFocus": [
    {
      "area": "e.g. 'System Design'",
      "whatTheyTest": "what specifically they probe in this area for this role"
    }
  ],

  "redFlagsForThisRole": [
    "things in a candidate profile that would immediately disqualify or concern a hiring manager for this specific role"
  ],

  "compensationSignals": {
    "typicalRange": "e.g. '₹18–28 LPA for India, $130–160k for US' — be realistic for the role level and company type",
    "equityLikely": true,
    "note": "any relevant note about comp structure for this role type"
  }
}
`;


function parseAIResponse(completion) {
  const rawText = completion?.choices?.[0]?.message?.content;

  if (!rawText || rawText.trim() === "") {
    console.error(
      "Empty AI response:",
      JSON.stringify(completion, null, 2)
    );

    throw new Error(
      `AI returned empty content. finish_reason: ${completion?.choices?.[0]?.finish_reason ?? "unknown"
      }`
    );
  }

  const cleanedText = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleanedText);
  } catch (err) {
    throw new Error(
      `AI returned invalid JSON.\n${err.message}\n\nRaw Response:\n${cleanedText}`
    );
  }
}
// ─── STAGE 2A — SUMMARY REWRITE ──────────────────────────────────────────────
const buildSummaryPrompt = ({ profile, strategy }) => `
You are an expert resume writer specializing in ${strategy.toneGuidance?.overall ?? "professional"} resumes.

Your ONLY job is to rewrite the professional summary section of this resume.
Do NOT rewrite anything else. Do NOT explain your choices. Return only the JSON object.

## STRATEGY CONTEXT
Positioning Statement: ${strategy.positioningStatement}
Core Narrative: ${strategy.coreNarrative}
Open With: ${strategy.summaryStrategy?.openWith}
Keywords to Frontload: ${strategy.summaryStrategy?.keywordsToFrontload?.join(", ")}
Tone Instruction: ${strategy.summaryStrategy?.toneInstruction}
Avoid: ${strategy.summaryStrategy?.avoid?.join(" | ")}
Must Include Keywords: ${strategy.mustIncludeKeywords?.join(", ")}
Tone Guidance: ${strategy.toneGuidance?.verbStyle}
Formality: ${strategy.toneGuidance?.formality}

## ORIGINAL SUMMARY
Title: ${profile.header?.summaryTitle}
Body: ${profile.summaryBody}

## FULL PROFILE CONTEXT (for grounding — do not invent claims not present here)
Name: ${profile.header?.fname} ${profile.header?.lname}
Experience: ${JSON.stringify(profile.experience)}
Projects: ${JSON.stringify(profile.projects)}
Skills: ${JSON.stringify(profile.skills)}
Education: ${JSON.stringify(profile.education)}
Achievements: ${JSON.stringify(profile.achievements)}

## RULES
- 2–3 sentences MAX. No bullet points. No lists.
- Open with the strongest proof point from their real experience — not a generic opener
- Do NOT start with "I"
- Embed 3–5 must-include keywords naturally — never stuff them
- Do NOT mention any keywords from this list: ${strategy.keywordsToAvoid?.join(", ")}
- Every claim must be traceable to the profile data above — no invented achievements
- Sound like a human wrote it for this specific person, not a template
- Align the title to the target role — not the original title if it doesn't match
- Don't use the projects , experience or education or the skills name in the summary 

Return ONLY this JSON shape:
{
  "summaryTitle": "rewritten title aligned to target role",
  "summaryBody": "rewritten 3–4 sentence summary"
}
`;


// ─── STAGE 2B — EXPERIENCE BULLETS REWRITE ───────────────────────────────────
const buildExperiencePrompt = ({ experienceEntry, roleStrategy, strategy }) => `
You are an expert resume writer specializing in ${strategy.toneGuidance?.overall ?? "professional"} resumes.

Your ONLY job is to rewrite the bullet points for ONE experience entry.
Do NOT rewrite any other section. Do NOT explain anything. Return only the JSON object.

## STRATEGY CONTEXT
General Experience Instruction: ${strategy.experienceStrategy?.general}
Role-Specific Instruction: ${roleStrategy?.instruction ?? strategy.experienceStrategy?.general}
Relevance to Target: ${roleStrategy?.relevanceToTarget ?? "medium"}
Must Include Keywords: ${strategy.mustIncludeKeywords?.join(", ")}
Nice to Include Keywords: ${strategy.niceToIncludeKeywords?.join(", ")}
Tone: ${strategy.toneGuidance?.overall}
Verb Style: ${strategy.toneGuidance?.verbStyle}
Formality: ${strategy.toneGuidance?.formality}
Red Flags to Avoid: ${strategy.redFlagsToAddress?.join(" | ")}

## EXPERIENCE ENTRY TO REWRITE
Role: ${experienceEntry.role}
Company: ${experienceEntry.company}
Location: ${experienceEntry.location}
Employment Type: ${experienceEntry.employmentType}
Start Date: ${experienceEntry.startDate}
End Date: ${experienceEntry.endDate}
Currently Working: ${experienceEntry.currentlyWorking}

Original Bullets:
${experienceEntry.bullets?.map((b, i) => `${i + 1}. ${b}`).join("\n")}

## RULES
- Return EXACTLY ${experienceEntry.bullets?.length} bullets — same count as original
- Start EVERY bullet with a strong action verb — vary them, never repeat the same verb twice
- Format: [Action Verb] + [what you built/did] + [measurable result or impact]
- Preserve real metrics — if a metric exists in the original, keep it or soften it if implausible
- Do NOT invent new metrics that don't exist in the original bullets
- Embed 1–2 target keywords per bullet naturally — never forced
- Do NOT use: leveraged, utilized, synergized, assisted, helped, worked on
- Do NOT reference dates in the bullets — dates are in the header fields
- If relevance to target is "low" — still rewrite cleanly but don't over-engineer keyword placement

Return ONLY this JSON shape:
{
  "company": "${experienceEntry.company}",
  "role": "${experienceEntry.role}",
  "bullets": ["rewritten bullet 1", "rewritten bullet 2", ...]
}
`;


// ─── STAGE 2C — PROJECTS BULLETS REWRITE ─────────────────────────────────────
const buildProjectPrompt = ({ project, projectStrategy, strategy }) => `
You are an expert resume writer specializing in ${strategy.toneGuidance?.overall ?? "professional"} resumes.

Your ONLY job is to rewrite the bullet points for ONE project entry.
Do NOT rewrite any other section. Do NOT explain anything. Return only the JSON object.

## STRATEGY CONTEXT
General Project Instruction: ${strategy.projectStrategy?.general}
Project-Specific Instruction: ${projectStrategy?.instruction ?? strategy.projectStrategy?.general}
Relevance to Target: ${projectStrategy?.relevanceToTarget ?? "medium"}
Must Include Keywords: ${strategy.mustIncludeKeywords?.join(", ")}
Nice to Include Keywords: ${strategy.niceToIncludeKeywords?.join(", ")}
Tone: ${strategy.toneGuidance?.overall}
Verb Style: ${strategy.toneGuidance?.verbStyle}
Red Flags to Avoid: ${strategy.redFlagsToAddress?.join(" | ")}

## PROJECT ENTRY TO REWRITE
Name: ${project.name}
Stack: ${project.stack}
GitHub: ${project.github}
Live: ${project.live}
Description: ${project.description}

Original Bullets:
${project.bullets?.map((b, i) => `${i + 1}. ${b}`).join("\n")}

## RULES
- Maximum 4 bullets — trim the weakest if original has more
- If description contains placeholder or gibberish text, IGNORE it entirely — work from bullets only
- Lead with the most impressive technical decision, architecture choice, or measurable outcome
- Make the tech stack appear organically inside bullets — do NOT just list it
- Ground every claim in the original bullet data — no hallucinated metrics
- Start every bullet with a strong action verb
- Embed 1–2 target keywords per bullet naturally
- Surface architecture, scale decisions, and engineering judgment — not just task descriptions
- Do NOT use: leveraged, utilized, built using, worked on, responsible for

Return ONLY this JSON shape:
{
  "name": "${project.name}",
  "bullets": ["rewritten bullet 1", "rewritten bullet 2", ...]
}
`;


// ─── STAGE 2D — SKILLS CURATION ──────────────────────────────────────────────
const buildSkillsPrompt = ({ profile, strategy }) => `
You are an expert resume writer and ATS optimization specialist.

Your ONLY job is to curate and reorganize the skills section of this resume for maximum ATS signal for the target role.
Do NOT rewrite any other section. Do NOT explain anything. Return only the JSON object.

## STRATEGY CONTEXT
Target Role Keywords: ${strategy.mustIncludeKeywords?.join(", ")}
Nice to Include: ${strategy.niceToIncludeKeywords?.join(", ")}
Skills to Keep: ${strategy.skillsStrategy?.skillsToKeep?.join(", ")}
Skills to Remove: ${strategy.skillsStrategy?.skillsToRemove?.join(", ")}
Skills to Surface: ${strategy.skillsStrategy?.skillsToSurface?.join(", ")}
Categories to Use: ${strategy.skillsStrategy?.categoriesToUse?.join(", ")}
Order By: ${strategy.skillsStrategy?.orderBy}

## CURRENT SKILLS SECTION
${JSON.stringify(profile.skills)}

## EXPERIENCE BULLETS (source of truth for surfacing implied skills)
${JSON.stringify(profile.experience?.map(e => ({ role: e.role, company: e.company, bullets: e.bullets })))}

## PROJECT BULLETS (secondary source for implied skills)
${JSON.stringify(profile.projects?.map(p => ({ name: p.name, stack: p.stack, bullets: p.bullets })))}

## RULES
- Use ONLY the category names from the strategy: ${strategy.skillsStrategy?.categoriesToUse?.join(", ")}
- Remove every skill in the "skills to remove" list — they dilute ATS signal for this role
- Surface implied skills ONLY if they appear explicitly in experience or project bullets above
- Do NOT add skills that cannot be verified from the profile data above
- Order categories by relevance to the target role — most important first
- Within each category, order skills by relevance to the target role — most important first
- Eliminate redundant entries (e.g. "Node.js" and "NodeJS" — keep one)
- Optimize for ATS keyword matching AND clean human readability

Return ONLY this JSON shape:
{
  "skills": [
    {
      "skillCategory": "category name",
      "skills": ["skill1", "skill2", "skill3"]
    }
  ]
}
`;

// ─── STAGE 3B — COHERENCE CHECK (optional, runs after assembly) ───────────────
const buildCoherencePrompt = ({ tailoredProfile, strategyResult }) => `
You are a senior resume reviewer doing a final quality check before a resume is sent to a hiring manager.

The resume has already been rewritten by specialized AI rewriters. Your job is NOT to rewrite anything.
Your job is to check whether the assembled resume tells a coherent, consistent story for the target role.

## TARGET
Role: ${tailoredProfile._tailoringMeta?.targetRole}
Company: ${tailoredProfile._tailoringMeta?.company}
Version: ${tailoredProfile._tailoringMeta?.versionLabel}
Positioning: ${strategyResult.positioningStatement}

## ASSEMBLED RESUME
Summary Title: ${tailoredProfile.summaryTitle}
Summary Body: ${tailoredProfile.summaryBody}

Experience Bullets:
${tailoredProfile.Experience?.map(e =>
  `${e.role} @ ${e.company}:\n${e.bullets?.map(b => `  - ${b}`).join("\n")}`
).join("\n\n")}

Projects:
${tailoredProfile.Project?.map(p =>
  `${p.name} (${p.stack}):\n${p.bullets?.map(b => `  - ${b}`).join("\n")}`
).join("\n\n")}

Skills:
${tailoredProfile.Skills?.map(s =>
  `${s.skillCategory}: ${s.skills?.join(", ")}`
).join("\n")}

---

## YOUR TASK

Check for coherence issues ONLY. Do not rewrite. Flag problems and score the final output.

Return ONLY valid JSON:

{
  "coherenceScore": 85,

  "isReadyToSend": true,

  "summaryAligned": true,

  "issues": [
    {
      "severity": "critical | warning | suggestion",
      "section": "summary | experience | projects | skills",
      "issue": "specific problem — e.g. summary mentions TypeScript but it does not appear anywhere in experience or skills",
      "fix": "specific fix without rewriting — e.g. add TypeScript to skills under Languages or remove the mention from summary"
    }
  ],

  "keywordConsistency": {
    "appearsInSummary": ["keywords confirmed present in summary"],
    "appearsInExperience": ["keywords confirmed present in experience bullets"],
    "appearsInProjects": ["keywords confirmed present in project bullets"],
    "appearsInSkills": ["keywords confirmed present in skills section"],
    "missingEverywhere": ["must-include keywords from strategy that appear nowhere in the resume"]
  },

  "toneConsistency": "consistent | inconsistent — one line on whether the tone is uniform across all sections",

  "overallVerdict": "2 sentences max — is this resume ready to send, and what is the single most important thing still wrong if anything"
}
`;


// ─── STAGE 4 — SKILL GAP ANALYSIS ────────────────────────────────────────────
const buildSkillGapPrompt = ({
  tailoredProfile,
  originalAuditGap,
  SpecificRole,
  ResumeType,
  Company,
  JobDescription
}) => `
You are a senior technical recruiter and ATS systems expert.

Your job is to run a precise skill gap analysis comparing a candidate's TAILORED resume
against the requirements of a specific target role.

This analysis runs AFTER the resume has been rewritten — so you are evaluating the
final tailored version, not the raw profile. Compare against the pre-rewrite audit
gap to show improvement delta.

## TARGET ROLE
- Specific Role: ${SpecificRole}
- Resume Category: ${ResumeType}
- Company: ${Company ?? "Not specified"}
- Job Description:
${JobDescription ? `"""${JobDescription}"""` : "Not provided. Infer from role and company."}

## TAILORED RESUME CONTENT

Summary:
${tailoredProfile.summaryBody}

Experience Bullets:
${tailoredProfile.experience?.map(e =>
  `${e.role} @ ${e.company}:\n${e.bullets?.map(b => `  - ${b}`).join("\n")}`
).join("\n\n")}

Projects:
${tailoredProfile.projects?.map(p =>
  `${p.name} (${p.stack}):\n${p.bullets?.map(b => `  - ${b}`).join("\n")}`
).join("\n\n")}

Explicit Skills:
${tailoredProfile.skills?.map(s =>
  `${s.skillCategory}: ${s.skills?.join(", ")}`
).join("\n")}

## PRE-REWRITE SKILL GAP (from audit — use for delta comparison)
Pre-rewrite coverage: ${originalAuditGap?.skillCoveragePercent ?? "unknown"}%
Pre-rewrite matched skills: ${originalAuditGap?.matchedSkills?.join(", ") ?? "unknown"}
Pre-rewrite missing critical: ${originalAuditGap?.missingCriticalSkills?.map(s => s.skill).join(", ") ?? "unknown"}

---

## YOUR TASK

Return ONLY valid JSON. No prose. No markdown fences.

{
  "roleRequiresSkills": [
    "complete list of skills this role typically requires — inferred from role, company, and JD"
  ],

  "candidateHasSkills": [
    "skills confirmed present in the TAILORED resume — from explicit skills section AND naturally mentioned in bullets"
  ],

  "matchedSkills": [
    "skills the candidate has that directly match role requirements"
  ],

  "missingCriticalSkills": [
    {
      "skill": "skill name",
      "importance": "critical | preferred",
      "reason": "why this skill matters for this specific role and company",
      "howToAcquire": "specific actionable path — e.g. 'Build a TypeScript project using the official docs, then add it to CodeSarthi'"
    }
  ],

  "missingPreferredSkills": [
    {
      "skill": "skill name",
      "importance": "preferred",
      "reason": "why this would strengthen the application"
    }
  ],

  "irrelevantSkills": [
    {
      "skill": "skill still present in resume that adds no ATS signal for this role",
      "suggestion": "remove from this version or deprioritize"
    }
  ],

  "skillCoveragePercent": 65,

  "delta": {
    "coverageBefore": ${originalAuditGap?.skillCoveragePercent ?? 0},
    "coverageAfter": 0,
    "improvement": 0,
    "newlyMatchedSkills": ["skills that were missing before rewrite but now appear in the tailored resume"],
    "stillMissing": ["skills that were missing before AND still missing after rewrite"]
  },

  "atsScanSimulation": {
    "estimatedATSPassRate": 72,
    "keywordsFoundByATS": ["keywords an ATS would extract from this resume"],
    "keywordsNotFound": ["role-critical keywords an ATS would NOT find in this resume"],
    "recommendation": "one concrete sentence on the single highest-impact change left to make"
  },

  "skillsStrengthMap": [
    {
      "skill": "skill name",
      "presentIn": ["summary", "experience", "projects", "skills"],
      "strength": "strong | moderate | weak",
      "note": "brief note — e.g. 'appears in 3 experience bullets with metrics' or 'only listed in skills, no context'"
    }
  ]
}
`;

// ─── STAGE 5 — GROWTH RECOMMENDATIONS ────────────────────────────────────────
const buildGrowthPrompt = ({
  tailoredProfile,
  skillGapResult,
  auditResult,
  coherenceResult,
  SpecificRole,
  ResumeType,
  Company,
  JobDescription,
}) => `
You are an elite career coach and technical mentor with deep expertise in ${ResumeType} hiring.

Your job is to generate a highly personalized, role-specific 30–90 day growth plan
for this candidate based on everything known about their profile, the target role,
their skill gaps, and the quality of their tailored resume.

This is NOT generic career advice.
Every recommendation must be tied to a specific gap, inconsistency, or opportunity
found in the data below. Name real resources. Give real timelines. Be a mentor,
not a content generator.

## TARGET
- Specific Role: ${SpecificRole}
- Resume Category: ${ResumeType}
- Company: ${Company ?? "Not specified"}
- Job Description:
${JobDescription ? `"""${JobDescription}"""` : "Not provided. Infer from role and company."}

## CANDIDATE PROFILE SNAPSHOT
Summary: ${tailoredProfile.summaryBody}
Current Role: ${tailoredProfile.experience?.[0]?.role ?? "Not specified"} @ ${tailoredProfile.experience?.[0]?.company ?? "Not specified"}
Education: ${tailoredProfile.education?.[0]?.degree ?? ""} in ${tailoredProfile.education?.[0]?.field ?? ""} from ${tailoredProfile.education?.[0]?.institution ?? ""}
Certifications: ${tailoredProfile.certifications?.map(c => c.about).join(", ") || "None"}

## SKILL GAP DATA (from Stage 4)
Coverage After Rewrite: ${skillGapResult?.skillCoveragePercent ?? 0}%
Coverage Before Rewrite: ${skillGapResult?.delta?.coverageBefore ?? 0}%
Improvement Delta: ${skillGapResult?.delta?.improvement ?? 0}%

Missing Critical Skills:
${skillGapResult?.missingCriticalSkills?.map(s =>
  `- ${s.skill} (${s.importance}): ${s.reason}`
).join("\n") ?? "None"}

Missing Preferred Skills:
${skillGapResult?.missingPreferredSkills?.map(s =>
  `- ${s.skill}: ${s.reason}`
).join("\n") ?? "None"}

Still Missing After Rewrite:
${skillGapResult?.delta?.stillMissing?.join(", ") ?? "None"}

ATS Pass Rate Estimate: ${skillGapResult?.atsScanSimulation?.estimatedATSPassRate ?? 0}%
ATS Keywords Not Found: ${skillGapResult?.atsScanSimulation?.keywordsNotFound?.join(", ") ?? "None"}

## AUDIT ISSUES (from Stage 0 — unresolved problems)
Health Score: ${auditResult?.overallHealthScore?.score ?? 0}/100
Content Issues: ${auditResult?.contentIssues?.map(i => `${i.field} (${i.severity}): ${i.issue}`).join(" | ") ?? "None"}
Missing Fields: ${auditResult?.missingFields?.map(f => `${f.section}.${f.field} (${f.importance})`).join(", ") ?? "None"}
Quick Wins Flagged: ${auditResult?.quickWins?.join(" | ") ?? "None"}

## COHERENCE CHECK (from Stage 3b — if available)
Coherence Score: ${coherenceResult?.coherenceScore ?? "Not run"}
Is Ready to Send: ${coherenceResult?.isReadyToSend ?? "Unknown"}
Remaining Issues: ${coherenceResult?.issues?.map(i => i.issue).join(" | ") ?? "None"}
Missing Keywords Everywhere: ${coherenceResult?.keywordConsistency?.missingEverywhere?.join(", ") ?? "None"}

---

## YOUR TASK

Return ONLY valid JSON. No prose. No markdown fences.

{
  "overallReadinessScore": {
    "score": 74,
    "outOf": 100,
    "label": "Nearly Ready | e.g. 'Resume is strong but 2 critical skill gaps remain before applying'",
    "breakdown": {
      "resumeQuality": 85,
      "skillCoverage": 67,
      "profileCompleteness": 70,
      "atsReadiness": 72
    }
  },

  "thirtyDayPlan": [
    {
      "priority": 1,
      "category": "skill | certification | project | portfolio | profile | networking",
      "title": "Short punchy title — e.g. 'Build a TypeScript project end-to-end'",
      "why": "Exactly why this matters for THIS role at THIS company — not generic. Reference the specific gap or issue.",
      "howTo": [
        "Step 1 — specific and actionable. Name the resource, the approach, the deliverable.",
        "Step 2",
        "Step 3"
      ],
      "resource": {
        "name": "e.g. 'TypeScript Official Docs — Handbook'",
        "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
        "type": "docs | course | book | repo | platform | community"
      },
      "estimatedImpact": "high | medium | low",
      "timeToAchieve": "e.g. '1 week', '2 weeks'",
      "successMetric": "how the candidate knows they have completed this — e.g. 'Can build a typed Express API with interfaces, generics, and error handling without referencing docs'"
    }
  ],

  "sixtyDayPlan": [
    {
      "priority": 1,
      "category": "skill | certification | project | portfolio | profile | networking",
      "title": "Title",
      "why": "Why this matters at this stage",
      "howTo": ["Step 1", "Step 2"],
      "resource": {
        "name": "Resource name",
        "url": "https://...",
        "type": "docs | course | book | repo | platform | community"
      },
      "estimatedImpact": "high | medium | low",
      "timeToAchieve": "e.g. '2–3 weeks'",
      "successMetric": "How they know they're done"
    }
  ],

  "ninetyDayPlan": [
    {
      "priority": 1,
      "category": "skill | certification | project | portfolio | profile | networking",
      "title": "Title",
      "why": "Why this matters at this stage",
      "howTo": ["Step 1", "Step 2"],
      "resource": {
        "name": "Resource name",
        "url": "https://...",
        "type": "docs | course | book | repo | platform | community"
      },
      "estimatedImpact": "high | medium | low",
      "timeToAchieve": "e.g. '3–4 weeks'",
      "successMetric": "How they know they're done"
    }
  ],

  "quickWinsToday": [
    {
      "action": "Specific one-liner the candidate can do in under 30 minutes — e.g. 'Add Node.js and Express.js to the Languages and Frameworks skill category — both appear in your experience bullets but are missing from explicit skills'",
      "impact": "high | medium | low",
      "timeRequired": "e.g. '5 minutes', '20 minutes'"
    }
  ],

  "interviewPrepPlan": [
    {
      "area": "e.g. 'System Design'",
      "relevance": "Why this area is critical for this specific role and company",
      "topicsToStudy": ["specific topic 1", "specific topic 2"],
      "resources": [
        {
          "name": "Resource name",
          "url": "https://...",
          "type": "docs | course | book | repo | platform | community"
        }
      ],
      "practiceApproach": "Specific practice method — e.g. 'Do 2 mock system design interviews per week on Pramp, focusing on designing distributed systems at Microsoft scale'"
    }
  ],

  "portfolioGaps": [
    {
      "gap": "specific thing missing from portfolio or projects",
      "whyItMatters": "why hiring managers for this role look for this",
      "projectIdea": "concrete project idea that would fill this gap — e.g. 'Build a TypeScript + Azure Functions API with JWT auth and CosmosDB — mirrors Microsoft's internal stack'"
    }
  ],

  "certificationRoadmap": [
    {
      "certification": "Certification name",
      "issuingBody": "e.g. Microsoft, AWS, Google",
      "relevance": "why this cert matters for the target role specifically",
      "studyPath": "Specific study path — name the official materials and timeline",
      "estimatedCost": "e.g. '₹4,500 / $165'",
      "timeToComplete": "e.g. '4–6 weeks'"
    }
  ],

  "networkingActions": [
    {
      "action": "Specific networking step — e.g. 'Follow 5 Microsoft SDEs on LinkedIn who post about Azure architecture, engage with their posts for 2 weeks before cold messaging'",
      "platform": "LinkedIn | GitHub | Twitter | Discord | Meetup",
      "timeRequired": "e.g. '15 min/day'"
    }
  ],

  "growthSummary": "3–4 sentence honest assessment of where this candidate stands for the target role right now, what the single most important thing to do in the next 30 days is, and what their realistic timeline to being a strong applicant looks like. Sound like a mentor who has seen hundreds of successful applications for this exact role."
}
`;



// ─── STAGE 0 ROUTE ───────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/audit", userAuth, async (req, res) => {
  try {
    const { SpecificRole, ResumeType, BroadRole, JobDescription, Company } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Please re-login" });
    }

    // ✅ removed redundant User.findOne — userAuth already verified

    const Profile = await resume.findOne({ userId: user._id });
    if (!Profile) {
      return res.status(404).json({ success: false, message: "Career profile not found" });
    }

    // ✅ only ResumeType is hard-required — rest are optional for standalone audit
    if (!ResumeType) {
      return res.status(400).json({ success: false, message: "ResumeType is required" });
    }

    // ✅ strip Mongoose internals before sending to AI
    const profileClean = Profile.toObject();
    delete profileClean.__v;
    delete profileClean._id;
    delete profileClean.userId;
    delete profileClean.createdAt;
    delete profileClean.updatedAt;
    delete profileClean.isProfileCompleted;
    const prompt = `
You are a senior technical recruiter and career coach with 10+ years of experience hiring for ${ResumeType} roles.

Your job is to AUDIT a candidate's raw career profile before it gets tailored for a job application.
You are NOT rewriting anything. You are diagnosing issues, gaps, and growth opportunities.

Be direct and honest. Flag real problems. Don't sugarcoat, but don't be harsh — be like a mentor who wants this person to get the job.

## TARGET ROLE
- Resume Category: ${ResumeType}
- Specific Role: ${SpecificRole}
- Company: ${Company}
- Job Description:
${JobDescription ? `"""${JobDescription}"""` : "Not provided. Infer from role and category."}

## RAW PROFILE DATA
${JSON.stringify(Profile, null, 2)}

---

## YOUR TASK

Return ONLY a valid JSON object. No prose outside JSON. No markdown fences.

Follow this EXACT shape:

{
  "overallHealthScore": {
    "score": 72,
    "outOf": 100,
    "verdict": "one-line honest verdict like: 'Solid foundation, but several critical fields are missing and content quality needs cleanup before applying.'"
  },

  "contentIssues": [
    {
      "severity": "critical | warning | suggestion",
      "section": "which section this is in (e.g. projects, experience, header)",
      "field": "specific field if applicable (e.g. projects[1].description)",
      "issue": "clear description of the problem",
      "flaggedText": "the exact text that is problematic, if applicable — otherwise null",
      "fix": "specific actionable fix for the user"
    }
  ],

  "missingFields": [
    {
      "section": "e.g. header | education | certifications | experience | projects | skills",
      "field": "e.g. portfolio, summary, github link",
      "importance": "critical | recommended | optional",
      "whyItMatters": "one sentence on why this field matters for the target role",
      "prompt": "a fill-in-the-blank style prompt to help user know what to write — e.g. 'Add 2–3 lines describing what CodeSarthi does and your role in it'"
    }
  ],

  "dataInconsistencies": [
    {
      "type": "date_anomaly | duplicate | contradiction | implausible_metric | formatting",
      "section": "where it is",
      "field": "which field",
      "description": "what exactly is wrong",
      "flaggedValue": "the actual bad value from the data",
      "suggestedFix": "what the correct value or approach should be"
    }
  ],

  "skillGapAnalysis": {
    "roleRequiresSkills": ["skills typically required for this role + company"],
    "candidateHasSkills": ["skills confirmed present in profile — from explicit skills section AND implied by experience bullets"],
    "matchedSkills": ["skills the candidate has that match the role"],
    "missingCriticalSkills": [
      {
        "skill": "e.g. TypeScript",
        "importance": "critical | preferred",
        "reason": "why this skill matters for this specific role"
      }
    ],
    "irrelevantSkills": [
      {
        "skill": "skill in profile that adds no signal for this target role",
        "suggestion": "remove from this resume version OR move to lower priority"
      }
    ],
    "skillCoveragePercent": 65
  },

  "growthRecommendations": [
    {
      "priority": 1,
      "category": "skill | certification | project | portfolio | networking | profile",
      "title": "Short title like: 'Learn TypeScript to depth'",
      "why": "Why this matters for the specific role they're targeting — be concrete, not generic",
      "howTo": "Specific, actionable steps. Not 'take a course' — name the resource, the approach, the timeline",
      "estimatedImpact": "high | medium | low",
      "timeToAchieve": "e.g. '2–3 weeks', '1 month', '3+ months'"
    }
  ],

  "quickWins": [
    "short one-liner actions the user can do TODAY to improve their profile — e.g. 'Fix the start date on your Backend Developer role at CodeSarthi (currently shows 2029, likely a typo)', 'Remove duplicate LeetCode achievement — you have it listed twice word-for-word'"
  ],

  "auditSummary": "2–3 sentence honest paragraph summarizing the overall state of this profile for the target role. Mention the biggest strength and the most urgent thing to fix. Sound like a mentor, not a robot."
}

`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,   // ✅ low temp for structured JSON
      max_tokens: 3000,   // ✅ audit is large — give it room
    });




    const rawText = completion?.choices?.[0]?.message?.content;

    // ✅ catch empty/null content before attempting parse
    if (!rawText || rawText.trim() === "") {
      console.error("Empty AI response. Full completion:", JSON.stringify(completion, null, 2));
      throw new Error(`AI returned empty content. finish_reason: ${completion?.choices?.[0]?.finish_reason ?? "unknown"}`);
    }


    // ✅ clean first, then parse the cleaned version
    const cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText); // ✅ parse cleanedText, not rawText
    } catch (err) {
      throw new Error(`AI returned unparseable JSON: ${err.message} — raw: ${cleanedText.slice(0, 200)}`);
    }




    const normalizeAuditResponse = (data) => ({
      overallHealthScore: data.overallHealthScore ?? { score: 0, outOf: 100, verdict: "Audit incomplete" },
      contentIssues: data.contentIssues ?? [],
      missingFields: data.missingFields ?? [],
      dataInconsistencies: data.dataInconsistencies ?? [],
      skillGapAnalysis: data.skillGapAnalysis ?? {
        roleRequiresSkills: [],
        candidateHasSkills: [],
        matchedSkills: [],
        missingCriticalSkills: [],
        irrelevantSkills: [],
        skillCoveragePercent: 0
      },
      growthRecommendations: data.growthRecommendations ?? [],
      quickWins: data.quickWins ?? [],
      auditSummary: data.auditSummary ?? "",
    });

    // in the route, replace the res.json call with:
    res.status(200).json({
      success: true,
      data: normalizeAuditResponse(parsedData),
    });


  } catch (error) {
    console.error("Audit API Error:", error);
    res.status(500).json({
      success: false,
      error: "AI audit failed",
      message: error.message,
    });
  }
});
// ─── STAGE 1 ROUTE ───────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/strategy", userAuth, async (req, res) => {
  try {
    const { SpecificRole, ResumeType, BroadRole, JobDescription, Company, auditResult } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Please re-login" });
    }

    // ✅ removed redundant User.findOne — userAuth already verified

    const Profile = await resume.findOne({ userId: user._id });
    if (!Profile) {
      return res.status(404).json({ success: false, message: "Career profile not found" });
    }

    // ✅ only ResumeType is hard-required — rest are optional for standalone audit
    if (!ResumeType) {
      return res.status(400).json({ success: false, message: "ResumeType is required" });
    }

    // ✅ strip Mongoose internals before sending to AI
    const profileClean = Profile.toObject();
    delete profileClean.__v;
    delete profileClean._id;
    delete profileClean.userId;
    delete profileClean.createdAt;
    delete profileClean.updatedAt;
    delete profileClean.isProfileCompleted;
    const prompt = `
You are a senior resume strategist and technical hiring consultant with deep expertise in ${ResumeType} hiring pipelines.

Your job is NOT to rewrite anything yet. You are building a precise targeting strategy that will guide the rewrite of every section of this candidate's resume for a specific role.

Every instruction you produce will be consumed by specialized AI rewriters for summary, experience, projects, and skills. Be surgical, specific, and grounded in the actual profile data — no generic advice.

## TARGET
- Resume Category: ${ResumeType}
- Broad Role Type: ${BroadRole}
- Specific Role: ${SpecificRole}
- Company: ${Company ?? "Not specified — write for a mid-to-large product company"}
- Job Description:
${JobDescription ? `"""${JobDescription}"""` : "Not provided. Infer from role, category, and industry norms."}

## CANDIDATE PROFILE
${JSON.stringify(profileClean)}

## AUDIT FINDINGS (from Stage 0 — use these to inform strategy, avoid rewriting flagged content)
${JSON.stringify(auditResult)}

---

## YOUR TASK

Return ONLY a valid JSON object. No prose. No markdown fences.

{
  "positioningStatement": "One precise sentence: who this person IS for this role, grounded in their actual experience. Not aspirational — factual. E.g. 'A full-stack engineer with 2 years building React/Node.js products at CodeSarthi, targeting a mid-level SDE role at Microsoft with strong DSA fundamentals and backend experience.'",

  "coreNarrative": "2–3 sentences: the through-line story connecting their background to this role. What journey does their profile tell? What makes this application coherent, not random? Grounded in real data only.",

  "mustIncludeKeywords": [
    "exact ATS keyword strings the resume must contain for this role — include both full forms and abbreviations where both are scanned e.g. 'React', 'React.js', 'REST API', 'RESTful API'"
  ],

  "niceToIncludeKeywords": [
    "keywords that strengthen the resume but are not make-or-break for ATS"
  ],

  "keywordsToAvoid": [
    "words or phrases that dilute ATS signal for this specific role — e.g. skills from a different domain that the candidate listed but shouldn't appear on this version"
  ],

  "strengthsToAmplify": [
    "specific things in this candidate's actual profile that are genuinely strong for this target role — be concrete, not generic. Reference real projects, roles, or metrics from the profile."
  ],

  "weaknessesToDownplay": [
    "real gaps or mismatches between the profile and the role — don't delete, just de-emphasize. E.g. 'Short experience duration', 'Missing TypeScript in explicit skills (though implied in bullets)'"
  ],

  "sectionPriority": ["summary", "experience", "projects", "skills", "education", "certifications"],

  "summaryStrategy": {
    "openWith": "Exactly what the summary should open with — e.g. 'Lead with the React + Node.js full-stack experience at CodeSarthi and the LeetCode top 5% ranking as proof of DSA strength'",
    "keywordsToFrontload": ["keywords that must appear in the first 1–2 sentences"],
    "toneInstruction": "Specific tone directive — e.g. 'Technical and confident, not modest. Avoid buzzwords like results-driven or passionate.'",
    "avoid": ["things the summary must NOT say or do — e.g. 'Do not open with I', 'Do not mention Java or Spring Boot — not relevant for this role'"]
  },

  "experienceStrategy": {
    "general": "Overall instruction for all experience bullet rewrites — what angle, what to emphasize, what verb style, what to avoid across all roles",
    "perRole": [
      {
        "company": "exact company name as it appears in the profile",
        "role": "exact role title as it appears in the profile",
        "relevanceToTarget": "high | medium | low",
        "instruction": "Specific rewrite instruction for this role's bullets — what to emphasize, what keywords to weave in, which bullets are strongest and should anchor the section, which are weak and should be tightened or cut"
      }
    ]
  },

  "projectStrategy": {
    "general": "Overall instruction for all project bullet rewrites — what angle, what technical depth to show, what to emphasize for this specific role",
    "perProject": [
      {
        "name": "exact project name as it appears in the profile",
        "relevanceToTarget": "high | medium | low",
        "shouldInclude": true,
        "instruction": "Specific rewrite instruction — what technical decisions to surface, what metrics to keep, what to reframe, what to ignore. If the project has placeholder/gibberish content, note that and instruct the rewriter to work from bullets only."
      }
    ]
  },

  "skillsStrategy": {
    "categoriesToUse": ["category names that match ATS expectations for this role — e.g. 'Languages', 'Frameworks', 'Databases', 'Tools', 'Cloud'"],
    "skillsToKeep": ["skills from the profile that have strong ATS signal for this role"],
    "skillsToRemove": ["skills in the profile that dilute the resume for this role"],
    "skillsToSurface": ["skills NOT in the explicit skills section but clearly present in experience/project bullets — should be added"],
    "orderBy": "Instruction on how to order skills within each category — e.g. 'Most relevant to Microsoft SDE role first'"
  },

  "toneGuidance": {
    "overall": "professional | technical | confident | conversational — pick the right blend for this role and company",
    "verbStyle": "e.g. 'Strong past-tense action verbs — Built, Engineered, Architected, Reduced, Improved. Avoid: Leveraged, Utilized, Synergized, Assisted'",
    "formality": "e.g. 'Formal but not stiff — this is Microsoft, not a startup'"
  },

  "redFlagsToAddress": [
    "Issues flagged in the audit that the rewriters must work around — e.g. 'projects[1].description is placeholder text — rewriters must work from bullets only for that project', 'experience[1].startDate is 2029 — do not reference dates in bullets'"
  ],

  "versionLabel": "Short human-readable label for this tailored version — e.g. 'Microsoft SDE — Full Stack Focus' or 'Razorpay Backend Engineer — Java/Spring Boot'"
}
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,   // ✅ low temp for structured JSON
      max_tokens: 3000,   // ✅ audit is large — give it room
    });




    const rawText = completion?.choices?.[0]?.message?.content;

    // ✅ catch empty/null content before attempting parse
    if (!rawText || rawText.trim() === "") {
      console.error("Empty AI response. Full completion:", JSON.stringify(completion, null, 2));
      throw new Error(`AI returned empty content. finish_reason: ${completion?.choices?.[0]?.finish_reason ?? "unknown"}`);
    }


    // ✅ clean first, then parse the cleaned version
    const cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText); // ✅ parse cleanedText, not rawText
    } catch (err) {
      throw new Error(`AI returned unparseable JSON: ${err.message} — raw: ${cleanedText.slice(0, 200)}`);
    }




    const normalizeStrategy = (data) => ({
      positioningStatement: data.positioningStatement ?? "",
      coreNarrative: data.coreNarrative ?? "",
      mustIncludeKeywords: data.mustIncludeKeywords ?? [],
      niceToIncludeKeywords: data.niceToIncludeKeywords ?? [],
      keywordsToAvoid: data.keywordsToAvoid ?? [],
      strengthsToAmplify: data.strengthsToAmplify ?? [],
      weaknessesToDownplay: data.weaknessesToDownplay ?? [],
      sectionPriority: data.sectionPriority ?? [],
      summaryStrategy: data.summaryStrategy ?? { openWith: "", keywordsToFrontload: [], toneInstruction: "", avoid: [] },
      experienceStrategy: data.experienceStrategy ?? { general: "", perRole: [] },
      projectStrategy: data.projectStrategy ?? { general: "", perProject: [] },
      skillsStrategy: data.skillsStrategy ?? { categoriesToUse: [], skillsToKeep: [], skillsToRemove: [], skillsToSurface: [], orderBy: "" },
      toneGuidance: data.toneGuidance ?? { overall: "", verbStyle: "", formality: "" },
      redFlagsToAddress: data.redFlagsToAddress ?? [],
      versionLabel: data.versionLabel ?? `${SpecificRole} — ${Company ?? ResumeType}`,
    });

    res.status(200).json({
      success: true,
      data: normalizeStrategy(parsedData),  // ✅ correct normalizer
    });

  } catch (error) {
    console.error("Strategy API Error:", error);  // ✅ correct error label
    res.status(500).json({
      success: false,
      error: "Strategy generation failed",
      message: error.message,
    });
  }
});
// ─── STAGE 2A ROUTE ───────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/rewrite/summary", userAuth, async (req, res) => {
  try {
    const { strategy } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Please re-login" });
    if (!strategy) return res.status(400).json({ success: false, message: "strategy is required" });

    const Profile = await resume.findOne({ userId: user._id });
    if (!Profile) {
      return res.status(404).json({ success: false, message: "Career profile not found" });
    }



    // ✅ strip Mongoose internals before sending to AI
    const profileClean = Profile.toObject();
    delete profileClean.__v;
    delete profileClean._id;
    delete profileClean.userId;
    delete profileClean.createdAt;
    delete profileClean.updatedAt;
    delete profileClean.isProfileCompleted;
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: buildSummaryPrompt({ profile: profileClean, strategy }) }
      ],
      temperature: 0.4,  // slightly higher — summary benefits from natural language variation
      max_tokens: 500,
    });

    const parsedData = parseAIResponse(completion);

    res.status(200).json({
      success: true,
      data: {
        summaryTitle: parsedData.summaryTitle ?? profileClean.header?.summaryTitle ?? "",
        summaryBody: parsedData.summaryBody ?? profileClean.summaryBody ?? "",
      }
    });

  } catch (error) {
    console.error("Summary Rewrite Error:", error);
    res.status(500).json({ success: false, error: "Summary rewrite failed", message: error.message });
  }
});
// ─── STAGE 2B ROUTE ───────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/rewrite/experience", userAuth, async (req, res) => {
  try {
    const { strategy } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Please re-login" });
    if (!strategy) return res.status(400).json({ success: false, message: "strategy is required" });

    const Profile = await resume.findOne({ userId: user._id });
    if (!Profile) {
      return res.status(404).json({ success: false, message: "Career profile not found" });
    }



    // ✅ strip Mongoose internals before sending to AI
    const profileClean = Profile.toObject();
    delete profileClean.__v;
    delete profileClean._id;
    delete profileClean.userId;
    delete profileClean.createdAt;
    delete profileClean.updatedAt;
    delete profileClean.isProfileCompleted;
    // one AI call per experience entry — all parallel
    const results = await Promise.all(
      profileClean.experience.map(async (entry) => {
        const roleStrategy = strategy.experienceStrategy?.perRole?.find(
          r => r.company === entry.company && r.role === entry.role
        );

        const completion = await client.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: JSON_SYSTEM_PROMPT },
            { role: "user", content: buildExperiencePrompt({ experienceEntry: entry, roleStrategy, strategy }) }
          ],
          temperature: 0.3,
          max_tokens: 800,
        });

        const parsed = parseAIResponse(completion);
        return {
          ...entry,                                          // preserve all original fields
          bullets: parsed.bullets ?? entry.bullets,          // swap in rewritten bullets
        };
      })
    );

    res.status(200).json({ success: true, data: results });

  } catch (error) {
    console.error("Experience Rewrite Error:", error);
    res.status(500).json({ success: false, error: "Experience rewrite failed", message: error.message });
  }
});
// ─── STAGE 2C ROUTE ───────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/rewrite/projects", userAuth, async (req, res) => {
  try {
    const { strategy } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Please re-login" });
    if (!strategy) return res.status(400).json({ success: false, message: "strategy is required" });

    const Profile = await resume.findOne({ userId: user._id });
    if (!Profile) {
      return res.status(404).json({ success: false, message: "Career profile not found" });
    }



    // ✅ strip Mongoose internals before sending to AI
    const profileClean = Profile.toObject();
    delete profileClean.__v;
    delete profileClean._id;
    delete profileClean.userId;
    delete profileClean.createdAt;
    delete profileClean.updatedAt;
    delete profileClean.isProfileCompleted;
    // filter out projects strategy flagged as shouldInclude: false
    const projectsToRewrite = profileClean.projects.filter(proj => {
      const ps = strategy.projectStrategy?.perProject?.find(p => p.name === proj.name);
      return ps?.shouldInclude !== false;
    });

    const results = await Promise.all(
      projectsToRewrite.map(async (project) => {
        const projectStrategy = strategy.projectStrategy?.perProject?.find(
          p => p.name === project.name
        );

        const completion = await client.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: JSON_SYSTEM_PROMPT },
            { role: "user", content: buildProjectPrompt({ project, projectStrategy, strategy }) }
          ],
          temperature: 0.3,
          max_tokens: 700,
        });

        const parsed = parseAIResponse(completion);
        return {
          ...project,
          bullets: parsed.bullets ?? project.bullets,
        };
      })
    );

    res.status(200).json({ success: true, data: results });

  } catch (error) {
    console.error("Projects Rewrite Error:", error);
    res.status(500).json({ success: false, error: "Projects rewrite failed", message: error.message });
  }
});
// ─── STAGE 2D ROUTE ───────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/rewrite/skills", userAuth, async (req, res) => {
  try {
    const { strategy } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: "Please re-login" });
    if (!strategy) return res.status(400).json({ success: false, message: "strategy is required" });

    const Profile = await resume.findOne({ userId: user._id });
    if (!Profile) {
      return res.status(404).json({ success: false, message: "Career profile not found" });
    }



    // ✅ strip Mongoose internals before sending to AI
    const profileClean = Profile.toObject();
    delete profileClean.__v;
    delete profileClean._id;
    delete profileClean.userId;
    delete profileClean.createdAt;
    delete profileClean.updatedAt;
    delete profileClean.isProfileCompleted;
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: buildSkillsPrompt({ profile: profileClean, strategy }) }
      ],
      temperature: 0.2,  // low — skills curation should be deterministic
      max_tokens: 600,
    });

    const parsedData = parseAIResponse(completion);

    res.status(200).json({
      success: true,
      data: {
        skills: parsedData.skills ?? profileClean.skills
      }
    });

  } catch (error) {
    console.error("Skills Rewrite Error:", error);
    res.status(500).json({ success: false, error: "Skills rewrite failed", message: error.message });
  }
});
// ─── STAGE 3B ROUTE ───────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/coherence", userAuth, async (req, res) => {
  try {
    const { tailoredProfile, strategyResult } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Please re-login" });
    }

    if (!tailoredProfile || !strategyResult) {
      return res.status(400).json({
        success: false,
        message: "tailoredProfile and strategyResult are required"
      });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: buildCoherencePrompt({ tailoredProfile, strategyResult }) }
      ],
      temperature: 0.1,   // as deterministic as possible — this is a checker not a writer
      max_tokens: 1500,
    });

    const parsedData = parseAIResponse(completion);

    const normalizeCoherence = (data) => ({
      coherenceScore: data.coherenceScore ?? 0,
      isReadyToSend: data.isReadyToSend ?? false,
      summaryAligned: data.summaryAligned ?? false,
      issues: data.issues ?? [],
      keywordConsistency: data.keywordConsistency ?? {
        appearsInSummary: [],
        appearsInExperience: [],
        appearsInProjects: [],
        appearsInSkills: [],
        missingEverywhere: [],
      },
      toneConsistency: data.toneConsistency ?? "",
      overallVerdict: data.overallVerdict ?? "",
    });

    return res.status(200).json({
      success: true,
      data: normalizeCoherence(parsedData),
    });

  } catch (error) {
    console.error("Coherence Check Error:", error);
    res.status(500).json({
      success: false,
      error: "Coherence check failed",
      message: error.message,
    });
  }
});
// ─── STAGE 4 ROUTE ────────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/skillgap", userAuth, async (req, res) => {
  try {
    const {
      tailoredProfile,
      auditResult,
      SpecificRole,
      ResumeType,
      Company,
      JobDescription,
    } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Please re-login" });
    }

    if (!tailoredProfile) {
      return res.status(400).json({
        success: false,
        message: "tailoredProfile from Stage 3 is required"
      });
    }

    if (!SpecificRole || !ResumeType) {
      return res.status(400).json({
        success: false,
        message: "SpecificRole and ResumeType are required"
      });
    }

    const originalAuditGap = auditResult?.skillGapAnalysis ?? null;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildSkillGapPrompt({
            tailoredProfile,
            originalAuditGap,
            SpecificRole,
            ResumeType,
            Company,
            JobDescription,
          })
        }
      ],
      temperature: 0.1,
      max_tokens: 2000,
    });

    const parsedData = parseAIResponse(completion);

    const normalizeSkillGap = (data) => {
      const coverageBefore = originalAuditGap?.skillCoveragePercent ?? 0;
      const coverageAfter = data.skillCoveragePercent ?? 0;

      return {
        roleRequiresSkills: data.roleRequiresSkills ?? [],
        candidateHasSkills: data.candidateHasSkills ?? [],
        matchedSkills: data.matchedSkills ?? [],
        missingCriticalSkills: data.missingCriticalSkills ?? [],
        missingPreferredSkills: data.missingPreferredSkills ?? [],
        irrelevantSkills: data.irrelevantSkills ?? [],
        skillCoveragePercent: coverageAfter,

        delta: {
          coverageBefore,
          coverageAfter,
          improvement: Math.round(coverageAfter - coverageBefore),
          newlyMatchedSkills: data.delta?.newlyMatchedSkills ?? [],
          stillMissing: data.delta?.stillMissing ?? [],
        },

        atsScanSimulation: data.atsScanSimulation ?? {
          estimatedATSPassRate: 0,
          keywordsFoundByATS: [],
          keywordsNotFound: [],
          recommendation: "",
        },

        skillsStrengthMap: data.skillsStrengthMap ?? [],
      };
    };

    return res.status(200).json({
      success: true,
      data: normalizeSkillGap(parsedData),
    });

  } catch (error) {
    console.error("Skill Gap Error:", error);
    res.status(500).json({
      success: false,
      error: "Skill gap analysis failed",
      message: error.message,
    });
  }
});
// ─── STAGE 5 ROUTE ────────────────────────────────────────────────────────────
aiWorkRouter.post("/resume/growth", userAuth, async (req, res) => {
  try {
    const {
      tailoredProfile,
      skillGapResult,
      auditResult,
      coherenceResult,
      SpecificRole,
      ResumeType,
      Company,
      JobDescription,
    } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Please re-login" });
    }

    if (!tailoredProfile || !skillGapResult) {
      return res.status(400).json({
        success: false,
        message: "tailoredProfile and skillGapResult are required"
      });
    }

    if (!SpecificRole || !ResumeType) {
      return res.status(400).json({
        success: false,
        message: "SpecificRole and ResumeType are required"
      });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildGrowthPrompt({
            tailoredProfile,
            skillGapResult,
            auditResult,
            coherenceResult: coherenceResult ?? null,
            SpecificRole,
            ResumeType,
            Company,
            JobDescription,
          })
        }
      ],
      temperature: 0.4,   // slightly higher — growth recs benefit from varied, specific suggestions
      max_tokens: 3000,
    });

    const parsedData = parseAIResponse(completion);

    const normalizeGrowth = (data) => ({
      overallReadinessScore: data.overallReadinessScore ?? {
        score: 0,
        outOf: 100,
        label: "",
        breakdown: {
          resumeQuality: 0,
          skillCoverage: 0,
          profileCompleteness: 0,
          atsReadiness: 0,
        }
      },
      thirtyDayPlan: data.thirtyDayPlan ?? [],
      sixtyDayPlan: data.sixtyDayPlan ?? [],
      ninetyDayPlan: data.ninetyDayPlan ?? [],
      quickWinsToday: data.quickWinsToday ?? [],
      interviewPrepPlan: data.interviewPrepPlan ?? [],
      portfolioGaps: data.portfolioGaps ?? [],
      certificationRoadmap: data.certificationRoadmap ?? [],
      networkingActions: data.networkingActions ?? [],
      growthSummary: data.growthSummary ?? "",
    });

    return res.status(200).json({
      success: true,
      data: normalizeGrowth(parsedData),
    });

  } catch (error) {
    console.error("Growth Recommendations Error:", error);
    res.status(500).json({
      success: false,
      error: "Growth recommendations failed",
      message: error.message,
    });
  }
});




// Pointers 
const MASTER_SYSTEM_PROMPT = `
You are an elite FAANG-level resume strategist, ATS optimization expert,
technical recruiter, hiring manager, and career coach.

Your responsibility is to generate world-class, ATS-optimized,
human-written resume content.

GLOBAL RULES:
- Always write concise, high-impact content
- Sound achievement-oriented and recruiter-friendly
- Use strong action verbs
- Prioritize measurable impact
- Include relevant tools and technologies naturally
- Avoid fluff, buzzwords, and repetition
- Keep content realistic and believable
- Ensure every line feels human-written
- Optimize for ATS keyword matching
- Never repeat sentence structures
- Never generate generic filler content

WRITING STYLE:
- Technical
- Professional
- Results-driven
- Quantified whenever possible
- Clean and concise

STRICT OUTPUT RULES:
1. Return ONLY valid JSON
2. Never include markdown
3. Never include explanations
4. Never include extra text
5. Never wrap JSON in code blocks
6. Output must always be parseable
7. Never hallucinate impossible achievements
8. Avoid repeated action verbs
9. Keep tone consistent across all responses
10. Keep outputs ATS-friendly and recruiter-optimized
`;
aiWorkRouter.post("/generate-exp-pointer", userAuth, async (req, res) => {
  const { jobRole, company, employmentType } = req.body;

  // Validation
  if (!jobRole || !company || !employmentType) {
    return res.status(400).json({
      error: "Incomplete Data",
      message: "jobRole, company, and employmentType are required.",
    });
  }

  try {
    const prompt = `
        ${MASTER_SYSTEM_PROMPT}
        
        ROLE:
        You are an expert technical resume writer specializing in ATS-optimized software engineering resumes.
        
        TASK TYPE:
        Professional Experience Resume Bullet Generation
        
        EXPERIENCE DETAILS:
        - Role: ${jobRole}
        - Company: ${company}
        - Employment Type: ${employmentType}
        
        OBJECTIVE:
        Generate EXACTLY 5 strong, ATS-friendly professional experience bullet points.
        
        STRICT REQUIREMENTS:
        - Each bullet MUST:
          - Contain 10–14 words
          - Start with a UNIQUE strong action verb
          - Follow the XYZ resume format naturally:
            - Accomplished X
            - Measured by Y
            - Using Z
          - Sound like authentic industry experience
          - Be impact-driven and achievement-oriented
          - Highlight scalability, optimization, automation, architecture, security, performance, or leadership
          - Include realistic metrics or measurable improvements whenever naturally possible
          - Mention relevant tools, frameworks, databases, cloud platforms, or methodologies naturally
          - Be concise, technical, and recruiter-friendly
          - Follow modern software engineering resume standards
        
        TECHNICAL FOCUS AREAS:
        - Full-stack development
        - API engineering
        - Microservices
        - Database optimization
        - Cloud infrastructure
        - CI/CD pipelines
        - Performance tuning
        - Authentication & security
        - Real-time systems
        - Monitoring & observability
        - DevOps workflows
        - Automation and productivity improvements
        - Cross-functional collaboration
        
        DO NOT:
        - Use phrases like:
          - "Worked on"
          - "Responsible for"
          - "Helped with"
          - "Participated in"
        - Repeat action verbs
        - Use vague or filler statements
        - Add unrealistic metrics or fake achievements
        - Use first-person pronouns
        - Exceed 14 words
        - Generate generic internship-style bullets unless employment type requires it
        
        PREFERRED ACTION VERBS:
        Engineered, Architected, Optimized, Automated, Implemented, Developed, Integrated, Scaled, Enhanced, Deployed, Streamlined, Reduced, Accelerated, Secured, Orchestrated
        
        STYLE GUIDELINES:
        - Make bullets sound production-level and technically credible
        - Prioritize ATS keyword relevance
        - Ensure variety across all 5 bullets
        - Keep language clean, modern, and resume-ready
        
        OUTPUT RULES:
        - Return ONLY valid JSON
        - No markdown
        - No explanations
        - No extra text
        - Maintain exact schema structure
        - Generate EXACTLY 5 bullets
        
        OUTPUT FORMAT:
        {
          "type": "experience",
          "data": [
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." }
          ]
        }
        `;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const rawText = completion.choices[0].message.content;

    // Safe JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      throw new Error("Invalid JSON response from Grok");
    }

    res.status(200).json({
      success: true,
      data: parsedData.data,
      type: parsedData.type,
    });

  } catch (error) {
    console.error("Grok API Error:", error);
    res.status(500).json({
      success: false,
      error: "AI generation failed",
      message: error.message
    });
  }
});


aiWorkRouter.post("/generate-edu-pointer", userAuth, async (req, res) => {
  const { degree, field, cgpa, college, graduationYear } = req.body;

  // Validation
  if (!degree || !field || !cgpa || !college) {
    return res.status(400).json({
      error: "Incomplete Data",
      message: "degree, field, cgpa, and college are required.",
    });
  }

  try {
    const prompt = `
        ${MASTER_SYSTEM_PROMPT}
        
        ROLE:
        You are an expert technical resume writer specializing in ATS-optimized academic and student resumes.
        
        TASK TYPE:
        Education Resume Bullet Generation
        
        EDUCATION DETAILS:
        - Degree: ${degree}
        - Field of Study: ${field}
        - Institution: ${college}
        - CGPA: ${cgpa}
        - Graduation Year: ${graduationYear}
        
        OBJECTIVE:
        Generate EXACTLY 5 strong, ATS-friendly education resume bullet points.
        
        STRICT REQUIREMENTS:
        - Each bullet MUST:
          - Contain 10–14 words
          - Start with a strong action verb when naturally possible
          - Sound professional, achievement-oriented, and recruiter-friendly
          - Highlight academics, technical coursework, projects, certifications, leadership, research, or achievements
          - Naturally include technical subjects, tools, frameworks, or methodologies when relevant
          - Include measurable accomplishments ONLY if realistically inferable
          - Follow modern software engineering/student resume standards
          - Be concise and impactful
        
        PRIORITY AREAS:
        - Relevant coursework
        - Academic excellence
        - Technical projects
        - Research contributions
        - Hackathons or competitions
        - Certifications
        - Leadership roles
        - Team collaborations
        - Development tools and technologies
        - Problem-solving or analytical work
        
        DO NOT:
        - Use generic phrases like:
          - "Hardworking student"
          - "Quick learner"
          - "Responsible for"
          - "Participated in"
        - Add unrealistic achievements or fake metrics
        - Use first-person pronouns
        - Repeat the same action verb
        - Exceed 14 words
        - Generate vague or filler content
        
        STYLE GUIDELINES:
        - Keep bullets ATS-optimized and keyword-rich
        - Use clean industry-standard terminology
        - Make bullets sound resume-ready without additional editing
        - Ensure variety across all 5 bullets
        
        OUTPUT RULES:
        - Return ONLY valid JSON
        - No markdown
        - No explanations
        - No extra text
        - Maintain exact schema structure
        - Generate EXACTLY 5 bullets
        
        OUTPUT FORMAT:
        {
          "type": "education",
          "data": [
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." }
          ]
        }
        `;
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const rawText = completion.choices[0].message.content;

    // Safe JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      throw new Error("Invalid JSON response from Grok");
    }

    res.status(200).json({
      success: true,
      data: parsedData.data,
      type: parsedData.type,
    });

  } catch (error) {
    console.error("Grok API Error:", error);
    res.status(500).json({
      success: false,
      error: "AI generation failed",
      message: error.message
    });
  }
});

aiWorkRouter.post("/generate-skills", userAuth, async (req, res) => {
  const { category } = req.body;

  // Validation
  if (!category) {
    return res.status(400).json({
      error: "Incomplete Data",
      message: "category is required.",
    });
  }

  try {
    const prompt = `
        ${MASTER_SYSTEM_PROMPT}
        
        ROLE:
        You are an expert technical resume writer and ATS optimization specialist.
        
        TASK TYPE:
        Resume Skills Generation
        
        SKILL CATEGORY:
        ${category}
        
        OBJECTIVE:
        Generate EXACTLY 15 highly relevant, ATS-optimized technical resume skills for the given category.
        
        STRICT REQUIREMENTS:
        - Generate ONLY technical and industry-relevant skills
        - Skills must align with modern software engineering and tech hiring standards
        - Include a balanced mix of:
          - Programming languages
          - Frameworks
          - Libraries
          - Databases
          - Cloud platforms
          - DevOps tools
          - APIs
          - Testing tools
          - Architecture concepts
          - Development methodologies
        - Prefer modern, in-demand, recruiter-searched technologies
        - Use official industry-standard naming conventions
        - Keep each skill concise and clean
        - Avoid duplicates or overlapping technologies
        - Prioritize ATS keyword relevance
        
        DO NOT:
        - Include soft skills
        - Include vague terms like:
          - "Coding"
          - "Programming"
          - "Problem Solving"
          - "Communication"
        - Add explanations or proficiency levels
        - Use outdated technologies unless category specifically requires them
        - Generate unrelated skills
        
        CATEGORY-SPECIFIC GUIDELINES:
        - If category is Frontend:
          Include modern UI frameworks, state management, styling, testing, and build tools.
          
        - If category is Backend:
          Include APIs, databases, authentication, server frameworks, caching, and scalability tools.
          
        - If category is Full Stack:
          Include frontend, backend, database, deployment, and DevOps technologies.
          
        - If category is DevOps:
          Include CI/CD, containers, orchestration, monitoring, and cloud technologies.
          
        - If category is Data Science/AI:
          Include ML frameworks, data processing, visualization, and AI tooling.
          
        - If category is Mobile:
          Include cross-platform/native frameworks, SDKs, deployment, and mobile databases.
        
        OUTPUT RULES:
        - Return ONLY valid JSON
        - No markdown
        - No explanations
        - No extra text
        - Maintain exact schema structure
        - Generate EXACTLY 15 skills
        
        OUTPUT FORMAT:
        {
          "type": "skills",
          "data": [
            { "skill": "React.js" },
            { "skill": "Next.js" },
            { "skill": "TypeScript" },
            { "skill": "Node.js" },
            { "skill": "Express.js" },
            { "skill": "MongoDB" },
            { "skill": "PostgreSQL" },
            { "skill": "Redis" },
            { "skill": "Docker" },
            { "skill": "AWS" },
            { "skill": "Tailwind CSS" },
            { "skill": "REST APIs" },
            { "skill": "GraphQL" },
            { "skill": "GitHub Actions" },
            { "skill": "JWT Authentication" }
          ]
        }
        `;
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const rawText = completion.choices[0].message.content;

    // Safe JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      throw new Error("Invalid JSON response from Grok");
    }

    res.status(200).json({
      success: true,
      data: parsedData.data,
      type: parsedData.type,
    });

  } catch (error) {
    console.error("Grok API Error:", error);
    res.status(500).json({
      success: false,
      error: "AI generation failed",
      message: error.message
    });
  }
});

aiWorkRouter.post("/generate-summary", userAuth, async (req, res) => {
  const {
    skills,
    experience,
    education,
    summaryTitle,
  } = req.body;

  const hasSkills =
    Array.isArray(skills) && skills.length > 0;

  const hasExperience =
    Array.isArray(experience) &&
    experience.length > 0;

  const hasEducation =
    Array.isArray(education) &&
    education.length > 0;

  const hasTitle =
    typeof summaryTitle === "string" &&
    summaryTitle.trim().length > 0;

  if (
    !hasSkills &&
    !hasExperience &&
    !hasEducation &&
    !hasTitle
  ) {
    return res.status(400).json({
      success: false,
      error: "At least one field is required",
    });
  }

  try {
    const completion =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        response_format: {
          type: "json_object",
        },

        messages: [
          {
            role: "system",
            content: `
You are a professional ATS resume summary generator.

Return ONLY valid JSON.

Required structure:
{
  "type": "generated_summaries",
  "data": [
    {
      "tone": "",
      "summary": ""
    }
  ]
}
                        `,
          },

          {
            role: "user",
            content: `
Generate 6 ATS-optimized resume summaries.

Candidate Title:
${summaryTitle || "Not Provided"}

Skills:
${JSON.stringify(skills || [])}

Experience:
${JSON.stringify(experience || [])}

Education:
${JSON.stringify(education || [])}

Requirements:
- Professional
- Human sounding
- ATS optimized
- 50-100 words
- Different tone for each summary
- No markdown
- No explanations
                        `,
          },
        ],

        temperature: 0.2,
        max_tokens: 2200,
      });


    const rawText =
      completion?.choices?.[0]?.message?.content || "";


    if (!rawText) {
      return res.status(500).json({
        success: false,
        error: "Empty AI response",
      });
    }





    let parsedData;

    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      console.error(
        "JSON Parse Error:",
        rawText
      );

      return res.status(500).json({
        success: false,
        error: "Invalid AI JSON response",
      });
    }

    const isValidData =
      parsedData?.type ===
      "generated_summaries" &&
      Array.isArray(parsedData?.data) &&
      parsedData.data.length === 6 &&
      parsedData.data.every(
        (item) =>
          typeof item?.tone === "string" &&
          typeof item?.summary === "string"
      );

    if (!isValidData) {
      return res.status(500).json({
        success: false,
        error: "Malformed AI response",
      });
    }

    return res.status(200).json({
      success: true,
      type: parsedData.type,
      data: parsedData.data,
    });

  } catch (error) {
    console.error(
      "AI Summary Generation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "Summary generation failed",
      message: error.message,
    });
  }
});

aiWorkRouter.post("/improve-pointer", userAuth, async (req, res) => {
  const { bullet } = req.body;

  // Validation
  if (!bullet) {
    return res.status(400).json({
      error: "Incomplete Data",
      message: "bullet is required.",
    });
  }

  try {
    const prompt = `
        ${MASTER_SYSTEM_PROMPT}
        
        ROLE:
        You are an expert technical resume writer specializing in ATS-optimized software engineering resumes.
        
        TASK TYPE:
        Resume Bullet Enhancement
        
        ORIGINAL BULLET:
        "${bullet}"
        
        OBJECTIVE:
        Rewrite the bullet into a stronger, cleaner, and more impactful ATS-friendly resume bullet while preserving the original meaning.
        
        STRICT REQUIREMENTS:
        - Preserve the original intent and technical meaning
        - Keep the bullet between 8–16 words
        - Start with a strong action verb
        - Improve clarity, readability, and professionalism
        - Make the bullet achievement-oriented and technically impressive
        - Include measurable impact ONLY if realistically inferable
        - Use concise, recruiter-friendly language
        - Optimize for modern ATS parsing standards
        - Sound like an experienced software engineering resume bullet
        
        TECHNICAL ENHANCEMENT GUIDELINES:
        - Emphasize:
          - Performance improvements
          - Scalability
          - System architecture
          - APIs
          - Security
          - Automation
          - Databases
          - Real-time functionality
          - UI/UX improvements
          - Deployment or optimization
        - Replace weak verbs with stronger technical verbs
        - Improve technical specificity where naturally possible
        
        DO NOT:
        - Use phrases like:
          - "Worked on"
          - "Helped with"
          - "Responsible for"
          - "Participated in"
        - Add unrealistic metrics or fake claims
        - Use first-person pronouns
        - Use filler words or vague descriptions
        - Change the core meaning
        - Exceed 16 words
        
        GOOD ACTION VERBS:
        Built, Engineered, Developed, Optimized, Automated, Architected, Implemented, Designed, Integrated, Scaled, Enhanced, Deployed
        
        OUTPUT RULES:
        - Return ONLY valid JSON
        - No markdown
        - No explanations
        - No extra text
        - Maintain exact schema structure
        
        OUTPUT FORMAT:
        {
          "type": "enhanced_bullet",
          "data": {
            "bullet": "..."
          }
        }
        `;
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const rawText =
      completion?.choices?.[0]?.message?.content || "";

    const cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    // Safe JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      throw new Error("Invalid JSON response from Grok");
    }

    res.status(200).json({
      success: true,
      data: parsedData.data,
      type: parsedData.type,
    });

  } catch (error) {
    console.error("Grok API Error:", error);
    res.status(500).json({
      success: false,
      error: "AI generation failed",
      message: error.message
    });
  }
});

aiWorkRouter.post("/generate-project-pointer", userAuth, async (req, res) => {
  const { name, stack, description } = req.body;

  // Validation
  if (!name || !stack || !description) {
    return res.status(400).json({
      error: "Incomplete Data",
      message: "name, stack, and description are required.",
    });
  }

  try {
    const prompt = `
        ${MASTER_SYSTEM_PROMPT}
        
        ROLE:
        You are an expert technical resume writer specializing in ATS-optimized software engineering resumes.
        
        TASK TYPE:
        Project Resume Bullet Generation
        
        PROJECT DETAILS:
        - Project Name: ${name}
        - Tech Stack: ${stack}
        - Project Description: ${description}
        
        OBJECTIVE:
        Generate EXACTLY 5 strong, ATS-friendly resume bullet points for the project section.
        
        STRICT REQUIREMENTS:
        - Each bullet MUST:
          - Be between 10–14 words
          - Start with a powerful action verb
          - Sound achievement-oriented and impact-driven
          - Highlight technical implementation, scalability, performance, architecture, or functionality
          - Naturally include relevant technologies from the provided stack
          - Include measurable metrics/results whenever realistically possible
          - Be concise, professional, and recruiter-friendly
          - Follow modern software engineering resume standards
        
        - DO NOT:
          - Use generic phrases like "Worked on", "Responsible for", "Helped with"
          - Repeat the same action verb
          - Mention soft skills without technical context
          - Add fake or unrealistic achievements
          - Use first-person pronouns
          - Exceed 14 words per bullet
        
        PREFERRED FOCUS AREAS:
        - Full-stack architecture
        - API development
        - Authentication & security
        - Real-time systems
        - Database optimization
        - AI integrations
        - Performance improvements
        - Deployment & scalability
        - UI/UX enhancements
        - Team collaboration features
        - Automation or productivity gains
        
        OUTPUT RULES:
        - Return ONLY valid JSON
        - No markdown
        - No explanations
        - No extra text
        - Maintain exact schema structure
        
        OUTPUT FORMAT:
        {
          "type": "project",
          "data": [
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." },
            { "bullet": "..." }
          ]
        }
        `;
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const rawText = completion.choices[0].message.content;

    // Safe JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      throw new Error("Invalid JSON response from Grok");
    }

    res.status(200).json({
      success: true,
      data: parsedData.data,
      type: parsedData.type,
    });

  } catch (error) {
    console.error("Grok API Error:", error);
    res.status(500).json({
      success: false,
      error: "AI generation failed",
      message: error.message
    });
  }
});


aiWorkRouter.post("/resume/generate-jd", userAuth, async (req, res) => {
  try {
    const { specificRole, company, resumeCategory, broadRole } = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Please re-login" });
    }

    if (!specificRole || !resumeCategory || !broadRole || !company) {
      return res.status(400).json({
        success: false,
        message: "specificRole, resumeCategory, and broadRole are required"
      });
    }

    const prompt = buildJobDescriptionPrompt({
      specificRole,
      company,
      resumeCategory,
      broadRole,

    });

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JSON_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 2000,
    });

    const rawText = completion?.choices?.[0]?.message?.content;

    if (!rawText || rawText.trim() === "") {
      throw new Error(`AI returned empty content. finish_reason: ${completion?.choices?.[0]?.finish_reason ?? "unknown"}`);
    }

    const cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (err) {
      throw new Error(`AI returned unparseable JSON: ${err.message} — raw: ${cleanedText.slice(0, 200)}`);
    }

    const normalizeJD = (data) => ({
      jobTitle: data.jobTitle ?? specificRole,
      companySummary: data.companySummary ?? "",
      roleSummary: data.roleSummary ?? "",
      responsibilities: data.responsibilities ?? [],
      requiredSkills: data.requiredSkills ?? [],
      niceToHaveSkills: data.niceToHaveSkills ?? [],
      experienceLevel: data.experienceLevel ?? {},
      keywordsForATS: data.keywordsForATS ?? [],
      interviewFocus: data.interviewFocus ?? [],
      redFlagsForThisRole: data.redFlagsForThisRole ?? [],
      compensationSignals: data.compensationSignals ?? {},
    });

    res.status(200).json({
      success: true,
      data: normalizeJD(parsedData),
    });

  } catch (error) {
    console.error("JD Generation Error:", error);
    res.status(500).json({
      success: false,
      error: "JD generation failed",
      message: error.message,
    });
  }
});



module.exports = aiWorkRouter;