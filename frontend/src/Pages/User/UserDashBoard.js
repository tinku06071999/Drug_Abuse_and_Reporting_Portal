import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSideBar from "./userSideBar";
import { FaRegClock, FaRunning, FaBed, FaGlassCheers } from "react-icons/fa";
import { getUserName, getUserReports } from "../../api/userApi";

export default function UserDashboard() {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [weekday, setWeekday] = useState("");
  const [meditationTotal, setMeditationTotal] = useState(0);
  const [exerciseTotal, setExerciseTotal] = useState(0);
  const [sleepTotal, setSleepTotal] = useState(0);
  const [soberTotal, setSoberTotal] = useState("No");

  useEffect(() => {
    // Read token from localStorage (primary) or Cookies (fallback)
    const t = localStorage.getItem("token") || Cookies.get("token");
    if (t) setToken(t);

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    setWeekday(days[new Date().getDay()]);
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await getUserName(); // GET /api/getUserName
        if (response.status === 200) {
          setUserName(response.data.name);
        } else {
          console.error("Failed to fetch user name");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

//    if (token) {
      fetchUserName();
//    }
  }, []);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await getUserReports(); // GET /api/user-reports
        const data = Array.isArray(response.data) ? response.data : [];

        const meditation = data
          .filter((q) => q.category === "Meditation")
          .reduce((total, q) => total + (parseInt(q.value, 10) || 0), 0);

        const exercise = data
          .filter((q) => q.category === "Exercise")
          .reduce((total, q) => total + (parseInt(q.value, 10) || 0), 0);

        const sleep = data
          .filter((q) => q.category === "Sleep")
          .reduce((total, q) => total + (parseInt(q.value, 10) || 0), 0);

        const soberYes = data.some((q) => q.category === "Sober" && String(q.value) === "1");
        const sober = soberYes ? "Yes" : "No";

        setMeditationTotal(meditation);
        setExerciseTotal(exercise);
        setSleepTotal(sleep);
        setSoberTotal(sober);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    if (token) {
      fetchQuizData();
    }
  }, [token]);

  return (
    <>
      {token ? (
        <div className="flex flex-col md:flex-row h-screen bg-gradient-to-tr">
          <UserSideBar />
          <div className="flex flex-col justify-center items-center p-8 w-full md:w-1/2">
           
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-700">
              Hello,{" "}
              <span
                className={`text-${
                  userName.length > 10 ? "4xl md:text-5xl" : "4xl md:text-6xl"
                } text-teal-500`}
              >
                {userName}
              </span>
            </h1>
            <h2 className="text-3xl md:text-5xl text-center mb-8 text-gray-700">
              Happy{" "}
              <span className="text-4xl md:text-6xl text-indigo-400">
                {weekday}
              </span>
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center p-8 w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-700">
          Result of last quiz
        </h1>
        <div className="flex justify-center items-center flex-wrap">
        <div className="bg-red-700 text-white p-6 rounded-lg shadow-md mb-4 mr-4">
          <FaRegClock className="text-4xl mb-2" />
          <h2 className="text-2xl font-semibold mb-2">Meditation Total</h2>
          <p className="text-lg">Total Minutes: {meditationTotal}</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md mb-4 mr-4">
          <FaRunning className="text-4xl mb-2" />
          <h2 className="text-2xl font-semibold mb-2">Exercise Total</h2>
          <p className="text-lg">Total Minutes: {exerciseTotal}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md mb-4 mr-4">
          <FaBed className="text-4xl mb-2" />
          <h2 className="text-2xl font-semibold mb-2">Sleep Total</h2>
          <p className="text-lg">Total Hours: {sleepTotal}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md mb-4">
          <FaGlassCheers className="text-4xl mb-2" />
          <h2 className="text-2xl font-semibold mb-2">Sober</h2>
          <p className="text-lg">Is Sober: {soberTotal}</p>
        </div>
      </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-teal-50 to-teal-200">
          <h1 className="text-3xl md:text-5xl mb-8 font-semibold text-gray-700">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-700">
            Please login to access this page
          </p>
          <Link
            to="/userLogin"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg md:text-xl shadow-md transition duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}

