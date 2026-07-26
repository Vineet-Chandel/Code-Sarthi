// Content schema (used identically by every technology):
// {
//   topics: [
//     {
//       id: string,            // used for sidebar anchors / deep-linking
//       title: string,
//       sections: [
//         {
//           heading: string,
//           description?: string,
//           code?: string,
//           language?: string,  // for syntax highlighting
//         }
//       ]
//     }
//   ]
// }

export default {
  topics: [
    {
      id: "arrays",
      title: "Arrays",
      sections: [
        {
          heading: "Mapping & transforming",
          description: "Create a new array by applying a function to every element.",
          language: "javascript",
          code: `const doubled = [1, 2, 3].map((n) => n * 2);
// [2, 4, 6]`,
        },
        {
          heading: "Filtering",
          description: "Keep only the elements that pass a test.",
          language: "javascript",
          code: `const evens = [1, 2, 3, 4].filter((n) => n % 2 === 0);
// [2, 4]`,
        },
        {
          heading: "Reducing",
          description: "Fold an array down into a single accumulated value.",
          language: "javascript",
          code: `const total = [1, 2, 3].reduce((sum, n) => sum + n, 0);
// 6`,
        },
        {
          heading: "Destructuring",
          description: "Unpack values from arrays into distinct variables.",
          language: "javascript",
          code: `const [first, second, ...rest] = [10, 20, 30, 40];
// first = 10, second = 20, rest = [30, 40]`,
        },
      ],
    },
    {
      id: "async",
      title: "Async & Promises",
      sections: [
        {
          heading: "Async / await",
          description: "Write asynchronous code that reads like synchronous code.",
          language: "javascript",
          code: `async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}`,
        },
        {
          heading: "Promise.all",
          description: "Run multiple promises concurrently and wait for all to resolve.",
          language: "javascript",
          code: `const [users, posts] = await Promise.all([
  fetch("/api/users").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
]);`,
        },
        {
          heading: "Error handling",
          description: "Wrap awaited calls in try/catch to handle rejected promises.",
          language: "javascript",
          code: `try {
  const data = await getUser(1);
} catch (err) {
  console.error(err.message);
}`,
        },
      ],
    },
    {
      id: "objects",
      title: "Objects",
      sections: [
        {
          heading: "Spread & merge",
          description: "Combine or clone objects immutably.",
          language: "javascript",
          code: `const base = { name: "Vineet", role: "Engineer" };
const updated = { ...base, role: "Founder" };`,
        },
        {
          heading: "Optional chaining",
          description: "Safely access deeply nested properties without throwing.",
          language: "javascript",
          code: `const city = user?.address?.city ?? "Unknown";`,
        },
        {
          heading: "Object.entries",
          description: "Iterate over key-value pairs of an object.",
          language: "javascript",
          code: `for (const [key, value] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, value);
}`,
        },
      ],
    },
  ],
};
