import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

export default function AddTask() {
    const navigate = useNavigate();
    const fileRef = useRef();
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        location: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        picture: null
    });
    
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

 /* -------------------------- HANDLE INPUT --------------------------*/
    const handleInput = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };

 /* -------------------------- HANDLE IMAGE --------------------------*/
    const handleImage = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return;
        }
        setTaskData(prev => ({
            ...prev,
            picture: file
        }));
        setPreview(URL.createObjectURL(file));
    };
/* -------------------------- DRAG DROP-------------------------- */
    const handleDrop = (e) => {
        e.preventDefault();
        handleImage(e.dataTransfer.files[0]);
    };
/*--------------------------REMOVE IMAGE --------------------------*/
    const removeImage = () => {
        setPreview(null);
        setTaskData(prev => ({
            ...prev,
            picture: null
        }));
    };

/* -------------------------- SUBMIT TASK -------------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", taskData.title);
            formData.append("description", taskData.description);
            formData.append("location", taskData.location);
            formData.append(
                "start_time",
                `${taskData.startDate}T${taskData.startTime}`
            );
            if (taskData.endDate && taskData.endTime) {
                formData.append("end_time",
                    `${taskData.endDate}T${taskData.endTime}`
                );
            }

            if (taskData.picture) {
                formData.append("picture", taskData.picture);
            }
            await API.post(
                "/tasks/create",
                formData
            );
            toast.success("Task created successfully");
            setTaskData({
                title: "",
                description: "",
                location: "",
                startDate: "",
                startTime: "",
                endDate: "",
                endTime: "",
                picture: null
            });
            setPreview(null);
            navigate("/dashboard/my-tasks");
        }
        catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||"Failed to create task");
        }
        finally {
            setLoading(false);
        }
    };

/* -------------------------- UI --------------------------*/
return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Create Task
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
            <input
            type="text"
            name="title"
            placeholder="Task title"
            value={taskData.title}
            onChange={handleInput}
            className="w-full border p-2 rounded"
            required/>
            
            <textarea
            name="description"
            placeholder="Description"
            value={taskData.description}
            onChange={handleInput}
            className="w-full border p-2 rounded"
            required/>
            
            <input
            type="text"
            name="location"
            placeholder="Location"
            value={taskData.location}
            onChange={handleInput}
            className="w-full border p-2 rounded"
            required/>
            
            <div className="flex gap-2">
                <input
                type="date"
                name="startDate"
                value={taskData.startDate}
                onChange={handleInput}
                className="w-full border p-2 rounded"
                required/>
                <input
                type="time"
                name="startTime"
                value={taskData.startTime}
                onChange={handleInput}
                className="w-full border p-2 rounded"
                required/>
            </div>
            <div className="flex gap-2">
                <input
                type="date"
                name="endDate"
                value={taskData.endDate}
                onChange={handleInput}
                className="w-full border p-2 rounded"
                />
                <input
                type="time"
                name="endTime"
                value={taskData.endTime}
                onChange={handleInput}
                className="w-full border p-2 rounded"
                />
            </div>
            {/* upload */}
            <div 
            onClick={() => fileRef.current.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-blue-400 p-4 rounded text-center cursor-pointer">
                {preview ? "Change image" : "Click or drag image"}
                <input
                type="file"
                hidden
                ref={fileRef}
                onChange={(e) => handleImage(e.target.files[0])}/>
            </div>
            {/* preview */}
            {preview && (
                <div className="text-center">
                    <img
                    src={preview}
                    className="h-32 mx-auto mt-2 rounded"/>
                    <button 
                    type="button"
                    onClick={removeImage}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded">
                        Remove
                    </button>
                </div>
            )}
            <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
                {loading ? "Creating..." : "Create Task"}
                </button>
            </form>
        </div>
    </div>
);
}