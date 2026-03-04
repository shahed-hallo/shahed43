import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 40;
  window.scrollTo({ top, behavior: "smooth" });
}

const navLinks = [
  { label: "Work", anchor: "work" },
  { label: "About", anchor: "about" },
  { label: "Contact", anchor: "contact" },
];

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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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

  return (
    <>
      {/* ── MOBILE HAMBURGER ── */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          ref={menuBtnRef}
          type="button"
          className="flex items-center justify-center w-11 h-11 rounded-full border border-fuchsia-500/25 transition-all duration-200 hover:border-fuchsia-500/50"
          style={{
            background: "oklch(0.10 0.025 280 / 0.85)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px oklch(0.08 0.01 280 / 0.5)",
          }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          data-ocid="nav.toggle"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="14"
              height="1.5"
              rx="1"
              fill="oklch(0.97 0.01 60 / 0.85)"
            />
            <rect
              x="3"
              y="9.25"
              width="10"
              height="1.5"
              rx="1"
              fill="oklch(0.78 0.22 320)"
            />
            <rect
              x="3"
              y="13.5"
              width="14"
              height="1.5"
              rx="1"
              fill="oklch(0.97 0.01 60 / 0.85)"
            />
          </svg>
        </button>
      </div>

      {/* ── MOBILE FULL-SCREEN OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[55]"
              style={{ background: "oklch(0.06 0.02 280 / 0.65)" }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="mobile-nav"
              id="mobile-nav"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 z-[56] w-full max-w-sm flex flex-col overflow-hidden"
              style={{ background: "oklch(0.09 0.025 280)" }}
            >
              {/* Blobs */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                aria-hidden="true"
              >
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px]"
                  style={{ background: "oklch(0.42 0.24 340 / 0.3)" }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-20 -left-20 w-48 h-48 rounded-full blur-[60px]"
                  style={{ background: "oklch(0.38 0.22 310 / 0.25)" }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>

              {/* Header row */}
              <div className="relative flex items-center justify-between px-8 pt-8 pb-6">
                <button
                  type="button"
                  onClick={() => {
                    scrollTo("hero");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2"
                  data-ocid="nav.link"
                >
                  <img
                    src="/assets/generated/shahed-logo-transparent.dim_200x200.png"
                    alt="Shahed logo"
                    className="h-8 w-8 object-contain"
                  />
                  <span
                    className="font-playfair text-lg tracking-wide"
                    style={{ color: "oklch(0.97 0.01 60)" }}
                  >
                    Shahed
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-fuchsia-500/25 hover:border-fuchsia-500/50 transition-colors"
                  style={{ background: "oklch(0.14 0.03 280 / 0.8)" }}
                  aria-label="Close menu"
                  data-ocid="nav.close_button"
                >
                  <X
                    className="w-4 h-4"
                    style={{ color: "oklch(0.78 0.22 320)" }}
                  />
                </button>
              </div>

              {/* Nav links */}
              <nav
                className="relative flex-1 flex flex-col justify-center px-8 gap-2"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.anchor;
                  const num = String(i + 1).padStart(2, "0");
                  return (
                    <motion.button
                      key={link.anchor}
                      type="button"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.1 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => {
                        scrollTo(link.anchor);
                        setMenuOpen(false);
                      }}
                      className="group/mobilelink relative flex items-baseline gap-4 py-4 text-left border-b last:border-0"
                      style={{ borderColor: "oklch(0.58 0.26 340 / 0.1)" }}
                      data-ocid="nav.link"
                    >
                      <span
                        className="font-mono text-xs shrink-0 transition-colors duration-200"
                        style={{
                          color: isActive
                            ? "oklch(0.78 0.22 320)"
                            : "oklch(0.58 0.26 340 / 0.5)",
                        }}
                      >
                        {num} /
                      </span>
                      <span
                        className="font-syne text-3xl font-bold uppercase tracking-[0.06em] transition-all duration-300 group-hover/mobilelink:translate-x-2"
                        style={{
                          color: isActive
                            ? "oklch(0.88 0.20 320)"
                            : "oklch(0.93 0.01 60 / 0.85)",
                          textShadow: isActive
                            ? "0 0 24px oklch(0.58 0.26 340 / 0.5)"
                            : "none",
                        }}
                      >
                        {link.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active-dot"
                          className="ml-auto w-2 h-2 rounded-full shrink-0 self-center"
                          style={{
                            background: "oklch(0.58 0.26 340)",
                            boxShadow:
                              "0 0 8px oklch(0.58 0.26 340 / 0.9), 0 0 20px oklch(0.58 0.26 340 / 0.4)",
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Footer hint */}
              <div className="relative px-8 pb-10 pt-4">
                <p
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "oklch(0.55 0.08 280 / 0.6)" }}
                >
                  SHAHED · PORTFOLIO
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
