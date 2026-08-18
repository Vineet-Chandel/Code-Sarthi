const express = require("express");
const router = express.Router();
const { gitHubAccSetup } = require("../controllers/projectController");

router.get("/github/setup", gitHubAccSetup);

module.exports = router;
