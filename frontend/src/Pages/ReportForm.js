import React, { useState } from "react";
import { createReport } from "../api/reportApi";

// ✅ Utility helpers
const getTodayDate = () => new Date().toISOString().split("T")[0];

const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

const isFutureDateTime = (date, time) => {
  if (!date || !time) return false;
  return new Date(`${date}T${time}`) > new Date();
};

export default function CreateOrEditReport() {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [seriousness, setSeriousness] = useState("MEDIUM");

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Reset form after success
  const resetForm = () => {
    setTitle("");
    setPlace("");
    setDate("");
    setTime("");
    setDescription("");
    setSeriousness("MEDIUM");
  };

  // ✅ Production-grade submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (isFutureDateTime(date, time)) {
      setErrorMessage("Date and time cannot be in the future.");
      return;
    }

    const payload = {
      title,
      placeOfIncident: place,
      date,
      time,
      seriousness,
      description,
    };

    try {
      setSubmitting(true);

      const response = await createReport(payload);

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("✅ Report submitted successfully.");
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setErrorMessage(
        error?.response?.data?.message ||
          "❌ Failed to submit report. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex justify-center items-start py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-lg"
      >
        {/* ✅ Header */}
        <h1 className="text-xl font-bold">
          Create / Submit Incident Report
        </h1>

        {/* ✅ Success / Error Messages */}
        {successMessage && (
          <div className="bg-emerald-900/40 border border-emerald-700 text-emerald-300 px-4 py-2 rounded">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-2 rounded">
            {errorMessage}
          </div>
        )}

        {/* ✅ Title */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-slate-800 text-slate-200 px-3 py-2 rounded"
          />
        </div>

        {/* ✅ Place */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Place of Incident
          </label>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
            className="w-full bg-slate-800 text-slate-200 px-3 py-2 rounded"
          />
        </div>

        {/* ✅ Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Date</label>
            <input
              type="date"
              value={date}
              max={getTodayDate()}
              onChange={(e) => {
                setDate(e.target.value);
                if (e.target.value !== getTodayDate()) setTime("");
              }}
              required
              className="w-full bg-slate-800 text-slate-200 px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Time</label>
            <input
              type="time"
              value={time}
              max={date === getTodayDate() ? getCurrentTime() : undefined}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full bg-slate-800 text-slate-200 px-3 py-2 rounded"
            />
          </div>
        </div>

        <p className="text-xs text-slate-400">
          ⛔ Future date or time is not allowed
        </p>

        {/* ✅ Seriousness */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Seriousness
          </label>
          <select
            value={seriousness}
            onChange={(e) => setSeriousness(e.target.value)}
            className="w-full bg-slate-800 text-slate-200 px-3 py-2 rounded"
          >
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>

        {/* ✅ Description */}
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full bg-slate-800 text-slate-200 px-3 py-2 rounded"
          />
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded font-semibold transition ${
            submitting
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}