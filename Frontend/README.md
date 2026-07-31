# CodeSarthi Frontend

Welcome to the frontend repository of **CodeSarthi**. This project is built using modern web development practices to deliver a highly responsive, interactive, and performant user interface. 

This document provides a comprehensive overview of the frontend architecture, technology stack, and guidelines for development.

## 🚀 Tech Stack & Libraries

The frontend is bootstrapped with [Vite](https://vitejs.dev/) and leverages a powerful ecosystem of modern tools:

### Core Frameworks
- **[React 19](https://react.dev/)**: Core UI library.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for lightning-fast HMR and optimized builds.
- **[React Router DOM](https://reactrouter.com/)**: Declarative routing for single-page applications.

### State Management & Data Fetching
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: Centralized, predictable state management.
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client for API requests.
- **[Socket.io Client](https://socket.io/)**: Real-time bidirectional event-based communication.

### Styling & UI Components
- **[Tailwind CSS v3](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[Shadcn UI](https://ui.shadcn.com/)** & **[DaisyUI](https://daisyui.com/)**: Pre-built, customizable UI components.
- **[Lucide React](https://lucide.dev/)** & **[Hugeicons](https://hugeicons.com/)**: Comprehensive icon libraries.

### Animation & Data Visualization
- **[GSAP](https://gsap.com/)** & **[Framer Motion](https://motion.dev/)**: Industry-standard libraries for complex, fluid micro-animations.
- **[Recharts](https://recharts.org/)**: Composable charting library built on React components.

### Core Features & Utilities
- **[@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)**: VS Code-like coding experience in the browser.
- **Export Utilities**: `html2canvas`, `jspdf`, and `react-to-print` for document generation.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)

---

## 📦 Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `Frontend` directory and add the required environment variables (e.g., API endpoints, Socket URLs).
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and minifies the application for production deployment into the `dist/` folder. |
| `npm run lint` | Analyzes the code using ESLint to catch syntax and styling errors. |
| `npm run preview` | Boots up a local static web server that serves the files from `dist/` to preview the production build. |

---

## 📁 Project Structure 

```text
Frontend/
├── public/               # Static assets that are not processed by Vite
├── src/                  
│   ├── assets/           # Images, fonts, and global CSS
│   ├── components/       # Reusable, modular UI components (Buttons, Modals, etc.)
│   ├── pages/            # Page-level components representing distinct routes
│   ├── store/            # Redux slices and store configuration
│   ├── utils/            # Helper functions and utilities
│   ├── App.jsx           # Root application component
│   └── main.jsx          # Entry point for React and DOM rendering
├── .env                  # Environment variables (ignored by Git)
├── eslint.config.js      # ESLint configuration and rules
├── tailwind.config.js    # Tailwind CSS configuration and theme extensions
├── vite.config.js        # Vite build tool configuration
└── package.json          # Project dependencies and scripts
```

---

## 🎨 Development Guidelines

1. **Component Driven Design:** Keep components small, modular, and single-responsibility.
2. **Styling:** Strictly use Tailwind CSS utility classes. Avoid writing custom CSS unless absolutely necessary (in `index.css`). Use `clsx` and `tailwind-merge` for dynamic class assignment.
3. **State Management:** Use local `useState` for UI-specific state. Use Redux Toolkit for global application state (user auth, active coding sessions, etc.).
4. **Code Quality:** Ensure there are no ESLint warnings before pushing code. Format your code consistently.

## 🐳 Docker Support

This frontend application is designed to be easily containerized. Ensure that when building the Docker image, the `.dockerignore` file prevents the `node_modules` and `dist` directories from being copied to the image unnecessarily.
