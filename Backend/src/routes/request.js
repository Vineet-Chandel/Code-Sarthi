const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const blockConnection = require("../models/blockConnection")
const connections = require("../models/connections");
const User = require("../models/user");
const { trusted } = require("mongoose");

requestRouter.post("/request/send/:toUserName",
    userAuth,
    async (req, res) => {
        try {
            //getting the both side user 
            const fromUserId = req.user._id; //sender ID
            const toUserName = req.params.toUserName;

            const toUserData = await User.findOne({ username: toUserName });
            if (!toUserData) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            const toUserId = toUserData._id; //reciever ID 





            if (fromUserId.equals(toUserId)) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot send request to yourself"
                });
            }
            const blockedExists = await blockConnection.findOne({
                $or: [
                    { requesterId: fromUserId, receiverId: toUserId },
                    { requesterId: toUserId, receiverId: fromUserId },
                ],

            });

            if (blockedExists) {
                return res.status(403).json({
                    message: "You can't request this user!",
                });
            }


            const connection = await connections.findOne({
                $or: [
                    { requesterId: fromUserId, receiverId: toUserId },
                    { requesterId: toUserId, receiverId: fromUserId },
                ],

            });

            if (connection) {
                return res.status(403).json({
                    message: "You already connected to this user!",
                });
            }



            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { requesterId: fromUserId, receiverId: toUserId },
                    { requesterId: toUserId, receiverId: fromUserId },
                ],
            });
            if (existingConnectionRequest) {
                if (existingConnectionRequest.status === "REJECTED") {
                    existingConnectionRequest.status = "REQUESTED";

                    await existingConnectionRequest.save()
                    return res.status(200).json({
                        success: true,
                        message: "Connection Request send",
                    });
                }

                if (existingConnectionRequest.status === "REQUESTED") {
                    return res.status(400).json({
                        success: false,
                        message: "Connection already requested",
                    });
                }
            }


            const connectionRequest = new ConnectionRequest({
                requesterId: fromUserId,
                receiverId: toUserId,
                status: "REQUESTED",
            });

            const data = await connectionRequest.save();


            res.status(201).json({
                success: true,
                message: "Connection request sent",
                data: {
                    from: req.user.username,
                    to: toUserData.username,
                    status: "REQUESTED",
                },
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
);
requestRouter.post("/block/:toUserName",
    userAuth,
    async (req, res) => {
        try {
            //getting the both side user 
            const fromUserId = req.user._id; //sender ID
            const toUserName = req.params.toUserName;

            const toUserData = await User.findOne({ username: toUserName });
            if (!toUserData) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const toUserId = toUserData._id; //reciever ID 




            if (fromUserId.equals(toUserId)) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot block yourself"
                });
            }

            const blockedExists = await blockConnection.findOne({
                $or: [
                    { requesterId: fromUserId, receiverId: toUserId },
                    { requesterId: toUserId, receiverId: fromUserId }
                ]
            });
            if (blockedExists) {
                return res.status(403).json({
                    success: false,
                    message: "You cannot interact with this user",
                });
            }

            const connection = await connections.findOne({
                $or: [
                    { requesterId: fromUserId, receiverId: toUserId },
                    { requesterId: toUserId, receiverId: fromUserId }
                ]
            });
            if (connection) {

                await connections.deleteOne({ _id: connection._id });

            }

            await ConnectionRequest.deleteMany({
                $or: [
                    { requesterId: fromUserId, receiverId: toUserId },
                    { requesterId: toUserId, receiverId: fromUserId }
                ]
            });


            const blockDoc = new blockConnection({
                requesterId: fromUserId,
                receiverId: toUserId,
            });

            const data = await blockDoc.save();


            res.status(201).json({
                success: true,
                message: "USER BLOCKED",
                data: {
                    from: req.user.username,
                    to: toUserData.username,

                },
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
);
requestRouter.post("/request/review/:status/:connectionId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, connectionId } = req.params;

        const allowedStatus = ["ACCEPTED", "REJECTED"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status not allowed!" });
        }

        const connectionRequest = await ConnectionRequest.findById(connectionId);

        if (!connectionRequest) {
            return res
                .status(404)
                .json({ message: "Connection request not found" });
        }

        if (!loggedInUser._id.equals(connectionRequest.receiverId)) {
            return res.status(403).json({
                message: "Only receiver can review request"
            });
        }

        const connection = await connections.findOne({
            $or: [
                {
                    requesterId: connectionRequest.requesterId,
                    receiverId: connectionRequest.receiverId
                },
                {
                    requesterId: connectionRequest.receiverId,
                    receiverId: connectionRequest.requesterId
                }
            ]
        });


        if (connection) {
            return res
                .status(400)
                .json({ message: "You both are already connected" });
        }

        if (status === "ACCEPTED") {

            await connections.create({
                requesterId: connectionRequest.requesterId,
                receiverId: connectionRequest.receiverId
            });

            await ConnectionRequest.deleteOne({ _id: connectionId });

            return res.json({ message: "Connection accepted" });
        }

        // REJECTED
        if (status === "REJECTED") {
            connectionRequest.status = "REJECTED";
            await connectionRequest.save();
            return res.json({ message: "Connection rejected" });
        }


    } catch (err) {
        res.status(500).send("ERROR: " + err.message);
    }
}
);

module.exports = requestRouter;