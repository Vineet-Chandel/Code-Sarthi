const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserName",
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id;
            const toUserName = req.params.toUserName;


            const toUserData = await User.findOne({ username: toUserName });
            if (!toUserData) {
                throw new Error("User not found")
            }
            const toUserId = toUserData._id;

            const status = req.params.status;

            const allowedStatus = ["blocked", "interested"];
            if (!allowedStatus.includes(status)) {
                return res
                    .status(400)
                    .json({ message: "Invalid status type: " + status });
            }
            const blockedExists_1 = await ConnectionRequest.findOne({
                fromUserId, toUserId, status: "blocked"

            });
            const blockedExists_2 = await ConnectionRequest.findOne({
                fromUserId: toUserId, toUserId: fromUserId, status: "blocked"

            });

            if (blockedExists_1) {
                return res.status(403).json({
                    message: "You Blocked this user please unblock this user to unblock",
                });
            }

            if (blockedExists_2) {
                return res.status(403).json({
                    message: "You cannot interact with this user",
                });
            }

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId },
                ],
            });
            if (existingConnectionRequest) {
                return res
                    .status(400)
                    .send({ message: "Connection Request Already Exists!!" });
            }

            if (existingConnectionRequest?.status === "accepted") {
                return res.status(400).json({
                    message: "You are already connected",
                });
            }


            if (fromUserId.equals(toUserId)) {
                throw new Error("Cannot send connection request to yourself!")
            }


            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });

            const data = await connectionRequest.save();


            res.status(201).json({
                success: true,
                message: "Connection request sent",
                data: {
                    from: req.user.username,
                    to: toUserData.username,
                    status,
                },
            });
        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);

requestRouter.post(
    "/request/review/:status/:connectionId",
    userAuth,
    async (req, res) => {
        try {
            const loggedInUser = req.user;
            const { status, connectionId } = req.params;

            const allowedStatus = ["accepted", "rejected"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ messaage: "Status not allowed!" });
            }

            const connectionRequest = await ConnectionRequest.findOne({
                _id: connectionId,
                toUserId: loggedInUser._id,
                status: "interested",
            });

            if (!connectionRequest) {
                return res
                    .status(404)
                    .json({ message: "Connection request not found" });
            }

            connectionRequest.status = status;

            const data = await connectionRequest.save();

            res.json({ message: "Connection request " + status, data });
        } catch (err) {
            res.status(400).send("ERROR: " + err.message);
        }
    }
);

module.exports = requestRouter;