//importing the moongoose
const mongoose = require("mongoose");
const { Schema } = mongoose; //“We are extracting the Schema property from the mongoose object and storing it in a variable called Schema.”

const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new Schema(
    {
        //Authenticationn
        gmail: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false
        },
        termsAccepted: {
            type: Boolean,
            required: true,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },

        //Identity
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
            trim: true
        },
        middleName: {
            type: String,
            trim: true
        },
        lastName: {
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
            required: true
        },
        gender: {
            type: String,

            validate(value) {
                if (!["male", "female", "other"].includes(value)) {
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
            default: "Complete your profile to show your about here !!",
        },
        college: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            default: ["No skills added yet"],
        },
        profession: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);


userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d", }
    );

    return token;
};

//Password validation 
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