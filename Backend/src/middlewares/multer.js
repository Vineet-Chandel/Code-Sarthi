import multer from "multer";



//make the name unique
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);

        cb(null, uniqueName + ext);
    }
});



//filter
export const upload = multer({
    storage,

    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
});