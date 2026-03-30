import { FaUser } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function RequestCard({
  request,
  onAccept,
  onReject,
  onComplete,
  loadingId
}) {

  const task = request.task_id;
  const user = request.requester_id;

  const isLoadingRequest = loadingId === request._id;
  const isLoadingTask = loadingId === task?._id;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6">

      {/* TOP */}
      <div className="flex justify-between items-start">

        {/* LEFT */}
        <div className="flex gap-4">

          {/* Avatar */}
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-sm" />
          </div>

          {/* INFO */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {user?.first_name} {user?.last_name}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              Requesting:{" "}
              <span className="font-medium text-gray-900">
                {task?.title}
              </span>
            </p>

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

      {/* MESSAGE */}
      <div className="bg-gray-50 rounded-xl p-4 mt-4">
        <p className="text-gray-700 text-sm">
          {task?.description || "No description"}
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 mt-5">

        {/* 🟡 PENDING */}
        {request.status === "pending" && (
          <>
            <button
              disabled={isLoadingRequest}
              onClick={() => onReject(request._id)}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200 disabled:opacity-50"
            >
              {isLoadingRequest ? "..." : "Reject"}
            </button>

            <button
              disabled={isLoadingRequest}
              onClick={() => onAccept(request._id, task?._id)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoadingRequest ? "..." : "Accept"}
            </button>
          </>
        )}

        {/* 🟢 ACCEPTED → SHOW COMPLETE */}
        {request.status === "accepted" && task?.status !== "completed" && (
          <button
            disabled={isLoadingTask}
            onClick={() => onComplete(task?._id)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
          >
            {isLoadingTask ? "..." : "Mark Completed"}
          </button>
        )}

        {/* ✅ COMPLETED */}
        {task?.status === "completed" && (
          <span className="text-green-600 font-medium text-sm">
            ✅ Task Completed
          </span>
        )}

      </div>
    </div>
  );
}