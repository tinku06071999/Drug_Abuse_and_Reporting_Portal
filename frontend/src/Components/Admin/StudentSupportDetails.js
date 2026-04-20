import React, { useEffect, useMemo, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { getAllResponses } from "../../api/collegeSupportApi";

export default function StudentSupportDetails() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await getAllResponses();
        setResponses(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching student support data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, []);

  /* ---------------------------
     Power BI KPIs
  ---------------------------- */
  const totalMessages = responses.length;

  const uniqueStudents = useMemo(
    () => new Set(responses.map((r) => r.rollNumber)).size,
    [responses]
  );

  const messagesWithPhone = responses.filter((r) => r.phone).length;

  return (
    <div className="flex-1 min-h-screen bg-slate-950 text-slate-200">
      <AdminNavbar />

      <div className="p-6 space-y-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold">Student Support Messages</h1>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <KpiCard label="Total Messages" value={totalMessages} />
          <KpiCard label="Unique Students" value={uniqueStudents} color="green" />
          <KpiCard
            label="Messages with Phone"
            value={messagesWithPhone}
            color="cyan"
          />
        </div>

        {/* TABLE */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-auto max-h-[65vh]">

            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-900 border-b border-slate-800 z-10">
                <tr className="text-xs uppercase tracking-wide text-slate-400">
                  <Th>#</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Roll No</Th>
                  <Th>Message</Th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-slate-400"
                    >
                      Loading student support messages…
                    </td>
                  </tr>
                )}

                {!loading &&
                  responses.map((student, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-800 hover:bg-slate-800/60 transition"
                    >
                      <Td>{index + 1}</Td>
                      <Td className="text-slate-100 font-medium">
                        {student.name}
                      </Td>
                      <Td>{student.email}</Td>
                      <Td>{student.phone ?? "—"}</Td>
                      <Td>{student.rollNumber}</Td>
                      <Td className="max-w-md">
                        <p className="line-clamp-2 text-slate-300">
                          {student.message}
                        </p>
                      </Td>
                    </tr>
                  ))}

                {!loading && responses.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-6 text-slate-400"
                    >
                      No student support messages available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   Reusable Components
---------------------------- */

function KpiCard({ label, value, color = "cyan" }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-emerald-400",
    amber: "text-amber-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className={`text-2xl font-bold mt-1 ${colors[color]}`}>
        {value}
      </div>
    </div>
  );
}

function Th({ children }) {
  return <th className="px-4 py-3 text-left">{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`px-4 py-2 ${className}`}>{children}</td>;
}