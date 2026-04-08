import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Youtube } from "lucide-react";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const socialLinks = [
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@genzthepixel",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/genzthepixel",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    href: "https://x.com/genzthepixel",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: "oklch(0.07 0.01 280)" }}
      aria-label="Site footer"
    >
      {/* Gradient top border */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.58 0.26 340), oklch(0.72 0.22 320), oklch(0.58 0.26 340), transparent)",
          boxShadow: "0 0 12px oklch(0.58 0.26 340 / 0.4)",
        }}
        aria-hidden="true"
      />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/shahed-logo-photo.png"
                alt="Shahed logo"
                className="h-10 w-10 object-cover"
                style={{
                  borderRadius: "50%",
                  border: "2px solid oklch(0.58 0.26 340 / 0.5)",
                  boxShadow: "0 0 12px oklch(0.58 0.26 340 / 0.5)",
                }}
              />
              <span className="font-playfair text-2xl text-near-white">
                Shahed
              </span>
            </div>
            <p
              className="font-playfair text-lg italic mb-4"
              style={{ color: "oklch(0.72 0.22 320)" }}
            >
              "Programming is Art."
            </p>
            <p
              className="font-syne text-sm leading-relaxed"
              style={{ color: "oklch(0.45 0.02 280)" }}
            >
              Junior Programmer · Fashionista · Physics Enthusiast · Creator of
              BecatTech
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p
              className="font-syne text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "oklch(0.45 0.02 280)" }}
            >
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {[
                  { label: "Work", anchor: "work" },
                  { label: "About", anchor: "about" },
                  { label: "Contact", anchor: "contact" },
                ].map((item) => (
                  <li key={item.anchor}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.anchor)}
                      className="font-syne text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                      style={{ color: "oklch(0.55 0.02 280)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "oklch(0.72 0.22 320)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "oklch(0.55 0.02 280)";
                      }}
                      data-ocid="footer.link"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    to="/privacy"
                    className="font-syne text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                    style={{ color: "oklch(0.55 0.02 280)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.72 0.22 320)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.55 0.02 280)";
                    }}
                    data-ocid="footer.link"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="font-syne text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                    style={{ color: "oklch(0.55 0.02 280)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.72 0.22 320)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "oklch(0.55 0.02 280)";
                    }}
                    data-ocid="footer.link"
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Social column */}
          <div>
            <p
              className="font-syne text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "oklch(0.45 0.02 280)" }}
            >
              Connect
            </p>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary group/social"
                  style={{
                    border: "1px solid oklch(0.22 0.02 280)",
                    color: "oklch(0.45 0.02 280)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "oklch(0.97 0.01 60)";
                    el.style.borderColor = "oklch(0.58 0.26 340)";
                    el.style.background = "oklch(0.58 0.26 340 / 0.15)";
                    el.style.boxShadow =
                      "0 0 16px oklch(0.58 0.26 340 / 0.5), 0 0 32px oklch(0.58 0.26 340 / 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "oklch(0.45 0.02 280)";
                    el.style.borderColor = "oklch(0.22 0.02 280)";
                    el.style.background = "transparent";
                    el.style.boxShadow = "none";
                  }}
                  aria-label={social.label}
                  data-ocid="footer.link"
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <p
              className="font-syne text-xs leading-relaxed mt-6"
              style={{ color: "oklch(0.35 0.02 280)" }}
            >
              For collaborations, commissions, or just to say hello — reach out
              anytime.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.22 0.02 280), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="font-syne text-xs"
            style={{ color: "oklch(0.35 0.02 280)" }}
          >
            © {year} Shahed. All rights reserved.
          </p>

          <p
            className="font-syne text-xs"
            style={{ color: "oklch(0.35 0.02 280)" }}
          >
            Shahed · BecatTech
          </p>
        </div>
      </div>
    </footer>
  );
}
