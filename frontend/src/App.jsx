import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/landing/Navbar";
import Login from "./pages/login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import DashBoard from "./pages/DashBoard";

import Feed from "./pages/Feed";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";

import Requests from "./pages/Requests";
import MyRequests from "./pages/MyRequests";

import Settings from "./pages/Settings";

import ChangePasswordEmail from "./pages/ChangePasswordEmail";
import ChangePasswordOTP from "./pages/ChangePasswordOTP";
import ChangePasswordNew from "./pages/ChangePasswordNew";

import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";

import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";

// 🔥 NEW IMPORT (IMPORTANT)
import DashboardHome from "./pages/DashBoardHome";

function App() {

  const location = useLocation();

  // hide navbar on all dashboard routes
  const hideNavbar = location.pathname.startsWith("/dashboard");

  return (
    <div>

      {/* Navbar */}
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* 🔹 PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* 🔥 DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        >
          {/* ✅ DEFAULT PAGE (MOST IMPORTANT 🔥) */}
          <Route index element={<DashboardHome />} />

          <Route path="feed" element={<Feed />} />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="requests" element={<Requests />} />
          <Route path="myRequests" element={<MyRequests />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 🔹 CHANGE PASSWORD */}
        <Route path="/change-password/email" element={<ChangePasswordEmail />} />
        <Route path="/change-password/otp" element={<ChangePasswordOTP />} />
        <Route path="/change-password/new" element={<ChangePasswordNew />} />

        {/* 🔹 FORGOT PASSWORD */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />

      </Routes>

    </div>
  );
}

export default App;