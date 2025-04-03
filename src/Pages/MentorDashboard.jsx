import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./mentorDashboard.module.css";

import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import AssignForm from "../Components/AssignForm/AssignForm";
import MentorProjectCard from "../Components/MentorProjectCard/MentorProjectCard";
import MentorProjectDescriptionCard from "../Components/MentorprojectDescription/MentorProjectDescription";
import MentorDash from "../Components/MentorDash/MentorDash"; // Import MentorDash component
import SubmittedTask from "../Components/SubmittedTask/SubmittedTask"
const MentorDashboard = () => {
  const location = useLocation();

  // Dummy Data for Projects (Replace with backend data)
  const projects = [
    {
      id: 1,
      name: "PROJECT 1",
      college: "College1 ",
      description: "Project 1 description",
      members: [
        { name: "abc", email: "abc@example.com" },
        { name: "xyz", email: "xyz@example.com" },
      ],
    },
    {
      id: 2,
      name: "PROJECT 2",
      college: "College1 ",
      description: "Project 2 description",
      members: [
        { name: "mno", email: "mno@example.com" },
        { name: "pqr", email: "pqr@example.com" },
      ],
    },
  ];

  // State to track selected project (default: first project)
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
<div className={styles.dashboardContainer}>
  {location.pathname === "/mentor" ? (
    <MentorDash />
  ) : location.pathname === "/mentor/assign-task" ? (
    <AssignForm role="mentor" /> // Render AssignForm when path is /mentor/assign-task
  ) : location.pathname === "/mentor/task" ? (
    <SubmittedTask /> // Render SubmittedTask when path is /mentor/task
  ) : (
    <div className={styles.projectLayout}>
      {/* Left Side: Project List */}
      <div className={styles.projectList}>
        {projects.map((project) => (
          <div key={project.id} onClick={() => setSelectedProject(project)}>
            <MentorProjectCard project={project} />
          </div>
        ))}
      </div>
      {/* Right Side: Project Description */}
      <div className={styles.projectDetails}>
        <MentorProjectDescriptionCard project={selectedProject} />
      </div>
    </div>
  )}
</div>

  );
};

export default MentorDashboard;
