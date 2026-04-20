import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { saveAnxietyTest } from "../../api/anxietyTestApi";
import { getUserDetails } from "../../api/userApi";

function AnxietyQuiz() {
  const navigate = useNavigate();

  const questions = [
    "Are you experiencing numbness or tingling sensations?",
    "Do you feel hot?",
    "Are you experiencing wobbliness in your legs?",
    "Are you unable to relax?",
    "Do you have a fear of the worst happening?",
    "Are you feeling dizzy or lightheaded?",
    "Is your heart pounding or racing?",
    "Do you feel unsteady?",
    "Are you feeling terrified or afraid?",
    "Are you nervous?",
    "Do you have a feeling of choking?",
    "Are your hands trembling?",
    "Are you feeling shaky or unsteady?",
    "Do you have a fear of losing control?",
    "Are you experiencing difficulty in breathing?",
    "Do you have a fear of dying?",
    "Are you scared?",
    "Do you have indigestion?",
    "Are you feeling faint or lightheaded?",
    "Is your face flushed?",
    "Are you experiencing hot or cold sweats?",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(
    Array(questions.length).fill(null)
  );
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
      console.error(err);
    }
  };

  const handleResponse = (value) => {
    const next = [...responses];
    next[currentQuestion] = value;
    setResponses(next);
  };

  const computeLevel = (score) => {
    if (score >= 36) return "Potentially concerning levels of anxiety";
    if (score >= 22) return "Moderate anxiety";
    return "Low anxiety";
  };

  const handleSubmit = async () => {
    if (responses.some((v) => v === null)) {
      alert("Please answer all questions.");
      return;
    }

    try {
      setSubmitting(true);
      const score = responses.reduce((a, b) => a + b, 0);
      const level = computeLevel(score);

      await saveAnxietyTest({
        username: user.name,
        email: user.email,
        score,
        level,
      });

      navigate("/user/anxiety-result-page", {
        state: { score, anxietyLevel: level },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit anxiety test.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col">

        {/* Progress */}
        <div className="text-slate-400 text-sm mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        {/* Question (FIXED HEIGHT ✅) */}
        <div className="min-h-[80px] flex items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-200">
            {questions[currentQuestion]}
          </h2>
        </div>

        {/* Options (FIXED HEIGHT ✅) */}
        <div className="grid grid-cols-1 gap-3 mb-8 min-h-[220px]">
          {[
            ["Not at all", 0],
            ["Mildly", 1],
            ["Moderately", 2],
            ["Severely", 3],
          ].map(([label, val], idx) => (
            <button
              key={idx}
              onClick={() => handleResponse(val)}
              className={`text-left px-4 py-3 rounded-lg border transition
                ${
                  responses[currentQuestion] === val
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Actions (FIXED POSITION ✅) */}
        <div className="flex justify-between mt-auto pt-4 border-t border-slate-700">
          <button
            onClick={() => setCurrentQuestion((q) => q - 1)}
            disabled={currentQuestion === 0}
            className="px-4 py-2 rounded-md bg-slate-700 text-slate-300 disabled:opacity-40"
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion((q) => q + 1)}
              className="px-6 py-2 rounded-md bg-cyan-600 text-white"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 rounded-md bg-cyan-600 text-white disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnxietyQuiz;