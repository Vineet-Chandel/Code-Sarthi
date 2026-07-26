export default {
  topics: [
    {
      id: "introduction",
      title: "Introduction",
      sections: [
        {
          heading: "What is HTML?",
          description: "HTML (HyperText Markup Language) is the standard language for creating and structuring web pages using tags and elements. It defines how content like text, images, and links appear in a browser.\n\n- It is a markup language, not a programming language.\n- This means it annotates text to define how it is structured and displayed by web browsers.\n- It is a static language, meaning it does not inherently provide interactive features but can be combined with CSS for styling and JavaScript for interactivity.",
          language: "html",
          code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <h1>Welcome to My Webpage</h1>
    <p>This is my first paragraph of text!</p>
</body>
</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785039666/23c54eab-1027-4ed7-a259-b77b7d6bcb60.png",
            alt: "HTML Output",
            caption: "Output of the HTML code rendered in a browser.",
          },
        },
        {
          heading: "Working of HTML: Understand Step-by-Step",
          description: "Here, we’ll learn how a simple HTML file is written, saved, opened in a browser, rendered, and finally displayed on the screen along with how CSS and JavaScript enhance it.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040349/b2b28fb2-5200-40e3-8eb4-31315a74336f.png",
            alt: "Working of HTML step by step flowchart",
          },
        },
      ],
    },
    {
      id: "html-editors",
      title: "HTML Editors",
      sections: [
        {
          heading: "What is an HTML Editor?",
          description: "An HTML editor is a software tool used to create and edit HTML code efficiently, often providing features like syntax highlighting, auto-completion, and error detection.\n\nThere are two main types of HTML editors:\n\n- Text-Based Editors: Allow direct coding with features like syntax highlighting and code completion for full control over the webpage structure. Example - Sublime Text, Visual Studio Code, etc.\n- WYSIWYG (What You See Is What You Get) Editors: Offer a graphical interface to design web pages visually, automatically generating the corresponding HTML code. Example - Adobe Dreamweaver, etc.\n\nHTML Editors List\nThere are various free and paid HTML editors available in the market, but in this article, we will be covering some renowned free HTML editors that you can use as a beginner or switch to if you are an experienced developer.",
        },
        {
          heading: "1. Notepad",
          description: "Notepad is a simple text editor that is also used to write HTML code. It is an inbuilt desktop application available in Windows OS.\n\nSteps to Write HTML Code in Text Editor:\n\nStep 1: Open any of the text editors of your choice. Here we are using the Notepad text editor.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040479/6d618fe9-659c-4d54-a980-39e4a4b2e0e7.png",
          },
        },
        {
          heading: "Notepad Step 2",
          description: "Create new file: File->New File or Ctrl+N.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040496/2fc85be9-23f3-4872-ab53-13e467d44998.png",
          },
        },
        {
          heading: "Notepad Step 3",
          description: "Write HTML code in text editor.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040514/db32850e-67b5-4b44-916c-803164201740.png",
          },
        },
        {
          heading: "Notepad Step 4",
          description: "Save the file with a suitable name of your choice and a .html extension.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040525/14d590d4-3895-4d2d-bd1d-62283f292554.png",
          },
        },
        {
          heading: "Notepad Step 5",
          description: "Open the saved HTML file in your favorite browser (double-click on the file, or right-click - and choose \"Open with\").",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040531/3ee9cbdd-e35d-4d00-a058-499facb08a84.png",
          },
        },
        {
          heading: "2. Sublime Text Editor",
          description: "Sublime is a cross-platform code editor tool. It supports all markup languages and is used as an editor for HTML. Similar to the Notepad editor, create a new file and save it with a .html extension to run an HTML file.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040542/1c726926-422e-43f6-bcfe-5a09fc30c854.png",
          },
        },
        {
          heading: "3. Atom",
          description: "Atom is an open-source code editor tool for MAC, Linux, and Windows. We can use Atom to write and edit HTML code. Similar to the Notepad editor, create a new file and save it with a .html extension to run an HTML file.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040557/b5a750d8-26d3-4563-ba18-b0f36e7a5e0b.png",
          },
        },
        {
          heading: "4. Visual Studio Code",
          description: "It is one of the most popular code editors of today's generation. Many companies and software developers prefer this code editor.\n\nStep 1: Open the VS code Editor and Install the Live Server. By clicking the extension button simply search live server on the search bar and download. Live server extension helps to run the code and display output.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040568/72134a22-fccb-4a99-a2c0-868bdfd86d93.png",
          },
        },
        {
          heading: "VS Code Step 2",
          description: "Create a new File and save it with the .html extension and right-click the file and select \"Open with Live Server\".",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785040608/500a7210-c581-4f35-918f-32f32ab788f0.png",
          },
        },
        {
          heading: "HTML Editors Comparison",
          table: {
            headers: ["Editor", "Platform", "Key Features", "Ideal For", "Pros", "Cons"],
            rows: [
              ["Notepad", "Windows", "Basic text editing, lightweight", "Beginners", "Pre-installed, simple to use", "No advanced features like syntax highlighting or debugging"],
              ["VS Code", "Cross-Platform", "Live Server, Extensions, Debugging, Git Integration", "Professionals", "Highly extensible, supports multiple languages, great debugging tools", "Can be resource-heavy for basic tasks"],
              ["Atom", "Cross-Platform", "Open-source, Collaborative Editing, Customizable UI", "Advanced Learners", "Flexible and extensible, integrates well with GitHub", "Slower performance compared to other editors"],
              ["Sublime Text", "Cross-Platform", "Fast, Multi-caret Editing, Syntax Highlighting", "Developers looking for speed", "Lightweight yet powerful, highly customizable", "Paid license for full features"]
            ]
          }
        }
      ],
    },
    {
      id: "html-basics",
      title: "HTML Basics",
      sections: [
        {
          heading: "Introduction to HTML Basics",
          description: "Last Updated : 17 Jul, 2025\n\nHTML (HyperText Markup Language) is the standard markup language used to create and structure web pages.\n\nIt defines the layout of a webpage using elements and tags, allowing for the display of text, images, links, and multimedia content.\nAs the foundation of nearly all websites, HTML is used in over 95% of all web pages today, making it an essential part of modern web development.\nIn this guide, we learn the basics of HTML, which includes HTML tags ( <h1>, <p>, <img>, etc), attributes, elements, and document structure which collectively form a working web page."
        },
        {
          heading: "HTML Basic Document and Structure",
          description: "Every HTML document begins with a document type declaration, setting the foundation for the webpage. This section introduces basic HTML tags that structure the page, such as <head>, <body>, and <title>. Although this is not mandatory, it is a good convention to start the document with the below-mentioned tag.\n\nBelow mentioned are the basic HTML tags that divide the whole page into various parts like head, body, etc.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785041079/254c7734-902f-4a34-bcaa-6e7b2e7052fb.png",
          },
          table: {
            headers: ["Tags", "Descriptions"],
            rows: [
              ["<html>", "Encloses the entire HTML document, serving as the root element for all HTML content."],
              ["<head>", "Contains header information about the webpage, including title, meta tags, and linked stylesheets. It is part of the document's structure but is not displayed on the webpage."],
              ["<title>", "Used within the <head> section to define the title of the HTML document. It appears in the browser tab or window and provides a brief description of the webpage's content."],
              ["<body>", "Encloses the visible content of the webpage, such as text, images, audio, videos, and links. All elements within this tag are displayed on the actual webpage when viewed in a browser."]
            ]
          }
        },
        {
          heading: "Basic HTML Document Example",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" \n          content="width=device-width, initial-scale=1.0">\n    <title>HTML</title>\n</head>\n<body>\n    <!--Contents of the webpage-->\n    <p>GeeksforGeeks is a online study platform</p>\n</body>\n</html>`,
          description: "Code Overview:\n\nThis HTML document defines a basic webpage with a responsive design using <meta> tags, ensuring it adjusts well to different devices.\nThe content includes a paragraph <p> displaying \"GeeksforGeeks is an online study platform,\" and the title \"HTML\" appears in the browser tab."
        },
        {
          heading: "HTML Headings",
          description: "The HTML heading tags are used to create headings for the content of a webpage. These tags are typically placed inside the body tag. HTML offers six heading tags, from <h1> to <h6>, each displaying the heading in a different font size.",
          language: "html",
          code: `<h1></h1>\n<h2></h2>\n<h3></h3>\n<h4></h4>\n<h5></h5>\n<h6></h6>`
        },
        {
          heading: "Headings Example",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" \n          content="width=device-width, initial-scale=1.0">\n    <title>HTML</title>\n</head>\n<body>\n      <h1>Heading 1 (h1)</h1>\n      <h2>Heading 2 (h2)</h2>\n      <h3>Heading 3 (h3)</h3>\n      <h4>Heading 4 (h4)</h4>\n      <h5>Heading 5 (h5)</h5>\n      <h6>Heading 6 (h6)</h6>\n</body>\n</html>`,
          description: "Code Overview:\n\nThis code displays six headings (<h1> to <h6>) on the webpage, with <h1> being the largest and most prominent and <h6> being the smallest.\nThe headings are used to define text hierarchy and emphasize content based on importance."
        },
        {
          heading: "HTML Paragraph and Break Elements",
          description: "HTML <p> tags are used to write paragraph statements on a webpage. They start with the <p> tag and end with </p>. The HTML <br> tag is used to insert a single line break and does not require a closing tag. In HTML, the break tag is written as <br>.",
          language: "html",
          code: `// for Paragraph\n<p> Content... </p>\n// for Break\n<br>`
        },
        {
          heading: "Paragraph and Break Example",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" \n          content="width=device-width, initial-scale=1.0">\n    <title>HTML</title>\n</head>\n<body>\n      <p>\n            HTML stands for HyperText Markup Language.<br>\n            It is used to design web pages using a markup\n            language.<br>HTML is a combination of Hypertext\n            and Markup language.<br>Hypertext defines the\n            link between web pages.<br>A markup language\n            is used to define the text document within the\n            tag which defines the structure of web pages.\n      </p>\n</body>\n</html>`,
          description: "Code Overview:\n\nThis HTML code uses a <p> tag to display a paragraph of text, providing an overview of what HTML is and its purpose.\nThe <br> tags are used to insert line breaks, making the text more readable by separating each sentence onto a new line within the paragraph."
        },
        {
          heading: "HTML Horizontal Line",
          description: "The HTML <hr> tag is used to divide a page into sections by creating a horizontal line that spans from the left to the right side of the page. This is an empty tag and does not require a closing tag or any additional attributes.",
          language: "html",
          code: `<hr>`
        },
        {
          heading: "Horizontal Line Example",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" \n          content="width=device-width, initial-scale=1.0">\n    <title>HTML</title>\n</head>\n<body>\n    <p>\n        A Computer Science portal for geeks<br>\n        A Computer Science portal for geeks<br>\n        A Computer Science portal for geeks<br>\n    </p>\n    <hr>\n    <p>\n        A Computer Science portal for geeks<br>\n        A Computer Science portal for geeks<br>\n        A Computer Science portal for geeks<br>\n    </p>\n    <hr>\n    <p>\n        A Computer Science portal for geeks<br>\n        A Computer Science portal for geeks<br>\n        A Computer Science portal for geeks<br>\n    </p>\n    <hr>\n</body>\n</html>`,
          description: "Code Overview:\n\n<h1> to <h6> tags are used to define headings, with <h1> being the largest and <h6> the smallest.\nEach tag displays \"Hello World!\" in decreasing font sizes, illustrating the hierarchy of headings in HTML."
        },
        {
          heading: "HTML Comments",
          description: "HTML comments are annotations in your code that are not displayed in the browser. They are enclosed within <!-- and --> tags and are primarily used for documentation, explanation, or temporarily disabling code during debugging.\n\nSyntax of HTML Comments\nSingle-line & Multi-line comment:",
          language: "html",
          code: `<!-- This is a single-line comment -->\n\n<!--\nThis is a multi-line comment\nspanning multiple lines\n-->`
        },
        {
          heading: "Comments Example",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" \n          content="width=device-width, initial-scale=1.0">\n    <title>HTML</title>\n</head>\n<body>\n    <!-- This is a heading tag -->\n    <h1>Welcome to GeeksforGeeks</h1>\n    <!-- This is a paragraph tag -->\n    <p>Learn HTML, CSS, and JavaScript here.</p>\n  </body>\n</html>`,
          description: "In this example, the comments provide context about the purpose of each HTML element.\n\nBest Practices for Using HTML Comments\n- Be concise and relevant: Write comments that explain the \"why\" behind the code in a brief and clear manner.\n- Avoid over-commenting: Do not state the obvious. Let the code itself explain when possible.\n- Keep comments up-to-date: Ensure comments reflect changes in the code to avoid confusion."
        },
        {
          heading: "HTML Images",
          description: "The <img> tag is used to insert an image into a webpage. The source of the image is specified within the src attribute, like this: <img src=\"source_of_image\">.\n\nThis HTML code uses the <img> tag to display an image on a webpage.\nThe src attribute specifies the URL of the image, which is loaded and displayed when the page is rendered in the browser.",
          language: "html",
          code: `<img src="geeks.png">`
        },
        {
          heading: "View HTML Source Code",
          description: "While checking a web page, you might want to see the HTML code behind it. Here we will see how you can view HTML source code for the entire page or a specific element.\n\n1. View HTML Source Code of Entire Page\nTo view the source code of a webpage press ctrl + u on the page, or right-click on the page and select the \"view page source\" option.\nThis will open a new tab that shows the HTML source code for that entire page.\n\n2. Inspect an HTML Element on a Page\nTo check the HTML code for a specific element on a page, right-click on the page and select the \"Inspect\" option.\nThis lets you see the HTML and CSS behind that element. You can also try making changes and see the changes."
        },
        {
          heading: "Conclusion",
          description: "Understanding HTML is the first step in becoming a web developer. By learning the basic tags and structure, you can create well-organized and functional web pages. The more you practice and experiment with HTML, the better you'll understand how to create interactive, engaging, and well-optimized websites."
        }
      ],
    },
    {
      id: "html-elements",
      title: "HTML Elements",
      sections: [
        {
          heading: "HTML Elements",
          description: "HTML elements are the basic building blocks of a webpage, defining its structure and content using start tags, content, and end tags.\n\nHTML elements start with an opening tag <tagname> and end with a closing tag </tagname>, and can contain text, attributes, or other nested elements.\nSome elements are self-closing (e.g., <br>, <img>), and browsers use elements to render the page visually.\nProperly nesting elements ensures valid, accessible, and well-structured HTML.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <p>Welcome to CodeSarthi!</p>\n</body>\n</html>`
        },
        {
          heading: "Case Sensitivity",
          description: "HTML tags are not case-sensitive, but using lowercase (e.g., <b>) is recommended for consistency and readability.\n\nHTML tags are not case-sensitive. For example, <B> and <b> both represent bold text.\nHowever, it’s a best practice to use lowercase tags for consistency and readability."
        },
        {
          heading: "Nested HTML Elements",
          description: "Nested HTML elements occur when one element is placed inside another, creating a clear hierarchical structure for proper content organization and display.\n\nNested elements create a parent–child hierarchy, which forms the structure of the DOM.\nProper nesting improves accessibility, helping screen readers interpret content correctly.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body style="text-align:center">\n    <h1>GeeksforGeeks</h1>\n    <p>Computer science portal</p>\n</body>\n</html>`
        },
        {
          heading: "Necessary to Add an End Tag",
          description: "It Always include closing tags for non-void HTML elements, as missing tags can cause unexpected browser layout issues.\n\nBrowsers may auto-add missing closing tags.\nThis can lead to unexpected layout issues.\nAlways include closing tags for non-void HTML elements.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Welcome To CodeSarthi</h2>\n    <p>Hi Developer</p>\n</body>\n</html>`
        },
        {
          heading: "HTML Empty Element",
          description: "HTML Elements without any content i.e., that do not print anything are called Empty elements. Empty HTML elements do not have an ending tag. For instance. <br>, <hr>, <link>, <input> etc are HTML elements.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Welcome To CodeSarthi</h2>\n    <br />\n    <p>Hello Developer.</p>\n</body>\n</html>`
        },
        {
          heading: "Block-Level Elements and Inline Elements",
          description: "In HTML, elements are broadly categorized into two main types based on how they display in the document layout: block-level elements and inline elements."
        },
        {
          heading: "1. Block-Level Elements",
          description: "Block-level elements start on a new line, occupy the full available width, stack vertically, and can contain both block-level and inline elements.\n\nExamples:\n<div>: A general-purpose container for other elements.\n<p>: Defines a paragraph.\n<h1>, <h2>, ..., <h6>: Heading elements of different levels.\n<ol>, <ul>: Ordered and unordered lists.\n<table>: Defines a table.\n<form>: Used for HTML forms to collect user inputs.\n<section>, <article>, <nav>, <aside>, <header>, <footer>: Semantic elements that define areas of a webpage.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <div>\n        <h2>GeeksforGeeks</h2>\n        <p>This content is inside a div.</p>\n    </div>\n    <table border="1">\n        <tr>\n            <th>Name</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>David</td>\n            <td>22</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "2. Inline Elements",
          description: "Inline elements do not start on a new line, take only the width of their content, and are used within block-level elements to add or style content.\n\n<span>: A general-purpose inline container for phrasing content.\n<a>: Creates hyperlinks.\n<img>: Embeds an image.\n<strong>, <b>: Used for strong emphasis and bold text, respectively.\n<em>, <i>: Used for emphasis and italic text, respectively.\n<br>: Inserts a line break within text.\n<input>: Creates interactive controls for forms.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <p>\n        This is a <span>span element</span> used for styling text.\n    </p>\n    <p>\n        <strong>Strong text</strong> and <b>bold text</b> are inline elements.\n        <em>Emphasized text</em> and <i>italic text</i> are also inline.\n    </p>\n    <form>\n        <label>Name:</label>\n        <input type="text" placeholder="Enter your name">\n    </form>\n</body>\n</html>`
        }
      ],
    },
    {
      id: "html-attributes",
      title: "HTML Attributes",
      sections: [
        {
          heading: "HTML Attributes",
          description: "HTML Attributes are special words used within the opening tag of an HTML element. They provide additional information about HTML elements. HTML attributes are used to configure and adjust the element's behaviour, appearance, or functionality in a variety of ways.\n\nEach attribute has a name and a value, formatted as name=\"value\".\nAttributes tell the browser how to render the element or how it should behave during user interactions.\n\nTag :  <img> \nAttribute :  src \nValue of Attribute :  \"https://media.geeksforgeeks.org/wp-content/cdn-uploads/Geek_logi_-low_res.png\" \nPurpose : The  <img>  tag is used for embedding images in an HTML page. The  src  attribute within the  <img>  tag specifies the path to the image file you wish to display. This attribute is crucial as it directs the browser to the image’s location on the internet or a local directory.\nSyntax:",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg" \n style="width:350px; height:auto;">\n</body>\n</html>\n\n<!-- Generic Syntax -->\n<tagname attribute_name="attribute_value"> content... </tagname>`
        },
        {
          heading: "Components of Attribute",
          description: "An HTML attribute consists of two primary components:\n\n1. attribute_name: This is the name of the attribute, which specifies what kind of additional information or property you are defining for the element. Common attribute names include href, src, class, id, etc.\n\n2. attribute_value: The value is assigned to the attribute to define the specific setting or behavior. It is always placed in quotes."
        },
        {
          heading: "Types of HTML Attributes",
          description: "HTML attributes can be broadly categorized based on their function and the type of elements they modify. For example -\n\nGlobal Attributes\nThese attributes can be used with any HTML element (though their effects might vary based on the element):",
          table: {
            headers: ["Attribute", "Description"],
            rows: [
              ["class", "Groups elements and allows styling."],
              ["style", "Inline CSS styles."],
              ["contenteditable", "Determines whether the content within the element is editable."],
              ["role", "Specifies the element’s accessibility role."],
              ["tabindex", "Determines the order of focus during keyboard navigation."],
              ["id", "Assigns a unique identifier to an element, allowing targeting with CSS or JavaScript."],
              ["title", "Creates a tooltip that appears when a user hovers over the element."],
              ["lang", "Specifies the language of the element’s content, aiding with translation and accessibility."]
            ]
          }
        },
        {
          heading: "Other Main Types of HTML Attributes",
          description: "Some other main types of HTML attributes are:\n\n- Event Attributes: These define the actions to be taken on specific browser events.\n- Input Attributes: Specific to input elements within <form> tags.\n- Image Attributes: Specific to the <img> element for handling images.\n- Link Attributes: Specific to linking elements like <a> and <link>.\n- Table Attributes: Used with table elements like <table> , <th> , <tr> , and <td>.\n- Style Attributes: Define styles directly on an element.\n- Media Attributes: Related to media elements like <audio> and <video>.\n- Accessibility Attributes: Help improve accessibility, such as alt for images and aria-* attributes.\n- Meta Attributes: Used with meta elements to specify metadata like  charset."
        },
        {
          heading: "Common HTML Attributes",
          description: "Let's take look at some of the most commonly used HTML attributes:"
        },
        {
          heading: "1. HTML alt Attribute",
          description: "The alt attribute in HTML provides alternative text for an image if the image cannot be displayed. It improves accessibility and provides context for screen readers.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n style="width:350px; height:auto;" \n         alt="The Logo"><br>\n</body>\n</html>`
        },
        {
          heading: "2. HTML width and height Attribute",
          description: "The width and height Attribute is used to adjust the width and height of an image(in pixels).",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n         width="300px"\n         height="100px">\n</body>\n</html>`
        },
        {
          heading: "3. HTML id Attribute",
          description: "The id attribute in HTML assigns a unique identifier to an element, allowing it to be targeted by CSS and JavaScript for styling and manipulation purposes.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        #geeks {\n            color: green;\n        }\n    </style>\n</head>\n<body>\n    <h1 id="geeks">Welcome to CodeSarthi</h1>\n</body>\n</html>`
        },
        {
          heading: "4. HTML title Attribute",
          description: "The title attribute is used to explain an element by hovering the mouse over it. The behavior differs with various elements but generally, the value is displayed while loading or hovering the mouse pointer over it.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h3 title="Hello GeeksforGeeks">\n        Hover to see the effect\n    </h3>\n</body>\n</html>`
        },
        {
          heading: "5. HTML href Attribute",
          description: "The href attribute in HTML, used with the <a> tag, specifies a link destination. Clicking the linked text navigates to this address. Adding target=\"_blank\" opens it in a new tab.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <a href="https://www.geeksforgeeks.org/">\n        Click to open in the same tab\n    </a><br>\n    <a href="https://www.geeksforgeeks.org/" \n       target="_blank">\n        Click to open in a different tab\n    </a>\n</body>\n</html>`
        },
        {
          heading: "6. HTML style Attribute",
          description: "The style attribute is used to provide various CSS effects to the HTML elements such as increasing font-size, changing font-family, coloring, etc.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2 style="font-family:Chaparral Pro Light;">\n          Hello GeeksforGeeks.\n      </h2>\n    <h3 style="font-size:20px;">\n          Hello GeeksforGeeks.\n      </h3>\n    <h2 style="color:#8CCEF9;">\n          Hello GeeksforGeeks.\n      </h2>\n    <h2 style="text-align:center;">\n          Hello GeeksforGeeks.\n      </h2>\n</body>\n</html>`
        },
        {
          heading: "7. HTML lang attribute",
          description: "The language is declared with the lang attribute. Declaring a language can be important for accessibility applications and search engines.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <title></title>\n    <style>\n        body {\n            text-align: center;\n        }\n\n        h1 {\n            color: green;\n        }\n\n        .lang-info {\n            font-style: italic;\n        }\n    </style>\n</head>\n<body>\n    <h1>GeeksforGeeks</h1>\n    <h2>lang attribute</h2>\n    <p lang="en">\n        A computer science portal for geeks\n    </p>\n    <p lang="fr" class="lang-info">\n        A computer science portal for geeks\n    </p>\n    <p lang="es" class="lang-info">\n        A computer science portal for geeks\n    </p>\n</body>\n</html>`
        },
        {
          heading: "Important Points About HTML Attributes",
          description: "1. Always Use Lowercase Attributes:\nYou can use either uppercase or lowercase letters for defining attributes.\nFor example, both alt and ALT in an <img> tag are valid. However, it is recommended to use lowercase attributes as per W3C guidelines for consistency and better readability.\n\n2. Always Quote Attribute Values:\nThe HTML standard does not require quotes around attribute values in certain situations.\nHowever, W3C recommends always using quotes for attribute values, and quotes are mandatory for stricter document types like XHTML.\nUsing quotes helps avoid errors, especially when the attribute value contains spaces or special characters.\n\n3. Declare Quote as an Attribute Value:\nYou can use either single (') or double (\") quotes for attribute values in HTML, but it is essential to be consistent throughout your document.\nIf the attribute value contains a double quote, then use single quotes to enclose it, and vice versa.For simplicity, it is a good practice to consistently use double quotes, as it aligns with the convention used in many HTML examples and tutorials.",
          language: "html",
          code: `<input type="text" placeholder='Enter your "username" here'>`
        },
        {
          heading: "4. Boolean Attributes Should Be Written Without Values",
          description: "In this example, the attribute value itself contains double quotes (\"username\"), so the entire value is enclosed within single quotes to avoid confusion.\n\nBoolean attributes do not require a value. If the attribute is present, it is considered true.\nFor example, the checked attribute of an <input> element is correctly written as:\n\nWriting checked=\"checked\" also works, but it is redundant. Simply including the attribute is enough to represent a true state.",
          language: "html",
          code: `<input type="checkbox" checked>`
        },
        {
          heading: "5. Proper Attribute Order for Readability",
          description: "Although HTML does not enforce an order for attributes, following a consistent order improves readability and maintainability.\nIt is common practice to order attributes like this: id, class, other global attributes, specific attributes, and finally, event attributes.",
          language: "html",
          code: `<button id="btn1" class="button-class" type="submit" onclick="handleClick()">Submit</button>`
        },
        {
          heading: "6. Avoid Deprecated Attributes",
          description: "Certain HTML attributes, such as align, bgcolor, and border, are considered deprecated.\nIt is better to use CSS for styling instead of outdated attributes.",
          language: "html",
          code: `<p style="text-align: center;">This text is centered.</p>`
        }
      ],
    },
    {
      id: "html-headings",
      title: "HTML Headings",
      sections: [
        {
          heading: "HTML Headings",
          description: "HTML headings are used to define the titles and subtitles of sections on a webpage. They help organize the content and create a structure that is easy to navigate.\n\nProper use of headings enhances readability by organizing content into clear sections.\nSearch engines use headings to understand page structure, which helps with SEO.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <h1>This is the Main Heading</h1>\n\t<h2>This is a Subheading</h2>\n\t<h3>This is a Smaller Subheading</h3>\n\t<h4>This is a Sub-Subheading</h4>\n\t<h5>This is a Minor Subheading</h5>\n\t<h6>This is the Smallest Heading</h6>\n</body>\n</html>`
        },
        {
          heading: "Code Overview",
          description: "This code uses HTML heading tags (<h1> to <h6>) to create headings that range from the main heading to the smallest subheading.\nEach tag shoes the hierarchy of the content, helping organize the structure of the webpage.\nNote: HTML tags are not case-sensitive, but lowercase is recommended for consistency."
        },
        {
          heading: "Levels of HTML Heading Tags",
          description: "HTML offers six levels of heading tags, each serving a different purpose in structuring your content:"
        },
        {
          heading: "<h1> – Main Heading (Largest)",
          description: "<h1> defines the main heading of a page, highlighting its primary topic and improving clarity for users and SEO.\n\n- Represents the primary focus of the page, usually used for the main title.\n- Use only one <h1> tag per page for the best SEO practices.\n- Makes it clear to both users and search engines what the main topic is."
        },
        {
          heading: "<h2> – Subheadings",
          description: "<h2> defines subheadings to organize major sections, with <h3> used for further subsections to maintain a logical content structure.\n\n- Ideal for dividing the content into major sections.\n- If the content has further subsections, use <h3> to create a logical flow."
        },
        {
          heading: "<h3> to <h6> – Smaller Headings",
          description: "<h3> to <h6> are used for smaller headings, creating a clear hierarchy and structure for subsections within the content.\n\n- These heading levels are used for finer subdivisions, gradually decreasing in size and importance.\n- <h3> is used for subsections under <h2>, while <h4> to <h6> are used for additional, less important subdivisions.\n- <h6> defines the least important heading."
        },
        {
          heading: "Customization in HTML Heading Tags",
          description: "Customization in HTML heading tags allows you to change their style, color, font, and alignment using CSS.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <h1>H1 Heading</h1>\n    <!-- With the help of Style attribute you can customize\n           the size of the heading, As done below-->\n    <h1 style="font-size: 50px">H1 with new size.</h1>\n    <!-- Here font-size is the property by which  we can \n           modify the heading. Here we kept it 50px i.e. 50 pixels -->\n</body>\n</html>`
        },
        {
          heading: "Best Practices for Using HTML Headings",
          description: "Use a single <h1> per page, maintain a logical heading hierarchy, keep headings descriptive, and avoid using them solely for styling.\n\n- Use Only One <h1> per Page: The <h1> tag should be reserved for the main title of the page. Too many <h1> tags can confuse both users and search engines about the content’s priority.\n- Maintain a Logical Structure: Follow a logical hierarchy of headings (<h1> → <h2> → <h3>) to ensure content is organized. Don't jump directly from <h1> to <h4>, as it can make the content harder to navigate.\n- Keep Headings Descriptive: Headings should clearly describe the content that follows. This makes it easier for readers to understand what each section is about.\n- Avoid Overusing Heading Tags: Headings are for organizing content, not for styling text. Use them where appropriate and avoid using heading tags for emphasis or styling alone."
        }
      ],
    },
    {
      id: "html-paragraphs",
      title: "HTML Paragraphs",
      sections: [
        {
          heading: "HTML Paragraphs",
          description: "A paragraph in HTML is simply a block of text enclosed within the <p> tag. The <p> tag helps divide content into manageable, readable sections. It’s the go-to element for wrapping text in a web page that is meant to be displayed as a distinct paragraph.\n\n- Adds space before and after the paragraph to visually separate it from other content.\n- Breaks the text into a single block, creating an easy-to-read section.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n    <body>\n        <p>A Computer Science portal for geeks.</p>\n        <p>It contains well written, well thought articles.</p>\n    </body>\n</html>`
        },
        {
          heading: "Properties of the paragraph Tag",
          description: "The browser reduces multiple spaces added by users to a single space.\nBrowsers ignore extra whitespace (spaces, tabs, line breaks) and render content as a single continuous line.\nBy default, the display of the paragraph element is set to \"block,\" meaning each new paragraph is placed on a new line.\n\nNote: This behaviour can be modified using CSS.\nTo preserve spaces and line breaks, use the <pre> tag, which displays text exactly as written.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <p>\n        This paragraph has multiple lines.\n        But HTML reduces them to a single line,\n        omitting the carriage return we have used.\n    </p>\n    <p>\n        This paragraph has multiple spaces.\n        But HTML reduces them all to a single\n        space, omitting the extra spaces and \n          line we have used.\n    </p>\n</body>\n</html>`
        },
        {
          heading: "The <br> tag",
          description: "The HTML <br> tag element creates a line break, giving you a new line without starting a new paragraph. Use <br> when you want to move to the next line without beginning a whole new paragraph.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <p>\n        This paragraph has multiple\n        <br />lines. But HTML reduces them\n        <br />to a single line, omitting\n        <br />the carriage return we have used.\n    </p>\n</body>\n</html>`
        },
        {
          heading: "The Horizontal Rules <hr> tag",
          description: "The HTML <hr> tag is used to create a horizontal rule or line, visually separating content on a webpage. Use <hr> when you want to insert a horizontal line to signify a division between sections or elements, providing a clear visual break in the page.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <h1>Welcome to My Website</h1>\n    <p>\n        GeeksforGeeks is a leading\n        platform that provides computer\n        science resources and coding challenges\n    </p>\n    <hr>\n    <p>\n        CodeSarthi is a leading platform\n        that provides computer science resources\n        and coding challenges\n    </p>\n</body>\n</html>`
        },
        {
          heading: "Align attribute",
          description: "The <p> tag specifically supports the alignment attribute and allows us to align our paragraphs in left, right, or center alignment.\n\nSyntax:\n<p align=\"value\">\n\nNote: The align attribute is deprecated in HTML5, and styles should be used via CSS for better practices.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <p align="center">Welcome CodeSarthi</p>\n    <p align="left">An Ecosystem  for Developers.</p>\n    <p align="right">It contains well written, well thought articles.</p>\n</body>\n</html>`
        },
        {
          heading: "Avoiding Common Mistakes with Paragraphs",
          description: "- Avoid Nested Paragraphs: You cannot nest paragraphs within one another. Each <p> tag should contain only the text for one block of content.\n- Avoid Using <p> for Non-Textual Content: The <p> tag is meant for text-based content. If you need to wrap images, tables, or other elements, use appropriate tags like <img>, <table>, or <div>."
        }
      ],
    },
    {
      id: "html-text-formatting",
      title: "HTML Text Formatting",
      sections: [
        {
          heading: "HTML Text Formatting",
          description: "HTML text formatting refers to the use of specific HTML tags to modify the appearance and structure of text on a webpage. It allows you to style text in different ways, such as making it bold, italic, underlined, highlighted, or struck-through."
        },
        {
          heading: "Categories of HTML Text Formatting",
          description: "HTML text formatting can be divided into two main categories: Logical Tags and Physical Tags.\n\n1. Logical Tags\nLogical tags convey the meaning or importance of the text without necessarily altering its visual appearance. These tags help browsers, search engines, and assistive technologies understand the purpose of the text.\n\n- <em>: Emphasizes text, typically rendered in italics. It implies that the text carries special importance or requires emphasis.\n- <strong>: Marks text as important, often displayed in bold. It implies the content is of strong importance.\n\n2. Physical Tags\nPhysical tags directly affect how text looks on the webpage by changing the font, size, or style.\n\n- <b>: Displays text in bold without implying importance.\n- <i>: Italicizes text without any implied emphasis."
        },
        {
          heading: "Common HTML Text Formatting Tags",
          description: "Here’s a list of commonly used HTML text formatting tags and their description:",
          table: {
            headers: ["Tags", "Description"],
            rows: [
              ["<i>", "Showcases italicized text."],
              ["<small>", "Renders text in a smaller font size."],
              ["<ins>", "Highlights added or inserted text."],
              ["<sub>", "Creates subscript text."],
              ["<strong>", "Emphasizes text with importance, often in bold."],
              ["<b>", "Displays text in a bold format."],
              ["<mark>", "Accentuates text with a background highlight."],
              ["<del>", "Strikes through text to signify deletion."],
              ["<em>", "Adds emphasis to text, commonly styled as italic."],
              ["<sup>", "Formats text as superscript."]
            ]
          }
        },
        {
          heading: "1. <i> – Italicizes text",
          description: "Use the <i> tag to display text in italics without implying emphasis.",
          language: "html",
          code: `<i>This is italic text.</i>`
        },
        {
          heading: "2. <small> – Reduces the font size of the text",
          description: "The <small> tag renders text in a smaller font than the surrounding text.",
          language: "html",
          code: `<small>This text is smaller than the rest.</small>`
        },
        {
          heading: "3. <ins> – Highlights inserted text",
          description: "The <ins> tag marks text as newly added or inserted, often displayed with an underline.",
          language: "html",
          code: `<ins>This is inserted text.</ins>`
        },
        {
          heading: "4. <sub> – Displays subscript text",
          description: "Use the <sub> tag for subscripted text, often used in chemical formulas or footnotes.",
          language: "html",
          code: `H<sub>2</sub>O`
        },
        {
          heading: "5. <strong> – Emphasizes important text, often rendered in bold",
          description: "The <strong> tag is semantically meaningful and indicates that the text is of high importance.",
          language: "html",
          code: `<strong>This text is bold and important.</strong>`
        },
        {
          heading: "6. <b> – Makes text bold",
          description: "The <b> tag visually makes the text bold but does not imply any special significance.",
          language: "html",
          code: `<b>This is bold text.</b>`
        },
        {
          heading: "7. <mark> – Highlights text with a background color",
          description: "The <mark> tag highlights text with a background color, similar to using a highlighter on paper.",
          language: "html",
          code: `<mark>This text is highlighted.</mark>`
        },
        {
          heading: "8. <del> – Strikes through text",
          description: "The <del> tag is used to show that text has been deleted or is no longer relevant.",
          language: "html",
          code: `<del>This text is crossed out.</del>`
        },
        {
          heading: "9. <em> – Emphasizes text, typically italicized",
          description: "The <em> tag is used for emphasized text and is usually rendered in italics to highlight importance.",
          language: "html",
          code: `<em>This text is emphasized.</em>`
        },
        {
          heading: "10. <sup> – Displays superscript text",
          description: "Use the <sup> tag to show superscripted text, commonly used in exponents or footnotes.",
          language: "html",
          code: `E = mc<sup>2</sup>`
        },
        {
          heading: "Example 1: Basic Text Formatting",
          description: "In this example we demonstrates various text formatting tags: <strong> for important and bold text, <em> for emphasized and italic text, <b> for bold text, <i> for italic text, and <mark> for highlighted text.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <title>Text Formatting Example</title>\n</head>\n\n<body>\n    <p>\n        <strong>Strong:</strong> \n        This text is important and bold.\n    </p>\n    <p>\n        <em>Emphasized:</em> \n        This text is emphasized and italic.\n    </p>\n    <p>\n        <b>Bold:</b> \n        This text is bold.\n    </p>\n    <p>\n        <i>Italic:</i> \n        This text is italic.\n    </p>\n    <p>\n        <mark>Marked:</mark> \n        This text is highlighted.\n    </p>\n</body>\n\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785042983/eed027d6-cd11-4db0-a341-03fec8329ca8.png"
          }
        },
        {
          heading: "Example 2: Combining Logical and Physical Tags",
          description: "This example shows how logical and physical tags can be combined for enhanced text formatting:",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785043020/3bb658c1-e760-47b5-ac71-a9003bfc5022.png"
          }
        }
      ],
    },
    {
      id: "html-block-and-inline-elements",
      title: "HTML Block and Inline Elements",
      sections: [
        {
          heading: "HTML Block and Inline Elements",
          description: "HTML elements are either block-level, which structure the layout and span full width (like <div> or <p>), or inline, which styles content within blocks without breaking the flow (like <span> or <a>). This distinction covers 80–90% of common HTML usage.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785043081/cd40ac58-334d-4867-a0ef-3d434cd09466.png"
          }
        },
        {
          heading: "Example of Block vs Inline",
          description: "Example: Here, we illustrate the use of the block-level element(Div) and the inline element(<a>).\n\nCode Overview:\nIn the above example, we have used the <div> tag that always starts in a new line & captures the full width available. We have also used the inline element anchor tag <a> that is used to provide a link to a text that doesn't start in a new line & captures only the space around the element.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n  <body>\n    <div>GeeksforGeeks</div>\n    Checkout the GeeksforGeeks\n    <a href="www.youtube.com" alt="GeeksforGeeks youtube"> official </a>\n    youtube for the videoes on various courses.\n  </body>\n</html>`
        },
        {
          heading: "HTML Block Elements",
          description: "A block-level element always starts on a new line and stretches out to the left and right as far as it can i.e, it occupies the whole horizontal space of its parent element & the height is equal to the content's height.\n\nCommon block-level elements:\n<address>, <blockquote>, <dd>, <div>, <dl>, <dt>, <canvas>, <form>, <h1>-<h6>, <hr>, <li>, <main>, <nav>, <noscript>, <ol>, <pre>, <section>, <tfoot>, <ul>, <table>, <p>, <video>, <aside>, <article>, <figcaption>, <fieldset>, <figure>, <footer>, <header>"
        },
        {
          heading: "div element",
          description: "The <div> element is used as a container for other HTML elements. It has no required attributes. Style, class, and id are the commonly used attributes.\n\nSyntax:\n<div>GFG</div>\n\nExample: The below code illustrates the implementation of <div> tag.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title>Block-level Element</title>\n</head>\n<body>\n    <div>\n        <h1>CodeSarthi</h1>\n        <h3>An Ecosystem of the developers</h3>\n      \n    </div>\n</body>\n</html>`
        },
        {
          heading: "Inline Elements",
          description: "An inline element is the opposite of the block-level element. It does not start on a new line and takes up only the necessary width ie., it only occupies the space bounded by the tags defining the HTML element, instead of breaking the flow of the content.\n\nCommon inline elements:\n<br>, <button>, <time>, <tt>, <var>, <a>, <abbr>, <acronym>, <b>, <cite>, <code>, <dfn>, <em>, <i>, <output>, <q>, <samp>, <script>, <select>, <small>, <span>, <strong>, <sub>, <sup>, <textarea>, <bdo>, <big>, <img>, <input>, <kbd>, <label>, <map>, <object>"
        },
        {
          heading: "span element",
          description: "The <span> tag is used as a container for text. It has no required attributes. Style, class, and id are the commonly used attributes.\n\nSyntax:\n<span>GFG</span>\n\nExample: The below code illustrates the implementation of <span> tag.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title>HTML span element</title>\n    <style>\n        body {\n            text-align: center;\n        }\n        h1 {\n            color: green;\n        }\n        span {\n            color: white;\n        }\n    </style>\n</head>\n<body>\n    <h1>Do\n        <span> Code as </span>\n        CodeSarthians do\n    </h1>\n</body>\n</html>`
        }
      ],
    },
    {
      id: "html-charsets",
      title: "HTML Charsets",
      sections: [
        {
          heading: "HTML Charsets",
          description: "HTML charsets define how characters are encoded so that text and symbols display correctly across different devices and browsers.\n\n- Character encoding determines how text is represented and interpreted in an HTML document.\n- The <meta> tag with the charset attribute specifies the encoding used by the webpage.\n- Setting a charset ensures proper rendering of special characters and symbols.\n- UTF-8 is the most commonly used charset as it supports multiple languages and symbols."
        },
        {
          heading: "Common Character Encodings",
          description: "Common character encodings define how text and symbols are represented for consistent display across devices and browsers.\n\n1. ASCII\nThe American Standard Code for Information Interchange (ANSII) created this character encoding. This character encoding is used in C/C++ programming. It has 128 alphanumeric characters consisting of alphabets(A-Z) and (a-z) and some special symbols like + - * / ( ) @ etc.\n\n2. ANSI (Windows-1252)\nAmerican National Standards Institute (ANSI) created character encoding supported 256 characters. It is used as the default character set in Microsoft Windows.\n\n3. ISO-8859-1\nIt is used as the default character set of HTML4 and also supports 256 characters. The International Standards Organization (ISO) defines the standard character sets for different alphabets/languages. It contains numbers, upper and lowercase English letters, and some special characters.\n\n4. UTF-8\nUTF-8 and UTF-16 standards was developed by Unicode Consortium, because the ISO-8859 character-sets are limited, and not compatible a multilingual environment. It consists all the character and punctuation symbols."
        },
        {
          heading: "Attribute",
          description: "Web browser must know the character encoding standard used in the html page and this we do as given below.\n\nNote:\nThe first values from 0 to 127 are considered as the \"Standard\" ASCII character set.\nCharacters with values from 128 to 255 are the \"Extended\" Character set.",
          language: "html",
          code: `<!-- HTML 4 -->\n<meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-1">\n\n<!-- HTML 5 -->\n<meta charset="UTF-8">`
        },
        {
          heading: "Significance of Character Encoding",
          description: "Character encoding ensures that text is correctly displayed and interpreted across different devices, browsers, and platforms, allowing consistent communication of letters, symbols, and special characters.\n\n- Consistency: Encoding defines how text, numbers, and symbols are interpreted, ensuring that content appears correctly regardless of the user's device or browser.\n- Global Compatibility: Without proper encoding, characters in different languages or special symbols may display as unreadable or incorrect.\n- Web Development: By specifying the charset, you avoid issues with rendering characters and improve your site’s accessibility across diverse languages"
        },
        {
          heading: "Table 1 (ASCII Device Control Characters)",
          description: "This table contains Characters which are designed to control hardware devices. These are also known as control characters.",
          table: {
            headers: ["Numbers", "Characters", "Descriptions"],
            rows: [
              ["00", "NUL", "null character"],
              ["01", "SOH", "start of header"],
              ["02", "STX", "start of text"],
              ["03", "ETX", "end of text"],
              ["04", "EOT", "end of transmission"],
              ["05", "ENQ", "enquiry"],
              ["06", "ACK", "acknowledge"],
              ["07", "BEL", "bell(ring)"],
              ["08", "BS", "backspace"],
              ["09", "HT", "horizontal tab"],
              ["10", "LF", "line feed"],
              ["11", "VT", "vertical tab"],
              ["12", "FF", "form feed"],
              ["13", "CR", "carriage return"],
              ["14", "SO", "shift out"],
              ["15", "SI", "shift in"],
              ["16", "DLE", "data link escape"],
              ["17", "DC1", "device contyrol 1"],
              ["18", "DC2", "device contyrol 2"],
              ["19", "DC3", "device contyrol 3"],
              ["20", "DC4", "device contyrol 4"],
              ["21", "NAK", "negative acknowledge"],
              ["22", "SYN", "synchronize"],
              ["23", "ETB", "end transmission block"],
              ["24", "CAN", "cancel"],
              ["25", "EM", "end of medium"],
              ["26", "SUB", "substitute"],
              ["27", "ESC", "escape"],
              ["28", "FS", "file separator"],
              ["29", "GS", "group separator"],
              ["30", "RS", "record separator"],
              ["31", "US", "unit separator"],
              ["127", "DEL", "delete"]
            ]
          }
        },
        {
          heading: "Table 2: Standard Ascii",
          description: "This table contains characters having the same numbers assigned in different character encoding.",
          table: {
            headers: ["NUMBER", "Characters", "Description"],
            rows: [
              ["32", " ", "Space"],
              ["33", "!", "Exclamation Mark"],
              ["34", "\"", "Quotation Mark"],
              ["35", "#", "Hash Sign"],
              ["36", "$", "Dollar Sign"],
              ["37", "%", "Percent Sign"],
              ["38", "&", "Ampersand Sign"],
              ["39", "'", "Apostrophe Sign"],
              ["40", "(", "Opening Paranthesis"],
              ["41", ")", "Closing Parenthesis"],
              ["42", "*", "Asterisk Sign"],
              ["43", "+", "Plus Sign"],
              ["44", ",", "Comma"],
              ["45", "-", "Hyphen/minus Sign"],
              ["46", ".", "Full-stop"],
              ["47", "/", "Slash/Divide Sign"],
              ["48", "0", "Number Zero"],
              ["49", "1", "Number One"],
              ["50", "2", "Number Two"],
              ["51", "3", "Number Three"],
              ["52", "4", "Number Four"],
              ["53", "5", "Number Five"],
              ["54", "6", "Number Six"],
              ["55", "7", "Number Seven"],
              ["56", "8", "Number Eight"],
              ["57", "9", "Number Nine"],
              ["58", ":", "Colon"],
              ["59", ";", "Semicolon"],
              ["60", "<", "Lessthan Sign"],
              ["61", "=", "Equalto Sign"],
              ["62", ">", "Greaterthan Sign"],
              ["63", "?", "Question Mark"],
              ["64", "@", "at Sign"],
              ["65", "A", "Letter A"],
              ["66", "B", "Letter B"],
              ["67", "C", "Letter C"],
              ["68", "D", "Letter D"],
              ["69", "E", "Letter E"],
              ["70", "F", "Letter F"],
              ["71", "G", "Letter G"],
              ["72", "H", "Letter H"],
              ["73", "I", "Letter I"],
              ["74", "J", "Letter J"],
              ["75", "K", "Letter K"],
              ["76", "L", "Letter L"],
              ["77", "M", "Letter M"],
              ["78", "N", "Letter N"],
              ["79", "O", "Letter O"],
              ["80", "P", "Letter P"],
              ["81", "Q", "Letter Q"],
              ["82", "R", "Letter R"],
              ["83", "S", "Letter S"],
              ["84", "T", "Letter T"],
              ["85", "U", "Letter U"],
              ["86", "V", "Letter V"],
              ["87", "W", "Letter W"],
              ["88", "X", "Letter X"],
              ["89", "Y", "Letter Y"],
              ["90", "Z", "Letter Z"],
              ["91", "[", "Opening Square Bracket"],
              ["92", "\\\\", "Backslash"],
              ["93", "]", "Closing Square Bracket"],
              ["94", "^", "Circumflex Accent"],
              ["95", "_", "Low Line"],
              ["96", "`", "Grave Accent"],
              ["97", "a", "Letter a"],
              ["98", "b", "Letter b"],
              ["99", "c", "Letter c"],
              ["100", "d", "Letter d"],
              ["101", "e", "Letter e"],
              ["102", "f", "Letter f"],
              ["103", "g", "Letter g"],
              ["104", "h", "Letter h"],
              ["105", "i", "Letter i"],
              ["106", "j", "Letter j"],
              ["107", "k", "Letter k"],
              ["108", "l", "Letter l"],
              ["109", "m", "Letter m"],
              ["110", "n", "Letter n"],
              ["111", "o", "Letter o"],
              ["112", "p", "Letter p"],
              ["113", "q", "Letter q"],
              ["114", "r", "Letter r"],
              ["115", "s", "Letter s"],
              ["116", "t", "Letter t"],
              ["117", "u", "Letter u"],
              ["118", "v", "Letter v"],
              ["119", "w", "Letter w"],
              ["120", "x", "Letter x"],
              ["121", "y", "Letter y"],
              ["122", "z", "Letter z"],
              ["123", "{", "Opening Curly Bracket"],
              ["124", "|", "Vertical Line"],
              ["125", "}", "Closing Curly Bracket"],
              ["126", "~", "Tilde"],
              ["127", "DEL", "delete"]
            ]
          }
        },
        {
          heading: "Table 3: Extended Charset",
          description: "This table contains character having different character encoding.",
          table: {
            headers: ["Numbers", "Description"],
            rows: [
              ["128", "€"],
              ["129", "not used"],
              ["130", "‚"],
              ["131", "ƒ"],
              ["132", "„"],
              ["133", "…"],
              ["134", "†"],
              ["135", "‡"],
              ["136", "ˆ"],
              ["137", "‰"],
              ["138", "Š"],
              ["139", "‹"],
              ["140", "Œ"],
              ["141", "Not Used"],
              ["142", "Ž"],
              ["143", "Not Used"],
              ["144", "Not Used"],
              ["145", "‘"],
              ["146", "’"],
              ["147", "“"],
              ["148", "”"],
              ["149", "•"],
              ["150", "–"],
              ["151", "—"],
              ["152", "˜"],
              ["153", "™"],
              ["154", "š"],
              ["155", "›"],
              ["156", "œ"],
              ["157", "Not Used"],
              ["158", "ž"],
              ["159", "Ÿ"],
              ["160", "no-break Space"],
              ["161", "¡"],
              ["162", "¢"],
              ["163", "£"],
              ["164", "¤"],
              ["165", "¥"],
              ["166", "¦"],
              ["167", "§"],
              ["168", "¨"],
              ["169", "©"],
              ["170", "ª"],
              ["171", "«"],
              ["172", "¬"],
              ["173", ""],
              ["174", "®"],
              ["175", "¯"],
              ["176", "°"],
              ["177", "±"],
              ["178", "²"],
              ["179", "³"],
              ["180", "´"],
              ["181", "µ"],
              ["182", "¶"],
              ["183", "·"],
              ["184", "¸"],
              ["185", "¹"],
              ["186", "º"],
              ["187", "»"],
              ["188", "¼"],
              ["189", "½"],
              ["190", "¾"],
              ["191", "¿"],
              ["192", "À"],
              ["193", "Á"],
              ["194", "Â"],
              ["195", "Ã"],
              ["196", "Ä"],
              ["197", "Å"],
              ["198", "Æ"],
              ["199", "Ç"],
              ["200", "È"],
              ["201", "É"],
              ["202", "Ê"],
              ["203", "Ë"],
              ["204", "Ì"],
              ["205", "Í"],
              ["206", "Î"],
              ["207", "Ï"],
              ["208", "Ð"],
              ["209", "Ñ"],
              ["210", "Ò"],
              ["211", "Ó"],
              ["212", "Ô"],
              ["213", "Õ"],
              ["214", "Ö"],
              ["215", "×"],
              ["216", "Ø"],
              ["217", "Ù"],
              ["218", "Ú"],
              ["219", "Û"],
              ["220", "Ü"],
              ["221", "Ý"],
              ["222", "Þ"],
              ["223", "ß"],
              ["224", "à"],
              ["225", "á"],
              ["226", "â"],
              ["227", "ã"],
              ["228", "ä"],
              ["229", "å"],
              ["230", "æ"],
              ["231", "ç"],
              ["232", "è"],
              ["233", "é"],
              ["234", "ê"],
              ["235", "ë"],
              ["236", "ì"],
              ["237", "í"],
              ["238", "î"],
              ["239", "ï"],
              ["240", "ð"],
              ["241", "ñ"],
              ["242", "ò"],
              ["243", "ó"],
              ["244", "ô"],
              ["245", "õ"],
              ["246", "ö"],
              ["247", "÷"],
              ["248", "ø"],
              ["249", "ù"],
              ["250", "ú"],
              ["251", "û"],
              ["252", "ü"],
              ["253", "ý"],
              ["254", "þ"],
              ["255", "ÿ"]
            ]
          }
        }
      ],
    },
    {
      id: "html-lists",
      title: "HTML Lists",
      sections: [
        {
          heading: "HTML Lists",
          description: "An HTML list organizes content into ordered or unordered formats, making information clear and easy to read.\n\n- HTML lists organize content using tags like <ul>, <ol> & <li>.\n- They improve readability by presenting data in a structured format.\n\nSyntax:\n<ul>    \n  <li>Item 1</li>   \n  <li>Item 2</li>  \n  <li>Item 3</li>\n</ul>",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Welcome To CodeSarthi !</h2>\n    <h5>List of available features</h5>\n    <ul>\n        <li>Interaction with world wide developers community</li>\n        <li>Interview  Preperation</li>\n        <li>Resume Builder and analyser</li>\n        <li>Project Manager</li>\n    </ul>\n    <h5>Contacts</h5>\n    <ol>\n        <li>codesarthi.in</li>\n        <li>vineetchandel.in</li>\n        <li>codesarthi.help@gmail.com</li>\n   \n    </ol>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785043687/Screenshot_2026-07-26_at_10.58.00_AM_fvnziw.png"
          }
        },
        {
          heading: "Html Tags",
          description: "HTML (HyperText Markup Language) uses tags to define and structure elements on a webpage. Each tag tells the browser how to display the content - such as text, images, links, or layouts."
        },
        {
          heading: "Types of HTML Lists",
          description: "There are three main types of lists in HTML"
        },
        {
          heading: "1. Unordered List or Bulleted List",
          description: "Unordered lists display items as bulleted points where the order of items does not matter, using the <ul> and <li> tags.\n\n- Unordered lists are ideal for scenarios where the sequence of the items is not important.\n- The unordered list items are marked with bullets, also known as bulleted lists.\n- An unordered list starts with the <ul> tag, and each list item begins with the <li> tag.\n\nAttributes:\n- compact: It will render the list smaller.\n- type: It specifies which kind of marker is used in the list.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head></head>\n<body>\n    <h2>Grocery list</h2>\n    <ul>\n        <li>Bread</li>\n        <li>Eggs</li>\n        <li>Milk</li>\n        <li>Coffee</li>\n    </ul>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785043738/d0f5f59b-e804-4597-8f93-6419a5c12ee3.png"
          }
        },
        {
          heading: "2. HTML Ordered List",
          description: "Ordered lists are used when the items need to follow a specific sequence.\n\nIn an ordered list, all list items are marked with numbers by default. An ordered list starts with the <ol> tag, and each list item begins with the <li> tag.\n\nAttributes:\n- compact: It defines the list should be compacted (compact attribute is not supported in HTML5. Use CSS instead.).\n- reversed: reversed defines that the order will be descending.\n- start: It defines from which number or alphabet the order will start.\n- type: It defines which type(1, A, a, I, and i) of the order you want in your list of numeric, alphabetic, or roman numbers.\n\nSyntax:\n<ol>    \n  <li>Item1</li>    \n  <li>Item2</li>    \n  <li>Item3</li> \n</ol>",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <h1 style="color: green">CodeSarthi</h1>\n    <h3>HTML ol tag</h3>\n    <p>reversed attribute</p>\n    <ol reversed>\n        <li>HTML</li>\n        <li>CSS</li>\n        <li>JS</li>\n    </ol>\n    <p>start attribute</p>\n    <ol start="5">\n        <li>HTML</li>\n        <li>CSS</li>\n        <li>JS</li>\n    </ol>\n    <p>type attribute</p>\n    <ol type="i">\n        <li>HTML</li>\n        <li>CSS</li>\n        <li>JS</li>\n    </ol>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785043807/Screenshot_2026-07-26_at_11.00.01_AM_uoufyn.png"
          }
        },
        {
          heading: "3. HTML Description List",
          description: "A description list is a list of terms, with a description of each term. Description lists are less common but very useful for definitions, glossaries, or any other key-value pairs of items.\n\n- The <dl> tag defines the description list, the <dt> tag defines the term name, and the <dd> tag describes each term.\n- Here, <dt> (description term) is used for the term being defined, and <dd> (description details) is used for the description.\n\nSyntax:\n<dl>\n    <dt>Item 1</dt>\n    <dd>Description of Item 1 </dd>\n    <dt>Item 2</dt>\n    <dd>Description of Item 2</dd>\n</dl>",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>A Description List</h2>\n    <dl> \n        <dt>Coffee</dt>\n        <dd>- 500 gms</dd>\n        <dt>Milk</dt>\n        <dd>- 1 ltr Tetra Pack</dd>\n    </dl>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785043876/7737d19b-bab9-4084-af4f-b311f05c6e44.png"
          }
        }
      ],
    },
    {
      id: "html-ordered-lists",
      title: "HTML Ordered Lists",
      sections: [
        {
          heading: "HTML Ordered Lists",
          description: "HTML ordered lists use the <ol> tag to present items in a defined sequence, ensuring clear and structured display of step-based or ranked content.\n\n- Uses <ol> to create a list with a specific order or sequence.\n- Each item is defined using the <li> tag.\n- Items are automatically numbered or lettered by the browser.\n- Numbering style can be customized using attributes or CSS.\n- Commonly used for instructions, steps, and rankings.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>My To-Do List</h2>\n    <ol>\n        <li>Go grocery shopping</li>\n        <li>Pay utility bills</li>\n        <li>Prepare dinner</li>\n    </ol>\n</body>\n</html>`
        },
        {
          heading: "Syntax",
          description: "Syntax:",
          language: "html",
          code: `<ol>\n    <li>Milks</li>\n    <li>Eggs</li>\n    <li>Breads</li>\n    <li>Butter</li>\n</ol>`
        },
        {
          heading: "Different Type Attributes in HTML Ordered List",
          description: "The type attribute of <ol> tag specifies the order we want to create.\n\n- type=\"1\": This will list the items with numbers (default)\n- type=\"A\": This will list the items in uppercase letters.\n- type=\"a\": This will list the items in lowercase letters.\n- type=\"I\": This will list the items with uppercase Roman numbers.\n- type=\"i\": This will list the items with lowercase Roman numbers."
        },
        {
          heading: "1. Numbered Ordered List",
          description: "To create an ordered list in HTML with numerical markers, which is the default behavior for ordered lists, you simply use the <ol> (ordered list) tag without specifying a type attribute.\n\nExample: Implementation of a default ordered list where items are displayed in numeric sequence.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Ordered List with Numbers</h2>\n    <ol>\n        <li>JavaScript</li>\n        <li>Python</li>\n        <li>Java</li>\n        <li>C++</li>\n        <li>C#</li>\n    </ol>\n</body>\n</html>`
        },
        {
          heading: "2. Uppercase Letters Ordered List",
          description: "To create an ordered list in HTML that uses uppercase letters for the list markers, you can use the type attribute on the <ol> tag and set it to \"A\".\n\nExample: Implementation of an ordered list using the type=\"A\" attribute to display items in uppercase alphabetical order.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Uppercase Letters Ordered List</h2>\n    <ol type="A">\n        <li>Apple</li>\n        <li>Banana</li>\n        <li>Cherry</li>\n        <li>Date</li>\n    </ol>\n</body>\n</html>`
        },
        {
          heading: "3. Lowercase Letters Ordered List",
          description: "To create an ordered list in HTML that uses lowercase letters for the list markers, you can use the type attribute on the <ol> tag and set it to \"a\".\n\nExample: Implementation of an ordered list using the type=\"a\" attribute to display items in lowercase alphabetical order.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Lowercase Letters Ordered List</h2>\n    <ol type="a">\n        <li>RCB</li>\n        <li>CSK</li>\n        <li>DC</li>\n        <li>MI</li>\n    </ol>\n</body>\n</html>`
        },
        {
          heading: "4. Uppercase Roman Numbers Ordered List",
          description: "To create an ordered list in HTML with uppercase Roman numerals as the markers, you can use the type attribute on the <ol> tag and set it to \"I\".\n\nExample: Implementation of an ordered list using the type=\"I\" attribute to display items in uppercase Roman numerals.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2> Uppercase Roman Numbers Ordered List </h2>\n    <ol type="I">\n        <li>First item</li>\n        <li>Second item</li>\n        <li>Third item</li>\n        <li>Fourth item</li>\n    </ol>\n</body>\n</html>`
        },
        {
          heading: "5. Lowercase Roman Numbers Ordered List",
          description: "To create an ordered list in HTML with lowercase Roman numerals as the markers, you can use the type attribute on the <ol> tag and set it to \"i\".\n\nExample: Implementation of an ordered list using the type=\"i\" attribute to display items in lowercase Roman numerals.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n</head>\n<body>\n  <h2>Lowercase Roman Numerals Ordered List</h2>\n  <ol type="i">\n    <li>First item</li>\n    <li>Second item</li>\n    <li>Third item</li>\n    <li>Fourth item</li>\n  </ol>\n</body>\n</html>`
        },
        {
          heading: "6. Reverse Ordered List in HTML",
          description: "To create a reverse-ordered list in HTML, you can use the 'reversed' attribute in the <ol> tag. This will make the list count down from the highest number.\n\nExample: Implementation of an ordered list using the reversed attribute to display items in descending order.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h1>Top 5 Movies to Watch</h1>\n    <ol reversed>\n        <li>The Shawshank Redemption</li>\n        <li>The Godfather</li>\n        <li>Inception</li>\n        <li>Interstellar</li>\n        <li>Pulp Fiction</li>\n    </ol>\n</body>\n</html>`
        },
        {
          heading: "7. Control List Counting",
          description: "To control list counting, use the start attribute in the <ol> tag to set the starting number for the ordered list.\n\nExample: Showcase an ordered list starting from the number 5, controlled by the “start” attribute within the <ol> tag, customizing list counting",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Control List Counting</h2>\n    <ol start="5">\n        <li>Item 5</li>\n        <li>Item 6</li>\n        <li>Item 7</li>\n        <li>Item 8</li>\n    </ol>\n</body>\n</html>`
        },
        {
          heading: "8. Nested Ordered Lists",
          description: "Nested ordered lists use <ol> inside <li> tags to create sublists, making content more organized.\n\nExample: Creating nested ordered list, listing programming languages with their respective frameworks as subitems",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Nested Ordered List</h2>\n    <ol>\n        <li>\n            JavaScript\n            <ol>\n                <li>React</li>\n                <li>Angular</li>\n                <li>Vue.js</li>\n            </ol>\n        </li>\n        <li>\n            Python\n            <ol>\n                <li>Django</li>\n                <li>Flask</li>\n                <li>Pyramid</li>\n            </ol>\n        </li>\n    </ol>\n</body>\n</html>`
        }
      ],
    },
    {
      id: "html-unordered-list",
      title: "HTML Unordered List",
      sections: [
        {
          heading: "HTML Unordered List",
          description: "An HTML unordered list is used to group related items where the order is not important, typically displayed with bullet points.\n\n- Uses <ul> and <li> tags to structure list items\n- Displays items with default bullets (can be styled using CSS)\n- Supports nesting to represent hierarchical data",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>HTML Unordered Lists</h2>\n    <ul>\n        <li>HTML</li>\n        <li>CSS</li>\n        <li>Javascript</li>\n        <li>React</li>\n    </ul>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785044467/870ad1e9-ae43-4705-987d-31242e69eeb0.png"
          }
        },
        {
          heading: "Tags Overview",
          description: "<ul>: This tag defines the unordered list. It tells the browser that the following items are part of a list where the order does not matter.\n<li>: This tag defines each list item. Each <li> represents an individual item in the list.",
          language: "html",
          code: `<ul>    <li>Item 1</li>    <li>Item 2</li></ul>`
        },
        {
          heading: "Unordered Lists Style Types",
          description: "In HTML, unordered lists (<ul>) are used to display items without any specific order, and by default, they show bullet points. However, the appearance of these bullets can be changed using CSS with different styles."
        },
        {
          heading: "1. Square Bullet Style",
          description: "To change the bullets in an unordered list to squares, the list-style-type property in CSS can be set to square.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Square type unordered list</h2>\n    <ul style="list-style-type: square">\n        <li>HTML</li>\n        <li>CSS</li>\n        <li>Javascript</li>\n        <li>React</li>\n    </ul>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785044544/1d606b8a-1716-4cc8-8808-59bd422cc98f.png"
          }
        },
        {
          heading: "2. Circle Bullet Style",
          description: "To change the bullets in an unordered list to circles, the list-style-type property in CSS can be set to circle.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2> Circle type unordered list</h2>\n    <ul style="list-style-type:circle;">\n        <li>HTML</li>\n        <li>CSS</li>\n        <li>Javascript</li>\n        <li>React</li>\n    </ul>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785044585/45efba74-0934-4368-ae42-2c607167ff09.png"
          }
        },
        {
          heading: "3. Removing Bullets",
          description: "To remove the default bullets in an unordered list, the list-style-type property in CSS can be set to none.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>None type unordered list</h2>\n    <ul style="list-style-type:none;">\n        <li>HTML</li>\n        <li>CSS</li>\n        <li>Javascript</li>\n        <li>React</li>\n    </ul>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785044627/4d7f767f-e6a6-44c1-8970-9092bfaa98b1.png"
          }
        },
        {
          heading: "4. Nested Unordered List",
          description: "A nested unordered list is simply an unordered list (<ul>) inside another list item (<li>) of an existing unordered list. This is useful for representing hierarchical or grouped information, like categories and subcategories.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>Nested unordered list</h2>\n    <ul>\n        <li>Geeks</li>\n        <li>\n            Web Development\n            <ul>\n                <li>HTML</li>\n                <li>CSS</li>\n            </ul>\n        </li>\n        <li>Javascript</li>\n    </ul>\n    <ul type="square">\n        <li>HTML</li>\n        <li>CSS</li>\n        <li>Javascript</li>\n    </ul>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785044661/46daed04-1df3-4786-b330-1f82f5016f5e.png"
          }
        },
        {
          heading: "5. Horizontal Unordered List",
          description: "The unordered list may need to be displayed horizontally, such as in a navigation menu. This can be accomplished with the help of CSS.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        body {\n            text-align: center;\n        }\n        ul {\n            overflow: hidden;\n            background-color: #1d6b0d;\n            list-style-type: none;\n        }\n        li {\n            float: left;\n        }\n        li a {\n            text-decoration: none;\n            color: white;\n            padding: 0.5rem;\n        }\n    </style>\n</head>\n<body>\n    <h3>HTML Horizontal Unordered List</h3>\n    <ul>\n        <li><a href="#course">Course</a></li>\n        <li><a href="#Blog">Blogs</a></li>\n        <li>\n            <a href="#Content">Content</a>\n        </li>\n    </ul>\n</body>\n</html>`
        },
        {
          heading: "Using Unordered Lists for Navigation",
          description: "Unordered lists are often used for creating navigation menus on websites. They are great for displaying a list of links where the order of the items doesn’t matter.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        ul {\n            list-style-type: none; \n            padding: 0;\n        }\n        li {\n            display: inline; \n            margin-right: 20px;\n        }\n    </style>\n</head>\n<body>\n    <h1>Website Navigation</h1>\n    <ul>\n        <li><a href="#home">Home</a></li>\n        <li><a href="#about">About</a></li>\n        <li><a href="#services">Services</a></li>\n        <li><a href="#contact">Contact</a></li>\n    </ul>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785044768/34336dd1-2381-45af-818b-b2285f66a823.png"
          }
        }
      ],
    },
    {
      id: "html-description-lists",
      title: "HTML Description Lists",
      sections: [
        {
          heading: "HTML Description Lists",
          description: "An HTML description list is used to represent term-definition or name–value pairs in a structured format. It provides semantic grouping of related data for better readability and accessibility.\n\n- Organizes data in term-description pairs.\n- Improves content clarity and semantic meaning.\n- Enhances accessibility for screen readers.\n- Allows flexible structure with multiple descriptions per term.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>HTML Description Lists</h2>\n    <dl>\n        <dt>HTML</dt>\n        <dd>\n            HyperText Markup Language\n        </dd>\n        <dt>CSS</dt>\n        <dd>\n            Cascading Style Sheets\n        </dd>\n        <dt>JavaScript</dt>\n        <dd>\n           Scripting language for Web pages\n        </dd>\n    </dl>\n</body>\n</html>`
        },
        {
          heading: "Syntax",
          description: "Syntax:",
          language: "html",
          code: `<dl>\n    <dt>Coffee</dt>\n    <dd>A hot drink made from roasted coffee beans.</dd>\n    <dt>Espresso</dt>\n    <dd>Strong coffee brewed with steam through ground beans.</dd>\n</dl>`
        },
        {
          heading: "Nested Description List",
          description: "A nested description list is when we add a description list inside another description list. This allows for organizing related terms and their definitions in a hierarchical structure.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h3>Technology Overview</h3>\n    <dl>\n        <dt>Hardware</dt>\n        <dd>Physical devices</dd>\n        <dd>\n            <dl>\n                <dt>CPUs</dt>\n                <dd>Processors</dd>\n                <dt>GPUs</dt>\n                <dd>Graphics</dd>\n            </dl>\n        </dd>\n        <dt>Software</dt>\n        <dd>Programs/Apps</dd>\n        <dd>\n            <dl> \n                <dt>System</dt>\n                <dd>OS</dd>\n                <dt>Application</dt>\n                <dd>Tools</dd>\n            </dl>\n        </dd>\n    </dl>\n</body>\n</html>`
        },
        {
          heading: "Applications of HTML Description Lists",
          description: "Description lists are ideal for presenting structured term-value data where clear association between labels and explanations is required.\n\n- FAQs: Helps pair questions with their corresponding answers in a clean, readable format.\n- Glossaries: Effectively displays technical terms alongside their definitions for quick reference.\n- Product details: Organizes product attributes like features, pricing, and specifications in a structured way.\n- Technical documentation: Clearly maps parameters, properties, or configurations with their descriptions.\n- Metadata display: Useful for showing key-value information such as author, date, version, etc."
        }
      ],
    },
    {
      id: "html-colors",
      title: "HTML Colors",
      sections: [
        {
          heading: "HTML Colors",
          description: "HTML Colors can be applied to text, backgrounds, borders, links, forms, tables, etc. This article provides an in-depth look at how colors can be applied to various elements such as text, backgrounds, borders, links, forms, and tables in HTML. We will explore different color formats including hexadecimal, RGB, RGBA, HSL, and named colors, offering you precise control over the color presentation on your web pages."
        },
        {
          heading: "HTML Colors Name",
          description: "HTML color names offer a user-friendly way to specify colors. From classic colors like Red, Green, Blue, Pink, Purple, Sky Blue, Gray, and Orange, to more exotic shades, HTML provides a wide palette for web designers. Whether you’re designing a serene theme or a vibrant layout, HTML color names have got you covered.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785044983/Screenshot_2026-07-26_at_11.18.53_AM_j3q4xo.png"
          }
        },
        {
          heading: "HTML Color Usage",
          table: {
            headers: ["Usage", "Descriptions", "Syntax"],
            rows: [
              ["Background Color", "HTML Background Color is the shade that appears behind the content on a webpage. The background covers the total size of the element with padding and border but excludes the margin. It makes the text so easy to read for the user.", `<div style="background-color: magenta;">\nDiv with magenta background\n</div>`],
              ["Text Color", "Text color in HTML specifies the color of the text content, similar to font color.", `<p style="color: pink;">\nPink color is used\n</p>`],
              ["Border Color", "HTML Border Color refers to the color of borders around elements like <div>, <img>, etc. It defines the color of the border lines.", `<div style="border: 1px solid black; border-color: green;">\nThis div has a green border\n</div>`],
              ["Link Color", "HTML Link Color specifies the color of the anchor tag within a webpage, allowing us to define the color of clickable text, and making user navigation more visual.", `<a href="#" style="color: blue;">\nLink has a blue color\n</a>`]
            ]
          }
        },
        {
          heading: "HTML Colors Example",
          description: "The example illstrates the various HTML Colors to the element.\n\nIn this example we create HTML to structure content with elements like headings, divs, links, and paragraphs.\n- Heading displays a gray background for emphasis.\n- Div is bordered with skyblue color for visual distinction.\n- Link text appears in tomato color for better visibility.\n- Paragraph text is styled with a dark green color for readability.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n\n<head>\n    <title>HTML Text Color</title>\n    <style>\n        center {\n            width: 50%;\n            margin: 0 auto;\n        }\n        h2, div, p, span {\n            padding: 10px;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n\n<body>\n    <center>\n        <h2 style="background-color: gray;">\n            Heading with Gray Background color\n        </h2>\n\n        <div style="border: 2px solid skyblue;">\n            Div with Skyblue Border color\n        </div>\n        <span >\n            <a href="#" style="color: #ff6347;">\n                Link has a tomato color\n            </a>\n        </span>\n\n        <p style="color: darkgreen;">\n            Paragraph with Dark Green Text color\n        </p>\n        \n    </center>\n\n</body>\n\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785045027/0e8dc468-4875-4fd7-8f9d-1e60c24be271.png"
          }
        },
        {
          heading: "Color Values",
          description: "Color values in HTML define the color of elements. They can be specified using various formats such as hexadecimal, RGB, RGBA, HSL, HSLA, color names, and system color keywords."
        },
        {
          heading: "RGB Color Value",
          description: "RGB, which stands for Red, Green, and Blue, is a method used in CSS to describe colors. It works by mixing different amounts of three primary colors, each with values ranging from 0 to 255. By adjusting these values, we can produce an extensive range of colors, allowing for the creation of diverse and better color palettes across websites.\n\nProperties:\n- It's representation is as rgb(red, green, blue).\n- By adjusting these values from 0 to 255, we can produce 16,777,216 unique colors.\n- For instance, specifying rgb(0, 255, 0) results in green because the green value is at its maximum (255), while red and blue are at 0. Conversely, using rgb(0, 0, 255) produces blue, with the blue channel set to its peak (255), and red and green at 0.\n- To render black, all color parameters are set to 0 (rgb(0, 0, 0)), and for white, all parameters are set to their maximum (rgb(255, 255, 255)).\n\nSyntax:\n// Blue background\n<p style=\"background-color: rgb(0, 0, 255);\">\n    Is the sky background Blue by using RGB\n</p>",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n\n<head>\n    <title>RGB Color Value</title>\n    <style>\n        center {\n            width: 50%;\n            margin: 0 auto;\n        }\n\n        h2,\n        div,\n        p,\n        span {\n            padding: 10px;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n\n<body>\n    <center>\n        <h2 style="background-color: rgb(109, 102, 197);">\n            Heading with blue Background color\n        </h2>\n\n        <div style="border: 2px solid rgb(135, 206, 235);">\n            <li>\n                <a href="#html-color-usage">\n                    HTML Color Usage\n                </a>\n            </li>\n            Div with Skyblue Border color\n        </div>\n        <span>\n            <a href="#" style="color: rgb(241, 76, 89);">\n                Link has a tomato color\n            </a>\n        </span>\n\n        <p style="color: rgb(0, 100, 0);">\n            Paragraph with Dark Green Text color\n        </p>\n\n    </center>\n\n</body>\n\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785045111/60f5657e-575d-473b-8497-c97099da7970.png"
          }
        },
        {
          heading: "RGBA Color Value",
          description: "RGBA (Red, Green, Blue, Alpha) is a color model similar to RGB, but with an added alpha parameter representing transparency. The alpha value, which ranges from 0 to 1, adjusts transparency, allowing the display of colors with varying levels of opacity. It's representation is as rgba(red, green, blue, alpha).\n\nProperties:\n- RGBA Format Represents colors using Red, Green, Blue, and Alpha (transparency) values, allowing control over opacity.\n- Alpha value ranges from 0 (fully transparent) to 1 (fully opaque).\n- RGBA values are expressed as rgba(red, green, blue, alpha).\n- Ideal for creating semi-transparent elements, providing subtle visual effects or layering content.\n\nSyntax:\n// Semi-transparent text with a purple hue\n<span style=\"color: rgba(128, 0, 128, 0.5);\">\n    This text is semi-transparent with a purple hue using RGBA\n</span>",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785045150/ec7581ee-47ad-42a2-a2c5-a07f4077eb35.png"
          }
        },
        {
          heading: "HEX Color Value",
          description: "Hexadecimal color values, often referred to as hex values, use a six-digit code made up of pairs of characters.\n\n- Hexadecimal values in CSS are represented as #rrggbb, where rr, gg, and bb denote the intensity of red, green, and blue, respectively, ranging from 00 to ff.\n- This encoding allows for 16,777,216 unique color combinations, providing a vast spectrum for web design.\n- For example, #ff0000 corresponds to red (max red, no green, no blue), while #00ff00 represents green (max green, no red, no blue).\n- Black is denoted by #000000 (no red, no green, no blue), while white is represented as #ffffff (max red, max green, max blue).\n\nSyntax:\n// Pinkish Background\n<div style=\"background-color: #FF69B4;\">\n    div has a pinkish background by using Hex\n</div>",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n\n<head>\n    <title>Hex Color Value</title>\n    <style>\n        center {\n            width: 50%;\n            margin: 0 auto;\n        }\n        h2, div, p, span {\n            padding: 10px;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n\n<body>\n    <center>\n        <h2 style="background-color: #FF6347;">\n            Heading with semi-transparent \n            Tomato Background color (Hex: #FF6347)\n        </h2>\n\n        <div style="border: 2px solid #FFA500;">\n            Div with semi-transparent \n            Orange Border color (Hex: #FFA500)\n        </div>\n        <span>\n            <a href="#" style="color: #00BFFF;">\n                Link has a semi-transparent \n                Deep Sky Blue color (Hex: #00BFFF)\n            </a>\n        </span>\n    \n        <p style="color: #800080;">\n            Paragraph with semi-transparent \n            Purple Text color (Hex: #800080)\n        </p>\n    </center>\n\n</body>\n\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785045915/94f38506-33a5-45c6-9ca0-92bcb253225d.png"
          }
        },
        {
          heading: "HSL (Hue, Saturation, Lightness) Value",
          description: "HSL color values in HTML represent colors by defining their hue, saturation, and lightness. The hue signifies the type of color (red, blue, green, etc.), saturation refers to the intensity or purity of the color, and lightness determines the brightness or darkness.\n\nProperties:\n- HSL representation defines colors based on Hue, Saturation, and Lightness components, offering a more intuitive way to specify colors.\n- Hue represents the color type, ranging from 0 to 360 degrees.\n- Saturation determines the intensity or purity of the color, from 0% (grayscale) to 100% (full color).\n- Lightness controls the brightness of the color, ranging from 0% (black) to 100% (white), with 50% representing normal.\n\nSyntax:\n// Golden Background\n<div style=\"background-color: hsl(45, 100%, 50%);\">\n    This div has a golden background using HSL\n</div>",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n\n<head>\n    <title>HSL Color Value</title>\n    <style>\n        center {\n            width: 50%;\n            margin: 0 auto;\n        }\n        h2, div, p, span {\n            padding: 10px;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n\n<body>\n    <center>\n        <h2 style="background-color: hsla(120, 100%, 50%, 0.5);">\n            Heading with semi-transparent \n            Green Background color \n            (HSL: hsla(120, 100%, 50%, 0.5))\n        </h2>\n\n        <div style="border: 2px solid hsla(240, 100%, 50%, 0.7);">\n            Div with semi-transparent \n            Blue Border color \n            (HSL: hsla(240, 100%, 50%, 0.7))\n        </div>\n        <span>\n            <a href="#" style="color: hsla(30, 100%, 50%, 0.8);">\n                Link has a semi-transparent \n                Orange color \n                (HSL: hsla(30, 100%, 50%, 0.8))\n            </a>\n        </span>\n    \n        <p style="color: hsla(0, 100%, 25%, 0.6);">\n            Paragraph with semi-transparent \n            Red Text color \n            (HSL: hsla(0, 100%, 25%, 0.6))\n        </p>\n    </center>\n\n</body>\n\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785045960/23264129-1997-4560-8a23-d10a318c08d9.png"
          }
        }
      ],
    },
    {
      id: "html-links-hyperlinks",
      title: "HTML Links Hyperlinks",
      sections: [
        {
          heading: "HTML Links Hyperlinks",
          description: "HTML Links, also known as Hyperlinks, are used to connect one web page to another, allowing users to navigate easily between different pages, websites, or sections within the same page.\n\n- The <a> (anchor) tag creates hyperlinks, using the href attribute to specify the destination URL.\n- It can link text, images, or buttons for navigation.\n- Links can open in the same tab or a new tab using the target attribute, and other common attributes include title for additional information.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <p>Click on the following link</p>\n    <a href="www.codesarthi.in">CodeSarthi</a>\n</body>\n</html>`
        },
        {
          heading: "Link States",
          description: "By default, links will appear as follows in all browsers:\n\n- An unvisited link is underlined and blue.\n- A visited link is underlined and purple.\n- An active link is underlined and red."
        },
        {
          heading: "HTML Links - Target Attribute",
          description: "The target attribute in the <a> tag specifies where to open the linked document. It controls whether the link opens in the same window, a new window, or a specific frame.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h3> Various options available in the Target Attribute </h3>\n    <p>\n        If you set the target attribute to\n        "_blank", the link will open in a new\n        browser window or tab.\n    </p>\n    <a href="www.codesarthi.in" target="_blank"> CodeSarthi </a>\n    <p>\n        If you set the target attribute to\n        "_self", the link will open in the\n        same window or tab.\n    </p>\n    <a href="www.codesarthi.in" target="_self"> CodeSarthi </a>\n    <p>\n        If you set the target attribute to\n        "_top", the link will open in the full\n        body of the window.\n    </p>\n    <a href="www.codesarthi.in" target="_top"> CodeSarthi </a>\n    <p>\n        If you set the target attribute to\n        "_parent", the link will open in the\n        parent frame.\n    </p>\n    <a href="www.codesarthi.in" target="_parent"> CodeSarthi </a>\n</body>\n</html>`
        },
        {
          heading: "Target Attribute Options",
          table: {
            headers: ["Attribute", "Description"],
            rows: [
              ["_blank", "Opens the linked document in a new window or tab."],
              ["_self", "Opens the linked document in the same frame or window as the link. (Default behavior)"],
              ["_parent", "Opens the linked document in the parent frame."],
              ["_top", "Opens the linked document in the full body of the window."],
              ["framename", "Opens the linked document in a specified frame. The frame’s name is specified in the attribute."]
            ]
          }
        },
        {
          heading: "Linking Different HTML Elements",
          description: "Below are examples of how to link different HTML elements with their respective code snippets",
          table: {
            headers: ["Element to Interlink", "Specific Code"],
            rows: [
              ["Linking to an image", `<a href="image.jpg"><img src="image.jpg" alt="Image"></a>`],
              ["Link to an Email Address", `<a href="mailto:someone@example.com">Send Email</a>`],
              ["Phone Number", `<a href="tel:+1234567890">Call Now</a>`],
              ["Button", `<a href="https://www.example.com/"> <button>Visit Example</button> </a>`],
              ["Link to Download File", `<a href="file.pdf" download>Download File</a>`],
              ["Link Title", `<a href="https://www.example.com/" title="Visit Example">Link Text</a>`]
            ]
          }
        }
      ],
    },
    {
      id: "html-images",
      title: "HTML Images",
      sections: [
        {
          heading: "HTML Images",
          description: "The HTML <img> tag is used to embed an image in web pages by linking them. It creates a placeholder for the image, defined by attributes like src, width, height, and alt, and does not require a closing tag.\n\nThere are two ways to insert the images into a webpage:\n- By providing a full path or address (URL) to access an internet file.\n- By providing the file path relative to the location of the current web page file.\n\n- <img> tag is used to embed an image in a webpage.\n- src specifies the image source URL.\n- alt provides descriptive text if the image cannot be displayed.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg" \n         alt="cs image" />\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"
          }
        },
        {
          heading: "HTML img Tag Attributes",
          table: {
            headers: ["Attribute", "Description"],
            rows: [
              ["src", "Specifies the path to the image file."],
              ["alt", "Provides alternate text for the image, useful for accessibility and when the image cannot be displayed."],
              ["crossorigin", "Allows importing images from third-party sites with cross-origin access, typically used with canvas."],
              ["height", "Specifies the height of the image."],
              ["width", "Specifies the width of the image."],
              ["ismap", "Specifies an image as a server-side image map."],
              ["loading", "Specifies whether the browser should defer image loading or load it immediately."],
              ["longdesc", "Specifies a URL to a detailed description of the image."],
              ["referrerpolicy", "Specifies which referrer information to use when fetching the image."],
              ["sizes", "Specifies image sizes for different page layouts."],
              ["srcset", "Specifies a list of image files to use in different situations, allowing for responsive images."],
              ["usemap", "Specifies an image as a client-side image map."]
            ]
          }
        },
        {
          heading: "HTML Image tag - alt Attribute",
          description: "The alt attribute in the <img> tag provides alternative text when an image cannot be displayed and improves accessibility.\n\n- Displays text if the image fails to load.\n- Helps users with slow connections or broken image links.\n- Essential for screen readers and accessibility support.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n        alt="This is CodeSarthi logo" />\n</body>\n</html>`
        },
        {
          heading: "Set Image Size - Width and Height Attribute",
          description: "The width and height attributes in the <img> tag define the size of an image, with values specified in pixels by default.\n\n- Control the displayed width and height of an image.\n- Values are specified in pixels.\n- Help maintain consistent layout and prevent page shifting.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n        alt="CodeSarthi logo" \n        width="300" \n        height="300" />\n</body>\n</html>`
        },
        {
          heading: "Adding Titles to an Image",
          description: "The title attribute adds a tooltip to an image that appears when a user hovers over it.\n\n- Displays descriptive text on mouse hover.\n- Added using the title attribute in the <img> tag.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n        alt="CodeSarthi logo" \n        width="200" \n        height="200" \n        title="Logo of CodeSarthi" />\n</body>\n</html>`
        },
        {
          heading: "Setting Style of an Image",
          description: "The border attribute is used to control the border appearance of an image.\n\n- Specifies the thickness of the image border.\n- Setting border=\"0\" removes the border completely.\n- The border attribute adds a visible outline, showing how an image’s style can be adjusted.\n- This demonstrates basic styling, though modern styling is done using CSS.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n        alt="CodeSarthi logo" \n        width="200" \n        height="200" \n        border="5" />\n</body>\n</html>`
        },
        {
          heading: "Set Image Alignment",
          description: "Image alignment in HTML controls how an image is positioned within a webpage layout.\n\n- Alignment is set using the align attribute in the <img> tag.\n- Common values include left, right, and center.\n- Helps improve page layout and visual presentation.\n- The align=\"right\" attribute positions the image on the right side of the webpage.\n- It shows how image alignment worked in older HTML, though CSS is now the recommended method.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <img \nsrc="https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n        alt="CodeSarthi logo" \n        align="right" />\n</body>\n</html>`
        },
        {
          heading: "Adding Image as a Link",
          description: "Wrap the <img> tag inside an <a> tag to make the image clickable and link it to another page or resource.\n\nFile paths are of two types:\n- Absolute File Paths: It always contains the root element along with the complete directory list required to locate the file.\n- Relative File Paths: Specify the location of a file or folder relative to the current directory.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <a href="https://www.geeksforgeeks.org/">\n        <img src=\n"https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n            alt="CodeSarthi logo" />\n    </a>\n</body>\n</html>`
        },
        {
          heading: "Adding Animated Image",
          description: "Animated images in HTML are added using GIF files to create motion effects on webpages.\n\n- Use the <img> tag with a GIF file as the source.\n- Animation plays automatically in supported browsers.\n- Enhances visual appeal and user engagement.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <img src="smiley.gif" \n         alt="smiley" \n         style="width: 200px; height: 200px" /> \n</body>\n</html>`
        },
        {
          heading: "Image Formats",
          description: "Here is the commonly used image file format that is supported by all the browsers.",
          table: {
            headers: ["Abbreviation", "File Type", "Extension"],
            rows: [
              ["PNG", "Portable Network Graphics.", ".png"],
              ["JPEG", "Joint Photographic Expert Group image.", ".jpg, .jpeg, .jfif, .pjpeg, .pjp"],
              ["SVG", "Scalable Vector Graphics.", ".svg"],
              ["GIF", "Graphics Interchange Format.", ".gif"],
              ["ICO", "Microsoft Icon.", ".ico, .cur"],
              ["APNG", "Animated Portable Network Graphics.", ".apng"]
            ]
          }
        },
        {
          heading: "Tips for Using HTML Images Effectively",
          description: "Use images wisely in HTML to improve performance, accessibility, and overall user experience.\n\n- Optimize sizes: Compress images and choose the right format (JPEG for photos, PNG for limited colors, SVG for vectors).\n- Use clear alt text: Describe the image’s purpose to improve accessibility and support screen readers.\n- Make images responsive: Use srcset to serve different images for different devices and resolutions.\n- Keep aspect ratios: Avoid stretching images to maintain visual quality.\n- Respect copyrights: Use only images you own or have permission to use."
        }
      ],
    },
    {
      id: "html-favicon",
      title: "HTML Favicon",
      sections: [
        {
          heading: "HTML Favicon",
          description: "A favicon is a small image displayed next to a website’s title in the browser tab. It helps users quickly recognize and return to a website.\n\n- Appears in browser tabs, bookmarks, and browsing history for easy identification.\n- Improves brand recognition by serving as a visual identity for the website.\n- Enhances the professionalism and credibility of the site.\n- Improves usability by helping users locate their tab among multiple open tabs.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <title>GeeksforGeeks</title>\n    <link rel="icon"\n        href="https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg"\n        type="image/x-icon">\n</head>\n\n<body>\n    <h3 style="color:blue;">CodeSarthi</h3>\n    <p>Welcome to my website</p>\n</body>\n\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785047321/Screenshot_2026-07-26_at_11.58.31_AM_bbez5l.png"
          }
        },
        {
          heading: "Note",
          description: "Note: Major browsers are not supported by the sizing property of the favicon."
        },
        {
          heading: "Creating and Adding a Favicon",
          description: "To create and add a favicon to your website, follow these simple steps to ensure it's displayed properly across different browsers and devices:\n\n- Design a small favicon image (usually 16×16 or 32×32 pixels) and save it in formats like .ico, .png, or .svg.\n- Upload the favicon image to your website’s root directory or use an external image URL.\n- Add a <link> tag inside the <head> section of your HTML file to reference the favicon.\n- Save the changes and test the favicon by opening the website in a browser to ensure it displays correctly."
        },
        {
          heading: "List of Favicon Sizes",
          table: {
            headers: ["Name", "Size", "Description"],
            rows: [
              ["favicon-32.png", "32×32", "Standard for most desktop browsers."],
              ["favicon-57.png", "57×57", "Standard iOS home screen."],
              ["favicon-76.png", "76×76", "iPad home screen icon."],
              ["favicon-96.png", "96×96", "GoogleTV icon."],
              ["favicon-120.png", "120×120", "iPhone retina touch icon."],
              ["favicon-128.png", "128×128", "Chrome Web Store icon & Small Windows 8 Star Screen Icon*."],
              ["favicon-144.png", "144×144", "Internet Explorer 10 Metro tile for pinned site*"],
              ["favicon-152.png", "152×152", "iPad touch icon."],
              ["favicon-167.png", "167×167", "iPad Retina touch icon (change for iOS 10: up from 152×152, not in action. iOS 10 will use 152×152)"],
              ["favicon-180.png", "180×180", "iPhone 6 plus"],
              ["favicon-192.png", "192×192", "Google Developer Web App Manifest Recommendation"],
              ["favicon-195.png", "195×195", "Opera Speed Dial icon (Not working in Opera 15 and later)"],
              ["favicon-196.png", "196×196", "Chrome for Android home screen icon"],
              ["favicon-228.png", "228×228", "Opera Coast icon"]
            ]
          }
        },
        {
          heading: "Favicon File Format Support",
          table: {
            headers: ["File Format", "Browser Support", "Quality"],
            rows: [
              ["ICO", "All Five", "ICO supports multiple icon sizes in a single file and provides wide browser compatibility"],
              ["PNG", "All Five", "PNG support High-quality image, supports transparency, smaller file size"],
              ["GIF", "All Five", "GIF Provides animation"],
              ["JPEG", "All Five", "JPEG have Good for high-quality images"],
              ["SVG", "All Five", "SVG is Scalable, small file size, sharp quality at any resolution"],
              ["WebP", "All Five", "Webp have Smaller file size with high quality"]
            ]
          }
        },
        {
          heading: "Troubleshooting Favicon Issues",
          description: "These steps help fix common problems when a favicon does not appear correctly in the browser.\n\n1. Clear Browser Cache\nIt Refresh the favicon by clearing the browser cache or using incognito mode, as browsers may store old versions.\n\n- Browsers often cache favicons, preventing updates from appearing immediately.\n- Clear the cache or open the website in incognito mode to refresh the favicon.\n\n2. Check File Path:\nIt verify the favicon’s location and link, placing it in the root directory or ensuring the path is correct.\n\n- Ensure the favicon file path is correct and properly referenced.\n- Place the favicon in the root directory or verify the link location.\n\n3. Use Full URL\nIt Specify the complete URL of the favicon to ensure it loads correctly.\n\n- Use the complete URL if the favicon does not load correctly.\n- Example: <link rel=\"icon\" href=\"https://www.example.com/favicon.ico\" type=\"image/x-icon\">\n\n4. Format Issues\nIt Ensure the favicon uses a supported format (ICO, PNG, SVG) for cross-browser compatibility.\n\n- Confirm the favicon format is supported (ICO, PNG, SVG).\n- Make sure the format works consistently across different browsers."
        }
      ],
    },
    {
      id: "html-video",
      title: "HTML Video",
      sections: [
        {
          heading: "HTML Video",
          description: "The <video> element in HTML is used to show video content on web pages. It supports various video formats, including MP4, WebM, and Ogg. It is introduced in HTML5.\n\nGenerally, we prefer the syntax with the <source> tag wrapped between the video tag because:\n- It allows you to specify multiple <source> elements for different formats of the video (e.g., MP4, WebM, Ogg), improving cross-browser compatibility.\n- By including the type attribute, you can tell the browser the exact MIME type of the video file, helping it determine whether it can play the file.",
          language: "html",
          code: `<video src="" controls>   </video>\n               or\n<video controls="controls">\n<source src="video_filename" type="video_type">\n </video>`
        },
        {
          heading: "Attributes of the <video> Element",
          description: "The following attributes can be used with the <video> tag to enhance video playback:",
          table: {
            headers: ["Attribute", "Description"],
            rows: [
              ["controls", "Adds playback controls such as play, pause, volume, etc."],
              ["width", "Specifies the width of the video player."],
              ["height", "Specifies the height of the video player."],
              ["autoplay", "Automatically starts playing the video when it's loaded."],
              ["muted", "Mutes the video by default."],
              ["src", "Specifies the video file’s path."],
              ["type", "Defines the format of the video (e.g., video/mp4, video/webm)."]
            ]
          }
        },
        {
          heading: "Example of Using Attributes",
          description: "Below is an example of using different attributes of video tag:\n\n- The <video> tag defines the video player, with width and height attributes setting its dimensions.\n- The controls attribute adds playback controls like play, pause, and volume.",
          language: "html",
          code: `<html>\n<body>\n<video controls="" height="240" width="320">\n<source src="https://media.geeksforgeeks.org/wp-content/uploads/20190616234019/Canvas.move_.mp4" type="video/mp4"/>\n   Sample Video\n        </video>\n</body>\n</html>`
        },
        {
          heading: "Supported Formats",
          description: "Three different formats are commonly supported by web browsers - mp4, Ogg, and WebM. The table below lists the formats supported by different browsers:",
          table: {
            headers: ["Browser", "MP4", "WebM", "OGG"],
            rows: [
              ["Google Chrome", "Yes", "Yes", "Yes"],
              ["Internet Explorer", "Yes", "No", "No"],
              ["Firefox", "Yes", "Yes", "Yes"],
              ["Opera", "Yes", "Yes", "Yes"],
              ["Safari", "Yes", "Yes", "No"]
            ]
          }
        },
        {
          heading: "Example 1: Responsive Video with Poster",
          description: "The video is made responsive with CSS, adjusting its width to 100% of its container while maintaining the aspect ratio.\nThe poster attribute displays a placeholder image before the video loads or plays, enhancing the user experience.",
          language: "html",
          code: `<html>\n<head>\n<style>\n   video {\n			max-width: 100%;\n			height: auto;\n			display: block;\n			margin: 0 auto;\n		}\n        </style>\n</head>\n<body>\n<video controls="" poster="https://via.placeholder.com/640x360.png?text=Video+Loading">\n<source src="https://media.geeksforgeeks.org/wp-content/uploads/20190616234019/Canvas.move_.mp4" type="video/mp4"/>\n</video>\n</body>\n</html>`
        },
        {
          heading: "Example 2: Styled Video with Controls & Autoplay",
          description: "The video is styled with a green border, rounded corners, and a black background to enhance its appearance.\nThe autoplay, loop, and muted attributes ensure the video plays automatically, repeats indefinitely, and starts without sound, respectively.",
          language: "html",
          code: `<html>\n<head>\n<style>\n   video {\n			width: 640px;\n			height: 360px;\n			border: 2px solid #4CAF50;\n			border-radius: 8px;\n			background-color: #000;\n		}\n        </style>\n</head>\n<body>\n<video autoplay="" controls="" loop="" muted="">\n<source src="https://media.geeksforgeeks.org/wp-content/uploads/20241202174008478068/sample-vedio.mp4" type="video/mp4"/>\n</video>\n</body>\n</html>`
        },
        {
          heading: "Best Practices for Video Implementation",
          description: "To ensure your videos are displayed correctly across all browsers, follow these best practices:\n\n1. Use Multiple Video Sources\nSince not all browsers support the same video formats, it's a good idea to provide multiple video formats (MP4, WebM, Ogg) in the <video> element. This will ensure that the video plays regardless of the browser the user is using.\n\n2. Optimize Video Size and Quality\nTo enhance user experience, make sure your videos are optimized for the web. Compress your video files without sacrificing too much quality. Use appropriate file sizes for faster loading times.\n\n3. Implement Accessibility Features\nAdd captions, subtitles, or other accessibility features to make your videos more inclusive. You can use the <track> element to provide captions in various languages.",
          language: "html",
          code: `<video controls>\n    <source src="example.mp4" type="video/mp4">\n    <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">\n    Your browser does not support the video tag.\n</video>`
        }
      ],
    },
    {
      id: "html-tables",
      title: "HTML Tables",
      sections: [
        {
          heading: "HTML Tables",
          description: "HTML tables help organize data into rows and columns, making information easy to read and compare. They are useful for displaying schedules, price lists, product details, and more.\n\n- Can include text, images, links, and other elements.\n- Built using tags like <table>, <tr>, <th>, and <td>.\n- Allow clear presentation of data for comparison.\n- Can be styled with CSS for better design and readability.\n\n- An HTML table is created using the <table> tag.\n- <tr> defines a table row.\n- <th> defines a table header cell (usually bold and centered).\n- <td> defines a table data cell that holds actual content.\n- Each <tr> represents one row containing <th> or <td> cells.\n- Cells can include text, images, lists, links, or even another table (nested table).",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title></title>\n</head>\n<body>\n    <table>\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>Luca</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "HTML Tables Tags",
          description: "List of all the tags that we used in table formation in html:",
          table: {
            headers: ["Tag", "Description"],
            rows: [
              ["<table>", "defines the structure for organizing data in rows and columns within a web page."],
              ["<tr>", "represents a row within an HTML table containing individual cells."],
              ["<th>", "shows a table header cell that typically holds titles or headings."],
              ["<td>", "represents a standard data cell, holding content or data."],
              ["<caption>", "provides a title or description for the entire table."],
              ["<thead>", "defines the header section of a table, often containing column labels."],
              ["<tbody>", "represents the main content area of a table, separating it from the header or footer."],
              ["<tfoot>", "specifies the footer section of a table, typically holding summaries or totals."],
              ["<col>", "defines attributes for table columns that can be applied to multiple columns simultaneously."],
              ["<colgroup>", "groups together a set of columns in a table to which you can apply formatting or properties collectively."]
            ]
          }
        },
        {
          heading: "Example: Creating a simple table in HTML",
          description: "Displays a table with book details using <table>, with rows <tr> and cells <th> and <td>.\nEach row lists a book’s name, author, and genre in separate columns.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<body>\n    <table>\n        <tr>\n            <th>Book Name</th>\n            <th>Author Name</th>\n            <th>Genre</th>\n        </tr>\n        <tr>\n            <td>The Book Thief</td>\n            <td>Markus Zusak</td>\n            <td>Historical Fiction</td>\n        </tr>\n        <tr>\n            <td>The Cruel Prince</td>\n            <td>Holly Black</td>\n            <td>Fantasy</td>\n        </tr>\n        <tr>\n            <td>The Silent Patient</td>\n            <td> Alex Michaelides</td>\n            <td>Psychological Fiction</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "Styling HTML Tables",
          description: "Use CSS (Cascading Style Sheets) to add styles such as borders, background colors, text alignments, and much more. Here are some basic styles to make your table look neater and more professional:"
        },
        {
          heading: "1. Adding a Border to an HTML Table",
          description: "A border is set using the CSS border property. If you do not specify a border for the table, it will be displayed without borders.\n\nUses CSS to add a black border to the table, header cells, and data cells.\nCreates a full-width table displaying first name, last name, and age for three people.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        table,\n        th,\n        td {\n            border: 1px solid black;\n        }\n    </style>\n</head>\n<body>\n    <table style="width:100%">\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>Lucas</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "2. Adding Collapsed Borders in an HTML Table",
          description: "For borders to collapse into one border, add the CSS border-collapse property.\n\nAdds border-collapse: collapse; so table borders merge into a single clean border.\nShows a full-width table listing first name, last name, and age for three people.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n    table,\n    th,\n    td {\n        border: 1px solid black;\n        border-collapse: collapse;\n    }\n    </style>\n</head>\n<body>\n    <table style="width:100%">\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>Lucas</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "3. Adding Cell Padding in an HTML Table",
          description: "Cell padding specifies the space between the cell content and its borders. If we do not specify a padding, the table cells will be displayed without padding.\n\nUses border-collapse: collapse; and border properties to create a clean, single-bordered table.\nApplies padding: 20px to table cells for better spacing and readability, showing a list of people’s first name, last name, and age.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n    table,\n    th,\n    td {\n        border: 1px solid black;\n        border-collapse: collapse;\n    }\n    th,\n    td {\n        padding: 20px;\n    }\n    </style>\n</head>\n<body>\n    <table style="width:100%">\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>Lucas</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n</body>\n\n</html>`
        },
        {
          heading: "4. Adding Left Align Headings in an HTML Table",
          description: "By default, the table headings are bold and centered. To left-align the table headings, we must use the CSS text-align property.\n\nAdds text-align: left specifically to <th> elements so table headers are aligned to the left.\nDisplays a full-width table with clean borders and padding, listing first name, last name, and age for three people.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        table,\n        th,\n        td {\n            border: 1px solid black;\n            border-collapse: collapse;\n        }\n        th,\n        td {\n            padding: 20px;\n        }\n\n        th {\n            text-align: left;\n        }\n    </style>\n</head>\n<body>\n    <table style="width:100%">\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>Lucas</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "5. Adding Border Spacing in an HTML Table",
          description: "Border spacing specifies the space between the cells. To set the border-spacing for a table, we must use the CSS border spacing property.\n\nUses border-spacing: 5px; to add space between table cells instead of collapsing borders.\nDisplays a full-width table showing first name, last name, and age with separate bordered cells.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        table,\n        th,\n        td {\n            border: 1px solid black;\n        }\n        table {\n            border-spacing: 5px;\n        }\n    </style>\n</head>\n<body>\n    <table style="width:100%">\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>Lucas</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "6. Adding Cells that Span Many Columns in HTML Tables",
          description: "To make a cell span more than one column, we must use the colspan attribute.\n\nUses colspan=\"2\" on the Telephone header so one cell stretches across two columns.\nDisplays a table with a name in the first column and two phone numbers in the next two columns, all with collapsed borders and padding for readability.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        table,\n        th,\n        td {\n            border: 1px solid black;\n            border-collapse: collapse;\n        }\n        th,\n        td {\n            padding: 5px;\n            text-align: left;\n        }\n    </style>\n</head>\n<body>\n    <table style="width:100%">\n        <tr>\n            <th>Name</th>\n            <th colspan="2">Telephone</th>\n        </tr>\n        <tr>\n            <td>Lucas Rossi</td>\n            <td>9125577854</td>\n            <td>8565557785</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "7. Adding Cells that span many rows in HTML Tables",
          description: "To make a cell span more than one row, we must use the rowspan attribute.\n\nUses rowspan=\"2\" on the Telephone header so it spans across two rows.\nDisplays one name and two phone numbers in a table with collapsed borders and padding for readability.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        table,\n        th,\n        td {\n            border: 1px solid black;\n            border-collapse: collapse;\n        }\n        th,\n        td {\n            padding: 5px;\n            text-align: left;\n        }\n    </style>\n</head>\n<body>\n    <table style="width:100%">\n        <tr>\n            <th>Name:</th>\n            <td>Lucas Rossi</td>\n        </tr>\n        <tr>\n            <th rowspan="2">Telephone:</th>\n            <td>9125577854</td>\n        </tr>\n        <tr>\n            <td>8565557785</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "8. Adding a Caption in an HTML Table",
          description: "To add a caption to a table, we must use the \"caption\" tag.\n\nUses padding: 20px on table cells to add space inside each <th> and <td> for better readability.\nDisplays a full-width table with first name, last name, and age, arranged neatly with collapsed borders.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        table,\n        th,\n        td {\n            border: 1px solid black;\n            border-collapse: collapse;\n        }\n        th,\n        td {\n            padding: 20px;\n        }\n        th {\n            text-align: left;\n        }\n    </style>\n</head>\n<body>\n    <table style="width:100%">\n        <caption>DETAILS</caption>\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n        <tr>\n            <td>Lucas</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n</body>\n</html>`
        },
        {
          heading: "9. Adding a Background Color to the Table",
          description: "A color can be added as a background in an HTML table using the \"background-color\" option.\n\nAdds text-align: left and padding for better spacing and alignment inside table cells.\nIncludes a second table with id=\"t01\" that applies a custom background color (#f2f2d1) and full width styling.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        table,\n        th,\n        td {\n            border: 1px solid black;\n            border-collapse: collapse;\n        }\n\n        th,\n        td {\n            padding: 5px;\n            text-align: left;\n        }\n\n        table#t01 {\n            width: 100%;\n            background-color: #f2f2d1;\n        }\n    </style>\n</head>\n\n<body>\n\n    <table style="width:100%">\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n\n        <tr>\n            <td>Lucas</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n\n    <br><br>\n\n    <table id="t01">\n        <tr>\n            <th>Firstname</th>\n            <th>Lastname</th>\n            <th>Age</th>\n        </tr>\n\n        <tr>\n            <td>Lucas</td>\n            <td>Rossi</td>\n            <td>24</td>\n        </tr>\n\n        <tr>\n            <td>Sophie</td>\n            <td>Dubois</td>\n            <td>32</td>\n        </tr>\n\n        <tr>\n            <td>Sam</td>\n            <td>Watson</td>\n            <td>41</td>\n        </tr>\n    </table>\n\n</body>\n</html>`
        },
        {
          heading: "10. Creating Nested Tables",
          description: "Nesting tables simply means making a Table inside another Table. Nesting tables can lead to complex table layouts, which are visually interesting and have the potential of introducing errors.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<body>\n    <table border=5 bordercolor=black>\n        <tr>\n            <td> First Column of Outer Table </td>\n            <td>\n                <table border=5 bordercolor=grey>\n                    <tr>\n                        <td> First row of Inner Table </td>\n                    </tr>\n                    <tr>\n                        <td> Second row of Inner Table </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n    </table>\n</body>\n</html>`
        }
      ],
    },
    {
      id: "html-iframes",
      title: "HTML iframes",
      sections: [
        {
          heading: "HTML iframes",
          description: "An iframe, or Inline Frame, is an HTML element represented by the <iframe> tag. It functions as a 'window' on your webpage through which visitors can view and interact with another webpage from a different source.\n\niframes are used for various purposes like:\n- Embedding Multimedia: Easily integrate videos, audio, or animations from platforms like YouTube, etc.\n- Including Maps: Embed maps from services like Google Maps directly into your site.\n- Loading Forms and Widgets: Incorporate forms or widgets from other sources without writing complex code.\n\nThe src attribute specifies the URL of the document you want to embed, and iframes can include videos, maps, or entire web pages from other sources.",
          language: "html",
          code: `<iframe src="URL" title="description"></iframe>`
        },
        {
          heading: "Example 1: Basic iframe Embedding",
          description: "In this example, an iframe is used to display another webpage within the current webpage.\n\n- src: Specifies the URL of the page to display within the iframe.\n- width and height: Defines the size of the iframe on your page.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body style="text-align: center">\n    <h2>HTML iframe Tag</h2>\n    <iframe src="https://media.geeksforgeeks.org/wp-content/uploads/20240206111438/uni2.html"\n            height="370"\n            width="400">\n    </iframe>\n</body>\n</html>`
        },
        {
          heading: "Supported Attributes of the <iframe> Tag",
          table: {
            headers: ["Attributes", "Description"],
            rows: [
              ["allow", "Specifies a set of extra restrictions on the content that can be loaded in an <iframe>."],
              ["allowfullscreen", "Indicates whether the <iframe> can be displayed in fullscreen mode."],
              ["allowpaymentrequest", "Enables payment requests for content inside the <iframe>."],
              ["height", "Sets the height of the <iframe> element."],
              ["width", "Sets the width of the <iframe> element."],
              ["loading", "Specifies how the content of the <iframe> should be loaded."],
              ["scrolling", "Controls whether or not the <iframe> should have scrollbars."],
              ["name", "Specifies the name of the <iframe> for targeting its content or for referencing it in JavaScript."],
              ["referrerpolicy", "Sets the referrer policy for the <iframe> content."],
              ["sandbox", "Specifies an extra set of restrictions for the content in the <iframe>."],
              ["src", "Specifies the URL of the document to embed in the <iframe>."],
              ["srcdoc", "Specifies the HTML content of the page to display in the <iframe>."]
            ]
          }
        },
        {
          heading: "Example 2: Using Height and Width attribute",
          description: "The height and width attributes are used to specify the size of the iframe. The attribute values are specified in pixels by default. You can use pixels or percentages (e.g., “80%”).",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<body>\n    <h2>HTML iframe Tag</h2>\n    <p> Content goes here </p>\n    <iframe src="https://media.geeksforgeeks.org/wp-content/uploads/20240206111438/uni2.html"\n            height="395" \n            width="400">\n    </iframe>\n</body>\n</html>`
        },
        {
          heading: "Example 3: Removing Borders from iframe",
          description: "By default, iframe has a border around it. To remove the border, we must use the style attribute and use the CSS border property.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<body>\n    <h2>HTML iframe Tag</h2>\n    <p>Content goes here</p>\n    <iframe src="https://media.geeksforgeeks.org/wp-content/uploads/20231227155729/jsonPrac3.html" \n            height="300" \n            width="400" \n            style="border: none"> \n    </iframe>\n</body>\n</html>`
        },
        {
          heading: "Example 4: Styling iframe Border Using CSS",
          description: "You can change the size, style, and color of the iframe border using CSS.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<body>\n    <p>Content goes here</p>\n    <iframe src="https://media.geeksforgeeks.org/wp-content/uploads/20240206111438/uni2.html" \n            height="400" \n            width="400" \n            style="border: 4px solid orange"> \n    </iframe>\n</body>\n</html>`
        },
        {
          heading: "Example 5: iframe Target in Link",
          description: "You can target an iframe with links by using the name attribute of the iframe and the target attribute of the link.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<body>\n    <h2>HTML iframe Tag</h2>\n    <p> Click the link text </p>\n    <iframe src="https://media.geeksforgeeks.org/wp-content/uploads/20210910170539/gfg-221x300.png"\n            height="400"\n            width="350" \n            name="iframe_a">\n    </iframe>\n    <p>\n        <a href="https://media.geeksforgeeks.org/wp-content/uploads/20240206111438/uni2.html"\n           target="iframe_a">\n            Converter\n        </a>\n    </p>\n</body>\n</html>`
        },
        {
          heading: "Best Practices for Using iframes",
          description: "While <iframe> elements provide flexibility for embedding external content, they should be used carefully to maintain performance, security, and accessibility.\n\n- Security: Use the sandbox attribute to restrict iframe capabilities unless the source is fully trusted.\n- Performance: Limit iframe usage and ensure embedded content is optimized to avoid slow page loads.\n- Accessibility: Provide fallback text or links inside the <iframe> tag for users who cannot interact with it."
        }
      ],
    },
    {
      id: "html-layout",
      title: "HTML Layout",
      sections: [
        {
          heading: "HTML Layout",
          description: "HTML layouts divide a web page into structured sections for better organization and styling. They improve readability, accessibility, and overall user experience.\n\n- Semantic Structure: Uses elements like <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>.\n- Better Organization: Helps arrange content clearly, making pages easier to manage.\n- Improved SEO & Accessibility: Enhances search engine understanding and user accessibility.\n\n- <header> contains the main heading of the page.\n- <main> holds the primary content.\n- <footer> includes the footer information.",
          language: "html",
          code: `<html>\n<body>\n    <header>\n        <h1>My Website</h1>\n    </header>\n    <main>\n        <p>Welcome to my website!</p>\n    </main>\n    <footer>\n        <p> 2024 My Website</p>\n    </footer>\n</body>\n</html>`
        },
        {
          heading: "Layout Components",
          description: "HTML layouts divide a webpage into structured sections for better organization and readability.\n\n- Header: Top section with title, logo, or links using <header>.\n- Navigation Bar: Menu for site links using <nav>.\n- Index / Sidebar: Side section for extra content like links or ads.\n- Content Section: Main content area using <main>.\n- Footer: Bottom section with info using <footer>.",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785048405/761dd34e-232d-47e2-be1e-804c21a4dea7.png"
          }
        },
        {
          heading: "Example 1: Layout with Additional Semantic Tags",
          description: "- <nav> provides navigation links for the website.\n- <section> groups related content, here titled \"Latest Posts.\"\n- <article> represents an individual blog post.\n- <aside> contains supplementary information, such as an \"About Me\" section.",
          language: "html",
          code: `<html>\n<body>\n	<header>\n		<h1>My Blog</h1>\n	</header>\n	<nav>\n		<a href="#">Home</a> | <a href="#">About</a> | <a href="#">Contact</a>\n	</nav>\n	<section>\n		<h2>Latest Posts</h2>\n		<article>\n			<h3>Post Title</h3>\n			<p>This is a brief introduction to the blog post.</p>\n		</article>\n	</section>\n	<aside>\n		<h2>About Me</h2>\n		<p>Short bio or profile information.</p>\n	</aside>\n	<footer>\n		<p>&copy; 2026 My Blog</p>\n	</footer>\n</body>\n</html>`
        },
        {
          heading: "Example 2: Styled Layout with Semantic Tags",
          description: "- Header: The <header> element contains the main heading of the page, providing a clear introduction.\n- Main: The <main> element holds the primary content, ensuring semantic clarity and improved accessibility.",
          language: "html",
          code: `<html >\n<head>\n	<style>\n		header {\n			background-color: #4caf50;\n			color: white;\n			text-align: center;\n			padding: 1em;\n		}\n		nav {\n			background-color: #333;\n			overflow: hidden;\n		}\n		main {\n			padding: 20px;\n		}\n		footer {\n			background-color: #4caf50;\n			color: white;\n			text-align: center;\n			padding: 1em;\n		}\n	</style>\n</head>\n<body>\n	<header>\n		<h1>Styled Page</h1>\n	</header>\n	<nav>\n		<a href="#">Home</a>\n		<a href="#">Services</a>\n		<a href="#">Contact</a>\n	</nav>\n	<main>\n		<h2>Welcome!</h2>\n		<p>This is a simple page.</p>\n	</main>\n	<footer>\n		<p>&copy; 2026 Styled Page</p>\n	</footer>\n</body>\n\n</html>`
        },
        {
          heading: "Techniques for Creating HTML Layouts",
          description: "There are several techniques to create multi-column layouts in HTML:\n\n- CSS Frameworks (like Bootstrap): CSS frameworks like Bootstrap help speed up layout design using pre-built components and grid systems.\n- CSS Float Property: The CSS Float Property is used to position elements, though it requires careful handling to avoid layout issues.\n- CSS Flexbox: CSS Flexbox is used to create responsive and dynamic layouts by aligning and distributing space efficiently.\n- CSS Grid: CSS Grid allows developers to create complex two-dimensional layouts with better control over element placement."
        },
        {
          heading: "Best Practices for HTML Layout",
          description: "Follow these practices to create clean, structured, and responsive web page layouts.\n\n- Keep layout simple and clean by avoiding deeply nested elements and unnecessary divs.\n- Use CSS for styling and positioning instead of relying on HTML structure for layout design.\n- Ensure responsiveness by designing layouts that adapt well to different screen sizes using flexible units and media queries."
        }
      ],
    },
    {
      id: "html-file-paths",
      title: "HTML File Paths",
      sections: [
        {
          heading: "HTML File Paths",
          description: "HTML file paths specify the location of resources like images, videos, scripts, and documents so the browser can load them correctly.\n\n- Help the browser locate and load external resources.\n- Used for files such as images, videos, scripts, and documents.\n- Specified using attributes like src and href.\n\nFile paths can be absolute or relative, depending on how the resource location is specified."
        },
        {
          heading: "1. Absolute File Paths",
          description: "It specifies the full URL or complete location of a resource, starting from the root of the website or including the domain name.\n\n- Point directly to a resource's location on the internet and include the full URL, which consists of the protocol (http:// or https://), domain, and path to the resource.\n- Best for resources that are hosted externally. The browser knows exactly where to find them regardless of the current document’s location.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <img src=\n"https://media.geeksforgeeks.org/wp-content/uploads/geek.png" \n         alt="My Image" \n         style="width: 400px" />\n</body>\n</html>`
        },
        {
          heading: "2. Relative File Paths",
          description: "Relative file paths locate resources based on the HTML file’s location, keeping links portable.\n\n- Specify the path to a resource in relation to the location of the HTML file currently being viewed.\n- Ideal for resources within the same website. Keeps your HTML portable if the domain changes since the path doesn’t need to be updated.\n\nThe relative file path \"images/geeks.jpg\" indicates that the image file \"geeks.jpg\" is located in a subfolder named \"images\" relative to the current HTML file.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <h2>File present in the same folder</h2>\n    <img src="images/geeks.jpg" \n         alt="My Image" \n         style="width:400px">\n</body>\n</html>`
        },
        {
          heading: "Relative Path Variants",
          description: "Document-relative paths start from the HTML file’s folder, while root-relative paths start from the server’s root directory.\n\n- Document-relative paths: As in the above example, the path starts from the directory of the current HTML document.\n- Root-relative paths: Start with a slash (/), which tells the browser to look for the resource starting from the root directory of the server. Example:\n  \`<img src=\"/images/geeks.jpg\">\`\n- Directory-relative paths: Use dot notation to navigate the directory structure:\n  \`./\` refers to the current directory.\n  \`../\` moves up one directory level.\n  \`<img src=\"../images/geeks.jpg\">\` <!-- Goes up one directory, then into the images folder -->"
        },
        {
          heading: "Best Practices for Using HTML File Paths",
          description: "It Maintain a consistent folder structure, use relative paths for internal resources, test paths both locally and on the server, and avoid spaces in filenames.\n\n- Keep a Consistent Structure: Organize your files in a logical structure which makes it easier to manage and reference your resources.\n- Use Relative Paths for Internal Resources: This makes your website more portable and easier to maintain, especially if you migrate to a different domain.\n- Test Paths Locally and on the Server: Paths that work on your local machine may not function the same way on a web server due to different directory structures or permissions.\n- Avoid Spaces in Filenames: Spaces can cause issues in URLs and make linking more complex. Use hyphens or underscores instead."
        }
      ],
    },

    {
      id: "html-forms",
      title: "HTML Forms",
      sections: [
        {
          heading: "HTML Forms",
          description: "HTML forms, defined using the <form> tag, are essential for collecting user input on web pages. They include interactive controls like text fields, emails, passwords, checkboxes, radios, and buttons.\n\n- Widely used, over 85% of websites rely on forms to gather user data.\n- They play a crucial role in modern web development by enabling user interaction and data submission.\n\n- The code has a basic HTML structure with a title \"HTML Forms\".\n- The <h2> tag displays \"HTML Forms\" as the main heading on the page.\n- The <form> tag defines a form for user input.\n- A text input field for the username with a label.\n- A password input field and a submit button to send the form data.",
          language: "html",
          code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" \n          content="width=device-width, initial-scale=1.0">\n    <title>HTML</title>\n</head>\n<body>\n    <h2>HTML Forms</h2>\n    <form>\n        <label for="username">Username:</label><br>\n        <input type="text" id="username" name="username"><br><br>\n        <label for="password">Password:</label><br>\n        <input type="password" id="password" name="password"><br><br>\n        <input type="submit" value="Submit">\n    </form>\n</body>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785049284/5ed8303d-038d-4ca1-8832-a9f5499b28d7.png"
          }
        },
        {
          heading: "Syntax",
          language: "html",
          code: `<form>\n      <!--form elements-->\n</form>`
        },
        {
          heading: "Advance HTML Forms",
          description: "This HTML form collects users personal information, including name, email, password, gender, date of birth, and address. It features proper styling for input fields and submission buttons.\n\nHere are some of the key attributes that can be used with the <form> element:\n\n- action: Specifies the URL where the form data is sent upon submission.\n- method: Defines the HTTP method used to send the data — either \"get\" or \"post\".\n- target: Determines where to display the server’s response (e.g., \"_blank\", \"_self\", \"_parent\", \"_top\", or an iframe name).\n- enctype: Specifies how form data is encoded when using method=\"post\" (e.g., application/x-www-form-urlencoded, multipart/form-data, text/plain).\n- autocomplete: Controls whether the browser should auto-fill form fields (\"on\" or \"off\").\n- novalidate: A Boolean attribute that prevents the form from being validated before submission.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>HTML Form</title>\n    <style>\n        body {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            height: 100vh;\n            margin: 0;\n            background-color: #f0f0f0;\n        }\n        form {\n            width: 400px;\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n        }\n        fieldset {\n            border: 1px solid black;\n            padding: 10px;\n            margin: 0;\n        }\n        legend {\n            font-weight: bold;\n            margin-bottom: 10px;\n        }\n        label {\n            display: block;\n            margin-bottom: 5px;\n        }\n        input[type="text"],\n        input[type="email"],\n        input[type="password"],\n        textarea,\n        input[type="date"] {\n            width: calc(100% - 20px);\n            padding: 8px;\n            margin-bottom: 10px;\n            box-sizing: border-box;\n            border: 1px solid #ccc;\n            border-radius: 4px;\n        }\n        .gender-group {\n            margin-bottom: 10px;\n        }\n        .gender-group label {\n            display: inline-block;\n            margin-left: 10px;\n        }\n        input[type="radio"] {\n            margin-left: 10px;\n            vertical-align: middle;\n        }\n        input[type="submit"] {\n            padding: 10px 20px;\n            border-radius: 5px;\n            cursor: pointer;\n        }\n    </style>\n</head>\n<body>\n    <form>\n        <fieldset>\n            <legend>User Personal Information</legend>\n            <label for="name">Enter your full name:</label>\n            <input type="text" id="name" name="name" required />\n            <label for="email">Enter your email:</label>\n            <input type="email" id="email" name="email" required />\n            <label for="password">Enter your password:</label>\n            <input type="password" id="password" name="pass" required />\n            <label for="confirmPassword">Confirm your password:</label>\n            <input type="password" id="confirmPassword" name="confirmPass" required />\n            <label>Enter your gender:</label>\n            <div class="gender-group">\n                <input type="radio" name="gender" value="male" id="male" required />\n                <label for="male">Male</label>\n                <input type="radio" name="gender" value="female" id="female" />\n                <label for="female">Female</label>\n                <input type="radio" name="gender" value="others" id="others" />\n                <label for="others">Others</label>\n            </div>\n            <label for="dob">Enter your Date of Birth:</label>\n            <input type="date" id="dob" name="dob" required />\n            <label for="address">Enter your Address:</label>\n            <textarea id="address" name="address" required></textarea>\n            <input type="submit" value="Submit" />\n        </fieldset>\n    </form>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785049255/8ae7e316-1fe0-450c-a81f-81164498dfb1.png"
          }
        },
        {
          heading: "Form Elements",
          description: "Below are essential HTML form elements used to build interactive and user-friendly forms:",
          table: {
            headers: ["Elements", "Descriptions"],
            rows: [
              ["<label>", "It defines labels for <form> elements."],
              ["<input>", "It is used to get input data from various types such as text, password, email, etc by changing its type."],
              ["<button>", "It defines a clickable button to control other elements or execute a functionality."],
              ["<select>", "It is used to create a drop-down list."],
              ["<textarea>", "It is used to get input long text content."],
              ["<fieldset>", "It is used to draw a box around other form elements and group the related data."],
              ["<legend>", "It defines a caption for fieldset elements"],
              ["<datalist>", "It is used to specify pre-defined list options for input controls."],
              ["<output>", "It displays the output of performed calculations."],
              ["<option>", "It is used to define options in a drop-down list."],
              ["<optgroup>", "It is used to define group-related options in a drop-down list."]
            ]
          }
        },
        {
          heading: "Input Types in HTML Forms",
          description: "Here are the commonly used input types in HTML Forms:",
          table: {
            headers: ["Input Type", "Description"],
            rows: [
              [`<input type="text">`, "Defines a one-line text input field"],
              [`<input type="password">`, "Defines a password field"],
              [`<input type="submit">`, "Defines a submit button"],
              [`<input type="reset">`, "Defines a reset button"],
              [`<input type="radio">`, "Defines a radio button"],
              [`<input type="email">`, "Validates that the input is a valid email address."],
              [`<input type="number">`, "Allows the user to enter a number. You can specify min, max, and step attributes for range."],
              [`<input type="checkbox">`, "Used for checkboxes where the user can select multiple options."],
              [`<input type="date">`, "Allows the user to select a date from a calendar."],
              [`<input type="time">`, "Allows the user to select a time."],
              [`<input type="file">`, "Allows the user to select a file to upload."]
            ]
          }
        }
      ]
    },
    {
      id: "html5-semantics",
      title: "HTML5 Semantics",
      sections: [
        {
          heading: "HTML5 Semantics",
          description: "HTML5 semantic elements provide meaningful tags that clearly describe their purpose, improving readability, accessibility, and SEO for both humans and browsers.\n\n- Clearly define the role and content of elements.\n- Improve code readability and structure.\n- Enhance accessibility for screen readers.\n- Help browsers and search engines understand page content.\n- Examples include <form>, <table>, <article>, <header>, and <footer>."
        },
        {
          heading: "Semantic Elements",
          description: "Here are some of the fundamental HTML5 semantic elements that you should use to structure your web content:",
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785057601/573198d9-fe48-42ff-963a-232a2ebe1c9d.png"
          }
        },
        {
          heading: "1. The <article> Tag",
          description: "The <article> tag is used for content that stands alone and can be independently distributed or reused, such as a blog post or news article.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        h1 {\n            color: #006400;\n            font-size: 50px;\n            text-align: left;\n        }\n        p {\n            font-size: 25px;\n            text-align: left;\n            margin-top: 0;\n        }\n    </style>\n</head>\n<body>\n    <article>\n        <h1>GeeksforGeeks</h1>\n        <p>A Computer Science portal for geeks. It contains well written, well thought, and well explained computer science and programming articles, quizzes, and practice/competitive programming/company interview questions.</p>\n    </article>\n</body>\n\n</html>`
        },
        {
          heading: "2. The <aside> Tag",
          description: "The <aside> is used to place content in a sidebar i.e. aside from the existing content. It is related to surrounding content.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        h4 {\n        Color:#006400;\n        font-size:50px;\n        margin-bottom:0px;\n        }\n        p {\n        font-size:25px;\n        margin-top:0px;\n        }\n    </style>\n</head>\n<body>\n    <p>GeeksforGeeks is a Computer Science Portal</p>\n    <aside>\n        <h4>GeeksForGeeks</h4>\n        <p>GeeksforGeeks is a computer Science platform\n            where you can learn good programming.\n        </p>\n    </aside>\n</body>\n</html>`
        },
        {
          heading: "3. The Details and Summary Tag",
          description: "The \"details\" defines additional details that the user can hide or view. \"summary\" defines a visible heading for a \"details\" element.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        .GFG {\n        Color:#006400;\n        font-size:50px;\n        margin-bottom:0px;\n        }\n        p {\n        font-size:25px;\n        margin-top:0px;\n        }\n    </style>\n</head>\n<body>\n    <details>\n        <summary class="GFG"> GeeksforGeeks </summary>\n        <p>GeeksforGeeks is a Computer Science portal\n            where you can learn good programming.\n        </p>\n    </details>\n</body>\n</html>`
        },
        {
          heading: "4. The Figure and Figcaption Tag",
          description: "The <figure> and <figcaption> tags are used together in HTML to display an image (or illustration) with a descriptive caption.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        h2 {\n        Color:#000000;\n        font-size:50px;\n        margin-bottom:0px;\n        }\n        p {\n        font-size:25px;\n        margin-top:0px;\n        }\n    </style>\n</head>\n<body>\n    <h2>CodeSarthi</h2>\n    <figure>\n        <img src="https://res.cloudinary.com/dj0ivep44/image/upload/v1784859614/CodeSarthi-ProfileCloud/nmbyabad0qmin1lu8gpd.jpg" \n             alt="cs" \n             style="width:20%">\n        <figcaption> CodeSarthi Logo </figcaption>\n    </figure>\n</body>\n</html>`,
          image: {
            url: "https://res.cloudinary.com/dj0ivep44/image/upload/v1785057917/159b1401-02a2-441d-ac75-ba5409ca1f30.png"
          }
        },
        {
          heading: "5. The Header Tag",
          description: "As the name suggests, it is for the header of a section introductory of a page. There can be multiple headers on a page.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        h1, h3 {\n        Color:#006400;\n        Text-align:left;\n        margin-bottom:0px;\n        }\n        p {\n        font-size:25px;\n        text-align:left;\n        margin-top:0px;\n        }\n    </style>\n</head>\n<body>\n    <article>\n        <header>\n            <h1>GeeksforGeeks</h1>\n            <h3>GeeksforGeeks</h3>\n            <p>A computer Science portal</p>\n        </header>\n    </article>\n</body>\n</html>`
        },
        {
          heading: "6. The Footer Tag",
          description: "Footer located at the bottom of any article or document, they can contain contact details, copyright information etc. There can be multiple footers on a page.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        p {\n        font-size:25px;\n        text-align:left;\n        margin-top:0px;\n        }\n    </style>\n</head>\n<body>\n    <footer>\n        <p>\n            Posted by: GeeksforGeeks\n        </p>\n        <p>\n            Contact: \n            <a href=\n"https://www.geeksforgeeks.org/">\n                geeksforgeeks.org\n            </a>.\n        </p>\n    </footer>\n</body>\n</html>`
        },
        {
          heading: "7. The Main Tag",
          description: "It defines the main content of the document. The content inside the main tag should be unique.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        h1 {\n        color:#006400;\n        }\n        p {\n        font-size:25px;\n        margin-top:0px;\n        }\n    </style>\n</head>\n<body>\n    <main>\n        <h1>Important Residences</h1>\n        <p>\n            A few of them are \n            Rashtrapati Bhavan, \n            White House etc\n        </p>\n        <article>\n            <h1>Rashtrapati Bhavan</h1>\n            <p>\n                It is the home of \n                the President of India.\n            </p>\n        </article>\n        <article>\n            <h1>The White House</h1>\n            <p>\n                It is the home of the \n                President of United\n                States of America.\n            </p>\n        </article>\n    </main>\n</body>\n</html>`
        },
        {
          heading: "8. The Section Tag",
          description: "A page can be split into sections like Introduction, Contact Information, Details, etc and each of these sections can be in a different section tag.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        h1 {\n        color:#006400;\n        }\n        p {\n        font-size:25px;\n        margin-top:0px;\n        }\n    </style>\n</head>\n<body>\n    <section>\n        <h1>Data Structure</h1>\n        <p>\n            Data Structure is a data\n            organization and storage\n            format that enables efficient\n            access and modification.\n        </p>\n    </section>\n    <section>\n        <h1>Algorithm</h1>\n        <p>\n            A process or set of rules to\n            be followed in calculations\n            or other problem-solving\n            operations, especially by\n            a computer.\n        </p>\n    </section>\n</body>\n</html>`
        },
        {
          heading: "9. The nav Tag",
          description: "The nav tag is used to define a set of navigation links in the form of a navigation bar or nav menu.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        h1 {\n        color:#006400;\n        }\n    </style>\n</head>\n<body>\n    <h1>Navigation Bar</h1>\n    <nav>\n        <a href="/home/">\n            Home\n        </a> |\n        <a href="/about-us/">\n            About Us\n        </a> |\n        <a href="/data-structure/">\n            Data Structure\n        </a> |\n        <a href="/operating-system/">\n            Operating System\n        </a>\n    </nav>\n</body>\n</html>`
        },
        {
          heading: "10. The Mark Tag",
          description: "Mark tag is used to highlight the text.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        h1 {\n        color:#006400;\n        }\n    </style>\n</head>\n<body>\n    <h1>mark tag</h1>\n    <p>\n        GeeksforGeeks is a\n        <mark>Computer Science</mark>\n        portal\n    </p>\n</body>\n</html>`
        },
        {
          heading: "Best Practices for Using HTML5 Semantic Elements",
          description: "- Do not overuse <div>: Use semantic elements where appropriate instead of non-semantic <div> elements to provide more specific information about the content.\n- Structure content logically: Organize the content within semantic elements to reflect the meaning and importance of the information.\n- Validate your HTML: Use tools like the W3C HTML Validator to ensure that your use of semantic elements adheres to HTML5 standards."
        }
      ]
    },
    {
      id: "html-url-encoding",
      title: "HTML URL Encoding",
      sections: [
        {
          heading: "HTML URL Encoding",
          description: "A URL (Uniform Resource Locator) is the address of a website used by browsers to retrieve content, and URL encoding converts unsafe or special characters into a browser-safe format using % followed by two hexadecimal ASCII values.\n\n- Only letters (A–Z, a–z), digits (0–9), and a few special characters are allowed directly; others are encoded.\n- Spaces are encoded as %20 or +, and symbols like $ become %24.\n- Encoded values represent the character’s ASCII code to ensure correct transmission over the web."
        },
        {
          heading: "Syntax",
          description: "A web address follows these syntax rules:\n\n`scheme://subdomain.domain:port/path/filename`\n\n- Scheme: Specifies the protocol used for communication, such as https:// for secure communication or http:// for unsecured communication.\n- Subdomain: An optional part (like www, blog, etc.) that helps identify a specific section of the website within the domain.\n- Domain: Identifies the website’s primary address, such as example.com, representing its unique location on the Internet.\n- Port: Optional and specifies a particular endpoint for communication. Common values are 80 for HTTP and 443 for HTTPS.\n- Path: Specifies the directory or location on the server where the resource is stored.\n- Filename: Refers to the specific file or resource within the given path."
        },
        {
          heading: "Reserved Characters",
          description: "Reserved characters in URLs, like /, ?, #, and :, have special purposes (e.g., / separates path segments) and must be encoded (e.g., %2F) when used as regular data to avoid misinterpretation.\n\nSome characters need to be encoded while some don't need to be. Here is the classification shows the group of characters that need to be encoded.\n\n- Safe Characters: Alphanumeric i.e. 0-9, a-z, and A-Z, special characters $, -, _, ., +, !, *, ', (, ), are reserved characters used for their reserved purposes. These characters have no need to be encoded.\n- ASCII Control characters: It includes characters ranging from 00-1F in hex (0-31 decimal) and 7F (127 decimal). These characters needs to be encoded.\n- Non-ASCII Control characters: It includes 80-FF in hex (128-255 decimal). These characters needs to be encoded.\n- Reserved characters: These characters are used for a special purpose and they require encoding.\n- Unsafe characters: This character can be misunderstood within URLs for various reasons. So it requires encoding. The characters < and > are unsafe because they are used as the delimiters around URLs in free text, the quote mark (\" \") is unsafe as it is used to delimit URLs in some systems.",
          table: {
            headers: ["Character", "Encoded Form"],
            rows: [
              ["!", "%21"], ["*", "%2A"], ["'", "%27"], ["(", "%28"], [")", "%29"], [";", "%3B"],
              [":", "%3A"], ["@", "%40"], ["&", "%26"], ["=", "%3D"], ["+", "%2B"], ["$", "%24"],
              [",", "%2C"], ["/", "%2F"], ["?", "%3F"], ["#", "%23"], ["[", "%5B"], ["]", "%5D"]
            ]
          }
        },
        {
          heading: "Unsafe characters",
          description: "Unsafe characters in URLs, such as spaces, <, >, and \", can break URL syntax or cause errors and must be encoded using % followed by their ASCII hexadecimal values.",
          table: {
            headers: ["Character", "Encoded Form"],
            rows: [
              ["space", "%20"], ["\"", "%22"], ["<", "%3C"], [">", "%3E"], ["#", "%23"], ["%", "%25"],
              ["{", "%7B"], ["}", "%7D"], ["|", "%7C"], ["\\", "%5C"], ["^", "%5E"], ["~", "%7E"],
              ["[", "%5B"], ["]", "%5D"]
            ]
          }
        },
        {
          heading: "URL Encoded Characters",
          description: "URL encoded characters replace unsafe or reserved characters with a % followed by two hexadecimal digits representing the character’s ASCII code, ensuring safe transmission in URLs.",
          table: {
            headers: ["CHARACTER", "ENCODED FORM"],
            rows: [
              ["backspace", "%08"], ["tab", "%09"], ["linefeed", "%0A"], ["c return", "%0D"],
              ["space", "%20"], ["!", "%21"], ["\"", "%22"], ["#", "%23"], ["$", "%24"], ["%", "%25"],
              ["&", "%26"], ["'", "%27"], ["(", "%28"], [")", "%29"], ["*", "%2A"], ["+", "%2B"],
              [",", "%2C"], ["-", "%2D"], [".", "%2E"], ["/", "%2F"], ["0", "%30"], ["1", "%31"],
              ["2", "%32"], ["3", "%33"], ["4", "%34"], ["5", "%35"], ["6", "%36"], ["7", "%37"],
              ["8", "%38"], ["9", "%39"], [":", "%3A"], [";", "%3B"], ["<", "%3C"], ["=", "%3D"],
              [">", "%3E"], ["?", "%3F"], ["@", "%40"], ["A", "%41"], ["B", "%42"], ["C", "%43"],
              ["D", "%44"], ["E", "%45"], ["F", "%46"], ["G", "%47"], ["H", "%48"], ["I", "%49"],
              ["J", "%4A"], ["K", "%4B"], ["L", "%4C"], ["M", "%4D"], ["N", "%4E"], ["O", "%4F"],
              ["P", "%50"], ["Q", "%51"], ["R", "%52"], ["S", "%53"], ["T", "%54"], ["U", "%55"],
              ["V", "%56"], ["W", "%57"], ["X", "%58"], ["Y", "%59"], ["Z", "%5A"], ["[", "%5B"],
              ["\\", "%5C"], ["]", "%5D"], ["^", "%5E"], ["_", "%5F"], ["`", "%60"], ["a", "%61"],
              ["b", "%62"], ["c", "%63"], ["d", "%64"], ["e", "%65"], ["f", "%66"], ["g", "%67"],
              ["h", "%68"], ["i", "%69"], ["j", "%6A"], ["k", "%6B"], ["l", "%6C"], ["m", "%6D"],
              ["n", "%6E"], ["o", "%6F"], ["p", "%70"], ["q", "%71"], ["r", "%72"], ["s", "%73"],
              ["t", "%74"], ["u", "%75"], ["v", "%76"], ["w", "%77"], ["x", "%78"], ["y", "%79"],
              ["z", "%7A"], ["{", "%7B"], ["|", "%7C"], ["}", "%7D"], ["~", "%7E"], [" ", "%7F"],
              ["`", "%E2%82%AC"], ["", "%81"], ["‚", "%E2%80%9A"], ["ƒ", "%C6%92"], ["„", "%E2%80%9E"],
              ["…", "%E2%80%A6"], ["†", "%E2%80%A0"], ["‡", "%E2%80%A1"], ["ˆ", "%CB%86"], ["‰", "%E2%80%B0"],
              ["Š", "%C5%A0"], ["‹", "%E2%80%B9"], ["Œ", "%C5%92"], ["", "%C5%8D"], ["Ž", "%C5%BD"],
              ["", "%8F"], ["", "%C2%90"], ["‘", "%E2%80%98"], ["’", "%E2%80%99"], ["“", "%E2%80%9C"],
              ["”", "%E2%80%9D"], ["•", "%E2%80%A2"], ["–", "%E2%80%93"], ["—", "%E2%80%94"], ["˜", "%CB%9C"],
              ["™", "%E2%84"], ["š", "%C5%A1"], ["›", "%E2%80"], ["œ", "%C5%93"], ["", "%9D"],
              ["ž", "%C5%BE"], ["Ÿ", "%C5%B8"], [" ", "%C2%A0"], ["¡", "%C2%A1"], ["¢", "%C2%A2"],
              ["£", "%C2%A3"], ["¤", "%C2%A4"], ["¥", "%C2%A5"], ["¦", "%C2%A6"], ["§", "%C2%A7"],
              ["¨", "%C2%A8"], ["©", "%C2%A9"], ["ª", "%C2%AA"], ["«", "%C2%AB"], ["¬", "%C2%AC"],
              ["", "%C2%AD"], ["®", "%C2%AE"], ["¯", "%C2%AF"], ["°", "%C2%B0"], ["±", "%C2%B1"],
              ["²", "%C2%B2"], ["³", "%C2%B3"], ["´", "%C2%B4"], ["µ", "%C2%B5"], ["¶", "%C2%B6"],
              ["·", "%C2%B7"], ["¸", "%C2%B8"], ["¹", "%C2%B9"], ["º", "%C2%BA"], ["»", "%C2%BB"],
              ["¼", "%C2%BC"], ["½", "%C2%BD"], ["¾", "%C2%BE"], ["¿", "%C2%BF"], ["À", "%C3%80"],
              ["Á", "%C3%81"], ["Â", "%C3%82"], ["Ã", "%C3%83"], ["Ä", "%C3%84"], ["Å", "%C3%85"],
              ["Æ", "%C3%86"], ["Ç", "%C3%87"], ["È", "%C3%88"], ["É", "%C3%89"], ["Ê", "%C3%8A"],
              ["Ë", "%C3%8B"], ["Ì", "%C3%8C"], ["Í", "%C3%8D"], ["Î", "%C3%8E"], ["Ï", "%C3%8F"],
              ["Ð", "%C3%90"], ["Ñ", "%C3%91"], ["Ò", "%C3%92"], ["Ó", "%C3%93"], ["Ô", "%C3%94"],
              ["Õ", "%C3%95"], ["Ö", "%C3%96"], ["×", "%C3%97"], ["Ø", "%C3%98"], ["Ù", "%C3%99"],
              ["Ú", "%C3%9A"], ["Û", "%C3%9B"], ["Ü", "%C3%9C"], ["Ý", "%C3%9D"], ["Þ", "%C3%9E"],
              ["ß", "%C3%9F"], ["à", "%C3%A0"], ["á", "%C3%A1"], ["â", "%C3%A2"], ["ã", "%C3%A3"],
              ["ä", "%C3%A4"], ["å", "%C3%A5"], ["æ", "%C3%A6"], ["ç", "%C3%A7"], ["è", "%C3%A8"],
              ["é", "%C3%A9"], ["ê", "%C3%AA"], ["ë", "%C3%AB"], ["ì", "%C3%AC"], ["í", "%C3%AD"],
              ["î", "%C3%AE"], ["ï", "%C3%AF"], ["ð", "%C3%B0"], ["ñ", "%C3%B1"], ["ò", "%C3%B2"],
              ["ó", "%C3%B3"], ["ô", "%C3%B4"], ["õ", "%C3%B5"], ["ö", "%C3%B6"], ["÷", "%C3%B7"],
              ["ø", "%C3%B8"], ["ù", "%C3%B9"], ["ú", "%C3%BA"], ["û", "%C3%BB"], ["ü", "%C3%BC"],
              ["ý", "%C3%BD"], ["þ", "%C3%BE"], ["ÿ", "%C3%BF"]
            ]
          }
        }
      ]
    },
    {
      id: "html-responsive-web-design",
      title: "HTML Responsive Web Design",
      sections: [
        {
          heading: "HTML Responsive Web Design",
          description: "Responsive Web Design (RWD) is a web development approach that ensures web pages automatically adjust their layout and elements to look and function properly on any device. It allows content to resize, reposition, or hide dynamically for an optimal viewing experience.\n\n- Uses flexible grids and layouts that adapt to different screen sizes.\n- Employs CSS media queries to apply styles based on device characteristics.\n- Ensures images and media scale proportionally across all screen sizes.\n- Improves user experience while eliminating the need for separate mobile and desktop websites.\n\nHTML Responsive Web Design can be implemented using various techniques such as viewport settings, flexible images, scalable text, media queries, and modern layout systems."
        },
        {
          heading: "1. HTML Viewport meta Tag",
          description: "The HTML viewport defines the visible area of a webpage on a device screen. It helps control how a webpage is scaled and displayed across different devices.\n\n- Sets the page width to match the device width for proper scaling.\n- Ensures content adapts correctly to different screen sizes for responsive layouts.\n\nSyntax:\n`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        .gfg {\n            font-size: 40px;\n            font-weight: bold;\n            color: green;\n            text-align: center;\n        }\n        .geeks {\n            font-size: 17px;\n            text-align: center;\n        }\n        p {\n            text-align: justify;\n        }\n    </style>\n</head>\n<body>\n    <div class="gfg">GeeksforGeeks</div>\n    <div class="geeks">HTML Introduction</div>\n\n    <p>\n        HTML stands for HyperText Markup Language. It is\n        used to design web pages using a markup\n        language. HTML is a combination of Hypertext and\n        Markup language. Hypertext defines the link\n        between web pages. A markup language is used to\n        define the text document within the tag which\n        defines the structure of web pages. This\n        language is used to annotate (make notes for the\n        computer) text so that a machine can understand\n        it and manipulate text accordingly. Most markup\n        languages (e.g. HTML) are human-readable. The\n        language uses tags to define what manipulation\n        has to be done on the text.\n    </p>\n</body>\n</html>`
        },
        {
          heading: "2. Responsive Images",
          description: "Responsive images play a key role in responsive websites. These are images that can adjust their size, getting bigger or smaller, based on the width of the browser. By being responsive, images enhance user experience across different devices with varying screen sizes.\n\n1. Using width Property\nThe image can be responsive & scale up & down with the help of CSS width property by setting its value as 100%.\n\nSyntax:\n`<img src=\"...\" style=\"width:100%;\">`",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <img class=".img-fluid" src=\n"https://media.geeksforgeeks.org/wp-content/uploads/20220201191443/logo-200x32.png"\n         style="width: 100%" />\n    <h2>Responsive Images</h2>\n    <p>\n        Responsive images are just a part of Responsive\n        websites. Images that can change their\n        dimensions, scaling them up or down, according\n        to the browser width are responsive images. The\n        above image is responsive as it is adjusting\n        itself according to the width of the browser.\n    </p>\n</body>\n</html>`
        },
        {
          heading: "3. Using the max-width Property",
          description: "The max-width property defines the maximum width an element can expand to, preventing it from exceeding a specified value. It helps maintain responsiveness by ensuring elements do not overflow their container.\n\n- Prevents images or elements from growing beyond their original or container width.\n- Commonly used with height: auto; to maintain proper aspect ratio in responsive designs.\n\nSyntax:\n`<img src=\"...\" style=\"max-width:100%; height:auto;\">`",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <img class=".img-fluid"\n         src=\n"https://media.geeksforgeeks.org/wp-content/uploads/20220201191443/logo-200x32.png"\n         style="max-width:100%;\n                height:auto;" />\n    <h2>Responsive Images</h2>\n    <p>\n        Responsive images are just a part of Responsive\n        websites. Images that can change their\n        dimensions, scaling them up or down, according\n        to the browser width are responsive images. The\n        above image is responsive as it is adjusting\n        itself according to the width of the browser.\n    </p>\n</body>\n</html>`
        },
        {
          heading: "4. Responsive Images for Different Screen Sizes",
          description: "The <picture> element allows developers to display different images based on the screen size or device characteristics. It provides flexibility to serve the most appropriate image depending on the browser width.\n\n- Uses multiple <source> elements with media conditions to define breakpoints.\n- Improves performance and responsiveness by loading optimized images for each screen size.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body style="text-align: center;">\n    <h1 style="color: green;">GeeksforGeeks</h1>\n    <h2>HTML picture Tag</h2>\n    <picture>\n        <source media="(min-width: 700px)"\n                srcset=\n"https://media.geeksforgeeks.org/wp-content/uploads/20190825000042/geeks-221.png">\n        <source media="(min-width: 450px)"\n                srcset=\n"https://media.geeksforgeeks.org/wp-content/uploads/20190802021607/geeks14.png">\n        <img src=\n"https://media.geeksforgeeks.org/wp-content/uploads/20190808102629/geeks15.png"\n             alt="GFG">\n    </picture>\n</body>\n</html>`
        },
        {
          heading: "5. Responsive Texts",
          description: "Responsive text adjusts its size based on the screen or viewport dimensions using relative units instead of fixed pixel values, ensuring better readability across devices.\n\n- Uses relative units like %, vw, vh, em, and rem for dynamic scaling.\n- Adjusts automatically according to viewport width and height.\n- Maintains readability and layout consistency across different screen sizes.",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body {\n            max-width: 100%;\n        }\n\n        .gfg {\n            font-size: 7vw;\n            font-weight: bold;\n            color: green;\n            text-align: center;\n        }\n\n        .geeks {\n            font-size: 5vw;\n            text-align: center;\n        }\n\n        p {\n            font-size: 3vw;\n            text-align: justify;\n        }\n    </style>\n</head>\n<body>\n    <div class="gfg">GeeksforGeeks</div>\n    <div class="geeks">HTML Introduction</div>\n    <p>\n        HTML stands for HyperText Markup Language. It is\n        used to design web pages using a markup\n        language. HTML is a combination of Hypertext and\n        Markup language. Hypertext defines the link\n        between web pages. A markup language is used to\n        define the text document within the tag which\n        defines the structure of web pages. This\n        language is used to annotate (make notes for the\n        computer) text so that a machine can understand\n        it and manipulate text accordingly. Most markup\n        languages (e.g. HTML) are human-readable. The\n        language uses tags to define what manipulation\n        has to be done on the text.\n    </p>\n</body>\n</html>`
        },
        {
          heading: "6. CSS Media Queries",
          description: "The Media query in CSS is essential for crafting responsive web designs. It ensures that web pages adapt to various screen sizes and device types. Breakpoints are set to define when the content starts to adjust or change layout based on the device's width.\n\nMedia queries can be used to check many things:\n- width and height of the viewport\n- width and height of the device\n- Orientation\n- Resolution\n\nSyntax:\n\`@media not | only mediatype and (expression) {\n    // Code content\n}\`",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        .gfg {\n            font-size: 100px;\n            font-weight: bold;\n            color: green;\n            text-align: center;\n        }\n        .geeks {\n            font-size: 50px;\n            text-align: center;\n        }\n        p {\n            font-size: 25px;\n            text-align: justify;\n        }\n        @media screen and (max-width: 800px) {\n            body {\n                background-color: aqua;\n            }\n            .gfg {\n                font-size: 50px;\n            }\n            .geeks {\n                font-size: 25px;\n            }\n            p {\n                font-size: 12px;\n            }\n        }\n    </style>\n</head>\n<body>\n    <div class="gfg">GeeksforGeeks</div>\n    <div class="geeks">HTML Introduction</div>\n    <p>\n        HTML stands for HyperText Markup Language. It is\n        used to design web pages using a markup\n        language. HTML is a combination of Hypertext and\n        Markup language. Hypertext defines the link\n        between web pages. A markup language is used to\n        define the text document within the tag which\n        defines the structure of web pages. This\n        language is used to annotate (make notes for the\n        computer) text so that a machine can understand\n        it and manipulate text accordingly. Most markup\n        languages (e.g. HTML) are human-readable. The\n        language uses tags to define what manipulation\n        has to be done on the text.\n    </p>\n</body>\n</html>`
        },
        {
          heading: "7. Responsive Layouts",
          description: "Responsive layouts in CSS use modern layout systems like Flexbox, Grid, and Multi-Column to automatically adjust content based on screen size. The responsive layout module of CSS includes the following properties:\n\n1. Using flexbox property\nIn this approach, we will use CSS display property to make the page responsive. Display layouts like flexbox, inline, blocks, and grids can be used to make the design responsive. CSS flexbox property auto adjusts the content (no. of columns in a row) according to the screen width.\n\nSyntax:\n\`.container{\n    display: flex;\n}\`",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        body {\n            background-color: aqua;\n        }\n        .gfg {\n            font-size: 5vw;\n            font-weight: bold;\n            color: green;\n            text-align: center;\n        }\n        button {\n            width: 300px;\n            font-size: larger;\n        }\n        .container {\n            display: flex;\n            flex-wrap: wrap;\n        }\n    </style>\n</head>\n<body>\n    <div class="gfg">GeeksforGeeks</div>\n    <div class="container">\n        <button>HTML</button>\n        <button>CSS</button>\n        <button>JavaScript</button>\n    </div>\n</body>\n</html>`
        },
        {
          heading: "8. Using CSS Grids",
          description: "This approach uses a CSS display grid to create a 2D layout along with other grid options. It allows us to decide the number of columns we want to keep and instead of rearranging the columns like Flexbox, it adjusts the content within individual column elements.\n\nSyntax\n\`.container{\n    display: grid;\n     /* To define colums*/\n    grid-template-columns: 1fr 1fr; \n}\`",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        body {\n            background-color: aqua;\n        }\n        .gfg {\n            font-size: 5vw;\n            font-weight: bold;\n            color: green;\n            text-align: center;\n        }\n        .container {\n            font-size: x-large;\n            text-align: center;\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n        }\n        .grid-item {\n            background-color: rgb(220, 208, 232);\n            border: 2px solid rgb(70, 54, 84);\n        }\n    </style>\n</head>\n<body>\n    <div class="gfg">GeeksforGeeks</div>\n    <div class="container">\n        <div class="grid-item">HTML</div>\n        <div class="grid-item">CSS</div>\n        <div class="grid-item">JavaScript</div>\n        <div class="grid-item">Bootstrap</div>\n    </div>\n</body>\n</html>`
        },
        {
          heading: "9. Using CSS Multi-Column",
          description: "CSS Multi-Column layout is used to divide content into multiple vertical columns within a container. It automatically distributes text across the defined number of columns, improving readability in content-heavy layouts.\n\nSyntax:\n\`.container{\n    column-count: 3;                          /* Number of columns*/\n    column-gap: 20px;                      /* Gap between columns*/\n    column-width: 200px;                 /* Width of each column*/\n    /* Other column properties*/\n}\`",
          language: "html",
          code: `<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n    <style>\n        body {\n            background-color: aqua;\n        }\n        .gfg {\n            font-size: 5vw;\n            font-weight: bold;\n            color: green;\n            text-align: center;\n        }\n        .container {\n            font-size: x-large;\n            text-align: left;\n            column-count: 3;\n            column-gap: 5%;\n        }\n    </style>\n</head>\n<body>\n    <div class="gfg">GeeksforGeeks</div>\n    <div class="container">\n        <div>\n            HTML stands for HyperText Markup Language.\n            It is used to design web pages using a\n            markup language. HTML is a combination of\n            Hypertext and Markup language. Hypertext\n            defines the link between web pages. A markup\n            language is used to define the text document\n            within the tag which defines the structure\n            of web pages. This language is used to\n            annotate (make notes for the computer) text\n            so that a machine can understand it and\n            manipulate text accordingly. Most markup\n            languages (e.g. HTML) are human-readable.\n            The language uses tags to define what\n            manipulation has to be done on the text.\n        </div>\n    </div>\n</body>\n</html>`
        }
      ]
    }
  ],
};
