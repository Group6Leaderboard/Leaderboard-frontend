import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import AdminDashboard from "../Pages/AdminDashboard";
import MentorDashboard from "../Pages/MentorDashboard";
import StudentDashboard from "../Pages/StudentDashboard";
import CollegeDashboard from "../Pages/CollegeDashboard";
import AssignForm from "../Components/AssignForm/AssignForm";

import NotFound from "../Components/NotFound/NotFound";
import MentorTaskView from "../Components/MentorTaskView/MentorTaskView";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminDashboard />} />
        <Route path="/admin/mentors" element={<AdminDashboard />} />
        <Route path="/admin/colleges" element={<AdminDashboard />} />
        <Route path="/admin/assign-project" element={<AssignForm role="admin" />} />


        {/* Mentor Routes */}
        <Route path="/mentor" element={<MentorDashboard />} />
        <Route path="/mentor/assign-task" element={<MentorDashboard />} />
        <Route path="/mentor/projects" element={<MentorDashboard />} />
 
        <Route path="/mentor/assign-task" element={<AssignForm role="mentor" />} />
        <Route path="/mentor/task" element={<MentorTaskView />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/projects" element={<StudentDashboard />} />
        <Route path="/student/tasks" element={<StudentDashboard />} />

        {/* College Routes */}
        <Route path="/college" element={<CollegeDashboard />} />
        <Route path="/college/projects" element={<CollegeDashboard />} />
        <Route path="/college/students" element={<CollegeDashboard />} />
        <Route path="/college/leaderboard" element={<CollegeDashboard />} />

        {/* Catch-All for Any Invalid Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
