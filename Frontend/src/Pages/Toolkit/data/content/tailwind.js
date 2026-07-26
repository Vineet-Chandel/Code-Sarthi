export default {
  topics: [
    {
      id: "layout",
      title: "Layout Utilities",
      sections: [
        {
          heading: "Flexbox shortcuts",
          description: "Tailwind compresses flex container setup into a few intuitive class names.",
          language: "html",
          code: `<!-- Row: items centered, space between -->
<div class="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Column: vertically centered children -->
<div class="flex flex-col items-center gap-2">
  <h2>Title</h2>
  <p>Subtitle</p>
</div>`,
        },
        {
          heading: "Grid with auto columns",
          description: "Use grid-cols-{n} for fixed grids; add responsive prefixes to stack on mobile.",
          language: "html",
          code: `<!-- 1 col → 2 → 4 as viewport grows -->
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <div class="rounded-xl bg-white/5 p-6">Card A</div>
  <div class="rounded-xl bg-white/5 p-6">Card B</div>
  <div class="rounded-xl bg-white/5 p-6">Card C</div>
  <div class="rounded-xl bg-white/5 p-6">Card D</div>
</div>`,
        },
        {
          heading: "Centering patterns",
          description: "container + mx-auto is the classic page-width wrapper; place-items-center for quick absolute centering.",
          language: "html",
          code: `<!-- Horizontally centered page wrapper -->
<main class="mx-auto max-w-5xl px-4">...</main>

<!-- Full-screen centered element -->
<div class="flex min-h-screen items-center justify-center">
  <div class="text-center">Centered</div>
</div>`,
        },
      ],
    },
    {
      id: "typography",
      title: "Typography",
      sections: [
        {
          heading: "Font size & weight scale",
          description: "Tailwind's type scale maps to rem values. Pair with font-weight for hierarchy.",
          language: "html",
          code: `<h1 class="text-4xl font-bold tracking-tight">Page Heading</h1>
<h2 class="text-2xl font-semibold">Section Heading</h2>
<p  class="text-base font-normal text-zinc-400">Body text</p>
<span class="text-sm font-medium text-zinc-500">Caption</span>
<code class="font-mono text-sm text-blue-400">inline code</code>`,
        },
        {
          heading: "Line clamping",
          description: "Clamp overflowing text to N lines without JS — uses the built-in line-clamp plugin.",
          language: "html",
          code: `<!-- Clamp to 2 lines -->
<p class="line-clamp-2 text-sm text-zinc-400">
  This is a long description that will be cut off after two lines
  and show an ellipsis, regardless of how much text is here.
</p>

<!-- Clamp to 3 lines -->
<p class="line-clamp-3">...</p>`,
        },
        {
          heading: "Truncate & overflow",
          description: "truncate clips to one line with an ellipsis; break-words prevents layout overflow.",
          language: "html",
          code: `<!-- Single-line with ellipsis -->
<p class="truncate max-w-xs">Very long text that will be truncated...</p>

<!-- Multi-line with overflow wrap -->
<div class="break-words max-w-sm">
  https://example.com/very/long/url/that/might/break/layout
</div>`,
        },
      ],
    },
    {
      id: "state-variants",
      title: "State Variants",
      sections: [
        {
          heading: "Hover, focus, active",
          description: "Prefix any utility with a state variant. They stack: hover:focus:bg-blue-700 is valid.",
          language: "html",
          code: `<button
  class="
    rounded-lg bg-blue-600 px-4 py-2 text-white
    hover:bg-blue-500
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400
    active:scale-[0.98]
    transition-all duration-150
  "
>
  Click me
</button>`,
        },
        {
          heading: "Group hover",
          description: "Mark a parent with group, then use group-hover: on any child to react to the parent being hovered.",
          language: "html",
          code: `<div class="group flex items-center gap-3 rounded-xl p-4 hover:bg-white/5">
  <span class="text-white/40 group-hover:text-blue-400 transition-colors">
    <!-- icon -->
  </span>
  <p class="text-white/60 group-hover:text-white transition-colors">
    Item label
  </p>
  <svg class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
</div>`,
        },
        {
          heading: "Peer validation styling",
          description: "peer marks a sibling; peer-invalid: on the next sibling styles when the peer is in invalid state.",
          language: "html",
          code: `<input
  type="email"
  class="peer rounded-lg border border-white/10 bg-white/5 px-3 py-2"
  required
/>
<p class="mt-1 text-sm text-red-400 opacity-0 peer-invalid:opacity-100 transition-opacity">
  Please enter a valid email address.
</p>`,
        },
        {
          heading: "Arbitrary values",
          description: "Use square-bracket notation to escape the scale for one-off values without leaving the class attribute.",
          language: "html",
          code: `<!-- Exact pixel width -->
<div class="w-[320px]">...</div>

<!-- Custom color -->
<p class="text-[#F7DF1E]">JavaScript yellow</p>

<!-- Arbitrary CSS property -->
<div class="[backdrop-filter:blur(20px)]">Glassmorphism</div>

<!-- Negative value -->
<div class="-translate-y-[3px]">...</div>`,
        },
      ],
    },
    {
      id: "dark-mode",
      title: "Dark Mode & Theming",
      sections: [
        {
          heading: "Dark mode variants",
          description: "With darkMode: 'class' in config, prefix utilities with dark: and toggle the class on <html>.",
          language: "html",
          code: `<div class="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
  <p class="text-zinc-600 dark:text-zinc-400">
    Subtitle text adapts automatically.
  </p>
  <button class="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
    Action
  </button>
</div>`,
        },
        {
          heading: "Responsive prefixes",
          description: "Mobile-first by default. sm: applies at 640px+, md: at 768px+, lg: at 1024px+, xl: at 1280px+.",
          language: "html",
          code: `<!-- Stack on mobile, row on desktop -->
<div class="flex flex-col lg:flex-row gap-6">
  <aside class="w-full lg:w-64 shrink-0">Sidebar</aside>
  <main class="flex-1 min-w-0">Content</main>
</div>

<!-- Hidden on mobile, shown on desktop -->
<nav class="hidden lg:block">...</nav>`,
        },
        {
          heading: "Extending the theme in config",
          description: "Add custom design tokens in tailwind.config.js so they're available as utilities across the whole app.",
          language: "javascript",
          code: `// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#3B82F6",
          soft: "#60A5FA",
          dim:  "#2563EB",
        },
        base: {
          950: "#0A0A0B",
          900: "#111113",
        },
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
};`,
        },
      ],
    },
  ],
};
