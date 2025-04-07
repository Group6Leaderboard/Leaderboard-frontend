import React, { useState } from "react";
import styles from "./projectDescriptionCard.module.css";
import { FaUser, FaTasks, FaEnvelope, FaPhone } from "react-icons/fa";
import TaskModal from "../TaskModal/TaskModal"; // Import TaskModal component


const ProjectDescriptionCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Function to open the modal
  const handleViewTasksClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.card}>
      {/* Conditionally render the TaskModal as a clean modal */}
      {isModalOpen && (
        <TaskModal 
          taskName={project.taskName} 
          taskDescription={project.taskDescription} 
          dueDate={project.dueDate} 
          mentorName={project.mentor.name} 
          mentorEmail={project.mentor.email} 
          mentorPhone={project.mentor.phone} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Section 1: Project Name & Description */}
      <div className={styles.header}>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
      </div>

      {/* Section 2: Score & Tasks Button */}
      <div className={styles.scoreSection}>
        <span className={styles.score}>Score: {project.score}</span>
        <button className={styles.tasksButton} onClick={handleViewTasksClick}>
          <FaTasks className={styles.icon} /> View Tasks
        </button>
      </div>

      {/* Section 3: Members & Mentor Details */}
      <div className={styles.detailsSection}>
        {/* Members List */}
        <div className={styles.column}>
          <h3> Members</h3>
          <ul>
            {project.members.map((member, index) => (
              <li key={index}>
                <FaUser className={styles.userIcon} /> {member}
              </li>
            ))}
          </ul>
        </div>

        {/* Mentor Details */}
        <div className={styles.column}>
          <h3>Mentor</h3>
          <p><FaUser className={styles.icon} /> {project.mentor.name}</p>
          <p><FaEnvelope className={styles.icon} /> {project.mentor.email}</p>
          <p><FaPhone className={styles.icon} /> {project.mentor.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescriptionCard;
