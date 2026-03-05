import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

export default function MyTasks() {

const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

/* FETCH TASKS */

useEffect(() => {

const fetchMyTasks = async () => {

try {
    const response = await API.get("/tasks/myTask");
    setTasks(response.data.tasks || []);
}
catch (error) {
toast.error(
    error.response?.data?.message ||"Failed to load tasks"
);
}

finally {
    setLoading(false);
}

};
fetchMyTasks();
}, []);

/* UI */

return (

<div className="mt-6">
    {/* LOADING */}
    {loading && (
        <p className="text-center mt-20 text-gray-500">
            Loading tasks...
        </p>
    )}
    {/* EMPTY */}
    {!loading && tasks.length === 0 && (
        <p className="text-center mt-20 text-gray-500">
            No tasks found
        </p>
    )}
    {/* TASK LIST */}
    {!loading && tasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
                <TaskCard
                key={task._id}
                task={task}/>
            ))}
        </div>
    )}
</div>

);
}