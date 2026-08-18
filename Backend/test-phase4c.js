const mongoose = require("mongoose");
const Project = require("./src/models/project");
const Repository = require("./src/models/repository");
const Branch = require("./src/models/branch");
const Commit = require("./src/models/commit");
const PullRequest = require("./src/models/pullRequest");
const CIExecution = require("./src/models/ciExecution");
const EventOutbox = require("./src/models/eventOutbox");
const { syncRepositoryData } = require("./src/workers/githubSyncWorker");
require("dotenv").config();

async function run() {
  try {
    await mongoose.connect(process.env.DB_LINK);
    console.log("Connected to MongoDB for testing synchronization.");

    // Initializations
    await Project.init();
    await Repository.init();
    await Branch.init();
    await Commit.init();
    await PullRequest.init();
    await CIExecution.init();
    await EventOutbox.init();

    const teamId = new mongoose.Types.ObjectId();
    const creatorId = new mongoose.Types.ObjectId();

    // 1. Create dummy Project
    const project = await Project.create({
      teamId,
      title: "Test Sync Project",
      description: "Testing repository synchronization",
      createdBy: creatorId
    });
    console.log("Created test project:", project._id);

    // 2. Create dummy connected Repository
    const repository = await Repository.create({
      teamId,
      projectId: project._id,
      githubRepositoryId: 887263,
      owner: "codesarthi-projects",
      name: "auth-service",
      defaultBranch: "main",
      installationId: 444332
    });
    console.log("Created test Repository mapping:", repository._id);

    // 3. Run synchronization worker directly
    console.log("\n--- Testing Initial Repository Sync Run 1 ---");
    await syncRepositoryData(project._id, repository._id);

    // Verify Repository syncStatus is COMPLETED
    const syncRepo = await Repository.findById(repository._id);
    console.log("Sync Status after run 1:", syncRepo.syncStatus);
    if (syncRepo.syncStatus === 'COMPLETED') {
      console.log("PASS: Repository syncStatus is COMPLETED.");
    } else {
      console.error("FAIL: Repository syncStatus was not updated correctly!");
    }

    // Verify branches synced
    const branchCount = await Branch.countDocuments({ repositoryId: repository._id });
    console.log("Branch count in DB:", branchCount);
    if (branchCount === 3) {
      console.log("PASS: Successfully synced all 3 mock branches.");
    } else {
      console.error("FAIL: Incorrect branch count!");
    }

    // Verify commits synced
    const commitCount = await Commit.countDocuments({ repositoryId: repository._id });
    console.log("Commit count in DB:", commitCount);
    if (commitCount === 2) {
      console.log("PASS: Successfully synced all 2 mock commits.");
    } else {
      console.error("FAIL: Incorrect commit count!");
    }

    // Verify PRs synced
    const prCount = await PullRequest.countDocuments({ repositoryId: repository._id });
    console.log("PR count in DB:", prCount);
    if (prCount === 1) {
      console.log("PASS: Successfully synced mock PR.");
    } else {
      console.error("FAIL: Incorrect PR count!");
    }

    // Verify CI executions synced
    const ciCount = await CIExecution.countDocuments({ repositoryId: repository._id });
    console.log("CI run count in DB:", ciCount);
    if (ciCount === 1) {
      console.log("PASS: Successfully synced mock CI run.");
    } else {
      console.error("FAIL: Incorrect CI run count!");
    }

    // 4. Run second time to verify Idempotency (Deduplication)
    console.log("\n--- Testing Idempotency (Run 2) ---");
    await syncRepositoryData(project._id, repository._id);

    const branchCount2 = await Branch.countDocuments({ repositoryId: repository._id });
    const commitCount2 = await Commit.countDocuments({ repositoryId: repository._id });
    const prCount2 = await PullRequest.countDocuments({ repositoryId: repository._id });
    const ciCount2 = await CIExecution.countDocuments({ repositoryId: repository._id });

    if (branchCount2 === branchCount && commitCount2 === commitCount && prCount2 === prCount && ciCount2 === ciCount) {
      console.log("PASS: Idempotency verified. Sync run 2 did not create any duplicate documents.");
    } else {
      console.error("FAIL: Duplicates created on run 2!");
      console.log("Counts after run 2 - Branches:", branchCount2, "Commits:", commitCount2, "PRs:", prCount2, "CI:", ciCount2);
    }

    // Cleanup
    console.log("\nCleaning up test data...");
    await Project.deleteOne({ _id: project._id });
    await Repository.deleteOne({ _id: repository._id });
    await Branch.deleteMany({ repositoryId: repository._id });
    await Commit.deleteMany({ repositoryId: repository._id });
    await PullRequest.deleteMany({ repositoryId: repository._id });
    await CIExecution.deleteMany({ repositoryId: repository._id });
    console.log("Cleanup complete.");

  } catch (error) {
    console.error("ERROR during testing:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}
run();
