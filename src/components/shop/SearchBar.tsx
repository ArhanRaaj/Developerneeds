"use client";

import { useAppStore } from "@/hooks/use-store";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppStore();

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#64748b" }} />
      <input
        type="text"
        placeholder="Search resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-10 py-3 rounded-xl text-sm font-medium"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#e2e8f0",
        }}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" style={{ color: "#64748b" }} />
        </button>
      )}
    </div>
  );
}
