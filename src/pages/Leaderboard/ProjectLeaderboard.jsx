import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./leaderboard.module.css";

const ProjectLeaderboard = () => {
  const navigate = useNavigate();
  const leaders = [
    { name: "Project 1", points: "98", wins: 43, tasks: 167, achievements: 476, image: "collegea.png" },
    { name: "Project 2", points: "96", wins: 37, tasks: 132, achievements: 482, image: "collegea.png" },
    { name: "Project 3", points: "92", wins: 32, tasks: 68, achievements: 268, image: "collegea.png" },
  ];

  const ranking = [
    { rank: 1, name: "Project 1", id: "1591245", proj: 236, college: "ST Thomas", points: "98" },
    { rank: 2, name: "Project 2", id: "1391245", proj: 167, college: "Rajadhani", points: "96" },
    { rank: 3, name: "Project 3", id: "1892245", proj: 146, college: "Christ", points: "92" },
  ];

  return (
    <div className={styles.container}>
      {/* Title and Login Button Wrapper */}
            <div className={styles.header}>
              <h1 className={styles.title}>Project Leaderboard</h1>
              <button className={styles.loginButton} onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
      
     
      {/* Navbar with NavLink */}
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

      {/* Content */}
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
          <span>Ach.: {leader.achievements}</span>
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
            {ranking.map((user, index) => (
              <tr key={index}>
                <td>{user.rank}</td>
                <td>{user.name} <br /><small>ID {user.id}</small></td>
                <td>{user.college}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectLeaderboard;
