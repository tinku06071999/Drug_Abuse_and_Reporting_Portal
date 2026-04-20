
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";
import AdminHome from "./AdminHome";
import TotalReports from "./TotalReports";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showTotalReports, setShowTotalReports] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/adminlogin", { replace: true });
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        OpenSidebarToggle={isSidebarOpen}
        openSidebar={() => setIsSidebarOpen(false)}
        toggleTotalReports={() => setShowTotalReports(true)}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-6">
          {showTotalReports ? <TotalReports /> : <AdminHome />}
        </div>

      </div>
    </div>
  );
}