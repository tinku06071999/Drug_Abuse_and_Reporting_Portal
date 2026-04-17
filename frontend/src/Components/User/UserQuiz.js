import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { saveUserQuiz } from "../../api/userQuizApi";
import { getUserDetails } from "../../api/userApi";

export default function UserQuiz() {
  const navigate = useNavigate();

  // Controlled inputs
  const [meditationMinutes, setMeditationMinutes] = useState("");
  const [exerciseMinutes, setExerciseMinutes] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [sober, setSober] = useState("");

  const [user, setUser] = useState({ id: null, name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (Cookies.get("token")) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const resp = await getUserDetails();
      if (resp.status === 200 && resp.data) {
        setUser({
          id: resp.data.userId,
          name: resp.data.username,
          email: resp.data.email,
        });
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  /* ----------------------------
     Validation helpers
  ----------------------------- */

  const checkLimits = () => {
    const m = Number(meditationMinutes || 0);
    const e = Number(exerciseMinutes || 0);
    const s = Number(sleepHours || 0);

    if (m > 120 || e > 120) {
      alert("Meditation or exercise cannot exceed 120 minutes (2 hours).");
      return false;
    }
    if (s > 24) {
      alert("Sleep hours cannot exceed 24 hours.");
      return false;
    }
    if (m > 90 || e > 90 || s > 16) {
      return window.confirm(
        "You entered unusually high values.\n\nAre you sure these are correct?"
      );
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sober) {
      alert("Please select sober status");
      return;
    }
    if (!checkLimits()) return;

    try {
      setSubmitting(true);

      await saveUserQuiz({
        username: user.name,
        email: user.email,
        meditationMinutes: Number(meditationMinutes || 0),
        exerciseMinutes: Number(exerciseMinutes || 0),
        sleepHours: Number(sleepHours || 0),
        sober,
      });

      navigate("/user/dashboard", { replace: true });
    } catch (err) {
      console.error("Error submitting quiz", err);
      alert("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6">

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-200 mb-2 text-center">
          Daily Wellness Quiz
        </h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Record today’s activities honestly for accurate insights
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <QuizInput
            label="Meditation (minutes)"
            value={meditationMinutes}
            max={120}
            onChange={setMeditationMinutes}
          />

          <QuizInput
            label="Exercise (minutes)"
            value={exerciseMinutes}
            max={120}
            onChange={setExerciseMinutes}
          />

          <QuizInput
            label="Sleep (hours)"
            value={sleepHours}
            max={24}
            onChange={setSleepHours}
          />

          <div className="flex flex-col">
            <label className="text-sm text-slate-300 mb-2">
              Were you sober today?
            </label>
            <select
              value={sober}
              onChange={(e) => setSober(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700
                         rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700
                       text-white font-semibold transition disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Submit Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ----------------------------
   Input component
----------------------------- */
function QuizInput({ label, value, onChange, max }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-slate-300 mb-2">
        {label}
      </label>
      <input
        type="number"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-800 text-slate-200 border border-slate-700
                   rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );
}