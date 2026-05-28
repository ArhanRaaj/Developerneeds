"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GlassCard from "@/components/shared/GlassCard";
import { Package, Plus, Download, Eye, ExternalLink } from "lucide-react";

export default function MyProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch products authored by the current user
    // For now we'll just fetch all or mock empty
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Resources</h1>
          <p className="text-slate-400">Manage the products you've uploaded to the marketplace.</p>
        </div>
        <Link href="/dashboard/products/new" className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap">
          <Plus className="w-4 h-4" /> Upload Resource
        </Link>
      </div>

      <GlassCard className="p-0 overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="p-10 text-center text-slate-400">Loading resources...</div>
        ) : products.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-center">
            <Package className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No resources yet</h3>
            <p className="text-slate-400 max-w-sm mb-6">You haven't uploaded any resources to the marketplace yet. Share your creations with the community!</p>
            <Link href="/dashboard/products/new" className="btn-primary">
              Upload Your First Resource
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Resource</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Stats</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                          {product.category?.name === 'Plugins' ? '🔌' : '📦'}
                        </div>
                        <div>
                          <p className="font-medium text-white">{product.title}</p>
                          <span className="text-xs text-neon-blue">{product.category?.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.status === 'APPROVED' ? 'bg-green-500/10 text-green-500' :
                        product.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {product.downloadCount}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {product.views}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/shop/${product.id}`} target="_blank" className="p-2 inline-block bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
