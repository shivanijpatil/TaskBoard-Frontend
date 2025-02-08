import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface TaskFormProps {
  task: { _id: string; title: string; description: string } | null | undefined;
  fetchTasks: () => void;
  closeModal: () => void;
}

const TaskForm = ({ fetchTasks, closeModal, task }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);



  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first");
    return;
  }

  const payload = {
    title,
    description,
  };

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };

  try {
    if (task) {
      const response = await axios.put(
        `https://taskboard-backend-kepl.onrender.com/tasks/update/${task._id}`,
        payload,
        config
      );
      toast.success(response.data.message);
    } else {
      const response = await axios.post(
        "https://taskboard-backend-kepl.onrender.com/tasks/create",
        payload,
        config
      );
      toast.success(response.data.message);
    }
    fetchTasks();
    closeModal();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Error managing task");
    }
  }
};


  return (
   
    <form onSubmit={handleSubmit} className=" p-8  max-w-md mx-auto space-y-6">
  <h2 className="text-3xl font-bold text-gray-900 text-center">
    {task ? "Update Task" : "Create New Task"}
  </h2>

  <div className="space-y-2">
    <label className="block text-gray-600 font-medium">Title</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className="w-full p-3 border border-gray-300 rounded-lg outline-none bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
      placeholder="Enter task title"
    />
  </div>

  <div className="space-y-2">
    <label className="block text-gray-600 font-medium">Description</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className="w-full p-3 border border-gray-300 rounded-lg outline-none bg-gray-50 resize-none h-32 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
      placeholder="Enter task description"
    ></textarea>
  </div>

  <button
    type="submit"
    className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
  >
    {task ? "Update Task" : "Create Task"}
  </button>
</form>

  );
};

export default TaskForm;
