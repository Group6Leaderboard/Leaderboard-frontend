import React from "react";
// import { Routes, Route } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import LoginPage from "./pages/LoginPage/LoginPage";
// import AppRoutes from "./routes/AppRoutes";
import NotFound from "./Components/NotFound/NotFound"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CollegeLeaderboard, ProjectLeaderboard, StudentLeaderboard } from './pages/Leaderboard/LeaderboardPages';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/*" element={<NotFound />} />
      {/* <Route path="/leaderboard/*" element={<AppRoutes />} /> */}
      <Route path="/" element={<Navigate to="/leaderboard/colleges" />} />
        <Route path="/leaderboard/colleges" element={<CollegeLeaderboard />} />
        <Route path="/leaderboard/projects" element={<ProjectLeaderboard />} />
        <Route path="/leaderboard/students" element={<StudentLeaderboard />} />
      <Route path="/*" element={<DashboardRoutes />} />
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
};

export default App;
