export default {
  categories: [
    {
      title: "CSS Basics",
      topicIds: ["css-introduction", "css-syntax", "css-combinators", "css-selectors", "css-comments"]
    },
    {
      title: "Styling & Properties",
      topicIds: ["css-colors", "css-background", "css-borders", "css-margins", "css-padding", "css-overflow", "css-height-width"]
    },
    {
      title: "Text & Fonts",
      topicIds: ["css-text-formatting", "css-fonts", "css-text-align", "css-text-decoration"]
    },
    {
      title: "Layouts & Design",
      topicIds: ["css-box-model", "css-display-property", "css-float-clear", "css-overflow-property", "css-z-index-property"]
    },
    {
      title: "Modern Layout Systems",
      topicIds: ["flexbox", "css-justify-content-property", "css-align-items-property", "css-align-content-property", "grid", "css-grid-template-columns-property", "css-grid-gap-property"]
    },
    {
      title: "Effects, Animations & Advanced CSS",
      topicIds: ["css-transitions", "css-transform-property", "animations", "css-box-shadow", "css-text-shadow", "css-specificity", "custom-properties", "css-variables", "css-pseudo-classes", "css-pseudo-elements"]
    }
  ],
  topics: [
    {
      id: "css-introduction",
      category: "CSS Basics",
      shortTitle: "Introduction",
      title: "CSS Introduction",
      sections: [
        {
          heading: "CSS Introduction",
          description:
            "CSS (Cascading Style Sheets) is a language designed to simplify the process of making web pages presentable.\n\nIt allows you to apply styles to HTML documents by prescribing colors, fonts, spacing, and positioning.\n- CSS separates content from styling and enables reuse across pages.\n- HTML uses tags, and CSS uses rule sets.\n- CSS styles are applied to the HTML element using selectors.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785142608/8fe029bb-9ead-4626-9918-4ed2fd3f7277.png",
            alt: "CSS Introduction Overview",
          },
        },
        {
          heading: "Understanding Cascading",
          description:
            "Cascading in CSS defines how the browser resolves conflicts between multiple CSS rules using importance, specificity, and source order.\n\n- CSS follows a hierarchy — Inline, Internal, External styles.\n- Specificity decides which selector has more weight.\n- Later rules override earlier ones if they have equal priority.",
        },
        {
          heading: "Key Features of CSS",
          description:
            "- **Cascading:** Styles can come from multiple sources, and the browser decides which one wins based on priority.\n- **Selectors:** Powerful patterns to target specific elements (by tag, class, id, etc.).\n- **Responsive Design:** CSS makes websites look good on mobiles, tablets, and desktops.\n- **Reusability:** One stylesheet can control hundreds of pages.",
        },
        {
          heading: "CSS Example",
          description: "A simple example showing how CSS styles are applied to HTML elements.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Styled Page</title>
    <style>
        body {
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }
        h1 {
            color: #258D46;
            font-size: 48px;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        p {
            color: #D35400;
            font-size: 20px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Welcome to CSS</h1>
    <p>This is a beautifully styled paragraph using CSS.</p>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785142874/8cdf537c-5a50-4430-9c74-e8f8964affc9.png",
            alt: "CSS Example Output",
            caption: "Output of the CSS styled page in a browser",
          },
        },
        {
          heading: "Advantages of CSS",
          description:
            "Here are some advantages of CSS:\n\n- Makes web design and maintenance easier.\n- Improves website performance and user experience.\n- Supports responsive and adaptive designs for all devices.\n- Write CSS once and reuse it across multiple HTML pages.\n- Change the style globally with a single modification.\n- Clean coding technique that improves readability for search engines.\n- Offers a wider array of attributes compared to HTML.\n- CSS can store web applications locally using an offline cache, allowing offline viewing.",
        },
      ],
    },
    {
      id: "css-syntax",
      category: "CSS Basics",
      shortTitle: "Syntax",
      title: "CSS Syntax",
      sections: [
        {
          heading: "CSS Syntax",
          description:
            "CSS syntax defines how CSS rules are written so that browsers can interpret and apply them to HTML elements. It is useful for styling and designing web pages efficiently.\n\n- It defines how styles are applied to HTML elements.\n- It uses selectors to target elements.\n- It consists of properties and values inside a declaration block.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785143481/1668e82d-e89d-49f9-90c1-790287b7e01e.png",
            alt: "CSS Syntax Diagram",
          },
        },
        {
          heading: "Anatomy of a CSS Rule",
          description:
            "- **Selector:** Targets the HTML element \"h1\" to apply styles.\n- **Declaration Block:** Enclosed in curly braces { }, contains one or more declarations.\n- **Property:** Specifies the style attribute, here \"color\" for text color.\n- **Value:** Defines the property's setting, here \"blue\" for the text hue.\n- **Overall Structure:** Forms a complete CSS rule: h1 { color: blue; }, styling h1 headings blue.",
        },
        {
          heading: "CSS Syntax Example",
          description:
            "- **h1:** This selector targets all <h1> elements on the page. The style applied to <h1> will set the text color to blue and the font size to 24px.\n- **p:** This selector targets all <p> elements. The text color will be green and the font size will be 16px.",
          language: "html",
          code: `<html>
<head>
    <style>
        /* CSS Rule */
        h1 {
            color: blue;
            /* Property: value */
            font-size: 24px;
        }

        p {
            color: green;
            font-size: 16px;
        }
    </style>
</head>

<body>
    <h1>Hello, World!</h1>
    <p>This is a simple paragraph.</p>
</body>
</html>`,
        },
        {
          heading: "Declaration Block in CSS Syntax",
          description:
            "Each declaration consists of a property and a value, separated by a colon, and each declaration is followed by a semicolon.\n\n**1. Properties:** Properties are the aspects of the selected elements you want to style (like color, width, height, etc.).\n\n- color: Defines the text color.\n- background-color: Defines the background color of an element.\n- font-size: Sets the size of the font.\n- margin: Specifies the space around an element.\n- padding: Defines the space between the element's content and its border.\n\n**2. Values:** Values define the specifics of the property you want to apply, such as a color name, a number (e.g., 16px), or percentages (e.g., 50%).",
        },
      ],
    },
    {
      id: "css-combinators",
      category: "CSS Basics",
      shortTitle: "Combinators",
      title: "CSS Combinators",
      sections: [
        {
          heading: "CSS Combinators",
          description:
            "CSS combinators define the relationship between two selectors. CSS selectors are patterns used to select elements for styling.\n\n- A CSS selector can be simple or complex, consisting of more than one selector connected using combinators.\n- Understanding these combinators is essential for precise and efficient styling in CSS.",
        },
        {
          heading: "1. General Sibling Selector (~)",
          description:
            "The general sibling selector selects elements that follow a specified element and share the same parent. This can be useful for selecting groups of elements with the same parent.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
  
<head>
    <title>Combinator Property</title>
    <style>
        div ~ p{
            color: #009900;
            font-size:32px;
            font-weight:bold;
            margin:0px;
            text-align:center;
        }
        div {
            text-align:center;
        }
    </style>
</head>

<body>
    <div>General sibling selector property</div>
    <p>Code Sarthi</p>
    <div>
        <div>child div content</div>
        <p>CS</p>
    </div>
    <p>Sarthi</p>
    <p>Hello</p>
</body>
  
</html>`,
        },
        {
          heading: "2. Adjacent Sibling Selector (+)",
          description:
            "The adjacent sibling selector selects an element that is immediately next to a specified element. This selector selects only the next sibling.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Combinator Property</title>
    <style>
        div + p{
            color: #009900;
            font-size:32px;
            font-weight:bold;
            margin:0px;
            text-align:center;
        }
        div {
            text-align:center;
        }
        p {
            text-align:center;
        }
    </style>
</head>

<body>
    <div>Adjacent sibling selector property</div>
    <p>Code Sarthi</p>
    <div>
        <div>child div content</div>
        <p>CS</p>
    </div>
    <p>Sarthi</p>
    <p>Hello</p>
</body>
  
</html>`,
        },
        {
          heading: "3. Child Selector (>)",
          description:
            "The child selector selects elements that are direct children of a specified element. This combinator is stricter than the descendant selector, as it selects only the direct children.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
  
<head>
    <title>Combinator Property</title>
    <style>
        div > p{
            color: #009900;
            font-size:32px;
            font-weight:bold;
            margin:0px;
            text-align:center;
        }
        div {
            text-align:center;
        }
        p {
            text-align:center;
        }
    </style>
</head>

<body>
    <div>Child selector property</div>
    <p>Code Sarthi</p>
    <div>
        <div>child div content</div>
        <p>CS</p>
    </div>
    <p>Sarthi</p>
    <p>Hello</p>
</body>
  
</html>`,
        },
        {
          heading: "4. Descendant Selector (space)",
          description:
            "The descendant selector selects all elements that are descendants of a specified element. These elements can be any level deep within the specified element.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
  
<head>
    <title>Combinator Property</title>
    <style>
        div p{
            color: #009900;
            font-size:32px;
            font-weight:bold;
            margin:0px;
            text-align:center;
        }
        div {
            text-align:center;
        }
        p {
            text-align:center;
        }
    </style>
</head>

<body>
    <div>Descendant selector property</div>
    <p>Code Sarthi</p>
    <div>
        <div>child div content</div>
        <p>CS</p>
        <p>Descendant selector</p>
    </div>
    <p>Sarthi</p>
    <p>Hello</p>
</body>
  
</html>`,
        },
        {
          heading: "Summary",
          description:
            "Understanding and using CSS combinators effectively can greatly enhance your ability to style web pages precisely.\n\n- Each combinator serves a unique purpose and can be utilized to target elements based on their relationships within the HTML structure.\n- Mastering these combinators is essential for any web developer looking to create sophisticated and well-structured stylesheets.",
        },
      ],
    },
    {
      id: "css-selectors",
      category: "CSS Basics",
      shortTitle: "Selectors",
      title: "CSS Selectors",
      sections: [
        {
          heading: "CSS Selectors",
          description:
            "CSS Selectors are patterns used in CSS to select and target HTML elements so that styles can be applied to them. They define which elements on a web page should receive specific styling rules.\n\n- Used to select HTML elements based on tag name, class, id, or attributes.\n- Help apply styles like color, font, spacing, and layout.\n- Make web pages structured, consistent, and visually appealing.\n\nCSS selectors are commonly grouped into five main categories: Basic, Combinator, Attribute, Pseudo-Classes, and Pseudo-Elements.",
        },
        {
          heading: "1. Basic Selectors",
          description:
            "Basic selectors in CSS are simple tools used for selecting by HTML element name (e.g., h1), class (.className), ID (#idName), or universally (* for all elements).",
        },
        {
          heading: "Universal Selector (*)",
          description:
            "Selects all elements on the page and applies the same style universally.\n\nExample: Setting the font color for every element.",
          language: "html",
          code: `<html>
<head>
    <style>
        * {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Header Text</h1>
    <p>Paragraph Text</p>
</body>
</html>`,
        },
        {
          heading: "Element Selector",
          description:
            "Targets all elements of a specific type, such as paragraphs or headers.\n\nExample: Setting a common font size for all paragraphs.",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            font-size: 16px;
        }
    </style>
</head>
<body>
    <p>This paragraph styled with font size 16px.</p>
</body>
</html>`,
        },
        {
          heading: "Class Selector (.)",
          description:
            "Applies styles to elements with a specific class attribute.\n\nExample: Making all buttons have a blue background.",
          language: "html",
          code: `<html>
<head>
    <style>
        .button {
            background-color: blue;
            color: white;
        }
    </style>
</head>
<body>
    <button class="button">Click Me!</button>
</body>
</html>`,
        },
        {
          heading: "ID Selector (#)",
          description:
            "Styles a single element identified by its unique id.\n\nExample: Changing the background color of a header.",
          language: "html",
          code: `<html>
<head>
    <style>
        #header {
            background-color: gray;
        }
    </style>
</head>
<body>
    <div id="header">This is the header section.</div>
</body>
</html>`,
        },
        {
          heading: "2. Combinator Selectors",
          description:
            "Used to define relationships between selectors, allowing you to style elements based on their hierarchy or positioning in the document. Common combinators include descendant ( ), child (>), adjacent sibling (+), and general sibling (~).",
        },
        {
          heading: "Descendant Selector (space)",
          description:
            "Targets an element inside another, such as paragraphs inside a div.\n\nExample: Styling paragraphs inside a div.",
          language: "html",
          code: `<html>
<head>
    <style>
        div p {
            color: red;
        }
    </style>
</head>
<body>
    <div>
        <p>This paragraph inside a div will be red.</p>
    </div>
</body>
</html>`,
        },
        {
          heading: "Child Selector (>)",
          description:
            "Only affects the direct child elements of a parent.\n\nExample: Styling direct children paragraphs of a div.",
          language: "html",
          code: `<html>
<head>
    <style>
        div > p {
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <div>
        <p>This is a direct child and has a left margin.</p>
        <div>
            <p>This is not a direct child.</p>
        </div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Adjacent Sibling Selector (+)",
          description:
            "Styles an element immediately following another.\n\nExample: Making the first paragraph bold after an h1.",
          language: "html",
          code: `<html>
<head>
    <style>
        h1 + p {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>This is a header.</h1>
    <p>This is immediately following the header and is bold.</p>
    <p>This will not be bold.</p>
</body>
</html>`,
        },
        {
          heading: "General Sibling Selector (~)",
          description:
            "Styles all siblings that follow a specific element.\n\nExample: Italicizing all paragraphs following an h1.",
          language: "html",
          code: `<html>
<head>
    <style>
        h1 ~ p {
            font-style: italic;
        }
    </style>
</head>
<body>
    <h1>This is a header.</h1>
    <p>This is a sibling of the header and will be italicized.</p>
    <p>This will also be italicized because it's a sibling of the header.</p>
</body>
</html>`,
        },
        {
          heading: "3. Attribute Selectors",
          description:
            "Attribute selectors in CSS target elements based on the presence or value of their attributes.",
        },
        {
          heading: "Presence Selector [attr]",
          description:
            "Selects elements that contain a specific attribute.\n\nExample: Styling all inputs with a type attribute.",
          language: "html",
          code: `<html>
<head>
    <style>
        input[type] {
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <input type="text" placeholder="Text input">
    <input type="number" placeholder="Number input">
</body>
</html>`,
        },
        {
          heading: "Attribute Value Selector [attr=\"value\"]",
          description:
            "Targets elements with a particular attribute value.\n\nExample: Styling text inputs.",
          language: "html",
          code: `<html>
<head>
    <style>
        input[type="text"] {
            background-color: yellow;
        }
    </style>
</head>
<body>
    <input type="text" placeholder="Text input">
    <input type="password" placeholder="Password input">
</body>
</html>`,
        },
        {
          heading: "Starts With Selector (^=)",
          description:
            "Matches elements where the attribute value starts with a specific string.\n\nExample: Styling links with https in their href.",
          language: "html",
          code: `<html>
<head>
    <style>
        a[href^="https"] {
            color: green;
        }
    </style>
</head>
<body>
    <a href="https://example.com/">Secure link</a>
    <a href="http://example.com/">Non-secure link</a>
</body>
</html>`,
        },
        {
          heading: "Wildcard Selector (*=)",
          description:
            "Matches elements where the attribute value contains a specific string.\n\nExample: Underlining links with 'example' in the URL.",
          language: "html",
          code: `<html>
<head>
    <style>
        a[href*="example"] {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <a href="https://example.com/">This contains 'example' and is underlined.</a>
    <a href="https://otherlink.com">This is not underlined.</a>
</body>
</html>`,
        },
        {
          heading: "Ends With Selector ($=)",
          description:
            "Matches elements whose attribute value ends with a specific string.\n\nExample: Styling links that end with .pdf in their URL.",
          language: "css",
          code: `a[href$=".pdf"] {
    color: red;
}`,
        },
        {
          heading: "Word Match Selector (~=)",
          description:
            "Matches elements whose attribute contains a specific whole word (space-separated).\n\nExample: Styling elements that have the class 'highlight' among multiple class names.",
          language: "css",
          code: `p[class~="highlight"] {
    background: yellow;
}`,
        },
        {
          heading: "Hyphen Match Selector (|=)",
          description:
            "Matches elements whose attribute value starts with a word followed by a hyphen.\n\nExample: Styling elements with language attributes like en or en-US.",
          language: "css",
          code: `p[lang|="en"] {
    color: blue;
}`,
        },
        {
          heading: "4. Pseudo-Classes",
          description:
            "Pseudo-classes in CSS define the special states of elements for styling.",
        },
        {
          heading: ":hover",
          description:
            "Styles elements when the user hovers over them.\n\nExample: Changing the color of a link when hovered.",
          language: "html",
          code: `<html>
<head>
    <style>
        a:hover {
            color: red;
        }
    </style>
</head>
<body>
    <a href="https://example.com/">Hover over this to see the effect.</a>
</body>
</html>`,
        },
        {
          heading: ":focus",
          description:
            "Styles the element when the user focuses on it.\n\nExample: Adding an outline on a focused input.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:focus {
            outline: 3px solid red;
        }
    </style>
</head>
<body>
    <input type="text">
</body>
</html>`,
        },
        {
          heading: ":first-child",
          description:
            "Styles the element which is the first child of its parent.",
          language: "html",
          code: `<html>
<head></head>
<style>
    p:first-child {
        color: brown;
    }
</style>
<body>
    <div>
        <p>Hello1</p>
        <p>Hello2</p>
    </div>
</body>
</html>`,
        },
        {
          heading: ":last-child",
          description:
            "Styles the element which is the last child of its parent.",
          language: "html",
          code: `<html>
<head></head>
<style>
    p:last-child {
        color: green;
    }
</style>
<body>
    <div>
        <p>Hello1</p>
        <p>Hello2</p>
    </div>
</body>
</html>`,
        },
        {
          heading: ":not",
          description:
            "Removes a particular element from the styling context.\n\nExample: Styling all paragraphs except those with class 'one'.",
          language: "html",
          code: `<html>
<head></head>
<style>
    p:not(.one) {
        color: blue;
    }
</style>
<body>
    <div>
        <p class="one">Hello1</p>
        <p class="two">Hello2</p>
    </div>
</body>
</html>`,
        },
        {
          heading: "5. Pseudo-Elements",
          description:
            "Pseudo-elements allow you to target and style specific parts of an element, such as inserting content before or after it.\n\n- They can be used to style parts of text, like the first letter or line of a paragraph.\n- Pseudo-elements are commonly used to enhance and beautify the internal content of elements.",
        },
        {
          heading: "::before",
          description: "Inserts some content before an element.",
          language: "html",
          code: `<html>
<head></head>
<style>
    h1::before {
        content: "★ ";
    }
</style>
<body>
    <h1 tabindex="0">Welcome to CodeSarthi</h1>
</body>
</html>`,
        },
        {
          heading: "::after",
          description: "Inserts some content after an element.",
          language: "html",
          code: `<html>
<head></head>
<style>
    h1::after {
        content: "☀ ";
        color: orangered;
    }
</style>
<body>
    <h1 tabindex="0">Welcome to CodeSarthi</h1>
</body>
</html>`,
        },
        {
          heading: "::first-line",
          description:
            "Styles the first line of text within a block element. Line breaks mark the beginning of a new line.",
          language: "html",
          code: `<html>
<head></head>
<style>
    p::first-line {
        color: red;
    }
</style>
<body>
    <p>Welcome to CodeSarthi<br>
        Hello CodeSarthi</p>
</body>
</html>`,
        },
        {
          heading: "::first-letter",
          description: "Styles the first letter of a word or a sentence.",
          language: "html",
          code: `<html>
<head></head>
<style>
    p::first-letter {
        color: red;
        font-size: 23px;
    }
</style>
<body>
    <p>Welcome to CodeSarthi</p>
</body>
</html>`,
        },
        {
          heading: "::placeholder",
          description: "Styles the placeholder text of a specific input field.",
          language: "html",
          code: `<html>
<head></head>
<style>
    input::placeholder {
        font-size: 20px;
        font-family: sans-serif;
        font-weight: 900;
    }
</style>
<body>
    <input type="text" placeholder="Enter your name">
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-comments",
      category: "CSS Basics",
      shortTitle: "Comments",
      title: "CSS Comments",
      sections: [
        {
          heading: "CSS Comments",
          description:
            "CSS comments are used to add notes or explanations to your code, helping you and others understand it better.\n\n- Comments can be added anywhere in the code, and they can span across multiple lines.\n- It's a good practice to add comments to clarify complex parts of your code for future reference or collaboration.\n- Older methods like <!-- --> for hiding CSS in older browsers are outdated and not recommended.\n- Comments are simply ignored by the browser, so they don't affect the output in any way.",
        },
        {
          heading: "Single Line Comment",
          description:
            "A single line comment is written using /* */ on one line. It is used to annotate a specific property or rule.\n\nSyntax: /* Code comments */\n\nNote: Comments are ignored by browsers, so they won't affect how your webpage looks or works.",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <title>Single line comment</title>

    <style>
        h1 {
            color: green;
        }

        /* Single line comment */
    </style>

</head>

<body>
    <h1>Study portal</h1>
    <p> Study portal for CS students</p>
</body>

</html>`,
        },
        {
          heading: "Multiline Comment",
          description:
            "A multiline comment starts with /* and ends with */. Everything between these markers is treated as a comment and ignored by the browser.",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <title>Multiline Comment</title>

    <style>
        h1 {
            color: green;
        }

        /* This is a multiline
           comment */
    </style>

</head>

<body>
    <h1>Study portal</h1>

    <p> A Computer Science portal </p>
</body>

</html>`,
        },
        {
          heading: "Browser Compatibility",
          description:
            "CSS comments are universally supported across all modern browsers and platforms. Since they are ignored by the browser, they do not affect the visual layout or functionality of the web page. No special handling or cross-browser testing is required for comments.",
        },
      ],
    },
    {
      id: "css-colors",
      category: "Styling & Properties",
      shortTitle: "Colors",
      title: "CSS Colors",
      sections: [
        {
          heading: "CSS Colors",
          description:
            "CSS colors are used to change the look of text, backgrounds, borders, and other elements on a webpage. They help make a site more attractive and easy to read.\n\n- Colors can be set using names, HEX codes, RGB, RGBA, HSL, or HSLA values.\n- Used to style text, backgrounds, and borders.\n- Help create contrast, highlight content, and improve visual design.",
        },
        {
          heading: "Color Formats Overview",
          description:
            "- **Background Color (background-color):** #FF5733; adds a bright red-orange background, and padding: 20px; provides inner spacing.\n- **Text Color (color):** rgb(255, 0, 0); sets the text to red, and font-size: 20px; makes it larger.\n- **Border Color (border):** 5px solid rgba(0, 255, 0, 0.5); adds a semi-transparent green border with padding and margin for spacing.\n- **Hover Effects:** background-color: hsl(120, 100%, 50%); gives a bright green background that changes to a lighter transparent green on hover.",
          language: "html",
          code: `<html>
<head>
    <style>
        .hex-example {
            background-color: #FF5733; /* Hexadecimal color */
        }
        .rgb-example {
            color: rgb(255, 0, 0); /* RGB color */
        }
        .rgba-example {
            color: rgba(0, 255, 0, 0.5); /* RGBA color with transparency */
        }
        .hsl-example {
            color: hsl(120, 100%, 50%); /* HSL color */
        }
        .hsla-example {
            color: hsla(120, 100%, 50%, 0.3); /* HSLA color with transparency */
        }
    </style>
</head>
<body>
    <div class="hex-example">This div has a Hexadecimal background color.</div>
    <div class="rgb-example">This text is in RGB red.</div>
    <div class="rgba-example">This text is in RGBA green with 50% transparency.</div>
    <div class="hsl-example">This text is in HSL green.</div>
    <div class="hsla-example">This text is in HSLA green with 30% opacity.</div>
</body>
</html>`,
        },
        {
          heading: "1. Background Colors",
          description:
            "You can use background-color to set the color of an element's background. It's typically used for sections, divs, headers, footers, etc.",
          language: "html",
          code: `<html>
<head>
    <style>
        .bg-example {
            background-color: #FF5733; /* Red-Orange background */
            padding: 20px;
            color: white;
        }
    </style>
</head>
<body>
    <div class="bg-example">This div has a warm background color!</div>
</body>
</html>`,
        },
        {
          heading: "2. Text Colors",
          description:
            "The color property is used to apply color to the text. It's important to ensure good contrast between the text and the background for readability.",
          language: "html",
          code: `<html>
<head>
    <style>
        .text-example {
            color: rgb(255, 0, 0); /* Red text */
            font-size: 20px;
        }
    </style>
</head>
<body>
    <p class="text-example">This text is in red.</p>
</body>
</html>`,
        },
        {
          heading: "3. Border Colors",
          description:
            "You can use the border property to apply color to an element's border. It's commonly used for buttons, cards, or form inputs to create visible outlines.",
          language: "html",
          code: `<html>
<head>
    <style>
        .border-example {
            border: 5px solid rgba(0, 255, 0, 0.5); /* Semi-transparent green border */
            padding: 10px;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div class="border-example">This div has a semi-transparent green border.</div>
</body>
</html>`,
        },
        {
          heading: "4. Hover Effects",
          description:
            "Use the :hover pseudo-class to change the color of an element when a user hovers over it, adding interactivity to your design.",
          language: "html",
          code: `<html>
<head>
    <style>
        .hover-example {
            background-color: #4CAF50; /* Green background */
            color: white;
            padding: 20px;
            text-align: center;
            cursor: pointer;
        }

        .hover-example:hover {
            background-color: #45a049; /* Darker green on hover */
        }
    </style>
</head>
<body>
    <div class="hover-example">Hover over me to change the background color!</div>
</body>
</html>`,
        },
        {
          heading: "5. Shadows and Text Effects",
          description:
            "You can use box-shadow to add shadows around elements or text-shadow for adding shadows to the text, creating depth and emphasis.",
          language: "html",
          code: `<html>
<head>
    <style>
        .shadow-example {
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
            color: #FF5733;
            font-size: 30px;
        }

        .box-shadow-example {
            box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
            padding: 20px;
            background-color: #FFF;
        }
    </style>
</head>
<body>
    <p class="shadow-example">This text has a shadow effect.</p>
    <div class="box-shadow-example">This div has a box shadow.</div>
</body>
</html>`,
        },
        {
          heading: "6. Gradients",
          description:
            "CSS allows you to create gradients using the background property. Gradients can transition smoothly between two or more colors.",
          language: "html",
          code: `<html>
<head>
    <style>
        .gradient-example {
            background: linear-gradient(to right, #FF5733, #33FF57);
            padding: 40px;
            color: white;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="gradient-example">This div has a linear gradient background.</div>
</body>
</html>`,
        },
        {
          heading: "Color Formats in CSS",
          description: "A quick reference of all color formats supported in CSS:",
          table: {
            headers: ["Color Format", "Description"],
            rows: [
              ["Color Names", "Use predefined color names (e.g., red, blue, green) for simplicity."],
              ["Hexadecimal (Hex) Codes", "Define colors using six-digit hex codes (e.g., #FF5733)."],
              ["RGB (Red, Green, Blue)", "Define colors using RGB values (e.g., rgb(255, 0, 0))."],
              ["RGBA (Red, Green, Blue, Alpha)", "Extend RGB by adding an alpha (transparency) value (e.g., rgba(255, 0, 0, 0.5))."],
              ["HSL (Hue, Saturation, Lightness)", "Define colors using HSL values (e.g., hsl(120, 100%, 50%))."],
              ["HSLA (Hue, Saturation, Lightness, Alpha)", "Extend HSL by adding an alpha value for transparency (e.g., hsla(120, 100%, 50%, 0.5))."],
            ],
          },
        },
      ],
    },
    {
      id: "css-background",
      category: "Styling & Properties",
      shortTitle: "Background",
      title: "CSS Background",
      sections: [
        {
          heading: "CSS Background",
          description:
            "The CSS background defines the area behind an element's content and can include colors, images, or both. It provides control over how these backgrounds appear and behave.\n\n- Use properties like background-color, background-image, and background-size to style backgrounds.\n- Control positioning and repetition using background-position and background-repeat.\n- Helps enhance visual design and improve the overall look of web pages.",
          language: "html",
          code: `<html>
<head>
    <style>
        body {
            background: lightblue url(
            "https://media.Code Sarthi.org/wp-content/cdn-uploads/20190417124305/250.png")
            no-repeat center fixed;
        }
    </style>
</head>
<body></body>
</html>`,
        },
        {
          heading: "background-color",
          description:
            "The background-color property in CSS sets the background color of an element. It can accept a color name (e.g., \"red\"), HEX value (e.g., \"#ff0000\"), or RGB value (e.g., \"rgb(255, 0, 0)\").\n\nSyntax:\nbody {\n    background-color: color name;\n}\n\n- background-color: Sets the background color of the h1 element to blue.\n- The color can be specified using: Color name (blue, green, etc.), HEX code (#5570f0, #ff5733, etc.), RGB value (rgb(255, 0, 0), rgb(0, 255, 0), etc.)",
          language: "html",
          code: `<html>
<head>
    <style>
        h1 {
            background-color: blue;
        }
    </style>
</head>
<body>
    <h1>Code Sarthi</h1>
</body>
</html>`,
        },
        {
          heading: "background-image",
          description:
            "The background-image property in CSS is used to set an image as the background of an element. By default, the image is repeated to cover the entire element unless specified otherwise.\n\nSyntax:\nbody {\n    background-image: url(link);\n}\n\n- background-image: Sets the background image of the body element.\n- By default, the image repeats to cover the entire background of the body.",
          language: "html",
          code: `<html>
<head>
    <style>
        body {
            background-image:
                url("https://media.Code Sarthi.org/wp-content/cdn-uploads/20190417124305/250.png");
        }
    </style>
</head>
<body>
    <h1>Code Sarthi</h1>
</body>
</html>`,
        },
        {
          heading: "background-repeat",
          description:
            "The background-repeat property in CSS specifies how the background image is repeated. By default, the image repeats both horizontally and vertically. You can control the repetition by specifying values such as repeat-x, repeat-y, or no-repeat.\n\nSyntax:\nbody {\n    background-image: url(link);\n    background-repeat: repeat-x;\n}\n\n- background-repeat: repeat-x: The background image will only repeat horizontally, along the x-axis.\n- The image is repeated only across the horizontal direction while maintaining its position vertically.",
          language: "html",
          code: `<html>
<head>
    <style>
        body {
            background-image:
                url("https://media.Code Sarthi.org/wp-content/cdn-uploads/20190417124305/250.png");
            background-repeat: repeat-x;
        }
    </style>
</head>
<body>
    <h1>"Hello world"</h1>
</body>
</html>`,
        },
        {
          heading: "background-attachment",
          description:
            "The background-attachment property in CSS specifies how the background image behaves when the user scrolls the page. By setting the value to fixed, the background image stays in place while the content of the page scrolls.\n\nSyntax:\nbody {\n    background-attachment: fixed;\n}\n\n- background-attachment: fixed: The background image is fixed in place — it will not scroll with the page's content.\n- As you scroll, the background image remains static, providing a parallax effect.",
          language: "html",
          code: `<html>
<head>
    <style>
        body {
            background-image:
                url("https://media.Code Sarthi.org/wp-content/cdn-uploads/20190417124305/250.png");
            background-attachment: fixed;
        }
    </style>
</head>
<body>
    <h1>Code Sarthi</h1>
</body>
</html>`,
        },
        {
          heading: "background-position",
          description:
            "The background-position property in CSS is used to set the starting position of the background image within the element. You can use values like top, left, center, or specify exact pixel/percentage values to position the image.\n\nSyntax:\nbody {\n    background-repeat: no-repeat;\n    background-position: left top;\n}\n\n- background-repeat: no-repeat: The image will not repeat horizontally or vertically.\n- background-position: center: The background image is centered within the body element.",
          language: "html",
          code: `<html>
<head>
    <style>
        body {
            background-image:
                url("https://media.Code Sarthi.org/wp-content/cdn-uploads/20190417124305/250.png");
            background-repeat: no-repeat;
            background-position: center;
        }
    </style>
</head>
<body>
    <h1>Code Sarthi</h1>
</body>
</html>`,
        },
        {
          heading: "background-origin",
          description:
            "The background-origin property sets the starting position of a background image relative to the element's box.\n\nSyntax:\nbody {\n    background-image: url('https://via.placeholder.com/300');\n    background-origin: padding-box;\n}\n\n- background-origin: padding-box: Background image starts from inside the padding area, not from the border.\n- The border area is not covered by the background image; only padding and content are included.",
          language: "css",
          code: `body {
    background-image: url('https://via.placeholder.com/300');
    background-origin: padding-box;
}`,
        },
        {
          heading: "background-clip",
          description:
            "The background-clip property defines how far the background (color or image) extends within an element.\n\nSyntax:\ndiv {\n    background-clip: content-box;\n}\n\n- background-clip: content-box: Background shows only in the content area.\n- Padding and border areas are not colored, only the text area.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            width: 250px;
            height: 150px;
            padding: 20px;
            border: 10px solid black;
            background-color: orange;
            background-clip: content-box;
        }
    </style>
</head>
<body>
    <div>Background Clip Example</div>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-borders",
      category: "Styling & Properties",
      shortTitle: "Borders",
      title: "CSS Borders",
      sections: [
        {
          heading: "CSS Borders",
          description:
            "CSS borders define the outline around an HTML element, providing visual separation and emphasis within a webpage layout.\n\n- Width is determined by the thickness of the border.\n- Style is defined by the appearance of the border (solid, dashed, dotted, etc.).\n- Color is specified by the chosen hue of the border.\n- Borders can be applied to all sides or specific edges of an element.\n\nSyntax:\nelement {\n    border: 1px solid black;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        .simple-border {
            border: 2px solid black;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="simple-border">This div has a simple black border.</div>
</body>
</html>`,
        },
        {
          heading: "CSS Border Properties",
          description:
            "CSS provides several properties to control and customize borders:\n\n- **border-style:** Type of border is determined by border-style, such as solid, dashed, or dotted.\n- **border-width:** Width of the border is set using border-width, in pixels, points, or other units.\n- **border-color:** Color of the border is specified using border-color.\n- **border-radius:** Rounded corners are created using border-radius.\n\n**Ways to Style Border in CSS:**\n\n1. Border Style — border-top-style, border-right-style, border-bottom-style, border-left-style\n2. Border Width — border-top-width, border-right-width, border-bottom-width, border-left-width\n3. Border Color — border-top-color, border-right-color, border-bottom-color, border-left-color\n4. Border Individual Sides — CSS allows you to style each side of a border individually.\n5. Border Radius — The border-radius property allows you to round the corners of an element.",
        },
        {
          heading: "Common Border Styles",
          description:
            "The border-style property specifies the type of border. None of the other border properties will work without setting the border style.\n\n- border-style is used to set the type of border around an element.\n- dotted: Creates a border with dots.\n- dashed: Creates a border with dashed lines.\n- solid: Creates a solid, continuous border.\n- double: Creates a border with two solid lines.",
          language: "html",
          code: `<html>
<head>
    <style>
        p.dotted {
            border-style: dotted;
        }
        p.dashed {
            border-style: dashed;
        }
        p.solid {
            border-style: solid;
        }
        p.double {
            border-style: double;
        }
    </style>
</head>
<body>
    <p class="dotted">A dotted border.</p>
    <p class="dashed">A dashed border.</p>
    <p class="solid">A solid border.</p>
    <p class="double">A double border.</p>
</body>
</html>`,
          table: {
            headers: ["Border Style", "Description"],
            rows: [
              ["dotted", "Creates a series of dots."],
              ["dashed", "Forms a dashed line."],
              ["solid", "Produces a continuous line."],
              ["double", "Renders two parallel lines."],
              ["groove", "Creates a 3D grooved effect."],
              ["ridge", "Creates a 3D ridged effect."],
              ["inset", "Adds a 3D inset border."],
              ["outset", "Adds a 3D outset border."],
              ["none", "Removes the border."],
              ["hidden", "Hides the border."],
            ],
          },
        },
        {
          heading: "CSS Border Width",
          description:
            "CSS border-width is used to define the thickness of the border around an element. It can be specified in various units like px, pt, cm, or by using predefined values like thin, medium, and thick.\n\n- border-width property is used to set the thickness of the border.\n- You can use numeric values (e.g., 1px, 5pt, 2cm) or keywords (thin, medium, thick) to set the border width.\n- The border-style and border-color properties must be used in conjunction with border-width to see the effect.",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            border-style: solid;
            border-width: 8px;
        }
    </style>
</head>
<body>
    <p>CSS Border Width</p>
</body>
</html>`,
        },
        {
          heading: "CSS Border Color",
          description:
            "CSS border-color is used to define the color of the border. You can set the color using color names, hexadecimal values, or RGB values. If no color is specified, the border will inherit the color of the element itself.\n\n- border-color property is used to set the color of the element's border.\n- The border color is set to red using the color name. You can also use hex codes like #ff0000 or RGB values like rgb(255, 0, 0).\n- The border-style property must be defined (e.g., solid, dashed, etc.) for the border color to be visible.",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            border-style: solid;
            border-color: red;
        }
    </style>
</head>
<body>
    <p>CSS Border color</p>
</body>
</html>`,
        },
        {
          heading: "Border Radius Property",
          description:
            "The CSS border-radius property is used to round the corners of an element's border, giving it a more visually pleasing and smoother appearance.\n\n- border-radius applies rounded corners to the element. A value of 20px creates a soft, rounded edge.\n- The element has a solid border, a green background, and centered text, with the rounded corners enhancing its visual appeal.\n- You can adjust the border-radius value to control the curvature of the corners, making them more or less rounded.",
          language: "html",
          code: `<html>
<head>
    <style>
        h1 {
            border-style: solid;
            text-align: center;
            background: green;
            border-radius: 20px;
        }
    </style>
</head>
<body>
    <h1>Border Radius Property</h1>
</body>
</html>`,
        },
        {
          heading: "Practical Use Cases of CSS Borders",
          description:
            "CSS borders are commonly used in the following scenarios:\n\n- **Styling Buttons:** Borders enhance button designs, making them more visually appealing and clickable.\n- **Creating Dividers:** Borders can act as separators between content sections, providing clear visual breaks.\n- **Customizing Images:** Apply borders around images to frame them, making thumbnails stand out.\n- **Designing Navigation Menus:** Borders can define the boundaries of navigation links or items.",
        },
      ],
    },
    {
      id: "css-margins",
      category: "Styling & Properties",
      shortTitle: "Margins Padding",
      title: "CSS Margins",
      sections: [
        {
          heading: "CSS Margins",
          description:
            "CSS margins are used to create space outside an element's border, helping to separate it from other elements on a webpage. They help in organizing the layout and preventing content from appearing too close together.\n\n- Control the outer spacing around elements.\n- Can be set for all sides or individually (top, right, bottom, left).\n\nSyntax:\nbody { margin: value; }",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785156583/e123291e-4c89-4798-98e4-4195709f0e63.png",
            alt: "CSS Margin Model Diagram",
          },
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            margin: 20px;
        }
    </style>
</head>
<body>
    <div class="box">
        This box has a margin of 20px on all sides.
    </div>
</body>
</html>`,
        },
        {
          heading: "Types of Margin Values",
          description:
            "- **Pixels (px):** The most common unit, specifies a fixed number of pixels.\n- **Percentage (%):** The margin is calculated as a percentage of the containing element's width (for horizontal margins) or height (for vertical margins).\n- **Other units:** Less common units like em, rem, vh, and vw can also be used for relative sizing.\n- **Auto:** The browser calculates a suitable margin size, often used for centering elements.\n\nNote: We can also use negative values for margins.",
        },
        {
          heading: "Margin Properties Reference",
          description: "CSS margin properties control the space outside an element, with margin serving as a shorthand for all sides.",
          table: {
            headers: ["Margin Property", "Description", "Example"],
            rows: [
              ["margin-top", "Sets the top margin of an element.", "margin-top: 20px;"],
              ["margin-right", "Sets the right margin of an element.", "margin-right: 15px;"],
              ["margin-bottom", "Specifies the margin at the bottom of an element.", "margin-bottom: 30px;"],
              ["margin-left", "Determines the width of the margin on the left side.", "margin-left: 10px;"],
              ["margin", "Shorthand to set margins on all four sides.", "margin: 10px 20px;"],
            ],
          },
        },
        {
          heading: "Margin with 4 Values",
          description:
            "If the margin property contains four values, they set: top → right → bottom → left (clockwise).\n\nmargin: 40px 100px 120px 80px;\n- top = 40px\n- right = 100px\n- bottom = 120px\n- left = 80px",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            margin: 40px 100px 120px 80px;
        }
    </style>
</head>
<body>
    <p>Margin with 4 values</p>
</body>
</html>`,
        },
        {
          heading: "Margin with 3 Values",
          description:
            "If the margin property contains three values:\n\nmargin: 40px 100px 120px;\n- top = 40px\n- right and left = 100px\n- bottom = 120px",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            margin: 40px 100px 120px;
        }
    </style>
</head>
<body>
    <p>Margin with 3 values</p>
</body>
</html>`,
        },
        {
          heading: "Margin with 2 Values",
          description:
            "If the margin property contains two values:\n\nmargin: 40px 100px;\n- top and bottom = 40px\n- left and right = 100px",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            margin: 40px 100px;
        }
    </style>
</head>
<body>
    <p>Margin with 2 values</p>
</body>
</html>`,
        },
        {
          heading: "Margin with 1 Value",
          description:
            "If the margin property has one value, it applies the same margin to all four sides.\n\nmargin: 40px;\n- top, right, bottom and left = 40px",
          language: "css",
          code: `p {
    margin: 40px;
}`,
        },
        {
          heading: "margin: auto",
          description:
            "margin: auto automatically adjusts the left and right margins to center the element horizontally within its container.\n\n- The element must have a defined width for margin: auto to work effectively.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            margin: auto;
            width: 50%;
            border: 1px solid black;
            text-align: center;
        }
    </style>
</head>
<body>
    <div>Centered using margin: auto;</div>
</body>
</html>`,
        },
        {
          heading: "margin: inherit",
          description:
            "margin: inherit causes the child element to inherit the margin value from its parent element.\n\n- The child element's margin is set to 20px, matching the parent's margin.",
          language: "html",
          code: `<html>
<head>
    <style>
        .parent {
            margin: 20px;
        }
        .child {
            margin: inherit;
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <div class="parent">
        Parent Element
        <div class="child">Child inherits margin from parent.</div>
    </div>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-padding",
      category: "Styling & Properties",
      shortTitle: "Padding",
      title: "CSS Padding",
      sections: [
        {
          heading: "CSS Padding",
          description:
            "CSS Padding property is used to create space between the element's content and the element's border. It only affects the content inside the element.\n\n- CSS padding is different from CSS margin: margin is the space between adjacent element borders, and padding is the space between content and the element's border.\n- We can independently change the top, bottom, left, and right padding using padding properties.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785156796/c3ebb43d-8264-4f0d-9fd5-da73e80a6cd2.png",
            alt: "CSS Padding Model Diagram",
          },
        },
        {
          heading: "CSS Padding Properties",
          description:
            "CSS provides properties to specify padding for individual sides of an element:\n\n- **padding:** Sets the overall space inside an element, applying to all four sides at once.\n- **padding-top:** Sets the space on the top side of an element.\n- **padding-right:** Controls the space on the right side of an element.\n- **padding-bottom:** Determines the space at the bottom of an element.\n- **padding-left:** Sets the space on the left side of an element.\n\nPadding properties can accept the following values:\n- **Length:** in cm, px, pt, etc.\n- **Width:** as a % of the element's width.\n- **inherit:** inherit padding from the parent element.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Padding Example</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            width: 50%;
        }
        .myDiv {
            background-color: lightblue;
            border: 2px solid black;
            padding-top: 80px;
            padding-right: 100px;
            padding-bottom: 50px;
            padding-left: 80px;
        }
        .inner {
            background-color: pink;
            border: 2px solid black;
            width: 70px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="myDiv">
        <div class="inner">Pad_Box</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Padding with 1 Value",
          description:
            "If the padding property has one value, it applies padding equally to all four sides.\n\nSyntax:\n.element {\n    padding: 20px; /* Applies 20px padding to all sides */\n}",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Padding - One Value</title>
    <style>
        .myDiv {
            background-color: gray;
            border: 2px solid black;
            text-align: center;
            width: 40%;
            padding: 20px; /* Applies 20px padding to all sides */
        }
        .inner {
            height: 70px;
            width: 70px;
            background-color: pink;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="myDiv">
        <div class="inner">Padding</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Padding with 2 Values",
          description:
            "If the padding property contains two values, the first applies to top and bottom, and the second applies to right and left.\n\npadding: 10px 20px;\n- top and bottom = 10px\n- right and left = 20px\n\nSyntax:\n.element {\n    padding: 10px 20px;\n}",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Padding - Two Values</title>
    <style>
        .myDiv {
            background-color: gray;
            border: 2px solid black;
            text-align: center;
            width: 40%;
            padding: 10px 20px;
            /* 10px top & bottom, 20px right & left */
        }
        .inner {
            height: 70px;
            width: 70px;
            background-color: pink;
        }
    </style>
</head>
<body>
    <div class="myDiv">
        <div class="inner">Box</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Padding with 3 Values",
          description:
            "If the padding property contains three values, the first sets top, the second sets right and left, and the third sets bottom.\n\npadding: 10px 20px 30px;\n- top = 10px\n- right and left = 20px\n- bottom = 30px\n\nSyntax:\n.element {\n    padding: 10px 20px 30px;\n}",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Padding - Three Values</title>
    <style>
        .myDiv {
            background-color: yellowgreen;
            border: 2px solid black;
            text-align: center;
            width: 40%;
            padding: 10px 20px 30px;
            /* 10px top, 20px right & left, 30px bottom */
        }
        .inner {
            height: 70px;
            width: 70px;
            background-color: grey;
        }
    </style>
</head>
<body>
    <div class="myDiv">
        <div class="inner">Box</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Padding with 4 Values",
          description:
            "If the padding property contains four values, they set top → right → bottom → left (clockwise order).\n\npadding: 10px 20px 15px 25px;\n- top = 10px\n- right = 20px\n- bottom = 15px\n- left = 25px\n\nSyntax:\n.element {\n    padding: 10px 20px 15px 25px;\n}",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Padding - Four Values</title>
    <style>
        .myDiv {
            background-color: cyan;
            border: 2px solid black;
            text-align: center;
            width: 40%;
            padding: 10px 20px 15px 25px;
            /* 10px top, 20px right, 15px bottom, 25px left */
        }
        .inner {
            height: 70px;
            width: 70px;
            background-color: black;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="myDiv">
        <div class="inner">Box</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "All CSS Padding Properties",
          description: "A complete reference of all 5 CSS padding properties:",
          table: {
            headers: ["Property", "Description"],
            rows: [
              ["padding", "Shorthand property for setting all padding properties in one declaration."],
              ["padding-top", "Sets the top padding of an element."],
              ["padding-right", "Sets the right padding of an element."],
              ["padding-bottom", "Sets the bottom padding of an element."],
              ["padding-left", "Sets the left padding of an element."],
            ],
          },
        },
      ],
    },
    {
      id: "css-overflow",
      category: "Styling & Properties",
      shortTitle: "Overflow",
      title: "CSS Overflow",
      sections: [
        {
          heading: "CSS Overflow",
          description:
            "CSS overflow controls how content is handled when it doesn't fit inside an element's box. It helps manage scrolling and visibility of extra content.\n\n- Can hide, scroll, or show overflowing content.\n- Common values include visible, hidden, scroll, and auto.\n- Useful for keeping layouts neat and preventing content overlap.\n\nSyntax:\noverflow: visible | hidden | scroll | auto;",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
<style>
div {
  width: 200px;
  height: 40px;
  border: 1px solid black;
  overflow: auto;
}
</style>
</head>
<body>

<div>
  This is an example of CSS overflow. When the content inside the box is too long to fit, a scrollbar appears to let you see the rest.
</div>

</body>
</html>`,
        },
        {
          heading: "Property Values",
          description:
            "The overflow property contains the following values:\n\n- **visible:** The content is not clipped and is visible outside the element box.\n- **hidden:** The overflow is clipped and the rest of the content is invisible.\n- **scroll:** The overflow is clipped but a scrollbar is added to see the rest of the content. The scrollbar can be horizontal or vertical.\n- **auto:** It automatically adds a scrollbar whenever it is required.\n- **overflow-x and overflow-y:** This property specifies how to change the overflow of elements. x deals with horizontal edges and y deals with vertical edges.",
        },
        {
          heading: "Example 1: overflow: visible",
          description:
            "The content is not clipped — it overflows and is visible outside the element's box.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            width: 100px;
            height: 80px;
            border: 1px solid;
            overflow: visible;
        }
    </style>
</head>
<body>
    <h2>Code Sarthi</h2>
    <p>
        The CSS overflow controls big content.
        It tells whether to clip content or to
        add scroll bars.
    </p>
</body>
</html>`,
        },
        {
          heading: "Example 2: overflow: scroll",
          description:
            "The overflow is clipped but a scrollbar is always added — both horizontal and vertical — so the rest of the content can be scrolled.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            width: 120px;
            height: 100px;
            border: 1px solid;
            overflow: scroll;
        }
    </style>
</head>
<body>
    <h2>Code Sarthi</h2>
    <p>
        The CSS overflow controls big content.
        It tells whether to clip content or
        to add scroll bars.
    </p>
</body>
</html>`,
        },
        {
          heading: "Example 3: overflow: auto",
          description:
            "Scrollbars are added automatically only when content overflows — the cleanest approach for most layouts.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            width: 120px;
            height: 100px;
            border: 1px solid;
            overflow: auto;
        }
    </style>
</head>
<body>
    <h2>Code Sarthi</h2>
    <p>
        The CSS overflow controls big content.
        It tells whether to clip content or
        to add scroll bars.
    </p>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-height-width",
      category: "Styling & Properties",
      shortTitle: "Height & Width",
      title: "CSS Height and Width",
      sections: [
        {
          heading: "CSS Height and Width",
          description:
            "These properties define the size of an element, controlling the space it occupies on a webpage for consistent layout and design. They can use units like pixels, percentages, or viewport values for responsive designs.\n\n- **Height & Width control element size:** Ensures proper spacing and layout on the page.\n- **Supports various units:** Can use px, %, vh, or vw to make designs responsive.",
        },
        {
          heading: "Width and Height",
          description:
            "The width and height properties in CSS are used to define the dimensions of an element. The values can be set in various units, such as pixels (px), centimeters (cm), percentages (%), etc.\n\n- .CodeSarthi styling: Sets width, border, text color, size, alignment, padding, and margin for the div.\n- HTML div: Displays \"Code Sarthi\" with the applied styles.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>width and height</title>
    <style>
        .CodeSarthi {
            width: 40%;
            border: 3px solid black;
            font-size: 22px;
            font-weight: bold;
            color: green;
            text-align: center;
            padding: 20px;
            margin: 20px 0 0 10px;
        }
    </style>
</head>
<body>
    <div class="CodeSarthi">Code Sarthi</div>
</body>
</html>`,
        },
        {
          heading: "Height and Width of Image",
          description:
            "To set the height and width of an image, the width and height properties are used. These values can be specified in pixels, percentages, or other units.\n\n- .CodeSarthi styling: Sets the image width to 100px, height to 50px, and adds a 2px black border.\n- HTML image: Displays the image with the applied size and border styles.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Height and width of image</title>
    <style>
        .CodeSarthi {
            width: 100px;
            height: 50px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <h3>Set the width and height of an Image</h3>
    <img class="CodeSarthi" src="https://media.Code Sarthi.org/wp-content/uploads/20210224031038/Capture4-300x174.PNG">
</body>
</html>`,
        },
        {
          heading: "max-width",
          description:
            "The max-width property is used to set the maximum width of a box. Its effect can be seen by resizing the browser window.\n\n- .CodeSarthi styling: Limits the div's width to a maximum of 500px, sets font size to 12px, and adds a 2px black border.\n- HTML div content: Displays a heading and paragraph that will not exceed 500px in width.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>max-width of element</title>
    <style>
        .CodeSarthi {
            max-width: 500px;
            font-size: 12px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="CodeSarthi">
        <h3>Code Sarthi</h3>
        <p>
            Code Sarthi is a computer science platform
            where you can learn programming. It is a Computer
            Science portal for Sarthi.
        </p>
    </div>
</body>
</html>`,
        },
        {
          heading: "min-width",
          description:
            "The min-width property is used to set the minimum width of a box. Its effect can be seen by resizing the browser window.\n\n- Ensures the element never shrinks below the specified width, even when the viewport is small.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>min-width of element</title>
    <style>
        .CodeSarthi {
            min-width: 400px;
            font-size: 13px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="CodeSarthi">
        <h3>Code Sarthi</h3>
        <p>
            Code Sarthi is a computer science platform
            where you can learn programming. It is a Computer
            Science portal for Sarthi.
        </p>
    </div>
</body>
</html>`,
        },
        {
          heading: "max-height",
          description:
            "The max-height property is used to set the maximum height of a box. Its effect can be seen by resizing the browser window.\n\n- .CodeSarthi styling: Sets a maximum height of 100px and adds a 2px black border to the div.\n- HTML div content: Displays a heading and paragraph, which will be restricted to the max height of 100px.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>max-height of element</title>
    <style>
        .CodeSarthi {
            max-height: 100px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="CodeSarthi">
        <h3>Code Sarthi</h3>
        <p>
            Code Sarthi is a computer science platform
            where you can learn programming. It is a Computer
            Science portal for Sarthi.
        </p>
    </div>
</body>
</html>`,
        },
        {
          heading: "min-height",
          description:
            "The min-height property is used to set the minimum height of a box. Its effect can be seen by resizing the browser window.\n\n- .CodeSarthi styling: Sets a minimum height of 50px and adds a 2px black border to the div.\n- HTML div content: Ensures the div is at least 50px tall while displaying the heading and paragraph.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>min-height of element</title>
    <style>
        .CodeSarthi {
            min-height: 50px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="CodeSarthi">
        <h3>Code Sarthi</h3>
        <p>
            Code Sarthi is a computer science platform
            where you can learn programming. It is a Computer
            Science portal for Sarthi.
        </p>
    </div>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-text-formatting",
      category: "Text & Fonts",
      shortTitle: "Text Formatting",
      title: "CSS Text Formatting",
      sections: [
        {
          heading: "CSS Text Formatting",
          description:
            "CSS text formatting styles and controls text appearance, improving readability and visual appeal.\n\n- Font Size: Set to 40px, making the text large and prominent.\n- Font Weight: Bold text stands out more.\n- Color: Text color set to green (#4CAF50), giving it a fresh look.\n- Text Transform: Text converted to uppercase.\n- Font Family: Arial (sans-serif) for a clean, modern appearance.",
          language: "html",
          code: `<html>
<head>
    <style>
        .initials {
            font-size: 40px;
            font-weight: bold;
            color: #4CAF50;
            text-transform: uppercase;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <p class="initials">M.B.</p>
</body>
</html>`,
        },
        {
          heading: "CSS Text Formatting Properties",
          description: "A quick reference of all CSS text formatting properties:",
          table: {
            headers: ["Property", "Description"],
            rows: [
              ["color", "Sets the color of the text using color name, hex value, or RGB value."],
              ["text-align", "Specifies horizontal alignment of text in a block or table-cell element."],
              ["text-align-last", "Sets alignment of the last line in an element."],
              ["text-decoration", "Decorates text content (underline, overline, etc.)."],
              ["text-decoration-color", "Sets color of text decorations like overlines, underlines, and line-throughs."],
              ["text-decoration-line", "Sets various text decorations like underline, overline, line-through."],
              ["text-decoration-style", "Combines text-decoration-line and text-decoration-color properties."],
              ["text-indent", "Indents the first line of a paragraph."],
              ["text-justify", "Justifies text by spreading words into complete lines."],
              ["text-overflow", "Specifies how hidden overflow text is displayed."],
              ["text-transform", "Controls capitalization of text."],
              ["text-shadow", "Adds shadow to text."],
              ["letter-spacing", "Specifies space between characters of text."],
              ["line-height", "Sets space between lines."],
              ["direction", "Sets text direction."],
              ["word-spacing", "Specifies space between words of a line."],
            ],
          },
        },
        {
          heading: "1. color",
          description:
            "Sets the color of a text on your web page.\n\n- Applies to child text if no parent overrides it.\n- Supports formats like names, RGB, HEX, HSL.\n\nSyntax:\nelement {\n    color: color-name | rgb | rgba | hsl | hsla | hexadecimal;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            color: green;
            font-size: 50px;
        }
    </style>
</head>
<body>
    <p>Hello CodeSarthi</p>
</body>
</html>`,
        },
        {
          heading: "2. text-align",
          description:
            "Aligns the text in an element at a specific position.\n\n- Aligns text horizontally within an element.\n- Supports direction-based values like start and end.\n- Common values include left, right, center, justify.\n\nSyntax:\nelement {\n    text-align: left | right | center | justify | start | end | initial | inherit;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            height: 70px;
            background-color: aquamarine;
            text-align: center;
            color: black;
            border: 2px solid black;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <p>The quick brown fox jumps over the lazy dog. This phrase is often used to
      test typewriters and fonts because it contains all the letters of the English alphabet.</p>
</body>
</html>`,
        },
        {
          heading: "3. text-align-last",
          description:
            "Aligns the last line of a text block after natural line wrapping.\n\n- Useful for paragraphs with justified text.\n- Applies after natural line wrapping.\n\nSyntax:\nelement {\n    text-align-last: left | right | center | justify | initial | inherit;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            width: 250px;
            border: 2px solid black;
            text-align-last: center;
        }
    </style>
</head>
<body>
    <p>The quick brown fox jumps over the lazy dog. This phrase is often used to
        test typewriters and fonts because all the letters of the English alphabet,
        making it a perfect pangram for evaluating typeface appearance and readability.</p>
</body>
</html>`,
        },
        {
          heading: "4. text-decoration",
          description:
            "Adds decorative lines to text.\n\n- Common uses include underline and line-through.\n\nSyntax:\nelement {\n    text-decoration: dashed | dotted | double | line-through | none | overline | solid | underline | wavy;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            width: 250px;
            border: 2px solid black;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <p>The quick brown fox jumps over the lazy dog.</p>
</body>
</html>`,
        },
        {
          heading: "5. text-decoration-color",
          description:
            "Sets the color of text decoration lines.\n\n- Works only when text-decoration is applied.\n\nSyntax:\nelement {\n    text-decoration-color: color | initial | inherit;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            width: 250px;
            border: 2px solid black;
            text-decoration: underline;
            text-decoration-color: red;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <p>The quick brown fox jumps over the lazy dog.</p>
</body>
</html>`,
        },
        {
          heading: "6. text-decoration-line",
          description:
            "Defines the type of decoration line applied to text.\n\n- Controls underline, overline, or strike-through.\n- Can combine multiple line types.\n\nSyntax:\nelement {\n    text-decoration-line: underline | overline | line-through | none | inherit | initial;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            width: 250px;
            border: 2px solid black;
            text-decoration: underline;
            text-decoration-color: gray;
            text-decoration-line: line-through;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <p>The quick brown fox jumps over the lazy dog.</p>
</body>
</html>`,
        },
        {
          heading: "7. text-decoration-style",
          description:
            "Specifies the style of the decoration line.\n\n- Options include solid, dashed, dotted, and wavy.\n\nSyntax:\nelement {\n    text-decoration-style: dashed | dotted | double | none | solid | wavy | initial | inherit;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            width: 250px;
            border: 2px solid black;
            text-decoration: underline;
            text-decoration-color: green;
            text-decoration-style: wavy;
        }
    </style>
</head>
<body>
    <p>The quick brown fox jumps over the lazy dog.</p>
</body>
</html>`,
        },
        {
          heading: "8. text-indent",
          description:
            "Adds an indentation to the first line of an element.\n\n- Commonly used in paragraphs.\n- Accepts length values like px or em.\n\nSyntax:\nelement {\n    text-indent: value in pixels | inherit | initial;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            width: 250px;
            border: 2px solid black;
            text-decoration: underline;
            text-decoration-color: green;
            text-decoration-style: wavy;
            text-indent: 70px;
        }
    </style>
</head>
<body>
    <p>The quick brown fox jumps over the lazy dog. Making it a perfect pangram for evaluating typeface appearance.</p>
</body>
</html>`,
        },
        {
          heading: "9. text-justify",
          description:
            "Specifies the kind of justification applied to text based on inter-word or inter-character space.\n\n- Controls spacing method in justified text.\n- Works with text-align: justify.\n\nSyntax:\nelement {\n    text-justify: initial | inter-word | inter-character | inherit;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        h1 {
            text-align: center;
            color: green;
        }
        div {
            height: 100px;
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            border: 2px solid black;
            text-align: justify;
            text-justify: inter-word;
            column-count: 3;
            column-gap: 1em;
            column-rule: 2px solid red;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>NEWSPAPER Code Sarthi</h1>
    <div>
        CSS Text Formatting refers to applying styles to text elements to control appearance and layout.
        This includes properties for color, alignment, decoration, indentation, justification, shadows,
        spacing, and direction.
    </div>
</body>
</html>`,
        },
        {
          heading: "10. text-overflow",
          description:
            "Controls how hidden overflow text is displayed.\n\n- Commonly used with ellipsis (…).\n- Requires overflow: hidden and white-space: nowrap.\n\nSyntax:\nelement {\n    text-overflow: clip | ellipsis | inherit | initial;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            width: 200px;
            height: 50px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border: 2px solid black;
            font-size: 30px;
        }
    </style>
</head>
<body>
    <p>CSS Text Formatting refers to applying styles to text elements to control appearance and layout.</p>
</body>
</html>`,
        },
        {
          heading: "11. text-transform",
          description:
            "Controls the casing of the text in your element.\n\n- Changes the letter casing of text.\n- Does not modify the original content.\n\nSyntax:\nelement {\n    text-transform: capitalize | lowercase | uppercase | initial | inherit;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            text-transform: capitalize;
        }
    </style>
</head>
<body>
    <p>Welcome to Code Sarthi</p>
</body>
</html>`,
        },
        {
          heading: "12. text-shadow",
          description:
            "Adds a shadow to the text in your element.\n\n- Enhances readability or visual style.\n- Supports blur and color customization.\n\nSyntax:\nelement {\n    text-shadow: shadow-height shadow-width blur-radius shadow-color;\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        p {
            font-size: 23px;
            font-family: sans-serif;
            font-weight: 900;
            text-shadow: 10px 10px 5px red;
        }
    </style>
</head>
<body>
    <p>Welcome to Code Sarthi</p>
</body>
</html>`,
        },
        {
          heading: "13. bdo",
          description:
            "The <bdo> tag in HTML overrides the content written inside it to a specific direction using the dir attribute.\n\n- Overrides text direction explicitly.\n- Uses the dir attribute: ltr (left-to-right) or rtl (right-to-left).\n\nSyntax:\nelement1 {\n    property-x: value_y !important; /* This will be applied. */\n}",
          language: "html",
          code: `<html>
<head>
    <style>
        bdo {
            font-size: 23px;
            font-family: sans-serif;
            font-weight: 900;
            text-shadow: 10px 10px 5px red;
        }
    </style>
</head>
<body>
    <bdo dir="rtl">Welcome to Code Sarthi</bdo>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-fonts",
      category: "Text & Fonts",
      shortTitle: "Fonts",
      title: "CSS Fonts",
      sections: [
        {
          heading: "CSS Fonts",
          description:
            "CSS fonts are used to style and enhance the appearance of text on a webpage, making it more readable and visually appealing. They help control how text looks and fits within the overall design.\n\n- Used to set the size, weight, style, and color of text.\n- Help create a consistent and attractive look across a website.\n- Improve readability and align the text style with the website's theme.",
          language: "html",
          code: `<html>
<head>
    <style>
        .CodeSarthi {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 60px;
            color: #090;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="CodeSarthi">Code Sarthi</div>
</body>
</html>`,
        },
        {
          heading: "1. font-family",
          description:
            "The font-family property defines which font(s) should be used for text. You can provide a list of fonts as a fallback mechanism in case the preferred font is unavailable.\n\nSyntax:\nfont-family: \"Font Name\", generic-font-name;\n\nIn this example, the browser will first try Arial. If unavailable, it falls back to a sans-serif font.",
          language: "css",
          code: `body {
    font-family: "Arial", sans-serif;
}`,
        },
        {
          heading: "2. font-size",
          description:
            "The font-size property controls the size of the text. You can set the size in several units, including pixels (px), ems (em), and percentages (%).\n\n- Pixels (px) provide a fixed font size.\n- Ems (em) are relative to the parent element's font size, making them useful for responsive design.\n\nSyntax:\nfont-size: value;",
          language: "css",
          code: `h1 {
    font-size: 32px; /* Pixels */
}

p {
    font-size: 1.2em; /* Relative to the parent element */
}`,
        },
        {
          heading: "3. font-weight",
          description:
            "The font-weight property controls the thickness of the text. It can accept values like normal, bold, or numeric values (100 to 900).\n\n- Numeric values allow for finer control (e.g., 100 for light, 900 for extra bold).\n\nSyntax:\nfont-weight: value;",
          language: "css",
          code: `p {
    font-weight: bold; /* Bold text */
}

strong {
    font-weight: 700; /* Equivalent to bold */
}`,
        },
        {
          heading: "4. font-style",
          description:
            "The font-style property defines the style of the font, typically italic or normal.\n\nSyntax:\nfont-style: value;",
          language: "css",
          code: `em {
    font-style: italic; /* Italicized text */
}

p {
    font-style: normal; /* Normal text */
}`,
        },
        {
          heading: "5. line-height",
          description:
            "The line-height property defines the space between lines of text. Increasing line height improves readability, especially for long paragraphs.\n\nSyntax:\nline-height: value;",
          language: "css",
          code: `p {
    line-height: 1.5; /* 1.5 times the font size */
}`,
        },
        {
          heading: "Web Safe Fonts vs Custom Fonts",
          description:
            "This comparison highlights the difference between universally supported system fonts (web-safe) and designer-selected custom fonts used for unique web styling.\n\n**1. Web Safe Fonts**\nWeb safe fonts are commonly supported across all browsers and operating systems. They are pre-installed on most computers, ensuring consistent appearance across devices.\n\nCommon Web Safe Fonts: Arial, Times New Roman, Courier New, Verdana, Georgia\n\n**2. Custom Fonts**\nCustom fonts allow you to use fonts not pre-installed on a user's device. The most popular method is Google Fonts or self-hosting.",
          language: "html",
          code: `<head>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <h1 style="font-family: 'Roboto', sans-serif;">Hello, World!</h1>
</body>`,
        },
        {
          heading: "Responsive Typography",
          description:
            "To make typography adaptable to different screen sizes, use responsive units like em, rem, %, or vw for font sizes. Combine CSS media queries with typography to ensure readability across devices.\n\n- **em and rem:** Relative to the parent or root element's font size, allowing better scaling.\n- **vw (viewport width):** Scales the font size based on the viewport width — great for fluid layouts.",
          language: "css",
          code: `body {
    font-size: 16px; /* Default font size */
}

@media (max-width: 600px) {
    body {
        font-size: 14px; /* Smaller font on smaller screens */
    }
}`,
        },
        {
          heading: "Properties of CSS Fonts",
          description: "A summary of the main CSS font properties for customizing text in web design:",
          table: {
            headers: ["Property", "Description"],
            rows: [
              ["font-family", "Specifies the font type."],
              ["font-size", "Determines the size of the text."],
              ["font-weight", "Adjusts the thickness of the text."],
              ["font-style", "Controls the slant of the text (e.g., italic)."],
              ["line-height", "Sets the space between lines of text."],
              ["letter-spacing", "Modifies the space between characters."],
              ["text-transform", "Controls the capitalization of text."],
            ],
          },
        },
      ],
    },
    {
      id: "css-text-align",
      category: "Text & Fonts",
      shortTitle: "Text Align Property",
      title: "CSS text-align Property",
      sections: [
        {
          heading: "CSS text-align Property",
          description:
            "The text-align property in CSS is used to control the horizontal alignment of text inside an element.\n\n- Aligns text to left, right, center, or justify.\n- Applies to block-level elements like <div>, <p>, etc.\n- Inherited by child elements from the parent.\n- Common values: left, right, center, justify.\n\nSyntax:\ntext-align: left | right | center | justify | initial | inherit;\n\nDefault Value: left if the direction is ltr, and right if the direction is rtl.",
        },
        {
          heading: "Property Values",
          description:
            "- **left:** Sets the text alignment to the left. This is the default property.\n- **right:** Sets the text alignment to the right.\n- **center:** Sets the text alignment to the center.\n- **justify:** Spreads the words into the complete line by stretching the content of an element.\n- **initial:** Sets an element's CSS property to its default value.\n- **inherit:** Inherits a property from its parent element's property value.",
          table: {
            headers: ["Value", "Description"],
            rows: [
              ["left", "Aligns text to the left (default for ltr direction)."],
              ["right", "Aligns text to the right."],
              ["center", "Centers the text horizontally."],
              ["justify", "Stretches text so each line has equal width."],
              ["initial", "Sets the property to its default value."],
              ["inherit", "Inherits the value from the parent element."],
            ],
          },
        },
        {
          heading: "Example: All text-align Values",
          description:
            "This example illustrates the use of the text-align property with left, right, center, and justify values.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>text-align property</title>
    <style>
        h1 {
            color: green;
        }
        .main {
            border: 1px solid black;
        }
        .CodeSarthi1 {
            text-align: left;
        }
        .CodeSarthi2 {
            text-align: right;
        }
        .CodeSarthi3 {
            text-align: center;
        }
        .CodeSarthi4 {
            text-align: justify;
        }
    </style>
</head>
<body>
    <h1>Code Sarthi</h1>
    <h2>text-align property</h2>

    <div class="main">
        <h3>text-align: left;</h3>
        <div class="CodeSarthi1">
            The course is designed for students as well as working professionals to
            prepare for coding interviews. This course is going to have coding questions
            from school level to the level needed for product based companies like Amazon,
            Microsoft, Adobe, etc.
        </div>
    </div>
    <br>
    <div class="main">
        <h3 style="text-align: right;">text-align: right;</h3>
        <div class="CodeSarthi2">
            The course is designed for students as well as working professionals to
            prepare for coding interviews. This course is going to have coding questions
            from school level to the level needed for product based companies like Amazon,
            Microsoft, Adobe, etc.
        </div>
    </div>
    <br>
    <div class="main">
        <h3 style="text-align: center;">text-align: center;</h3>
        <div class="CodeSarthi3">
            The course is designed for students as well as working professionals to
            prepare for coding interviews. This course is going to have coding questions
            from school level to the level needed for product based companies like Amazon,
            Microsoft, Adobe, etc.
        </div>
    </div>
    <br>
    <div class="main">
        <h3 style="text-align: justify;">text-align: justify;</h3>
        <div class="CodeSarthi4">
            The course is designed for students as well as working professionals to
            prepare for coding interviews. This course is going to have coding questions
            from school level to the level needed for product based companies like Amazon,
            Microsoft, Adobe, etc.
        </div>
    </div>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-text-decoration",
      category: "Text & Fonts",
      shortTitle: "Text Decoration Property",
      title: "CSS text-decoration Property",
      sections: [
        {
          heading: "CSS text-decoration Property",
          description:
            "The text-decoration property in CSS is used to add decorative effects to text, such as underlines and strike-through lines. It helps improve the styling and visual appearance of text content on web pages.\n\n- Common values include underline, overline, line-through, and none.\n- It can be used to customize links, headings, and highlighted text.\n- The property also supports shorthand styling for decoration color, style, and thickness.",
        },
        {
          heading: "Understanding text-decoration",
          description:
            "The text-decoration property is a shorthand property used to set the decoration of text in one declaration. It combines the following sub-properties:\n\n- **text-decoration-line:** Sets the type of line decoration for the text.\n- **text-decoration-color:** Sets the color for the line decoration.\n- **text-decoration-style:** Sets the style of the line specified by text-decoration-line.\n- **text-decoration-thickness:** Sets the thickness of the line used in decoration.\n\nSyntax:\ntext-decoration: line style color | initial | inherit;\n/* Example: text-decoration: underline dashed green; */",
        },
        {
          heading: "Example 1: Shorthand (3 values)",
          description:
            "Using the shorthand text-decoration property with line, style, and color in a single declaration.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Text Decoration Example</title>
    <style>
        h2 {
            text-decoration: underline dashed green;
        }
    </style>
</head>
<body>
    <h2>Text Decoration Example</h2>
</body>
</html>`,
        },
        {
          heading: "Example 2: Individual Sub-properties",
          description:
            "Using individual text-decoration sub-properties separately for fine-grained control.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Text Decoration Example</title>
    <style>
        h2 {
            text-decoration-line: overline;
            text-decoration-style: solid;
            text-decoration-color: blue;
        }
    </style>
</head>
<body>
    <h2>Text Decoration Example</h2>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785159049/298c9386-350a-4b14-ab28-c4027029693e.png",
            alt: "CSS text-decoration property visual reference",
          },
        },
        {
          heading: "Key Takeaways",
          description:
            "- The text-decoration property is a versatile tool for controlling the visual presentation of text.\n- By combining text-decoration-line, text-decoration-style, text-decoration-color, and text-decoration-thickness, you can create visually appealing text decorations.\n- Understanding how to use this property effectively ensures your web content is both stylish and accessible.\n- Stay updated with browser compatibility to maintain a consistent look across different platforms.",
        },
      ],
    },
    {
      id: "css-box-model",
      category: "Layouts & Design",
      shortTitle: "Box Model",
      title: "CSS Box Model",
      sections: [
        {
          heading: "CSS Box Model",
          description:
            "The CSS Box Model defines how elements are sized and positioned by assigning a box in the DOM tree that determines an element's dimensions and its position relative to other elements.\n\n- **Content:** The area where text or other content is displayed.\n- **Padding:** Space between the content and the element's border.\n- **Border:** A frame that wraps around the padding and content.\n- **Margin:** Space between the element's border and neighboring elements.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785596616/29cb07f9-9044-48c2-b327-b139fa621097.png",
            alt: "CSS Box Model diagram",
          },
        },
        {
          heading: "Components of the box model",
          description:
            "Each element in the box model is made up of distinct layers that define its size and spacing on a web page.\n\n### 1. Content Area\nThe content area is the core part of the CSS box model that holds the actual content of an element.\n\n- The content area is the central part of the CSS box model, containing the main content (e.g., text, images, or elements like <p> or <span>).\n- It can be styled with CSS properties like height and width.\n- The content edge refers to the four edges of the content area:\n  - Left content edge\n  - Right content edge\n  - Top content edge\n  - Bottom content edge\n\n### 2. Padding Area\nThe padding area is the space between an element’s content and its border, contributing to the element’s overall size and spacing.\n\n- The padding area is the space between the content and the border of an element.\n- It includes the areas highlighted in light green and skin color in the example.\n- The distance between the content edge and the border is the padding.\n- The border marks the end of the padding area.\n- The padding area contributes to the element's total dimensions.\n- Padding can be adjusted using CSS properties.\n- It works similarly with box-sizing: content-box and box-sizing: border-box, but with slight calculation differences.\n\n### 3. Border Area\nThe border area is the outer boundary of an element that surrounds the padding and contributes to the element’s total height and width.\n\n- The area that marks the end of an element is called as the border; it is the outer fencing for the element.\n- The default border properties are provided in CSS to control the thickness of this outer fencing.\n- The border area also adds up to the complete height and width of the element.\n- The more the border width the more will be the height or width of the element.\n- In the above image the area marked with skin color is called the border area.\n\n### 4. Margin Area\nThe margin area is the space outside an element’s border that controls the distance between the element and surrounding or parent elements.\n\n- The area outside the border of an element is called the margin area.\n- Basically this area depends on the parent of the element.\n- The distance between the border of the parent element and the border of the child element is called as the margin.\n- CSS has provided certain margin properties to get control over this scenario.",
        },
        {
          heading: "1. Content-Box (default property)",
          description:
            "There are two types of box-sizing properties in CSS.\n\n**1. Content-Box (default property)**\nWhen box-sizing is set to content-box (the default), the element’s final size includes the content dimensions plus padding.\n\nThis code will create a box model with a border line width of 0.4px always and border-area of 1.6px and padding area as 20px width on both sides of the content area.\n\n**Calculation details:**\n- **Content Area (Width):** The width of the content area is fixed at 200px.\n- **Padding:** Adds extra space inside the element, around the content.\n  - Padding Left: 20px, Padding Right: 20px\n  - Total padding width: 20px + 20px = 40px\n- **Border:** The border, being solid, has a width, calculated differently from the padding.\n  - Line Width of Border: 0.4px (the width of the line itself)\n  - Area of Border: 1.6px (the actual space the border occupies visually)\n  - Border width for both sides: 1.6px (left) + 1.6px (right) = 3.2px\n- **Total Width:** Can be calculated by adding the padding and border areas to the content area width.\n  - Formula for Total Width = (Padding-Left + Padding-Right + Border-Area-Left + Border-Area-Right) + Content Area Width\n  - Total Width = (20px + 20px + 1.6px + 1.6px) + 200px = 243.2px\n  - The total width of the element becomes 243.2px.\n  - The reason the total width is increased unexpectedly is because box-sizing: content-box applies the width to the content area only. The padding and border are added outside the content area, leading to an increase in the overall width and height of the element.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            height: 20px;
            width: 20px;
            box-sizing: content-box;
            padding-left: 20px;
            padding-right: 20px;
            border-left: 5px solid red;
            border-right: 5px solid red;
        }
    </style>
</head>
<body>
    <div>Hello CodeSarthi</div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785596667/a421ca02-4311-44df-8ec9-89d3850ef7b3.png",
            alt: "Content-Box model calculation illustration",
          },
        },
        {
          heading: "2. Border-Box",
          description:
            "When box-sizing: border-box is used, the element’s total size stays as specified, and the content area shrinks to accommodate padding and border.\n\nThis code creates a box model where the content width is adjusted to accommodate the padding and border thickness.\n\n**Calculation details:**\n- **Width of Border and Padding:** Border width: 0.4px (line width) and 1.6px + 1.6px = 3.2px (total border area). Padding width: 20px + 20px = 40px.\n- **User-Entered Width:** The width entered by the user is 200px, which applies to the content area only when box-sizing: content-box is used.\n- **With box-sizing: content-box:** Padding and border are added outside the content, increasing the total width.\n- **Adjusting Content Area Width:** To maintain a total width of 200px, the extra space added by padding and borders (43.2px) is subtracted from the content width.\n- **New content area width:** 200px - 43.2px = 156.8px.\n- **Final Width Calculation:** The final total width is: 156.8px (content area) + 40px (padding) + 3.2px (border) = 200px, ensuring the user’s entered width remains unchanged.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            height: 20px;
            width: 70px;
            box-sizing:border-box;
            padding-left: 20px;
            padding-right: 20px;
            border-left: 2px solid red;
            border-right: 2px solid red;
        }
    </style>
</head>
<body>
    <div>Hello CodeSarthi</div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785596722/f7259146-b47c-4190-8631-b6c713e46158.png",
            alt: "Border-Box model calculation illustration",
          },
        },
        {
          heading: "Use Cases of CSS Box Model",
          description: "Here are some common practical use cases and styling approaches using the CSS Box Model.",
        },
        {
          heading: "Use Case 1: Default box-sizing: content-box",
          description:
            "Default behavior where padding and borders are added outside the content area, leading to an increased overall width/height.\n\nThe total width of the element will be 200px + 20px (left) + 20px (right) + 5px (left border) + 5px (right border) = 250px.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            width: 200px;
            padding: 20px;
            border: 2px solid black;
            box-sizing:content-box;
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <div>This is a div with box-sizing content-box.</div>
</body>
</html>`,
        },
        {
          heading: "Use Case 2: Using box-sizing: border-box for Consistent Sizing",
          description:
            "Ensure the padding and border are included within the specified width/height to maintain a fixed size for layout consistency.\n\nThe total width remains 200px, with padding and border included in the 200px size.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            width: 200px;
            padding: 20px;
            border: 2px solid black;
            box-sizing: border-box;
            background-color: lightcoral;
        }
    </style>
</head>
<body>
    <div>This is a div with box-sizing border-box.</div>
</body>
</html>`,
        },
        {
          heading: "Use Case 3: Setting box-sizing for All Elements",
          description:
            "Apply box-sizing: border-box to all elements globally to simplify layout calculations and prevent unexpected element size changes.\n\nAll elements are sized consistently, with padding and borders included inside the width/height.",
          language: "html",
          code: `<html>
<head>
    <style>
        * {
            box-sizing: border-box;
        }
        div {
            width: 100%;
            padding: 20px;
            border: 2px solid blue;
            background-color: lightyellow;
        }
    </style>
</head>
<body>
    <div>This is a div with border-box applied globally.</div>
</body>
</html>`,
        },
        {
          heading: "Use Case 4: Fixed Layout with box-sizing: border-box",
          description: "Creating a fixed-size element with padding and border without altering the layout dimensions.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            width: 300px;
            height: 20px;
            padding: 15px;
            border: 10px solid green;
            box-sizing: border-box;
            background-color: lightblue;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div>This is a fixed-size div with box-sizing border-box.</div>
</body>
</html>`,
        },
        {
          heading: "Use Case 5: Creating a Responsive Box with box-sizing",
          description:
            "Ensuring that padding and borders do not cause layout issues in a responsive design.\n\nThe element resizes according to the screen width, with padding and borders included in the total size, avoiding overflow.",
          language: "html",
          code: `<html>
<head>
    <style>
        * {
            box-sizing: border-box;
        }
        .container {
            max-width: 100%;
            padding: 20px;
            border: 5px solid purple;
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <div class="container">This is a responsive box with border-box.</div>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-display-property",
      category: "Layouts & Design",
      shortTitle: "Display Property",
      title: "CSS Display Property",
      sections: [
        {
          heading: "CSS Display Property",
          description:
            "The CSS display property determines how an element is displayed on a webpage, defining its layout behavior and how it interacts with other elements.\n\n- It specifies the type of rendering box an element generates.\n- Controls whether an element is shown as a block, inline, flex, grid, etc.\n- Affects the layout structure and overall page flow.",
        },
        {
          heading: "Display: Block",
          description: "Block-level elements start on a new line and stretch to take up the full available width of their parent container.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785596950/Screenshot_2026-08-01_at_8.39.01_PM_lfsh4i.png",
            alt: "CSS display block diagram",
          },
        },
        {
          heading: "Display: Inline-Block",
          description: "Inline-block elements sit inline with text and neighboring elements, while retaining block-level capability for height and width adjustments.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785596982/Screenshot_2026-08-01_at_8.39.24_PM_zohmbr.png",
            alt: "CSS display inline-block diagram",
          },
        },
        {
          heading: "Display: Flex",
          description: "Creates a one-dimensional flexbox layout, distributing space along a main axis (row or column).",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785596986/Screenshot_2026-08-01_at_8.39.40_PM_er6sxp.png",
            alt: "CSS display flex diagram",
          },
        },
        {
          heading: "Display: Grid",
          description: "Establishes a powerful two-dimensional grid container for positioning items across rows and columns.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785597006/Screenshot_2026-08-01_at_8.40.01_PM_pmuudx.png",
            alt: "CSS display grid diagram",
          },
        },
        {
          heading: "Display: None",
          description: "Removes the element completely from the rendered DOM layout as if it never existed.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785597024/Screenshot_2026-08-01_at_8.40.19_PM_t9sesa.png",
            alt: "CSS display none diagram",
          },
        },
        {
          heading: "Understanding the Display Property",
          description:
            "The display property defines how an HTML element should be displayed. It controls the box type generated by an element, affecting its positioning and behavior within the document flow.\n\n**Syntax:**\n```css\ndisplay: value;\n```\n\nBelow is a complete working HTML template demonstrating block elements in action:",
          language: "html",
          code: `<html>
<head>
    <style>
        #Sarthi1 {
            height: 100px;
            width: 200px;
            background: teal;
            display: block;
        }

        #Sarthi2 {
            height: 100px;
            width: 200px;
            background: cyan;
            display: block;
        }

        #Sarthi3 {
            height: 100px;
            width: 200px;
            background: green;
            display: block;
        }

        .CodeSarthi {
            margin-left: 20px;
            font-size: 42px;
            font-weight: bold;
            color: #009900;
        }

        .Sarthi {
            font-size: 25px;
            margin-left: 30px;
        }

        .main {
            margin: 50px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="CodeSarthi">Code Sarthi</div>
    <div class="Sarthi">display: block; property</div>
    <div class="main">
        <div id="Sarthi1">Block 1</div>
        <div id="Sarthi2">Block 2</div>
        <div id="Sarthi3">Block 3</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "1. Using Display Block",
          description:
            "This is the default property for <div> elements. It places them vertically, one after another. You can adjust the height and width of a block-level element.",
          language: "css",
          code: `#Sarthi1 {
       background: teal;
       display: block;
}
#Sarthi2 {
       background: cyan;
       display: block;
}
#Sarthi3 {
       background: green;
       display: block;
}`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786524618/952a8ac1-e89e-4dc6-ba0a-51d09036cb48.png",
            alt: "Display block output",
          },
        },
        {
          heading: "2. Using Inline Display",
          description:
            "Use this property to display an element inline. It doesn’t start a new line and respects the content flow.",
          language: "css",
          code: `#Sarthi1 {
       background: teal;
       display: inline;
}
#Sarthi2 {
       background: cyan;
       display: inline;
}
#Sarthi3 {
       background: green;
       display: inline;
}`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786524704/8ef93f48-ef84-4201-8645-b50a496d988e.png",
            alt: "Display inline output",
          },
        },
        {
          heading: "3. Using Display Inline-block",
          description:
            "Combining characteristics of both block and inline, this value allows elements to flow inline while still having block-level properties. It’s useful for creating responsive layouts.",
          language: "css",
          code: `#Sarthi1 {
        background: teal;
        display: inline-block;
} 
#Sarthi2 {
        background: cyan;
        display: inline-block; 
} 
#Sarthi3 {
        background: green;
        display: inline-block;
}`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786524813/e66c2c12-f32e-4ddc-9f34-444cfd34b2e3.png",
            alt: "Display inline-block output",
          },
        },
        {
          heading: "4. Using Display None",
          description:
            "This property hides the div or the container which uses this property. Applying it on block 2 completely removes it from the layout flow.",
          language: "css",
          code: `#Sarthi2 {
         background: cyan;
         display: none;
}`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786525011/87ee2405-5b79-4b66-8215-302784c55cdf.png",
            alt: "Display none output on block 2",
          },
        },
        {
          heading: "5. Using Display Flex and Display Grid",
          description:
            "Flexbox and Grid are modern CSS layout systems used to create flexible and structured layouts.\n\n- **Flexbox:** Best for one-dimensional layouts (row or column).\n- **Grid:** Ideal for two-dimensional layouts (rows and columns).",
        },
        {
          heading: "Display Property Values Reference",
          description:
            "| Value | Description |\n| :--- | :--- |\n| **inline** | Used to display an element as an inline element. |\n| **block** | Used to display an element as a block element. |\n| **contents** | Used to make the container box disappear while rendering child elements. |\n| **flex** | Used to display an element as a block-level flex container. |\n| **grid** | Display an element as a block-level grid container. |\n| **inline-block** | Display an element as an inline-level block container. |\n| **inline-flex** | Display an element as an inline-level flex container. |\n| **inline-grid** | Display an element as an inline-level grid container. |\n| **inline-table** | It is used to display an inline-level table. |\n| **list-item** | It is used to display all the elements as a `<li>` list element. |\n| **run-in** | It is used to display an element inline or block level, depending on the context. |\n| **table** | It is used to set the behavior as `<table>` for all elements. |\n| **table-caption** | It is used to set the behavior as `<caption>` for all elements. |\n| **table-column-group** | Set the behavior as `<colgroup>` for all elements. |\n| **table-header-group** | Set the behavior as `<thead>` for all elements. |\n| **table-footer-group** | Set the behavior as `<tfoot>` for all elements. |\n| **table-row-group** | It is used to set the behavior as `<tbody>` for all elements. |\n| **table-cell** | It is used to set the behavior as `<td>` for all elements. |\n| **table-column** | It is used to set the behavior as `<col>` for all elements. |\n| **table-row** | To set the behavior as `<tr>` for all elements. |\n| **none** | Used to remove the element from the document flow. |\n| **initial** | Used to set the default value. |\n| **inherit** | Used to inherit property from its parent elements. |",
        },
      ],
    },
    {
      id: "css-float-clear",
      category: "Layouts & Design",
      shortTitle: "Float and Clear",
      title: "CSS Layout - Float and Clear",
      sections: [
        {
          heading: "CSS Layout - Float and Clear",
          description:
            "CSS layout is used to control how elements are positioned and arranged on a webpage. The float and clear properties help in organizing content, ensuring proper alignment and preventing text or containers from unintentionally wrapping around elements.",
        },
        {
          heading: "Float Property",
          description:
            "The CSS float property allows elements to be positioned to the left or right of their container, allowing inline content (like text) to wrap around it. It is commonly used to create layouts, such as columns, where text or other elements wrap around floated items.\n\n**Syntax:**\n```css\n.element {\n    float: left | right | none | inherit;\n}\n```\n\n### Float Property Values Reference\n| Value | Description |\n| :--- | :--- |\n| **left** | Floats the element to the left side of its container. |\n| **right** | Floats the element to the right side of its container. |\n| **none** | Removes the float and keeps the element in the normal document flow. |\n| **inherit** | Inherits the float property from its parent element. |",
        },
        {
          heading: "1. float: left",
          description:
            "Floats the element to the left side of its container, causing inline elements or surrounding text following it to wrap along its right side.",
          language: "html",
          code: `<html>
<head>
    <style>
        .left {
            float: left;
            width: 50px;
            height: 50px;
            background-color: lightblue;
        }
    </style>
</head>
<body>
    <div class="left">Left Float</div>
</body>
</html>`,
        },
        {
          heading: "2. float: right",
          description:
            "Floats the element to the right side of its container, causing inline elements following it to wrap along its left side.",
          language: "html",
          code: `<html>
<head>
    <style>
        .right {
            float: right;
            width: 50px;
            height: 50px;
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <div class="right">Right Float</div>
</body>
</html>`,
        },
        {
          heading: "3. float: none",
          description: "Removes any float behavior and keeps the element within the standard document flow.",
          language: "html",
          code: `<html>
<head>
    <style>
        .none {
            float: none;
            width: 50px;
            height: 50px;
            background-color: lightcoral;
        }
    </style>
</head>
<body>
    <div class="none">No Float</div>
</body>
</html>`,
        },
        {
          heading: "4. float: inherit",
          description: "Causes the element to explicitly inherit the float behavior of its parent element.",
          language: "html",
          code: `<html>
<head>
    <style>
        .parent {
            float: left;
        }
        .child {
            float: inherit;
            width: 50px;
            height: 50px;
            background-color: lightyellow;
        }
    </style>
</head>
<body>
    <div class="parent">
        Parent
        <div class="child">Inherit Float</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Clear Property",
          description:
            "The CSS clear property controls the behavior of elements in relation to floated elements. It specifies whether an element should be placed next to or below floated elements.\n\n**Syntax:**\n```css\n.element {\n    clear: left | right | both | none | inherit;\n}\n```\n\n### Clear Property Values Reference\n| Value | Description |\n| :--- | :--- |\n| **none** | No effect on adjacent elements, allowing them to position freely (default). |\n| **left** | Forces the element below any left-floating elements. |\n| **right** | Forces the element below any right-floating elements. |\n| **both** | Forces the element below both left and right floating elements. |\n| **inherit** | Inherits the clear property from its parent element. |",
        },
        {
          heading: "1. clear: left",
          description: "Prevents the element from sitting adjacent to left-floated elements, shifting it directly beneath them.",
          language: "html",
          code: `<html>
<head>
    <style>
        .float-left {
            float: left;
            width: 100px;
            height: 100px;
            background-color: lightblue;
        }
        .clear-left {
            clear: left;
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <div class="float-left">Floated Left</div>
    <div class="clear-left">Cleared Left</div>
</body>
</html>`,
        },
        {
          heading: "2. clear: right",
          description: "Prevents the element from sitting adjacent to right-floated elements, shifting it below them.",
          language: "html",
          code: `<html>
<head>
    <style>
        .float-right {
            float: right;
            width: 100px;
            height: 100px;
            background-color: lightcoral;
        }
        .clear-right {
            clear: right;
            background-color: lightyellow;
        }
    </style>
</head>
<body>
    <div class="float-right">Floated Right</div>
    <div class="clear-right">Cleared Right</div>
</body>
</html>`,
        },
        {
          heading: "3. clear: both",
          description:
            "Prevents the element from sitting adjacent to both left and right-floated elements, ensuring it drops underneath any floating element above it.",
          language: "html",
          code: `<html>
<head>
    <style>
        .float-left {
            float: left;
            width: 100px;
            height: 100px;
            background-color: lightblue;
        }
        .float-right {
            float: right;
            width: 100px;
            height: 100px;
            background-color: lightcoral;
        }
        .clear-both {
            clear: both;
            background-color: lightgray;
        }
    </style>
</head>
<body>
    <div class="float-left">Floated Left</div>
    <div class="float-right">Floated Right</div>
    <div class="clear-both">Cleared Both</div>
</body>
</html>`,
        },
        {
          heading: "4. clear: none",
          description: "Allows the element to remain adjacent to floated elements (the default behavior in normal flow).",
          language: "html",
          code: `<html>
<head>
    <style>
        .float-left {
            float: left;
            width: 100px;
            height: 100px;
            background-color: lightblue;
        }
        .no-clear {
            clear: none;
            background-color: lightpink;
        }
    </style>
</head>
<body>
    <div class="float-left">Floated Left</div>
    <div class="no-clear">No Clear Applied</div>
</body>
</html>`,
        },
        {
          heading: "Best Practices for CSS Clear Property",
          description:
            "- **Use floats sparingly:** Modern layout systems like Flexbox and CSS Grid provide far more predictable, robust tools for structural page layouts.\n- **Always clear floats:** Failing to clear floated items can cause parent container collapse or unexpected overlap in succeeding sections.\n- **Test designs across devices:** Check responsive formatting across multiple display widths to maintain layout consistency.",
        },
      ],
    },
    {
      id: "css-overflow-property",
      category: "Layouts & Design",
      shortTitle: "Overflow Property",
      title: "CSS overflow Property",
      sections: [
        {
          heading: "CSS overflow Property",
          description:
            "The CSS overflow property is used to set the overflow behavior of an element. It serves as a shorthand property for combining overflow-x and overflow-y behaviors, giving developers fine control over content that exceeds its container's physical dimensions.\n\n**Syntax:**\n```css\noverflow: visible | hidden | clip | scroll | auto;\n```\n\n### Property Values Reference\n| Value | Description |\n| :--- | :--- |\n| **visible** | The content is not clipped and remains visible outside the boundaries of the element box (default behavior). |\n| **hidden** | The overflowing text or elements are clipped and the remaining content becomes hidden from view. |\n| **clip** | Used to clip the content strictly to fit within the element's padding box without adding any scrolling mechanism. |\n| **scroll** | The overflow is clipped, but horizontal and vertical scrollbars are added permanently to enable viewing remaining content. |\n| **auto** | Dynamically adds scrollbars only when the content size exceeds the container dimensions. |",
        },
        {
          heading: "Example 1: overflow: auto",
          description:
            "The following code demonstrates the CSS `overflow: auto` property, automatically introducing scrollbars to browse excess paragraph lines within a fixed 200x100px bounding box.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS overflow Property
    </title>

    <style>
        h1 {
            color: green;
        }
        p {
            width: 200px;
            height: 100px;
            border: 1px solid;
            overflow: auto;
            text-align: justify;
        }
    </style>
</head>

<body>
    <h1>Code Sarthi</h1>

    <h3>CSS overflow Property</h3>

    <p>
        CSS (Cascading Style Sheets) is used to 
        apply styles to web pages. Cascading 
        Style Sheets are fondly referred to as 
        CSS. It is used to make web pages 
        presentable. The reason for using this 
        is to simplify the process of making web 
        pages presentable. It allows you to apply 
        styles on web pages. More importantly, 
        it enables you to do this independently 
        of the HTML that makes up each web page.
    </p>
</body>
</html>`,
        },
        {
          heading: "Example 2: overflow: hidden",
          description:
            "The following code demonstrates how excess paragraph lines are completely cropped and concealed from user visibility when applying the `overflow: hidden` property.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>  CSS overflow Property </title>

    <style>
        h1 {
            color: green;
        }
        p {
            width: 200px;
            height: 100px;
            border: 1px solid;
            overflow: hidden;
            text-align: justify;
        }
    </style>
</head>

<body>
    <h1>Code Sarthi</h1>
    <h3>CSS overflow Property</h3>
    <p>
        CSS (Cascading Style Sheets) is used to 
        apply styles to web pages. Cascading 
        Style Sheets are fondly referred to as 
        CSS. It is used to make web pages 
        presentable. The reason for using this 
        is to simplify the process of making web 
        pages presentable. It allows you to apply 
        styles on web pages. More importantly, 
        it enables you to do this independently 
        of the HTML that makes up each web page.
    </p>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786526699/83790c77-7e59-44c2-b9f2-23468c0462dc.png",
            alt: "CSS overflow hidden output example",
          },
        },
        {
          heading: "Supported Browsers",
          description:
            "The CSS overflow property enjoys universal support across all major desktop and mobile web browsers:\n\n| Browser | Supported Version |\n| :--- | :--- |\n| **Google Chrome** | 1.0 and above |\n| **Microsoft Edge** | 12.0 and above |\n| **Mozilla Firefox** | 1.0 and above |\n| **Opera** | 7.0 and above |\n| **Apple Safari** | 1.0 and above |",
        },
      ],
    },
    {
      id: "css-z-index-property",
      category: "Layouts & Design",
      shortTitle: "Index Property",
      title: "CSS z-index Property",
      sections: [
        {
          heading: "CSS z-index Property",
          description:
            "CSS z-index is used to control the stacking order of overlapping elements, which decides whether an element appears on top of or behind others based on its assigned value.\n\n- It works only on positioned elements (`position: relative`, `absolute`, `fixed`, or `sticky`).\n- The default DOM rendering order applies if no z-index is explicitly defined.\n- The z-index property can take various integer or keyword values, detailed below.\n\n### Property Values Reference\n| Value | Description |\n| :--- | :--- |\n| **auto** | The stack order is equal to that of the parent container (default behavior). |\n| **number** | The stack order depends directly on the integer assigned (higher numbers stack above lower numbers). |\n| **initial** | Sets the property back to its default value (`auto`). |\n| **inherit** | Inherits the z-index property value directly from the parent element. |",
        },
        {
          heading: "1. Using z-index with auto",
          description:
            "The `auto` value applies the default stacking order without explicitly creating a new stacking context.\n\n- The red box (`.box1`) and blue box (`.box2`) overlap each other.\n- Since both boxes have their z-index set to `auto`, the standard Document Object Model (DOM) stacking order applies, and the blue box appears on top simply because it appears later in the HTML markup.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            position: relative;
            width: 100px;
            height: 100px;
        }
        .box1 {
            background-color: red;
            z-index: auto;
            top: 50px;
            left: 50px;
            position: absolute;
        }
        .box2 {
            background-color: blue;
            top: 70px;
            left: 70px;
            position: absolute;
        }
    </style>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
</html>`,
        },
        {
          heading: "2. Using z-index with Numbers",
          description:
            "Specifying numeric integer values directly controls layer prioritization. Higher integers always stack above lower ones.\n\nIn the example below, the blue box (`z-index: 2`) clearly stacks above the red box (`z-index: 1`).",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            position: absolute;
            width: 100px;
            height: 100px;
        }
        .box1 {
            background-color: red;
            z-index: 1;
            top: 50px;
            left: 50px;
        }
        .box2 {
            background-color: blue;
            z-index: 2;
            top: 70px;
            left: 70px;
        }
    </style>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
</html>`,
        },
        {
          heading: "3. Using z-index with initial",
          description:
            "The `initial` keyword resets the z-index property back to its browser default setting of `auto`.\n\nThe red box drops back to standard DOM stacking precedence since `z-index: initial` reverts its behavior to `auto`.",
          language: "html",
          code: `<html>
<head>
    <style>
        div {
            position: absolute;
            width: 100px;
            height: 100px;
        }
        .box1 {
            background-color: red;
            z-index: initial;
            top: 50px;
            left: 50px;
        }
        .box2 {
            background-color: blue;
            z-index: 1;
            top: 70px;
            left: 70px;
        }
    </style>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
</html>`,
        },
        {
          heading: "4. Using z-index with inherit",
          description:
            "The `inherit` keyword instructs an element to adopt the exact z-index value assigned to its parent container.\n\nHere, `.child` dynamically inherits a z-index value of `5` directly from `.parent`.",
          language: "html",
          code: `<html>
<head>
    <style>
        .parent {
            position: relative;
            z-index: 5;
        }
        .child {
            position: absolute;
            width: 100px;
            height: 100px;
            background-color: yellow;
            z-index: inherit;
            top: 50px;
            left: 50px;
        }
    </style>
</head>
<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>
</html>`,
        },
        {
          heading: "5. Combining z-index with Multiple Contexts",
          description:
            "When developing complex layouts with multiple stacking contexts, an element's z-index hierarchy applies strictly within its parent stacking context boundary.\n\nThe red box (`z-index: 2`) stacks above the blue box (`z-index: 1`) inside the localized stacking context created by their mutual relative parent container.",
          language: "html",
          code: `<html>
<head>
    <style>
        .parent {
            position: relative;
            z-index: 1;
            background-color: lightgray;
            width: 200px;
            height: 200px;
        }

        .child1 {
            position: absolute;
            z-index: 2;
            background-color: red;
            width: 100px;
            height: 100px;
        }
        .child2 {
            position: absolute;
            z-index: 1;
            background-color: blue;
            width: 100px;
            height: 100px;
            top: 50px;
            left: 50px;
        }
    </style>
</head>
<body>
    <div class="parent">
        <div class="child1"></div>
        <div class="child2"></div>
    </div>
</body>
</html>`,
        },
      ],
    },
    {
      id: "flexbox",
      category: "Modern Layout Systems",
      shortTitle: "Flexbox",
      title: "CSS Flexbox",
      sections: [
        {
          heading: "CSS Flexbox Overview",
          description:
            "The Flexible Box Layout module introduces a one-dimensional layout system that handles space distribution and item alignment effectively. It works seamlessly for horizontal (row) or vertical (column) arrangements, making it a go-to solution for responsive designs.\n\n- Flexbox eliminates the need for floats or complex positioning, enabling responsive and dynamic layouts.\n- It aligns items efficiently, distributing space within a container even when their sizes are dynamic or unknown.\n- Flexbox is universally supported across modern web browsers, making it a dependable industry standard for layout architectures.\n\n### Before the Flexbox Model\n- **Block:** Sections and structural building blocks in web pages.\n- **Inline:** Text and inline characters.\n- **Table:** Two-dimensional grid data formatting.\n- **Positioned:** Explicit pixel or percentage coordinate placement of an element.\n\n### Flexbox Components\n- **Flex Container:** The parent wrapper (`div`) whose layout rule starts a flex context.\n- **Flex Items:** The child elements sitting directly inside the flex container.\n\nBelow is an interactive working setup demonstrating an equally balanced 3-column flex layout:",
          language: "html",
          code: `<html>
<head>
    <style>
        .flex-container {
            display: flex;
            background-color: #f2f2f2;
            padding: 10px;
        }
        .flex-item {
            background-color: #4CAF50;
            color: white;
            margin: 5px;
            padding: 20px;
            text-align: center;
            flex: 1;
        }
    </style>
</head>
<body>
    <div class="flex-container">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785597848/7a5a29df-bf28-400f-8234-1cf8de893d69.png",
            alt: "Flexbox Components: Flex Container and Flex Items diagram",
          },
        },
        {
          heading: "Flexbox Axes: 1. Main Axis",
          description:
            "Flexbox operates on two intersecting layout directions.\n\n### 1. Main Axis\nThe main axis is the primary direction along which flex items are laid out.\n- **Main Start:** The starting boundary edge of the main axis.\n- **Main Size:** The dimension width or height measured between Main Start and Main End.\n- **Main End:** The terminal endpoint boundary of the main axis.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785597926/f85f3a7f-f812-42bb-a434-29befd6636ba.png",
            alt: "Flexbox Main Axis orientation diagram",
          },
        },
        {
          heading: "Flexbox Axes: 2. Cross Axis",
          description:
            "### 2. Cross Axis\nThe cross axis always runs strictly perpendicular to the main axis.\n- **Cross Start:** The beginning boundary of the cross axis.\n- **Cross Size:** The dimensional length measured between Cross Start and Cross End.\n- **Cross End:** The concluding boundary of the cross axis.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785597945/f9449caf-3334-470a-8bc4-649847855556.png",
            alt: "Flexbox Cross Axis orientation diagram",
          },
        },
        {
          heading: "Flex Direction: Row Orientation",
          description:
            "When positioning items across horizontal rows:\n- **Left to Right:** `flex-direction: row;` (default setting)\n- **Right to Left:** `flex-direction: row-reverse;`",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785597982/332d8ee4-4963-4566-bd9c-15f1dacbd284.png",
            alt: "Flexbox row orientation visual reference",
          },
        },
        {
          heading: "Flex Direction: Column Orientation",
          description:
            "When stacking items into vertical column lists:\n- **Top to Bottom:** `flex-direction: column;`\n- **Bottom to Top:** `flex-direction: column-reverse;`",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785598028/cad321eb-97b6-4b96-a011-46f45d32a2a1.png",
            alt: "Flexbox column orientation visual reference",
          },
        },
        {
          heading: "Aligning and Justifying Content",
          description:
            "Flexbox provides powerful alignment properties for spacing items across container dimensions without writing calculation margins:\n\n- **`justify-content`**: Aligns and distributes items along the main axis (`flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`).\n- **`align-items`**: Aligns items along the perpendicular cross axis (`stretch`, `center`, `flex-start`, `flex-end`, `baseline`).\n- **`align-content`**: Spaces out multi-line flex rows when extra container space is present along the cross axis.",
        },
        {
          heading: "Example 1: Responsive Design with Flexbox",
          description:
            "Flexbox excels in creating fluid responsive layouts by dynamically reordering and wrapping child cards to fit varying viewport display resolutions. Combining Flexbox parameters with CSS media queries enables seamless mobile responsiveness.\n\n- `.flex-container` establishes a flex layout equipped with `flex-wrap: wrap` and `justify-content: space-around` for balanced card distribution.\n- When viewport widths shrink below `600px`, media queries automatically switch `flex-direction` from standard row wrapping to a clean vertical `column` layout.",
          language: "html",
          code: `<html>
<head>
    <style>
    .flex-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: #32a852;
    }
    .flex-container div {
        background-color: #c9d1cb;
        margin: 10px;
        padding: 20px;
        flex: 1 1 200px;
    }
    @media (max-width: 600px) {
        .flex-container {
            flex-direction: column;
        }
    }
    </style>
</head>
<body>
    <h2>Responsive Flexbox</h2>
    <div class="flex-container">
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 2: Horizontal Navigation Bar Using Flexbox",
          description:
            "Creating responsive header navigation bars is clean and intuitive with Flexbox styling.\n\n- `.navbar` applies `display: flex` alongside `justify-content: space-between` to spread branding or links evenly across the available horizontal header span while keeping items vertically centered with `align-items: center`.\n- Simple hover state styling enhances interactive feedback across navigation tabs.",
          language: "html",
          code: `<html>
<head>
    <style>
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #4CAF50;
            padding: 10px;
        }
        .navbar a {
            color: white;
            text-decoration: none;
            padding: 10px 15px;
        }
        .navbar a:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="navbar">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </div>
</body>
</html>`,
        },
        {
          heading: "Flex Item Sizing Reference",
          description:
            "The `flex` property is a powerful shorthand that bundles `flex-grow`, `flex-shrink`, and `flex-basis` instructions into a single clean declaration.",
          language: "css",
          code: `.item {
  flex: 1 1 0%;  /* grow shrink basis */
}

/* Common industrial sizing patterns */
.item-fixed  { flex: 0 0 200px; }   /* stay locked at 200px width */
.item-grow   { flex: 1; }           /* expand evenly across open container space */
.item-auto   { flex: 0 1 auto; }    /* shrink if container compresses, never over-expand */`,
        },
        {
          heading: "The Centering Trick",
          description: "Flexbox provides the simplest, most dependable solution for dead-centering any element across both axes.",
          language: "css",
          code: `.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
        },
      ],
    },
    {
      id: "css-justify-content-property",
      category: "Modern Layout Systems",
      shortTitle: "Content Property",
      title: "CSS justify-content Property",
      sections: [
        {
          heading: "CSS justify-content Property",
          description:
            "The justify-content property in CSS is used to align the flexible box container's items along the main axis of a flex container. This property manages space distribution between and around content items in a flex container.\n\n> **Note:** This property does not align items along the perpendicular vertical cross axis. For vertical alignment, use the `align-items` property.\n\nThe alignment is effective after applying explicit lengths and auto margin properties. For instance, if there is at least one flexible element with a `flex-grow` property greater than `0` in a Flexbox layout, `justify-content` will have no visible effect as all open space is automatically absorbed by the growing child.\n\n**Syntax:**\n```css\njustify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | initial | inherit;\n```\n\n### Property Values Reference\n| Value | Description |\n| :--- | :--- |\n| **flex-start** | Align flex items at the start of the container (default behavior). |\n| **flex-end** | Align flex items at the end of the container. |\n| **center** | Align flex items at the center of the container. |\n| **space-between** | Distributes items evenly with the first item right at the start edge and the last item right at the end edge. |\n| **space-around** | Distributes items with equal spacing before, between, and after each item. |\n| **space-evenly** | Distributes items with exactly equal spacing between them and identical margins from the outer edges. |\n| **initial** | Sets the property back to its default initial value (`flex-start`). |\n| **inherit** | Inherits the value directly from its parent container element. |",
        },
        {
          heading: "1. flex-start",
          description:
            "The `flex-start` value aligns flex items at the starting boundary threshold of the container, positioning them from the left side in horizontal row layouts (or top edge in vertical column arrangements).\n\n**Syntax:**\n```css\njustify-content: flex-start;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title> CSS justify-content Property </title>
    <style>
        #box {
            display: flex;
            border: 1px solid black;
            justify-content: flex-start;
        }

        #box div {
            width: 110px;
            height: 120px;
            border: 1px solid black;
            background: linear-gradient(green, silver);
        }
    </style>
</head>

<body>
    <div id="box">
        <div>1
            <p>Code Sarthi</p>
        </div>
        <div>2
            <p>Code Sarthi</p>
        </div>
        <div>3
            <p>Code Sarthi</p>
        </div>
        <div>4
            <p>Code Sarthi</p>
        </div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786527418/1259998d-52ff-4439-91ce-3829e302dfe8.png",
            alt: "CSS justify-content flex-start visual output",
          },
        },
        {
          heading: "2. flex-end",
          description:
            "The `flex-end` value aligns flex items along the terminal endpoint of the container, shifting elements across to the right side (or bottom boundary in vertical orientations).\n\n**Syntax:**\n```css\njustify-content: flex-end;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title> CSS justify-content Property </title>
    <style>
        #box {
            display: flex;
            border: 1px solid black;
            justify-content: flex-end;
        }

        #box div {
            width: 110px;
            height: 120px;
            border: 1px solid black;
            background: linear-gradient(green, silver);
        }
    </style>
</head>

<body>
    <div id="box">
        <div>1
            <p>Code Sarthi</p>
        </div>
        <div>2
            <p>Code Sarthi</p>
        </div>
        <div>3
            <p>Code Sarthi</p>
        </div>
        <div>4
            <p>Code Sarthi</p>
        </div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786612364/f7267ff0-5be9-4b2f-ac4f-7dd60cda5605.png",
            alt: "CSS justify-content flex-end visual output",
          },
        },
        {
          heading: "3. center",
          description:
            "The `center` keyword centers items along the main axis, balancing empty container space evenly across the outer left and right margins.\n\n**Syntax:**\n```css\njustify-content: center;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title> CSS justify-content Property </title>
    <style>
        #box {
            display: flex;
            border: 1px solid black;
            justify-content: center;
        }

        #box div {
            width: 110px;
            height: 120px;
            border: 1px solid black;
            background: linear-gradient(green, silver);
        }
    </style>
</head>

<body>
    <div id="box">
        <div>1
            <p>Code Sarthi</p>
        </div>
        <div>2
            <p>Code Sarthi</p>
        </div>
        <div>3
            <p>Code Sarthi</p>
        </div>
        <div>4
            <p>Code Sarthi</p>
        </div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786612505/540b0f02-dd49-4eb6-b68f-10a2365f238f.png",
            alt: "CSS justify-content center visual output",
          },
        },
        {
          heading: "4. space-between",
          description:
            "The `space-between` value divides available container width uniformly between consecutive child items. The first leading item anchors firmly against the initial start edge, while the final child locks against the concluding end edge.\n\n**Syntax:**\n```css\njustify-content: space-between;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title> CSS justify-content Property </title>
    <style>
        #box {
            display: flex;
            border: 1px solid black;
            justify-content: space-between;
        }

        #box div {
            width: 110px;
            height: 120px;
            border: 1px solid black;
            background: linear-gradient(green, silver);
        }
    </style>
</head>

<body>
    <div id="box">
        <div>1
            <p>Code Sarthi</p>
        </div>
        <div>2
            <p>Code Sarthi</p>
        </div>
        <div>3
            <p>Code Sarthi</p>
        </div>
        <div>4
            <p>Code Sarthi</p>
        </div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786612867/54e549ce-0165-464a-9bd4-fc77c28dc990.png",
            alt: "CSS justify-content space-between visual output",
          },
        },
        {
          heading: "5. space-around",
          description:
            "The `space-around` keyword distributes items with equal half-width spacing cushions on both sides of every individual element, ensuring consistent visual separation throughout.\n\n**Syntax:**\n```css\njustify-content: space-around;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title> CSS justify-content Property </title>
    <style>
        #box {
            display: flex;
            border: 1px solid black;
            justify-content: space-around;
        }

        #box div {
            width: 110px;
            height: 120px;
            border: 1px solid black;
            background: linear-gradient(green, silver);
        }
    </style>
</head>

<body>
    <div id="box">
        <div>1
            <p>Code Sarthi</p>
        </div>
        <div>2
            <p>Code Sarthi</p>
        </div>
        <div>3
            <p>Code Sarthi</p>
        </div>
        <div>4
            <p>Code Sarthi</p>
        </div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786612954/77f66cdc-479a-40f3-bd06-c7e5bc39995c.png",
            alt: "CSS justify-content space-around visual output",
          },
        },
        {
          heading: "6. space-evenly",
          description:
            "The `space-evenly` alignment rule partitions empty space such that the distances between sibling items—and the gaps against the container boundaries—are strictly identical across every span.\n\n**Syntax:**\n```css\njustify-content: space-evenly;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title> CSS justify-content Property </title>
    <style>
        #box {
            display: flex;
            border: 1px solid black;
            justify-content: space-evenly;
        }

        #box div {
            width: 110px;
            height: 120px;
            border: 1px solid black;
            background: linear-gradient(green, silver);
        }
    </style>
</head>

<body>
    <div id="box">
        <div>1
            <p>Code Sarthi</p>
        </div>
        <div>2
            <p>Code Sarthi</p>
        </div>
        <div>3
            <p>Code Sarthi</p>
        </div>
        <div>4
            <p>Code Sarthi</p>
        </div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786613020/eb9b9e7b-bd53-4ca4-a42d-ff8b07ba7ee1.png",
            alt: "CSS justify-content space-evenly visual output",
          },
        },
        {
          heading: "7. initial",
          description:
            "The `initial` keyword reverts the `justify-content` property back to its browser specification default setting (`flex-start`).\n\n**Syntax:**\n```css\njustify-content: initial;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title> CSS justify-content Property </title>
    <style>
        #box {
            display: flex;
            border: 1px solid black;
            justify-content: initial;
        }

        #box div {
            width: 110px;
            height: 120px;
            border: 1px solid black;
            background: linear-gradient(green, silver);
        }
    </style>
</head>

<body>
    <div id="box">
        <div>1
            <p>Code Sarthi</p>
        </div>
        <div>2
            <p>Code Sarthi</p>
        </div>
        <div>3
            <p>Code Sarthi</p>
        </div>
        <div>4
            <p>Code Sarthi</p>
        </div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786527418/1259998d-52ff-4439-91ce-3829e302dfe8.png",
            alt: "CSS justify-content initial visual output",
          },
        },
        {
          heading: "8. inherit",
          description:
            "The `inherit` directive forces a flex item or nested box to adopt the exact `justify-content` formatting alignment active on its direct parent element.\n\n**Syntax:**\n```css\njustify-content: inherit;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title> CSS justify-content Property </title>
    <style>
        #box {
            display: flex;
            border: 1px solid black;
            justify-content: inherit;
        }

        #box div {
            width: 110px;
            height: 120px;
            border: 1px solid black;
            background: linear-gradient(green, silver);
        }
    </style>
</head>

<body>
    <div id="box">
        <div>1
            <p>Code Sarthi</p>
        </div>
        <div>2
            <p>Code Sarthi</p>
        </div>
        <div>3
            <p>Code Sarthi</p>
        </div>
        <div>4
            <p>Code Sarthi</p>
        </div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786527418/1259998d-52ff-4439-91ce-3829e302dfe8.png",
            alt: "CSS justify-content inherit visual output",
          },
        },
        {
          heading: "Supported Browsers",
          description:
            "The `justify-content` property is broadly supported across modern and legacy web rendering engines:\n\n| Browser | Supported Version |\n| :--- | :--- |\n| **Google Chrome** | 29.0 and above |\n| **Microsoft Edge** | 12.0 and above |\n| **Mozilla Firefox** | 20.0 and above |\n| **Opera** | 12.1 and above |\n| **Apple Safari** | 9.0 and above |\n| **Internet Explorer** | 11.0 and above |\n\n> **Note:** While all modern browsers fully support `justify-content`, always verify layout behavior on legacy browser targets or provide appropriate fallback properties when supporting older architectures.",
        },
      ],
    },
    {
      id: "css-align-items-property",
      category: "Modern Layout Systems",
      shortTitle: "Align Items Property",
      title: "CSS align-items Property",
      sections: [
        {
          heading: "CSS align-items Property",
          description:
            "The align-items property in CSS is used to align flex items along the cross-axis within a flex container. It accepts values like flex-start, flex-end, center, baseline, and stretch, controlling the vertical alignment of items in a standard horizontal flexbox.\n\n**Syntax:**\n```css\nalign-items: normal | stretch | center | flex-start | flex-end | baseline | first baseline | last baseline | start | end | self-start | self-end | safe center | unsafe center | initial | inherit;\n```\n\n**Default Value:** `stretch`\n\n### Property Values Reference\n| Value | Description |\n| :--- | :--- |\n| **stretch** | Stretches the items to fill the available height or space on the cross-axis (default behavior). |\n| **center** | Centers the items along the middle of the cross-axis. |\n| **flex-start** | Aligns items flush against the starting threshold edge of the container on the cross-axis. |\n| **flex-end** | Aligns items flush against the terminal ending edge of the container on the cross-axis. |\n| **baseline** | Aligns items strictly along the baseline of their initial line of inner text. |\n| **normal** | Behaves as the natural alignment setting in flex contexts (generally equivalent to `stretch`). |\n| **initial** | Sets the value of the property back to its initial specification default (`stretch`). |\n| **inherit** | Inherits the alignment value directly from its structural parent container. |",
        },
        {
          heading: "1. normal Value",
          description:
            "The `normal` value behaves as the default alignment in the flex container. It generally acts like `stretch` in standard flex contexts—causing items to fill the container's cross-axis height—but can adapt its rendering behavior depending on layout context or item-specific rules.\n\n**Syntax:**\n```css\nalign-items: normal;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS align-items: normal Property
    </title>
    <style>
        #normal {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: normal;
        }
    </style>
</head>

<body>
    <center>
        <h1 style="color:green;">Code Sarthi</h1>

        <div id="normal">
            <div style="background-color:blue;">
                Blue
            </div>
            <div style="background-color:red;">
                Red
            </div>
        </div>
    </center>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786615411/dbca687f-53b4-43a8-9ec9-2a5f6d73c2eb.png",
            alt: "CSS align-items normal visual output",
          },
        },
        {
          heading: "2. stretch Value",
          description:
            "The `stretch` keyword commands flex items to expand along the cross-axis, dynamically enlarging their vertical stature (in horizontal flex rows) until their border boxes fully occupy the available container height.\n\n**Syntax:**\n```css\nalign-items: stretch;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS align-items Property
    </title>
    <style>
        #stretch {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: stretch;
        }
    </style>
</head>

<body>
    <center>
        <h1 style="color:green;">Code Sarthi</h1>

        <div id="stretch">
            <div style="background-color:Purple;">
                Purple
            </div>
            <div style="background-color:Yellow;">
                Yellow
            </div>
        </div>
    </center>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786615785/dd15121d-1101-49bd-8d38-94a4ae9422e0.png",
            alt: "CSS align-items stretch visual output",
          },
        },
        {
          heading: "3. center Value",
          description:
            "The `center` directive vertically centers flex items midway along the cross-axis, leaving balanced empty padding above and below each child element.\n\n**Syntax:**\n```css\nalign-items: center;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS align-items Property
    </title>
    <style>
        #center {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: center;
        }
    </style>
</head>

<body>
    <center>
        <h1 style="color:green;">Code Sarthi</h1>

        <div id="center">
            <div style="background-color:Purple;">
                Purple
            </div>
            <div style="background-color:Yellow;">
                Yellow
            </div>
        </div>
    </center>
</body>
</html>`,

          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786616112/edf9d685-495e-471f-bf48-142f0732a476.png",
            alt: "CSS align-items stretch visual output",
          },
        },
        {
          heading: "4. flex-start Value",
          description:
            "The `flex-start` rule anchors flex items flush against the opening boundary threshold of the cross-axis, positioning items along the top edge of a standard horizontal flex row container.\n\n**Syntax:**\n```css\nalign-items: flex-start;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS | align-items Property
    </title>
    <style>
        #flex-start {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: flex-start;
        }
    </style>
</head>

<body>
    <center>
        <h1 style="color:green;">Code Sarthi</h1>

        <div id="flex-start">
            <div style="background-color:Purple;">
                Purple
            </div>
            <div style="background-color:Yellow;">
                Yellow
            </div>
        </div>
    </center>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786615840/1d96f713-fc8f-46c9-af1c-44cb405dded9.png",
            alt: "CSS align-items flex-start visual output",
          },
        },
        {
          heading: "5. flex-end Value",
          description:
            "The `flex-end` rule aligns flex items along the concluding boundary of the cross-axis, resting child elements across the bottom edge of a standard horizontal container.\n\n**Syntax:**\n```css\nalign-items: flex-end;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS | align-items Property
    </title>
    <style>
        #flex-end {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: flex-end;
        }
    </style>
</head>

<body>
    <center>
        <h1 style="color:green;">Code Sarthi</h1>

        <div id="flex-end">
            <div style="background-color:Purple;">
                Purple
            </div>
            <div style="background-color:Yellow;">
                Yellow
            </div>
        </div>
    </center>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786616321/1b19df9c-bd9d-4123-a502-7fbd1a833ad0.png",
            alt: "CSS align-items flex-end visual output",
          },
        },
        {
          heading: "6. baseline Value",
          description:
            "The `baseline` keyword aligns flex items across the container's cross-axis such that the baselines of their initial lines of text align perfectly across siblings, regardless of varied card font sizes or container padding heights.\n\n**Syntax:**\n```css\nalign-items: baseline;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS | align-items Property
    </title>
    <style>
        #baseline {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: baseline;
        }
    </style>
</head>

<body>
    <center>
        <h1 style="color:green;">Code Sarthi</h1>

        <div id="baseline">
            <div style="background-color:Purple;">
                Purple
            </div>
            <div style="background-color:Yellow;">
                Yellow
            </div>
        </div>
    </center>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786615840/1d96f713-fc8f-46c9-af1c-44cb405dded9.png",
            alt: "CSS align-items baseline visual output",
          },
        },
        {
          heading: "7. initial Value",
          description:
            "The `initial` directive resets the `align-items` property back to its initial specification default setting (`stretch`), causing child items to naturally fill the available vertical container height.\n\n**Syntax:**\n```css\nalign-items: initial;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS align-items Property
    </title>
    <style>
        #initial {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: initial;
        }
    </style>
</head>

<body>
    <center>
        <h1 style="color:green;">Code Sarthi</h1>

        <div id="initial">
            <div style="background-color:Purple;">
                Purple
            </div>
            <div style="background-color:Yellow;">
                Yellow
            </div>
        </div>
    </center>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786615785/dd15121d-1101-49bd-8d38-94a4ae9422e0.png",
            alt: "CSS align-items initial visual output",
          },
        },
        {
          heading: "8. inherit Value",
          description:
            "The `inherit` keyword instructs an element to dynamically inherit the cross-axis alignment rule active on its direct parent element.\n\nIn the setup below, `#inherit` adopts the exact alignment behavior (`align-items: flex-end`) active on its parent configuration.\n\n**Syntax:**\n```css\nalign-items: inherit;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS align-items Property
    </title>
    <style>
        #parent {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: flex-end; /* Parent container's alignment */
        }

        #inherit {
            width: 320px;
            height: 200px;
            border: 2px solid black;
            display: flex;
            align-items: inherit;
        }
    </style>
</head>

<body>
    <center>
        <h1 style="color:green;">Code Sarthi</h1>

        <div id="parent">
            <div style="background-color:Purple;">
                Purple
            </div>
            <div style="background-color:Yellow;">
                Yellow
            </div>
        </div>

        <div id="inherit">
            <div style="background-color:Purple;">
                Purple
            </div>
            <div style="background-color:Yellow;">
                Yellow
            </div>
        </div>
    </center>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1786616636/d558f5ac-add9-4dce-9c2a-c34a6b14d61a.png",
            alt: "CSS align-items inherit visual output",
          },
        },
        {
          heading: "Supported Browsers",
          description:
            "The `align-items` flexbox cross-axis property enjoys robust native support across all major rendering engines:\n\n| Browser | Support Status |\n| :--- | :--- |\n| **Google Chrome** | Fully Supported |\n| **Microsoft Edge** | Fully Supported |\n| **Mozilla Firefox** | Fully Supported |\n| **Opera** | Fully Supported |\n| **Apple Safari** | Fully Supported |\n\n> **Note:** While modern web browsers universally embrace `align-items`, older environments such as Internet Explorer (partially supported in IE 11 with known flexbox quirks) or Opera Mini may exhibit limited or partial support.",
        },
      ],
    },
    {
      id: "css-align-content-property",
      category: "Modern Layout Systems",
      shortTitle: "Align Content Property",
      title: "CSS align-content Property",
      sections: [
        {
          heading: "CSS align-content Property",
          description:
            "The align-content property changes the behavior of the flex-wrap property by aligning flex lines. It is used to specify the spacing and alignment between multi-line item rows or columns inside a flexible container.\n\n> **Important Requirement:** This property defines how each flex line is aligned within a flexbox and is **only applicable if `flex-wrap: wrap` (or `wrap-reverse`) is active** and multiple lines of items are present. If items sit on a single unbroken line, `align-content` has no visual effect.\n\n### List of align-content Property Values:\n- `center`\n- `stretch` (default setting)\n- `flex-start`\n- `flex-end`\n- `space-around`\n- `space-between`\n- `space-evenly`\n- `start` / `end`\n- `normal`\n- `baseline`, `first baseline`, `last baseline`\n- `safe` / `unsafe`",
        },
        {
          heading: "1. center Value",
          description:
            "Displays the flex item lines clustered together at the absolute center of the flex container along the perpendicular cross axis.\n\n**Syntax:**\n```css\nalign-content: center;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
    <head>
        <title>align-content property</title>
        <style>
            .main-container {
                display: flex;
                height: 400px;
                flex-wrap: wrap;
                align-content: center;
                background-color: green;
            }
            
            .main-container div {
                background-color: #f4f4f4;
                width: 100px;
                margin: 10px;
                text-align: center;
                font-size: 50px;
            }
            h2 {
                text-align:center;
            }
            .Sarthi {
                font-size:40px;
                text-align:center;
                color:#009900;
                font-weight:bold;
            } 
        </style>
    </head>
    <body>
        <div class="Sarthi">Code Sarthi</div>
        <h2>align-content: center;</h2>
        <div class="main-container">
            <div>1</div>
            <div>2</div>
            <div>3</div> 
            <div>4</div>
            <div>5</div>
            <div>6</div> 
            <div>7</div>
            <div>8</div>
            <div>9</div> 
            <div>10</div>
        </div>
    </body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785599731/210d3459-e487-479d-915e-f5d168ce751a.png",
            alt: "CSS align-content center visual output",
          },
        },
        {
          heading: "2. stretch Value",
          description:
            "The item rows stretch along the cross axis to fully absorb whatever empty container height remains. This is the default browser behavior.\n\n**Syntax:**\n```css\nalign-content: stretch;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
    <head>
        <title>align-content property</title>
        <style>
            .main-container {
                display: flex;
                height: 400px;
                flex-wrap: wrap;
                align-content: stretch;
                background-color: green;
            }
            
            .main-container div {
                background-color: #f4f4f4;
                width: 100px;
                margin: 10px;
                text-align: center;
                font-size: 50px;
            }
            h2 {
                text-align:center;
            }
            .Sarthi {
                font-size:40px;
                text-align:center;
                color:#009900;
                font-weight:bold;
            } 
        </style>
    </head>
    <body>
        <div class="Sarthi">Code Sarthi</div>
        <h2>align-content: stretch;</h2>
        <div class="main-container">
            <div>1</div>
            <div>2</div>
            <div>3</div> 
            <div>4</div>
            <div>5</div>
            <div>6</div> 
            <div>7</div>
            <div>8</div>
            <div>9</div> 
            <div>10</div>
        </div>
    </body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785599764/8e40ad51-2e38-446d-b320-4eb984edabf0.png",
            alt: "CSS align-content stretch visual output",
          },
        },
        {
          heading: "3. flex-start Value",
          description:
            "Displays the item lines grouped closely together against the starting threshold edge of the flex container.\n\n**Syntax:**\n```css\nalign-content: flex-start;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
    <head>
        <title>align-content property</title>
        <style>
            .main-container {
                display: flex;
                height: 400px;
                flex-wrap: wrap;
                align-content: flex-start;
                background-color: green;
            }
            
            .main-container div {
                background-color: #f4f4f4;
                width: 100px;
                margin: 10px;
                text-align: center;
                font-size: 50px;
            }
            h2 {
                text-align:center;
            }
            .Sarthi {
                font-size:40px;
                text-align:center;
                color:#009900;
                font-weight:bold;
            } 
        </style>
    </head>
    <body>
        <div class="Sarthi">Code Sarthi</div>
        <h2>align-content: flex-start;</h2>
        <div class="main-container">
            <div>1</div>
            <div>2</div>
            <div>3</div> 
            <div>4</div>
            <div>5</div>
            <div>6</div> 
            <div>7</div>
            <div>8</div>
            <div>9</div> 
            <div>10</div>
        </div>
    </body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785599801/174abb56-3ae6-4f15-af78-5d4ee8fbac65.png",
            alt: "CSS align-content flex-start visual output",
          },
        },
        {
          heading: "4. flex-end Value",
          description:
            "Displays the flex item lines pushed firmly together against the concluding end boundary of the flex container.\n\n**Syntax:**\n```css\nalign-content: flex-end;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
    <head>
        <title>align-content property</title>
        <style>
            .main-container {
                display: flex;
                height: 400px;
                flex-wrap: wrap;
                align-content: flex-end;
                background-color: green;
            }
            
            .main-container div {
                background-color: #f4f4f4;
                width: 100px;
                margin: 10px;
                text-align: center;
                font-size: 50px;
            }
            h2 {
                text-align:center;
            }
            .Sarthi {
                font-size:40px;
                text-align:center;
                color:#009900;
                font-weight:bold;
            } 
        </style>
    </head>
    <body>
        <div class="Sarthi">Code Sarthi</div>
        <h2>align-content: flex-end;</h2>
        <div class="main-container">
            <div>1</div>
            <div>2</div>
            <div>3</div> 
            <div>4</div>
            <div>5</div>
            <div>6</div> 
            <div>7</div>
            <div>8</div>
            <div>9</div> 
            <div>10</div>
        </div>
    </body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785599842/0c1014f6-9c9b-472e-881e-debebf43f2cc.png",
            alt: "CSS align-content flex-end visual output",
          },
        },
        {
          heading: "5. space-around Value",
          description:
            "By using the `space-around` property, empty container spacing will be distributed equally around each of the wrapped flex lines, providing half-width padding margins above and below the outermost rows.\n\n**Syntax:**\n```css\nalign-content: space-around;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
    <head>
        <title>align-content property</title>
        <style>
            .main-container {
                display: flex;
                height: 400px;
                flex-wrap: wrap;
                align-content: space-around;
                background-color: green;
            }
            
            .main-container div {
                background-color: #f4f4f4;
                width: 100px;
                margin: 10px;
                text-align: center;
                font-size: 50px;
            }
            h2 {
                text-align:center;
            }
            .Sarthi {
                font-size:40px;
                text-align:center;
                color:#009900;
                font-weight:bold;
            } 
        </style>
    </head>
    <body>
        <div class="Sarthi">Code Sarthi</div>
        <h2>align-content: space-around;</h2>
        <div class="main-container">
            <div>1</div>
            <div>2</div>
            <div>3</div> 
            <div>4</div>
            <div>5</div>
            <div>6</div> 
            <div>7</div>
            <div>8</div>
            <div>9</div> 
            <div>10</div>
        </div>
    </body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785599877/639bb046-b526-477c-84ef-cd31f4ef4810.png",
            alt: "CSS align-content space-around visual output",
          },
        },
        {
          heading: "6. space-between Value",
          description:
            "Displays the multi-line flex rows with equal empty gaps dividing consecutive lines. The first row locks flush against the opening start edge, while the final concluding row locks flush against the terminal ending edge.\n\n**Syntax:**\n```css\nalign-content: space-between;\n```",
          language: "html",
          code: `<!DOCTYPE html>
<html>
    <head>
        <title>align-content property</title>
        <style>
            .main-container {
                display: flex;
                height: 400px;
                flex-wrap: wrap;
                align-content: space-between;
                background-color: green;
            }
            
            .main-container div {
                background-color: #f4f4f4;
                width: 100px;
                margin: 10px;
                text-align: center;
                font-size: 50px;
            }
            h2 {
                text-align:center;
            }
            .Sarthi {
                font-size:40px;
                text-align:center;
                color:#009900;
                font-weight:bold;
            } 
        </style>
    </head>
    <body>
        <div class="Sarthi">Code Sarthi</div>
        <h2>align-content: space-between;</h2>
        <div class="main-container">
            <div>1</div>
            <div>2</div>
            <div>3</div> 
            <div>4</div>
            <div>5</div>
            <div>6</div> 
            <div>7</div>
            <div>8</div>
            <div>9</div> 
            <div>10</div>
        </div>
    </body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785599937/a1afc310-92df-41a7-88b6-c286ce7080ab.png",
            alt: "CSS align-content space-between visual output",
          },
        },
        {
          heading: "Supported Browsers",
          description:
            "The browsers supported by the CSS `align-content` property are listed below:\n\n| Browser | Supported Version |\n| :--- | :--- |\n| **Google Chrome** | 29.0 and above |\n| **Microsoft Edge** | 12.0 and above |\n| **Mozilla Firefox** | 28.0 and above |\n| **Opera** | 12.1 and above |\n| **Apple Safari** | 9.0 and above |\n| **Internet Explorer** | 11.0 and above |",
        },
      ],
    },
    {
      id: "grid",
      category: "Modern Layout Systems",
      shortTitle: "Grid Layout",
      title: "CSS Grid Layout Module",
      sections: [
        {
          heading: "CSS Grid Layout Module Overview",
          description:
            "The CSS Grid Layout Module is a powerful two-dimensional layout system that enables the creation of complex and responsive designs. It allows precise control over rows, columns, and the positioning of elements.\n\n- Grid layouts operate across both horizontal rows and vertical columns simultaneously.\n- It provides structured, highly predictable layout architectures for responsive web pages.\n- Elements can be placed precisely across coordinate grid lines or mapped into semantic named layout areas.\n\n**Syntax:**\n```css\n.container {\n    display: grid;\n}\n```\n> **Note:** You can also apply `display: inline-grid;` to render the container as an inline element while maintaining grid capabilities for its children.\n\nBelow is a functional interactive layout where `.grid-container` declares a balanced two-column format (`grid-template-columns: auto auto;`) paired with a `10px` spacing gutter between items:",
          language: "html",
          code: `<html>
<head>
	<style>
		.grid-container {
			display: grid;
			grid-template-columns: auto auto;
			gap: 10px;
		}
	</style>
</head>
<body>
	<div class="grid-container">
		<div class="grid-item">Item 1</div>
		<div class="grid-item">Item 2</div>
		<div class="grid-item">Item 3</div>
		<div class="grid-item">Item 4</div>
	</div>
</body>
</html>`,
        },
        {
          heading: "CSS Grid Layout Properties Reference",
          description:
            "Below is a comprehensive summary of key CSS Grid structural and alignment properties along with their primary functions:\n\n| Property | Description |\n| :--- | :--- |\n| **column-gap** | Defines the amount of spacing between vertical columns in a multi-column or CSS Grid container. |\n| **gap** | Shorthand property specifying gutter spacing between rows and columns simultaneously in CSS Grid and Flexbox layouts. |\n| **grid** | Master shorthand layout property that declares explicit rows, columns, and named areas cleanly without legacy positioning hacks. |\n| **grid-area** | Defines an item's size and boundary location by assigning start and end grid lines, or assigns an element to a named grid area. |\n| **grid-auto-columns** | Specifies the default track widths for columns implicitly generated when surplus child elements overflow explicit templates. |\n| **grid-auto-flow** | Controls automatic item placement algorithm instructions across empty grid cells (e.g., `row`, `column`, or `dense` packing). |\n| **grid-auto-rows** | Specifies the default track height for rows implicitly generated by the grid container when excess content overflows. |\n| **grid-column** | Shorthand property combining start and end column line indices to dictate horizontal spanning placement of an item. |\n| **grid-column-end** | Defines the column track boundary line where an item's horizontal span terminates. |\n| **grid-column-gap** | Legacy syntax used to set the gap separating columns in a grid structure (modern CSS uses `column-gap`). |\n| **grid-column-start** | Defines the starting column track grid line where an item's horizontal placement begins. |\n| **grid-gap** | Legacy syntax shorthand used to set both row and column gutter gaps simultaneously (modern CSS uses `gap`). |\n| **grid-row** | Shorthand property combining start and end row line coordinates to control vertical placement and track spanning. |\n| **grid-row-end** | Defines an item's terminating position within a grid row by specifying its concluding vertical horizontal boundary line. |\n| **grid-row-gap** | Legacy syntax used to define vertical spacing gutters between grid rows (modern CSS uses `row-gap`). |\n| **grid-row-start** | Defines an item's starting position within a grid row by specifying its opening vertical boundary line. |\n| **grid-template** | Shorthand property for declaring explicit grid columns, rows, and semantic template areas in a unified stylesheet rule. |\n| **grid-template-areas** | Specifies named regional areas within the container structure for declarative, highly visual item alignment. |\n| **grid-template-columns** | Sets the explicit quantity and proportional track widths of structural columns across the grid. |\n| **grid-template-rows** | Sets the explicit quantity and proportional track heights of structural rows across the grid. |",
        },
        {
          heading: "Example 1: Three-Column Layout",
          description:
            "The `.grid-container` is configured as an explicit three-column structural layout utilizing fractional sizing units (`1fr 1fr 1fr`), ensuring each track distributes available width uniformly across a `10px` spacing gutter.\n- Each child `.grid-item` populates a separate column slot with clean padding formatting.",
          language: "html",
          code: `<html>
<head>
	<style>
		.grid-container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 10px;
		}
		.grid-item {
			background-color: #f0f0f0;
			padding: 20px;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="grid-container">
		<div class="grid-item">Column 1</div>
		<div class="grid-item">Column 2</div>
		<div class="grid-item">Column 3</div>
	</div>
</body>
</html>`,
        },
        {
          heading: "Example 2: Responsive Two-Row Layout",
          description:
            "The `.grid-container` declares a layout framework built across two sequential horizontal row tracks (`grid-template-rows: auto auto;`), separated by a generous `15px` vertical spacing gutter.\n- Each `.grid-item` block populates a dedicated row span with centered presentation formatting.",
          language: "html",
          code: `<html>
<head>
	<style>
		.grid-container {
			display: grid;
			grid-template-rows: auto auto;
			gap: 15px;
		}

		.grid-item {
			background-color: #e0e0e0;
			padding: 15px;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="grid-container">
		<div class="grid-item">Row 1</div>
		<div class="grid-item">Row 2</div>
	</div>
</body>
</html>`,
        },
        {
          heading: "Example 3: Four-Item Grid with Unequal Column Widths",
          description:
            "The `.grid-container` establishes an asymmetrical two-column framework: the first column occupies a single fractional share (`1fr`), while the second column expands to absorb double that span (`2fr`), creating visually interesting proportional variations.\n- As four `.grid-item` blocks flow sequentially into the wrapper, they form a structured 2x2 asymmetric matrix.",
          language: "html",
          code: `<html>
<head>
	<style>
		.grid-container {
			display: grid;
			grid-template-columns: 1fr 2fr;
			gap: 10px;
		}

		.grid-item {
			background-color: #f0f0f0;
			padding: 20px;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="grid-container">
		<div class="grid-item">Item 1</div>
		<div class="grid-item">Item 2</div>
		<div class="grid-item">Item 3</div>
		<div class="grid-item">Item 4</div>
	</div>
</body>
</html>`,
        },
        {
          heading: "Best Practices for CSS Grid Layout",
          description:
            "When architecting modern web application layouts with CSS Grid, adhere to these industry-recommended practices:\n\n- **Use Flexible Units:** Prioritize fractional units (`fr`) alongside intrinsic layout functions such as `minmax()`, `fit-content()`, and `repeat(auto-fit, minmax(...))` to build fluid interfaces that reflow naturally across devices without requiring complex media query overrides.\n- **Define Explicit Grid Areas:** Clearly declare structural interface sections using `grid-template-areas` to make layout architectures visually apparent at a glance and significantly ease maintenance.\n- **Combine with Other Layout Methods:** Integrate CSS Grid for macro-level 2D structural layout skeletons (headers, sidebars, main content grids) while harnessing Flexbox within individual cards or navbars for agile 1D component alignment.",
        },
        {
          heading: "Advanced: Item Spanning Shorthands",
          description:
            "Span individual items across multiple row or column tracks cleanly using numeric line indices or the flexible `span` keyword syntax.",
          language: "css",
          code: `.header { grid-column: 1 / -1; }     /* stretch across entire container width */
.sidebar { grid-column: 1 / 2; }
.main    { grid-column: 2 / -1; }

/* Keyword span syntax */
.featured {
  grid-column: span 2;
  grid-row: span 2;
}`,
        },
        {
          heading: "Advanced: Named Template Areas Reference",
          description:
            "Assign descriptive semantic names to layout grid regions to assemble page layouts visually without keeping track of numerical boundary lines.",
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
      id: "css-grid-template-columns-property",
      category: "Modern Layout Systems",
      shortTitle: "Grid Template Columns Property",
      title: "CSS grid-template-columns Property",
      sections: [
        {
          heading: "CSS grid-template-columns Property",
          description:
            "The grid-template-columns property in CSS defines the number and width of columns in a grid layout. It allows developers to configure fixed measurements, intrinsic dimensions, and flexible fractional tracks, making grid-based designs highly adaptable across responsive viewports.\n\n**Syntax:**\n```css\ngrid-template-columns: none | auto | max-content | min-content | length | initial | inherit;\n```\n\n### Property Values Reference\n| Property Value | Description |\n| :--- | :--- |\n| **none** | Default setting. No explicit columns are created unless generated implicitly by overflowing grid elements. |\n| **auto** | Columns are sized dynamically based on content dimensions and remaining available space in the wrapper. |\n| **min-content** | Columns compact down to the absolute smallest width necessary to wrap their tightest inner content without clipping or word breaking. |\n| **max-content** | Columns expand out to comfortably match the horizontal width of their widest unbroken piece of content. |\n| **length** | Explicitly specifies track width using measurements like pixels (`px`), em units (`em`), fractional portions (`fr`), or percentages (`%`). |\n| **initial** | Resets the property value back to its specification default (`none`). |\n| **inherit** | Inherits the explicit column template declaration directly from its structural parent element. |",
        },
        {
          heading: "Example 1: Using Auto and Fixed-Width Columns",
          description:
            "This practical implementation sets up a structured four-column layout utilizing `grid-template-columns: auto auto 200px 150px;`.\n- The first two columns scale automatically according to open space, while the third column stays locked at a solid `200px` measurement and the fourth locks at `150px`.\n- A consistent `10px` gap separation is maintained between every grid item.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS grid-template-columns Property
    </title>

    <style>
        .Sarthi {
            background-color: green;
            padding: 30px;
            display: grid;
            grid-template-columns: auto auto 200px 150px;
            grid-gap: 10px;
        }

        .CodeSarthi {
            background-color: white;
            border: 1px solid white;
            font-size: 30px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="Sarthi">
        <div class="CodeSarthi">A</div>
        <div class="CodeSarthi">B</div>
        <div class="CodeSarthi">C</div>
        <div class="CodeSarthi">D</div>
        <div class="CodeSarthi">E</div>
        <div class="CodeSarthi">F</div>
        <div class="CodeSarthi">G</div>
        <div class="CodeSarthi">H</div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785600245/afedfb8b-bebc-4f52-9d95-a41b4f6f6702.png",
            alt: "CSS grid-template-columns auto and fixed columns visual output",
          },
        },
        {
          heading: "Example 2: Using min-content, max-content, and Fixed-Width Columns",
          description:
            "This setup illustrates intrinsic sizing rules paired with fixed track geometry (`grid-template-columns: min-content max-content 400px min-content;`).\n- The first and fourth columns shrink down to match their minimal possible width (`min-content`).\n- The second column widens to encompass its largest continuous content block (`max-content`), while the third column remains strictly locked to a `400px` width.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>
        CSS grid-template-columns Property
    </title>

    <style>
        .Sarthi {
            background-color: green;
            padding: 30px;
            display: grid;
            grid-template-columns:
                min-content max-content 400px min-content;
            grid-gap: 10px;
        }

        .CodeSarthi {
            background-color: white;
            border: 1px solid white;
            font-size: 30px;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="Sarthi">
        <div class="CodeSarthi">Sarthi</div>
        <div class="CodeSarthi">CodeSarthi</div>
        <div class="CodeSarthi">C</div>
        <div class="CodeSarthi">D</div>
        <div class="CodeSarthi">E</div>
        <div class="CodeSarthi">F</div>
        <div class="CodeSarthi">G</div>
        <div class="CodeSarthi">H</div>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785600285/7e034341-e549-405b-8676-835fc7a20e51.png",
            alt: "CSS grid-template-columns min-content and max-content visual output",
          },
        },
        {
          heading: "Supported Browsers",
          description:
            "The browsers supported by the CSS `grid-template-columns` property include:\n\n| Browser | Support Status |\n| :--- | :--- |\n| **Google Chrome** | Fully Supported |\n| **Microsoft Edge** | Fully Supported |\n| **Mozilla Firefox** | Fully Supported |\n| **Opera** | Fully Supported |\n| **Apple Safari** | Fully Supported |\n\n> **Note:** This property enjoys universal support across all modern web rendering engines. Ensure target browsers are updated to contemporary releases for comprehensive CSS Grid interoperability. Legacy architectures such as Internet Explorer 11 rely on legacy prefixed properties (`-ms-grid-columns`) and lack support for modern intrinsic keywords like `max-content` or auto-repeat functions.",
        },
      ],
    },
    {
      id: "css-grid-gap-property",
      category: "Modern Layout Systems",
      shortTitle: "Grid Gap Property",
      title: "CSS grid-gap Property",
      sections: [
        {
          heading: "CSS grid-gap Property",
          description:
            "The grid-gap property sets the size of the gap between rows and columns in a grid layout, allowing developers to cleanly orchestrate spacing gutters across grid items in both horizontal and vertical directions without resorting to card margins.\n\nIt functions as an ergonomic shorthand property combining two distinct grid spacing controls:\n- **`grid-row-gap`**: Sets the height of the vertical gutter between rows in a grid layout (default value is `0`).\n- **`grid-column-gap`**: Sets the width of the horizontal gutter between columns in a grid layout (default value is `0`).\n\n**Syntax:**\n```css\ngrid-gap: <grid-row-gap> <grid-column-gap>;\n/* If a single measurement is provided, it applies uniformly to both rows and columns */\n```\n\n> **Modern Standardization Notice:** While `grid-gap`, `grid-row-gap`, and `grid-column-gap` remain universally recognized by modern rendering engines for backward compatibility, current CSS specifications have streamlined these property names to simply **`gap`**, **`row-gap`**, and **`column-gap`**, extending their usability to Flexbox and multi-column container formatting alike.",
        },
        {
          heading: "Example 1: Defining Fixed Pixel Gutter Separations",
          description:
            "In this demonstration, we establish hard pixel spacing boundaries by specifying an asymmetric gutter configuration (`grid-column-gap: 50px; grid-row-gap: 10px;`).\n- The vertical columns are separated by a wide `50px` horizontal spacing cushion between adjacent cells.\n- The stacked row tracks maintain a much tighter vertical separation of `10px`.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
  
<head>
    <title>
        CSS grid-gap Property
    </title>
    <style>
        body {
            text-align: center;
        }

        h1 {
            color: black;
        }

        .grid-container {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-column-gap: 50px;
            grid-row-gap: 10px;
            background-color: blue;
            padding: 10px;
        }

        .grid-container>div {
            background-color: white;
            text-align: center;
            padding: 20px 0;
            font-size: 30px;
        }
    </style>
</head>

<body>
    <h1>Code Sarthi</h1>
    <h2>Grid-gap property</h2>
    <p>This grid has a 50px gap between
        columns and 10px gap between rows:
    </p>
    <div class="grid-container">
        <div class="item1">G</div>
        <div class="item2">E</div>
        <div class="item3">E</div>
        <div class="item4">K</div>
        <div class="item5">S</div>
    </div>
</body>
  
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785600337/2291ed0f-fc02-4c78-a2a8-ba174a4584bd.png",
            alt: "CSS grid-gap fixed pixel spacing visual output",
          },
        },
        {
          heading: "Example 2: Using Responsive Percentage Gutters",
          description:
            "In this example, we demonstrate how spacing gutters can scale dynamically alongside viewport dimensions by utilizing percentage-based sizing allocations (`grid-column-gap: 8%; grid-row-gap: 5%;`).\n- Because the separation distances are expressed in proportional percentages relative to the wrapper's dimensions, inter-cell space fluidly widens or compresses as the browser window shrinks or grows.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
  
<head>
    <title>
        CSS grid-gap Property
    </title>
    <style>
        body {
            text-align: center;
        }

        h1 {
            color: green;
        }

        .grid-container {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-column-gap: 8%;
            grid-row-gap: 5%;
            background-color: black;
            padding: 6%;
        }

        .grid-container>div {
            background-color: yellow;
            text-align: center;
            padding: 20px 0;
            font-size: 30px;
        }
    </style>
</head>

<body>
    <h1>Code Sarthi</h1>
    <h2>Grid-gap property</h2>
    <p>This grid has a 8% gap between columns
        and 5% gap between rows:
    </p>
    <div class="grid-container">
        <div class="item1">G</div>
        <div class="item2">E</div>
        <div class="item3">E</div>
        <div class="item4">K</div>
        <div class="item5">S</div>
    </div>
</body>
  
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785600385/d9f24dc1-b1fc-446c-92ae-c95492a07db8.png",
            alt: "CSS grid-gap responsive percentage spacing visual output",
          },
        },
        {
          heading: "Summary & Usability Considerations",
          description:
            "The CSS `grid-gap` property is an essential utility for architecting visually appealing, well-proportioned layout matrices without applying tricky margin resets on exterior cards.\n\nBy leveraging `grid-gap`, `grid-row-gap`, and `grid-column-gap` (as well as their un-prefixed modern equivalents `gap`, `row-gap`, and `column-gap`), frontend engineers achieve exact layout spacing control between interface elements, enhancing general interface readability and visual cadence. Ensure testing across targeted browser releases to guarantee consistent user experience across platforms.",
        },
      ],
    },
    {
      id: "custom-properties",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Custom Properties",
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
      id: "css-transitions",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Transitions",
      title: "CSS Transitions",
      sections: [
        {
          heading: "CSS Transitions Overview",
          description:
            "CSS transitions are used to create smooth visual interpolations between two distinct states of an element, significantly enhancing interactive feedback and overall user experience.\n\n- Transitions can smoothly animate layout attributes like colors, typography weights, structural boundaries, shadows, and coordinate positions.\n- They are typically triggered by user interaction pseudo-classes (such as `:hover`, `:focus`, `:active`, or `:checked`) or programmatic class toggle events.\n- Key foundational transition properties include `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.\n\nIn the foundational example below, `.box` defines a square element with a solid blue background paired with a `0.5s` transition effect attached to `background-color`:\n- When the user cursor enters the element, the `:hover` pseudo-class switches the color to green, initiating a fluid color blend transition over half a second.",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            transition: background-color 0.5s;
        }
        .box:hover {
            background-color: green;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "1. transition-property",
          description:
            "The `transition-property` rule allows you to select explicit CSS properties that should undergo animated interpolation when a state change occurs.\n\n- The `.box` class defines a square `<div>` with a blue background.\n- The `transition-property` is set to `width`, and `transition-duration` is configured to `0.5s`, enabling a smooth horizontal stretch effect when dimensions change.\n- When hovered over, the `:hover` pseudo-class increases the width from `100px` to `200px`, triggering the smooth transition while leaving unlisted properties to switch instantaneously.\n\n**Syntax:**\n```css\ntransition-property: none | all | property | property1, property2, ..., propertyN;\n```\n- **`none`**: Specifies that no property should be selected for animation.\n- **`all`**: Specifies that all animatable properties will transition smoothly upon state change.\n- **`property1, ..., propertyN`**: Explicitly designates a single property or a comma-separated list of targeted attributes.",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            transition-property: width;
            transition-duration: 0.5s;
        }
        .box:hover {
            width: 200px;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "2. transition-duration",
          description:
            "This property allows you to determine exactly how long it will take to complete the transition animation from the starting state to the concluding CSS state.\n\n- The `.box` class defines a square `<div>` with a blue background and a `transition-duration` of `0.5` seconds.\n- When hovered over, the `:hover` pseudo-class changes the background color to green, and the gradual color metamorphosis executes over half a second.\n\n**Syntax:**\n```css\ntransition-duration: <time>;\n```\n> **Note:** Here, `<time>` can be specified in seconds (`s`) or milliseconds (`ms`). You must always append `'s'` or `'ms'` directly after the numerical value without quotes (e.g., `0.5s` or `500ms`).",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            transition-duration: 0.5s;
        }
        .box:hover {
            background-color: green;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "3. transition-timing-function",
          description:
            "The `transition-timing-function` controls the velocity and timing progression of an animation curve, defining how the change accelerates or slows down throughout its runtime (e.g., fast initial jump followed by a gradual slowdown).\n\n- The `.box` class configures a background color transition effect lasting `0.5s`.\n- The timing curve is explicitly set to `ease-in-out`, causing the transition animation to start slowly, accelerate through the middle phase, and decelerate gently as it concludes.\n\n**Syntax:**\n```css\ntransition-timing-function: ease | ease-in | ease-out | ease-in-out | linear | step-start | step-end | cubic-bezier(n,n,n,n);\n```",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            transition: background-color 0.5s;
            transition-timing-function: ease-in-out;
        }
        .box:hover {
            background-color: green;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "4. transition-delay",
          description:
            "This property allows you to set a compulsory waiting period that must elapse before the transition animation begins to execute after a triggering event occurs.\n\n- The `.box` class applies a transition effect for `background-color` over a duration of `0.5s`.\n- The `transition-delay` is explicitly configured to `1s`, enforcing a complete one-second standby pause after hovering before the background color transformation begins to run.\n\n**Syntax:**\n```css\ntransition-delay: <time>;\n```",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            transition: background-color 0.5s;
            transition-delay: 1s;
        }
        .box:hover {
            background-color: green;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "5. Shorthand Property",
          description:
            "You can combine all four core transition rules into a single unified `transition` shorthand declaration, which simplifies stylesheet structure and ensures maximum readability.\n\n- The transition shorthand declaration below combines the targeted property (`width`), animation duration (`0.5s`), speed timing curve (`ease-in-out`), and idle delay interval (`1s`) simultaneously.\n- On hover, the element pauses for `1` second before smoothly stretching out from `100px` to `200px` over `0.5` seconds using an slow-in, slow-out velocity curve.\n\n**Syntax:**\n```css\ntransition: <property> <duration> <timing-function> <delay>;\n```\n- **`property`**: The specific CSS attribute to animate (e.g., `width`, `background-color`, `transform`).\n- **`duration`**: The total elapsed runtime needed to complete the transition (e.g., `0.5s` or `250ms`).\n- **`timing-function`**: The acceleration velocity curve governing animation cadence (e.g., `ease-in-out`).\n- **`delay`**: The standby time interval to wait before initiating the animation (e.g., `1s`).",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            transition: width 0.5s ease-in-out 1s;
        }
        .box:hover {
            width: 200px;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "Best Practices for CSS Transitions",
          description:
            "To achieve crisp, responsive, and silky-smooth interface transitions across all devices and form factors, adhere to these core production best practices:\n\n- **Use the transition shorthand:** Combine individual timing rules into a unified shorthand property to simplify stylesheets and keep code organized.\n- **Target animatable properties explicitly:** Apply transitions only to explicit animatable properties (such as `width`, `height`, `opacity`, `transform`, or `background-color`). Avoid utilizing blanket `transition: all` declarations, which can cause excessive browser repaints and degrade animation framerates.\n- **Test across devices:** Continuously evaluate transition framerates and hardware acceleration across varying desktop browsers and mobile screen refresh rates to guarantee consistent performance and silky visual effects.",
        },
      ],
    },
    {
      id: "css-transform-property",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Transform Property",
      title: "CSS transform Property",
      sections: [
        {
          heading: "CSS transform Property",
          description:
            "The CSS `transform` property is used to modify the visual appearance and geometry of an element by rotating, scaling, skewing, or translating it without affecting normal document layout or surrounding element bounds.\n\n- Enables powerful geometric coordinate functions such as `rotate()`, `scale()`, `skew()`, and `translate()`.\n- Transformations can be orchestrated across flat 2D plane dimensions or advanced 3D spatial coordinate spaces.\n- Because transforms operate purely during GPU compositing and render phases, they do not trigger DOM reflows or interrupt normal document positioning.\n- Extensively utilized for hardware-accelerated interface animations, responsive hover effects, and modern UI visual enhancements.\n\nThe interactive demonstration below illustrates the compact `matrix()` function value (`transform: matrix(1, 0, -1, 1, 1, 0);`), applying a simultaneous composite translation, scaling, and diagonal shearing operation:",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: matrix(1, 0, -1, 1, 1, 0);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Property Values & Functions Reference",
          description:
            "The `transform` property accepts an extensive collection of programmatic geometric coordinate functions and specification keywords:\n\n| Value / Function | Description |\n| :--- | :--- |\n| **none** | Default setting. No coordinate transformation takes place; the element displays at normal scale and orientation. |\n| **matrix(a,b,c,d,tx,ty)** | Specifies a complete homogeneous 2D transformation matrix combining scaling, shearing, and translation. Takes exactly 6 numerical parameters. |\n| **matrix3d(n,...,n)** | Specifies a sophisticated 3D transformation projection matrix algorithm. Takes exactly 16 numerical coefficients. |\n| **translate(x, y)** | Displaces an element along both the X (horizontal) and Y (vertical) viewport axis vectors simultaneously. |\n| **translate3d(x, y, z)** | Displaces an element completely across three-dimensional X, Y, and Z spatial coordinate vectors. |\n| **translateX(x)** | Displaces an element horizontally strictly along the X-axis coordinate vector. |\n| **translateY(y)** | Displaces an element vertically strictly along the Y-axis coordinate vector. |\n| **translateZ(z)** | Displaces an element back or forward across depth along the Z-axis vector (requires 3D perspective activation). |\n| **rotate(angle)** | Rotates an element clockwise or counter-clockwise around its default planar center origin by a designated degree (`deg`). |\n| **rotateX(angle)** | Rotates an element in 3D space around its horizontal X-axis corresponding to the designated angle. |\n| **rotateY(angle)** | Rotates an element in 3D space around its vertical central Y-axis corresponding to the designated angle. |\n| **rotateZ(angle)** | Rotates an element around its perpendicular Z-axis coordinate vector (identical in visual result to standard 2D `rotate()`). |\n| **scale(x, y)** | Modifies structural visual size by applying explicit proportional width (X) and height (Y) scaling transformations. |\n| **scaleX(x)** | Scales element visual width horizontally across the X-axis without modifying vertical height sizing. |\n| **scaleY(y)** | Scales element visual height vertically across the Y-axis without modifying horizontal width sizing. |\n| **scaleZ(z)** | Scales an element across thickness depth in Z-axis 3D coordinate space. |\n| **scale3d(x, y, z)** | Simultaneously scales geometric volume measurements across all three orthogonal X, Y, and Z axes. |\n| **skew(x-angle, y-angle)** | Shears an element diagonally along both X and Y axis coordinate planes according to designated angle values. |\n| **skewX(angle)** | Shears an element horizontally across its X-axis shear plane corresponding to the designated angle. |\n| **skewY(angle)** | Shears an element vertically across its Y-axis shear plane corresponding to the designated angle. |\n| **perspective(n)** | Establishes viewing perspective focal depth distance for child elements to render realistic 3D transformation illusions. |\n| **initial** | Resets the transform property value directly back to its specification default (`none`). |\n| **inherit** | Inherits explicit transformation geometric state directly from its DOM parent container element. |",
        },
        {
          heading: "Example 1: Without the transform Property",
          description:
            "This baseline demonstration displays a standard un-transformed card layout element (`.CodeSarthi`) rendered inside a green grid wrapper (`.main`) without any `transform` geometry applied, providing a visual reference point.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
    }
    </style>
</head>

<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 2: matrix3d() Property Value",
          description:
            "This demonstration establishes a three-dimensional spatial hierarchy utilizing `transform-style: preserve-3d;` paired with an explicit spatial offset translation (`transform: translate(150px, 75%, 5em);`), providing foundational structure for composite `matrix3d()` arithmetic projections.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
        transform-style: preserve-3d;
    }
    
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform-style: preserve-3d;
        position: absolute;
        transform: translate(150px, 75%, 5em)
    }
    </style>
</head>

<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 3: translate() Property Value",
          description:
            "This demonstration implements two-dimensional planar displacement using `transform: translate(150px, 65%);` to shift the element `150px` horizontally to the right and `65%` of its own visual height downward without altering surrounding DOM geometry.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: translate(150px, 65%);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 4: translate3d() Property Value",
          description:
            "This demonstration shifts an element across all three orthogonal coordinate vectors simultaneously utilizing `transform: translate3d(150px, 65%, 5em);`. In modern web browsers, invoking 3D translation instructions reliably promotes the DOM layer to dedicated hardware GPU compositing.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: translate3d(150px, 65%, 5em);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 5: translateX() Property Value",
          description:
            "This example isolates positioning displacement strictly to the horizontal orientation vector by executing `transform: translateX(150px);`, sliding the element `150px` to the right while leaving vertical alignment entirely static.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: translateX(150px);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 6: translateY() Property Value",
          description:
            "This example restricts positional shifting solely to the vertical orientation by executing `transform: translateY(150px);`, displacing the white text box downward by `150px` relative to its natural flow position.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: translateY(150px);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 7: translateZ() Property Value",
          description:
            "This demonstration illustrates depth translation across the perpendicular Z-axis vector utilizing `transform: translateZ(150px);`, pushing the element forward across viewing distance coordinates toward the user viewer plane.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: translateZ(150px);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 8: rotate() Property Value",
          description:
            "This practical implementation turns the target card clockwise around its default central 2D origin point utilizing `transform: rotate(45deg);`, pitching the entire element diagonally at an explicit 45-degree angle.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: rotate(45deg);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 9: rotateX() Property Value",
          description:
            "This demonstration tilts an element around its horizontal X-axis coordinate vector utilizing `transform: rotateX(75deg);`, causing top and bottom edges to swing back deeply into simulated 3D viewing perspective.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: rotateX(75deg);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 10: rotateY() Property Value",
          description:
            "This demonstration pivots an element horizontally around its vertical central Y-axis coordinate vector utilizing `transform: rotateY(75deg);`, generating a classic interactive 3D door-turning geometric illusion.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: rotateY(75deg);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 11: rotateZ() Property Value",
          description:
            "This example spins an element directly around its perpendicular Z-axis vector utilizing `transform: rotateZ(75deg);`, generating a pure planar clockwise rotation identical in visual appearance to standard two-dimensional `rotate()`.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: rotateZ(75deg);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 12: scale() Property Value",
          description:
            "This demonstration scales an element asymmetrically across horizontal and vertical axes utilizing `transform: scale(1, 2);`.\n- The width multiplier stays fixed (`1x`), while the vertical height multiplier doubles (`2x`), stretching internal typography dramatically upward.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: scale(1, 2);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 13: scale3d() Property Value",
          description:
            "This demonstration performs a comprehensive 3D volume scale utilizing `transform: scale3d(2, 1, 5);` to modulate geometric proportions across horizontal width (`2x`), vertical height (`1x`), and depth space (`5x`) simultaneously.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: scale3d(2, 1, 5);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 14: scaleX() Property Value",
          description:
            "This example doubles the horizontal width footprint of an element by executing `transform: scaleX(2);`, stretching text horizontally outward across the X-axis while preserving exact vertical row dimensions.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: scaleX(2);
    }
    </style>
</head>

<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 15: scaleY() Property Value",
          description:
            "This example doubles the vertical height measurement of an element by executing `transform: scaleY(2);`, pulling content upward and downward across the Y-axis without impacting horizontal column span.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: scaleY(2);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 16: scaleZ() Property Value",
          description:
            "This code snippet applies depth-axis volume adjustments utilizing `transform: scaleZ(2);`, expanding spatial projection volume in 3D viewing configurations without modifying flat 2D surface area measurements.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: scaleZ(2);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 17: skew() Property Value",
          description:
            "This demonstration distorts element structural boundaries diagonally along both coordinate planes utilizing `transform: skew(30deg, 30deg);`, shearing top/bottom edges by 30 degrees and left/right borders by 30 degrees into a diamond parallelogram profile.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: skew(30deg, 30deg);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 18: skewX() Property Value",
          description:
            "This demonstration tilts vertical boundaries horizontally across the X-axis shear plane utilizing `transform: skewX(30deg);`, sliding top and bottom borders smoothly into an italicized structural slant.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: skewX(30deg);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 19: skewY() Property Value",
          description:
            "This demonstration displaces horizontal borders vertically across the Y-axis shear plane utilizing `transform: skewY(30deg);`, raising left edges upward relative to right edges without changing element horizontal width.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: skewY(30deg);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 20: perspective() Property Value",
          description:
            "This practical code snippet establishes localized depth foreshortening directly on an element utilizing `transform: perspective(30px);`, setting an intense simulated observational camera distance `30px` away from the rendered DOM screen plane.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: perspective(30px);
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 21: initial Property Value",
          description:
            "This example demonstrates resetting explicit coordinate transformations back to official specification defaults utilizing `transform: initial;`, which strips away any active rotation, skew, or translation algorithms and restores the element to `none`.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: initial;
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Example 22: inherit Property Value",
          description:
            "This demonstration shows a child element inheriting transformation geometry directly from its DOM wrapper container (`.main` applies `rotateX(45deg)` while `.CodeSarthi` declares `transform: inherit;`), multiplying the total forward tilting angle.",
          language: "html",
          code: `<html>
<head>
    <style>
    .main {
        display: grid;
        padding: 30px;
        background-color: green;
        transform: rotateX(45deg);
    }
    .CodeSarthi {
        text-align: center;
        font-size: 35px;
        background-color: white;
        color: green;
        transform: inherit;
    }
    </style>
</head>
<body>
    <div class="main">
        <div class="CodeSarthi">Code Sarthi</div>
    </div>
</body>
</html>`,
        },
        {
          heading: "Supported Browsers & Compatibility Notes",
          description:
            "### Best Practices & Usage Caution\n> **Note:** Sometimes 3D transformation values fail to produce expected visual rendering outputs when applied directly to flat 2D elements without supporting depth container properties. Therefore, it is strongly advised to reserve 3D geometric instructions (`translate3d()`, `rotateX/Y()`, `matrix3d()`, `scaleZ()`) exclusively for explicit 3D architectural hierarchies paired with parent `perspective` or `transform-style: preserve-3d;` declarations.\n\n### Supported Browsers Compatibility Matrix\n\n#### 1. For 2D Transforms:\n| Browser Engine | Minimum Supported Release |\n| :--- | :--- |\n| **Google Chrome** | 36.0 (4.0 utilizing `-webkit-` prefix) |\n| **Microsoft Edge / IE** | Edge 10.0 (IE 9.0 utilizing `-ms-` prefix) |\n| **Mozilla Firefox** | 16.0 (3.5 utilizing `-moz-` prefix) |\n| **Apple Safari** | 9.0 (3.2 utilizing `-webkit-` prefix) |\n| **Opera** | 23.0 (15.0 `-webkit-` prefix, 10.5 `-o-` prefix) |\n\n#### 2. For 3D Transforms:\n| Browser Engine | Minimum Supported Release |\n| :--- | :--- |\n| **Google Chrome** | 36.0 (12.0 utilizing `-webkit-` prefix) |\n| **Microsoft Edge** | Edge 12.0 |\n| **Mozilla Firefox** | 10.0 |\n| **Apple Safari** | 9.0 (4.0 utilizing `-webkit-` prefix) |\n| **Opera** | 23.0 (15.0 utilizing `-webkit-` prefix) |",
        },
      ],
    },
    {
      id: "animations",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Animations",
      title: "CSS Animations",
      sections: [
        {
          heading: "CSS Animations Overview",
          description:
            "CSS animations control the movement, geometric layout, and appearance of elements on web pages over designated time intervals. They allow developers to create sophisticated visual animations completely declaratively without relying on JavaScript timers.\n\n- Use `@keyframes` rules to define specific styling milestones across an animation timeline.\n- Apply animations to elements using core styling attributes like `animation-name` and `animation-duration`.\n- Fine-tune animation choreography and visual velocity using rules like `animation-timing-function`, `animation-delay`, and `animation-iteration-count`.\n\nThe demonstration below configures an infinite color transition sequence (`animation: changeColor 3s infinite;`), transforming the square's background color back and forth between blue and green over a recurring 3-second cycle:",
          language: "html",
          code: `<html>
<head>
	<style>
		.box {
			width: 100px;
			height: 100px;
			background-color: blue;
			animation: changeColor 3s infinite;
		}

		@keyframes changeColor {
			from {
				background-color: blue;
			}

			to {
				background-color: green;
			}
		}
	</style>
</head>

<body>
	<div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "CSS Animation Properties Reference",
          description:
            "Below is a comprehensive summary dictionary detailing all primary CSS animation properties and structural rules:\n\n| Property / Rule | Description |\n| :--- | :--- |\n| **@keyframes** | Core stylesheet directive used to designate an animation timeline sequence by specifying CSS style declarations across temporal milestones. |\n| **animation-name** | Specifies the explicit identifier name of the `@keyframes` sequence describing the animation loop to execute. |\n| **animation-duration** | Specifies the exact time runtime duration required for an animation sequence to complete one entire cycle (e.g., `3s` or `500ms`). |\n| **animation-timing-function** | Specifies velocity acceleration curves governing transition interpolations across keyframes. Preset options include `linear`, `ease`, `ease-in`, `ease-out`, and `ease-in-out`. |\n| **animation-delay** | Specifies a standby waiting delay interval before the animation sequence actually begins executing after page render. |\n| **animation-iteration-count** | Specifies the number of cycle iterations the animation will repeat before terminating (accepts integers or `infinite` for endless loops). |\n| **animation-direction** | Defines playback directional flow across repeating loops. Valid options include `normal`, `reverse`, `alternate`, and `alternate-reverse`. |\n| **animation-fill-mode** | Defines how styling state rules apply to the target element before animation execution begins and after completion terminates (`none`, `forwards`, `backwards`, `both`). |\n| **animation-play-state** | Controls runtime execution status, specifying whether an active animation cycle is currently `running` or dynamically `paused`. |",
        },
        {
          heading: "1. @keyframes Rule",
          description:
            "The `@keyframes` directive establishes exactly how an element's visual styles transform across time during an animation sequence.\n\n- The `.box` class creates a solid blue square and applies the `changeColor` animation configured to run for `3` seconds, looping infinitely.\n- The `@keyframes changeColor` block instructs the rendering engine to smoothly transition `background-color` from blue (`from` or `0%`) to green (`to` or `100%`).\n\n**Syntax:**\n```css\n@keyframes animationName {\n    from { /* Initial starting styling states (equivalent to 0%) */ }\n    to   { /* Concluding destination styling states (equivalent to 100%) */ }\n}\n```\n> **Tip:** In addition to `from` and `to` keyword boundaries, you can deploy explicit percentage checkpoints (such as `0%`, `50%`, `100%`) to script intricate multi-stage animation transitions.",
          language: "html",
          code: `<html>
<head>
	<style>
		.box {
			width: 100px;
			height: 100px;
			background-color: blue;
			animation: changeColor 3s infinite;
		}

		@keyframes changeColor {
			from {
				background-color: blue;
			}

			to {
				background-color: green;
			}
		}
	</style>
</head>

<body>
	<div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "2. animation-name Property",
          description:
            "The `animation-name` property explicitly assigns the identifier of the `@keyframes` ruleset sequence to attach to an element.\n\n- Here, `.box` links the DOM element directly to the `@keyframes moveRight` sequence via `animation-name: moveRight;`.\n- The square smoothly moves horizontally from its starting point out to `200px` to the right over `2s`, repeating indefinitely.\n\n**Syntax:**\n```css\nanimation-name: <keyframes-identifier> | none;\n```",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            animation-name: moveRight;
            animation-duration: 2s;
            animation-iteration-count: infinite;
        }

        @keyframes moveRight {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(200px);
            }
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "3. animation-timing-function Property",
          description:
            "The `animation-timing-function` property regulates the pacing and acceleration velocity curve of an animation cycle, defining how motion distributes across the runtime timeline.\n\n- The `.box` element implements a horizontal translational slide animation lasting `3s`.\n- Setting `animation-timing-function: ease-in;` causes the animation sequence to begin slowly at initial departure and gradually increase in velocity as it reaches its target coordinate.\n\n**Syntax:**\n```css\nanimation-timing-function: linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n);\n```",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            animation-name: slide;
            animation-duration: 3s;
            animation-timing-function: ease-in;
            animation-iteration-count: infinite;
        }

        @keyframes slide {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(300px);
            }
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "4. animation-delay Property",
          description:
            "The `animation-delay` property configures a mandatory waiting interval that must elapse before an animation commences execution after initial document mounting or programmatic triggering.\n\n- The `.box` element is configured to materialize using an opacity transition sequence (`@keyframes fadeIn`).\n- Declaring `animation-delay: 1s;` delays the start of the animation by exactly one second.\n- Once the countdown finishes, the fade sequence executes over a duration of `2s`, looping infinitely.\n\n**Syntax:**\n```css\nanimation-delay: <time>; /* Specify measurements in 's' or 'ms' */\n```",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            animation-name: fadeIn;
            animation-duration: 2s;
            animation-delay: 1s;
            animation-iteration-count: infinite;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "5. animation-iteration-count Property",
          description:
            "The `animation-iteration-count` property specifies exactly how many cycle iterations an animation sequence should replay before stopping.\n\n- The `.box` element implements a vertical bouncing sequence (`@keyframes bounce`) lasting `2s` per cycle, deploying percentage checkpoints (`0%`, `50%`, `100%`) to jump up `50px` and return seamlessly to baseline.\n- Setting `animation-iteration-count: infinite;` instructs the rendering engine to replay the loop endlessly without terminating.\n\n**Syntax:**\n```css\nanimation-iteration-count: <number> | infinite;\n```",
          language: "html",
          code: `<html>
<head>
	<style>
		.box {
			width: 100px;
			height: 100px;
			background-color: blue;
			animation: bounce 2s infinite;
		}
		@keyframes bounce {
			0% {
				transform: translateY(0);
			}

			50% {
				transform: translateY(-50px);
			}

			100% {
				transform: translateY(0);
			}
		}
	</style>
</head>
<body>
	<div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "6. animation-direction Property",
          description:
            "The `animation-direction` property governs playback directional flow across repeating iterations, dictating whether sequences play forward, play backward, or alternate bi-directionally.\n\n- The `.box` element displaces horizontally from origin out to `200px` to the right.\n- Setting `animation-direction: alternate;` causes the sequence to play forward on the opening cycle and smoothly reverse backward on the subsequent iteration, producing a clean oscillating back-and-forth motion without visual jumps.\n\n**Syntax:**\n```css\nanimation-direction: normal | reverse | alternate | alternate-reverse;\n```",
          language: "html",
          code: `<html>
<head>
	<style>
		.box {
			width: 100px;
			height: 100px;
			background-color: blue;
			animation: move 2s infinite;
			animation-direction: alternate;
		}
		@keyframes move {
			from {
				transform: translateX(0);
			}

			to {
				transform: translateX(200px);
			}
		}
	</style>
</head>
<body>
	<div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "7. animation-fill-mode Property",
          description:
            "The `animation-fill-mode` property dictates how CSS styling properties are applied to the target element during idle standby delays (before execution) and after sequence termination (after completion).\n\n- The `.box` element runs a single finite sequence moving `200px` rightward over `3s`.\n- Setting `animation-fill-mode: forwards;` guarantees that once the concluding keyframe (`to`) completes, the element retains its final position (`translateX(200px)`) rather than abruptly snapping back to its original layout coordinates.\n\n**Syntax:**\n```css\nanimation-fill-mode: none | forwards | backwards | both;\n```",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            animation: move 3s forwards;
        }
        @keyframes move {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(200px);
            }
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "8. animation-play-state Property",
          description:
            "The `animation-play-state` property governs runtime playback status, allowing stylesheets and interactive pseudo-classes to dynamically freeze and unfreeze executing animations.\n\n- The `.box` element features an infinite 360-degree rotational loop (`@keyframes spin`) lasting `4s`.\n- Declaring `animation-play-state: paused;` initially pauses the animation in place.\n- When the cursor hovers over the element, `.box:hover` updates playback state to `running`, instantly resuming the orbital rotation from the exact frame where it was paused.\n\n**Syntax:**\n```css\nanimation-play-state: running | paused;\n```",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            animation: spin 4s linear infinite;
            animation-play-state: paused;
        }

        .box:hover {
            animation-play-state: running;
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "9. Animation Shorthand Property",
          description:
            "The `animation` shorthand property combines all eight animation configuration rules into a unified single declaration, making stylesheets significantly cleaner and more concise.\n\n- The shorthand rule below combines animation name (`move`), execution duration (`2s`), speed curve (`ease-in`), standby delay (`1s`), repetition loop (`infinite`), directional oscillation (`alternate`), and concluding styling retention (`forwards`).\n- On load, the element pauses for `1` second before smoothly sliding horizontally and transitioning color from blue to green, oscillating back and forth continuously.\n\n**Syntax:**\n```css\nanimation: <name> <duration> <timing-function> <delay> <iteration-count> <direction> <fill-mode> <play-state>;\n```",
          language: "html",
          code: `<html>
<head>
    <style>
        .box {
            width: 100px;
            height: 100px;
            background-color: blue;
            animation: move 2s ease-in 1s infinite alternate forwards;
        }
        @keyframes move {
            from {
                transform: translateX(0);
                background-color: blue;
            }
            to {
                transform: translateX(200px);
                background-color: green;
            }
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "Best Practices & Accessibility",
          description:
            "When integrating CSS animations into production web applications, adhere to these architectural best practices:\n\n- **Use Animations Purposefully:** Apply animations strictly to reinforce visual interface hierarchy and provide meaningful interaction feedback without causing distraction or sensory overload.\n- **Animate Performance-Friendly Properties:** Prioritize animating hardware-accelerated GPU properties exclusively—namely `transform` and `opacity`. Avoid animating layout-triggering properties like `margin`, `width`, or `top` to maintain smooth 60fps frame rendering.\n- **Ensure Accessibility (Respect Motion Preferences):** Always accommodate users with motion sensitivities or vestibular disorders by wrapping heavy animation loops inside a `prefers-reduced-motion` accessibility media query.",
          language: "css",
          code: `/* Modern accessibility implementation respecting motion preferences */
@media (prefers-reduced-motion: no-preference) {
  .animated-card {
    animation: fade-slide 0.5s ease-out forwards;
  }
}

/* Globally disable heavy loops for users requesting reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`,
        },
      ],
    },
    {
      id: "css-box-shadow",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Box Shadow Property",
      title: "CSS box-shadow Property",
      sections: [
        {
          heading: "CSS box-shadow Property",
          description:
            "The CSS `box-shadow` property is used to add a realistic shadow effect to the borders and edges of an element. You can easily apply multiple compound shadows to a single container by separating each rule with a comma.\n\n- The shadow shape and displacement are configured utilizing X and Y directional offset values (which position the shadow plane), alongside optional blur radius, spread radius, and styling color arguments.\n- By default, the initial specification value is set to `none`, meaning no shadow geometry is rendered.\n- This versatile styling feature empowers developers to effortlessly generate dimensional depth, elevation hierarchy, and visual emphasis across interface card design.\n\n**Syntax:**\n```css\nbox-shadow: <h-offset> <v-offset> <blur-radius> <spread-radius> <color> | none | inset | initial | inherit;\n```",
        },
        {
          heading: "Property Values Reference",
          description:
            "All supported `box-shadow` attribute values and parameters are outlined below:\n\n| Value | Description |\n| :--- | :--- |\n| **none** | The specification default value; no shadow effect is calculated or applied to the target element. |\n| **h-offset** | Controls horizontal shadow placement. Positive pixel values displace the shadow to the right, whereas negative values shift it to the left. |\n| **v-offset** | Controls vertical shadow placement. Positive pixel values displace the shadow beneath the element, whereas negative values push it above. |\n| **blur** | *Optional:* Adds a smooth Gaussian blur filter effect to the shadow silhouette. The higher the numerical radius value, the softer and blurrier the shadow becomes (default is `0`, producing sharp edges). |\n| **color** | *Optional:* Defines the visual color shade of the projected shadow. Supports named colors, hex codes, RGB/RGBA parameters, or HSL/HSLA palettes. |\n| **spread** | *Optional:* Adjusts the boundary dimensions of the shadow shape. Positive values increase total shadow coverage area, whereas negative values shrink it relative to element width/height. |\n| **inset** | Inverts default outward drop-shadow projection inward inside the element container, creating an embedded inner recessed shadow effect. |\n| **initial** | Resets the `box-shadow` property directly back to its browser specification default (`none`). |\n| **inherit** | Inherits explicit shadow configurations directly from its structural DOM parent element. |",
        },
        {
          heading: "Example 1: Basic Box Shadow with Horizontal, Vertical Offset, and Blur",
          description:
            "In this practical implementation, we apply the CSS `box-shadow` property across two distinct container elements (`.CodeSarthi1` and `.CodeSarthi2`).\n- The first box declares a horizontal offset of `5px`, vertical displacement of `10px`, and a moderate blur radius of `10px` (`box-shadow: 5px 10px 10px;`).\n- The second container matches exact displacement coordinates but increases blur radius to `28px` (`box-shadow: 5px 10px 28px;`), diffusing light distribution to produce a considerably softer visual elevation.",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <title>CSS box-shadow Property</title>
    <style>
        .CodeSarthi1 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: h-offset v-offset blur */
            box-shadow: 5px 10px 10px;
        }

        .CodeSarthi2 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: h-offset v-offset blur */
            box-shadow: 5px 10px 28px;
        }
    </style>
</head>

<body>
    <div class="CodeSarthi1">
        <h1>Welcome to Code Sarthi!</h1>
    </div>
    <br><br>
    <div class="CodeSarthi2"> A computer Science portal </div>
</body>

</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785601617/3f89308a-21f2-45f1-a3f1-aeed3a4f9cde.png",
            alt: "Basic box-shadow with horizontal offset, vertical offset, and blur",
          },
        },
        {
          heading: "Example 2: Box Shadow with Spread",
          description:
            "This demonstration expands upon baseline blur shading by introducing an explicit **spread** parameter into the four-length declaration sequence (`h-offset v-offset blur spread`).\n- The first card container specifies a spread radius of `10px` (`box-shadow: 5px 10px 10px 10px;`), extending physical shadow boundary edges by `10px` outwards in all four directions before diffusion occurs.\n- The second card enlarges spread distribution out to `20px` (`box-shadow: 5px 10px 28px 20px;`), producing a prominent, wide-reaching ambient drop-shadow.",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <title>CSS box-shadow Property</title>
    <style>
        .CodeSarthi1 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: h-offset
                       v-offset blur spread */
            box-shadow: 5px 10px 10px 10px;
        }

        .CodeSarthi2 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: h-offset
                       v-offset blur spread */
            box-shadow: 5px 10px 28px 20px;
        }
    </style>
</head>

<body>
    <div class="CodeSarthi1">
        <h1>Welcome to Code Sarthi!</h1>
    </div>
    <br><br>
    <div class="CodeSarthi2"> A computer Science portal </div>
</body>

</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785601649/d918ff03-dbb7-476f-a69c-b54fc268b629.png",
            alt: "CSS box-shadow with spread parameter applied",
          },
        },
        {
          heading: "Example 3: Box Shadow with Custom Color",
          description:
            "In this example, the `box-shadow` declaration integrates a custom color specification (`green`) directly into the shadow geometry sequence.\n- The first card combines a `10px` spread radius with vibrant green coloration (`box-shadow: 5px 10px 10px 10px green;`).\n- The second container applies a larger `20px` spread radius matching the green palette (`box-shadow: 5px 10px 28px 20px green;`), infusing colorful glow depth across the user interface.",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <title>CSS box-shadow Property</title>
    <style>
        .CodeSarthi1 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: h-offset v-offset blur 
                spread color */
            box-shadow: 5px 10px 10px 10px green;
        }

        .CodeSarthi2 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: h-offset v-offset blur 
                spread color */
            box-shadow: 5px 10px 28px 20px green;
        }
    </style>
</head>

<body>
    <div class="CodeSarthi1">
        <h1>Welcome to Code Sarthi!</h1>
    </div>
    <br><br>
    <div class="CodeSarthi2"> A computer Science portal </div>
</body>

</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785601692/2de44eac-e2ab-4842-bb33-484bf53e7826.png",
            alt: "CSS box-shadow with custom green color styling",
          },
        },
        {
          heading: "Example 4: Inset Shadow Inside the Box",
          description:
            "In this demonstration, the `inset` keyword is appended to the `box-shadow` rule to invert shadow projection internally inside the perimeter borders of the container box.\n- The first container implements an internal green shadow with a `10px` inward spread (`box-shadow: 5px 10px 10px 10px green inset;`).\n- The second container applies a deep internal recessed cavity shadow utilizing a `20px` inward spread (`box-shadow: 5px 10px 28px 20px green inset;`), simulating pressed or indented layout design.",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <title>CSS box-shadow Property</title>
    <style>
        .CodeSarthi1 {
            border: 1px solid;
            padding: 10px;
            /* box-shadow: h-offset v-offset blur 
                spread color inset */
            box-shadow: 5px 10px 10px 10px green inset;
        }

        .CodeSarthi2 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: h-offset v-offset blur 
                spread color inset */
            box-shadow: 5px 10px 28px 20px green inset;
        }
    </style>
</head>

<body>
    <div class="CodeSarthi1">
        <h1>Welcome to Code Sarthi!</h1>
    </div>
    <br><br>
    <div class="CodeSarthi2"> A computer Science portal </div>
</body>

</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785601732/f52a5485-bcdd-464d-bb27-584a5bed10f3.png",
            alt: "CSS box-shadow using inset keyword for recessed inner shadows",
          },
        },
        {
          heading: "Example 5: Resetting Box Shadow to Default with Initial",
          description:
            "In this demonstration, the `box-shadow` property is assigned the global specification keyword `initial` (`box-shadow: initial;`), which immediately resets shadow calculations back to their browser specification default (`none`). Both boxes render completely flat without any ambient depth or silhouette formatting.",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <title>CSS box-shadow Property</title>
    <style>
        .CodeSarthi1 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: initial */
            box-shadow: initial;
        }

        .CodeSarthi2 {
            border: 1px solid;
            padding: 10px;

            /* box-shadow: initial */
            box-shadow: initial;
        }
    </style>
</head>

<body>
    <div class="CodeSarthi1">
        <h1>Welcome to Code Sarthi!</h1>
    </div>
    <br><br>
    <div class="CodeSarthi2"> A computer Science portal </div>
</body>

</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785601766/b14ec1f3-4a2a-4dd6-a25c-9a85af3edf85.png",
            alt: "CSS box-shadow reset to default using initial keyword",
          },
        },
        {
          heading: "Supported Browsers & Compatibility Notes",
          description:
            "The CSS `box-shadow` property enjoys universal support across all modern web desktop and mobile browsers:\n\n| Browser Engine | Minimum Supported Release |\n| :--- | :--- |\n| **Google Chrome** | 10.0 and above |\n| **Microsoft Edge** | 12.0 and above |\n| **Mozilla Firefox** | 4.0 and above |\n| **Apple Safari** | 5.1 and above |\n| **Opera** | 10.5 and above |\n\n> **Note:** Older heritage releases of Internet Explorer (below IE 9) do not inherently support the native `box-shadow` property. When maintaining legacy enterprise cross-browser compatibility, developers historically incorporated vendor prefixes (such as `-webkit-box-shadow` or `-moz-box-shadow`) to ensure rendering support across older browser distributions.",
        },
      ],
    },
    {
      id: "css-text-shadow",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Text Shadow Property",
      title: "CSS text-shadow Property",
      sections: [
        {
          heading: "CSS text-shadow Property",
          description:
            "The `text-shadow` property in CSS is used to apply stylized shadow effects directly to typographic letterforms, creating visual depth and contrast emphasis across text elements.\n\n- Accepts explicit length measurements for horizontal offset, vertical offset, blur radius, and shadow color styling.\n- Multiple sophisticated layered shadow effects can be applied to a single text string by separating individual shadow definitions with commas.\n- The specification default value is set to `none`, meaning no text shadow is rendered.\n\n**Syntax:**\n```css\ntext-shadow: <h-shadow> <v-shadow> <blur-radius> <color> | none | initial | inherit;\n```",
        },
        {
          heading: "Property Values Reference",
          description:
            "Here are the supported property values and parameters for configuring CSS text shadows:\n\n| Property / Value | Description |\n| :--- | :--- |\n| **h-shadow** | Defines the horizontal position of the shadow silhouette. Positive values displace the shadow to the right, whereas negative values shift the shadow to the left. |\n| **v-shadow** | Controls the vertical position of the shadow silhouette. Positive values displace the shadow below the characters, whereas negative values shift the shadow upwards. |\n| **blur-radius** | *Optional:* Determines the softness and blurriness of the shadow edge. The specification default is `0`, producing crisp, sharp-edged duplicates of the text geometry. |\n| **color** | *Optional:* Specifies the visual coloration tone of the shadow silhouette. Accepts named colors, hex codes, or RGB/RGBA values. |\n| **none** | No shadow calculation will be rendered on the typographic text. This represents the default specification value. |\n| **initial** | Resets the `text-shadow` property directly back to its browser specification default (`none`). |\n| **inherit** | Inherits explicit typography shadow formatting rules directly from its DOM parent container element. |",
        },
        {
          heading: "Example 1: Adding a Simple Shadow",
          description:
            "This baseline demonstration applies a classic green typographic drop-shadow directly to an `<h1>` heading element (`text-shadow: 5px 5px 8px #00FF00;`).\n- The shadow displaces `5px` horizontally to the right and `5px` vertically downwards, utilizing an `8px` Gaussian blur radius to gently soften the bright `#00FF00` green glow against the background.",
          language: "html",
          code: `<html>
<head>
    <style>
        h1 {
            text-shadow: 5px 5px 8px #00FF00;
        }
    </style>
</head>
<body>
    <h1> Code Sarthi </h1>
</body>
</html>`,
        },
        {
          heading: "Example 2: Creating a Glowing Text Effect",
          description:
            "This advanced demonstration leverages comma-separated compound shadows to generate a vibrant neon glowing typographic effect on an `<h2>` heading element.\n- By locking horizontal and vertical offsets to zero (`0 0`) and stacking progressively wider blur radiuses across harmonious gold, orange, and tomato color hex codes (`10px #FFD700`, `20px #FFA500`, `30px #FF6347`), the text appears to emit incandescent light against the contrasting dark background (`#333`).",
          language: "html",
          code: `<html>
<head>
    <style>
        h2 {
            font-size: 24px;
            text-shadow: 0 0 10px #FFD700, 
                         0 0 20px #FFA500, 
                         0 0 30px #FF6347;
            color: #fff;
            background-color: #333;
            padding: 20px;
        }
    </style>
</head>
<body>
    <h2>Glowing Text Effect</h2>
</body>
</html>`,
        },
        {
          heading: "Example 3: Adding Multiple Shadows for Depth",
          description:
            "This demonstration applies two opposing compound shadows to an `<h3>` heading to simulate tactile three-dimensional embossing and physical letter elevation.\n- The first shadow layers a dark semi-transparent downward drop-shadow to the bottom-right (`3px 3px 2px rgba(0, 0, 0, 0.5)`).\n- The second shadow casts a bright white highlight upward to the top-left (`-3px -3px 2px rgba(255, 255, 255, 0.7)`), producing realistic dimensional depth against the neutral gray container background (`#f0f0f0`).",
          language: "html",
          code: `<html>
<head>
    <style>
        h3 {
            font-size: 24px;
            text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.5), 
                         -3px -3px 2px rgba(255, 255, 255, 0.7);
            color: #FF4500;
            background-color: #f0f0f0;
            padding: 10px;
        }
    </style>
</head>
<body>
    <h3>Text Shadow with Depth</h3>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-specificity",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Specificity",
      title: "CSS Specificity",
      sections: [
        {
          heading: "CSS Specificity Overview",
          description:
            "CSS specificity is the standardized set of calculation algorithms that web browsers utilize to determine which style declaration is applied when multiple conflicting CSS rules target the exact same DOM element. The selector rule containing the highest specificity numerical weight always takes rendering priority.\n\n- **Inline styles** possess the highest standard specificity weight.\n- **ID selectors** override class, attribute, and element selectors.\n- **Class selectors** override standard element tag names and pseudo-element rules.\n- **Source Order:** When two declarations share identical specificity weights, the rule written latest (last in document cascading order) is applied.\n\nIn the interactive demonstration below, we observe how stylesheet cascading order and inline attributes resolve rule conflicts between external stylesheet links (`external.css` configuring `h1 { background-color: lightgreen; }` and `h2 { color: pink; }`), internal document `<style>` tags, and inline DOM attributes:",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <!-- Simulated external.css rules: h1 { background-color: lightgreen; } h2 { color: pink; } -->
    <link rel="stylesheet" 
          type="text/css" 
          href="external.css">
    <style type="text/css">
        /* Internal CSS overrides external CSS when selectors share identical specificity weight */
        h1 {
            background-color: red;
            color: white;
        }

        h2 {
            color: blue;
        }
    </style>
</head>

<body>
    <h1>
        Internal CSS overrides external CSS
    </h1>
    <h2 style="color: green;">
        Inline CSS overrides internal CSS
    </h2>
</body>

</html>`,
        },
        {
          heading: "CSS Specificity Rules & Cascade Guidelines",
          description:
            "### Core Stylesheet Sources\n1. **Inline CSS:** Applied directly onto an HTML element using the DOM `style` attribute. Possesses the highest standard specificity weight, reliably overriding both internal `<style>` rules and external stylesheets.\n2. **Internal CSS:** Defined inside a `<style>` tag embedded directly within the `<head>` of an HTML document. Its effective specificity depends entirely on the selector syntax deployed (`ID > class > element`). When conflicting with external stylesheets using identical selector structures, internal rules take precedence due to sequential loading cascade order.\n3. **External CSS:** Written inside standalone `.css` files and connected to documents via `<link>` tags. Used to enforce consistent styling across multi-page web architecture. Its practical priority depends on selector weight and standard stylesheet inclusion ordering.\n\n### Critical Architecture Notes\n> [!NOTE]\n> - **Selectors Dictate Weight:** Specificity is primarily determined by the inherent composition of the **selectors themselves**—not merely by whether styles reside in internal `<style>` tags or external `.css` files.\n> - **Location Invariance:** If an external stylesheet and an internal style tag utilize identical selector combinations, their intrinsic specificity score is exactly equal; priority is decided simply by document parsing order.\n> - **Source Order Resolution:** When any cascade conflict occurs between rules sharing equal specificity weight, the declaration embedded **last (latest in document order)** counts as the winning style.\n> - **Universal & Inherited Low Ground:** Universal wildcards (like `*`), general root inherited tags (like `body`), and basic combinators carry virtually negligible specificity weight.",
        },
        {
          heading: "Specificity Hierarchy Reference",
          description:
            "Every valid CSS selector occupies a definite rank within the specificity scoring hierarchy, outlined below from highest to lowest priority:\n\n| Priority Rank | Selector Category | Description |\n| :--- | :--- | :--- |\n| **1 (Highest)** | **Inline Style** | Highest standard priority; applied directly onto HTML target element nodes utilizing the `style=\"...\"` attribute. |\n| **2** | **ID Selectors** | Second highest priority rank; targets elements uniquely identified by their `#id` DOM attribute (e.g., `#navbar` or `#second`). |\n| **3** | **Classes, Pseudo-classes, Attributes** | Medium specificity tier; targets elements utilizing `.class` names, pseudo-classes like `:hover`/`:focus`, and attribute queries like `[type=\"text\"]`. |\n| **4 (Lowest)** | **Elements & Pseudo-elements** | Lowest priority rank; applies directly to raw HTML syntax tags (like `h1`, `div`, `p`) and structural pseudo-elements such as `::before` or `::after`. |",
        },
        {
          heading: "Example: Specificity Hierarchy in Action",
          description:
            "This comprehensive code demonstration pits conflicting ID selectors, class selectors, element tag rules, and inline styling directly against one another on identical elements to showcase how browser rendering engines calculate winning specificity rules in real time:\n\n- **First Heading (`#second .third`):** The ID selector rule (`#second`) completely overpowers both class and element styling, rendering a black background with white text.\n- **Second Heading (`h1`):** Governed solely by the basic element selector, displaying a red background with white typography.\n- **Third Heading (`.third`):** The class selector (`.third`) overrides standard element tags, enforcing a pink background with blue font coloration.\n- **Fourth Heading (`style=\"color: green;\" #second1 .third1`):** Despite possessing both an explicit ID (`#second1`) and a class (`.third1`), the embedded **inline CSS attribute** (`style=\"color: green;\"`) wins absolute overriding precedence.",
          language: "html",
          code: `<!DOCTYPE html>
<html>

<head>
    <style type="text/css">
        h1 {
            background-color: red;
            color: white;
        }

        #second {
            background-color: black;
            color: white;
        }

        .third {
            background-color: pink;
            color: blue;
        }

        #second1 {
            color: blue;
        }

        .third1 {
            color: red;
        }
    </style>
</head>

<body>
    <h1 id="second" class="third">
        ID has highest priority.
    </h1>
    <h1>
        Element selectors has lowest priority.
    </h1>
    <h1 class="third">
        Classes have higher priority
        than element selectors.
    </h1>

    <h2 style="color: green;" 
        id="second1"
        class="third1">
        Inline CSS has highest priority.
      </h2>
</body>

</html>`,
        },
      ],
    },
    {
      id: "css-variables",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Variables",
      title: "CSS Variables",
      sections: [
        {
          heading: "CSS Variables Overview",
          description:
            "CSS variables (officially known as **custom properties**) are reusable, dynamically evaluatable styling values defined with a double-dash prefix (`--`). They empower developers to write highly maintainable, programmatic, and clean stylesheet code.\n\n- **Centralized Design Systems:** Store design system constants—such as brand color palettes, font stacks, spacing metrics, or layout breakpoints—in a centralized root location for instantaneous global theme updates.\n- **Dynamic Evaluation:** Use the `var()` function keyword to call and execute these variables anywhere across your CSS rule trees.\n- **Enhanced Readability:** Replace arbitrary hexadecimal codes or hardcoded pixel dimensions with semantically descriptive names to elevate code maintainability.\n\n**Syntax:**\n```css\nvar(--custom-name, fallback-value);\n```\n- **`--custom-name`:** *(Required)* The precise identifier of the user-defined custom property, beginning with two hyphens (`--`).\n- **`fallback-value`:** *(Optional)* A protective backup value to be applied if the requested custom property is currently undefined or evaluated as syntax invalid.\n\nIn the baseline demonstration below, custom properties for background and text colors (`--main-bg-color` and `--main-text-color`) are declared globally inside `:root` and invoked inside the `body` selector:",
          language: "html",
          code: `<html>
<head>
    <style>
        :root {
            --main-bg-color: lightblue;
            --main-text-color: darkblue;
        }
        body {
            background-color: var(--main-bg-color);
            color: var(--main-text-color);
        }
    </style>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is a sample paragraph demonstrating CSS variables.</p>
</body>
</html>`,
        },
        {
          heading: "1. Themed Button Using CSS Variables",
          description:
            "This practical component demonstration builds a fully themed interactive button solely powered by custom properties.\n\n- The `:root` pseudo-class defines foundational component metrics: `--button-bg` for background color (`#4CAF50`), `--button-text` for foreground typography (`white`), and `--button-padding` for internal spacing (`10px 20px`).\n- These customized variables are subsequently passed directly into the `.btn` styling block utilizing `var()` functions.\n- Because visual appearance is entirely tethered to central root parameters, executing application-wide theme modifications simply requires updating the single source-of-truth values stored within `:root` without altering component stylesheet rules.",
          language: "html",
          code: `<html>
<head>
    <style>
        :root {
            --button-bg: #4CAF50;
            --button-text: white;
            --button-padding: 10px 20px;
        }
        .btn {
            background-color: var(--button-bg);
            color: var(--button-text);
            padding: var(--button-padding);
            border: none;
            cursor: pointer;
        }
        .btn:hover {
            background-color: darkgreen;
        }
    </style>
</head>
<body>
    <button class="btn">Click Me</button>
</body>
</html>`,
        },
        {
          heading: "2. Dynamic Spacing Using CSS Variables",
          description:
            "This architectural demonstration illustrates how custom properties streamline layout spacing and grid gap management across multiple visual layout containers.\n\n- The global `:root` selector declares `--spacing: 20px;` to enforce standardized spacing rules across interface components.\n- Every individual `.box` container references this centralized constant via `margin: var(--spacing);`, guaranteeing consistent visual harmony.\n- Adjusting the single `--spacing` numerical variable in `:root` automatically recalculates and shifts the bounding margins for every `.box` DOM element across the complete application layout simultaneously.",
          language: "html",
          code: `<html>
<head>
    <style>
        :root {
            --spacing: 20px;
        }
        .box {
            width: 100px;
            height: 100px;
            background-color: lightcoral;
            margin: var(--spacing);
        }
    </style>
</head>
<body>
    <div class="box"></div>
    <div class="box"></div>
</body>
</html>`,
        },
        {
          heading: "Best Practices for CSS Variables",
          description:
            "When constructing modular web application design systems utilizing CSS custom properties, strictly observe these production best practices:\n\n- **Define Global Variables in `:root`:** Declare system-wide constants (primary colors, responsive font sizes, spacing tokens) within the top-level `:root` selector to guarantee complete visibility and effortless access throughout your stylesheet hierarchy.\n- **Use Descriptive, Semantic Naming:** Choose explicit, functional variable names (e.g., `--card-shadow-hover` or `--text-primary`) rather than literal physical properties (e.g., `--blue-hex` or `--padding-10`) to maximize clarity and future-proof theming transitions.\n- **Leverage the Cascade & Scoping:** Unlike static CSS preprocessor variables (such as Sass or Less `$vars`), native CSS custom properties inherit dynamically down the DOM tree and obey standard CSS specificity rules. Take full advantage of localized overriding by redefining custom property values inside specific component modifier classes or responsive media queries without duplicating entire structural styling blocks.",
        },
      ],
    },
    {
      id: "css-pseudo-classes",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Pseudo Classes",
      title: "CSS Pseudo-classes",
      sections: [
        {
          heading: "CSS Pseudo-classes",
          description:
            "A **pseudo-class** is a specialized keyword added to a CSS selector, prefixed by a single colon (`:`), to define an explicit state, user interaction behavior, or positional structure of a DOM element. It allows developers to dynamically style elements—such as hovering over interactive buttons, focusing on text input fields, or isolating structural child indices—without utilizing JavaScript or custom DOM classes.\n\n**Syntax:**\n```css\nselector:pseudo-class {\n    /* declarative styling properties */\n}\n```",
        },
        {
          heading: "1. :hover Pseudo-class",
          description:
            "### Interactive & User Action Pseudo-Classes\nThese selectors activate dynamically in response to real-time pointer interactions or user keyboard input states.\n\n#### `:hover`\nThe `:hover` pseudo-class applies styles when the user positions a cursor or mouse pointer directly over an interactive element without necessarily activating or clicking it.\n- In the code snippet below, hovering over the `<button>` triggers a background color transition to `lightblue` with `white` foreground text coloration.",
          language: "html",
          code: `<html>
<head>
    <style>
        button:hover {
            background-color: lightblue;
            color: white;
        }
    </style>
</head>
<body>
    <button>Hover over me!</button>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602076/5efb8e2d-f131-4624-98a2-1194906cbdd9.png",
            alt: "CSS button hover state rendering lightblue background",
          },
        },
        {
          heading: "2. :focus Pseudo-class",
          description:
            "The `:focus` pseudo-class activates immediately when an interactive form control or link receives active input focus—for instance, when a user clicks into a text input box or navigates onto it via keyboard tabbing.\n- In this demonstration, focused text fields drop their default browser outline and render a clean `2px solid blue` border to clearly indicate active cursor entry.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:focus {
            border: 2px solid blue;
            outline: none;
        }
    </style>
</head>
<body>
    <input type="text" placeholder="Click to focus">
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602127/a3b423e5-f88b-4b1d-8f1b-4cf366bdde46.png",
            alt: "CSS text input focus state with solid blue border",
          },
        },
        {
          heading: "3. :active Pseudo-class",
          description:
            "The `:active` pseudo-class applies strictly during the exact moment an element is being actively pressed down or clicked by the user pointer.\n- Providing essential tactile feedback during mouse-down execution, the button below transforms to a vivid `darkblue` background tone before the click releases.",
          language: "html",
          code: `<html>
<head>
    <style>
        button:active {
            background-color: darkblue;
            color: white;
        }
    </style>
</head>
<body>
    <button>Click me!</button>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602166/e798e919-635c-49db-bf87-309b35cbef1c.png",
            alt: "CSS active button state showing darkblue pressed style",
          },
        },
        {
          heading: "4. :visited Pseudo-class",
          description:
            "The `:visited` pseudo-class targets navigation hyperlinks (`<a>` anchor tags) pointing to URL addresses that the user has previously opened or recorded in their browser session history.\n- To differentiate traveled endpoints from untried routes, the selector `a:visited` colors previously visited URLs in a distinct `purple` tone.",
          language: "html",
          code: `<html>
<head>
    <style>
        a:visited {
            color: purple;
        }
    </style>
</head>
<body>
    <a href="https://www.example.com//">Visit this link</a>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602263/0b557904-1579-4000-9f29-208273e91fe7.png",
            alt: "CSS visited anchor link rendering in purple",
          },
        },
        {
          heading: "5. :link Pseudo-class",
          description:
            "The `:link` pseudo-class exclusively applies styling rules to unvisited anchor links that have not yet been traversed by the user in their active browser history.\n- The example below overrides default blue hyperlink coloring, styling unvisited endpoints (`a:link`) in a crisp `green` typography font color.",
          language: "html",
          code: `<html>
<head>
    <style>
        a:link {
            color: green;
        }
    </style>
</head>
<body>
    <a href="https://www.example.com//">Visit this link</a>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602296/a9b7b21a-8a8c-4f8d-8171-cf18884247be.png",
            alt: "CSS unvisited anchor link rendering in green via link pseudo class",
          },
        },
        {
          heading: "6. :focus-visible Pseudo-class",
          description:
            "The `:focus-visible` pseudo-class is an essential accessibility standard that triggers styles solely when an element receives keyboard input focus (such as pressing the **Tab** navigation key) rather than conventional pointer mouse clicks.\n- This architectural enhancement keeps interface mouse interactions free of visually distracting focus rings while reliably projecting a high-contrast `3px solid orange` accessibility outline for keyboard-only or assistive device navigators.",
          language: "html",
          code: `<html>
<head>
    <style>
        button:focus-visible {
            outline: 3px solid orange;
        }
    </style>
</head>
<body>
    <button>Click or Tab to focus</button>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602329/bf6b104c-35a6-4418-8af9-e6fcf39b9a09.png",
            alt: "CSS button displaying keyboard focus-visible solid orange outline",
          },
        },
        {
          heading: "7. :focus-within Pseudo-class",
          description:
            "The `:focus-within` pseudo-class attaches to an ancestor container element if the element itself or **any of its descendant children** currently holds active DOM input focus.\n- When a user enters text inside the nested `<input>` field below, the parent wrapping `.form-container` automatically illuminates with a prominent `2px solid green` bounding border, enabling sophisticated parent-level form interaction styling.",
          language: "html",
          code: `<html>
<head>
    <style>
        .form-container:focus-within {
            border: 2px solid green;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <input type="text" placeholder="Type here">
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602372/14887e38-beeb-488d-91a0-c59c99f39573.png",
            alt: "CSS form container highlighting with solid green border via focus-within",
          },
        },
        {
          heading: "Structural Targeting: :first-child",
          description:
            "### Structural Targeting Pseudo-classes\nStructural pseudo-classes select DOM nodes purely based on their positional hierarchy and sibling order within parent container structures.\n\n#### `:first-child`\nThe `:first-child` selector explicitly targets any matching element that represents the **very first ordinal child node** of its structural parent container.\n- In the layout below, `p:first-child` strictly highlights the initial introductory paragraph inside the `<div>` in `red` coloration, while leaving subsequent sibling paragraphs untouched.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:first-child {
            color: red;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the first paragraph.</p>
        <p>This is the second paragraph.</p>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602400/0ab8266c-67a2-46c6-bb93-f422f9d674f3.png",
            alt: "CSS first-child pseudo-class highlighting opening paragraph in red",
          },
        },
        {
          heading: "Structural Targeting: :last-child",
          description:
            "The `:last-child` pseudo-class exclusively matches any targeted element that represents the **very last ordinal child node** of its structural parent container.\n- In the layout demonstration below, `p:last-child` specifically isolates and styles the concluding paragraph inside the wrapper `<div>` in `blue` coloration, ignoring any prior sibling elements.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:last-child {
            color: blue;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the first paragraph.</p>
        <p>This is the last paragraph.</p>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602456/4057a9de-d565-43f0-9f15-de4f8fe23ed1.png",
            alt: "CSS last-child pseudo-class styling concluding paragraph in blue",
          },
        },
        {
          heading: "Structural Targeting: :nth-child(n)",
          description:
            "The `:nth-child(n)` pseudo-class matches elements based explicitly on their exact sequential numbering index (`n`, where `1` represents the very first child node) within a parent container.\n- This versatile selector accepts exact numerical integers (`5`), mathematical cycle expressions (`2n+1`), or convenient keyword modifiers (`odd` and `even`).\n- In the layout below, `p:nth-child(5)` accurately highlights the fifth sequential paragraph in `green` font coloring.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:nth-child(5) {
            color: green;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the first paragraph.</p>
        <p>This is the second paragraph.</p>
        <p>This is the third paragraph.</p>
        <p>This is the fourth paragraph.</p>
        <p>This is the fifth paragraph.</p>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602488/b00415a3-4210-4468-a43c-546611517991.png",
            alt: "CSS nth-child targeting fifth paragraph in green",
          },
        },
        {
          heading: "Structural Targeting: :nth-last-child(n)",
          description:
            "The `:nth-last-child(n)` pseudo-class mirrors standard sequential child numbering but performs its directional calculation in **reverse order**, counting backward starting from the final sibling element of a parent container.\n- In this demonstration, `p:nth-last-child(1)` targets the very last child node from the bottom up, applying an `orange` text styling color.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:nth-last-child(1) {
            color: orange;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the first paragraph.</p>
        <p>This is the second paragraph.</p>
        <p>This is the third paragraph.</p>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602531/f436004a-ba77-4009-aa56-886df94c558e.png",
            alt: "CSS nth-last-child targeting from bottom in orange",
          },
        },
        {
          heading: "Structural Targeting: :first-of-type",
          description:
            "The `:first-of-type` pseudo-class specifically targets the initial instance of a **particular element tag name** within its parent container, regardless of any preceding non-matching sibling tags that appear above it in the DOM.\n- Despite an opening `<span>` element taking first position within the parent `<div>` below, `p:first-of-type` correctly locates and colors the very first `<p>` paragraph node in `purple`.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:first-of-type {
            color: purple;
        }
    </style>
</head>
<body>
    <div>
        <span>Some text</span>
        <p>This is the first paragraph.</p>
        <p>This is another paragraph.</p>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602582/143bac63-640d-4c94-8e1e-90da81657198.png",
            alt: "CSS first-of-type selecting initial paragraph element in purple",
          },
        },
        {
          heading: "Structural Targeting: :last-of-type",
          description:
            "The `:last-of-type` pseudo-class matches the final trailing occurrence of a **specific HTML element tag type** inside its containing parent node, overlooking any subsequent sibling elements of different HTML formatting types.\n- Here, `p:last-of-type` reliably isolates the concluding `<p>` tag in `yellow`, cleanly bypassing any interleaved `<span>` tags.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:last-of-type {
            color: yellow;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the first paragraph.</p>
        <span>Some text</span>
        <p>This is the last paragraph.</p>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602618/c59f7145-9f5a-4204-b6d4-cd50e3208029.png",
            alt: "CSS last-of-type targeting concluding paragraph in yellow",
          },
        },
        {
          heading: "Structural Targeting: :nth-of-type(n)",
          description:
            "The `:nth-of-type(n)` selector isolates elements based purely on their sequential structural position relative exclusively to **siblings sharing the exact same HTML tag type** within a parent container.\n- In the layout below, `p:nth-of-type(2)` specifically locates the second `<p>` occurrence in the DOM sequence, styling it in `pink` while totally excluding non-paragraph tags like `<span>` from its calculation tally.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:nth-of-type(2) {
            color: pink;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the first paragraph.</p>
        <span>Some text</span>
        <p>This is the second paragraph.</p>
        <p>This is the third paragraph.</p>
    </div>
</body>
</html>`,
        },
        {
          heading: "Structural Targeting: :nth-last-of-type(n)",
          description:
            "The `:nth-last-of-type(n)` pseudo-class operates identically to `:nth-of-type()`, but calculates sequential positioning indexes in reverse from the very bottom of the structural parent container upward.\n- In this demo, `p:nth-last-of-type(1)` isolates the bottommost `<p>` paragraph tag in the wrapper node, applying a `brown` coloration.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:nth-last-of-type(1) {
            color: brown;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the first paragraph.</p>
        <span>Some text</span>
        <p>This is the second paragraph.</p>
        <p>This is the third paragraph.</p>
    </div>
</body>
</html>`,
        },
        {
          heading: "Structural Targeting: :only-child",
          description:
            "The `:only-child` selector strictly matches any element that resides as the **sole, exclusive individual child node** of its parent container, with zero sibling elements of any kind present.\n- Here, `p:only-child` formats the standalone `<p>` element in `teal` font coloring, as no other DOM siblings exist within the wrapping `<div>`.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:only-child {
            color: teal;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the only paragraph.</p>
    </div>
</body>
</html>`,
        },
        {
          heading: "Structural Targeting: :only-of-type",
          description:
            "The `:only-of-type` pseudo-class targets elements that represent the **only structural instance of their specific HTML tag type** within a parent container, remaining completely valid even if sibling nodes of differing tag syntax exist alongside it.\n- Even though a `<span>` element accompanies the paragraph inside the parent container below, `p:only-of-type` correctly confirms the `<p>` tag is unique among paragraphs and renders it in `coral`.",
          language: "html",
          code: `<html>
<head>
    <style>
        p:only-of-type {
            color: coral;
        }
    </style>
</head>
<body>
    <div>
        <p>This is the only paragraph.</p>
        <span>Some text</span>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602699/599ba84c-f7b1-4c17-b242-7b81d988e748.png",
            alt: "CSS only-of-type targeting singular paragraph instance in coral",
          },
        },
        {
          heading: "Structural Targeting: :empty",
          description:
            "The `:empty` pseudo-class precisely matches DOM elements that contain absolutely zero inner content—meaning neither nested HTML child nodes nor plaintext character strings (including whitespace spaces) exist inside.\n- In the demonstration below, `div:empty` detects the blank `#one` container and immediately injects a visible `100px` solid `green` background block, while completely passing over sibling `<div>` structures containing paragraph text.",
          language: "html",
          code: `<html>
<head>
    <style>
        div:empty {
            background-color: green;
        }
        #one {
            height: 100px;
            width: 100px;
        }
    </style>
</head>
<body>
    <div id="one"></div>
    <div>
        <p>This div has content.</p>
    </div>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602735/14ba447e-d780-4919-9b7c-23c9bfddee60.png",
            alt: "CSS empty selector formatting blank container box with solid green background",
          },
        },
        {
          heading: "Form Pseudo-Classes: :checked",
          description:
            "### Form Validation & State Pseudo-Classes\nThese specialized form selectors enable rich styling feedback driven entirely by user interaction state and native input validity validation rules without scripting intervention.\n\n#### `:checked`\nThe `:checked` pseudo-class triggers whenever an interactive toggle control—specifically checkboxes, radio option inputs, or `<select>` dropdown `<option>` items—is currently toggled into an active checked state by the user.\n- In this interactive demonstration, enabling the checkbox outlines the input frame with an emphatic `5px solid red` ring indicator.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:checked {
            outline: 5px solid red;
        }
    </style>
</head>
<body>
    Agree to terms <input type="checkbox">
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602778/1727424f-d7e1-42a7-a955-539453fd22c0.png",
            alt: "CSS checked checkbox input displaying 5px solid red outline",
          },
        },
        {
          heading: "Form Pseudo-Classes: :disabled",
          description:
            "The `:disabled` pseudo-class dynamically targets form interface controls (such as text input fields, selection drop-downs, and actionable submission buttons) that explicitly possess the HTML `disabled` boolean attribute.\n- To visually communicate restricted interactivity to end users, `input:disabled` subdues non-editable fields below utilizing a muted `lightgray` background fill.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:disabled {
            background-color: lightgray;
        }
    </style>
</head>
<body>
    <input type="text" disabled placeholder="Disabled input">
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602817/cef380d7-8296-44b8-876d-33cd08bff8c3.png",
            alt: "CSS disabled form field rendering muted lightgray background",
          },
        },
        {
          heading: "Form Pseudo-Classes: :enabled",
          description:
            "The `:enabled` pseudo-class represents the opposite operational state of `:disabled`, targeting interactive interface elements that remain active and fully responsive to user input engagement.\n- In the snippet below, active enabled form inputs receive an inviting `lightblue` background fill tone (`input:enabled`).",
          language: "html",
          code: `<html>
<head>
    <style>
        input:enabled {
            background-color: lightblue;
        }
    </style>
</head>
<body>
    <input type="text" placeholder="Enabled input">
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602850/48351a6d-43ef-4b35-a02e-f4513b6e7c60.png",
            alt: "CSS enabled interactive input displaying lightblue background fill",
          },
        },
        {
          heading: "Form Pseudo-Classes: :required",
          description:
            "The `:required` pseudo-class strictly matches data submission form controls configured with the required HTML validation boolean attribute (`required`), mandating valid input entry prior to form submission.\n- Below, `input:required` alerts users to mandatory form fields by wrapping the input box within an eye-catching `2px solid red` perimeter boundary.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:required {
            border: 2px solid red;
        }
    </style>
</head>
<body>
    <form>
        <input type="text" required placeholder="This field is required">
    </form>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602883/7264902d-d467-4b77-8bb6-4cc7f5adbda3.png",
            alt: "CSS required form input rendering 2px solid red indicator border",
          },
        },
        {
          heading: "Form Pseudo-Classes: :optional",
          description:
            "The `:optional` pseudo-class identifies and formats form input controls that do **not** possess mandatory submission constraints (i.e., lacking the `required` HTML boolean attribute).\n- To distinguish voluntary fields from necessary submission constraints, `input:optional` applies a tranquil `2px solid green` border around optional user text entries.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:optional {
            border: 2px solid green;
        }
    </style>
</head>
<body>
    <form>
        <input type="text" placeholder="This field is optional">
    </form>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602915/15d28d26-3527-4df6-9c17-5dd9788528db.png",
            alt: "CSS optional form control rendered with solid green border",
          },
        },
        {
          heading: "Form Pseudo-Classes: :valid",
          description:
            "The `:valid` pseudo-class dynamically styles input form controls whenever their currently inputted data contents accurately pass native browser pattern and schema validation checks (such as structurally verified email formats or satisfied numeric constraints).\n- Supplying positive confirmation feedback, `input:valid` illuminates successful field validation utilizing a clean `2px solid green` bounding border.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:valid {
            border: 2px solid green;
        }
    </style>
</head>
<body>
    <form>
        <input type="email" placeholder="Enter valid email" required>
    </form>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602946/ac2b60cc-7d37-4aed-9a4a-071e2a5a649f.png",
            alt: "CSS valid form validation feedback displaying 2px solid green border",
          },
        },
        {
          heading: "Form Pseudo-Classes: :invalid",
          description:
            "The `:invalid` pseudo-class represents the converse error state of `:valid`, dynamically activating on interface input controls when user entry contents fail native HTML5 constraints or syntax pattern formatting rules.\n- Instantly warning users of formatting mistakes before submission attempts, `input:invalid` frames erroneous entries with an authoritative `2px solid red` error outline.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:invalid {
            border: 2px solid red;
        }
    </style>
</head>
<body>
    <form>
        <input type="email" placeholder="Enter valid email" required>
    </form>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785602987/0b14ccc4-df28-4d87-98e7-c64dfd52c385.png",
            alt: "CSS invalid email input highlighted in solid red border",
          },
        },
        {
          heading: "Form Pseudo-Classes: :in-range",
          description:
            "The `:in-range` pseudo-class matches numeric, slider range, or date input elements (`type=\"number\"`, `type=\"range\"`) when their entered numerical value falls safely within explicitly defined HTML `min` and `max` interval parameters.\n- In this demo, numerical entries situated safely between `1` and `10` confirm valid bounds via a vibrant `lightgreen` background fill.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:in-range {
            background-color: lightgreen;
        }
    </style>
</head>
<body>
    <form>
        <input type="number" min="1" max="10" placeholder="Pick a number between 1 and 10">
    </form>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785603022/55f46afb-fef2-46c5-977f-ef79c0612b9d.png",
            alt: "CSS in-range numeric input field displaying lightgreen confirmation background",
          },
        },
        {
          heading: "Form Pseudo-Classes: :out-of-range",
          description:
            "The `:out-of-range` pseudo-class activates whenever a numerical or chronological form entry breaches explicit interval boundaries by exceeding established `max` thresholds or dropping below `min` limits.\n- Immediately flagging numerical entry violations, `input:out-of-range` shifts the input box background to an attention-grabbing `lightcoral` color.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:out-of-range {
            background-color: lightcoral;
        }
    </style>
</head>
<body>
    <form>
        <input type="number" min="1" max="10" placeholder="Pick a number between 1 and 10">
    </form>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785603062/df74e9f5-2b3d-4e13-9d51-9dc8ae78fc76.png",
            alt: "CSS out-of-range numerical input displaying warning lightcoral background",
          },
        },
        {
          heading: "Form Pseudo-Classes: :read-only",
          description:
            "The `:read-only` selector isolates DOM elements that display static, non-editable contents—such as form input boxes configured with the HTML `readonly` boolean attribute or general structural text nodes.\n- To visually separate static reference fields from editable text inputs, `input:read-only` colors read-only containers below in a subdued `lightgray` tone.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:read-only {
            background-color: lightgray;
        }
    </style>
</head>
<body>
    <input type="text" value="This is read-only" readonly>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785603093/38eac5e3-4995-4c7e-b1b5-38d620b18195.png",
            alt: "CSS read-only text input rendered in lightgray background",
          },
        },
        {
          heading: "Form Pseudo-Classes: :read-write",
          description:
            "The `:read-write` pseudo-class targets interactive user interface elements that allow active user text modifications—including standard editable input fields, `<textarea>` boxes, or any container utilizing the HTML `contenteditable` attribute.\n- Celebrating open usability and text interaction, `input:read-write` welcomes active input entry below with a gentle `lightyellow` background fill.",
          language: "html",
          code: `<html>
<head>
    <style>
        input:read-write {
            background-color: lightyellow;
        }
    </style>
</head>
<body>
    <input type="text" placeholder="You can type here">
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-pseudo-elements",
      category: "Effects, Animations & Advanced CSS",
      shortTitle: "Pseudo Elements",
      title: "CSS Pseudo-elements",
      sections: [
        {
          heading: "CSS Pseudo-elements",
          description:
            "A **pseudo-element** is a specialized keyword added to a CSS selector that allows developers to style specific structural sub-parts of an element without creating extra HTML DOM wrapping tags.\n- Whether decorating the first letter of a paragraph with drop-cap initial formatting, styling opening text lines, or projecting synthetic decorative content directly before and after an element, pseudo-elements unlock powerful visual design capabilities with minimal markdown code.\n- In modern HTML5 and CSS3 specification syntax, pseudo-elements are strictly prefixed by a **double colon (`::`)** to distinguish them from standard single-colon (`:`) pseudo-classes (though legacy browsers continue to support single-colon notation for core older properties).\n\n**Syntax:**\n```css\nselector::pseudo-element {\n    /* declarative CSS styling properties */\n}\n```",
        },
        {
          heading: "1. ::before Pseudo-element",
          description:
            "### Commonly Used CSS Pseudo-Elements\nThese powerful virtual child selectors enable synthetic DOM generation and high-precision typographic enhancement.\n\n#### `::before`\nThe `::before` pseudo-element allows you to insert virtual generated content immediately directly before the actual children or content body of a selected element.\n- Working hand-in-hand with the mandatory CSS `content` property, the demonstration below prepends a glowing golden spark icon (`\"✨ \"`, `color: gold;`) straight before the text inside the `<p>` element.",
          language: "html",
          code: `<html>
<head>
    <style>
        p::before {
            content: "✨ ";
            color: gold;
        }
    </style>
</head>
<body>
    <p>This is a paragraph.</p>
</body>
</html>`,
        },
        {
          heading: "2. ::after Pseudo-element",
          description:
            "Operating as the exact counterpart to `::before`, the `::after` pseudo-element synthetically inserts generated styling content immediately **after** the trailing text or child elements of a selected container.\n- Highly celebrated for building UI decoration cues, badge counters, external link icons, or layout clearing hacks, `p::after` appends an energetic red flame motif (`\" 🔥\"`, `color: red;`) right at the closing tail of our test paragraph.",
          language: "html",
          code: `<html>
<head>
    <style>
        p::after {
            content: " 🔥";
            color: red;
        }
    </style>
</head>
<body>
    <p>This is a paragraph.</p>
</body>

</html>`,
        },
        {
          heading: "3. ::first-letter Pseudo-element",
          description:
            "The `::first-letter` pseudo-element selectively targets only the opening alphabetical typographic character of a block-level text element.\n- Widely utilized across editorial and publishing interfaces to create traditional decorative **drop-cap initials**, the code below inflates our paragraph's starting `'T'` character up to `font-size: 2em` in vibrant `blue` formatting.",
          language: "html",
          code: `<html>
<head>
    <style>
        p::first-letter {
            font-size: 2em;
            color: blue;
        }
    </style>
</head>
<body>
    <p>This is a paragraph.</p>
</body>
</html>`,
        },
        {
          heading: "4. ::first-line Pseudo-element",
          description:
            "The `::first-line` pseudo-element selectively styles exclusively the opening horizontal visual line of text rendered inside a block-level element container.\n- Unlike wrapping manual `<span>` tags around specific words, `::first-line` dynamically recalculates its styling boundaries as browser viewports expand or shrink—guaranteeing that whichever text rests on the top row maintains bold font weighting (`font-weight: bold`) in forest `green` typography.",
          language: "html",
          code: `<html>
<head>
    <style>
        p::first-line {
            font-weight: bold;
            color: green;
        }
    </style>
</head>
<body>
    <p>This is a longer paragraph to demonstrate the <br>
        first-line styling in action.</p>
</body>
</html>`,
        },
        {
          heading: "5. ::placeholder Pseudo-element",
          description:
            "The `::placeholder` pseudo-element targets and formats temporary placeholder advisory text rendered inside form input controls (such as `<input>` and `<textarea>` elements).\n- Because default browser placeholder formatting often relies on faint low-contrast text tones, customizing `input::placeholder` enables developers to establish tailored typography—such as applying a subdued `gray` color alongside decorative italic font emphasis (`font-style: italic;`).",
          language: "html",
          code: `<html>
<head>
    <style>
        input::placeholder {
            color: gray;
            font-style: italic;
        }
    </style>
</head>
<body>
    <input type="text" placeholder="Enter your name">
</body>
</html>`,
        },
        {
          heading: "6. ::marker Pseudo-element",
          description:
            "The `::marker` pseudo-element gives direct styling control over the structural marker icon or numbering bullet prefix generated automatically beside list items (`<li>` in `<ul>` or `<ol>`, or `<summary>` dropdown toggles).\n- Replacing historical hacks that required disabling bullet styles and hand-coding custom flex alignment, `li::marker` smoothly scales up our bullet indicators below to `font-size: 1.5em` in rich `purple` coloring while preserving normal document flow.",
          language: "html",
          code: `<html>
<head>
    <style>
        li::marker {
            color: purple;
            font-size: 1.5em;
        }
    </style>
</head>
<body>
    <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
    </ul>
</body>
</html>`,
        },
        {
          heading: "7. ::selection Pseudo-element",
          description:
            "The `::selection` pseudo-element overrides default OS highlighting colors to style specific portions of document text actively selected and highlighted by user pointer gestures or keyboard cursor dragging.\n- Delivering branded interactive polish across interface text layouts, the demonstration below replaces standard blue highlighting bars with an exciting bright `yellow` background highlight combined with vibrant `green` text readability.",
          language: "html",
          code: `<html>
<head>
    <style>
        ::selection {
            background: yellow;
            color:green;
        }
    </style>
</head>
<body>
    <p>Select some text in this paragraph to see the effect.</p>
</body>
</html>`,
        },
        {
          heading: "8. ::backdrop Pseudo-element",
          description:
            "The `::backdrop` pseudo-element targets the immediate full-screen underlay rendering directly beneath top-layer native popovers and overlay elements—most notably HTML5 `<dialog>` modal components invoked via `showModal()` or Fullscreen API views.\n- Creating visual depth while focusing attention onto active dialog prompts, `dialog::backdrop` blankets the surrounding document layout below in a tinted translucent yellow overlay (`rgba(232, 233, 0, 0.5)`).",
          language: "html",
          code: `<html>
<head>
    <style>
        dialog::backdrop {
            background: rgba(232, 233, 0, 0.5);
        }

        dialog {
            border: none;
            padding: 20px;
            background: white;
        }
    </style>
</head>
<body>
    <dialog id="myDialog">This is a dialog box.</dialog>
    <script>
        const dialog = document.getElementById("myDialog");
        if (dialog) {
            dialog.showModal();
        }
    </script>
</body>
</html>`,
        },
        {
          heading: "Specific Contexts: ::file-selector-button",
          description:
            "### Pseudo-elements for Specific Contexts\nModern CSS specifications include specialized pseudo-element target hooks designed to style previously unreachable native OS interface buttons and browser spellcheck underline annotations.\n\n#### `::file-selector-button` for Media and Interactivity\nThe `::file-selector-button` pseudo-element grants explicit visual styling access to the embedded interactive browse button rendered inside native file selection controls (`<input type=\"file\">`).\n- Replacing ugly default OS rendering frames, this demonstration transforms the upload button into an attractive `#4CAF50` green pill button equipped with dynamic hover color darkening (`#45a049`).",
          language: "html",
          code: `<html>
<head>
    <style>
        ::file-selector-button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        ::file-selector-button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h2>Custom File Selector Button</h2>
    <input type="file">
</body>
</html>`,
        },
        {
          heading: "Specific Contexts: ::spelling-error",
          description:
            "#### `::spelling-error` for Error Handling\nThe cutting-edge `::spelling-error` pseudo-element allows styling customization over text segments flagged as incorrect grammar or spelling mistakes by the underlying browser dictionary spell-check engine (`spellcheck=\"true\"`).\n- Elevating default red squiggles into unambiguous visual feedback alerts, `::spelling-error` paints offending typos in a delicate `#ffdddd` blush warning background accompanied by an assertive solid red underline (`text-decoration: underline solid red;`).",
          language: "html",
          code: `<html>
<head>
    <style>
        ::spelling-error {
            background-color: #ffdddd;
            text-decoration: underline solid red;
        }
    </style>
</head>
<body>
    <h2>Spelling Error Detection</h2>
    <input type="text" value="Ths is a splling eror" spellcheck="true">
</body>
</html>`,
        },
      ],
    },
  ],
};
