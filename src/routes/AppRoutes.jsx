import React from "react";
import { Routes, Route } from "react-router-dom";
import CollegeLeaderboard from "../pages/Leaderboard/CollegeLeaderboard";
import ProjectLeaderboard from "../pages/Leaderboard/ProjectLeaderboard";
import StudentLeaderboard from "../pages/Leaderboard/StudentLeaderboard";
import NotFound from "../Components/NotFound/NotFound"; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="colleges" element={<CollegeLeaderboard />} />
      <Route path="projects" element={<ProjectLeaderboard />} />
      <Route path="students" element={<StudentLeaderboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
