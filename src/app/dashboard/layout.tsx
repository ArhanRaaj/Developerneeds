"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Upload, 
  Settings, 
  User, 
  LogOut,
  ShieldCheck,
  Users
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = (session?.user as { role?: string })?.role || "MEMBER";

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    ...(role !== "MEMBER" ? [
      { name: "My Resources", href: "/dashboard/products", icon: Package },
      { name: "Upload Resource", href: "/dashboard/products/new", icon: Upload },
    ] : []),
    ...(["ADMIN", "COFOUNDER", "FOUNDER"].includes(role) ? [
      { name: "Admin Panel", href: "/dashboard/admin", icon: ShieldCheck },
      { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    ] : []),
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-navy-900/50 p-6 flex flex-col h-auto md:h-screen sticky top-0">
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-neon-blue to-neon-purple text-white font-bold text-xs shadow-[0_0_15px_rgba(0,212,255,0.3)]">
            DN
          </div>
          <span className="font-bold text-white tracking-wide">Dashboard</span>
        </Link>

        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-neon-blue/10 text-white border border-neon-blue/20" 
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-neon-blue" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-sm">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{session?.user?.name}</p>
              <p className="text-xs text-neon-blue">{role}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
