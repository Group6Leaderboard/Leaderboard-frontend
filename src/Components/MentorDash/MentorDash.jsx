import React from "react";
import styles from "./mentorDash.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import LeaderboardCard from "../LeaderBoardCard/LeaderBoardCard"; 

const MentorDash = () => {
  // Mock data (Replace with backend data later)
  const totalProjects = 8;
  const totalStudents = 50;
  const totalColleges = 10;

  // Sample data for Line Chart
  const chartData = [
    { name: "Jan", projects: 5, marks: 75 },
    { name: "Feb", projects: 7, marks: 80 },
    { name: "Mar", projects: 6, marks: 85 },
    { name: "Apr", projects: 9, marks: 90 },
    { name: "May", projects: 10, marks: 95 },
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
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className={styles.card}>
          <h3>Total Colleges</h3>
          <p>{totalColleges}</p>
        </div>
      </div>

      {/* Second Row: Graph & Leaderboard Card */}
      <div className={styles.rowContainer}>
        {/* Chart Section */}
        <div className={styles.chartContainer}>
          <h2>Project Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="projects" stroke="#007bff" strokeWidth={2} />
              <Line type="monotone" dataKey="marks" stroke="#28a745" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard Card */}
        <div className={styles.leaderboardCard}>
          <LeaderboardCard title="Mentor Leaderboard" />
          <LeaderboardCard title="Project Leaderboard" />
        </div>
      </div>
    </div>
  );
};

export default MentorDash;
