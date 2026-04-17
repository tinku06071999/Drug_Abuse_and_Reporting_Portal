import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSideBar from "./userSideBar";
import {
  FaRegClock,
  FaRunning,
  FaBed,
  FaGlassCheers,
} from "react-icons/fa";
import { getUserName } from "../../api/userApi";
import { getQuizResults } from "../../api/userQuizApi";
import { getUserAllResult } from "../../api/anxietyTestApi";

export default function UserDashboard() {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [weekday, setWeekday] = useState("");

  // Wellness totals
  const [meditationTotal, setMeditationTotal] = useState(0);
  const [exerciseTotal, setExerciseTotal] = useState(0);
  const [sleepTotal, setSleepTotal] = useState(0);
  const [soberDays, setSoberDays] = useState(0);

  // Anxiety insight
  const [anxietyScore, setAnxietyScore] = useState(null);
  const [anxietyLevel, setAnxietyLevel] = useState("");

  /* ---------------------------
     Init
  ---------------------------- */
  useEffect(() => {
    const t = localStorage.getItem("token") || Cookies.get("token");
    if (t) setToken(t);

    const days = [
      "Sunday","Monday","Tuesday","Wednesday",
      "Thursday","Friday","Saturday",
    ];
    setWeekday(days[new Date().getDay()]);
  }, []);

  /* ---------------------------
     Fetch username
  ---------------------------- */
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await getUserName();
        if (res.status === 200) {
          setUserName(res.data);
        }
      } catch (err) {
        console.error("Error fetching username", err);
      }
    };
    fetchUserName();
  }, []);

  /* ---------------------------
     Fetch wellness quiz totals
  ---------------------------- */
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await getQuizResults();
        const quizzes = Array.isArray(res.data) ? res.data : [];

        const meditation = quizzes.reduce(
          (sum, q) => sum + (q.meditationMinutes || 0), 0
        );
        const exercise = quizzes.reduce(
          (sum, q) => sum + (q.exerciseMinutes || 0), 0
        );
        const sleep = quizzes.reduce(
          (sum, q) => sum + (q.sleepHours || 0), 0
        );
        const soberCount = quizzes.filter(q => q.sober === "Yes").length;

        setMeditationTotal(meditation);
        setExerciseTotal(exercise);
        setSleepTotal(sleep);
        setSoberDays(soberCount);
      } catch (err) {
        console.error("Error fetching wellness quiz data", err);
      }
    };

    if (token) fetchQuizData();
  }, [token]);

  /* ---------------------------
     Fetch latest anxiety insight
  ---------------------------- */
  useEffect(() => {
    const fetchAnxietyInsight = async () => {
      try {
        const res = await getUserAllResult();
        const list = Array.isArray(res.data) ? res.data : [];

        if (list.length > 0) {
          const latest = list[list.length - 1];
          setAnxietyScore(latest.score);
          setAnxietyLevel(latest.level);
        }
      } catch (err) {
        console.error("Error fetching anxiety data", err);
      }
    };

    if (token) fetchAnxietyInsight();
  }, [token]);

  /* ---------------------------
     Helper
  ---------------------------- */
  const getAnxietyMessage = (score) => {
    if (score === null) return "No anxiety assessment taken yet.";
    if (score < 22)
      return "Your anxiety levels are low. Continue healthy habits and self‑care.";
    if (score < 36)
      return "Moderate anxiety detected. Breathing exercises, rest, and daily balance may help.";
    return "High anxiety detected. Consider seeking professional mental‑health support.";
  };

  /* ---------------------------
     Logged‑out state
  ---------------------------- */
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-200">
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>
        <p className="mb-6">Please login to access your dashboard.</p>
        <Link
          to="/user-login"
          className="px-6 py-2 bg-cyan-600 rounded-lg text-white"
        >
          Login
        </Link>
      </div>
    );
  }

  /* ---------------------------
     Dashboard UI
  ---------------------------- */
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <UserSideBar />

      <div className="flex-1 p-8 text-slate-200">
        {/* Greeting */}
        <h1 className="text-4xl font-bold mb-2">
          Hello, <span className="text-cyan-400">{userName}</span>
        </h1>
        <h2 className="text-xl text-slate-400 mb-8">
          Happy {weekday}
        </h2>

        {/* Wellness Summary */}
        <h3 className="text-lg font-semibold mb-4">
          Wellness Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            icon={<FaRegClock />}
            label="Meditation (min)"
            value={meditationTotal}
            color="cyan"
          />
          <StatCard
            icon={<FaRunning />}
            label="Exercise (min)"
            value={exerciseTotal}
            color="green"
          />
          <StatCard
            icon={<FaBed />}
            label="Sleep (hrs)"
            value={sleepTotal}
            color="indigo"
          />
          <StatCard
            icon={<FaGlassCheers />}
            label="Sober Days"
            value={soberDays}
            color="amber"
          />
        </div>

        {/* Anxiety Insights */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">
            Anxiety Insights
          </h3>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg max-w-xl">
            {anxietyScore !== null ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 uppercase tracking-wide text-sm">
                    Latest Score
                  </span>
                  <span
                    className={`text-xl font-bold ${
                      anxietyScore < 22
                        ? "text-emerald-400"
                        : anxietyScore < 36
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {anxietyScore}
                  </span>
                </div>

                <div
                  className={`text-sm font-semibold mb-2 ${
                    anxietyScore < 22
                      ? "text-emerald-400"
                      : anxietyScore < 36
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {anxietyLevel}
                </div>

                <p className="text-slate-300 text-sm mb-4">
                  {getAnxietyMessage(anxietyScore)}
                </p>

                <div className="flex gap-3">
                  <Link
                    to="/user/anxiety-report"
                    className="px-4 py-2 rounded-md bg-cyan-600 text-white text-sm"
                  >
                    View Trends
                  </Link>
                  <Link
                    to="/user/anxiety-quiz"
                    className="px-4 py-2 rounded-md bg-slate-700 text-slate-200 text-sm"
                  >
                    Take Test Again
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-slate-300 mb-4">
                  You haven’t completed an anxiety assessment yet.
                </p>
                <Link
                  to="/user/anxiety-quiz"
                  className="px-4 py-2 rounded-md bg-cyan-600 text-white text-sm"
                >
                  Take Anxiety Quiz
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   Reusable stat card
---------------------------- */
function StatCard({ icon, label, value, color }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-green-400",
    indigo: "text-indigo-400",
    amber: "text-amber-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <div className={`text-2xl mb-3 ${colors[color]}`}>{icon}</div>
      <div className="text-sm uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className={`text-3xl font-bold mt-1 ${colors[color]}`}>
        {value}
      </div>
    </div>
  );
}