import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate once
import { loginUser } from "../../api/userApi";
import api from "../../api/apiClient";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook here

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@nith.ac.in")) {
      alert("Please use your college email ending with @nith.ac.in");
      return;
    }

    try {
       const payload = { email, password};
       const response = await loginUser(payload);
       const token = response?.data?.token;
        if (response.status === 200 && token) {
          localStorage.setItem("token",token);
          Cookies.set("token",token,{expires:7,sameSite:"Lax"});
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          console.log("[LOGIN] Token set, navigating...");
          navigate("/userDashboard");
        } else {
        console.log(token);
         console.error("[LOGIN] Non-200 or token missing:", response?.status, response?.data);
        alert("Login failed: token missing or unexpected response format");
        }
    } catch (error) {
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
    <section className="bg-gray-50 min-h-screen flex items-start justify-center bg">
      <div className="w-full max-w-md bg-white rounded-lg shadow border mt-10">
        <div className="p-6 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-gray-900 mb-6 md:mb-8">
            Sign in to your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@nith.ac.in"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white  bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover:bg-white hover:text-blue-600  hover:border-2 hover:border-blue-600"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <Link
                to={"/userSignup"}
                className="font-medium text-primary-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;