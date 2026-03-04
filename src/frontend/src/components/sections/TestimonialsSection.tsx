import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const testimonials = [
  {
    name: "Ratul",
    avatar: "/assets/generated/avatar-ratul.dim_120x120.jpg",
    quote:
      "Genzthepixel completely changed how I approach math problems. It's like having a genius friend available 24/7.",
    role: "Student",
  },
  {
    name: "Tarek",
    avatar: "/assets/generated/avatar-tarek.dim_120x120.jpg",
    quote:
      "I used to struggle with complex equations. Now I solve them with confidence thanks to Shahed's tool.",
    role: "Student",
  },
  {
    name: "Jerin",
    avatar: "/assets/generated/avatar-jerin.dim_120x120.jpg",
    quote:
      "The AI math tool is incredible. It explains concepts in a way that finally makes sense to me.",
    role: "Student",
  },
  {
    name: "Saifa",
    avatar: "/assets/generated/avatar-saifa.dim_120x120.jpg",
    quote:
      "As a student, Genzthepixel has been a game-changer. Shahed built something truly special for our community.",
    role: "Student",
  },
  {
    name: "Hasan",
    avatar: "/assets/generated/avatar-hasan.dim_120x120.jpg",
    quote:
      "I've never seen a local developer create something so impactful. Genzthepixel is revolutionary.",
    role: "Community Member",
  },
];

interface Particle {
  id: number;
  dx: number;
  dy: number;
}

interface DotBurst {
  dotIndex: number;
  particles: Particle[];
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>(null);
  const { ref: sectionRef, isVisible } = useIntersectionObserver();
  const [dotBurst, setDotBurst] = useState<DotBurst | null>(null);
  const [blockquoteHovered, setBlockquoteHovered] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActive(index);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning],
  );

  const prev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length);
  }, [active, goTo]);

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length);
  }, [active, goTo]);

  useEffect(() => {
    if (!isVisible) return;
    autoPlayRef.current = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isVisible]);

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const handleDotClick = (i: number) => {
    stopAutoPlay();
    goTo(i);
    // Spawn particle burst
    const particles = Array.from({ length: 6 }, (_, pid) => ({
      id: pid,
      dx: Math.cos((pid / 6) * Math.PI * 2) * (20 + Math.random() * 12),
      dy: Math.sin((pid / 6) * Math.PI * 2) * (20 + Math.random() * 12),
    }));
    setDotBurst({ dotIndex: i, particles });
    setTimeout(() => setDotBurst(null), 700);
  };

  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 overflow-hidden"
      style={{ background: "oklch(0.11 0.01 280)" }}
      aria-labelledby="testimonials-heading"
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
          06
        </span>
      </div>

      {/* Background decoration + animated orbs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.58 0.26 340), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: "oklch(0.58 0.26 340 / 0.2)" }}
        />
        <div
          className="animate-orb-1 absolute right-0 top-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.58 0.26 340 / 0.07)" }}
        />
        <div
          className="animate-orb-2 absolute left-0 bottom-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "oklch(0.72 0.22 320 / 0.07)" }}
        />
        <div className="animate-glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/8" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section header */}
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
            Social Proof
            <motion.span
              className="inline-block h-px"
              style={{ background: "oklch(0.72 0.22 320)", width: "32px" }}
              whileHover={{ width: "56px", transition: { duration: 0.3 } }}
            />
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            className="font-playfair text-4xl md:text-5xl text-near-white cursor-default"
            whileHover={{
              textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.8)",
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
          >
            What They Say About
            <br />
            <em className="text-gradient-pink not-italic">Genzthepixel</em>
          </motion.h2>
        </div>

        {/* Slider */}
        <section
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseEnter={stopAutoPlay}
          aria-label="Testimonials slider"
          aria-roledescription="carousel"
        >
          <motion.div
            className="relative p-10 md:p-14 transition-opacity duration-300"
            style={{
              background: "oklch(0.15 0.01 280)",
              border: blockquoteHovered
                ? "1px solid oklch(0.58 0.26 340 / 0.4)"
                : "1px solid oklch(0.25 0.02 340)",
              opacity: isTransitioning ? 0 : 1,
              transition: "border 0.2s ease, opacity 0.3s ease",
            }}
            onMouseEnter={() => setBlockquoteHovered(true)}
            onMouseLeave={() => setBlockquoteHovered(false)}
            whileHover={{
              boxShadow: "0 0 40px oklch(0.58 0.26 340 / 0.15)",
              transition: { duration: 0.3 },
            }}
          >
            {/* Large quote mark */}
            <motion.div
              className="absolute top-6 left-10 font-playfair text-9xl leading-none select-none pointer-events-none"
              style={{ color: "oklch(0.58 0.26 340 / 0.12)" }}
              animate={{
                color: blockquoteHovered
                  ? "oklch(0.58 0.26 340 / 0.35)"
                  : "oklch(0.58 0.26 340 / 0.12)",
                scale: blockquoteHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              "
            </motion.div>

            <div className="relative z-10">
              {/* Avatar and name */}
              <div className="flex items-center gap-4 mb-8">
                <motion.img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  style={{
                    border: "2px solid oklch(0.58 0.26 340 / 0.5)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px oklch(0.58 0.26 340 / 0.5)",
                    transition: { duration: 0.2 },
                  }}
                />
                <div>
                  <motion.p
                    className="font-playfair text-xl text-near-white cursor-default"
                    whileHover={{
                      textShadow: "0 0 20px oklch(0.78 0.22 320 / 0.5)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {current.name}
                  </motion.p>
                  <p
                    className="font-syne text-xs tracking-wider uppercase"
                    style={{ color: "oklch(0.72 0.22 320)" }}
                  >
                    {current.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote>
                <motion.p
                  className="font-playfair text-2xl md:text-3xl text-near-white leading-relaxed italic cursor-default"
                  whileHover={{
                    textShadow: "0 0 20px oklch(0.78 0.22 320 / 0.3)",
                    scale: 1.005,
                    transition: { duration: 0.2 },
                  }}
                >
                  "{current.quote}"
                </motion.p>
              </blockquote>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots with particle burst */}
            <div
              className="flex gap-2"
              role="tablist"
              aria-label="Testimonial navigation dots"
            >
              {testimonials.map((t, i) => (
                <div key={t.name} className="relative">
                  {/* Particle burst */}
                  {dotBurst?.dotIndex === i &&
                    dotBurst.particles.map((p) => (
                      <div
                        key={p.id}
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
                        style={{
                          background: "oklch(0.72 0.22 320)",
                          boxShadow: "0 0 4px oklch(0.58 0.26 340)",
                          animation: "wave-burst 700ms ease-out forwards",
                          transform: `translate(calc(-50% + ${p.dx}px), calc(-50% + ${p.dy}px))`,
                          zIndex: 10,
                        }}
                      />
                    ))}
                  <motion.button
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Go to testimonial by ${t.name}`}
                    onClick={() => handleDotClick(i)}
                    className="transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    style={{
                      width: i === active ? "32px" : "8px",
                      height: "8px",
                      background:
                        i === active
                          ? "oklch(0.58 0.26 340)"
                          : "oklch(0.35 0.02 280)",
                      borderRadius: "4px",
                    }}
                    whileHover={{
                      boxShadow: "0 0 12px oklch(0.58 0.26 340 / 0.6)",
                      transition: { duration: 0.2 },
                    }}
                    data-ocid="testimonials.tab"
                  />
                </div>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <motion.button
                type="button"
                onClick={() => {
                  stopAutoPlay();
                  prev();
                }}
                className="w-10 h-10 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                style={{
                  border: "1px solid oklch(0.35 0.02 280)",
                  color: "oklch(0.65 0.02 280)",
                }}
                whileHover={{
                  scale: 1.1,
                  borderColor: "oklch(0.58 0.26 340 / 0.6)",
                  color: "oklch(0.72 0.22 320)",
                  boxShadow: "0 0 16px oklch(0.58 0.26 340 / 0.3)",
                  transition: { duration: 0.2 },
                }}
                aria-label="Previous testimonial"
                data-ocid="testimonials.pagination_prev"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  stopAutoPlay();
                  next();
                }}
                className="w-10 h-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.58 0.26 340), oklch(0.42 0.16 345))",
                  color: "white",
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px oklch(0.58 0.26 340 / 0.5)",
                  transition: { duration: 0.2 },
                }}
                aria-label="Next testimonial"
                data-ocid="testimonials.pagination_next"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* All testimonials mini-grid */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-5 gap-3 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              type="button"
              onClick={() => {
                stopAutoPlay();
                goTo(i);
              }}
              className={`p-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                i === active ? "scale-[1.02]" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background:
                  i === active
                    ? "oklch(0.58 0.26 340 / 0.1)"
                    : "oklch(0.15 0.01 280)",
                border: `1px solid ${i === active ? "oklch(0.58 0.26 340 / 0.4)" : "oklch(0.22 0.02 280)"}`,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 16px oklch(0.58 0.26 340 / 0.2)",
                borderColor: "oklch(0.58 0.26 340 / 0.4)",
                transition: { duration: 0.2 },
              }}
              aria-label={`View testimonial from ${t.name}`}
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-8 h-8 rounded-full object-cover mx-auto mb-2"
                style={{
                  border:
                    i === active
                      ? "1px solid oklch(0.58 0.26 340)"
                      : "1px solid transparent",
                }}
              />
              <p
                className="font-syne text-xs"
                style={{ color: "oklch(0.92 0.02 60)" }}
              >
                {t.name}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
