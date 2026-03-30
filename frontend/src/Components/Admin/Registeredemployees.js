import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { getEmployees, verifyEmployee,makeAdmin } from '../../api/employeeApi';

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

  const handleVerification = async (employeeId, currentStatus, email) => {
    try {
      const { data: updatedEmployee } = await verifyEmployee(employeeId);

      // Update local cache
      setOriginalData((prev) =>
        prev.map((emp) => (emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp))
      );

      // (Optional) send your separate email call (if you still use node mailer service)
      const emailSubject = currentStatus ? 'Verification Removed' : 'Verification Success';
      const emailText = currentStatus
        ? "You have been removed from the Alert List of Drug abuse reporting website."
        : "Your registration with Drug Abuse Reporting Website is successful. Next Steps: Please WhatsApp 'join flame-color' to +14155238886 to start getting reports on your phone number.";
      const emailHtml = currentStatus
        ? `<p>You have been removed from the Alert List of Drug abuse reporting website.</p>`
        : `
            <p>Your registration with Drug Abuse Reporting Website is successful.</p>
            <p><strong>Next Steps:</strong> Please <a href="https://api.whatsapp.com/send?phone=+14155238886&text=join%20flame-color" target="_blank">Click Here</a> to start getting reports on your phone number.</p>
            OR you can WhatsApp 'join flame-color' to +14155238886 to start getting reports on your phone number.
          `;
    } catch (error) {
      console.error('Error updating employee verification status:', error);
      alert(error?.response?.data || error.message || 'Verification failed');
    }
  };
const handleMakeAdmin = async (employeeId, currentStatus, email) => {
    try {
      const { data: updatedEmployee } = await makeAdmin(employeeId);

      // Update local cache
      setOriginalData((prev) =>
        prev.map((emp) => (emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp))
      );

      // (Optional) send your separate email call (if you still use node mailer service)
      const emailSubject = currentStatus ? 'Removed From Administration' : 'Added In Admin Team';
      const emailText = currentStatus
        ? "You have been removed from the Admin List of Drug abuse reporting portal.."
        : "You are now Admin on Drug Abuse Reporting Portal.";
      const emailHtml = currentStatus
        ? `<p>You have been removed from the Admin List of Drug abuse reporting portal.</p>`
        : `
            <p>You are now Admin on Drug Abuse Reporting Portal.</p>
          `;
    } catch (error) {
      console.error('Error updating employee status:', error);
      alert(error?.response?.data || error.message || 'Changes failed');
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <AdminHeader />
      <div className="container mx-auto mt-8 ">
        <div className="flex">
          <h1 className="text-3xl font-bold mb-4 ml-3">Total Registered Employees</h1>
          <div>
            <Link to="/adminDashboard">
              <button className="bg-blue-500 text-white px-4 py-2 rounded ml-5">Dashboard</button>
            </Link>
          </div>
        </div>

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
              <th className="py-2 px-4 border-r">Name</th>
              <th className="py-2 px-4 border-r">Employee ID</th>
              <th className="py-2 px-4 border-r">Post</th>
              <th className="py-2 px-4 border-r">Mobile No</th>
              <th className="py-2 px-4 border-r">Email</th>
              <th className="py-2 px-4 border-r">Today Location</th>
              <th className="py-2 px-4">Verification Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee.employeeId} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-r">{index + 1}</td>
                <td className="py-2 px-4 border-r">{employee.employeeName}</td>
                <td className="py-2 px-4 border-r">{employee.employeeId}</td>
                <td className="py-2 px-4 border-r">{employee.employeePost}</td>
                <td className="py-2 px-4 border-r">{employee.employeeMobile}</td>
                <td className="py-2 px-4 border-r">{employee.employeeEmail}</td>
                <td className="py-2 px-4 border-r">{employee.employeeTodayLocation}</td>
                <td className="py-2 px-4">
                  <button
                    className={`${employee.verified ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded`}
                    onClick={() => handleVerification(employee.employeeId, employee.verified, employee.email)}
                  >
                    {employee.verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button
                     className={`${employee.admin ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded`}
                     onClick={() => handleMakeAdmin(employee.employeeId, employee.admin, employee.email)}
                     >
                     {employee.admin ? 'Admin' : 'Employee'}
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