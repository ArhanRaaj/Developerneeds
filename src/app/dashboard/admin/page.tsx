"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import { Users, Package, Eye, Download, ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) setStats(await res.json());
      } catch (error) {
        console.error("Failed to load stats");
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-neon-blue" />
          Admin Dashboard
        </h1>
        <p className="text-slate-400">Platform overview and statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 border-t-4 border-t-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Total Users</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.totalUsers || 0}</p>
        </GlassCard>

        <GlassCard className="p-6 border-t-4 border-t-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Total Products</h3>
            <Package className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.totalProducts || 0}</p>
        </GlassCard>

        <GlassCard className="p-6 border-t-4 border-t-purple-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Total Downloads</h3>
            <Download className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.totalDownloads || 0}</p>
        </GlassCard>

        <GlassCard className="p-6 border-t-4 border-t-orange-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Total Views</h3>
            <Eye className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats?.totalViews || 0}</p>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
         <GlassCard className="p-6 min-h-[400px]">
           <h2 className="text-xl font-bold text-white mb-6">Recent Users</h2>
           <div className="text-slate-500 text-sm text-center py-20">Coming soon</div>
         </GlassCard>
         <GlassCard className="p-6 min-h-[400px]">
           <h2 className="text-xl font-bold text-white mb-6">System Logs</h2>
           <div className="text-slate-500 text-sm text-center py-20">Coming soon</div>
         </GlassCard>
      </div>
    </div>
  );
}
