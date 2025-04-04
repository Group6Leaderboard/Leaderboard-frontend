import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StudentDash from "../Components/StudentDash/StudentDash";

import styles from "./studentDashboard.module.css";
import ProjectCard from "../Components/ProjectCard/ProjectCard";
import ProjectDescriptionCard from "../Components/ProjectDescriptionCrad/ProjectDescriptionCard";
import StudentTasks from "../Components/StudentTasks/StudentTask";

const StudentDashboard = () => {
  const location = useLocation();

  // Dummy Data for Projects
  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      description: "AI-based research project.",
      score: 95,
      members: ["Alice", "Bob", "Charlie"],
      mentor: { name: "Dr. Smith", email: "smith@example.com", phone: "123-456-7890" },
    },
    {
      id: 2,
      name: "Project Beta",
      description: "Blockchain security analysis.",
      score: 88,
      members: ["David", "Eve", "Frank"],
      mentor: { name: "Dr. Johnson", email: "johnson@example.com", phone: "987-654-3210" },
    },
  ];

  // State to track the selected project (default: first project)
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className={styles.dashboardContainer}>
    {location.pathname === "/student/projects" ? (
      <div className={styles.projectLayout}>
        {/* Project List */}
        <div className={styles.projectList}>
          {projects.map((project) => (
            <div key={project.id} onClick={() => setSelectedProject(project)}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className={styles.projectDetails}>
          {selectedProject ? (
            <ProjectDescriptionCard project={selectedProject} />
          ) : (
            <p className={styles.placeholderText}>Select a project to view details</p>
          )}
        </div>
      </div>
    ) : location.pathname === "/student/tasks" ? (
      <StudentTasks />
    ) : (
      <StudentDash />
    )}
  </div>
  );
};

export default StudentDashboard;
