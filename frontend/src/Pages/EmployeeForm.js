import React, { useState } from "react";
import { saveEmployee } from "../api/employeeApi";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [mobile, setMobile] = useState("+91");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("warden");

  const handleMobileChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+91")) {
      value = "+91";
    }

    value = "+91" + value.slice(3).replace(/\D/g, "");
    setMobile(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        userId: employeeId,
        username: name,
        email,
        password,
        mobile,
        roles: [roles.toUpperCase()],
        verified: false,
      };

      const response = await saveEmployee(formData);
      console.log("Success:", response.data);

      alert(
        "Employee Registration Successful. Please check your mail for further steps"
      );

      setName("");
      setEmployeeId("");
      setMobile("+91");
      setEmail("");
      setPassword("");
      setRoles("warden");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-gray-300 p-8">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Employee Registration
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          {/* Employee ID */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Employee ID
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Mobile
            </label>
            <input
              type="text"
              value={mobile}
              onChange={handleMobileChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Role
            </label>
            <select
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            >
              <option value="warden">Warden</option>
              <option value="securityGuard">Security Guard</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default EmployeeForm;