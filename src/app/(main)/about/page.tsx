"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";
import { Target, Lightbulb, Users, Code } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 overflow-hidden relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://wacczx1wb9.ufs.sh/f/kWvWLmocjl9L7mt47Ij8fYQ9bWBJ8hoyzqX42mRjMEDNtKIL"
          alt=""
          className="w-full h-[150%] object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/95 to-[#020617]" />
      </div>

      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
                style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}>
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#e2e8f0" }}>
            Empowering <span className="gradient-text">Creators</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
            Developers Needs was built by Minecraft server owners for server owners. We know the struggle of finding quality, reliable resources, so we created a platform to solve it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                   style={{ background: "rgba(0,212,255,0.1)" }}>
                <Target className="w-6 h-6" style={{ color: "#00d4ff" }} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#e2e8f0" }}>Our Mission</h3>
                <p className="leading-relaxed" style={{ color: "#94a3b8" }}>
                  To provide the safest, most reliable marketplace for Minecraft server owners and developers to buy, sell, and share resources.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                   style={{ background: "rgba(124,58,237,0.1)" }}>
                <Lightbulb className="w-6 h-6" style={{ color: "#a78bfa" }} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#e2e8f0" }}>Our Vision</h3>
                <p className="leading-relaxed" style={{ color: "#94a3b8" }}>
                  To become the central hub for the Minecraft development community, fostering innovation and elevating server quality across the globe.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[300px]"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden"
                 style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Code className="w-32 h-32 opacity-20" style={{ color: "#00d4ff" }} />
              </div>
              {/* Glass overlay */}
              <div className="absolute inset-0"
                   style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), transparent)" }} />
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-10" style={{ color: "#e2e8f0" }}>
            The <span className="gradient-text">Core Team</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Founder", "Co-Founder", "Lead Dev", "Community Mgr"].map((role, i) => (
              <GlassCard key={i} delay={i * 0.1} className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                     style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}>
                  {role[0]}
                </div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>Unknown User</h3>
                <p className="text-sm font-medium" style={{ color: "#00d4ff" }}>{role}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
