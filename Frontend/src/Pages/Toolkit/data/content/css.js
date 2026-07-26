export default {
  topics: [
    {
      id: "flexbox",
      title: "Flexbox",
      sections: [
        {
          heading: "Flex container basics",
          description: "Turn any element into a flex container. Children become flex items arranged on a single row by default.",
          language: "css",
          code: `.container {
  display: flex;
  flex-direction: row;       /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap;           /* nowrap | wrap | wrap-reverse */
  justify-content: center;   /* main axis alignment */
  align-items: center;       /* cross axis alignment */
  gap: 1rem;
}`,
        },
        {
          heading: "Flex item sizing",
          description: "flex is shorthand for grow / shrink / basis. flex: 1 makes all siblings share space equally.",
          language: "css",
          code: `.item {
  flex: 1 1 0%;  /* grow shrink basis */
}

/* Common patterns */
.item-fixed  { flex: 0 0 200px; }   /* never grow/shrink */
.item-grow   { flex: 1; }           /* fill remaining space */
.item-auto   { flex: 0 1 auto; }    /* shrink but don't grow */`,
        },
        {
          heading: "Alignment shortcuts",
          description: "Use align-self to override the container's align-items for a single child.",
          language: "css",
          code: `.parent {
  display: flex;
  align-items: flex-start;
}

.child-centered {
  align-self: center;   /* overrides parent */
  margin-left: auto;    /* push to the right */
}`,
        },
        {
          heading: "Centering trick",
          description: "The fastest way to center anything — both axes — with a single rule set.",
          language: "css",
          code: `.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;

  /* or shorthand: */
  place-items: center;  /* grid-only, but works in modern browsers */
}`,
        },
      ],
    },
    {
      id: "grid",
      title: "CSS Grid",
      sections: [
        {
          heading: "Defining a grid",
          description: "grid-template-columns controls column widths. Use fr (fraction) units to distribute remaining space.",
          language: "css",
          code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  grid-template-rows: auto;
  gap: 1.5rem;
}

/* Responsive: as many ~280px columns as fit */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}`,
        },
        {
          heading: "Placing items",
          description: "Span items across multiple columns or rows using grid-column / grid-row shorthand.",
          language: "css",
          code: `.header { grid-column: 1 / -1; }     /* full width */
.sidebar { grid-column: 1 / 2; }
.main    { grid-column: 2 / -1; }

/* Span syntax */
.featured {
  grid-column: span 2;
  grid-row: span 2;
}`,
        },
        {
          heading: "Named template areas",
          description: "Name each region to place items semantically — far more readable than line numbers.",
          language: "css",
          code: `.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
}

header  { grid-area: header; }
nav     { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }`,
        },
      ],
    },
    {
      id: "custom-properties",
      title: "Custom Properties",
      sections: [
        {
          heading: "Declaring and using variables",
          description: "CSS custom properties (variables) cascade like any other property and can be overridden at any scope.",
          language: "css",
          code: `:root {
  --color-bg: #0a0a0b;
  --color-accent: #3b82f6;
  --radius-card: 1rem;
  --space-lg: 2rem;
}

.card {
  background: var(--color-bg);
  border-radius: var(--radius-card);
  padding: var(--space-lg);
  border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
}`,
        },
        {
          heading: "Fallback values",
          description: "The second argument to var() is the fallback, used when the variable is not defined.",
          language: "css",
          code: `.button {
  background: var(--btn-bg, #3b82f6);
  color: var(--btn-text, white);
  padding: var(--btn-padding, 0.5rem 1rem);
}`,
        },
        {
          heading: "Theming with custom properties",
          description: "Override the same variables in a [data-theme] selector to switch themes with zero JS.",
          language: "css",
          code: `:root {
  --bg: #fff;
  --text: #111;
}

[data-theme="dark"] {
  --bg: #0a0a0b;
  --text: #f4f4f5;
}

body {
  background: var(--bg);
  color: var(--text);
}`,
        },
      ],
    },
    {
      id: "animations",
      title: "Animations & Transitions",
      sections: [
        {
          heading: "Transitions",
          description: "Animate specific properties smoothly between states. Always list the specific properties — avoid transition: all.",
          language: "css",
          code: `.button {
  background: #3b82f6;
  transform: translateY(0);
  box-shadow: none;
  transition:
    background 200ms ease,
    transform  150ms ease,
    box-shadow 200ms ease;
}

.button:hover {
  background: #60a5fa;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgba(59, 130, 246, 0.4);
}`,
        },
        {
          heading: "@keyframes animation",
          description: "Define reusable keyframe sequences and apply them with the animation shorthand.",
          language: "css",
          code: `@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fade-up 0.4s ease forwards;
  animation-delay: 100ms;
}`,
        },
        {
          heading: "Respecting motion preferences",
          description: "Always wrap heavy animations in a prefers-reduced-motion query.",
          language: "css",
          code: `@media (prefers-reduced-motion: no-preference) {
  .card {
    animation: fade-up 0.4s ease forwards;
  }
}

/* Or globally disable everything */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
        },
      ],
    },
  ],
};
