"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/hooks/use-store";

const categories = [
  { slug: "all", name: "All", icon: "🎮" },
  { slug: "plugins", name: "Plugins", icon: "🔌" },
  { slug: "websites", name: "Websites", icon: "🌐" },
  { slug: "setups", name: "Setups", icon: "⚙️" },
  { slug: "models", name: "Models", icon: "🎨" },
  { slug: "maps", name: "Maps", icon: "🗺️" },
  { slug: "configs", name: "Configs", icon: "📋" },
  { slug: "scripts", name: "Scripts", icon: "📜" },
  { slug: "dc-stuff", name: "DC Stuff", icon: "🤖" },
  { slug: "ptero", name: "Ptero", icon: "🦕" },
];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useAppStore();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              isActive ? "text-white" : "text-slate-400 hover:text-white"
            }`}
            style={
              isActive
                ? { background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)" }
                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }
            }
          >
            <span>{cat.icon}</span>
            {cat.name}
            {isActive && (
              <motion.div
                layoutId="category-active"
                className="absolute inset-0 rounded-xl -z-10"
                style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
