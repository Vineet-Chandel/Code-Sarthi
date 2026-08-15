const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const {
  listFolders,
  createFolder,
  renameFolder,
  deleteFolder
} = require("../controllers/folderController");

// Secure all paths with userAuth
router.use(userAuth);

router.get("/folders", listFolders);
router.post("/folders", createFolder);
router.put("/folders/:id", renameFolder);
router.delete("/folders/:id", deleteFolder);

module.exports = router;
