import React, { useEffect, useState } from "react";
import nithLogo from "../Images/nith_logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [token, setToken] = useState("");
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const handleClick = () => {
    Cookies.remove("token", { path: "/" });
    console.log("Token removed");
    window.location.href = "/userLogin";
  };

  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src={nithLogo} alt="NITH Logo" className="h-20 w-20 mr-2" />
          <div className="ml-2">
            <h1 className="text-xl font-bold text-gray-500">
              National Institute of Technology Hamirpur
            </h1>
            <p className="text-sm text-gray-500">
              Drug Abuse Reporting & Prevention
            </p>
          </div>
        </div>
        {/* Menu button with dynamic icon */}
        <button className="lg:hidden bg-gray-500" onClick={toggleMenu}>
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
        {/* Navigation links */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 right-4 bg-gray-700 p-4 rounded">
            <Link to="/" className="block text-gray-300 py-2">
              Home
            </Link>
            <Link to="/adminlogin" className="block text-gray-300 py-2">
              Admin Login
            </Link>
            <Link to="/employeeregister" className="block text-gray-300 py-2">
              Register
            </Link>
            {!token ? (
              <>
                <Link to="/userLogin" className="block text-gray-300 py-2">
                  User Login
                </Link>
                <Link to="/userSignup" className="block text-gray-300 py-2">
                  User Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleClick}
                className="block text-gray-300 py-2"
              >
                logout
              </button>
            )}
          </div>
        )}
        {/* Navigation links for larger screens */}
        <div className="hidden lg:flex space-x-6 text-gray-500">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/adminlogin" className="hover:text-gray-300">
            Admin Login
          </Link>
          <Link to="/employeeregister" className="hover:text-gray-300">
            Register
          </Link>
          {!token ? (
            <>
              <Link to="/userLogin" className="hover:text-gray-300">
                User Login
              </Link>
              <Link to="/userSignup" className="hover:text-gray-300">
                User Signup
              </Link>
            </>
          ) : (
            <button onClick={handleClick} className="hover:text-gray-300">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;