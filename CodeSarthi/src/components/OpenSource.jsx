import { Github } from "./GithubIcon";

export function OpenSource() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 text-zinc-100 dark:text-zinc-900/50 transform rotate-12 pointer-events-none">
            <Github size={240} />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 mb-6">
              <Github size={24} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
              Explore the project. Follow the journey.
            </h2>
            
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg">
              This repository represents the public-facing side of CodeSarthi. It serves as our gateway to developers, showcasing our ecosystem and mission. 
            </p>
            
            <a
              href="https://github.com/Vineet-Chandel/Code-Sarthi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <Github size={18} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
