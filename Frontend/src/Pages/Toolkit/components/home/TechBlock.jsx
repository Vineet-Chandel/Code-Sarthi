import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export default function TechBlock({ tech, index, available, isSaved, onToggleSave }) {
  const navigate = useNavigate();
  const Icon = Icons[tech.icon] ?? Icons.Code2;
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring physics for smooth tilt
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to 1

    // Tilt: card bends toward the cursor
    rotateX.set(-dy * 14);   // tilt up when cursor is above
    rotateY.set(dx * 14);    // tilt right when cursor is to the right
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <div
      ref={cardRef}
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        onClick={() => navigate(`/app/toolkit/docs/${tech.id}`)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="group relative flex w-full flex-col items-start gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-left"
      >
        {/* ambient glow on hover */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300"
          style={{
            background: tech.color,
            opacity: isHovered ? 0.2 : 0,
          }}
        />

        {/* Glossy highlight layer — floats above card surface in 3D */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
            opacity: isHovered ? 1 : 0,
            transform: "translateZ(1px)",
          }}
        />

        <div className="flex w-full items-start justify-between relative z-10">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] shadow-sm"
            style={{ color: tech.color }}
          >
            <Icon size={24} strokeWidth={2} />
          </span>
          <div className="flex items-center gap-2">
            <div
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave?.(tech.id);
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Icons.Bookmark size={16} className={isSaved ? "fill-amber-400 text-amber-400" : "text-white/40 group-hover:text-white/70"} />
            </div>
            <ArrowUpRight
              size={18}
              className="text-white/20 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-2">
          <h3 className="text-lg font-bold tracking-tight text-white mt-1">
            {tech.name}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
            {tech.description || tech.tagline}
          </p>
        </div>

        {!available && (
          <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/35">
            Coming soon
          </span>
        )}
      </motion.button>
    </div >
  );
}
