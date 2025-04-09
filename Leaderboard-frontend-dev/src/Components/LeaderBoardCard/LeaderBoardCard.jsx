import React from "react";

import styles from "./leaderBoardCard.module.css";
import leaderboardImage from "../../assets/ranking.png";

const LeaderboardCard = ({ title }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.iconContainer}>
      <img src={leaderboardImage} alt="Leaderboard" className={styles.image} />
      </div>
    </div>
  );
};

export default LeaderboardCard;
