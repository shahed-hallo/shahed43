import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const allSectionIds = [
  "hero",
  "about",
  "work",
  "community",
  "toolkit",
  "testimonials",
  "awards",
  "contact",
];

const sectionLabels: Record<string, string> = {
  hero: "Intro",
  about: "About",
  work: "Work",
  community: "Community",
  toolkit: "Toolkit",
  testimonials: "Voices",
  awards: "Awards",
  contact: "Contact",
};

export default function RightProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of allSectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  const sectionCount = allSectionIds.length;

  return (
    <aside
      className="fixed right-0 top-0 bottom-0 z-50 hidden md:flex flex-col items-end"
      style={{ width: "56px" }}
      aria-label="Page navigation"
    >
      {/* Glass panel */}
      <div
        className="relative flex flex-col items-center h-full py-8"
        style={{
          width: "56px",
          background: "oklch(0.09 0.025 280 / 0.75)",
          backdropFilter: "blur(24px) saturate(1.5)",
          WebkitBackdropFilter: "blur(24px) saturate(1.5)",
          borderLeft: "1px solid oklch(0.78 0.22 320 / 0.08)",
          boxShadow:
            "-2px 0 40px oklch(0.08 0.01 280 / 0.5), inset 1px 0 0 oklch(1 0 0 / 0.03)",
        }}
      >
        {/* Subtle pink ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.58 0.26 340 / 0.07) 0%, transparent 70%)",
          }}
        />

        {/* Logo icon at top */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("hero");
            if (!el) return;
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="relative z-20 mb-4 flex-shrink-0 group/logo"
          aria-label="Back to top"
          data-ocid="nav.link"
          style={{ marginTop: "-8px" }}
        >
          <motion.img
            src="/assets/uploads/shahed-logo-photo.png"
            alt="Shahed logo"
            className="w-8 h-8 object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.2 }}
            style={{
              borderRadius: "50%",
              boxShadow:
                "0 0 10px oklch(0.58 0.26 340 / 0.6), 0 0 20px oklch(0.58 0.26 340 / 0.3)",
              border: "2px solid oklch(0.58 0.26 340 / 0.5)",
            }}
          />
        </button>

        {/* Scroll progress track */}
        <div className="relative z-10 flex flex-col items-center flex-1 w-full">
          {/* Track background line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: "oklch(0.78 0.22 320 / 0.12)" }}
            aria-hidden="true"
          />

          {/* Glowing pink fill line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 origin-top w-px"
            style={{
              scaleY: scrollProgress,
              background:
                "linear-gradient(180deg, oklch(0.72 0.22 320), oklch(0.58 0.26 340))",
              boxShadow:
                "0 0 8px oklch(0.58 0.26 340 / 0.8), 0 0 20px oklch(0.58 0.26 340 / 0.3)",
              height: "100%",
            }}
            aria-hidden="true"
          />

          {/* Section dots + labels */}
          {allSectionIds.map((id, i) => {
            const dotProgress = i / (sectionCount - 1);
            const isActive = activeSection === id;
            const isPassed = scrollProgress >= dotProgress - 0.02;
            const isHovered = hoveredSection === id;
            const label = sectionLabels[id] ?? id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  const el = document.getElementById(id);
                  if (!el) return;
                  const top =
                    el.getBoundingClientRect().top + window.scrollY - 40;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
                onMouseEnter={() => setHoveredSection(id)}
                onMouseLeave={() => setHoveredSection(null)}
                className="absolute left-1/2 group/dot flex items-center"
                style={{
                  top: `${(i / (sectionCount - 1)) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 20,
                }}
                aria-label={`Jump to ${label}`}
                data-ocid="nav.link"
              >
                {/* Section label — always rendered, fades based on active/hover */}
                <motion.span
                  className="absolute font-syne text-[9px] tracking-widest uppercase pointer-events-none select-none"
                  style={{
                    right: "calc(100% + 10px)",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.16em",
                  }}
                  animate={{
                    opacity: isActive ? 0.9 : isHovered ? 0.6 : 0.22,
                    color: isActive
                      ? "oklch(0.88 0.20 320)"
                      : isHovered
                        ? "oklch(0.80 0.14 320)"
                        : "oklch(0.62 0.08 320)",
                    textShadow: isActive
                      ? "0 0 10px oklch(0.58 0.26 340 / 0.6)"
                      : "none",
                    x: isActive ? 0 : isHovered ? -1 : 2,
                  }}
                  transition={{ duration: 0.22 }}
                  aria-hidden="true"
                >
                  {label}
                </motion.span>

                {/* Dot */}
                <motion.span
                  className="flex items-center justify-center rounded-full"
                  animate={{
                    width: isActive ? 14 : isPassed ? 8 : 6,
                    height: isActive ? 14 : isPassed ? 8 : 6,
                    boxShadow: isActive
                      ? "0 0 0 3px oklch(0.58 0.26 340 / 0.25), 0 0 16px oklch(0.58 0.26 340 / 0.7), 0 0 32px oklch(0.58 0.26 340 / 0.35)"
                      : isPassed
                        ? "0 0 8px oklch(0.72 0.22 320 / 0.5)"
                        : "none",
                  }}
                  style={{
                    background: isActive
                      ? "oklch(0.72 0.22 320)"
                      : isPassed
                        ? "oklch(0.65 0.24 330)"
                        : "oklch(0.35 0.06 280)",
                  }}
                  transition={{ duration: 0.25 }}
                />

                {/* Active pulse ring */}
                {isActive && (
                  <motion.span
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      border: "1px solid oklch(0.72 0.22 320 / 0.6)",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      width: [14, 28],
                      height: [14, 28],
                      opacity: [0.7, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeOut",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Expanded glow halo on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      key="glow"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: "0 0 28px 10px oklch(0.58 0.26 340 / 0.45)",
                        background: "oklch(0.58 0.26 340 / 0.15)",
                        width: 20,
                        height: 20,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
