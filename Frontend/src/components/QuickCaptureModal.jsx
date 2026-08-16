import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Sparkles } from "lucide-react";
import LoadingButton from "./Modal/LoadingButton";

const BASE_URL = "/api";

const NOTE_TEMPLATES = {
  blank: {
    name: "Blank Note",
    blocks: [{ id: "b1", type: "paragraph", content: "" }]
  },
  diary: {
    name: "Developer Diary",
    blocks: [
      { id: "b1", type: "heading-2", content: "What I worked on" },
      { id: "b2", type: "paragraph", content: "" },
      { id: "b3", type: "heading-2", content: "What I learned" },
      { id: "b4", type: "paragraph", content: "" },
      { id: "b5", type: "heading-2", content: "What broke & How I fixed it" },
      { id: "b6", type: "paragraph", content: "" }
    ]
  },
  "bug-fix": {
    name: "Bug Fix Log",
    blocks: [
      { id: "b1", type: "heading-2", content: "Problem Description" },
      { id: "b2", type: "paragraph", content: "" },
      { id: "b3", type: "heading-2", content: "Root Cause" },
      { id: "b4", type: "paragraph", content: "" },
      { id: "b5", type: "heading-2", content: "Solution" },
      { id: "b6", type: "paragraph", content: "" }
    ]
  },
  "architecture-decision": {
    name: "Architecture Decision (ADR)",
    blocks: [
      { id: "b1", type: "heading-2", content: "Context" },
      { id: "b2", type: "paragraph", content: "" },
      { id: "b3", type: "heading-2", content: "Decision" },
      { id: "b4", type: "paragraph", content: "" },
      { id: "b5", type: "heading-2", content: "Consequences" },
      { id: "b6", type: "paragraph", content: "" }
    ]
  },
  command: {
    name: "Command Reference",
    blocks: [
      { id: "b1", type: "heading-2", content: "Syntax" },
      { id: "b2", type: "code", content: "", properties: { language: "bash", lineNumbers: true } },
      { id: "b3", type: "heading-2", content: "Purpose & Usage" },
      { id: "b4", type: "paragraph", content: "" }
    ]
  },
  "api-reference": {
    name: "API Reference",
    blocks: [
      { id: "b1", type: "heading-2", content: "Endpoint & Method" },
      { id: "b2", type: "paragraph", content: "" },
      { id: "b3", type: "heading-2", content: "Request Parameters" },
      { id: "b4", type: "paragraph", content: "" },
      { id: "b5", type: "heading-2", content: "Response Body" },
      { id: "b6", type: "code", content: "", properties: { language: "json", lineNumbers: true } }
    ]
  }
};

const QuickCaptureModal = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("blank");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [projects, setProjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setTitle("");
      setContent("");
      setSelectedTemplate("blank");
      setSuccessMsg("");
      setErrorMsg("");
      return;
    }

    // Fetch projects
    const fetchProjects = async () => {
      try {
        const teamsRes = await axios.get(`${BASE_URL}/teams/mine`, { withCredentials: true }).catch(() => ({ data: [] }));
        const userTeams = teamsRes.data || [];
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
        console.error("Failed to load projects for Quick Capture:", err);
      }
    };
    fetchProjects();
  }, [open]);

  // Support Cmd/Ctrl + Enter to capture instantly
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleCapture();
    }
  };

  const handleCapture = async () => {
    if (saving) return;
    setSaving(true);
    setSuccessMsg("");

    try {
      const template = NOTE_TEMPLATES[selectedTemplate];
      const blocks = [...template.blocks];
      
      // Prefill first empty paragraph block with content
      if (content.trim()) {
        const pBlock = blocks.find(b => b.type === "paragraph" && !b.content);
        if (pBlock) {
          pBlock.content = content.trim();
        } else {
          blocks.push({
            id: `b-${Math.random().toString(36).substr(2, 9)}`,
            type: "paragraph",
            content: content.trim()
          });
        }
      }

      await axios.post(
        `${BASE_URL}/notes`,
        {
          title: title.trim() || template.name,
          noteType: selectedTemplate === "blank" ? "note" : selectedTemplate,
          blocks,
          content: blocks.map(b => b.content).join("\n"),
          projectId: selectedProjectId || null
        },
        { withCredentials: true }
      );

      setSuccessMsg("Captured successfully!");
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      console.error("Quick Capture failed:", err);
      setErrorMsg("Failed to capture note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onKeyDown={handleKeyDown}
    >
      <div className="w-full max-w-lg bg-[#0A0A0A] border border-zinc-900 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-900/60 bg-black flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Sparkles size={14} className="text-yellow-500 animate-pulse" />
            <span className="text-sm font-semibold tracking-tight">Quick Capture Note</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900 transition"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 space-y-4">
          {successMsg ? (
            <div className="py-8 text-center text-green-400 font-medium text-sm animate-pulse">
              {successMsg}
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="text-red-500 text-xs text-center font-medium bg-red-950/20 border border-red-900/30 py-2 rounded-lg">
                  {errorMsg}
                </div>
              )}
              {/* Template & Project Metadata */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 text-left">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">
                    Template Type
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full bg-[#121212] border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-800"
                  >
                    <option value="blank">Blank Note</option>
                    <option value="diary">Developer Diary</option>
                    <option value="bug-fix">Bug Fix Log</option>
                    <option value="architecture-decision">Architecture ADR</option>
                    <option value="command">Command Reference</option>
                    <option value="api-reference">API Reference</option>
                  </select>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">
                    Scope Project
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full bg-[#121212] border border-zinc-900 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-zinc-800"
                  >
                    <option value="">Personal (Unsorted)</option>
                    {projects.map((proj) => (
                      <option key={proj._id} value={proj._id}>
                        {proj.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title Field */}
              <div className="space-y-1 text-left">
                <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Note Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. WebSocket Authentication Fix"
                  className="w-full bg-[#121212] border border-zinc-900 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-800"
                  autoFocus
                />
              </div>

              {/* Description/Content Field */}
              <div className="space-y-1 text-left">
                <label className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">
                  Quick Thoughts / Code
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write details or copy-paste logs here..."
                  className="w-full h-28 bg-[#121212] border border-zinc-900 rounded-lg p-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-800 resize-none font-mono"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between text-[10px] text-zinc-600 border-t border-zinc-900/60 pt-3 mt-1">
                <span>Press <kbd className="bg-zinc-900 px-1 py-0.5 rounded text-zinc-500 font-mono">⌘ ↵</kbd> to save</span>
                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 bg-transparent border border-zinc-900 text-zinc-400 hover:text-white rounded-md transition"
                  >
                    Cancel
                  </button>
                  <LoadingButton
                    onClick={handleCapture}
                    isLoading={saving}
                    loadingText="Capturing..."
                    className="px-3 py-1.5 bg-white text-black font-semibold hover:bg-zinc-200 rounded-md transition"
                  >
                    Capture Note
                  </LoadingButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickCaptureModal;
