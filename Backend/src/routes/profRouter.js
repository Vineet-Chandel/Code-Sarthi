const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/userAuth");
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const upload = require("../middlewares/multer");
const cloudinary = require("../utils/fileUpload");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send({
            FirstName: req.user.FirstName,
            MiddleName: req.user.MiddleName,
            LastName: req.user.LastName,
            username: req.user.username,
            age: req.user.age,
            Gmail: req.user.Gmail,
            gender: req.user.gender,
            photoUrl: req.user.photoUrl,
            about: req.user.about,
            college: req.user.college,
            skills: req.user.skills,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: {
                FirstName: loggedInUser.FirstName,
                MiddleName: loggedInUser.MiddleName,
                LastName: loggedInUser.LastName,
                username: loggedInUser.username,
                age: loggedInUser.age,
                Gmail: loggedInUser.Gmail,
                gender: loggedInUser.gender,
                photoUrl: loggedInUser.photoUrl,
                about: loggedInUser.about,
                college: loggedInUser.college,
                skills: loggedInUser.skills,
            },
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});
profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
    try {
        console.log(req.user._id);
        const deletedUser = await User.findByIdAndDelete(req.user._id);


        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found or already deleted"
            });
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
});

profileRouter.post("/changePassword", userAuth, async (req, res) => {
    try {
        const { OldPassword, NewPassword } = req.body;

        if (!OldPassword || !NewPassword) {
            throw new Error("Old and new password are required");
        }

        const user = req.user;

        const isOldPasswordCorrect = await user.validatePassword(OldPassword);
        if (!isOldPasswordCorrect) {
            throw new Error("Old password is incorrect");
        }
        if (!validator.isStrongPassword(NewPassword)) {
            throw new Error("New password is too weak")
        }
        const passwordHash = await bcrypt.hash(NewPassword, 10);
        user.password = passwordHash;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
profileRouter.post("/userProfile/:userame", userAuth, async (req, res) => {
    try {
        const { OldPassword, NewPassword } = req.body;

        if (!OldPassword || !NewPassword) {
            throw new Error("Old and new password are required");
        }

        const user = req.user;

        const isOldPasswordCorrect = await user.validatePassword(OldPassword);
        if (!isOldPasswordCorrect) {
            throw new Error("Old password is incorrect");
        }
        if (!validator.isStrongPassword(NewPassword)) {
            throw new Error("New password is too weak")
        }
        const passwordHash = await bcrypt.hash(NewPassword, 10);
        user.password = passwordHash;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = profileRouter;