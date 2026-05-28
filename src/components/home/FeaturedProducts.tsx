"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Eye, TrendingUp } from "lucide-react";

const featuredItems = [
  {
    id: "1",
    title: "Advanced Economy Plugin",
    category: "Plugins",
    downloads: 1250,
    views: 5400,
    badgeColor: "#00d4ff",
    image: "🔌",
    tag: "Popular",
  },
  {
    id: "2",
    title: "Medieval Castle Map",
    category: "Maps",
    downloads: 890,
    views: 3200,
    badgeColor: "#f43f5e",
    image: "🏰",
    tag: "New",
  },
  {
    id: "3",
    title: "Full Server Setup Pack",
    category: "Setups",
    downloads: 2100,
    views: 8900,
    badgeColor: "#10b981",
    image: "⚙️",
    tag: "Best Seller",
  },
  {
    id: "4",
    title: "Custom Discord Bot Config",
    category: "DC Stuff",
    downloads: 670,
    views: 2100,
    badgeColor: "#818cf8",
    image: "🤖",
    tag: "Featured",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Section Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wacczx1wb9.ufs.sh/f/kWvWLmocjl9LQRZDGWLWKoTHGRj45tCFSObZf96kxNlhVdPm"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #020617 0%, rgba(2,6,23,0.5) 30%, rgba(2,6,23,0.5) 70%, #020617 100%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #00d4ff, transparent)" }} />
              <span
                className="text-sm font-bold tracking-[0.2em] uppercase"
                style={{ color: "#00d4ff" }}
              >
                Featured
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: "#f1f5f9" }}>
              Popular{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Resources
              </span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 group hover:scale-105"
              style={{
                color: "#00d4ff",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
            >
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `radial-gradient(ellipse at top, ${item.badgeColor}08, transparent 60%)`,
                  border: `1px solid ${item.badgeColor}25`,
                  borderRadius: "1rem",
                }}
              />

              {/* Image area */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${item.badgeColor}08, rgba(124,58,237,0.05))`,
                }}
              >
                <motion.span
                  className="text-6xl select-none relative z-10"
                  style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))" }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.image}
                </motion.span>

                {/* Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                    style={{
                      background: `${item.badgeColor}20`,
                      color: item.badgeColor,
                      border: `1px solid ${item.badgeColor}30`,
                    }}
                  >
                    <TrendingUp className="w-3 h-3" />
                    {item.tag}
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      color: "#e2e8f0",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[rgba(2,6,23,0.8)] to-transparent" />
              </div>

              {/* Info */}
              <div className="p-5 relative z-10">
                <h3
                  className="font-bold mb-3 text-base group-hover:text-white transition-colors"
                  style={{ color: "#e2e8f0" }}
                >
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs" style={{ color: "#64748b" }}>
                    <span className="flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" /> {item.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> {item.views.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href="/shop"
                    className="text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `${item.badgeColor}15`,
                      color: item.badgeColor,
                      border: `1px solid ${item.badgeColor}20`,
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-10 text-center">
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2 text-base">
            View All Resources <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
