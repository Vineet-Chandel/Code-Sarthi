export default {
  topics: [
    {
      id: "everyday",
      title: "Everyday Commands",
      sections: [
        {
          heading: "Stage & commit",
          description: "Stage files explicitly or use -A for everything, then commit with a message.",
          language: "bash",
          code: `# Stage specific files
git add src/index.js src/App.jsx

# Stage everything in the repo
git add -A

# Commit staged changes
git commit -m "feat: add user authentication"

# Stage tracked files and commit in one step
git commit -am "fix: correct typo in header"`,
        },
        {
          heading: "Checking status & log",
          description: "See what's changed, staged, and the recent commit history.",
          language: "bash",
          code: `# What's staged, unstaged, untracked
git status

# Compact one-line status
git status -s

# Last 10 commits, one line each
git log --oneline -10

# Graph of branches
git log --oneline --graph --all -20`,
        },
        {
          heading: "Stashing work-in-progress",
          description: "Stash saves your dirty working directory so you can switch tasks, then restore it later.",
          language: "bash",
          code: `# Stash everything (tracked + untracked)
git stash push -u -m "wip: half-finished auth"

# List stashes
git stash list

# Re-apply the latest stash and remove it
git stash pop

# Re-apply a specific stash (keep it in the list)
git stash apply stash@{2}`,
        },
        {
          heading: "Comparing changes",
          description: "diff shows unstaged changes; diff --staged (or --cached) shows what's already staged.",
          language: "bash",
          code: `# Unstaged changes
git diff

# Staged changes (what will be in the next commit)
git diff --staged

# Diff between two commits
git diff main..feature/auth

# Diff a single file
git diff HEAD~1 -- src/api.js`,
        },
      ],
    },
    {
      id: "branching",
      title: "Branching",
      sections: [
        {
          heading: "Create & switch branches",
          description: "Use descriptive branch names with a type prefix: feature/, fix/, chore/, docs/.",
          language: "bash",
          code: `# Create and switch to a new branch
git switch -c feature/search-palette

# Switch to an existing branch
git switch main

# List all branches (local + remote)
git branch -a

# Delete a merged branch
git branch -d feature/search-palette

# Force-delete an unmerged branch
git branch -D feature/abandoned-experiment`,
        },
        {
          heading: "Merging",
          description: "--no-ff creates a merge commit even for fast-forwards, preserving branch history in the log.",
          language: "bash",
          code: `# Merge a feature branch into main
git switch main
git merge feature/search-palette

# Merge with an explicit merge commit (no fast-forward)
git merge --no-ff feature/search-palette -m "Merge feature/search-palette"

# Abort a merge in progress
git merge --abort`,
        },
        {
          heading: "Rebasing",
          description: "Rebase replays your commits on top of a target branch, keeping a linear history.",
          language: "bash",
          code: `# Rebase current branch onto main
git rebase main

# Interactive rebase — squash/edit the last 3 commits
git rebase -i HEAD~3

# Continue after resolving a rebase conflict
git rebase --continue

# Abort the rebase
git rebase --abort`,
        },
      ],
    },
    {
      id: "undoing",
      title: "Undoing Changes",
      sections: [
        {
          heading: "Amend the last commit",
          description: "Fix the message or add a forgotten file without creating a new commit — only safe before pushing.",
          language: "bash",
          code: `# Edit the last commit message
git commit --amend -m "feat: add proper search palette"

# Add a forgotten file to the last commit (keep same message)
git add forgotten-file.js
git commit --amend --no-edit`,
        },
        {
          heading: "Reset vs revert",
          description: "reset rewrites history (only safe locally). revert creates a new commit that undoes changes — safe to push.",
          language: "bash",
          code: `# Unstage a file (keep changes in working dir)
git reset HEAD src/App.jsx

# Go back 2 commits — keep changes as unstaged
git reset --soft HEAD~2

# Go back 2 commits — DISCARD all changes (destructive)
git reset --hard HEAD~2

# Safely undo a pushed commit (creates a new undo commit)
git revert HEAD
git revert abc1234`,
        },
        {
          heading: "Restore files",
          description: "git restore is the modern replacement for the confusing git checkout -- syntax.",
          language: "bash",
          code: `# Discard unstaged changes in a file
git restore src/App.jsx

# Discard ALL unstaged changes
git restore .

# Restore a file from a specific commit
git restore --source=HEAD~3 src/broken-file.js

# Unstage a file (from index back to working tree)
git restore --staged src/App.jsx`,
        },
      ],
    },
    {
      id: "remote",
      title: "Remote Workflows",
      sections: [
        {
          heading: "Push & pull",
          description: "Set upstream on first push with -u so future git push/pull work without arguments.",
          language: "bash",
          code: `# Push and set upstream tracking
git push -u origin feature/search-palette

# Push to the already-tracked remote
git push

# Pull (fetch + merge)
git pull

# Pull with rebase instead of merge (cleaner history)
git pull --rebase`,
        },
        {
          heading: "Managing remotes",
          description: "You can have multiple remotes — origin is convention for the primary, upstream for the original fork source.",
          language: "bash",
          code: `# List remotes
git remote -v

# Add a remote
git remote add upstream https://github.com/original/repo.git

# Fetch from upstream (no merge)
git fetch upstream

# Merge upstream changes into current branch
git merge upstream/main

# Remove a remote
git remote remove upstream`,
        },
        {
          heading: "Cherry-pick",
          description: "Apply one specific commit from another branch onto the current branch.",
          language: "bash",
          code: `# Apply a single commit
git cherry-pick abc1234

# Apply a range of commits
git cherry-pick abc1234..def5678

# Cherry-pick without committing (stage only)
git cherry-pick --no-commit abc1234`,
        },
      ],
    },
  ],
};
