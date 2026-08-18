const mongoose = require("mongoose");
const PullRequest = require("./src/models/pullRequest");
const IssueLink = require("./src/models/issueLink");
const Conflict = require("./src/models/conflict");
const { recordGitMergeConflict, resolveGitMergeConflict, getConflictsForIssue } = require("./src/services/conflictService");
require("dotenv").config();

async function run() {
  try {
    await mongoose.connect(process.env.DB_LINK);
    console.log("Connected to MongoDB for testing conflict intelligence.");

    // Initializations
    await PullRequest.init();
    await IssueLink.init();
    await Conflict.init();

    const repositoryId = new mongoose.Types.ObjectId();
    const issueId = new mongoose.Types.ObjectId();

    // 1. Create a dummy PullRequest
    const pr = await PullRequest.create({
      repositoryId,
      githubPrNumber: 184,
      title: "Add JWT authentication middleware",
      sourceBranch: "feature/jwt-auth",
      targetBranch: "main",
      headSha: "abc123headsha"
    });
    console.log("Successfully created test PR:", pr._id);

    // 2. Link the Issue to the PullRequest
    const link = await IssueLink.create({
      issueId,
      entityType: "pull_request",
      entityId: pr._id,
      linkedBy: "developer"
    });
    console.log("Linked test Issue with test PR:", link._id);

    // Let's verify we can find the IssueLink directly
    const verifyLink = await IssueLink.findOne({
      entityType: 'pull_request',
      entityId: pr._id
    });
    console.log("Verified link from DB:", verifyLink);

    // 3. Record a Git merge conflict
    console.log("\n--- Testing Record Git Merge Conflict ---");
    const affectedFiles = ["auth.js", "middleware.js"];
    const recordResult = await recordGitMergeConflict(pr._id, affectedFiles);

    const updatedPR = recordResult.pr;
    const conflictRecord = recordResult.conflict;
    console.log("Created Conflict Record:", conflictRecord);

    if (updatedPR.conflicting === true && updatedPR.conflictFiles.length === 2) {
      console.log("PASS: PR state successfully updated to conflicting.");
    } else {
      console.error("FAIL: PR state was not updated to conflicting!");
    }

    if (conflictRecord && conflictRecord.status === "active" && conflictRecord.type === "git_merge_conflict") {
      console.log("PASS: Active Conflict record created successfully.");
    } else {
      console.error("FAIL: Conflict record was not created successfully!");
    }

    // 4. Query conflicts for the Issue
    console.log("\n--- Testing Query Conflicts for Issue ---");
    
    const directConflicts = await Conflict.find({
      issueId,
      status: 'active'
    });
    console.log("Direct Conflicts from query:", directConflicts);

    const linkedPrs = await IssueLink.find({
      issueId,
      entityType: 'pull_request'
    });
    console.log("Linked PRs from query:", linkedPrs);

    const prIds = linkedPrs.map(l => l.entityId);
    console.log("PR IDs mapped:", prIds);

    const prConflicts = await Conflict.find({
      pullRequestId: { $in: prIds },
      status: 'active'
    });
    console.log("PR Conflicts from query:", prConflicts);

    const issueConflicts = await getConflictsForIssue(issueId);
    console.log("issueConflicts returned:", issueConflicts);

    if (issueConflicts.length === 1 && issueConflicts[0].pullRequestId._id.toString() === pr._id.toString()) {
      console.log("PASS: Correctly resolved conflict linked to issue via PR.");
    } else {
      console.error("FAIL: Could not query conflict for issue!");
    }

    // 5. Resolve the Git merge conflict
    console.log("\n--- Testing Resolve Git Merge Conflict ---");
    const resolveResult = await resolveGitMergeConflict(pr._id);
    const resolvedPR = resolveResult.pr;

    if (resolvedPR.conflicting === false && resolvedPR.conflictFiles.length === 0) {
      console.log("PASS: PR state successfully resolved.");
    } else {
      console.error("FAIL: PR state was not resolved!");
    }

    const resolvedConflict = await Conflict.findById(conflictRecord._id);
    if (resolvedConflict.status === "resolved" && resolvedConflict.resolvedAt instanceof Date) {
      console.log("PASS: Conflict status updated to resolved with resolvedAt timestamp.");
    } else {
      console.error("FAIL: Conflict status was not resolved!");
    }

    // Cleanup
    console.log("\nCleaning up test records...");
    await PullRequest.deleteOne({ _id: pr._id });
    await IssueLink.deleteOne({ _id: link._id });
    await Conflict.deleteOne({ _id: conflictRecord._id });
    console.log("Cleanup complete.");

  } catch (error) {
    console.error("ERROR during testing:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}
run();
