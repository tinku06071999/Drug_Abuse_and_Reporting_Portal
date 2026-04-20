import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export default function UserQuiz() {
  const navigate = useNavigate();
  const [quizResponses, setQuizResponses] = useState({
    Meditation: "",
    Exercise: "",
    Sleep: "",
    Sober: "",
  });

  const handleInputChange = (category, value) => {
    setQuizResponses({ ...quizResponses, [category]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send quiz responses with token in headers
      await axios.post("http://localhost:3001/api/quiz", quizResponses, config);

      alert("Quiz submitted successfully!");
      navigate("/userdashboard");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-800 py-12 ">
      <h1 className="text-3xl font-bold mb-8 text-gray-200">Daily Wellness Quiz</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg text-black">
        <QuizInput

          label="How many minutes did you meditate today?"
          id="Meditation"
          value={quizResponses.Meditation}
          onChange={(e) => handleInputChange("Meditation", e.target.value)}
          placeholder="e.g., 10 mins"
        />
        <QuizInput
          label="How many minutes did you exercise today?"
          id="Exercise"
          value={quizResponses.Exercise}
          onChange={(e) => handleInputChange("Exercise", e.target.value)}
          placeholder="e.g., 20 mins"
        />
        <QuizInput
          label="How many hours did you sleep last night?"
          id="Sleep"
          value={quizResponses.Sleep}
          onChange={(e) => handleInputChange("Sleep", e.target.value)}
          placeholder="e.g., 8 hours"
        />
        <div className="flex flex-col mb-4 text-black">
          <label htmlFor="Sober" className="font-semibold mb-2 text-gray-200">
            Were you sober today?
          </label>
          <select
            id="Sober"
            className="border rounded-lg px-3 py-2 bg-gray-200 focus:outline-none focus:border-blue-500"
            value={quizResponses.Sober}
            onChange={(e) => handleInputChange("Sober", e.target.value)}
          >
            <option  value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function QuizInput({ label, id, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="font-semibold mb-2 text-gray-100">
        {label}
      </label>
      <input
        type="number"
        id={id}
        className="border rounded-lg px-3 py-2 bg-gray-200 focus:outline-none focus:border-blue-500"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
