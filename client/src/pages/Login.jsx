import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "https://task-manager-zhnr.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Login Failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-5xl shadow-lg">
            👤
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Task Manager
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Welcome Back 👋
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-3 text-lg"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center text-sm mb-5">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember Me
            </label>

            <span className="text-indigo-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-gray-600 mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;