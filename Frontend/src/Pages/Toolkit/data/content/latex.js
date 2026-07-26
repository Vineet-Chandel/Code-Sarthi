export default {
  topics: [
    {
      id: "document",
      title: "Document Structure',",
      sections: [
        {
          heading: "Document anatomy",
          description: "Every LaTeX document has a preamble (settings) and a body (content) separated by \\begin{document}.",
          language: "bash",
          code: `% preamble — document class and packages
\\documentclass[12pt, a4paper]{article}

\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[margin=2.5cm]{geometry}
\\usepackage{amsmath, amssymb}  % math
\\usepackage{graphicx}           % images
\\usepackage{hyperref}           % links
\\usepackage{booktabs}           % nice tables
\\usepackage{listings}           % code blocks

\\title{My Document}
\\author{Vineet Chandel}
\\date{\\today}

% document body
\\begin{document}
\\maketitle
\\tableofcontents
\\newpage

\\section{Introduction}
Content here.

\\end{document}`,
        },
        {
          heading: "Sections & cross-references",
          description: "LaTeX auto-numbers sections and generates a table of contents automatically.",
          language: "bash",
          code: `\\section{Background}
\\subsection{Related Work}
\\subsubsection{Detailed Subtopic}

% Label for cross-referencing
\\section{Methodology}\\label{sec:method}

% Reference it anywhere
See Section~\\ref{sec:method} on page~\\pageref{sec:method}.

% Footnotes
This is a claim.\\footnote{Source: example.com, 2024.}

% Hyperlinks (with hyperref)
\\href{https://devcheats.in}{DevCheats}`,
        },
      ],
    },
    {
      id: "text",
      title: "Text & Formatting',",
      sections: [
        {
          heading: "Text styling",
          description: "LaTeX uses commands for emphasis rather than visual markers.",
          language: "bash",
          code: `\\textbf{bold text}
\\textit{italic text}
\\underline{underlined}
\\texttt{monospace code}
\\emph{contextually emphasized}   % italic in normal, upright in italic
\\textsc{Small Capitals}

% Font sizes (relative to document base)
{\\tiny tiny}  {\\small small}  {\\large large}  {\\Large Large}  {\\huge huge}

% Colors (with xcolor package)
\\usepackage{xcolor}
\\textcolor{blue}{blue text}
\\textcolor[HTML]{3B82F6}{custom blue}`,
        },
        {
          heading: "Lists",
          description: "itemize for bullet lists, enumerate for numbered, description for definition lists.",
          language: "bash",
          code: `% Bullet list
\\begin{itemize}
  \\item First item
  \\item Second item
  \\begin{itemize}
    \\item Nested item
  \\end{itemize}
\\end{itemize}

% Numbered list
\\begin{enumerate}
  \\item Step one
  \\item Step two
\\end{enumerate}

% Definition list
\\begin{description}
  \\item[LaTeX] A document preparation system
  \\item[TeX]   The underlying typesetting engine
\\end{description}`,
        },
      ],
    },
    {
      id: "math",
      title: "Math',",
      sections: [
        {
          heading: "Inline & display math",
          description: "$ for inline math; \\[ \\] or equation environment for display math.",
          language: "bash",
          code: `% Inline math
The formula $E = mc^2$ is famous.

% Display math (unnumbered)
\\[
  \\int_0^\\infty e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
\\]

% Numbered equation
\\begin{equation}\\label{eq:euler}
  e^{i\\pi} + 1 = 0
\\end{equation}

% Aligned equations
\\begin{align}
  f(x) &= (x+a)(x+b) \\\\
       &= x^2 + (a+b)x + ab
\\end{align}`,
        },
        {
          heading: "Common math symbols",
          description: "A reference for the most-used symbols in scientific and engineering documents.",
          language: "bash",
          code: `% Fractions, roots, powers
\\frac{a}{b}          % a/b
\\sqrt{x}             % √x
\\sqrt[3]{x}          % ∛x
x^{2}   x_{0}        % superscript, subscript

% Greek letters
\\alpha \\beta \\gamma \\delta \\epsilon \\theta \\lambda \\mu \\pi \\sigma \\omega
\\Gamma \\Delta \\Theta \\Lambda \\Pi \\Sigma \\Omega

% Operators
\\sum_{i=1}^{n}       \\prod_{i=1}^{n}
\\lim_{x \\to 0}       \\int_a^b

% Sets and logic
\\in \\notin \\subset \\cup \\cap \\emptyset
\\forall \\exists \\neg \\land \\lor \\implies \\iff`,
        },
      ],
    },
    {
      id: "tables-figures",
      title: "Tables & Figures',",
      sections: [
        {
          heading: "Tables with booktabs",
          description: "booktabs gives professional-quality horizontal rules. Never use vertical lines in academic tables.",
          language: "bash",
          code: `\\begin{table}[htbp]
  \\centering
  \\caption{Technology Categories}\\label{tab:tech}
  \\begin{tabular}{llr}
    \\toprule
    Technology  & Category  & Count \\\\
    \\midrule
    React       & Web Dev   & 1     \\\\
    TypeScript  & Language  & 1     \\\\
    PostgreSQL  & Database  & 1     \\\\
    \\bottomrule
  \\end{tabular}
\\end{table}`,
        },
        {
          heading: "Figures",
          description: "\\includegraphics places images. Use [H] (requires float package) to force position.",
          language: "bash",
          code: `\\usepackage{graphicx}
\\usepackage{float}

\\begin{figure}[H]   % H = exactly here
  \\centering
  \\includegraphics[width=0.8\\linewidth]{diagram.png}
  \\caption{System architecture}\\label{fig:arch}
\\end{figure}

% Reference the figure
As shown in Figure~\\ref{fig:arch}...

% Side-by-side figures
\\begin{figure}[h]
  \\begin{minipage}{0.48\\linewidth}
    \\includegraphics[width=\\linewidth]{fig1.pdf}
    \\caption{Figure A}
  \\end{minipage}\\hfill
  \\begin{minipage}{0.48\\linewidth}
    \\includegraphics[width=\\linewidth]{fig2.pdf}
    \\caption{Figure B}
  \\end{minipage}
\\end{figure}`,
        },
      ],
    },
  ],
};
