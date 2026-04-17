import React from "react";
import { BsJustify, BsSearch } from "react-icons/bs";

function AdminNavbar({ openSidebar }) {
  return (
    <header
      className="
        sticky top-0 z-40
        h-14
        bg-gradient-to-b from-slate-800 to-slate-900
        border-b border-slate-700
        shadow-[0_6px_18px_rgba(0,0,0,0.5)]
        flex items-center px-6
      "
    >
      {/* Sidebar toggle */}
      <button
        onClick={openSidebar}
        className="text-slate-300 hover:text-cyan-400 transition"
      >
        <BsJustify className="text-xl" />
      </button>

      {/* Search icon placeholder (future-ready) */}
      <div className="ml-auto text-slate-400">
        <BsSearch className="text-lg" />
      </div>
    </header>
  );
}

export default AdminNavbar;