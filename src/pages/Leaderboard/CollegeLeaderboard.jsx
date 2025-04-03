import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./leaderboard.module.css";

const CollegeLeaderboard = () => {
  const navigate = useNavigate();

  const leaders = [
    { name: "ST Thomas", points: "98", wins: 43, tasks: 167, image: "collegea.png" },
    { name: "Rajadhani", points: "96", wins: 37, tasks: 132, image: "collegea.png" },
    { name: "Christ", points: "92", wins: 32, tasks: 68, image: "collegea.png" },
  ];

  // Updated 10 records
  const ranking = [
    { rank: 1, name: "ST Thomas", proj: 236, college: "ST Thomas", points: "98" },
    { rank: 2, name: "Rajadhani", proj: 167, college: "Rajadhani", points: "96" },
    { rank: 3, name: "Christ", proj: 146, college: "Christ", points: "92" },
    { rank: 4, name: "Amity", proj: 120, college: "Amity", points: "89" },
    { rank: 5, name: "IIT Bombay", proj: 100, college: "IIT Bombay", points: "85" },
    { rank: 6, name: "IIM Ahmedabad", proj: 95, college: "IIM Ahmedabad", points: "80" },
    { rank: 7, name: "MIT", proj: 90, college: "MIT", points: "78" },
    { rank: 8, name: "NIT Trichy", proj: 85, college: "NIT Trichy", points: "75" },
    { rank: 9, name: "BITS Pilani", proj: 80, college: "BITS Pilani", points: "72" },
    { rank: 10, name: "Delhi University", proj: 75, college: "Delhi University", points: "70" },
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
        <h1 className={styles.title}>College Leaderboard</h1>
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
              <th>College Name</th>
              <th>No Of Projects</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr key={index}>
                <td>{user.rank}</td>
                <td>{user.name}</td>
                <td>{user.proj}</td>
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
    <img src="/la.png"  className={styles.pageIcon} />
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

export default CollegeLeaderboard;
