import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookSession = () => {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasClickedToday, setHasClickedToday] = useState(false);

  useEffect(() => {
    const lastClickTimestamp = localStorage.getItem("lastClickTimestamp");
    if (lastClickTimestamp) {
      const lastClickDate = new Date(parseInt(lastClickTimestamp));
      const currentDate = new Date();
      const diffInHours = (currentDate - lastClickDate) / (1000 * 60 * 60);
      if (diffInHours < 24) {
        setHasClickedToday(true);
      }
    }

    const bookedSessionData = localStorage.getItem("bookedSessionData");
    if (bookedSessionData) {
      setSessionData(JSON.parse(bookedSessionData));
    }
  }, []);

  const handleBookSession = async () => {
    if (hasClickedToday) {
      setError("You have already booked a session today.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send backend request to get session data
      const response = await axios.post(
        "http://localhost:3001/api/book-session"
      );
      const newSessionData = response.data;
      setSessionData(newSessionData);
      setHasClickedToday(true);
      localStorage.setItem("lastClickTimestamp", Date.now().toString());
      localStorage.setItem("bookedSessionData", JSON.stringify(newSessionData));
    } catch (error) {
      setError("Error booking session. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col items-center mt-24">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-2xl font-bold mb-4">Book a Session</h1>

        {sessionData && (
          <div className="mb-4">
            <p className="text-gray-100 mb-1">
              Session URL:{" "}
              <span className="text-blue-300 text-xl ">
                <Link to={sessionData.roomUrl} className="underline " target="_blank">
                  Join Meeting Now
                </Link>
              </span>
            </p>
            <p className="text-gray-100">Meeting ID: {sessionData.meetingId}</p>
          </div>
        )}

        {loading && <p>Loading...</p>}

        {error && (
          <div className="mb-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBookSession}
          disabled={loading || hasClickedToday}
        >
          {hasClickedToday ? "Already Booked Today" : "Book Session"}
        </button>
      </div>
    </div>
  );
};

export default BookSession;