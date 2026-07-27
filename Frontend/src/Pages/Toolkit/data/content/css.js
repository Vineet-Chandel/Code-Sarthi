export default {
  topics: [
    {
      id: "css-introduction",
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
    <p>GeeksforGeeks</p>
    <div>
        <div>child div content</div>
        <p>G4G</p>
    </div>
    <p>Geeks</p>
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
    <p>GeeksforGeeks</p>
    <div>
        <div>child div content</div>
        <p>G4G</p>
    </div>
    <p>Geeks</p>
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
    <p>GeeksforGeeks</p>
    <div>
        <div>child div content</div>
        <p>G4G</p>
    </div>
    <p>Geeks</p>
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
    <p>GeeksforGeeks</p>
    <div>
        <div>child div content</div>
        <p>G4G</p>
        <p>Descendant selector</p>
    </div>
    <p>Geeks</p>
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
    <h1 tabindex="0">Welcome to GFG</h1>
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
    <h1 tabindex="0">Welcome to GFG</h1>
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
    <p>Welcome to GFG<br>
        Hello GFG</p>
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
    <p>Welcome to GFG</p>
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
            "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190417124305/250.png")
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
    <h1>Geeksforgeeks</h1>
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
                url("https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190417124305/250.png");
        }
    </style>
</head>
<body>
    <h1>Geeksforgeeks</h1>
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
                url("https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190417124305/250.png");
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
                url("https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190417124305/250.png");
            background-attachment: fixed;
        }
    </style>
</head>
<body>
    <h1>Geeksforgeeks</h1>
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
                url("https://media.geeksforgeeks.org/wp-content/cdn-uploads/20190417124305/250.png");
            background-repeat: no-repeat;
            background-position: center;
        }
    </style>
</head>
<body>
    <h1>Geeksforgeeks</h1>
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
    <h2>GEEKSFORGEEKS</h2>
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
    <h2>GEEKSFORGEEKS</h2>
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
    <h2>GEEKSFORGEEKS</h2>
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
            "The width and height properties in CSS are used to define the dimensions of an element. The values can be set in various units, such as pixels (px), centimeters (cm), percentages (%), etc.\n\n- .GFG styling: Sets width, border, text color, size, alignment, padding, and margin for the div.\n- HTML div: Displays \"GeeksforGeeks\" with the applied styles.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>width and height</title>
    <style>
        .GFG {
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
    <div class="GFG">GeeksforGeeks</div>
</body>
</html>`,
        },
        {
          heading: "Height and Width of Image",
          description:
            "To set the height and width of an image, the width and height properties are used. These values can be specified in pixels, percentages, or other units.\n\n- .GFG styling: Sets the image width to 100px, height to 50px, and adds a 2px black border.\n- HTML image: Displays the image with the applied size and border styles.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>Height and width of image</title>
    <style>
        .GFG {
            width: 100px;
            height: 50px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <h3>Set the width and height of an Image</h3>
    <img class="GFG" src="https://media.geeksforgeeks.org/wp-content/uploads/20210224031038/Capture4-300x174.PNG">
</body>
</html>`,
        },
        {
          heading: "max-width",
          description:
            "The max-width property is used to set the maximum width of a box. Its effect can be seen by resizing the browser window.\n\n- .GFG styling: Limits the div's width to a maximum of 500px, sets font size to 12px, and adds a 2px black border.\n- HTML div content: Displays a heading and paragraph that will not exceed 500px in width.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>max-width of element</title>
    <style>
        .GFG {
            max-width: 500px;
            font-size: 12px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="GFG">
        <h3>GeeksforGeeks</h3>
        <p>
            GeeksforGeeks is a computer science platform
            where you can learn programming. It is a Computer
            Science portal for geeks.
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
        .GFG {
            min-width: 400px;
            font-size: 13px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="GFG">
        <h3>GeeksforGeeks</h3>
        <p>
            GeeksforGeeks is a computer science platform
            where you can learn programming. It is a Computer
            Science portal for geeks.
        </p>
    </div>
</body>
</html>`,
        },
        {
          heading: "max-height",
          description:
            "The max-height property is used to set the maximum height of a box. Its effect can be seen by resizing the browser window.\n\n- .GFG styling: Sets a maximum height of 100px and adds a 2px black border to the div.\n- HTML div content: Displays a heading and paragraph, which will be restricted to the max height of 100px.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>max-height of element</title>
    <style>
        .GFG {
            max-height: 100px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="GFG">
        <h3>GeeksforGeeks</h3>
        <p>
            GeeksforGeeks is a computer science platform
            where you can learn programming. It is a Computer
            Science portal for geeks.
        </p>
    </div>
</body>
</html>`,
        },
        {
          heading: "min-height",
          description:
            "The min-height property is used to set the minimum height of a box. Its effect can be seen by resizing the browser window.\n\n- .GFG styling: Sets a minimum height of 50px and adds a 2px black border to the div.\n- HTML div content: Ensures the div is at least 50px tall while displaying the heading and paragraph.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>min-height of element</title>
    <style>
        .GFG {
            min-height: 50px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="GFG">
        <h3>GeeksforGeeks</h3>
        <p>
            GeeksforGeeks is a computer science platform
            where you can learn programming. It is a Computer
            Science portal for geeks.
        </p>
    </div>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-text-formatting",
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
    <p>Hello GFG</p>
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
    <h1>NEWSPAPER GeeksforGeeks</h1>
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
    <p>Welcome to GeeksforGeeks</p>
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
    <p>Welcome to GeeksforGeeks</p>
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
    <bdo dir="rtl">Welcome to GeeksforGeeks</bdo>
</body>
</html>`,
        },
      ],
    },
    {
      id: "css-fonts",
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
        .gfg {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 60px;
            color: #090;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="gfg">GeeksforGeeks</div>
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
        .gfg1 {
            text-align: left;
        }
        .gfg2 {
            text-align: right;
        }
        .gfg3 {
            text-align: center;
        }
        .gfg4 {
            text-align: justify;
        }
    </style>
</head>
<body>
    <h1>GeeksforGeeks</h1>
    <h2>text-align property</h2>

    <div class="main">
        <h3>text-align: left;</h3>
        <div class="gfg1">
            The course is designed for students as well as working professionals to
            prepare for coding interviews. This course is going to have coding questions
            from school level to the level needed for product based companies like Amazon,
            Microsoft, Adobe, etc.
        </div>
    </div>
    <br>
    <div class="main">
        <h3 style="text-align: right;">text-align: right;</h3>
        <div class="gfg2">
            The course is designed for students as well as working professionals to
            prepare for coding interviews. This course is going to have coding questions
            from school level to the level needed for product based companies like Amazon,
            Microsoft, Adobe, etc.
        </div>
    </div>
    <br>
    <div class="main">
        <h3 style="text-align: center;">text-align: center;</h3>
        <div class="gfg3">
            The course is designed for students as well as working professionals to
            prepare for coding interviews. This course is going to have coding questions
            from school level to the level needed for product based companies like Amazon,
            Microsoft, Adobe, etc.
        </div>
    </div>
    <br>
    <div class="main">
        <h3 style="text-align: justify;">text-align: justify;</h3>
        <div class="gfg4">
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
