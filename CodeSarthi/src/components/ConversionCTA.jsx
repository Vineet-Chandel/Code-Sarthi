import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ConversionCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-900 dark:bg-white z-0" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0,transparent_50%)] z-0 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white dark:text-zinc-900 mb-6">
            Your next build starts here.
          </h2>
          <p className="text-xl text-zinc-300 dark:text-zinc-600 mb-10 max-w-2xl mx-auto">
            Step into the CodeSarthi ecosystem and build, collaborate, manage, and grow from one place.
          </p>
          
          <a
            href="https://codesarthi.in"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium rounded-md bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-xl"
          >
            Enter CodeSarthi
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
