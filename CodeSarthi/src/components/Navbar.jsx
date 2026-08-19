import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "../utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    { name: "Product", href: "#" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoSrc} alt="CodeSarthi Logo" className="h-8 w-auto object-contain" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="https://codesarthi.in"
            className="group flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all"
          >
            Open CodeSarthi
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-600 dark:text-zinc-400"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-zinc-800 py-4 px-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-600 dark:text-zinc-400 px-2 py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
          <a
            href="https://codesarthi.in"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
          >
            Open CodeSarthi
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}
