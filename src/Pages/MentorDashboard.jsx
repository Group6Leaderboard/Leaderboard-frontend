import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from "./mentorDashboard.module.css";
import AssignForm from "../Components/AssignForm/AssignForm";
import MentorProjectCard from "../Components/MentorProjectCard/MentorProjectCard";
import MentorProjectDescriptionCard from "../Components/MentorprojectDescription/MentorProjectDescription";

const MentorDashboard = () => {
  const location = useLocation();

  // Dummy Data for Projects (Replace with backend data)
  const projects = [
    {
      id: 1,
      name: "PROJECT 1",
      college: "College1 ",
      description: "Project 1 description",
      members: [
        { name: "abc", email: "abc@example.com" },
        { name: "xyz", email: "xyz@example.com" },
      ],
    },
    {
      id: 2,
      name: "PROJECT 2",
      college: "College1 ",
      description: "Project 2 description",
      members: [
        { name: "mno", email: "mno@example.com" },
        { name: "pqr", email: "pqr@example.com" },
      ],
    },
  ];

  // Sample Data for Pie Chart
  const data = [
    { name: "Assigned Mentors", value: 70 },
    { name: "Unassigned Mentors", value: 30 },
  ];
  const COLORS = ["#5EB5AE", "#FF5733"]; // Green for assigned, Red for unassigned

  // State to track selected project (default: first project)
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className={styles.dashboardContainer}>
      {location.pathname === "/mentor/assign-task" ? (
        <AssignForm role="mentor" />
      ) : (
        <div className={styles.projectLayout}>
          {/* Left Side: Project List */}
          <div className={styles.projectList}>
            {projects.map((project) => (
              <div key={project.id} onClick={() => setSelectedProject(project)}>
                <MentorProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Middle Section: Project Details */}
          <div className={styles.projectDetails}>
            <MentorProjectDescriptionCard project={selectedProject} />
          </div>

          {/* Right Side: Mentor Assignment Pie Chart */}
          <div className={styles.pieChartContainer}>
            <h3>Mentor Assignment Status</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#02414B"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
