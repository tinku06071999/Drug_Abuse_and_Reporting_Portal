import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../../api/userApi";


const UserSignup = () => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const[department, setDepartment] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@nith.ac.in")) {
      alert("Please use your college email ending with @nith.ac.in");
      return;
    }

    const payload = {
    userId : rollNo,
    username:name,
    email:email,
    password:password,
    mobile: mobile,
    department:department
    };

    try {
      setLoading(true);

      const res = await signupUser(payload);

      if (res.data === true) {
        alert("Signup successful! Please login now");
        navigate("/user-login");
      } else {
        alert(res.data);
        alert("Signup failed");
      }

    } catch (error) {
      console.error("Signup error:", error);

      // ✅ show proper error even when response is not there
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Signup failed. Please try again.";

      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-start justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow border mt-10 p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6 md:mb-8">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

          <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                      />
                    </div>
          <div>
          <div>
                      <label htmlFor="rollNo" className="block mb-2 text-sm font-medium text-gray-900">
                        Roll No.
                      </label>
                      <input
                        type="text"
                        id="rollNo"
//                        placeholder="John Doe"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
                      />
                    </div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="abcd@nith.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            />
          </div>
<div>
            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              placeholder="1234567890"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            />
          </div>
<div>
            <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">
              Department
            </label>
            <input
              type="text"
              id="department"
              placeholder="Computer Science"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2
              ${loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed border-gray-300"
                : "text-white bg-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600 border-blue-600"
              }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm font-light text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/userLogin" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default UserSignup;