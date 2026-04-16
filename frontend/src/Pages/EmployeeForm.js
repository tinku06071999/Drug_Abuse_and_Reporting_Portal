import React, { useState } from "react";
import axios from "axios";
import { saveEmployee } from ".././api/employeeApi";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId,setEmployeeId] = useState();
  const [mobile, setMobile] = useState("");
  const [roles, setRoles] = useState("warden");


  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmployeeIdChange = (e) => setEmployeeId(e.target.value);
  const handleMobileChange = (e) => setMobile(e.target.value);
  const handleRolesChange = (e) => setRoles(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
          userId: employeeId,
          username: name,
          email: email,
          password: password,
          mobile: mobile,
          roles: [roles.toUpperCase()],
          verified: false
      }

      const response = await saveEmployee(formData);

      console.log("Employee Registration Form submitted successfully:", response.data);
     alert("Employee Registration Successful. Please check your mail for further steps ")
      setName("");
      setEmail("");
      setPassword("");
      setEmployeeId("");
      setMobile("");
      setRoles("warden");

    } catch (error) {
      console.error("Error submitting registration form:", error);
    }
  };

  return (
    <main className="bg-gray-300 p-8 bg ">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Employee Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-800"
              required
            />
          </div>
           <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-800">
                        Email
                      </label>
                      <input
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-800"
                        required
                      />
                    </div>
          <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800">
                        Password
                      </label>
                      <input
                        type="text"
                        value={password}
                        onChange={handlePasswordChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-800"
                        required
                      />
                    </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              EmployeeId
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={handleEmployeeIdChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Mobile
            </label>
            <input
              type="text"
              value={mobile}
              onChange={handleMobileChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800">
              Role
            </label>
            <select
              value={roles}
              onChange={handleRolesChange}
              className="mt-1 p-2 w-full border border-gray-300 text-gray-800 rounded"
              required
            >
              <option value="warden">Warden</option>
              <option value="securityGuard">SecurityGuard</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Form
          </button>
        </form>
      </div>
    </main>
  );
};

export default EmployeeForm;

