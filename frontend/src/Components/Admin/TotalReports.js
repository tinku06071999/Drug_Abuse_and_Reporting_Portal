// TotalReports.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import AdminNavbar from "./AdminNavbar";
import { getAllReports, updateReportStatus } from "../../api/reportApi";

export default function TotalReports() {
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("all");

  /* ---------------------------
     Helpers
  ---------------------------- */
  const pickId = (r) => r?._id ?? null;

  const resolvedReports = useMemo(
    () => allReports.filter((r) => r.resolved),
    [allReports]
  );

  const unresolvedReports = useMemo(
    () => allReports.filter((r) => !r.resolved),
    [allReports]
  );

  const filteredReports = useMemo(() => {
    switch (filterType) {
      case "resolved":
        return resolvedReports;
      case "unresolved":
        return unresolvedReports;
      default:
        return allReports;
    }
  }, [filterType, allReports, resolvedReports, unresolvedReports]);

  /* ---------------------------
     Fetch Reports
  ---------------------------- */
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllReports();
      setAllReports(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      alert(err?.response?.data || err?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  /* ---------------------------
     Resolve / Unresolve
  ---------------------------- */
  const toggleStatus = async (report, nextResolved) => {
    const id = pickId(report);
    if (!id) {
      alert("Invalid report ID");
      return;
    }

    try {
      await updateReportStatus(id);
      setAllReports((prev) =>
        prev.map((r) =>
          pickId(r) === id ? { ...r, resolved: nextResolved } : r
        )
      );
    } catch (err) {
      alert(err?.response?.data || err?.message || "Update failed");
    }
  };

  /* ---------------------------
     UI
  ---------------------------- */
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <AdminNavbar />

      <div className="flex-1 p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Reports Overview</h1>
          {loading && (
            <span className="text-sm text-slate-400">Loading…</span>
          )}
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <KpiCard label="Total Reports" value={allReports.length} />
          <KpiCard
            label="Resolved"
            value={resolvedReports.length}
            color="green"
          />
          <KpiCard
            label="Unresolved"
            value={unresolvedReports.length}
            color="red"
          />
        </div>

        {/* FILTERS */}
        <div className="flex gap-3">
          <FilterButton
            active={filterType === "all"}
            onClick={() => setFilterType("all")}
          >
            All
          </FilterButton>
          <FilterButton
            color="green"
            active={filterType === "resolved"}
            onClick={() => setFilterType("resolved")}
          >
            Resolved
          </FilterButton>
          <FilterButton
            color="red"
            active={filterType === "unresolved"}
            onClick={() => setFilterType("unresolved")}
          >
            Unresolved
          </FilterButton>
        </div>

        {/* REPORT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <ReportCard
              key={pickId(report)}
              report={report}
              onResolve={() => toggleStatus(report, true)}
              onUnresolve={() => toggleStatus(report, false)}
            />
          ))}

          {filteredReports.length === 0 && (
            <div className="col-span-full text-slate-400">
              No reports found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===========================
   Components
=========================== */

function KpiCard({ label, value, color = "cyan" }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-emerald-400",
    red: "text-red-400",
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

function FilterButton({ active, children, onClick, color = "cyan" }) {
  const colors = {
    cyan: "data-[active=true]:bg-cyan-600",
    green: "data-[active=true]:bg-emerald-600",
    red: "data-[active=true]:bg-red-600",
  };

  return (
    <button
      data-active={active}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm transition
        bg-slate-800 text-slate-300 hover:bg-slate-700
        ${colors[color]} data-[active=true]:text-white
      `}
    >
      {children}
    </button>
  );
}

function ReportCard({ report, onResolve, onUnresolve }) {
  const resolved = report.resolved;

  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Not specified";

  return (
    <div
      className={`rounded-lg p-4 shadow-md border ${
        resolved
          ? "bg-emerald-900/20 border-emerald-700"
          : "bg-red-900/20 border-red-700"
      }`}
    >
      <div
        className={`text-xs font-semibold mb-1 ${
          resolved ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {resolved ? "Resolved" : "Unresolved"}
      </div>

      <p className="text-slate-100 font-medium text-sm">
        {report.title}
      </p>

      <div className="mt-2 text-xs text-slate-400 space-y-0.5">
        <div>📍 {report.placeOfIncident}</div>
        <div>📅 {formatDate(report.date)}</div>
        <div>⏰ {report.time ?? "Not specified"}</div>
        <div>⚠️ {report.seriousness ?? "Unknown"}</div>
      </div>

      <p className="mt-2 text-xs text-slate-300 line-clamp-2">
        {report.description}
      </p>

      <div className="mt-3">
        {!resolved ? (
          <ActionButton color="green" onClick={onResolve}>
            Mark Resolved
          </ActionButton>
        ) : (
          <ActionButton color="red" onClick={onUnresolve}>
            Mark Unresolved
          </ActionButton>
        )}
      </div>
    </div>
  );
}

function ActionButton({ children, onClick, color }) {
  const colors = {
    green: "bg-emerald-600 hover:bg-emerald-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs text-white transition ${colors[color]}`}
    >
      {children}
    </button>
  );
}