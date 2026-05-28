"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/hooks/use-store";
import {
  Menu,
  X,
  Home,
  Info,
  ShoppingBag,
  MessageCircle,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/discord", label: "Discord", icon: MessageCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
    setDropdownOpen(false);
  }, [pathname, setSidebarOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-950/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        style={scrolled ? { background: "rgba(2,6,23,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg"
                   style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", boxShadow: "0 0 20px rgba(0,212,255,0.2)" }}>
                <span className="text-white font-bold text-lg">DN</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">
                <span className="gradient-text">Developers</span>{" "}
                <span style={{ color: "#e2e8f0" }}>Needs</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
              {session && (
                <Link
                  href="/dashboard"
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    pathname.startsWith("/dashboard")
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {pathname.startsWith("/dashboard") && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">Dashboard</span>
                </Link>
              )}
            </div>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center gap-3">
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/5"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                         style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}>
                      {session.user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-sm font-medium text-slate-300">{session.user.name}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-2xl"
                        style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <div className="p-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                          <p className="text-sm font-medium text-white">{session.user.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{session.user.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium"
                                style={{ background: "rgba(0,212,255,0.15)", color: "#00d4ff" }}>
                            {(session.user as { role?: string }).role ?? "MEMBER"}
                          </span>
                        </div>
                        <div className="p-1">
                          <Link href="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5" style={{ color: "#94a3b8" }}>
                            <User className="w-4 h-4" /> Profile
                          </Link>
                          <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5" style={{ color: "#94a3b8" }}>
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                          </Link>
                          <button
                            onClick={() => signOut()}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full text-left transition-colors hover:bg-white/5"
                            style={{ color: "#f87171" }}
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/5" style={{ color: "#94a3b8" }}>
                    Login
                  </Link>
                  <Link href="/signup" className="btn-primary !py-2 !px-5 text-sm !rounded-xl">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl transition-colors hover:bg-white/5"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-slate-300" />
              ) : (
                <Menu className="w-6 h-6 text-slate-300" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 lg:hidden overflow-y-auto"
              style={{ background: "#0a1128", borderLeft: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold gradient-text">Menu</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-white/5">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                        style={isActive ? { background: "rgba(0,212,255,0.1)" } : {}}
                      >
                        <Icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    );
                  })}
                  {session && (
                    <Link
                      href="/dashboard"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        pathname.startsWith("/dashboard")
                          ? "text-white"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                      style={pathname.startsWith("/dashboard") ? { background: "rgba(0,212,255,0.1)" } : {}}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>
                  )}
                </div>

                <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {session ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                             style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}>
                          {session.user.name?.[0]?.toUpperCase() ?? "U"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{session.user.name}</p>
                          <span className="text-xs" style={{ color: "#00d4ff" }}>
                            {(session.user as { role?: string }).role ?? "MEMBER"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all hover:bg-white/5"
                        style={{ color: "#f87171" }}
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                        <LogIn className="w-5 h-5" /> Login
                      </Link>
                      <Link href="/signup" className="btn-primary text-center block !py-3 text-sm">
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
