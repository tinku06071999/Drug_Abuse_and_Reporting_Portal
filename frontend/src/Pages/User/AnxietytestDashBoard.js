import React from "react";
import { Link } from "react-router-dom";

function AnxietytestDashBoard() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center">
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg text-center mt-32">
        <h1 className="text-3xl font-semibold text-white mb-4">
          Take the Anxiety Test
        </h1>
        <p className="text-white mb-6">
          Welcome to the Anxiety Test. This test will help you understand your
          anxiety levels.
        </p>
        <div className="flex flex-col items-center justify-center  mt-8 ">
          <Link
            to="/anxietyquiz"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg m-2 w-1/5"
          >
            Get Started
          </Link>
          <Link
            to="/anxietyReport"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2  rounded-lg w-1/5"
          >
            See Reports
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnxietytestDashBoard;