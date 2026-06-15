import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://task-manager-zhnr.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-red-500">
    <div className="w-[350px] backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-lg p-8">

      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-indigo-400 flex items-center justify-center text-white text-5xl">
          👤
        </div>
      </div>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Username"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-white text-gray-700 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-white text-gray-700 outline-none"
          required
        />

        <div className="flex justify-between text-xs text-white mb-5">
          <label>
            <input type="checkbox" className="mr-1" />
            Remember me
          </label>

          <span className="cursor-pointer">
            Forgot Password?
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded font-semibold tracking-wider transition"
        >
          LOGIN
        </button>
      </form>

      <p className="text-center text-white mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold">
          Register
        </Link>
      </p>
    </div>
  </div>
)};