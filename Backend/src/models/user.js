const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { type } = require("os");

const userSchema = new mongoose.Schema(
    {
        FirstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
            trim: true
        },
        MiddleName: {
            type: String,
            trim: true

        },
        LastName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
            trim: true

        },
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        age: {
            type: Number,
            min: 10,
            trim: true,
            required: true
        },
        Gmail: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,

            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is not valid");
                }
            },
        },
        photoUrl: {
            type: String,
            default: "https://geographyandyou.com/images/user-profile.png",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid Photo URL: " + value);
                }
            },
        },

        about: {
            type: String,
            default: "Complete your profile to shoqw details here !!",
        },
        college: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            default: "No skills added yet",
        },
        profession: {
            type: String,
            required: true,
        },
        termsAccepted: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
        required: true
    }
);

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d", });

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
};

module.exports = mongoose.model("Users", userSchema, "Users");