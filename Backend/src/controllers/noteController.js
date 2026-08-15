const Note = require("../models/note");
const Issue = require("../models/issue");
const Project = require("../models/project");
const OpenAI = require("openai");

// Initialize OpenAI client pointing to Groq API
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// @desc    Get all notes for the logged-in user
// @route   GET /api/notes
const listNotes = async (req, res) => {
  try {
    const {
      pinned,
      favorite,
      isDeleted = "false",
      projectId,
      goalId,
      folderId,
      tag,
      noteType,
      search
    } = req.query;

    const query = { owner: req.user._id };

    // Soft delete status filter
    query.isDeleted = isDeleted === "true";

    if (pinned !== undefined) query.pinned = pinned === "true";
    if (favorite !== undefined) query.favorite = favorite === "true";
    if (projectId) query.projectId = projectId;
    if (goalId) query.goalId = goalId;
    if (folderId !== undefined) {
      query.folderId = folderId === "null" || folderId === "" ? null : folderId;
    }
    if (noteType) query.noteType = noteType;
    if (tag) query.tags = tag.toLowerCase().trim();

    // Simple search fallback (Frontend will also fuzzy search)
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { "blocks.content": searchRegex }
      ];
    }

    const notes = await Note.find(query).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in listNotes:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get single note by ID
// @route   GET /api/notes/:id
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
const createNote = async (req, res) => {
  try {
    const {
      title = "",
      content = "",
      blocks = [],
      tags = [],
      projectId = null,
      goalId = null,
      folderId = null,
      linkedIssueId = null,
      noteType = "note",
      pinned = false,
      favorite = false
    } = req.body;

    const newNote = new Note({
      owner: req.user._id,
      title,
      content,
      blocks,
      tags: Array.isArray(tags) ? tags.map(t => String(t).trim().toLowerCase()) : [],
      projectId,
      goalId,
      folderId,
      linkedIssueId,
      noteType,
      pinned,
      favorite,
      wordCount: content ? content.split(/\s+/).filter(Boolean).length : 0
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote:", error);
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

// @desc    Update an existing note
// @route   PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      blocks,
      tags,
      pinned,
      favorite,
      projectId,
      goalId,
      folderId,
      linkedIssueId,
      noteType,
      wordCount
    } = req.body;

    const note = await Note.findOne({ _id: id, owner: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) {
      note.content = content;
      note.wordCount = content.split(/\s+/).filter(Boolean).length;
    }
    if (blocks !== undefined) note.blocks = blocks;
    if (tags !== undefined) {
      note.tags = Array.isArray(tags) ? tags.map(t => String(t).trim().toLowerCase()) : [];
    }
    if (pinned !== undefined) note.pinned = pinned;
    if (favorite !== undefined) note.favorite = favorite;
    if (projectId !== undefined) note.projectId = projectId;
    if (goalId !== undefined) note.goalId = goalId;
    if (folderId !== undefined) note.folderId = folderId;
    if (linkedIssueId !== undefined) note.linkedIssueId = linkedIssueId;
    if (noteType !== undefined) note.noteType = noteType;
    if (wordCount !== undefined) note.wordCount = wordCount;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// @desc    Soft delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isDeleted = true;
    note.deletedAt = new Date();
    await note.save();

    res.status(200).json({ message: "Note moved to Recently Deleted", note });
  } catch (error) {
    console.error("Error in deleteNote:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Restore a soft-deleted note
// @route   PATCH /api/notes/:id/restore
const restoreNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isDeleted = false;
    note.deletedAt = null;
    await note.save();

    res.status(200).json({ message: "Note restored successfully", note });
  } catch (error) {
    console.error("Error in restoreNote:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Permanently delete a note
// @route   DELETE /api/notes/:id/permanent
const permanentDeleteNote = async (req, res) => {
  try {
    const result = await Note.deleteOne({ _id: req.params.id, owner: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note permanently deleted" });
  } catch (error) {
    console.error("Error in permanentDeleteNote:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Convert selected text/content of a note to a CodeSarthi Issue
// @route   POST /api/notes/:id/convert-to-issue
const convertToIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, projectId } = req.body;

    const note = await Note.findOne({ _id: id, owner: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const resolvedProjectId = projectId || note.projectId;
    if (!resolvedProjectId) {
      return res.status(400).json({ message: "Note must belong to a project, or a project must be selected to create an issue." });
    }

    const project = await Project.findById(resolvedProjectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newIssue = new Issue({
      teamId: project.teamId,
      projectId: resolvedProjectId,
      type: "issue",
      title: title || `Issue from Note: ${note.title || "Untitled"}`,
      description: `${description || ""}\n\n---\n*Origin: Developer Note → [${note.title || "Untitled"}](http://localhost:5173/app/notes)*`,
      createdBy: req.user._id,
      status: "open",
      priority: "medium"
    });

    const savedIssue = await newIssue.save();

    note.linkedIssueId = savedIssue._id;
    await note.save();

    res.status(201).json({
      message: "Converted to Issue successfully",
      issue: savedIssue,
      note
    });
  } catch (error) {
    console.error("Error in convertToIssue:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Ask Shastra (AI Assistant for Note content)
// @route   POST /api/notes/:id/shastra
const shastraAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, customPrompt } = req.body; // action: summarize | explain-code | restructure | extract-todos | generate-tags | custom

    const note = await Note.findOne({ _id: id, owner: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Prepare note context content
    const titleContext = `Note Title: ${note.title || "Untitled"}\nType: ${note.noteType}\n\n`;
    let noteContentContext = note.content || "";
    if (note.blocks && note.blocks.length > 0) {
      noteContentContext = note.blocks
        .map(b => `[Block: ${b.type}]\n${b.content}`)
        .join("\n\n");
    }

    const fullNoteText = titleContext + noteContentContext;

    let systemInstruction = "You are Shastra, the developer intelligence assistant built into CodeSarthi notes. Your response must be clean, concise, formatted in markdown, and extremely technical. Keep explanations developer-oriented.";
    let userPrompt = "";

    switch (action) {
      case "summarize":
        userPrompt = `Please summarize the following developer note in 3-4 bullet points highlighting key points and main actions:\n\n${fullNoteText}`;
        break;
      case "explain-code":
        userPrompt = `Extract any code snippets found in the following note and provide a brief, high-level code explanation, listing potential edge cases or bugs:\n\n${fullNoteText}`;
        break;
      case "extract-todos":
        userPrompt = `Extract action items, TODOs, and tasks from this developer diary. Return them formatted as an interactive markdown checklist (e.g. - [ ] Task name):\n\n${fullNoteText}`;
        break;
      case "generate-tags":
        systemInstruction = "You are a JSON generator. Return only a valid JSON array of strings containing suggested tags, e.g. ['mongodb', 'react', 'websockets']. Return nothing else.";
        userPrompt = `Suggest 3 to 6 developer-specific tags based on this note:\n\n${fullNoteText}`;
        break;
      case "restructure":
        userPrompt = `Take the messy developer note below and restructure it logically. Keep code blocks intact. Restructure it into this clean template format if appropriate:
        
- Problem
- Root Cause
- Solution
- Prevention / Next Steps

Here is the note:
\n\n${fullNoteText}`;
        break;
      case "generate-questions":
        userPrompt = `Please analyze this learning note and generate 5 potential interview questions based on its concepts, along with brief sample answers:\n\n${fullNoteText}`;
        break;
      case "generate-flashcards":
        userPrompt = `Please convert the key concepts of the following developer note into 5 concise study flashcards formatted as Q&A pairs:\n\n${fullNoteText}`;
        break;
      case "custom":
        userPrompt = `Regarding the following developer note:\n\n${fullNoteText}\n\nUser request: ${customPrompt}`;
        break;
      default:
        return res.status(400).json({ message: "Invalid action type" });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2
    });

    const aiOutput = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      action,
      result: aiOutput
    });
  } catch (error) {
    console.error("Error in shastraAction:", error);
    res.status(500).json({ message: "AI Request failed", error: error.message });
  }
};

module.exports = {
  listNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  restoreNote,
  permanentDeleteNote,
  shastraAction,
  convertToIssue
};
