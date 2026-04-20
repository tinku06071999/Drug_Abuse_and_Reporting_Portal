import React from "react";
import { Link } from "react-router-dom";
import { MdAssessment, MdAlarm, MdAssignment } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="sidebar bg-gray-900 text-white w-64 py-6 px-4 flex flex-col items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <Link
            to="/anxietytestdashboard"
            className="sidebar-item flex items-center transition duration-300 hover:bg-gray-800 hover:text-teal-400 rounded-full px-4 py-2"
          >
            <MdAssessment className="mr-2" />
            Anxiety Test
          </Link>
          <Link
            to="/userQuiz"
            className="sidebar-item flex items-center transition duration-300 hover:bg-gray-800 hover:text-teal-400 rounded-full px-4 py-2"
          >
            <MdAlarm className="mr-2" />
            Daily Wellness Quiz
          </Link>
          <Link
            to="/userReports"
            className="sidebar-item flex items-center transition duration-300 hover:bg-gray-800 hover:text-teal-400 rounded-full px-4 py-2"
          >
            <MdAssignment className="mr-2" />
            Get Reports
          </Link>
          <div>
        <Link
          to="/booksession"
          className="btn-primary flex items-center justify-center transition duration-300 hover:bg-teal-400 hover:text-gray-900 rounded-full px-4 py-2"
        >
          <FaUserMd className="mr-2" />
          Book a Session with Us
        </Link>
      </div>
        </nav>
      </div>
      
    </div>
  );
}
