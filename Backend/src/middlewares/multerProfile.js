const multer = require("multer");

// memory storage (buffer-based upload)
const storage = multer.memoryStorage();

// MIME filter
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const uploadFile = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
        files: 1,
    },
});

module.exports = uploadFile;
