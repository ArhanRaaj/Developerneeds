"use client";

import { motion } from "framer-motion";
import { Shield, Zap, HeartHandshake, RefreshCw, Star, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Resources",
    description: "Every resource goes through our quality check process to ensure safety and reliability.",
    color: "#00d4ff",
    accent: "rgba(0,212,255,0.1)",
  },
  {
    icon: Zap,
    title: "Instant Downloads",
    description: "Get your resources instantly with our fast delivery system. No waiting, no hassle.",
    color: "#7c3aed",
    accent: "rgba(124,58,237,0.1)",
  },
  {
    icon: HeartHandshake,
    title: "Active Community",
    description: "Join thousands of Minecraft enthusiasts sharing knowledge and resources.",
    color: "#10b981",
    accent: "rgba(16,185,129,0.1)",
  },
  {
    icon: RefreshCw,
    title: "Regular Updates",
    description: "Resources are regularly updated to support the latest Minecraft versions.",
    color: "#f59e0b",
    accent: "rgba(245,158,11,0.1)",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Hand-picked resources from talented developers and creators worldwide.",
    color: "#f43f5e",
    accent: "rgba(244,63,94,0.1)",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our community and staff are always available to help you with any issues.",
    color: "#06b6d4",
    accent: "rgba(6,182,212,0.1)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-20" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15), transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #00d4ff)" }} />
            <span className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "#00d4ff" }}>
              Why Choose Us
            </span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #00d4ff, transparent)" }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5" style={{ color: "#f1f5f9" }}>
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ultimate
            </span>{" "}
            Marketplace
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
            We&apos;re not just a marketplace — we&apos;re a community dedicated to elevating your Minecraft experience.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-2xl p-7 overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at top right, ${feature.color}12, transparent 70%)`,
                  }}
                />
                {/* Bottom line accent on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                  }}
                />

                <div
                  className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center relative transition-all duration-300 group-hover:scale-110"
                  style={{ background: feature.accent }}
                >
                  <Icon className="w-7 h-7 relative z-10" style={{ color: feature.color }} />
                  {/* Glow behind icon on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: feature.color }}
                  />
                </div>
                <h3 className="text-lg font-bold mb-2.5 transition-colors duration-300 group-hover:text-white" style={{ color: "#e2e8f0" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
