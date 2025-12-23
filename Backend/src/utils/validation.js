const validator = require("validator");

const validateSignUpData = (req) => {
    const { FirstName, LastName, Gmail, password, username, skills } = req.body;
    if (!FirstName || !LastName) {
        throw new Error("Name is not valid!");
    } else if (!validator.isEmail(Gmail)) {
        throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password!");
    } else if (!validator.matches(username, /^[a-z0-9._]{3,20}$/)) {
        throw new Error("Please enter a strong Password!");
    } else if (skills.length > 15) {
        throw new Error("Skills cant be more than 15");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "FirstName",
        "LastName",
        "MiddleName",
        "username",
        "Gmail",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
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