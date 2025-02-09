import { useCallback, useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import Modal from "../components/Modal";
import axios from "axios";
import { toast } from "react-toastify";

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
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await axios.get(
        "https://taskboard-backend-kepl.onrender.com/tasks/mytasks",
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      setTasks(response.data);
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

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
    <div className="max-w-4xl mx-auto mt-20 bg-white shadow-lg rounded-2xl p-6">
      <div className="p-6 sm:p-8 md:p-10 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              📝 Your Tasks
            </h1>
            <p className="text-gray-500 text-sm mt-1 text-center sm:text-left">
              Stay on top of your tasks effortlessly!
            </p>
          </div>

          <div className="bg-gray-100 px-6 py-3 rounded-lg shadow-sm text-gray-700 text-sm sm:w-auto w-full mt-4 sm:mt-0">
            ✅ {tasks.filter((t) => t.completed).length} Completed &bull; ⏳ {tasks.filter((t) => !t.completed).length} Pending
          </div>

          <div className="flex justify-center sm:justify-start mt-4 sm:mt-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>


      <div className="mt-6">
        <TaskList tasks={currentTasks} fetchTasks={fetchTasks} onEdit={handleEditTask} />
      </div>


      <div className="flex justify-center items-center  mt-8 space-x-4 ">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === 1
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          ⬅ Prev
        </button>

        <span className="px-6 py-2.5 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg shadow-md">
          Page {currentPage}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === Math.ceil(tasks.length / tasksPerPage)
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          Next ➡
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
      // className="transition-all duration-300 ease-in-out"
      >
        <div className="transition-all duration-300 ease-in-out"> {/* Style the content div */}
          <TaskForm fetchTasks={fetchTasks} closeModal={() => setIsModalOpen(false)} task={selectedTask} />
        </div>

      </Modal>
    </div>

  );
};

export default Tasks;
