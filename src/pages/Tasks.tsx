// import { useCallback, useEffect, useState } from "react";
// import TaskList from "./TaskList";
// import TaskForm from "./TaskForm";
// import Modal from "../components/Modal";
// import axios from "axios";
// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   completed: boolean;
//   createdAt: string;
// }

// const Tasks = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tasksPerPage] = useState(10);

//   const handleEditTask = (task: Task) => {
//     setSelectedTask(task);
//     setIsModalOpen(true);
//   };

//   const fetchTasks = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get(
//         "https://kazam-ev-backend.vercel.app/tasks/mytasks",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   // Get current tasks
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

//   // Go to next page
//   const nextPage = () => {
//     if (currentPage < Math.ceil(tasks.length / tasksPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Go to previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto mt-10 pt-20">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl md:text-3xl font-bold">Tasks</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-[#6261fd] hover:bg-[#4e4efa] text-white font-medium px-6 py-2 rounded-md"
//         >
//           New Task +
//         </button>
//       </div>

//       <TaskList
//         tasks={currentTasks}
//         fetchTasks={fetchTasks}
//         onEdit={handleEditTask}
//       />

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 space-x-2">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 rounded-md text-sm font-medium ${
//             currentPage === 1
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-[#6261fd] text-white hover:bg-[#4e4efa]"
//           }`}
//         >
//           Prev
//         </button>

//         <button className="px-4 py-2 rounded-md text-sm font-medium bg-[#6261fd] text-white cursor-default">
//           {currentPage}
//         </button>

//         <button
//           onClick={nextPage}
//           disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
//           className={`px-4 py-2 rounded-md text-sm font-medium ${
//             currentPage === Math.ceil(tasks.length / tasksPerPage)
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-[#6261fd] text-white hover:bg-[#4e4efa]"
//           }`}
//         >
//           Next
//         </button>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedTask(null);
//         }}
//       >
//         <TaskForm
//           fetchTasks={fetchTasks}
//           closeModal={() => setIsModalOpen(false)}
//           task={selectedTask}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Tasks;
// import { useCallback, useEffect, useState } from "react";
// import TaskList from "./TaskList";
// import TaskForm from "./TaskForm";
// import Modal from "../components/Modal";
// import axios from "axios";

// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   completed: boolean;
//   createdAt: string;
// }

// const Tasks = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [tasksPerPage] = useState(10);

//   const handleEditTask = (task: Task) => {
//     setSelectedTask(task);
//     setIsModalOpen(true);
//   };

//   const fetchTasks = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get(
//         "https://kazam-ev-backend.vercel.app/tasks/mytasks",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   // Get current tasks
//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

//   // Go to next page
//   const nextPage = () => {
//     if (currentPage < Math.ceil(tasks.length / tasksPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Go to previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="w-10/12 md:w-9/12 lg:w-7/12 mx-auto mt-12 pt-16">
//       <div className="flex justify-between items-center bg-gradient-to-r from-teal-500 to-green-500 p-6 rounded-xl shadow-lg">
//         <h1 className="text-3xl font-bold text-white">Your Tasks</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-300"
//         >
//           Add Task +
//         </button>
//       </div>

//       <TaskList
//         tasks={currentTasks}
//         fetchTasks={fetchTasks}
//         onEdit={handleEditTask}
//       />

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 space-x-3">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//             currentPage === 1
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-indigo-500 text-white hover:bg-indigo-600"
//           }`}
//         >
//           Prev
//         </button>

//         <button className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-500 text-white cursor-default">
//           {currentPage}
//         </button>

//         <button
//           onClick={nextPage}
//           disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
//           className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//             currentPage === Math.ceil(tasks.length / tasksPerPage)
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-indigo-500 text-white hover:bg-indigo-600"
//           }`}
//         >
//           Next
//         </button>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedTask(null);
//         }}
//       >
//         <TaskForm
//           fetchTasks={fetchTasks}
//           closeModal={() => setIsModalOpen(false)}
//           task={selectedTask}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Tasks;

import { useCallback, useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Modal from "../components/Modal";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const fetchTasks = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://taskboard-backend-kepl.onrender.com/tasks/mytasks",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Pagination control
  const nextPage = () => {
    if (currentPage < Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-10/12 md:w-9/12 lg:w-7/12 mx-auto mt-12 pt-16  rounded-xl">

      {/* Header Section */}
      <div className="flex justify-between items-center p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-300"
        >
          Add Task +
        </button>
      </div>


      {/* Task List */}
      <TaskList
        tasks={currentTasks}
        fetchTasks={fetchTasks}
        onEdit={handleEditTask}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4 ">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition duration-300 ${currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          Prev
        </button>

        <span className="px-6 py-3 text-sm font-medium bg-blue-600 text-white rounded-lg cursor-default">
          {currentPage}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
          className={`px-6 py-3 rounded-lg text-sm font-medium transition duration-300 ${currentPage === Math.ceil(tasks.length / tasksPerPage)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          Next
        </button>
      </div>

      {/* Modal for Task Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
      >
        <TaskForm
          fetchTasks={fetchTasks}
          closeModal={() => setIsModalOpen(false)}
          task={selectedTask}
        />
      </Modal>
    </div>
  );
};

export default Tasks;
