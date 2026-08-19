import { motion } from "framer-motion";

export function ProductIntro() {
  return (
    <section id="about" className="py-24 border-t border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-[#0a0a0a]/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              More than a platform. <br className="hidden sm:block" />
              <span className="text-zinc-500 dark:text-zinc-400">An ecosystem for builders.</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
              CodeSarthi is designed around the real workflow of developers and teams. We believe that building great software shouldn't require jumping between disjointed tools for project management, collaboration, and career growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-2 shadow-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-transparent dark:from-zinc-800/20 dark:to-transparent opacity-50 pointer-events-none" />
            <div className="rounded-lg border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/50 p-8 flex items-center justify-center min-h-[300px]">
              <div className="flex flex-col items-center gap-6 opacity-60">
                <div className="flex gap-4">
                  <div className="w-16 h-4 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="w-24 h-4 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="w-12 h-4 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="w-full max-w-sm h-32 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
                  <span className="text-sm font-medium text-zinc-400 dark:text-zinc-600">Product Interface Abstraction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
