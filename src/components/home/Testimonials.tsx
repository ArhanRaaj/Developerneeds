"use client";

import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Alex_MC",
    role: "Server Owner",
    content: "Developers Needs has been a game-changer for my server. The plugins and setups are top-notch quality and always up-to-date.",
    rating: 5,
    avatar: "A",
    gradient: "from-cyan-500 to-blue-600",
    accentColor: "#00d4ff",
  },
  {
    name: "CraftMaster",
    role: "Developer",
    content: "As a developer, this platform gives me the perfect audience. The upload system is smooth and the community is incredibly supportive.",
    rating: 5,
    avatar: "C",
    gradient: "from-violet-500 to-purple-600",
    accentColor: "#7c3aed",
  },
  {
    name: "BuilderPro",
    role: "Map Creator",
    content: "I've tried many marketplaces but none compare to the quality and organization of Developers Needs. Highly recommended!",
    rating: 5,
    avatar: "B",
    gradient: "from-emerald-500 to-green-600",
    accentColor: "#10b981",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Section Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wacczx1wb9.ufs.sh/f/kWvWLmocjl9LM5B5BDf2dabgLCVyqiPF45lZuezo970GSWfD"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #020617 0%, rgba(2,6,23,0.55) 30%, rgba(2,6,23,0.55) 70%, #020617 100%)" }} />
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
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #a78bfa)" }} />
            <span className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "#a78bfa" }}>
              Testimonials
            </span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #a78bfa, transparent)" }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5" style={{ color: "#f1f5f9" }}>
            Loved by the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Community
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
            Hear from our community members and creators about their experience.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-2xl p-7 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Quote watermark */}
              <Quote
                className="absolute top-5 right-5 w-10 h-10 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
                style={{ color: testimonial.accentColor }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${testimonial.accentColor}40, transparent)`,
                }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + j * 0.08 }}
                  >
                    <Star className="w-4 h-4 fill-current" style={{ color: "#f59e0b", filter: "drop-shadow(0 0 4px rgba(245,158,11,0.4))" }} />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(226,232,240,0.85)" }}>
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black text-white relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.accentColor}, ${testimonial.accentColor}88)`,
                    boxShadow: `0 4px 20px ${testimonial.accentColor}30`,
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
                    {testimonial.name}
                  </p>
                  <p className="text-xs font-medium" style={{ color: testimonial.accentColor }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="flex items-center justify-center gap-2 text-sm" style={{ color: "rgba(148,163,184,0.6)" }}>
            <MessageSquare className="w-4 h-4" />
            Join 10,000+ happy server owners on our Discord
          </p>
        </motion.div>
      </div>
    </section>
  );
}
