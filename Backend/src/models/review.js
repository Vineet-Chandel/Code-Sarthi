const mongoose = require("mongoose");
const { Schema } = mongoose;


const reviewSchema = new mongoose.Schema({

    //profile
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        index: true
    },
    expLevel: {
        type: String,

    },
    github: {
        type: String,
        trim: true,
        match: [/^https?:\/\/(www\.)?github\.com\/.+$/, 'Invalid GitHub URL']
    },
    linkedin: {
        type: String,
        trim: true,
        match: [/^https?:\/\/(www\.)?linkedin\.com\/.+$/, 'Invalid LinkedIn URL']
    },
    duration: {
        type: String,
        enum: ['Less than a week', '1–4 weeks', '1–3 months', '3–6 months', '6+ months']
    },
    role: {
        type: String,
        enum: ['student', 'developer', 'founder', 'educator', 'jobseeker', 'teamlead']
    },


    //Ratings 


    msg: { type: Number, min: 1, max: 5, default: null },
    ov: { type: Number, min: 1, max: 5, default: null },
    res: { type: Number, min: 1, max: 5, default: null },
    sch: { type: Number, min: 1, max: 5, default: null },
    tws: { type: Number, min: 1, max: 5, default: null },
    vid: { type: Number, min: 1, max: 5, default: null },
    nps: { type: Number, min: 0, max: 10, default: null },

    // review


    best: {
        type: String,
        default: undefined,
        maxlength: 2048,
        minlength: 40
    },
    better: {
        type: String,
        default: undefined,
        maxlength: 2048,
        minlength: 40
    },
    replace: {
        type: String,
        enum: ['Yes — completely', 'Partially — for some workflows', 'Not yet — needs more features', 'No — I prefer my current setup', ''],
        default: undefined,
    },
    reviewText: {
        type: String,
        default: undefined,
        required: true,
        maxlength: 2048,
        minlength: 40
    },
    usedTags: {
        type: [String],
        default: [],
    },


    // alternate name 
    attrName: {
        type: String,
        default: "",
    },
    discover: {
        type: String,
        enum: ['College / university', 'Friend or colleague', 'Twitter / X', 'LinkedIn', 'GitHub', 'Product Hunt', 'Search engine', 'Other', ''],
        default: undefined
    },
    extra: {
        type: String,
        default: undefined,
    },
    pubAllow: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model("Review", reviewSchema);