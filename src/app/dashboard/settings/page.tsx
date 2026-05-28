"use client";

import GlassCard from "@/components/shared/GlassCard";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences.</p>
      </div>
      <GlassCard className="p-8 min-h-[400px] flex items-center justify-center">
        <p className="text-slate-500">Account settings coming soon.</p>
      </GlassCard>
    </div>
  );
}
