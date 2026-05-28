"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/shared/GlassCard";
import { MessageCircle, Users, Zap, ShieldCheck } from "lucide-react";

export default function DiscordPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://wacczx1wb9.ufs.sh/f/kWvWLmocjl9L7mt47Ij8fYQ9bWBJ8hoyzqX42mRjMEDNtKIL"
          alt=""
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/95 to-[#020617]" />
      </div>

      <div className="absolute inset-0 bg-grid opacity-50 z-0" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-8 shadow-2xl"
               style={{ background: "#5865F2" }}>
            <MessageCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#e2e8f0" }}>
            Join our <span style={{ color: "#5865F2" }}>Discord</span>
          </h1>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#94a3b8" }}>
            Become part of the fastest-growing Minecraft developer community. Get support, share your work, and connect with other creators.
          </p>

          <a
            href="https://discord.gg/8nSn9f28Na"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: "#5865F2", boxShadow: "0 10px 25px rgba(88, 101, 242, 0.3)" }}
          >
            <MessageCircle className="w-6 h-6" />
            Join Server Now
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard className="p-6">
              <Users className="w-8 h-8 mb-4 mx-auto text-blue-400" />
              <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>Active Community</h3>
              <p className="text-sm" style={{ color: "#94a3b8" }}>Chat with thousands of other Minecraft enthusiasts.</p>
            </GlassCard>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <GlassCard className="p-6">
              <Zap className="w-8 h-8 mb-4 mx-auto text-yellow-400" />
              <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>Fast Support</h3>
              <p className="text-sm" style={{ color: "#94a3b8" }}>Get direct help from resource creators and staff.</p>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <GlassCard className="p-6">
              <ShieldCheck className="w-8 h-8 mb-4 mx-auto text-green-400" />
              <h3 className="font-semibold mb-2" style={{ color: "#e2e8f0" }}>Secure Trading</h3>
              <p className="text-sm" style={{ color: "#94a3b8" }}>Verified developers and safe transaction monitoring.</p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
