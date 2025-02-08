import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    name,
    email,
    password,
  };

  try {
    const response = await axios.post(
      "https://taskboard-backend-kepl.onrender.com/user/signup",
      payload,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
   
    toast.success(response.data.message);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">
      <div className="bg-white bg-opacity-20 md:bg-opacity-0 backdrop-blur-md md:backdrop-blur-none p-8 rounded-2xl shadow-xl w-96 border border-white/30">
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border-none rounded-lg outline-none bg-white/20 text-white placeholder-white focus:bg-white/30 transition"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border-none rounded-lg outline-none bg-white/20 text-white placeholder-white focus:bg-white/30 transition"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-1">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border-none rounded-lg outline-none bg-white/20 text-white placeholder-white focus:bg-white/30 transition"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 top-9 text-white text-sm font-medium cursor-pointer hover:text-gray-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#ff6b6b] hover:bg-[#ff4757] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-5 text-white">
          Already have an account?{" "}
          <span
            className="text-[#ff9f43] font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

