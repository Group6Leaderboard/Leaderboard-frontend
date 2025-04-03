import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./leaderboard.module.css";

const ProjectLeaderboard = () => {
  const navigate = useNavigate();

  const leaders = [
    { name: "Project 1", points: "98", wins: 43, tasks: 167, image: "collegea.png" },
    { name: "Project 2", points: "96", wins: 37, tasks: 132, image: "collegea.png" },
    { name: "Project 3", points: "92", wins: 32, tasks: 68, image: "collegea.png" },
  ];

  const ranking = [
    { rank: 1, name: "Project 1", proj: 236, college: "ST Thomas", points: "98" },
    { rank: 2, name: "Project 2", proj: 167, college: "Rajadhani", points: "96" },
    { rank: 3, name: "Project 3", proj: 146, college: "Christ", points: "92" },
    { rank: 4, name: "Project 4", proj: 120, college: "Amity", points: "89" },
    { rank: 5, name: "Project 5", proj: 100, college: "IIT Bombay", points: "85" },
    { rank: 6, name: "Project 6", proj: 95, college: "IIM Ahmedabad", points: "80" },
    { rank: 7, name: "Project 7", proj: 90, college: "MIT", points: "78" },
    { rank: 8, name: "Project 8", proj: 85, college: "NIT Trichy", points: "75" },
    { rank: 9, name: "Project 9", proj: 80, college: "BITS Pilani", points: "72" },
    { rank: 10, name: "Project 10", proj: 75, college: "Delhi University", points: "70" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 records per page

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = ranking.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(ranking.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Leaderboard</h1>
        <button className={styles.loginButton} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>

      <div className={styles.navbar}>
        <NavLink to="/leaderboard/projects" className={({ isActive }) => (isActive ? styles.active : "")}>
          Projects
        </NavLink>
        <NavLink to="/leaderboard/students" className={({ isActive }) => (isActive ? styles.active : "")}>
          Students
        </NavLink>
        <NavLink to="/leaderboard/colleges" className={({ isActive }) => (isActive ? styles.active : "")}>
          Colleges
        </NavLink>
      </div>

      <h2 className={styles.sectionTitle}>Current Leaders</h2>
      <div className={styles.leaders}>
        {leaders.map((leader, index) => (
          <div 
            key={index} 
            className={`${styles.leaderCard} ${index === 0 ? styles.first : index === 1 ? styles.second : styles.third}`}
          >
            <img src={`/${leader.image}`} alt={leader.name} className={styles.leaderImage} />
            <div>
              <h3>{leader.name}</h3>
              <p>{leader.points} pts.</p>
              <div className={styles.statsRow}>
                <span>Proj: {leader.wins}</span>
                <span>Tasks: {leader.tasks}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Global Ranking</h2>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Project Name</th>
              <th>College</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr key={index}>
                <td>{user.rank}</td>
                <td>{user.name}</td>
                <td>{user.college}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Buttons */}
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            <img src="/la.png" className={styles.pageIcon} />
          </button>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            <img src="/ra.png"  className={styles.pageIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectLeaderboard;
