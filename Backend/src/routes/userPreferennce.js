const express = require("express");
const userPreference = express.Router();
const mongoose = require("mongoose");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// Get all the pending connection request for the loggedIn user
userPreference.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "FirstName" + " " + "LastName");



        res.json({
            success: true,
            message: "Pending connection requests fetched",
            total: connectionRequests.length,
            data: connectionRequests,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//all accepted conections
userPreference.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        }).populate("fromUserId", "FirstName LastName").populate("toUserId", "FirstName LastName");

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.status(200).json({
            success: true,
            totalConnections: connectionRequests.length,
            data: connectionRequests
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
//all blocked connections
userPreference.get("/user/blocked", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const blockedConnection = await ConnectionRequest.find({
            fromUserId: loggedInUser._id, status: "blocked"
        }).populate("toUserId", "FirstName LastName");


        res.status(200).json({
            success: true,
            totalBlocked: blockedConnection.length,
            data: blockedConnection
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
// delete blocked connections
userPreference.delete("/user/blocked/:blockedConUserId", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { blockedConUserId } = req.params;

        if (!blockedConUserId) {
            return res.status(400).json({
                success: false,
                message: "Connection user id is required"
            });
        }

        const deletedConnection = await ConnectionRequest.findOneAndDelete({
            _id: blockedConUserId,
            fromUserId: loggedInUserId,
            status: "blocked"
        });



        if (!deletedConnection) {
            return res.status(404).json({
                success: false,
                message: "blocked Connection not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: " blocked Connection removed successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
//delete  the connection
userPreference.delete("/user/connections/:connectionUserId", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { connectionUserId } = req.params;

        if (!connectionUserId) {
            return res.status(400).json({
                success: false,
                message: "Connection user id is required"
            });
        }

        const deletedConnection = await ConnectionRequest.find(connectionUserId);

        if (deletedConnection.status == "rejected" || deletedConnection.status == "blocked" || deletedConnection.status == "interested") {
            throw new Error("These are not your connections")
        }

        if (!deletedConnection) {
            return res.status(404).json({
                success: false,
                message: "Connection not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Connection removed successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
//all send req
userPreference.get("/user/requests/send", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const STATUS_INTERESTED = "interested";
        const USER_SAFE_DATA = "username";

        const requests = await ConnectionRequest.find({
            fromUserId: loggedInUserId,
            status: STATUS_INTERESTED
        })
            .populate("toUserId", USER_SAFE_DATA)


        if (!requests || requests.length === 0) {
            return res.status(200).json({
                success: true,
                total: 0,
                data: []
            });
        }

        const formattedRequests = requests.map(r => ({
            _id: r._id,
            username: r.toUserId.username
        }));

        return res.status(200).json({
            success: true,
            total: formattedRequests.length,
            data: formattedRequests
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// cancel / delete sent request
userPreference.delete(
    "/user/requests/send/:requestId",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUserId = req.user._id;
            const { requestId } = req.params;

            const STATUS_INTERESTED = "interested";

            const deletedRequest = await ConnectionRequest.findOneAndDelete({
                _id: requestId,
                fromUserId: loggedInUserId,
                status: STATUS_INTERESTED
            });

            if (!deletedRequest) {
                return res.status(404).json({
                    success: false,
                    message: "Request not found or cannot be deleted"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Request cancelled successfully"
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
);

userPreference.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 15 ? 15 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
        }).select("fromUserId  toUserId");


        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        })
            .select("FirstName MiddleName LastName username gender photoUrl about college skills age")
            .skip(skip)
            .limit(limit);

        res.json({ data: users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = userPreference;




