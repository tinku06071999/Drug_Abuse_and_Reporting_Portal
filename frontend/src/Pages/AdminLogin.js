import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin } from "./../api/adminApi";
import { setAuthToken } from "./../api/apiClient";

const AdminLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {

    const payload = {
    email,
    password
    };

    try {
      const res = await loginAdmin(payload);
      setAuthToken(res.data);
      alert("Login Successful!");

      navigate("/admin/Dashboard",{replace: true});
    } 
    catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      console.error("Login error:", msg);
      alert("Login Failed\n" + msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300 bg">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-gray-500 text-2xl font-semibold mb-6">Admin Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded text-gray-800"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <div className="flex">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded text-gray-800"
            />
            <button
              className="ml-2 text-gray-500 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '🔐'}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/employeeregister" className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;