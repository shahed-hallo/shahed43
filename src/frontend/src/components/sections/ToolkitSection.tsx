import { motion } from "motion/react";
import { useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const asmSnippetFull = `<span class="asm-cm">; IDA Pro disassembly snippet</span>
<span class="asm-kw">push</span>    <span class="asm-reg">ebp</span>
<span class="asm-kw">mov</span>     <span class="asm-reg">ebp</span>, <span class="asm-reg">esp</span>
<span class="asm-kw">sub</span>     <span class="asm-reg">esp</span>, <span class="asm-nu">18h</span>
<span class="asm-kw">mov</span>     [<span class="asm-reg">ebp</span>+WindField], <span class="asm-reg">edi</span>
<span class="asm-kw">fld</span>     <span class="asm-kw">dword</span> <span class="asm-kw">ptr</span> [<span class="asm-reg">edi</span>+velocity_x]
<span class="asm-kw">fmul</span>    <span class="asm-kw">dword</span> <span class="asm-kw">ptr</span> [<span class="asm-reg">edi</span>+velocity_x]`;

const skills = [
  {
    name: "C Language",
    level: "Mastery Level",
    desc: "The foundation of everything. Low-level precision.",
    detail:
      "From simple programs in Class 9 to complex physics engines today — C is Shahed's mother tongue.",
    badge: "CORE",
    badgeColor: "oklch(0.58 0.26 340)",
    progress: 95,
  },
  {
    name: "GCC Compiler",
    level: "Expert",
    desc: "Compiling performance-critical code from scratch.",
    detail:
      "Deep understanding of compiler flags, optimization levels, and low-level build pipelines.",
    badge: "EXPERT",
    badgeColor: "oklch(0.42 0.16 345)",
    progress: 88,
  },
  {
    name: "IDA Pro",
    level: "Specialized",
    desc: "Reverse engineering and binary analysis.",
    detail:
      "One of few juniors with hands-on IDA Pro experience — disassembling binaries, understanding call stacks, and analyzing compiled C code at the assembly level.",
    badge: "RARE",
    badgeColor: "oklch(0.65 0.18 60)",
    progress: 70,
    highlight: true,
  },
  {
    name: "Genzthepixel",
    level: "Creator",
    desc: "AI-powered math tool serving the local community.",
    detail:
      "Conceptualized, built, and deployed an AI math tool used by 90% of the local community — from idea to impact.",
    badge: "CREATED",
    badgeColor: "oklch(0.72 0.22 320)",
    progress: 100,
  },
];

function AsmCodeBlock() {
  return (
    <pre
      className="code-block text-sm overflow-x-auto"
      aria-label="IDA Pro assembly disassembly"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: syntax-highlighted code
      dangerouslySetInnerHTML={{ __html: asmSnippetFull }}
    />
  );
}

function SkillCard({
  skill,
  isVisible,
  index,
}: {
  skill: (typeof skills)[0];
  isVisible: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={skill.name}
      className={`p-6 relative overflow-hidden cursor-default ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      } ${skill.highlight ? "border-2" : "border"}`}
      style={{
        transitionDelay: `${index * 100}ms`,
        background: skill.highlight ? "oklch(0.13 0.01 280)" : "oklch(1 0 0)",
        borderColor: skill.highlight
          ? "oklch(0.65 0.18 60 / 0.5)"
          : "oklch(0.88 0.02 340)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 24px ${skill.badgeColor}30` : "none",
        transition:
          "transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {skill.highlight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "oklch(0.65 0.18 60 / 0.03)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Pink scan line on hover */}
      {hovered && (
        <motion.div
          className="absolute left-0 right-0 top-0 pointer-events-none z-10"
          style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${skill.badgeColor}, transparent)`,
            opacity: 0.7,
          }}
          initial={{ scaleY: 0, y: 0 }}
          animate={{ scaleY: 1, y: "100%" }}
          transition={{ duration: 0.4, ease: "linear" }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <span
            className="font-syne text-xs tracking-widest uppercase px-2 py-0.5 mr-3"
            style={{
              background: `${skill.badgeColor}20`,
              color: skill.badgeColor,
              border: `1px solid ${skill.badgeColor}40`,
            }}
          >
            {skill.badge}
          </span>
          <span
            className="font-syne text-xs tracking-[0.2em] uppercase"
            style={{
              color: skill.highlight
                ? "oklch(0.65 0.18 60)"
                : "oklch(0.45 0.02 280)",
            }}
          >
            {skill.level}
          </span>
        </div>
      </div>

      <motion.h3
        className="font-playfair text-2xl mb-2"
        style={{
          color: skill.highlight
            ? "oklch(0.97 0.01 60)"
            : "oklch(0.13 0.01 280)",
        }}
        animate={
          hovered
            ? {
                textShadow: `0 0 20px ${skill.badgeColor}60`,
              }
            : { textShadow: "none" }
        }
      >
        {skill.name}
      </motion.h3>

      <p
        className="font-syne text-sm mb-3 font-semibold"
        style={{ color: skill.badgeColor }}
      >
        {skill.desc}
      </p>

      <p
        className="font-syne text-sm leading-relaxed"
        style={{
          color: skill.highlight
            ? "oklch(0.65 0.02 280)"
            : "oklch(0.45 0.02 280)",
        }}
      >
        {skill.detail}
      </p>

      {/* Progress bar */}
      <div
        className="mt-4"
        role="progressbar"
        tabIndex={-1}
        aria-valuenow={skill.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency: ${skill.progress}%`}
      >
        <div className="flex justify-between mb-1">
          <span
            className="font-syne text-xs"
            style={{ color: "oklch(0.55 0.02 280)" }}
          >
            Proficiency
          </span>
          <span
            className="font-syne text-xs"
            style={{ color: skill.badgeColor }}
          >
            {skill.progress}%
          </span>
        </div>
        <div
          className="h-1 w-full"
          style={{ background: "oklch(0.88 0.02 340 / 0.3)" }}
        >
          <motion.div
            className="h-full"
            style={{
              background: `linear-gradient(90deg, ${skill.badgeColor}, oklch(0.72 0.22 320))`,
            }}
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.progress}%` : "0%" }}
            transition={{
              duration: 1,
              delay: index * 0.15 + 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ToolkitSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section
      id="toolkit"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 bg-near-white overflow-hidden"
      aria-labelledby="toolkit-heading"
    >
      {/* Section number */}
      <div
        className="absolute top-8 right-14 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-syne text-xs tracking-[0.4em] uppercase"
          style={{ color: "oklch(0.58 0.26 340 / 0.4)" }}
        >
          05
        </span>
      </div>

      {/* Section background animation */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="animate-orb-2 absolute top-1/3 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "oklch(0.65 0.18 60 / 0.05)" }}
        />
        <div
          className="animate-orb-3 absolute bottom-1/4 left-0 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.58 0.26 340 / 0.04)" }}
        />
        {/* Animated scan line */}
        <div
          className="animate-scan-line absolute left-0 w-full h-px opacity-5"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.58 0.26 340), transparent)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <motion.p
            className="font-syne text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3 cursor-default"
            style={{ color: "oklch(0.58 0.26 340)" }}
            whileHover={{
              letterSpacing: "0.6em",
              transition: { duration: 0.3 },
            }}
          >
            <motion.span
              className="inline-block h-px"
              style={{ background: "oklch(0.58 0.26 340)", width: "32px" }}
              whileHover={{ width: "56px", transition: { duration: 0.3 } }}
            />
            Technical Toolkit
          </motion.p>
          <motion.h2
            id="toolkit-heading"
            className="font-playfair text-5xl md:text-6xl text-dark-bg leading-tight cursor-default"
            whileHover={{
              textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.5)",
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
          >
            The Craft
            <br />
            <em className="text-gradient-pink not-italic">Behind the Code</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill cards */}
          <div className="space-y-4">
            {skills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                isVisible={isVisible}
                index={i}
              />
            ))}
          </div>

          {/* IDA Pro code showcase */}
          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div
              className="sticky top-24 p-8"
              style={{
                background: "oklch(0.09 0.01 280)",
                border: "1px solid oklch(0.25 0.02 340)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: "oklch(0.65 0.2 25)" }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: "oklch(0.75 0.18 70)" }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: "oklch(0.65 0.2 150)" }}
                  />
                </div>
                <div
                  className="font-syne text-xs tracking-widest uppercase px-3 py-1"
                  style={{
                    background: "oklch(0.65 0.18 60 / 0.15)",
                    color: "oklch(0.65 0.18 60)",
                    border: "1px solid oklch(0.65 0.18 60 / 0.3)",
                  }}
                >
                  IDA Pro · x86 ASM
                </div>
              </div>

              <p
                className="font-syne text-xs uppercase tracking-[0.3em] mb-4"
                style={{ color: "oklch(0.55 0.02 280)" }}
              >
                wind_physics.exe — disassembly view
              </p>

              {/* Assembly code block */}
              <AsmCodeBlock />

              <div
                className="mt-6 p-4"
                style={{
                  background: "oklch(0.65 0.18 60 / 0.08)",
                  border: "1px solid oklch(0.65 0.18 60 / 0.2)",
                }}
              >
                <p
                  className="font-syne text-xs uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.65 0.18 60)" }}
                >
                  Note
                </p>
                <p
                  className="font-syne text-xs leading-relaxed"
                  style={{ color: "oklch(0.60 0.02 280)" }}
                >
                  Reading and analyzing compiled binaries at the assembly level
                  is a rare skill — especially for a junior developer. IDA Pro
                  expertise demonstrates deep understanding of how C compiles to
                  machine code.
                </p>
              </div>

              {/* Decorative binary pattern */}
              <div
                className="mt-6 font-mono-code text-xs leading-relaxed opacity-10 select-none"
                style={{ color: "oklch(0.72 0.22 320)" }}
                aria-hidden="true"
              >
                <div>
                  0 1 1 0 1 0 0 1 1 1 0 1 0 0 1 1 0 1 1 0 1 0 0 1 1 1 0 1 0 0 1
                  1
                </div>
                <div>
                  1 0 0 1 0 1 1 0 0 0 1 0 1 1 0 0 1 0 0 1 0 1 1 0 0 0 1 0 1 1 0
                  0
                </div>
                <div>
                  0 1 0 1 1 1 0 0 1 0 1 1 0 1 0 1 0 1 0 1 1 1 0 0 1 0 1 1 0 1 0
                  1
                </div>
                <div>
                  1 1 0 0 0 1 1 0 1 1 0 0 0 0 1 1 1 1 0 0 0 1 1 0 1 1 0 0 0 0 1
                  1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
