import { useState, useRef, useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import { Check, Copy } from "lucide-react";

// ─── Custom Monaco theme ──────────────────────────────────────────────────────
// Tuned to #0D0D0F background + blue-500 accent palette (ported from the
// Shiki TextMate theme — token names are Monarch tokens, not TM scopes)
const DEVCHEATS_MONACO_THEME = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment", foreground: "4B5563", fontStyle: "italic" },
    { token: "string", foreground: "86EFAC" },
    { token: "string.escape", foreground: "86EFAC" },
    { token: "number", foreground: "FCA5A5" },
    { token: "keyword", foreground: "60A5FA" },
    { token: "keyword.control", foreground: "60A5FA" },
    { token: "identifier", foreground: "D4D4D8" },
    { token: "type", foreground: "C4B5FD" },
    { token: "type.identifier", foreground: "C4B5FD" },
    { token: "function", foreground: "93C5FD" },
    { token: "variable", foreground: "D4D4D8" },
    { token: "variable.parameter", foreground: "FCD34D", fontStyle: "italic" },
    { token: "delimiter", foreground: "6B7280" },
    { token: "delimiter.bracket", foreground: "6B7280" },
    { token: "tag", foreground: "60A5FA" },
    { token: "attribute.name", foreground: "FCD34D" },
    { token: "attribute.value", foreground: "86EFAC" },
    { token: "annotation", foreground: "C4B5FD" },
    { token: "operator", foreground: "94A3B8" },
  ],
  colors: {
    "editor.background": "#0D0D0F",
    "editor.foreground": "#D4D4D8",
    "editor.lineHighlightBackground": "#0D0D0F",
    "editorLineNumber.foreground": "#3F3F46",
    "editorLineNumber.activeForeground": "#71717A",
    "editor.selectionBackground": "#3B82F633",
    "editor.inactiveSelectionBackground": "#3B82F61A",
    "editorCursor.foreground": "#60A5FA",
    "editorWidget.background": "#0D0D0F",
    "editorGutter.background": "#0D0D0F",
  },
};

// ─── Language alias normalisation ────────────────────────────────────────────
// Monaco has no separate jsx/tsx grammar — the TS language service handles
// JSX inside "javascript"/"typescript" automatically. "bash"/"sh" both map
// to Monaco's built-in "shell" language.
const LANG_ALIASES = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  shell: "shell",
  sh: "shell",
  bash: "shell",
};

export default function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const editorRef = useRef(null);

  const normalizedLang = LANG_ALIASES[language] ?? language;

  // Rough initial height so the layout doesn't jump once Monaco mounts and
  // reports its real content height.
  const estimatedLines = code.split("\n").length;
  const [editorHeight, setEditorHeight] = useState(
    Math.min(Math.max(estimatedLines * 20 + 28, 48), 600)
  );

  const handleBeforeMount = useCallback((monaco) => {
    monaco.editor.defineTheme("devcheats-dark", DEVCHEATS_MONACO_THEME);
  }, []);

  const updateHeight = useCallback((editor) => {
    const contentHeight = Math.min(Math.max(editor.getContentHeight(), 40), 800);
    setEditorHeight(contentHeight);
  }, []);

  const handleMount = useCallback(
    (editor, monaco) => {
      editorRef.current = editor;
      monaco.editor.setTheme("devcheats-dark");
      updateHeight(editor);
      editor.onDidContentSizeChange(() => updateHeight(editor));
      setIsReady(true);
    },
    [updateHeight]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0D0D0F]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <span className="text-[15px] font-medium uppercase tracking-wide text-white/50">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/80"
        >
          {copied ? (
            <>
              <Check size={13} className="text-green-500" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="relative" style={{ height: editorHeight }}>
        <Editor
          value={code}
          language={normalizedLang}
          theme="devcheats-dark"
          height={editorHeight}
          beforeMount={handleBeforeMount}
          onMount={handleMount}
          loading={
            <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed">
              <code className="font-mono text-white/70">{code}</code>
            </pre>
          }
          options={{
            readOnly: true,
            domReadOnly: true,
            minimap: { enabled: false },
            lineNumbers: "off",
            folding: false,
            glyphMargin: false,
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
              alwaysConsumeMouseWheel: false,
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            renderLineHighlight: "none",
            fontSize: 13,
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            lineHeight: 20,
            padding: { top: 14, bottom: 14 },
            contextmenu: false,
            wordWrap: "off",
            automaticLayout: true,
            renderWhitespace: "none",
            guides: { indentation: false },
            fixedOverflowWidgets: true,
          }}
        />
      </div>
    </div>
  );
}