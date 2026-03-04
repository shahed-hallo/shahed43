import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useScrollParallax } from "../../hooks/useScrollParallax";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  dy: number;
  createdAt: number;
}

interface BurstParticle {
  id: number;
  angle: number;
  distance: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 3,
    opacity: Math.random() * 0.6 + 0.2,
  }));
}

interface MagneticButtonProps {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "data-ocid"?: string;
}

function MagneticButton({
  onClick,
  className,
  style,
  children,
  "data-ocid": ocid,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.22;
    const dy = (e.clientY - cy) * 0.22;
    btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.02)`;
    btn.style.boxShadow = "0 0 30px oklch(0.58 0.26 340 / 0.5)";
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0, 0) scale(1)";
    btn.style.boxShadow = "";
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transition:
          "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
      }}
      data-ocid={ocid}
    >
      {children}
    </button>
  );
}

export default function HeroSection() {
  const [particles] = useState(() => generateParticles(20));
  const [visible, setVisible] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [orbX, setOrbX] = useState(0);
  const [orbY, setOrbY] = useState(0);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [hueShift, setHueShift] = useState(0);
  const [photoHovered, setPhotoHovered] = useState(false);
  const [shimmerActive, setShimmerActive] = useState(false);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);
  const [tiltStyle, setTiltStyle] = useState({});
  const photoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animFrameRef = useRef<number>(0);
  const sparkleIdRef = useRef(0);

  // Parallax refs for orbs
  const orb1Ref = useScrollParallax(0.08);
  const orb2Ref = useScrollParallax(-0.05);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Smooth lerp orb following mouse
  useEffect(() => {
    let rafId: number;
    let currentX = 0;
    let currentY = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.06);
      currentY = lerp(currentY, mouseY, 0.06);
      setOrbX(currentX);
      setOrbY(currentY);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    animFrameRef.current = rafId;
    return () => cancelAnimationFrame(rafId);
  }, [mouseX, mouseY]);

  // Clean up old sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setSparkles((prev) => prev.filter((s) => now - s.createdAt < 600));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);

    // Hue shift based on X position
    const xRatio = (e.clientX - rect.left) / rect.width;
    setHueShift((xRatio - 0.5) * 20);

    // Spawn sparkles
    const now = Date.now();
    const newSparkles: SparkleParticle[] = Array.from({ length: 2 }, () => ({
      id: sparkleIdRef.current++,
      x: e.clientX - rect.left + (Math.random() - 0.5) * 20,
      y: e.clientY - rect.top + (Math.random() - 0.5) * 20,
      size: Math.random() * 4 + 3,
      dy: -(Math.random() * 20 + 10),
      createdAt: now,
    }));
    setSparkles((prev) => [...prev.slice(-20), ...newSparkles]);
  };

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / (rect.width / 2)) * 8;
    const dy = ((e.clientY - cy) / (rect.height / 2)) * 8;
    setTiltStyle({
      transform: `perspective(600px) rotateX(${-dy}deg) rotateY(${dx}deg)`,
      transition: "transform 0.1s ease",
    });
  };

  const handlePhotoMouseEnter = () => {
    setPhotoHovered(true);
    setShimmerActive(true);
    setTimeout(() => setShimmerActive(false), 600);

    // Spawn 8 radial burst particles
    const bursts: BurstParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * 360,
      distance: 50 + Math.random() * 30,
    }));
    setBurstParticles(bursts);
    setTimeout(() => setBurstParticles([]), 500);
  };

  const handlePhotoMouseLeave = () => {
    setPhotoHovered(false);
    setTiltStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen mesh-gradient-hero flex items-center overflow-hidden pt-20"
      aria-label="Hero section"
      onMouseMove={handleSectionMouseMove}
      style={{ filter: `hue-rotate(${hueShift}deg)` }}
    >
      {/* Section number */}
      <div
        className="absolute top-28 right-14 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-syne text-xs tracking-[0.4em] uppercase"
          style={{ color: "oklch(0.58 0.26 340 / 0.5)" }}
        >
          01
        </span>
      </div>

      {/* Mouse-tracking orb */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, oklch(0.58 0.26 340 / 0.15) 0%, transparent 70%)",
          left: orbX - 200,
          top: orbY - 200,
          filter: "blur(40px)",
          transition: "none",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Sparkle particles on mouse move */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {sparkles.map((s) => {
          const age = (Date.now() - s.createdAt) / 600;
          return (
            <div
              key={s.id}
              className="absolute rounded-full"
              style={{
                left: s.x,
                top: s.y + s.dy * age,
                width: s.size,
                height: s.size,
                background: "oklch(0.78 0.22 320)",
                opacity: Math.max(0, 1 - age),
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 6px oklch(0.58 0.26 340)",
              }}
            />
          );
        })}
      </div>

      {/* Ambient floating particles */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: `oklch(0.58 0.26 ${320 + p.x * 0.5})`,
              opacity: p.opacity,
              animation: `float-up ${p.duration}s ease-out ${p.delay}s infinite`,
            }}
          />
        ))}
        {/* Animated drifting orbs — parallax wrapper separates translate from CSS animation */}
        <div
          ref={orb1Ref as React.RefObject<HTMLDivElement>}
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px]"
        >
          <div
            className="animate-orb-1 w-full h-full rounded-full blur-3xl"
            style={{ background: "oklch(0.58 0.26 340 / 0.10)" }}
          />
        </div>
        <div
          ref={orb2Ref as React.RefObject<HTMLDivElement>}
          className="absolute bottom-1/3 left-1/4 w-80 h-80"
        >
          <div
            className="animate-orb-2 w-full h-full rounded-full blur-3xl"
            style={{ background: "oklch(0.42 0.16 345 / 0.14)" }}
          />
        </div>
        <div
          className="animate-orb-3 absolute top-2/3 right-1/5 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.72 0.22 320 / 0.08)" }}
        />
        {/* Slow pulsing glow ring */}
        <div className="animate-glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-primary/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10">
        {/* Left: Text content */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p
            className="font-syne text-xs tracking-[0.4em] uppercase mb-6 inline-flex items-center gap-3 cursor-default transition-all duration-300 hover:tracking-[0.6em]"
            style={{ color: "oklch(0.72 0.22 320)" }}
          >
            <span
              className="inline-block w-8 h-px transition-all duration-300 hover:w-14"
              style={{ background: "oklch(0.72 0.22 320)" }}
            />
            Junior Programmer · Fashionista
          </p>

          <h1 className="font-playfair leading-none mb-8">
            <span className="block text-7xl md:text-8xl xl:text-9xl font-black">
              <motion.span
                className="block cursor-default"
                style={{ color: "oklch(0.97 0.01 60)" }}
                whileHover={{
                  textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.8)",
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
              >
                Shahed
              </motion.span>
            </span>
            <span className="block text-5xl md:text-6xl xl:text-7xl font-normal italic">
              <motion.span
                className="block cursor-default"
                style={{ color: "oklch(0.72 0.22 320)" }}
                whileHover={{
                  textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.8)",
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
              >
                Programming
              </motion.span>
            </span>
            <span className="block text-6xl md:text-7xl xl:text-8xl font-bold">
              <motion.span
                className="block cursor-default"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.22 320), oklch(0.65 0.18 60))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
              >
                is Art.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="font-syne text-lg mb-10 max-w-md leading-relaxed cursor-default"
            style={{ color: "oklch(0.75 0.05 280)" }}
            whileHover={{
              color: "oklch(0.92 0.02 60)",
              borderLeft: "2px solid oklch(0.58 0.26 340)",
              paddingLeft: "12px",
              transition: { duration: 0.2 },
            }}
          >
            Merging the precision of low-level C programming with the elegance
            of high fashion. Building physics engines, one line at a time.
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton
              onClick={() => scrollTo("work")}
              className="shimmer-btn font-syne font-semibold tracking-widest uppercase text-sm px-8 py-4 text-white rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker-bg"
              data-ocid="hero.primary_button"
            >
              View Work
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("contact")}
              className="font-syne font-semibold tracking-widest uppercase text-sm px-8 py-4 rounded-none border border-near-white/30 text-near-white/80 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker-bg"
              data-ocid="hero.secondary_button"
            >
              Get in Touch
            </MagneticButton>
          </div>
        </div>

        {/* Right: Profile image */}
        <div
          className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decorative ring */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border border-primary/20 animate-spin-slow"
              style={{
                filter: photoHovered ? "hue-rotate(40deg)" : "none",
                transition: "filter 0.5s ease",
              }}
            />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="w-72 h-72 lg:w-80 lg:h-80 rounded-full border border-primary/10"
              style={{
                animation: "spin-slow 30s linear infinite reverse",
                filter: photoHovered ? "hue-rotate(40deg)" : "none",
                transition: "filter 0.5s ease",
              }}
            />
          </div>

          {/* Profile image with clip */}
          <div
            className="relative z-10 group/photo"
            ref={photoRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseEnter={handlePhotoMouseEnter}
            onMouseLeave={handlePhotoMouseLeave}
            style={tiltStyle}
          >
            {/* Pink glow on hover — expands with scale */}
            <motion.div
              className="absolute inset-0 pointer-events-none -z-10"
              style={{ background: "oklch(0.58 0.26 340 / 0.5)" }}
              animate={{
                opacity: photoHovered ? 1 : 0,
                scale: photoHovered ? 1.15 : 1,
                filter: photoHovered ? "blur(32px)" : "blur(16px)",
              }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            />

            {/* Pulsing ring on hover */}
            {photoHovered && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none -z-10"
                style={{
                  border: "2px solid oklch(0.72 0.22 320 / 0.8)",
                }}
                animate={{
                  scale: [0.8, 1.3],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                }}
                aria-hidden="true"
              />
            )}

            {/* Burst particles */}
            {burstParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: "8px",
                  height: "8px",
                  background: "oklch(0.72 0.22 320)",
                  boxShadow: "0 0 8px oklch(0.58 0.26 340)",
                  top: "50%",
                  left: "50%",
                  zIndex: 20,
                }}
                initial={{ x: -4, y: -4, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((p.angle * Math.PI) / 180) * p.distance - 4,
                  y: Math.sin((p.angle * Math.PI) / 180) * p.distance - 4,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                aria-hidden="true"
              />
            ))}

            <div
              className="profile-clip overflow-hidden w-72 h-96 lg:w-80 lg:h-[420px] relative"
              style={{
                background: "oklch(0.13 0.01 280)",
                boxShadow: photoHovered
                  ? "0 0 60px oklch(0.58 0.26 340 / 0.7)"
                  : "none",
                transition: "box-shadow 0.4s ease",
              }}
            >
              <img
                src="/assets/uploads/Untitled-2-1.png"
                alt="Shahed — Junior Programmer & Fashionista"
                className="w-full h-full object-cover object-top"
              />
              {/* Shimmer sweep */}
              {shimmerActive && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.25) 50%, transparent 60%)",
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Corner decoration */}
            <div
              className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2"
              style={{ borderColor: "oklch(0.58 0.26 340)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2"
              style={{ borderColor: "oklch(0.72 0.22 320)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        aria-hidden="true"
      >
        <span className="font-syne text-xs tracking-[0.3em] uppercase text-near-white/30">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}
