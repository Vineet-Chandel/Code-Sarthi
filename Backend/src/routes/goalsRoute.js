const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const { getGoals, getGoalById, createGoal, deleteGoal, archiveGoal } = require("../controllers/goalsController");

// Goal routes
router.get("/goals", userAuth, getGoals);
router.get("/goals/:id", userAuth, getGoalById);
router.post("/goals", userAuth, createGoal);
router.delete("/goals/:id", userAuth, deleteGoal);
router.patch("/goals/:id/archive", userAuth, archiveGoal);

module.exports = router;