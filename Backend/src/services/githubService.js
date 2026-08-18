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
    console.warn("Using mock repositories because GITHUB_APP_PRIVATE_KEY is not configured.");
    return [
      {
        id: 9912345,
        name: "auth-service",
        full_name: "codesarthi-projects/auth-service",
        owner: { login: "codesarthi-projects" },
        default_branch: "main",
        html_url: "https://github.com/codesarthi-projects/auth-service",
        private: true,
      },
      {
        id: 9912346,
        name: "frontend",
        full_name: "codesarthi-projects/frontend",
        owner: { login: "codesarthi-projects" },
        default_branch: "main",
        html_url: "https://github.com/codesarthi-projects/frontend",
        private: false,
      },
      {
        id: 9912347,
        name: "notification-service",
        full_name: "codesarthi-projects/notification-service",
        owner: { login: "codesarthi-projects" },
        default_branch: "develop",
        html_url: "https://github.com/codesarthi-projects/notification-service",
        private: true,
      }
    ];
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

async function getInstallationBranches(installationId, owner, repo) {
  const privateKey = getPrivateKey();
  if (!privateKey) {
    console.warn("Using mock branches because GITHUB_APP_PRIVATE_KEY is not configured.");
    return [
      { name: "main", commit: { sha: "abc123sha" }, protected: true },
      { name: "develop", commit: { sha: "def456sha" }, protected: false },
      { name: "feature/jwt-validation", commit: { sha: "ghi789sha" }, protected: false }
    ];
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
    return [
      {
        sha: "abc123sha",
        commit: {
          author: { name: "John Doe", email: "john@example.com", date: new Date().toISOString() },
          committer: { name: "John Doe", email: "john@example.com", date: new Date().toISOString() },
          message: "feature: Add JWT validation (#142)",
          tree: { sha: "tree123" }
        },
        parents: [],
        html_url: `https://github.com/${owner}/${repo}/commit/abc123sha`
      },
      {
        sha: "def456sha",
        commit: {
          author: { name: "Jane Smith", email: "jane@example.com", date: new Date(Date.now() - 3600000).toISOString() },
          committer: { name: "Jane Smith", email: "jane@example.com", date: new Date(Date.now() - 3600000).toISOString() },
          message: "fix: resolve auth validation loop",
          tree: { sha: "tree456" }
        },
        parents: [{ sha: "abc123sha" }],
        html_url: `https://github.com/${owner}/${repo}/commit/def456sha`
      }
    ];
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
    return [
      {
        id: 881234,
        number: 184,
        title: "Add JWT validation middleware",
        body: "Closes #142 and resolves JWT issues.",
        state: "open",
        html_url: `https://github.com/${owner}/${repo}/pull/184`,
        head: { ref: "feature/jwt-validation", sha: "ghi789sha" },
        base: { ref: "main", sha: "abc123sha" },
        user: { id: 112233, login: "johndoe" },
        merged_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
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
    return [
      {
        id: 7728374,
        name: "CI Build",
        head_branch: "main",
        head_sha: "abc123sha",
        status: "completed",
        conclusion: "success",
        html_url: `https://github.com/${owner}/${repo}/actions/runs/7728374`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
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
