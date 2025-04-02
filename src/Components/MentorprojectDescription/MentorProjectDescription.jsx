import React from "react";
import styles from "./mentorProjectDescription.module.css";
import { FaUser, FaTasks, FaEnvelope } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";

const MentorProjectDescriptionCard = ({ project, onAssignTask }) => {
  if (!project) {
    return <p className={styles.noProject}>Please select a project</p>;
  }

  return (
    <div className={styles.card}>
      {/* Section 1: Project Name & Description */}
      <div className={styles.header}>
        <h2>{project?.name || "No Project Selected"}</h2>
        <p>{project?.description || "No description available"}</p>
      </div>

      {/* Section 2: Assign Task & View Tasks Buttons */}
      <div className={styles.scoreSection}>
        <button className={styles.tasksButton} onClick={onAssignTask}>
          <MdAssignmentAdd className={styles.icon} /> Assign Task
        </button>
        <button className={styles.tasksButton} onClick={onAssignTask}>
          <FaTasks className={styles.icon} /> Tasks
        </button>
      </div>

      {/* Section 3: Members List with Emails */}
      <div className={styles.detailsSection}>
        <div className={styles.column}>
          <h3>Members</h3>
          {project?.members?.length > 0 ? (
            <ul>
              {project.members.map((member, index) => (
                <li key={index} className={styles.memberItem}>
                  <div className={styles.memberName}>
                    <FaUser className={styles.userIcon} /> {member.name}
                  </div>
                  <div className={styles.memberEmail}>
                    <FaEnvelope className={styles.icon} /> {member.email}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noMembers}>No members available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorProjectDescriptionCard;
