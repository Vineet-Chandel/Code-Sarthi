const express = require("express");
const passRoute = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");


//CHANGING PASSWORD API WHEN USER REMEMBERED THE PASS + LOGINED
passRoute.post("/changePassword", userAuth, async (req, res) => {
    try {
        // DATA 
        const { oldPassword, newPassword } = req.body;
        const { gmail } = req.user;

        //VALIDATION 
        if (!oldPassword || !newPassword) {
            throw new Error("Enter all the entries properly");
        }
        if (oldPassword === newPassword) {
            throw new Error("Password is as same as the old password");
        }


        //DIGGING OUT THE PRIVATE INFORMATION
        const targetUser = await User.findOne({ gmail: gmail.toLowerCase() }).select("+password");
        const { isVerified } = targetUser;

        if (!targetUser) {
            throw new Error("Something went wrong please re-login");
        }
        if (!isVerified) {
            throw new Error("Please verify your email first")
        }

        // OLD IS CORRECT OR NOT
        const isOldPasswordCorrect = await targetUser.validatePassword(oldPassword);
        if (!isOldPasswordCorrect) {
            throw new Error("Old password is incorrect");
        }
        //NEW IS MEETING OUR STANDARDS OR NOT 
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("New Password! iss too weak");
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        targetUser.password = passwordHash;
        await targetUser.save();
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


module.exports = passRoute;