import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../components/SideBar";
import DashBoardHeader from "../components/DashBoardHeader";


export default function DashBoard(){

const location = useLocation();
const navigate = useNavigate();


// ⭐ map config

const headerConfig = {

"/dashboard/feed":{

title:"Task Feed",

subtitle:"Find tasks that need help",

showButton:false

},

"/dashboard/my-tasks":{

title:"My Tasks",

subtitle:"Manage your posted tasks",

showButton:true,

buttonText:"Add Task",

onButtonClick:()=>navigate("/dashboard/add-task")

},

"/dashboard/add-task":{

title:"Add Task",

subtitle:"Create a new task",

showButton:false

},

"/dashboard/my-requests":{

title:"My Requests",

subtitle:"Track your task requests",

showButton:false

},

"/dashboard/settings":{

title:"Settings",

subtitle:"Manage your account",

showButton:false

}

};


// default

const header = headerConfig[location.pathname] || {

title:"Dashboard",

subtitle:"Welcome to HireHelper",

showButton:false

};



return(

<div className="flex bg-gray-100">


{/* Sidebar */}

<Sidebar />


{/* Main */}

<div className="flex-1 ml-50 min-h-screen ">


{/* Header */}

<DashBoardHeader

title={header.title}

subtitle={header.subtitle}

showButton={header.showButton}

buttonText={header.buttonText}

onButtonClick={header.onButtonClick}

/>


{/* Page Content */}

<Outlet />


</div>


</div>

);

}