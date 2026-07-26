export default {
  topics: [
    {
      id: "modules",
      title: "Modules & File System",
      sections: [
        {
          heading: "ESM vs CommonJS",
          description: "Node supports both. ESM (import/export) requires \"type\": \"module\" in package.json or .mjs extension.",
          language: "javascript",
          code: `// CommonJS (default)
const fs   = require("fs");
const path = require("path");
module.exports = { greet };

// ESM (package.json: "type": "module")
import { readFile } from "node:fs/promises";
import path from "node:path";
export { greet };`,
        },
        {
          heading: "Reading & writing files",
          description: "Prefer the promise-based fs/promises API over the callback version for cleaner async code.",
          language: "javascript",
          code: `import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Read a file as UTF-8 text
const content = await readFile("./data.json", "utf8");
const data = JSON.parse(content);

// Write (creates or overwrites)
await writeFile("./output.json", JSON.stringify(data, null, 2), "utf8");

// Create directory recursively
await mkdir(path.join("dist", "assets"), { recursive: true });`,
        },
        {
          heading: "Path utilities",
          description: "Always use path.join / path.resolve instead of string concatenation to handle OS path separators.",
          language: "javascript",
          code: `import path from "node:path";
import { fileURLToPath } from "node:url";

// __dirname equivalent in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Safely join paths
const filePath = path.join(__dirname, "data", "users.json");

// Resolve to an absolute path
const absPath = path.resolve("./src/index.js");

// Extension and base name
path.extname("bundle.min.js");  // ".js"
path.basename("dist/app.js");   // "app.js"`,
        },
        {
          heading: "Directory listing",
          description: "readdir returns file names; use withFileTypes to get Dirent objects with isFile() / isDirectory().",
          language: "javascript",
          code: `import { readdir } from "node:fs/promises";

// Just file names
const entries = await readdir("./src");

// With type info
const dirents = await readdir("./src", { withFileTypes: true });
const files = dirents
  .filter((d) => d.isFile())
  .map((d) => d.name);`,
        },
      ],
    },
    {
      id: "http",
      title: "HTTP Server",
      sections: [
        {
          heading: "Minimal HTTP server",
          description: "Node's built-in http module is sufficient for simple servers without Express.",
          language: "javascript",
          code: `import { createServer } from "node:http";

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(404);
  res.end("Not found");
});

server.listen(3000, () => console.log("Listening on :3000"));`,
        },
        {
          heading: "Parsing the request body",
          description: "HTTP bodies arrive as a stream. Collect chunks into a buffer then parse.",
          language: "javascript",
          code: `function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

// Inside the request handler:
const raw  = await readBody(req);
const body = JSON.parse(raw);`,
        },
        {
          heading: "Fetch API (Node 18+)",
          description: "Node 18 ships a native fetch — no node-fetch package needed.",
          language: "javascript",
          code: `// GET request
const res  = await fetch("https://api.example.com/users");
const data = await res.json();

// POST with JSON body
const created = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Vineet" }),
});

if (!created.ok) throw new Error(\`HTTP \${created.status}\`);`,
        },
      ],
    },
    {
      id: "environment",
      title: "Environment & Process",
      sections: [
        {
          heading: "Reading environment variables",
          description: "process.env holds all environment variables. Use a fallback so the app doesn't crash when a var is missing.",
          language: "javascript",
          code: `// Read with fallback
const PORT    = process.env.PORT    ?? 3000;
const NODE_ENV = process.env.NODE_ENV ?? "development";
const DB_URL  = process.env.DATABASE_URL;

if (!DB_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}`,
        },
        {
          heading: "Command-line arguments",
          description: "process.argv[0] is node, [1] is the script path, [2+] are user arguments.",
          language: "javascript",
          code: `// node script.js --env production --port 4000
const args = process.argv.slice(2);

// Simple flag parsing
const envFlag  = args.indexOf("--env");
const portFlag = args.indexOf("--port");

const env  = envFlag  !== -1 ? args[envFlag  + 1] : "development";
const port = portFlag !== -1 ? Number(args[portFlag + 1]) : 3000;`,
        },
        {
          heading: "Graceful shutdown",
          description: "Listen for SIGTERM (sent by process managers like PM2 / Docker) and SIGINT (Ctrl+C) to clean up before exit.",
          language: "javascript",
          code: `const server = createServer(handler);
server.listen(3000);

const shutdown = (signal) => {
  console.log(\`Received \${signal}, shutting down…\`);
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT",  () => shutdown("SIGINT"));`,
        },
      ],
    },
    {
      id: "streams",
      title: "Streams",
      sections: [
        {
          heading: "Piping streams",
          description: "pipe connects a readable to a writable. pipeline (promisified) handles errors and cleanup properly.",
          language: "javascript",
          code: `import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

// Compress a file using streaming (no memory spike)
await pipeline(
  createReadStream("./large-file.log"),
  createGzip(),
  createWriteStream("./large-file.log.gz")
);`,
        },
        {
          heading: "Consuming a readable stream",
          description: "Use for await...of to iterate over chunks without manual event listeners.",
          language: "javascript",
          code: `import { createReadStream } from "node:fs";

const stream = createReadStream("./data.ndjson", { encoding: "utf8" });
const lines  = [];

for await (const chunk of stream) {
  lines.push(...chunk.split("\\n").filter(Boolean));
}

const records = lines.map(JSON.parse);`,
        },
        {
          heading: "Transform streams",
          description: "Transform sits between a readable and writable, modifying data as it passes through.",
          language: "javascript",
          code: `import { Transform } from "node:stream";

const upperCase = new Transform({
  transform(chunk, _encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

process.stdin.pipe(upperCase).pipe(process.stdout);`,
        },
      ],
    },
  ],
};
