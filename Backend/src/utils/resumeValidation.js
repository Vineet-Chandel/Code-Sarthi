const validator = require("validator");

const validateResumeData = (data) => {
    // name validation
    if (!data.fname || typeof data.fname !== "string") { throw new Error("Name is not valid!") }
    else if (data.fname.length < 3) { throw new Error("First name is too short!") };

    if (!data.lname || typeof data.lname !== "string") { throw new Error("Name is not valid!") }
    else if (data.lname.length < 3) { throw new Error("Last name is too short!") };
    // email validation
    if (data.email && typeof data.email === "string") {
        if (!validator.isEmail(data.email)) { throw new Error("Invalid email format") };
    }
    // phone validation (optional)
    if (data.phone && typeof data.phone === "string") {
        if (!validator.isMobilePhone(data.phone, 'any', { strictMode: true })) { throw new Error("Invalid phone number") };
    }

    if (data.summaryTitle && typeof data.summaryTitle === "string") {
        if (validator.isEmpty(data.summaryTitle)) { throw new Error("Summary title is required") }
        if (data.summaryTitle.length < 5 || data.summaryTitle.length > 150) throw new Error("Summary title is not valid")
    }

    if (data.summaryBody && typeof data.summaryBody === "string") {
        if (validator.isEmpty(data.summaryBody)) { throw new Error("Summary body is required") }
        if (data.summaryBody.length < 5 || data.summaryBody.length > 1500) { throw new Error("Summary body is not valid") }
        if (validator.contains(data.summaryBody, '<script')) { throw new Error("Invalid characters detected") };
    }

    if (data.github) {
        if (!validator.isURL(data.github)) { throw new Error("Invalid GitHub URL") };
    }
    if (data.linkedin) {
        if (!validator.isURL(data.linkedin)) { throw new Error("Invalid LinkedIn URL") };
    }
    if (data.portfolio) {
        if (!validator.isURL(data.portfolio)) { throw new Error("Invalid Portfolio URL") };
    }

}

module.exports = { validateResumeData }