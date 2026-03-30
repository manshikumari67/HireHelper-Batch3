import { useState } from "react";
import { FiMapPin, FiClock, FiEdit, FiTrash, FiSend } from "react-icons/fi";
import API from "../services/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function TaskCard({
  task,
  showRequest,
  onRequest,
  requestingId,
  isRequested,
  isOwner,
  onDelete,
  onUpdate
}) {

  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [form, setForm] = useState({
    ...task,
    start_time: task.start_time || "",
    end_time: task.end_time || "",
    file: null
  });

  // ✅ format datetime-local
  const formatDateTime = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16);
  };

  // 🔥 EXPIRED LOGIC
  const isExpired =
    task.end_time && new Date() > new Date(task.end_time);

  const status = isExpired ? "expired" : task.status;

  // 🔥 TIME DISPLAY FIX
  const time = task.start_time
    ? `${dayjs(task.start_time).format("DD MMM, hh:mm A")} • ${dayjs(task.start_time).fromNow()}`
    : `${dayjs(task.createdAt).fromNow()}`;

  // 🎨 STATUS COLOR
  const getStatusColor = () => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-gray-200 text-gray-700";
      case "expired":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      if (form.title) formData.append("title", form.title);
      if (form.description) formData.append("description", form.description);
      if (form.location) formData.append("location", form.location);
      if (form.start_time) formData.append("start_time", form.start_time);
      if (form.end_time) formData.append("end_time", form.end_time);

      if (form.file) {
        formData.append("picture", form.file);
      }

      const res = await API.put(`/tasks/${task._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpdate(res.data.task);
      toast.success("Task updated ✨");
      setShowModal(false);

    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // ❌ DELETE
  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      onDelete(task._id);
      toast.success("Task deleted 🗑️");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">

        {/* IMAGE */}
        <div className="h-44 w-full rounded-lg overflow-hidden mb-4">
          {task.picture ? (
            <img src={task.picture} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {task.title}
            </div>
          )}
        </div>

        {/* TITLE + STATUS */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {task.title}
          </h3>

          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
            {status}
          </span>
        </div>

        {/* DESC */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {task.description || "No description"}
        </p>

        {/* LOCATION */}
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <FiMapPin className="mr-1" />
          {task.location || "No location"}
        </div>

        {/* TIME */}
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <FiClock className="mr-1" />
          {time}
        </div>

        {/* 🔥 FEED BUTTON */}
        {showRequest && (
          <button
            disabled={
              requestingId === task._id ||
              isRequested ||
              status !== "open"
            }
            onClick={() => onRequest(task._id)}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
          >
            <FiSend size={14} />
            {isRequested
              ? "Requested"
              : requestingId === task._id
              ? "Sending..."
              : status !== "open"
              ? "Closed"
              : "Send Request"}
          </button>
        )}

        {/* OWNER BUTTONS */}
        {isOwner && (
          <div className="flex justify-end gap-3 mt-4">

            <button
              onClick={() => setShowModal(true)}
              className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg text-sm hover:bg-indigo-50 flex items-center gap-1"
            >
              <FiEdit /> Edit
            </button>

            <button
              onClick={() => setConfirmDelete(true)}
              className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-100 flex items-center gap-1"
            >
              <FiTrash /> Delete
            </button>

          </div>
        )}
      </div>

      {/* 🔥 EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[500px] shadow-lg">

            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

            {/* IMAGE */}
            <div className="flex items-center gap-4 mb-4">
              {form.picture && (
                <img src={form.picture} className="w-20 h-20 rounded-lg object-cover" />
              )}
              <input
                type="file"
                onChange={(e) =>
                  setForm({
                    ...form,
                    picture: URL.createObjectURL(e.target.files[0]),
                    file: e.target.files[0],
                  })
                }
              />
            </div>

            {/* INPUTS */}
            <input
              className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
            />

            <textarea
              className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
            />

            <input
              className="w-full border border-gray-200 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
            />

            {/* TIME */}
            <div className="grid grid-cols-2 gap-3 mb-4">

              <input
                type="datetime-local"
                className="border border-gray-200 p-2 rounded-lg"
                value={formatDateTime(form.start_time)}
                onChange={(e) =>
                  setForm({ ...form, start_time: e.target.value })
                }
              />

              <input
                type="datetime-local"
                className="border border-gray-200 p-2 rounded-lg"
                value={formatDateTime(form.end_time)}
                onChange={(e) =>
                  setForm({ ...form, end_time: e.target.value })
                }
              />

            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center">

              <button
                onClick={() => setConfirmDelete(true)}
                className="text-red-500 text-sm"
              >
                Delete Task
              </button>

              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)}>
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl text-center w-[350px]">

            <h3 className="font-semibold mb-2">
              Delete permanently?
            </h3>

            <p className="text-gray-500 mb-4 text-sm">
              Do you want to delete this task permanently?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="border px-4 py-2 rounded"
              >
                No
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}