export default {
  topics: [
    {
      id: "prompting",
      title: "Prompt Engineering',",
      sections: [
        {
          heading: "Prompt anatomy",
          description: "The best prompts have a clear role, context, task, and output format.",
          language: "bash",
          code: `# Structure: Role + Context + Task + Format

You are a senior TypeScript engineer reviewing a pull request.

Context:
- This is a Next.js 14 app using App Router
- We enforce strict TypeScript and ESLint rules
- Tests use Vitest + React Testing Library

Task:
Review the following component for type safety, accessibility,
and potential performance issues:

\`\`\`tsx
[paste code here]
\`\`\`

Output format:
1. Summary (2 sentences)
2. Issues (severity: critical/warning/suggestion)
3. Refactored version with inline comments`,
        },
        {
          heading: "Effective techniques',",
          description: "These techniques consistently improve response quality across different tasks.",
          language: "bash",
          code: `# Chain-of-Thought — ask it to think step by step
"Solve this problem step by step, explaining your reasoning."

# Few-shot examples — show 1-2 examples
"Format the following data as this example:
Input: Vineet, 28, Mumbai
Output: { name: 'Vineet', age: 28, city: 'Mumbai' }

Now format: Alice, 34, London"

# Role assignment
"You are a security expert. Review this code for vulnerabilities."

# Constraint setting
"Explain closures in JavaScript. Use a single metaphor.
Max 3 paragraphs. No code examples."

# Iterative refinement
"The previous answer was too abstract. Make it more concrete
with a real-world analogy a junior developer would understand."`,
        },
        {
          heading: "Prompt templates',",
          description: "Reusable templates for the most common developer tasks.",
          language: "bash",
          code: `# Explain code
"Explain what this code does, line by line. Note any
gotchas or performance concerns. Audience: junior dev.\n\n[code]"

# Generate tests
"Write Vitest unit tests for this function. Cover: happy path,
edge cases, and error cases. Mock external dependencies.\n\n[code]"

# Debug help
"This code throws [error]. I expected [behavior] but got [actual].
Here is the code:\n\n[code]\n\nHere is the error:\n\n[error]"

# Refactor
"Refactor this code to improve readability and maintainability.
Keep the same logic. Use modern TypeScript idioms.\n\n[code]"`,
        },
      ],
    },
    {
      id: "openai-api",
      title: "OpenAI API',",
      sections: [
        {
          heading: "Chat completions",
          description: "The chat/completions endpoint is the standard API for GPT-4 and GPT-4o.",
          language: "javascript",
          code: `import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content: "You are a helpful coding assistant for DevCheats.",
    },
    {
      role: "user",
      content: "Explain the difference between let and const.",
    },
  ],
  max_tokens:  1000,
  temperature: 0.3,   // lower = more deterministic
});

console.log(response.choices[0].message.content);
console.log("Tokens used:", response.usage);`,
        },
        {
          heading: "Streaming',",
          description: "Stream tokens to the client in real time for a responsive chat UI.",
          language: "javascript",
          code: `const stream = await client.chat.completions.create({
  model:    "gpt-4o",
  messages: [{ role: "user", content: "List 10 JS array methods." }],
  stream:   true,
});

// Iterate over streamed chunks
for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content ?? "";
  process.stdout.write(delta);  // stream to terminal
}

// In Express — stream to browser
app.get("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  const stream = await client.chat.completions.create({
    model: "gpt-4o", messages: [...], stream: true,
  });
  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content ?? "";
    res.write(\`data: \${JSON.stringify({ text })}\\n\\n\`);
  }
  res.end();
});`,
        },
        {
          heading: "Structured output (JSON mode)',",
          description: "Force the model to return valid JSON by using response_format or tool calls.",
          language: "javascript",
          code: `// JSON mode — the model will always return valid JSON
const response = await client.chat.completions.create({
  model: "gpt-4o",
  response_format: { type: "json_object" },
  messages: [
    {
      role: "system",
      content: "Return a JSON object with 'technologies' array of {name, category} objects.",
    },
    { role: "user", content: "List 5 web development technologies." },
  ],
});

const { technologies } = JSON.parse(response.choices[0].message.content);

// Structured outputs (GPT-4o, strict mode)
const response2 = await client.beta.chat.completions.parse({
  model: "gpt-4o",
  messages: [{ role: "user", content: "..." }],
  response_format: zodResponseFormat(MyZodSchema, "result"),
});
const parsed = response2.choices[0].message.parsed;`,
        },
      ],
    },
    {
      id: "common-patterns",
      title: "Common Patterns',",
      sections: [
        {
          heading: "RAG — Retrieval Augmented Generation',",
          description: "Inject relevant context into the prompt to ground responses in your own data.",
          language: "javascript",
          code: `async function ragQuery(userQuestion, db) {
  // 1. Embed the question
  const { data: [{ embedding }] } = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: userQuestion,
  });

  // 2. Find relevant docs (cosine similarity in vector DB)
  const docs = await db.similarity_search(embedding, { top_k: 5 });
  const context = docs.map((d) => d.content).join("\\n\\n---\\n\\n");

  // 3. Answer with context
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: \`Answer using this context:\\n\\n\${context}\` },
      { role: "user",   content: userQuestion },
    ],
  });
  return response.choices[0].message.content;
}`,
        },
        {
          heading: "Function calling (tool use)',",
          description: "Tools let the model call your functions to fetch live data or take actions.",
          language: "javascript",
          code: `const tools = [{
  type: "function",
  function: {
    name: "get_weather",
    description: "Get current weather for a city",
    parameters: {
      type: "object",
      properties: {
        city: { type: "string", description: "City name" },
      },
      required: ["city"],
    },
  },
}];

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "What's the weather in Mumbai?" }],
  tools,
  tool_choice: "auto",
});

const toolCall = response.choices[0].message.tool_calls?.[0];
if (toolCall?.function.name === "get_weather") {
  const { city } = JSON.parse(toolCall.function.arguments);
  const weather = await fetchWeather(city);
  // Send result back to model for final answer
}`,
        },
      ],
    },
  ],
};
