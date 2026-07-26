export default {
  topics: [
    {
      id: "modes",
      title: "Modes & Navigation",
      sections: [
        {
          heading: "Vim modes",
          description: "Vim is modal — the same keys do different things in different modes. This is the core concept.",
          language: "bash",
          code: `# Switch modes
i        — Insert mode (before cursor)
a        — Insert mode (after cursor)
A        — Insert mode (end of line)
o        — Insert mode (new line below)
O        — Insert mode (new line above)
v        — Visual mode (character)
V        — Visual mode (line)
Ctrl+v   — Visual block mode
Esc      — Normal mode (from any mode)
:        — Command-line mode (from Normal)`,
        },
        {
          heading: "Motion commands",
          description: "Motions move the cursor. They can be combined with operators: d3w = delete 3 words.",
          language: "bash",
          code: `# Character
h j k l     — left / down / up / right

# Word
w           — next word start
b           — previous word start
e           — current/next word end

# Line
0           — start of line
^           — first non-blank character
$           — end of line
%           — matching bracket/paren

# File
gg          — first line
G           — last line
42G         — line 42
Ctrl+u      — scroll up half page
Ctrl+d      — scroll down half page`,
        },
        {
          heading: "Search & jump",
          description: "f and t for character search on a line; / and ? for whole-file search.",
          language: "bash",
          code: `# Find character on line
fc          — jump forward to next 'c'
tc          — jump to before next 'c'
Fc          — jump backward to 'c'
;           — repeat last f/t/F
,           — repeat last f/t/F reversed

# File-wide search
/pattern    — search forward
?pattern    — search backward
n           — next match
N           — previous match
*           — search for word under cursor

# Jump list
Ctrl+o      — go back (jump list)
Ctrl+i      — go forward`,
        },
      ],
    },
    {
      id: "editing",
      title: "Editing Commands',",
      sections: [
        {
          heading: "Operators",
          description: "Operators act on motions or text objects: d(delete), c(change), y(yank), >(indent).",
          language: "bash",
          code: `# Delete
dd          — delete line
d$          — delete to end of line
dw          — delete word
d3w         — delete 3 words
daw         — delete a word (including spaces)

# Change (delete + enter insert)
cc          — change whole line
cw          — change word
ci"         — change inside quotes
ca(         — change inside + parens

# Yank (copy) & paste
yy          — yank line
yw          — yank word
p           — paste after cursor
P           — paste before cursor

# Undo / redo
u           — undo
Ctrl+r      — redo`,
        },
        {
          heading: "Text objects",
          description: "Text objects are the superpower of Vim. i=inner, a=around. Works with any operator.",
          language: "bash",
          code: `# Inner — excludes surrounding delimiters
ci"         — change inside double quotes
di'         — delete inside single quotes
yi{         — yank inside curly braces
vi(         — visually select inside parens

# Around — includes surrounding delimiters
ca"         — change a double-quoted string (with quotes)
da'         — delete a single-quoted string (with quotes)

# Word / sentence / paragraph
diw         — delete inner word
das         — delete a sentence
dip         — delete inner paragraph

# HTML tag
dit         — delete inside tag
cit         — change inside tag`,
        },
      ],
    },
    {
      id: "search-replace",
      title: "Search & Replace",
      sections: [
        {
          heading: "Substitution",
          description: ":s is Vim's search & replace. g = all on line, % = whole file, c = confirm each.",
          language: "bash",
          code: `# Current line only
:s/old/new/       — first match on line
:s/old/new/g      — all matches on line

# Whole file
:%s/old/new/g     — all matches in file
:%s/old/new/gc    — all matches with confirmation

# Specific lines
:5,20s/old/new/g  — lines 5-20
:'<,'>s/old/new/g — visual selection (auto-filled)

# Case-insensitive
:%s/old/new/gi

# Use current word under cursor
:%s/<Ctrl+r><Ctrl+w>/new/g`,
        },
      ],
    },
    {
      id: "vimrc",
      title: ".vimrc & Plugins',",
      sections: [
        {
          heading: "Essential .vimrc",
          description: "A minimal .vimrc that makes Vim modern and comfortable.",
          language: "bash",
          code: `" ~/.vimrc

set nocompatible        " no legacy vi mode
filetype plugin indent on
syntax on

set number relativenumber  " hybrid line numbers
set cursorline
set signcolumn=yes

set tabstop=2 shiftwidth=2 expandtab
set autoindent smartindent
set wrap linebreak

set ignorecase smartcase   " smart case search
set hlsearch incsearch

set clipboard=unnamedplus  " system clipboard
set mouse=a                " mouse support

set splitbelow splitright  " natural splits

" Leader key
let mapleader = " "

" Quick escape from insert
inoremap jk <Esc>

" Clear search highlight
nnoremap <leader>h :noh<CR>`,
        },
      ],
    },
  ],
};
