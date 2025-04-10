import React from "react";
import "./projectHistory.css";
import { FaProjectDiagram, FaUniversity, FaUserTie, FaStar } from 'react-icons/fa';

const ProjectHistory = ({ projects }) => {
    const formatDate = (dateString) => {
        if (!dateString) return "N/A"; // Handle undefined/null dates
      
        const date = new Date(dateString);
        if (isNaN(date)) return "Invalid Date"; // Handle bad date format
      
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(date);
      };
      

  return (
    <div className="project-history">
      <div className="project-history-header">
        <h2>Recent Projects</h2>
        <p>Latest projects assigned to colleges</p>
      </div>

      <div className="project-list">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div className="project-item" key={project.id}>
              <div className="project-icon">
                <FaProjectDiagram className="project-status-icon" />
              </div>
              <div className="project-details">
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span className="meta-detail"><FaUserTie /> {project.mentorName}</span>
                  <span className="meta-detail"><FaUniversity /> {project.collegeName}</span>
                  <span className="meta-detail"><FaStar /> Score: {project.score}</span>
                  <span className="meta-date">Created: {formatDate(project.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No recent projects found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectHistory;
