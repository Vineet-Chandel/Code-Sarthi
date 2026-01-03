const validator = require("validator");

const validateSignUpData = (req) => {
    const { FirstName, LastName, Gmail, age, password, username, profession, college } = req.body;
    if (!FirstName || !LastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(Gmail)) {
        throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password!");
    } else if (!validator.matches(username, /^[a-z0-9._]{3,20}$/)) {
        throw new Error("Please enter a strong Password!");
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
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "FirstName",
        "LastName",
        "MiddleName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
        "profession",
        "college"
    ];

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );

    return isEditAllowed;
};

module.exports = {
    validateSignUpData,
    validateEditProfileData,
};