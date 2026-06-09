const mongoose = require("mongoose");



const HeaderSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },

    lname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },

    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: String,
    summaryTitle: {
        type: String,
        minLength: 5,
        maxLength: 150,
        trim: true
    },
    summaryBody: {
        type: String,
        minLength: 5,
        maxLength: 1500,
        trim: true,
    },

    github: String,
    linkedin: String,
    portfolio: String,

    location: String,
    pincode: String,

}, { _id: false });

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    stack: {
        type: String,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    github: String,
    live: String,
    description: {
        type: String,
        minLength: 5,
        maxLength: 4000,
        trim: true
    },
    bullets: [String],
}, { _id: false });

const ExperienceSchema = new mongoose.Schema({
    role: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    currentlyWorking: {
        type: Boolean,
        default: false,
    },
    employmentType: String,
    bullets: [String],
}, { _id: false });

const EducationSchema = new mongoose.Schema({
    degree: String,
    field: String,
    institution: String,
    location: String,
    startDate: String,
    endDate: String,
    cgpa: String,
    percentage: String,
    bullets: [String],
}, { _id: false });



const SkillSchema = new mongoose.Schema({
    skillCategory: {
        type: String,
    },
    skills: {
        type: [String],
    },
}, { _id: false });




const CertificationSchema = new mongoose.Schema({
    about: String,
    link: String,
}, { _id: false });

const LanguageSchema = new mongoose.Schema({
    langCategory: String,
    status: String,
}, { _id: false });

const ResumeProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
            index: true,
        },

        header: HeaderSchema,

        skills: [SkillSchema],

        projects: [ProjectSchema],

        experience: [ExperienceSchema],

        education: [EducationSchema],

        certifications: [CertificationSchema],

        achievements: [String],

        languages: [LanguageSchema],

        isProfileCompleted: {
            type: Boolean,
            default: false,
        },

        lastGeneratedResume: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "ResumeProfile",
    ResumeProfileSchema
);