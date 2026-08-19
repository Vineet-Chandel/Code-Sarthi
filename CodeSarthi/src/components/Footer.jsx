import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { Github } from "./GithubIcon";

export function Footer() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains("dark"));

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const logoSrc = isDark
    ? "https://res.cloudinary.com/dj0ivep44/image/upload/v1786857279/CodeSarthi-Notes/tzgqyedrcsv6k5k7tqqc.png"
    : "https://res.cloudinary.com/dj0ivep44/image/upload/v1787130204/ChatGPT_Image_Aug_19_2026_02_33_05_PM_cldnih.png";

  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logoSrc} alt="CodeSarthi Logo" className="h-6 w-auto opacity-80" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The ecosystem for developers and teams.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://codesarthi.in"
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-2 text-sm"
            >
              <Globe size={18} />
              Main Website
            </a>
            <a
              href="https://github.com/Vineet-Chandel/Code-Sarthi"
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-2 text-sm"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} CodeSarthi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
