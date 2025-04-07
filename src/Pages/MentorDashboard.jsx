import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./mentorDashboard.module.css";
import AssignForm from "../Components/AssignForm/AssignForm";
import MentorProjectView from "../Components/MentorProjectView/MentorProjectView";
import SubmittedTask from "../Components/MentorProject/SubmittedTask";
import MentorDash from "../Components/MentorDash/MentorDash";
import { getAllProjects } from "../services/projectService";

const MentorDashboard = () => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getAllProjects();
        
        if (response && response.response) {
          setProjects(response.response);
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Render the appropriate component based on the current path
  const renderContent = () => {
    if (location.pathname === "/mentor") {
      return <MentorDash />;
    } else if (location.pathname === "/mentor/assign-task") {
      return <AssignForm role="mentor" />;
    } else if (location.pathname === "/mentor/task") {
      return <SubmittedTask />;
    } else if (location.pathname === "/mentor/projects") {
      if (loading) {
        return <div className={styles.loadingState}>Loading projects...</div>;
      }
      
      if (error) {
        return <div className={styles.errorState}>{error}</div>;
      }
      
      return <MentorProjectView projects={projects} />;
    }
    
    // Default view
    return <MentorDash />;
  };

  return (
    <div className={styles.dashboardContainer}>
      {renderContent()}
    </div>
  );
};

export default MentorDashboard;