//import React, { useState,useEffect } from 'react';
//import { useNavigate } from "react-router-dom";
//import AdminHeader from "./AdminHeader";
//import AdminHome from "./AdminHome";
//import Sidebar from "./Sidebar";
//import AdminNavbar from "./AdminNavbar";
//import TotalReports from './TotalReports'; // Import the new component
//
//function AdminDashboard() {
//    const navigate = useNavigate();
//
//useEffect(() => {
//    const token = localStorage.getItem("token");
//    if (!token) {
//      navigate("/adminlogin", { replace: true });
//    }
//  }, [navigate]);
//
//    const [isSidebarOpen, setSidebarOpen] = useState(false);
//    const openSidebar = () => {
//        setSidebarOpen(true);
//         };
//    const closeSidebar = () => {
//            setSidebarOpen(false);
//          };
//
//    const [showTotalReports, setShowTotalReports] = useState(false); // Add state for Total Reports
//
//    const toggleTotalReports = () => {
//      setShowTotalReports(!showTotalReports);
//      closeSidebar();
//    };
//
//    return (
//      <div className="admin-dashboard mb-10">
//        <div style={{ display: "flex" }} className='dashboard'>
//
//          <Sidebar OpenSidebarToggle={isSidebarOpen} openSidebar={closeSidebar} toggleTotalReports={toggleTotalReports} />
//
//          {showTotalReports ? <TotalReports /> : <AdminHome />}
//
//        </div>
//      </div>
//  );
//}
//
//export default AdminDashboard;

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