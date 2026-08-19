import { Sparkles, TrendingUp, Users, Workflow } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI for Developers",
      description: "AI-powered assistance for resumes, career preparation, profile optimization, and developer workflows.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Collaboration",
      description: "Messaging, communication, meetings, and real-time collaboration tightly integrated.",
    },
    {
      icon: <Workflow className="w-5 h-5" />,
      title: "Project Management",
      description: "Manage issues, assignments, teams, workflows, and track project execution effortlessly.",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Career Growth",
      description: "Resume building, ATS analysis, profile optimization, interview prep, and skill-gap analysis.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            The Feature Ecosystem
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Everything you need to ship products and grow your career, built into a single, cohesive experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent dark:from-zinc-900/50 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 mb-6 group-hover:scale-105 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
