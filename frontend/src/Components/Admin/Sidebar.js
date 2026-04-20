//import React from 'react';
//import { Link } from 'react-router-dom';
//import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsStack } from 'react-icons/bs';
//
//function Sidebar({ OpenSidebarToggle, openSidebar, toggleTotalReports }){
//  return (
//    <aside id="sidebar" className={OpenSidebarToggle ? 'sidebar-responsive' : ''}>
//    <div className='sidebar-title'>
//        <div className='sidebar-brand'>
//          <BsStack className='icon_header' /> Features
//        </div>
//        <span className='icon close_icon' onClick={openSidebar}>
//          X
//        </span>
//      </div>
//
//      <ul className='sidebar-list'>
//        <li className='sidebar-list-item'>
//          <Link to='/admin/totalreports' onClick={() => toggleTotalReports()}>
//            <BsFillArchiveFill className='icon' /> Total Reports
//          </Link>
//        </li>
//
//
//        <li className='sidebar-list-item'>
//          <Link to='/admin/registeredemployees' onClick={openSidebar}>
//            <BsListCheck className='icon' /> Total Registered Employee
//          </Link>
//        </li>
//        <li className='sidebar-list-item'>
//          <Link to='/admin/studentSupportDetails' onClick={openSidebar}>
//            <BsListCheck className='icon' /> Student Support Details
//          </Link>
//        </li>
//
//
//      </ul>
//    </aside>
//  );
//}
//
//export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsListCheck,
  BsStack,
} from "react-icons/bs";

function Sidebar({ OpenSidebarToggle, openSidebar, toggleTotalReports }) {
  return (
    <aside
      className={`
        fixed md:static
        top-0 left-0
        h-screen w-64
        bg-slate-950
        border-r border-slate-800
        z-50
        transition-transform duration-300
        ${OpenSidebarToggle ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Sidebar Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-200 font-semibold">
          <BsStack />
          Admin Panel
        </div>
        <button
          onClick={openSidebar}
          className="md:hidden text-slate-400 hover:text-red-400"
        >
          ✕
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1 text-sm">
        <SidebarItem
          to="/admin/totalreports"
          icon={<BsFillArchiveFill />}
          label="Total Reports"
          onClick={toggleTotalReports}
        />

        <SidebarItem
          to="/admin/registeredemployees"
          icon={<BsListCheck />}
          label="Registered Employees"
          onClick={openSidebar}
        />

        <SidebarItem
          to="/admin/studentSupportDetails"
          icon={<BsListCheck />}
          label="Student Support Details"
          onClick={openSidebar}
        />
      </nav>
    </aside>
  );
}

export default Sidebar;

/* ------------------------------
   Sidebar Item (Reusable)
------------------------------ */
function SidebarItem({ to, icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="
        flex items-center gap-3
        px-4 py-2
        rounded-lg
        text-slate-300
        hover:bg-slate-800 hover:text-cyan-400
        transition
      "
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
}