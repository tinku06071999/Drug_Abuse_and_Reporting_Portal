import React from "react";
import { useLocation, Link } from "react-router-dom";
import level1 from "../../Images/level1.png";
import level2 from "../../Images/level2.png";
import level3 from "../../Images/level3.png";

function AnxietyResultPage() {
  const location = useLocation();
  const { score = 0, anxietyLevel = "Low anxiety" } = location.state || {};

  // Image selection
  const imageToShow =
    score < 22 ? level1 : score < 36 ? level2 : level3;

  // Suggestions aligned with actual levels
  const suggestion =
    score < 22
      ? "Your anxiety level appears low. Continue healthy routines like mindfulness, sleep, and balanced activity."
      : score < 36
      ? "You may be experiencing moderate anxiety. Breathing exercises, routine physical activity, and talking to someone you trust can help."
      : "Your score suggests high anxiety. Consider reaching out to a mental‑health professional for guidance and support.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4">
      <div className="w-full max-w-3xl bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center">

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-200 mb-4 tracking-wide">
          Anxiety Assessment Result
        </h1>

        {/* Image */}
        <img
          src={imageToShow}
          alt="Anxiety level illustration"
          className="w-40 h-40 object-contain mb-4"
        />

        {/* Score */}
        <div className="mb-2">
          <div className="text-6xl font-extrabold text-cyan-400 leading-none">
            {score}
          </div>
          <div className="text-sm uppercase tracking-widest text-slate-400 mt-1">
            Anxiety Score
          </div>
        </div>

        {/* Level */}
        <div
          className={`text-xl font-semibold mt-2 ${
            score < 22
              ? "text-emerald-400"
              : score < 36
              ? "text-amber-400"
              : "text-red-400"
          }`}
        >
          {anxietyLevel}
        </div>

        {/* Guidance */}
        <p className="text-sm text-slate-300 mt-4 max-w-xl">
          {suggestion}
        </p>

        {/* Action */}
        <div className="mt-6">
          <Link
            to="/user/anxiety-report"
            className="inline-block px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
          >
            View Anxiety Trends
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnxietyResultPage;