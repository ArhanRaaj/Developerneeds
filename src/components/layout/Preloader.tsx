"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/hooks/use-store";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const setPreloaderDone = useAppStore((s) => s.setPreloaderDone);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setPreloaderDone(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setPreloaderDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-950"
          style={{ background: "#020617" }}
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <div className="w-full h-full rounded-lg border-2 border-neon-blue bg-gradient-to-br from-neon-blue/20 to-neon-purple/20"
                   style={{ borderColor: "#00d4ff", background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))" }} />
            </motion.div>
            <motion.h1
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl font-bold gradient-text"
            >
              Developers Needs
            </motion.h1>
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="text-sm mt-2"
              style={{ color: "#64748b" }}
            >
              Loading marketplace...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
