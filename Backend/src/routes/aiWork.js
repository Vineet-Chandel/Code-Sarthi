const express = require("express");
const aiWorkRouter = express.Router();

const OpenAI = require("openai");
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

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
aiWorkRouter.post("/generate-exp-pointer", async (req, res) => {
    const { jobRole, company, employmentType } = req.body;
    console.log(process.env.XAI_API_KEY);
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
            model: "openai/gpt-oss-20b",
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


aiWorkRouter.post("/generate-edu-pointer", async (req, res) => {
    const { degree, field, cgpa, college, graduationYear } = req.body;
    console.log(process.env.XAI_API_KEY);
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
            model: "openai/gpt-oss-20b",
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

aiWorkRouter.post("/generate-skills", async (req, res) => {
    const { category } = req.body;
    console.log(process.env.XAI_API_KEY);
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
            model: "openai/gpt-oss-20b",
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

aiWorkRouter.post("/generate-summary", async (req, res) => {
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

        // console.log(
        //     JSON.stringify(completion, null, 2)
        // );
        const rawText =
            completion?.choices?.[0]?.message?.content || "";

        // console.log("RAW AI RESPONSE:\n", rawText);
        if (!rawText) {
            return res.status(500).json({
                success: false,
                error: "Empty AI response",
            });
        }





        let parsedData;
        console.log(typeof rawText);
        console.log(rawText);
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

aiWorkRouter.post("/improve-pointer", async (req, res) => {
    const { bullet } = req.body;
    console.log(process.env.XAI_API_KEY);
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
            model: "openai/gpt-oss-20b",
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

aiWorkRouter.post("/generate-project-pointer", async (req, res) => {
    const { name, stack, description } = req.body;
    console.log(process.env.XAI_API_KEY);
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
            model: "openai/gpt-oss-20b",
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

module.exports = aiWorkRouter;