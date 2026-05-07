const express = require("express");
const aiWorkRouter = express.Router();

const OpenAI = require("openai");
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

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
You are an expert resume writer and ATS optimization specialist.

Context:
- Role: ${jobRole}
- Company: ${company}
- Employment Type: ${employmentType}

Task:
Generate EXACTLY 5 resume bullet points.

STRICT RULES:
1. Each bullet MUST be a SINGLE LINE (max 12–15 words).
2. Follow the XYZ formula:
   Accomplished [X] measured by [Y] by doing [Z].
3. Include at least ONE measurable metric.
4. Use strong action verbs.
5. Include relevant tools/technologies.
6. Avoid generic phrases.
7. Ensure uniqueness.

Return ONLY valid JSON:
{
  "pointers": [
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
            data: parsedData.pointers,
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
You are an expert resume writer and ATS optimization specialist.

Context:
- Degree: ${degree}
- Field of Study: ${feild}
- Institution: ${college}
- CGPA: ${cgpa}
- Graduation Year: ${graduationYear}

Task:
Generate EXACTLY 5 education resume bullet points.

STRICT RULES:
1. Each bullet MUST be a SINGLE LINE (max 12–15 words).
2. Focus on academic achievements, coursework, projects, leadership, certifications, or performance.
3. Include measurable details whenever possible (CGPA, rankings, percentages, project impact, etc.).
4. Use strong action verbs.
5. Mention relevant tools, technologies, subjects, or activities if applicable.
6. Avoid generic phrases like "hardworking student."
7. Ensure every bullet is unique and ATS-friendly.
8. Keep bullets professional and concise.

Return ONLY valid JSON:
{
  "pointers": [
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
            data: parsedData.pointers,
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