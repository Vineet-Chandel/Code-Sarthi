export default {
  topics: [
    {
      id: "crud",
      title: "CRUD Operations",
      sections: [
        {
          heading: "Insert & find",
          description: "MongoDB stores documents in collections. Filters use the same JSON-like syntax as documents.",
          language: "javascript",
          code: `const { MongoClient } = require("mongodb");
const db = client.db("devcheats");
const posts = db.collection("posts");

// Insert one
const result = await posts.insertOne({
  title: "Hello MongoDB",
  tags: ["mongodb", "nosql"],
  author: { name: "Vineet", email: "v@x.com" },
  views: 0,
  createdAt: new Date(),
});
console.log("Inserted:", result.insertedId);

// Insert many
await posts.insertMany([{ title: "Post 2" }, { title: "Post 3" }]);

// Find one
const post = await posts.findOne({ _id: result.insertedId });

// Find many with filter
const recent = await posts
  .find({ createdAt: { $gte: new Date("2024-01-01") } })
  .sort({ createdAt: -1 })
  .limit(10)
  .toArray();`,
        },
        {
          heading: "Update & delete",
          description: "Use $set to update specific fields — not replacing the whole document.",
          language: "javascript",
          code: `const { ObjectId } = require("mongodb");
const id = new ObjectId("65a4f0b2c3d4e5f6a7b8c9d0");

// Update one — $set modifies fields, $inc increments
await posts.updateOne(
  { _id: id },
  { $set: { title: "Updated Title" }, $inc: { views: 1 } }
);

// Update many
await posts.updateMany(
  { tags: "draft" },
  { $set: { published: false } }
);

// Replace entire document
await posts.replaceOne({ _id: id }, { title: "New Doc", views: 0 });

// Delete
await posts.deleteOne({ _id: id });
await posts.deleteMany({ views: 0, createdAt: { $lt: new Date("2023-01-01") } });`,
        },
        {
          heading: "Query operators",
          description: "MongoDB's query DSL covers comparisons, logical ops, arrays, and regex.",
          language: "javascript",
          code: `// Comparison
posts.find({ views: { $gte: 100 } });          // >=
posts.find({ views: { $in: [0, 10, 50] } });   // in list
posts.find({ views: { $exists: false } });      // field missing

// Logical
posts.find({ $or: [{ published: true }, { featured: true }] });
posts.find({ $and: [{ views: { $gt: 10 } }, { tags: "react" }] });

// Array
posts.find({ tags: "react" });                   // element in array
posts.find({ tags: { $all: ["react", "ts"] } }); // contains all
posts.find({ tags: { $size: 3 } });              // exact size

// Regex
posts.find({ title: { $regex: /hello/i } });`,
        },
      ],
    },
    {
      id: "aggregation",
      title: "Aggregation Pipeline",
      sections: [
        {
          heading: "Pipeline stages",
          description: "Aggregation pipelines transform documents through a series of stages.",
          language: "javascript",
          code: `const stats = await posts.aggregate([
  // Stage 1: filter
  { $match: { published: true } },

  // Stage 2: group and aggregate
  { $group: {
    _id: "$category",
    count:     { $sum: 1 },
    totalViews: { $sum: "$views" },
    avgViews:   { $avg: "$views" },
    topPost:    { $max: "$views" },
  }},

  // Stage 3: sort results
  { $sort: { totalViews: -1 } },

  // Stage 4: limit
  { $limit: 10 },

  // Stage 5: reshape output
  { $project: {
    category: "$_id",
    count: 1,
    totalViews: 1,
    _id: 0,
  }},
]).toArray();`,
        },
        {
          heading: "$lookup — join collections",
          description: "$lookup performs a left outer join between collections.",
          language: "javascript",
          code: `const postsWithAuthors = await posts.aggregate([
  { $match: { published: true } },
  {
    $lookup: {
      from:         "users",        // collection to join
      localField:   "authorId",     // field in posts
      foreignField: "_id",          // field in users
      as:           "author",       // output field (array)
    },
  },
  // Unwind the array to get a single object
  { $unwind: { path: "$author", preserveNullAndEmpty: true } },
  {
    $project: {
      title: 1,
      views: 1,
      "author.name":  1,
      "author.email": 1,
    },
  },
]).toArray();`,
        },
      ],
    },
    {
      id: "indexes",
      title: "Indexes",
      sections: [
        {
          heading: "Creating indexes",
          description: "Indexes dramatically speed up queries. Create them on fields used in find() filters and sort().",
          language: "javascript",
          code: `// Single field
await posts.createIndex({ createdAt: -1 });  // descending

// Compound index (query order matters)
await posts.createIndex({ authorId: 1, createdAt: -1 });

// Unique index
await db.collection("users").createIndex({ email: 1 }, { unique: true });

// Text index for full-text search
await posts.createIndex({ title: "text", body: "text" });

// Sparse — only index docs that have the field
await posts.createIndex({ deletedAt: 1 }, { sparse: true });

// TTL — auto-delete documents after N seconds
await db.collection("sessions").createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);`,
        },
        {
          heading: "explain() — query analysis",
          description: "Use explain() to verify that your queries are using indexes.",
          language: "javascript",
          code: `const plan = await posts
  .find({ authorId: new ObjectId("..."), published: true })
  .sort({ createdAt: -1 })
  .explain("executionStats");

// Check:
// plan.queryPlanner.winningPlan.inputStage.stage
// → "IXSCAN" = index used ✅
// → "COLLSCAN" = full scan ❌ (needs an index)

// plan.executionStats.totalKeysExamined  (should be small)
// plan.executionStats.executionTimeMillis`,
        },
      ],
    },
    {
      id: "mongoose",
      title: "Mongoose ODM",
      sections: [
        {
          heading: "Schema & model",
          description: "Mongoose adds schema validation, virtuals, and middleware on top of the MongoDB driver.",
          language: "javascript",
          code: `import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title:     { type: String, required: true, maxlength: 200 },
  body:      String,
  tags:      [String],
  author:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  views:     { type: Number, default: 0 },
  published: { type: Boolean, default: false },
}, { timestamps: true });   // auto createdAt + updatedAt

// Virtual — not stored in DB
postSchema.virtual("excerpt").get(function () {
  return this.body?.slice(0, 200) + "…";
});

// Middleware
postSchema.pre("save", function (next) {
  this.slug = this.title.toLowerCase().replace(/\s+/g, "-");
  next();
});

export const Post = mongoose.model("Post", postSchema);`,
        },
      ],
    },
  ],
};
