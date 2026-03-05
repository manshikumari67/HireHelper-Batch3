import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import DashBoard from "./pages/DashBoard";

import Feed from "./pages/Feed";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";

import ProtectedRoute from "./components/ProtectedRoute";
import HeroSection from "./components/HeroSection";

function App() {

const location = useLocation();

// hide navbar on all dashboard routes
const hideNavbar = location.pathname.startsWith("/dashboard");

return (

<>

{/* Show Navbar only when NOT dashboard */}

{!hideNavbar && <Navbar />}

<Routes>

<Route path="/" element={<HeroSection />} />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/verify" element={<VerifyOTP />} />


<Route
path="/dashboard"
element={
<ProtectedRoute>
<DashBoard />
</ProtectedRoute>
}
>

<Route path="feed" element={<Feed />} />

<Route path="my-tasks" element={<MyTasks />} />

<Route path="add-task" element={<AddTask />} />

</Route>


</Routes>

</>

);

}

export default App;