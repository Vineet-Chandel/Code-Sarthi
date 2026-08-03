const validator = require("validator");

const validateSignUpData = (data) => {
    const { firstName, lastName, gmail, age, password, username, profession, college, termsAccepted, gender } = data;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    } else if (data.email && typeof data.email === "string") {

        if (!validator.isEmail(gmail)) {
            throw new Error("Email is not valid!");
        }
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password!");
    } else if (!validator.matches(username, /^[a-z0-9._]{3,20}$/)) {
        throw new Error("Please enter a username! which has lowercase letters , underscores and numbers");
    } else if (age === undefined || age === null || age === "") {
        throw new Error("Age is required");
    } else if (age <= 10) {
        throw new Error("Age must be greater than 10");
    } else if (college === undefined || college === null || college === "") {
        throw new Error("college or company name is required");
    } else if (profession === undefined || profession === null || profession === "") {
        throw new Error("profession name is required");
    } else if (termsAccepted == 0 || termsAccepted == false) {
        throw new Error("You must accept the terms and conditions")
    } else if (!["male", "female", "other"].includes(gender)) {
        throw new Error("Please specify your gender properly");
    }
};

const validateEditProfileData = (req) => {

    const allowedEditFields = [
        "firstName",
        "lastName",
        "middleName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
        "profession",
        "college"
    ];

    const isEditAllowed = Object.keys(req.body).every(field =>
        allowedEditFields.includes(field)
    );

    if (!isEditAllowed) {
        throw new Error("Invalid edit fields");
    }

    const { age, gender, skills } = req.body;

    // ✅ validate only if provided
    if (age !== undefined && age <= 10) {
        throw new Error("Age must be greater than 10");
    }

    if (gender && !["male", "female", "other"].includes(gender)) {
        throw new Error("Please specify your gender properly");
    }

    return true;
};

const validateHeaderData = (data) => {

    if (!data.fname || typeof data.fname !== "string") { throw new Error("Name is not valid!") }
    else if (data.fname.length < 3) { throw new Error("First name is too short!") };
    if (/<[^>]*>/.test(data.fname)) { throw new Error("Unnecessary stuff detected in first name!") }

    if (!data.lname || typeof data.lname !== "string") { throw new Error("Name is not valid!") }
    else if (data.lname.length < 3) { throw new Error("Last name is too short!") };
    if (/<[^>]*>/.test(data.lname)) { throw new Error("Unnecessary stuff detected in last name!") }
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
        if (/<[^>]*>/.test(data.summaryTitle)) { throw new Error("Unnecessary stuff detected in summary title!") }
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

    if (data.location) {
        if (typeof data.location !== "string") throw new Error("Location must be a string");
        if (data.location.length < 3) throw new Error("Location is too short");
        if (/<[^>]*>/.test(data.location)) throw new Error("Unnecessary stuff detected in Location!");
    }

    if (data.pincode) {
        if (typeof data.pincode !== "string") throw new Error("Pincode must be a string");
        if (data.pincode.length < 6) throw new Error("Pincode is too short");
        if (/<[^>]*>/.test(data.pincode)) throw new Error("Unnecessary stuff detected in Pincode!");
    }

}



const validateSkillsData = (data) => {
    if (!data.skills || !Array.isArray(data.skills)) {
        throw new Error("Skills array is required");
    }

    for (const skill of data.skills) {
        if (!skill.skillCategory || typeof skill.skillCategory !== "string") {
            throw new Error("Skill category is required");
        }

        if (/<[^>]*>/.test(skill.skillCategory)) {
            throw new Error("Unnecessary stuff detected in Skill category!");
        }

        if (!Array.isArray(skill.skills)) {
            throw new Error("Skills must be an array");
        }

        if (skill.skills.length === 0) {
            throw new Error("At least one skill is required");
        }

        for (const item of skill.skills) {
            if (typeof item !== "string") {
                throw new Error("Skill must be a string");
            }

            if (item.trim().length === 0) {
                throw new Error("Skill cannot be empty");
            }

            if (/<[^>]*>/.test(item)) {
                throw new Error("Unnecessary stuff detected in Skills!");
            }
        }
    }
};
// projects validation
const validateProjectsData = (data) => {

    if (data.projects && Array.isArray(data.projects)) {
        for (const proj of data.projects) {
            if (!proj.name || typeof proj.name !== "string") { throw new Error("Project name is required") }
            if (proj.name.length < 3) { throw new Error("Project name too short") }
            if (typeof proj.description !== "string") {
                throw new Error("Description is not valid")
            }
            if (/<[^>]*>/.test(proj.name)) { throw new Error("Project name is not valid") }


            if (!proj.stack || typeof proj.stack !== "string") {
                throw new Error("Project stack is required")
            }
            if (proj.stack.length < 3) {
                throw new Error("Project stack too short")
            }
            if (/<[^>]*>/.test(proj.stack)) { throw new Error("Project stack is not valid") }

            if (proj.github && !validator.isURL(proj.github)) {
                throw new Error("Invalid GitHub URL")
            }

            if (proj.live && !validator.isURL(proj.live))
                throw new Error("Invalid live URL")

            if (proj.description && proj.description.length > 4000) {
                throw new Error("Description too long")
            } else if (/<[^>]*>/.test(proj.description)) { throw new Error("Unnecessary stuff detected in Project description!") }

            if (proj.bullets && Array.isArray(proj.bullets)) {
                for (const bullet of proj.bullets) {
                    if (/<[^>]*>/.test(bullet)) { throw new Error("Unnecessary stuff detected in Project bullet!") }
                    if (!bullet || typeof bullet !== "string") { throw new Error("Project bullet is required") }
                    if (bullet.length < 5) { throw new Error("Project bullet is too short") }
                    if (bullet.length > 500) { throw new Error("Project bullet is too long") }
                }
            }
        }
    }
}
// experience validation
const validateExperienceData = (data) => {

    if (data.experience && Array.isArray(data.experience)) {
        for (const exp of data.experience) {
            if (!exp.role || typeof exp.role !== "string") {
                throw new Error("Role is required")
            }
            if (exp.role.length < 3) {
                throw new Error("Role is too short")
            }
            if (/<[^>]*>/.test(exp.role)) { throw new Error("Unnecessary stuff detected in Role!") }

            if (!exp.company || typeof exp.company !== "string") {
                throw new Error("Company is required")
            }
            if (exp.company.length < 3) {
                throw new Error("Company is too short")
            }
            if (/<[^>]*>/.test(exp.company)) { throw new Error("Unnecessary stuff detected in Company!") }

            if (!exp.location || typeof exp.location !== "string") {
                throw new Error("Location is required")
            }
            if (exp.location.length < 3) {
                throw new Error("Location is too short")
            }
            if (/<[^>]*>/.test(exp.location)) { throw new Error("Unnecessary stuff detected in Location!") }

            if (!exp.startDate || typeof exp.startDate !== "string") {
                throw new Error("Start date is required")
            }

            if (!exp.endDate || typeof exp.endDate !== "string") {
                throw new Error("End date is required")
            }

            if (!exp.employmentType || typeof exp.employmentType !== "string") {
                throw new Error("Employment type is required")
            }

            if (exp.bullets && Array.isArray(exp.bullets)) {
                for (const bullet of exp.bullets) {
                    if (/<[^>]*>/.test(bullet)) { throw new Error("Unnecessary stuff detected in Project bullet!") }
                    if (!bullet || typeof bullet !== "string") { throw new Error("Project bullet is required") }
                    if (bullet.length < 5) { throw new Error("Project bullet is too short") }
                    if (bullet.length > 500) { throw new Error("Project bullet is too long") }
                }
            }
        }
    }
}
// education validation
const validateEducationData = (data) => {

    if (data.education && Array.isArray(data.education)) {
        for (const edu of data.education) {
            if (!edu.degree || typeof edu.degree !== "string") {
                throw new Error("Degree is required")
            }
            if (edu.degree.length < 3) {
                throw new Error("Degree is too short")
            }
            if (/<[^>]*>/.test(edu.degree)) { throw new Error("Unnecessary stuff detected in Degree!") }

            if (!edu.field || typeof edu.field !== "string") {
                throw new Error("Field is required")
            }
            if (edu.field.length < 3) {
                throw new Error("Field is too short")
            }
            if (/<[^>]*>/.test(edu.field)) { throw new Error("Unnecessary stuff detected in Field!") }

            if (!edu.institution || typeof edu.institution !== "string") {
                throw new Error("Institution is required")
            }
            if (edu.institution.length < 3) {
                throw new Error("Institution is too short")
            }
            if (/<[^>]*>/.test(edu.institution)) { throw new Error("Unnecessary stuff detected in Institution!") }

            if (!edu.location || typeof edu.location !== "string") {
                throw new Error("Location is required")
            }
            if (edu.location.length < 3) {
                throw new Error("Location is too short")
            }
            if (/<[^>]*>/.test(edu.location)) { throw new Error("Unnecessary stuff detected in Location!") }

            if (!edu.startDate || typeof edu.startDate !== "string") {
                throw new Error("Start date is required")
            }

            if (!edu.endDate || typeof edu.endDate !== "string") {
                throw new Error("End date is required")
            }

            if (edu.bullets && Array.isArray(edu.bullets)) {
                for (const bullet of edu.bullets) {
                    if (/<[^>]*>/.test(bullet)) { throw new Error("Unnecessary stuff detected in Project bullet!") }
                    if (!bullet || typeof bullet !== "string") { throw new Error("Project bullet is required") }
                    if (bullet.length < 5) { throw new Error("Project bullet is too short") }
                    if (bullet.length > 500) { throw new Error("Project bullet is too long") }
                }
            }
        }
    }
}

// certifications validation
const validateCertificatesData = (data) => {
    if (data.certificates && Array.isArray(data.certificates)) {
        for (const cert of data.certificates) {
            if (!cert.about || typeof cert.about !== "string") {
                throw new Error("Certification about is required")
            }
            if (cert.about.length < 5) {
                throw new Error("Certification about is too short")
            }
            if (/<[^>]*>/.test(cert.about)) { throw new Error("Unnecessary stuff detected in Certification about!") }

            if (!cert.link || typeof cert.link !== "string") {
                throw new Error("Certification link is required")
            }
            if (!validator.isURL(cert.link)) {
                throw new Error("Invalid Certification link")
            }
        }
    }
}

// achievements validation
const validateAchievementsData = (data) => {

    if (data.achievements && Array.isArray(data.achievements)) {

        for (const ach of data.achievements) {

            if (typeof ach !== "string") {
                throw new Error("Achievement is required");
            }

            if (ach.trim().length < 5) {
                throw new Error("Achievement is too short");
            }

            if (/<[^>]*>/.test(ach)) {
                throw new Error("Unnecessary stuff detected in Achievement!");
            }
        }
    }
};
// languages validation
const validateLanguagesData = (data) => {


    if (data.languages && Array.isArray(data.languages)) {
        for (const lang of data.languages) {
            if (!lang.langCategory || typeof lang.langCategory !== "string") {
                throw new Error("Language category is required")
            }
            if (lang.langCategory.length < 3) {
                throw new Error("Language category is too short")
            }
            if (/<[^>]*>/.test(lang.langCategory)) { throw new Error("Unnecessary stuff detected in Language category!") }

            if (!lang.status || typeof lang.status !== "string") {
                throw new Error("Language status is required")
            }
            if (/<[^>]*>/.test(lang.status)) { throw new Error("Unnecessary stuff detected in Language status!") }
        }
    }
}
const validateSummaryBodyData = (data) => {

    if (data.summaryBody && typeof data.summaryBody === "string") {
        if (validator.isEmpty(data.summaryBody)) { throw new Error("Summary body is required") }
        if (data.summaryBody.length < 5 || data.summaryBody.length > 1500) { throw new Error("Summary body is not valid") }
        if (/<[^>]*>/.test(data.summaryBody)) { throw new Error("Unnecessary stuff detected in summary body!") }
    }
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
    validateHeaderData,
    validateSkillsData,
    validateProjectsData,
    validateExperienceData,
    validateEducationData,
    validateCertificatesData,
    validateAchievementsData,
    validateLanguagesData,
    validateSummaryBodyData
};