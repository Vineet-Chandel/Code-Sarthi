
// ─── PRIMITIVES (shared across all sections) ─────────────────────────────────

const SEND_ICON = (
    <svg className="rotate-45 shrink-0" width="11" height="11" viewBox="0 0 14 14" fill="none">
        <path d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z" fill="currentColor" />
    </svg>
);

function Tag({ children }) {
    return (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-black shrink-0 whitespace-nowrap">
            {SEND_ICON}{children}
        </span>
    );
}

function MdnLink({ href, label = "MDN Reference" }) {
    return (
        <a href={href} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 text-black hover:brightness-110 transition-all">
            {SEND_ICON}{label}
        </a>
    );
}

function Card({ children, className = "" }) {
    return (
        <div className={`bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 text-white flex flex-col gap-4 ${className}`}>
            {children}
        </div>
    );
}

function CodeBlock({ children }) {
    return (
        <pre className="bg-[#161616] border border-white/10 rounded-xl p-4 font-mono text-[13px] leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {children}
        </pre>
    );
}

function PropTable({ rows }) {
    return (
        <div className="bg-[#161616] border border-white/10 rounded-xl overflow-hidden font-mono text-xs">
            {rows.map(([prop, val, desc], i) => (
                <div key={i}>
                    <div className="flex gap-3 px-4 py-2 items-start">
                        <span className="text-cyan-400 w-40 shrink-0">{prop}</span>
                        <span className="text-amber-300 w-32 shrink-0">{val}</span>
                        <span className="text-gray-400 leading-snug">{desc}</span>
                    </div>
                    {i < rows.length - 1 && <div className="border-t border-white/10" />}
                </div>
            ))}
        </div>
    );
}

// Live demo box
function Demo({ children, className = "" }) {
    return (
        <div className={`border border-white/20 rounded-xl p-4 bg-white/5 text-sm ${className}`}>
            {children}
        </div>
    );
}

// Syntax helpers
const Pr = ({ c }) => <span className="text-cyan-400">{c}</span>;       // property
const Vl = ({ c }) => <span className="text-amber-300">{c}</span>;       // value
const Co = () => <span className="text-white">: </span>;                 // colon
const Sc = () => <span className="text-white">;</span>;                  // semicolon
const Sl = ({ c }) => <span className="text-emerald-400">{c}</span>;    // selector
const Cm = ({ c }) => <span className="text-gray-500">{c}</span>;        // comment
const Br = ({ c }) => <span className="text-yellow-300">{c}</span>;      // brackets/at-rule
const Un = ({ c }) => <span className="text-rose-400">{c}</span>;        // unit/special

function CSSLine({ indent = 0, prop, val, comment }) {
    const pad = "\u00A0".repeat(indent * 2);
    return (
        <div>
            {pad}<Pr>{prop}</Pr><Co /><Vl>{val}</Vl><Sc />{comment && <><span> </span><Cm>{`/* ${comment} */`}</Cm></>}
        </div>
    );
}

function SectionTitle({ children, className = "" }) {
    return (
        <h2 className={`w-full text-center font-black text-4xl md:text-5xl mt-16 mb-6 leading-none tracking-tight text-white ${className}`}>
            {children}
        </h2>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION DATA
// ─────────────────────────────────────────────────────────────────────────────

export const SECTIONS = {

    // ── 1. SELECTORS ──────────────────────────────────────────────────────────
    selectors: {
        title: "CSS SELECTORS",
        cards: [
            {
                tag: "Basic Selectors",
                code: `/* Universal */\n* { box-sizing: border-box; }\n\n/* Type */\nh1 { color: blue; }\n\n/* Class */\n.card { padding: 1rem; }\n\n/* ID */\n#header { background: #000; }\n\n/* Attribute */\n[type="text"] { border: 1px solid; }\n[href^="https"] { color: green; }  /* starts with */\n[href$=".pdf"] { color: red; }    /* ends with */\n[class*="btn"] { cursor: pointer; } /* contains */`,
                demo: (
                    <div className="flex flex-col gap-2 text-xs">
                        <div style={{ color: "blue" }}>h1 — type selector (blue)</div>
                        <div className="demo-card" style={{ padding: "6px 10px", background: "#1e293b", borderRadius: 6 }}>.card — class selector</div>
                        <div style={{ color: "green" }}>a[href^="https"] — attribute starts with</div>
                    </div>
                ),
            },
            {
                tag: "Combinators",
                code: `/* Descendant (space) */\ndiv p { color: gray; }\n\n/* Child (>) */\nul > li { list-style: disc; }\n\n/* Adjacent sibling (+) */\nh1 + p { margin-top: 0; }\n\n/* General sibling (~) */\nh1 ~ p { color: #555; }`,
                demo: (
                    <div className="text-xs flex flex-col gap-1">
                        <div><span className="text-cyan-400">div p</span> — any p inside div (descendant)</div>
                        <div><span className="text-cyan-400">ul {">"} li</span> — direct children only</div>
                        <div><span className="text-cyan-400">h1 + p</span> — immediately after h1</div>
                        <div><span className="text-cyan-400">h1 ~ p</span> — all siblings after h1</div>
                    </div>
                ),
            },
            {
                tag: "Pseudo-classes",
                code: `a:hover    { color: red; }\na:focus    { outline: 2px solid blue; }\na:visited  { color: purple; }\na:active   { opacity: .7; }\n\nli:first-child   { font-weight: bold; }\nli:last-child    { border-bottom: none; }\nli:nth-child(2n) { background: #f0f0f0; } /* even */\nli:nth-child(odd){ background: #fff; }\nli:nth-child(3)  { color: red; }          /* 3rd */\n\ninput:checked    { accent-color: blue; }\ninput:disabled   { opacity: .5; }\ninput:required   { border-color: red; }\ninput:valid      { border-color: green; }\ninput:invalid    { border-color: red; }\ninput:placeholder-shown { opacity: .7; }\n\n:root  { --color: teal; }\n:not(.active) { opacity: .5; }\n:is(h1,h2,h3) { font-family: serif; }`,
                demo: (
                    <div className="flex flex-col gap-2 text-xs">
                        <ul className="list-none p-0 m-0">
                            {["first-child (bold)", "nth-child(2) — highlighted", "last-child"].map((t, i) => (
                                <li key={i} style={{ fontWeight: i === 0 ? "bold" : "normal", background: i === 1 ? "#1e3a5f" : "transparent", padding: "2px 6px", borderRadius: 4 }}>{t}</li>
                            ))}
                        </ul>
                        <input placeholder="focus me — :focus ring" className="border border-white/30 bg-transparent rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white w-full" />
                    </div>
                ),
            },
            {
                tag: "Pseudo-elements",
                code: `p::before {\n  content: "→ ";\n  color: teal;\n}\n\np::after {\n  content: " ←";\n  color: coral;\n}\n\np::first-letter {\n  font-size: 2em;\n  float: left;\n}\n\np::first-line {\n  font-weight: bold;\n}\n\n::selection {\n  background: yellow;\n  color: black;\n}\n\n::placeholder {\n  color: #aaa;\n  font-style: italic;\n}`,
                demo: (
                    <div className="flex flex-col gap-3 text-xs">
                        <p style={{ margin: 0 }}><span style={{ color: "teal" }}>→ </span>This paragraph has ::before and ::after<span style={{ color: "coral" }}> ←</span></p>
                        <p style={{ margin: 0 }}><span style={{ fontSize: "1.8em", float: "left", lineHeight: 1, marginRight: 3, color: "#facc15" }}>D</span>rop cap via ::first-letter</p>
                        <input placeholder="styled placeholder…" className="border border-white/20 bg-transparent rounded px-2 py-1 text-white placeholder-gray-400 italic w-full focus:outline-none" />
                    </div>
                ),
            },
        ],
    },

    // ── 2. BOX MODEL ──────────────────────────────────────────────────────────
    boxModel: {
        title: "BOX MODEL",
        cards: [
            {
                tag: "Width & Height",
                code: `/* Fixed */\nwidth: 300px;\nheight: 200px;\n\n/* Min / Max */\nmin-width: 100px;\nmax-width: 800px;\nmin-height: 50px;\nmax-height: 600px;\n\n/* Percentage */\nwidth: 100%;\nheight: 50vh;\n\n/* Content sizing */\nwidth: fit-content;\nwidth: min-content;\nwidth: max-content;\n\n/* Aspect ratio */\naspect-ratio: 16 / 9;\naspect-ratio: 1;       /* square */`,
                demo: (
                    <div className="flex flex-col gap-2 text-xs">
                        <div style={{ width: "100%", height: 40, background: "#1e40af", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>width: 100%</div>
                        <div style={{ width: "fit-content", height: 28, background: "#065f46", borderRadius: 6, padding: "0 12px", display: "flex", alignItems: "center" }}>width: fit-content</div>
                        <div style={{ aspectRatio: "16/9", background: "#7c2d12", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>aspect-ratio: 16/9</div>
                    </div>
                ),
            },
            {
                tag: "Margin & Padding",
                code: `/* Shorthand: top right bottom left */\nmargin: 10px 20px 10px 20px;\npadding: 10px 20px;         /* top/bottom left/right */\npadding: 10px;              /* all sides */\n\n/* Individual sides */\nmargin-top: 10px;\nmargin-right: auto;         /* centering trick */\nmargin-left: auto;\npadding-inline: 1rem;       /* logical: left + right */\npadding-block: 0.5rem;      /* logical: top + bottom */\n\n/* Margin collapsing note */\n/* Vertical margins collapse — use padding or flex/grid to avoid */`,
                demo: (
                    <div className="text-xs flex flex-col gap-2">
                        <div style={{ background: "#374151", borderRadius: 6, padding: 4 }}>
                            <div style={{ background: "#1d4ed8", margin: "8px 16px", padding: "8px 12px", borderRadius: 4 }}>
                                margin: 8px 16px · padding: 8px 12px
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ margin: "0 auto", background: "#065f46", padding: "6px 16px", borderRadius: 6 }}>margin: 0 auto → centered</div>
                        </div>
                    </div>
                ),
            },
            {
                tag: "Border",
                code: `/* Shorthand */\nborder: 2px solid #333;\nborder: 1px dashed red;\nborder: 3px dotted teal;\n\n/* Individual */\nborder-top: 4px solid blue;\nborder-right: none;\nborder-color: red green blue yellow;\nborder-width: 1px 2px 3px 4px;\nborder-style: solid dashed dotted double;\n\n/* Radius */\nborder-radius: 8px;\nborder-radius: 50%;           /* circle */\nborder-radius: 10px 20px 30px 40px;\nborder-top-left-radius: 1rem;\n\n/* Image */\nborder-image: linear-gradient(red,blue) 1;`,
                demo: (
                    <div className="flex flex-wrap gap-2 text-xs">
                        {[
                            { style: { border: "2px solid #60a5fa", padding: "4px 10px", borderRadius: 4 }, label: "solid" },
                            { style: { border: "2px dashed #f87171", padding: "4px 10px", borderRadius: 4 }, label: "dashed" },
                            { style: { border: "2px dotted #34d399", padding: "4px 10px", borderRadius: 4 }, label: "dotted" },
                            { style: { border: "2px solid #a78bfa", padding: "4px 10px", borderRadius: "50%" }, label: "circle" },
                            { style: { border: "3px solid transparent", borderImage: "linear-gradient(90deg,#f59e0b,#ec4899) 1", padding: "4px 10px" }, label: "gradient" },
                        ].map(({ style, label }) => (
                            <div key={label} style={style}>{label}</div>
                        ))}
                    </div>
                ),
            },
            {
                tag: "Box Sizing & Overflow",
                code: `/* Box sizing */\nbox-sizing: content-box; /* default: padding adds to size */\nbox-sizing: border-box;  /* padding included in size */\n\n/* Overflow */\noverflow: visible;   /* default — content spills out */\noverflow: hidden;    /* clip content */\noverflow: scroll;    /* always show scrollbar */\noverflow: auto;      /* scrollbar when needed */\noverflow-x: hidden;\noverflow-y: auto;\n\n/* Text overflow */\nwhite-space: nowrap;\noverflow: hidden;\ntext-overflow: ellipsis;   /* "..." */\ntext-overflow: clip;`,
                demo: (
                    <div className="flex flex-col gap-3 text-xs">
                        <div style={{ width: "100%", height: 50, overflow: "hidden", background: "#1e293b", borderRadius: 6, padding: 8 }}>
                            overflow: hidden — this text is very long and will be clipped when it exceeds the container width without showing a scrollbar or wrapping beyond the box boundary set here
                        </div>
                        <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", background: "#1e293b", borderRadius: 6, padding: 8 }}>
                            text-overflow: ellipsis — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        </div>
                    </div>
                ),
            },
            {
                tag: "Outline & Box Shadow",
                code: `/* Outline (doesn't affect layout) */\noutline: 2px solid blue;\noutline-offset: 4px;\noutline: none;   /* remove focus ring — bad for a11y! */\n\n/* Box shadow */\nbox-shadow: 2px 4px 8px rgba(0,0,0,0.3);\nbox-shadow: 0 0 20px cyan;              /* glow */\nbox-shadow: inset 0 2px 4px #000;       /* inner shadow */\n\n/* Multiple shadows */\nbox-shadow:\n  0 1px 3px rgba(0,0,0,.12),\n  0 4px 6px rgba(0,0,0,.08),\n  0 20px 40px rgba(0,0,0,.15);`,
                demo: (
                    <div className="flex flex-wrap gap-3 text-xs">
                        {[
                            { style: { boxShadow: "2px 4px 12px rgba(0,0,0,.6)", background: "#1e293b", padding: "8px 14px", borderRadius: 8 }, label: "drop shadow" },
                            { style: { boxShadow: "0 0 16px 4px cyan", background: "#0f172a", padding: "8px 14px", borderRadius: 8, color: "cyan" }, label: "glow" },
                            { style: { boxShadow: "inset 0 3px 8px rgba(0,0,0,.7)", background: "#374151", padding: "8px 14px", borderRadius: 8 }, label: "inset" },
                        ].map(({ style, label }) => <div key={label} style={style}>{label}</div>)}
                    </div>
                ),
            },
        ],
    },

    // ── 3. TYPOGRAPHY ─────────────────────────────────────────────────────────
    typography: {
        title: "TYPOGRAPHY",
        cards: [
            {
                tag: "Font Properties",
                code: `font-family: 'Georgia', serif;\nfont-family: system-ui, sans-serif;\n\nfont-size: 16px;\nfont-size: 1.5rem;    /* relative to root */\nfont-size: 1.2em;     /* relative to parent */\nfont-size: clamp(14px, 2vw, 18px); /* responsive */\n\nfont-weight: 100;   /* Thin */\nfont-weight: 400;   /* Normal */\nfont-weight: 700;   /* Bold */\nfont-weight: 900;   /* Black */\nfont-weight: bold;\n\nfont-style: normal | italic | oblique;\n\nfont-variant: small-caps;\n\nfont-stretch: condensed | expanded;\n\n/* Shorthand */\nfont: italic bold 1.2rem/1.6 'Georgia', serif;`,
                demo: (
                    <div className="flex flex-col gap-1">
                        {[100, 300, 400, 600, 700, 900].map(w => (
                            <div key={w} style={{ fontWeight: w, fontSize: 13 }}>font-weight: {w} — The quick brown fox</div>
                        ))}
                        <div style={{ fontStyle: "italic", fontSize: 13 }}>font-style: italic</div>
                        <div style={{ fontVariant: "small-caps", fontSize: 13 }}>font-variant: small-caps</div>
                    </div>
                ),
            },
            {
                tag: "Text Properties",
                code: `text-align: left | center | right | justify;\ntext-align: start | end;  /* logical */\n\ntext-decoration: underline;\ntext-decoration: line-through;\ntext-decoration: none;\ntext-decoration: underline wavy red;\ntext-underline-offset: 4px;\n\ntext-transform: uppercase | lowercase | capitalize;\n\ntext-indent: 2em;\n\ntext-shadow: 2px 2px 4px rgba(0,0,0,.5);\ntext-shadow: 0 0 10px cyan; /* glow */\n\nletter-spacing: 0.05em;\nletter-spacing: -0.02em;  /* tight tracking */\n\nword-spacing: 0.2em;\n\nline-height: 1.6;\nline-height: 2rem;`,
                demo: (
                    <div className="flex flex-col gap-2 text-xs">
                        <div style={{ textAlign: "center" }}>text-align: center</div>
                        <div style={{ textDecoration: "underline wavy #f87171", textUnderlineOffset: 4 }}>text-decoration: underline wavy red</div>
                        <div style={{ textTransform: "uppercase", letterSpacing: "0.15em" }}>text-transform: uppercase + letter-spacing</div>
                        <div style={{ textShadow: "0 0 8px cyan, 0 0 20px cyan" }}>text-shadow glow effect</div>
                        <div style={{ letterSpacing: "-0.04em", fontSize: 16, fontWeight: 700 }}>Tight tracking -0.04em headlines</div>
                    </div>
                ),
            },
            {
                tag: "White Space & Word Break",
                code: `white-space: normal;    /* wrap (default) */\nwhite-space: nowrap;    /* prevent wrapping */\nwhite-space: pre;       /* preserve whitespace */\nwhite-space: pre-wrap;  /* preserve + wrap */\nwhite-space: pre-line;  /* collapse spaces, keep newlines */\n\nword-break: normal;\nword-break: break-all;  /* break anywhere */\nword-break: keep-all;   /* CJK text */\n\noverflow-wrap: normal;\noverflow-wrap: break-word;  /* break long words */\noverflow-wrap: anywhere;\n\nhyphens: none | manual | auto;`,
                demo: (
                    <div className="flex flex-col gap-2 text-xs">
                        <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", background: "#1e293b", padding: "4px 8px", borderRadius: 4 }}>
                            white-space: nowrap — this text will never wrap no matter how long it is
                        </div>
                        <div style={{ wordBreak: "break-all", background: "#1e293b", padding: "4px 8px", borderRadius: 4, width: "60%" }}>
                            break-all: superlongwordwithoutspacesthatwouldnormallybreaklayout
                        </div>
                    </div>
                ),
            },
            {
                tag: "CSS Custom Fonts & @font-face",
                code: `@font-face {\n  font-family: 'MyFont';\n  src: url('font.woff2') format('woff2'),\n       url('font.woff') format('woff');\n  font-weight: 400;\n  font-display: swap; /* prevent FOIT */\n}\n\n/* Google Fonts */\n@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');\n\nbody {\n  font-family: 'Playfair Display', serif;\n}`,
                demo: (
                    <div className="text-xs flex flex-col gap-1 text-gray-300">
                        <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700 }}>Georgia — drop-in serif example</div>
                        <div style={{ fontFamily: "Courier New, monospace" }}>Courier New — monospace for code</div>
                        <div className="text-gray-500 mt-1">font-display: swap prevents invisible text during font load</div>
                    </div>
                ),
            },
        ],
    },

    // ── 4. COLORS & BACKGROUNDS ───────────────────────────────────────────────
    colors: {
        title: "COLORS & BACKGROUNDS",
        cards: [
            {
                tag: "Color Values",
                code: `/* Named */\ncolor: red;\ncolor: transparent;\n\n/* Hex */\ncolor: #ff0000;    /* full */\ncolor: #f00;       /* shorthand */\ncolor: #ff000080;  /* with alpha */\n\n/* RGB / RGBA */\ncolor: rgb(255, 0, 0);\ncolor: rgba(255, 0, 0, 0.5);\ncolor: rgb(255 0 0 / 50%);   /* modern */\n\n/* HSL / HSLA */\ncolor: hsl(0, 100%, 50%);\ncolor: hsla(120, 60%, 50%, .8);\ncolor: hsl(200deg 80% 60% / .9);\n\n/* HWB */\ncolor: hwb(200 30% 0%);\n\n/* oklch (modern, perceptual) */\ncolor: oklch(70% 0.2 140);\n\n/* CSS Variables */\n:root { --accent: #0ea5e9; }\ncolor: var(--accent);`,
                demo: (
                    <div className="flex flex-wrap gap-2 text-xs">
                        {[
                            { bg: "#ef4444", label: "#ef4444" },
                            { bg: "rgb(34 197 94)", label: "rgb()" },
                            { bg: "hsl(270 80% 60%)", label: "hsl()" },
                            { bg: "rgba(251,191,36,0.7)", label: "rgba 70%" },
                            { bg: "oklch(70% 0.2 220)", label: "oklch()" },
                        ].map(({ bg, label }) => (
                            <div key={label} style={{ background: bg, padding: "6px 12px", borderRadius: 6, color: "#fff", textShadow: "0 1px 2px #000" }}>{label}</div>
                        ))}
                    </div>
                ),
            },
            {
                tag: "Background",
                code: `/* Color */\nbackground-color: #1a1a2e;\nbackground-color: transparent;\n\n/* Image */\nbackground-image: url('bg.jpg');\nbackground-image: linear-gradient(135deg, #667eea, #764ba2);\nbackground-image: radial-gradient(circle, cyan, blue);\nbackground-image: conic-gradient(red, yellow, green, red);\n\n/* Multiple backgrounds */\nbackground-image: url('star.png'), linear-gradient(#000,#111);\n\n/* Position */\nbackground-position: center;\nbackground-position: 50% 50%;\nbackground-position: top right;\n\n/* Size */\nbackground-size: cover;    /* fill, crop */\nbackground-size: contain;  /* fit, no crop */\nbackground-size: 200px 100px;\nbackground-size: 50%;\n\n/* Repeat */\nbackground-repeat: no-repeat;\nbackground-repeat: repeat-x;\nbackground-repeat: space | round;\n\n/* Other */\nbackground-attachment: fixed;  /* parallax */\nbackground-origin: border-box | padding-box | content-box;\nbackground-clip: text;         /* clip to text! */\n\n/* Shorthand */\nbackground: #111 url('bg.jpg') no-repeat center/cover;`,
                demo: (
                    <div className="flex flex-col gap-3 text-xs">
                        <div style={{ background: "linear-gradient(135deg,#667eea,#764ba2)", padding: "10px 14px", borderRadius: 8, fontWeight: 600 }}>linear-gradient(135deg)</div>
                        <div style={{ background: "radial-gradient(circle at 30% 50%, #06b6d4, #1e1b4b)", padding: "10px 14px", borderRadius: 8 }}>radial-gradient(circle)</div>
                        <div style={{ background: "conic-gradient(#f59e0b, #ef4444, #8b5cf6, #06b6d4, #f59e0b)", padding: "10px 14px", borderRadius: 8 }}>conic-gradient()</div>
                        <div style={{ backgroundImage: "linear-gradient(90deg,#0ea5e9,#e879f9)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", fontSize: 18, fontWeight: 900 }}>background-clip: text</div>
                    </div>
                ),
            },
            {
                tag: "Opacity & Mix Blend Mode",
                code: `/* Element opacity */\nopacity: 1;     /* fully visible */\nopacity: 0.5;   /* 50% */\nopacity: 0;     /* invisible (still in DOM) */\n\n/* Mix blend mode (how element blends with bg) */\nmix-blend-mode: normal;\nmix-blend-mode: multiply;\nmix-blend-mode: screen;\nmix-blend-mode: overlay;\nmix-blend-mode: darken | lighten;\nmix-blend-mode: color-dodge | color-burn;\nmix-blend-mode: hard-light | soft-light;\nmix-blend-mode: difference;\nmix-blend-mode: exclusion;\nmix-blend-mode: hue | saturation | color | luminosity;\n\n/* Background blend */\nbackground-blend-mode: multiply;`,
                demo: (
                    <div className="flex gap-3 text-xs flex-wrap">
                        {["normal", "multiply", "screen", "overlay", "difference"].map(m => (
                            <div key={m} style={{ position: "relative", width: 60, height: 60, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,.2)" }}>
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(#ef4444,#3b82f6)" }} />
                                <div style={{ position: "absolute", inset: 0, background: "#f59e0b", mixBlendMode: m }} />
                                <div style={{ position: "absolute", bottom: 2, left: 0, right: 0, textAlign: "center", fontSize: 9, color: "#fff", textShadow: "0 1px 2px #000" }}>{m}</div>
                            </div>
                        ))}
                    </div>
                ),
            },
            {
                tag: "CSS Filters",
                code: `filter: blur(4px);\nfilter: brightness(1.5);   /* 0=black, 1=normal, 2=double */\nfilter: contrast(2);\nfilter: grayscale(100%);\nfilter: hue-rotate(90deg);\nfilter: invert(100%);\nfilter: opacity(0.5);\nfilter: saturate(2);\nfilter: sepia(80%);\nfilter: drop-shadow(2px 4px 8px black);\n\n/* Combine */\nfilter: brightness(1.2) contrast(1.1) saturate(1.3);\n\n/* Backdrop filter (blur behind element) */\nbackdrop-filter: blur(10px) brightness(.9);\nbackdrop-filter: saturate(180%) blur(20px);`,
                demo: (
                    <div className="flex flex-wrap gap-2 text-xs">
                        {[
                            { filter: "blur(2px)", label: "blur" },
                            { filter: "brightness(2)", label: "bright" },
                            { filter: "grayscale(1)", label: "gray" },
                            { filter: "hue-rotate(90deg)", label: "hue" },
                            { filter: "invert(1)", label: "invert" },
                            { filter: "sepia(1)", label: "sepia" },
                        ].map(({ filter, label }) => (
                            <div key={label} style={{ background: "linear-gradient(135deg,#0ea5e9,#ec4899)", filter, padding: "6px 10px", borderRadius: 6, fontSize: 10 }}>{label}</div>
                        ))}
                    </div>
                ),
            },
        ],
    },

    // ── 5. DISPLAY & POSITIONING ──────────────────────────────────────────────
    display: {
        title: "DISPLAY & POSITIONING",
        cards: [
            {
                tag: "Display Values",
                code: `display: block;          /* full width, stacks */\ndisplay: inline;         /* flows with text */\ndisplay: inline-block;   /* inline but box model */\ndisplay: none;           /* removed from layout */\ndisplay: flex;           /* flexbox container */\ndisplay: inline-flex;\ndisplay: grid;           /* grid container */\ndisplay: inline-grid;\ndisplay: table;\ndisplay: table-cell;\ndisplay: list-item;\ndisplay: contents;       /* disappears, children remain */\n\n/* Visibility (space preserved) */\nvisibility: visible | hidden | collapse;`,
                demo: (
                    <div className="flex flex-col gap-2 text-xs">
                        <div style={{ display: "block", background: "#1e40af", padding: "4px 8px", borderRadius: 4 }}>display: block — full width</div>
                        <div>
                            <span style={{ display: "inline", background: "#065f46", padding: "2px 6px", borderRadius: 4 }}>inline</span>
                            <span style={{ display: "inline-block", background: "#7c2d12", padding: "4px 10px", borderRadius: 4, marginLeft: 4, verticalAlign: "middle" }}>inline-block</span>
                            <span style={{ display: "inline", background: "#4c1d95", padding: "2px 6px", borderRadius: 4, marginLeft: 4 }}>inline</span>
                        </div>
                    </div>
                ),
            },
            {
                tag: "Position",
                code: `/* Static (default — normal flow) */\nposition: static;\n\n/* Relative — offset from normal position */\nposition: relative;\ntop: 10px;\nleft: 20px;\n\n/* Absolute — relative to nearest positioned ancestor */\nposition: absolute;\ntop: 0;\nright: 0;\nbottom: 0;\nleft: 0;\n\n/* Fixed — relative to viewport */\nposition: fixed;\ntop: 0;\nwidth: 100%;\n\n/* Sticky — scrolls until threshold */\nposition: sticky;\ntop: 80px;   /* sticks when 80px from top */\n\n/* Z-index (stacking order) */\nz-index: 1;\nz-index: 100;\nz-index: -1;      /* behind normal flow */\nz-index: auto;`,
                demo: (
                    <div className="relative text-xs" style={{ height: 90, background: "#1e293b", borderRadius: 8, overflow: "hidden" }}>
                        <div style={{ background: "#1d4ed8", padding: "4px 8px", borderRadius: 4, position: "absolute", top: 8, left: 8 }}>absolute top:8 left:8</div>
                        <div style={{ background: "#065f46", padding: "4px 8px", borderRadius: 4, position: "absolute", bottom: 8, right: 8 }}>absolute bottom:8 right:8</div>
                        <div style={{ background: "#7c2d12", padding: "4px 8px", borderRadius: 4, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>absolute centered</div>
                    </div>
                ),
            },
            {
                tag: "Float & Clear (legacy)",
                code: `float: left;\nfloat: right;\nfloat: none;\n\n/* Clear floats */\nclear: left;\nclear: right;\nclear: both;\n\n/* Clearfix hack */\n.clearfix::after {\n  content: "";\n  display: block;\n  clear: both;\n}\n\n/* Modern replacement: use flex/grid instead */`,
                demo: (
                    <div className="text-xs" style={{ background: "#1e293b", padding: 8, borderRadius: 8, overflow: "auto" }}>
                        <div style={{ float: "left", background: "#1d4ed8", padding: "6px 10px", borderRadius: 4, marginRight: 8 }}>float: left</div>
                        <div style={{ float: "right", background: "#065f46", padding: "6px 10px", borderRadius: 4 }}>float: right</div>
                        <div style={{ clear: "both", background: "#374151", padding: "4px 8px", borderRadius: 4, marginTop: 8 }}>clear: both — below floats</div>
                    </div>
                ),
            },
            {
                tag: "Object Fit & Object Position",
                code: `/* For replaced elements: img, video */\nobject-fit: fill;      /* stretch (default) */\nobject-fit: contain;   /* fit inside, letterbox */\nobject-fit: cover;     /* fill, crop edges */\nobject-fit: none;      /* natural size */\nobject-fit: scale-down;\n\nobject-position: center;    /* default */\nobject-position: top left;\nobject-position: 25% 75%;`,
                demo: (
                    <div className="flex gap-3 text-xs flex-wrap">
                        {["fill", "contain", "cover"].map(fit => (
                            <div key={fit} className="flex flex-col items-center gap-1">
                                <div style={{ width: 70, height: 50, border: "1px solid rgba(255,255,255,.3)", borderRadius: 4, overflow: "hidden", background: "#0f172a" }}>
                                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0ea5e9 50%,#ec4899)", objectFit: fit }} />
                                </div>
                                <span>{fit}</span>
                            </div>
                        ))}
                    </div>
                ),
            },
        ],
    },
};
// ── 6. FLEXBOX ────────────────────────────────────────────────────────────

export const FLEX_SECTION = {
    title: "FLEXBOX",
    cards: [
        {
            tag: "Flex Container",
            code: `display: flex;\n\n/* Direction */\nflex-direction: row;            /* default → */\nflex-direction: row-reverse;    /* ← */\nflex-direction: column;         /* ↓ */\nflex-direction: column-reverse; /* ↑ */\n\n/* Wrapping */\nflex-wrap: nowrap;   /* default */\nflex-wrap: wrap;     /* items wrap to next line */\nflex-wrap: wrap-reverse;\n\n/* Shorthand */\nflex-flow: row wrap;\n\n/* Main axis alignment */\njustify-content: flex-start;    /* default */\njustify-content: flex-end;\njustify-content: center;\njustify-content: space-between; /* gaps between */\njustify-content: space-around;  /* gaps around */\njustify-content: space-evenly;  /* equal gaps */\n\n/* Cross axis alignment */\nalign-items: stretch;      /* default */\nalign-items: flex-start;\nalign-items: flex-end;\nalign-items: center;\nalign-items: baseline;\n\n/* Multi-line cross axis */\nalign-content: flex-start | center | space-between;\n\n/* Gap */\ngap: 16px;\ngap: 10px 20px;    /* row-gap column-gap */\nrow-gap: 10px;\ncolumn-gap: 20px;`,
            demo: (
                <div className="flex flex-col gap-3 text-xs">
                    {[
                        { justify: "flex-start", label: "justify: flex-start" },
                        { justify: "center", label: "justify: center" },
                        { justify: "space-between", label: "justify: space-between" },
                        { justify: "space-evenly", label: "justify: space-evenly" },
                    ].map(({ justify, label }) => (
                        <div key={label}>
                            <div className="text-gray-400 mb-1">{label}</div>
                            <div style={{ display: "flex", justifyContent: justify, gap: 4, background: "#1e293b", padding: 6, borderRadius: 6 }}>
                                {[1, 2, 3].map(n => <div key={n} style={{ background: "#0ea5e9", padding: "4px 10px", borderRadius: 4 }}>{n}</div>)}
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            tag: "Flex Items",
            code: `/* Flex grow — how much to expand */\nflex-grow: 0;    /* default — don't grow */\nflex-grow: 1;    /* take available space */\nflex-grow: 2;    /* take 2x the space of grow:1 */\n\n/* Flex shrink — how much to compress */\nflex-shrink: 1;  /* default — shrink equally */\nflex-shrink: 0;  /* don't shrink */\n\n/* Flex basis — initial size before grow/shrink */\nflex-basis: auto;   /* use width/height */\nflex-basis: 200px;\nflex-basis: 30%;\nflex-basis: 0;      /* start from nothing */\n\n/* Shorthand: grow shrink basis */\nflex: 1;          /* flex: 1 1 0 */\nflex: auto;       /* flex: 1 1 auto */\nflex: none;       /* flex: 0 0 auto */\nflex: 1 1 200px;\n\n/* Self alignment (override align-items) */\nalign-self: auto | flex-start | flex-end | center | stretch;\n\n/* Order (default 0, lower = earlier) */\norder: -1;   /* move to start */\norder: 0;    /* default */\norder: 1;    /* move to end */`,
            demo: (
                <div className="flex flex-col gap-3 text-xs">
                    <div>
                        <div className="text-gray-400 mb-1">flex: 1 on all — equal widths</div>
                        <div style={{ display: "flex", gap: 4 }}>
                            {["A", "B", "C"].map(l => <div key={l} style={{ flex: 1, background: "#7c3aed", padding: "6px 0", textAlign: "center", borderRadius: 4 }}>{l}</div>)}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 mb-1">flex-grow: 2 on middle</div>
                        <div style={{ display: "flex", gap: 4 }}>
                            <div style={{ flex: 1, background: "#1d4ed8", padding: "6px 0", textAlign: "center", borderRadius: 4 }}>1</div>
                            <div style={{ flex: 2, background: "#0f766e", padding: "6px 0", textAlign: "center", borderRadius: 4 }}>2 (grows 2x)</div>
                            <div style={{ flex: 1, background: "#1d4ed8", padding: "6px 0", textAlign: "center", borderRadius: 4 }}>1</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 mb-1">align-self per item</div>
                        <div style={{ display: "flex", gap: 4, height: 60, alignItems: "stretch" }}>
                            {[["start", "flex-start"], ["center", "center"], ["end", "flex-end"], ["stretch", "stretch"]].map(([l, v]) => (
                                <div key={l} style={{ flex: 1, alignSelf: v, background: "#b45309", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{l}</div>
                            ))}
                        </div>
                    </div>
                </div>
            ),
        },
    ],
};

// ── 7. CSS GRID ────────────────────────────────────────────────────────────

export const GRID_SECTION = {
    title: "CSS GRID",
    cards: [
        {
            tag: "Grid Container",
            code: `display: grid;\n\n/* Define columns */\ngrid-template-columns: 200px 200px 200px;\ngrid-template-columns: 1fr 1fr 1fr;      /* equal fractions */\ngrid-template-columns: repeat(3, 1fr);\ngrid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* responsive! */\ngrid-template-columns: 1fr 2fr 1fr;      /* sidebar layout */\ngrid-template-columns: 200px auto 200px; /* fixed + fluid */\n\n/* Define rows */\ngrid-template-rows: 100px auto 100px;\ngrid-template-rows: repeat(3, minmax(100px, auto));\n\n/* Gap */\ngap: 16px;\ncolumn-gap: 24px;\nrow-gap: 16px;\n\n/* Named template areas */\ngrid-template-areas:\n  "header header header"\n  "sidebar main main"\n  "footer footer footer";\n\n/* Alignment */\njustify-items: start | end | center | stretch;\nalign-items: start | end | center | stretch;\njustify-content: start | end | center | space-between;\nalign-content: start | end | center | space-between;`,
            demo: (
                <div className="flex flex-col gap-3 text-xs">
                    <div>
                        <div className="text-gray-400 mb-1">repeat(3, 1fr) grid</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                            {[1, 2, 3, 4, 5, 6].map(n => <div key={n} style={{ background: "#1d4ed8", padding: "10px 0", textAlign: "center", borderRadius: 4 }}>{n}</div>)}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 mb-1">Named template areas</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gridTemplateRows: "30px 60px 24px", gridTemplateAreas: '"h h" "s m" "f f"', gap: 4 }}>
                            <div style={{ gridArea: "h", background: "#0f766e", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>header</div>
                            <div style={{ gridArea: "s", background: "#1d4ed8", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>sidebar</div>
                            <div style={{ gridArea: "m", background: "#7c3aed", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>main</div>
                            <div style={{ gridArea: "f", background: "#374151", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>footer</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            tag: "Grid Items — Placement",
            code: `/* Column/row placement */\ngrid-column: 1 / 3;         /* span from line 1 to 3 */\ngrid-column: 1 / span 2;    /* span 2 columns */\ngrid-column: span 2;        /* span 2 from current */\ngrid-column: 1 / -1;        /* full width */\n\ngrid-row: 1 / 3;\ngrid-row: span 2;\n\n/* Shorthand: row-start / col-start / row-end / col-end */\ngrid-area: 1 / 1 / 3 / 4;\n\n/* Named area */\ngrid-area: header;\ngrid-area: sidebar;\n\n/* Self alignment */\njustify-self: start | end | center | stretch;\nalign-self: start | end | center | stretch;\n\n/* Auto placement */\ngrid-auto-flow: row;     /* default */\ngrid-auto-flow: column;\ngrid-auto-flow: dense;   /* fill holes */`,
            demo: (
                <div className="text-xs">
                    <div className="text-gray-400 mb-1">grid-column: 1 / -1 (full row) + column spans</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }}>
                        <div style={{ gridColumn: "1 / -1", background: "#0f766e", padding: "6px 0", textAlign: "center", borderRadius: 4 }}>full row (1 / -1)</div>
                        <div style={{ gridColumn: "span 2", background: "#1d4ed8", padding: "6px 0", textAlign: "center", borderRadius: 4 }}>span 2</div>
                        <div style={{ background: "#7c3aed", padding: "6px 0", textAlign: "center", borderRadius: 4 }}>1</div>
                        <div style={{ background: "#7c3aed", padding: "6px 0", textAlign: "center", borderRadius: 4 }}>1</div>
                    </div>
                </div>
            ),
        },
    ],
};

// ── 8. TRANSFORMS ─────────────────────────────────────────────────────────

export const TRANSFORM_SECTION = {
    title: "TRANSFORMS",
    cards: [
        {
            tag: "2D Transforms",
            code: `transform: translate(50px, 20px);\ntransform: translateX(100%);\ntransform: translateY(-50px);\n\ntransform: scale(1.5);         /* uniform */\ntransform: scale(2, 0.5);      /* x and y */\ntransform: scaleX(2);\ntransform: scaleY(0.5);\n\ntransform: rotate(45deg);\ntransform: rotate(-0.25turn);\n\ntransform: skew(15deg, 10deg);\ntransform: skewX(20deg);\ntransform: skewY(10deg);\n\n/* Multiple transforms */\ntransform: translateX(50px) rotate(45deg) scale(1.2);\n\n/* Transform origin */\ntransform-origin: center;      /* default */\ntransform-origin: top left;\ntransform-origin: 50% 50%;\ntransform-origin: 0 0;`,
            demo: (
                <div className="flex flex-wrap gap-6 text-xs">
                    {[
                        { transform: "translate(8px,-8px)", label: "translate" },
                        { transform: "scale(1.3)", label: "scale" },
                        { transform: "rotate(30deg)", label: "rotate" },
                        { transform: "skew(15deg,5deg)", label: "skew" },
                        { transform: "translateX(8px) rotate(15deg) scale(1.1)", label: "combined" },
                    ].map(({ transform, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <div style={{ transform, background: "#0ea5e9", width: 44, height: 44, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>{label}</div>
                            <span className="text-gray-400">{label}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            tag: "3D Transforms & Perspective",
            code: `/* Perspective (on parent) */\nperspective: 800px;\nperspective-origin: 50% 50%;\n\n/* 3D on element */\ntransform: perspective(800px) rotateX(45deg);\ntransform: perspective(800px) rotateY(45deg);\ntransform: perspective(800px) rotateZ(45deg);\ntransform: perspective(800px) rotate3d(1,1,0,45deg);\ntransform: translateZ(50px);\ntransform: scale3d(1.2, 1.2, 1.2);\n\n/* 3D space */\ntransform-style: flat;       /* default */\ntransform-style: preserve-3d;\n\n/* Backface */\nbackface-visibility: visible;  /* default */\nbackface-visibility: hidden;   /* hide when rotated away */\n\n/* will-change (GPU hint) */\nwill-change: transform;\nwill-change: transform, opacity;`,
            demo: (
                <div className="flex gap-6 text-xs items-center">
                    {[
                        { transform: "perspective(300px) rotateX(30deg)", label: "rotateX" },
                        { transform: "perspective(300px) rotateY(30deg)", label: "rotateY" },
                    ].map(({ transform, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <div style={{ transform, background: "linear-gradient(135deg,#0ea5e9,#8b5cf6)", width: 60, height: 60, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, transformOrigin: "center" }}>{label}</div>
                            <span className="text-gray-400">{label}</span>
                        </div>
                    ))}
                    <div className="text-gray-400 text-xs max-w-xs">Use <span className="text-cyan-400">perspective()</span> on parent or in transform. <span className="text-cyan-400">preserve-3d</span> lets children live in 3D space.</div>
                </div>
            ),
        },
    ],
};

// ── 9. TRANSITIONS & ANIMATIONS ───────────────────────────────────────────

export const ANIMATION_SECTION = {
    title: "TRANSITIONS & ANIMATIONS",
    cards: [
        {
            tag: "Transitions",
            code: `/* Single property */\ntransition: color 0.3s ease;\ntransition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n\n/* Multiple */\ntransition:\n  color 0.3s ease,\n  background 0.3s ease,\n  transform 0.3s ease;\n\ntransition: all 0.3s ease; /* all properties */\n\n/* Shorthand: property duration timing-function delay */\ntransition: opacity 0.4s ease-in-out 0.1s;\n\n/* Timing functions */\ntransition-timing-function: ease;            /* default */\ntransition-timing-function: linear;\ntransition-timing-function: ease-in;\ntransition-timing-function: ease-out;\ntransition-timing-function: ease-in-out;\ntransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\ntransition-timing-function: steps(4, end);  /* stepped */`,
            demo: (
                <div className="flex flex-wrap gap-3 text-xs">
                    {["ease", "linear", "ease-in", "ease-out", "ease-in-out"].map(fn => (
                        <div key={fn}
                            className="group"
                            style={{ background: "#1e293b", padding: "8px 14px", borderRadius: 8, cursor: "pointer", transition: `transform 0.5s ${fn}, background 0.5s ${fn}` }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.background = "#0ea5e9"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = "#1e293b"; }}
                        >
                            hover — {fn}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            tag: "@keyframes & Animation",
            code: `@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50%       { transform: scale(1.1); }\n}\n\n@keyframes slideIn {\n  0%   { transform: translateX(-100%); opacity: 0; }\n  100% { transform: translateX(0); opacity: 1; }\n}\n\n/* Apply */\nanimation: fadeIn 0.5s ease forwards;\n\n/* Longhand */\nanimation-name: fadeIn;\nanimation-duration: 0.5s;\nanimation-timing-function: ease;\nanimation-delay: 0.2s;\nanimation-iteration-count: infinite | 3;\nanimation-direction: normal | reverse | alternate | alternate-reverse;\nanimation-fill-mode: none | forwards | backwards | both;\nanimation-play-state: running | paused;\n\n/* Multiple animations */\nanimation: spin 1s linear infinite, pulse 2s ease infinite;`,
            demo: (
                <div className="flex flex-wrap gap-4 text-xs">
                    <style>{`
            @keyframes cs-spin { to { transform: rotate(360deg); } }
            @keyframes cs-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
            @keyframes cs-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
            @keyframes cs-fade { 0%,100% { opacity:1; } 50% { opacity:0.2; } }
            @keyframes cs-slide { 0% { transform:translateX(-20px); opacity:0; } 100% { transform:translateX(0); opacity:1; } }
            .cs-spin { animation: cs-spin 1.5s linear infinite; }
            .cs-pulse { animation: cs-pulse 1s ease-in-out infinite; }
            .cs-bounce { animation: cs-bounce 0.8s ease-in-out infinite; }
            .cs-fade { animation: cs-fade 1.5s ease-in-out infinite; }
            .cs-slide { animation: cs-slide 0.6s ease forwards; }
          `}</style>
                    {[
                        { cls: "cs-spin", label: "spin", bg: "#0ea5e9" },
                        { cls: "cs-pulse", label: "pulse", bg: "#8b5cf6" },
                        { cls: "cs-bounce", label: "bounce", bg: "#f59e0b" },
                        { cls: "cs-fade", label: "fade", bg: "#ec4899" },
                        { cls: "cs-slide", label: "slide", bg: "#10b981" },
                    ].map(({ cls, label, bg }) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <div className={cls} style={{ width: 44, height: 44, background: bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>{label}</div>
                            <span className="text-gray-400">{label}</span>
                        </div>
                    ))}
                </div>
            ),
        },
    ],
};

// ── 10. CSS VARIABLES ─────────────────────────────────────────────────────

export const VARIABLES_SECTION = {
    title: "CSS CUSTOM PROPERTIES",
    cards: [
        {
            tag: "CSS Variables",
            code: `/* Define on :root (global) */\n:root {\n  --color-primary: #0ea5e9;\n  --color-bg: #0d1117;\n  --font-size-base: 16px;\n  --spacing-md: 1rem;\n  --border-radius: 8px;\n  --shadow: 0 4px 12px rgba(0,0,0,.3);\n}\n\n/* Use */\nbutton {\n  background: var(--color-primary);\n  font-size: var(--font-size-base);\n  padding: var(--spacing-md);\n  border-radius: var(--border-radius);\n}\n\n/* Fallback value */\ncolor: var(--accent, teal);\n\n/* Override in scope */\n.dark-card {\n  --color-bg: #1a1a2e;  /* local override */\n  background: var(--color-bg);\n}\n\n/* Change with JS */\ndocument.documentElement.style\n  .setProperty('--color-primary', '#ff0000');`,
            demo: (
                <div className="flex flex-col gap-2 text-xs" style={{ "--demo-accent": "#0ea5e9", "--demo-radius": "10px" }}>
                    <div style={{ background: "var(--demo-accent, teal)", padding: "8px 14px", borderRadius: "var(--demo-radius, 4px)" }}>Uses --demo-accent + --demo-radius</div>
                    <div style={{ background: "var(--demo-accent, teal)", filter: "brightness(0.5)", padding: "8px 14px", borderRadius: "var(--demo-radius, 4px)" }}>Same var, different brightness</div>
                </div>
            ),
        },
        {
            tag: "CSS calc(), min(), max(), clamp()",
            code: `/* calc() — mixed units */\nwidth: calc(100% - 2rem);\npadding: calc(var(--spacing) * 2);\nfont-size: calc(1rem + 0.5vw);\n\n/* min() — smallest value wins */\nwidth: min(500px, 90%);\nfont-size: min(5vw, 2rem);\n\n/* max() — largest value wins */\npadding: max(1rem, 2vw);\nwidth: max(300px, 50%);\n\n/* clamp(min, preferred, max) */\nfont-size: clamp(14px, 2.5vw, 22px);\nwidth: clamp(300px, 60%, 900px);\npadding: clamp(1rem, 5vw, 3rem);`,
            demo: (
                <div className="flex flex-col gap-2 text-xs">
                    <div style={{ width: "min(100%, 300px)", background: "#1d4ed8", padding: "6px 10px", borderRadius: 6 }}>min(100%, 300px) — never wider than 300px</div>
                    <div style={{ fontSize: "clamp(12px, 3vw, 20px)", background: "#065f46", padding: "6px 10px", borderRadius: 6 }}>font-size: clamp(12px, 3vw, 20px) — resize to see change</div>
                    <div style={{ width: "calc(100% - 40px)", background: "#7c2d12", padding: "6px 10px", borderRadius: 6 }}>calc(100% - 40px)</div>
                </div>
            ),
        },
    ],
};

// ── 11. MISCELLANEOUS ─────────────────────────────────────────────────────

export const MISC_SECTION = {
    title: "MISC & MODERN CSS",
    cards: [
        {
            tag: "CSS Grid — Subgrid",
            code: `/* Parent */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n/* Child adopts parent's tracks */\n.item {\n  grid-column: span 2;\n  display: grid;\n  grid-template-columns: subgrid;\n}\n\n/* Subgrid for rows */\n.item {\n  grid-row: span 2;\n  display: grid;\n  grid-template-rows: subgrid;\n}`,
            demo: <div className="text-xs text-gray-400">Subgrid aligns nested grid items to the parent grid's tracks — perfect for card layouts where inner elements need to align across cards.</div>,
        },
        {
            tag: "Scroll Snap",
            code: `/* Container */\n.scroll-container {\n  overflow-x: scroll;\n  scroll-snap-type: x mandatory;  /* axis + strictness */\n  scroll-snap-type: y proximity;\n}\n\n/* Items */\n.scroll-item {\n  scroll-snap-align: start;  /* start | center | end */\n  scroll-snap-stop: normal | always;\n}\n\n/* Smooth scroll */\nhtml { scroll-behavior: smooth; }\n\n/* Scroll margin (offset for anchor links) */\n#section { scroll-margin-top: 80px; }`,
            demo: (
                <div style={{ overflowX: "scroll", display: "flex", scrollSnapType: "x mandatory", gap: 12, paddingBottom: 4 }}>
                    {["#ef4444", "#f97316", "#eab308", "#22c55e", "#0ea5e9", "#8b5cf6"].map((bg, i) => (
                        <div key={i} style={{ minWidth: 100, height: 60, background: bg, borderRadius: 8, flexShrink: 0, scrollSnapAlign: "start", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>snap {i + 1}</div>
                    ))}
                </div>
            ),
        },
        {
            tag: "CSS Containment",
            code: `/* Limit layout scope for performance */\ncontain: layout;      /* isolate layout */\ncontain: paint;       /* clip overflow painting */\ncontain: style;       /* isolate counters/quotes */\ncontain: size;        /* don't depend on children size */\ncontain: strict;      /* all of the above */\ncontain: content;     /* layout + paint + style */\n\n/* Container queries (modern!) */\n@container (min-width: 400px) {\n  .card { display: flex; }\n}\n\n.card-wrapper {\n  container-type: inline-size;\n  container-name: card;\n}`,
            demo: <div className="text-xs text-gray-400">Container queries let components respond to their <span className="text-cyan-400">container's</span> size (not the viewport) — e.g. a card can become a row layout when its parent is wide enough.</div>,
        },
        {
            tag: "Cursor & Pointer Events",
            code: `cursor: default;\ncursor: pointer;      /* clickable */\ncursor: text;         /* text input */\ncursor: not-allowed;\ncursor: grab;\ncursor: grabbing;\ncursor: crosshair;\ncursor: zoom-in;\ncursor: zoom-out;\ncursor: wait;\ncursor: help;\ncursor: move;\ncursor: ns-resize;    /* N-S resize */\ncursor: ew-resize;    /* E-W resize */\ncursor: url('icon.png') 4 4, pointer; /* custom */\n\npointer-events: none;  /* click-through */\npointer-events: auto;\n\nuser-select: none;     /* can't select text */\nuser-select: all;      /* select all on click */`,
            demo: (
                <div className="flex flex-wrap gap-2 text-xs">
                    {["pointer", "not-allowed", "grab", "crosshair", "zoom-in", "text", "wait", "help"].map(cur => (
                        <div key={cur} style={{ cursor: cur, background: "#1e293b", padding: "5px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,.15)" }}>{cur}</div>
                    ))}
                </div>
            ),
        },
        {
            tag: "CSS Counters",
            code: `/* Define and increment */\nol {\n  counter-reset: section;  /* create counter */\n}\n\nli {\n  counter-increment: section;  /* increment */\n}\n\nli::before {\n  content: counter(section) ". ";\n  font-weight: bold;\n  color: teal;\n}\n\n/* Nested counters */\nol ol {\n  counter-reset: subsection;\n}\nol ol li::before {\n  content: counter(section) "." counter(subsection) " ";\n}`,
            demo: (
                <div style={{ "--sec": 0 }}>
                    <style>{`
            .css-counter-list { list-style: none; padding: 0; counter-reset: css-sec; }
            .css-counter-list li { counter-increment: css-sec; padding: 2px 0; }
            .css-counter-list li::before { content: counter(css-sec) ". "; color: #06b6d4; font-weight: bold; }
          `}</style>
                    <ul className="css-counter-list text-xs">
                        {["First item", "Second item", "Third item", "Fourth item"].map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                </div>
            ),
        },
        {
            tag: "Media Queries",
            code: `/* Breakpoints */\n@media (max-width: 768px) { ... }   /* mobile */\n@media (min-width: 769px) { ... }   /* tablet+ */\n@media (min-width: 1024px) { ... }  /* desktop */\n\n/* Orientation */\n@media (orientation: landscape) { ... }\n@media (orientation: portrait) { ... }\n\n/* Dark mode */\n@media (prefers-color-scheme: dark) {\n  body { background: #0d0d0d; color: #fff; }\n}\n\n/* High DPI / Retina */\n@media (-webkit-min-device-pixel-ratio: 2),\n       (min-resolution: 192dpi) {\n  .logo { background-image: url('logo@2x.png'); }\n}\n\n/* Reduced motion */\n@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; transition: none !important; }\n}\n\n/* Print */\n@media print {\n  nav, footer { display: none; }\n  body { font-size: 12pt; }\n}\n\n/* Hover capability */\n@media (hover: hover) {\n  button:hover { background: blue; }\n}`,
            demo: (
                <div className="text-xs text-gray-300 flex flex-col gap-1">
                    <div className="text-cyan-400">Common breakpoints:</div>
                    {[["sm", "640px"], ["md", "768px"], ["lg", "1024px"], ["xl", "1280px"], ["2xl", "1536px"]].map(([n, w]) => (
                        <div key={n} className="flex gap-3">
                            <span className="text-amber-300 w-10">{n}</span>
                            <span className="text-gray-400">min-width: {w}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            tag: "Logical Properties",
            code: `/* Inline = horizontal in LTR */\nmargin-inline-start: 1rem;   /* margin-left in LTR */\nmargin-inline-end: 1rem;     /* margin-right in LTR */\nmargin-inline: 1rem;         /* both */\npadding-inline: 2rem;\n\n/* Block = vertical */\nmargin-block-start: 1rem;    /* margin-top */\nmargin-block-end: 1rem;      /* margin-bottom */\npadding-block: 1rem;\n\n/* Sizing */\ninline-size: 300px;          /* width */\nblock-size: 200px;           /* height */\nmin-inline-size: 100px;\nmax-block-size: 400px;\n\n/* Borders */\nborder-inline: 2px solid red;\nborder-block-start: 3px solid blue;\n\n/* Inset (replaces top/right/bottom/left) */\ninset: 0;              /* all sides */\ninset-inline-start: 0; /* left in LTR */`,
            demo: (
                <div className="text-xs text-gray-400">Logical properties adapt to writing direction (LTR/RTL). <span className="text-cyan-400">inline</span> = horizontal axis, <span className="text-cyan-400">block</span> = vertical axis. Prefer these for internationalised layouts.</div>
            ),
        },
        {
            tag: "Appearance & Accent Color",
            code: `/* Remove native OS styling */\nappearance: none;\n-webkit-appearance: none;\n\n/* Style native checkboxes/radios (modern) */\naccent-color: #0ea5e9;\naccent-color: auto;\n\n/* Resize */\nresize: none;\nresize: both;\nresize: horizontal;\nresize: vertical;\n\n/* Image rendering */\nimage-rendering: auto;\nimage-rendering: crisp-edges;  /* pixel art */\nimage-rendering: pixelated;\n\n/* Column layout */\ncolumns: 2;\ncolumn-count: 3;\ncolumn-width: 200px;\ncolumn-gap: 2rem;\ncolumn-rule: 1px solid #ddd;\ncolumn-span: all;  /* break out of columns */`,
            demo: (
                <div className="flex flex-col gap-3 text-xs">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked style={{ accentColor: "#0ea5e9", width: 16, height: 16 }} />
                            accent-color: cyan
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked style={{ accentColor: "#ec4899", width: 16, height: 16 }} />
                            accent-color: pink
                        </label>
                    </div>
                    <div style={{ columns: 2, columnGap: "1rem", columnRule: "1px solid rgba(255,255,255,.2)", fontSize: 11, lineHeight: 1.5, color: "#9ca3af" }}>
                        CSS columns: 2 — text flows into two columns automatically, breaking at the right place. Great for readable long-form content layouts on wider viewports.
                    </div>
                </div>
            ),
        },
        {
            tag: "Mask & Clip Path",
            code: `/* Clip to shape */\nclip-path: circle(50%);\nclip-path: ellipse(80px 60px at center);\nclip-path: polygon(50% 0%, 100% 100%, 0 100%); /* triangle */\nclip-path: inset(10px 20px round 8px);\nclip-path: path('M10,10 L90,10 L90,90 Z');\n\n/* Mask */\nmask-image: url(mask.svg);\nmask-image: linear-gradient(to bottom, black 60%, transparent);\nmask-size: cover;\nmask-repeat: no-repeat;\nmask-position: center;\n\n/* Shorthand */\nmask: linear-gradient(to bottom, #000 50%, transparent) no-repeat center / cover;`,
            demo: (
                <div className="flex flex-wrap gap-4 text-xs">
                    {[
                        { clip: "circle(50%)", label: "circle" },
                        { clip: "polygon(50% 0%,100% 100%,0 100%)", label: "triangle" },
                        { clip: "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)", label: "hex" },
                        { clip: "inset(10% 20% round 12px)", label: "inset" },
                    ].map(({ clip, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <div style={{ clipPath: clip, background: "linear-gradient(135deg,#0ea5e9,#8b5cf6)", width: 60, height: 60 }} />
                            <span className="text-gray-400">{label}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            tag: "CSS Nesting (modern)",
            code: `/* Native CSS nesting (2023+) */\n.card {\n  background: white;\n  padding: 1rem;\n\n  /* Nested rule */\n  & h2 {\n    font-size: 1.5rem;\n  }\n\n  /* Pseudo-class */\n  &:hover {\n    background: #f0f9ff;\n  }\n\n  /* Media query inside rule */\n  @media (max-width: 600px) {\n    padding: 0.5rem;\n  }\n\n  /* Child combinator */\n  & > p {\n    color: gray;\n  }\n\n  /* Sibling */\n  & + .card {\n    margin-top: 1rem;\n  }\n}`,
            demo: <div className="text-xs text-gray-400">Native CSS nesting (no Sass needed) is now supported in all modern browsers. Use <span className="text-cyan-400">&amp;</span> to refer to the parent selector, just like Sass/Less.</div>,
        },
        {
            tag: ":has(), :is(), :where() — Relational Selectors",
            code: `/* :has() — parent selector! */\n.card:has(img) { padding: 0; }         /* card with img */\nform:has(:invalid) { border: red; }    /* form with invalid field */\nli:has(> a:hover) { background: #eee; } /* li when child link hovered */\n\n/* :is() — match any (specificity = highest arg) */\n:is(h1, h2, h3) { font-family: serif; }\n:is(article, section) p { max-width: 65ch; }\n\n/* :where() — match any (zero specificity) */\n:where(h1, h2, h3) { margin-block: 1rem; } /* easily overridden */\n\n/* :not() */\nbutton:not(.primary) { background: gray; }\nli:not(:last-child) { border-bottom: 1px solid; }`,
            demo: (
                <div className="text-xs text-gray-300 flex flex-col gap-1">
                    <div><span className="text-cyan-400">:has()</span> — the "parent selector" CSS never had, now supported in all modern browsers.</div>
                    <div><span className="text-cyan-400">:is()</span> — simplifies selector lists; specificity = most specific argument.</div>
                    <div><span className="text-cyan-400">:where()</span> — same as :is() but <em>zero</em> specificity — safe for resets.</div>
                </div>
            ),
        },
    ],
};
function Css() {
    return (
        <div className="min-h-screen bg-base-200 text-white p-6">
            {/* ── Hero ── */}
            <div className="bg-gradient-to-br from-[#d9d7f3] via-[#b9e3f6] to-[#6ec6e8] px-10 pt-14 pb-10 border-b-2 border-black/20 rounded-b-[40px] shadow-xl">
                <div className="flex justify-center items-center gap-5 HEAD1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 32 32">
                        <path fill="#e65100" d="m4 4l2 22l10 2l10-2l2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2l3.86.77l3.84-.77l.29-4H8.84L8 8h16Z" />
                    </svg>
                    <h1 className="font-head font-extrabold text-5xl md:text-7xl leading-none tracking-tight">
                        CSS TOOLKIT
                    </h1>
                </div>
                <p className="SUBHEAD1 text-center text-base md:text-lg text-black/70 mt-4 max-w-xl mx-auto font-circular-web">
                    A quick reference cheat sheet for common HTML &amp; HTML5 tags — readable, practical, interactive.
                </p>
            </div>

            {Object.values(SECTIONS).map((section, idx) => (
                <div key={idx} className="mb-20">
                    <h2 className="text-3xl font-bold mb-6">
                        {section.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.cards.map((card, i) => (
                            <Card key={i}>
                                <Tag>{card.tag}</Tag>

                                <CodeBlock>
                                    {card.code}
                                </CodeBlock>

                                <Demo>
                                    {card.demo}
                                </Demo>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Css;