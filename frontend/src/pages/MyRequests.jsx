import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function MyRequests() {

  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests/myRequests");
      setRequests(res.data.requests);
    } catch {
      toast.error("Failed to load requests");
    }
  };

  const cancelRequest = async (id) => {
    try {
      setLoadingId(id);

      await api.delete(`/requests/cancel/${id}`);

      setRequests((prev) => prev.filter((r) => r._id !== id));

      toast.success("Request Cancelled ❌");

    } catch {
      toast.error("Cancel failed");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Requests
        </h1>
        <p className="text-gray-600 mt-1">
          Track your requests
        </p>
      </div>

      {/* EMPTY */}
      {requests.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No requests yet 🚀
        </p>
      )}

      {/* LIST */}
      <div className="space-y-5">

        {requests.map((request) => {
          const task = request.task_id;

          return (
            <div
              key={request._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
            >

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div className="flex gap-4">

                  {/* Avatar */}
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>

                  {/* INFO */}
                  <div>

                    <h3 className="font-semibold text-lg text-gray-900">
                      {task?.createdBy?.first_name} {task?.createdBy?.last_name}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Task:{" "}
                      <span className="font-medium text-gray-900">
                        {task?.title}
                      </span>
                    </p>

                    {/* TIME */}
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FiClock className="mr-1" />
                      <span>
                        {dayjs(request.createdAt).format("hh:mm A")} •{" "}
                        {dayjs(request.createdAt).fromNow()}
                      </span>
                    </div>

                  </div>
                </div>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : request.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : request.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {request.status}
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-gray-50 rounded-xl p-4 mt-4">
                <p className="text-gray-700 text-sm">
                  {task?.description}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-5">

                {/* PENDING */}
                {request.status === "pending" && (
                  <button
                    disabled={loadingId === request._id}
                    onClick={() => cancelRequest(request._id)}
                    className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200 disabled:opacity-50"
                  >
                    {loadingId === request._id ? "..." : "Cancel Request"}
                  </button>
                )}

                {/* ACCEPTED */}
                {request.status === "accepted" && (
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                  >
                    Chat 💬
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}