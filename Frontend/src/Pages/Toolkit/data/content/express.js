export default {
  topics: [
    {
      id: "routing",
      title: "Routing",
      sections: [
        {
          heading: "Basic routes",
          description: "Route methods map HTTP verbs to handler functions. Each handler receives req and res.",
          language: "javascript",
          code: `import express from "express";
const app = express();

app.get("/",          (req, res) => res.send("Home"));
app.post("/users",    (req, res) => res.status(201).json({ created: true }));
app.put("/users/:id", (req, res) => res.json({ id: req.params.id }));
app.delete("/users/:id", (req, res) => res.status(204).send());

app.listen(3000, () => console.log("Running on :3000"));`,
        },
        {
          heading: "Route parameters & query strings",
          description: "Named segments (:param) land in req.params; ?key=value pairs land in req.query.",
          language: "javascript",
          code: `// URL: /users/42
app.get("/users/:id", (req, res) => {
  const { id } = req.params;   // "42"
  res.json({ id });
});

// URL: /search?q=node&page=2
app.get("/search", (req, res) => {
  const { q, page = 1 } = req.query;
  res.json({ q, page: Number(page) });
});

// Multiple params
// URL: /posts/2024/react-intro
app.get("/posts/:year/:slug", (req, res) => {
  res.json(req.params); // { year: "2024", slug: "react-intro" }
});`,
        },
        {
          heading: "express.Router — modular routes",
          description: "Group related routes in a Router, then mount it on a prefix in your main app.",
          language: "javascript",
          code: `// routes/users.js
import { Router } from "express";
const router = Router();

router.get("/",      getAllUsers);
router.get("/:id",   getUser);
router.post("/",     createUser);
router.put("/:id",   updateUser);
router.delete("/:id", deleteUser);

export default router;

// app.js
import usersRouter from "./routes/users.js";
app.use("/users", usersRouter);
// GET /users → getAllUsers
// GET /users/42 → getUser`,
        },
      ],
    },
    {
      id: "middleware",
      title: "Middleware",
      sections: [
        {
          heading: "Built-in middleware",
          description: "Express ships JSON parsing and static file serving out of the box since v4.16.",
          language: "javascript",
          code: `import express from "express";
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public directory
app.use(express.static("public"));

// Scoped to a path
app.use("/assets", express.static("uploads"));`,
        },
        {
          heading: "Writing middleware",
          description: "Middleware is a function (req, res, next) — call next() to pass control to the next handler.",
          language: "javascript",
          code: `// Application-level middleware
app.use((req, res, next) => {
  console.log(\`[\${req.method}] \${req.path}\`);
  next(); // must call next() or send a response
});

// Route-level (only runs on /admin/*)
app.use("/admin", (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// Multiple middlewares on one route
app.get("/profile", authenticate, authorize("admin"), getProfile);`,
        },
        {
          heading: "CORS & rate limiting (common packages)",
          description: "Third-party middleware packages follow the same (req, res, next) signature.",
          language: "javascript",
          code: `import cors from "cors";
import rateLimit from "express-rate-limit";

// CORS
app.use(cors({ origin: "https://myapp.com", credentials: true }));

// Rate limiter — 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
});
app.use("/api", limiter);`,
        },
      ],
    },
    {
      id: "error-handling",
      title: "Error Handling",
      sections: [
        {
          heading: "Error-handling middleware",
          description: "A 4-argument (err, req, res, next) function catches errors passed to next(err) from anywhere above.",
          language: "javascript",
          code: `// Must be defined AFTER all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status ?? 500;
  res.status(status).json({
    error: err.message ?? "Internal server error",
  });
});

// Triggering the error handler
app.get("/boom", (req, res, next) => {
  const err = new Error("Something went wrong");
  err.status = 400;
  next(err); // skips all remaining route handlers
});`,
        },
        {
          heading: "Async error handling",
          description: "Async route handlers need a try/catch (or a wrapper) to forward errors to next().",
          language: "javascript",
          code: `// Manual try/catch
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await db.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Reusable async wrapper utility
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/posts", asyncHandler(async (req, res) => {
  const posts = await db.getPosts();
  res.json(posts);
}));`,
        },
      ],
    },
    {
      id: "rest-patterns",
      title: "REST Patterns",
      sections: [
        {
          heading: "Standard REST resource",
          description: "Conventional URL + verb mapping for a CRUD resource.",
          language: "javascript",
          code: `const router = Router();

// Collection
router.get("/",    list);       // GET    /posts      → all posts
router.post("/",   create);     // POST   /posts      → create

// Single resource
router.get("/:id",    read);    // GET    /posts/42   → one post
router.put("/:id",    replace); // PUT    /posts/42   → full replace
router.patch("/:id",  update);  // PATCH  /posts/42   → partial update
router.delete("/:id", remove);  // DELETE /posts/42   → delete`,
        },
        {
          heading: "Sending structured responses",
          description: "Use consistent status codes and a predictable JSON shape across all endpoints.",
          language: "javascript",
          code: `// 200 OK with data
res.status(200).json({ data: user, meta: { requestId: "abc" } });

// 201 Created with Location header
res.status(201)
   .header("Location", \`/users/\${user.id}\`)
   .json({ data: user });

// 204 No Content (DELETE success)
res.status(204).send();

// 400 / 422 client error
res.status(422).json({
  error: "Validation failed",
  fields: { email: "Invalid format" },
});`,
        },
      ],
    },
  ],
};
