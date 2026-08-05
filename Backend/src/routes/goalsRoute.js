const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const uploadGoalPhotosMiddleware = require("../middlewares/multerGoals");
const { getGoals, getGoalById, createGoal, updateGoal, deleteGoal, archiveGoal, addComment, editComment, deleteComment, toggleReaction, uploadGoalPhotos, removeGoalPhoto } = require("../controllers/goalsController");

// Goal routes
router.get("/goals", userAuth, getGoals);
router.get("/goals/:id", userAuth, getGoalById);
router.post("/goals", userAuth, createGoal);
router.put("/goals/:id", userAuth, updateGoal);
router.delete("/goals/:id", userAuth, deleteGoal);
router.patch("/goals/:id/archive", userAuth, archiveGoal);
router.post("/goals/:id/comments", userAuth, addComment);
router.put("/goals/:id/comments/:commentId", userAuth, editComment);
router.delete("/goals/:id/comments/:commentId", userAuth, deleteComment);
router.post("/goals/:id/comments/:commentId/reactions", userAuth, toggleReaction);
router.post("/goals/upload-photos", userAuth, uploadGoalPhotosMiddleware.array("photos", 5), uploadGoalPhotos);
router.delete("/goals/photo", userAuth, removeGoalPhoto);

module.exports = router;