const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const {
  startGithubInstall,
  gitHubAccSetup,
  getGithubRepositories,
  connectProjectRepository,
  syncProjectRepository
} = require("../controllers/projectController");

router.get("/github/install", userAuth, startGithubInstall);
router.get("/github/setup", gitHubAccSetup);
router.get("/github/repositories", userAuth, getGithubRepositories);
router.post("/projects/:projectId/github/repository", userAuth, connectProjectRepository);
router.post("/projects/:projectId/github/sync", userAuth, syncProjectRepository);

module.exports = router;
