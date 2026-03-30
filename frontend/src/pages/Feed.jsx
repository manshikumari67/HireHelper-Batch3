import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

export default function Feed() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);
  const [requestedTasks, setRequestedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks/allTasks");
        setTasks(res.data.tasks || []);
      } catch {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleRequest = async (taskId) => {
    try {
      setRequestingId(taskId);

      await API.post("/requests/send", { task_id: taskId });

      setRequestedTasks((prev) => [...prev, taskId]);
      toast.success("Request sent");

    } catch {
      toast.error("Request failed");
    } finally {
      setRequestingId(null);
    }
  };

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Task Feed</h1>
        <p className="text-gray-500 text-sm">
          Browse tasks and send requests
        </p>
      </div>

      {loading && <p className="text-center mt-20 text-gray-500">Loading...</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-center mt-20 text-gray-500">No tasks available</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            showRequest
            onRequest={handleRequest}
            requestingId={requestingId}
            isRequested={requestedTasks.includes(task._id)}
          />
        ))}
      </div>

    </div>
  );
}