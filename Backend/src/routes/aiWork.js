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