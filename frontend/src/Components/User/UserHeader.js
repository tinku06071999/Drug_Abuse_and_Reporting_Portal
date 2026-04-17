import React, { useState } from "react";
import { Link } from "react-router-dom";
import nithLogo from "../../Images/nith_logo.png";

const UserHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isUserLoggedIn");
    sessionStorage.clear();
    document.cookie = "token=; Max-Age=0; path=/";
    window.location.href = "/user-login";
  };

  return (
    <header
      className="
        sticky top-0 z-50
        bg-gradient-to-b from-slate-800 to-slate-900
        border-b border-slate-700
        shadow-[0_8px_24px_rgba(0,0,0,0.45)]
      "
    >
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* Branding */}
        <div className="flex items-center gap-3">
          <img
            src={nithLogo}
            alt="NITH Logo"
            className="h-10 w-10 rounded-md shadow-sm"
          />
          <div className="leading-tight">
            <h1 className="text-sm font-semibold text-slate-100 tracking-wide">
              National Institute of Technology Hamirpur
            </h1>
            <p className="text-xs text-slate-400">
              Drug Abuse Reporting &amp; Prevention
            </p>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link
            to="/user/dashboard"
            className="hover:text-cyan-400 transition"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="
              px-4 py-1.5 rounded-md
              bg-slate-700/70
              hover:bg-slate-600
              text-slate-100
              shadow-inner
              transition
            "
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="
          md:hidden
          bg-slate-900
          border-t border-slate-700
          shadow-[0_12px_24px_rgba(0,0,0,0.6)]
        ">
          <div className="px-6 py-4 space-y-3 text-sm">
            <Link
              to="/user/dashboard"
              className="block text-slate-300 hover:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left text-slate-300 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;