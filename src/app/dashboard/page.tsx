"use client";

import { useSession } from "next-auth/react";
import GlassCard from "@/components/shared/GlassCard";
import { Package, Download, Heart, Eye } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const role = (session?.user as { role?: string })?.role || "MEMBER";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {session?.user?.name}! 👋</h1>
        <p className="text-slate-400">Here's what's happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Total Downloads</h3>
            <div className="w-8 h-8 rounded-lg bg-neon-blue/10 flex items-center justify-center">
              <Download className="w-4 h-4 text-neon-blue" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">0</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm">Saved Resources</h3>
            <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-neon-purple" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">0</p>
        </GlassCard>

        {role !== "MEMBER" && (
          <>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-medium text-sm">My Products</h3>
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Package className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">0</p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-medium text-sm">Total Views</h3>
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-orange-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">0</p>
            </GlassCard>
          </>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="p-6 min-h-[300px]">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center h-40 text-slate-500">
            <p>No recent activity</p>
          </div>
        </GlassCard>

        <GlassCard className="p-6 min-h-[300px] flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <Link href="/shop" className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors text-center">
              <Package className="w-8 h-8 text-neon-blue" />
              <span className="text-sm font-medium text-white">Browse Shop</span>
            </Link>
            <Link href="/dashboard/profile" className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors text-center">
              <User className="w-8 h-8 text-neon-purple" />
              <span className="text-sm font-medium text-white">Edit Profile</span>
            </Link>
            {role !== "MEMBER" && (
              <Link href="/dashboard/products/new" className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors text-center col-span-2">
                <Upload className="w-8 h-8 text-green-400" />
                <span className="text-sm font-medium text-white">Upload New Resource</span>
              </Link>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
