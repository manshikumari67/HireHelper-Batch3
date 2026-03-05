import { Link, useLocation, useNavigate } from "react-router-dom";

import {

FiHome,
FiList,
FiPlus,
FiSend,
FiSettings,
FiLogOut

} from "react-icons/fi";


export default function Sidebar() {

const navigate = useNavigate();

const location = useLocation();


const handleLogout = () => {

localStorage.removeItem("token");
localStorage.removeItem("email");

navigate("/login");

};


const menu = [

{
name:"Feed",
path:"/dashboard/feed",
icon:<FiHome/>
},

{
name:"My Tasks",
path:"/dashboard/my-tasks",
icon:<FiList/>
},

{
name:"Add Task",
path:"/dashboard/add-task",
icon:<FiPlus/>
},

{
name:"My Requests",
path:"/dashboard/my-requests",
icon:<FiSend/>
},

{
name:"Settings",
path:"/dashboard/settings",
icon:<FiSettings/>
}

];


return (

<div className="w-55 bg-white border-r h-screen fixed left-0 top-0 flex flex-col justify-between">


{/* TOP */}

<div>


{/* LOGO */}

<h1 className="text-xl font-bold text-blue-600 p-6">

Hire-a-Helper

</h1>


{/* MENU */}

<nav className="px-4 space-y-2">

{menu.map(item => (

<Link

key={item.name}

to={item.path}

className={`flex items-center gap-3 p-3 rounded-lg transition

${location.pathname === item.path

?

"bg-blue-100 text-blue-600 font-medium"

:

"text-gray-600 hover:bg-gray-100"}

`}

>

{item.icon}

{item.name}

</Link>

))}

</nav>


</div>



{/* BOTTOM */}

<div className="p-4 border-t">


{/* PROFILE */}

<div className="flex items-center gap-3 mb-4">

<div className="w-10 h-10 bg-gray-300 rounded-full"/>

<div>

<p className="text-sm font-semibold">

User

</p>

<p className="text-xs text-gray-500">

{localStorage.getItem("email")}

</p>

</div>

</div>


{/* LOGOUT */}

<button

onClick={handleLogout}

className="flex items-center gap-2 text-red-500 hover:text-red-600"

>

<FiLogOut/>

Logout

</button>


</div>


</div>

);

}