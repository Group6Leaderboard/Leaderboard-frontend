import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import AdminDashboard from "../Pages/AdminDashboard";
import MentorDashboard from "../Pages/MentorDashboard";
import StudentDashboard from "../Pages/StudentDashboard";
import CollegeDashboard from "../Pages/CollegeDashboard";
import AssignForm from "../Components/AssignForm/AssignForm";
import SubmittedTask from "../Components/SubmittedTask/SubmittedTask";
import NotFound from "../Components/NotFound/NotFound";
import ProtectedRoute from "../Components/ProtectedRoute";
import MentorTaskView from "../Components/MentorTaskView/MentorTaskView";

const DashboardRoutes = () => {
  return (

      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Routes>
                <Route path="" element={<AdminDashboard />} />
                <Route path="students" element={<AdminDashboard />} />
                <Route path="mentors" element={<AdminDashboard />} />
                <Route path="colleges" element={<AdminDashboard />} />
                <Route path="assign-project" element={<AssignForm role="admin" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Mentor Routes */}
        <Route
          path="/mentor/*"
          element={
            <ProtectedRoute allowedRoles={["mentor"]}>
              <Routes>
                <Route path="" element={<MentorDashboard />} />
                <Route path="assign-task" element={<AssignForm role="mentor" />} />
                <Route path="projects" element={<MentorDashboard />} />
                <Route path="task" element={<MentorTaskView />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Routes>
                <Route path="" element={<StudentDashboard />} />
                <Route path="projects" element={<StudentDashboard />} />
                <Route path="tasks" element={<StudentDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* College Routes (optional role check) */}
        <Route
          path="/college/*"
          element={
            <ProtectedRoute allowedRoles={["college"]}>
              <Routes>
                <Route path="" element={<CollegeDashboard />} />
                <Route path="projects" element={<CollegeDashboard />} />
                <Route path="students" element={<CollegeDashboard />} />
                <Route path="leaderboard" element={<CollegeDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default DashboardRoutes;
