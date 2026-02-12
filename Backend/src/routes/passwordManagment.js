const express = require("express");
const passRoute = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

passRoute.post("/changePassword", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        if (!oldPassword) {
            throw new Error("If you forgot the password click on forgot password");
        }
        if (!newPassword) {
            throw new Error("Please enter the new password");
        }
        if (!oldPassword || !newPassword) {
            throw new Error("Enter all the entries properly");
        }
        if (oldPassword === newPassword) {
            throw new Error("Password is as same as the old password");
        }
        const isOldPasswordCorrect = await user.validatePassword(oldPassword);
        if (!isOldPasswordCorrect) {
            throw new Error("Old password is incorrect");
        }

        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("New Password! iss too weak");
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
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