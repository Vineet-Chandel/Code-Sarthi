const Schedules = require("../models/schedules");
const Goals = require("../models/goals");
const mongoose = require("mongoose");

// @desc    Get all schedules for the logged-in user
// @route   GET /api/schedules
const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedules.find({ owner: req.user._id })
            .populate('goal', 'name status category priority')
            .sort({ startTime: 1 });
        res.status(200).json(schedules);
    } catch (error) {
        console.error("Error in getSchedules:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Create a new schedule
// @route   POST /api/schedules
const createSchedule = async (req, res) => {
    try {
        const { goal, title, startTime, endTime, notes } = req.body;

        if (!goal || !title || !startTime || !endTime) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }

        // Verify goal exists and belongs to user
        const targetGoal = await Goals.findOne({ _id: goal, owner: req.user._id });
        if (!targetGoal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }

        const newSchedule = new Schedules({
            owner: req.user._id,
            goal,
            title: title.trim(),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            notes: notes ? notes.trim() : "",
            status: "Scheduled"
        });

        const savedSchedule = await newSchedule.save();
        const populatedSchedule = await Schedules.findById(savedSchedule._id).populate('goal', 'name status category priority');
        
        res.status(201).json(populatedSchedule);
    } catch (error) {
        console.error("Error in createSchedule:", error);
        res.status(400).json({ message: "Invalid data", error: error.message });
    }
};

// @desc    Update a schedule (e.g. marking as Completed/Missed or changing time)
// @route   PATCH /api/schedules/:id
const updateSchedule = async (req, res) => {
    try {
        const { title, startTime, endTime, status, notes } = req.body;
        
        let schedule = await Schedules.findOne({ _id: req.params.id, owner: req.user._id });
        
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        if (title) schedule.title = title.trim();
        if (startTime) schedule.startTime = new Date(startTime);
        if (endTime) schedule.endTime = new Date(endTime);
        if (status) schedule.status = status;
        if (notes !== undefined) schedule.notes = notes.trim();

        await schedule.save();
        const populatedSchedule = await Schedules.findById(schedule._id).populate('goal', 'name status category priority');
        
        res.status(200).json(populatedSchedule);
    } catch (error) {
        console.error("Error in updateSchedule:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Delete a schedule
// @route   DELETE /api/schedules/:id
const deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedules.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
        console.error("Error in deleteSchedule:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get schedule analytics (completion rates per goal)
// @route   GET /api/schedules/analytics
const getScheduleAnalytics = async (req, res) => {
    try {
        // We want to group by Goal and calculate total hours scheduled vs completed
        const stats = await Schedules.aggregate([
            { $match: { owner: new mongoose.Types.ObjectId(req.user._id) } },
            { 
                $group: {
                    _id: "$goal",
                    totalScheduled: { $sum: 1 },
                    totalCompleted: { 
                        $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] } 
                    },
                    totalMissed: { 
                        $sum: { $cond: [{ $eq: ["$status", "Missed"] }, 1, 0] } 
                    },
                    totalHours: {
                        $sum: { $divide: [ { $subtract: ["$endTime", "$startTime"] }, 3600000 ] }
                    },
                    completedHours: {
                        $sum: { 
                            $cond: [
                                { $eq: ["$status", "Completed"] }, 
                                { $divide: [ { $subtract: ["$endTime", "$startTime"] }, 3600000 ] }, 
                                0
                            ] 
                        }
                    }
                }
            }
        ]);

        // Populate goal details for the analytics
        const populatedStats = await Goals.populate(stats, { path: '_id', select: 'name category' });

        res.status(200).json(populatedStats);
    } catch (error) {
        console.error("Error in getScheduleAnalytics:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleAnalytics
};
