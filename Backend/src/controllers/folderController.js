const Folder = require("../models/folder");
const Note = require("../models/note");

// @desc    Get all folders for the logged-in user
// @route   GET /api/folders
const listFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ owner: req.user._id }).sort({ name: 1 });
    res.status(200).json(folders);
  } catch (error) {
    console.error("Error in listFolders:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new folder
// @route   POST /api/folders
const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Folder name is required" });
    }

    // Check duplicate
    const exists = await Folder.findOne({ owner: req.user._id, name: name.trim() });
    if (exists) {
      return res.status(400).json({ message: "Folder with this name already exists" });
    }

    const newFolder = new Folder({
      name: name.trim(),
      owner: req.user._id
    });

    const saved = await newFolder.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error in createFolder:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Rename a folder
// @route   PUT /api/folders/:id
const renameFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Folder name is required" });
    }

    const folder = await Folder.findOne({ _id: id, owner: req.user._id });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Check duplicate
    const exists = await Folder.findOne({ owner: req.user._id, name: name.trim(), _id: { $ne: id } });
    if (exists) {
      return res.status(400).json({ message: "Another folder with this name already exists" });
    }

    folder.name = name.trim();
    const updated = await folder.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in renameFolder:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a folder
// @route   DELETE /api/folders/:id
const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Folder.deleteOne({ _id: id, owner: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Unlink note relationships belonging to this folder
    await Note.updateMany({ owner: req.user._id, folderId: id }, { folderId: null });

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error in deleteFolder:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  listFolders,
  createFolder,
  renameFolder,
  deleteFolder
};
