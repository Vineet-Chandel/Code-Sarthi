const express = require("express");
const userPreference = express.Router();
const mongoose = require("mongoose");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const blockConnection = require("../models/blockConnection")
const connections = require("../models/connections");


// GET all accepted connections
userPreference.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // fetch connections + auto load users
        const connectionDocs = await connections
            .find({
                $or: [
                    { requesterId: loggedInUser._id },
                    { receiverId: loggedInUser._id }
                ]
            })
            .populate(
                "requesterId receiverId",
                "firstName lastName username skills about profession college photoUrl isVerified age gender"
            )


        // format response
        const formattedConnections = connectionDocs
            .map((row) => {

                // determine who is the other person
                const isFromMe =
                    row.requesterId?._id.toString() ===
                    loggedInUser._id.toString();

                const otherUser = isFromMe
                    ? row.receiverId
                    : row.requesterId;

                // safety check (user might be deleted)
                if (!otherUser) return null;

                return {
                    connectionId: row._id,
                    userId: otherUser._id,
                    FirstName: otherUser.firstName,
                    LastName: otherUser.lastName,
                    username: otherUser.username,
                    skills: otherUser.skills,
                    about: otherUser.about,
                    profession: otherUser.profession,
                    college: otherUser.college,
                    photoUrl: otherUser.photoUrl.url,
                    isVerified: otherUser.isVerified,
                    age: otherUser.age,
                    gender: otherUser.gender
                };
            })
            .filter(Boolean); // remove null users

        return res.status(200).json({
            success: true,
            totalConnections: formattedConnections.length,
            data: formattedConnections
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
//all blocked connections
userPreference.get("/user/blocked", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // fetch connections + auto load users
        const blockDocs = await blockConnection
            .find({
                requesterId: loggedInUser._id
            })
            .populate(
                "requesterId receiverId",
                "firstName lastName username skills about profession college"
            )


        // format response
        const formattedBlock = blockDocs
            .map((row) => {
                const otherUser = row.receiverId;
                // safety check (user might be deleted)
                if (!otherUser) return null;

                return {
                    firstName: otherUser.firstName,
                    middleName: otherUser.middleName,
                    lastName: otherUser.lastName,
                    username: otherUser.username,
                };
            })
            .filter(Boolean); // remove null users

        return res.status(200).json({
            success: true,
            totalConnections: formattedBlock.length,
            data: formattedBlock
        });

    } catch (err) {
        return res.status(500).json({
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

        const deletedConnection = await blockConnection.findOneAndDelete({
            _id: blockedConUserId,
            requesterId: loggedInUserId,
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


        const deletedConnection = await connections.findOneAndDelete({
            _id: connectionUserId,
            $or: [
                { requesterId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

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
// Get all the pending connection request for the loggedIn user
userPreference.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            receiverId: loggedInUser._id,
            status: "REQUESTED",
        }).populate("requesterId", "firstName middleName lastName username skills about profession college isVerified");

        if (!connectionRequests || connectionRequests.length === 0) {
            return res.status(200).json({
                success: true,
                total: 0,
                data: []
            });
        }

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
// all sent requests
userPreference.get("/user/requests/send", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const STATUS_INTERESTED = "REQUESTED";

        const USER_SAFE_DATA =
            "username firstName middleName lastName age gender photoUrl about college skills profession gmail isVerified";

        const requests = await ConnectionRequest.find({
            requesterId: loggedInUserId,
            status: STATUS_INTERESTED
        }).populate("receiverId", USER_SAFE_DATA);

        if (!requests || requests.length === 0) {
            return res.status(200).json({
                success: true,
                total: 0,
                data: []
            });
        }

        const formattedRequests = requests.map(r => {
            const user = r.receiverId;

            return {
                _id: r._id,
                username: user.username,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,
                photoUrl: user.photoUrl,
                about: user.about,
                college: user.college,
                skills: user.skills,
                profession: user.profession,
                gmail: user.gmail,
                isVerified: user.isVerified,
            };
        });

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
// cancel delete sent request
userPreference.delete("/user/requests/send/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { requestId } = req.params;

        const STATUS_INTERESTED = "REQUESTED";

        const deletedRequest = await ConnectionRequest.findOneAndDelete({
            _id: requestId,
            requesterId: loggedInUserId,
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

//feed
userPreference.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 15 ? 15 : limit;
        const skip = (page - 1) * limit;

        const requests = await ConnectionRequest.find({
            $or: [
                { requesterId: loggedInUser._id },
                { receiverId: loggedInUser._id }
            ]
        }).select("requesterId receiverId").lean();

        const connectionDocs = await connections.find({
            $or: [
                { requesterId: loggedInUser._id },
                { receiverId: loggedInUser._id }
            ]
        }).select("requesterId receiverId").lean();

        const blockedDocs = await blockConnection.find({
            $or: [
                { requesterId: loggedInUser._id },
                { receiverId: loggedInUser._id }
            ]
        }).select("requesterId receiverId").lean();


        const allHiddenDocs = [
            ...requests,
            ...connectionDocs,
            ...blockedDocs
        ];
        const hideUsersFromFeed = new Set();
        allHiddenDocs.forEach((doc) => {
            if (doc.requesterId) {
                hideUsersFromFeed.add(doc.requesterId.toString());
            }
            if (doc.receiverId) {
                hideUsersFromFeed.add(doc.receiverId.toString());
            }
        });

        hideUsersFromFeed.delete(loggedInUser._id.toString());

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        })
            .select("firstName middleName lastName username gender photoUrl about college skills age profession ")
            .skip(skip)
            .limit(limit);

        res.json({ data: users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = userPreference;




