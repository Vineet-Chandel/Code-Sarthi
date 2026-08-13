// Central registry of every technology block shown on the home grid.
// Each entry has a `category` that maps to one of the 5 professional divisions.
// Adding a new technology = add entry here + content file in ./content/
// No UI code changes needed — Home.jsx and DocPage render generically.

export const categories = [
  { id: "web", label: "Web Development", icon: "Globe" },
  { id: "languages", label: "Programming Languages", icon: "Code" },
  { id: "app", label: "App Development", icon: "Smartphone" },
  { id: "databases", label: "Databases", icon: "Database" },
  { id: "tools", label: "Important Tools", icon: "Wrench" },
];

export const technologies = [
  // ─── Web Development ────────────────────────────────────────────────────────
  { id: "html", name: "HTML", tagline: "Structure & semantics", description: "The standard markup language used to build the foundational structure and semantics of web pages and applications.", color: "#E34F26", icon: "FileCode2", category: "web" },
  { id: "css", name: "CSS", tagline: "Layout & styling", description: "Style sheet language used for describing the presentation of a document written in HTML, including colors, layout, and fonts.", color: "#2965F1", icon: "Palette", category: "web" },
  { id: "tailwind", name: "Tailwind CSS", tagline: "Utility-first styling", description: "A utility-first CSS framework packed with classes like flex, pt-4, and text-center that can be composed to build any design.", color: "#38BDF8", icon: "Wind", category: "web" },
  { id: "react", name: "React", tagline: "Components & hooks", description: "A JavaScript library for building user interfaces based on UI components, state management, and modern hooks.", color: "#61DAFB", icon: "Atom", category: "web" },
  { id: "node", name: "Node.js", tagline: "Runtime & modules", description: "An asynchronous event-driven JavaScript runtime designed to build scalable network applications outside the browser.", color: "#5FA04E", icon: "Server", category: "web" },
  { id: "jquery", name: "jQuery", tagline: "DOM manipulation", description: "A fast, small, and feature-rich JavaScript library that makes HTML document traversal and manipulation much simpler.", color: "#0769AD", icon: "DollarSign", category: "web" },
  { id: "htmx", name: "HTMX", tagline: "HTML-driven interactivity", description: "Allows you to access AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes.", color: "#3D72D7", icon: "Zap", category: "web" },
  { id: "express", name: "Express", tagline: "Node.js web framework", description: "Fast, unopinionated, minimalist web framework for Node.js, providing robust features for web and mobile applications.", color: "#68A063", icon: "Layers", category: "web" },
  { id: "django", name: "Django", tagline: "Python web framework", description: "A high-level Python web framework that encourages rapid development and clean, pragmatic design with batteries included.", color: "#44B78B", icon: "Shield", category: "web" },
  { id: "flask", name: "Flask", tagline: "Micro web framework", description: "A lightweight WSGI web application framework in Python that is designed to make getting started quick and easy.", color: "#9DA1AA", icon: "FlaskConical", category: "web" },
  { id: "fastapi", name: "FastAPI", tagline: "Modern Python API", description: "A modern, fast web framework for building APIs with Python based on standard Python type hints.", color: "#009688", icon: "Rocket", category: "web" },
  { id: "restapi", name: "REST API", tagline: "Network architecture", description: "A standard architectural style for designing networked applications and web services.", color: "#005C84", icon: "ServerCog", category: "web" },
  { id: "socketio", name: "Socket.IO", tagline: "Realtime communication", description: "Enables real-time, bidirectional and event-based communication between the browser and the server.", color: "#25C2A0", icon: "Radio", category: "web" },
  { id: "graphql", name: "GraphQL", tagline: "Query language for APIs", description: "A query language for your API and a server-side runtime for executing queries using a type system.", color: "#E10098", icon: "Network", category: "web" },
  { id: "scss", name: "Sass / SCSS", tagline: "CSS with superpowers", description: "A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS).", color: "#CC6699", icon: "Paintbrush", category: "web" },
  { id: "markdown", name: "Markdown", tagline: "Lightweight markup", description: "A lightweight markup language for creating formatted text using a plain-text editor, widely used for documentation.", color: "#6DB7E8", icon: "FileText", category: "web" },
  { id: "yaml", name: "YAML", tagline: "Data serialization", description: "A human-friendly data serialization standard for all programming languages, often used for configuration files.", color: "#CB171E", icon: "FileCode", category: "web" },
  { id: "json", name: "JSON", tagline: "Data interchange format", description: "An open standard file format and data interchange format that uses human-readable text to store and transmit data objects.", color: "#5D9FD4", icon: "FileJson", category: "web" },

  // ─── Programming Languages ──────────────────────────────────────────────────
  { id: "javascript", name: "JavaScript", tagline: "Language fundamentals", description: "A versatile programming language that conforms to the ECMAScript specification, powering the modern interactive web.", color: "#F7DF1E", icon: "Braces", category: "languages" },
  { id: "typescript", name: "TypeScript", tagline: "Types & tooling", description: "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.", color: "#3178C6", icon: "FileType2", category: "languages" },
  { id: "python", name: "Python", tagline: "Readable & powerful", description: "An interpreted, high-level, general-purpose programming language known for its readability and versatile standard library.", color: "#3776AB", icon: "Code", category: "languages" },
  { id: "java", name: "Java", tagline: "Object-oriented & robust", description: "A high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.", color: "#ED8B00", icon: "Coffee", category: "languages" },
  { id: "c", name: "C", tagline: "Systems programming", description: "A general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion.", color: "#A8B9CC", icon: "Terminal", category: "languages" },
  { id: "cpp", name: "C++", tagline: "Performance & systems", description: "A high-performance, general-purpose programming language extending C with object-oriented features, generic programming, and standard library containers.", color: "#00599C", icon: "Cpu", category: "languages" },
  { id: "csharp", name: "C#", tagline: ".NET & enterprise apps", description: "A modern, object-oriented, and type-safe programming language spanning from desktop to cloud and mobile apps.", color: "#9B4F96", icon: "Hash", category: "languages" },
  { id: "rust", name: "Rust", tagline: "Memory-safe & fast", description: "A multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.", color: "#CE422B", icon: "Wrench", category: "languages" },
  { id: "ruby", name: "Ruby", tagline: "Elegant & expressive", description: "An interpreted, high-level, general-purpose programming language which focuses on simplicity and productivity.", color: "#CC342D", icon: "Gem", category: "languages" },
  { id: "bash", name: "Bash", tagline: "Shell scripting", description: "A Unix shell and command language that is the default login shell for most Linux distributions and Apple's macOS.", color: "#4EAA25", icon: "SquareTerminal", category: "languages" },
  { id: "matlab", name: "MATLAB", tagline: "Numerical computing", description: "A proprietary multi-paradigm programming language and numeric computing environment used heavily by engineers and scientists.", color: "#E16737", icon: "BarChart2", category: "languages" },
  { id: "numpy", name: "NumPy", tagline: "Python array computing", description: "The fundamental package for scientific computing with Python, offering powerful N-dimensional array objects.", color: "#4DABCF", icon: "Calculator", category: "languages" },
  { id: "pandas", name: "Pandas", tagline: "Python data analysis", description: "A fast, powerful, flexible and easy to use open source data analysis and manipulation tool built on top of Python.", color: "#9775FA", icon: "Table2", category: "languages" },
  { id: "dsa", name: "DSA", tagline: "Data Structures & Algorithms", description: "Essential Data Structures, Algorithms, problem-solving techniques, patterns, and golden rules for technical coding interviews.", color: "#F59E0B", icon: "Network", category: "languages" },

  // ─── App Development ────────────────────────────────────────────────────────
  { id: "swift", name: "Swift", tagline: "iOS & macOS apps", description: "A powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS created by Apple.", color: "#F05138", icon: "AppleIcon", category: "app" },
  { id: "dart", name: "Dart", tagline: "Flutter & web apps", description: "A client-optimized language for fast apps on any platform, heavily utilized by the Flutter UI toolkit.", color: "#0175C2", icon: "Triangle", category: "app" },
  { id: "reactnative", name: "React Native", tagline: "Cross-platform mobile", description: "An open-source UI software framework created by Meta Platforms to develop applications for Android, iOS, Web and UWP.", color: "#61DAFB", icon: "Smartphone", category: "app" },
  { id: "flutter", name: "Flutter", tagline: "Beautiful native UIs", description: "An open-source UI software development kit created by Google used to develop cross platform applications.", color: "#54C5F8", icon: "Layout", category: "app" },

  // ─── Databases ──────────────────────────────────────────────────────────────
  { id: "mysql", name: "MySQL", tagline: "Relational database", description: "An open-source relational database management system based on SQL, ideal for both small and large applications.", color: "#4479A1", icon: "Database", category: "databases" },
  { id: "postgresql", name: "PostgreSQL", tagline: "Advanced SQL database", description: "A powerful, open source object-relational database system with over 35 years of active development.", color: "#336791", icon: "Database", category: "databases" },
  { id: "mongodb", name: "MongoDB", tagline: "NoSQL document store", description: "A source-available cross-platform document-oriented database program, classified as a NoSQL database program.", color: "#47A248", icon: "Leaf", category: "databases" },
  { id: "neo4j", name: "Neo4j", tagline: "Graph database", description: "A graph database management system described by its developers as an ACID-compliant transactional database.", color: "#018BFF", icon: "GitMerge", category: "databases" },

  // ─── Important Tools ────────────────────────────────────────────────────────
  { id: "docker", name: "Docker", tagline: "Container platform", description: "A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.", color: "#2496ED", icon: "Box", category: "tools" },
  { id: "kubernetes", name: "Kubernetes", tagline: "Container orchestration", description: "An open-source container orchestration system for automating software deployment, scaling, and management.", color: "#326CE5", icon: "Boxes", category: "tools" },
  { id: "npm", name: "npm", tagline: "Node package manager", description: "A package manager for the JavaScript programming language, functioning as the default package manager for Node.js.", color: "#CB0000", icon: "Package", category: "tools" },
  { id: "git", name: "Git", tagline: "Version control", description: "A distributed version control system that tracks changes in any set of computer files, usually used for source code management.", color: "#F05032", icon: "GitBranch", category: "tools" },
  { id: "vscode", name: "VS Code", tagline: "Code editor", description: "A streamlined code editor with support for development operations like debugging, task running, and version control.", color: "#007ACC", icon: "Code2", category: "tools" },
  { id: "vim", name: "Vim", tagline: "Terminal text editor", description: "A highly configurable text editor built to make creating and changing any kind of text very efficient.", color: "#019733", icon: "Terminal", category: "tools" },
  { id: "homebrew", name: "Homebrew", tagline: "macOS package manager", description: "A free and open-source software package management system that simplifies the installation of software on Apple's macOS.", color: "#FBB040", icon: "Beer", category: "tools" },
  { id: "github", name: "GitHub", tagline: "Code hosting & collab", description: "A provider of Internet hosting for software development and version control using Git, offering distributed version control.", color: "#E0E0E0", icon: "Github", category: "tools" },
  { id: "githubactions", name: "GitHub Actions", tagline: "CI/CD automation", description: "A continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline.", color: "#2088FF", icon: "Play", category: "tools" },
  { id: "selenium", name: "Selenium", tagline: "Browser automation", description: "An umbrella project for a range of tools and libraries that enable and support the automation of web browsers.", color: "#43B02A", icon: "MousePointerClick", category: "tools" },
  { id: "latex", name: "LaTeX", tagline: "Document typesetting", description: "A software system for document preparation. When writing, the writer uses plain text as opposed to formatted text.", color: "#008080", icon: "BookOpen", category: "tools" },
  { id: "emmet", name: "Emmet", tagline: "HTML/CSS shortcuts", description: "A set of plug-ins for text editors that allow for high-speed coding and editing in HTML, XML, XSLT, and other structured code.", color: "#FC8A24", icon: "Zap", category: "tools" },
  { id: "chatgpt", name: "ChatGPT", tagline: "AI prompts & API", description: "An artificial intelligence chatbot developed by OpenAI, useful for generating boilerplate, debugging, and explaining code.", color: "#10A37F", icon: "Sparkles", category: "tools" },
  { id: "uiux", name: "UI/UX", tagline: "Design principles", description: "Best practices, design tips, and patterns for creating excellent user interfaces and user experiences.", color: "#E84C88", icon: "Palette", category: "tools" },
];

export const getTechById = (id) => technologies.find((t) => t.id === id);
export const getTechsByCategory = (catId) => technologies.filter((t) => t.category === catId);
