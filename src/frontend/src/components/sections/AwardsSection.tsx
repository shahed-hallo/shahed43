import { Medal, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const awards = [
  {
    icon: Trophy,
    title: "1st Place",
    subtitle: "School Robotics Competition",
    desc: "Designed and programmed the winning robot with custom C firmware for real-time sensor processing and motor control.",
    year: "2023",
    color: "oklch(0.65 0.18 60)",
  },
  {
    icon: Medal,
    title: "Best Code Architecture",
    subtitle: "Annual Hackathon",
    desc: "Recognized for an exceptionally clean, optimized C codebase that demonstrated mastery of data structures and memory management.",
    year: "2023",
    color: "oklch(0.72 0.22 320)",
  },
  {
    icon: Star,
    title: "Innovation Award",
    subtitle: "Programming Contest",
    desc: "Awarded for creating a novel physics simulation algorithm that reduced computational load while maintaining mathematical accuracy.",
    year: "2024",
    color: "oklch(0.58 0.26 340)",
  },
];

export default function AwardsSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section
      id="awards"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 overflow-hidden"
      aria-labelledby="awards-heading"
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

      {/* Background image with overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/assets/generated/awards-gallery-bg.dim_1200x600.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.09 0.01 280 / 0.92)" }}
        />
        {/* Gradient mesh overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 80% 50%, oklch(0.65 0.18 60 / 0.06), transparent)",
          }}
        />
        {/* Animated elements */}
        <div
          className="animate-orb-3 absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.65 0.18 60 / 0.07)" }}
        />
        <div
          className="animate-orb-1 absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "oklch(0.58 0.26 340 / 0.06)" }}
        />
        {/* Floating diamonds */}
        <div
          className="animate-diamond-1 absolute top-1/4 left-1/5 w-16 h-16 border border-yellow-300/10"
          style={{ transform: "rotate(45deg)" }}
        />
        <div
          className="animate-diamond-2 absolute bottom-1/3 right-1/3 w-10 h-10 border border-primary/10"
          style={{ transform: "rotate(45deg)" }}
        />
        <div
          className="animate-diamond-3 absolute top-2/3 left-2/3 w-8 h-8 border border-primary/8"
          style={{ transform: "rotate(45deg)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <motion.p
            className="font-syne text-xs tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-3 cursor-default"
            style={{ color: "oklch(0.65 0.18 60)" }}
            whileHover={{
              letterSpacing: "0.6em",
              transition: { duration: 0.3 },
            }}
          >
            <motion.span
              className="inline-block h-px"
              style={{ background: "oklch(0.65 0.18 60)", width: "32px" }}
              whileHover={{ width: "56px", transition: { duration: 0.3 } }}
            />
            Recognition
            <motion.span
              className="inline-block h-px"
              style={{ background: "oklch(0.65 0.18 60)", width: "32px" }}
              whileHover={{ width: "56px", transition: { duration: 0.3 } }}
            />
          </motion.p>
          <motion.h2
            id="awards-heading"
            className="font-playfair text-5xl md:text-6xl text-near-white mb-4 cursor-default"
            whileHover={{
              textShadow: "0 0 30px oklch(0.65 0.18 60 / 0.6)",
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
          >
            Recognition &amp; Awards
          </motion.h2>
          <motion.p
            className="font-playfair text-2xl italic cursor-default"
            style={{ color: "oklch(0.65 0.18 60)" }}
            whileHover={{
              textShadow: "0 0 20px oklch(0.65 0.18 60 / 0.5)",
              letterSpacing: "0.01em",
              transition: { duration: 0.2 },
            }}
          >
            School Robotics Coding — Champion
          </motion.p>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              className={`relative overflow-hidden group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${i * 150}ms`,
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
              }}
              data-ocid={`awards.item.${i + 1}`}
            >
              {/* Award frame */}
              <div
                className="relative p-8 award-frame h-full"
                style={{
                  background: "oklch(0.13 0.01 280 / 0.8)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Corner ornaments */}
                <div
                  className="absolute top-3 left-3 w-4 h-4 border-t border-l transition-all duration-300 group-hover:w-6 group-hover:h-6"
                  style={{ borderColor: `${award.color}60` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-3 right-3 w-4 h-4 border-t border-r transition-all duration-300 group-hover:w-6 group-hover:h-6"
                  style={{ borderColor: `${award.color}60` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-3 left-3 w-4 h-4 border-b border-l transition-all duration-300 group-hover:w-6 group-hover:h-6"
                  style={{ borderColor: `${award.color}60` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-3 right-3 w-4 h-4 border-b border-r transition-all duration-300 group-hover:w-6 group-hover:h-6"
                  style={{ borderColor: `${award.color}60` }}
                  aria-hidden="true"
                />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 60% 60% at 50% 0%, ${award.color}10, transparent)`,
                  }}
                  aria-hidden="true"
                />

                {/* Icon with spin/scale on hover */}
                <div className="mb-6">
                  <motion.div
                    className="group-hover:rotate-12"
                    whileHover={{
                      rotate: 12,
                      scale: 1.25,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <award.icon
                      className="w-8 h-8 award-icon-animate"
                      style={{ color: award.color }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <p
                  className="font-syne text-xs tracking-widest uppercase mb-1"
                  style={{ color: `${award.color}` }}
                >
                  {award.year}
                </p>
                <motion.h3
                  className="font-playfair text-3xl text-near-white mb-1 cursor-default"
                  whileHover={{
                    textShadow: `0 0 20px ${award.color}80`,
                    transition: { duration: 0.2 },
                  }}
                >
                  {award.title}
                </motion.h3>
                <p
                  className="font-syne text-sm mb-4"
                  style={{ color: award.color }}
                >
                  {award.subtitle}
                </p>
                <p
                  className="font-syne text-sm leading-relaxed"
                  style={{ color: "oklch(0.92 0.02 60)" }}
                >
                  {award.desc}
                </p>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${award.color}, transparent)`,
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
