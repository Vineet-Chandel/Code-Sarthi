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
        const goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id }).populate("comments.byUser", "firstName lastName photoUrl");

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

// @desc    Update a goal
// @route   PUT /api/goals/:id
const updateGoal = async (req, res) => {
    try {
        const { name, status, targetDate, priority, category, description, tags, progress, following } = req.body;
        
        let goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        if (name) goal.name = name.trim();
        if (status) goal.status = status.trim();
        if (targetDate) goal.targetDate = targetDate;
        if (priority) goal.priority = priority.trim();
        if (category) goal.category = category.trim();
        if (description) goal.description = description.trim();
        if (tags && Array.isArray(tags)) goal.tags = tags.map(tag => tag.trim());
        if (progress !== undefined) goal.progress = progress;
        if (following !== undefined) goal.following = following;
        
        goal.lastUpdated = Date.now();

        const updatedGoal = await goal.save();
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error in updateGoal:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
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
        const goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id }).populate("comments.byUser", "firstName lastName photoUrl");
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        goal.isArchived = !goal.isArchived;
        const updatedGoal = await goal.save();
        // Since populate was chained to findOne, saving it will return the populated object or we might need to re-populate.
        // re-populate is safer to return to client.
        const populatedGoal = await Goals.findOne({ _id: goal._id }).populate("comments.byUser", "firstName lastName photoUrl");
        res.status(200).json(populatedGoal);
    } catch (error) {
        console.error("Error in archiveGoal:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Add a comment to a goal
// @route   POST /api/goals/:id/comments
const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || typeof text !== "string" || text.trim().length < 1) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        goal.comments.push({
            byUser: req.user._id,
            text: text.trim()
        });

        await goal.save();
        
        // Return the updated goal with populated user details
        const updatedGoal = await Goals.findOne({ _id: goal._id, owner: req.user._id }).populate("comments.byUser", "firstName lastName photoUrl");
        res.status(201).json(updatedGoal);
    } catch (error) {
        console.error("Error in addComment:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Edit a comment
// @route   PUT /api/goals/:id/comments/:commentId
const editComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || typeof text !== "string" || text.trim().length < 1) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id });
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        const comment = goal.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        // Ensure user owns the comment
        if (comment.byUser.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to edit this comment" });
        }

        comment.text = text.trim();
        await goal.save();

        const updatedGoal = await Goals.findOne({ _id: goal._id }).populate("comments.byUser", "firstName lastName photoUrl");
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error in editComment:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Delete a comment
// @route   DELETE /api/goals/:id/comments/:commentId
const deleteComment = async (req, res) => {
    try {
        const goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id });
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        const comment = goal.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        // Allow comment author or goal owner to delete
        if (comment.byUser.toString() !== req.user._id.toString() && goal.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this comment" });
        }

        goal.comments.pull(req.params.commentId);
        await goal.save();

        const updatedGoal = await Goals.findOne({ _id: goal._id }).populate("comments.byUser", "firstName lastName photoUrl");
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error in deleteComment:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Toggle a reaction on a comment
// @route   POST /api/goals/:id/comments/:commentId/reactions
const toggleReaction = async (req, res) => {
    try {
        const { emoji } = req.body;
        if (!emoji || typeof emoji !== "string") {
            return res.status(400).json({ message: "Emoji is required" });
        }

        const goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id });
        if (!goal) return res.status(404).json({ message: "Goal not found" });

        const comment = goal.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        // Check if reaction already exists by this user for this emoji
        const existingReactionIndex = comment.reactions.findIndex(
            (r) => r.byUser.toString() === req.user._id.toString() && r.emoji === emoji
        );

        if (existingReactionIndex > -1) {
            // Remove reaction
            comment.reactions.splice(existingReactionIndex, 1);
        } else {
            // Add reaction
            comment.reactions.push({ byUser: req.user._id, emoji });
        }

        await goal.save();

        const updatedGoal = await Goals.findOne({ _id: goal._id }).populate("comments.byUser", "firstName lastName photoUrl");
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error in toggleReaction:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    getGoals,
    getGoalById,
    createGoal,
    updateGoal,
    deleteGoal,
    archiveGoal,
    addComment,
    editComment,
    deleteComment,
    toggleReaction
};
