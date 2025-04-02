import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mentorProject.module.css";

const projects = [
  { id: 1, title: "AI Chatbot", college: "XYZ University", participants: [{ name: "John Doe" }, { name: "Alice Smith" }] },
  { id: 2, title: "E-commerce Platform", college: "DEF College", participants: [{ name: "Mark Wilson" }, { name: "Sophia Brown" }] },
  { id: 3, title: "Smart Attendance System", college: "PQR Institute", participants: [{ name: "Emma Johnson" }, { name: "Liam Garcia" }] }
];

const MentorProject = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="container mentor-projects">
      <h2 className="my-4 text-center">Assigned Projects</h2>
      <div className="row">
        
        {/* Left Side - Project Cards */}
        <div className="col-md-4 project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card p-3">
              <h3>{project.title}</h3>
              <p>{project.college}</p>
              <button className="btn btn-primary view-more" onClick={() => setSelectedProject(project)}>View More</button>
            </div>
          ))}
        </div>

        {/* Right Side - Project Details */}
        <div className="col-md-8">
          {selectedProject ? (
            <div className="project-details">
              <h3>{selectedProject.title}</h3>
              <p><strong>College:</strong> {selectedProject.college}</p>
              
              <h4>Participants</h4>
              <ul className="list-group">
                {selectedProject.participants.map((participant, index) => (
                  <li key={index} className="list-group-item">{participant.name}</li>
                ))}
              </ul>

              <div className="mt-3">
                <button 
                  className="btn btn-success me-2" 
                  onClick={() => navigate("/mentor/assign-task")} 
                >
                  Assign Task
                </button>
                <button 
                  className="btn btn-info" 
                  onClick={() => navigate("/mentor/submitted-tasks")}
                >
                  View Submitted Tasks
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center">Select a project to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorProject;
