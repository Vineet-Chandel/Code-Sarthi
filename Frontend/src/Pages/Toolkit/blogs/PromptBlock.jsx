import { useState } from "react";
import { Copy, Check, Sparkles, Terminal, FileText, ClipboardCheck } from "lucide-react";

export default function PromptBlock({ label = "The Prompt", text, copyable = true }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [pastedPS, setPastedPS] = useState("");
  const [copiedCombined, setCopiedCombined] = useState(false);

  const handleCopyPrompt = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleCopyCombined = () => {
    if (!text) return;
    const combined = `${text}\n\n=== MY PROBLEM STATEMENT ===\n${pastedPS.trim()}`;
    navigator.clipboard.writeText(combined);
    setCopiedCombined(true);
    setTimeout(() => setCopiedCombined(false), 2500);
  };

  return (
    <div className="my-8 space-y-6">
      {/* ── Main Prompt Card ────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-[#08080B] shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/[0.06] text-white">
              <Terminal size={15} />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest font-extrabold text-white/80">
              {label}
            </span>
          </div>

          {copyable && (
            <button
              type="button"
              onClick={handleCopyPrompt}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                copiedPrompt
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-white/[0.07] hover:bg-white/[0.12] text-white"
              }`}
            >
              {copiedPrompt ? (
                <>
                  <Check size={14} className="animate-in zoom-in" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Verbatim Monospace Content Block */}
        <div className="p-6 sm:p-7 overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <pre className="font-mono text-xs sm:text-sm leading-[1.7] text-white/90 whitespace-pre-wrap break-words selection:bg-white/20">
            {text}
          </pre>
        </div>
      </div>

      {/* ── Mini-Tool: Paste your PS below ───────────────────────────────────── */}
      <div className="rounded-3xl bg-[#08080C] p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none rounded-tr-3xl" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2.5">
              <Sparkles size={16} className="text-white/80" />
              <span>Interactive Prompt Builder: Paste your PS below</span>
            </h4>
            <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
              Skip copying and pasting separately! Paste your raw hackathon problem statement below and copy both the complete analysis prompt and your PS concatenated together in one click.
            </p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <textarea
            value={pastedPS}
            onChange={(e) => setPastedPS(e.target.value)}
            rows={4}
            placeholder="Paste your problem statement title, background description, and deliverable requirements here..."
            className="w-full rounded-2xl bg-[#0F0F14] px-5 py-4 text-xs sm:text-sm text-white placeholder-white/40 font-sans focus:outline-none focus:bg-[#14141C] transition-all resize-y"
          />

          <div className="flex justify-end">
            <button
              type="button"
              disabled={!pastedPS.trim()}
              onClick={handleCopyCombined}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lg ${
                !pastedPS.trim()
                  ? "bg-white/[0.03] text-white/30 cursor-not-allowed"
                  : copiedCombined
                  ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-white/10 hover:bg-white/20 text-white hover:scale-[1.01] active:scale-95"
              }`}
            >
              {copiedCombined ? (
                <>
                  <ClipboardCheck size={16} />
                  <span>Copied Prompt + Your PS!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Combined Prompt + PS</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
