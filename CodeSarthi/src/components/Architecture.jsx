import { Brain, Code2, Layers, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export function Architecture() {
  const steps = [
    { icon: <Brain className="w-5 h-5" />, label: "Ideas" },
    { icon: <Layers className="w-5 h-5" />, label: "Teams" },
    { icon: <Code2 className="w-5 h-5" />, label: "Projects & Code" },
    { icon: <Rocket className="w-5 h-5" />, label: "Career" },
  ];

  return (
    <section className="py-24 border-y border-zinc-200 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
              Built around how developers actually work.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              CodeSarthi reduces fragmentation between the key stages of a developer's journey. Instead of disjointed silos, experience a continuous flow from initial idea to career progression.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-600 dark:to-zinc-800" />
              
              <div className="flex flex-col gap-10">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative flex items-center gap-6"
                  >
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-zinc-50 dark:border-[#0a0a0a] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm">
                      {step.icon}
                    </div>
                    <div className="flex-1 py-3 px-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] shadow-sm">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">
                        {step.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
