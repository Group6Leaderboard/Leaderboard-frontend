import React from "react";
import styles from "./statsCard.module.css";

const StatsCard = ({ title, value,bg }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.value}>{value}</h3>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default StatsCard;
