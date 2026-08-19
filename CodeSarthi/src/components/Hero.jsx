import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 z-0 mask-image-fade" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100"></span>
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            The Developer Ecosystem
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl mb-6"
        >
          Build better. <br className="hidden md:block" />
          Collaborate smarter. <br className="hidden md:block" />
          <span className="text-zinc-500 dark:text-zinc-400">Grow together.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10"
        >
          CodeSarthi brings the tools developers and teams need to build, collaborate, manage projects, and grow — all in one unified ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <a
            href="https://codesarthi.in"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-base font-medium rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-lg shadow-zinc-900/20 dark:shadow-white/10"
          >
            Open CodeSarthi
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            Explore the ecosystem
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .mask-image-fade {
          mask-image: radial-gradient(circle at center top, black, transparent 70%);
          -webkit-mask-image: radial-gradient(circle at center top, black, transparent 70%);
        }
      `}</style>
    </section>
  );
}
