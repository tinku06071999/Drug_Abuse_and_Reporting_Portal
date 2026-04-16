// TotalReports.js
import React, { useEffect, useState, useCallback } from 'react';
import AdminHeader from './AdminHeader';
import { getAllReports, updateReportStatus } from '../../api/reportApi';
import AdminNavbar from "./AdminNavbar";

function TotalReports() {
  const [allReports, setAllReports] = useState([]);
  const [resolvedReports, setResolvedReports] = useState([]);
  const [unresolvedReports, setUnresolvedReports] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(false);

  const splitBuckets = useCallback((list) => {
    const resolved = list.filter((r) => !!r.resolved);
    const unresolved = list.filter((r) => !r.resolved);
    setResolvedReports(resolved);
    setUnresolvedReports(unresolved);
  }, []);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllReports();
      const data = Array.isArray(res?.data) ? res.data : [];
      setAllReports(data);
      splitBuckets(data);

    } catch (error) {
      console.error("Error fetching reports:", error);
      alert(error?.response?.data?.message || error?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, [splitBuckets]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const pickId = (report) => report?._id ?? null;

  // Optimistic local toggle after server confirms
  const toggleLocal = (reportId, newResolved) => {
    const updated = allReports.map((r) =>
      (pickId(r) === reportId) ? { ...r, resolved: newResolved } : r
    );
    setAllReports(updated);
    splitBuckets(updated);
  };

  
  
    const resolveReport = async (report) => {

      try {
        const report_id = pickId(report)
         console.log('Resolving report with id:', report_id, 'raw:', report);

        if (!report_id) {
              console.log("CLICKED REPORT:", report);
                    console.log("pickId(report):", pickId(report));
              alert('Invalid report id (id missing on the object).');
              return;
            }

        await updateReportStatus(report_id);
        toggleLocal(report_id, true);
      } catch (error) {
        console.error('Error resolving report:', error);
        alert(error?.response?.data || error?.message || "Failed to resolve");
      }
    };

  
    const unresolveReport = async (report) => {

      try {
        const report_id = pickId(report);

        console.log('Unresolving report with id:', report_id, 'raw:', report);

        if (!report_id) {
        alert("CLICKED REPORT:", report);
         alert("pickId(report):", pickId(report));
          alert('Invalid report id (id missing on the object).');
          return;
        }

        await updateReportStatus(report_id);
        toggleLocal(report_id, false);
      } catch (error) {
        console.error('Error marking report as unresolved:', error);
        alert(error?.response?.data || error?.message || "Failed to mark unresolved");
      }
    };

  const handleFilterChange = (filter) => setFilterType(filter);

  const getFilteredReports = () => {
    switch (filterType) {
      case 'resolved': return resolvedReports;
      case 'unresolved': return unresolvedReports;
      default: return allReports;
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto mt-8 p-10">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold mb-4">All Reports</h1>
          {loading && <span className="text-sm text-gray-500">Loading…</span>}
        </div>

        {/* Filter Buttons */}
        <div className="mb-4">
          <button
            onClick={() => handleFilterChange('all')}
            className={`mr-2 px-4 py-2 rounded ${filterType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            All Reports ({allReports.length})
          </button>
          <button
            onClick={() => handleFilterChange('resolved')}
            className={`mr-2 px-4 py-2 rounded ${filterType === 'resolved' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Resolved ({resolvedReports.length})
          </button>
          <button
            onClick={() => handleFilterChange('unresolved')}
            className={`px-4 py-2 rounded ${filterType === 'unresolved' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
          >
            Unresolved ({unresolvedReports.length})
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getFilteredReports().map((report) => {
            const id = pickId(report);
            return (
              <div
                key={id}
                className={`border p-4 rounded shadow-md ${report.resolved ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}
              >
                <h2 className={`text-${report.resolved ? 'green' : 'red'}-800 font-semibold mb-2`}>
                  {report.resolved ? 'Resolved' : 'Unresolved'}
                </h2>
                <p className="text-gray-800">Title: {report.title}</p>
                <p className="text-gray-600">Place of Incident: {report.placeOfIncident}</p>
                <p className="text-gray-600">Date: {String(report.date)}</p>
                <p className="text-gray-600">Time: {report.time}</p>
                <p className="text-gray-600">Description: {report.description}</p>
                <p className="text-gray-600">Seriousness: {report.seriousness}</p>

                {!report.resolved ? (
                  <button
                    onClick={() => resolveReport(report)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Resolve
                  </button>
                ) : (
                  <button
                    onClick={() => unresolveReport(report)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Mark Unresolved
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TotalReports;
