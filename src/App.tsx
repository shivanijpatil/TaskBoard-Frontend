import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/routes";

function App() {
  return (
   <div className="bg-[#E0DADD] min-h-screen flex flex-col">
  <Navbar />

  <main className="flex-grow pt-5">
    <AppRoutes />
  </main>

  <ToastContainer
    toastClassName="font-quicksand text-gray-800 font-medium bg-white shadow-md rounded-lg"
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
  />
</div>

  );
}

export default App;
