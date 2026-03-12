const multer = require("multer");

// memory storage (buffer-based upload)
const storage = multer.memoryStorage();

// MIME filter
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo", "video/x-matroska"];

    if (!file.mimetype.startsWith("image") && !file.mimetype.startsWith("video")) {
        cb(null, true);
    } else {
        const error = new Error(
            `Invalid file type: ${file.mimetype}. Allowed types: ` +
            `Images: JPEG, PNG, WEBP; Videos: MP4, WEBM, OGG, MOV, AVI, MKV`
        );
        error.code = 'INVALID_FILE_TYPE';
        cb(error, false);
    }
};

const uploadImgVideoFile = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 500MB
        files: 5,
    },
});

module.exports = uploadImgVideoFile;
