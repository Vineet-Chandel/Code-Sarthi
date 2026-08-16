const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});
const getDataUrl = require("../utils/buffer");
const cloudinary = require("cloudinary").v2;

const {
  listNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  restoreNote,
  permanentDeleteNote,
  shastraAction,
  convertToIssue
} = require("../controllers/noteController");

// Secure all routes with authentication middleware
router.use(userAuth);

router.get("/notes", listNotes);
router.get("/notes/:id", getNoteById);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.patch("/notes/:id/restore", restoreNote);
router.delete("/notes/:id/permanent", permanentDeleteNote);
router.post("/notes/:id/shastra", shastraAction);
router.post("/notes/:id/convert-to-issue", convertToIssue);

router.post("/notes/upload-image", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];
    if (!allowed.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image format. Only PNG, JPG, JPEG, WEBP, and GIF are allowed."
      });
    }

    const fileBuffer = getDataUrl(file);
    const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
      folder: "CodeSarthi-Notes",
      resource_type: "image",
      quality: "auto",
      fetch_format: "auto"
    });

    res.status(200).json({
      success: true,
      url: cloud.secure_url,
      public_id: cloud.public_id
    });
  } catch (error) {
    console.error("Error uploading note image:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to upload image." });
  }
});

module.exports = router;
