const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
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

module.exports = router;
