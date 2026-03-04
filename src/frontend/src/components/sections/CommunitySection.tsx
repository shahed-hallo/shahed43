import { BookOpen, Brain, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

function FlipCard({
  card,
  delay,
}: {
  card: { icon: React.ElementType; title: string; desc: string };
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative h-52"
      style={{ perspective: "1000px", transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 p-8 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "oklch(0.13 0.01 280 / 0.7)",
            border: flipped
              ? "1px solid oklch(0.58 0.26 340 / 0.6)"
              : "1px solid oklch(0.58 0.26 340 / 0.2)",
            backdropFilter: "blur(8px)",
            transition: "border 0.3s ease",
          }}
        >
          <motion.div
            animate={
              flipped ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.3 }}
          >
            <card.icon
              className="w-8 h-8 mb-4"
              style={{ color: "oklch(0.72 0.22 320)" }}
              aria-hidden="true"
            />
          </motion.div>
          <motion.h3
            className="font-playfair text-2xl mb-2 cursor-default"
            style={{ color: "oklch(1 0 0)" }}
            whileHover={{
              textShadow: "0 0 20px oklch(0.72 0.22 320 / 0.6)",
              transition: { duration: 0.2 },
            }}
          >
            {card.title}
          </motion.h3>
          <p
            className="font-syne text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.58 0.26 340 / 0.7)" }}
          >
            Hover to learn more →
          </p>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 p-8 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, oklch(0.58 0.26 340 / 0.2), oklch(0.42 0.16 345 / 0.3))",
            border: "1px solid oklch(0.58 0.26 340 / 0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            className="font-syne text-sm leading-relaxed"
            style={{ color: "oklch(0.97 0.01 60)" }}
          >
            {card.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const impactCards = [
  {
    icon: BookOpen,
    title: "Educational Tools",
    desc: "Built and distributed free digital learning tools that transformed how students in the local community study and practice mathematics.",
  },
  {
    icon: Brain,
    title: "AI Math Access",
    desc: "Genzthepixel — an AI-powered math solver — gives every student access to instant, accurate mathematical guidance, regardless of resources.",
  },
  {
    icon: Users,
    title: "Community Network",
    desc: "Connected 90% of the local population through a network of shared digital tools, creating a resilient, knowledge-sharing ecosystem.",
  },
];

export default function CommunitySection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  return (
    <section
      id="community"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 overflow-hidden mesh-gradient-community"
      aria-labelledby="community-heading"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          04
        </span>
      </div>

      {/* Decorative background elements + animated orbs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 right-1/4 w-px h-48 opacity-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.58 0.26 340), transparent)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-px h-32 opacity-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.72 0.22 320), transparent)",
          }}
        />
        {/* Mouse-reactive orb */}
        {isHovered && (
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: "350px",
              height: "350px",
              background: "oklch(0.58 0.26 340 / 0.12)",
              left: mouseX - 175,
              top: mouseY - 175,
              transition: "left 0.6s ease, top 0.6s ease",
            }}
          />
        )}
        {/* Animated orbs */}
        <div
          className="animate-orb-1 absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.58 0.26 340 / 0.12)" }}
        />
        <div
          className="animate-orb-2 absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "oklch(0.72 0.22 320 / 0.10)" }}
        />
        {/* Pulse rings — speed up on mouse hover */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10"
          style={{
            animation: `pulse-ring ${isHovered ? "1.5s" : "3s"} ease-out infinite`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
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
            Impact
            <motion.span
              className="inline-block h-px"
              style={{ background: "oklch(0.72 0.22 320)", width: "32px" }}
              whileHover={{ width: "56px", transition: { duration: 0.3 } }}
            />
          </motion.p>
          <motion.h2
            id="community-heading"
            className="font-playfair text-5xl md:text-6xl text-near-white cursor-default"
            whileHover={{
              textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.8)",
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
          >
            The Village Family
          </motion.h2>
        </div>

        {/* Big stat with pulsing rings */}
        <div
          className={`text-center mb-20 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-block relative"
            aria-label="90% of local population reached"
          >
            {/* Pulsing rings */}
            <div
              className="absolute inset-0 -m-8 rounded-full border border-primary/25 pulse-ring pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -m-16 rounded-full border border-primary/15 pulse-ring pointer-events-none"
              style={{ animationDelay: "0.7s" }}
              aria-hidden="true"
            />
            <motion.span
              className="font-playfair text-[10rem] md:text-[14rem] leading-none font-black cursor-default"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.58 0.26 340), oklch(0.72 0.22 320), oklch(0.65 0.18 60))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <AnimatedCounter target={90} suffix="%" />
            </motion.span>
            {/* Decorative glow behind number */}
            <div
              className="absolute inset-0 blur-3xl -z-10"
              style={{ background: "oklch(0.58 0.26 340 / 0.15)" }}
              aria-hidden="true"
            />
          </div>

          <motion.p
            className="font-syne text-xl max-w-2xl mx-auto mt-4 leading-relaxed cursor-default"
            style={{ color: "oklch(0.97 0.01 60)" }}
            whileHover={{
              color: "oklch(1 0 0)",
              textShadow: "0 0 20px oklch(0.78 0.22 320 / 0.3)",
              transition: { duration: 0.2 },
            }}
          >
            Of the local population is connected, empowered, and informed
            through Shahed's technological work and community initiatives.
          </motion.p>
        </div>

        {/* Impact cards — 3D flip on hover */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {impactCards.map((card, i) => (
            <FlipCard key={card.title} card={card} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
