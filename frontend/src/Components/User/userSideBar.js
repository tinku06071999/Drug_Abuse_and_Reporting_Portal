import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdAssessment, MdAlarm, MdAssignment } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-slate-800 text-cyan-400"
      : "text-slate-300";

  return (
    <aside className="w-64 h-screen bg-slate-950 border-r border-slate-800
                      flex flex-col overflow-hidden">

      {/* Header: fixed height */}
      <div className="px-6 py-5 shrink-0">
        <h2 className="text-xl font-bold tracking-wide text-slate-200">
          Dashboard
        </h2>
      </div>

      {/* Navigation: flexible, no overflow */}
      <nav className="flex-1 px-3 space-y-1 overflow-hidden">
        <SidebarItem
          to="/user/anxiety-test-dashboard"
          icon={<MdAssessment />}
          label="Anxiety Test"
          active={isActive("/user/anxiety")}
        />
        <SidebarItem
          to="/user/quiz"
          icon={<MdAlarm />}
          label="Daily Wellness Quiz"
          active={isActive("/user/quiz")}
        />
        <SidebarItem
          to="/user/quiz-reports"
          icon={<MdAssignment />}
          label="Reports & Analytics"
          active={isActive("/user/quiz-reports")}
        />
      </nav>

      {/* Book Session: pinned bottom */}
      <div className="px-4 py-4 border-t border-slate-800 shrink-0">
        <Link
          to="/user/book-session"
          className="flex items-center justify-center gap-2 w-full px-4 py-2
                     rounded-lg bg-cyan-600 hover:bg-cyan-700
                     text-white font-semibold transition"
        >
          <FaUserMd />
          Book Session
        </Link>
      </div>
    </aside>
  );
}

/* ---------------------------
   Sidebar Item
---------------------------- */
function SidebarItem({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${active}
        hover:bg-slate-800 hover:text-cyan-400`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}