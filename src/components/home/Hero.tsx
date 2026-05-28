"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Download, Shield, Star, Zap, Users, ChevronDown } from "lucide-react";
import { useRef } from "react";

const floatingIcons = [
  { icon: "⚡", x: "10%", y: "20%", delay: 0, size: "text-3xl", duration: 7 },
  { icon: "🔌", x: "85%", y: "15%", delay: 1, size: "text-4xl", duration: 8 },
  { icon: "🗺️", x: "75%", y: "70%", delay: 2, size: "text-3xl", duration: 6 },
  { icon: "⚙️", x: "15%", y: "65%", delay: 0.5, size: "text-2xl", duration: 9 },
  { icon: "🏰", x: "90%", y: "45%", delay: 1.5, size: "text-2xl", duration: 7 },
  { icon: "💎", x: "5%", y: "45%", delay: 2.5, size: "text-3xl", duration: 8 },
];

const trustBadges = [
  { icon: Shield, label: "Verified Safe", color: "#10b981" },
  { icon: Star, label: "4.9★ Rated", color: "#f59e0b" },
  { icon: Zap, label: "Instant Access", color: "#00d4ff" },
  { icon: Users, label: "10K+ Users", color: "#a78bfa" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="https://wacczx1wb9.ufs.sh/f/kWvWLmocjl9L7mt47Ij8fYQ9bWBJ8hoyzqX42mRjMEDNtKIL"
          alt=""
          className="w-full h-[130%] object-cover"
        />
        {/* Cinematic color grade overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.1) 30%, rgba(2,6,23,0.2) 60%, rgba(2,6,23,0.95) 85%, #020617 100%)" }} />
        {/* Side vignettes */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(2,6,23,0.7) 100%)" }} />
      </motion.div>

      {/* Animated glow orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.4), transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.3), transparent 70%)" }}
        />
      </div>

      {/* Floating Minecraft icons */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.size} select-none`}
            style={{ left: item.x, top: item.y, filter: "drop-shadow(0 0 12px rgba(0,212,255,0.4))" }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [-5, 5, -5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20" style={{ y: textY, opacity }}>
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 cursor-default group"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))",
            border: "1px solid rgba(0,212,255,0.25)",
            boxShadow: "0 0 30px rgba(0,212,255,0.1), inset 0 0 30px rgba(0,212,255,0.05)",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "#00d4ff" }} />
          </motion.div>
          <span className="text-sm font-semibold tracking-wide" style={{ color: "#00d4ff" }}>
            #1 Minecraft Resource Marketplace
          </span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-3.5 h-3.5" style={{ color: "#00d4ff" }} />
          </motion.div>
        </motion.div>

        {/* Hero title with stagger */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight"
          >
            <span style={{ color: "#f1f5f9" }}>Everything Your</span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mt-2"
          >
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 4s ease-in-out infinite",
                filter: "drop-shadow(0 0 30px rgba(0,212,255,0.3))",
              }}
            >
              Minecraft Server
            </span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mt-2"
          >
            <span style={{ color: "#f1f5f9" }}>Needs</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block ml-1"
              style={{ color: "#00d4ff", fontSize: "0.6em" }}
            >
              _
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(203,213,225,0.9)" }}
        >
          Premium plugins, server setups, maps, configs & more — built by developers,{" "}
          <span style={{ color: "#00d4ff", fontWeight: 600 }}>trusted by thousands</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/shop"
            className="group relative flex items-center gap-3 text-lg font-bold text-white px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(0,212,255,0.3)]"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
            }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            <ShoppingBagIcon className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Browse Shop</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/discord"
            className="group flex items-center gap-3 text-lg font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#cbd5e1",
              backdropFilter: "blur(10px)",
            }}
          >
            <DiscordIcon />
            <span>Join Discord</span>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-2 text-sm"
                style={{ color: "rgba(148,163,184,0.8)" }}
              >
                <Icon className="w-4 h-4" style={{ color: badge.color }} />
                <span>{badge.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(148,163,184,0.5)" }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" style={{ color: "rgba(0,212,255,0.5)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function DiscordIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
    </svg>
  );
}

function ShoppingBagIcon(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
