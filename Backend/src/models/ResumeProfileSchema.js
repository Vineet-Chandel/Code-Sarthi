import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: String,
    stack: String,
    github: String,
    live: String,
    description: String,
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



        skills: {
            frontend: String,
            backend: String,
            authentication: String,
            database: String,
            tools: String,
            deployment: String,
        },

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

export default mongoose.model(
    "ResumeProfile",
    ResumeProfileSchema
);