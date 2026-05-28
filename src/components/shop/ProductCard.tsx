"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Eye, User } from "lucide-react";
import type { ProductWithDetails } from "@/types";

interface ProductCardProps {
  product: ProductWithDetails;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const categoryBadge: Record<string, string> = {
    plugins: "badge-plugins",
    websites: "badge-websites",
    setups: "badge-setups",
    models: "badge-models",
    maps: "badge-maps",
    configs: "badge-configs",
    scripts: "badge-scripts",
    "dc-stuff": "badge-dc-stuff",
    ptero: "badge-ptero",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      <Link href={`/shop/${product.id}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden"
             style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(124,58,237,0.08))" }}>
          {product.images?.[0] ? (
            <img
              src={product.images[0].url}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
              📦
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${categoryBadge[product.category.slug] ?? "badge-plugins"}`}>
              {product.category.name}
            </span>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24" }}>
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold mb-2 truncate transition-colors group-hover:text-white" style={{ color: "#e2e8f0" }}>
            {product.title}
          </h3>
          <p className="text-sm mb-4 line-clamp-2" style={{ color: "#94a3b8" }}>
            {product.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                   style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}>
                {product.author.username[0]?.toUpperCase()}
              </div>
              <span className="text-xs" style={{ color: "#64748b" }}>
                {product.author.username}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: "#64748b" }}>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" /> {product.downloadCount}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" /> {product.views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
