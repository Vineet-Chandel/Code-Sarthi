const express = require("express");
const profilePic = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const uploadFile = require("../middlewares/multerProfile");
const getDataUrl = require("../utils/buffer");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

profilePic.post(
    "/profile-pic/upload",
    userAuth,
    uploadFile.single("profilePic"),
    async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                throw new Error("Please Re-login")
            }
            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }

            // convert buffer → dataURL
            const fileBuffer = getDataUrl(file);

            // get current user
            const currentUser = await User.findById(req.user._id);

            // delete old image if exists
            if (currentUser?.photoUrl?.id) {
                await cloudinary.uploader.destroy(currentUser.photoUrl.id);
            }

            // upload to cloudinary
            const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
                folder: "CodeSarthi-ProfileCloud",
                resource_type: "image",
                transformation: [
                    {
                        width: 500,
                        height: 500,
                        crop: "thumb",
                        gravity: "face",
                        quality: "auto",
                        fetch_format: "auto"
                    }
                ]
            });

            // update EXISTING user (not create new one)
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    photoUrl: {
                        url: cloud.secure_url,
                        id: cloud.public_id,
                    },
                },
                { new: true }
            );

            res.json({
                success: true,
                data: updatedUser,
                message: "Profile updated successfully",
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong",
            });
        }
    }
);


profilePic.post(
    "/remove-profile-pic/upload",
    userAuth,
    async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                throw new Error("Please Re-login")
            }

            // get current user
            const currentUser = await User.findById(req.user._id);

            // delete old image if exists
            if (currentUser?.photoUrl?.id) {
                await cloudinary.uploader.destroy(currentUser.photoUrl.id);
            }


            // update EXISTING user (not create new one)
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    photoUrl: {
                        url: "https://res.cloudinary.com/dggoaxqxl/image/upload/q_auto/f_auto/v1776698539/Quick_Note_Pin_qky24p.jpg",
                        id: "",
                    },
                },
                { new: true }
            );

            res.json({
                success: true,
                data: updatedUser,
                message: "Profile updated successfully",
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong",
            });
        }
    }
);

module.exports = profilePic;
