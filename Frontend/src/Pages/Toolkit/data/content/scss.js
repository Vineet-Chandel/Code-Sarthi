export default {
  topics: [
    {
      id: "variables-nesting",
      title: "Variables & Nesting",
      sections: [
        {
          heading: "Variables",
          description: "SCSS variables start with $. They're resolved at compile time — use CSS custom properties for runtime theming.",
          language: "scss",
          code: `// Declaring variables
$color-primary:  #3b82f6;
$color-bg:       #0a0a0b;
$font-body:      'Inter', sans-serif;
$radius-card:    1rem;
$shadow-glow:    0 0 20px rgba(59, 130, 246, 0.25);

// Using variables
.card {
  background:    $color-bg;
  border-radius: $radius-card;
  box-shadow:    $shadow-glow;
  font-family:   $font-body;
}

.button {
  background: $color-primary;
  &:hover { background: darken($color-primary, 10%); }
}`,
        },
        {
          heading: "Nesting",
          description: "Nest selectors to mirror your HTML structure. & refers to the parent selector.",
          language: "scss",
          code: `.nav {
  display: flex;
  gap: 1rem;

  // Nested child selector → .nav a
  a {
    color: white;
    text-decoration: none;

    // & = .nav a → .nav a:hover
    &:hover { color: $color-primary; }

    // BEM modifier → .nav__link--active
    &.active { font-weight: 600; }
  }

  // Descendant → .nav .nav__logo
  &__logo {
    font-size: 1.25rem;
  }

  // Media inside rule → no need for separate @media block
  @media (max-width: 768px) {
    flex-direction: column;
  }
}`,
        },
        {
          heading: "Partials & @use",
          description: "Split SCSS into files (prefixed with _) and import them with @use. Replaces the deprecated @import.",
          language: "scss",
          code: `// _variables.scss — note the underscore prefix
$color-accent: #3b82f6;
$space-lg: 2rem;

// _buttons.scss
@use 'variables' as v;

.button {
  background: v.$color-accent;
  padding: v.$space-lg / 2;
}

// main.scss — entry point
@use 'variables';
@use 'buttons';
@use 'components/card';`,
        },
      ],
    },
    {
      id: "mixins",
      title: "Mixins",
      sections: [
        {
          heading: "Defining & including mixins",
          description: "Mixins are reusable CSS blocks, optionally accepting arguments with defaults.",
          language: "scss",
          code: `@mixin flex-center($direction: row) {
  display:         flex;
  flex-direction:  $direction;
  align-items:     center;
  justify-content: center;
}

@mixin glass-panel($blur: 20px) {
  background:       rgba(255, 255, 255, 0.03);
  backdrop-filter:  blur($blur);
  border:           1px solid rgba(255, 255, 255, 0.08);
}

// Using mixins
.hero {
  @include flex-center(column);
  min-height: 100vh;
}

.modal {
  @include glass-panel(24px);
  border-radius: 1rem;
}`,
        },
        {
          heading: "@content — passing blocks to mixins",
          description: "@content lets a mixin accept an arbitrary block of styles — useful for media-query shortcuts.",
          language: "scss",
          code: `@mixin respond-to($breakpoint) {
  $bps: (
    'sm': 640px,
    'md': 768px,
    'lg': 1024px,
    'xl': 1280px,
  );
  @media (min-width: map.get($bps, $breakpoint)) {
    @content;
  }
}

.sidebar {
  display: none;

  @include respond-to('lg') {
    display: block;
    width: 260px;
  }
}`,
        },
      ],
    },
    {
      id: "functions",
      title: "Functions & Operators",
      sections: [
        {
          heading: "Built-in color functions",
          description: "SCSS ships color manipulation functions that compute at compile time.",
          language: "scss",
          code: `$primary: #3b82f6;

.button {
  background:  $primary;
  border-color: darken($primary, 10%);   // darker shade

  &:hover {
    background: lighten($primary, 8%);  // lighter shade
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba($primary, 0.4); // rgba() from a variable
  }
}

// mix() blends two colors
$mixed: mix($primary, white, 80%); // 80% primary, 20% white`,
        },
        {
          heading: "@each & @for loops",
          description: "Generate repetitive CSS — spacing scales, color variants, and utility classes.",
          language: "scss",
          code: `// Generate margin utilities m-1 through m-8
@for $i from 1 through 8 {
  .m-#{$i}  { margin:  #{$i * 4}px; }
  .p-#{$i}  { padding: #{$i * 4}px; }
}

// Generate color variants from a map
$tech-colors: (
  'html': #e34f26,
  'css':  #2965f1,
  'js':   #f7df1e,
);

@each $name, $color in $tech-colors {
  .badge--#{$name} {
    background: rgba($color, 0.1);
    color:      $color;
    border:     1px solid rgba($color, 0.3);
  }
}`,
        },
      ],
    },
    {
      id: "extend",
      title: "@extend & Placeholders",
      sections: [
        {
          heading: "@extend",
          description: "Share a set of properties across selectors. Use placeholder selectors (%) to avoid extra classes in output.",
          language: "scss",
          code: `// Placeholder — only emitted when extended, never alone
%visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.sr-only {
  @extend %visually-hidden;
}

.skip-link {
  @extend %visually-hidden;

  &:focus {
    position: static;
    width: auto;
    height: auto;
    clip: auto;
  }
}`,
        },
      ],
    },
  ],
};
