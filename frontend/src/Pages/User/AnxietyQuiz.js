import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAnxietyTest } from "../../api/anxietyTestApi";

function AnxietyQuiz() {
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
    "Are you experiencing hot or cold sweats?"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [totalScore, setTotalScore] = useState(0);
  const [anxietyLevel, setAnxietyLevel] = useState("Low anxiety");
  const [token, setToken] = useState("");
  const [user, setUser] = useState({ id: null, name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = Cookies.get("token");
    if (t) {
      setToken(t);
      fetchUserProfile(t);
    }
  }, []);

  const fetchUserProfile = async (jwt) => {
    try {
      const resp = await axios.get("http://localhost:3001/api/getUserName", {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      if (resp.status === 200 && resp.data) {
        const id = resp.data.id || resp.data.userId || null;
        setUser({
          id,
          name: resp.data.name || "",
          email: resp.data.email || ""
        });
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  const handleResponseChange = (value) => {
    const next = [...responses];
    next[currentQuestion] = value;
    setResponses(next);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    }
  };

  const computeLevel = (score) => {
    if (score >= 36) return "Potentially concerning levels of anxiety";
    if (score >= 22) return "Moderate anxiety";
    return "Low anxiety";
  };

  const handleSubmit = async () => {
    const unanswered = responses.findIndex((v) => v === null);
    if (unanswered !== -1) {
      alert(`Please answer question ${unanswered + 1} before submitting.`);
      setCurrentQuestion(unanswered);
      return;
    }

    try {
      setSubmitting(true);

      const score = responses.reduce((acc, val) => acc + (val || 0), 0);
      const level = computeLevel(score);
      setTotalScore(score);
      setAnxietyLevel(level);

      const payload = {
        userId: user.id || undefined,
        email: user.email || undefined,
        score
      };

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

      const resp = await saveAnxietyTest(payload, config);

      if (resp.status === 201) {
        navigate("/anxietyresultpage", {
          state: { score, anxietyLevel: level }
        });
      } else {
        console.error("Failed to store anxiety test result:", resp?.status);
        alert("Failed to store your test result. Please try again.");
      }
    } catch (err) {
      console.error("Error storing anxiety test result:", err);
      alert(
        err?.response?.data?.error ||
          err?.response?.data ||
          err?.message ||
          "Something went wrong while saving your test."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = responses.every((v) => v !== null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 to-teal-200">
      <div className="bg-gray-600 p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        <h1 className="font-semibold text-gray-300 tracking-tight text-xl">
          {currentQuestion + 1} / {questions.length}
        </h1>

        <h1 className="font-semibold text-white tracking-tight text-2xl py-2">
          {questions[currentQuestion]}
        </h1>

        <div className="space-y-4">
          <div
            className="block cursor-pointer border-2 border-green-500 w-4/5 p-2 rounded-xl font-thin bg-green-100"
            onClick={() => handleResponseChange(0)}
          >
            <input type="radio" checked={responses[currentQuestion] === 0} readOnly />
            <span className="ml-2 text-green-900 font-medium tracking-wider">
              Not At All
            </span>
          </div>

          <div
            className="block cursor-pointer border-2 border-blue-400 w-4/5 p-2 rounded-xl font-thin bg-blue-100"
            onClick={() => handleResponseChange(1)}
          >
            <input type="radio" checked={responses[currentQuestion] === 1} readOnly />
            <span className="ml-2 text-green-900 font-medium tracking-wider">
              Mildly but it didn't bother me much
            </span>
          </div>

          <div
            className="block cursor-pointer border-2 border-yellow-300 w-4/5 p-2 rounded-xl font-thin bg-yellow-100"
            onClick={() => handleResponseChange(2)}
          >
            <input type="radio" checked={responses[currentQuestion] === 2} readOnly />
            <span className="ml-2 text-green-900 font-medium tracking-wider">
              Moderately - it wasn't pleasant at times
            </span>
          </div>

          <div
            className="block cursor-pointer border-2 border-red-400 w-4/5 p-2 rounded-xl font-thin bg-red-100"
            onClick={() => handleResponseChange(3)}
          >
            <input type="radio" checked={responses[currentQuestion] === 3} readOnly />
            <span className="ml-2 text-green-900 font-medium tracking-wider">
              Severely – it bothered me a lot
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || submitting}
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              onClick={handleNext}
              disabled={submitting}
            >
              Next
            </button>
          )}

          {currentQuestion === questions.length - 1 && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
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