import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./mentorDashboard.module.css";
import AssignForm from "../Components/AssignForm/AssignForm";
import MentorProjectCard from "../Components/MentorProjectCard/MentorProjectCard";
import MentorProjectDescriptionCard from "../Components/MentorprojectDescription/MentorProjectDescription";
import { getAllProjects } from "../services/projectService";

const MentorDashboard = () => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response.response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return ( 
    <div className={styles.dashboardContainer}>
      {location.pathname === "/mentor/assign-task" ? (
        <AssignForm role="mentor" />
      ) : (
        <div className={styles.projectLayout}>
      
          <div className={styles.projectList}>
            {projects.map((project) => (
              <div className={styles.projectCardContainer} key={project.id} onClick={() => setSelectedProject(project)}>
                <MentorProjectCard project={project} />
              </div>
            ))}
          </div>
          
          <div className={styles.projectDetails}>
            <MentorProjectDescriptionCard project={selectedProject} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
