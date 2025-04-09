import React from "react";
import styles from "./card.module.css"; // Ensure you create a CSS file for styling

export const Card = ({ children, className }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className={styles.cardContent}>{children}</div>;
};
