import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import AdminDashboard from "../Pages/AdminDashboard";
import DashboardMentor from "../Components/MentorProject/DashboardMentor";
import StudentDashboard from "../Pages/StudentDashboard";
import CollegeDashboard from "../Pages/CollegeDashboard";
import AssignForm from "../Components/AssignForm/AssignForm";
import MentorProject from "../Components/MentorProject/MentorProject";
import SubmittedTask from "../Components/MentorProject/SubmittedTask";
import NotFound from "../Components/NotFound/NotFound"; // Import NotFound

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
        <Route path="/admin/*" element={<NotFound />} /> {/* Handles invalid admin routes */}

        {/* Mentor Routes */}
        <Route path="/mentor" element={<DashboardMentor />} />
        <Route path="/mentor/projects" element={<DashboardMentor />} />
        <Route path="/mentor/assign-task" element={<AssignForm role="mentor" />} />
        <Route path="/mentor/projects" element={<MentorProject role="mentor" />} />
        <Route path="/mentor/task" element={<SubmittedTask />} />
        <Route path="/mentor/*" element={<NotFound />} /> {/* Handles invalid mentor routes */}

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/projects" element={<StudentDashboard />} />
        <Route path="/student/*" element={<NotFound />} /> {/* Handles invalid student routes */}

        {/* College Routes */}
        <Route path="/college" element={<CollegeDashboard />} />
        <Route path="/college/*" element={<NotFound />} /> {/* Handles invalid college routes */}

        {/* Catch-All for Any Invalid Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
