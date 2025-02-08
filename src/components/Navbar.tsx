import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/10  shadow-md z-50 bg-gradient-to-r from-blue-500 to-indigo-500 ">
      <div className="container w-11/12 md:w-10/12 mx-auto flex justify-between items-center py-4">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-clip-text  bg-gradient-to-r from-blue-500 to-indigo-500"
        >
          TaskBoard
        </Link>


        <div className="hidden md:flex space-x-6 items-center  ">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/20"
              >
                Tasks
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/20 "
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800/90 absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="text-white text-lg"
                onClick={() => setIsOpen(false)}
              >
                Tasks
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-white bg-red-500 px-6 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-lg"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
