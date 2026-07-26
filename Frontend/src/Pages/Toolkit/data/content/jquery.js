export default {
  topics: [
    {
      id: "selectors",
      title: "Selectors",
      sections: [
        {
          heading: "Basic selectors",
          description: "jQuery wraps CSS selectors in $() returning a jQuery object with chainable methods.",
          language: "javascript",
          code: `// By tag, class, ID
$("p")          // all <p> elements
$(".card")      // elements with class "card"
$("#header")    // element with id "header"

// Attribute
$("input[type='email']")

// Pseudo-selectors
$("li:first-child")
$("tr:nth-child(odd)")
$("input:checked")`,
        },
        {
          heading: "Traversal",
          description: "Move around the DOM tree relative to a selected element.",
          language: "javascript",
          code: `const $card = $(".card");

$card.parent()            // direct parent
$card.parents(".wrapper") // ancestors matching selector
$card.children(".title")  // direct children
$card.find("img")         // any descendant
$card.siblings("li")      // sibling elements
$card.next()              // next sibling
$card.prev()              // previous sibling
$card.closest(".modal")   // nearest matching ancestor`,
        },
        {
          heading: "Filtering",
          description: "Narrow a selection down using filter methods.",
          language: "javascript",
          code: `$("li").filter(".active")         // keep elements matching selector
$("li").not(".disabled")          // remove elements matching selector
$("li").eq(2)                     // element at index 2
$("li").first()                   // first element
$("li").last()                    // last element
$("li").has("a")                  // elements that contain an <a>

// Filter with a function
$("li").filter(function () {
  return $(this).text().length > 10;
});`,
        },
      ],
    },
    {
      id: "dom",
      title: "DOM Manipulation",
      sections: [
        {
          heading: "Reading & writing content",
          description: "text() and html() get or set content; val() targets form inputs.",
          language: "javascript",
          code: `// Getters (called with no argument)
const text  = $("h1").text();      // plain text
const html  = $(".card").html();   // inner HTML
const value = $("input").val();    // form value

// Setters (called with argument)
$("h1").text("New title");
$(".card").html("<strong>Bold</strong>");
$("input").val("hello@example.com");`,
        },
        {
          heading: "Attributes & CSS",
          description: "attr() reads/writes HTML attributes; css() reads/writes inline styles.",
          language: "javascript",
          code: `// Attributes
$("img").attr("src");                  // get
$("img").attr("alt", "Logo");          // set
$("a").attr({ href: "/about", target: "_blank" }); // set multiple
$("input").removeAttr("disabled");

// CSS classes
$(".btn").addClass("active");
$(".btn").removeClass("active");
$(".btn").toggleClass("active");
$(".btn").hasClass("active");          // boolean

// Inline CSS
$(".box").css("opacity", 0.5);
$(".box").css({ width: "200px", background: "#3b82f6" });`,
        },
        {
          heading: "Creating & inserting elements",
          description: "Build new DOM nodes and insert them relative to existing elements.",
          language: "javascript",
          code: `// Creating
const $item = $("<li>").text("New item").addClass("list-item");

// Inserting (inside the target)
$("ul").append($item);         // as last child
$("ul").prepend($item);        // as first child

// Inserting (around the target)
$(".card").after("<hr />");    // after the element
$(".card").before("<hr />");   // before the element

// Wrapping / removing
$("p").wrap("<blockquote>");
$(".tooltip").remove();
$(".content").empty();         // remove all children`,
        },
        {
          heading: "Dimensions & position",
          description: "Read layout metrics without requiring raw offsetTop arithmetic.",
          language: "javascript",
          code: `$(".box").width()          // content width (px)
$(".box").outerWidth(true)  // + padding + border + margin

const pos = $(".card").offset();  // { top, left } relative to document
const rel = $(".child").position(); // { top, left } relative to parent

// Scroll position
$(window).scrollTop()         // current scroll Y
$(".panel").scrollLeft()      // current scroll X`,
        },
      ],
    },
    {
      id: "events",
      title: "Events",
      sections: [
        {
          heading: "Attaching handlers",
          description: "Use .on() for all event binding — it supports delegation and is the modern API.",
          language: "javascript",
          code: `// Direct binding
$(".btn").on("click", function () {
  console.log($(this).text());
});

// Event delegation — works on future elements too
$(document).on("click", ".dynamic-btn", function () {
  $(this).toggleClass("active");
});

// Multiple events
$("input").on("focus blur", function (e) {
  $(this).toggleClass("focused", e.type === "focus");
});`,
        },
        {
          heading: "Common event shorthands",
          description: "jQuery provides shorthand methods for the most-used events.",
          language: "javascript",
          code: `$(".btn").click(handler);
$("input").keyup(handler);
$("form").submit(function (e) {
  e.preventDefault();
  // handle form submit
});

$(".card").hover(
  function () { $(this).addClass("hovered"); },    // mouseenter
  function () { $(this).removeClass("hovered"); }  // mouseleave
);`,
        },
        {
          heading: "Triggering & removing",
          description: "Programmatically fire events or clean up listeners.",
          language: "javascript",
          code: `// Trigger an event programmatically
$(".btn").trigger("click");
$("form").trigger("submit");

// Trigger custom events
$(".card").trigger("card:selected", [{ id: 42 }]);
$(".card").on("card:selected", function (e, data) {
  console.log(data.id);
});

// Remove listeners
$(".btn").off("click");               // remove all click handlers
$(".btn").off("click", specificFn);  // remove one specific handler`,
        },
      ],
    },
    {
      id: "ajax",
      title: "AJAX",
      sections: [
        {
          heading: "$.ajax — full control",
          description: "The low-level API that all jQuery AJAX helpers use internally.",
          language: "javascript",
          code: `$.ajax({
  url: "/api/users",
  method: "GET",
  dataType: "json",
  success(data) {
    console.log(data);
  },
  error(xhr, status, err) {
    console.error(err);
  },
});`,
        },
        {
          heading: "Shorthand methods",
          description: "$.get and $.post cover the 90% case; $.getJSON adds automatic JSON parsing.",
          language: "javascript",
          code: `// GET
$.get("/api/users", function (data) {
  console.log(data);
});

// POST with data
$.post("/api/users", { name: "Vineet" }, function (response) {
  console.log(response);
});

// GET with JSON auto-parse
$.getJSON("/api/users", function (users) {
  users.forEach((u) => console.log(u.name));
});`,
        },
        {
          heading: "Promise API",
          description: "$.ajax() returns a Deferred — chain .done(), .fail(), and .always() like promises.",
          language: "javascript",
          code: `$.ajax({ url: "/api/users", method: "GET" })
  .done(function (data) {
    // success
  })
  .fail(function (xhr) {
    console.error(xhr.status);
  })
  .always(function () {
    $(".spinner").hide();
  });`,
        },
      ],
    },
  ],
};
