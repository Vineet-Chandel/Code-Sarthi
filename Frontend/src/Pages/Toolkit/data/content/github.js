export default {
  topics: [
    {
      id: "prs",
      title: "Pull Requests & Reviews",
      sections: [
        {
          heading: "Creating & managing PRs",
          description: "Use the GitHub CLI (gh) for a keyboard-first workflow without leaving the terminal.",
          language: "bash",
          code: `# Install GitHub CLI
brew install gh
gh auth login

# Create a PR from the current branch
gh pr create
gh pr create --title "feat: add search" --body "Adds fuzzy search" --draft

# View PR status
gh pr status
gh pr list

# Check out a PR locally (great for review)
gh pr checkout 42

# View PR in browser
gh pr view 42 --web

# Merge a PR
gh pr merge 42 --squash --delete-branch

# Close without merging
gh pr close 42`,
        },
        {
          heading: "PR review shortcuts",
          description: "GitHub keyboard shortcuts speed up code review on the website.",
          language: "bash",
          code: `# PR page shortcuts (in browser)
j / k           — next / previous file
n / p           — next / previous diff hunk
e               — expand / collapse file
[space]         — scroll down the page

# Review comments
# Click a line number → comment on that line
# Shift+click → comment on a range of lines
# Click "Start a review" to batch comments

# Request changes
# Review → Submit review → Request changes`,
        },
      ],
    },
    {
      id: "issues",
      title: "Issues & Projects',",
      sections: [
        {
          heading: "Issue management with gh",
          description: "gh issue commands let you create, list, and close issues without leaving the terminal.",
          language: "bash",
          code: `# Create issue
gh issue create --title "Bug: search fails" --label bug
gh issue create --assignee "@me" --milestone "v2.0"

# List issues
gh issue list
gh issue list --label bug --state open
gh issue list --assignee "@me"

# View & close
gh issue view 15
gh issue close 15 --comment "Fixed in #42"

# Reopen
gh issue reopen 15`,
        },
        {
          heading: "Releases",
          description: "gh release lets you create and manage GitHub releases from the CLI.",
          language: "bash",
          code: `# Create a release
gh release create v1.2.0 \\
  --title "v1.2.0 — Category Expansion" \\
  --notes "Added 50 new technology cheat sheets across 5 categories." \\
  dist/*.zip

# List releases
gh release list

# Download release assets
gh release download v1.2.0

# Delete a release
gh release delete v1.2.0`,
        },
      ],
    },
    {
      id: "repo",
      title: "Repository Operations',",
      sections: [
        {
          heading: "Managing repos with gh",
          description: "Create, clone, fork, and manage repositories from the command line.",
          language: "bash",
          code: `# Create a new repo
gh repo create my-app --public --clone
gh repo create my-app --private --source=. --push

# Clone a repo (with SSH auto-setup)
gh repo clone owner/repo

# Fork & clone
gh repo fork owner/repo --clone

# View repo info
gh repo view
gh repo view owner/repo --web

# List repos
gh repo list
gh repo list --limit 50 --public`,
        },
        {
          heading: "GitHub Actions shortcuts",
          description: "gh workflow and gh run commands let you monitor CI/CD from the terminal.",
          language: "bash",
          code: `# List workflows
gh workflow list

# Trigger a workflow manually
gh workflow run ci.yml
gh workflow run deploy.yml --ref main

# List recent runs
gh run list
gh run list --workflow ci.yml

# Watch a run in real time
gh run watch

# View run logs
gh run view 12345 --log

# Re-run a failed run
gh run rerun 12345`,
        },
      ],
    },
  ],
};
