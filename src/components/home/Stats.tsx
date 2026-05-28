"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Download, Users, Package, Eye } from "lucide-react";

const stats = [
  { icon: Package, value: 500, suffix: "+", label: "Resources Available", color: "#00d4ff", gradient: "from-cyan-500/20 to-blue-500/20" },
  { icon: Download, value: 50, suffix: "K+", label: "Total Downloads", color: "#7c3aed", gradient: "from-violet-500/20 to-purple-500/20" },
  { icon: Users, value: 10, suffix: "K+", label: "Community Members", color: "#10b981", gradient: "from-emerald-500/20 to-green-500/20" },
  { icon: Eye, value: 100, suffix: "K+", label: "Monthly Views", color: "#f59e0b", gradient: "from-amber-500/20 to-yellow-500/20" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="relative py-16 -mt-20 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative group rounded-2xl p-6 text-center overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at center, ${stat.color}10, transparent 70%)` }}
                />
                {/* Animated border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ border: `1px solid ${stat.color}30` }}
                />

                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${stat.color}12` }}
                >
                  <Icon className="w-7 h-7 relative z-10" style={{ color: stat.color }} />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: stat.color }}
                  />
                </div>
                <p
                  className="text-3xl sm:text-4xl font-black mb-1.5 tracking-tight"
                  style={{ color: stat.color }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm font-medium" style={{ color: "rgba(148,163,184,0.8)" }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
