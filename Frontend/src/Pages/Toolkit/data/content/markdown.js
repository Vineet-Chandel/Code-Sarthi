export default {
  topics: [
    {
      id: "text-formatting",
      title: "Text Formatting",
      sections: [
        {
          heading: "Headings",
          description: "# through ###### map to h1–h6. ATX-style (with hashes) is preferred over Setext underlines.",
          language: "markdown",
          code: `# H1 — Page title (one per document)
## H2 — Major section
### H3 — Subsection
#### H4
##### H5
###### H6`,
        },
        {
          heading: "Emphasis & inline",
          description: "Asterisks or underscores for bold/italic; backticks for inline code.",
          language: "markdown",
          code: `**bold text**
*italic text*
***bold and italic***
~~strikethrough~~

Inline \`code\` renders in monospace.
Use <kbd>Ctrl</kbd>+<kbd>K</kbd> for keyboard keys (HTML allowed).`,
        },
        {
          heading: "Blockquotes",
          description: "> creates a blockquote. Nest quotes with >>.",
          language: "markdown",
          code: `> This is a blockquote.
> It can span multiple lines.

> Nested quote:
>> Inner level
>>> Triple nesting`,
        },
      ],
    },
    {
      id: "links-images",
      title: "Links & Images",
      sections: [
        {
          heading: "Links",
          description: "[text](url) for inline links. Reference-style links keep prose clean.",
          language: "markdown",
          code: `<!-- Inline link -->
[DevCheats](https://devcheats.in)

<!-- With title tooltip -->
[DevCheats](https://devcheats.in "Developer cheat sheets")

<!-- Reference-style — define once, use many times -->
Visit [DevCheats][dc] or [GitHub][gh].

[dc]: https://devcheats.in
[gh]: https://github.com

<!-- Auto-link (GitHub Flavored Markdown) -->
https://devcheats.in`,
        },
        {
          heading: "Images",
          description: "Same as links but prefixed with !. Alt text is required for accessibility.",
          language: "markdown",
          code: `<!-- Inline image -->
![Alt description](./diagram.png)

<!-- With title -->
![Logo](./logo.svg "DevCheats logo")

<!-- Linked image — click to navigate -->
[![Badge](./badge.svg)](https://devcheats.in)

<!-- Reference-style image -->
![Diagram][arch]
[arch]: ./architecture.png "System Architecture"`,
        },
      ],
    },
    {
      id: "code-blocks",
      title: "Code Blocks",
      sections: [
        {
          heading: "Fenced code blocks",
          description: "Triple backticks with a language name enable syntax highlighting in most renderers.",
          language: "markdown",
          code: `\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("World"));
\`\`\`

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"
\`\`\`

\`\`\`bash
npm install && npm run dev
\`\`\``,
        },
        {
          heading: "Diff blocks (GitHub)",
          description: "Use the diff language identifier with + / - prefixes to show additions and deletions.",
          language: "markdown",
          code: `\`\`\`diff
- const x = require('express')
+ import express from 'express'

- app.listen(3000)
+ server.listen(3000, () => console.log('Running'))
\`\`\``,
        },
      ],
    },
    {
      id: "tables-lists",
      title: "Tables & Lists",
      sections: [
        {
          heading: "Lists",
          description: "- or * for unordered; 1. for ordered. Indent 2 spaces to nest.",
          language: "markdown",
          code: `<!-- Unordered -->
- HTML
- CSS
  - Flexbox
  - Grid
- JavaScript

<!-- Ordered -->
1. Install Node
2. Run \`npm install\`
3. Start the dev server

<!-- Task list (GitHub Flavored) -->
- [x] Shiki integration
- [x] Content files
- [ ] Mobile drawer`,
        },
        {
          heading: "Tables",
          description: "Align columns with colons in the separator row.",
          language: "markdown",
          code: `| Technology | Category  | Color    |
|------------|-----------|----------|
| HTML       | Web       | #E34F26  |
| CSS        | Web       | #2965F1  |
| JavaScript | Languages | #F7DF1E  |

<!-- Left / center / right alignment -->
| Left | Center | Right |
|:-----|:------:|------:|
| A    |   B    |     C |`,
        },
        {
          heading: "Horizontal rule & line breaks",
          description: "Three or more dashes, asterisks, or underscores create a <hr>. Two trailing spaces force a line break.",
          language: "markdown",
          code: `---
***
___

Line one  ← two trailing spaces = <br>
Line two continues here.`,
        },
      ],
    },
  ],
};
