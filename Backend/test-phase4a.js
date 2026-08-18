const mongoose = require('mongoose');
const Repository = require('./src/models/repository');
const Branch = require('./src/models/branch');
const Commit = require('./src/models/commit');
const PullRequest = require('./src/models/pullRequest');
const IssueLink = require('./src/models/issueLink');
const GithubEvent = require('./src/models/githubEvent');
require('dotenv').config();

async function run() {
  try {
    await mongoose.connect(process.env.DB_LINK);
    console.log("Connected to MongoDB for testing constraints.");

    // Wait for Mongoose to build unique indexes
    await Repository.init();
    await Commit.init();
    await PullRequest.init();
    await IssueLink.init();
    await GithubEvent.init();
    console.log("Indexes initialized.");

    const teamId1 = new mongoose.Types.ObjectId();
    const teamId2 = new mongoose.Types.ObjectId();
    const projectId1 = new mongoose.Types.ObjectId();
    const issueId1 = new mongoose.Types.ObjectId();
    const issueId2 = new mongoose.Types.ObjectId();

    // Cleanup any stale test records from previous run first
    await Repository.deleteMany({ githubRepositoryId: { $in: [10001, 10002] } });
    await GithubEvent.deleteMany({ githubEventId: "delivery-12345" });

    // 1. Test Unique Repository
    console.log("\n--- Testing Unique Repository ---");
    const repo1 = await Repository.create({
      teamId: teamId1,
      projectId: projectId1,
      githubRepositoryId: 10001,
      owner: "test-owner",
      name: "repo-1",
      installationId: 55555
    });
    console.log("Successfully created Repository 1");

    try {
      await Repository.create({
        teamId: teamId1,
        projectId: projectId1,
        githubRepositoryId: 10001, // Duplicate ID
        owner: "test-owner",
        name: "repo-2",
        installationId: 55555
      });
      console.error("FAIL: Allowed duplicate githubRepositoryId!");
    } catch (err) {
      console.log("PASS: Blocked duplicate githubRepositoryId correctly.", err.message);
    }

    const repo2 = await Repository.create({
      teamId: teamId2,
      githubRepositoryId: 10002,
      owner: "test-owner",
      name: "repo-2",
      installationId: 55556
    });
    console.log("Successfully created Repository 2");

    // 2. Test Unique Commit SHA per Repository
    console.log("\n--- Testing Unique Commit SHA per Repository ---");
    const commit1 = await Commit.create({
      repositoryId: repo1._id,
      sha: "sha1234567890",
      author: { name: "Author", email: "author@test.com" },
      message: "Initial commit",
      timestamp: new Date()
    });
    console.log("Successfully created Commit 1 on Repo 1");

    try {
      await Commit.create({
        repositoryId: repo1._id,
        sha: "sha1234567890", // Duplicate SHA on same Repo
        author: { name: "Author 2", email: "author2@test.com" },
        message: "Duplicate commit",
        timestamp: new Date()
      });
      console.error("FAIL: Allowed duplicate SHA on the same repository!");
    } catch (err) {
      console.log("PASS: Blocked duplicate SHA on same repository correctly.", err.message);
    }

    const commit2 = await Commit.create({
      repositoryId: repo2._id,
      sha: "sha1234567890", // Same SHA, but different Repo (Allowed)
      author: { name: "Author", email: "author@test.com" },
      message: "Forked initial commit",
      timestamp: new Date()
    });
    console.log("PASS: Allowed same SHA on different repositories.");

    // 3. Test Unique PR Number per Repository
    console.log("\n--- Testing Unique PR Number per Repository ---");
    const pr1 = await PullRequest.create({
      repositoryId: repo1._id,
      githubPrNumber: 1,
      title: "Add README",
      sourceBranch: "feature/readme",
      targetBranch: "main",
      headSha: "headsha123"
    });
    console.log("Successfully created PR 1 on Repo 1");

    try {
      await PullRequest.create({
        repositoryId: repo1._id,
        githubPrNumber: 1, // Duplicate PR number
        title: "Another add README",
        sourceBranch: "feature/readme2",
        targetBranch: "main",
        headSha: "headsha124"
      });
      console.error("FAIL: Allowed duplicate PR number on same repository!");
    } catch (err) {
      console.log("PASS: Blocked duplicate PR number on same repository correctly.", err.message);
    }

    // 4. Test Many-to-Many Issue Links and deduplication
    console.log("\n--- Testing Many-to-Many Issue Links ---");
    const link1 = await IssueLink.create({
      issueId: issueId1,
      entityType: "pull_request",
      entityId: pr1._id,
      linkedBy: "developer"
    });
    console.log("Successfully linked Issue 1 to PR 1");

    const link2 = await IssueLink.create({
      issueId: issueId2,
      entityType: "pull_request",
      entityId: pr1._id,
      linkedBy: "ai"
    });
    console.log("Successfully linked Issue 2 to same PR 1 (Many issues to one entity)");

    const link3 = await IssueLink.create({
      issueId: issueId1,
      entityType: "commit",
      entityId: commit1._id,
      linkedBy: "commit_message"
    });
    console.log("Successfully linked Issue 1 to Commit 1 (One issue to many entities)");

    try {
      await IssueLink.create({
        issueId: issueId1,
        entityType: "pull_request",
        entityId: pr1._id,
        linkedBy: "developer" // Duplicate link (same issueId, entityType, entityId)
      });
      console.error("FAIL: Allowed duplicate link between same Issue and same PR!");
    } catch (err) {
      console.log("PASS: Blocked duplicate link mapping correctly.", err.message);
    }

    // 5. Test Webhook Event Deduplication
    console.log("\n--- Testing Webhook Event Deduplication ---");
    const event1 = await GithubEvent.create({
      githubEventId: "delivery-12345",
      eventType: "push",
      payload: { commits: [] }
    });
    console.log("Successfully created Webhook Event 1");

    try {
      await GithubEvent.create({
        githubEventId: "delivery-12345", // Duplicate delivery ID
        eventType: "push",
        payload: { commits: [] }
      });
      console.error("FAIL: Allowed duplicate webhook event delivery!");
    } catch (err) {
      console.log("PASS: Blocked duplicate webhook event correctly.", err.message);
    }

    // Cleanup
    console.log("\nCleaning up test data...");
    await Repository.deleteMany({ _id: { $in: [repo1._id, repo2._id] } });
    await Commit.deleteMany({ _id: { $in: [commit1._id, commit2._id] } });
    await PullRequest.deleteMany({ _id: pr1._id });
    await IssueLink.deleteMany({ _id: { $in: [link1._id, link2._id, link3._id] } });
    await GithubEvent.deleteMany({ _id: event1._id });
    console.log("Cleanup complete.");

  } catch (e) {
    console.error("ERROR during testing:", e);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}
run();
