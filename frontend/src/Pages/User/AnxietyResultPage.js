import React from "react";
import { useLocation } from "react-router";
import level1 from "../../Images/level1.png";
import level2 from "../../Images/level2.png";
import level3 from "../../Images/level3.png";
import { Link } from "react-router-dom";

function AnxietyResultPage() {
  const location = useLocation();
  const { score, anxietyLevel } = location.state || {};

  let imageToShow;
  if (score < 22) {
    imageToShow = level1;
  } else if (score >= 22 && score <= 36) {
    imageToShow = level2;
  } else {
    imageToShow = level3;
  }

  let suggestion;
  if (anxietyLevel === "Level 1") {
    suggestion = "Try practicing relaxation techniques such as deep breathing or meditation";
  } else if (anxietyLevel === "Level 2") {
    suggestion = "Consider seeking support from a therapist or counselor to learn coping strategies";
  } else {
    suggestion = "It may be helpful to engage in regular exercise and maintain a healthy lifestyle to manage anxiety";
  }

  return (
    <div className="min-h-screen flex items-start justify-center  bg-gradient-to-r from-teal-50 to-teal-200">
      <div className="bg-white p-8 rounded-lg shadow-lg mt-14 w-2/5">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-500 text-center mb-6">
          Anxiety Quiz Result
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={imageToShow}
            width="300"
            height="300"
            alt="Anxiety"
            className="rounded-full"
          />
          <div className="grid gap-1 text-center">
            <div className="text-6xl font-extrabold">{score}</div>
            <div className="text-lg font-medium text-gray-500">
              Anxiety Score
            </div>
          </div>
          <div className="grid gap-1 text-center">
            <div className="text-4xl font-semibold">{anxietyLevel}</div>
          <div className="text-center">
            <p className="text-base font-thin text-gray-500 mb-3">"{suggestion}"</p>
          </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/anxietyReport"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg"
          >
            See All Reports
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnxietyResultPage;