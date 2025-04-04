import React from "react";
import styles from "./mentorProjectCard.module.css";
import { FaUniversity, FaArrowRight } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";

const MentorProjectCard = ({ project, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <GoProjectRoadmap className={styles.projectIcon} />
        <h3 className={styles.projectName}>{project.name}</h3>
      </div>

      {/* College Info and View More */}
      <div className={styles.footer}>
        <div className={styles.college}>
          <FaUniversity className={styles.universityIcon} />
          <span> College: {project.collegeName}</span>
        </div>
        <button className={styles.viewMore}>
          View More <FaArrowRight className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
};

export default MentorProjectCard;
