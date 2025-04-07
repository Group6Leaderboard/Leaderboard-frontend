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

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Routes that should have the Sidebar & Navbar */}
      <Route
        path="/admin/*"
        element={
          <DashboardLayout>
            <Routes>
              <Route path="" element={<AdminDashboard />} />
              <Route path="students" element={<AdminDashboard />} />
              <Route path="mentors" element={<AdminDashboard />} />
              <Route path="colleges" element={<AdminDashboard />} />
              <Route path="assign-project" element={<AssignForm role="admin" />} />
              {/* Catch-all for invalid routes inside /admin */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        }
      />

      <Route
        path="/mentor/*"
        element={
          <DashboardLayout>
            <Routes>
              <Route path="" element={<MentorDashboard />} />
              <Route path="assign-task" element={<MentorDashboard />} />
              <Route path="projects" element={<MentorDashboard />} />
              <Route path="task" element={<SubmittedTask />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        }
      />

      <Route
        path="/student/*"
        element={
          <DashboardLayout>
            <Routes>
              <Route path="" element={<StudentDashboard />} />
              <Route path="projects" element={<StudentDashboard />} />
              <Route path="tasks" element={<StudentDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        }
      />

      <Route
        path="/college/*"
        element={
          <DashboardLayout>
            <Routes>
              <Route path="" element={<CollegeDashboard />} />
              <Route path="projects" element={<CollegeDashboard />} />
              <Route path="students" element={<CollegeDashboard />} />
              <Route path="leaderboard" element={<CollegeDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        }
      />

      {/* 🚀 Catch-all route for completely invalid URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DashboardRoutes;
