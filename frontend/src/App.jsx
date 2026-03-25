import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaRegCircle, FaCheckCircle, FaTasks, FaEdit, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [color, setColor] = useState("gray");
  const [loading, setLoading] = useState(false);

  // Edit state
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editColor, setEditColor] = useState("gray");

  // Filter state
  const [filterColor, setFilterColor] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/tasks";

  const colorStyles = {
    red:    { text: "text-red-400",    border: "border-red-400"    },
    blue:   { text: "text-blue-500",   border: "border-blue-500"   },
    green:  { text: "text-green-400",  border: "border-green-400"  },
    yellow: { text: "text-yellow-400", border: "border-yellow-400" },
    pink:   { text: "text-pink-500",   border: "border-pink-500"   },
    gray:   { text: "text-gray-400",   border: "border-gray-400"   },
  };

  const colors = ["red", "blue", "green", "yellow", "pink", "gray"];

  const bgColors = {
    red:    "bg-red-500",
    blue:   "bg-blue-500",
    green:  "bg-green-500",
    yellow: "bg-yellow-500",
    pink:   "bg-pink-500",
    gray:   "bg-gray-300",
  };

  // GET - Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (error) {
      toast.error("Backend hors ligne ou erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // POST - Create a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      toast.warning("Please write a task first");
      return;
    }
    try {
      await axios.post(API_URL, { task, color });
      setTask("");
      setColor("gray");
      fetchTasks();
      toast.success("Task created successfully");
    } catch (error) {
      toast.error("Error creating task");
    }
  };

  // DELETE - Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  // PUT - Toggle taskDone
  const handleToggle = async (t) => {
    try {
      await axios.put(`${API_URL}/${t._id}`, { taskDone: !t.taskDone });
      fetchTasks();
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  // PUT - Update task (edit)
  const handleEdit = (t) => {
    setEditId(t._id);
    setEditTask(t.task);
    setEditColor(t.color);
  };

  const handleEditSubmit = async (id) => {
    if (!editTask.trim()) {
      toast.warning("Task cannot be empty");
      return;
    }
    try {
      await axios.put(`${API_URL}/${id}`, { task: editTask, color: editColor });
      setEditId(null);
      setEditTask("");
      setEditColor("gray");
      fetchTasks();
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTask("");
    setEditColor("gray");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchColor = filterColor === "all" || t.color === filterColor;
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "done" && t.taskDone) ||
      (filterStatus === "pending" && !t.taskDone);
    return matchColor && matchStatus;
  });

  // Count
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.taskDone).length;
  const remainingTasks = totalTasks - doneTasks;

  return (
    <div className="py-20 px-10 min-h-screen w-full bg-gray-900 flex items-center justify-center text-white">

      {/* Container */}
      <div className="w-250">

        {/* Header */}
        <div className="bg-gray-800 w-full h-fit p-5 rounded-xl flex items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl mb-2">Codiarc Planner</h1>
            <p className="text-sm text-zinc-400">
              Use this app to remember whatever you want to do
            </p>
            {/* Compteur */}
            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-zinc-400">{totalTasks} total</span>
              <span className="text-green-400">{doneTasks} done</span>
              <span className="text-yellow-400">{remainingTasks} remaining</span>
            </div>
          </div>
          <div className="text-5xl text-gray-400">
            <FaTasks />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 flex justify-between gap-5 p-5 rounded-xl mt-3 w-full">
          <input
            type="text"
            placeholder="Write your task here ..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="px-3 py-2 bg-gray-900 w-full rounded-md outline-0"
          />

          {/* Colors */}
          <div className="flex items-center gap-4">
            {colors.map((c) => (
              <label key={c} className="cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={c}
                  checked={color === c}
                  onChange={(e) => setColor(e.target.value)}
                  className="hidden"
                />
                <span className={`w-6 h-6 rounded-full ${bgColors[c]} block ${color === c ? "border-2 border-white" : "border-2 border-transparent"}`}>
                </span>
              </label>
            ))}
          </div>

          <button type="submit" className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md cursor-pointer whitespace-nowrap">
            Submit
          </button>
        </form>

        {/* Filters */}
        <div className="flex gap-3 mt-3 flex-wrap">

          {/* Filter by status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded-md outline-0 cursor-pointer"
          >
            <option value="all">All tasks</option>
            <option value="done">Done</option>
            <option value="pending">Pending</option>
          </select>

          {/* Filter by color */}
          <select
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded-md outline-0 cursor-pointer"
          >
            <option value="all">All colors</option>
            {colors.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-zinc-500 mt-10 animate-pulse">Loading tasks...</p>
        )}

        {/* Tasks */}
        {!loading && (
          <ul className="flex flex-col gap-2 w-full mt-3">
            {filteredTasks.map((t) => (
              <li key={t._id} className={`w-full bg-gray-950 px-6 py-5 rounded-xl flex justify-between gap-4 ${t.taskDone ? "opacity-50" : ""}`}>

                {/* Edit mode */}
                {editId === t._id ? (
                  <div className="flex flex-col gap-3 w-full">
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      className="px-3 py-2 bg-gray-800 rounded-md outline-0 w-full text-white"
                    />
                    {/* Edit colors */}
                    <div className="flex items-center gap-3">
                      {colors.map((c) => (
                        <label key={c} className="cursor-pointer">
                          <input
                            type="radio"
                            name="editColor"
                            value={c}
                            checked={editColor === c}
                            onChange={(e) => setEditColor(e.target.value)}
                            className="hidden"
                          />
                          <span className={`w-5 h-5 rounded-full ${bgColors[c]} block ${editColor === c ? "border-2 border-white" : "border-2 border-transparent"}`}>
                          </span>
                        </label>
                      ))}
                    </div>
                    {/* Edit buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSubmit(t._id)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm cursor-pointer">
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm cursor-pointer">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Content */}
                    <div className={`border-l-4 ${colorStyles[t.color]?.border} pl-3 rounded-md`}>
                      <p className={`text-xl mb-1 ${t.taskDone ? "line-through text-zinc-500" : ""}`}>
                        {t.task}
                      </p>
                      <span className="text-sm text-zinc-400">Created On</span>{" "}
                      <span className={`text-sm ${colorStyles[t.color]?.text}`}>
                        {new Date(t.createdAt).toLocaleDateString("en-US", { weekday: "long" })}
                      </span>{" "}
                      <span className={`text-sm ${colorStyles[t.color]?.text}`}>
                        {new Date(t.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                        {" - "}
                        {new Date(t.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(t)}
                        className="text-yellow-400 cursor-pointer hover:text-yellow-300">
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-500 cursor-pointer hover:text-red-400">
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleToggle(t)}
                        className={`cursor-pointer text-lg ${t.taskDone ? "text-green-400" : "text-gray-400"}`}>
                        {t.taskDone ? <FaCheckCircle /> : <FaRegCircle />}
                      </button>
                    </div>
                  </>
                )}

              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {!loading && filteredTasks.length === 0 && (
          <p className="text-center text-zinc-500 mt-10">No tasks found.</p>
        )}

      </div>

      <ToastContainer />

    </div>
  );
};

export default App;