const express = require("express");
const passRoute = express.Router();

passRoute.post("/changePassword", async (req, res) => {
    try {
        const { userGmail, OldPassword, NewPassword } = req.body;


        if (!OldPassword) {
            throw new Error("If you forgot the password click on forgot password");
        }
        if (!NewPassword) {
            throw new Error("Please enter the new password");
        }
        if (!OldPassword || !NewPassword || !userGmail) {
            throw new Error("Enter all the entries properly");
        }
        const user = await

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