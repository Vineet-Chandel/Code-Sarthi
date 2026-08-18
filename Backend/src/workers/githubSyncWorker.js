const Project = require("../models/project");
const Repository = require("../models/repository");
const Branch = require("../models/branch");
const Commit = require("../models/commit");
const PullRequest = require("../models/pullRequest");
const CIExecution = require("../models/ciExecution");
const githubService = require("../services/githubService");

async function syncRepositoryData(projectId, repositoryId) {
  console.log(`Starting repository sync for Project ${projectId}, Repository ${repositoryId}`);
  let repository;
  try {
    repository = await Repository.findById(repositoryId);
    if (!repository) {
      throw new Error(`Repository with ID ${repositoryId} not found`);
    }

    // 1. Update syncStatus to SYNCING
    repository.syncStatus = 'SYNCING';
    await repository.save();

    const { owner, name, installationId } = repository;

    // 2. Fetch active branches
    console.log(`Fetching branches for ${owner}/${name}...`);
    const branches = await githubService.getInstallationBranches(installationId, owner, name);
    for (const b of branches) {
      await Branch.findOneAndUpdate(
        { repositoryId: repository._id, name: b.name },
        { sha: b.commit.sha, deletedAt: null },
        { upsert: true }
      );
    }
    console.log(`Synced ${branches.length} branches.`);

    // 3. Fetch recent commits (on default branch)
    console.log(`Fetching commits for ${owner}/${name}...`);
    const commits = await githubService.getInstallationCommits(installationId, owner, name, repository.defaultBranch, 30);
    for (const c of commits) {
      await Commit.findOneAndUpdate(
        { repositoryId: repository._id, sha: c.sha },
        {
          author: {
            name: c.commit.author?.name || "",
            email: c.commit.author?.email || "",
            username: c.author?.login || ""
          },
          message: c.commit.message,
          timestamp: new Date(c.commit.author?.date || Date.now())
        },
        { upsert: true }
      );
    }
    console.log(`Synced ${commits.length} commits.`);

    // 4. Fetch pull requests (open & closed)
    console.log(`Fetching pull requests for ${owner}/${name}...`);
    const openPrs = await githubService.getInstallationPullRequests(installationId, owner, name, "open", 30);
    const closedPrs = await githubService.getInstallationPullRequests(installationId, owner, name, "closed", 20);
    const allPrs = [...openPrs, ...closedPrs];
    for (const pr of allPrs) {
      let prState = pr.state;
      if (pr.merged_at || pr.merged) {
        prState = 'merged';
      }
      await PullRequest.findOneAndUpdate(
        { repositoryId: repository._id, githubPrNumber: pr.number },
        {
          title: pr.title,
          description: pr.body || "",
          sourceBranch: pr.head.ref,
          targetBranch: pr.base.ref,
          headSha: pr.head.sha,
          mergeSha: pr.merge_commit_sha || null,
          state: prState
        },
        { upsert: true }
      );
    }
    console.log(`Synced ${allPrs.length} pull requests.`);

    // 5. Fetch CI workflow runs
    console.log(`Fetching workflow runs for ${owner}/${name}...`);
    const runs = await githubService.getInstallationWorkflowRuns(installationId, owner, name, 20);
    for (const run of runs) {
      await CIExecution.findOneAndUpdate(
        { githubWorkflowRunId: run.id },
        {
          repositoryId: repository._id,
          workflowName: run.name,
          branch: run.head_branch,
          sha: run.head_sha,
          status: run.status,
          conclusion: run.conclusion || null,
          startedAt: new Date(run.created_at || Date.now()),
          completedAt: run.updated_at ? new Date(run.updated_at) : null
        },
        { upsert: true }
      );
    }
    console.log(`Synced ${runs.length} workflow runs.`);

    // 6. Update status to COMPLETED
    repository.syncStatus = 'COMPLETED';
    repository.lastSyncAt = new Date();
    repository.lastSyncError = null;
    await repository.save();
    console.log(`Sync completed successfully for Project ${projectId}`);

  } catch (error) {
    console.error(`Repository sync failed for Project ${projectId}:`, error);
    if (repository) {
      repository.syncStatus = 'FAILED';
      repository.lastSyncError = error.message;
      await repository.save();
    }
    throw error;
  }
}

module.exports = {
  syncRepositoryData
};
