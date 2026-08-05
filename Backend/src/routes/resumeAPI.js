const express = require("express");
const { userAuth } = require("../middlewares/userAuth.js");
const ResumeProfileSchema = require("../models/ResumeProfileSchema.js");
const {
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
} = require("../utils/validation");

const resRouter = express.Router();

// ─── Shared Utilities ────────────────────────────────────────────────────────

const handleRouteError = (err, res) => {
    if (err.name === "ValidationError" || err.isCustomValidation) {
        return res.status(400).json({ success: false, message: err.message });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
};

// ─── Header ──────────────────────────────────────────────────────────────────

resRouter.post("/build-resume/header-info-save", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }
        console.log("BODY:", req.body);
        console.log("USER:", req.user);
        validateHeaderData(req.body);

        const user = req.user;
        const {
            fname, lname, email, phone,
            summaryTitle,
            github, linkedin, portfolio,
            location, pincode,
        } = req.body;

        const headerData = {
            fname, lname, email, phone,
            summaryTitle,
            github, linkedin, portfolio,
            location, pincode,
        };

        let resume = await ResumeProfileSchema.findOne({ userId: user._id });

        if (!resume) {
            resume = new ResumeProfileSchema({ userId: user._id, header: headerData });
            await resume.save();
            return res.status(201).json({
                success: true,
                message: "Resume profile created",
                data: resume,
            });
        }

        resume.header = headerData;
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "Header updated successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
});

// ─── Skills ──────────────────────────────────────────────────────────────────

resRouter.post("/build-resume/skills-info-save", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }

        validateSkillsData(req.body);

        const user = req.user;
        const resume = await ResumeProfileSchema.findOne({ userId: user._id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found. Please complete header info first.",
            });
        }

        resume.skills = req.body.skills;
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "Skills updated successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
});

// ─── Projects ─────────────────────────────────────────────────────────────────

resRouter.post("/build-resume/project-info-save", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }

        validateProjectsData(req.body);

        const user = req.user;
        const resume = await ResumeProfileSchema.findOne({ userId: user._id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found. Please complete header info first.",
            });
        }

        resume.projects = req.body.projects;
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "Projects updated successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
});

// ─── Experience ───────────────────────────────────────────────────────────────

resRouter.post("/build-resume/experience-info-save", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }

        validateExperienceData(req.body);

        const user = req.user;
        const resume = await ResumeProfileSchema.findOne({ userId: user._id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found. Please complete header info first.",
            });
        }

        resume.experience = req.body.experience;
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
});

// ─── Education ────────────────────────────────────────────────────────────────

resRouter.post("/build-resume/education-info-save", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }

        validateEducationData(req.body);

        const user = req.user;
        const resume = await ResumeProfileSchema.findOne({ userId: user._id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found. Please complete header info first.",
            });
        }

        resume.education = req.body.education;
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "Education updated successfully",
            data: resume,
        });
    } catch (err) {
        return handleRouteError(err, res);
    }
});

// ─── Certifications ───────────────────────────────────────────────────────────

resRouter.post("/build-resume/certifications-info-save", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }

        validateCertificatesData(req.body);

        const user = req.user;
        const resume = await ResumeProfileSchema.findOne({ userId: user._id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found. Please complete header info first.",
            });
        }

        resume.certifications = req.body.certificates;
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "Certifications updated successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
});

// ─── Achievements ─────────────────────────────────────────────────────────────

resRouter.post("/build-resume/achievements-info-save", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }

        validateAchievementsData(req.body);

        const user = req.user;
        const resume = await ResumeProfileSchema.findOne({ userId: user._id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found. Please complete header info first.",
            });
        }

        resume.achievements = req.body.achievements;
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "Achievements updated successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
});

// ─── Languages ────────────────────────────────────────────────────────────────

resRouter.post("/build-resume/languages-info-save", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }

        validateLanguagesData(req.body);

        const user = req.user;
        const resume = await ResumeProfileSchema.findOne({ userId: user._id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found. Please complete header info first.",
            });
        }

        resume.languages = req.body.languages;
        await resume.save();
        return res.status(200).json({
            success: true,
            message: "Languages updated successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
});

// ─── Get Full Resume ──────────────────────────────────────────────────────────

resRouter.get("/build-resume/get-resume", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }

        const resume = await ResumeProfileSchema.findOne({ userId: req.user._id });

        if (!resume) {
            return res.status(200).json({
                success: false,
                message: "No resume found for this user.",
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resume fetched successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
});


resRouter.post("/build-resume/summary-body", userAuth, async (req, res) => {

    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Please Re-Login" });
        }
        validateSummaryBodyData(req.body);
        const resume = await ResumeProfileSchema.findOne({ userId: req.user._id });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found. Please complete header info first.",
            });
        }
        resume.summaryBody = req.body.summaryBody;
        await resume.save();

        return res.status(200).json({
            success: true,
            message: "Summary Body updated successfully",
            data: resume,
        });

    } catch (err) {
        return handleRouteError(err, res);
    }
})


module.exports = resRouter;