import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Fuse from "fuse.js";
import Editor from "@monaco-editor/react";
import {
  Plus,
  Search,
  Trash2,
  Pin,
  Star,
  Tag,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Terminal,
  Sparkles,
  Command,
  MoreHorizontal,
  Copy,
  Check,
  CheckSquare,
  Square,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  Eye,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  RefreshCw,
  Folder,
  Lock,
  Cloud,
  CloudOff,
  Archive,
  Undo2,
  Redo2,
  Info,
  Maximize2,
  X,
  FileText,
  AlertTriangle,
  PlusCircle,
  MessageSquare
} from "lucide-react";
import BASE_URL from "./auth/baseURL";
import Modal from "../components/Modal/Modal";
import ConfirmModal from "../components/Modal/ConfirmModal";
import InputModal from "../components/Modal/InputModal";
import FeedbackToast from "../components/Modal/FeedbackToast";
import LoadingButton from "../components/Modal/LoadingButton";

// --- CUSTOM AUTORESIZE TEXTAREA ---
const AutoResizeTextarea = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className,
  textareaRef,
  ...props
}) => {
  const localRef = useRef(null);
  const ref = textareaRef || localRef;

  const adjustHeight = useCallback(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => {
        onChange(e);
        adjustHeight();
      }}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={`resize-none overflow-hidden bg-transparent focus:outline-none w-full ${className}`}
      rows={1}
      {...props}
    />
  );
};

// --- DEFAULT TEMPLATES SCHEMAS ---
const NOTE_TEMPLATES = {
  blank: {
    name: "Blank Note",
    description: "Start writing with a clean note.",
    blocks: [
      { id: "b-1", type: "heading-1", content: "Untitled Note" },
      { id: "b-2", type: "paragraph", content: "Start typing here, or press '/' to insert blocks..." }
    ]
  },
  diary: {
    name: "Developer Diary",
    description: "Document daily updates, lessons, and blockers.",
    blocks: [
      { id: "d-1", type: "heading-1", content: `Dev Diary - ${new Date().toLocaleDateString()}` },
      { id: "d-2", type: "heading-2", content: "What I Worked On" },
      { id: "d-3", type: "paragraph", content: "- Worked on WebSocket event listener cleanup." },
      { id: "d-4", type: "heading-2", content: "What I Learned" },
      { id: "d-5", type: "paragraph", content: "- Always clean up event listeners on component unmount to prevent duplicated event emissions." },
      { id: "d-6", type: "heading-2", content: "What Broke & How I Fixed It" },
      { id: "d-7", type: "paragraph", content: "Messages were duplicated because the listener was registered on every re-render. Fixed by placing registration in a useEffect with proper clean-up callback." },
      { id: "d-8", type: "heading-2", content: "Next Steps" },
      { id: "d-9", type: "paragraph", content: "- [ ] Optimize message acknowledgment queue.\n- [ ] Implement local database caching." }
    ]
  },
  "bug-fix": {
    name: "Bug Fix Log",
    description: "Record a technical issue, its root cause, and the fix.",
    blocks: [
      { id: "bf-1", type: "heading-1", content: "Bug Fix: Connection Timeout" },
      { id: "bf-2", type: "heading-2", content: "Problem" },
      { id: "bf-3", type: "paragraph", content: "The service throws a timeout exception when connecting to Mongoose during heavy concurrent requests." },
      { id: "bf-4", type: "heading-2", content: "Root Cause" },
      { id: "bf-5", type: "paragraph", content: "The database connection pool size was set to the default of 5, causing requests to stack up waiting for free connection handles." },
      { id: "bf-6", type: "heading-2", content: "Solution" },
      { id: "bf-7", type: "paragraph", content: "Increased connection pool size to 50 in database configuration options." },
      { id: "bf-8", type: "code", content: "mongoose.connect(process.env.MONGO_URI, {\n  maxPoolSize: 50,\n  serverSelectionTimeoutMS: 5000\n});", properties: { language: "javascript", lineNumbers: true, wordWrap: true } },
      { id: "bf-9", type: "heading-2", content: "Prevention" },
      { id: "bf-10", type: "paragraph", content: "Monitor mongoose connection pool utilization in Grafana and setup alerts for pool exhaustion." }
    ]
  },
  learning: {
    name: "Learning Concept",
    description: "Write down explanations and examples for new tech concepts.",
    blocks: [
      { id: "l-1", type: "heading-1", content: "Learning: React Server Components" },
      { id: "l-2", type: "heading-2", content: "Concept Summary" },
      { id: "l-3", type: "paragraph", content: "RSCs render on the server, meaning zero bundle impact, direct access to database services, and faster initial page loads." },
      { id: "l-4", type: "heading-2", content: "Code Example" },
      { id: "l-5", type: "code", content: "// Server Component\nimport { db } from '@/lib/db';\n\nexport default async function ProjectList() {\n  const projects = await db.project.findMany();\n  return (\n    <ul>\n      {projects.map(p => <li key={p.id}>{p.name}</li>)}\n    </ul>\n  );\n}", properties: { language: "javascript", lineNumbers: true } },
      { id: "l-6", type: "heading-2", content: "Key Learnings" },
      { id: "l-7", type: "paragraph", content: "- Server components cannot use hooks like useState/useEffect.\n- Keep client components at the leaves of the render tree." }
    ]
  },
  dsa: {
    name: "DSA Problem",
    description: "Document interview coding problems and algorithms.",
    blocks: [
      { id: "dsa-1", type: "heading-1", content: "DSA: Two Sum Problem" },
      { id: "dsa-2", type: "heading-2", content: "Problem Statement" },
      { id: "dsa-3", type: "paragraph", content: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target." },
      { id: "dsa-4", type: "heading-2", content: "Optimal Approach" },
      { id: "dsa-5", type: "paragraph", content: "Use a Hash Map to store numbers and their indices. For each number, calculate its complement (target - num). If the complement is already in the map, return the indices." },
      { id: "dsa-6", type: "heading-2", content: "Complexity" },
      { id: "dsa-7", type: "paragraph", content: "- Time Complexity: O(n)\n- Space Complexity: O(n)" },
      { id: "dsa-8", type: "code", content: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}", properties: { language: "javascript", lineNumbers: true } }
    ]
  },
  "architecture-decision": {
    name: "Architecture Decision (ADR)",
    description: "Record structural decisions, alternatives, and trade-offs.",
    blocks: [
      { id: "adr-1", type: "heading-1", content: "ADR: WebSocket for Real-time Messaging" },
      { id: "adr-2", type: "heading-2", content: "Context" },
      { id: "adr-3", type: "paragraph", content: "We need a bi-directional messaging pipeline between clients and backend servers for instant chat sync and status indicators." },
      { id: "adr-4", type: "heading-2", content: "Decision" },
      { id: "adr-5", type: "paragraph", content: "Adopt native WebSockets via Socket.io with a Node.js gateway." },
      { id: "adr-6", type: "heading-2", content: "Alternatives Considered" },
      { id: "adr-7", type: "paragraph", content: "- HTTP Long Polling: Too much overhead/latency.\n- Server-Sent Events (SSE): Unidirectional only; cannot write client acknowledgments easily." },
      { id: "adr-8", type: "heading-2", content: "Consequences" },
      { id: "adr-9", type: "paragraph", content: "- Requires maintaining stateful TCP connections on servers.\n- Must configure load-balancers to support Sticky Sessions." }
    ]
  },
  command: {
    name: "Command Reference",
    description: "Write down command usage, parameters, and examples.",
    blocks: [
      { id: "cmd-1", type: "heading-1", content: "Command: docker run" },
      { id: "cmd-2", type: "heading-2", content: "Syntax" },
      { id: "cmd-3", type: "code", content: "docker run -d -p 8080:80 --name webserver nginx", properties: { language: "bash", lineNumbers: true } },
      { id: "cmd-4", type: "heading-2", content: "Purpose" },
      { id: "cmd-5", type: "paragraph", content: "Starts a new container from an image with ports mapped and running in detached mode." },
      { id: "cmd-6", type: "heading-2", content: "When to Use" },
      { id: "cmd-7", type: "paragraph", content: "When deploying or testing a containerized web application locally." }
    ]
  },
  "api-reference": {
    name: "API Reference",
    description: "Document endpoints, requests, responses, and authorization details.",
    blocks: [
      { id: "api-1", type: "heading-1", content: "API: GET /api/v1/users" },
      { id: "api-2", type: "heading-2", content: "Details" },
      { id: "api-3", type: "paragraph", content: "Endpoint: /api/v1/users\nMethod: GET\nAuthentication: JWT Bearer Token Required" },
      { id: "api-4", type: "heading-2", content: "Request Parameters" },
      { id: "api-5", type: "paragraph", content: "- limit (query): Max number of items to return (default: 10)\n- offset (query): Skip offset for pagination" },
      { id: "api-6", type: "heading-2", content: "Response Body" },
      { id: "api-7", type: "code", content: "{\n  \"success\": true,\n  \"data\": [],\n  \"pagination\": {\n    \"limit\": 10,\n    \"offset\": 0\n  }\n}", properties: { language: "json", lineNumbers: true } }
    ]
  },
  interview: {
    name: "Interview Concept",
    description: "Write explanations, mock questions, and answers for prep.",
    blocks: [
      { id: "int-1", type: "heading-1", content: "Interview Concept: CAP Theorem" },
      { id: "int-2", type: "heading-2", content: "Simple Explanation (ELI5)" },
      { id: "int-3", type: "paragraph", content: "In a distributed system, you can only guarantee two out of three: Consistency, Availability, or Partition Tolerance. Since partitions (network cuts) are inevitable, you must choose between Consistency and Availability." },
      { id: "int-4", type: "heading-2", content: "Technical Explanation" },
      { id: "int-5", type: "paragraph", content: "A distributed data store can either be CP (Consistent & Partition Tolerant, e.g. MongoDB) or AP (Available & Partition Tolerant, e.g. Cassandra) in case of a network split." },
      { id: "int-6", type: "heading-2", content: "Common Interview Questions" },
      { id: "int-7", type: "paragraph", content: "1. Why can we not achieve CA in a distributed system?\n2. How does MongoDB handle partitions?" },
      { id: "int-8", type: "heading-2", content: "My Answer & Areas to Improve" },
      { id: "int-9", type: "paragraph", content: "Prepare your draft responses and key topics to review." }
    ]
  }
};

const Notes = () => {
  const user = useSelector((store) => store?.user?.user?.DATA);

  // --- STATE ---
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all"); // all | pinned | favorite | deleted | templates
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt"); // title | updatedAt | createdAt
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showShastraPanel, setShowShastraPanel] = useState(false);

  // Associations Lists
  const [goals, setGoals] = useState([]);
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);

  // Editing state copies
  const [editorTitle, setEditorTitle] = useState("");
  const [editorBlocks, setEditorBlocks] = useState([]);
  const [editorTags, setEditorTags] = useState([]);
  const [noteType, setNoteType] = useState("note");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  // UI state indicators
  const [saveStatus, setSaveStatus] = useState("Saved"); // Saved | Saving... | Offline | Error
  const [activeBlockIndex, setActiveBlockIndex] = useState(null);
  const [slashMenuBlockId, setSlashMenuBlockId] = useState(null);
  const [slashMenuFilter, setSlashMenuFilter] = useState("");
  const [activeMenuNoteId, setActiveMenuNoteId] = useState(null);
  const [renamingNoteId, setRenamingNoteId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [deletedNoteToast, setDeletedNoteToast] = useState(null);

  // Folder states
  const [folders, setFolders] = useState([]);
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [renamingFolderId, setRenamingFolderId] = useState(null);
  const [folderRenameValue, setFolderRenameValue] = useState("");

  // Convert to Issue Modal states
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [issueProjectId, setIssueProjectId] = useState("");

  // Post to Discussion Modal states
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [discussionChats, setDiscussionChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [postFormat, setPostFormat] = useState("full");
  const [discussionPreviewText, setDiscussionPreviewText] = useState("");
  const [discussionLoading, setDiscussionLoading] = useState(false);

  // AI Panel state
  const [shastraActionType, setShastraActionType] = useState("summarize");
  const [shastraCustomPrompt, setShastraCustomPrompt] = useState("");
  const [shastraResult, setShastraResult] = useState("");
  const [shastraLoading, setShastraLoading] = useState(false);

  // Undo/Redo stacks
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // --- CUSTOM MODALS & TOAST STATES ---
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Folder creation
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  // Folder renaming
  const [isRenameFolderOpen, setIsRenameFolderOpen] = useState(false);
  const [folderToRename, setFolderToRename] = useState(null);
  // Folder deletion
  const [isDeleteFolderOpen, setIsDeleteFolderOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);

  // Note renaming / deletion
  const [isRenameNoteOpen, setIsRenameNoteOpen] = useState(false);
  const [noteToRename, setNoteToRename] = useState(null);
  const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isPermanentDeleteOpen, setIsPermanentDeleteOpen] = useState(false);
  const [noteToPermanentDelete, setNoteToPermanentDelete] = useState(null);

  // Error modal states
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModalTitle, setErrorModalTitle] = useState("");
  const [errorModalMsg, setErrorModalMsg] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const showError = (title, message) => {
    setErrorModalTitle(title);
    setErrorModalMsg(message);
    setIsErrorModalOpen(true);
  };

  // References
  const blockRefs = useRef({});
  const saveTimeoutRef = useRef(null);
  const toastTimeoutRef = useRef(null);
  const pendingSaveRef = useRef(null);

  // --- GET ALL TAGS ---
  const allTags = useMemo(() => {
    const tagsMap = {};
    notes.forEach((note) => {
      if (!note.isDeleted && note.tags) {
        note.tags.forEach((tag) => {
          tagsMap[tag] = (tagsMap[tag] || 0) + 1;
        });
      }
    });
    return Object.entries(tagsMap).sort((a, b) => b[1] - a[1]);
  }, [notes]);

  // --- FETCH METADATA (GOALS, TEAMS, PROJECTS) ---
  const fetchMetadata = async () => {
    try {
      // Goals
      const goalsRes = await axios.get(`${BASE_URL}/goals`, { withCredentials: true }).catch(() => ({ data: [] }));
      setGoals(goalsRes.data || []);

      // Teams
      const teamsRes = await axios.get(`${BASE_URL}/teams/mine`, { withCredentials: true }).catch(() => ({ data: [] }));
      const userTeams = teamsRes.data || [];
      setTeams(userTeams);

      // Folders
      const foldersRes = await axios.get(`${BASE_URL}/folders`, { withCredentials: true }).catch(() => ({ data: [] }));
      setFolders(foldersRes.data || []);

      // Projects (aggregate from all teams)
      const allProjects = [];
      for (const team of userTeams) {
        const projRes = await axios.get(`${BASE_URL}/teams/${team._id}/projects`, { withCredentials: true }).catch(() => ({ data: { projects: [] } }));
        if (projRes.data?.projects) {
          projRes.data.projects.forEach((proj) => {
            allProjects.push({ ...proj, teamName: team.name });
          });
        }
      }
      setProjects(allProjects);
    } catch (err) {
      console.error("Error fetching notes metadata dependencies:", err);
    }
  };

  // --- FETCH NOTES ---
  const fetchNotes = async (selectFirst = false) => {
    try {
      const res = await axios.get(`${BASE_URL}/notes`, {
        params: { isDeleted: activeFilter === "deleted" ? "true" : "false" },
        withCredentials: true
      });
      const fetchedNotes = res.data || [];
      setNotes(fetchedNotes);

      // Sync active note details if currently selected
      if (activeNote) {
        const refreshed = fetchedNotes.find(n => n._id === activeNote._id);
        if (refreshed) {
          // Verify if updated externally, otherwise keep local states
        }
      } else if (selectFirst && fetchedNotes.length > 0) {
        loadNoteIntoEditor(fetchedNotes[0]);
      }
    } catch (err) {
      console.error("Failed to load notes:", err);
      setSaveStatus("Offline");
    }
  };

  // Run on mount
  useEffect(() => {
    fetchMetadata();
    fetchNotes(true);
  }, []);

  // Refresh notes when active filter changes
  useEffect(() => {
    fetchNotes(false);
  }, [activeFilter]);

  // --- HANDLE LOCAL DRAFT RESTORE ---
  const getLocalDraftKey = (noteId) => `codesarthi_note_draft_${noteId}`;

  const flushPendingSave = async () => {
    if (pendingSaveRef.current) {
      const { noteId, draftData } = pendingSaveRef.current;
      pendingSaveRef.current = null;
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      try {
        const response = await axios.put(
          `${BASE_URL}/notes/${noteId}`,
          draftData,
          { withCredentials: true }
        );
        setNotes(prevNotes => prevNotes.map(n => n._id === noteId ? response.data : n));
        setSaveStatus("Saved");
      } catch (err) {
        console.error("Failed to flush pending save:", err);
        setSaveStatus("Offline");
      }
    }
  };

  const loadNoteIntoEditor = async (note) => {
    await flushPendingSave();
    if (!note) {
      setActiveNote(null);
      return;
    }
    setActiveNote(note);

    // Check if local draft is newer
    const localDraftStr = localStorage.getItem(getLocalDraftKey(note._id));
    let noteToLoad = note;

    if (localDraftStr) {
      try {
        const localDraft = JSON.parse(localDraftStr);
        if (new Date(localDraft.updatedAt) > new Date(note.updatedAt)) {
          noteToLoad = localDraft;
          setSaveStatus("Syncing...");
          // Trigger immediate autosave to sync back to DB
          triggerAutosave(localDraft);
        }
      } catch (e) {
        console.error("Failed to parse local draft:", e);
      }
    }

    setEditorTitle(noteToLoad.title || "");
    setEditorBlocks(noteToLoad.blocks || []);
    setEditorTags(noteToLoad.tags || []);
    setNoteType(noteToLoad.noteType || "note");
    setSelectedProject(noteToLoad.projectId || "");
    setSelectedGoal(noteToLoad.goalId || "");
    setSelectedFolder(noteToLoad.folderId || "");
    setUndoStack([]);
    setRedoStack([]);
  };

  // --- SEARCH & FILTER PIPELINE ---
  const filteredNotes = useMemo(() => {
    let result = [...notes];

    // Filter by general criteria
    if (activeFilter === "pinned") {
      result = result.filter(n => n.pinned && !n.isDeleted);
    } else if (activeFilter === "favorite") {
      result = result.filter(n => n.favorite && !n.isDeleted);
    } else if (activeFilter === "deleted") {
      result = result.filter(n => n.isDeleted);
    } else {
      result = result.filter(n => !n.isDeleted);
    }

    // Filter by active Tag selection
    if (selectedTag) {
      result = result.filter(n => n.tags && n.tags.includes(selectedTag));
    }

    // Filter by Folder
    if (activeFolderId) {
      result = result.filter(n => n.folderId === activeFolderId);
    }

    // Search Query (Fuse.js for fuzzy matches)
    if (searchQuery.trim()) {
      const fuse = new Fuse(result, {
        keys: ["title", "tags", "content", "blocks.content"],
        threshold: 0.35
      });
      result = fuse.search(searchQuery).map(res => res.item);
    }

    // Sort note list
    result.sort((a, b) => {
      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      } else if (sortBy === "createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

    return result;
  }, [notes, activeFilter, selectedTag, activeFolderId, searchQuery, sortBy]);

  // --- UNDO / REDO MANAGEMENTS ---
  const recordHistory = (blocks) => {
    setUndoStack(prev => [...prev.slice(-30), JSON.stringify(editorBlocks)]); // cap at 30 items
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack(prevRedo => [...prevRedo, JSON.stringify(editorBlocks)]);
    setUndoStack(prevUndo => prevUndo.slice(0, -1));
    setEditorBlocks(JSON.parse(prev));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack(prevUndo => [...prevUndo, JSON.stringify(editorBlocks)]);
    setRedoStack(prevRedo => prevRedo.slice(0, -1));
    setEditorBlocks(JSON.parse(next));
  };

  // --- AUTOSAVE ENGINE ---
  const triggerAutosave = (draftData) => {
    if (pendingSaveRef.current && pendingSaveRef.current.noteId !== activeNote._id) {
      flushPendingSave();
    }

    setSaveStatus("Saving...");

    // Store in LocalStorage instantly for crash safety
    const localPayload = {
      ...activeNote,
      ...draftData,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(getLocalDraftKey(activeNote._id), JSON.stringify(localPayload));

    const existingDraft = (pendingSaveRef.current && pendingSaveRef.current.noteId === activeNote._id)
      ? pendingSaveRef.current.draftData
      : {};

    const mergedDraft = { ...existingDraft, ...draftData };

    pendingSaveRef.current = {
      noteId: activeNote._id,
      draftData: mergedDraft
    };

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      await flushPendingSave();
    }, 1000);
  };

  // Save changes wrapper
  const handleNoteUpdate = (field, value) => {
    if (!activeNote) return;

    let updatedFields = {};
    if (field === "title") {
      setEditorTitle(value);
      updatedFields = { title: value };
    } else if (field === "blocks") {
      setEditorBlocks(value);
      // Auto-extract tags from text blocks containing hashtags
      const extractedTags = [];
      value.forEach(b => {
        if (b.content) {
          const hashtags = b.content.match(/#\w+/g);
          if (hashtags) {
            hashtags.forEach(tag => {
              const cleaned = tag.replace("#", "").toLowerCase().trim();
              if (cleaned && !extractedTags.includes(cleaned)) {
                extractedTags.push(cleaned);
              }
            });
          }
        }
      });

      // Merge user tags with auto-extracted tags
      const mergedTags = Array.from(new Set([...editorTags, ...extractedTags]));
      setEditorTags(mergedTags);

      const plainTextContent = value.map(b => b.content).join("\n");
      updatedFields = {
        blocks: value,
        content: plainTextContent,
        tags: mergedTags
      };
    } else if (field === "tags") {
      setEditorTags(value);
      updatedFields = { tags: value };
    } else if (field === "noteType") {
      setNoteType(value);
      updatedFields = { noteType: value };
    } else if (field === "projectId") {
      setSelectedProject(value);
      updatedFields = { projectId: value || null };
    } else if (field === "goalId") {
      setSelectedGoal(value);
      updatedFields = { goalId: value || null };
    } else if (field === "folderId") {
      setSelectedFolder(value);
      updatedFields = { folderId: value || null };
    } else if (field === "linkedIssueId") {
      updatedFields = { linkedIssueId: value || null };
    }

    triggerAutosave(updatedFields);
  };

  // --- FOLDER CRUD ACTIONS ---
  const handleCreateFolder = async (folderName) => {
    if (!folderName || !folderName.trim()) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/folders`, { name: folderName.trim() }, { withCredentials: true });
      setFolders(prev => [...prev, res.data]);
      setIsCreateFolderOpen(false);
      showToast("Folder created");
    } catch (err) {
      console.error("Failed to create folder:", err);
      showError("Unable to create folder", err.response?.data?.message || "Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenameFolder = async (newName) => {
    if (!folderToRename || !newName || !newName.trim()) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await axios.put(`${BASE_URL}/folders/${folderToRename._id}`, { name: newName.trim() }, { withCredentials: true });
      setFolders(prev => prev.map(f => f._id === folderToRename._id ? res.data : f));
      setIsRenameFolderOpen(false);
      setFolderToRename(null);
      showToast("Folder renamed");
    } catch (err) {
      console.error("Failed to rename folder:", err);
      showError("Unable to rename folder", err.response?.data?.message || "Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFolder = async () => {
    if (!folderToDelete) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/folders/${folderToDelete._id}`, { withCredentials: true });
      setFolders(prev => prev.filter(f => f._id !== folderToDelete._id));
      if (activeFolderId === folderToDelete._id) {
        setActiveFolderId(null);
      }
      setIsDeleteFolderOpen(false);
      setFolderToDelete(null);
      fetchNotes(false);
      showToast("Folder deleted");
    } catch (err) {
      console.error("Failed to delete folder:", err);
      showError("Unable to delete folder", "Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- CONVERT NOTE TO ISSUE ---
  const handleConvertToIssue = async () => {
    if (!activeNote) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/notes/${activeNote._id}/convert-to-issue`,
        {
          title: issueTitle || `Issue: ${activeNote.title}`,
          description: issueDescription || editorBlocks.map(b => b.content).join("\n"),
          projectId: issueProjectId || activeNote.projectId
        },
        { withCredentials: true }
      );
      
      setNotes(prev => prev.map(n => n._id === activeNote._id ? res.data.note : n));
      setActiveNote(res.data.note);
      setShowIssueModal(false);
      showToast("Converted to Issue");
    } catch (err) {
      console.error("Failed to convert note to issue:", err);
      showError("Conversion failed", err.response?.data?.message || "Please check your input and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- POST TO DISCUSSION ---
  const handlePostToDiscussion = async () => {
    if (!activeNote || !selectedChatId) return;
    if (discussionLoading) return;
    setDiscussionLoading(true);
    try {
      const chat = discussionChats.find(c => c._id === selectedChatId);
      const isPrivate = chat && chat.type === "private";
      
      await axios.post(
        `${BASE_URL}/send-message`,
        {
          conversationId: selectedChatId,
          content: discussionPreviewText,
          messageType: "text",
          type: isPrivate ? "private" : "group"
        },
        { withCredentials: true }
      );

      setShowDiscussionModal(false);
      showToast("Posted to Discussion");
    } catch (err) {
      console.error("Failed to post message to discussion:", err);
      showError("Share failed", "Failed to post discussion message.");
    } finally {
      setDiscussionLoading(false);
    }
  };

  const openDiscussionModal = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chats`, { withCredentials: true });
      setDiscussionChats(res.data.data || []);
      if (res.data.data?.length > 0) {
        setSelectedChatId(res.data.data[0]._id);
      }
      setPostFormat("full");
      const fullText = editorBlocks.map(b => b.content).join("\n");
      setDiscussionPreviewText(fullText);
      setShowDiscussionModal(true);
    } catch (err) {
      console.error("Failed to load discussions chats:", err);
    }
  };

  const handlePostFormatChange = async (format) => {
    setPostFormat(format);
    if (format === "full") {
      setDiscussionPreviewText(editorBlocks.map(b => b.content).join("\n"));
    } else if (format === "summary") {
      setDiscussionPreviewText("Generating Shastra AI Summary...");
      try {
        const res = await axios.post(`${BASE_URL}/notes/${activeNote._id}/shastra`, { action: "summarize" }, { withCredentials: true });
        setDiscussionPreviewText(`${res.data.result}\n\n---\n*Origin: [${activeNote.title || "Developer Note"}](http://localhost:5173/app/notes)*`);
      } catch (err) {
        setDiscussionPreviewText("Failed to generate summary.");
      }
    }
  };

  // --- ACTIONS ---
  const handleCreateNote = async (templateKey = "blank") => {
    try {
      const template = NOTE_TEMPLATES[templateKey] || NOTE_TEMPLATES.blank;
      const initialBlocks = template.blocks.map(b => ({
        ...b,
        id: `block-${Math.random().toString(36).substr(2, 9)}`
      }));

      const res = await axios.post(
        `${BASE_URL}/notes`,
        {
          title: template.name === "Blank Note" ? "" : template.name,
          noteType: templateKey === "blank" ? "note" : templateKey,
          blocks: initialBlocks,
          content: initialBlocks.map(b => b.content).join("\n")
        },
        { withCredentials: true }
      );

      const newNote = res.data;
      setNotes(prev => [newNote, ...prev]);
      loadNoteIntoEditor(newNote);
      setActiveFilter("all");
      setSelectedTag(null);
    } catch (err) {
      console.error("Failed to create note:", err);
      showError("Creation failed", "Failed to create note. Please check server connection.");
    }
  };

  const handleTogglePin = async () => {
    if (!activeNote) return;
    const nextPinned = !activeNote.pinned;
    try {
      const res = await axios.put(`${BASE_URL}/notes/${activeNote._id}`, { pinned: nextPinned }, { withCredentials: true });
      setActiveNote(res.data);
      setNotes(prev => prev.map(n => n._id === activeNote._id ? res.data : n));
    } catch (err) {
      console.error("Failed to pin note:", err);
    }
  };

  const handleToggleFavorite = async () => {
    if (!activeNote) return;
    const nextFav = !activeNote.favorite;
    try {
      const res = await axios.put(`${BASE_URL}/notes/${activeNote._id}`, { favorite: nextFav }, { withCredentials: true });
      setActiveNote(res.data);
      setNotes(prev => prev.map(n => n._id === activeNote._id ? res.data : n));
    } catch (err) {
      console.error("Failed to favorite note:", err);
    }
  };

  const triggerDeleteToast = (noteId, title) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setDeletedNoteToast({ noteId, title });
    toastTimeoutRef.current = setTimeout(() => {
      setDeletedNoteToast(null);
    }, 5000);
  };

  const handleDeleteNote = async () => {
    if (!activeNote) return;
    const noteId = activeNote._id;
    const title = activeNote.title;
    try {
      await axios.delete(`${BASE_URL}/notes/${noteId}`, { withCredentials: true });
      localStorage.removeItem(getLocalDraftKey(noteId));
      setNotes(prev => prev.filter(n => n._id !== noteId));
      triggerDeleteToast(noteId, title);

      // Select next note
      const remaining = notes.filter(n => n._id !== noteId && !n.isDeleted);
      if (remaining.length > 0) {
        loadNoteIntoEditor(remaining[0]);
      } else {
        setActiveNote(null);
      }
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  const handleRestoreNote = async () => {
    if (!activeNote) return;
    try {
      const res = await axios.patch(`${BASE_URL}/notes/${activeNote._id}/restore`, {}, { withCredentials: true });
      setNotes(prev => prev.map(n => n._id === activeNote._id ? res.data.note : n));
      setActiveNote(res.data.note);
      setActiveFilter("all");
    } catch (err) {
      console.error("Failed to restore note:", err);
    }
  };

  const handlePermanentDelete = () => {
    if (!activeNote) return;
    setNoteToPermanentDelete(activeNote);
    setIsPermanentDeleteOpen(true);
  };

  const handlePermanentDeleteConfirm = async () => {
    if (!noteToPermanentDelete) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/notes/${noteToPermanentDelete._id}/permanent`, { withCredentials: true });
      localStorage.removeItem(getLocalDraftKey(noteToPermanentDelete._id));
      const deletedId = noteToPermanentDelete._id;
      setNotes(prev => prev.filter(n => n._id !== deletedId));

      if (activeNote && activeNote._id === deletedId) {
        const remaining = notes.filter(n => n._id !== deletedId);
        if (remaining.length > 0) {
          loadNoteIntoEditor(remaining[0]);
        } else {
          setActiveNote(null);
        }
      }
      setIsPermanentDeleteOpen(false);
      setNoteToPermanentDelete(null);
      showToast("Permanently deleted note");
    } catch (err) {
      console.error("Failed to permanently delete note:", err);
      showError("Delete failed", "Failed to permanently delete the note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenameNote = async (newTitle) => {
    if (!noteToRename || !newTitle || !newTitle.trim()) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await axios.put(`${BASE_URL}/notes/${noteToRename._id}`, { title: newTitle.trim() }, { withCredentials: true });
      setNotes(prev => prev.map(n => n._id === noteToRename._id ? res.data : n));
      if (activeNote && activeNote._id === noteToRename._id) {
        setActiveNote(res.data);
        setEditorTitle(res.data.title || "");
      }
      setIsRenameNoteOpen(false);
      setNoteToRename(null);
      showToast("Note renamed");
    } catch (err) {
      console.error("Failed to rename note:", err);
      showError("Unable to rename note", err.response?.data?.message || "Please check your network connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicateNote = async (note) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/notes`,
        {
          title: `${note.title || "Untitled"} Copy`,
          noteType: note.noteType,
          blocks: note.blocks,
          content: note.content,
          tags: note.tags,
          projectId: note.projectId,
          goalId: note.goalId
        },
        { withCredentials: true }
      );
      setNotes(prev => [res.data, ...prev]);
      loadNoteIntoEditor(res.data);
    } catch (err) {
      console.error("Failed to duplicate note:", err);
    }
  };

  // --- BLOCK EDITOR CORE LOGIC ---
  const updateBlockContent = (id, content) => {
    let finalContent = content;
    let finalType = null;
    let updatedProps = {};

    const targetBlock = editorBlocks.find(b => b.id === id);
    if (targetBlock && targetBlock.type === "paragraph") {
      if (content.startsWith("## ")) {
        finalType = "heading-2";
        finalContent = content.substring(3);
      } else if (content.startsWith("### ")) {
        finalType = "heading-3";
        finalContent = content.substring(4);
      } else if (content.startsWith("- [ ] ")) {
        finalType = "checklist";
        finalContent = content.substring(6);
        updatedProps = { checked: false };
      } else if (content.startsWith("- ") || content.startsWith("* ")) {
        finalType = "bullet-list";
        finalContent = content.substring(2);
      } else if (content.startsWith("```")) {
        finalType = "code";
        finalContent = content.substring(3);
        updatedProps = { language: "javascript", lineNumbers: true, wordWrap: true };
      }
    }

    const updated = editorBlocks.map(b => {
      if (b.id === id) {
        return {
          ...b,
          type: finalType || b.type,
          content: finalContent,
          properties: { ...b.properties, ...updatedProps }
        };
      }
      return b;
    });
    handleNoteUpdate("blocks", updated);
  };

  const updateBlockProperties = (id, props) => {
    const updated = editorBlocks.map(b => {
      if (b.id === id) {
        return {
          ...b,
          properties: { ...b.properties, ...props }
        };
      }
      return b;
    });
    handleNoteUpdate("blocks", updated);
  };

  const addBlockAfter = (afterId, type = "paragraph", initialContent = "") => {
    recordHistory(editorBlocks);
    const newBlock = {
      id: `block-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: initialContent,
      properties: type === "code" ? { language: "javascript", lineNumbers: true, wordWrap: true } : {}
    };

    const index = editorBlocks.findIndex(b => b.id === afterId);
    let updated;
    if (index === -1) {
      updated = [...editorBlocks, newBlock];
    } else {
      updated = [
        ...editorBlocks.slice(0, index + 1),
        newBlock,
        ...editorBlocks.slice(index + 1)
      ];
    }

    handleNoteUpdate("blocks", updated);

    // Focus newly created block after render
    setTimeout(() => {
      const targetEl = blockRefs.current[newBlock.id];
      if (targetEl) targetEl.focus();
    }, 50);
  };

  const deleteBlock = (id) => {
    if (editorBlocks.length <= 1) return; // Don't delete the only block
    recordHistory(editorBlocks);

    const index = editorBlocks.findIndex(b => b.id === id);
    const updated = editorBlocks.filter(b => b.id !== id);
    handleNoteUpdate("blocks", updated);

    // Focus previous block
    if (index > 0) {
      setTimeout(() => {
        const prevBlock = updated[index - 1];
        const targetEl = blockRefs.current[prevBlock.id];
        if (targetEl) {
          targetEl.focus();
          // Move cursor to end of text
          const len = targetEl.value.length;
          targetEl.setSelectionRange(len, len);
        }
      }, 50);
    }
  };

  const moveBlock = (id, direction) => {
    const index = editorBlocks.findIndex(b => b.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === editorBlocks.length - 1) return;

    recordHistory(editorBlocks);
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...editorBlocks];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    handleNoteUpdate("blocks", updated);
  };

  const convertBlockType = (id, newType) => {
    recordHistory(editorBlocks);
    const updated = editorBlocks.map(b => {
      if (b.id === id) {
        return {
          ...b,
          type: newType,
          properties: newType === "code" ? { language: "javascript", lineNumbers: true, wordWrap: true } : {}
        };
      }
      return b;
    });
    handleNoteUpdate("blocks", updated);
    setSlashMenuBlockId(null);
  };

  // --- KEYBOARD NAVIGATION & SHORCUTS ---
  const handleBlockKeyDown = (e, block, index) => {
    const { key, ctrlKey, metaKey, shiftKey } = e;

    // Enter Key
    if (key === "Enter" && !shiftKey) {
      e.preventDefault();
      // Handle slash command execution if menu is open
      if (slashMenuBlockId === block.id) {
        const selectedOption = filteredSlashOptions[0];
        if (selectedOption) {
          convertBlockType(block.id, selectedOption.type);
          return;
        }
      }

      // Check for code/callout block exits
      if (block.type === "code") {
        // Shift+Enter creates new line in Monaco, standard Enter creates new block outside
        return;
      }

      // Create new paragraph block
      addBlockAfter(block.id, "paragraph");
    }

    // Backspace Key on empty block
    if (key === "Backspace" && !block.content) {
      e.preventDefault();
      deleteBlock(block.id);
    }

    // Up Arrow
    if (key === "ArrowUp" && index > 0) {
      const prevBlock = editorBlocks[index - 1];
      const targetEl = blockRefs.current[prevBlock.id];
      // Focus if cursor is at the top/start of textarea
      if (targetEl && e.target.selectionStart === 0) {
        e.preventDefault();
        targetEl.focus();
      }
    }

    // Down Arrow
    if (key === "ArrowDown" && index < editorBlocks.length - 1) {
      const nextBlock = editorBlocks[index + 1];
      const targetEl = blockRefs.current[nextBlock.id];
      // Focus if cursor is at the end of textarea
      if (targetEl && e.target.selectionStart === e.target.value.length) {
        e.preventDefault();
        targetEl.focus();
      }
    }

    // '/' Command Menu
    if (key === "/") {
      setSlashMenuBlockId(block.id);
      setSlashMenuFilter("");
    }

    // Escape hides slash menu
    if (key === "Escape") {
      setSlashMenuBlockId(null);
    }

    // Save notes explicitly (Cmd+S or Ctrl+S)
    if ((metaKey || ctrlKey) && key === "s") {
      e.preventDefault();
      triggerAutosave({
        title: editorTitle,
        blocks: editorBlocks,
        content: editorBlocks.map(b => b.content).join("\n"),
        tags: editorTags,
        noteType,
        projectId: selectedProject || null,
        goalId: selectedGoal || null
      });
    }

    // Undo (Cmd+Z) / Redo (Cmd+Shift+Z)
    if ((metaKey || ctrlKey) && key === "z") {
      e.preventDefault();
      if (shiftKey) {
        handleRedo();
      } else {
        handleUndo();
      }
    }
  };

  // --- SLASH COMMANDS HELPERS ---
  const SLASH_COMMANDS_OPTIONS = [
    { type: "paragraph", name: "Text", description: "Standard paragraph block", icon: <FileText size={16} /> },
    { type: "heading-1", name: "Heading 1", description: "Large section header", icon: <Heading1 size={16} /> },
    { type: "heading-2", name: "Heading 2", description: "Medium section header", icon: <Heading2 size={16} /> },
    { type: "heading-3", name: "Heading 3", description: "Subheading", icon: <Heading3 size={16} /> },
    { type: "checklist", name: "Checklist", description: "Interactive TODO item", icon: <CheckSquare size={16} /> },
    { type: "bullet-list", name: "Bullet List", description: "Bulleted list item", icon: <ArrowRightIcon size={16} /> },
    { type: "quote", name: "Quote", description: "Quote block", icon: <Quote size={16} /> },
    { type: "code", name: "Code Block", description: "IDE code block with syntax highlight", icon: <Code size={16} /> },
    { type: "divider", name: "Divider", description: "Horizontal split line", icon: <ArrowDown size={16} /> }
  ];

  // Dummy helper icon replacement
  function ArrowRightIcon({ size }) {
    return <span className="text-xs font-semibold">●</span>;
  }

  const filteredSlashOptions = useMemo(() => {
    if (!slashMenuFilter) return SLASH_COMMANDS_OPTIONS;
    return SLASH_COMMANDS_OPTIONS.filter(opt =>
      opt.name.toLowerCase().includes(slashMenuFilter.toLowerCase())
    );
  }, [slashMenuFilter]);

  // --- GLOBAL SEARCH BAR / KEYBOARD COMMAND PALETTE ---
  useEffect(() => {
    const handleGlobalShortcuts = (e) => {
      // Create note shortcut (Cmd + N / Ctrl + N)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleCreateNote("blank");
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, [notes]);

  // --- SHASTRA AI ACTIONS ---
  const handleShastraRequest = async () => {
    if (!activeNote) return;
    setShastraLoading(true);
    setShastraResult("");
    try {
      const res = await axios.post(
        `${BASE_URL}/notes/${activeNote._id}/shastra`,
        {
          action: shastraActionType,
          customPrompt: shastraActionType === "custom" ? shastraCustomPrompt : undefined
        },
        { withCredentials: true }
      );
      setShastraResult(res.data.result);
    } catch (err) {
      console.error("Shastra request failed:", err);
      setShastraResult("❌ Request failed. Please check backend connection and Groq API Key.");
    } finally {
      setShastraLoading(false);
    }
  };

  // Inject AI result as new block
  const injectShastraResult = () => {
    if (!shastraResult) return;
    const afterId = editorBlocks[editorBlocks.length - 1]?.id;
    addBlockAfter(afterId, "paragraph", shastraResult);
    setShowShastraPanel(false);
  };

  return (
    <div className="flex h-[calc(100vh-53px)] bg-black text-white font-sans overflow-hidden">
      {/* --- SIDEBAR PANEL (COLUMN 1) --- */}
      <AnimatePresence initial={false}>
        {!isSidebarCollapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-shrink-0 h-full bg-[#050505] border-r border-[#151515] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-[#151515]">
              <div className="flex items-center gap-2">
                <BookOpen className="text-white" size={18} />
                <span className="font-semibold tracking-tight text-white">Dev Diary</span>
              </div>
              <button
                onClick={() => handleCreateNote("blank")}
                className="p-1.5 rounded-lg bg-[#0A0A0A] hover:bg-[#151515] border border-[#222] transition duration-200"
                title="New Note (Cmd+N)"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Quick Templates Dropdown Select */}
            <div className="px-4 py-2 border-b border-[#151515]">
              <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1 block">
                Templates
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.keys(NOTE_TEMPLATES).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleCreateNote(key)}
                    className="text-left text-xs px-2 py-1.5 rounded bg-[#0A0A0A] hover:bg-[#151515] text-zinc-400 hover:text-white border border-[#1a1a1a] truncate transition duration-150"
                  >
                    {NOTE_TEMPLATES[key].name.replace(" Log", "").replace(" Concept", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters Navigation */}
            <div className="p-3 space-y-1 overflow-y-auto scrollbar-none flex-1">
              <button
                onClick={() => { setActiveFilter("all"); setSelectedTag(null); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition duration-150 ${activeFilter === "all" && !selectedTag ? "bg-[#0A0A0A] text-white font-medium border border-[#222]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
              >
                <span className="flex items-center gap-2.5">
                  <FileText size={15} /> All Notes
                </span>
                <span className="text-[10px] bg-[#151515] px-1.5 py-0.5 rounded text-zinc-500">
                  {notes.filter(n => !n.isDeleted).length}
                </span>
              </button>

              <button
                onClick={() => { setActiveFilter("pinned"); setSelectedTag(null); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition duration-150 ${activeFilter === "pinned" && !selectedTag ? "bg-[#0A0A0A] text-white font-medium border border-[#222]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
              >
                <span className="flex items-center gap-2.5">
                  <Pin size={15} /> Pinned
                </span>
                <span className="text-[10px] bg-[#151515] px-1.5 py-0.5 rounded text-zinc-500">
                  {notes.filter(n => n.pinned && !n.isDeleted).length}
                </span>
              </button>

              <button
                onClick={() => { setActiveFilter("favorite"); setSelectedTag(null); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition duration-150 ${activeFilter === "favorite" && !selectedTag ? "bg-[#0A0A0A] text-white font-medium border border-[#222]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
              >
                <span className="flex items-center gap-2.5">
                  <Star size={15} /> Favorites
                </span>
                <span className="text-[10px] bg-[#151515] px-1.5 py-0.5 rounded text-zinc-500">
                  {notes.filter(n => n.favorite && !n.isDeleted).length}
                </span>
              </button>

              <button
                onClick={() => { setActiveFilter("deleted"); setSelectedTag(null); }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition duration-150 ${activeFilter === "deleted" && !selectedTag ? "bg-[#0A0A0A] text-white font-medium border border-[#222]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
              >
                <span className="flex items-center gap-2.5">
                  <Trash2 size={15} /> Deleted
                </span>
                <span className="text-[10px] bg-[#151515] px-1.5 py-0.5 rounded text-zinc-500">
                  {notes.filter(n => n.isDeleted).length}
                </span>
              </button>

              {/* Folders Section */}
              <div className="pt-4 mt-4 border-t border-[#151515] text-left">
                <div className="flex items-center justify-between px-3 mb-2">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Folders
                  </h3>
                  <button
                    onClick={() => setIsCreateFolderOpen(true)}
                    className="text-[10px] text-zinc-500 hover:text-white font-medium"
                  >
                    + New
                  </button>
                </div>
                {folders.length === 0 ? (
                  <p className="px-3 text-xs text-zinc-600 italic">No folders yet</p>
                ) : (
                  <div className="space-y-0.5 max-h-40 overflow-y-auto scrollbar-none">
                    {folders.map((folder) => {
                      const isFolderActive = activeFolderId === folder._id;
                      const noteCount = notes.filter(n => n.folderId === folder._id && !n.isDeleted).length;

                      return (
                        <div
                          key={folder._id}
                          className={`group/folder flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs transition duration-150 ${isFolderActive ? "bg-[#0A0A0A] text-white font-medium border border-[#222]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                        >
                          <button
                            onClick={() => {
                              setActiveFolderId(isFolderActive ? null : folder._id);
                              setSelectedTag(null);
                              if (activeFilter === "deleted") {
                                setActiveFilter("all");
                              }
                            }}
                            className="flex items-center gap-2 truncate flex-1 text-left"
                          >
                            <Folder size={12} className="text-zinc-500" />
                            <span className="truncate">{folder.name}</span>
                          </button>
                          
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="text-[9px] bg-[#151515] px-1.5 py-0.2 rounded text-zinc-600">
                              {noteCount}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFolderToRename(folder);
                                setIsRenameFolderOpen(true);
                              }}
                              className="opacity-0 group-hover/folder:opacity-100 text-[10px] text-zinc-500 hover:text-white font-medium"
                              title="Rename folder"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFolderToDelete(folder);
                                setIsDeleteFolderOpen(true);
                              }}
                              className="opacity-0 group-hover/folder:opacity-100 text-[10px] text-zinc-500 hover:text-red-400 font-medium"
                              title="Delete folder"
                            >
                              &times;
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Tags Section */}
              <div className="pt-4 mt-4 border-t border-[#151515]">
                <h3 className="px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Tags
                </h3>
                {allTags.length === 0 ? (
                  <p className="px-3 text-xs text-zinc-600 italic">No tags yet</p>
                ) : (
                  <div className="space-y-0.5">
                    {allTags.map(([tag, count]) => (
                      <button
                        key={tag}
                        onClick={() => { setSelectedTag(tag); }}
                        className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs transition duration-150 ${selectedTag === tag ? "bg-[#0A0A0A] text-white font-medium border border-[#222]" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <Tag size={12} className="text-zinc-500" /> #{tag}
                        </span>
                        <span className="text-[9px] bg-[#151515] px-1.5 py-0.2 rounded text-zinc-600">
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Storage Info Removed */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Sidebar Collapse Handle Button */}
      <div className="flex flex-col items-center justify-center bg-black border-r border-[#151515] px-0.5 hover:bg-zinc-950 transition duration-150 cursor-pointer w-3"
           onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
        <span className="h-8 w-1 rounded-full bg-zinc-800"></span>
      </div>

      {/* --- NOTES PREVIEW LIST (COLUMN 2) --- */}
      <div className="w-[320px] flex-shrink-0 bg-black border-r border-[#151515] flex flex-col">
        {/* Search & Sort Panel */}
        <div className="p-4 space-y-3 border-b border-[#151515]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search title, tags, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#1a1a1a] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#333] transition"
            />
            <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Sort by</span>
            <div className="flex items-center gap-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
              >
                <option value="updatedAt">Updated Time</option>
                <option value="createdAt">Created Time</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes Listing */}
        <div className="flex-1 overflow-y-auto scrollbar-none divide-y divide-[#151515]">
          {filteredNotes.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">
              <AlertTriangle className="mx-auto mb-2 text-zinc-600" size={24} />
              No notes found.
            </div>
          ) : (
            filteredNotes.map((note) => {
              const isActive = activeNote && activeNote._id === note._id;
              // Build brief preview snippet
              const textContent = note.blocks ? note.blocks.map(b => b.content).join(" ") : note.content || "";
              const previewText = textContent.slice(0, 70) + (textContent.length > 70 ? "..." : "");



              return (
                <div
                  key={note._id}
                  onClick={() => loadNoteIntoEditor(note)}
                  className={`group p-4 cursor-pointer text-left transition duration-150 select-none relative ${isActive ? "bg-[#0A0A0A]" : "hover:bg-zinc-950/40"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-zinc-300"} flex-1`}>
                      {note.title || "Untitled Note"}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0 relative">
                      {note.pinned && <Pin size={12} className="text-zinc-500 rotate-45" />}
                      {note.favorite && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuNoteId(activeMenuNoteId === note._id ? null : note._id);
                        }}
                        className="p-1 rounded hover:bg-zinc-850 text-zinc-500 hover:text-white transition duration-150 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                        aria-label="Note actions"
                      >
                        <MoreHorizontal size={14} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuNoteId === note._id && (
                        <div className="absolute right-0 top-6 z-50 w-40 bg-[#0A0A0A] border border-zinc-800 rounded-lg shadow-2xl py-1 text-xs text-white">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuNoteId(null);
                              loadNoteIntoEditor(note);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-zinc-900 transition text-zinc-300 hover:text-white"
                          >
                            Open
                          </button>
                          
                          {note.isDeleted ? (
                            <>
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  try {
                                    const res = await axios.patch(`${BASE_URL}/notes/${note._id}/restore`, {}, { withCredentials: true });
                                    setNotes(prev => prev.filter(n => n._id !== note._id));
                                    if (activeNote && activeNote._id === note._id) setActiveNote(res.data.note);
                                  } catch (err) { console.error(err); }
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-zinc-900 transition text-green-500 font-medium"
                              >
                                Restore
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  setNoteToPermanentDelete(note);
                                  setIsPermanentDeleteOpen(true);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-zinc-900 transition text-red-500 font-medium"
                              >
                                Delete Forever
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  setNoteToRename(note);
                                  setIsRenameNoteOpen(true);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-zinc-900 transition text-zinc-300 hover:text-white"
                              >
                                Rename
                              </button>
                              
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  const nextPinned = !note.pinned;
                                  try {
                                    const res = await axios.put(`${BASE_URL}/notes/${note._id}`, { pinned: nextPinned }, { withCredentials: true });
                                    setNotes(prev => prev.map(n => n._id === note._id ? res.data : n));
                                    if (activeNote && activeNote._id === note._id) setActiveNote(res.data);
                                  } catch (err) { console.error(err); }
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-zinc-900 transition text-zinc-300 hover:text-white"
                              >
                                {note.pinned ? "Unpin" : "Pin"}
                              </button>

                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  const nextFav = !note.favorite;
                                  try {
                                    const res = await axios.put(`${BASE_URL}/notes/${note._id}`, { favorite: nextFav }, { withCredentials: true });
                                    setNotes(prev => prev.map(n => n._id === note._id ? res.data : n));
                                    if (activeNote && activeNote._id === note._id) setActiveNote(res.data);
                                  } catch (err) { console.error(err); }
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-zinc-900 transition text-zinc-300 hover:text-white"
                              >
                                {note.favorite ? "Remove from Favorites" : "Favorite"}
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  handleDuplicateNote(note);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-zinc-900 transition text-zinc-300 hover:text-white"
                              >
                                Duplicate
                              </button>

                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  try {
                                    await axios.delete(`${BASE_URL}/notes/${note._id}`, { withCredentials: true });
                                    localStorage.removeItem(getLocalDraftKey(note._id));
                                    
                                    // Trigger delete undo toast
                                    triggerDeleteToast(note._id, note.title);

                                    setNotes(prev => prev.filter(n => n._id !== note._id));
                                    if (activeNote && activeNote._id === note._id) {
                                      const remaining = notes.filter(n => n._id !== note._id && !n.isDeleted);
                                      if (remaining.length > 0) loadNoteIntoEditor(remaining[0]);
                                      else setActiveNote(null);
                                    }
                                  } catch (err) { console.error(err); }
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-zinc-900 transition text-red-400 hover:text-red-300 font-medium border-t border-zinc-900 mt-1"
                              >
                                Delete
                              </button>
                              
                              <select
                                value={note.projectId || ""}
                                onClick={(e) => e.stopPropagation()}
                                onChange={async (e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  const newProjId = e.target.value || null;
                                  try {
                                    const res = await axios.put(`${BASE_URL}/notes/${note._id}`, { projectId: newProjId }, { withCredentials: true });
                                    setNotes(prev => prev.map(n => n._id === note._id ? res.data : n));
                                    if (activeNote && activeNote._id === note._id) {
                                      setSelectedProject(newProjId || "");
                                      setActiveNote(res.data);
                                    }
                                  } catch (err) { console.error(err); }
                                }}
                                className="w-full bg-black text-zinc-500 hover:text-white px-2 py-1 text-[10px] focus:outline-none border-t border-zinc-900 mt-1 cursor-pointer font-mono"
                              >
                                <option value="">Move to: Personal</option>
                                {projects.map(p => (
                                  <option key={p._id} value={p._id}>{p.title}</option>
                                ))}
                              </select>

                              <select
                                value={note.folderId || ""}
                                onClick={(e) => e.stopPropagation()}
                                onChange={async (e) => {
                                  e.stopPropagation();
                                  setActiveMenuNoteId(null);
                                  const newFolderId = e.target.value || null;
                                  try {
                                    const res = await axios.put(`${BASE_URL}/notes/${note._id}`, { folderId: newFolderId }, { withCredentials: true });
                                    setNotes(prev => prev.map(n => n._id === note._id ? res.data : n));
                                    if (activeNote && activeNote._id === note._id) {
                                      setSelectedFolder(newFolderId || "");
                                      setActiveNote(res.data);
                                    }
                                  } catch (err) { console.error(err); }
                                }}
                                className="w-full bg-black text-zinc-500 hover:text-white px-2 py-1 text-[10px] focus:outline-none border-t border-zinc-900 mt-1 cursor-pointer font-mono"
                              >
                                <option value="">Move to Folder: Unsorted</option>
                                {folders.map(f => (
                                  <option key={f._id} value={f._id}>{f.name}</option>
                                ))}
                              </select>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2 h-8 leading-relaxed">
                    {previewText || <span className="italic">No additional text</span>}
                  </p>

                  <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-600">
                    <span>
                      {new Date(note.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>

                    {/* Tag Badges preview */}
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex gap-1 overflow-hidden max-w-[150px]">
                        {note.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800/50 text-zinc-500 max-w-[60px] truncate">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* --- EDITOR CANVAS (COLUMN 3) --- */}
      <div className="flex-1 bg-black flex flex-col overflow-hidden relative">
        {activeNote ? (
          <>
            {/* Editor Top Navigation Header / Toolbar */}
            <div className="h-14 border-b border-[#151515] px-6 flex items-center justify-between bg-black/60 backdrop-blur">
              <div className="flex items-center gap-4 text-xs">
                {/* Autosave Status Indicator */}
                <div className="flex items-center gap-1.5 text-zinc-500">
                  {saveStatus === "Saving..." && (
                    <>
                      <RefreshCw size={12} className="animate-spin text-zinc-400" />
                      <span>Saving...</span>
                    </>
                  )}
                  {saveStatus === "Saved" && (
                    <>
                      <Cloud size={14} className="text-green-500" />
                      <span className="text-zinc-500">Saved</span>
                    </>
                  )}
                  {saveStatus === "Offline" && (
                    <>
                      <CloudOff size={14} className="text-zinc-600" />
                      <span className="text-zinc-600">Offline (Cached)</span>
                    </>
                  )}
                  {saveStatus === "Syncing..." && (
                    <>
                      <RefreshCw size={12} className="animate-spin text-blue-500" />
                      <span>Syncing drafts...</span>
                    </>
                  )}
                </div>

                <span className="text-zinc-800">|</span>

                {/* Note Type Selector */}
                <div className="flex items-center gap-1">
                  <span className="text-zinc-500">Type:</span>
                  <select
                    value={noteType}
                    onChange={(e) => handleNoteUpdate("noteType", e.target.value)}
                    className="bg-transparent text-zinc-300 font-semibold focus:outline-none border-b border-transparent hover:border-zinc-700 cursor-pointer"
                  >
                    <option value="note">General Note</option>
                    <option value="diary">Dev Diary</option>
                    <option value="bug-fix">Bug Fix Log</option>
                    <option value="learning">Learning Log</option>
                    <option value="dsa">DSA Practice</option>
                    <option value="architecture-decision">Architecture ADR</option>
                    <option value="command">Command Reference</option>
                    <option value="api-reference">API Reference</option>
                    <option value="interview">Interview Concept</option>
                  </select>
                </div>
              </div>

              {/* Utility buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleTogglePin}
                  className={`p-1.5 rounded-lg hover:bg-zinc-900 border transition duration-150 ${activeNote.pinned ? "border-zinc-700 bg-zinc-900/60 text-white" : "border-transparent text-zinc-400"}`}
                  title="Pin Note"
                >
                  <Pin size={15} className="rotate-45" />
                </button>

                <button
                  onClick={handleToggleFavorite}
                  className={`p-1.5 rounded-lg hover:bg-zinc-900 border transition duration-150 ${activeNote.favorite ? "border-zinc-700 bg-zinc-900/60 text-yellow-500" : "border-transparent text-zinc-400"}`}
                  title="Favorite Note"
                >
                  <Star size={15} className={activeNote.favorite ? "fill-yellow-500 text-yellow-500" : ""} />
                </button>

                <button
                  onClick={() => setShowShastraPanel(!showShastraPanel)}
                  className={`p-1.5 rounded-lg border transition duration-150 flex items-center gap-1.5 text-xs ${showShastraPanel ? "border-blue-800 bg-blue-900/10 text-white font-medium" : "border-transparent text-zinc-300 hover:bg-zinc-900"}`}
                  title="Ask Shastra AI Assistant"
                >
                  <Sparkles size={15} className="text-blue-400" />
                  <span>Ask Shastra</span>
                </button>

                {!activeNote.isDeleted && (
                  <>
                    <button
                      onClick={() => {
                        setIssueTitle(activeNote.title || "");
                        setIssueDescription(editorBlocks.map(b => b.content).join("\n"));
                        setIssueProjectId(activeNote.projectId || "");
                        setShowIssueModal(true);
                      }}
                      className="p-1.5 rounded-lg border border-transparent text-zinc-300 hover:bg-zinc-900 flex items-center gap-1.5 text-xs transition duration-150"
                      title="Convert this note to a project issue"
                    >
                      <PlusCircle size={15} className="text-zinc-400" />
                      <span>Convert to Issue</span>
                    </button>

                    <button
                      onClick={openDiscussionModal}
                      className="p-1.5 rounded-lg border border-transparent text-zinc-300 hover:bg-zinc-900 flex items-center gap-1.5 text-xs transition duration-150"
                      title="Post this note to team discussion chats"
                    >
                      <MessageSquare size={15} className="text-zinc-400" />
                      <span>Post to Chat</span>
                    </button>
                  </>
                )}

                <span className="text-zinc-800 mx-1">|</span>

                {activeNote.isDeleted ? (
                  <>
                    <button
                      onClick={handleRestoreNote}
                      className="px-2.5 py-1.5 rounded-lg text-xs bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 transition flex items-center gap-1"
                    >
                      <RefreshCw size={13} /> Restore
                    </button>
                    <button
                      onClick={handlePermanentDelete}
                      className="px-2.5 py-1.5 rounded-lg text-xs bg-red-950/40 hover:bg-red-950/80 text-red-400 border border-red-900/30 transition flex items-center gap-1"
                    >
                      <Trash2 size={13} /> Permanent Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleDeleteNote}
                    className="p-1.5 rounded-lg hover:bg-red-950/20 hover:text-red-400 border border-transparent text-zinc-400 transition"
                    title="Move to Deleted"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Note Metadata Details Bar (Project, Goal Links, Tags) */}
            {!activeNote.isDeleted && (
              <div className="bg-[#050505] px-6 py-2 border-b border-[#151515] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500">
                {/* Project selector */}
                <div className="flex items-center gap-1.5">
                  <Folder size={13} className="text-zinc-600" />
                  <span>Project:</span>
                  <select
                    value={selectedProject}
                    onChange={(e) => handleNoteUpdate("projectId", e.target.value)}
                    className="bg-transparent text-zinc-300 focus:outline-none cursor-pointer"
                  >
                    <option value="">None (Personal)</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.title} ({p.teamName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Goal Selector */}
                <div className="flex items-center gap-1.5">
                  <CheckSquare size={13} className="text-zinc-600" />
                  <span>Goal:</span>
                  <select
                    value={selectedGoal}
                    onChange={(e) => handleNoteUpdate("goalId", e.target.value)}
                    className="bg-transparent text-zinc-300 focus:outline-none cursor-pointer"
                  >
                    <option value="">None</option>
                    {goals.map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Folder Selector */}
                <div className="flex items-center gap-1.5">
                  <Folder size={13} className="text-zinc-600" />
                  <span>Folder:</span>
                  <select
                    value={selectedFolder}
                    onChange={(e) => handleNoteUpdate("folderId", e.target.value)}
                    className="bg-transparent text-zinc-300 focus:outline-none cursor-pointer"
                  >
                    <option value="">None (Unsorted)</option>
                    {folders.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Linked Issue Display */}
                {activeNote.linkedIssueId && (
                  <div className="flex items-center gap-1.5 border border-zinc-900 bg-zinc-950 px-2 py-0.5 rounded text-zinc-400">
                    <AlertTriangle size={11} className="text-zinc-500" />
                    <span>Linked Issue:</span>
                    <a
                      href={`/app/manager`}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      # {String(activeNote.linkedIssueId).slice(-4)}
                    </a>
                  </div>
                )}

                {/* Tags Metadata */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <Tag size={13} className="text-zinc-600" />
                  <span>Tags:</span>
                  <div className="flex items-center gap-1.5">
                    {editorTags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-1">
                        #{tag}
                        <button
                          onClick={() => handleNoteUpdate("tags", editorTags.filter(t => t !== tag))}
                          className="hover:text-red-500 text-zinc-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="+ Add tag..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          const newTag = e.target.value.replace("#", "").toLowerCase().trim();
                          if (newTag && !editorTags.includes(newTag)) {
                            handleNoteUpdate("tags", [...editorTags, newTag]);
                          }
                          e.target.value = "";
                        }
                      }}
                      className="bg-transparent border-none outline-none focus:ring-0 text-[10px] text-zinc-400 w-16"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Note Editor Area */}
            <div className="flex-1 overflow-y-auto px-16 py-12 scrollbar-none flex flex-col">
              {/* Note Title Input */}
              <div className="mb-6">
                <AutoResizeTextarea
                  value={editorTitle}
                  onChange={(e) => handleNoteUpdate("title", e.target.value)}
                  placeholder="Note Title"
                  className="text-3xl font-bold tracking-tight text-white border-none focus:ring-0 placeholder-zinc-700"
                  disabled={activeNote.isDeleted}
                />
              </div>

              <hr className="border-zinc-900 mb-8" />

              {/* Note Blocks Loop */}
              <div className="space-y-4 flex-1 pb-40">
                {editorBlocks.map((block, index) => {
                  const isFocused = activeBlockIndex === index;

                  return (
                    <div
                      key={block.id}
                      className="group relative flex items-start gap-3 w-full"
                      onMouseEnter={() => setActiveBlockIndex(index)}
                      onMouseLeave={() => setActiveBlockIndex(null)}
                    >
                      {/* Left Block Controls Bar (Hover Options) */}
                      {!activeNote.isDeleted && (
                        <div
                          className={`absolute -left-12 top-1 flex items-center gap-0.5 transition duration-150 ${isFocused ? "opacity-100" : "opacity-0"}`}
                        >
                          {/* Reordering */}
                          <div className="flex flex-col">
                            <button
                              onClick={() => moveBlock(block.id, "up")}
                              disabled={index === 0}
                              className="p-0.5 text-zinc-600 hover:text-white disabled:opacity-20"
                            >
                              <ArrowUp size={10} />
                            </button>
                            <button
                              onClick={() => moveBlock(block.id, "down")}
                              disabled={index === editorBlocks.length - 1}
                              className="p-0.5 text-zinc-600 hover:text-white disabled:opacity-20"
                            >
                              <ArrowDown size={10} />
                            </button>
                          </div>

                          {/* Delete block */}
                          <button
                            onClick={() => deleteBlock(block.id)}
                            className="p-1 rounded text-zinc-600 hover:text-red-400 hover:bg-zinc-900/60"
                            title="Delete Block"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}

                      {/* Render block according to its type */}
                      <div className="flex-1 w-full text-left">
                        {/* --- PARAGRAPH BLOCK --- */}
                        {block.type === "paragraph" && (
                          <AutoResizeTextarea
                            textareaRef={(el) => (blockRefs.current[block.id] = el)}
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            onKeyDown={(e) => handleBlockKeyDown(e, block, index)}
                            placeholder="Type '/' for commands..."
                            className="text-base text-zinc-300 font-normal leading-relaxed placeholder-zinc-800"
                            disabled={activeNote.isDeleted}
                          />
                        )}

                        {/* --- HEADING 1 BLOCK --- */}
                        {block.type === "heading-1" && (
                          <AutoResizeTextarea
                            textareaRef={(el) => (blockRefs.current[block.id] = el)}
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            onKeyDown={(e) => handleBlockKeyDown(e, block, index)}
                            placeholder="Heading 1"
                            className="text-2xl font-bold tracking-tight text-white placeholder-zinc-800"
                            disabled={activeNote.isDeleted}
                          />
                        )}

                        {/* --- HEADING 2 BLOCK --- */}
                        {block.type === "heading-2" && (
                          <AutoResizeTextarea
                            textareaRef={(el) => (blockRefs.current[block.id] = el)}
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            onKeyDown={(e) => handleBlockKeyDown(e, block, index)}
                            placeholder="Heading 2"
                            className="text-xl font-semibold text-white placeholder-zinc-800"
                            disabled={activeNote.isDeleted}
                          />
                        )}

                        {/* --- HEADING 3 BLOCK --- */}
                        {block.type === "heading-3" && (
                          <AutoResizeTextarea
                            textareaRef={(el) => (blockRefs.current[block.id] = el)}
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            onKeyDown={(e) => handleBlockKeyDown(e, block, index)}
                            placeholder="Heading 3"
                            className="text-lg font-medium text-white placeholder-zinc-800"
                            disabled={activeNote.isDeleted}
                          />
                        )}

                        {/* --- CHECKLIST BLOCK --- */}
                        {block.type === "checklist" && (
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={() => {
                                if (activeNote.isDeleted) return;
                                updateBlockProperties(block.id, { checked: !block.properties?.checked });
                              }}
                              className="mt-1 text-zinc-500 hover:text-white transition flex-shrink-0"
                            >
                              {block.properties?.checked ? (
                                <CheckSquare size={16} className="text-green-500" />
                              ) : (
                                <Square size={16} />
                              )}
                            </button>
                            <AutoResizeTextarea
                              textareaRef={(el) => (blockRefs.current[block.id] = el)}
                              value={block.content}
                              onChange={(e) => updateBlockContent(block.id, e.target.value)}
                              onKeyDown={(e) => handleBlockKeyDown(e, block, index)}
                              placeholder="To-do item"
                              className={`text-base leading-relaxed ${block.properties?.checked ? "line-through text-zinc-500 decoration-zinc-700" : "text-zinc-300"}`}
                              disabled={activeNote.isDeleted}
                            />
                          </div>
                        )}

                        {/* --- BULLET LIST BLOCK --- */}
                        {block.type === "bullet-list" && (
                          <div className="flex items-start gap-2.5">
                            <span className="text-zinc-500 mt-1 select-none font-bold text-sm">•</span>
                            <AutoResizeTextarea
                              textareaRef={(el) => (blockRefs.current[block.id] = el)}
                              value={block.content}
                              onChange={(e) => updateBlockContent(block.id, e.target.value)}
                              onKeyDown={(e) => handleBlockKeyDown(e, block, index)}
                              placeholder="List item"
                              className="text-base text-zinc-300 leading-relaxed"
                              disabled={activeNote.isDeleted}
                            />
                          </div>
                        )}

                        {/* --- QUOTE BLOCK --- */}
                        {block.type === "quote" && (
                          <div className="border-l-2 border-zinc-700 pl-4 py-0.5 italic">
                            <AutoResizeTextarea
                              textareaRef={(el) => (blockRefs.current[block.id] = el)}
                              value={block.content}
                              onChange={(e) => updateBlockContent(block.id, e.target.value)}
                              onKeyDown={(e) => handleBlockKeyDown(e, block, index)}
                              placeholder="Empty quote..."
                              className="text-base text-zinc-400 font-serif leading-relaxed"
                              disabled={activeNote.isDeleted}
                            />
                          </div>
                        )}

                        {/* --- CODE BLOCK --- */}
                        {block.type === "code" && (
                          <div className="rounded-xl border border-zinc-900 bg-[#050505] overflow-hidden my-3 w-full max-w-full">
                            {/* Code block header bar */}
                            <div className="px-4 py-2 border-b border-zinc-900 bg-[#080808] flex items-center justify-between text-xs text-zinc-500">
                              <div className="flex items-center gap-3">
                                <Terminal size={14} className="text-zinc-400" />
                                <select
                                  value={block.properties?.language || "javascript"}
                                  onChange={(e) => {
                                    if (activeNote.isDeleted) return;
                                    updateBlockProperties(block.id, { language: e.target.value });
                                  }}
                                  className="bg-transparent text-zinc-300 border-none outline-none font-mono cursor-pointer"
                                  disabled={activeNote.isDeleted}
                                >
                                  <option value="javascript">JavaScript</option>
                                  <option value="typescript">TypeScript</option>
                                  <option value="python">Python</option>
                                  <option value="go">Go</option>
                                  <option value="rust">Rust</option>
                                  <option value="c++">C++</option>
                                  <option value="sql">SQL</option>
                                  <option value="html">HTML</option>
                                  <option value="css">CSS</option>
                                  <option value="json">JSON</option>
                                  <option value="shell">Shell/Bash</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-3">
                                {/* Copy code */}
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(block.content || "");
                                    updateBlockProperties(block.id, { copied: true });
                                    setTimeout(() => updateBlockProperties(block.id, { copied: false }), 2000);
                                  }}
                                  className="hover:text-white transition duration-150 flex items-center gap-1"
                                >
                                  {block.properties?.copied ? (
                                    <>
                                      <Check size={12} className="text-green-500" /> Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} /> Copy
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Monaco Editor Container */}
                            <div className="h-48 w-full max-w-full">
                              <Editor
                                height="100%"
                                language={block.properties?.language || "javascript"}
                                theme="vs-dark"
                                value={block.content}
                                onChange={(val) => updateBlockContent(block.id, val || "")}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 13,
                                  lineNumbers: block.properties?.lineNumbers ? "on" : "off",
                                  wordWrap: block.properties?.wordWrap ? "on" : "off",
                                  scrollBeyondLastLine: false,
                                  readOnly: activeNote.isDeleted,
                                  padding: { top: 8, bottom: 8 }
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* --- DIVIDER BLOCK --- */}
                        {block.type === "divider" && (
                          <div className="w-full py-3 flex items-center cursor-pointer select-none"
                               onClick={() => addBlockAfter(block.id, "paragraph")}>
                            <hr className="w-full border-zinc-900 hover:border-zinc-800 transition" />
                          </div>
                        )}
                      </div>

                      {/* --- SLASH COMMANDS DROPDOWN MENU --- */}
                      {slashMenuBlockId === block.id && (
                        <div className="absolute left-0 top-8 z-50 w-64 bg-[#0A0A0A] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden py-1">
                          <div className="px-3 py-1.5 border-b border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                            <span>Insert Block</span>
                            <span>Type to search</span>
                          </div>

                          <div className="max-h-60 overflow-y-auto scrollbar-none">
                            {filteredSlashOptions.length === 0 ? (
                              <div className="px-3 py-2 text-xs text-zinc-600 italic">No matches found</div>
                            ) : (
                              filteredSlashOptions.map(opt => (
                                <button
                                  key={opt.type}
                                  onClick={() => convertBlockType(block.id, opt.type)}
                                  className="w-full text-left px-3 py-2 hover:bg-zinc-900 transition duration-150 flex items-start gap-2.5"
                                >
                                  <div className="mt-0.5 p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white">
                                    {opt.icon}
                                  </div>
                                  <div>
                                    <div className="text-xs font-medium text-white">{opt.name}</div>
                                    <div className="text-[10px] text-zinc-500 mt-0.5">{opt.description}</div>
                                  </div>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Empty Workspace Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-black">
            <div className="max-w-md space-y-6">
              {/* Graphic Logo */}
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
                <BookOpen size={48} className="mx-auto text-zinc-600 relative" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  Your developer memory starts here.
                </h2>
                <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mx-auto">
                  Capture a bug you solved, write down daily lessons, or record system architecture trade-offs.
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full max-w-[240px] mx-auto pt-2">
                <button
                  onClick={() => handleCreateNote("blank")}
                  className="w-full py-2 px-4 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition"
                >
                  Create note
                </button>
                <button
                  onClick={() => handleCreateNote("diary")}
                  className="w-full py-2 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-medium text-sm transition flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} /> Start Dev Diary
                </button>
              </div>

              <div className="pt-6 border-t border-zinc-950 flex items-center justify-center gap-8 text-[11px] text-zinc-600">
                <span className="flex items-center gap-1">
                  <Command size={10} /> + N : New note
                </span>
                <span className="flex items-center gap-1">
                  <Command size={10} /> + S : Force Save
                </span>
              </div>
            </div>
          </div>
        )}

        {/* --- SHASTRA AI ASSISTANT PANEL (SLIDE IN SIDEBAR) --- */}
        <AnimatePresence>
          {showShastraPanel && activeNote && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="absolute right-0 top-0 h-full w-[360px] bg-[#050505] border-l border-[#151515] flex flex-col shadow-2xl z-[100]"
            >
              {/* Header */}
              <div className="p-4 border-b border-[#151515] flex items-center justify-between bg-black">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles size={16} className="text-blue-400 animate-pulse" />
                  <span className="font-semibold tracking-tight">Ask Shastra AI</span>
                </div>
                <button
                  onClick={() => setShowShastraPanel(false)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-[#151515]"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Config & Actions selection */}
              <div className="p-4 space-y-4 flex-1 overflow-y-auto scrollbar-none">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                    Select AI Tool Action
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: "summarize", label: "Summarize" },
                      { val: "explain-code", label: "Explain Code" },
                      { val: "extract-todos", label: "Extract TODOs" },
                      { val: "restructure", label: "Restructure Note" },
                      { val: "custom", label: "Custom Prompt" }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setShastraActionType(opt.val)}
                        className={`text-xs px-2.5 py-2 rounded-lg text-center font-medium border transition ${shastraActionType === opt.val ? "bg-blue-900/10 border-blue-800 text-blue-400" : "bg-[#0A0A0A] border-[#151515] text-zinc-400 hover:text-white"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Prompt Box */}
                {shastraActionType === "custom" && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                      Your Instructions
                    </label>
                    <textarea
                      value={shastraCustomPrompt}
                      onChange={(e) => setShastraCustomPrompt(e.target.value)}
                      placeholder="e.g. Turn this note into a README.md snippet..."
                      className="w-full bg-[#0A0A0A] border border-[#151515] rounded-lg p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#333] resize-none h-20"
                    />
                  </div>
                )}

                {/* Run Button */}
                <button
                  onClick={handleShastraRequest}
                  disabled={shastraLoading}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/40 disabled:text-zinc-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  {shastraLoading ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" /> Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} /> Run Shastra Intelligence
                    </>
                  )}
                </button>

                {/* Output Panel */}
                {(shastraResult || shastraLoading) && (
                  <div className="pt-4 border-t border-[#151515] space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                        Shastra Response
                      </span>
                      {shastraResult && !shastraLoading && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(shastraResult);
                            }}
                            className="text-[10px] text-zinc-400 hover:text-white transition flex items-center gap-1"
                          >
                            <Copy size={10} /> Copy
                          </button>
                          <button
                            onClick={injectShastraResult}
                            className="text-[10px] text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
                          >
                            <Plus size={10} /> Insert into note
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="bg-[#0A0A0A] border border-[#151515] rounded-lg p-3 max-h-[400px] overflow-y-auto scrollbar-none">
                      {shastraLoading ? (
                        <div className="space-y-2 py-4">
                          <div className="h-3 bg-zinc-900 rounded animate-pulse w-3/4"></div>
                          <div className="h-3 bg-zinc-900 rounded animate-pulse w-5/6"></div>
                          <div className="h-3 bg-zinc-900 rounded animate-pulse w-2/3"></div>
                        </div>
                      ) : (
                        <div className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono">
                          {shastraResult}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Undo Delete Toast */}
        {deletedNoteToast && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#0A0A0A] border border-[#222] text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-4 text-sm animate-fadeIn">
            <span>Note moved to Recently Deleted</span>
            <button
              onClick={async () => {
                const noteId = deletedNoteToast.noteId;
                setDeletedNoteToast(null);
                try {
                  const res = await axios.patch(`${BASE_URL}/notes/${noteId}/restore`, {}, { withCredentials: true });
                  setNotes(prev => [res.data.note, ...prev]);
                  loadNoteIntoEditor(res.data.note);
                } catch (err) {
                  console.error("Undo restore failed:", err);
                }
              }}
              className="text-blue-400 hover:text-blue-300 font-semibold focus:outline-none"
            >
              Undo
            </button>
          </div>
        )}
        {/* Convert to Issue Modal */}
        {showIssueModal && activeNote && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#0A0A0A] border border-zinc-900 rounded-xl shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3">
                <h3 className="text-sm font-semibold text-white">Convert Note to CodeSarthi Issue</h3>
                <button onClick={() => setShowIssueModal(false)} className="text-zinc-500 hover:text-white">
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Issue Title</label>
                  <input
                    type="text"
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                    className="w-full bg-[#121212] border border-zinc-900 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none"
                    placeholder="e.g. WebSocket connection timeouts under heavy load"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Select Project</label>
                  <select
                    value={issueProjectId}
                    onChange={(e) => setIssueProjectId(e.target.value)}
                    className="w-full bg-[#121212] border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
                  >
                    <option value="">Choose Project...</option>
                    {projects.map(p => (
                      <option key={p._id} value={p._id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Issue Description</label>
                  <textarea
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="w-full h-32 bg-[#121212] border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 focus:outline-none resize-none font-mono"
                    placeholder="Write detailed logs/explanation..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-zinc-900/60 pt-3">
                <button
                  onClick={() => setShowIssueModal(false)}
                  className="px-3 py-1.5 bg-transparent border border-zinc-900 text-zinc-400 hover:text-white rounded-md text-xs transition"
                >
                  Cancel
                </button>
                <LoadingButton
                  onClick={handleConvertToIssue}
                  isLoading={isLoading}
                  disabled={!issueProjectId || !issueTitle.trim()}
                  loadingText="Converting..."
                  className="px-3 py-1.5 bg-white text-black font-semibold hover:bg-zinc-200 rounded-md text-xs transition disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                  Convert & Link
                </LoadingButton>
              </div>
            </div>
          </div>
        )}

        {/* Post to Discussion Modal */}
        {showDiscussionModal && activeNote && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-[#0A0A0A] border border-zinc-900 rounded-xl shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3">
                <h3 className="text-sm font-semibold text-white">Post to Team Discussion Chat</h3>
                <button onClick={() => setShowDiscussionModal(false)} className="text-zinc-500 hover:text-white">
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-3 text-left">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Select Chat Discussion</label>
                    <select
                      value={selectedChatId}
                      onChange={(e) => setSelectedChatId(e.target.value)}
                      className="w-full bg-[#121212] border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
                    >
                      {discussionChats.length === 0 ? (
                        <option value="">No Active Chats Found</option>
                      ) : (
                        discussionChats.map(c => (
                          <option key={c._id} value={c._id}>
                            {c.type === "private" 
                              ? `DM: ${c.members.filter(m => m._id !== user?._id).map(m => `${m.firstName} ${m.lastName}`).join(", ")}`
                              : `Group: ${c.name || "Unnamed Group"}`}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Share Format</label>
                    <select
                      value={postFormat}
                      onChange={(e) => handlePostFormatChange(e.target.value)}
                      className="w-full bg-[#121212] border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
                    >
                      <option value="full">Full Note Text</option>
                      <option value="summary">AI-generated Shastra Summary</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Message Preview</label>
                  <textarea
                    value={discussionPreviewText}
                    onChange={(e) => setDiscussionPreviewText(e.target.value)}
                    className="w-full h-40 bg-[#121212] border border-zinc-900 rounded-lg p-3 text-xs text-white focus:outline-none resize-none font-mono"
                    placeholder="Content to share..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-zinc-900/60 pt-3">
                <button
                  onClick={() => setShowDiscussionModal(false)}
                  className="px-3 py-1.5 bg-transparent border border-zinc-900 text-zinc-400 hover:text-white rounded-md text-xs transition"
                >
                  Cancel
                </button>
                <LoadingButton
                  onClick={handlePostToDiscussion}
                  isLoading={discussionLoading}
                  disabled={!selectedChatId}
                  loadingText="Posting..."
                  className="px-3 py-1.5 bg-white text-black font-semibold hover:bg-zinc-200 rounded-md text-xs transition disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                  Post Message
                </LoadingButton>
              </div>
            </div>
          </div>
        )}
        {/* Custom Feedback Toast */}
        <FeedbackToast
          message={toastMessage}
          isVisible={isToastVisible}
          onClose={() => setIsToastVisible(false)}
        />

        {/* Input Modal for Folder Creation */}
        <InputModal
          isOpen={isCreateFolderOpen}
          onClose={() => setIsCreateFolderOpen(false)}
          onSubmit={handleCreateFolder}
          title="Create Folder"
          description="Organize your developer knowledge."
          placeholder="Folder name (e.g. Backend Notes)"
          confirmText="Create"
          isLoading={isLoading}
        />

        {/* Input Modal for Folder Rename */}
        <InputModal
          isOpen={isRenameFolderOpen}
          onClose={() => {
            setIsRenameFolderOpen(false);
            setFolderToRename(null);
          }}
          onSubmit={handleRenameFolder}
          defaultValue={folderToRename?.name || ""}
          title="Rename Folder"
          placeholder="Enter new folder name..."
          confirmText="Save"
          isLoading={isLoading}
        />

        {/* Confirm Modal for Folder Delete */}
        <ConfirmModal
          isOpen={isDeleteFolderOpen}
          onClose={() => {
            setIsDeleteFolderOpen(false);
            setFolderToDelete(null);
          }}
          onConfirm={handleDeleteFolder}
          title="Delete Folder?"
          description="Are you sure you want to delete this folder? Notes inside this folder will not be deleted."
          confirmText="Delete"
          isDestructive={true}
          isLoading={isLoading}
        />

        {/* Input Modal for Note Rename */}
        <InputModal
          isOpen={isRenameNoteOpen}
          onClose={() => {
            setIsRenameNoteOpen(false);
            setNoteToRename(null);
          }}
          onSubmit={handleRenameNote}
          defaultValue={noteToRename?.title || ""}
          title="Rename Note"
          placeholder="Enter note title..."
          confirmText="Save"
          isLoading={isLoading}
        />

        {/* Confirm Modal for Permanent Note Deletion */}
        <ConfirmModal
          isOpen={isPermanentDeleteOpen}
          onClose={() => {
            setIsPermanentDeleteOpen(false);
            setNoteToPermanentDelete(null);
          }}
          onConfirm={handlePermanentDeleteConfirm}
          title="Delete Permanently?"
          description="This action cannot be undone. All content, history, and metadata will be permanently erased."
          confirmText="Delete Permanently"
          isDestructive={true}
          isLoading={isLoading}
        />

        {/* Global Error Modal */}
        <Modal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          size="sm"
          closeOnBackdrop={true}
        >
          <div className="p-5 text-left">
            <h3 className="text-sm font-semibold text-white tracking-tight">{errorModalTitle}</h3>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{errorModalMsg}</p>
            <div className="flex justify-end mt-5">
              <button
                type="button"
                onClick={() => setIsErrorModalOpen(false)}
                className="px-3 py-1.5 rounded bg-white hover:bg-zinc-200 text-black text-xs font-semibold border border-white transition duration-150"
              >
                Try Again
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Notes;
