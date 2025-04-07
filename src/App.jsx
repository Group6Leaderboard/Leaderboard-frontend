import React from "react";
import {   Routes, Route, Navigate } from "react-router-dom"; // Import useLocation here
import DashboardRoutes from './routes/DashboardRoutes'
import Login from "./Components/Login/Login"
import StudentDash from "./Components/StudentDash/StudentDash";
import LeaderBoardCard from "./Components/LeaderBoardCard/LeaderBoardCard";
import ProjectCard from "./Components/ProjectCard/ProjectCard";
import ProjectDescriptionCard from "./Components/ProjectDescriptionCrad/ProjectDescriptionCard";
import { Card } from "./Components/Card/Card";
import StatsCard from "./Components/RectangleCards/Statscard";
import TaskModal from "./Components/TaskModal/TaskModal";
import Calender from "./Components/Calender/Calender"
import MentorDash from "./Components/MentorDash/MentorDash";
import SubmittedTask from "./Components/SubmittedTask/SubmittedTask";
import StudentTasks from "./Components/StudentTasks/StudentTask";
import List from "./Components/List/List";
import HeaderAdmin from "./Components/HeaderAdmin/HeaderAdmin";
import NotFound from "./Components/NotFound/NotFound";
import { CollegeLeaderboard } from "./pages/Leaderboard/LeaderboardPages";
import { StudentLeaderboard } from "./pages/Leaderboard/LeaderboardPages";
import { ProjectLeaderboard } from "./pages/Leaderboard/LeaderboardPages";
const App = () => {
  return (
   
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<DashboardRoutes />} />
      {/* <Route path="/" element={<StudentDash />} /> */}
       {/* <Route path="/" element={<LeaderBoardCard title="Student Leaderboard" type="project" />} />  */}
  {/* <Route path="/" element={<ProjectCard />} />  */}
   {/* <Route path="/" element={<ProjectDescriptionCard />} />   */}
   {/* <Route path="/" element={<TaskModal />} /> */}
   {/* <Route path="/" element={<MentorDash />} /> */}
   {/* <Route path="/" element={<SubmittedTask />} /> */}
   <Route path="/login/*" element={<NotFound />} />
      {/* <Route path="/leaderboard/*" element={<AppRoutes />} /> */}
      <Route path="/" element={<Navigate to="/leaderboard/colleges" />} />
        <Route path="/leaderboard/colleges" element={<CollegeLeaderboard />} />
        <Route path="/leaderboard/projects" element={<ProjectLeaderboard />} />
        <Route path="/leaderboard/students" element={<StudentLeaderboard />} />
   {/* <Route path="/" element={<HeaderAdmin/>} /> */}


      </Routes>
   
  );
};

export default App;
