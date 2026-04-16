import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { getEmployees, verifyEmployee,makeAdmin } from '../../api/employeeApi';
import AdminNavbar from "./AdminNavbar";
function RegisteredEmployees() {
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        const employeeData = Array.isArray(response.data) ? response.data : [];
        setOriginalData(employeeData);
      } catch (error) {
        console.error('Error fetching registered employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Derive filtered list (no state updates here -> no loops)
  const filteredEmployees = useMemo(() => {
    switch (filterType) {
      case 'verified':
        return originalData.filter((e) => !!e.verified);
      case 'pending':
        return originalData.filter((e) => !e.verified);
      default:
        return originalData;
    }
  }, [originalData, filterType]);

  const handleVerification = async (userId, currentStatus, email) => {
    try {
      const { data: updatedEmployee } = await verifyEmployee(userId);

      // Update local cache
      setOriginalData((prev) =>
        prev.map((emp) => (emp.userId === updatedEmployee.userId ? updatedEmployee : emp))
      );


    } catch (error) {
      console.error('Error updating employee verification status:', error);
      alert(error?.response?.data || error.message || 'Verification failed');
    }
  };
const handleMakeAdmin = async (userId, currentStatus, email) => {
    try {
      const { data: updatedEmployee } = await makeAdmin(userId);

      // Update local cache
      setOriginalData((prev) =>
        prev.map((emp) => (emp.userId === updatedEmployee.userId ? updatedEmployee : emp))
      );
    } catch (error) {
      console.error('Error updating employee status:', error);
      alert(error?.response?.data || error.message || 'Changes failed');
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto mt-8 ">
        {/* Filters */}
        <div className="flex space-x-4 mb-4 ml-3">
          <button
            className={`${filterType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            className={`${filterType === 'verified' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded`}
            onClick={() => setFilterType('verified')}
          >
            Verified
          </button>
          <button
            className={`${filterType === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded`}
            onClick={() => setFilterType('pending')}
          >
            Pending Verification
          </button>
        </div>

        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-r">Sr. No</th>
              <th className="py-2 px-4 border-r">Employee ID</th>
              <th className="py-2 px-4 border-r">Name</th>
              <th className="py-2 px-4 border-r">Email</th>
              <th className="py-2 px-4 border-r">Mobile No</th>
              <th className="py-2 px-4 border-r">Roles</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee.userId} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-r">{index + 1}</td>
                <td className="py-2 px-4 border-r">{employee.userId}</td>
                <td className="py-2 px-4 border-r">{employee.username}</td>
                <td className="py-2 px-4 border-r">{employee.email}</td>
                <td className="py-2 px-4 border-r">{employee.mobile}</td>
                <td className="py-2 px-4 border-r">{(employee.roles ?? []).slice().sort().join(", ")}</td>
                <td className="py-2 px-4">
                  <button
                    className= {`${employee.verified ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded`}
                    onClick={() => handleVerification(employee.userId, employee.verified, employee.email)}
                  >
                    {employee.verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button
                     className={`${employee.admin ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded ml-3 mt-3`}
                     onClick={() => handleMakeAdmin(employee.userId, employee.admin, employee.email)}
                     >
                     {employee.roles?.includes("ADMIN") ? 'Remove Admin' : 'Make Admin'}
                     </button>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td className="py-4 px-4 text-center text-gray-500" colSpan={8}>
                  No employees found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegisteredEmployees;