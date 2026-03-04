import { Code2, Download, Shirt, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const paragraphItems = [
  {
    key: "p1",
    text: "It started in Class 9 — a curious student picking up C, drawn not by assignments but by a hunger to solve problems that felt impossible. What began as simple programs evolved into something far more ambitious.",
  },
  {
    key: "p2",
    hasStrong: true,
    before: "The obsession? ",
    strong: "Physics simulation",
    after:
      ". Not the approximated, close-enough physics that most games settle for — but 100% accurate, mathematically precise physical reality rendered in real time. Wind that behaves like actual wind. Gravity that mirrors the universe's laws exactly.",
  },
  {
    key: "p3",
    text: "But Shahed isn't just a programmer. The same eye that spots elegance in a well-optimized algorithm finds it in a perfectly cut garment. Code and fashion are not opposites — both are systems of precision and beauty.",
  },
  {
    key: "p4",
    hasStrong: true,
    before: "The belief: ",
    strong: "humans are capable of going beyond imagination",
    after:
      ", when given the right tools, the right mindset, and the courage to build what doesn't yet exist.",
  },
];

const statCards = [
  {
    icon: Code2,
    label: "Languages",
    value: "C / ASM",
    desc: "Core expertise",
  },
  {
    icon: Sparkles,
    label: "Physics Sims",
    value: "100%",
    desc: "Accuracy goal",
  },
  {
    icon: Shirt,
    label: "Identity",
    value: "Dev + Fashion",
    desc: "Dual aesthetic",
  },
  {
    icon: Code2,
    label: "Community",
    value: "90%",
    desc: "Local reach",
  },
];

function InteractiveParagraph({
  item,
  isVisible,
  delay,
}: {
  item: (typeof paragraphItems)[0];
  isVisible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <p
      className="transition-all duration-700 cursor-default relative"
      style={{
        color: "oklch(0.96 0.02 60)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
        paddingLeft: hovered ? "12px" : "0px",
        borderLeft: hovered
          ? "2px solid oklch(0.58 0.26 340)"
          : "2px solid transparent",
        transition:
          "color 0.2s ease, padding-left 0.2s ease, border-left 0.2s ease, opacity 0.7s ease, transform 0.7s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {"hasStrong" in item && item.hasStrong ? (
        <>
          {"before" in item ? (item.before ?? "") : ""}
          <strong>{"strong" in item ? (item.strong ?? "") : ""}</strong>
          {"after" in item ? (item.after ?? "") : ""}
        </>
      ) : (
        <>{"text" in item ? (item.text ?? "") : ""}</>
      )}
    </p>
  );
}

export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 overflow-hidden"
      style={{ background: "oklch(0.13 0.01 280)" }}
      aria-labelledby="about-heading"
      onMouseMove={handleMouseMove}
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
          02
        </span>
      </div>

      {/* Background decoration + mouse-reactive orbs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 100% 50%, oklch(0.58 0.26 340 / 0.05), transparent)",
          }}
        />
        {/* Mouse-reactive orb */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "300px",
            height: "300px",
            background: "oklch(0.42 0.16 345 / 0.08)",
            left: mouseX - 150,
            top: mouseY - 150,
            transition: "left 0.8s ease, top 0.8s ease",
          }}
        />
        <div
          className="animate-orb-1 absolute top-1/4 right-1/4 w-56 h-56 rounded-full blur-3xl"
          style={{ background: "oklch(0.58 0.26 340 / 0.06)" }}
        />
        <div
          className="animate-glow-pulse absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full blur-2xl"
          style={{ background: "oklch(0.72 0.22 320 / 0.07)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div
            className={`transition-all duration-800 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <motion.p
              className="font-syne text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3 cursor-default"
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
              About
            </motion.p>

            <motion.h2
              id="about-heading"
              className="font-playfair text-5xl md:text-6xl text-near-white mb-8 leading-tight cursor-default"
              whileHover={{
                textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.8)",
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
            >
              Beyond
              <br />
              <em className="text-gradient-pink not-italic">Imagination</em>
            </motion.h2>

            {/* Staggered paragraphs */}
            <div className="space-y-5 font-syne text-base leading-relaxed">
              {paragraphItems.map((item, i) => (
                <InteractiveParagraph
                  key={item.key}
                  item={item}
                  isVisible={isVisible}
                  delay={i * 150}
                />
              ))}
            </div>

            {/* Mission callout with animated border */}
            <motion.div
              className="animated-border mt-10"
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <div
                className="p-6 relative cursor-default"
                style={{
                  borderLeft: "3px solid oklch(0.58 0.26 340)",
                  background: "oklch(0.58 0.26 340 / 0.06)",
                }}
              >
                <p
                  className="font-syne text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ color: "oklch(0.72 0.22 320)" }}
                >
                  Mission
                </p>
                <motion.p
                  className="font-playfair text-2xl text-near-white italic"
                  whileHover={{
                    textShadow: "0 0 20px oklch(0.78 0.22 320 / 0.5)",
                    letterSpacing: "0.01em",
                    transition: { duration: 0.2 },
                  }}
                >
                  "100% Accurate Physics in Gaming"
                </motion.p>
              </div>
            </motion.div>

            {/* Download CV */}
            <motion.a
              href="/assets/shahed-cv.pdf"
              download
              className="inline-flex items-center gap-3 mt-10 px-8 py-4 font-syne font-semibold text-sm tracking-widest uppercase text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.58 0.26 340), oklch(0.42 0.16 345))",
              }}
              aria-label="Download Shahed's CV"
              data-ocid="about.primary_button"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px oklch(0.58 0.26 340 / 0.5)",
                background:
                  "linear-gradient(135deg, oklch(0.65 0.26 340), oklch(0.50 0.20 345))",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              Download CV
            </motion.a>
          </div>

          {/* Right: Decorative card */}
          <div
            className={`transition-all duration-800 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {statCards.map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="p-5 relative overflow-hidden group cursor-default"
                    style={{
                      background: "oklch(0.17 0.01 280)",
                      border: "1px solid oklch(0.25 0.02 340)",
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 0 20px oklch(0.58 0.26 340 / 0.3)",
                      borderColor: "oklch(0.58 0.26 340 / 0.4)",
                      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "oklch(0.58 0.26 340 / 0.05)" }}
                      aria-hidden="true"
                    />
                    <motion.div
                      whileHover={{
                        rotate: 10,
                        scale: 1.2,
                        transition: { duration: 0.2 },
                      }}
                      className="w-fit mb-3"
                    >
                      <stat.icon
                        className="w-4 h-4"
                        style={{ color: "oklch(0.72 0.22 320)" }}
                      />
                    </motion.div>
                    <p
                      className="font-playfair text-2xl font-bold mb-1"
                      style={{ color: "oklch(0.97 0.01 60)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="font-syne text-xs tracking-wider uppercase mb-1"
                      style={{ color: "oklch(0.72 0.22 320)" }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="font-syne text-xs"
                      style={{ color: "oklch(0.75 0.02 280)" }}
                    >
                      {stat.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Decorative quote */}
              <motion.div
                className="p-8 relative overflow-hidden cursor-default"
                style={{
                  background: "oklch(0.17 0.01 280)",
                  border: "1px solid oklch(0.25 0.02 340)",
                }}
                whileHover={{
                  boxShadow: "0 0 20px oklch(0.58 0.26 340 / 0.2)",
                  borderColor: "oklch(0.58 0.26 340 / 0.3)",
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="absolute top-4 left-6 font-playfair text-8xl leading-none select-none"
                  style={{ color: "oklch(0.58 0.26 340 / 0.15)" }}
                  whileHover={{
                    color: "oklch(0.58 0.26 340 / 0.35)",
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  aria-hidden="true"
                >
                  "
                </motion.div>
                <motion.p
                  className="font-playfair text-xl italic relative z-10 leading-relaxed"
                  style={{ color: "oklch(1 0 0)" }}
                  whileHover={{
                    textShadow: "0 0 20px oklch(0.78 0.22 320 / 0.4)",
                    transition: { duration: 0.2 },
                  }}
                >
                  The universe runs on physics. I just want to simulate it
                  perfectly.
                </motion.p>
                <p
                  className="font-syne text-xs tracking-widest uppercase mt-4"
                  style={{ color: "oklch(0.72 0.22 320)" }}
                >
                  — Shahed
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
