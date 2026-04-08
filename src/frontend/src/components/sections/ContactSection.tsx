import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Linkedin,
  Loader2,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzd6eVsAx-E4qSjs4csrgzK3VkPb46Eo0QIC1-du4gFjs-UvYpMsNp2RsUZqJjUPcbU/exec";

const socialLinks = [
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@genzthepixel",
    color: "oklch(0.65 0.2 25)",
    hoverBg: "oklch(0.65 0.2 25 / 0.1)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/genzthepixel",
    color: "oklch(0.72 0.22 320)",
    hoverBg: "oklch(0.72 0.22 320 / 0.1)",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    href: "https://x.com/genzthepixel",
    color: "oklch(0.85 0 0)",
    hoverBg: "oklch(0.85 0 0 / 0.08)",
  },
];

export default function ContactSection() {
  const { ref: sectionRef, isVisible } = useIntersectionObserver();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsPending(true);
    try {
      const body = new URLSearchParams({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      }).toString();

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent! I'll get back to you soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 md:py-32 overflow-hidden mesh-gradient-hero"
      aria-labelledby="contact-heading"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {/* Background noise overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />
      {/* Animated orbs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {isMouseOver && (
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: "300px",
              height: "300px",
              background: "oklch(0.58 0.26 340 / 0.12)",
              left: mouseX - 150,
              top: mouseY - 150,
              transition: "left 0.5s ease, top 0.5s ease",
            }}
          />
        )}
        <div
          className="animate-orb-1 absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: "oklch(0.58 0.26 340 / 0.12)" }}
        />
        <div
          className="animate-orb-3 absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "oklch(0.42 0.16 345 / 0.10)" }}
        />
        <div
          className="animate-glow-pulse absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.72 0.22 320 / 0.08)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: heading + social */}
          <div
            className={`transition-all duration-700 ${
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
              Get in Touch
            </motion.p>

            <motion.h2
              id="contact-heading"
              className="font-playfair text-4xl md:text-5xl text-near-white mb-8 leading-tight cursor-default"
              whileHover={{
                textShadow: "0 0 30px oklch(0.58 0.26 340 / 0.8)",
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
            >
              Let's Create
              <br />
              <em className="text-gradient-pink not-italic">
                Something Extraordinary
              </em>
            </motion.h2>

            <motion.p
              className="font-syne text-base leading-relaxed mb-12 max-w-sm cursor-default"
              style={{ color: "oklch(0.75 0.05 280)" }}
              whileHover={{
                color: "oklch(0.92 0.02 60)",
                borderLeft: "2px solid oklch(0.58 0.26 340)",
                paddingLeft: "12px",
                transition: { duration: 0.2 },
              }}
            >
              Have a project in mind? Want to collaborate on physics simulation,
              numerical computation, or just want to say hello? I'd love to hear
              from you.
            </motion.p>

            {/* Social links */}
            <div>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker-bg"
                    style={{
                      border: "1px solid oklch(0.35 0.02 280)",
                      color: "oklch(0.65 0.02 280)",
                    }}
                    whileHover={{
                      scale: 1.15,
                      color: social.color,
                      borderColor: social.color,
                      background: social.hoverBg,
                      boxShadow: `0 0 16px ${social.color}60`,
                      transition: { duration: 0.2 },
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {submitted ? (
              <div
                className="p-12 flex flex-col items-center text-center"
                style={{
                  background: "oklch(0.13 0.01 280 / 0.7)",
                  border: "1px solid oklch(0.58 0.26 340 / 0.3)",
                  backdropFilter: "blur(8px)",
                }}
                data-ocid="contact.success_state"
              >
                <CheckCircle
                  className="w-16 h-16 mb-6"
                  style={{ color: "oklch(0.72 0.22 320)" }}
                  aria-hidden="true"
                />
                <h3 className="font-playfair text-3xl text-near-white mb-3">
                  Message Sent!
                </h3>
                <p className="font-syne text-near-white/60 mb-6">
                  I'll get back to you as soon as possible.
                </p>
                <motion.button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-syne text-sm tracking-widest uppercase px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  style={{
                    border: "1px solid oklch(0.58 0.26 340 / 0.5)",
                    color: "oklch(0.72 0.22 320)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px oklch(0.58 0.26 340 / 0.3)",
                    transition: { duration: 0.2 },
                  }}
                >
                  Send Another
                </motion.button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-8 md:p-10 space-y-6"
                style={{
                  background: "oklch(0.13 0.01 280 / 0.7)",
                  border: "1px solid oklch(0.35 0.02 280)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-name"
                    className="font-syne text-xs tracking-[0.2em] uppercase"
                    style={{ color: "oklch(0.65 0.02 280)" }}
                  >
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="font-syne text-near-white placeholder:text-near-white/30 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-primary bg-transparent"
                    style={{
                      borderBottomColor: "oklch(0.35 0.02 280)",
                      color: "oklch(0.97 0.01 60)",
                    }}
                    data-ocid="contact.input"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="font-syne text-xs tracking-[0.2em] uppercase"
                    style={{ color: "oklch(0.65 0.02 280)" }}
                  >
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="font-syne text-near-white placeholder:text-near-white/30 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-primary bg-transparent"
                    style={{
                      borderBottomColor: "oklch(0.35 0.02 280)",
                      color: "oklch(0.97 0.01 60)",
                    }}
                    data-ocid="contact.input"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="font-syne text-xs tracking-[0.2em] uppercase"
                    style={{ color: "oklch(0.65 0.02 280)" }}
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell me about your project or idea..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="font-syne text-near-white placeholder:text-near-white/30 rounded-none border focus-visible:ring-1 focus-visible:ring-primary bg-transparent resize-none"
                    style={{
                      borderColor: "oklch(0.35 0.02 280)",
                      color: "oklch(0.97 0.01 60)",
                    }}
                    data-ocid="contact.textarea"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-3 font-syne font-semibold tracking-widest uppercase text-sm py-4 text-white disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-darker-bg"
                  style={{
                    background: isPending
                      ? "oklch(0.35 0.02 280)"
                      : "linear-gradient(135deg, oklch(0.58 0.26 340), oklch(0.42 0.16 345))",
                  }}
                  whileHover={
                    !isPending
                      ? {
                          scale: 1.01,
                          boxShadow: "0 0 30px oklch(0.58 0.26 340 / 0.5)",
                          transition: { duration: 0.2 },
                        }
                      : {}
                  }
                  whileTap={{ scale: 0.99 }}
                  aria-label={isPending ? "Sending message..." : "Send message"}
                  data-ocid="contact.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
