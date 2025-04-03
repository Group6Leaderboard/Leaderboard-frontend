import React from "react";
import styles from "./projectCard.module.css";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <GoProjectRoadmap className={styles.projectIcon} />
        <h3 className={styles.projectName}>{project.name}</h3>
      </div>

      {/* Mentor Info and View More */}
      <div className={styles.footer}>
        {project.mentor ? (
          <div className={styles.mentor}>
            <FaUser className={styles.userIcon} />
            <span> Mentor: {project.mentor?.name}</span>
          </div>
        ) : (
          <div className={styles.mentor}>
            <FaUser className={styles.userIcon} />
            <span> Mentor: Not Assigned</span>
          </div>
        )}
        <button className={styles.viewMore}>
          View More <FaArrowRight className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
