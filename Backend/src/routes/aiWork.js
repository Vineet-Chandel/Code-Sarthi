const express = require("express");
const aiWorkRouter = express.Router();

const OpenAI = require("openai");
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
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
aiWorkRouter.post("/generate-exp-pointer", async (req, res) => {
    const { jobRole, company, employmentType } = req.body;
    console.log(process.env.XAI_API_KEY);
    // Validation
    if (!jobRole && !company || !employmentType) {
        return res.status(400).json({
            error: "Incomplete Data",
            message: "jobRole, company, and employmentType are required.",
        });
    }

    try {
        const prompt = `
${MASTER_SYSTEM_PROMPT}

TASK TYPE:
Professional Experience Resume Bullets

CONTEXT:
- Role: ${jobRole}
- Company: ${company}
- Employment Type: ${employmentType}

TASK:
Generate EXACTLY 5 ATS-optimized experience bullet points.

EXPERIENCE RULES:
- Follow XYZ format naturally
- Maximum 14 words per bullet
- Every bullet must start with a unique strong action verb
- Include metrics whenever realistic
- Mention tools/technologies naturally
- Focus on impact, optimization, scalability, automation, leadership, or performance
- Make every bullet feel like real industry experience
- Avoid generic developer phrases

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
                { role: "system", content: "You generate strict JSON only." },
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
    const { degree, feild, cgpa, college, graduationYear } = req.body;
    console.log(process.env.XAI_API_KEY);
    // Validation
    if (!degree || !feild || !cgpa || !college) {
        return res.status(400).json({
            error: "Incomplete Data",
            message: "degree, feild, cgpa, and college are required.",
        });
    }

    try {
        const prompt = `
${MASTER_SYSTEM_PROMPT}

TASK TYPE:
Education Resume Bullets

CONTEXT:
- Degree: ${degree}
- Field: ${feild}
- Institution: ${college}
- CGPA: ${cgpa}
- Graduation Year: ${graduationYear}

TASK:
Generate EXACTLY 5 ATS-optimized education bullet points.

EDUCATION RULES:
- Maximum 14 words per bullet
- Focus on academics, achievements, coursework, leadership, certifications, research, projects
- Mention technical subjects/tools naturally
- Include measurable achievements where realistic
- Keep tone professional and recruiter-friendly
- Avoid generic student phrases

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
                { role: "system", content: "You generate strict JSON only." },
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

TASK TYPE:
Resume Skills Generation

CONTEXT:
- Skill Category: ${category}

TASK:
Generate EXACTLY 15 highly relevant resume skills.

SKILL RULES:
- Skills must be ATS-relevant
- Include tools, frameworks, technologies, platforms, methodologies, or concepts
- Keep skills concise
- Avoid duplicate technologies
- Avoid generic soft skills
- Prefer industry-standard naming
- Include modern and trending technologies when relevant

OUTPUT FORMAT:
{
  "type": "skills",
  "data": [
    { "skill": "React.js" },
    { "skill": "Node.js" },
    { "skill": "MongoDB" }
  ]
}
`;
        const completion = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                { role: "system", content: "You generate strict JSON only." },
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

TASK TYPE:
Resume Bullet Enhancement

ORIGINAL BULLET:
"${bullet}"

TASK:
Rewrite the bullet into a stronger ATS-optimized resume bullet.

IMPROVEMENT RULES:
- Preserve original meaning
- Improve professionalism
- Use stronger action verbs
- Improve clarity and readability
- Add measurable impact only if naturally possible
- Keep under 16 words
- Make it concise and technical
- Remove weak phrasing
- Avoid exaggeration

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
                { role: "system", content: "You generate strict JSON only." },
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

module.exports = aiWorkRouter;