import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

const footerLinks = {
  marketplace: [
    { label: "Browse Shop", href: "/shop" },
    { label: "Plugins", href: "/shop?category=plugins" },
    { label: "Setups", href: "/shop?category=setups" },
    { label: "Maps", href: "/shop?category=maps" },
    { label: "Scripts", href: "/shop?category=scripts" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Discord", href: "/discord" },
    { label: "Contact", href: "/discord" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-20" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
           style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}>
                <span className="text-white font-bold text-lg">DN</span>
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">Developers</span>{" "}
                <span style={{ color: "#e2e8f0" }}>Needs</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
              Your ultimate destination for premium Minecraft resources. Browse plugins, setups, maps, and more from talented creators.
            </p>
            <div className="flex gap-3">
              <a href="https://discord.gg/8nSn9f28Na" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                 style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <MessageCircle className="w-4 h-4" style={{ color: "#94a3b8" }} />
              </a>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#e2e8f0" }}>
              Marketplace
            </h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: "#64748b" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#e2e8f0" }}>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: "#64748b" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#e2e8f0" }}>
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: "#64748b" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
             style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-sm" style={{ color: "#475569" }}>
            &copy; {new Date().getFullYear()} Developers Needs. All rights reserved.
          </p>
          <p className="text-sm flex items-center gap-1" style={{ color: "#475569" }}>
            Made with <Heart className="w-4 h-4" style={{ color: "#f43f5e" }} /> for the Minecraft community
          </p>
        </div>
      </div>
    </footer>
  );
}
