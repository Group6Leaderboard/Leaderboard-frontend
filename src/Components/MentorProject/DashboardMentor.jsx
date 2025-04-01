import React, { useState } from "react";
import AlertModal from "../AlertModal/AlertModal"; 
import "./dashboardMentor.css"; // Import the CSS file

const DashboardMentor = () => {
  // Sample Data for Projects Assigned to Mentor
  const projects = [
    { id: 1, name: "AI Chatbot", description: "Develop an AI chatbot for customer support." },
    { id: 2, name: "E-commerce Platform", description: "Build a fully functioning e-commerce platform." },
    { id: 3, name: "Smart Attendance System", description: "AI-based facial recognition attendance system." },
    { id: 4, name: "Healthcare Monitoring", description: "IoT-based patient health monitoring system." },
  ];

  const [alertData, setAlertData] = useState({
    show: false,
    title: "",
    message: "",
  });

  // Function to show alert
  const showAlert = () => {
    setAlertData({
      show: true,
      title: "Mentor Assignment Status",
      message: "The mentor assignment status has been updated successfully.",
    });
  };

  return (
    <div className="mentor-dashboard">
      <h2 className="dashboard-title">Projects Assigned to Mentor</h2>

      {/* Button to trigger alert */}
      {/* <button className="alert-button" onClick={showAlert}>Show Alert</button> */}

      {/* Render the AlertModal */}
      {alertData.show && (
        <AlertModal
          show={alertData.show}
          title={alertData.title}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, title: "", message: "" })}
        />
      )}

      {/* Cards for Projects */}
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <button className="view-button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardMentor;
