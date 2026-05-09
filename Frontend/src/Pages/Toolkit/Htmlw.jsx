import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────────
   Reusable primitives
───────────────────────────────────────────── */

const SEND_ICON = (
    <svg className="rotate-45" width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path
            d="M12.6286 1.04921L0.4829 5.52396C0.290486 5.59619 0.168389 5.78988 0.190123 5.99572C0.211219 6.2022 0.369753 6.36713 0.574952 6.39589L6.95147 7.30682L7.8624 13.6833C7.89116 13.8885 8.05673 14.0477 8.26193 14.0688C8.40128 14.0841 8.53553 14.033 8.6295 13.939C8.67488 13.8937 8.71068 13.8387 8.73369 13.776L13.2084 1.63029C13.2698 1.46408 13.2289 1.2787 13.1042 1.15405C12.9796 1.02939 12.7942 0.988481 12.6286 1.04921Z"
            fill="currentColor"
        />
    </svg>
);

function Tag({ children, variant = "pink" }) {
    const variants = {
        pink: "from-red-300 via-rose-300 to-pink-300 text-black",
        blue: "from-blue-300 via-sky-300 to-cyan-300 text-black",
    };
    return (
        <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${variants[variant]} shrink-0`}
        >
            {SEND_ICON}
            {children}
        </span>
    );
}

function MdnLink({ href, children = "MDN Reference" }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-300 via-sky-300 to-cyan-300 text-black hover:brightness-110 transition-all"
        >
            {SEND_ICON}
            {children}
        </a>
    );
}

function Card({ children, className = "" }) {
    return (
        <div className={`bg-black rounded-2xl p-5 text-white ${className}`}>
            {children}
        </div>
    );
}

function CodeBlock({ children }) {
    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 font-mono text-sm leading-relaxed">
            {children}
        </div>
    );
}

function AttrTable({ rows }) {
    return (
        <div className="bg-[#111] border border-white/10 rounded-xl font-mono text-sm overflow-hidden">
            {rows.map(([label, desc], i) => (
                <div key={i}>
                    <div className="flex gap-4 px-4 py-2">
                        <span className="w-2/5 text-orange-400 shrink-0">{label}</span>
                        <span className="text-gray-300 text-xs leading-snug">{desc}</span>
                    </div>
                    {i < rows.length - 1 && <div className="border-t border-white/10" />}
                </div>
            ))}
        </div>
    );
}

function SectionTitle({ children, className = "" }) {
    return (
        <h2 className={`w-full text-center font-head font-extrabold text-4xl md:text-5xl mt-14 mb-6 leading-none tracking-tight ${className}`}>
            {children}
        </h2>
    );
}

/* HTML syntax helpers */
const T = ({ c, children }) => <span className={c}>{children}</span>;
const Kw = ({ children }) => <T c="text-orange-400">{children}</T>; // tag
const At = ({ children }) => <T c="text-emerald-400">{children}</T>; // attr
const Vl = ({ children }) => <T c="text-amber-300">"{children}"</T>; // value
const Tx = ({ children }) => <T c="text-gray-200">{children}</T>; // text
const Cm = ({ children }) => <T c="text-gray-500">{children}</T>; // comment
const Sk = ({ children }) => <T c="text-sky-300">{children}</T>; // highlight text
const W = ({ children }) => <span className="text-white">{children}</span>;

/* open/close angle brackets inline */
const OB = () => <W>&lt;</W>;
const CB = () => <W>&gt;</W>;

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

const Htmlw = () => {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const fadeUp = (cls, trigger) => {
            gsap.from(cls, {
                duration: 1.4,
                y: 60,
                rotationX: 50,
                scale: 0.96,
                opacity: 0,
                ease: "power4.out",
                transformOrigin: "50% 50%",
                perspective: 900,
                ...(trigger ? { scrollTrigger: { trigger, start: "top 88%" } } : {}),
            });
        };

        fadeUp(".HEAD1");
        fadeUp(".SUBHEAD1");
        [".HEAD2", ".HEAD3", ".HEAD4", ".HEAD5", ".HEAD6"].forEach((cls) =>
            fadeUp(cls, cls)
        );
    });

    return (
        <div className="w-screen bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 min-h-screen">

            {/* ── Hero ── */}
            <div className="bg-gradient-to-br from-[#d9d7f3] via-[#b9e3f6] to-[#6ec6e8] px-10 pt-14 pb-10 border-b-2 border-black/20 rounded-b-[40px] shadow-xl">
                <div className="flex justify-center items-center gap-5 HEAD1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 32 32">
                        <path fill="#e65100" d="m4 4l2 22l10 2l10-2l2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2l3.86.77l3.84-.77l.29-4H8.84L8 8h16Z" />
                    </svg>
                    <h1 className="font-head font-extrabold text-5xl md:text-7xl leading-none tracking-tight">
                        HTML TOOLKIT
                    </h1>
                </div>
                <p className="SUBHEAD1 text-center text-base md:text-lg text-black/70 mt-4 max-w-xl mx-auto font-circular-web">
                    A quick reference cheat sheet for common HTML &amp; HTML5 tags — readable, practical, interactive.
                </p>
            </div>

            {/* ══════════════════════════════════════
          SECTION 1 – BASIC STRUCTURE
      ══════════════════════════════════════ */}
            <SectionTitle className="HEAD1">BASIC HTML STRUCTURE</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5 pb-4">

                {/* Boilerplate */}
                <Card className="lg:col-span-2 flex flex-col gap-4">
                    <Tag>Hello.html — Boilerplate</Tag>
                    <CodeBlock>
                        <div><Kw><OB />!doctype</Kw> <Kw>html</Kw><Kw><CB /></Kw></div>
                        <div><Kw><OB />html</Kw> <At>lang</At><W>=</W><Vl>en</Vl><Kw><CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />head<CB /></Kw></div>
                        <div className="pl-8"><Kw><OB />meta</Kw> <At>charset</At><W>=</W><Vl>UTF-8</Vl> <Kw>/<CB /></Kw></div>
                        <div className="pl-8"><Kw><OB />meta</Kw> <At>name</At><W>=</W><Vl>viewport</Vl> <At>content</At><W>=</W><Vl>width=device-width, initial-scale=1.0</Vl> <Kw>/<CB /></Kw></div>
                        <div className="pl-8"><Kw><OB />title<CB /></Kw><Tx>HTML5 Boilerplate</Tx><Kw><OB />/title<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />/head<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />body<CB /></Kw></div>
                        <div className="pl-8"><Kw><OB />h1<CB /></Kw><Tx>Toolkit for Developers!!</Tx><Kw><OB />/h1<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />/body<CB /></Kw></div>
                        <div><Kw><OB />/html<CB /></Kw></div>
                    </CodeBlock>
                </Card>

                {/* Comment + Paragraph */}
                <Card className="flex flex-col gap-5">
                    <div>
                        <Tag>Comment</Tag>
                        <CodeBlock>
                            <div className="flex flex-wrap gap-1"><Cm>&lt;!-- this is a comment --&gt;</Cm></div>
                            <br />
                            <Cm>&lt;!--</Cm>
                            <div className="pl-8"><Cm>multi-line comment</Cm></div>
                            <Cm>--&gt;</Cm>
                        </CodeBlock>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                        <Tag>Paragraph</Tag>
                        <CodeBlock>
                            <div><Kw><OB />p<CB /></Kw><Tx>I'm from CodeSarthi Toolkit.</Tx><Kw><OB />/p<CB /></Kw></div>
                            <div><Kw><OB />p<CB /></Kw><Tx>Share quick reference sheet.</Tx><Kw><OB />/p<CB /></Kw></div>
                        </CodeBlock>
                        <div className="mt-3">
                            <MdnLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/p" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Links + Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-5 pb-4">

                <Card className="flex flex-col gap-4">
                    <Tag>HTML Links — Anchor Tag</Tag>
                    <CodeBlock>
                        <div><Kw><OB />a</Kw> <At>href</At><W>=</W><Vl>https://CodeSarthi.com</Vl><Kw><CB /></Kw><Sk>Toolkits</Sk><Kw><OB />/a<CB /></Kw></div>
                        <div><Kw><OB />a</Kw> <At>href</At><W>=</W><Vl>mailto:vinay@abc.com</Vl><Kw><CB /></Kw><Sk>Email</Sk><Kw><OB />/a<CB /></Kw></div>
                        <div><Kw><OB />a</Kw> <At>href</At><W>=</W><Vl>tel:+12345678</Vl><Kw><CB /></Kw><Sk>Call</Sk><Kw><OB />/a<CB /></Kw></div>
                        <div><Kw><OB />a</Kw> <At>href</At><W>=</W><Vl>sms:+12345678&amp;body=hi</Vl><Kw><CB /></Kw><Sk>Msg</Sk><Kw><OB />/a<CB /></Kw></div>
                    </CodeBlock>
                    <MdnLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#attributes" />
                    <AttrTable rows={[
                        ["href", "The URL the hyperlink points to"],
                        ["rel", "Relationship of the linked URL"],
                        ["target", "_self, _blank, _top, _parent"],
                    ]} />
                </Card>

                <Card className="flex flex-col gap-4">
                    <Tag>HTML Image Tag</Tag>
                    <CodeBlock>
                        <div><Kw><OB />img</Kw></div>
                        <div className="pl-6"><At>loading</At><W>=</W><Vl>lazy</Vl></div>
                        <div className="pl-6"><At>src</At><W>=</W><Vl>https://xxx.png</Vl></div>
                        <div className="pl-6"><At>alt</At><W>=</W><Vl>Describe image here</Vl></div>
                        <div className="pl-6"><At>width</At><W>=</W><Vl>400</Vl></div>
                        <div className="pl-6"><At>height</At><W>=</W><Vl>400</Vl></div>
                        <div><Kw>/<CB /></Kw></div>
                    </CodeBlock>
                    <MdnLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img" />
                    <AttrTable rows={[
                        ["src", "Required — image URL or path"],
                        ["alt", "Text description of the image"],
                        ["width", "Width of the image"],
                        ["height", "Height of the image"],
                        ["loading", "How the browser should load (lazy/eager)"],
                    ]} />
                </Card>
            </div>

            {/* Text Formatting + Headings + Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-5 pb-4">

                <Card>
                    <Tag>Text Formatting Tags</Tag>
                    <CodeBlock>
                        {[
                            [["b"], "Bold Text", "text-gray-200"],
                            [["strong"], "This text is important", "text-gray-200"],
                            [["i"], "Italic Text", "text-gray-200"],
                            [["em"], "This text is emphasized", "text-gray-200"],
                            [["u"], "Underline Text", "text-gray-200"],
                            [["pre"], "Pre-formatted Text", "text-gray-200"],
                            [["code"], "Source code", "text-sky-300"],
                            [["del"], "Deleted text", "text-gray-200"],
                            [["mark"], "Highlighted text (HTML5)", "text-yellow-300"],
                            [["ins"], "Inserted text", "text-gray-200"],
                            [["sup"], "Superscripted", "text-gray-200"],
                            [["sub"], "Subscripted", "text-gray-200"],
                            [["small"], "Smaller text", "text-gray-400"],
                            [["kbd"], "Ctrl", "text-purple-300"],
                            [["blockquote"], "Block Quote", "text-gray-200"],
                        ].map(([tags, content, cc], i) => (
                            <div key={i}>
                                <Kw><OB />{tags[0]}<CB /></Kw>
                                <span className={cc}>{content}</span>
                                <Kw><OB />/{tags[0]}<CB /></Kw>
                            </div>
                        ))}
                    </CodeBlock>
                </Card>

                <div className="flex flex-col gap-4">
                    <Card>
                        <Tag>Heading Tags</Tag>
                        <CodeBlock>
                            {["h1", "h2", "h3", "h4", "h5", "h6"].map((h, i) => (
                                <div key={i}><Kw><OB />{h}<CB /></Kw><Tx>This is Heading {i + 1}</Tx><Kw><OB />/{h}<CB /></Kw></div>
                            ))}
                        </CodeBlock>
                    </Card>

                    <Card>
                        <Tag>Section Division</Tag>
                        <AttrTable rows={[
                            ["<div>", "Division or section of page content"],
                            ["<span>", "Section of text within other content"],
                            ["<p>", "Paragraph of text"],
                            ["<br>", "Line break"],
                            ["<hr>", "Horizontal rule"],
                        ]} />
                    </Card>
                </div>
            </div>

            {/* Scripts + iframe */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-5 pb-4">

                <Card className="flex flex-col gap-5">
                    <Tag>INTERNAL — JavaScript &amp; Stylesheet</Tag>
                    <CodeBlock>
                        <div><Kw><OB />script</Kw> <At>type</At><W>=</W><Vl>text/javascript</Vl><Kw><CB /></Kw></div>
                        <div className="pl-6"><T c="text-purple-400">let</T> <Sk>text</Sk> <W>=</W> <T c="text-amber-300">'Hello Developers'</T><W>;</W></div>
                        <div className="pl-6"><Sk>alert</Sk><W>(</W><Sk>text</Sk><W>);</W></div>
                        <div><Kw><OB />/script<CB /></Kw></div>
                    </CodeBlock>
                    <CodeBlock>
                        <div><Kw><OB />style</Kw> <At>type</At><W>=</W><Vl>text/css</Vl><Kw><CB /></Kw></div>
                        <div className="pl-6"><Sk>h1</Sk> <W>{"{"}</W></div>
                        <div className="pl-10"><At>color</At><W>: </W><T c="text-purple-400">purple</T><W>;</W></div>
                        <div className="pl-6"><W>{"}"}</W></div>
                        <div><Kw><OB />/style<CB /></Kw></div>
                    </CodeBlock>

                    <Tag>EXTERNAL — JavaScript &amp; Stylesheet</Tag>
                    <CodeBlock>
                        <div><Kw><OB />body<CB /></Kw></div>
                        <div className="pl-6 text-gray-500">...</div>
                        <div className="pl-6"><Kw><OB />script</Kw> <At>src</At><W>=</W><Vl>app.js</Vl><Kw><CB /></Kw><Kw><OB />/script<CB /></Kw></div>
                        <div><Kw><OB />/body<CB /></Kw></div>
                    </CodeBlock>
                    <CodeBlock>
                        <div><Kw><OB />head<CB /></Kw></div>
                        <div className="pl-6"><Kw><OB />link</Kw> <At>rel</At><W>=</W><Vl>stylesheet</Vl> <At>href</At><W>=</W><Vl>style.css</Vl> <Kw>/<CB /></Kw></div>
                        <div><Kw><OB />/head<CB /></Kw></div>
                    </CodeBlock>
                </Card>

                <Card className="flex flex-col gap-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <Tag>Inline Frame — iframe</Tag>
                        <MdnLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe" />
                    </div>
                    <CodeBlock>
                        <div><Kw><OB />iframe</Kw></div>
                        <div className="pl-6"><At>title</At><W>=</W><Vl>Kanpur</Vl></div>
                        <div className="pl-6"><At>width</At><W>=</W><Vl>100%</Vl></div>
                        <div className="pl-6"><At>height</At><W>=</W><Vl>300</Vl></div>
                        <div className="pl-6"><At>src</At><W>=</W><Vl>https://maps.google.com/…</Vl></div>
                        <div className="pl-6"><At>scrolling</At><W>=</W><Vl>no</Vl></div>
                        <div><Kw><CB /></Kw></div>
                        <div><Kw><OB />/iframe <CB /></Kw></div>
                    </CodeBlock>
                    <iframe
                        title="Kanpur"
                        className="w-full h-64 rounded-xl border border-white/10"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107760.06358267844!2d80.3612485463019!3d26.440255788773385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e1!3m2!1sen!2sin!4v1769776040630!5m2!1sen!2sin"
                    />
                </Card>
            </div>

            {/* ══════════════════════════════════════
          SECTION 2 – HTML5 TAGS
      ══════════════════════════════════════ */}
            <SectionTitle className="HEAD2">HTML 5 TAGS</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5 pb-4">

                {/* Document structure */}
                <Card className="flex flex-col gap-5">
                    <Tag>Document Structure</Tag>
                    <CodeBlock>
                        <div><Kw><OB />body<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />header<CB /></Kw></div>
                        <div className="pl-8"><Kw><OB />nav<CB /></Kw><Cm>...</Cm><Kw><OB />/nav<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />/header<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />main<CB /></Kw></div>
                        <div className="pl-8"><Kw><OB />h1<CB /></Kw><Tx>CodeSarthi</Tx><Kw><OB />/h1<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />/main<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />footer<CB /></Kw></div>
                        <div className="pl-8"><Kw><OB />p<CB /></Kw><Tx>TEAM AXONIC</Tx><Kw><OB />/p<CB /></Kw></div>
                        <div className="pl-4"><Kw><OB />/footer<CB /></Kw></div>
                        <div><Kw><OB />/body<CB /></Kw></div>
                    </CodeBlock>

                    <div className="border-t border-white/10 pt-4">
                        <Tag>Header Navigation</Tag>
                        <CodeBlock>
                            <div><Kw><OB />header<CB /></Kw></div>
                            <div className="pl-4"><Kw><OB />nav<CB /></Kw></div>
                            <div className="pl-8"><Kw><OB />ul<CB /></Kw></div>
                            {["Edit Page", "Twitter", "Facebook"].map((l, i) => (
                                <div key={i} className="pl-12">
                                    <Kw><OB />li<CB /></Kw><Kw><OB />a</Kw> <At>href</At><W>=</W><Vl>#</Vl><Kw><CB /></Kw><Sk>{l}</Sk><Kw><OB />/a<CB /></Kw><Kw><OB />/li<CB /></Kw>
                                </div>
                            ))}
                            <div className="pl-8"><Kw><OB />/ul<CB /></Kw></div>
                            <div className="pl-4"><Kw><OB />/nav<CB /></Kw></div>
                            <div><Kw><OB />/header<CB /></Kw></div>
                        </CodeBlock>
                    </div>
                </Card>

                {/* mark, progress, audio */}
                <Card className="flex flex-col gap-5">
                    <Tag>HTML5 mark</Tag>
                    <CodeBlock>
                        <div><Kw><OB />p<CB /></Kw><Tx>I Love </Tx><Kw><OB />mark<CB /></Kw><T c="text-yellow-300">CodeSarthi</T><Kw><OB />/mark<CB /></Kw><Kw><OB />/p<CB /></Kw></div>
                    </CodeBlock>
                    <p className="text-sm text-black/80 bg-white/80 rounded-lg px-3 py-2">
                        I Love <mark>CodeSarthi</mark>
                    </p>

                    <div className="border-t border-white/10 pt-4">
                        <Tag>HTML5 progress</Tag>
                        <CodeBlock>
                            <div><Kw><OB />progress</Kw> <At>value</At><W>=</W><Vl>50</Vl> <At>max</At><W>=</W><Vl>100</Vl><Kw><CB /></Kw><Kw><OB />/progress<CB /></Kw></div>
                        </CodeBlock>
                        <progress value="50" max="100" className="w-full mt-3 rounded-full overflow-hidden" />
                    </div>

                    <div className="border-t border-white/10 pt-4">
                        <Tag>HTML5 audio</Tag>
                        <CodeBlock>
                            <div><Kw><OB />audio</Kw> <At>controls</At> <At>src</At><W>=</W><Vl>sample.mp3</Vl><Kw><CB /></Kw></div>
                            <div className="pl-6 text-gray-500">Your browser does not support audio.</div>
                            <div><Kw><OB />/audio<CB /></Kw></div>
                        </CodeBlock>
                        <audio controls src="/audio/toolkit.mp3" className="w-full mt-3">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </Card>

                {/* video + HTML5 tag reference */}
                <Card className="flex flex-col gap-4">
                    <Tag>HTML5 video</Tag>
                    <CodeBlock>
                        <div><Kw><OB />video</Kw> <At>controls</At> <At>width</At><W>=</W><Vl>100%</Vl><Kw><CB /></Kw></div>
                        <div className="pl-6"><Kw><OB />source</Kw></div>
                        <div className="pl-10"><At>src</At><W>=</W><Vl>sample.mp4</Vl></div>
                        <div className="pl-10"><At>type</At><W>=</W><Vl>video/mp4</Vl></div>
                        <div className="pl-6"><Kw>/<CB /></Kw></div>
                        <div><Kw><OB />/video<CB /></Kw></div>
                    </CodeBlock>
                    <video
                        src="/videos/feature-2.mp4"
                        autoPlay loop muted playsInline preload="auto"
                        className="rounded-xl object-cover h-48 w-full"
                    />
                </Card>
            </div>

            {/* HTML5 reference table */}
            <div className="px-5 pb-4">
                <Card>
                    <Tag>HTML5 Elements Reference</Tag>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {[
                            [
                                ["article", "Content that's independent"],
                                ["aside", "Secondary content"],
                                ["audio", "Embeds a sound or audio stream"],
                                ["canvas", "Draw graphics via JavaScript"],
                                ["data", "Machine readable content"],
                                ["datalist", "A set of pre-defined options"],
                                ["details", "Additional information"],
                                ["dialog", "A dialog box or sub-window"],
                                ["embed", "Embeds external application"],
                                ["figcaption", "A caption for a figure"],
                            ],
                            [
                                ["figure", "A figure illustrated"],
                                ["footer", "Footer or least important"],
                                ["header", "Masthead or important info"],
                                ["main", "The main content of the document"],
                                ["mark", "Text highlighted"],
                                ["meter", "A scalar value within a known range"],
                                ["nav", "A section of navigation links"],
                                ["output", "The result of a calculation"],
                                ["picture", "A container for multiple image sources"],
                                ["progress", "Completion progress of a task"],
                            ],
                            [
                                ["ruby", "Represents a ruby annotation"],
                                ["section", "A group in a series of related content"],
                                ["source", "Resources for the media elements"],
                                ["summary", "A summary for the <details> element"],
                                ["template", "Defines fragments of HTML"],
                                ["time", "A time or date"],
                                ["track", "Text tracks for the media elements"],
                                ["video", "Embeds video"],
                                ["wbr", "A line break opportunity"],
                            ],
                        ].map((col, ci) => (
                            <div key={ci} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden font-mono text-sm">
                                {col.map(([tag, desc], i) => (
                                    <div key={i}>
                                        <div className="flex gap-3 px-4 py-2">
                                            <a
                                                href={`https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/${tag.replace(/<.*>/, "")}`}
                                                target="_blank" rel="noreferrer"
                                                className="text-blue-400 hover:underline w-32 shrink-0"
                                            >
                                                {tag}
                                            </a>
                                            <span className="text-gray-300 text-xs leading-snug">{desc}</span>
                                        </div>
                                        {i < col.length - 1 && <div className="border-t border-white/10" />}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* ══════════════════════════════════════
          SECTION 3 – TABLES
      ══════════════════════════════════════ */}
            <SectionTitle className="HEAD3">HTML TABLES</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5 pb-4">
                <Card>
                    <Tag>HTML Table</Tag>
                    <CodeBlock>
                        <div><Kw>&lt;table&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;thead&gt;</Kw></div>
                        <div className="pl-8"><Kw>&lt;tr&gt;</Kw></div>
                        <div className="pl-12"><Kw>&lt;td&gt;</Kw><Tx>name</Tx><Kw>&lt;/td&gt;</Kw> <Kw>&lt;td&gt;</Kw><Tx>age</Tx><Kw>&lt;/td&gt;</Kw></div>
                        <div className="pl-8"><Kw>&lt;/tr&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;/thead&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;tbody&gt;</Kw></div>
                        {[["Roberta", "39"], ["Oliver", "25"]].map(([n, a], i) => (
                            <div key={i}>
                                <div className="pl-8"><Kw>&lt;tr&gt;</Kw></div>
                                <div className="pl-12"><Kw>&lt;td&gt;</Kw><Tx>{n}</Tx><Kw>&lt;/td&gt;</Kw> <Kw>&lt;td&gt;</Kw><Tx>{a}</Tx><Kw>&lt;/td&gt;</Kw></div>
                                <div className="pl-8"><Kw>&lt;/tr&gt;</Kw></div>
                            </div>
                        ))}
                        <div className="pl-4"><Kw>&lt;/tbody&gt;</Kw></div>
                        <div><Kw>&lt;/table&gt;</Kw></div>
                    </CodeBlock>
                </Card>

                <Card>
                    <Tag>Table Tags</Tag>
                    <AttrTable rows={[
                        ["<table>", "Defines a table"],
                        ["<th>", "Defines a header cell"],
                        ["<tr>", "Defines a row"],
                        ["<td>", "Defines a cell"],
                        ["<caption>", "Defines a table caption"],
                        ["<colgroup>", "Defines a group of columns"],
                        ["<col>", "Defines a column within a table"],
                        ["<thead>", "Groups the header content"],
                        ["<tbody>", "Groups the body content"],
                        ["<tfoot>", "Groups the footer content"],
                    ]} />
                </Card>

                <Card className="flex flex-col gap-5">
                    <div>
                        <Tag>&lt;td&gt; Attributes</Tag>
                        <AttrTable rows={[
                            ["colspan", "Number of columns a cell should span"],
                            ["headers", "One or more header cells related to"],
                            ["rowspan", "Number of rows a cell should span"],
                        ]} />
                        <div className="mt-3">
                            <MdnLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/td#attributes" />
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                        <Tag>&lt;th&gt; Attributes</Tag>
                        <AttrTable rows={[
                            ["headers", "Header cells related to"],
                            ["colspan", "Columns a cell should span"],
                            ["rowspan", "Rows a cell should span"],
                            ["abbr", "Description of cell's content"],
                            ["scope", "The header element relates to"],
                        ]} />
                        <div className="mt-3">
                            <MdnLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/th#attributes" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* ══════════════════════════════════════
          SECTION 4 – LISTS
      ══════════════════════════════════════ */}
            <SectionTitle className="HEAD4">HTML LISTS</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5 pb-4">
                {[
                    {
                        tag: "ul", title: "Unordered List",
                        items: ["I'm an item", "I'm another item", "I'm another item"],
                        href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ul",
                    },
                    {
                        tag: "ol", title: "Ordered List",
                        items: ["I'm the first item", "I'm the second item", "I'm the third item"],
                        href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol",
                    },
                ].map(({ tag, title, items, href }) => (
                    <Card key={tag} className="flex flex-col gap-4">
                        <Tag>{title}</Tag>
                        <CodeBlock>
                            <div><Kw>&lt;{tag}&gt;</Kw></div>
                            {items.map((t, i) => (
                                <div key={i} className="pl-4"><Kw>&lt;li&gt;</Kw><Tx>{t}</Tx><Kw>&lt;/li&gt;</Kw></div>
                            ))}
                            <div><Kw>&lt;/{tag}&gt;</Kw></div>
                        </CodeBlock>
                        <MdnLink href={href} />
                    </Card>
                ))}

                <Card className="flex flex-col gap-4">
                    <Tag>Definition List</Tag>
                    <CodeBlock>
                        <div><Kw>&lt;dl&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;dt&gt;</Kw><Tx>A Term</Tx><Kw>&lt;/dt&gt;</Kw></div>
                        <div className="pl-8"><Kw>&lt;dd&gt;</Kw><T c="text-gray-400">Definition of a term</T><Kw>&lt;/dd&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;dt&gt;</Kw><Tx>Another Term</Tx><Kw>&lt;/dt&gt;</Kw></div>
                        <div className="pl-8"><Kw>&lt;dd&gt;</Kw><T c="text-gray-400">Definition of another term</T><Kw>&lt;/dd&gt;</Kw></div>
                        <div><Kw>&lt;/dl&gt;</Kw></div>
                    </CodeBlock>
                    <MdnLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl" />
                </Card>
            </div>

            {/* ══════════════════════════════════════
          SECTION 5 – FORMS
      ══════════════════════════════════════ */}
            <SectionTitle className="HEAD5">HTML FORMS</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5 pb-4">

                {/* Form example */}
                <Card className="flex flex-col gap-4">
                    <Tag>HTML Form Example</Tag>
                    <CodeBlock>
                        <div><Kw>&lt;form</Kw> <At>method</At><W>=</W><Vl>POST</Vl> <At>action</At><W>=</W><Vl>api/login</Vl><Kw>&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;label</Kw> <At>for</At><W>=</W><Vl>mail</Vl><Kw>&gt;</Kw><Tx>Email:</Tx><Kw>&lt;/label&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;input</Kw> <At>type</At><W>=</W><Vl>email</Vl> <At>id</At><W>=</W><Vl>mail</Vl> <At>name</At><W>=</W><Vl>mail</Vl> <Kw>/&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;input</Kw> <At>type</At><W>=</W><Vl>password</Vl> <At>name</At><W>=</W><Vl>pw</Vl> <Kw>/&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;input</Kw> <At>type</At><W>=</W><Vl>submit</Vl> <At>value</At><W>=</W><Vl>Login</Vl> <Kw>/&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;input</Kw> <At>type</At><W>=</W><Vl>checkbox</Vl> <At>id</At><W>=</W><Vl>ck</Vl><Kw>/&gt;</Kw></div>
                        <div className="pl-4"><Kw>&lt;label</Kw> <At>for</At><W>=</W><Vl>ck</Vl><Kw>&gt;</Kw><Tx>Remember me</Tx><Kw>&lt;/label&gt;</Kw></div>
                        <div><Kw>&lt;/form&gt;</Kw></div>
                    </CodeBlock>
                    <div className="border border-white/20 rounded-xl p-4 text-sm flex flex-col gap-2">
                        <form method="POST" action="api/login" className="flex flex-col gap-2">
                            <label htmlFor="mail">Email: <input type="email" id="mail" name="mail" className="text-black ml-2 rounded px-1" /></label>
                            <label htmlFor="pw">Password: <input type="password" id="pw" name="pw" className="text-black ml-2 rounded px-1" /></label>
                            <div className="flex items-center gap-3 mt-1">
                                <input type="submit" value="Login" className="border border-white/30 rounded px-3 py-1 cursor-pointer hover:bg-white/10" />
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" id="ck" name="ck" /> Remember me
                                </label>
                            </div>
                        </form>
                    </div>
                </Card>

                {/* Label + Radio */}
                <Card className="flex flex-col gap-5">
                    <div>
                        <Tag>Label Tag</Tag>
                        <CodeBlock>
                            <Cm>&lt;!-- Nested --&gt;</Cm>
                            <div><Kw>&lt;label&gt;</Kw><Tx>Click me</Tx></div>
                            <div className="pl-6"><Kw>&lt;input</Kw> <At>type</At><W>=</W><Vl>text</Vl><Kw>/&gt;</Kw></div>
                            <div><Kw>&lt;/label&gt;</Kw></div>
                            <br />
                            <Cm>&lt;!-- for attribute --&gt;</Cm>
                            <div><Kw>&lt;label</Kw> <At>for</At><W>=</W><Vl>user</Vl><Kw>&gt;</Kw><Tx>Click me</Tx><Kw>&lt;/label&gt;</Kw></div>
                            <div><Kw>&lt;input</Kw> <At>id</At><W>=</W><Vl>user</Vl> <At>type</At><W>=</W><Vl>text</Vl><Kw>/&gt;</Kw></div>
                        </CodeBlock>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                        <Tag>Radio Buttons</Tag>
                        <CodeBlock>
                            <div><Kw>&lt;input</Kw> <At>type</At><W>=</W><Vl>radio</Vl> <At>name</At><W>=</W><Vl>gender</Vl> <At>id</At><W>=</W><Vl>m</Vl><Kw>/&gt;</Kw></div>
                            <div><Kw>&lt;label</Kw> <At>for</At><W>=</W><Vl>m</Vl><Kw>&gt;</Kw><Tx>Male</Tx><Kw>&lt;/label&gt;</Kw></div>
                            <div><Kw>&lt;input</Kw> <At>type</At><W>=</W><Vl>radio</Vl> <At>name</At><W>=</W><Vl>gender</Vl> <At>id</At><W>=</W><Vl>f</Vl><Kw>/&gt;</Kw></div>
                            <div><Kw>&lt;label</Kw> <At>for</At><W>=</W><Vl>f</Vl><Kw>&gt;</Kw><Tx>Female</Tx><Kw>&lt;/label&gt;</Kw></div>
                        </CodeBlock>
                        <div className="border border-white/20 rounded-xl p-4 mt-3 flex gap-6 text-sm">
                            <label className="flex items-center gap-2"><input type="radio" name="gender" id="m" /> Male</label>
                            <label className="flex items-center gap-2"><input type="radio" name="gender" id="f" /> Female</label>
                        </div>
                    </div>
                </Card>

                {/* Input, Textarea, Checkbox, Select */}
                <Card className="flex flex-col gap-5">
                    <div>
                        <Tag>Select Tag</Tag>
                        <CodeBlock>
                            <div><Kw>&lt;select</Kw> <At>name</At><W>=</W><Vl>city</Vl><Kw>&gt;</Kw></div>
                            {["Kanpur", "Bangalore", "Mumbai"].map((c, i) => (
                                <div key={i} className="pl-4"><Kw>&lt;option</Kw> <At>value</At><W>=</W><Vl>{i + 1}</Vl><Kw>&gt;</Kw><Tx>{c}</Tx><Kw>&lt;/option&gt;</Kw></div>
                            ))}
                            <div><Kw>&lt;/select&gt;</Kw></div>
                        </CodeBlock>
                        <div className="border border-white/20 rounded-xl p-3 mt-3 text-sm">
                            City: <select name="city" className="text-black ml-2 rounded px-1">
                                <option value="1">Kanpur</option>
                                <option value="2">Bangalore</option>
                                <option value="3">Mumbai</option>
                            </select>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                        <Tag>Form Attributes</Tag>
                        <AttrTable rows={[
                            ["name", "Name of form for scripting"],
                            ["action", "URL of form script"],
                            ["method", "HTTP method — POST / GET"],
                            ["enctype", "Media type, see enctype"],
                            ["onsubmit", "Runs when form was submitted"],
                            ["onreset", "Runs when form was reset"],
                        ]} />
                    </div>
                </Card>
            </div>

            {/* ══════════════════════════════════════
          SECTION 6 – INPUT ATTRIBUTES
      ══════════════════════════════════════ */}
            <SectionTitle className="HEAD6">HTML INPUT ATTRIBUTES</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-5 pb-10">

                <Card className="flex flex-col gap-4">
                    <Tag>Input Tag Attributes</Tag>
                    <CodeBlock>
                        <div>
                            <Kw>&lt;input</Kw> <At>type</At><W>=</W><Vl>text</Vl> <At>name</At><W>=</W><Vl>?</Vl> <At>value</At><W>=</W><Vl>?</Vl> <At>minlength</At><W>=</W><Vl>6</Vl> <At>required</At><Kw>/&gt;</Kw>
                        </div>
                    </CodeBlock>
                    <AttrTable rows={[
                        ['type="…"', "The type of data being input"],
                        ['value="…"', "Default value"],
                        ['name="…"', "Used in the HTTP request"],
                        ['id="…"', "Unique identifier for other HTML elements"],
                        ["readonly", "Stops the user from modifying"],
                        ["disabled", "Stops any interaction"],
                        ["checked", "Whether radio/checkbox is selected"],
                        ["required", "Marks the field as compulsory"],
                        ['placeholder="…"', "Adds temporary hint text"],
                        ['autocomplete="off"', "Disable auto completion"],
                        ['maxlength="…"', "Maximum number of characters"],
                        ['minlength="…"', "Minimum number of characters"],
                        ['min="…"', "Minimum numerical value"],
                        ['max="…"', "Maximum numerical value"],
                        ['step="…"', "How the number will increment"],
                        ['pattern="…"', "Specifies a Regular expression"],
                        ["autofocus", "Element should be focused on load"],
                        ["multiple", "Whether to allow multiple values"],
                        ['accept=""', "Expected file type in file upload"],
                    ]} />
                </Card>

                <Card className="flex flex-col gap-4">
                    <Tag>Input Types</Tag>
                    <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden font-mono text-sm">
                        {[
                            ["checkbox", <input type="checkbox" />],
                            ["radio", <input type="radio" />],
                            ["file", <input type="file" className="text-xs text-white" />],
                            ["text", <input type="text" className="text-black rounded px-1 w-32" />],
                            ["password", <input type="password" className="text-black rounded px-1 w-32" />],
                            ["submit", <input type="submit" className="border border-white/30 rounded px-2 py-0.5 cursor-pointer" />],
                            ["reset", <input type="reset" className="border border-white/30 rounded px-2 py-0.5 cursor-pointer" />],
                            ["button", <input type="button" value="button" className="border border-white/30 rounded px-2 py-0.5 cursor-pointer" />],
                            ["color", <input type="color" className="h-7 w-12 rounded" />],
                            ["date", <input type="date" className="text-black rounded px-1" />],
                            ["time", <input type="time" className="text-black rounded px-1" />],
                            ["month", <input type="month" className="text-black rounded px-1" />],
                            ["week", <input type="week" className="text-black rounded px-1" />],
                            ["datetime-local", <input type="datetime-local" className="text-black rounded px-1" />],
                            ["email", <input type="email" className="text-black rounded px-1 w-32" />],
                            ["tel", <input type="tel" className="text-black rounded px-1 w-32" />],
                            ["url", <input type="url" className="text-black rounded px-1 w-32" />],
                            ["number", <input type="number" className="text-black rounded px-1 w-20" />],
                            ["search", <input type="search" className="text-black rounded px-1 w-32" />],
                            ["range", <input type="range" className="w-32" />],
                        ].map(([type, demo], i, arr) => (
                            <div key={type}>
                                <div className="flex items-center justify-between gap-4 px-4 py-2">
                                    <span className="text-orange-400 text-xs">type="{type}"</span>
                                    <span className="shrink-0">{demo}</span>
                                </div>
                                {i < arr.length - 1 && <div className="border-t border-white/10" />}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default Htmlw;