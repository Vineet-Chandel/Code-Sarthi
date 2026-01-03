const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/SignUpDB", async (req, res) => {
    try {

        const { FirstName, MiddleName, LastName, Gmail, password, username, age, gender, photoUrl, about, college, skills, profession, termsAccepted } = req.body;
        // Validation of data
        validateSignUpData(req);

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //   Creating a new instance of the User model
        const user = new User({
            FirstName,
            MiddleName,
            LastName,
            Gmail,
            age,
            username,
            gender,
            photoUrl,
            about,
            skills,
            college,
            termsAccepted,
            profession,
            password: passwordHash,
        });
        if (!FirstName || !LastName || !Gmail || !password || !username || !age || !college || !profession || termsAccepted === undefined) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.json({ message: "User Added successfully!", data: { Name: savedUser.FirstName + " " + savedUser.LastName } });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/SignInDB", async (req, res) => {
    try {
        const { Gmail, password } = req.body;
        if (!Gmail || !password) {
            throw new Error({
                success: false,
                message: "Gmail and password are required"
            });
        }

        const user = await User.findOne({ Gmail: Gmail });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send({
                FirstName: user.FirstName,
                MiddleName: user.MiddleName,
                LastName: user.LastName,
                username: user.username,
                age: user.age,
                Gmail: user.Gmail,
                gender: user.gender,
                photoUrl: user.photoUrl,
                about: user.about,
                college: user.college,
                profession: user.profession,
                skills: user.skills,
            });
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
});



module.exports = authRouter;