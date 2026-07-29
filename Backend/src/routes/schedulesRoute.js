const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const { getSchedules, createSchedule, updateSchedule, deleteSchedule, getScheduleAnalytics } = require("../controllers/schedulesController");

// Schedule routes
router.get("/schedules", userAuth, getSchedules);
router.get("/schedules/analytics", userAuth, getScheduleAnalytics);
router.post("/schedules", userAuth, createSchedule);
router.patch("/schedules/:id", userAuth, updateSchedule);
router.delete("/schedules/:id", userAuth, deleteSchedule);

module.exports = router;
