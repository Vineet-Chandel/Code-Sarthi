const express = require("express");
const imgOrVideo = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const uploadImgVideoFile = require("../middlewares/multerConvoImgVideo");
const getDataUrl = require("../utils/buffer");
const cloudinary = require("cloudinary").v2;

imgOrVideo.post(
    "/convo-img-video/upload",
    userAuth,
    uploadImgVideoFile.single("file"),
    async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                throw new Error("Please Re-login");
            }

            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded",
                });
            }
            if (file.size > 50 * 1024 * 1024) {
                return res.status(400).json({
                    success: false,
                    message: "File too large (max 50MB)",
                });
            }
            const fileBuffer = getDataUrl(file);

            const resourceType = file.mimetype.startsWith("video")
                ? "video"
                : "image";

            let uploadOptions = {
                folder: "CodeSarthi-ImageVideoCloud",
                resource_type: resourceType,
            };

            // image optimization
            if (resourceType === "image") {
                uploadOptions.transformation = [
                    {
                        width: 500,
                        height: 500,
                        crop: "thumb",
                        gravity: "face",
                        quality: "auto",
                        fetch_format: "auto",
                    },
                ];
            }

            if (resourceType === "video") {
                uploadOptions.transformation = [
                    {
                        width: 1280,
                        crop: "limit",
                        quality: "auto",
                        fetch_format: "auto"
                    }
                ];
            }

            const cloud = await cloudinary.uploader.upload(
                fileBuffer.content,
                uploadOptions
            );

            res.json({
                success: true,
                url: cloud.secure_url,
                public_id: cloud.public_id,
                file_size: file.size,
                file_type: file.mimetype,
                message: "File uploaded successfully",
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message || "Something went wrong",
            });
        }
    }
);

module.exports = imgOrVideo;