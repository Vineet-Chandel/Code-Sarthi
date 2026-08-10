const Comment = require('../models/comment');
const Issue = require('../models/issue');
const TeamMember = require('../models/teamMember');
const { getSocket, getOnlineUsers } = require('../Socket/Services/OnlineUserManager');

// Helper to broadcast WS events to team members online
const broadcastToTeam = async (teamId, eventName, payload) => {
    try {
        const teamMembers = await TeamMember.find({ teamId, status: 'active' }).select('userId');
        teamMembers.forEach(member => {
            const sockets = getSocket(member.userId.toString());
            if (sockets) {
                sockets.forEach(ws => {
                    if (ws.readyState === 1) { // WebSocket.OPEN
                        ws.send(JSON.stringify({
                            does: eventName,
                            ...payload
                        }));
                    }
                });
            }
        });
    } catch (error) {
        console.error("Broadcast to team failed:", error);
    }
};

exports.getIssueComments = async (req, res) => {
    try {
        const { teamId, issueId } = req.params;
        const { cursor, limit = 50 } = req.query;

        // Ensure issue exists and belongs to team
        const issue = await Issue.findOne({ _id: issueId, teamId });
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        let query = { issueId, deletedAt: null };

        // Cursor-based pagination (using createdAt)
        if (cursor) {
            query.createdAt = { $gt: new Date(cursor) }; // standard chronological ordering
        }

        const comments = await Comment.find(query)
            .sort({ createdAt: 1 })
            .limit(Number(limit))
            .populate('authorId', 'firstName lastName photoUrl email');

        let nextCursor = null;
        if (comments.length === Number(limit)) {
            nextCursor = comments[comments.length - 1].createdAt;
        }

        res.status(200).json({ comments, nextCursor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.createIssueComment = async (req, res) => {
    try {
        const { teamId, issueId } = req.params;
        const { body } = req.body;
        const authorId = req.user._id;

        const issue = await Issue.findOne({ _id: issueId, teamId });
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        if (!body || !body.trim()) {
            return res.status(400).json({ message: "Comment body is required" });
        }

        const comment = await Comment.create({
            issueId,
            teamId,
            authorId,
            body: body.trim()
        });

        await comment.populate('authorId', 'firstName lastName photoUrl email');

        // Broadcast to team
        broadcastToTeam(teamId, 'comment:new', { comment });

        res.status(201).json({ comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateIssueComment = async (req, res) => {
    try {
        const { teamId, issueId, commentId } = req.params;
        const { body } = req.body;
        const authorId = req.user._id;

        if (!body || !body.trim()) {
            return res.status(400).json({ message: "Comment body is required" });
        }

        const comment = await Comment.findOne({ _id: commentId, issueId, teamId, deletedAt: null });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.authorId.toString() !== authorId.toString()) {
            return res.status(403).json({ message: "Not authorized to edit this comment" });
        }

        comment.body = body.trim();
        await comment.save();
        
        await comment.populate('authorId', 'firstName lastName photoUrl email');

        broadcastToTeam(teamId, 'comment:updated', { comment });

        res.status(200).json({ comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteIssueComment = async (req, res) => {
    try {
        const { teamId, issueId, commentId } = req.params;
        const authorId = req.user._id;

        const comment = await Comment.findOne({ _id: commentId, issueId, teamId, deletedAt: null });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Only author can soft-delete their comment (admin/leader checks can be added if required)
        if (comment.authorId.toString() !== authorId.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this comment" });
        }

        comment.deletedAt = new Date();
        await comment.save();

        broadcastToTeam(teamId, 'comment:deleted', { commentId, issueId });

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
