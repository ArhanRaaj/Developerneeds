"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Download,
  Eye,
  Calendar,
  User,
  Tag,
  ExternalLink,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { ProductWithDetails } from "@/types";
import { ProductCardSkeleton } from "@/components/shared/SkeletonLoader";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);
        } else {
          router.push("/shop");
        }
      } catch {
        router.push("/shop");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchProduct();
  }, [params.id, router]);

  const handleDownload = async () => {
    if (!session) {
      toast.error("Please login to download resources");
      router.push("/login");
      return;
    }

    setDownloading(true);
    try {
      const res = await fetch(`/api/products/${product?.id}/download`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.downloadLink) {
        window.open(data.downloadLink, "_blank");
        toast.success("Download started!");
        // Update local download count
        if (product) {
          setProduct({ ...product, downloadCount: product.downloadCount + 1 });
        }
      } else {
        toast.error(data.error || "Download failed");
      }
    } catch {
      toast.error("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-8 w-32 rounded mb-8" />
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="skeleton h-80 rounded-2xl" />
            <div className="space-y-4">
              <div className="skeleton h-6 w-20 rounded" />
              <div className="skeleton h-10 w-3/4 rounded" />
              <div className="skeleton h-24 w-full rounded" />
              <div className="skeleton h-12 w-40 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors hover:text-white"
            style={{ color: "#94a3b8" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="glass-card overflow-hidden">
              <div className="h-80 flex items-center justify-center"
                   style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(124,58,237,0.08))" }}>
                {product.images?.[activeImage] ? (
                  <img
                    src={product.images[activeImage].url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-7xl opacity-30">📦</span>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 p-4">
                  {product.images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
                        i === activeImage ? "ring-2" : "opacity-60 hover:opacity-100"
                      }`}
                      style={i === activeImage ? { ringColor: "#00d4ff" } : {}}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category */}
            <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium"
                  style={{ background: "rgba(0,212,255,0.15)", color: "#00d4ff" }}>
              {product.category.name}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold" style={{ color: "#e2e8f0" }}>
              {product.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "#64748b" }}>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> {product.views} views
              </span>
              <span className="flex items-center gap-1.5">
                <Download className="w-4 h-4" /> {product.downloadCount} downloads
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formatDate(product.createdAt)}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 p-4 rounded-xl"
                 style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                   style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}>
                {product.author.username[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
                  {product.author.username}
                </p>
                <span className="text-xs px-2 py-0.5 rounded"
                      style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff" }}>
                  {product.author.role}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: "#e2e8f0" }}>
                Description
              </h3>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#94a3b8" }}>
                {product.description}
              </p>
            </div>

            {/* Credits */}
            {product.credits && (
              <div>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "#e2e8f0" }}>
                  Credits
                </h3>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  {product.credits}
                </p>
              </div>
            )}

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-primary flex items-center gap-2 w-full justify-center text-lg disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Resource
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
