import {FiMapPin,FiClock} from "react-icons/fi";

export default function TaskCard({
    task,
    showRequest,
    onRequest
}) {

    const formatDate = (date) => {
        if (!date) return "No date";
        const d = new Date(date);
        if (isNaN(d)) return "Invalid date";
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
};

const formatTime = (date) => { 
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return "";
    return d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
};



/* ---------------------------- STATUS COLOR ----------------- */
const getStatusColor = () => {
    switch(task.status){
        case "active":
            return "bg-green-100 text-green-600";
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "completed":
            return "bg-blue-100 text-blue-600";
        default:
            return "bg-gray-100 text-gray-600";
    }
};

return (

<div className="ml-10 bg-white w-80 rounded-xl shadow hover:shadow-lg transition overflow-hidden border">
    {/* IMAGE */}
    {task.picture && (
        <img
        src={task.picture}
        alt="task"
        className="w-full h-44 object-cover"/>
    )}
    
    <div className="p-4">
        {/* CATEGORY + STATUS */}
        <div className="flex justify-between items-center mb-2">
            {/* CATEGORY */}
            {task.category && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md font-medium capitalize">
                    {task.category}</span>
            )}
            {/* STATUS */}
            {task.status && (
                <span className={`text-xs px-2 py-1 rounded-md font-medium capitalize ${getStatusColor()}`}>
                    {task.status}</span>
            )}
        </div>
        {/* TITLE */}
        <h3 className="font-semibold text-lg text-gray-800">
            {task.title}
        </h3>
        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {task.description}
        </p>
        {/* LOCATION */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
            <FiMapPin size={15}/>
            <span>{task.location}</span>
        </div>
        {/* DATE + TIME */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <FiClock size={15}/>
            <span>{formatDate(task.start_time)}{" • "}{formatTime(task.start_time)}
                {task.end_time && (<>{" - "}{formatTime(task.end_time)}</>)}
            </span>
        </div>
        {/* REQUEST BUTTON */}
        {showRequest && (
            <button
            onClick={() => onRequest(task._id)}
            className="bg-green-600 text-white w-full mt-4 py-2 rounded-lg hover:bg-green-800 transition font-medium"
            >
                Request 
            </button>
       )}
    </div>

</div>

);

}