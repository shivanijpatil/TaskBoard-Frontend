// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       email,
//       password,
//     };

//     try {
//       const response = await axios.post(
//         "https://kazam-ev-backend.vercel.app/user/login",
//         payload
//       );
//       const { token, userId } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", userId);

//       toast.success(response.data.message);
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-[90vh]">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-gray-600 text-sm font-medium">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-2 border rounded-md outline-none"
//             />
//           </div>
//           <div className="relative">
//             <label className="block text-gray-600 text-sm font-medium">
//               Password <span className="text-red-500">*</span>
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-2 border rounded-md outline-none tracking-wider"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-3 top-5 pr-0 flex items-center text-sm leading-5"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           <button
//             type="submit"
//             className="w-full p-2 bg-[#6261fd] hover:bg-[#4e4efa] text-white font-medium rounded-md"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Don't have an account?{" "}
//           <span
//             className="text-[#6261fd] cursor-pointer"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
     e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://taskboard-backend-kepl.onrender.com/user/login",
        payload
      );

  //  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1c2VySWQiOiI2N2E1YzY1ODg0ZDRjZ";
  //  const userId = "67a5c65884d4cd8b172466d3";

    const { token, userId } = response.data;

 

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      navigate("/");
    }
  
  // navigate("/Tasks");
};

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">
      <div className="bg-white bg-opacity-20 md:bg-opacity-0  p-8 rounded-2xl shadow-xl w-96 border border-white/30">
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
            Sign In
          </button>
        </form>
        <p className="text-sm text-center mt-5 text-white">
          Don't have an account?{" "}
          <span
            className="text-[#ff9f43] font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
