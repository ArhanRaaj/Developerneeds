"use client";

import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "@/components/shared/SkeletonLoader";
import type { ProductWithDetails } from "@/types";

interface ProductGridProps {
  products: ProductWithDetails[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">📦</p>
        <h3 className="text-xl font-semibold mb-2" style={{ color: "#e2e8f0" }}>
          No resources found
        </h3>
        <p className="text-sm" style={{ color: "#64748b" }}>
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
