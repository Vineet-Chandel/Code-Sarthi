export default {
  topics: [
    {
      id: "core-attributes",
      title: "Core Attributes",
      sections: [
        {
          heading: "hx-get / hx-post / hx-put / hx-delete",
          description: "Issue any HTTP verb on a trigger (click, submit, etc.) and swap the response into the DOM.",
          language: "html",
          code: `<!-- GET on click (default trigger) -->
<button hx-get="/api/count" hx-target="#result">
  Get Count
</button>

<!-- POST on form submit -->
<form hx-post="/api/users" hx-target="#users-list">
  <input name="name" type="text" />
  <button type="submit">Add User</button>
</form>

<!-- DELETE with confirmation -->
<button
  hx-delete="/api/users/42"
  hx-confirm="Delete this user?"
  hx-target="closest tr"
  hx-swap="outerHTML"
>
  Delete
</button>`,
        },
        {
          heading: "hx-target & hx-swap",
          description: "hx-target picks where the response HTML lands; hx-swap controls how it's inserted.",
          language: "html",
          code: `<!-- Replace inner content (default) -->
<button hx-get="/fragment" hx-target="#panel" hx-swap="innerHTML">Load</button>

<!-- Replace the element itself -->
<li hx-get="/item/1" hx-swap="outerHTML">Click me</li>

<!-- Append / prepend -->
<button hx-get="/more-items" hx-target="#list" hx-swap="beforeend">Load More</button>

<!-- Swap values:
  innerHTML   — replace children (default)
  outerHTML   — replace the element itself
  afterbegin  — prepend inside target
  beforeend   — append inside target
  beforebegin — insert before target
  afterend    — insert after target
  delete      — remove target, ignore response
  none        — don't touch DOM
-->`,
        },
        {
          heading: "hx-trigger",
          description: "Override when the request fires. Default is click for buttons, submit for forms, change for inputs.",
          language: "html",
          code: `<!-- Fire on input with 300ms debounce -->
<input hx-get="/search" hx-trigger="input changed delay:300ms" hx-target="#results" />

<!-- Fire every 2 seconds (polling) -->
<div hx-get="/status" hx-trigger="every 2s" hx-target="this">...</div>

<!-- Multiple triggers -->
<div hx-get="/data" hx-trigger="load, click">...</div>

<!-- Custom event -->
<div hx-get="/refresh" hx-trigger="refreshed from:body">...</div>`,
        },
        {
          heading: "hx-vals & hx-include",
          description: "Send extra values beyond the natural form/element data.",
          language: "html",
          code: `<!-- Send extra JSON values -->
<button
  hx-post="/api/action"
  hx-vals='{"userId": 42, "action": "approve"}'
>
  Approve
</button>

<!-- Include values from another element -->
<input id="search-input" type="text" />
<button
  hx-get="/search"
  hx-include="#search-input"
  hx-target="#results"
>
  Search
</button>`,
        },
      ],
    },
    {
      id: "indicators",
      title: "Loading & Indicators",
      sections: [
        {
          heading: "hx-indicator",
          description: "Show a spinner during the request. HTMX adds htmx-request class to the indicator element.",
          language: "html",
          code: `<button hx-get="/slow-endpoint" hx-indicator="#spinner">
  Load Data
</button>

<div id="spinner" class="htmx-indicator">
  Loading…
</div>

<style>
  .htmx-indicator { display: none; }
  .htmx-request .htmx-indicator,
  .htmx-request.htmx-indicator { display: block; }
</style>`,
        },
        {
          heading: "hx-disabled-elt",
          description: "Disable specific elements during an in-flight request to prevent double-submission.",
          language: "html",
          code: `<form hx-post="/api/submit" hx-disabled-elt="button[type='submit']">
  <input name="email" type="email" />
  <button type="submit">Submit</button>
</form>`,
        },
      ],
    },
    {
      id: "oob-events",
      title: "Out-of-Band & Events",
      sections: [
        {
          heading: "hx-swap-oob — update multiple targets",
          description: "Return fragments with hx-swap-oob to update parts of the page outside the main target.",
          language: "html",
          code: `<!-- Server response HTML can include: -->
<div id="main-content">Primary response content here</div>

<!-- Out-of-band: updates #notification without being in hx-target -->
<div id="notification" hx-swap-oob="true">
  ✅ Saved successfully
</div>`,
        },
        {
          heading: "JavaScript event hooks",
          description: "HTMX fires custom events on every request lifecycle step.",
          language: "javascript",
          code: `// Before request
document.addEventListener("htmx:beforeRequest", (e) => {
  console.log("Requesting:", e.detail.requestConfig.path);
});

// After successful swap
document.addEventListener("htmx:afterSwap", (e) => {
  // Re-initialise any vanilla JS plugins
  initTooltips(e.detail.target);
});

// On error
document.addEventListener("htmx:responseError", (e) => {
  console.error("Status:", e.detail.xhr.status);
});`,
        },
        {
          heading: "htmx.trigger — fire events from JS",
          description: "Programmatically trigger HTMX-attached elements from JavaScript.",
          language: "javascript",
          code: `// Trigger the default event (e.g., click) on an element
htmx.trigger("#my-button", "click");

// Trigger a custom event
htmx.trigger("body", "refreshed");

// Find and trigger
const el = document.querySelector("#search-input");
htmx.trigger(el, "search");`,
        },
      ],
    },
    {
      id: "forms",
      title: "Forms & Validation",
      sections: [
        {
          heading: "Server-side validation responses",
          description: "Return a 422 status to re-render the form with errors without a full page reload.",
          language: "html",
          code: `<!-- Form with HTMX -->
<form hx-post="/register" hx-target="this" hx-swap="outerHTML">
  <input name="email" type="email" required />
  <button type="submit">Register</button>
</form>

<!--
  On success: server returns 200 with new HTML (e.g., success message)
  On error:   server returns 422 with the form HTML + inline errors
  HTMX swaps accordingly in both cases
-->`,
        },
        {
          heading: "hx-push-url — update the browser URL",
          description: "Maintain correct browser history and deep-linking when HTMX drives navigation.",
          language: "html",
          code: `<!-- Push current URL to history on swap -->
<a href="/about" hx-get="/about" hx-target="#page" hx-push-url="true">
  About
</a>

<!-- Use a specific URL (different from the request URL) -->
<button hx-get="/api/page2" hx-target="#content" hx-push-url="/page/2">
  Next Page
</button>`,
        },
      ],
    },
  ],
};
