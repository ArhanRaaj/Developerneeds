"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "@/components/shared/GlassCard";
import { toast } from "sonner";
import { Upload, X, Plus } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    downloadLink: "",
    credits: "",
  });

  const categories = [
    { id: "cm01", name: "Plugins", slug: "plugins" },
    { id: "cm02", name: "Websites", slug: "websites" },
    { id: "cm03", name: "Setups", slug: "setups" },
    { id: "cm04", name: "Maps", slug: "maps" },
    { id: "cm05", name: "Scripts", slug: "scripts" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Sending dummy category ID for demo since db isn't seeded with real categories
          // In real prod, categoryId should map to real db records.
          categoryId: "test-category-id" 
        }),
      });

      if (!res.ok) {
        toast.error("Failed to upload product. Check category ID in database.");
      } else {
        toast.success("Product uploaded successfully!");
        router.push("/dashboard/products");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Upload Resource</h1>
        <p className="text-slate-400">Share your creation with the community.</p>
      </div>

      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none"
                placeholder="e.g. Advanced Economy Plugin"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Category <span className="text-red-400">*</span></label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none appearance-none"
              >
                <option value="" disabled className="bg-navy-900">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-navy-900">{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description <span className="text-red-400">*</span></label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none resize-none"
              placeholder="Describe your resource in detail..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Download Link (Google Drive, MediaFire, etc.) <span className="text-red-400">*</span></label>
            <input
              type="url"
              required
              value={formData.downloadLink}
              onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none"
              placeholder="https://"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Credits (Optional)</label>
            <input
              type="text"
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none"
              placeholder="Original author, dependencies, etc."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Images (Optional)</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-neon-blue/50 transition-colors bg-white/5">
              <Upload className="w-8 h-8 text-slate-400 mb-3" />
              <p className="text-sm text-slate-300 font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              {/* Note: UploadThing integration would go here */}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Uploading..." : "Publish Resource"}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
