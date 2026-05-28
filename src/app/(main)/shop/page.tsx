"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/hooks/use-store";
import SearchBar from "@/components/shop/SearchBar";
import CategoryFilter from "@/components/shop/CategoryFilter";
import ProductGrid from "@/components/shop/ProductGrid";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import type { ProductWithDetails } from "@/types";

export default function ShopPage() {
  const { searchQuery, selectedCategory, sortBy, setSortBy } = useAppStore();
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        sort: sortBy,
      });
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pt-24 pb-20 relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://wacczx1wb9.ufs.sh/f/kWvWLmocjl9L7mt47Ij8fYQ9bWBJ8hoyzqX42mRjMEDNtKIL"
          alt=""
          className="w-full h-[120%] object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/95 to-[#020617]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "#e2e8f0" }}>
            Resource <span className="gradient-text">Shop</span>
          </h1>
          <p className="text-lg" style={{ color: "#94a3b8" }}>
            Browse and download premium Minecraft resources
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8"
        >
          <SearchBar />
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4" style={{ color: "#64748b" }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Downloaded</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <CategoryFilter />
        </motion.div>

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-xl transition-all disabled:opacity-30"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                  page === i + 1 ? "text-white" : ""
                }`}
                style={
                  page === i + 1
                    ? { background: "rgba(0,212,255,0.2)", border: "1px solid rgba(0,212,255,0.3)" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }
                }
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-xl transition-all disabled:opacity-30"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
