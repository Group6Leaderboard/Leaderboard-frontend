
import React from "react";
import styles from "./studentDash.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import LeaderboardCard from "../LeaderBoardCard/LeaderBoardCard"; // Import LeaderboardCard

const StudentDash = () => {
  // Mock data for now (Replace with backend data later)
  const totalProjects = 5;
  const totalScore = 85;
  const totalTasks = 12;

  // Sample data for Line Chart (Replace later with real backend data)
  const chartData = [
    { name: "Jan", projects: 2, score: 70 },
    { name: "Feb", projects: 3, score: 75 },
    { name: "Mar", projects: 5, score: 85 },
    { name: "Apr", projects: 4, score: 80 },
    { name: "May", projects: 6, score: 90 },
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* First Row: 3 Summary Cards */}
      <div className={styles.summaryContainer}>
        <div className={styles.card}>
          <h3>Total Projects</h3>
          <p>{totalProjects}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Score</h3>
          <p>{totalScore}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>
      </div>

      {/* Second Row: Graph & Leaderboard Card */}
      <div className={styles.rowContainer}>
        {/* Chart Section */}
        <div className={styles.chartContainer}>
          <h2>Performance Over Time</h2>
          <ResponsiveContainer width="100%" height={420}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="projects" stroke="#007bff" strokeWidth={2} />
              <Line type="monotone" dataKey="score" stroke="#28a745" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard Card */}
        <div className="leaderboardCard">
          <LeaderboardCard title="Student Leaderboard" />
          <LeaderboardCard title="Project Leaderboard" />
        </div>
      </div>
    </div>
  );
};

export default StudentDash;
