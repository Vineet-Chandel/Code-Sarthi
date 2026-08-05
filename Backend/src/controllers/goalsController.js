const Goals = require("../models/goals");
const Issue = require("../models/issue");
const { mapGoalStatusToIssueStatus } = require("../utils/statusMapping");
const cloudinary = require("cloudinary").v2;
const getDataUrl = require("../utils/buffer");


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
        let { name, status = "Not Started", targetDate = new Date().toISOString(), priority = "Medium", category = "General", description = "No description provided.", tags = [], photos = [] } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Goal name is required",
            })
        }

        //name validation
        if (typeof name !== "string" || name.trim().length < 3 || name.trim().length > 500) {
            return res.status(400).json({
                success: false,
                message: "Invalid name (must be between 3 and 500 characters)",
            })
        }

        if (!Array.isArray(tags)) {
            tags = typeof tags === "string" ? tags.split(",").map(t => t.trim()).filter(Boolean) : [];
        }

        if (photos && (!Array.isArray(photos) || photos.length > 5)) {
            return res.status(400).json({
                success: false,
                message: "Invalid photos format or exceeded maximum limit of 5 photos",
            });
        }

        const initialStatus = String(status || "Not Started").trim();
        const now = new Date();
        const newGoal = new Goals({
            name: name.trim(),
            status: initialStatus,
            targetDate,
            owner: req.user._id,
            priority: String(priority || "Medium").trim(),
            category: String(category || "General").trim(),
            description: String(description || "No description provided.").trim(),
            tags: tags.map(tag => String(tag).trim()),
            photos: Array.isArray(photos) ? photos.slice(0, 5) : [],
            lastUpdated: now,
            startedAt: ["In Progress", "in_progress", "On Track", "At Risk"].includes(initialStatus) ? now : null,
            pausedAt: ["On Hold", "on_hold"].includes(initialStatus) ? now : null,
            completedAt: ["Completed", "completed"].includes(initialStatus) ? now : null,
            abandonedAt: ["Removed", "abandoned", "Abandoned"].includes(initialStatus) ? now : null
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
        const { name, status, targetDate, priority, category, description, tags, progress, following, photos } = req.body;
        
        let goal = await Goals.findOne({ _id: req.params.id, owner: req.user._id });
        if (!goal) {
            return res.status(404).json({ message: "Goal not found" });
        }

        if (name) goal.name = name.trim();
        if (status) {
            const newStatus = status.trim();
            const now = new Date();
            if (newStatus !== goal.status) {
                if (["In Progress", "in_progress", "On Track", "At Risk"].includes(newStatus) && !goal.startedAt) {
                    goal.startedAt = now;
                }
                if (["On Hold", "on_hold"].includes(newStatus)) {
                    goal.pausedAt = now;
                }
                if (["Completed", "completed"].includes(newStatus)) {
                    goal.completedAt = now;
                }
                if (["Removed", "abandoned", "Abandoned"].includes(newStatus)) {
                    goal.abandonedAt = now;
                }
            }
            goal.status = newStatus;
        }
        if (targetDate) goal.targetDate = targetDate;
        if (priority) goal.priority = priority.trim();
        if (category) goal.category = category.trim();
        if (description) goal.description = description.trim();
        if (tags && Array.isArray(tags)) goal.tags = tags.map(tag => tag.trim());
        if (progress !== undefined) goal.progress = progress;
        if (following !== undefined) goal.following = following;
        if (photos !== undefined) {
            if (!Array.isArray(photos) || photos.length > 5) {
                return res.status(400).json({ message: "Invalid photos array or exceeds 5 photos limit" });
            }
            goal.photos = photos.slice(0, 5);
        }
        
        goal.lastUpdated = Date.now();

        const updatedGoal = await goal.save();

        if (status && updatedGoal.sourceIssueId) {
            await Issue.updateOne(
                { _id: updatedGoal.sourceIssueId },
                { status: mapGoalStatusToIssueStatus(updatedGoal.status) }
            );
        }

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
        if (goal.sourceIssueId) {
            await Issue.updateOne({ _id: goal.sourceIssueId }, { linkedGoalId: null });
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

// @desc    Upload photos for goals to cloudinary
// @route   POST /api/goals/upload-photos
const uploadGoalPhotos = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Please Re-login");
        }

        const files = req.files || (req.file ? [req.file] : []);
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded",
            });
        }

        if (files.length > 5) {
            return res.status(400).json({
                success: false,
                message: "Maximum 5 photos allowed at a time",
            });
        }

        const uploadedPhotos = await Promise.all(
            files.map(async (file) => {
                const fileBuffer = getDataUrl(file);
                const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
                    folder: "CodeSarthi-ProfileCloud",
                    resource_type: "image",
                    quality: "auto",
                    fetch_format: "auto",
                });
                return {
                    url: cloud.secure_url,
                    id: cloud.public_id,
                };
            })
        );

        res.json({
            success: true,
            photos: uploadedPhotos,
            message: "Photos uploaded successfully",
        });
    } catch (err) {
        console.error("Error in uploadGoalPhotos:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong during upload",
        });
    }
};

// @desc    Remove photo from cloudinary when removed from goal
// @route   DELETE /api/goals/photo
const removeGoalPhoto = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Please Re-login");
        }

        const { id } = req.body; // cloudinary public_id
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No image ID provided",
            });
        }

        await cloudinary.uploader.destroy(id);

        res.json({
            success: true,
            message: "Photo deleted successfully from Cloudinary",
        });
    } catch (err) {
        console.error("Error in removeGoalPhoto:", err);
        res.status(500).json({
            success: false,
            message: err.message || "Could not delete photo",
        });
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
    toggleReaction,
    uploadGoalPhotos,
    removeGoalPhoto
};
