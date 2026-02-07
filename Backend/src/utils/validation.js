const validator = require("validator");

const validateSignUpData = (data) => {
    const { firstName, lastName, gmail, age, password, username, profession, college, termsAccepted, gender } = data;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(gmail)) {
        throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password!");
    } else if (!validator.matches(username, /^[a-z0-9._]{3,20}$/)) {
        throw new Error("Please enter a username! which has lowercase letters , underscores and numbers");
    } else if (age === undefined || age === null || age === "") {
        throw new Error("Age is required");
    } else if (age <= 10) {
        throw new Error("Age must be greater than 10");
    }
    else if (college === undefined || college === null || college === "") {
        throw new Error("college or company name is required");
    }
    else if (profession === undefined || profession === null || profession === "") {
        throw new Error("profession name is required");
    } else if (termsAccepted == 0 || termsAccepted == false) {
        throw new Error("You must accept the terms and conditions")
    } else if (!["male", "female", "other"].includes(gender)) {
        throw new Error("Please specify your gender properly");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "FirstName",
        "LastName",
        "MiddleName",
        "photoUrl",
        "username",
        "gender",
        "age",
        "about",
        "skills",
        "profession",
        "college"
    ];
    const { age, username, college } = req.body;
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    if (!validator.matches(username, /^[a-z0-9._]{3,20}$/)) {
        throw new Error("Please enter a username! which has lowercase letters , underscores and numbers");
    } if (age <= 10) {
        throw new Error("Age must be greater than 10");
    }
    return isEditAllowed;
};

module.exports = {
    validateSignUpData,
    validateEditProfileData,
};