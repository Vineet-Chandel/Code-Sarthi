import { Link, useNavigate } from "react-router-dom";
import { Command, Terminal } from "lucide-react";

export default function Navbar({ onOpenSearch }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 border-b border-white/[0.06] bg-black backdrop-blur-xl">
      <div className="mx-auto flex h-16  items-center justify-between px-6">
        <Link to="/app/toolkit" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#212121] border border-[#212121] text-accent transition-colors group-hover:bg-accent/20">
            <Terminal size={16} strokeWidth={2.25} color="white" />
          </span>

        </Link>

        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
        >
          <span>Search cheat sheets…</span>
          <span className="flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] text-white/40">
            <Command size={11} /> K
          </span>
        </button>


      </div>
    </header>
  );
}
