const jwt = require("jsonwebtoken");
const axios = require("axios");

function getPrivateKey() {
  const key = process.env.GITHUB_APP_PRIVATE_KEY;
  if (!key) return null;
  if (key.startsWith("SHA256:") || key === "GITHUB_APP_PRIVATE_KEY" || !key.includes("PRIVATE KEY")) {
    return null;
  }
  return key.replace(/\\n/g, "\n");
}

function generateAppJwt() {
  const privateKey = getPrivateKey();
  if (!privateKey) {
    throw new Error("GitHub App private key is not configured or is a placeholder");
  }

  const appId = process.env.GITHUB_APP_ID;
  const payload = {
    iat: Math.floor(Date.now() / 1000) - 60,
    exp: Math.floor(Date.now() / 1000) + (10 * 60),
    iss: appId,
  };

  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
}

async function getInstallationAccessToken(installationId) {
  try {
    const appJwt = generateAppJwt();
    const response = await axios.post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      {
        headers: {
          Authorization: `Bearer ${appJwt}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "CodeSarthi-App",
        },
      }
    );
    return response.data.token;
  } catch (error) {
    console.error("Failed to get installation access token:", error.message);
    throw error;
  }
}

async function getInstallationRepositories(installationId) {
  const privateKey = getPrivateKey();
  if (!privateKey) {
    throw new Error("GITHUB_APP_PRIVATE_KEY is not configured in .env. Please add your GitHub App Private Key to see your actual repositories.");
  }

  try {
    const token = await getInstallationAccessToken(installationId);
    const response = await axios.get(
      "https://api.github.com/installation/repositories",
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "CodeSarthi-App",
        },
      }
    );
    return response.data.repositories || [];
  } catch (error) {
    console.error("Failed to fetch installation repositories:", error.message);
    throw error;
  }
}

const MOCK_DATA = {
  "auth-service": {
    branches: [
      { name: "main", commit: { sha: "authmainsha123" }, protected: true },
      { name: "develop", commit: { sha: "authdevsha456" }, protected: false },
      { name: "feature/argon2-hash", commit: { sha: "authhashsha789" }, protected: false }
    ],
    commits: [
      {
        sha: "authmainsha123",
        commit: {
          author: { name: "Vineet Chandel", email: "vineet@codesarthi.in", date: new Date().toISOString() },
          committer: { name: "Vineet Chandel", email: "vineet@codesarthi.in", date: new Date().toISOString() },
          message: "feat: add argon2 password hashing (#112)",
          tree: { sha: "authtree1" }
        },
        parents: [],
        html_url: "https://github.com/codesarthi-projects/auth-service/commit/authmainsha123"
      },
      {
        sha: "authdevsha456",
        commit: {
          author: { name: "Jane Smith", email: "jane@example.com", date: new Date(Date.now() - 3600000).toISOString() },
          committer: { name: "Jane Smith", email: "jane@example.com", date: new Date(Date.now() - 3600000).toISOString() },
          message: "fix: update token expiration to 24h",
          tree: { sha: "authtree2" }
        },
        parents: [{ sha: "authmainsha123" }],
        html_url: "https://github.com/codesarthi-projects/auth-service/commit/authdevsha456"
      }
    ],
    prs: [
      {
        id: 881201,
        number: 112,
        title: "Implement argon2 password hashing",
        body: "Closes #112. Replaces basic bcrypt with argon2id hashing strategy.",
        state: "open",
        html_url: "https://github.com/codesarthi-projects/auth-service/pull/112",
        head: { ref: "feature/argon2-hash", sha: "authhashsha789" },
        base: { ref: "main", sha: "authmainsha123" },
        user: { id: 112201, login: "vineetchandel" },
        merged_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    workflowRuns: [
      {
        id: 7728001,
        name: "Security Audits & Auth Tests",
        head_branch: "main",
        head_sha: "authmainsha123",
        status: "completed",
        conclusion: "success",
        html_url: "https://github.com/codesarthi-projects/auth-service/actions/runs/7728001",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  "frontend": {
    branches: [
      { name: "main", commit: { sha: "frmainsha123" }, protected: true },
      { name: "develop", commit: { sha: "frdevsha456" }, protected: false },
      { name: "feature/dashboard-widgets", commit: { sha: "frwidgetsha789" }, protected: false }
    ],
    commits: [
      {
        sha: "frmainsha123",
        commit: {
          author: { name: "Vineet Chandel", email: "vineet@codesarthi.in", date: new Date().toISOString() },
          committer: { name: "Vineet Chandel", email: "vineet@codesarthi.in", date: new Date().toISOString() },
          message: "feat: implement interactive dashboard widgets (#142)",
          tree: { sha: "frtree1" }
        },
        parents: [],
        html_url: "https://github.com/codesarthi-projects/frontend/commit/frmainsha123"
      },
      {
        sha: "frdevsha456",
        commit: {
          author: { name: "Alex Green", email: "alex@example.com", date: new Date(Date.now() - 3600000).toISOString() },
          committer: { name: "Alex Green", email: "alex@example.com", date: new Date(Date.now() - 3600000).toISOString() },
          message: "style: fix alignment on project details panel",
          tree: { sha: "frtree2" }
        },
        parents: [{ sha: "frmainsha123" }],
        html_url: "https://github.com/codesarthi-projects/frontend/commit/frdevsha456"
      }
    ],
    prs: [
      {
        id: 881202,
        number: 142,
        title: "Design glassmorphism sidebar widgets",
        body: "Closes #142 and resolves responsive layout issues.",
        state: "open",
        html_url: "https://github.com/codesarthi-projects/frontend/pull/142",
        head: { ref: "feature/dashboard-widgets", sha: "frwidgetsha789" },
        base: { ref: "main", sha: "frmainsha123" },
        user: { id: 112202, login: "vineetchandel" },
        merged_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    workflowRuns: [
      {
        id: 7728002,
        name: "Vite Lint & Production Build",
        head_branch: "main",
        head_sha: "frmainsha123",
        status: "completed",
        conclusion: "success",
        html_url: "https://github.com/codesarthi-projects/frontend/actions/runs/7728002",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  "notification-service": {
    branches: [
      { name: "main", commit: { sha: "ntmainsha123" }, protected: true },
      { name: "develop", commit: { sha: "ntdevsha456" }, protected: false },
      { name: "feature/resend-outbox", commit: { sha: "ntresendsha789" }, protected: false }
    ],
    commits: [
      {
        sha: "ntmainsha123",
        commit: {
          author: { name: "Vineet Chandel", email: "vineet@codesarthi.in", date: new Date().toISOString() },
          committer: { name: "Vineet Chandel", email: "vineet@codesarthi.in", date: new Date().toISOString() },
          message: "feat: integrate Resend API client (#105)",
          tree: { sha: "nttree1" }
        },
        parents: [],
        html_url: "https://github.com/codesarthi-projects/notification-service/commit/ntmainsha123"
      },
      {
        sha: "ntdevsha456",
        commit: {
          author: { name: "Sarah Connor", email: "sarah@example.com", date: new Date(Date.now() - 3600000).toISOString() },
          committer: { name: "Sarah Connor", email: "sarah@example.com", date: new Date(Date.now() - 3600000).toISOString() },
          message: "fix: handle retry loop on network failure",
          tree: { sha: "nttree2" }
        },
        parents: [{ sha: "ntmainsha123" }],
        html_url: "https://github.com/codesarthi-projects/notification-service/commit/ntdevsha456"
      }
    ],
    prs: [
      {
        id: 881203,
        number: 105,
        title: "Add email outbox templates",
        body: "Closes #105. Incorporates responsive HTML outbox template mappings.",
        state: "open",
        html_url: "https://github.com/codesarthi-projects/notification-service/pull/105",
        head: { ref: "feature/resend-outbox", sha: "ntresendsha789" },
        base: { ref: "main", sha: "ntmainsha123" },
        user: { id: 112203, login: "vineetchandel" },
        merged_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    workflowRuns: [
      {
        id: 7728003,
        name: "Outbox Queue Integration Checks",
        head_branch: "main",
        head_sha: "ntmainsha123",
        status: "completed",
        conclusion: "success",
        html_url: "https://github.com/codesarthi-projects/notification-service/actions/runs/7728003",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }
};

function getMockDataForRepo(repo) {
  if (MOCK_DATA[repo]) {
    return MOCK_DATA[repo];
  }
  const cleanName = repo.replace(/[^a-zA-Z0-9]/g, ' ').trim();
  return {
    branches: [
      { name: "main", commit: { sha: `${repo}sha123` }, protected: true },
      { name: "develop", commit: { sha: `${repo}sha456` }, protected: false },
      { name: `feature/${repo}-init`, commit: { sha: `${repo}sha789` }, protected: false }
    ],
    commits: [
      {
        sha: `${repo}sha123`,
        commit: {
          author: { name: "Developer", email: "dev@codesarthi.in", date: new Date().toISOString() },
          committer: { name: "Developer", email: "dev@codesarthi.in", date: new Date().toISOString() },
          message: `feat: initialize ${cleanName} configuration (#101)`,
          tree: { sha: `${repo}tree1` }
        },
        parents: [],
        html_url: `https://github.com/codesarthi-projects/${repo}/commit/${repo}sha123`
      }
    ],
    prs: [
      {
        id: Math.floor(Math.random() * 100000) + 100000,
        number: 101,
        title: `Configure base setup for ${cleanName}`,
        body: `Closes #101. Integrates starting workspace config files for ${repo}.`,
        state: "open",
        html_url: `https://github.com/codesarthi-projects/${repo}/pull/101`,
        head: { ref: `feature/${repo}-init`, sha: `${repo}sha789` },
        base: { ref: "main", sha: `${repo}sha123` },
        user: { id: 99999, login: "developer" },
        merged_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    workflowRuns: [
      {
        id: Math.floor(Math.random() * 1000000) + 7000000,
        name: `${cleanName} Checks`,
        head_branch: "main",
        head_sha: `${repo}sha123`,
        status: "completed",
        conclusion: "success",
        html_url: `https://github.com/codesarthi-projects/${repo}/actions/runs/7000000`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  };
}

async function getInstallationBranches(installationId, owner, repo) {
  const privateKey = getPrivateKey();
  if (!privateKey) {
    console.warn("Using mock branches because GITHUB_APP_PRIVATE_KEY is not configured.");
    return getMockDataForRepo(repo).branches;
  }

  try {
    const token = await getInstallationAccessToken(installationId);
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/branches`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "CodeSarthi-App",
        },
      }
    );
    return response.data || [];
  } catch (error) {
    console.error(`Failed to fetch branches for ${owner}/${repo}:`, error.message);
    throw error;
  }
}

async function getInstallationCommits(installationId, owner, repo, sha = "main", perPage = 30) {
  const privateKey = getPrivateKey();
  if (!privateKey) {
    console.warn("Using mock commits because GITHUB_APP_PRIVATE_KEY is not configured.");
    return getMockDataForRepo(repo).commits;
  }

  try {
    const token = await getInstallationAccessToken(installationId);
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        params: { sha, per_page: perPage },
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "CodeSarthi-App",
        },
      }
    );
    return response.data || [];
  } catch (error) {
    console.error(`Failed to fetch commits for ${owner}/${repo}:`, error.message);
    throw error;
  }
}

async function getInstallationPullRequests(installationId, owner, repo, state = "open", perPage = 30) {
  const privateKey = getPrivateKey();
  if (!privateKey) {
    console.warn("Using mock PRs because GITHUB_APP_PRIVATE_KEY is not configured.");
    const mockData = getMockDataForRepo(repo);
    return mockData.prs.filter(pr => pr.state === state);
  }

  try {
    const token = await getInstallationAccessToken(installationId);
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        params: { state, per_page: perPage },
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "CodeSarthi-App",
        },
      }
    );
    return response.data || [];
  } catch (error) {
    console.error(`Failed to fetch PRs for ${owner}/${repo}:`, error.message);
    throw error;
  }
}

async function getInstallationWorkflowRuns(installationId, owner, repo, perPage = 10) {
  const privateKey = getPrivateKey();
  if (!privateKey) {
    console.warn("Using mock workflow runs because GITHUB_APP_PRIVATE_KEY is not configured.");
    return getMockDataForRepo(repo).workflowRuns;
  }

  try {
    const token = await getInstallationAccessToken(installationId);
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs`,
      {
        params: { per_page: perPage },
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "CodeSarthi-App",
        },
      }
    );
    return response.data?.workflow_runs || [];
  } catch (error) {
    console.error(`Failed to fetch workflow runs for ${owner}/${repo}:`, error.message);
    throw error;
  }
}

module.exports = {
  generateAppJwt,
  getInstallationAccessToken,
  getInstallationRepositories,
  getPrivateKey,
  getInstallationBranches,
  getInstallationCommits,
  getInstallationPullRequests,
  getInstallationWorkflowRuns
};
