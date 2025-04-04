import React from "react";
import { Link } from "react-router-dom";
import styles from "./notFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.glitch}>404</h1>
      <p className={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/leaderboard/colleges" className={styles.homeLink}>Go to Home</Link>
    </div>
  );
};

export default NotFound;
