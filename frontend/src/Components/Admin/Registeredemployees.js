// RegisteredEmployees.jsx
import React, { useEffect, useMemo, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import {
  getEmployees,
  verifyEmployee,
  makeAdmin,
} from "../../api/employeeApi";

export default function RegisteredEmployees() {
  const [employees, setEmployees] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  /* ---------------------------
     Fetch Employees
  ---------------------------- */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getEmployees();
        setEmployees(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        alert("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  /* ---------------------------
     KPIs
  ---------------------------- */
  const totalEmployees = employees.length;
  const verifiedEmployees = employees.filter((e) => e.verified).length;
  const pendingEmployees = totalEmployees - verifiedEmployees;
  const adminEmployees = employees.filter((e) =>
    e.roles?.includes("ADMIN")
  ).length;

  /* ---------------------------
     Filters
  ---------------------------- */
  const filteredEmployees = useMemo(() => {
    switch (filterType) {
      case "verified":
        return employees.filter((e) => e.verified);
      case "pending":
        return employees.filter((e) => !e.verified);
      default:
        return employees;
    }
  }, [employees, filterType]);

  /* ---------------------------
     Actions
  ---------------------------- */
  const handleVerification = async (id) => {
    try {
      setUpdatingId(id);
      const { data: updatedFields } = await verifyEmployee(id);

      setEmployees((prev) =>
        prev.map((emp) =>
          emp.userId === id ? { ...emp, ...updatedFields } : emp
        )
      );
    } catch {
      alert("Failed to verify employee");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleMakeAdmin = async (id) => {
    try {
      setUpdatingId(id);
      await makeAdmin(id);

      setEmployees((prev) =>
        prev.map((emp) => {
          if (emp.userId !== id) return emp;

          const isAdmin = emp.roles?.includes("ADMIN");
          return {
            ...emp,
            roles: isAdmin
              ? emp.roles.filter((r) => r !== "ADMIN")
              : [...(emp.roles || []), "ADMIN"],
          };
        })
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* ---------------------------
     UI
  ---------------------------- */
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <AdminNavbar />

      <div className="flex-1 p-6 space-y-8">
        <h1 className="text-2xl font-bold">Registered Employees</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <KpiCard label="Total Employees" value={totalEmployees} />
          <KpiCard label="Verified" value={verifiedEmployees} color="green" />
          <KpiCard label="Pending" value={pendingEmployees} color="amber" />
          <KpiCard label="Admins" value={adminEmployees} color="cyan" />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <FilterButton
            active={filterType === "all"}
            onClick={() => setFilterType("all")}
          >
            All
          </FilterButton>
          <FilterButton
            active={filterType === "verified"}
            color="green"
            onClick={() => setFilterType("verified")}
          >
            Verified
          </FilterButton>
          <FilterButton
            active={filterType === "pending"}
            color="red"
            onClick={() => setFilterType("pending")}
          >
            Pending
          </FilterButton>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-auto max-h-[65vh]">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-900 border-b border-slate-800">
                <tr className="text-xs uppercase tracking-wide text-slate-400">
                  <Th>#</Th>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Mobile</Th>
                  <Th>Roles</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="8" className="py-6 text-center text-slate-400">
                      Loading employees…
                    </td>
                  </tr>
                )}

                {!loading &&
                  filteredEmployees.map((e, index) => (
                    <tr
                      key={e.userId}
                      className="border-b border-slate-800 hover:bg-slate-800/60 transition"
                    >
                      <Td>{index + 1}</Td>
                      <Td>{e.userId}</Td>
                      <Td>{e.username}</Td>
                      <Td>{e.email}</Td>
                      <Td>{e.mobile}</Td>
                      <Td>{(e.roles ?? []).join(", ")}</Td>
                      <Td>
                        <StatusBadge
                          status={e.verified ? "Verified" : "Pending"}
                        />
                      </Td>
                      <Td>
                        <div className="flex gap-2">
                          <ActionButton
                            disabled={updatingId === e.userId}
                            color={e.verified ? "amber" : "green"}
                            onClick={() => handleVerification(e.userId)}
                          >
                            {e.verified ? "Unverify" : "Verify"}
                          </ActionButton>

                          <ActionButton
                            disabled={updatingId === e.userId}
                            color={
                              e.roles?.includes("ADMIN") ? "red" : "cyan"
                            }
                            onClick={() => handleMakeAdmin(e.userId)}
                          >
                            {e.roles?.includes("ADMIN")
                              ? "Remove Admin"
                              : "Make Admin"}
                          </ActionButton>
                        </div>
                      </Td>
                    </tr>
                  ))}

                {!loading && filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-6 text-center text-slate-400">
                      No employees found.
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

/* ===========================
   Reusable Components
=========================== */

function KpiCard({ label, value, color = "cyan" }) {
  const colors = {
    cyan: "text-cyan-400",
    green: "text-emerald-400",
    amber: "text-amber-400",
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-sm">
      <div className="text-xs uppercase text-slate-500">{label}</div>
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
      className={`px-4 py-2 text-sm rounded-lg transition
      bg-slate-800 text-slate-300 hover:bg-slate-700
      ${colors[color]} data-[active=true]:text-white`}
    >
      {children}
    </button>
  );
}

function ActionButton({ children, onClick, color, disabled }) {
  const colors = {
    green: "bg-emerald-600 hover:bg-emerald-700",
    amber: "bg-amber-600 hover:bg-amber-700",
    red: "bg-red-600 hover:bg-red-700",
    cyan: "bg-cyan-600 hover:bg-cyan-700",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-3 py-1.5 text-xs rounded text-white
      ${colors[color]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-0.5 text-xs rounded font-semibold ${
        status === "Verified"
          ? "bg-emerald-700 text-emerald-100"
          : "bg-red-700 text-red-100"
      }`}
    >
      {status}
    </span>
  );
}

function Th({ children }) {
  return <th className="px-4 py-3 text-left">{children}</th>;
}

function Td({ children }) {
  return <td className="px-4 py-2">{children}</td>;
}