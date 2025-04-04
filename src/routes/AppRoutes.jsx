import React from "react";
import { Routes, Route } from "react-router-dom";
import CollegeLeaderboard from "../pages/Leaderboard/CollegeLeaderboard";
import ProjectLeaderboard from "../pages/Leaderboard/ProjectLeaderboard";
import StudentLeaderboard from "../pages/Leaderboard/StudentLeaderboard";
import SubmittedTask from "../Components/SubmittedTask/SubmittedTask";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/assign-project" element={<AssignForm role="admin" />} />

      <Route path="/mentor" element={<MentorDashboard />} />
      <Route path="/mentor/task" element={<SubmittedTask />} />
      <Route path="/mentor/assign-task" element={<AssignForm role="mentor" />} />

      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/college" element={<CollegeDashboard />} />

      {/* Leaderboard Routes */}
      <Route path="/colleges" element={<CollegeLeaderboard />} />
      <Route path="/projects" element={<ProjectLeaderboard />} />
      <Route path="/students" element={<StudentLeaderboard />} />
    </Routes>
  );
};

export default AppRoutes;
