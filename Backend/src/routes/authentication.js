const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/userAuth");

//signUp
authRouter.post("/auth/signup", async (req, res) => {
    try {

        const { firstName, middleName, lastName, gmail, password, username, age, gender, college, profession, termsAccepted } = req.body;
        // Validation of data
        validateSignUpData(req.body);

        const existingGmailUser = await User.findOne({
            gmail
        });

        if (existingGmailUser) {
            return res.status(409).json({
                message: "Gmail already exists"
            });
        }
        const existingUsernameUser = await User.findOne({
            username
        });

        if (existingUsernameUser) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }
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
            httpOnly: true,        // JS can't access it
            secure: true,          // HTTPS only (required in prod)
            sameSite: "strict",    // CSRF protection
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.status(201).json({
            DATA: {
                identity: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                username: user.username,
                age: user.age,
                gender: user.gender,
                photoUrl: user.photoUrl,
                about: user.about,
                college: user.college,
                skills: user.skills,
                profession: user.profession,
                gmail: user.gmail,
                isVerified: user.isVerified,
            }
        });
    } catch (err) {
        res.status(400).json({ message: "Request Failed" });
    }
});
//sigin
authRouter.post("/auth/signin", async (req, res) => {
    try {
        const { gmail, password } = req.body;
        if (!gmail || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ gmail: gmail.toLowerCase() }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
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
            res.status(200).json({
                DATA: {
                    identity: user._id,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName,
                    username: user.username,
                    age: user.age,
                    gender: user.gender,
                    photoUrl: user.photoUrl,
                    about: user.about,
                    college: user.college,
                    skills: user.skills,
                    profession: user.profession,
                    gmail: user.gmail,
                    isVerified: user.isVerified,
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    } catch (err) {
        res.status(400).json({ message: "Login Failed" });
    }
});
//signout
authRouter.post("/auth/signout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
});

//email verification
authRouter.get("/auth/verify-email", userAuth, async (req, res) => {
    const { gmail: userGmail } = req.user;
    if (!userGmail) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
    const currentUser = await User.findOne({ gmail: userGmail.toLowerCase() })
    if (!currentUser) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong"
        });
    }
    res.json({ "data ": currentUser.username })
})


module.exports = authRouter;