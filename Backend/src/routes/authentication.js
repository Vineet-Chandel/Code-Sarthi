const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//signUp
authRouter.post("/auth/signup", async (req, res) => {
    try {

        const { firstName, middleName, lastName, gmail, password, username, age, gender, college, profession, termsAccepted } = req.body;
        // Validation of data
        validateSignUpData(req.body);

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //   Creating a new instance of the User model
        const user = new User({
            //Authentication
            gmail,
            password: passwordHash,
            termsAccepted,
            //Identity
            firstName,
            middleName,
            lastName,
            username,
            age,
            gender,
            college,
            profession,
        });

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.json({ message: "User Added successfully!", data: { Name: savedUser.firstName + " " + savedUser.lastName } });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/SignInDB", async (req, res) => {
    try {
        const { Gmail, password } = req.body;
        if (!Gmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ Gmail: Gmail.toLowerCase() });
        if (!user) {
            throw new Error("Email or Password is invalid ");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token, {
                // expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: true,          // JS can’t access it
                secure: true,            // HTTPS only
                sameSite: "strict",      // CSRF protection
                maxAge: 8 * 60 * 60 * 1000
            });
            res.send({
                identity: user._id,
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
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
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