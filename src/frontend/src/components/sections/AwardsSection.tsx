import { Film, Gamepad2 } from "lucide-react";
import { motion } from "motion/react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const interests = [
  {
    icon: Gamepad2,
    title: "PUBG Player",
    subtitle: "Level 29 Achieved",
    desc: "Reached Level 29 in PUBG — a test of strategy, reflexes, and persistence. Gaming sharpens the same analytical thinking that powers clean code.",
    year: "Gaming",
    color: "oklch(0.72 0.22 320)",
  },
  {
    icon: Film,
    title: "Sci-Fi Cinephile",
    subtitle: "10+ CS Films Watched",
    desc: "From AI ethics to space computing — watched 10+ science-fiction films centered on computer science. Cinema that doesn't just entertain but inspires code.",
    year: "Interests",
    color: "oklch(0.58 0.26 340)",
  },
];

export default function AwardsSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section
      id="interests"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="interests-heading"
    >
      {/* Section number */}
      <div
        className="absolute top-8 right-14 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-syne text-xs tracking-[0.4em] uppercase"
          style={{ color: "oklch(0.58 0.26 340 / 0.5)" }}
        >
          07
        </span>
      </div>

      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.09 0.01 280 / 0.98)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 80% 50%, oklch(0.58 0.26 340 / 0.06), transparent)",
          }}
        />
        <div
          className="animate-orb-3 absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.72 0.22 320 / 0.07)" }}
        />
        <div
          className="animate-orb-1 absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "oklch(0.58 0.26 340 / 0.06)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <motion.p
            className="font-syne text-xs tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-3 cursor-default"
            style={{ color: "oklch(0.72 0.22 320)" }}
            whileHover={{
              letterSpacing: "0.6em",
              transition: { duration: 0.3 },
            }}
          >
            <motion.span
              className="inline-block h-px"
              style={{ background: "oklch(0.72 0.22 320)", width: "32px" }}
              whileHover={{ width: "56px", transition: { duration: 0.3 } }}
            />
            Beyond the Code
            <motion.span
              className="inline-block h-px"
              style={{ background: "oklch(0.72 0.22 320)", width: "32px" }}
              whileHover={{ width: "56px", transition: { duration: 0.3 } }}
            />
          </motion.p>
          <motion.h2
            id="interests-heading"
            className="font-playfair text-4xl md:text-5xl text-near-white mb-4 cursor-default"
            whileHover={{
              textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.6)",
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
          >
            Interests &amp; Passions
          </motion.h2>
          <motion.p
            className="font-playfair text-xl italic cursor-default"
            style={{ color: "oklch(0.72 0.22 320)" }}
            whileHover={{
              textShadow: "0 0 20px oklch(0.72 0.22 320 / 0.5)",
              transition: { duration: 0.2 },
            }}
          >
            Life beyond the terminal
          </motion.p>
        </div>

        {/* Interests grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {interests.map((item, i) => (
            <motion.div
              key={item.title}
              className={`relative overflow-hidden group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
              }}
              data-ocid={`interests.item.${i + 1}`}
            >
              <div
                className="relative p-8 h-full"
                style={{
                  background: "oklch(0.13 0.01 280 / 0.85)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${item.color}25`,
                }}
              >
                {/* Corner ornaments */}
                <div
                  className="absolute top-3 left-3 w-4 h-4 border-t border-l transition-all duration-300 group-hover:w-6 group-hover:h-6"
                  style={{ borderColor: `${item.color}60` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-3 right-3 w-4 h-4 border-t border-r transition-all duration-300 group-hover:w-6 group-hover:h-6"
                  style={{ borderColor: `${item.color}60` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-3 left-3 w-4 h-4 border-b border-l transition-all duration-300 group-hover:w-6 group-hover:h-6"
                  style={{ borderColor: `${item.color}60` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-3 right-3 w-4 h-4 border-b border-r transition-all duration-300 group-hover:w-6 group-hover:h-6"
                  style={{ borderColor: `${item.color}60` }}
                  aria-hidden="true"
                />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 60% 60% at 50% 0%, ${item.color}10, transparent)`,
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="mb-6">
                  <motion.div
                    whileHover={{
                      rotate: 12,
                      scale: 1.25,
                      transition: { duration: 0.3 },
                    }}
                    className="w-fit"
                  >
                    <item.icon
                      className="w-8 h-8"
                      style={{ color: item.color }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <p
                  className="font-syne text-xs tracking-widest uppercase mb-1"
                  style={{ color: item.color }}
                >
                  {item.year}
                </p>
                <motion.h3
                  className="font-playfair text-3xl text-near-white mb-1 cursor-default"
                  whileHover={{
                    textShadow: `0 0 20px ${item.color}80`,
                    transition: { duration: 0.2 },
                  }}
                >
                  {item.title}
                </motion.h3>
                <p
                  className="font-syne text-sm mb-4"
                  style={{ color: item.color }}
                >
                  {item.subtitle}
                </p>
                <p
                  className="font-syne text-sm leading-relaxed"
                  style={{ color: "oklch(0.75 0.02 280)" }}
                >
                  {item.desc}
                </p>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
