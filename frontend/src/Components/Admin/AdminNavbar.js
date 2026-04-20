// AdminNavbar.jsx
import React, { useEffect, useState } from "react";
import { BsJustify, BsSearch } from "react-icons/bs";

function AdminNavbar({ openSidebar, onSearchChange }) {
  const [query, setQuery] = useState("");

  // Debounced search (safe even if onSearchChange is not passed)
  useEffect(() => {
    if (!onSearchChange) return;

    const handler = setTimeout(() => {
      onSearchChange(query.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearchChange]);

  return (
    <header
      className="
        sticky top-0 z-40
        h-14
        bg-gradient-to-b from-slate-800 to-slate-900
        border-b border-slate-700
        shadow-[0_6px_18px_rgba(0,0,0,0.5)]
        flex items-center gap-4 px-6
      "
    >
      {/* Sidebar toggle */}
      <button
        onClick={openSidebar}
        className="text-slate-300 hover:text-cyan-400 transition"
        aria-label="Toggle sidebar"
      >
        <BsJustify className="text-xl" />
      </button>

      {/* Search (optional) */}
      {onSearchChange && (
        <div className="relative w-72 max-w-full ml-4">
          <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            value={query}
            placeholder="Search…"
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full
              bg-slate-800
              text-slate-200
              placeholder-slate-500
              pl-9 pr-3 py-1.5
              rounded-md
              text-sm
              outline-none
              border border-slate-700
              focus:border-cyan-500
              focus:ring-1 focus:ring-cyan-500
            "
          />
        </div>
      )}
    </header>
  );
}

export default AdminNavbar;