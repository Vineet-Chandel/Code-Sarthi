import { useState, useEffect } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fallback scroll tracking if CSS scroll-timeline is not natively supported
    if (!window.CSS || !CSS.supports("animation-timeline", "scroll()")) {
      const updateScrollProgress = () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight > 0) {
          const pct = Number((currentScroll / scrollHeight).toFixed(4)) * 100;
          setProgress(Math.min(100, Math.max(0, pct)));
        } else {
          setProgress(0);
        }
      };

      window.addEventListener("scroll", updateScrollProgress, { passive: true });
      updateScrollProgress();

      return () => window.removeEventListener("scroll", updateScrollProgress);
    }
  }, []);

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: scroll()) {
            @keyframes grow-progress-x {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }
            .native-scroll-progress {
              width: 100% !important;
              transform-origin: 0 50%;
              animation: grow-progress-x auto linear;
              animation-timeline: scroll();
            }
          }
        }
      `}</style>
      {/* MANDATORY: Purely decorative visual scroll progress bars MUST set aria-hidden="true" to remove the empty element from the assistive technology reading tree */}
      <div id="progress" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 h-[3px] w-full bg-white/5 pointer-events-none">
        <div 
          className="native-scroll-progress h-full bg-gradient-to-r from-white/30 via-white/70 to-white transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}

