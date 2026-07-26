export default {
  topics: [
    {
      id: "syntax",
      title: "Syntax & Data Types",
      sections: [
        {
          heading: "Valid JSON value types",
          description: "JSON supports exactly 6 value types. All strings must use double quotes.",
          language: "json",
          code: `{
  "string":  "Hello, World!",
  "number":  42,
  "float":   3.14159,
  "boolean": true,
  "null":    null,
  "array":   [1, "two", false, null],
  "object":  { "nested": "value" }
}`,
        },
        {
          heading: "Objects",
          description: "Objects are unordered key-value pairs. Keys must always be double-quoted strings.",
          language: "json",
          code: `{
  "user": {
    "id":    42,
    "name":  "Vineet Chandel",
    "email": "vineet@devcheats.in",
    "role":  "admin",
    "meta": {
      "createdAt": "2024-01-15T10:30:00Z",
      "active":    true
    }
  }
}`,
        },
        {
          heading: "Arrays",
          description: "Arrays are ordered lists. Elements can be any valid JSON type and can be mixed.",
          language: "json",
          code: `{
  "tags":    ["javascript", "typescript", "react"],
  "scores":  [98, 87, 95, 100],
  "mixed":   [1, "two", true, null, { "key": "val" }],
  "matrix":  [[1, 2], [3, 4], [5, 6]],
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`,
        },
      ],
    },
    {
      id: "working-with-json",
      title: "Working with JSON",
      sections: [
        {
          heading: "Parsing & serializing (JavaScript)",
          description: "JSON.parse() converts a string to a JS object; JSON.stringify() does the reverse.",
          language: "javascript",
          code: `// Parse JSON string → JS object
const json = '{"name":"Vineet","age":28}';
const obj  = JSON.parse(json);
console.log(obj.name); // "Vineet"

// Stringify with pretty-printing (2-space indent)
const pretty = JSON.stringify(obj, null, 2);

// Replacer — include only specific keys
const slim = JSON.stringify(user, ["id", "email"], 2);

// Reviver — transform values on parse
const parsed = JSON.parse(data, (key, value) => {
  if (key === "createdAt") return new Date(value);
  return value;
});`,
        },
        {
          heading: "Deep clone with JSON",
          description: "JSON round-trip is a quick deep clone — but it drops undefined, functions, and Dates become strings.",
          language: "javascript",
          code: `const original = { a: 1, b: { c: 2 } };

// Deep clone via JSON (loses Date, undefined, functions)
const clone = JSON.parse(JSON.stringify(original));

// Modern alternative (Node 17+ / Chrome 98+)
const clone2 = structuredClone(original); // handles Date, Map, Set`,
        },
        {
          heading: "JSON in HTTP APIs",
          description: "Always set Content-Type and use JSON.parse/stringify when exchanging data over HTTP.",
          language: "javascript",
          code: `// Sending JSON
const res = await fetch("/api/users", {
  method:  "POST",
  headers: { "Content-Type": "application/json" },
  body:    JSON.stringify({ name: "Vineet", email: "v@example.com" }),
});

// Receiving JSON
const data = await res.json(); // shorthand for res.text() → JSON.parse()`,
        },
      ],
    },
    {
      id: "json-schema",
      title: "JSON Schema",
      sections: [
        {
          heading: "Defining a schema",
          description: "JSON Schema validates JSON documents. Used by OpenAPI, VS Code intellisense, and form libraries.",
          language: "json",
          code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "title": "User",
  "required": ["id", "name", "email"],
  "properties": {
    "id":    { "type": "integer", "minimum": 1 },
    "name":  { "type": "string",  "minLength": 2, "maxLength": 100 },
    "email": { "type": "string",  "format": "email" },
    "role":  { "type": "string",  "enum": ["user", "admin"] },
    "tags":  {
      "type": "array",
      "items": { "type": "string" },
      "uniqueItems": true
    }
  }
}`,
        },
        {
          heading: "package.json key fields",
          description: "The most important fields in a Node.js project's package.json.",
          language: "json",
          code: `{
  "name":    "my-app",
  "version": "1.0.0",
  "type":    "module",
  "main":    "./dist/index.js",
  "exports": {
    ".":  "./dist/index.js",
    "./utils": "./dist/utils.js"
  },
  "scripts": {
    "dev":   "vite",
    "build": "tsc && vite build",
    "test":  "vitest"
  },
  "engines": { "node": ">=20" },
  "dependencies":    {},
  "devDependencies": {}
}`,
        },
      ],
    },
  ],
};
