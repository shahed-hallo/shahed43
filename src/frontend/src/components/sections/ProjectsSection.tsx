import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

declare global {
  interface Window {
    renderMathInElement?: (el: HTMLElement, options?: unknown) => void;
  }
}

function MathBlock({
  formula,
  display = false,
}: { formula: string; display?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let retries = 0;
    const tryRender = () => {
      const katex = (
        window as unknown as {
          katex?: {
            render: (f: string, el: HTMLElement, opts: object) => void;
          };
        }
      ).katex;
      if (katex && ref.current) {
        try {
          katex.render(formula, ref.current, {
            throwOnError: false,
            displayMode: display,
          });
        } catch {
          // ignore
        }
      } else if (retries < 10) {
        retries++;
        setTimeout(tryRender, 300);
      }
    };
    tryRender();
  }, [formula, display]);

  return (
    <span
      ref={ref}
      className={
        display ? "block text-center py-2" : "inline-block align-middle"
      }
      aria-label={`Math formula: ${formula}`}
    />
  );
}

const windSnippet = `<span class="cm">// Wind force calculation</span>
<span class="kw">typedef</span> <span class="kw">struct</span> {
    <span class="ty">float</span> <span class="fn">velocity_x</span>;
    <span class="ty">float</span> <span class="fn">velocity_y</span>; 
    <span class="ty">float</span> <span class="fn">density</span>;
} <span class="ty">WindField</span>;

<span class="ty">float</span> <span class="fn">compute_drag</span>(<span class="ty">WindField</span>* w, <span class="ty">float</span> mass) {
    <span class="ty">float</span> v_sq = w-><span class="fn">velocity_x</span> * w-><span class="fn">velocity_x</span> 
               + w-><span class="fn">velocity_y</span> * w-><span class="fn">velocity_y</span>;
    <span class="kw">return</span> <span class="nu">0.5f</span> * w-><span class="fn">density</span> * v_sq * mass;
}`;

interface TiltArticleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-labelledby"?: string;
}

function TiltArticle({
  children,
  className,
  style,
  "aria-labelledby": labelledBy,
}: TiltArticleProps) {
  const ref = useRef<HTMLElement>(null);
  const [glowStyle, setGlowStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / (rect.width / 2)) * 6;
    const dy = ((e.clientY - cy) / (rect.height / 2)) * 6;
    el.style.transform = `perspective(800px) rotateX(${-dy}deg) rotateY(${dx}deg)`;
    el.style.transition = "transform 0.1s ease";
    setGlowStyle({
      boxShadow:
        "0 8px 40px oklch(0.58 0.26 340 / 0.25), 0 0 60px oklch(0.58 0.26 340 / 0.1)",
    });
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    el.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1)";
    setGlowStyle({});
  };

  return (
    <article
      ref={ref}
      className={`tilt-card ${className ?? ""}`}
      style={{ ...style, ...glowStyle, transition: "box-shadow 0.3s ease" }}
      aria-labelledby={labelledBy}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </article>
  );
}

function InteractiveMathBlock({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      style={{
        background: hovered ? "oklch(0.16 0.02 280)" : "oklch(0.13 0.01 280)",
        border: hovered
          ? "1px solid oklch(0.58 0.26 340 / 0.5)"
          : "1px solid oklch(0.25 0.02 340)",
        transition: "background 0.25s ease, border 0.25s ease",
        boxShadow: hovered ? "0 0 20px oklch(0.58 0.26 340 / 0.15)" : "none",
      }}
      className="p-6 katex-dark cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </motion.div>
  );
}

function InteractiveLi({ text, color }: { text: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      className="flex items-center gap-3 font-syne text-sm"
      style={{
        color: "oklch(0.70 0.02 280)",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition:
          "transform 0.2s cubic-bezier(0.22,1,0.36,1), color 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="rounded-full flex-shrink-0 transition-all duration-200"
        style={{
          background: color,
          width: hovered ? "10px" : "6px",
          height: hovered ? "10px" : "6px",
        }}
        aria-hidden="true"
      />
      {text}
    </li>
  );
}

export default function ProjectsSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();

  return (
    <section
      id="work"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 bg-near-white overflow-hidden"
      aria-labelledby="work-heading"
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
          03
        </span>
      </div>

      {/* Subtle animated background for white section */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="animate-orb-3 absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "oklch(0.58 0.26 340 / 0.04)" }}
        />
        <div
          className="animate-orb-1 absolute bottom-0 -left-24 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "oklch(0.42 0.16 345 / 0.05)" }}
        />
        {/* Diagonal pink line accent */}
        <div
          className="absolute top-0 right-1/4 w-px h-full opacity-5"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.58 0.26 340), transparent)",
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
            Selected Work
          </motion.p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <motion.h2
              id="work-heading"
              className="font-playfair text-5xl md:text-6xl text-dark-bg leading-tight cursor-default"
              whileHover={{
                textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.5)",
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
            >
              Projects That
              <br />
              <em className="text-gradient-pink not-italic">Push Boundaries</em>
            </motion.h2>
            <p className="font-syne text-xs tracking-[0.3em] uppercase text-dark-bg/40 border border-dark-bg/20 px-4 py-2">
              Quality &gt; Quantity
            </p>
          </div>
        </div>

        {/* Project 1: Wind Physics */}
        <div
          className={`mb-12 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="animated-border">
            <TiltArticle
              className="border border-dark-bg/10 overflow-hidden"
              aria-labelledby="proj1-heading"
              style={{ background: "oklch(1 0 0)" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Code column */}
                <div
                  className="p-8 lg:p-12"
                  style={{ background: "oklch(0.09 0.01 280)" }}
                >
                  <div
                    className="flex items-center gap-3 mb-6"
                    aria-hidden="true"
                  >
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
                    <span
                      className="ml-2 font-mono-code text-xs"
                      style={{ color: "oklch(0.45 0.02 280)" }}
                    >
                      wind_physics.c
                    </span>
                  </div>
                  <pre
                    className="code-block text-sm overflow-x-auto"
                    aria-label="Wind physics C code"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: syntax-highlighted code
                    dangerouslySetInnerHTML={{ __html: windSnippet }}
                  />

                  {/* Math formula */}
                  <div className="mt-6">
                    <InteractiveMathBlock>
                      <p
                        className="font-syne text-xs uppercase tracking-wider mb-3"
                        style={{ color: "oklch(0.55 0.02 280)" }}
                      >
                        Drag Formula
                      </p>
                      <div className="text-near-white">
                        <MathBlock
                          formula="F_{drag} = \\frac{1}{2} \\rho v^2 C_d A"
                          display={true}
                        />
                      </div>
                    </InteractiveMathBlock>
                  </div>
                </div>

                {/* Info column */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="font-syne text-xs tracking-[0.3em] uppercase px-3 py-1"
                        style={{
                          background: "oklch(0.58 0.26 340 / 0.1)",
                          color: "oklch(0.58 0.26 340)",
                          border: "1px solid oklch(0.58 0.26 340 / 0.3)",
                        }}
                      >
                        01
                      </span>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {["C", "Physics", "Game Engine"].map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="font-syne text-xs"
                            style={{
                              borderColor: "oklch(0.58 0.26 340 / 0.4)",
                              color: "oklch(0.58 0.26 340)",
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <motion.h3
                      id="proj1-heading"
                      className="font-playfair text-4xl text-dark-bg mb-4 leading-tight cursor-default"
                      whileHover={{
                        textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.4)",
                        scale: 1.01,
                        transition: { duration: 0.2 },
                      }}
                    >
                      Wind Physics in Gaming
                    </motion.h3>

                    <p className="font-syne text-dark-bg/60 leading-relaxed mb-6">
                      A custom wind simulation engine built in pure C. Models
                      turbulent airflow, drag coefficients, and density
                      variations to produce game physics that mirror real
                      atmospheric behavior — no shortcuts, no approximations.
                    </p>

                    <ul className="space-y-3">
                      {[
                        "Real-time drag computation",
                        "Dynamic velocity field simulation",
                        "Memory-efficient WindField structs",
                      ].map((item) => (
                        <InteractiveLi
                          key={item}
                          text={item}
                          color="oklch(0.58 0.26 340)"
                        />
                      ))}
                    </ul>
                  </div>

                  <div
                    className="mt-8 pt-6"
                    style={{ borderTop: "1px solid oklch(0.88 0.02 340)" }}
                  >
                    <p className="font-syne text-xs tracking-[0.2em] uppercase text-dark-bg/40">
                      Written in C · GCC Optimized
                    </p>
                  </div>
                </div>
              </div>
            </TiltArticle>
          </div>
        </div>

        {/* Project 2: Numerical Computation */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="animated-border">
            <TiltArticle
              className="border border-dark-bg/10 overflow-hidden"
              aria-labelledby="proj2-heading"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Info column (reversed) */}
                <div
                  className="p-8 lg:p-12 flex flex-col justify-between order-2 lg:order-1"
                  style={{ background: "oklch(0.97 0.01 60)" }}
                >
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="font-syne text-xs tracking-[0.3em] uppercase px-3 py-1"
                        style={{
                          background: "oklch(0.42 0.16 345 / 0.1)",
                          color: "oklch(0.42 0.16 345)",
                          border: "1px solid oklch(0.42 0.16 345 / 0.3)",
                        }}
                      >
                        02
                      </span>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {["C", "Numerical Methods", "Mathematics"].map(
                          (tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="font-syne text-xs"
                              style={{
                                borderColor: "oklch(0.42 0.16 345 / 0.4)",
                                color: "oklch(0.42 0.16 345)",
                              }}
                            >
                              {tag}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    <motion.h3
                      id="proj2-heading"
                      className="font-playfair text-4xl text-dark-bg mb-4 leading-tight cursor-default"
                      whileHover={{
                        textShadow: "0 0 30px oklch(0.42 0.16 345 / 0.4)",
                        scale: 1.01,
                        transition: { duration: 0.2 },
                      }}
                    >
                      Large-Scale Numerical Computation
                    </motion.h3>

                    <p className="font-syne text-dark-bg/60 leading-relaxed mb-6">
                      Solving massive numerical problems — from gravitational
                      field calculations to Poisson's equation solvers — using
                      optimized algorithms in C. Built for precision at scale.
                    </p>

                    <ul className="space-y-3">
                      {[
                        "N-body gravitational simulation",
                        "Poisson solver for field equations",
                        "64-bit floating point precision",
                      ].map((item) => (
                        <InteractiveLi
                          key={item}
                          text={item}
                          color="oklch(0.42 0.16 345)"
                        />
                      ))}
                    </ul>
                  </div>

                  {/* Sketch placeholder */}
                  <div
                    className="mt-8 p-6 flex items-center justify-center"
                    style={{
                      background: "oklch(0.88 0.02 340 / 0.5)",
                      border: "1px dashed oklch(0.42 0.16 345 / 0.4)",
                      minHeight: "100px",
                    }}
                    role="img"
                    aria-label="Computation diagram placeholder"
                  >
                    <p className="font-mono-code text-xs text-dark-bg/40">
                      [ Computation Diagram ]
                    </p>
                  </div>
                </div>

                {/* Math formulas column */}
                <div
                  className="p-8 lg:p-12 order-1 lg:order-2"
                  style={{ background: "oklch(0.09 0.01 280)" }}
                >
                  <p
                    className="font-syne text-xs uppercase tracking-[0.3em] mb-8"
                    style={{ color: "oklch(0.55 0.02 280)" }}
                  >
                    Mathematical Foundations
                  </p>

                  <div className="space-y-6">
                    <InteractiveMathBlock>
                      <p
                        className="font-syne text-xs uppercase tracking-wider mb-3"
                        style={{ color: "oklch(0.55 0.02 280)" }}
                      >
                        Newton's Universal Gravity
                      </p>
                      <div className="text-near-white">
                        <MathBlock
                          formula="F = G \\frac{m_1 m_2}{r^2}"
                          display={true}
                        />
                      </div>
                      <p
                        className="font-syne text-xs mt-3"
                        style={{ color: "oklch(0.45 0.02 280)" }}
                      >
                        Gravitational force between two masses
                      </p>
                    </InteractiveMathBlock>

                    <InteractiveMathBlock>
                      <p
                        className="font-syne text-xs uppercase tracking-wider mb-3"
                        style={{ color: "oklch(0.55 0.02 280)" }}
                      >
                        Poisson's Equation
                      </p>
                      <div className="text-near-white">
                        <MathBlock
                          formula="\\nabla^2 \\phi = 4\\pi G \\rho"
                          display={true}
                        />
                      </div>
                      <p
                        className="font-syne text-xs mt-3"
                        style={{ color: "oklch(0.45 0.02 280)" }}
                      >
                        Gravitational potential field
                      </p>
                    </InteractiveMathBlock>

                    <InteractiveMathBlock>
                      <p
                        className="font-syne text-xs uppercase tracking-wider mb-3"
                        style={{ color: "oklch(0.55 0.02 280)" }}
                      >
                        Newton's Second Law
                      </p>
                      <div className="text-near-white">
                        <MathBlock formula="F = ma" display={true} />
                      </div>
                      <p
                        className="font-syne text-xs mt-3"
                        style={{ color: "oklch(0.45 0.02 280)" }}
                      >
                        Foundation of all dynamics
                      </p>
                    </InteractiveMathBlock>
                  </div>
                </div>
              </div>
            </TiltArticle>
          </div>
        </div>
      </div>
    </section>
  );
}
