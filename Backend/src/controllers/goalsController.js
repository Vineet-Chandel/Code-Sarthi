const Goals = require("../models/goals");

// @desc    Get all goals for the logged-in user
// @route   GET /api/goals
const getGoals = async (req, res) => {
    try {
        const goals = await Goals.find({ owner: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(goals);
    } catch (error) {
        console.error("Error in getGoals:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get single goal by ID
// @route   GET /api/goals/:id
const getGoalById = async (req, res) => {
    try {
        const goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        res.status(200).json(goal);
    } catch (error) {
        console.error("Error in getGoalById:", error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: "Goal not found" });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Create a new goal
// @route   POST /api/goals
const createGoal = async (req, res) => {
    try {
        const { name, status, targetDate, priority, category, description, tags } = req.body;

        if (!name || !status || !targetDate || !priority || !category || !description || !tags) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        //name validation
        if (typeof name !== "string" || name.trim().length < 3 || name.trim().length > 500) {
            return res.status(404).json({
                success: false,
                message: "Invalid name",
            })
        }

        //status validation
        if (!["Completed", "In Progress", "On Track", "At Risk", "Not Started", "On Hold"].includes(status.trim()) || typeof status !== "string" || status.trim().length < 3 || status.trim().length > 100) {
            return res.status(404).json({
                success: false,
                message: "Invalid status",
            })
        }

        //targetDate validation
        if (typeof targetDate !== "string") {
            return res.status(404).json({
                success: false,
                message: "Invalid targetDate",
            })
        }

        //priority validation
        if (!["Critical", "High", "Medium", "Low"].includes(priority.trim()) || typeof priority !== "string" || priority.trim().length < 3 || priority.trim().length > 100) {
            return res.status(404).json({
                success: false,
                message: "Invalid priority",
            })
        }

        //category validation
        if (typeof category !== "string" || category.trim().length < 3 || category.trim().length > 100) {
            return res.status(404).json({
                success: false,
                message: "Invalid category",
            })
        }

        //description validation
        if (typeof description !== "string" || description.trim().length < 3 || description.trim().length > 1000) {
            return res.status(404).json({
                success: false,
                message: "Invalid description",
            })
        }

        //tags validation
        if (typeof tags !== "object") {
            return res.status(404).json({
                success: false,
                message: "Invalid tags",
            })
        }


        const newGoal = new Goals({
            name: name.trim(),
            status: status.trim(),
            targetDate,
            owner: req.user._id,
            priority: priority.trim(),
            category: category.trim(),
            description: description.trim(),
            tags: tags.map(tag => tag.trim()),
            lastUpdated: Date.now()
        });

        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error("Error in createGoal:", error);
        res.status(400).json({ message: "Invalid data", error: error.message });
    }
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
const deleteGoal = async (req, res) => {
    try {
        const goal = await Goals.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
        console.error("Error in deleteGoal:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Archive or unarchive a goal
// @route   PATCH /api/goals/:id/archive
const archiveGoal = async (req, res) => {
    try {
        const goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        goal.isArchived = !goal.isArchived;
        const updatedGoal = await goal.save();
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error in archiveGoal:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    getGoals,
    getGoalById,
    createGoal,
    deleteGoal,
    archiveGoal
};
