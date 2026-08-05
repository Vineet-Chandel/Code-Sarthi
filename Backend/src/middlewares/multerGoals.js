const multer = require("multer");

// memory storage (buffer-based upload)
const storage = multer.memoryStorage();

// MIME filter
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid image file type. Only JPEG, PNG, WEBP, and GIF are allowed."), false);
    }
};

const uploadGoalPhotos = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit per photo
        files: 5,
    },
});

module.exports = uploadGoalPhotos;
