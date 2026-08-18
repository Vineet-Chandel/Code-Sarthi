const PullRequest = require("../models/pullRequest");
const Conflict = require("../models/conflict");
const IssueLink = require("../models/issueLink");

async function recordGitMergeConflict(pullRequestId, conflictFiles = []) {
  try {
    // 1. Update PullRequest model state
    const pr = await PullRequest.findById(pullRequestId);
    if (!pr) {
      throw new Error(`PullRequest with ID ${pullRequestId} not found`);
    }

    pr.conflicting = true;
    pr.conflictFiles = conflictFiles;
    await pr.save();

    // 2. Find any linked CodeSarthi Issue
    const linkedIssue = await IssueLink.findOne({
      entityType: 'pull_request',
      entityId: pullRequestId
    });

    const issueId = linkedIssue ? linkedIssue.issueId : null;

    // 3. Create or update an active Conflict record
    const description = `PR #${pr.githubPrNumber} has a merge conflict. Git merge resolution is required.`;
    
    const conflict = await Conflict.findOneAndUpdate(
      {
        pullRequestId,
        type: 'git_merge_conflict',
        status: 'active'
      },
      {
        issueId,
        description,
        affectedFiles: conflictFiles,
        severity: 'high'
      },
      { upsert: true, new: true }
    );

    return { pr, conflict };
  } catch (error) {
    console.error("Failed to record Git merge conflict:", error);
    throw error;
  }
}

async function resolveGitMergeConflict(pullRequestId) {
  try {
    // 1. Update PullRequest model state
    const pr = await PullRequest.findById(pullRequestId);
    if (!pr) {
      throw new Error(`PullRequest with ID ${pullRequestId} not found`);
    }

    pr.conflicting = false;
    pr.conflictFiles = [];
    await pr.save();

    // 2. Resolve active Conflict records
    const result = await Conflict.updateMany(
      {
        pullRequestId,
        type: 'git_merge_conflict',
        status: 'active'
      },
      {
        status: 'resolved',
        resolvedAt: new Date()
      }
    );

    return { pr, resolvedCount: result.modifiedCount };
  } catch (error) {
    console.error("Failed to resolve Git merge conflict:", error);
    throw error;
  }
}

async function getConflictsForIssue(issueId) {
  try {
    // Return active conflicts linked directly or via linked PullRequests
    const directConflicts = await Conflict.find({
      issueId,
      status: 'active'
    }).populate('pullRequestId');

    // Also check if any associated PRs have active conflicts that aren't mapped directly
    const linkedPrs = await IssueLink.find({
      issueId,
      entityType: 'pull_request'
    });

    const prIds = linkedPrs.map(link => link.entityId);
    
    const prConflicts = await Conflict.find({
      pullRequestId: { $in: prIds },
      status: 'active',
      issueId: { $ne: issueId } // avoid duplicate entries
    }).populate('pullRequestId');

    return [...directConflicts, ...prConflicts];
  } catch (error) {
    console.error("Failed to get conflicts for issue:", error);
    throw error;
  }
}

module.exports = {
  recordGitMergeConflict,
  resolveGitMergeConflict,
  getConflictsForIssue
};
