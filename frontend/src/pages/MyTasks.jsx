import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import TaskCard from "../components/TaskCard";

export default function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTasks = async () => {
    try {
      const res = await API.get("/tasks/myTask");
      setTasks(res.data.tasks || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="text-gray-500 text-sm">
          Manage your posted tasks
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center mt-20 text-gray-500 animate-pulse">
          Loading tasks...
        </p>
      )}

      {/* EMPTY */}
      {!loading && tasks.length === 0 && (
        <p className="text-center mt-20 text-gray-500">
          No tasks found 🚀
        </p>
      )}

      {/* GRID */}
      {!loading && tasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              isOwner
              onDelete={(id) =>
                setTasks((prev) => prev.filter((t) => t._id !== id))
              }
              onUpdate={(updated) =>
                setTasks((prev) =>
                  prev.map((t) => (t._id === updated._id ? updated : t))
                )
              }
            />
          ))}
        </div>
      )}

    </div>
  );
}