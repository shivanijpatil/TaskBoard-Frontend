import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import calendarIcon from "../assets/calendar.png";
import checkedIcon from "../assets/checked.png";
import pendingIcon from "../assets/pending.png";
import { useState } from "react";
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

const TaskList = ({
  tasks,
  fetchTasks,
  onEdit,
}: {
  tasks: Task[];
  fetchTasks: () => void;
  onEdit: (task: Task) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // const handleMarkCompleted = async (task: Task) => {

  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) return console.error("No token found, please log in.");

  //     await axios.put(
  //       `https://taskboard-backend-kepl.onrender.com/tasks/complete/${task._id}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (!task.completed) {
  //       toast.success(`Task "${task.title}" marked as completed.`);
  //     } else {
  //       toast.warn(`Task "${task.title}" marked as incomplete.`);
  //     }

  //     fetchTasks();
  //   } catch (error) {
  //     console.error("Error marking task as completed", error);
  //   }
  // };

  const handleMarkCompleted = async (task: Task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      await axios.put(
        `https://taskboard-backend-kepl.onrender.com/tasks/complete/${task._id}`,
        {},  // Empty body
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (!task.completed) {
        toast.success(`Task "${task.title}" marked as completed.`);
      } else {
        toast.warn(`Task "${task.title}" marked as incomplete.`);
      }

      fetchTasks();
    } catch (error) {
      toast.error("Error updating task status");
    }
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  // const confirmDelete = async () => {
  //   if (!taskToDelete) return;

  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("No token found, please log in.");
  //       return;
  //     }

  //     const response = await axios.delete(
  //       `https://taskboard-backend-kepl.onrender.com/tasks/delete/${taskToDelete._id}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     toast.success(response.data.message);
  //     fetchTasks();
  //     setIsDeleteModalOpen(false);
  //     setTaskToDelete(null);
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };

  //   const confirmDelete = async (task: Task) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       toast.error("Please login first");
  //       return;
  //     }

  //     const response = await axios.delete(
  //       `https://taskboard-backend-kepl.onrender.com/tasks/delete/${task._id}`,
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         },
  //         withCredentials: true
  //       }
  //     );

  //     toast.success(response.data.message);
  //     fetchTasks();
  //   } catch (error) {
  //     toast.error("Error deleting task");
  //   }
  // };
  const confirmDelete = async () => {
    if (!taskToDelete) return; // Ensure a task is selected

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await axios.delete(
        `https://taskboard-backend-kepl.onrender.com/tasks/delete/${taskToDelete._id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      toast.success(response.data.message);
      fetchTasks();
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  return (
    <div className="mt-10 pb-10 px-3">
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40">
          <h1 className="text-2xl font-bold text-gray-700">No tasks added yet</h1>
          <p className="text-gray-500 mt-2">Start by adding your first task!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...tasks]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 relative w-[98%] md:w-[92%] lg:w-[88%] mx-auto"
              >
                <div>
                  <p className="font-semibold text-lg text-gray-900">{task.title}</p>
                  <p className="text-gray-600 text-sm mt-2">{task.description}</p>
                </div>

                <div className="flex items-center justify-between mt-5 flex-wrap">
                  {/* Task Date */}
                  <div className="flex items-center space-x-2 text-gray-500 text-[12px]">
                    <img className="w-4" src={calendarIcon} alt="calendar-icon" />
                    <p>
                      {new Date(task.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => onEdit(task)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
                    >
                      <img className="w-5" src={editIcon} alt="edit-icon" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(task)}
                      className="p-2 hover:bg-red-100 rounded-lg transition duration-200"
                    >
                      <img className="w-5" src={deleteIcon} alt="delete-icon" />
                    </button>
                    <button
                      onClick={() => handleMarkCompleted(task)}
                      className={`p-2 rounded-lg transition duration-200 ${task.completed ? "hover:bg-green-200" : "hover:bg-yellow-200"
                        }`}
                    >
                      <img
                        className="w-5"
                        src={task.completed ? checkedIcon : pendingIcon}
                        alt="status-icon"
                      />
                    </button>
                  </div>
                </div>

                {/* Task Completion Status */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${task.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-lg font-bold text-gray-800">Confirm Delete</h2>
        <p className="mt-2 text-gray-600">
          Are you sure you want to delete <b>{taskToDelete?.title}</b>?
        </p>
        <div className="flex justify-end mt-4 space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>



  );
};

export default TaskList;
