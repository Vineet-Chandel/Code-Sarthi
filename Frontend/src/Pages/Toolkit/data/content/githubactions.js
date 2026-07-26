export default {
  topics: [
    {
      id: "workflow-syntax",
      title: "Workflow Syntax',",
      sections: [
        {
          heading: "Workflow file anatomy",
          description: "Workflows live in .github/workflows/*.yml. on: defines triggers; jobs: defines what runs.",
          language: "yaml",
          code: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
    paths-ignore: ["**.md", "docs/**"]
  pull_request:
    branches: [main]
  workflow_dispatch:   # allow manual trigger

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true   # cancel old run if a new one starts

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test`,
        },
        {
          heading: "Matrix builds",
          description: "Matrix strategy runs a job multiple times with different parameter combinations.",
          language: "yaml",
          code: `jobs:
  test:
    strategy:
      fail-fast: false   # don't cancel other matrix jobs on failure
      matrix:
        os:      [ubuntu-latest, macos-latest, windows-latest]
        node:    [18, 20, 22]
        exclude:
          - os: windows-latest
            node: 18

    runs-on: \${{ matrix.os }}
    name:    "Node \${{ matrix.node }} on \${{ matrix.os }}"

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
      - run: npm ci && npm test`,
        },
      ],
    },
    {
      id: "jobs-steps",
      title: "Jobs & Steps',",
      sections: [
        {
          heading: "Job dependencies",
          description: "needs: creates dependencies between jobs — the deploy job waits for test to pass.",
          language: "yaml",
          code: `jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  build:
    needs: test          # waits for test to succeed
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  deploy:
    needs: [test, build] # waits for both
    if: github.ref == 'refs/heads/main'  # only on main
    runs-on: ubuntu-latest
    environment: production  # requires manual approval
    steps:
      - run: echo "Deploying..."`,
        },
        {
          heading: "Caching",
          description: "actions/cache avoids re-downloading dependencies on every run.",
          language: "yaml",
          code: `- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm   # built-in npm cache (shorthand)

# Or manual caching for more control
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-

# Cache build artifacts between jobs
- uses: actions/upload-artifact@v4
  with:
    name: dist
    path: dist/
    retention-days: 1

- uses: actions/download-artifact@v4
  with:
    name: dist`,
        },
      ],
    },
    {
      id: "secrets",
      title: "Secrets & Environment',",
      sections: [
        {
          heading: "Secrets & environment variables",
          description: "Store sensitive values in GitHub Secrets — they're masked in logs automatically.",
          language: "yaml",
          code: `# Secrets set in: Settings → Secrets and variables → Actions

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      # Non-sensitive — fine to set in workflow file
      NODE_ENV: production
      API_URL:  https://api.devcheats.in
    steps:
      # Secrets from the repo / org / environment
      - name: Deploy
        env:
          DATABASE_URL:  \${{ secrets.DATABASE_URL }}
          DEPLOY_TOKEN:  \${{ secrets.DEPLOY_TOKEN }}
        run: ./scripts/deploy.sh`,
        },
        {
          heading: "Common patterns",
          description: "Practical patterns you'll use in almost every real-world workflow.",
          language: "yaml",
          code: `# 1. Docker build & push
- uses: docker/login-action@v3
  with:
    username: \${{ secrets.DOCKER_USER }}
    password: \${{ secrets.DOCKER_PASSWORD }}

- uses: docker/build-push-action@v5
  with:
    push:  true
    tags:  myorg/my-app:\${{ github.sha }}

# 2. Post a comment on PRs
- uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner:  context.repo.owner,
        repo:   context.repo.repo,
        body:   '✅ Tests passed on commit \${{ github.sha }}'
      })

# 3. Conditional step
- name: Publish
  if: startsWith(github.ref, 'refs/tags/v')
  run: npm publish`,
        },
      ],
    },
  ],
};
