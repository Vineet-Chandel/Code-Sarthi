import { Link } from "react-router-dom";
import { ArrowLeft, Hammer } from "lucide-react";

export default function EmptyState({ techName }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/30">
        <Hammer size={20} />
      </span>
      <h2 className="text-lg font-semibold text-white/80">
        {techName} docs aren't written yet
      </h2>
      <p className="mt-2 max-w-sm text-sm text-white/40">
        This block is registered but its content file hasn't been added. Drop a
        new file in <code className="text-white/60">src/data/content</code> to
        fill it in.
      </p>
      <Link
        to="/"
        className="mt-6 flex items-center gap-1.5 text-sm text-accent hover:text-accent-soft"
      >
        <ArrowLeft size={14} /> Back to all stacks
      </Link>
    </div>
  );
}
