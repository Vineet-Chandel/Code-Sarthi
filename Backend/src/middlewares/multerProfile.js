const multer = require("multer");

// memory storage (buffer-based upload)
const storage = multer.memoryStorage();

// MIME filter
const fileFilter = (req, file, cb) => {


    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.log("Rejected MIME type:", file.mimetype);
        cb(new Error(`Invalid file type: ${file.mimetype}`), false);
    }
};

const uploadFile = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 3 * 1024 * 1024, // 3MB
        files: 1,
    },
});

module.exports = uploadFile;
